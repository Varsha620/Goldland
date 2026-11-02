# Work Orders, Barcode and Stock — implementation and review checklist

Prepared 2 November 2026 for review on 3 November 2026. Branch: main.

## What changed

All Work Orders and Stock save operations now use a common atomic posting path. A failed save leaves records and stock unchanged. Each source document has a persistent movement journal, allowing repeat saves without duplicate stock and safe reversal on deletion. Edits/deletions are rejected when later stock movements depend on them.

The original Barcode Entry toolbar/menu flow is preserved. Its Save now revalidates every edited grid row and recalculates net weight. Barcode edits preserve the stock balance equation and recalculate per-gram charges. Barcode movement history and current inventory include work movements and actual locations.

| Screen | Implemented and checked behavior |
|---|---|
| Smith | IN receipts add stock; OUT issues deduct exact barcode stock. New receipts get a barcode. Fees, optional fees-only posting, GST, additions, discounts and payment balance use paise rounding. |
| Jeweller | IN/OUT stock posting; MC per gram plus VA component; GST, adjustments and balance; AccRepost uses the same idempotent posting path. |
| Cash for Weight Smith/Jeweller | Amount/rate conversion, touch/conversion weight, explicit zero touch, positive-rate/conversion validation and party weight settlement. No fictitious physical stock is created for a cash-only settlement. |
| Refining | Source-linked issue, test return and final return; source/date validation, mass conservation, weighted touch difference, charges/payment balance. Only final output becomes available refined stock. |
| Melting | Issue and source-linked final return; losses/bottle stock cannot exceed issued weight; duplicate returns rejected. |
| Sample | Exact barcode issue, same-party outstanding-return limits, combined over-return rejection and return autofill from outstanding issue weights. |
| Polishing | Issue/Return selector, shop-internal or selected-party custody, stone valuation, outstanding return limits; embedded stone details do not create duplicate physical stock. |
| Service / Job | New job, original-job selector on closure, original advance carried forward once, final payment and remaining balance. Selecting another source creates a fresh closure and does not overwrite another job's history. Customer repair goods remain outside saleable shop stock. |
| Complimentary Item | Purchase, free quantity, issue, edit and delete; insufficient stock and deletion of consumed purchases are rejected atomically. |
| Opening Stock | Gross/stone/net, rate amount and pure weight; repeat saves; cannot overwrite balances that already have posted movements. |
| Stock Adjustments | Add/deduct quantity, gross and stone; net corrections; negative stock rejection; repeat save and reversal; stone-only changes keep the stock equation balanced. |
| Gold Deposit / Withdrawal | Separate party holdings; physical net versus touch-adjusted party weight; amount-only conversion; insufficient/other-party withdrawal rejection; repeat save and reversal. |
| Item Transfer | Completed editable form, scan autofill, Save/Edit/Delete/Previous/Next/New/Refresh; location changes without changing company stock totals. Sale/issue from another location is blocked until the tag returns to Main Stock. |
| Stock Register | Main table remains the only register panel; location is visible alongside quantities, gross/stone/net and balances. |
| Barcode Entry | Unique codes, master validation, quantity/weight checks, grid-row recalculation, receipt stock posting and downstream transaction guards. |
| Barcode List/Edit/Printing | Current stock weights/quantities, guarded edits, making-charge recalculation, printing selection/quantity safeguards and browser print invocation. |
| Barcode Reports | Existing Show-first behavior and reconciliation regressions retained. |

Saved-entry pickers, previous/next navigation, source links and unique reference numbering work across operational screens. Header changes preserve pending entry rows and do not require a second Save click after a full form refresh. Smith Add Exp opens Expense Entry with the work reference instead of opening account-master creation.

## Calculation rules used

- Physical net weight = gross − stone, also subtracting recorded mud loss where that workflow supplies it.
- Shop stock closing = opening + additions − deductions. Quantity, gross, stone and net change together on receipts/issues.
- Smith work weight follows its SM Weight field. Purchase/work MC = work weight × MC/gram; HMC and stone charges are added. Post Only MC excludes gold value. GST applies only when Taxable is selected.
- Jeweller MC = work weight × MC/gram + work weight × VA% × gold rate / 100. Row value adds metal value, stone charges and HMC. GST and invoice balance are rounded to paise.
- Party weight closing = opening + OUT weight − IN weight. Cash-for-weight Payment reduces the party's outstanding weight; Receipt increases it. These directions are separate from physical shop stock.
- Cash conversion weight = amount / rate; converted net weight = weight × touch / conversion.
- Sample valuation = rounded(net × rate + HMC), then separately rounded tax. Polishing stone valuation uses its entered unit quantity and selling rate, rounded to paise.
- Barcode MC = net × MC/gram when a positive per-gram rate is supplied; otherwise the entered fixed MC is used. Purchase MC follows the same rule with PMC/gram.
- Service balance = job amount − original advance − final payment. Overpayments remain negative balances rather than disappearing.
- Refinery/melting output, losses, bottle stock and reissue must account for issued mass. Test-piece and bottle quantities are not silently counted as additional final shop output. Touch difference uses weight-weighted touch, not an unweighted average of rows.
- Complimentary purchase charge = (quantity − free quantity) × price. Free quantity cannot exceed total quantity. All physical received units enter complimentary stock.
- Monetary calculations use exact decimal integer arithmetic with half-paise rounding away from zero. Work weights are retained to six decimal places internally and shown at the screen's normal precision.

## Verification completed

The full npm test suite passes. This includes the existing 500 independent DMD money cases and 300 additional independent integer-oracle Work Orders money cases, plus lifecycle checks across every operational screen above.

Regression cases cover IN/OUT, normal return, over-return, wrong-party return, duplicate posting, edit, delete, reverse-order dependencies, reload/re-save, insufficient stock, repeated item names with distinct barcodes, missing source, invalid dates, negative/non-finite inputs, zero touch/rate behavior, monetary credits, unique entry references, opening stock protection and source switching.

Browser checks used http://127.0.0.1:4173 with separate storage from the main http://localhost:4173 application:

1. Smith receipt: 1 tag, gross 5g, stone 1g, net 4g; MC ₹10/g produces ₹40. Addition ₹10 and discount ₹5 give a fees-only balance of ₹45. Saved without a separate Add click and reopened successfully.
2. Sample issue/return: scanning the received tag autofilled item, quantity and weights. Issue removed availability; return restored quantity 1 and net 4g.
3. Polishing: the same tag was issued and returned using the new Movement selector. Return autofilled the outstanding issued quantity/weights.
4. Transfer: the tag moved to Audit Counter and back to Main Stock; company quantity 1/net 4g remained unchanged.
5. Service: job JB00007 for ₹500 with ₹100 advance closed as fresh document JBC00003 dated 2 November 2026, with ₹400 final payment and zero balance. The source selection cleared unrelated fields from the previously displayed closure.
6. Amount-only deposit: ₹900 at ₹100/g and 90% touch produced party weight 9g and physical net 10g, and saved successfully.

## Suggested review tomorrow

Use Refresh/New to start a new entry. For a barcode test, choose an existing item master, quantity 1, gross 5g, stone 1g and MC/gram 10. Save and use that exact new barcode for the subsequent tests.

- Check Stock Register: net 4g and quantity 1.
- Scan into Sample Issue; save; verify availability falls. Return it for the same jeweller; verify restoration.
- Repeat with Polishing Issue/Return.
- Move the tag to a named counter using Item Transfer. Check the Location column and unchanged total stock. Return it with IN.
- Enter a Sales Invoice using that barcode. Check autofill and deduction. Attempt another sale and confirm it is rejected.
- Attempt to edit/delete the source receipt while dependent movements remain; confirm it is rejected. Reverse dependent documents in reverse order before changing the source.
- Test Smith and Jeweller receipts and issues, including fees-only versus full value and taxable versus untaxed Smith work.
- Test a refinery issue → test return → final return and a melting issue → return. Include a small explicitly recorded loss and check that mass reconciles.
- Test Service New/Close with an advance and final payment, and Complimentary Purchase/Issue including free units.
- Check Barcode reports remain empty until Show; test print selections without changing inventory.

## Boundaries and safeguards

This is a tested set of supported flows, not a guarantee over every possible input or an audit of all unrelated accounting screens. Tax percentages and touch/wastage settlement conventions remain the application's configured shop rules; verify any shop-specific variation during review.

Historical/demo documents created without movement journals are guarded from unsafe stock re-posting/deletion. They were not silently migrated or used to overwrite the main browser's balances. Start fresh entries for checking. Fixture/legacy barcode lists are not proof that a tag has an available live Stock Register receipt.

Transfers require a complete barcode quantity/weight. Split inventory into separate physical tags before a partial location transfer. Refinery/melting allow one document per return stage for an issue; edit that return to correct it, rather than posting a second final receipt. Customer service goods are not saleable shop inventory.

Print buttons start the browser's printing process. Actual printer selection, sticker alignment and hardware output still need verification on the shop printer. Main localhost shop data was not used for the browser audit entries.
