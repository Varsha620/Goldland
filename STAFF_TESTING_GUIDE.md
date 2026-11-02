# Goldland Staff Testing — Version 0.3

Updated 2 November 2026. This version includes the updated **Work Orders**, **Barcode** and **Stock** menus, alongside Management, Sales and Purchase.

## Open and identify the test version

- Local test URL: http://localhost:4174/
- Main application: http://localhost:4173/
- Branch: codex/staff-testing-v1
- Password: goldland2026
- The top banner must say **TESTING VERSION — STAFF-TEST 0.3**.

Run this checkout with `npm.cmd start`. Its default port is 4174, so the main checkout can remain running on 4173. An explicit PORT environment variable still overrides that default.

Use made-up names and transactions only. Test records and login use separate browser-storage keys from the main version. Refreshing does not clear test progress. The Test guide's Reset demo data button requires confirmation and resets only the test dataset/checklist; main data and saved feedback are retained.

## Menus available

- **Management:** customer/supplier, smith/refiner/staff and item/account masters.
- **Sales:** existing complete Sales submenu, including barcode autofill and stock deduction.
- **Purchase:** existing complete Purchase submenu and stock receipt flows.
- **Work Orders:** Smith, Jeweller, Refining, Sample, Polishing, Service / Job and Complimentary Item. Cash-for-weight and refining/melting sub-screens remain under their respective options.
- **Barcode:** Barcode Entry, Barcode List, Barcode Printing and Barcode Edit.
- **Stock:** Stock Register, Opening Stock Account Entry, Stock Adjustments, Item Transfer, Gold Deposit and Gold Withdrawal.

The business calculations, posting/reversal logic and safeguards are synchronized from main. The testing banner, checklist and feedback tools remain test-only. Other module groups remain hidden in this focused round.

## Demo data provided

Demo customer/supplier, Smith, Jeweller and Refiner masters are ready to select. Three unconsumed tags are available:

| Barcode | Item | Qty | Gross | Stone | Net |
|---|---|---:|---:|---:|---:|
| DEMO-RING-001 | GOLD RING | 1 | 4.850 | 0.150 | 4.700 |
| DEMO-CHAIN-001 | GOLD CHAIN | 1 | 9.720 | 0.000 | 9.720 |
| DEMO-DMD-001 | DIAMOND RING | 1 | 3.640 | 0.240 | 3.400 |

Fixture-only legacy barcode lists are excluded from the browser test dataset. Use the provided available tags or create new ones through receipt entry. A draft sales form is provided; no fake completed sale consumes the starter stock.

## Recommended checks

1. Scan DEMO-RING-001 into Sample Issue for Demo Jeweller, save and check Stock Register. Return it for the same party and verify quantity/net restoration.
2. Repeat with Polishing Issue/Return, then Smith/Jeweller IN/OUT as appropriate.
3. Transfer a complete tag to a named counter; verify unchanged company-wide totals and the Location column. Return it with IN before selling.
4. Scan the available tag into Sales Invoice. Verify autofill and stock deduction. Attempt a second sale and confirm it is rejected.
5. Create a new Barcode Entry, check the list, edit an unused tag and select labels/quantities for printing.
6. Test opening balances, adjustments and party gold deposits/withdrawals, including By Amount.
7. Complete refinery issue → test return → final return, and melting issue → return. Account for losses, bottle stock and reissue.
8. Create Service / Job with an advance; select that job in Close Service / Job, add final payment and verify the balance. Customer repairs must not enter saleable shop stock.
9. Purchase/issue complimentary items, including free units. Test insufficient stock and safe deletion.
10. Re-save, edit and delete entries. Later movements must be reversed before their source can be changed or deleted.

See artifacts/work-orders-barcode-stock-review.md for formulas, expected results and supported-flow boundaries. Old documents lacking posting history are protected from unsafe replay; start fresh entries for this round.

## Feedback

Use **New feedback** on the exact screen, enter the expected and actual result, then Save & share. Feedback includes version 0.3 and the precise Barcode/work-order sub-screen. My feedback retains edit/delete/copy/share tools. No feedback is sent automatically by this update.

Results: Cannot complete / Works but needs changes / Works correctly / Not used by our shop.

## Verification

Run `npm.cmd test`. It includes the shared smoke/runtime suites plus staff-specific checks for menu access, demo masters/tags, main-data isolation, persistence, feedback context and work → return → sale stock flow.

Browser storage is local to each origin/device; different devices do not share transactions. Actual printer alignment/output still requires a shop-printer check. This release is for testing, not real billing or accounting.
