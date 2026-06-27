# Goldland Production Build Roadmap And Agent Handoff

Use this file as the master prompt/handoff for continuing the Goldland jewellery ERP project in Codex, Cursor, or any agentic IDE. The current codebase is a working browser prototype, not yet production software.

## Project Summary

Goldland is a jewellery ERP/POS system intended to replace an existing desktop jewellery accounting application. The current implementation is a dependency-free browser prototype with many old-software-style screens already built.

Workspace:

```text
C:\Users\stuvs\OneDrive\Documents\Goldland
```

Run:

```powershell
npm.cmd start
```

Open:

```text
http://localhost:4173
```

Test:

```powershell
npm.cmd test
```

Prototype password:

```text
goldland2026
```

## Current Status

The prototype currently includes:

- Sales, Purchase, Stock, Work Orders, Accounts, PDC, Management, Schemes, Reports navigation.
- Many old-software-style data entry screens.
- Sales invoice, sales return, sales order, purchase invoice, purchase return, direct purchase, direct purchase return, diamond purchase, DMD sales/return, DMD stone purchase screens.
- PDC issue, request, receipt, bank submission, cheque bounce, cheque represent screens.
- Stock register, stock adjustment, opening stock, gold deposit, gold withdrawal screens.
- Work order screens for smith, jeweller, cash-for-weight, refinery, melting, sample, polishing, service/job, complimentary items.
- Account screens for cash, bank, journal, direct entry, expense, bill-wise, custom voucher.
- Master windows for customer, supplier, smith, refiner, employee, item, account, miscellaneous.
- Basic live calculations in many entry rows.
- Local prototype state and a large planned SQL schema in `src/schema.sql`.
- Smoke tests in `tests/smoke.test.mjs`.

Important limitation:

The app is currently a prototype with mostly local/in-memory style behavior. It is not yet a production database-backed ERP.

## Important Existing Files

```text
src/app.js        Main application logic and screen rendering
src/styles.css    All UI styling
src/schema.sql    Planned production database schema
tests/smoke.test.mjs
server.mjs
README.md
CURSOR_AGENT_HANDOFF.md
```

## Development Rules For Future Agents

Follow these rules strictly:

- Do not rewrite the whole app unless explicitly asked.
- Prefer small, module-by-module production work.
- Keep old-software screen familiarity where the user has provided screenshots.
- Preserve existing menu names unless the user asks to rename them.
- Avoid breaking already working prototype flows.
- Run `node --check src\app.js` after JS edits.
- Run `npm.cmd test` after meaningful edits.
- If changing UI, inspect existing CSS patterns before adding new ones.
- Fix shared layout problems with shared classes when possible.
- Use focused screen-specific classes when a shared fix would damage other screens.
- Keep the app usable at `http://localhost:4173`.
- Treat client-facing demo work separately from production hardening.

## Final Product Requirements

### 1. Production Foundation

Required:

- Real database persistence.
- Migration/versioning system.
- Branch and financial year handling.
- User login.
- Role-based permissions.
- Audit logs for save, edit, delete, print, rate change, ledger repost.
- Backup and restore.
- Error logging.
- Production deployment plan.

Recommended production stack:

- Frontend: React + TypeScript or keep current prototype only as reference.
- Desktop shell: Tauri or Electron if Windows desktop app is required.
- Backend: .NET 8, NestJS, or another stable local API.
- Database: PostgreSQL or SQLite for single-shop local deployment.
- Backups: encrypted local backup plus optional cloud sync.

### 2. Sales Module

Required:

- Sales invoice.
- Sales return.
- Sales order.
- Additional order advance.
- Order advance refund.
- DMD return / DMD OP.
- DMD sales wholesale.
- Card/cash/UPI split payment.
- Discount handling.
- Refund handling.
- GST/cess/round-off.
- Print format.
- Search and edit old bills.
- Cancel/delete with reason and audit.
- Ledger posting.
- Stock posting.

### 3. Purchase Module

Required:

- Purchase invoice.
- Purchase return.
- Diamond purchase.
- Diamond purchase return.
- Direct purchase.
- Direct purchase return.
- DMD stone purchase.
- Supplier ledger posting.
- Stock posting.
- Tax handling.
- Search/edit/delete.
- Print/export.

### 4. Stock Module

Required:

- Stock register.
- Barcode entry.
- Opening stock account entry.
- Stock adjustments.
- Item transfer.
- Gold deposit.
- Gold withdrawal.
- HUID/BIS tracking.
- Item-wise and barcode-wise movement.
- Negative-stock rules.
- Stock ledger.
- Stock valuation.
- Gold/diamond/stone stock reports.

### 5. PDC Module

Required:

- PDC issue.
- PDC request.
- PDC receipt.
- Bank submission.
- Cheque bounce.
- Cheque represent.
- Status flow:
  - received
  - issued/requested
  - submitted
  - cleared
  - bounced
  - represented
- Party ledger connection.
- Bill-wise outstanding connection.
- PDC pending report.
- PDC print formats.

### 6. Accounts Module

Required:

- Account ledger.
- Cash receipt.
- Cash payment.
- Bank deposit.
- Bank withdrawal.
- Journal voucher.
- Direct entry.
- Expense entry.
- Bill-wise collection.
- Bill-wise payment.
- Discount credit note.
- Discount debit note.
- Custom voucher.
- Cash book.
- Bank book.
- Day book.
- Trial balance if required.
- Ledger report.
- Outstanding report.

### 7. Work Orders

Required:

- Smith work.
- Cash for weight smith.
- Jeweller work.
- Cash for weight jeweller.
- Refinery issue/return/final return.
- Melting issue/return.
- Sample issue/return.
- Polishing.
- Service/job.
- Complimentary item purchase/issue.
- Pending work reports.
- Weight reconciliation.
- Ledger posting where relevant.
- Stock posting.

### 8. Management / Masters

Required:

- Customer master.
- Supplier master.
- Smith master.
- Refiner master.
- Employee master.
- Item category.
- Miscellaneous.
- Item creation.
- Account creation.
- Import/export of masters.
- Duplicate prevention.
- Search/filter.

### 9. Reports

Minimum reports:

- Day summary.
- Sales report.
- Purchase report.
- Sales return report.
- Purchase return report.
- Stock report.
- Barcode/HUID stock report.
- Party ledger.
- Staff sales report.
- GST report.
- Outstanding report.
- PDC pending report.
- Cash book.
- Bank book.
- Work order pending report.
- Smith/jeweller/refinery balance reports.
- Scheme report.
- Audit report.

### 10. Printing And Export

Required:

- Sales invoice print.
- Purchase print.
- PDC receipt print.
- Ledger print.
- Stock report print.
- PDF export.
- Excel export.
- Browser print support at minimum.
- Thermal/normal printer support if client requires it.

### 11. Data Import

Required before go-live:

- Customer master import.
- Supplier/smith/refiner import.
- Employee import.
- Item master import.
- Account master import.
- Opening stock import.
- Opening ledger balance import.
- Pending PDC import.
- Scheme member import if used.
- Old bill history import if required.

## Recommended Build Phases

### Phase 0: Demo Stabilization

Goal:

Make the current prototype presentable to client.

Tasks:

- Fix visible layout overlap issues.
- Prepare realistic demo data.
- Hide or label unfinished flows.
- Confirm main menu/submenu structure.
- Prepare demo script.

Time estimate:

```text
2-5 days
```

### Phase 1: Production Architecture Decision

Goal:

Decide how this becomes real software.

Tasks:

- Choose final stack.
- Decide local desktop vs browser app.
- Decide database.
- Create persistence layer.
- Add migration system.
- Add logging and backup plan.

Time estimate:

```text
1-2 weeks
```

### Phase 2: Daily Billing MVP

Goal:

Make the first shop-usable version.

Priority modules:

- Sales invoice.
- Customer master.
- Item master.
- Rate update.
- Stock posting.
- Ledger posting.
- Invoice print.
- Basic sales report.

Time estimate:

```text
4-8 weeks
```

### Phase 3: Purchase And Stock MVP

Goal:

Make purchase and stock reliable.

Tasks:

- Purchase invoice.
- Purchase return.
- Direct purchase.
- Opening stock.
- Stock adjustments.
- Stock register.
- Stock ledger.
- Supplier ledger.

Time estimate:

```text
4-6 weeks
```

### Phase 4: Accounts And PDC

Goal:

Make accountant workflows usable.

Tasks:

- Cash/bank/journal.
- Bill-wise collection/payment.
- Custom voucher.
- Party ledger.
- PDC full lifecycle.
- Outstanding reports.

Time estimate:

```text
4-8 weeks
```

### Phase 5: Jewellery Workflows

Goal:

Complete jewellery-specific operations.

Tasks:

- Smith.
- Jeweller.
- Refinery.
- Melting.
- Sample.
- Polishing.
- Service/job.
- Diamond/DMD workflows.
- Gold deposit/withdrawal.

Time estimate:

```text
6-12 weeks
```

### Phase 6: Reports, Import, Hardening

Goal:

Prepare for go-live.

Tasks:

- All required reports.
- Print/export polish.
- Old data import.
- Permissions.
- Audit.
- Backup/restore.
- Performance.
- User acceptance testing.
- Bug fixing.

Time estimate:

```text
4-8 weeks
```

## Overall Time Estimate

For one developer:

```text
Client-demo prototype polish: 2-5 days
First daily-use MVP: 6-10 weeks
Solid shop-ready version: 3-5 months
Full old-software replacement: 6-12 months
```

Timeline depends heavily on:

- Number of final reports.
- Accuracy needed in accounting.
- Old data import complexity.
- Print format requirements.
- Number of client feedback cycles.
- Whether production architecture is a rewrite or incremental hardening.

## Suggested Client Communication

Use this wording:

```text
This is a working prototype to confirm screen structure, workflows, and module priority.
It is not yet the final production system.
After your feedback, we will convert it module by module into a database-backed production application.
The first daily-use version should focus on sales, purchase, stock, accounts, and printing.
```

Do not promise:

```text
Everything is almost finished.
All old software features are complete.
Reports are ready.
Production deployment is ready.
```

Better wording:

```text
This module is at prototype level.
This screen is ready for layout and workflow review.
This workflow needs production persistence and accounting posting next.
```

## Exact Next Agent Prompt

Use this prompt to continue safely:

```text
You are continuing the Goldland jewellery ERP project in C:\Users\stuvs\OneDrive\Documents\Goldland.
Read PRODUCTION_BUILD_ROADMAP.md, README.md, src/app.js, src/styles.css, src/schema.sql, and tests/smoke.test.mjs.

Do not rewrite the whole app.
Work module by module.
Preserve existing screen names and old-software familiarity.
Run node --check src\app.js and npm.cmd test after meaningful edits.

Current goal:
[REPLACE THIS WITH THE MODULE TASK]

Before editing, inspect existing patterns for this module.
After editing, summarize changed files and verification.
```

## Recommended Next Tasks

Recommended order from here:

1. Finish client-demo polish and remove obvious layout issues.
2. Prepare sample demo data.
3. Decide production stack.
4. Implement real persistence for Sales Invoice first.
5. Add customer/item master database save/load.
6. Add stock posting for Sales Invoice.
7. Add ledger posting for Sales Invoice.
8. Add invoice print format.
9. Expand to Purchase Invoice.
10. Expand to Accounts/PDC/Stock/Work Orders.

## Production Acceptance Checklist

Before calling this final:

- All core transactions save to database.
- All core transactions can be searched and reloaded.
- Edit/delete/cancel are audited.
- Stock posting is correct.
- Ledger posting is correct.
- Reports match accountant expectations.
- Print formats approved by client.
- User roles tested.
- Backup/restore tested.
- Old data imported or opening balances entered.
- Client has tested real scenarios.
- App can run on client machine without developer assistance.

