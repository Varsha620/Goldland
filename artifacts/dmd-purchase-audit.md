# DMD purchase calculation audit — 31 October 2026

Scope: Diamond Purchase and DMD Stone Purchase calculations, live totals, saving, stock receipt, barcode autofill into a regular Sales Invoice, stock deduction, receipt updates and deletion. Work was done on `main`. Browser examples were entered on `127.0.0.1:4173`, which has separate browser storage from `localhost:4173`.

## Confirmed calculation rules

The shop confirmed that both TCS and TDS use the amount before GST.

| Field | Calculation |
|---|---|
| Net gold weight | Gross − stone weight |
| Gold value | Net weight × gold rate; for Sales Type Nos, Nos × gold rate |
| VA amount | Gold value × VA% / 100 |
| Stone amount in gold row | Stone weight × stone price |
| Purchase making | Net gold weight × purchase MC per gram |
| Gold purchase row total | Gold value + VA + stone amount + purchase making, rounded to paise |
| Diamond purchase row | Entered Carat/Cent quantity × purchase rate, rounded to paise |
| Items total | Sum of rounded gold purchase rows + rounded diamond purchase rows |
| Amount before GST | Items total + addition − discount |
| GST | Amount before GST × configured GST% / 100, rounded to paise |
| TCS | Amount before GST × configured TCS% / 100, rounded to paise |
| TDS | Amount before GST × configured TDS% / 100, rounded to paise |
| Invoice total | Amount before GST + GST + TCS − TDS |
| Balance | Invoice total − cash payment; overpayment remains a negative balance |
| Loose-stone invoice | Sum of rounded purchase amounts + addition − discount |

Rates apply per selected unit: a Ct row uses a per-carat rate; a Cnt row uses a per-cent rate. Nos and pieces describe the entered lot and do not multiply its already-entered total diamond weight. For stock weight aggregation, 1 Ct = 100 Cnt. Diamond selling rates and sales MC do not enter purchase costs. Existing tax rates remain configurable; this audit verifies arithmetic, not tax applicability.

Money now uses exact decimal integer arithmetic, with half-paise rounded away from zero. Each purchase row is rounded once, then summed. Each tax is rounded separately. Raw entered weights/rates take precedence over cached monetary fields.

## Defects corrected

- Inconsistent floating-point rounding of purchase amounts, taxes and balances.
- Cached gold components overriding newly entered weights/rates.
- Diamonds linking to a different ornament merely because both shared an item code. Linkage now uses the ornament barcode.
- Adjustment totals waiting for a change event; pending rows disappearing during a full screen refresh. Totals now update while typing in both purchase screens.
- Loose-stone Save omitting a filled row unless it had first been added separately.
- Header fields without persistence bindings and purchase normalization discarding saved/posting metadata.
- A repeat purchase save replenishing stock already sold. Unchanged saves are idempotent; receipt changes after stock movement are blocked.
- Non-atomic posting and duplicate stock barcodes. Full validation and a private stock plan precede commit.
- Incorrect receipt opening/closing weight: a new ornament receipt now uses opening 0, addition net weight, closing net weight.
- Mixed Ct/Cnt aggregation without unit conversion.
- Purchase deletion leaving orphan stock. Unconsumed receipt deletion reverses its stock; consumed receipts require reversing later movements first.

Save rejects empty receipts, non-finite or negative weights/rates/adjustments, stone weight exceeding gross, zero/fractional Nos, fractional diamond pieces, non-positive diamond weight, percentages outside 0–100, excessive discounts and duplicate receipt barcodes.

## Independent reference example checked in the browser

Gold: gross 2g, stone 0.25g, gold rate ₹1,000, VA 5%, stone price ₹100/g, purchase MC ₹20/g.

- Net gold = 1.75g.
- Gold value ₹1,750 + VA ₹87.50 + stone ₹25 + purchase making ₹35 = **₹1,897.50**.
- Diamond: 12.5 Cnt × ₹80.25/Cnt = **₹1,003.13**.
- Items total **₹2,900.63**.
- Addition ₹100 − discount ₹20 gives pre-GST base **₹2,980.63**.
- GST 3% **₹89.42**, TCS 1% **₹29.81**, TDS 0.5% **₹14.90**.
- Invoice **₹3,084.96**; cash ₹100; balance **₹2,984.96**.

The browser showed the same amounts before saving and after reopening the saved bill. The gold and loose-stone receipts both appeared in Stock Register. Loose-stone example: 12.5 × ₹80.25 + ₹10 − ₹5 = invoice **₹1,008.13**; payment ₹100; balance **₹908.13**. Saving the filled loose-stone row without Add completed successfully. No browser console errors were reported during these checks.

## Automated verification

`npm test` runs all existing smoke/runtime regressions plus:

- 500 deterministic independently calculated cases using integer milligrams, paise and basis points. Every case compares gold, diamond, taxable base, GST, TCS, TDS, invoice and balance against an independent integer oracle.
- Half-paise rounding, explicit zero rate and zero-tax handling, stale cached values, and purchase/selling price isolation.
- 1,000-row accumulation without paise drift.
- Repeated item IDs with distinct barcodes; Ct/Cnt conversion; removal of linked diamond rows.
- Invalid input rejection and stock unchanged after failed saves.
- Pending loose-stone capture, overpayment, reload metadata, unconsumed receipt updates and stock identity preservation.
- DMD purchase → barcode autofill → actual regular sales posting → stock deduction → receipt re-save without replenishment.
- Safe receipt deletion and rejection after stock consumption.

## Practical limits

This is a calculation and workflow audit of the purchase screens above. It does not certify separate DMD sales/return calculations, historical imported balances, printer output, statutory tax eligibility, or the entire accounting ledger. Historical stock entries were not migrated or silently rewritten. Existing tags that predate posting metadata are rejected on attempted duplicate receipt posting and need individual review. New posting safeguards apply to receipts saved with this version.
