import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";

const app = await readFile("src/app.js", "utf8");
const css = await readFile("src/styles.css", "utf8");
const schema = await readFile("src/schema.sql", "utf8");

for (const section of ["Dashboard", "Sales", "Purchase", "Transactions", "Stock", "Management", "Schemes", "Accounts", "Reports"]) {
  assert(app.includes(section), `Missing section ${section}`);
}

assert(app.includes("ACCESS_PASSWORD"), "Single password access is missing");
assert(!app.includes("roleSelect"), "Role selector should not exist");

for (const table of ["rate_history", "invoices", "stock_items", "scheme_collections", "journal_entries", "audit_logs", "employees", "account_masters", "dmd_return_invoices", "dmd_return_lines", "dmd_sales_wholesale_invoices", "dmd_sales_wholesale_lines", "dmd_sales_wholesale_stones", "sales_order_advances", "sales_order_advance_refunds", "smith_work_orders", "smith_work_order_lines", "cash_weight_smith_entries", "cash_weight_smith_lines", "jeweller_work_orders", "jeweller_work_order_lines", "cash_weight_jeweller_entries", "cash_weight_jeweller_lines", "stock_adjustments", "stock_adjustment_lines", "gold_deposits", "gold_deposit_lines", "sample_issues", "sample_issue_lines", "sample_returns", "sample_return_lines", "refinery_issues", "refinery_issue_lines", "refinery_returns", "refinery_return_lines", "refinery_final_returns", "refinery_final_return_lines", "melting_issues", "melting_issue_lines", "melting_returns", "melting_return_lines", "billwise_collections", "billwise_collection_lines", "billwise_payments", "billwise_payment_lines", "billwise_credit_note_discounts", "billwise_credit_note_discount_lines", "billwise_debit_note_discounts", "billwise_debit_note_discount_lines", "complimentary_item_stock", "complimentary_item_purchases", "complimentary_item_purchase_lines", "complimentary_item_issues", "complimentary_item_issue_lines"]) {
  assert(schema.includes(`create table ${table}`), `Missing table ${table}`);
}

assert(app.includes("rateSnapshot"), "Invoices must keep a frozen rate snapshot");
assert(app.includes("Update Shop Rate"), "Rate update workflow is missing");
assert(app.includes("Bill Entry Details"), "Bill entry details window is missing");
assert(app.includes("Add New Item"), "Stock entry window is missing");
assert(app.includes("open-customer"), "Customer entry window is missing");
assert(app.includes("open-supplier"), "Supplier entry window is missing");
assert(app.includes("open-employee"), "Employee entry window is missing");
assert(app.includes("Add New Collection"), "Scheme collection window is missing");
assert(app.includes("Add New Account Entry"), "Account entry window is missing");
assert(app.includes("Print Customer Copy"), "Billing print option is missing");
assert(app.includes("invoicePreview"), "Printable invoice preview is missing");
assert(app.includes("todayBills"), "Bill register should filter to today's bills");
assert(app.includes("Today's Bill Register"), "Billing register should be clearly day-scoped");
assert(app.includes("data-sales-section"), "Sales navbar dropdown is missing");
assert(app.includes("data-purchase-section"), "Purchase navbar dropdown is missing");
for (const transactionScreen of ["Sales Invoice", "Sales Return", "DMD Return/DMD OP", "DMD Sales WholeSales", "Purchase Invoice", "Purchase Return"]) {
  assert(app.includes(transactionScreen), `Missing ${transactionScreen} screen`);
}
assert(app.includes("Barcode"), "Billing barcode column is missing");
assert(app.includes("HUID/BIS"), "Stock HUID/BIS column is missing");
assert(app.includes("Member ID"), "Scheme member columns are missing");
assert(app.includes("Voucher No"), "Ledger voucher columns are missing");
for (const billSection of ["Sales", "Exchange", "Return"]) {
  assert(app.includes(`data-billing-view="${billSection}"`) || app.includes(`billingView === item`), `Missing billing section ${billSection}`);
}
assert(app.includes("billingSections"), "Clean billing section switcher is missing");
assert(app.includes("calculateBillLine"), "Billing line calculation helper is missing");
assert(app.includes("billFinancials"), "Interrelated bill total calculation is missing");
assert(app.includes("parseEntryNumber"), "Editable billing fields need numeric parsing");
assert(app.includes("defaultEntryLine"), "Entry rows should reset to a clean default line");
assert(app.includes("moneyValue"), "Editable money fields should use raw numeric values");
assert(app.includes("applyBillFinancials"), "Bill totals should be reapplied after add/delete/payment changes");
assert(app.includes('input.addEventListener("change", recalc)'), "Entry rows should recalculate on dropdown/field changes");
assert(app.includes("gross || 0) - Number(line.stone"), "Net weight should be calculated as gross minus stone");
assert(app.includes("salesTotal - exchangeTotal - returnTotal"), "Invoice total should subtract exchange and return totals");
assert(!app.includes("Math.max(0, salesTotal + addition"), "Invoice total must allow negative refund bills");
assert(app.includes("Cash to be paid/refunded to customer"), "Negative invoice should show refund wording");
assert(app.includes("Additional Order Advance"), "Additional order advance screen is missing");
assert(app.includes("Order Advance Refund"), "Order advance refund screen is missing");
assert(app.includes("orderAdvanceSummary"), "Order advance calculation summary is missing");
assert(app.includes("Refund Amount"), "Refund amount should be displayed when final total is negative");
assert(app.includes("discountTotal"), "Discount total should be tracked in bill financials");
assert(app.includes("removeDiscount"), "Discount remove action is missing");
assert(app.includes("removableReadout"), "Discount rows need a remove/cross option");
assert(app.includes("row.inactive ? sum"), "Inactive or removed rows should not affect totals");
assert(app.includes("calculateMakingChargeWeight"), "MC weight calculation helper is missing");
assert(app.includes("Number(netWeight || 0) * (Number(vaPercent || 0) / 100)"), "MC must be calculated as net weight multiplied by VA%");
assert(app.includes("calculateMakingChargeAmount(makingChargeWeight, rate)"), "MC weight must be valued against the item rate");
assert(app.includes('autoCell("makingCharge"'), "Making charge should autofill instead of being manually typed");
assert(app.includes("MC/Grm"), "Complete bill table should include MC/Grm");
assert(app.includes("VA After Disc"), "Complete bill table should include VA after discount");
assert(app.includes("data-bill-calc"), "Bill modal should show live calculated net and amount");
assert(app.includes("appendEntryLine"), "Enter key should add the completed entry row to bill items");
assert(app.includes("deleteLineButton"), "Bill rows need a small delete option");
assert(app.includes("openCardTransactionsModal"), "Card transaction split window is missing");
assert(app.includes("data-card-transactions"), "Card (F8) should open transactions on double-click");
for (const transactionItem of ["Purchase Invoice", "Purchase Return", "Diamond Purchase", "Direct Purchase", "Sales Order", "Barcode Entry", "Transfers", "Stock Adjustments", "Refining", "Sample", "Gold Deposit / Withdrawal", "Complimentary", "Polishing", "Service", "Bill Wise Collection", "Bill Wise Payment", "Discount in Debit Note", "Discount in Credit Note", "Custom Voucher", "Opening Stock Account Entry"]) {
  assert(app.includes(transactionItem), `Missing transaction item ${transactionItem}`);
}
for (const billwiseFeature of ["billwiseTransactionScreen", "Billwise Collection", "Billwise Payment", "CreditNote Discount", "DebitNote Discount", "saveBillwiseAction", "deleteBillwiseAction", "autoAllocateBillwise"]) {
  assert(app.includes(billwiseFeature), `Missing billwise feature ${billwiseFeature}`);
}
for (const billwiseField of ["Invoice No", "InvoiceType", "Invoice Date", "Bill Amount", "TotalReceived", "Old/CNote", "DND", "Received", "Discount", "Balance", "Auto Allocate"]) {
  assert(app.includes(billwiseField), `Missing billwise field ${billwiseField}`);
}
for (const customVoucherFeature of ["customVoucherScreen", "saveCustomVoucher", "addCustomVoucherLine", "buildCustomVoucherLinesFromEntry", "setupCustomVoucherScreen", "searchCustomVoucher", "openCustomVoucher"]) {
  assert(app.includes(customVoucherFeature), `Missing custom voucher feature ${customVoucherFeature}`);
}
for (const customVoucherField of ["Account Type", "Settlement Type", "Confirm Before delete a Row", "Double_Click on Row to Delete", "Payment Date", "Saved Custom Vouchers"]) {
  assert(app.includes(customVoucherField), `Missing custom voucher field ${customVoucherField}`);
}
for (const customVoucherTable of ["create table custom_vouchers", "create table custom_voucher_lines"]) {
  assert(schema.includes(customVoucherTable), `Missing schema table ${customVoucherTable}`);
}
assert(app.includes("WORK_ORDER_ITEMS") && app.includes('"Complimentary Item"'), "Complimentary Item should be under Work Orders");
for (const complimentaryFeature of ["complimentaryModule", "complimentaryPurchaseScreen", "complimentaryIssueScreen", "complimentaryPurchaseFinancials", "rebuildComplimentaryStock", "saveComplimentaryPurchase", "saveComplimentaryIssue", "setupComplimentaryScreens", "validateComplimentaryIssueStock", "complimentaryStockAvailable"]) {
  assert(app.includes(complimentaryFeature), `Missing complimentary feature ${complimentaryFeature}`);
}
for (const complimentaryField of ["Complimentary Item Purchase", "Complimentary Item Issue", "Complimentary Item Sales / Issue", "Issue Type", "Invoice No", "FOC", "Del All Rows", "Complimentary Stock Balance"]) {
  assert(app.includes(complimentaryField), `Missing complimentary field ${complimentaryField}`);
}
for (const dmdFeature of ["dmdReturnFinancials", "dmdWholesaleFinancials", "dmdReturnEntryColumns", "dmdWholesaleEntryColumns", "dmdStoneEntryColumns", "staffDropdownCell", "readDmdReturnEntryLine", "readDmdWholesaleEntryLine", "readDmdStoneEntryLine"]) {
  assert(app.includes(dmdFeature), `Missing DMD sales feature ${dmdFeature}`);
}
for (const dmdField of ["Precious Wght", "Diamond Wt/Cent", "Colour Stone Wt", "Pure Wght", "Rate RTGS", "Crt/Cent Rate", "DmdWgt", "Stn S.price", "Pur. MC", "Sales MC"]) {
  assert(app.includes(dmdField), `Missing DMD field ${dmdField}`);
}
assert(app.includes("transactionGroup"), "Structured transaction launcher is missing");
for (const billField of ["Prepare eINVOICE", "Cust ID", "MudLess", "Touch Less", "RateLess%", "CessPerc", "HUID"]) {
  assert(app.includes(billField), `Missing bill field ${billField}`);
}
for (const diamondField of ["IID", "IName", "Color Type", "Colour Scale", "Shape", "Cut", "Clarity", "Seive", "Carat / Cent", "Selling Rate"]) {
  assert(app.includes(diamondField), `Missing diamond bill field ${diamondField}`);
}
for (const billingUx of ["billing-focus-grid", "form-section", "B2B", "GPay / UPI", "Notes / cash", "transactionRef"]) {
  assert(app.includes(billingUx) || css.includes(billingUx), `Missing billing UX element ${billingUx}`);
}
assert(app.includes("setupBillModal"), "Bill section selector should change modal fields");
assert(app.includes("data-section-preview"), "Bill modal needs section-specific row previews");
for (const groupClass of ["form-section-grid compact", "form-section-grid two"]) {
  assert(app.includes(groupClass) || css.includes(groupClass), `Missing grouped modal layout ${groupClass}`);
}
assert(app.includes("Save (F9)"), "Billing toolbar is missing");
assert(app.includes("Employee Master"), "Employee maintenance feature is missing");
assert(app.includes("staffId"), "Billing staff ID capture is missing");
for (const customerField of ["Opening Balance", "Opening Weight", "State/Province", "PAN/GST", "PIN Code", "Mobile", "Email Address", "Aadhar", "D-O-Birth", "Join"]) {
  assert(app.includes(customerField), `Missing customer master field ${customerField}`);
}
assert(app.includes("upsertCustomerFromBill"), "Billing should store customer master details");
for (const customerColumn of ["customer_code", "opening_balance", "state_province", "pan_gst", "aadhaar", "join_date", "gstin", "website", "touch"]) {
  assert(schema.includes(customerColumn), `Missing customer schema column ${customerColumn}`);
}
assert(app.includes("open-work-smith"), "Smith workflow action is missing");
assert(app.includes("open-stock-adjustment"), "Stock adjustment action is missing");
assert(app.includes("open-work-cash-smith"), "Cash for Weight Smith workflow action is missing");
assert(app.includes("open-work-jeweller"), "Jeweller workflow action is missing");
assert(app.includes("open-work-cash-jeweller"), "Cash for Weight Jeweller workflow action is missing");
assert(app.includes("open-work-refiner"), "Refiner workflow action is missing");
assert(app.includes("Stock Workflow Register"), "Stock workflow register is missing");
for (const smithFeature of ["smithWorkOrderScreen", "cashForWeightSmithScreen", "readSmithWorkEntryLine", "readCashWeightSmithEntryLine", "saveSmithWork", "saveCashWeightSmith", "smithWorkFinancials", "cashWeightSmithFinancials"]) {
  assert(app.includes(smithFeature), `Missing Smith workflow feature ${smithFeature}`);
}
for (const smithField of ["Skip Stone", "Item Touch", "Post Only MC", "Smith Touch /", "SM Wght", "Stn Chge", "HMC", "On Account", "Convert", "Net Weight"]) {
  assert(app.includes(smithField), `Missing Smith workflow field ${smithField}`);
}
for (const jewellerFeature of ["jewellerWorkOrderScreen", "cashForWeightJewellerScreen", "readJewellerWorkEntryLine", "readCashWeightJewellerEntryLine", "saveJewellerWork", "saveCashWeightJeweller", "jewellerWorkFinancials", "cashWeightJewellerFinancials"]) {
  assert(app.includes(jewellerFeature), `Missing Jeweller workflow feature ${jewellerFeature}`);
}
for (const jewellerField of ["Jeweller Touch", "Cash for Weight Jeweller", "JW Wght", "JwWght", "MC Amt", "Pure Wght", "AccRepost", "Auto Barcode", "Ledger Post", "Bar Slno", "GType", "IType"]) {
  assert(app.includes(jewellerField), `Missing Jeweller workflow field ${jewellerField}`);
}
for (const stockAdjustmentFeature of ["stockAdjustmentScreen", "readStockAdjustmentEntryLine", "saveStockAdjustment", "applyStockAdjustmentLineToStock"]) {
  assert(app.includes(stockAdjustmentFeature), `Missing Stock Adjustment feature ${stockAdjustmentFeature}`);
}
for (const stockAdjustmentField of ["Nos Add", "Gross Add", "Stone Add", "Nos Less", "Gross Less", "Stone Less", "Closing Nos", "Closing Gross", "Closing Stone"]) {
  assert(app.includes(stockAdjustmentField), `Missing Stock Adjustment field ${stockAdjustmentField}`);
}
for (const goldDepositFeature of ["goldDepositScreen", "readGoldDepositEntryLine", "saveGoldDeposit", "applyGoldDepositLineToStock", "goldDepositFinancials"]) {
  assert(app.includes(goldDepositFeature), `Missing Gold Deposit feature ${goldDepositFeature}`);
}
for (const goldDepositField of ["Gold Deposit", "Gold Deposit Withdrawal", "By Amount", "PrtyWgt", "Balance Weight/Amount", "Total Weight/Amount"]) {
  assert(app.includes(goldDepositField), `Missing Gold Deposit field ${goldDepositField}`);
}
for (const sampleFeature of ["sampleWorkOrders", "sampleScreen", "readSampleEntryLine", "saveSample", "sampleFinancials", "applySampleLineToStock"]) {
  assert(app.includes(sampleFeature), `Missing Sample workflow feature ${sampleFeature}`);
}
for (const sampleField of ["Sample Issue", "Sample Return", "Jeweller", "Show Rate", "Total Amount", "HMC"]) {
  assert(app.includes(sampleField), `Missing Sample workflow field ${sampleField}`);
}
assert(!app.includes('["Branch Transfer", "", "open-work-transfer"]'), "Branch Transfer should not be shown under Stock transfers");
assert(!app.includes('["Location Transfer", "", "open-work-transfer"]'), "Location Transfer should not be shown under Stock transfers");
for (const refineryFeature of ["refineryIssueScreen", "refineryReturnScreen", "refineryFinalReturnScreen", "readRefineryIssueEntryLine", "saveRefineryIssue", "saveRefineryReturn", "saveRefineryFinalReturn", "refineryIssueFinancials", "refineryReturnFinancials", "refineryFinalFinancials"]) {
  assert(app.includes(refineryFeature), `Missing refinery workflow feature ${refineryFeature}`);
}
for (const refineryField of ["Expected Touch", "Refinary Pending", "Bottle Stock Weight", "Reissue Weight", "Aciding Loss", "Issued, Refined Amt", "Refiner charge"]) {
  assert(app.includes(refineryField), `Missing refinery workflow field ${refineryField}`);
}
for (const meltingFeature of ["meltingIssueScreen", "meltingReturnScreen", "readMeltingIssueEntryLine", "saveMeltingIssue", "saveMeltingReturn", "meltingIssueFinancials", "meltingReturnFinancials"]) {
  assert(app.includes(meltingFeature), `Missing melting workflow feature ${meltingFeature}`);
}
for (const meltingField of ["Melting Issue", "Melting Return", "Issue Type", "Pending", "Melting Loss", "Bottle Stock Weight"]) {
  assert(app.includes(meltingField), `Missing melting workflow field ${meltingField}`);
}
assert(app.includes("data-management"), "Management navbar dropdown is missing");
assert(app.includes("managementPartyWindow"), "Separate management windows are missing");
assert(app.includes("managementView"), "Management subsection state is missing");
for (const partyType of ["Customer Master", "Supplier Master", "Smith Master", "Refiner Master", "Employee Master", "Item Creation", "Account Creation"]) {
  assert(app.includes(partyType), `Missing ${partyType} party list`);
}
assert(app.includes("open-item-master"), "Item creation action is missing");
assert(app.includes("itemCreationWindow"), "Item creation management window is missing");
assert(app.includes("normalizeItemMaster"), "Item master normalization is missing");
assert(app.includes("itemMasters"), "Item master collection is missing");
assert(schema.includes("create table item_masters"), "Item master schema table is missing");
for (const itemField of ["Regional Name", "Sub Group", "Product", "Brand", "Model", "HSN / TAX", "Type, Wastage", "VA%", "MC/Gram", "Weight Details", "Opening", "Closing", "Ornament", "Barcode Compulsory", "Reserved Item", "Hide in Stock Reports"]) {
  assert(app.includes(itemField), `Missing item creation field ${itemField}`);
}
for (const masterField of ["GSTIN", "Fax", "Website", "Touch", "Conv. Touch", "Wastage", "Point Card No", "Basic Salary", "TA", "DA", "HRA", "Admin ONLY"]) {
  assert(app.includes(masterField), `Missing management master field ${masterField}`);
}
assert(css.includes("backdrop-filter"), "Premium smooth UI treatment is missing");
assert(css.includes("@media print"), "Print stylesheet is missing");

console.log("Goldland smoke tests passed.");
