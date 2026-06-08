# Goldland Jewellery

A local-first jewellery ERP/POS prototype for Goldland. It implements the approved architecture as a working browser app with no external dependencies, so it can run in the shop even without internet.

## What is included

- Premium desktop-style UI with seven clear areas: Dashboard, Billing, Stock, Customers, Schemes, Accounts, Reports.
- Owner dashboard for sales, purchases, cash, stock, scheme dues, alerts, and rate timeline.
- Multiple intraday rate updates for gold, silver, diamond, and stones.
- Invoice rate snapshots so old bills never change after a rate update.
- Single password access for authorized shop staff.
- Add-new windows for bills, stock items, parties, scheme collections, account entries, and rate updates.
- Billing now includes the operational columns visible in the current software screenshots: entry/reference, customer fields, barcode, item, weight, wastage, stone charge, rate, VA, making charge, tax, amount, and balance.
- Customer bill preview with a browser print flow for giving the buyer a printed copy.
- Scheme, stock, and ledger tables include the detailed columns from the screenshots, while the final 3-schema split can be added once confirmed.
- Audit trail for rate updates, exports, stock drafts, scheme collections, and bill creation.
- Manual stock register with HUID/BIS-ready fields.
- Financial-year database schema in `src/schema.sql`.

## Run

```powershell
npm.cmd start
```

Open `http://localhost:4173`.

Prototype password:

```text
goldland2026
```

The app can also be opened directly from `index.html` for a quick offline preview.

## Test

```powershell
npm.cmd test
```

## Suggested production path

This prototype is intentionally dependency-free. For production, keep this product shape and migrate the implementation to:

- React + TypeScript frontend
- Tauri Windows shell
- Local .NET 8 or NestJS API
- PostgreSQL local database
- Encrypted local/cloud backups
- Optional owner web/mobile dashboard sync
