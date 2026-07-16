# Goldland Jewellery

Local-first jewellery ERP/POS prototype for Goldland. The app runs in a browser from a small Node server and is built to model the workflows discussed during client demos: billing, sales orders, purchase entries, stock/work orders, accounts, masters, and reports.

## Current Scope

- Dashboard with sales, purchase, cash, stock, scheme, audit, and rate timeline summaries.
- Sales billing with Sales, Exchange, Return, DMD Return/DMD OP, DMD Sales Wholesale, Sales Order, Additional Order Advance, and Order Advance Refund screens.
- Purchase screens for Purchase Invoice, Purchase Return, Diamond Purchase/Return, Direct Purchase/Return, and DMD Stone Purchase.
- Stock and work-order screens for barcode/opening stock, adjustments, gold deposit/withdrawal, smith, jeweller, refining, melting, sample, polishing, service, and complimentary items.
- Account screens for cash/bank vouchers, journal/direct/expense entries, PDC, billwise collection/payment, credit/debit note discounts, and custom vouchers.
- Master-data windows for parties, employees, items, accounts, categories, and miscellaneous dropdown values.
- Local persistence through browser storage, plus schema reference in `src/schema.sql`.

## Important Business Logic

- Bill row entry supports keyboard-only operation: `Enter` moves to the next field and adds the row from the last editable field.
- Bill `Edit` opens an existing-record picker so staff can search by customer, phone, bill number, entry number, or party and load the record back into the screen.
- Saved bill/detail rows can be double-clicked to load the row into the entry line for correction.
- Making Charge for Sales, Sales Order, and Return rows is calculated as:

```text
MC = Net WT * VA% * Current Rate
```

- Sales Order is treated as a quotation/customer deposit flow. It does not affect stock. Additional Order Advance adds money to the customer deposit, and Order Advance Refund subtracts money from available advance.
- DMD Return/DMD OP treats returned diamond/ornament value as return-side acquisition value. `Total` includes purchase MC, while `Sales Amt` stays zero until the item is sold later.
- DMD Return/DMD OP stone selling price defaults to zero.

## Run

```powershell
npm.cmd start
```

Open:

```text
http://localhost:4173
```

Prototype password:

```text
goldland2026
```

## Test

```powershell
npm.cmd test
```

The test suite includes smoke checks plus runtime checks for billing calculations, DMD return logic, sales-order advance/refund behavior, and demo-data initialization.

## GitHub

Repository remote:

```text
https://github.com/Varsha620/Goldland.git
```

Typical update flow:

```powershell
git status
git add .
git commit -m "Describe the change"
git push
```

The `.gitignore` excludes local databases, logs, dependency folders, build output, and editor scratch files.

## Production Direction

This is still a local-first prototype. A production build should keep the validated workflows but move toward:

- React + TypeScript frontend
- Windows desktop shell such as Tauri
- Local API layer
- PostgreSQL or another durable local database
- Backup/sync strategy for owner access and disaster recovery
