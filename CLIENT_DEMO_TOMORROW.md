# Goldland Client Prototype Demo Guide

Use this guide for tomorrow's prototype presentation. The goal is to show direction, screen coverage, and workflow understanding. Do not present this as finished production software.

## Demo Status

Current status:

```text
Working prototype for workflow and screen review.
Not final production software yet.
```

Demo dataset status:

```text
Versioned example records are installed automatically on first reload.
Existing user-entered records are preserved and demo records are not duplicated.
```

Verified before demo:

```powershell
npm.cmd test
```

Expected result:

```text
Goldland smoke tests passed.
```

Run the app:

```powershell
npm.cmd start
```

Open:

```text
http://localhost:4173
```

Password:

```text
goldland2026
```

## Opening Line To Client

Say this clearly:

```text
This is the working prototype version. The purpose today is to confirm the screen structure, menu flow, field names, and priority modules before converting it into a production-ready database-backed system.
```

Then add:

```text
Some modules are functional at prototype level, and some are still placeholders or need deeper accounting, stock, report, and print logic.
```

## Best Demo Flow

Keep the demo controlled. Do not click every menu.

### 1. Dashboard

Show:

- Main navigation.
- Rate summary.
- Daily overview.
- Audit/activity idea.

Say:

```text
This is the owner/staff landing screen. Final reports and live database values will replace the prototype sample data.
```

### 2. Sales Invoice

Show:

- Sales menu top tabs.
- Sales Invoice screen.
- Entry row.
- Item selection suggestions.
- MC/gm and Total MC relation.
- Bottom totals.
- Print/customer copy area if needed.

Say:

```text
This is the highest-priority module for daily shop use. The final version will connect this to real stock, ledger, GST, and invoice printing.
```

### 3. Sales Return / Sales Order

Show briefly:

- Sales Return layout.
- Sales Order layout.
- Advance/refund menu availability.

Do not spend too long unless client asks.

Say:

```text
These screens are structured now. Final production work will connect them with old bill search, refund handling, and ledger posting.
```

### 4. Purchase

Show:

- Purchase Invoice.
- Purchase Return.
- Direct Purchase.
- Diamond Purchase.
- DMD Stone Purchase.

Say:

```text
The purchase family is being matched to the old-software flow. Final logic will post supplier ledger, stock, tax, and reports.
```

### 5. Stock

Show:

- Stock submenu bar.
- Stock Register.
- Opening Stock.
- Stock Adjustments.
- Gold Deposit.
- Gold Withdrawal.

Say:

```text
Stock is planned around item-wise and barcode/HUID-wise movement. Final version will enforce stock posting rules and stock valuation reports.
```

### 6. PDC

Show:

- PDC Issue.
- PDC Request.
- PDC Receipt.
- Bank Submission.
- Cheque Bounce.
- Cheque Represent.

Say:

```text
PDC screens are in place. Final version will manage the full cheque lifecycle from receipt or issue through submission, clearing, bounce, and represent.
```

### 7. Work Orders

Use these prepared examples:

- Smith: `NR00006` — Ravi Smith, two issued lines.
- Jeweller: `AR00001` — Babu Jeweller, bangle finishing.
- Refining Issue: `NR00021` — Metro Refiner.
- Refining Return: `RR00009` — use **Test Return** and **Issued Details** tabs.
- Refining Final Return: `FR00004` — use **Final Return**, **Test Return**, and **Issue** tabs.
- Melting Issue: `MI00005`.
- Melting Return: `MR00001` — use **Final Return** and **Issue** tabs.
- Sample Issue/Return: `SI00003` and `SR00002`.
- Polishing: `PL00002` — diamond ring and stone detail.
- Service / Job: `JB00005`; closure `JBC00002`.
- Complimentary Purchase/Issue: `CP00003` and `CI00004`.

Say:

```text
These are jewellery-specific workflows. They need careful final testing with real shop scenarios because weight reconciliation is critical.
```

### 8. Accounts

Use these prepared examples:

- Account Ledger.
- Cash Receipt: `CR00031`.
- Bank Deposit: `BD00018`.
- Journal Voucher: `JV00008` — balanced debit and credit.
- PDC Receipt: `PR00012` — cheque against invoice `C02033`.
- Bill Wise Collection/Payment.
- Custom Voucher.

Say:

```text
The final accounting engine will automatically post ledger entries from billing, purchase, PDC, and stock-related transactions.
```

### 9. Management

Show:

- Customer Master.
- Supplier Master.
- Employee Master.
- Item Creation.
- Account Creation.

Say:

```text
Masters will be imported or entered before go-live. This is necessary before real billing starts.
```

## Screens To Avoid Deep Demo Unless Asked

Avoid deep editing in these during the first client demo:

- Reports, because final report list needs client confirmation.
- Deep old bill search/edit flows.
- Full accounting reconciliation.
- Data import.
- Backup/restore.
- Permission setup.

You can show menus, but say:

```text
This part is planned for production implementation after module priority confirmation.
```

## Known Pending Items

Keep this ready if client asks what is pending:

- Real production database save/load for every module.
- Search and reload old bills.
- Full stock posting.
- Full ledger posting.
- GST/accounting verification.
- Print format final approval.
- PDF/Excel export.
- User roles and permissions.
- Backup/restore.
- Old software data import.
- Final reports.
- Client scenario testing.

## Questions To Ask Client

Ask these at the end:

1. Which 5 modules should be completed first for daily use?
2. Which print formats are mandatory?
3. Which reports are used every day?
4. Do they need old data imported or only opening balances?
5. Who are the user roles: owner, cashier, accountant, manager?
6. Is the first target a single-shop local app or multi-branch?
7. Which screens from the old software must match exactly?

## Do Not Promise

Avoid saying:

```text
Everything is almost complete.
This is production ready.
All reports are done.
All old software features are already included.
```

Use this instead:

```text
The prototype is ready for workflow review. Production completion will be done module by module after priority confirmation.
```

## Recommended Timeline To Tell Client

Use a realistic range:

```text
First controlled daily-use version: around 6-10 weeks.
Solid shop-ready version: around 3-5 months.
Full old-software replacement: around 6-12 months depending on reports, data import, and edge cases.
```

If they push for faster:

```text
We can prioritize the daily-use screens first, but accounting, stock, import, and reports should not be rushed because errors there affect real money and stock.
```

## Tomorrow Morning Checklist

Before meeting:

1. Restart laptop.
2. Open PowerShell.
3. Run:

```powershell
cd "C:\Users\stuvs\OneDrive\Documents\Goldland"
npm.cmd test
npm.cmd start
```

4. Open:

```text
http://localhost:4173
```

5. Login with:

```text
goldland2026
```

6. Refresh once after login so the versioned demo examples are installed.
7. Open Work Orders → Refining and confirm `NR00021`, `RR00009`, and `FR00004`.
8. Click every Refining and Melting inner tab once.
9. Keep this file open.
10. Keep `PRODUCTION_BUILD_ROADMAP.md` ready for roadmap discussion.
11. Do one full practice walkthrough before client arrives.

## If Something Goes Wrong

If the server is already running:

```text
Just open http://localhost:4173
```

If browser looks stale:

```text
Hard refresh the page.
```

If the client finds a bug:

Say:

```text
Good catch. I will add this to the prototype feedback list. This is exactly why we are reviewing before production implementation.
```

If a screen is incomplete:

Say:

```text
This screen is structurally placed. The final business logic will be completed after we confirm priority.
```

## Main Outcome Needed From Demo

The best result is not approval of every screen. The best result is:

```text
Client confirms module priority, print formats, required reports, and old data import needs.
```
