# Cursor Agent Handoff: Goldland Jewellery

Use this as the first message or pinned project context for a new Cursor agent working on this repository.

## Core Identity

You are working on **Goldland Jewellery**, a local-first jewellery ERP/POS prototype for an Indian jewellery shop. Treat this as serious business software, not a generic demo. The app is intended to model shop-floor workflows: billing, sales, purchases, stock, customer/supplier masters, schemes, accounts, work orders, refinery, polishing, complimentary items, and reports.

The current implementation is intentionally dependency-free and browser-based so it can run offline in the shop. The production path may later move to React/TypeScript/Tauri/API/PostgreSQL, but right now the task is to preserve and improve this prototype.

## Repository

- Root: `C:\Users\stuvs\OneDrive\Documents\Goldland`
- App entry: `index.html`
- Main app logic: `src/app.js`
- Main styles: `src/styles.css`
- Future production schema reference: `src/schema.sql`
- Static local server: `server.mjs`
- Smoke test: `tests/smoke.test.mjs`
- Local database artifact: `goldland.db`

## Commands

Run the app:

```powershell
npm.cmd start
```

Open:

```text
http://localhost:4173
```

Run tests:

```powershell
npm.cmd test
```

Prototype password:

```text
goldland2026
```

The app can also be opened directly from `index.html`, but prefer the local server for normal verification.

## Current Architecture

This is a plain HTML/CSS/JavaScript app with no external dependencies.

- `server.mjs` serves files from the workspace with no-store cache headers.
- `src/app.js` is a single large stateful frontend file.
- App data starts from a large `seed` object.
- Runtime state is persisted in `localStorage` under `goldland-state`.
- Authentication state is stored in `sessionStorage` under `goldland-authenticated`.
- Rendering is mostly string/template based and is driven by global state variables such as `active`, `salesView`, `purchaseView`, `stockView`, `workOrderView`, `accountView`, `managementView`, and related draft objects.
- Many workflows are implemented as modal/screen builders plus `save...`, `read...`, `normalize...`, `financials...`, and `setup...` helper functions.

Important: because this is a prototype, many screens are validated by the smoke test using required strings and helper names. Do not rename visible labels or helper identifiers casually.

## Product Areas

The sidebar/top-level areas include:

- Dashboard
- Sales
- Purchase
- Transactions
- Stock
- Work Orders
- Management
- Schemes
- Accounts
- Reports

Important workflows already represented:

- Sales Invoice, Sales Return, Exchange, Return
- Purchase Invoice and Purchase Return
- DMD Return / DMD OP
- DMD Sales Wholesale
- Diamond Purchase
- Direct Purchase
- Sales Order, Order Advance, Order Advance Refund
- Barcode Entry and Transfers
- Stock Adjustment
- Opening Stock Account Entry
- Smith, Jeweller, Refinery, Melting, Sample, Polishing, Service / Job
- Gold Deposit / Withdrawal
- Complimentary Item Purchase and Issue
- Bill Wise Collection, Bill Wise Payment, Credit Note Discount, Debit Note Discount
- Custom Voucher
- Customer, Supplier, Smith, Refiner, Employee, Item, Account, category, and miscellaneous masters

## Business Rules To Protect

Preserve these behaviours unless the user explicitly asks to change them:

- Single password access only. Do not reintroduce role selector UI.
- Invoices must keep a frozen `rateSnapshot`; old bills must not change after rate updates.
- Billing must support Sales, Exchange, and Return sections.
- Invoice totals must subtract exchange and return totals.
- Negative invoice totals are valid and should show refund wording.
- Net weight is gross weight minus stone weight.
- Making charge weight is based on net weight and VA percent, then valued against the item rate.
- Removed or inactive rows must not affect totals.
- Card transaction split must remain accessible from billing.
- Today's bill register should stay day-scoped.
- Print customer copy and printable invoice preview must keep working.
- Stock entries need HUID/BIS-ready fields.
- Scheme views need member ID, due, collection, and balance details.
- Ledger/account views need voucher number and debit/credit/balance details.
- Work order screens need their specialized jewellery fields, not generic forms.

## Development Style

Work with the existing prototype style unless the user asks for a larger migration.

- Prefer focused edits in `src/app.js`, `src/styles.css`, `src/schema.sql`, and tests.
- Do not introduce npm dependencies unless the user asks or the feature truly requires it.
- Do not split the app into a framework as a side effect of a small task.
- Keep UI dense, operational, and shop-floor friendly.
- Avoid marketing-page patterns, oversized hero content, decorative gradients, and unrelated visual flourishes.
- Use compact tables, clear form sections, sticky/scrollable grids where needed, and stable dimensions.
- Keep labels close to the legacy jewellery/accounting software language when implementing copied workflows.
- Do not remove existing workflows while improving one screen.
- Do not casually rename strings that `tests/smoke.test.mjs` asserts.

## Testing Expectations

After changes, run:

```powershell
npm.cmd test
```

For UI work, also run the app and manually verify the relevant workflow in the browser:

```powershell
npm.cmd start
```

Then open `http://localhost:4173`, enter `goldland2026`, and inspect the changed screen.

If you add or change a major workflow, update `tests/smoke.test.mjs` with focused assertions for the new required labels, helper functions, schema tables, or behaviour markers.

## Common Implementation Patterns

Look for nearby existing examples before adding new code. The app often follows these naming patterns:

- `normalizeThing(...)`
- `defaultThingDraft(...)`
- `thingScreen(...)`
- `thingFinancials(...)`
- `readThingEntryLine(...)`
- `appendThingLine(...)`
- `saveThing(...)`
- `setupThingScreen(...)`
- `openThing...`

For new state collections, add them in:

- `seed`
- `loadState()` merge/normalization
- relevant save handler
- relevant screen/register
- `src/schema.sql` if it is a durable business entity
- `tests/smoke.test.mjs` if it is a required workflow

## Known Sensitive Files

- `src/app.js` is very large. Use search before editing. Do not rewrite broad sections unless necessary.
- `src/styles.css` contains both modern app styling and classic legacy-window styling. Match the local class patterns around the screen you change.
- `src/schema.sql` is the future database contract. Keep it aligned with new durable workflows.
- `tests/smoke.test.mjs` is intentionally string-heavy. It protects important business coverage in this prototype.

## Suggested Agent Workflow

1. Read `README.md`, `package.json`, and this file first.
2. Search for the target workflow in `src/app.js` with exact labels or function names.
3. Inspect nearby helper and setup functions before editing.
4. Make the smallest complete change that preserves existing screens.
5. Update CSS only where the changed screen needs layout or polish.
6. Update schema/test if the change affects durable data or required workflows.
7. Run `npm.cmd test`.
8. Start the app and verify the changed UI where practical.
9. Report exactly what changed, what was tested, and any remaining risk.

## User Preference Notes

The owner wants to continue work without repeatedly explaining the project. Be proactive, but do not bulldoze. If a request is clear, implement it. If business details are ambiguous, make a conservative assumption and name it, or ask one focused question when wrong behaviour would be costly.

The desired product is not just beautiful. It must feel usable for a jewellery shop operator who works fast, reads dense tables, edits many numeric fields, and expects familiar accounting/jewellery software workflows.

