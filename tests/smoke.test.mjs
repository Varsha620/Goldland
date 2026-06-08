import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";

const app = await readFile("src/app.js", "utf8");
const css = await readFile("src/styles.css", "utf8");
const schema = await readFile("src/schema.sql", "utf8");

for (const section of ["Dashboard", "Billing", "Stock", "Customers", "Staffs", "Schemes", "Accounts", "Reports"]) {
  assert(app.includes(section), `Missing section ${section}`);
}

assert(app.includes("ACCESS_PASSWORD"), "Single password access is missing");
assert(!app.includes("roleSelect"), "Role selector should not exist");

for (const table of ["rate_history", "invoices", "stock_items", "scheme_collections", "journal_entries", "audit_logs"]) {
  assert(schema.includes(`create table ${table}`), `Missing table ${table}`);
}

assert(app.includes("rateSnapshot"), "Invoices must keep a frozen rate snapshot");
assert(app.includes("Update Shop Rate"), "Rate update workflow is missing");
assert(app.includes("Add New Bill"), "Bill entry window is missing");
assert(app.includes("Add New Item"), "Stock entry window is missing");
assert(app.includes("Add New Party"), "Party entry window is missing");
assert(app.includes("Add New Collection"), "Scheme collection window is missing");
assert(app.includes("Add New Account Entry"), "Account entry window is missing");
assert(app.includes("Print Customer Copy"), "Billing print option is missing");
assert(app.includes("invoicePreview"), "Printable invoice preview is missing");
assert(app.includes("Barcode"), "Billing barcode column is missing");
assert(app.includes("HUID/BIS"), "Stock HUID/BIS column is missing");
assert(app.includes("Member ID"), "Scheme member columns are missing");
assert(app.includes("Voucher No"), "Ledger voucher columns are missing");
assert(app.includes("Staff Maintenance"), "Staff maintenance feature is missing");
assert(app.includes("staffId"), "Billing staff ID capture is missing");
assert(app.includes("open-work-smith"), "Smith workflow action is missing");
assert(app.includes("open-work-jeweller"), "Jeweller workflow action is missing");
assert(app.includes("open-work-refiner"), "Refiner workflow action is missing");
assert(app.includes("Stock Workflow Register"), "Stock workflow register is missing");
assert(app.includes("partySection"), "Separate party sections are missing");
for (const partyType of ["Customers", "Suppliers", "Scheme Members", "Smiths", "Jewellers", "Refiners"]) {
  assert(app.includes(partyType), `Missing ${partyType} party list`);
}
assert(css.includes("backdrop-filter"), "Premium smooth UI treatment is missing");
assert(css.includes("@media print"), "Print stylesheet is missing");

console.log("Goldland smoke tests passed.");
