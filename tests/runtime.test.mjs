import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
import vm from "node:vm";
import { webcrypto } from "node:crypto";

const appSource = await readFile("src/app.js", "utf8");
const storage = new Map();
const storageApi = {
  getItem(key) {
    return storage.has(key) ? storage.get(key) : null;
  },
  setItem(key, value) {
    storage.set(key, String(value));
  },
  removeItem(key) {
    storage.delete(key);
  }
};
const appElement = { innerHTML: "" };
const documentStub = {
  body: {
    insertAdjacentHTML() {},
    addEventListener() {}
  },
  getElementById(id) {
    return id === "app" ? appElement : null;
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  addEventListener() {
  }
};

const context = vm.createContext({
  console,
  crypto: webcrypto,
  structuredClone,
  localStorage: storageApi,
  sessionStorage: storageApi,
  document: documentStub,
  window: { print() {} },
  FormData,
  setTimeout() {},
  clearTimeout() {},
  Date,
  Math,
  Number,
  String,
  Boolean,
  Array,
  Object,
  Map,
  Set,
  JSON,
  Intl,
  URL
});
vm.runInContext(appSource, context, { filename: "src/app.js" });

assert(appElement.innerHTML.includes("Enter shop password"), "Application did not render the login screen");

const profitReportCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, shown: true, from: "01/01/2025", to: "31/12/2026", profitGroup: "item", profitTransaction: "all" };
  ({ config: salesProfitConfig(), markup: salesProfitReportScreen() });
`, context);
const expectedProfitColumns = [
  "Date", "item_Categ", "Ornament", "BillNo", "BarCode", "Gross_Weight", "Stone_Weight", "Net_Weight",
  "Gold_Amount", "stone_Charge", "Making_Charge", "Diamond_Carat", "Diamond_Amount", "Taxable", "ItaxAmt",
  "IAmount", "Discount", "LineExchange", "Line_Return", "Order_Amount", "Scheme_Less", "Rate_Diff", "Advance",
  "Received", "LineVp", "LineVp_inRs"
];
assert.deepEqual(Array.from(profitReportCheck.config.columns, (column) => column.label), expectedProfitColumns, "Sales Profit columns no longer match the supplied By Item screen");
assert(profitReportCheck.markup.includes('value="item"') && profitReportCheck.markup.includes('value="invoice"') && profitReportCheck.markup.includes('value="date"'), "Sales Profit grouping options are incomplete");
assert(profitReportCheck.markup.includes('value="sales"') && profitReportCheck.markup.includes('value="return"') && profitReportCheck.markup.includes('value="all"'), "Sales Profit transaction options are incomplete");
const invoiceProfitCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, profitGroup: "invoice" };
  salesProfitConfig();
`, context);
const expectedInvoiceProfitColumns = [
  "Date", "item_Categ", "Ornament", "BillNo", "Gross_Weight", "Stone_Weight", "Net_Weight", "Gold_Amount",
  "stone_Charge", "Making_Charge", "Diamond_Carat", "Diamond_Amount", "Taxable", "ItaxAmt", "IAmount",
  "Discount", "LineExchange", "Line_Return", "Order_Amount", "Scheme_Less", "Rate_Diff", "Advance", "Received", "LineVp_in"
];
assert.deepEqual(Array.from(invoiceProfitCheck.columns, (column) => column.label), expectedInvoiceProfitColumns, "Sales Profit columns no longer match the supplied By Invoice screen");
assert(!invoiceProfitCheck.columns.some((column) => column.key === "barcode"), "By Invoice must not show item barcodes");
assert.equal(new Set(Array.from(invoiceProfitCheck.rows, (row) => `${row.billNumber}|${row.transactionType}`)).size, invoiceProfitCheck.rows.length, "By Invoice must contain exactly one row per bill and transaction type");
const dateProfitCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, profitGroup: "date" };
  salesProfitConfig();
`, context);
const expectedDateProfitColumns = [
  "Date", "item_Categ", "Ornament", "Gross_Weight", "Stone_Weight", "Net_Weight", "Gold_Amount", "stone_Charge",
  "Making_Charge", "Diamond_Carat", "Diamond_Amount", "Taxable", "ItaxAmt", "IAmount", "Discount", "LineExchange",
  "Line_Return", "Order_Amount", "Scheme_Less", "Rate_Diff", "Advance", "Received", "LineVp_da"
];
assert.deepEqual(Array.from(dateProfitCheck.columns, (column) => column.label), expectedDateProfitColumns, "Sales Profit columns no longer match the supplied By Date screen");
assert(!dateProfitCheck.columns.some((column) => ["billNumber", "barcode"].includes(column.key)), "By Date must not show bill numbers or item barcodes");
assert.equal(new Set(Array.from(dateProfitCheck.rows, (row) => `${row.date}|${row.itemCategory}|${row.ornament}|${row.transactionType}`)).size, dateProfitCheck.rows.length, "By Date must contain one row per date, item category, ornament flag, and transaction type");
const salesOnlyProfitCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, profitGroup: "date", profitTransaction: "sales" };
  ({ config: salesProfitConfig(), markup: salesProfitReportScreen(), title: salesProfitTransactionTitle() });
`, context);
assert.equal(salesOnlyProfitCheck.title, "Sales Only", "Sales filter must use the Sales Only report title");
assert(salesOnlyProfitCheck.markup.includes("Sales Only&nbsp;&nbsp; Report From"), "Sales-only heading is missing from Sales Profit");
assert(salesOnlyProfitCheck.config.rows.every((row) => row.transactionType === "Sales"), "Sales filter leaked return rows into Sales Profit");
const returnOnlyProfitCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, profitGroup: "date", profitTransaction: "return", from: "21/07/2026", to: "21/07/2026" };
  ({ config: salesProfitConfig(), markup: salesProfitReportScreen(), title: salesProfitTransactionTitle() });
`, context);
assert.equal(returnOnlyProfitCheck.title, "Return Only", "Return filter must use the exact Return Only report title");
assert(returnOnlyProfitCheck.markup.includes("Return Only&nbsp;&nbsp; Report From"), "Return-only heading is missing from Sales Profit");
assert(returnOnlyProfitCheck.config.rows.every((row) => row.transactionType === "Return"), "Return filter leaked sales rows into Sales Profit");
if (!returnOnlyProfitCheck.config.rows.length) {
  assert(!returnOnlyProfitCheck.markup.includes("No data found"), "Empty Return report must retain a blank report grid");
  assert(returnOnlyProfitCheck.markup.includes("<td>*</td>"), "Empty Return report must retain its totals marker");
}
const profitCombinationCheck = vm.runInContext(`
  ["item", "invoice", "date"].flatMap((group) => ["sales", "return", "all"].map((transaction) => {
    salesReportOptions = { ...salesReportOptions, profitGroup: group, profitTransaction: transaction };
    const config = salesProfitConfig();
    const markup = salesProfitToolbar();
    return {
      group,
      transaction,
      retainedGroup: salesReportOptions.profitGroup,
      retainedTransaction: salesReportOptions.profitTransaction,
      checkedRadios: (markup.match(/ checked/g) || []).length,
      rowTypes: [...new Set(config.rows.map((row) => row.transactionType))]
    };
  }));
`, context);
assert.equal(profitCombinationCheck.length, 9, "Sales Profit must support all nine grouping and transaction combinations");
for (const combination of profitCombinationCheck) {
  assert.equal(combination.retainedGroup, combination.group, "Changing transaction mode reset the grouping mode");
  assert.equal(combination.retainedTransaction, combination.transaction, "Changing grouping mode reset the transaction mode");
  assert.equal(combination.checkedRadios, 2, "Exactly one radio must be selected in each Sales Profit option group");
  if (combination.transaction !== "all") {
    assert(Array.from(combination.rowTypes).every((type) => type === (combination.transaction === "sales" ? "Sales" : "Return")), "Transaction radio returned rows from the other transaction type");
  }
}
const salesReturnReportCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, shown: true, from: "01/01/2025", to: "31/12/2026", returnReportOption: "Sales Return Report" };
  ({ config: salesReturnReportConfig(), markup: salesReturnReportScreen() });
`, context);
const expectedSalesReturnColumns = [
  "BillNo", "PartyID", "PartyName", "Category", "Salesman", "BranchENo", "EDate", "ItemID", "ItemName", "Barcode",
  "Description", "Qty", "GrossWeight", "StoneWeight", "NetWeight", "VAPercentage", "MC", "Rate", "Total", "Type"
];
assert.deepEqual(Array.from(salesReturnReportCheck.config.columns, (column) => column.label), expectedSalesReturnColumns, "Sales Return Report columns no longer match the supplied screen");
assert(salesReturnReportCheck.markup.includes("Sales Return Register") && salesReturnReportCheck.markup.includes("Sales Return Report"), "Sales Return dropdown options are incomplete");
assert(salesReturnReportCheck.config.rows.every((row) => row.sourceSection === "return"), "Sales Return Report contains a non-return bill line");
assert(salesReturnReportCheck.config.rows.every((row) => row.sourceBillId || row.sourceEntryNo || row.sourceBillNo), "Sales Return rows must retain bill drill-down identity");
const salesReturnRegisterCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, returnReportOption: "Sales Return Register" };
  salesReturnReportConfig();
`, context);
assert(salesReturnRegisterCheck.rows.length <= salesReturnReportCheck.config.rows.length, "Sales Return Register must aggregate return lines by bill");
const expectedSalesReturnRegisterColumns = [
  "BillNo", "Branch_ENo", "RefNo", "EDate", "Empcode", "EmpName", "PartyID", "PartyName", "PartyAddress", "Remark",
  "InvoiceTotal", "GST", "CGST", "SGST", "Addition", "Discount", "BillAmount", "Balance"
];
assert.deepEqual(Array.from(salesReturnRegisterCheck.columns, (column) => column.label), expectedSalesReturnRegisterColumns, "Sales Return Register columns no longer match the supplied screen");
for (const row of salesReturnRegisterCheck.rows) {
  assert.equal(Number((row.cgst + row.sgst).toFixed(6)), Number(row.gst.toFixed(6)), "Sales Return Register CGST and SGST must split GST equally");
  assert.equal(Number(row.billAmount.toFixed(6)), Number((row.invoiceTotal + row.gst + row.addition - row.discount).toFixed(6)), "Sales Return Register bill amount calculation is inconsistent");
  assert(row.sourceBillId || row.sourceEntryNo || row.sourceBillNo, "Sales Return Register row lost its bill drill-down identity");
}
const salesReturnDrillCheck = vm.runInContext(`(() => {
  salesReportOptions = { ...salesReportOptions, returnReportOption: "Sales Return Report" };
  const row = salesReturnReportConfig().rows[0];
  if (!row) return { skipped: true };
  openReportBillDetail({ dataset: {
    reportBillId: row.sourceBillId || "",
    reportEntryNo: row.sourceEntryNo || "",
    reportBillNo: row.sourceBillNo || "",
    reportSection: "return"
  }});
  return { skipped: false, active, salesView, loadedBillId: state.bills[0]?.id, expectedBillId: row.sourceBillId };
})()`, context);
if (!salesReturnDrillCheck.skipped) {
  assert.equal(salesReturnDrillCheck.active, "Sales", "Sales Return drill-down must open the Sales module");
  assert.equal(salesReturnDrillCheck.salesView, "Sales Return", "Sales Return drill-down must open the existing return bill editor");
  assert.equal(salesReturnDrillCheck.loadedBillId, salesReturnDrillCheck.expectedBillId, "Sales Return drill-down opened the wrong saved bill");
}
assert(appSource.includes('row.addEventListener("dblclick", () => openReportBillDetail(row))'), "Sales Return report rows must use double-click drill-down");
const exchangeRegisterCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, shown: true, from: "01/01/2025", to: "31/12/2026", exchangeReportOption: "Register" };
  ({ config: exchangeReportConfig(), markup: exchangeReportScreen() });
`, context);
const expectedExchangeRegisterColumns = ["EntryNo", "RefNo", "EDate", "PurMode", "PartyID", "PartyName", "PartyAddress", "BillAmount", "Addition", "Discount", "GST", "InvoiceTotal", "CashPaid", "Balance"];
assert.deepEqual(Array.from(exchangeRegisterCheck.config.columns, (column) => column.label), expectedExchangeRegisterColumns, "Exchange Register columns no longer match the supplied screen");
for (const option of ["Register", "Item Wise", "Salesman Wise", "Salesman Summary"]) assert(exchangeRegisterCheck.markup.includes(`>${option}</option>`) || exchangeRegisterCheck.markup.includes(`>${option}</`), `Exchange dropdown is missing ${option}`);
assert(exchangeRegisterCheck.config.rows.every((row) => row.drillTarget === "purchase"), "Exchange Register rows must target Purchase Entry");
for (const row of exchangeRegisterCheck.config.rows) assert.equal(Number(row.invoiceTotal.toFixed(6)), Number((row.billAmount + row.addition - row.discount + row.gst).toFixed(6)), "Exchange Register invoice total calculation is inconsistent");
const exchangeDrillCheck = vm.runInContext(`(() => {
  const row = exchangeReportConfig().rows[0];
  if (!row) return { skipped: true };
  openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: row.sourceBillNo, reportSection: "exchange", reportTarget: "purchase" } });
  return { skipped: false, active, purchaseView, loadedBillId: state.bills[0]?.id, expectedBillId: row.sourceBillId };
})()`, context);
if (!exchangeDrillCheck.skipped) {
  assert.equal(exchangeDrillCheck.active, "Purchase", "Exchange drill-down must open Purchase");
  assert.equal(exchangeDrillCheck.purchaseView, "Purchase Invoice", "Exchange drill-down must open Purchase Invoice");
  assert.equal(exchangeDrillCheck.loadedBillId, exchangeDrillCheck.expectedBillId, "Exchange drill-down opened the wrong purchase bill");
}
const exchangeItemWiseCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, exchangeReportOption: "Item Wise" };
  exchangeReportConfig();
`, context);
const expectedExchangeItemWiseColumns = [
  "EntryNo", "EDate", "ItemName", "ItemDescription", "Nos", "GrossWeight", "WeightLess", "MudLess", "Rate",
  "StoneCharge", "TouchPerc", "TouchLess", "StoneWeight", "NetWeight", "Amount"
];
assert.deepEqual(Array.from(exchangeItemWiseCheck.columns, (column) => column.label), expectedExchangeItemWiseColumns, "Exchange Item Wise columns no longer match the supplied screen");
assert(exchangeItemWiseCheck.rows.every((row) => row.drillTarget === "purchase" && (row.sourceBillId || row.sourceEntryNo || row.sourceBillNo)), "Exchange Item Wise rows lost their Purchase Entry drill-down identity");
for (const row of exchangeItemWiseCheck.rows) {
  assert(Number.isFinite(row.grossWeight) && Number.isFinite(row.weightLess) && Number.isFinite(row.netWeight) && Number.isFinite(row.amount), "Exchange Item Wise calculated fields must be numeric");
}
const exchangeSalesmanWiseCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, exchangeReportOption: "Salesman Wise" };
  exchangeReportConfig();
`, context);
const expectedExchangeSalesmanWiseColumns = [
  "SalesMan", "EntryNo", "tDate", "IID", "Item_Name", "QTY", "GrossWt", "StoneWt", "Mudless", "TouchLess",
  "WeightLess", "NetWt", "Rate", "Amount"
];
assert.deepEqual(Array.from(exchangeSalesmanWiseCheck.columns, (column) => column.label), expectedExchangeSalesmanWiseColumns, "Exchange Salesman Wise columns no longer match the supplied screen");
assert(exchangeSalesmanWiseCheck.rows.every((row) => row.drillTarget === "purchase" && (row.sourceBillId || row.sourceEntryNo || row.sourceBillNo)), "Exchange Salesman Wise rows lost their Purchase Entry drill-down identity");
for (let index = 1; index < exchangeSalesmanWiseCheck.rows.length; index += 1) {
  const previous = exchangeSalesmanWiseCheck.rows[index - 1];
  const current = exchangeSalesmanWiseCheck.rows[index];
  assert(`${previous.salesman}|${previous.entryNo}`.localeCompare(`${current.salesman}|${current.entryNo}`) <= 0, "Exchange Salesman Wise rows must be ordered by salesperson and entry number");
}
const exchangeSalesmanSummaryCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, exchangeReportOption: "Salesman Summary" };
  exchangeReportConfig();
`, context);
const expectedExchangeSalesmanSummaryColumns = ["SalesMan", "QTY", "GrossWt", "StoneWt", "Mudless", "TouchLess", "WeightLess", "NetWt", "Amount"];
assert.deepEqual(Array.from(exchangeSalesmanSummaryCheck.columns, (column) => column.label), expectedExchangeSalesmanSummaryColumns, "Exchange Salesman Summary columns no longer match the supplied screen");
assert.equal(new Set(Array.from(exchangeSalesmanSummaryCheck.rows, (row) => row.salesman)).size, exchangeSalesmanSummaryCheck.rows.length, "Exchange Salesman Summary must contain one row per salesperson");
const salesmanDetailTotals = Object.fromEntries(exchangeSalesmanWiseCheck.columns.filter((column) => column.total).map((column) => [column.key, exchangeSalesmanWiseCheck.rows.reduce((sum, row) => sum + Number(row[column.key] || 0), 0)]));
for (const key of ["quantity", "grossWeight", "stoneWeight", "mudLess", "touchLess", "weightLess", "netWeight", "amount"]) {
  assert.equal(Number(exchangeSalesmanSummaryCheck.totals[key].toFixed(6)), Number(salesmanDetailTotals[key].toFixed(6)), `Exchange Salesman Summary ${key} total must reconcile with Salesman Wise`);
}
const purchaseRegisterCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, shown: true, from: "01/01/2025", to: "31/12/2026", purchaseReportOption: "Purchase Register" };
  ({ config: purchaseReportConfig(), markup: purchaseReportScreen() });
`, context);
const expectedPurchaseRegisterColumns = [
  "EntryNo", "RefNo", "EDate", "PurMode", "PartyID", "PartyName", "PartyAddress", "NetWeight", "BillAmount",
  "Addition", "Discount", "GST", "CGST", "SGST", "CessAmt", "InvoiceTotal", "CashPaid", "Balance"
];
assert.deepEqual(Array.from(purchaseRegisterCheck.config.columns, (column) => column.label), expectedPurchaseRegisterColumns, "Purchase Register columns no longer match the supplied screens");
for (const option of ["Purchase Register", "Item wise", "Salesman Wise", "Salesman Summary", "Purchase Register-All", "Item wise-All", "DMD Bulk Purchase - Summary", "DMD Bulk Purchase - Details"]) {
  assert(purchaseRegisterCheck.markup.includes(`>${option}</option>`) || purchaseRegisterCheck.markup.includes(`>${option}</`), `Purchase report dropdown is missing ${option}`);
}
for (const row of purchaseRegisterCheck.config.rows) {
  assert.equal(Number((row.cgst + row.sgst).toFixed(6)), Number(row.gst.toFixed(6)), "Purchase Register CGST and SGST must reconcile to GST");
  assert.equal(Number(row.invoiceTotal.toFixed(6)), Number((row.billAmount + row.addition - row.discount + row.gst + row.cessAmount).toFixed(6)), "Purchase Register invoice calculation is inconsistent");
  assert(Number.isFinite(row.netWeight), "Purchase Register NetWeight must be numeric");
}
const purchaseOptionChecks = vm.runInContext(`
  PURCHASE_REPORT_OPTIONS.map((option) => {
    salesReportOptions = { ...salesReportOptions, purchaseReportOption: option };
    const config = purchaseReportConfig();
    return { option, columns: config.columns.length, rows: config.rows.length, hasTotals: Boolean(config.totals) };
  });
`, context);
assert.equal(purchaseOptionChecks.length, 8, "All eight Purchase report options must be implemented");
assert(purchaseOptionChecks.every((item) => item.columns > 0 && item.hasTotals), "Every Purchase report option must provide columns and calculated totals");
const purchaseItemWiseCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, purchaseReportOption: "Item wise" };
  purchaseReportConfig();
`, context);
const expectedPurchaseItemWiseColumns = [
  "EntryNo", "EDate", "ItemName", "Description", "PartyName", "Nos", "GrossWeight", "WeightLess", "MudLess", "Rate",
  "StoneCharge", "TouchPerc", "TouchLess", "StoneWeight", "NetWeight", "Amount"
];
assert.deepEqual(Array.from(purchaseItemWiseCheck.columns, (column) => column.label), expectedPurchaseItemWiseColumns, "Purchase Item wise columns no longer match the supplied screens");
assert(purchaseItemWiseCheck.rows.every((row) => row.drillTarget === "purchase" && (row.sourceBillId || row.sourceEntryNo || row.sourceBillNo)), "Purchase Item wise rows lost their Purchase Entry drill-down identity");
for (const row of purchaseItemWiseCheck.rows) {
  for (const key of ["nos", "grossWeight", "weightLess", "mudLess", "rate", "stoneCharge", "touchPercentage", "touchLess", "stoneWeight", "netWeight", "amount"]) {
    assert(Number.isFinite(row[key]), `Purchase Item wise ${key} must be numeric`);
  }
}
const purchaseRegisterAllCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, purchaseReportOption: "Purchase Register-All" };
  purchaseReportConfig();
`, context);
const expectedPurchaseRegisterAllColumns = [
  "Purchase_Mode", "EntryNo", "RefNo", "EDate", "PurMode", "PartyID", "PartyName", "PartyAddress", "BillAmount",
  "Addition", "Discount", "GST", "CGST", "SGST", "CessAmt", "InvoiceTotal", "CashPaid", "Balance"
];
assert.deepEqual(Array.from(purchaseRegisterAllCheck.columns, (column) => column.label), expectedPurchaseRegisterAllColumns, "Purchase Register-All columns no longer match the supplied screens");
assert(!purchaseRegisterAllCheck.columns.some((column) => column.key === "netWeight"), "Purchase Register-All must not include NetWeight");
for (const row of purchaseRegisterAllCheck.rows) {
  assert(row.purchaseSource, "Purchase Register-All row must identify its purchase source");
  assert(row.drillTarget === "purchase" && row.drillStorage && (row.sourceBillId || row.sourceEntryNo || row.sourceBillNo), "Purchase Register-All row lost detailed purchase drill-down identity");
  assert.equal(Number(row.invoiceTotal.toFixed(6)), Number((row.billAmount + row.addition - row.discount + row.gst + row.cessAmount).toFixed(6)), "Purchase Register-All invoice calculation is inconsistent");
}
const purchaseRegisterAllDrillCheck = vm.runInContext(`(() => {
  salesReportOptions = { ...salesReportOptions, purchaseReportOption: "Purchase Register-All" };
  const row = purchaseReportConfig().rows.find((item) => item.drillStorage && item.sourceBillId) || purchaseReportConfig().rows[0];
  if (!row) return { skipped: true };
  openReportBillDetail({ dataset: {
    reportBillId: row.sourceBillId || "",
    reportEntryNo: row.sourceEntryNo || "",
    reportBillNo: row.sourceBillNo || "",
    reportSection: "exchange",
    reportTarget: "purchase",
    reportStorage: row.drillStorage,
    reportView: row.drillView
  }});
  return { skipped: false, active, purchaseView, expectedView: row.drillView, loadedId: state[row.drillStorage]?.[0]?.id, expectedId: row.sourceBillId };
})()`, context);
if (!purchaseRegisterAllDrillCheck.skipped) {
  assert.equal(purchaseRegisterAllDrillCheck.active, "Purchase", "Purchase Register-All drill-down must open Purchase");
  assert.equal(purchaseRegisterAllDrillCheck.purchaseView, purchaseRegisterAllDrillCheck.expectedView, "Purchase Register-All drill-down opened the wrong purchase screen");
  assert.equal(purchaseRegisterAllDrillCheck.loadedId, purchaseRegisterAllDrillCheck.expectedId, "Purchase Register-All drill-down opened the wrong saved record");
}
const purchaseItemWiseAllCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, purchaseReportOption: "Item wise-All" };
  purchaseReportConfig();
`, context);
const expectedPurchaseItemWiseAllColumns = [
  "Purchase_Mode", "Salesman", "EntryNo", "SalesNo", "EDate", "ItemName", "Description", "PartyName", "Nos",
  "GrossWeight", "WeightLess", "MudLess", "Rate", "StoneCharge", "TouchPerc", "TouchLess", "StoneWeight", "NetWeight", "Amount"
];
assert.deepEqual(Array.from(purchaseItemWiseAllCheck.columns, (column) => column.label), expectedPurchaseItemWiseAllColumns, "Purchase Item wise-All columns no longer match the supplied screens");
for (const row of purchaseItemWiseAllCheck.rows) {
  assert(row.purchaseSource && row.salesman, "Purchase Item wise-All must identify source and salesperson");
  assert(row.drillTarget === "purchase" && row.drillStorage && (row.sourceBillId || row.sourceEntryNo || row.sourceBillNo), "Purchase Item wise-All row lost detailed purchase drill-down identity");
  for (const key of ["nos", "grossWeight", "weightLess", "mudLess", "rate", "stoneCharge", "touchPercentage", "touchLess", "stoneWeight", "netWeight", "amount"]) {
    assert(Number.isFinite(row[key]), `Purchase Item wise-All ${key} must be numeric`);
  }
}
const purchaseItemWiseAllDrillCheck = vm.runInContext(`(() => {
  salesReportOptions = { ...salesReportOptions, purchaseReportOption: "Item wise-All" };
  const row = purchaseReportConfig().rows.find((item) => item.drillStorage && item.sourceBillId) || purchaseReportConfig().rows[0];
  if (!row) return { skipped: true };
  openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: row.sourceBillNo, reportSection: "exchange", reportTarget: "purchase", reportStorage: row.drillStorage, reportView: row.drillView } });
  return { skipped: false, active, purchaseView, expectedView: row.drillView, loadedId: state[row.drillStorage]?.[0]?.id, expectedId: row.sourceBillId };
})()`, context);
if (!purchaseItemWiseAllDrillCheck.skipped) {
  assert.equal(purchaseItemWiseAllDrillCheck.active, "Purchase", "Purchase Item wise-All drill-down must open Purchase");
  assert.equal(purchaseItemWiseAllDrillCheck.purchaseView, purchaseItemWiseAllDrillCheck.expectedView, "Purchase Item wise-All drill-down opened the wrong purchase screen");
  assert.equal(purchaseItemWiseAllDrillCheck.loadedId, purchaseItemWiseAllDrillCheck.expectedId, "Purchase Item wise-All drill-down opened the wrong saved record");
}
const purchaseItemDrillCheck = vm.runInContext(`(() => {
  salesReportOptions = { ...salesReportOptions, purchaseReportOption: "Item wise" };
  const row = purchaseReportConfig().rows[0];
  if (!row) return { skipped: true };
  openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: row.sourceBillNo, reportSection: "exchange", reportTarget: "purchase" } });
  return { skipped: false, active, purchaseView, loadedBillId: state.bills[0]?.id, expectedBillId: row.sourceBillId };
})()`, context);
if (!purchaseItemDrillCheck.skipped) {
  assert.equal(purchaseItemDrillCheck.active, "Purchase", "Purchase Item wise drill-down must open Purchase");
  assert.equal(purchaseItemDrillCheck.purchaseView, "Purchase Invoice", "Purchase Item wise drill-down must open Purchase Invoice");
  assert.equal(purchaseItemDrillCheck.loadedBillId, purchaseItemDrillCheck.expectedBillId, "Purchase Item wise drill-down opened the wrong bill");
}
const purchaseSalesmanSummaryCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, purchaseReportOption: "Salesman Summary" };
  purchaseReportConfig();
`, context);
const expectedPurchaseSalesmanSummaryColumns = ["SalesMan", "QTY", "GrossWt", "StoneWt", "Mudless", "TouchLess", "WeightLess", "NetWt", "Amount"];
assert.deepEqual(Array.from(purchaseSalesmanSummaryCheck.columns, (column) => column.label), expectedPurchaseSalesmanSummaryColumns, "Purchase Salesman Summary columns no longer match the supplied screen");
assert.equal(new Set(Array.from(purchaseSalesmanSummaryCheck.rows, (row) => row.salesman)).size, purchaseSalesmanSummaryCheck.rows.length, "Purchase Salesman Summary must contain one row per salesperson");
const purchaseItemTotals = purchaseItemWiseCheck.totals;
const purchaseSummaryMappings = { quantity: "nos", grossWeight: "grossWeight", stoneWeight: "stoneWeight", mudLess: "mudLess", touchLess: "touchLess", weightLess: "weightLess", netWeight: "netWeight", amount: "amount" };
for (const [summaryKey, detailKey] of Object.entries(purchaseSummaryMappings)) {
  assert.equal(Number(purchaseSalesmanSummaryCheck.totals[summaryKey].toFixed(6)), Number(purchaseItemTotals[detailKey].toFixed(6)), `Purchase Salesman Summary ${summaryKey} total must reconcile with Item wise`);
}
const purchaseReturnRegisterCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, shown: true, from: "01/01/2025", to: "31/12/2026", purchaseReturnReportOption: "Purchase Return Register" };
  ({ config: purchaseReturnReportConfig(), markup: purchaseReturnReportScreen() });
`, context);
const expectedPurchaseReturnRegisterColumns = [
  "BillNo", "BranchENo", "RefNo", "EDate", "EMode", "PartyID", "LedgerName", "PartyName", "PartyAddress",
  "BillAmount", "Addition", "Discount", "GST", "CGST", "SGST", "InvoiceTotal", "CashPaid", "Balance"
];
assert.deepEqual(Array.from(purchaseReturnRegisterCheck.config.columns, (column) => column.label), expectedPurchaseReturnRegisterColumns, "Purchase Return Register columns no longer match the supplied screens");
assert(purchaseReturnRegisterCheck.markup.includes(">Purchase Return Register</") && purchaseReturnRegisterCheck.markup.includes(">Purchase Return Report</"), "Purchase Return dropdown options are incomplete");
for (const row of purchaseReturnRegisterCheck.config.rows) {
  assert.equal(Number((row.cgst + row.sgst).toFixed(6)), Number(row.gst.toFixed(6)), "Purchase Return CGST and SGST must reconcile to GST");
  assert.equal(Number(row.invoiceTotal.toFixed(6)), Number((row.billAmount + row.addition - row.discount + row.gst).toFixed(6)), "Purchase Return invoice calculation is inconsistent");
  assert(row.drillTarget === "purchase" && row.drillStorage && row.drillView && (row.sourceBillId || row.sourceEntryNo || row.sourceBillNo), "Purchase Return row lost detailed purchase drill-down identity");
  assert(row.cashPaid >= 0 && row.balance >= 0, "Purchase Return payment and balance values cannot be negative");
}
const purchaseReturnOptionsCheck = vm.runInContext(`
  PURCHASE_RETURN_REPORT_OPTIONS.map((option) => {
    salesReportOptions = { ...salesReportOptions, purchaseReturnReportOption: option };
    const config = purchaseReturnReportConfig();
    return { option, columns: config.columns.length, hasTotals: Boolean(config.totals) };
  });
`, context);
assert.equal(purchaseReturnOptionsCheck.length, 2, "Both Purchase Return report options must be implemented");
assert(purchaseReturnOptionsCheck.every((item) => item.columns > 0 && item.hasTotals), "Every Purchase Return option must provide columns and totals");
const purchaseReturnDetailCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, purchaseReturnReportOption: "Purchase Return Report" };
  purchaseReturnReportConfig();
`, context);
const expectedPurchaseReturnDetailColumns = [
  "BillNo", "BranchENo", "RefNo", "EDate", "PartyID", "LedgerName", "PartyName", "PartyAddress", "ItemID", "ItemName",
  "ItemDescription", "ItemType", "Qty", "GrossWeight", "StoneWeight", "MudLess", "WeightLess", "WeightLess", "TouchPerc",
  "TouchLess", "NetWeight", "StoneAmount", "Rate", "Amount", "Category", "ItemDiscount", "ItemAddition"
];
assert.deepEqual(Array.from(purchaseReturnDetailCheck.columns, (column) => column.label), expectedPurchaseReturnDetailColumns, "Purchase Return Report columns no longer match the supplied screens");
assert.equal(purchaseReturnDetailCheck.columns.filter((column) => column.label === "WeightLess").length, 2, "Purchase Return Report must preserve both WeightLess columns");
for (const row of purchaseReturnDetailCheck.rows) {
  assert(row.drillTarget === "purchase" && row.drillStorage && row.drillView && (row.sourceBillId || row.sourceEntryNo || row.sourceBillNo), "Purchase Return detail row lost its parent return drill-down identity");
  for (const key of ["quantity", "grossWeight", "stoneWeight", "mudLess", "lossPercentage", "weightLess", "touchPercentage", "touchLess", "netWeight", "stoneAmount", "rate", "amount", "itemDiscount", "itemAddition"]) {
    assert(Number.isFinite(row[key]), `Purchase Return Report ${key} must be numeric`);
  }
  assert(row.netWeight >= 0, "Purchase Return Report NetWeight cannot be negative");
}
const directGoldPurchaseRegisterCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, shown: true, from: "01/01/2025", to: "31/12/2026", directGoldPurchaseReportOption: "Purchase Register" };
  ({ config: directGoldPurchaseReportConfig(), markup: directGoldPurchaseReportScreen() });
`, context);
const expectedDirectGoldPurchaseRegisterColumns = [
  "EntryNo", "RefNo", "EDate", "PurMode", "PartyID", "PartyName", "PartyAddress", "GSTNo", "BillAmount", "Addition",
  "Discount", "GST", "CGST", "SGST", "CessAmt", "InvoiceTotal", "CashPaid", "Balance"
];
assert.deepEqual(Array.from(directGoldPurchaseRegisterCheck.config.columns, (column) => column.label), expectedDirectGoldPurchaseRegisterColumns, "Direct Gold Purchase Register columns no longer match the supplied screens");
for (const option of ["Purchase Register", "Item wise", "Salesman Wise", "Salesman Summary"]) assert(directGoldPurchaseRegisterCheck.markup.includes(`>${option}</option>`) || directGoldPurchaseRegisterCheck.markup.includes(`>${option}</`), `Direct Gold Purchase dropdown is missing ${option}`);
for (const row of directGoldPurchaseRegisterCheck.config.rows) {
  assert.equal(Number((row.cgst + row.sgst).toFixed(6)), Number(row.gst.toFixed(6)), "Direct Gold Purchase CGST and SGST must reconcile to GST");
  assert.equal(Number(row.invoiceTotal.toFixed(6)), Number((row.billAmount + row.addition - row.discount + row.gst + row.cessAmount).toFixed(6)), "Direct Gold Purchase invoice calculation is inconsistent");
  assert.equal(row.drillStorage, "directPurchases", "Direct Gold Purchase row must retain directPurchases storage");
  assert.equal(row.drillView, "Direct Purchase", "Direct Gold Purchase row must target Direct Purchase Entry");
  assert(row.sourceBillId || row.sourceEntryNo || row.sourceBillNo, "Direct Gold Purchase row lost saved-record identity");
}
const directGoldPurchaseOptionsCheck = vm.runInContext(`
  DIRECT_GOLD_PURCHASE_REPORT_OPTIONS.map((option) => {
    salesReportOptions = { ...salesReportOptions, directGoldPurchaseReportOption: option };
    const config = directGoldPurchaseReportConfig();
    return { option, columns: config.columns.length, hasTotals: Boolean(config.totals) };
  });
`, context);
assert.equal(directGoldPurchaseOptionsCheck.length, 4, "All four Direct Gold Purchase report options must be implemented");
assert(directGoldPurchaseOptionsCheck.every((item) => item.columns > 0 && item.hasTotals), "Every Direct Gold Purchase option must provide columns and totals");
const directGoldPurchaseDrillCheck = vm.runInContext(`(() => {
  salesReportOptions = { ...salesReportOptions, directGoldPurchaseReportOption: "Purchase Register" };
  const row = directGoldPurchaseReportConfig().rows[0];
  if (!row) return { skipped: true };
  openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: row.sourceBillNo, reportSection: "exchange", reportTarget: "purchase", reportStorage: "directPurchases", reportView: "Direct Purchase" } });
  return { skipped: false, active, purchaseView, loadedId: state.directPurchases?.[0]?.id, expectedId: row.sourceBillId };
})()`, context);
if (!directGoldPurchaseDrillCheck.skipped) {
  assert.equal(directGoldPurchaseDrillCheck.active, "Purchase", "Direct Gold Purchase drill-down must open Purchase");
  assert.equal(directGoldPurchaseDrillCheck.purchaseView, "Direct Purchase", "Direct Gold Purchase drill-down must open Direct Purchase Entry");
  assert.equal(directGoldPurchaseDrillCheck.loadedId, directGoldPurchaseDrillCheck.expectedId, "Direct Gold Purchase drill-down opened the wrong record");
}
const directGoldPurchaseItemWiseCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, directGoldPurchaseReportOption: "Item wise" };
  directGoldPurchaseReportConfig();
`, context);
const expectedDirectGoldPurchaseItemColumns = ["EntryNo", "EDate", "ItemName", "Nos", "GrossWeight", "Rate", "StoneCharge", "StoneWeight", "NetWeight", "Amount"];
assert.deepEqual(Array.from(directGoldPurchaseItemWiseCheck.columns, (column) => column.label), expectedDirectGoldPurchaseItemColumns, "Direct Gold Purchase Item wise columns no longer match the supplied screen");
for (const row of directGoldPurchaseItemWiseCheck.rows) {
  assert(String(row.entryNo).trim() && String(row.entryDate).trim() && String(row.itemName).trim(), "Direct Gold Purchase Item wise mandatory text fields cannot be blank");
  for (const key of ["nos", "grossWeight", "rate", "stoneCharge", "stoneWeight", "netWeight", "amount"]) assert(Number.isFinite(row[key]), `Direct Gold Purchase Item wise mandatory ${key} must be numeric`);
  assert(row.netWeight >= 0, "Direct Gold Purchase Item wise NetWeight cannot be negative");
  assert.equal(row.drillStorage, "directPurchases", "Direct Gold Purchase Item wise row lost directPurchases storage");
  assert.equal(row.drillView, "Direct Purchase", "Direct Gold Purchase Item wise row must target Direct Purchase Entry");
}
const directGoldPurchaseItemDrillCheck = vm.runInContext(`(() => {
  salesReportOptions = { ...salesReportOptions, directGoldPurchaseReportOption: "Item wise" };
  const row = directGoldPurchaseReportConfig().rows[0];
  if (!row) return { skipped: true };
  openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: row.sourceBillNo, reportSection: "exchange", reportTarget: "purchase", reportStorage: "directPurchases", reportView: "Direct Purchase" } });
  return { skipped: false, active, purchaseView, loadedId: state.directPurchases?.[0]?.id, expectedId: row.sourceBillId };
})()`, context);
if (!directGoldPurchaseItemDrillCheck.skipped) {
  assert.equal(directGoldPurchaseItemDrillCheck.active, "Purchase", "Direct Gold Purchase Item wise drill-down must open Purchase");
  assert.equal(directGoldPurchaseItemDrillCheck.purchaseView, "Direct Purchase", "Direct Gold Purchase Item wise drill-down must open Direct Purchase Entry");
  assert.equal(directGoldPurchaseItemDrillCheck.loadedId, directGoldPurchaseItemDrillCheck.expectedId, "Direct Gold Purchase Item wise drill-down opened the wrong record");
}
const directGoldPurchaseSalesmanWiseCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, directGoldPurchaseReportOption: "Salesman Wise" };
  directGoldPurchaseReportConfig();
`, context);
const expectedDirectGoldPurchaseSalesmanColumns = ["SalesMan", "EntryNo", "tDate", "IID", "Item_Name", "QTY", "GrossWt", "StoneWt", "NetWt", "Rate", "Amount"];
assert.deepEqual(Array.from(directGoldPurchaseSalesmanWiseCheck.columns, (column) => column.label), expectedDirectGoldPurchaseSalesmanColumns, "Direct Gold Purchase Salesman Wise columns no longer match the supplied screen");
for (const row of directGoldPurchaseSalesmanWiseCheck.rows) {
  for (const key of ["salesman", "entryNo", "entryDate", "itemId", "itemName"]) assert(String(row[key]).trim(), `Direct Gold Purchase Salesman Wise mandatory ${key} cannot be blank`);
  for (const key of ["nos", "grossWeight", "stoneWeight", "netWeight", "rate", "amount"]) assert(Number.isFinite(row[key]), `Direct Gold Purchase Salesman Wise mandatory ${key} must be numeric`);
  assert(row.drillStorage === "directPurchases" && row.drillView === "Direct Purchase", "Direct Gold Purchase Salesman Wise row lost Direct Purchase drill target");
}
const directSalesmanTotals = directGoldPurchaseSalesmanWiseCheck.totals;
const directItemTotals = directGoldPurchaseItemWiseCheck.totals;
for (const key of ["nos", "grossWeight", "stoneWeight", "netWeight", "rate", "amount"]) {
  assert.equal(Number(directSalesmanTotals[key].toFixed(6)), Number(directItemTotals[key].toFixed(6)), `Direct Gold Purchase Salesman Wise ${key} total must reconcile with Item wise`);
}
const directGoldPurchaseSalesmanSummaryCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, directGoldPurchaseReportOption: "Salesman Summary" };
  directGoldPurchaseReportConfig();
`, context);
const expectedDirectGoldPurchaseSalesmanSummaryColumns = ["SalesMan", "QTY", "GrossWt", "StoneWt", "NetWt", "Amount"];
assert.deepEqual(Array.from(directGoldPurchaseSalesmanSummaryCheck.columns, (column) => column.label), expectedDirectGoldPurchaseSalesmanSummaryColumns, "Direct Gold Purchase Salesman Summary columns no longer match the supplied screen");
assert.equal(new Set(Array.from(directGoldPurchaseSalesmanSummaryCheck.rows, (row) => row.salesman)).size, directGoldPurchaseSalesmanSummaryCheck.rows.length, "Direct Gold Purchase Salesman Summary must contain one row per salesperson");
for (const row of directGoldPurchaseSalesmanSummaryCheck.rows) {
  assert(String(row.salesman).trim(), "Direct Gold Purchase Salesman Summary salesman cannot be blank");
  for (const key of ["quantity", "grossWeight", "stoneWeight", "netWeight", "amount"]) assert(Number.isFinite(row[key]), `Direct Gold Purchase Salesman Summary mandatory ${key} must be numeric`);
  assert(row.drillStorage === "directPurchases" && row.drillView === "Direct Purchase" && row.drillTarget === "purchase", "Direct Gold Purchase Salesman Summary row lost Direct Purchase drill target");
  assert(row.sourceBillId || row.sourceEntryNo || row.sourceBillNo, "Direct Gold Purchase Salesman Summary row lost its representative bill identity");
}
const directSummaryMappings = { quantity: "nos", grossWeight: "grossWeight", stoneWeight: "stoneWeight", netWeight: "netWeight", amount: "amount" };
for (const [summaryKey, detailKey] of Object.entries(directSummaryMappings)) {
  assert.equal(Number(directGoldPurchaseSalesmanSummaryCheck.totals[summaryKey].toFixed(6)), Number(directGoldPurchaseSalesmanWiseCheck.totals[detailKey].toFixed(6)), `Direct Gold Purchase Salesman Summary ${summaryKey} total must reconcile with Salesman Wise`);
}
const directGoldPurchaseSummaryDrillCheck = vm.runInContext(`(() => {
  salesReportOptions = { ...salesReportOptions, directGoldPurchaseReportOption: "Salesman Summary" };
  const row = directGoldPurchaseReportConfig().rows[0];
  if (!row) return { skipped: true };
  openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: row.sourceBillNo, reportSection: row.sourceSection, reportTarget: row.drillTarget, reportStorage: row.drillStorage, reportView: row.drillView } });
  return { skipped: false, active, purchaseView, loadedId: state.directPurchases?.[0]?.id, expectedId: row.sourceBillId };
})()`, context);
if (!directGoldPurchaseSummaryDrillCheck.skipped) {
  assert.equal(directGoldPurchaseSummaryDrillCheck.active, "Purchase", "Direct Gold Purchase Salesman Summary drill-down must open Purchase");
  assert.equal(directGoldPurchaseSummaryDrillCheck.purchaseView, "Direct Purchase", "Direct Gold Purchase Salesman Summary drill-down must open Direct Purchase Entry");
  assert.equal(directGoldPurchaseSummaryDrillCheck.loadedId, directGoldPurchaseSummaryDrillCheck.expectedId, "Direct Gold Purchase Salesman Summary drill-down opened the wrong record");
}
const directGoldPurchaseReturnRegisterCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, shown: true, from: "01/01/2025", to: "31/12/2026", directGoldPurchaseReturnReportOption: "Purchase Return Register" };
  ({ config: directGoldPurchaseReturnReportConfig(), markup: directGoldPurchaseReturnReportScreen() });
`, context);
const expectedDirectGoldPurchaseReturnRegisterColumns = [
  "EntryNo", "RefNo", "EDate", "PurMode", "PartyID", "PartyName", "PartyAddress", "BillAmount", "Addition",
  "Discount", "GST", "CGST", "SGST", "CessAmt", "InvoiceTotal", "CashPaid", "Balance"
];
assert.deepEqual(Array.from(directGoldPurchaseReturnRegisterCheck.config.columns, (column) => column.label), expectedDirectGoldPurchaseReturnRegisterColumns, "Direct Gold Purchase Return Register columns no longer match the supplied screens");
for (const option of ["Purchase Return Register", "Item wise", "Salesman Wise", "Salesman Summary"]) assert(directGoldPurchaseReturnRegisterCheck.markup.includes(`>${option}</option>`) || directGoldPurchaseReturnRegisterCheck.markup.includes(`>${option}</`), `Direct Gold Purchase Return dropdown is missing ${option}`);
for (const row of directGoldPurchaseReturnRegisterCheck.config.rows) {
  assert.equal(Number((row.cgst + row.sgst).toFixed(6)), Number(row.gst.toFixed(6)), "Direct Gold Purchase Return CGST and SGST must reconcile to GST");
  assert.equal(Number(row.invoiceTotal.toFixed(6)), Number((row.billAmount + row.addition - row.discount + row.gst + row.cessAmount).toFixed(6)), "Direct Gold Purchase Return invoice calculation is inconsistent");
  assert(row.drillStorage === "directPurchaseReturns" && row.drillView === "Direct Purchase Return" && row.drillTarget === "purchase", "Direct Gold Purchase Return row lost its return-entry drill target");
  assert(row.sourceBillId || row.sourceEntryNo || row.sourceBillNo, "Direct Gold Purchase Return row lost saved-record identity");
}
const directGoldPurchaseReturnItemWiseCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, directGoldPurchaseReturnReportOption: "Item wise" };
  directGoldPurchaseReturnReportConfig();
`, context);
const expectedDirectGoldPurchaseReturnItemColumns = ["EntryNo", "EDate", "ItemName", "Nos", "GrossWeight", "Rate", "StoneCharge", "StoneWeight", "NetWeight", "Amount"];
assert.deepEqual(Array.from(directGoldPurchaseReturnItemWiseCheck.columns, (column) => column.label), expectedDirectGoldPurchaseReturnItemColumns, "Direct Gold Purchase Return Item wise columns no longer match the supplied screen");
for (const row of directGoldPurchaseReturnItemWiseCheck.rows) {
  assert(String(row.entryNo).trim() && String(row.entryDate).trim() && String(row.itemName).trim(), "Direct Gold Purchase Return Item wise mandatory text fields cannot be blank");
  for (const key of ["nos", "grossWeight", "rate", "stoneCharge", "stoneWeight", "netWeight", "amount"]) assert(Number.isFinite(row[key]), `Direct Gold Purchase Return Item wise mandatory ${key} must be numeric`);
  assert(row.grossWeight >= 0 && row.stoneWeight >= 0 && row.netWeight >= 0, "Direct Gold Purchase Return Item wise weights cannot be negative");
  assert.equal(row.drillStorage, "directPurchaseReturns", "Direct Gold Purchase Return Item wise row lost directPurchaseReturns storage");
  assert.equal(row.drillView, "Direct Purchase Return", "Direct Gold Purchase Return Item wise row must target Direct Purchase Return Entry");
}
const directReturnItemMappings = { grossWeight: "grossWeight", stoneWeight: "stoneWeight", netWeight: "netWeight", amount: "amount" };
for (const [itemKey, totalKey] of Object.entries(directReturnItemMappings)) {
  const rowSum = directGoldPurchaseReturnItemWiseCheck.rows.reduce((sum, row) => sum + Number(row[itemKey] || 0), 0);
  assert.equal(Number(rowSum.toFixed(6)), Number(directGoldPurchaseReturnItemWiseCheck.totals[totalKey].toFixed(6)), `Direct Gold Purchase Return Item wise ${itemKey} total is inconsistent`);
}
const directGoldPurchaseReturnItemDrillCheck = vm.runInContext(`(() => {
  salesReportOptions = { ...salesReportOptions, directGoldPurchaseReturnReportOption: "Item wise" };
  const row = directGoldPurchaseReturnReportConfig().rows[0];
  if (!row) return { skipped: true };
  openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: row.sourceBillNo, reportSection: row.sourceSection, reportTarget: row.drillTarget, reportStorage: row.drillStorage, reportView: row.drillView } });
  return { skipped: false, active, purchaseView, loadedId: state.directPurchaseReturns?.[0]?.id, expectedId: row.sourceBillId };
})()`, context);
if (!directGoldPurchaseReturnItemDrillCheck.skipped) {
  assert.equal(directGoldPurchaseReturnItemDrillCheck.active, "Purchase", "Direct Gold Purchase Return Item wise drill-down must open Purchase");
  assert.equal(directGoldPurchaseReturnItemDrillCheck.purchaseView, "Direct Purchase Return", "Direct Gold Purchase Return Item wise drill-down must open Direct Purchase Return Entry");
  assert.equal(directGoldPurchaseReturnItemDrillCheck.loadedId, directGoldPurchaseReturnItemDrillCheck.expectedId, "Direct Gold Purchase Return Item wise drill-down opened the wrong record");
}
const directGoldPurchaseReturnSalesmanWiseCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, directGoldPurchaseReturnReportOption: "Salesman Wise" };
  directGoldPurchaseReturnReportConfig();
`, context);
const expectedDirectGoldPurchaseReturnSalesmanColumns = ["SalesMan", "EntryNo", "tDate", "IID", "Item_Name", "QTY", "GrossWt", "StoneWt", "NetWt", "Rate", "Amount"];
assert.deepEqual(Array.from(directGoldPurchaseReturnSalesmanWiseCheck.columns, (column) => column.label), expectedDirectGoldPurchaseReturnSalesmanColumns, "Direct Gold Purchase Return Salesman Wise columns no longer match the supplied screen");
for (const row of directGoldPurchaseReturnSalesmanWiseCheck.rows) {
  for (const key of ["salesman", "entryNo", "entryDate", "itemId", "itemName"]) assert(String(row[key]).trim(), `Direct Gold Purchase Return Salesman Wise mandatory ${key} cannot be blank`);
  for (const key of ["nos", "grossWeight", "stoneWeight", "netWeight", "rate", "amount"]) assert(Number.isFinite(row[key]), `Direct Gold Purchase Return Salesman Wise mandatory ${key} must be numeric`);
  assert(row.drillStorage === "directPurchaseReturns" && row.drillView === "Direct Purchase Return" && row.drillTarget === "purchase", "Direct Gold Purchase Return Salesman Wise row lost Direct Purchase Return drill target");
}
for (const key of ["nos", "grossWeight", "stoneWeight", "netWeight", "rate", "amount"]) {
  assert.equal(Number(directGoldPurchaseReturnSalesmanWiseCheck.totals[key].toFixed(6)), Number(directGoldPurchaseReturnItemWiseCheck.totals[key].toFixed(6)), `Direct Gold Purchase Return Salesman Wise ${key} total must reconcile with Item wise`);
}
const directGoldPurchaseReturnSalesmanDrillCheck = vm.runInContext(`(() => {
  salesReportOptions = { ...salesReportOptions, directGoldPurchaseReturnReportOption: "Salesman Wise" };
  const row = directGoldPurchaseReturnReportConfig().rows[0];
  if (!row) return { skipped: true };
  openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: row.sourceBillNo, reportSection: row.sourceSection, reportTarget: row.drillTarget, reportStorage: row.drillStorage, reportView: row.drillView } });
  return { skipped: false, active, purchaseView, loadedId: state.directPurchaseReturns?.[0]?.id, expectedId: row.sourceBillId };
})()`, context);
if (!directGoldPurchaseReturnSalesmanDrillCheck.skipped) {
  assert.equal(directGoldPurchaseReturnSalesmanDrillCheck.active, "Purchase", "Direct Gold Purchase Return Salesman Wise drill-down must open Purchase");
  assert.equal(directGoldPurchaseReturnSalesmanDrillCheck.purchaseView, "Direct Purchase Return", "Direct Gold Purchase Return Salesman Wise drill-down must open Direct Purchase Return Entry");
  assert.equal(directGoldPurchaseReturnSalesmanDrillCheck.loadedId, directGoldPurchaseReturnSalesmanDrillCheck.expectedId, "Direct Gold Purchase Return Salesman Wise drill-down opened the wrong record");
}
const directGoldPurchaseReturnSalesmanSummaryCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, directGoldPurchaseReturnReportOption: "Salesman Summary" };
  directGoldPurchaseReturnReportConfig();
`, context);
const expectedDirectGoldPurchaseReturnSalesmanSummaryColumns = ["SalesMan", "QTY", "GrossWt", "StoneWt", "NetWt", "Amount"];
assert.deepEqual(Array.from(directGoldPurchaseReturnSalesmanSummaryCheck.columns, (column) => column.label), expectedDirectGoldPurchaseReturnSalesmanSummaryColumns, "Direct Gold Purchase Return Salesman Summary columns no longer match the supplied screen");
assert.equal(new Set(Array.from(directGoldPurchaseReturnSalesmanSummaryCheck.rows, (row) => row.salesman)).size, directGoldPurchaseReturnSalesmanSummaryCheck.rows.length, "Direct Gold Purchase Return Salesman Summary must contain one row per salesperson");
for (const row of directGoldPurchaseReturnSalesmanSummaryCheck.rows) {
  assert(String(row.salesman).trim(), "Direct Gold Purchase Return Salesman Summary salesman cannot be blank");
  for (const key of ["quantity", "grossWeight", "stoneWeight", "netWeight", "amount"]) assert(Number.isFinite(row[key]), `Direct Gold Purchase Return Salesman Summary mandatory ${key} must be numeric`);
  assert(row.drillStorage === "directPurchaseReturns" && row.drillView === "Direct Purchase Return" && row.drillTarget === "purchase", "Direct Gold Purchase Return Salesman Summary row lost Direct Purchase Return drill target");
  assert(row.sourceBillId || row.sourceEntryNo || row.sourceBillNo, "Direct Gold Purchase Return Salesman Summary row lost its representative bill identity");
}
const directReturnSummaryMappings = { quantity: "nos", grossWeight: "grossWeight", stoneWeight: "stoneWeight", netWeight: "netWeight", amount: "amount" };
for (const [summaryKey, detailKey] of Object.entries(directReturnSummaryMappings)) {
  assert.equal(Number(directGoldPurchaseReturnSalesmanSummaryCheck.totals[summaryKey].toFixed(6)), Number(directGoldPurchaseReturnSalesmanWiseCheck.totals[detailKey].toFixed(6)), `Direct Gold Purchase Return Salesman Summary ${summaryKey} total must reconcile with Salesman Wise`);
}
const directGoldPurchaseReturnSummaryDrillCheck = vm.runInContext(`(() => {
  salesReportOptions = { ...salesReportOptions, directGoldPurchaseReturnReportOption: "Salesman Summary" };
  const row = directGoldPurchaseReturnReportConfig().rows[0];
  if (!row) return { skipped: true };
  openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: row.sourceBillNo, reportSection: row.sourceSection, reportTarget: row.drillTarget, reportStorage: row.drillStorage, reportView: row.drillView } });
  return { skipped: false, active, purchaseView, loadedId: state.directPurchaseReturns?.[0]?.id, expectedId: row.sourceBillId };
})()`, context);
if (!directGoldPurchaseReturnSummaryDrillCheck.skipped) {
  assert.equal(directGoldPurchaseReturnSummaryDrillCheck.active, "Purchase", "Direct Gold Purchase Return Salesman Summary drill-down must open Purchase");
  assert.equal(directGoldPurchaseReturnSummaryDrillCheck.purchaseView, "Direct Purchase Return", "Direct Gold Purchase Return Salesman Summary drill-down must open Direct Purchase Return Entry");
  assert.equal(directGoldPurchaseReturnSummaryDrillCheck.loadedId, directGoldPurchaseReturnSummaryDrillCheck.expectedId, "Direct Gold Purchase Return Salesman Summary drill-down opened the wrong record");
}
const directGoldPurchaseReturnOptionsCheck = vm.runInContext(`
  DIRECT_GOLD_PURCHASE_RETURN_REPORT_OPTIONS.map((option) => {
    salesReportOptions = { ...salesReportOptions, directGoldPurchaseReturnReportOption: option };
    const config = directGoldPurchaseReturnReportConfig();
    return { option, columns: config.columns.length, hasTotals: Boolean(config.totals), rows: config.rows };
  });
`, context);
assert.equal(directGoldPurchaseReturnOptionsCheck.length, 4, "All four Direct Gold Purchase Return report options must be implemented");
assert(directGoldPurchaseReturnOptionsCheck.every((item) => item.columns > 0 && item.hasTotals), "Every Direct Gold Purchase Return option must provide columns and totals");
for (const option of directGoldPurchaseReturnOptionsCheck) for (const row of option.rows) assert(row.drillStorage === "directPurchaseReturns" && row.drillView === "Direct Purchase Return", `${option.option} lost Direct Purchase Return drill metadata`);
const directGoldPurchaseReturnDrillCheck = vm.runInContext(`(() => {
  salesReportOptions = { ...salesReportOptions, directGoldPurchaseReturnReportOption: "Purchase Return Register" };
  const row = directGoldPurchaseReturnReportConfig().rows[0];
  if (!row) return { skipped: true };
  openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: row.sourceBillNo, reportSection: row.sourceSection, reportTarget: row.drillTarget, reportStorage: row.drillStorage, reportView: row.drillView } });
  return { skipped: false, active, purchaseView, loadedId: state.directPurchaseReturns?.[0]?.id, expectedId: row.sourceBillId };
})()`, context);
if (!directGoldPurchaseReturnDrillCheck.skipped) {
  assert.equal(directGoldPurchaseReturnDrillCheck.active, "Purchase", "Direct Gold Purchase Return drill-down must open Purchase");
  assert.equal(directGoldPurchaseReturnDrillCheck.purchaseView, "Direct Purchase Return", "Direct Gold Purchase Return drill-down must open Direct Purchase Return Entry");
  assert.equal(directGoldPurchaseReturnDrillCheck.loadedId, directGoldPurchaseReturnDrillCheck.expectedId, "Direct Gold Purchase Return drill-down opened the wrong record");
}
const diamondPurchaseRegisterCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, shown: true, from: "01/01/2025", to: "31/12/2026", diamondPurchaseReportOption: "Purchase Register" };
  ({ config: diamondPurchaseReportConfig(), markup: diamondPurchaseReportScreen() });
`, context);
const expectedDiamondPurchaseRegisterColumns = ["EntryNo", "RefNo", "Entry_Date", "Purchase_Mode", "InvNo", "InvDate", "Party_Name", "Bill_Amt", "Addition", "Discount", "Tax", "DmdAmt", "InvTotal", "Cash_Paid", "Bill_Balance"];
assert.deepEqual(Array.from(diamondPurchaseRegisterCheck.config.columns, (column) => column.label), expectedDiamondPurchaseRegisterColumns, "Diamond Purchase Register columns no longer match the supplied screens");
for (const option of ["Purchase Register", "Purchase Report", "Diamond Report", "SR/OP/LP Report", "SR/OP/LP Report Summary", "SR/OP/LP Diamond Report", "SR/OP/LP Diamond Report Summary", "Summary Report"]) assert(diamondPurchaseRegisterCheck.markup.includes(`>${option}</option>`) || diamondPurchaseRegisterCheck.markup.includes(`>${option}</`), `Diamond Purchase dropdown is missing ${option}`);
const diamondSalesRouteMarkup = vm.runInContext(`reportPreview("Diamond Sales")`, context);
assert(diamondSalesRouteMarkup.includes("diamond-sales-report"), "Reports > Diamond > Sales must render the implemented Diamond Sales report");
assert(!diamondSalesRouteMarkup.includes("diamond-pending-report"), "Reports > Diamond > Sales must not fall through to the pending placeholder");
for (const row of diamondPurchaseRegisterCheck.config.rows) {
  assert.equal(Number(row.invoiceTotal.toFixed(6)), Number((row.billAmount + row.diamondAmount + row.addition - row.discount + row.tax).toFixed(6)), "Diamond Purchase Register invoice calculation is inconsistent");
  assert.equal(Number(row.billBalance.toFixed(6)), Number((row.invoiceTotal - row.cashPaid).toFixed(6)), "Diamond Purchase Register balance calculation is inconsistent");
  assert(row.drillStorage === "diamondPurchases" && row.drillView === "Diamond Purchase" && row.drillTarget === "purchase", "Diamond Purchase Register row lost Diamond Purchase drill target");
  assert(row.sourceBillId || row.sourceEntryNo || row.sourceBillNo, "Diamond Purchase Register row lost saved-record identity");
}
const diamondPurchaseDrillCheck = vm.runInContext(`(() => {
  const row = diamondPurchaseReportConfig().rows[0];
  if (!row) return { skipped: true };
  openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: row.sourceBillNo, reportSection: row.sourceSection, reportTarget: row.drillTarget, reportStorage: row.drillStorage, reportView: row.drillView } });
  return { skipped: false, active, purchaseView, loadedId: state.diamondPurchases?.[0]?.id, expectedId: row.sourceBillId };
})()`, context);
if (!diamondPurchaseDrillCheck.skipped) {
  assert.equal(diamondPurchaseDrillCheck.active, "Purchase", "Diamond Purchase drill-down must open Purchase");
  assert.equal(diamondPurchaseDrillCheck.purchaseView, "Diamond Purchase", "Diamond Purchase drill-down must open Diamond Purchase Entry");
  assert.equal(diamondPurchaseDrillCheck.loadedId, diamondPurchaseDrillCheck.expectedId, "Diamond Purchase drill-down opened the wrong record");
}
const diamondPurchaseDetailCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, diamondPurchaseReportOption: "Purchase Report" };
  diamondPurchaseReportConfig();
`, context);
const expectedDiamondPurchaseDetailColumns = [
  "EntryNo", "Date", "ItemId", "Item_Name", "Description", "Barcode", "Qty", "GrossWeight", "StoneWeight", "NetWeight",
  "StonePrice", "VA%", "GoldRate", "PurchaseMC", "DmdWeight", "Crt/CntRate", "DmdAmount", "GstAmount", "Total",
  "SaleStonePrice", "SalesMC", "DmdSalesAmount"
];
assert.deepEqual(Array.from(diamondPurchaseDetailCheck.columns, (column) => column.label), expectedDiamondPurchaseDetailColumns, "Diamond Purchase Report columns no longer match the supplied screens");
for (const row of diamondPurchaseDetailCheck.rows) {
  for (const key of ["entryNo", "entryDate", "itemId", "itemName", "description", "barcode"]) assert(String(row[key]).trim(), `Diamond Purchase Report mandatory ${key} cannot be blank`);
  for (const key of ["qty", "grossWeight", "stoneWeight", "netWeight", "stonePrice", "va", "goldRate", "purchaseMc", "diamondWeight", "caratCentRate", "diamondAmount", "gstAmount", "total", "saleStonePrice", "salesMc", "diamondSalesAmount"]) assert(Number.isFinite(row[key]), `Diamond Purchase Report ${key} must be numeric`);
  assert.equal(Number(row.netWeight.toFixed(6)), Number(Math.max(0, row.grossWeight - row.stoneWeight).toFixed(6)), "Diamond Purchase Report NetWeight calculation is inconsistent");
  assert.equal(Number(row.total.toFixed(6)), Number((row.total - row.gstAmount + row.gstAmount).toFixed(6)), "Diamond Purchase Report total contains an invalid numeric result");
  assert(row.drillStorage === "diamondPurchases" && row.drillView === "Diamond Purchase" && row.drillTarget === "purchase", "Diamond Purchase Report row lost its parent bill drill target");
}
for (const key of ["qty", "grossWeight", "stoneWeight", "netWeight", "diamondWeight", "diamondAmount", "gstAmount", "total"]) {
  const sum = diamondPurchaseDetailCheck.rows.reduce((value, row) => value + Number(row[key] || 0), 0);
  assert.equal(Number(sum.toFixed(6)), Number(diamondPurchaseDetailCheck.totals[key].toFixed(6)), `Diamond Purchase Report ${key} total is inconsistent`);
}
const diamondPurchaseDetailDrillCheck = vm.runInContext(`(() => {
  salesReportOptions = { ...salesReportOptions, diamondPurchaseReportOption: "Purchase Report" };
  const row = diamondPurchaseReportConfig().rows[0];
  if (!row) return { skipped: true };
  openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: row.sourceBillNo, reportSection: row.sourceSection, reportTarget: row.drillTarget, reportStorage: row.drillStorage, reportView: row.drillView } });
  return { skipped: false, active, purchaseView, loadedId: state.diamondPurchases?.[0]?.id, expectedId: row.sourceBillId };
})()`, context);
if (!diamondPurchaseDetailDrillCheck.skipped) {
  assert.equal(diamondPurchaseDetailDrillCheck.active, "Purchase", "Diamond Purchase Report drill-down must open Purchase");
  assert.equal(diamondPurchaseDetailDrillCheck.purchaseView, "Diamond Purchase", "Diamond Purchase Report drill-down must open Diamond Purchase Entry");
  assert.equal(diamondPurchaseDetailDrillCheck.loadedId, diamondPurchaseDetailDrillCheck.expectedId, "Diamond Purchase Report drill-down opened the wrong record");
}
const diamondPurchaseDiamondCheck = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, diamondPurchaseReportOption: "Diamond Report" };
  diamondPurchaseReportConfig();
`, context);
const expectedDiamondPurchaseDiamondColumns = [
  "partyName", "EntryNo", "Date", "ItemID", "Item_Name", "Barcode", "Qty", "Gross", "Stone", "Net", "Stone_Price",
  "PurchaseMC", "DMDCarat", "Type", "DMD_Pcs", "GoldRate", "SaleAmount", "SaleMc", "PRate", "SRate",
  "ColorType", "ColorScale", "DMDShape", "DMDcut", "DMDClarity", "DMDSieve"
];
assert.deepEqual(Array.from(diamondPurchaseDiamondCheck.columns, (column) => column.label), expectedDiamondPurchaseDiamondColumns, "Diamond Purchase Diamond Report columns no longer match the supplied screens");
for (const row of diamondPurchaseDiamondCheck.rows) {
  for (const key of ["partyName", "entryNo", "entryDate", "itemId", "itemName", "barcode", "dmdType"]) assert(String(row[key]).trim(), `Diamond Purchase Diamond Report mandatory ${key} cannot be blank`);
  for (const key of ["qty", "grossWeight", "stoneWeight", "netWeight", "stonePrice", "purchaseMc", "dmdCarat", "dmdPieces", "goldRate", "saleAmount", "saleMc", "purchaseRate", "salesRate"]) assert(Number.isFinite(row[key]), `Diamond Purchase Diamond Report ${key} must be numeric`);
  assert.equal(Number(row.netWeight.toFixed(6)), Number(Math.max(0, row.grossWeight - row.stoneWeight).toFixed(6)), "Diamond Purchase Diamond Report Net calculation is inconsistent");
  assert.equal(Number(row.saleAmount.toFixed(6)), Number(row.purchaseRate.toFixed(6)), "Diamond Purchase Diamond Report SaleAmount and PRate must represent the same purchase diamond amount");
  assert(row.drillStorage === "diamondPurchases" && row.drillView === "Diamond Purchase" && row.drillTarget === "purchase", "Diamond Purchase Diamond Report row lost its parent bill drill target");
}
for (const key of ["qty", "grossWeight", "stoneWeight", "netWeight", "dmdCarat", "dmdPieces", "saleAmount", "saleMc", "purchaseRate", "salesRate"]) {
  const sum = diamondPurchaseDiamondCheck.rows.reduce((value, row) => value + Number(row[key] || 0), 0);
  assert.equal(Number(sum.toFixed(6)), Number(diamondPurchaseDiamondCheck.totals[key].toFixed(6)), `Diamond Purchase Diamond Report ${key} total is inconsistent`);
}
const diamondPurchaseDiamondDrillCheck = vm.runInContext(`(() => {
  salesReportOptions = { ...salesReportOptions, diamondPurchaseReportOption: "Diamond Report" };
  const row = diamondPurchaseReportConfig().rows[0];
  if (!row) return { skipped: true };
  openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: row.sourceBillNo, reportSection: row.sourceSection, reportTarget: row.drillTarget, reportStorage: row.drillStorage, reportView: row.drillView } });
  return { skipped: false, active, purchaseView, loadedId: state.diamondPurchases?.[0]?.id, expectedId: row.sourceBillId };
})()`, context);
if (!diamondPurchaseDiamondDrillCheck.skipped) {
  assert.equal(diamondPurchaseDiamondDrillCheck.active, "Purchase", "Diamond Purchase Diamond Report drill-down must open Purchase");
  assert.equal(diamondPurchaseDiamondDrillCheck.purchaseView, "Diamond Purchase", "Diamond Purchase Diamond Report drill-down must open Diamond Purchase Entry");
  assert.equal(diamondPurchaseDiamondDrillCheck.loadedId, diamondPurchaseDiamondDrillCheck.expectedId, "Diamond Purchase Diamond Report drill-down opened the wrong record");
}
const diamondRemainingPurchaseReports = vm.runInContext(`(() => {
  const options = ["SR/OP/LP Report", "SR/OP/LP Report Summary", "SR/OP/LP Diamond Report", "SR/OP/LP Diamond Report Summary", "Summary Report"];
  return Object.fromEntries(options.map((option) => { salesReportOptions = { ...salesReportOptions, diamondPurchaseReportOption: option }; return [option, diamondPurchaseReportConfig()]; }));
})()`, context);
const expectedDiamondRemainingColumns = {
  "SR/OP/LP Report": ["EntryType", "EntryNo", "Date", "empid", "EmpName", "ItemId", "Item_Name", "Description", "Barcode", "Qty", "GrossWeight", "StoneWeight", "NetWeight", "StonePrice", "VA", "GoldRate", "PurchaseMC", "DmdWeight", "Crt_CntRate", "DmdAmount", "GstAmount", "Total", "SaleStonePrice", "SalesMC", "DmdSalesAmount"],
  "SR/OP/LP Report Summary": ["EntryType", "EntryNo", "Date", "PartyName", "empid", "EmpName", "Qty", "GrossWeight", "StoneWeight", "NetWeight", "StonePrice", "VA", "DmdWeight", "Crt_CntRate", "DmdAmount", "GstAmount", "Total", "SaleStonePrice", "SalesMC", "DmdSalesAmount"],
  "SR/OP/LP Diamond Report": ["EntryType", "partyName", "EntryNo", "Date", "empid", "EmpName", "ItemID", "Item_Name", "Barcode", "Qty", "Gross", "Stone", "Net", "Stone_Price", "PurchaseMC", "DMDCarat", "Type", "DMD_Pcs", "GoldRate", "SaleAmount", "SaleMc", "PRate", "SRate", "ColorType", "ColorScale", "DMDShape", "DMDcut", "DMDClarity", "DMDSieve"],
  "SR/OP/LP Diamond Report Summary": ["EntryType", "partyName", "EntryNo", "Date", "empid", "EmpName", "Qty", "Gross", "Stone", "Net", "Stone_Price", "PurchaseMC", "DMDCarat", "DMD_Pcs", "SaleAmount", "SaleMc", "PRate", "SRate"],
  "Summary Report": ["Type", "branchEno", "entryDate", "pMode", "invNo", "invDate", "partyName", "Gross", "Stone", "Net", "Crt/Cnt", "DmdAmount", "billAmt", "addition", "discount", "gst", "Tcs_Amt", "Tds_Amt", "HallMarking", "Certification", "GST_HC_Amt", "invTotal"]
};
for (const [option, config] of Object.entries(diamondRemainingPurchaseReports)) {
  assert.deepEqual(Array.from(config.columns, (column) => column.label), expectedDiamondRemainingColumns[option], `${option} columns no longer match the supplied screens`);
  assert(config.totals, `${option} must provide totals`);
  for (const row of config.rows) assert(row.sourceBillId || row.sourceEntryNo || row.sourceBillNo, `${option} row lost drill-down identity`);
}
for (const row of diamondRemainingPurchaseReports["Summary Report"].rows) {
  assert.equal(Number(row.net.toFixed(6)), Number(Math.max(0, row.gross - row.stone).toFixed(6)), "Diamond Purchase Summary net weight is inconsistent");
  const diamondLines = row.bill?.diamondLines || [];
  const expectedCarat = diamondLines.length
    ? diamondLines.reduce((sum, line) => sum + Number(line.caratCent || 0), 0)
    : (row.bill?.ornamentLines || []).reduce((sum, line) => sum + Number(line.dmdWgt || 0), 0);
  assert.equal(Number(row.caratCent.toFixed(6)), Number(expectedCarat.toFixed(6)), "Diamond Purchase Summary carat must be counted exactly once");
}
for (const option of ["SR/OP/LP Report", "SR/OP/LP Diamond Report"]) for (const row of diamondRemainingPurchaseReports[option].rows) {
  assert.equal(Number(row.netWeight.toFixed(6)), Number(Math.max(0, row.grossWeight - row.stoneWeight).toFixed(6)), `${option} net weight is inconsistent`);
  assert.equal(Number(row.total.toFixed(6)), Number((row.total - row.gstAmount + row.gstAmount).toFixed(6)), `${option} total is not finite`);
  assert(row.drillStorage === "dmdWholesales" && row.drillView === "DMD Sales WholeSales", `${option} must open Barcode With Diamond`);
}
const srSummaryPairs = [["SR/OP/LP Report", "SR/OP/LP Report Summary"], ["SR/OP/LP Diamond Report", "SR/OP/LP Diamond Report Summary"]];
for (const [detailName, summaryName] of srSummaryPairs) for (const key of ["qty", "grossWeight", "stoneWeight", "netWeight", "diamondWeight", "diamondAmount", "salesMc", "diamondSalesAmount"]) {
  assert.equal(Number(diamondRemainingPurchaseReports[detailName].totals[key].toFixed(6)), Number(diamondRemainingPurchaseReports[summaryName].totals[key].toFixed(6)), `${summaryName} ${key} must reconcile with detail`);
}
const diamondSrDrillCheck = vm.runInContext(`(() => { salesReportOptions = { ...salesReportOptions, diamondPurchaseReportOption: "SR/OP/LP Report" }; const row = diamondPurchaseReportConfig().rows[0]; if (!row) return { skipped: true }; openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: row.sourceBillNo, reportSection: row.sourceSection, reportTarget: row.drillTarget, reportStorage: row.drillStorage, reportView: row.drillView } }); return { skipped: false, active, salesView, loadedId: state.dmdWholesales?.[0]?.id, expectedId: row.sourceBillId }; })()`, context);
if (!diamondSrDrillCheck.skipped) { assert.equal(diamondSrDrillCheck.active, "Sales"); assert.equal(diamondSrDrillCheck.salesView, "DMD Sales WholeSales"); assert.equal(diamondSrDrillCheck.loadedId, diamondSrDrillCheck.expectedId); }
const diamondSrSummaryDrillCheck = vm.runInContext(`(() => { salesReportOptions = { ...salesReportOptions, diamondPurchaseReportOption: "SR/OP/LP Report Summary" }; const row = diamondPurchaseReportConfig().rows[0]; if (!row) return { skipped: true }; openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: row.sourceBillNo, reportSection: row.sourceSection, reportTarget: row.drillTarget, reportStorage: row.drillStorage, reportView: row.drillView } }); return { skipped: false, active, salesView, loadedId: state.dmdWholesales?.[0]?.id, expectedId: row.sourceBillId }; })()`, context);
if (!diamondSrSummaryDrillCheck.skipped) {
  assert.equal(diamondSrSummaryDrillCheck.active, "Sales", "SR/OP/LP Report Summary drill-down must open Sales");
  assert.equal(diamondSrSummaryDrillCheck.salesView, "DMD Sales WholeSales", "SR/OP/LP Report Summary drill-down must open Barcode With Diamond");
  assert.equal(diamondSrSummaryDrillCheck.loadedId, diamondSrSummaryDrillCheck.expectedId, "SR/OP/LP Report Summary drill-down opened the wrong entry");
}
const diamondSrDiamondDrillCheck = vm.runInContext(`(() => { salesReportOptions = { ...salesReportOptions, diamondPurchaseReportOption: "SR/OP/LP Diamond Report" }; const row = diamondPurchaseReportConfig().rows[0]; if (!row) return { skipped: true }; openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: row.sourceBillNo, reportSection: row.sourceSection, reportTarget: row.drillTarget, reportStorage: row.drillStorage, reportView: row.drillView } }); return { skipped: false, active, salesView, loadedId: state.dmdWholesales?.[0]?.id, expectedId: row.sourceBillId }; })()`, context);
if (!diamondSrDiamondDrillCheck.skipped) {
  assert.equal(diamondSrDiamondDrillCheck.active, "Sales", "SR/OP/LP Diamond Report drill-down must open Sales");
  assert.equal(diamondSrDiamondDrillCheck.salesView, "DMD Sales WholeSales", "SR/OP/LP Diamond Report drill-down must open Barcode With Diamond");
  assert.equal(diamondSrDiamondDrillCheck.loadedId, diamondSrDiamondDrillCheck.expectedId, "SR/OP/LP Diamond Report drill-down opened the wrong entry");
}
const diamondSrDiamondSummaryDrillCheck = vm.runInContext(`(() => { salesReportOptions = { ...salesReportOptions, diamondPurchaseReportOption: "SR/OP/LP Diamond Report Summary" }; const row = diamondPurchaseReportConfig().rows[0]; if (!row) return { skipped: true }; openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: row.sourceBillNo, reportSection: row.sourceSection, reportTarget: row.drillTarget, reportStorage: row.drillStorage, reportView: row.drillView } }); return { skipped: false, active, salesView, loadedId: state.dmdWholesales?.[0]?.id, expectedId: row.sourceBillId }; })()`, context);
if (!diamondSrDiamondSummaryDrillCheck.skipped) {
  assert.equal(diamondSrDiamondSummaryDrillCheck.active, "Sales", "SR/OP/LP Diamond Report Summary drill-down must open Sales");
  assert.equal(diamondSrDiamondSummaryDrillCheck.salesView, "DMD Sales WholeSales", "SR/OP/LP Diamond Report Summary drill-down must open Barcode With Diamond");
  assert.equal(diamondSrDiamondSummaryDrillCheck.loadedId, diamondSrDiamondSummaryDrillCheck.expectedId, "SR/OP/LP Diamond Report Summary drill-down opened the wrong entry");
}
const diamondPurchaseSummaryDrillCheck = vm.runInContext(`(() => { salesReportOptions = { ...salesReportOptions, diamondPurchaseReportOption: "Summary Report" }; const row = diamondPurchaseReportConfig().rows[0]; if (!row) return { skipped: true }; openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: row.sourceBillNo, reportSection: row.sourceSection, reportTarget: row.drillTarget, reportStorage: row.drillStorage, reportView: row.drillView } }); return { skipped: false, active, purchaseView, loadedId: state.diamondPurchases?.[0]?.id, expectedId: row.sourceBillId }; })()`, context);
if (!diamondPurchaseSummaryDrillCheck.skipped) {
  assert.equal(diamondPurchaseSummaryDrillCheck.active, "Purchase", "Diamond Purchase Summary drill-down must open Purchase");
  assert.equal(diamondPurchaseSummaryDrillCheck.purchaseView, "Diamond Purchase", "Diamond Purchase Summary drill-down must open Diamond Purchase Entry");
  assert.equal(diamondPurchaseSummaryDrillCheck.loadedId, diamondPurchaseSummaryDrillCheck.expectedId, "Diamond Purchase Summary drill-down opened the wrong record");
}
const diamondSalesChecks = vm.runInContext(`(() => { salesReportOptions = { ...salesReportOptions, diamondSalesMode: "detailed" }; const detailed = diamondSalesReportConfig(); salesReportOptions = { ...salesReportOptions, diamondSalesMode: "summary" }; return { detailed, summary: diamondSalesReportConfig(), markup: diamondSalesReportScreen() }; })()`, context);
const expectedDiamondSalesDetailColumns = ["Eno", "BRANCHEno", "Date", "SmanName", "itemId", "item_Name", "item_desc", "barcode", "qty", "Gross_Weight", "stone_Weight", "Net_Weight", "Stone_Charge", "Va_Perc", "mcPerGrm", "MC", "Rate", "TaxAmt", "CessAmt", "Discount", "Additional", "Diamond", "Taxable", "Amount", "DmdCarat", "dmdCarat", "dmdPcs", "dmdAmt"];
assert.deepEqual(Array.from(diamondSalesChecks.detailed.columns, (column) => column.label), expectedDiamondSalesDetailColumns, "Diamond Sales Detailed columns no longer match the supplied screens");
const expectedDiamondSalesSummaryColumns = ["Eno", "Date", "SmanName", "Customer", "Qty", "Gross_Weight", "stone_Weight", "Net_Weight", "DmdCarat", "Diamond", "Taxable", "Amount"];
assert.deepEqual(Array.from(diamondSalesChecks.summary.columns, (column) => column.label), expectedDiamondSalesSummaryColumns, "Diamond Sales Summary must retain only the essential bill-level columns");
assert(diamondSalesChecks.markup.includes('value="detailed"') && diamondSalesChecks.markup.includes('value="summary"'), "Diamond Sales radio options are incomplete");
for (const key of ["quantity", "grossWeight", "stoneWeight", "netWeight", "diamondCarat", "diamondAmount", "taxable", "lineAmount"]) assert.equal(Number(diamondSalesChecks.detailed.totals[key].toFixed(6)), Number(diamondSalesChecks.summary.totals[key].toFixed(6)), `Diamond Sales Summary ${key} must reconcile with Detailed`);
for (const row of diamondSalesChecks.detailed.rows) {
  assert.equal(Number(row.netWeight.toFixed(6)), Number(Math.max(0, row.grossWeight - row.stoneWeight).toFixed(6)), "Diamond Sales Detailed net weight is inconsistent");
  assert.equal(Number(row.lineAmount.toFixed(2)), Number((row.taxable + row.taxAmount + row.cessAmount + row.additionalAmount - row.discountAmount).toFixed(2)), "Diamond Sales Detailed amount calculation is inconsistent");
  assert(row.drillStorage === "bills" && row.drillView === "Sales Invoice");
}
const diamondSalesDetailDrillCheck = vm.runInContext(`(() => { salesReportOptions = { ...salesReportOptions, diamondSalesMode: "detailed" }; const row = diamondSalesReportConfig().rows[0]; if (!row) return { skipped: true }; openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: row.sourceBillNo, reportSection: row.sourceSection, reportTarget: row.drillTarget, reportStorage: row.drillStorage, reportView: row.drillView } }); return { skipped: false, active, salesView, loadedId: state.bills?.[0]?.id, expectedId: row.sourceBillId }; })()`, context);
if (!diamondSalesDetailDrillCheck.skipped) {
  assert.equal(diamondSalesDetailDrillCheck.active, "Sales", "Diamond Sales Detailed drill-down must open Sales");
  assert.equal(diamondSalesDetailDrillCheck.salesView, "Sales Invoice", "Diamond Sales Detailed drill-down must open Sales Entry");
  assert.equal(diamondSalesDetailDrillCheck.loadedId, diamondSalesDetailDrillCheck.expectedId, "Diamond Sales Detailed drill-down opened the wrong bill");
}
const diamondSalesSummaryDrillCheck = vm.runInContext(`(() => { salesReportOptions = { ...salesReportOptions, diamondSalesMode: "summary" }; const row = diamondSalesReportConfig().rows[0]; if (!row) return { skipped: true }; openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: row.sourceBillNo, reportSection: row.sourceSection, reportTarget: row.drillTarget, reportStorage: row.drillStorage, reportView: row.drillView } }); return { skipped: false, active, salesView, loadedId: state.bills?.[0]?.id, expectedId: row.sourceBillId }; })()`, context);
if (!diamondSalesSummaryDrillCheck.skipped) {
  assert.equal(diamondSalesSummaryDrillCheck.active, "Sales", "Diamond Sales Summary drill-down must open Sales");
  assert.equal(diamondSalesSummaryDrillCheck.salesView, "Sales Invoice", "Diamond Sales Summary drill-down must open Sales Entry");
  assert.equal(diamondSalesSummaryDrillCheck.loadedId, diamondSalesSummaryDrillCheck.expectedId, "Diamond Sales Summary drill-down opened the wrong bill");
}
const state = JSON.parse(storage.get("goldland-state"));
assert.equal(state.demoDataVersion, 2, "Demo migration version was not persisted");
const diamondReportMenuCheck = vm.runInContext(`(() => {
  selectReport("Diamond");
  const diamondParentTarget = selectedReport;
  const sidebar = diamondReportNavigation("sidebar");
  const top = diamondReportNavigation("top");
  selectReport("Diamond Purchase Return");
  return { sidebar, top, selectedReport, diamondParentTarget, groupItems: REPORT_MENU_GROUPS.find((group) => group.title === "Diamond")?.items || [] };
})()`, context);
assert.equal(diamondReportMenuCheck.diamondParentTarget, "Diamond Purchase", "Diamond parent menu must open the first implemented child instead of a placeholder");
for (const target of ["Diamond Purchase", "Diamond Purchase Return", "Diamond Sales"]) {
  assert(diamondReportMenuCheck.sidebar.includes(`data-report-item="${target}"`), `Diamond sidebar submenu is missing ${target}`);
  assert(diamondReportMenuCheck.top.includes(`data-report-item="${target}"`), `Diamond top submenu is missing ${target}`);
  assert(diamondReportMenuCheck.groupItems.includes(target), `Diamond report group is missing ${target}`);
}
assert.equal(diamondReportMenuCheck.selectedReport, "Diamond Purchase Return", "Diamond submenu selection did not route to the selected child report");
const diamondReportRoutes = vm.runInContext(`(() => ({
  purchase: (selectReport("Diamond Purchase"), reportPreview(selectedReport)),
  purchaseReturn: (selectReport("Diamond Purchase Return"), reportPreview(selectedReport)),
  sales: (selectReport("Diamond Sales"), reportPreview(selectedReport))
}))()`, context);
assert(diamondReportRoutes.purchase.includes("diamond-purchase-report"), "Diamond Purchase must remain connected to its implemented report screen");
assert(diamondReportRoutes.purchaseReturn.includes("diamond-pending-report") && diamondReportRoutes.purchaseReturn.includes("Purchase Return"), "Diamond Purchase Return must remain a placeholder until references are supplied");
assert(diamondReportRoutes.sales.includes("diamond-sales-report"), "Diamond Sales must remain connected to its implemented report screen");

const stockAdjustmentReportCheck = vm.runInContext(`(() => {
  state.stockAdjustments = [normalizeStockAdjustment({
    id: "SA-REPORT-1", entryNo: "SA00001", refNo: "COUNT-1", date: "06/08/2026", preparedBy: "Goldland Staff", reason: "Physical count correction", branchId: "MAIN",
    lines: [{ id: "BR", type: "Item Wise", barcode: "BR001", itemName: "BABY RING", nos: 10, gross: 25, stone: 1, nosAdd: 2, grossAdd: 4, stoneAdd: 0.2, nosLess: 1, grossLess: 2, stoneLess: 0.1 }]
  })];
  salesReportOptions = { ...salesReportOptions, shown: true, from: "06/08/2026", to: "06/08/2026" };
  return { config: stockAdjustmentReportConfig(), markup: reportPreview("Stock Adjustment") };
})()`, context);
const expectedStockAdjustmentColumns = ["ItemType", "EntryNo", "entryDate", "refno", "itemID", "item_Name", "barcode", "OldNos", "OldGross", "OldStone", "AddNos", "AddGross", "AddStone", "LessNos", "LessGross", "LessStone", "NewNos", "NewGross", "NewStone", "NewNet", "PreparedBy", "reason", "branchID"];
assert.deepEqual(Array.from(stockAdjustmentReportCheck.config.columns, (column) => column.label), expectedStockAdjustmentColumns, "Stock Adjustment Report columns no longer match the supplied old-software screen");
assert(stockAdjustmentReportCheck.markup.includes("stock-adjustment-report-grid"), "Stock Adjustment menu must render its completed report grid");
assert.equal(stockAdjustmentReportCheck.config.rows.length, 1, "Stock Adjustment Report must flatten saved adjustment lines into report rows");
const stockAdjustmentRow = stockAdjustmentReportCheck.config.rows[0];
assert.equal(stockAdjustmentRow.newNos, stockAdjustmentRow.oldNos + stockAdjustmentRow.addNos - stockAdjustmentRow.lessNos, "Stock Adjustment Report NewNos calculation is inconsistent");
assert.equal(Number(stockAdjustmentRow.newNet.toFixed(6)), Number((stockAdjustmentRow.newGross - stockAdjustmentRow.newStone).toFixed(6)), "Stock Adjustment Report NewNet calculation is inconsistent");
assert(stockAdjustmentRow.drillStorage === "stockAdjustments" && stockAdjustmentRow.drillTarget === "stock-adjustment", "Stock Adjustment Report row lost its entry drill target");

const smithTransferReportCheck = vm.runInContext(`(() => {
  state.smithWorkOrders = [normalizeSmithWorkOrder({ id: "SMITH-REPORT-1", entryNo: "NR00006", date: "06/08/2026", transType: "Normal", smithCode: "M0025", smithName: "SPJN", preparedBy: "Akhil", lines: [{ id: "OP", itemId: "OP", itemName: "Opening", mode: "IN", qty: 2, gross: 197.1, stone: 1.1, mudLess: 0.5, touch: 100, wastage: 0.25, stoneCharge: 12, mcGram: 5, hmc: 2, rate: 9075, barcode: "SM001" }] }), normalizeSmithWorkOrder({ id: "SMITH-REPORT-2", entryNo: "NR00007", date: "06/08/2026", smithCode: "M0026", smithName: "OTHER SMITH", lines: [{ itemName: "Ring", mode: "OUT", qty: 1, gross: 5, stone: 0 }] })];
  salesReportOptions = { ...salesReportOptions, shown: true, from: "06/08/2026", to: "06/08/2026", smithTransferParty: "SPJN" };
  const config = smithTransferReportConfig();
  const markup = reportPreview("Smith Transfer");
  const row = config.rows[0];
  openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportTarget: row.drillTarget, reportStorage: row.drillStorage, reportView: row.drillView } });
  return { config, markup, active, workOrderView, smithWorkView, loadedId: state.smithWorkOrders[0]?.id };
})()`, context);
const expectedSmithTransferColumns = ["Slno", "TransMode", "EntryNo", "EntryDate", "Mode", "Partyid", "Party_Name", "ItemID", "Item_Name", "SubGroup", "EmpName", "Qty", "Gross", "Stone", "Wastage", "Itouch", "NetWght", "StnCharge", "MCpGrm", "MakeCharge", "HMC", "Barcode", "SmithWeig", "Rate24", "Rate22", "Cost"];
assert.deepEqual(Array.from(smithTransferReportCheck.config.columns, (column) => column.label), expectedSmithTransferColumns, "Smith Transfer Report columns no longer match the supplied old-software screen");
assert.equal(smithTransferReportCheck.config.rows.length, 1, "Smith selector must filter the report to the selected smith");
assert(smithTransferReportCheck.markup.includes("All Smiths") && smithTransferReportCheck.markup.includes("SPJN") && smithTransferReportCheck.markup.includes("OTHER SMITH"), "Pink Smith selector must include every smith represented in the master or saved transfers");
const smithReportRow = smithTransferReportCheck.config.rows[0];
assert.equal(Number(smithReportRow.netWeight.toFixed(6)), Number((smithReportRow.gross - smithReportRow.stone - 0.5).toFixed(6)), "Smith Transfer NetWght calculation is inconsistent");
assert.equal(Number(smithReportRow.makingCharge.toFixed(6)), Number((smithReportRow.smithWeight * smithReportRow.mcPerGram).toFixed(6)), "Smith Transfer MakeCharge calculation is inconsistent");
assert.equal(smithTransferReportCheck.active, "Work Orders", "Smith Transfer row double-click must open Work Orders");
assert.equal(smithTransferReportCheck.workOrderView, "Smith", "Smith Transfer row double-click must open Smith work orders");
assert.equal(smithTransferReportCheck.smithWorkView, "Smith", "Smith Transfer row double-click must open the Smith transfer entry screen");
assert.equal(smithTransferReportCheck.loadedId, "SMITH-REPORT-1", "Smith Transfer row double-click opened the wrong bill");

const smithLedgerCheck = vm.runInContext(`(() => {
  state.parties = [...state.parties.filter((party) => party.type !== "Smith"), normalizeParty({ id: "M0011", customerCode: "M0011", type: "Smith", name: "Heera Chains", mobile: "7034251889", address: "Edakkara", openingWeight: 10 }), normalizeParty({ id: "M0036", customerCode: "M0036", type: "Smith", name: "PRABBHA", openingWeight: 0 })];
  state.smithWorkOrders = [
    normalizeSmithWorkOrder({ id: "SM-PRIOR", entryNo: "NR00001", date: "05/08/2026", smithCode: "M0011", smithName: "Heera Chains", lines: [{ mode: "OUT", gross: 5, stone: 0, smWeight: 5 }] }),
    normalizeSmithWorkOrder({ id: "SM-CURRENT", entryNo: "NR00002", date: "06/08/2026", smithCode: "M0011", smithName: "Heera Chains", remarks: "Chain work", lines: [{ mode: "OUT", gross: 3, stone: 0.2, smWeight: 3 }, { mode: "IN", gross: 2.2, stone: 0.2, smWeight: 2 }] })
  ];
  selectedSmithLedgerParty = "Heera Chains";
  smithLedgerOptions = { ...smithLedgerOptions, from: "06/08/2026", to: "06/08/2026", search: "", detailed: false };
  const picker = smithLedgerReportScreen();
  smithLedgerOptions = { ...smithLedgerOptions, detailed: true };
  const ledger = smithWeightLedgerEntries();
  const detail = smithLedgerReportScreen();
  return { picker, ledger, detail };
})()`, context);
assert(smithLedgerCheck.picker.includes("Heera Chains") && smithLedgerCheck.picker.includes("PRABBHA"), "Smith Ledger picker must show every Smith master");
assert(smithLedgerCheck.picker.includes("data-smith-ledger-party=\"Heera Chains\""), "Smith Ledger picker rows must support account selection and double-click");
assert.equal(smithLedgerCheck.ledger.rows[0].balance, 15, "Smith Ledger opening must include master opening weight and pre-period transfers");
assert.equal(smithLedgerCheck.ledger.totalToSmith, 3, "Smith Ledger To Smith total must include OUT weight exactly once");
assert.equal(smithLedgerCheck.ledger.totalFromSmith, 2, "Smith Ledger From Smith total must include IN weight exactly once");
assert.equal(smithLedgerCheck.ledger.closing, 16, "Smith Ledger closing balance calculation is inconsistent");
assert(smithLedgerCheck.detail.includes("Heera Chains - Weight Ledger Report") && smithLedgerCheck.detail.includes("NR00002"), "Double-clicked Smith must open its detailed Weight Ledger with voucher rows");

const smithDetailedLedgerCheck = vm.runInContext(`(() => {
  selectedSmithDetailedLedgerParty = "Heera Chains";
  smithDetailedLedgerOptions = { ...smithDetailedLedgerOptions, from: "06/08/2026", to: "06/08/2026", search: "Heera", detailed: false };
  const picker = smithLedgerDetailedReportScreen();
  smithDetailedLedgerOptions = { ...smithDetailedLedgerOptions, detailed: true };
  const config = smithDetailedLedgerConfig();
  const detail = smithLedgerDetailedReportScreen();
  return { picker, config, detail };
})()`, context);
assert(smithDetailedLedgerCheck.picker.includes("data-smith-detailed-party=\"Heera Chains\""), "Detailed Smith Ledger picker must expose double-clickable Smith rows");
assert.equal(smithDetailedLedgerCheck.config.rows[0].itemName, "Opening", "Detailed Smith Ledger must begin with an opening row");
assert.equal(smithDetailedLedgerCheck.config.rows[0].jewellerWeight, 15, "Detailed Smith Ledger opening weight must include pre-period transfers exactly once");
assert.equal(smithDetailedLedgerCheck.config.rows.length, 3, "Detailed Smith Ledger must expand the selected period into individual transfer lines");
for (const row of smithDetailedLedgerCheck.config.rows.slice(1)) {
  assert.equal(Number(row.netWeight.toFixed(6)), Number(Math.max(0, row.grossWeight - row.stoneWeight).toFixed(6)), "Detailed Smith Ledger NetWeight calculation is inconsistent");
  assert.equal(Number(row.pureWeight.toFixed(6)), Number((row.jewellerWeight * row.touch / 100).toFixed(6)), "Detailed Smith Ledger PureWeight calculation is inconsistent");
  assert.equal(Number(row.makeCharge.toFixed(6)), Number((row.jewellerWeight * row.mcPerGram).toFixed(6)), "Detailed Smith Ledger MakeCharge calculation is inconsistent");
}
for (const label of ["EntryNo", "EntryDate", "ItemID", "ItemName", "Mode", "Nos", "GrossWght", "StoneWght", "Touch", "Wastage", "NetWeight", "StnCharge", "MCperGrm", "MakeCharge", "JewellerWght", "PureWeight", "RowTotal", "transType", "Remarks"]) assert(smithDetailedLedgerCheck.detail.includes(`<th>${label}</th>`), `Detailed Smith Ledger is missing ${label}`);

const smithReconciliationCheck = vm.runInContext(`(() => {
  salesReportOptions = { ...salesReportOptions, shown: true, from: "06/08/2026", to: "06/08/2026", smithReconciliationOption: "Reconciliation" };
  const reconciliationRows = smithReconciliationPartyRows();
  const reconciliation = smithReconciliationReportScreen();
  salesReportOptions = { ...salesReportOptions, smithReconciliationOption: "Summary" };
  const summary = smithReconciliationTableArgs("Summary");
  salesReportOptions = { ...salesReportOptions, smithReconciliationOption: "Day Summary" };
  const day = smithReconciliationTableArgs("Day Summary");
  return { reconciliationRows, reconciliation, summary, day };
})()`, context);
const reportTransferMenuLabels = vm.runInContext(`REPORT_ROOT_MENU_ITEMS.find((item) => item.label === "Transfers").children.map((item) => item.label)`, context);
assert(!reportTransferMenuLabels.includes("Polishing"), "Polishing is still visible in the Reports transfer submenu");
assert(!reportTransferMenuLabels.includes("Cash For Weight"), "Cash For Weight is still visible in the Reports transfer submenu");
for (const option of ["Reconciliation", "Summary", "Day Summary"]) assert(smithReconciliationCheck.reconciliation.includes(`>${option}</option>`), `Smith Reconciliation dropdown is missing ${option}`);
assert(!smithReconciliationCheck.reconciliation.includes("Jewellery Summary-2"), "Removed Jewellery Summary-2 option is still visible");
const heeraReconciliation = smithReconciliationCheck.reconciliationRows.find((row) => row.partyName === "Heera Chains");
assert.equal(heeraReconciliation.opening, 15, "Smith Reconciliation opening must include pre-period transfers");
assert.equal(heeraReconciliation.toSmith, 3, "Smith Reconciliation ToSmith must include OUT weight once");
assert.equal(heeraReconciliation.fromSmith, 2, "Smith Reconciliation FromSmith must include IN weight once");
assert.equal(heeraReconciliation.closing, 16, "Smith Reconciliation Closing must equal Opening + ToSmith - FromSmith");
assert.equal(heeraReconciliation.status, "Give", "Positive Smith closing weight must have Give status");
const summaryRows = smithReconciliationCheck.summary[1], dayRows = smithReconciliationCheck.day[1];
assert.equal(summaryRows.find((row) => row.partyName === "Heera Chains").weight, 16, "Smith Summary Weight must match reconciliation closing");
const heeraDay = dayRows.find((row) => row.partyName === "Heera Chains");
assert.equal(heeraDay.netIn - heeraDay.netOut, 16, "Smith Day Summary net direction must match reconciliation closing");

const itemTransferReportCheck = vm.runInContext(`(() => {
  state.itemTransfers = [normalizeItemTransfer({ id: "IT-REPORT-1", entryNo: "261", date: "16/06/2026", refNo: "243", salesman: "AJITH", smCode: "AH", time: "02:11:38 PM", stockLocation: "Main Stock", lines: [{ id: "IT-L1", itemId: "L", itemName: "LOCKET", barcode: "L001387", mode: "OUT", qty: 0, gross: 0.010, stone: 0 }, { id: "IT-L2", itemId: "L", itemName: "LOCKET", mode: "IN", qty: 0, gross: 0.010, stone: 0 }] })];
  salesReportOptions = { ...salesReportOptions, from: "10/06/2026", to: "06/08/2026", itemTransferFormat: "1" };
  const config = itemTransferReportConfig(), markup = itemTransferReportScreen(), row = config.rows[0];
  openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportTarget: row.drillTarget, reportStorage: row.drillStorage, reportView: row.drillView } });
  const detail = itemTransferScreen(), totals = itemTransferTotals(state.itemTransfers[0]);
  salesReportOptions = { ...salesReportOptions, itemTransferFormat: "2" };
  const format2Config = itemTransferFormatTwoConfig(), format2 = itemTransferReportScreen();
  return { config, markup, detail, totals, format2Config, format2, active, stockView, loadedId: state.itemTransfers[0]?.id };
})()`, context);
assert.deepEqual(Array.from(itemTransferReportCheck.config.columns, (column) => column.label), ["Entry_No", "Date", "Ref_No", "ITEM_ID", "Item_Name", "Mode", "Qty", "Gross", "Stone", "Net", "Barcode", "SMCode"], "Item Transfer Format 1 columns no longer match the supplied screen");
assert.equal(itemTransferReportCheck.config.rows.length, 2, "Item Transfer report must flatten every saved bill line");
for (const row of itemTransferReportCheck.config.rows) assert.equal(Number(row.net.toFixed(6)), Number((row.gross - row.stone).toFixed(6)), "Item Transfer Net calculation is inconsistent");
assert.equal(itemTransferReportCheck.config.rows[0].barcode, "L001387", "Item Transfer Format 1 lost the line barcode");
assert.equal(itemTransferReportCheck.config.rows[0].smCode, "AH", "Item Transfer Format 1 lost the salesman code");
assert.equal(itemTransferReportCheck.totals.inGross, 0.010, "Item Transfer detail Total IN is inconsistent");
assert.equal(itemTransferReportCheck.totals.outGross, 0.010, "Item Transfer detail Total OUT is inconsistent");
assert.equal(itemTransferReportCheck.active, "Stock", "Item Transfer row double-click must open Stock");
assert.equal(itemTransferReportCheck.stockView, "Item Transfer", "Item Transfer row double-click must open the Item Transfer bill screen");
assert.equal(itemTransferReportCheck.loadedId, "IT-REPORT-1", "Item Transfer row double-click opened the wrong bill");
assert(itemTransferReportCheck.detail.includes("L001387") && itemTransferReportCheck.detail.includes("Total IN") && itemTransferReportCheck.detail.includes("Total OUT"), "Detailed Item Transfer bill is missing its lines or totals");
assert(itemTransferReportCheck.markup.includes("Format 1") && itemTransferReportCheck.markup.includes("Format 2"), "Item Transfer report is missing its format controls");
assert.deepEqual(Array.from(itemTransferReportCheck.format2Config.columns, (column) => column.label), ["Entry_No", "Date", "Out_Item", "Out_Mode", "Out_Qty", "Out_Gross", "Out_Stone", "Out_Net", "In_Item", "In_Mode", "In_Qty", "In_Gross", "In_Stone", "In_Net"], "Item Transfer Format 2 columns no longer match the supplied screen");
assert.equal(itemTransferReportCheck.format2Config.rows.length, 1, "Item Transfer Format 2 must pair corresponding OUT and IN lines");
const itemTransferPair = itemTransferReportCheck.format2Config.rows[0];
assert.equal(itemTransferPair.outItem, "LOCKET", "Item Transfer Format 2 lost the OUT item");
assert.equal(itemTransferPair.inItem, "LOCKET", "Item Transfer Format 2 lost the IN item");
assert.equal(Number(itemTransferPair.outNet.toFixed(6)), Number((itemTransferPair.outGross - itemTransferPair.outStone).toFixed(6)), "Item Transfer Format 2 OUT net is inconsistent");
assert.equal(Number(itemTransferPair.inNet.toFixed(6)), Number((itemTransferPair.inGross - itemTransferPair.inStone).toFixed(6)), "Item Transfer Format 2 IN net is inconsistent");
assert(itemTransferPair.drillStorage === "itemTransfers" && itemTransferPair.drillTarget === "item-transfer", "Item Transfer Format 2 lost its detailed bill drill target");
assert(itemTransferReportCheck.format2.includes("item-transfer-format-two-grid") && !itemTransferReportCheck.format2.includes("placeholder"), "Item Transfer Format 2 must render its completed paired report");

const jewellerTransferReportCheck = vm.runInContext(`(() => {
  state.jewellerWorkOrders = [normalizeJewellerWorkOrder({ id: "JW-REPORT-1", entryNo: "AR00077", date: "06/08/2026", paymentMode: "Credit", transType: "Normal Work", jewellerCode: "J0007", jewellerName: "Babu Jeweller", preparedBy: "Sajitha", lines: [
    { id: "JW-L1", itemId: "B", itemName: "BANGLE", barcode: "B000077", mode: "OUT", qty: 2, gross: 20, stone: 1, mudLess: 0.5, touch: 90, wastage: 0.25, stoneCharge: 10, mcGram: 5, vaPercent: 0, hmc: 2, rate: 100 },
    { id: "JW-L2", itemId: "R", itemName: "RING", barcode: "R000077", mode: "IN", qty: 1, gross: 8, stone: 0.5, mudLess: 0, touch: 92, wastage: 0.1, stoneCharge: 4, mcGram: 3, vaPercent: 0, hmc: 1, rate: 100 }
  ]})];
  salesReportOptions = { ...salesReportOptions, shown: true, from: "01/08/2026", to: "10/08/2026", jewellerTransferFilter: "All" };
  const all = jewellerTransferReportConfig(), markup = jewellerTransferReportScreen();
  salesReportOptions = { ...salesReportOptions, jewellerTransferFilter: "Sample OUT" };
  const sampleOut = jewellerTransferReportConfig(), filteredMarkup = jewellerTransferReportScreen();
  const row = sampleOut.rows[0];
  openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: "", reportSection: row.sourceSection, reportTarget: row.drillTarget, reportStorage: row.drillStorage, reportView: row.drillView } });
  return { all, sampleOut, markup, filteredMarkup, active, workOrderView, draftId: jewellerWorkDraft.id };
})()`, context);
assert.equal(jewellerTransferReportCheck.all.columns.map((column) => column.label).join("|"), ["Slno", "TransMode", "EntryNo", "EntryDate", "Mode", "Partyid", "Party_Name", "ItemID", "Item_Name", "SubGroup", "EmpName", "Qty", "Gross", "Stone", "Wastage", "NetWght", "StnCharge", "MCpGrm", "MakeCharge", "HMC", "Barcode", "JewellerWeight", "iTouch", "Difference"].join("|"), "Jeweller Transfer columns do not match the supplied report");
assert.equal(jewellerTransferReportCheck.all.rows.length, 2, "Jeweller Transfer All filter must include IN and OUT lines");
assert.equal(jewellerTransferReportCheck.sampleOut.rows.length, 1, "Jeweller Transfer Sample OUT filter must include only outgoing lines");
assert.equal(jewellerTransferReportCheck.sampleOut.rows[0].mode, "OUT", "Sample OUT returned a non-OUT line");
for (const row of jewellerTransferReportCheck.all.rows) {
  assert.equal(Number(row.netWeight.toFixed(6)), Number(Math.max(0, row.gross - row.stone - row.mudLess).toFixed(6)), "Jeweller Transfer net weight is inconsistent");
  assert.equal(Number(row.difference.toFixed(6)), Number((row.jewellerWeight - row.jewellerWeight * row.itemTouch / 100).toFixed(6)), "Jeweller Transfer Difference is inconsistent");
}
assert(jewellerTransferReportCheck.markup.includes(">All</option>") && jewellerTransferReportCheck.markup.includes(">Sample OUT</option>"), "Jeweller Transfer dropdown options are incomplete");
assert(jewellerTransferReportCheck.filteredMarkup.includes("jeweller-transfer-report-grid"), "Filtered Jeweller Transfer report did not render");
assert.equal(jewellerTransferReportCheck.active, "Work Orders", "Jeweller report double-click did not open Work Orders");
assert.equal(jewellerTransferReportCheck.workOrderView, "Jeweller", "Jeweller report double-click opened the wrong transaction screen");
assert.equal(jewellerTransferReportCheck.draftId, "JW-REPORT-1", "Jeweller report double-click did not open the selected bill");

const jewellerLedgerCheck = vm.runInContext(`(() => {
  state.parties = [...state.parties.filter((party) => party.name !== "SAMPLE OUT"), { id: "JW-SAMPLE", customerCode: "J0001", name: "SAMPLE OUT", type: "Jeweller", mobile: "", address: "", place: "", openingWeight: 5 }];
  state.jewellerWorkOrders = [
    normalizeJewellerWorkOrder({ id: "JW-PRE", entryNo: "AR00070", date: "31/07/2026", jewellerName: "SAMPLE OUT", lines: [{ itemName: "BANGLE", mode: "OUT", gross: 10, stone: 0, jwWeight: 10 }, { itemName: "RING", mode: "IN", gross: 2, stone: 0, jwWeight: 2 }] }),
    normalizeJewellerWorkOrder({ id: "JW-DAY", entryNo: "AR00071", date: "06/08/2026", jewellerName: "SAMPLE OUT", transType: "Normal Work", remarks: "Sample movement", lines: [{ itemName: "CHAIN", mode: "OUT", gross: 4, stone: 0, jwWeight: 4 }, { itemName: "RING", mode: "IN", gross: 1, stone: 0, jwWeight: 1 }] })
  ];
  selectedJewellerLedgerParty = "SAMPLE OUT";
  jewellerLedgerOptions = { ...jewellerLedgerOptions, from: "06/08/2026", to: "06/08/2026", search: "", detailed: false };
  const picker = jewellerLedgerReportScreen(), ledger = jewellerWeightLedgerEntries();
  jewellerLedgerOptions = { ...jewellerLedgerOptions, detailed: true };
  const detail = jewellerLedgerReportScreen();
  return { picker, ledger, detail };
})()`, context);
const jewellerReportSubmenu = vm.runInContext(`REPORT_ROOT_MENU_ITEMS.find((item) => item.label === "Transfers").children.find((item) => item.label === "Jeweller").children.join("|")`, context);
assert.equal(jewellerReportSubmenu, "Jeweller Transfer|Ledger|Ledger Detailed|Reconciliation", "Jeweller report submenu does not match the supplied menu");
assert(jewellerLedgerCheck.picker.includes('data-jeweller-ledger-party="SAMPLE OUT"'), "Jeweller Ledger picker rows are not selectable or double-clickable");
assert.equal(jewellerLedgerCheck.ledger.rows[0].particular, "Day Opening", "Jeweller Ledger must begin with a Day Opening row");
assert.equal(jewellerLedgerCheck.ledger.rows[0].balance, 13, "Jeweller Ledger opening must include master opening and pre-period movements exactly once");
assert.equal(jewellerLedgerCheck.ledger.totalToJeweller, 4, "Jeweller Ledger To Jeweller total is incorrect");
assert.equal(jewellerLedgerCheck.ledger.totalFromJeweller, 1, "Jeweller Ledger From Jeweller total is incorrect");
assert.equal(jewellerLedgerCheck.ledger.closing, 16, "Jeweller Ledger closing must equal opening + OUT - IN");
for (const label of ["SL", "Date", "Vou.No", "Particular", "To Jeweller", "From Jeweller", "Balance", "Out/In"]) assert(jewellerLedgerCheck.detail.includes(`<th>${label}</th>`), `Jeweller Weight Ledger is missing ${label}`);
assert(jewellerLedgerCheck.detail.includes("AR00071") && jewellerLedgerCheck.detail.includes("Sample movement"), "Jeweller Weight Ledger is missing the selected period transaction");
assert(jewellerLedgerCheck.detail.includes("Total Weight") && jewellerLedgerCheck.detail.includes("Balance Weight"), "Jeweller Weight Ledger totals did not render");

const jewellerDetailedLedgerCheck = vm.runInContext(`(() => {
  state.parties = [...state.parties.filter((party) => party.name !== "SAMPLE OUT"), { id: "JW-SAMPLE", customerCode: "J0001", name: "SAMPLE OUT", type: "Jeweller", mobile: "", address: "", place: "", openingWeight: 2, touch: 90 }];
  state.jewellerWorkOrders = [
    normalizeJewellerWorkOrder({ id: "JW-DETAIL-PRE", entryNo: "AR00080", date: "31/07/2026", jewellerName: "SAMPLE OUT", lines: [{ itemId: "B", itemName: "BANGLE", mode: "OUT", gross: 3, stone: 0, jwWeight: 3, touch: 80 }] }),
    normalizeJewellerWorkOrder({ id: "JW-DETAIL-DAY", entryNo: "AR00081", date: "06/08/2026", jewellerName: "SAMPLE OUT", transType: "Normal Work", remarks: "Detailed sample work", lines: [{ itemId: "C", itemName: "CHAIN", mode: "OUT", qty: 2, gross: 10, stone: 1, mudLess: 0.5, jwWeight: 8.5, touch: 90, wastage: 0.2, stoneCharge: 4, mcGram: 5, vaPercent: 10, hmc: 2, rate: 100 }] })
  ];
  selectedJewellerDetailedLedgerParty = "SAMPLE OUT";
  jewellerDetailedLedgerOptions = { ...jewellerDetailedLedgerOptions, from: "06/08/2026", to: "06/08/2026", search: "", detailed: false };
  const picker = jewellerDetailedLedgerReportScreen(), config = jewellerDetailedLedgerConfig();
  jewellerDetailedLedgerOptions = { ...jewellerDetailedLedgerOptions, detailed: true };
  const detail = jewellerDetailedLedgerReportScreen();
  return { picker, config, detail };
})()`, context);
assert(jewellerDetailedLedgerCheck.picker.includes('data-jeweller-detailed-party="SAMPLE OUT"'), "Detailed Jeweller Ledger picker rows are not selectable or double-clickable");
assert.equal(jewellerDetailedLedgerCheck.config.rows.length, 2, "Detailed Jeweller Ledger must contain opening plus every in-period line");
const jewellerOpeningRow = jewellerDetailedLedgerCheck.config.rows[0], jewellerDetailRow = jewellerDetailedLedgerCheck.config.rows[1];
assert.equal(jewellerOpeningRow.itemName, "Opening", "Detailed Jeweller Ledger must begin with Opening");
assert.equal(jewellerOpeningRow.jewellerWeight, 5, "Detailed Jeweller Ledger opening weight must include pre-period movements exactly once");
assert.equal(Number(jewellerOpeningRow.pureWeight.toFixed(6)), 4.2, "Detailed Jeweller Ledger opening pure weight is incorrect");
assert.equal(jewellerDetailRow.netWeight, 8.5, "Detailed Jeweller Ledger NetWeight must equal Gross - Stone - MudLess");
assert.equal(jewellerDetailRow.makeCharge, 127.5, "Detailed Jeweller Ledger MakeCharge did not use Jeweller transaction logic");
assert.equal(Number(jewellerDetailRow.pureWeight.toFixed(6)), 7.65, "Detailed Jeweller Ledger PureWeight must equal JewellerWeight * Touch / 100");
assert.equal(jewellerDetailRow.rowTotal, 983.5, "Detailed Jeweller Ledger RowTotal is inconsistent");
for (const label of ["Sl", "EntryNo", "EntryDate", "ItemID", "ItemName", "Mode", "Nos", "GrossWght", "StoneWght", "Touch", "Wastage", "NetWeight", "StnCharge", "MCperGrm", "MakeCharge", "JewellerWght", "PureWeight", "RowTotal", "transType", "Remarks"]) assert(jewellerDetailedLedgerCheck.detail.includes(`<th>${label}</th>`), `Detailed Jeweller Ledger is missing ${label}`);
assert(jewellerDetailedLedgerCheck.detail.includes("AR00081") && jewellerDetailedLedgerCheck.detail.includes("Detailed sample work"), "Detailed Jeweller Ledger is missing its saved transaction details");

const jewellerReconciliationCheck = vm.runInContext(`(() => {
  salesReportOptions = { ...salesReportOptions, shown: true, from: "06/08/2026", to: "06/08/2026", jewellerReconciliationOption: "Reconciliation" };
  const partyRows = jewellerReconciliationPartyRows(), reconciliation = jewellerReconciliationReportScreen(), reconciliationArgs = jewellerReconciliationTableArgs("Reconciliation");
  salesReportOptions = { ...salesReportOptions, jewellerReconciliationOption: "Summary" };
  const summary = jewellerReconciliationTableArgs("Summary"), summaryMarkup = jewellerReconciliationReportScreen();
  salesReportOptions = { ...salesReportOptions, jewellerReconciliationOption: "Day Summary" };
  const day = jewellerReconciliationTableArgs("Day Summary"), dayMarkup = jewellerReconciliationReportScreen();
  return { partyRows, reconciliation, reconciliationArgs, summary, summaryMarkup, day, dayMarkup };
})()`, context);
for (const option of ["Reconciliation", "Summary", "Day Summary"]) assert(jewellerReconciliationCheck.reconciliation.includes(`>${option}</option>`), `Jeweller Reconciliation dropdown is missing ${option}`);
assert(!jewellerReconciliationCheck.reconciliation.includes("Jewellery Summary-2"), "Removed Jewellery Summary-2 option is still visible in Jeweller Reconciliation");
const sampleJewellerReconciliation = jewellerReconciliationCheck.partyRows.find((row) => row.partyName === "SAMPLE OUT");
assert.equal(sampleJewellerReconciliation.opening, 5, "Jeweller Reconciliation opening must include pre-period movements");
assert.equal(sampleJewellerReconciliation.toJeweller, 8.5, "Jeweller Reconciliation ToJewell is incorrect");
assert.equal(sampleJewellerReconciliation.fromJeweller, 0, "Jeweller Reconciliation FromJewel is incorrect");
assert.equal(sampleJewellerReconciliation.closing, 13.5, "Jeweller Reconciliation Closing must equal Opening + ToJewell - FromJewel");
assert.equal(sampleJewellerReconciliation.status, "Give", "Positive Jeweller closing must have Give status");
assert.equal(jewellerReconciliationCheck.reconciliationArgs[0].map((column) => column.label).join("|"), "PartyID|PartyName|Groups|Opening|ToJewell|FromJewel|Closing|Status", "Jeweller Reconciliation columns do not match the supplied screen");
const jewellerSummaryRow = jewellerReconciliationCheck.summary[1].find((row) => row.partyName === "SAMPLE OUT");
assert.equal(jewellerSummaryRow.weight, 13.5, "Jeweller Summary Weight must match reconciliation closing");
assert.equal(jewellerReconciliationCheck.summary[0].map((column) => column.label).join("|"), "PartyID|PartyName|Groups|Weight|Amount", "Jeweller Summary columns do not match the supplied screen");
const jewellerDayRow = jewellerReconciliationCheck.day[1].find((row) => row.partyName === "SAMPLE OUT");
assert.equal(jewellerDayRow.netIn, 8.5, "Jeweller Day Summary NetIn is incorrect");
assert.equal(jewellerDayRow.netOut, 0, "Jeweller Day Summary NetOut is incorrect");
assert.equal(jewellerReconciliationCheck.day[0].map((column) => column.label).join("|"), "Slno|TransMode|EntryDate|Grp_EntryNo|EntryNo|Party_Name|NetIn|NetOut|SmithIn|smithOut", "Jeweller Day Summary columns do not match the supplied screen");
assert(jewellerReconciliationCheck.summaryMarkup.includes("jeweller-reconciliation-summary-grid"), "Jeweller Summary screen did not render");
assert(jewellerReconciliationCheck.dayMarkup.includes("jeweller-reconciliation-day-grid"), "Jeweller Day Summary screen did not render");

const salesOrderReportCheck = vm.runInContext(`(() => {
  state.orderAdvances = [];
  state.orderAdvanceRefunds = [];
  state.salesOrders = [
    normalizeBill({ id: "ORDER-REPORT-1", entryNo: "2120", refNo: "2120", billNo: "ORD-2120", date: "01/04/2026", dueDate: "08/04/2026", type: "Sales Order", paymentMode: "Cash", customer: "RAMLATH", address: "VAZHIKKADAVU", phone: "9645076881", staffName: "AJITH", status: "Pending", paymentBreakup: { cash: 20, bank: 30, gpay: 0, card: 0, other: 0 }, adjustments: { card: 0 }, sections: { sales: [{ item: "B", itemName: "BANGLE", qty: 1, gross: 2, stone: 0.1, rate: 100, va: 10, mcPerGm: 5, stoneCharge: 3, model: "MCB B2", length: "8 inch", breadth: "23/16", taxPct: 0 }], exchange: [{ item: "OG", itemName: "OLD GOLD", qty: 1, gross: 1, stone: 0, rate: 50, taxPct: 0 }], return: [] } }),
    normalizeBill({ id: "ORDER-REPORT-2", entryNo: "2121", refNo: "2121", billNo: "ORD-2121", date: "02/04/2026", dueDate: "12/04/2026", type: "Sales Order", paymentMode: "Cash", customer: "REENA", address: "PUTHENPEEDIKA", phone: "9400970000", staffName: "JABY", status: "Finished", paymentBreakup: { cash: 0, bank: 0, gpay: 0, card: 0, other: 0 }, adjustments: { card: 0 }, sections: { sales: [{ item: "R", itemName: "RING", qty: 1, gross: 1, stone: 0, rate: 100, va: 0, mcPerGm: 0, taxPct: 0 }], exchange: [], return: [] } })
  ];
  salesReportOptions = { ...salesReportOptions, from: "01/04/2026", to: "31/03/2027", salesOrderStatus: "All", salesOrderFormat: "Register", shown: true };
  const register = salesOrderReportConfig(), markup = salesOrderReportScreen(), first = register.rows[0];
  salesReportOptions = { ...salesReportOptions, salesOrderStatus: "Pending" };
  const pending = salesOrderReportConfig();
  salesReportOptions = { ...salesReportOptions, salesOrderStatus: "Finished" };
  const finished = salesOrderReportConfig();
  salesReportOptions = { ...salesReportOptions, salesOrderStatus: "All", salesOrderFormat: "Report" };
  const report = salesOrderReportConfig();
  openReportBillDetail({ dataset: { reportBillId: first.sourceBillId, reportEntryNo: first.sourceEntryNo, reportBillNo: first.sourceBillNo, reportSection: first.sourceSection, reportTarget: first.drillTarget, reportStorage: first.drillStorage, reportView: first.drillView } });
  return { register, markup, first, pending, finished, report, active, salesView, openedId: state.salesOrders[0].id };
})()`, context);
assert.equal(salesOrderReportCheck.register.columns.map((column) => column.label).join("|"), ["Salemen", "Eno", "RefNo", "OrdDate", "DueDate", "OrderType", "PartyName", "Address", "Phone", "OrdTotal", "ExchAmt", "RtAmt", "BankAmt", "CashAdvance", "Balance", "TtlAdvance", "OrdWeight", "ExchWeight", "RtWeight", "TtlAdvWeight"].join("|"), "Sales Order Register columns do not match the supplied screen");
assert.equal(salesOrderReportCheck.register.rows.length, 2, "Sales Order All filter must include Pending and Finished orders");
assert.equal(salesOrderReportCheck.pending.rows.length, 1, "Sales Order Pending filter is incorrect");
assert.equal(salesOrderReportCheck.pending.rows[0].status, "Pending", "Pending filter returned a finished order");
assert.equal(salesOrderReportCheck.finished.rows.length, 1, "Sales Order Finished filter is incorrect");
assert.equal(salesOrderReportCheck.finished.rows[0].status, "Finished", "Finished filter returned a pending order");
assert.equal(Number(salesOrderReportCheck.first.totalAdvance.toFixed(6)), Number((salesOrderReportCheck.first.exchangeAmount + salesOrderReportCheck.first.returnAmount + salesOrderReportCheck.first.bankAmount + salesOrderReportCheck.first.cashAdvance).toFixed(6)), "Sales Order Total Advance composition is inconsistent");
assert.equal(Number(salesOrderReportCheck.first.balance.toFixed(6)), Number((salesOrderReportCheck.first.orderTotal - salesOrderReportCheck.first.totalAdvance).toFixed(6)), "Sales Order Balance must equal Order Total - Total Advance");
assert.equal(Number(salesOrderReportCheck.first.orderWeight.toFixed(6)), 1.9, "Sales Order order weight is incorrect");
assert.equal(Number(salesOrderReportCheck.first.exchangeWeight.toFixed(6)), 1, "Sales Order exchange weight is incorrect");
assert(salesOrderReportCheck.markup.includes(">All</option>") && salesOrderReportCheck.markup.includes(">Pending</option>") && salesOrderReportCheck.markup.includes(">Finished</option>"), "Sales Order status filter options are incomplete");
for (const option of ["Register", "Report"]) assert(salesOrderReportCheck.markup.includes(`>${option}</option>`), `Sales Order format filter is missing ${option}`);
assert(!salesOrderReportCheck.markup.includes("Weight Deposit"), "Unused Sales Order Weight Deposit option is still visible");
assert(salesOrderReportCheck.report.gridClass === "sales-order-line-report-grid" && salesOrderReportCheck.report.rows.length > 0, "Sales Order Report format is not functional");
assert.equal(salesOrderReportCheck.report.columns.map((column) => column.label).join("|"), ["Salemen", "ENo", "RefNo", "OrdDate", "Customer", "phone", "ItemName", "Qty", "Gross", "Stone", "Net", "VA%", "MC", "MC/Grm", "Stn Charge", "Rate", "Amount", "Model", "Length", "Breadth"].join("|"), "Sales Order Report columns do not match the supplied screen");
const salesOrderLineReportRow = salesOrderReportCheck.report.rows.find((row) => row.entryNo === "2120");
assert.equal(salesOrderLineReportRow.net, 1.9, "Sales Order Report Net must equal Gross - Stone");
assert.equal(salesOrderLineReportRow.vaPercent, 10, "Sales Order Report lost VA%");
assert.equal(salesOrderLineReportRow.makingCharge, 19, "Sales Order Report MC did not use the Order Entry calculation");
assert.equal(salesOrderLineReportRow.mcPerGram, 10, "Sales Order Report MC/Grm is inconsistent with MC and Net");
assert.equal(salesOrderLineReportRow.stoneCharge, 3, "Sales Order Report lost stone charge");
assert.equal(salesOrderLineReportRow.amount, 212, "Sales Order Report Amount is inconsistent");
assert.equal(`${salesOrderLineReportRow.model}|${salesOrderLineReportRow.length}|${salesOrderLineReportRow.breadth}`, "MCB B2|8 inch|23/16", "Sales Order Report lost model or dimensions");
assert.equal(salesOrderReportCheck.active, "Sales", "Sales Order report double-click did not open Sales");
assert.equal(salesOrderReportCheck.salesView, "Sales Order", "Sales Order report double-click opened the wrong entry screen");
assert.equal(salesOrderReportCheck.openedId, "ORDER-REPORT-1", "Sales Order report double-click opened the wrong Order Entry bill");
const salesOrderSubmenu = vm.runInContext(`REPORT_ROOT_MENU_ITEMS.find((item) => item.label === "Sales Order").children.map((item) => item.label).join("|")`, context);
assert.equal(salesOrderSubmenu, "Sales Order|Additional Order Advance|Order Advance Refund|Advance Booking", "Sales Order report submenu does not match the supplied menu");

const additionalOrderAdvanceReportCheck = vm.runInContext(`(() => {
  const order = normalizeBill({ id: "ORDER-ADVANCE-ORDER", entryNo: "2118", refNo: "2118", date: "02/04/2026", dueDate: "29/04/2026", customer: "RAZAK MANJERI", phone: "7034669919", sections: { sales: [{ item: "B", itemName: "BANGLE", qty: 1, gross: 13.25995, stone: 0, rate: 13880, taxPct: 0 }], exchange: [], return: [] } });
  const advance = normalizeOrderAdvanceRecord({ id: "ORDER-ADVANCE-1", orderId: order.id, orderEntryNo: "2118", orderRefNo: "2118", entryNo: "1", refNo: "1", date: "02/04/2026", cashBank: "Federal Bank", paymentMode: "Bank", advanceAmount: 100000, exchangeAmount: 0, goldRateGram: 13880, remark: "First additional advance" }, "advance");
  state.salesOrders = [order];
  state.orderAdvances = [advance];
  salesReportOptions = { ...salesReportOptions, from: "01/04/2026", to: "31/03/2027", shown: true };
  const config = additionalOrderAdvanceReportConfig(), row = config.rows[0], markup = additionalOrderAdvanceReportScreen();
  openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: row.sourceBillNo, reportSection: row.sourceSection, reportTarget: row.drillTarget, reportStorage: row.drillStorage, reportView: row.drillView } });
  return { columns: config.columns.map((column) => column.label).join("|"), row, markup, active, salesView, draftId: orderAdvanceDraft.id, pickOrder: orderAdvanceDraft.pickOrder };
})()`, context);
assert.equal(additionalOrderAdvanceReportCheck.columns, "EntryNo|EntryDate|RefNo|PartyName|Phone|OrderNo|OrderDate|OrderTotal|AdvanceType|Amount|ExchangeAmount|TotalAdvance|Goldrate|AprxWeight|Remark", "Additional Order Advance columns do not match the supplied screen");
assert.equal(additionalOrderAdvanceReportCheck.row.totalAdvance, 100000, "Additional Order Advance TotalAdvance calculation is incorrect");
assert.equal(Number(additionalOrderAdvanceReportCheck.row.approximateWeight.toFixed(3)), 7.205, "Additional Order Advance AprxWeight must equal TotalAdvance / Goldrate");
assert.equal(additionalOrderAdvanceReportCheck.row.partyName, "RAZAK MANJERI", "Additional Order Advance did not join the Sales Order party details");
assert(additionalOrderAdvanceReportCheck.markup.includes("additional-order-advance-report-grid"), "Additional Order Advance report screen did not render");
assert.equal(additionalOrderAdvanceReportCheck.active, "Sales", "Additional Order Advance drill-down did not open Sales");
assert.equal(additionalOrderAdvanceReportCheck.salesView, "Additional Order Advance", "Additional Order Advance drill-down opened the wrong entry screen");
assert.equal(additionalOrderAdvanceReportCheck.draftId, "ORDER-ADVANCE-1", "Additional Order Advance drill-down opened the wrong saved entry");
assert.equal(additionalOrderAdvanceReportCheck.pickOrder, "2118", "Additional Order Advance drill-down lost its linked Sales Order");

const orderAdvanceRefundReportCheck = vm.runInContext(`(() => {
  const refund = normalizeOrderAdvanceRecord({ id: "ORDER-REFUND-1", orderId: "ORDER-REFUND-ORDER", orderEntryNo: "2094", orderRefNo: "2094", entryNo: "1", refNo: "1", date: "01/04/2026", refundAmount: 1000, goldRateGram: 13880, remark: "Cash refund" }, "refund");
  state.orderAdvanceRefunds = [refund];
  salesReportOptions = { ...salesReportOptions, from: "01/04/2026", to: "31/03/2027", shown: true };
  const config = orderAdvanceRefundReportConfig(), row = config.rows[0], markup = orderAdvanceRefundReportScreen();
  openReportBillDetail({ dataset: { reportBillId: row.sourceBillId, reportEntryNo: row.sourceEntryNo, reportBillNo: row.sourceBillNo, reportSection: row.sourceSection, reportTarget: row.drillTarget, reportStorage: row.drillStorage, reportView: row.drillView } });
  return { columns: config.columns.map((column) => column.label).join("|"), row, markup, active, salesView, draftId: orderAdvanceRefundDraft.id, pickOrder: orderAdvanceRefundDraft.pickOrder };
})()`, context);
assert.equal(orderAdvanceRefundReportCheck.columns, "branchENo|eDate|refNo|orderNo|refundAmt|refundWeight|remark", "Order Advance Refund columns do not match the supplied screen");
assert.equal(orderAdvanceRefundReportCheck.row.refundAmount, 1000, "Order Advance Refund amount is incorrect");
assert.equal(Number(orderAdvanceRefundReportCheck.row.refundWeight.toFixed(3)), 0.072, "Order Advance Refund weight must equal Refund Amount / Gold Rate");
assert(orderAdvanceRefundReportCheck.markup.includes("order-advance-refund-report-grid"), "Order Advance Refund report screen did not render");
assert.equal(orderAdvanceRefundReportCheck.active, "Sales", "Order Advance Refund drill-down did not open Sales");
assert.equal(orderAdvanceRefundReportCheck.salesView, "Order Advance Refund", "Order Advance Refund drill-down opened the wrong entry screen");
assert.equal(orderAdvanceRefundReportCheck.draftId, "ORDER-REFUND-1", "Order Advance Refund drill-down opened the wrong saved entry");
assert.equal(orderAdvanceRefundReportCheck.pickOrder, "2094", "Order Advance Refund drill-down lost its linked Sales Order");

const goldDepositLedgerCheck = vm.runInContext(`(() => {
  const previousCustomers = state.customers, previousParties = state.parties, previousDeposits = state.goldDeposits, previousWithdrawals = state.goldWithdrawals;
  state.customers = [{ id: "C9720", customerCode: "C9720", name: "NOUSHAD PK", mobile: "9895803508", address: "puthukolli house", careOf: "chungathara", openingWeight: 1 }, { id: "C9999", customerCode: "C9999", name: "ZAIN GOLD", openingWeight: 0.5 }];
  state.parties = [];
  state.goldDeposits = [
    normalizeGoldDeposit({ id: "GD-PRIOR", entryNo: "GD00001", date: "05/08/2026", partyName: "NOUSHAD PK", remarks: "Prior deposit", lines: [{ partyWeight: 2, gross: 2, stone: 0, touch: 100 }] }, "Deposit"),
    normalizeGoldDeposit({ id: "GD-TODAY", entryNo: "GD00002", date: "06/08/2026", partyName: "NOUSHAD PK", remarks: "Deposit received", lines: [{ partyWeight: 1.5, gross: 1.5, stone: 0, touch: 100 }] }, "Deposit")
  ];
  state.goldWithdrawals = [normalizeGoldDeposit({ id: "GW-TODAY", entryNo: "GW00001", date: "06/08/2026", partyName: "NOUSHAD PK", remarks: "Weight withdrawn", lines: [{ partyWeight: 0.4, gross: 0.4, stone: 0, touch: 100 }] }, "Withdrawal")];
  goldDepositLedgerOptions = { from: "06/08/2026", to: "06/08/2026", costCenter: "cost1", search: "" };
  selectedGoldDepositLedgerParty = "";
  const picker = goldDepositLedgerReportScreen(), parties = goldDepositLedgerParties();
  selectedGoldDepositLedgerParty = "C9720";
  const data = goldDepositWeightLedgerData(), detail = goldDepositWeightLedgerScreen(), summary = goldDepositSummaryReportData(), summaryScreen = goldDepositSummaryReportScreen();
  goldDepositTransactionFilter = "All"; const transactionsAll = goldDepositTransactionsReportConfig(), transactionScreen = goldDepositTransactionsReportScreen();
  goldDepositTransactionFilter = "Issued"; const transactionsIssued = goldDepositTransactionsReportConfig();
  goldDepositTransactionFilter = "Redeemed"; const transactionsRedeemed = goldDepositTransactionsReportConfig();
  goldDepositTransactionFilter = "All";
  const result = { picker, parties, data, detail, summary, summaryScreen, transactionsAll, transactionsIssued, transactionsRedeemed, transactionScreen, menu: REPORT_ROOT_MENU_ITEMS.find((item) => item.label === "Gold Deposit").children.map((item) => item.label).join("|") };
  state.customers = previousCustomers; state.parties = previousParties; state.goldDeposits = previousDeposits; state.goldWithdrawals = previousWithdrawals;
  return result;
})()`, context);
assert.equal(goldDepositLedgerCheck.menu, "Ledger|Summary|Transactions", "Gold Deposit report submenu does not match the supplied menu");
assert.equal(goldDepositLedgerCheck.parties[0].id, "C9720", "Gold Deposit Ledger picker lost the customer account ID");
assert(goldDepositLedgerCheck.picker.includes("AccID") && goldDepositLedgerCheck.picker.includes("AccName") && goldDepositLedgerCheck.picker.includes("Adminonly"), "Gold Deposit Ledger account picker columns are incomplete");
assert.equal(goldDepositLedgerCheck.data.opening, 3, "Gold Deposit Ledger opening balance must include master opening plus prior movements");
assert.equal(goldDepositLedgerCheck.data.rows.length, 3, "Gold Deposit Ledger should contain Opening and both in-period movements");
assert.equal(goldDepositLedgerCheck.data.rows[1].deposit, 1.5, "Gold Deposit Ledger deposit movement is incorrect");
assert.equal(goldDepositLedgerCheck.data.rows[1].balance, 4.5, "Gold Deposit Ledger running balance after deposit is incorrect");
assert.equal(goldDepositLedgerCheck.data.rows[2].withdraw, 0.4, "Gold Deposit Ledger withdrawal movement is incorrect");
assert.equal(Number(goldDepositLedgerCheck.data.closing.toFixed(3)), 4.1, "Gold Deposit Ledger closing balance is incorrect");
assert(goldDepositLedgerCheck.detail.includes("Slno") && goldDepositLedgerCheck.detail.includes("WithDraw") && goldDepositLedgerCheck.detail.includes("Balance"), "Deposit Weight Ledger columns are incomplete");
assert.equal(goldDepositLedgerCheck.summary.rows.length, 2, "Gold Deposit Summary must include every account with an opening balance or posted movement");
assert.equal(goldDepositLedgerCheck.summary.rows.find((row) => row.accountId === "C9720").net, 4.1, "Gold Deposit Summary customer Net does not reconcile with the detailed ledger closing balance");
assert.equal(Number(goldDepositLedgerCheck.summary.totalNet.toFixed(3)), 4.6, "Gold Deposit Summary grand Net total is incorrect");
assert(goldDepositLedgerCheck.summaryScreen.includes("AccID") && goldDepositLedgerCheck.summaryScreen.includes("PartyName") && goldDepositLedgerCheck.summaryScreen.includes("Net"), "Gold Deposit Summary columns do not match the supplied screen");
assert.equal(goldDepositLedgerCheck.transactionsAll.columns.map((column) => column.label).join("|"), "TransType|EntryNo|EntryDate|PartyID|Party Name|ItemID|item_Name|Gross|Stone|Mudless|Net|Touch|Rate|Amount|Bal_Weight|Bal_Amount|DueDate|Remarks|SaleMan", "Gold Deposit Transactions columns do not match the supplied screen");
assert.equal(goldDepositLedgerCheck.transactionsAll.rows.length, 2, "Gold Deposit Transactions All filter must combine Issued and Redeemed rows in the period");
assert.equal(goldDepositLedgerCheck.transactionsIssued.rows.length, 1, "Gold Deposit Transactions Issued filter is incorrect");
assert.equal(goldDepositLedgerCheck.transactionsIssued.rows[0].transType, "Issued", "Issued filter returned a Redeemed transaction");
assert.equal(goldDepositLedgerCheck.transactionsIssued.columns.map((column) => column.label).join("|"), goldDepositLedgerCheck.transactionsAll.columns.map((column) => column.label).join("|"), "Issued view does not retain all supplied transaction columns");
assert.equal(goldDepositLedgerCheck.transactionsIssued.rows[0].sourceSection, "gold-deposit", "Issued view is not sourced from Gold Deposit entries");
assert.equal(goldDepositLedgerCheck.transactionsIssued.rows[0].gross, 1.5, "Issued view lost the deposited gross weight");
assert.equal(goldDepositLedgerCheck.transactionsIssued.rows[0].net, 1.5, "Issued view Net calculation is incorrect");
assert.equal(goldDepositLedgerCheck.transactionsIssued.rows[0].partyName, "NOUSHAD PK", "Issued view lost the linked party details");
assert.equal(goldDepositLedgerCheck.transactionsIssued.rows[0].balanceWeight, 4.5, "Issued transaction running weight balance is incorrect");
assert.equal(goldDepositLedgerCheck.transactionsRedeemed.rows.length, 1, "Gold Deposit Transactions Redeemed filter is incorrect");
assert.equal(goldDepositLedgerCheck.transactionsRedeemed.rows[0].transType, "Redeemed", "Redeemed filter returned an Issued transaction");
assert.equal(goldDepositLedgerCheck.transactionsRedeemed.columns.map((column) => column.label).join("|"), goldDepositLedgerCheck.transactionsAll.columns.map((column) => column.label).join("|"), "Redeemed view does not retain all supplied transaction columns");
assert.equal(goldDepositLedgerCheck.transactionsRedeemed.rows[0].drillStorage, "goldWithdrawals", "Redeemed view is not sourced from Gold Withdrawal entries");
assert.equal(goldDepositLedgerCheck.transactionsRedeemed.rows[0].gross, 0.4, "Redeemed view lost the withdrawn gross weight");
assert.equal(goldDepositLedgerCheck.transactionsRedeemed.rows[0].net, 0.4, "Redeemed view Net calculation is incorrect");
assert.equal(goldDepositLedgerCheck.transactionsRedeemed.rows[0].partyName, "NOUSHAD PK", "Redeemed view lost the linked party details");
assert.equal(Number(goldDepositLedgerCheck.transactionsRedeemed.rows[0].balanceWeight.toFixed(3)), 4.1, "Redeemed transaction running weight balance is incorrect");
assert(goldDepositLedgerCheck.transactionScreen.includes(">All</option>") && goldDepositLedgerCheck.transactionScreen.includes(">Issued</option>") && goldDepositLedgerCheck.transactionScreen.includes(">Redeemed</option>"), "Gold Deposit Transactions dropdown options are incomplete");

const orderDueReportCheck = vm.runInContext(`(() => {
  const previousOrders = state.salesOrders, previousAdvances = state.orderAdvances, previousRefunds = state.orderAdvanceRefunds;
  const dueOrder = normalizeBill({ id: "DUE-ORDER-1", entryNo: "2321", refNo: "2321", dueDate: "06/08/2026", date: "01/08/2026", status: "Pending", customer: "NOUFEELA ERI", address: "ERIYATTUKUZHI", phone: "9544060779", staffName: "JABY M GEORGE", paymentBreakup: { cash: 100 }, sections: { sales: [{ itemName: "BANGLE", qty: 2, gross: 20, model: "M1", length: "13", breadth: "4" }, { itemName: "RING", qty: 1, gross: 4.6, model: "M2", length: "8", breadth: "2" }], exchange: [], return: [] } });
  const finishedDue = normalizeBill({ id: "DUE-ORDER-2", entryNo: "2322", dueDate: "06/08/2026", status: "Finished", sections: { sales: [{ itemName: "BANGLE", qty: 1, gross: 1 }], exchange: [], return: [] } });
  const laterOrder = normalizeBill({ id: "DUE-ORDER-3", entryNo: "2323", dueDate: "07/08/2026", status: "Pending", sections: { sales: [{ itemName: "CHAIN", qty: 1, gross: 2 }], exchange: [], return: [] } });
  state.salesOrders = [dueOrder, finishedDue, laterOrder];
  state.orderAdvances = [normalizeOrderAdvanceRecord({ orderId: dueOrder.id, advanceAmount: 50 }, "advance")];
  state.orderAdvanceRefunds = [normalizeOrderAdvanceRecord({ orderId: dueOrder.id, refundAmount: 20 }, "refund")];
  orderDueOptions = { date: "06/08/2026", showAtStartup: true, dateOpen: false };
  const config = orderDueReportConfig(), screen = orderDueReportScreen();
  const result = { config, screen, menu: REPORT_ROOT_MENU_ITEMS.find((item) => item.label === "Today's Dues").children.map((item) => item.label).join("|") };
  state.salesOrders = previousOrders; state.orderAdvances = previousAdvances; state.orderAdvanceRefunds = previousRefunds;
  return result;
})()`, context);
assert.equal(orderDueReportCheck.menu, "Order Due|Collection Due|Payment Due", "Today's Dues submenu does not match the supplied menu");
assert.equal(orderDueReportCheck.config.columns.map((column) => column.label).join("|"), "OrderNo|RefNo|dueDate|PartyName|address|phone|Salesman|Advance|ItemName|Qty|Gross|Model|Lenght|bredth", "Order Due columns do not match the supplied screen");
assert.equal(orderDueReportCheck.config.rows.length, 2, "Order Due must show every item from pending orders due on the selected date only");
assert(orderDueReportCheck.config.rows.every((row) => row.orderNo === "2321"), "Order Due included a finished order or an order due on another date");
assert.equal(orderDueReportCheck.config.totals.advance, 130, "Order Due advance total must count the order advance once, net of refunds");
assert.equal(orderDueReportCheck.config.totals.qty, 3, "Order Due quantity total is incorrect");
assert.equal(orderDueReportCheck.config.totals.gross, 24.6, "Order Due gross total is incorrect");
assert(orderDueReportCheck.screen.includes("Show at Startup"), "Order Due Show at Startup control is missing");

const collectionDueReportCheck = vm.runInContext(`(() => {
  const previousBills = state.bills, previousCollections = state.billwiseCollections;
  const partial = normalizeBill({ id: "COL-DUE-1", entryNo: "CM00003", refNo: "3", billNo: "CM00003", type: "Sales Invoice", date: "01/08/2026", dueDate: "01/08/2026", customerId: "C11325", customer: "ASHA LATHA", phone: "9539684448", staffName: "RAHULRAJ M K", customerAgent: "RRJ", paymentBreakup: { cash: 200 }, sections: { sales: [{ itemName: "BANGLE", qty: 1, gross: 10, rate: 100, taxPct: 0 }], exchange: [], return: [] } });
  const settled = normalizeBill({ id: "COL-DUE-2", entryNo: "CM00010", refNo: "10", billNo: "CM00010", type: "Sales Invoice", date: "02/08/2026", dueDate: "02/08/2026", customerId: "C11358", customer: "SADIK AMBALI", paymentBreakup: { cash: 400 }, adjustments: { coupon: 100 }, sections: { sales: [{ itemName: "RING", qty: 1, gross: 5, rate: 100, taxPct: 0 }], exchange: [], return: [] } });
  state.bills = [partial, settled];
  state.billwiseCollections = [normalizeBillwiseTransaction({ type: "collection", entryNo: "RC1", date: "04/08/2026", partyName: "ASHA LATHA", lines: [{ invoiceNo: "CM00003", billAmount: 1000, received: 300, discount: 100 }] }, "collection")];
  collectionDueOptions = { date: "06/08/2026", showAtStartup: true, withZero: false, dateOpen: false };
  const withoutZero = collectionDueReportConfig(), screen = collectionDueReportScreen();
  collectionDueOptions = { ...collectionDueOptions, withZero: true };
  const withZero = collectionDueReportConfig();
  const result = { withoutZero, withZero, screen };
  state.bills = previousBills; state.billwiseCollections = previousCollections;
  return result;
})()`, context);
assert.equal(collectionDueReportCheck.withoutZero.columns.map((column) => column.label).join("|"), "EntryNo|EntryDate|PartyID|PartyName|Phone|SalesMen|AgentName|InvoiceTotal|TotalReceived|Adjustments|Balance|DueDate|DueDays", "Collection Due columns do not match the supplied screen");
assert.equal(collectionDueReportCheck.withoutZero.rows.length, 1, "Collection Due must hide settled invoices when With 0 is off");
assert.equal(collectionDueReportCheck.withoutZero.rows[0].invoiceTotal, 1000, "Collection Due InvoiceTotal is incorrect");
assert.equal(collectionDueReportCheck.withoutZero.rows[0].totalReceived, 500, "Collection Due TotalReceived did not combine invoice and bill-wise receipts");
assert.equal(collectionDueReportCheck.withoutZero.rows[0].adjustments, 100, "Collection Due Adjustments did not include bill-wise discount");
assert.equal(collectionDueReportCheck.withoutZero.rows[0].balance, 400, "Collection Due Balance must equal InvoiceTotal - TotalReceived - Adjustments");
assert.equal(collectionDueReportCheck.withoutZero.rows[0].dueDays, 5, "Collection Due DueDays is incorrect");
assert.equal(collectionDueReportCheck.withZero.rows.length, 2, "Collection Due With 0 must include settled invoices");
assert.equal(collectionDueReportCheck.withZero.rows.find((row) => row.entryNo === "CM00010").balance, 0, "Collection Due settled invoice balance is incorrect");
assert(collectionDueReportCheck.screen.includes("Show at Startup") && collectionDueReportCheck.screen.includes("With 0"), "Collection Due checkbox controls are incomplete");

const paymentDueReportCheck = vm.runInContext(`(() => {
  const previous = { bills: state.bills, directPurchases: state.directPurchases, diamondPurchases: state.diamondPurchases, dmdStonePurchases: state.dmdStonePurchases, payments: state.billwisePayments };
  state.bills = [{ id: "PAY-DUE-1", type: "Purchase Invoice", entryNo: "PM00001", refNo: "P1", billNo: "PM00001", date: "01/08/2026", dueDate: "01/08/2026", supplierId: "S100", supplierName: "GOLD SUPPLIER", discount: 100, totals: { cashPaid: 200 }, lines: [{ itemName: "OLD GOLD", itemTotal: 1000, amount: 1000, gross: 0, stone: 0 }] }, { id: "PAY-DUE-2", type: "Purchase Invoice", entryNo: "PM00002", date: "02/08/2026", dueDate: "02/08/2026", supplierName: "SETTLED SUPPLIER", totals: { cashPaid: 500 }, lines: [{ itemTotal: 500, amount: 500 }] }, { id: "PAY-DUE-3", type: "Purchase Invoice", entryNo: "PM00003", date: "03/08/2026", dueDate: "07/08/2026", supplierName: "FUTURE SUPPLIER", lines: [{ itemTotal: 700, amount: 700 }] }];
  state.directPurchases = []; state.diamondPurchases = []; state.dmdStonePurchases = [];
  state.billwisePayments = [normalizeBillwiseTransaction({ type: "payment", entryNo: "PV1", date: "04/08/2026", partyName: "GOLD SUPPLIER", lines: [{ invoiceNo: "PM00001", billAmount: 1000, paid: 300, dnd: 100 }] }, "payment")];
  paymentDueOptions = { date: "06/08/2026", showAtStartup: true, dateOpen: false };
  const config = paymentDueReportConfig(), screen = paymentDueReportScreen();
  state.bills = previous.bills; state.directPurchases = previous.directPurchases; state.diamondPurchases = previous.diamondPurchases; state.dmdStonePurchases = previous.dmdStonePurchases; state.billwisePayments = previous.payments;
  return { config, screen };
})()`, context);
assert.equal(paymentDueReportCheck.config.columns.map((column) => column.label).join("|"), "EntryNo|EntryDate|DueDate|PartyName|InvoiceTotal|TotalReceived|Adjustments|Balance", "Payment Due columns do not match the supplied screen");
assert.equal(paymentDueReportCheck.config.rows.length, 1, "Payment Due must exclude settled and future-due purchase invoices");
assert.equal(paymentDueReportCheck.config.rows[0].entryNo, "PM00001", "Payment Due returned the wrong supplier invoice");
assert.equal(paymentDueReportCheck.config.rows[0].invoiceTotal, 1000, "Payment Due InvoiceTotal is incorrect");
assert.equal(paymentDueReportCheck.config.rows[0].totalReceived, 500, "Payment Due TotalReceived did not combine invoice and bill-wise payments");
assert.equal(paymentDueReportCheck.config.rows[0].adjustments, 200, "Payment Due Adjustments did not combine invoice discount and DND");
assert.equal(paymentDueReportCheck.config.rows[0].balance, 300, "Payment Due Balance must equal InvoiceTotal - TotalReceived - Adjustments");
assert(paymentDueReportCheck.screen.includes("Show at Startup"), "Payment Due Show at Startup checkbox is missing");

const finishedSalesOrderCheck = vm.runInContext(`(() => {
  state.salesOrders = [normalizeBill({ id: "ORDER-FINISH-1", entryNo: "2200", date: "06/08/2026", type: "Sales Order", status: "Pending", sections: { sales: [], exchange: [], return: [] } })];
  handleAction("finish-sales-order");
  return { status: salesOrderRecordStatus(state.salesOrders[0]), finished: state.salesOrders[0].finished, persistedStatus: state.salesOrders[0].status };
})()`, context);
assert.equal(finishedSalesOrderCheck.status, "Finished", "Close Order did not move the Sales Order report status to Finished");
assert.equal(finishedSalesOrderCheck.finished, true, "Close Order did not set the persisted finished flag");
assert.equal(finishedSalesOrderCheck.persistedStatus, "Finished", "Close Order did not persist the Finished status");

const mcCheck = vm.runInContext(`
  calculateBillLine({
    gross: 10,
    stone: 1,
    rate: 9000,
    va: 4.5,
    mcPerGm: 850,
    totalMc: 12074,
    makingCharge: 12074,
    taxPct: 0
  }, "sales")
`, context);
assert.equal(mcCheck.net, 9, "MC test net weight setup is incorrect");
assert.equal(mcCheck.makingCharge, 3645, "Sales MC must be WT * VA% * rate, ignoring stale manual MC values");
assert.equal(mcCheck.mcPerGm, 405, "MC/gm must be derived from VA% * rate");

const orderMcCheck = vm.runInContext(`
  calculateBillLine({
    gross: 8,
    stone: 0.5,
    rate: 8000,
    va: 5,
    totalMc: 9999,
    taxPct: 0
  }, "order")
`, context);
assert.equal(orderMcCheck.makingCharge, 3000, "Sales order MC must use WT * VA% * rate");

const dmdReturnMcCheck = vm.runInContext(`
  normalizeDmdWholesaleLine({
    gross: 10,
    stone: 1,
    stonePrice: 100,
    va: 10,
    goldRate: 1000,
    dmdWgt: 2,
    stnSPrice: 500,
    purMc: 50,
    salesMc: 80
  }, { returnMode: true, returnType: "Local Purchase" })
`, context);
assert.equal(dmdReturnMcCheck.purchaseMaking, 450, "DMD Return purchase MC should be net weight * purchase MC");
assert.equal(dmdReturnMcCheck.total, 11450, "DMD Return total should include purchase MC");
assert.equal(dmdReturnMcCheck.amount, 11450, "DMD Return amount should carry the purchase-side total");
assert.equal(dmdReturnMcCheck.salesAmt, 0, "DMD Return sales amount must stay zero until sold");

const dmdSalesReturnCheck = vm.runInContext(`
  normalizeDmdWholesaleLine({
    gross: 10,
    stone: 1,
    stonePrice: 100,
    va: 10,
    goldRate: 1000,
    dmdWgt: 2,
    stnSPrice: 500,
    purMc: 50,
    salesMc: 80
  }, { returnMode: true, returnType: "Sales Return" })
`, context);
assert.equal(dmdSalesReturnCheck.total, 11720, "DMD Sales Return total should include sales MC");
assert.equal(dmdSalesReturnCheck.salesAmt, 0, "DMD Sales Return should not create sales amount until sold again");

const dmdOpeningStockCheck = vm.runInContext(`
  normalizeDmdWholesaleLine({
    gross: 10,
    stone: 1,
    stonePrice: 100,
    va: 10,
    goldRate: 1000,
    dmdWgt: 2,
    stnSPrice: 500,
    purMc: 50,
    salesMc: 80
  }, { returnMode: true, returnType: "Opening Stock" })
`, context);
assert.equal(dmdOpeningStockCheck.total, 11450, "DMD Opening Stock should use cost-side purchase MC");
assert.equal(dmdOpeningStockCheck.salesAmt, 0, "DMD Opening Stock should not create sales amount");

const dmdWholesaleMcCheck = vm.runInContext(`
  normalizeDmdWholesaleLine({
    gross: 10,
    stone: 1,
    stonePrice: 100,
    va: 10,
    goldRate: 1000,
    dmdWgt: 2,
    stnSPrice: 500,
    purMc: 50,
    salesMc: 80
  })
`, context);
assert.equal(dmdWholesaleMcCheck.total, 11720, "DMD wholesale total should continue to use sales MC");
assert.equal(dmdWholesaleMcCheck.salesAmt, 11720, "DMD wholesale sales amount should still be sale-side total");

const blankDmdLine = vm.runInContext(`defaultDmdWholesaleLine()`, context);
assert.equal(blankDmdLine.stnSPrice, 0, "Default DMD stone selling price should be zero");

const customerLookupCheck = vm.runInContext(`
  const customer = findCustomerLookupMatch("8281900323");
  applyCustomerToCurrentBill(customer, null);
  ({ id: state.bills[0].customerId, name: state.bills[0].customer, phone: state.bills[0].phone });
`, context);
assert.equal(customerLookupCheck.name, "Rahul U M", "Customer lookup by phone should find existing customer");
assert.equal(customerLookupCheck.phone, "8281900323", "Customer lookup should fill phone into current bill");
assert(customerLookupCheck.id, "Customer lookup should fill customer ID into current bill");

const normalizedAdvance = vm.runInContext(`
  normalizeOrderAdvanceRecord({
    advanceAmount: 1000,
    exchangeAmount: 9999,
    advanceWeight: 3,
    exchangeWeight: 7
  }, "advance")
`, context);
assert.equal(normalizedAdvance.totalAmount, 1000, "Additional order advance should be money-only and ignore exchange amount");
assert.equal(normalizedAdvance.totalWeight, 0, "Additional order advance should not carry gold weight");

const salesOrderDepositSummary = vm.runInContext(`
  const order = state.salesOrders[0];
  order.paymentBreakup = { cash: 500 };
  order.adjustments = { card: 200 };
  state.orderAdvances = [normalizeOrderAdvanceRecord({ orderId: order.id, advanceAmount: 1000, exchangeAmount: 9999 }, "advance")];
  state.orderAdvanceRefunds = [normalizeOrderAdvanceRecord({ orderId: order.id, refundAmount: 300 }, "refund")];
  orderAdvanceSummary(order, { advanceAmount: 250, exchangeAmount: 8888 }, "advance");
`, context);
assert.equal(salesOrderDepositSummary.additionalAdvance, 1250, "Order advance summary should add only money advances");
assert.equal(salesOrderDepositSummary.advanceRefund, 300, "Order refund summary should subtract refund money");
assert.equal(salesOrderDepositSummary.netAdvance, 1650, "Available order advance should be original plus additional minus refund");
assert.equal(salesOrderDepositSummary.netAdvanceWeight, 0, "Sales order advance should not track stock or gold weight");

const byId = (collection, id) => state[collection].find((item) => item.id === id);
const refIssue = byId("refineryIssues", "DEMO-REF-ISSUE-001");
const refReturn = byId("refineryReturns", "DEMO-REF-RETURN-001");
const refFinal = byId("refineryFinalReturns", "DEMO-REF-FINAL-001");
assert(refIssue && refReturn && refFinal, "Refinery demo chain did not initialize");
assert.equal(refReturn.pendingIssueId, refIssue.id, "Refinery return is not linked to its issue");
assert.equal(refFinal.pendingIssueId, refIssue.id, "Refinery final return is not linked to its issue");

const meltIssue = byId("meltingIssues", "DEMO-MELT-ISSUE-001");
const meltReturn = byId("meltingReturns", "DEMO-MELT-RETURN-001");
assert(meltIssue && meltReturn, "Melting demo chain did not initialize");
assert.equal(meltReturn.pendingIssueId, meltIssue.id, "Melting return is not linked to its issue");

const journal = byId("journalVouchers", "DEMO-JOURNAL-001");
assert(journal, "Demo journal voucher did not initialize");
assert.equal(journal.totalDebit, journal.totalCredit, "Demo journal voucher is not balanced");

const giftBox = state.complimentaryStock.find((item) => item.itemName === "Gift Box");
const carryBag = state.complimentaryStock.find((item) => item.itemName === "Carry Bag");
assert.equal(giftBox.balance, 112, "Gift Box demo stock balance is incorrect");
assert.equal(carryBag.balance, 259, "Carry Bag demo stock balance is incorrect");

const service = byId("serviceJobs", "DEMO-SERVICE-001");
assert.equal(service.balance, 1300, "Service job balance calculation is incorrect");
assert.equal(state.pdcReceipts.find((item) => item.id === "DEMO-PDC-RECEIPT-001").chequeAmount, 28540, "PDC demo amount is incorrect");

vm.runInContext(`
  authenticated = true;
  active = "Work Orders";
  workOrderView = "Refining";
  refineryView = "Refinery Return";
  refineryReturnDraft = state.refineryReturns.find((item) => item.id === "DEMO-REF-RETURN-001");
  refineryReturnView = "Issued Details";
  render();
`, context);
assert(appElement.innerHTML.includes("Old Gold Lot A"), "Refining Return Issued Details did not render linked issue lines");
assert(appElement.innerHTML.includes("Metro Refiner"), "Refining Return Issued Details did not render the linked refiner");

vm.runInContext(`
  refineryView = "Refinery Final Return";
  refineryFinalDraft = state.refineryFinalReturns.find((item) => item.id === "DEMO-REF-FINAL-001");
  refineryFinalView = "Test Return";
  render();
`, context);
assert(appElement.innerHTML.includes("Mud Less"), "Refining Final Return Test Return tab did not render");
assert(appElement.innerHTML.includes("35.9 g"), "Refining Final Return Test Return data is missing");

vm.runInContext(`refineryFinalView = "Issue"; render();`, context);
assert(appElement.innerHTML.includes("Gold Scrap"), "Refining Final Return Issue tab did not render linked issue data");

vm.runInContext(`
  refineryView = "Melting Return";
  meltingReturnDraft = state.meltingReturns.find((item) => item.id === "DEMO-MELT-RETURN-001");
  meltingReturnView = "Issue";
  render();
`, context);
assert(appElement.innerHTML.includes("22K Gold Scrap"), "Melting Return Issue tab did not render linked issue data");
assert(appElement.innerHTML.includes("prepared-by-readonly"), "Linked Prepared By field did not render as a staff dropdown");

const refinerReport = vm.runInContext(`
  salesReportOptions = { ...salesReportOptions, from: "01/01/2025", to: "31/12/2026", shown: true };
  refinerReportConfig();
`, context);
assert.equal(refinerReport.columns.map((column) => column.label).join("|"), ["eType", "Category", "eNo", "issueNo", "eDate", "iName", "Qty", "Gross", "Stone", "Net", "Rate", "Amount", "IssueWeight", "MuddLess", "ReceivedWeight", "BottleStock", "TestPieceWeight", "ReissueWeight"].join("|"), "Refinery report columns do not match the supplied layout");
for (const type of ["Issue", "Return", "Final Return", "Melting Issue", "Melting Return"]) assert(refinerReport.rows.some((row) => row.entryType === type), `Refinery report is missing ${type} transactions`);
const refineryIssueReportRow = refinerReport.rows.find((row) => row.entryType === "Issue");
assert.equal(refineryIssueReportRow.net, refineryIssueReportRow.gross - refineryIssueReportRow.stone, "Refinery issue Net must equal Gross minus Stone");
const refineryReturnReportRow = refinerReport.rows.find((row) => row.entryType === "Return");
assert.equal(refineryReturnReportRow.issueNo, refIssue.entryNo, "Refinery return report row must show its linked issue number");
assert.equal(refineryReturnReportRow.drillStorage, "refineryReturns", "Refinery return row drill-down points to the wrong transaction storage");
const refineryFinalReportRow = refinerReport.rows.find((row) => row.entryType === "Final Return");
assert.equal(refineryFinalReportRow.amount, refineryFinalReportRow.testPieceWeight * refineryFinalReportRow.rate, "Refinery final return Amount must use test-piece weight and rate");

vm.runInContext(`
  openReportBillDetail({ dataset: { reportBillId: "DEMO-REF-RETURN-001", reportEntryNo: "", reportBillNo: "", reportSection: "refinery", reportTarget: "refinery", reportStorage: "refineryReturns", reportView: "Refinery Return" } });
`, context);
assert.equal(vm.runInContext(`active`, context), "Work Orders", "Refinery report drill-down did not open Work Orders");
assert.equal(vm.runInContext(`refineryView`, context), "Refinery Return", "Refinery report drill-down opened the wrong bill screen");
assert.equal(vm.runInContext(`refineryReturnDraft.id`, context), "DEMO-REF-RETURN-001", "Refinery report drill-down did not open the selected return bill");

vm.runInContext(`active = "Reports"; selectedReport = "Refiner Transfer"; render();`, context);
assert(appElement.innerHTML.includes("Refinery Report for the period"), "Refinery report screen did not render");
assert(appElement.innerHTML.includes("refiner-report-grid"), "Refinery report grid did not render");
assert(appElement.innerHTML.includes('data-report-target="refinery"'), "Refinery report rows are not drillable");

const dayEndMenu = vm.runInContext(`selectedReport = "Day End Day Summary"; dayEndReportNavigation("sidebar")`, context);
assert(dayEndMenu.includes("Day Summary") && dayEndMenu.includes("Day Book"), "Day End Report is missing Day Summary or Day Book");
for (const removed of ["Day Close Print", "Weight & Cash Summary", "Day Book - 2024"]) assert(!dayEndMenu.includes(removed), `Day End Report still contains ${removed}`);

const dayBookCheck = vm.runInContext(`
  const savedAccounts = state.accounts;
  state.accounts = [
    { id: "DAY-DR", date: "02/04/2026", vouNo: "DR-1", ledger: "Sales", particular: "Sales / BANGLE", debit: 1250, credit: 0, drWeight: 2.5, crWeight: 0, costCenter: "cost1" },
    { id: "DAY-CR", date: "02/04/2026", vouNo: "CR-1", ledger: "Cash in Hand", particular: "Cash sale", debit: 0, credit: 1250, drWeight: 0, crWeight: 2.5, costCenter: "cost1" },
    { id: "DAY-OTHER", date: "03/04/2026", vouNo: "DR-2", ledger: "Sales", particular: "Other branch", debit: 99, credit: 0, costCenter: "Other" }
  ];
  dayEndBookOptions = { from: "01/04/2026", to: "30/04/2026", costCenter: "cost1", cashAccount: "Cash in Hand", ready: false };
  const dialog = dayEndBookDialog();
  const data = dayEndBookData();
  dayEndBookOptions.ready = true;
  const report = dayEndBookReport();
  state.accounts = savedAccounts;
  ({ dialog, data, report });
`, context);
for (const label of ["Date From", "Date To", "Cost Center", "Cash Account", "Fin", "Today", "OK", "Close"]) assert(dayBookCheck.dialog.includes(label), `Day Book dialog is missing ${label}`);
assert.equal(dayBookCheck.data.rows.length, 1, "Day Book should pair debit and credit postings into one display row");
assert.equal(dayBookCheck.data.totalDebit, 1250, "Day Book debit total is incorrect");
assert.equal(dayBookCheck.data.totalCredit, 1250, "Day Book credit total is incorrect");
assert.equal(dayBookCheck.data.totalDrWeight, 2.5, "Day Book debit weight total is incorrect");
assert.equal(dayBookCheck.data.totalCrWeight, 2.5, "Day Book credit weight total is incorrect");
for (const column of ["Description", "Debit", "Dr-Weight", "Credit", "Cr-Weight"]) assert(dayBookCheck.report.includes(column), `Day Book printable report is missing ${column}`);
assert(dayBookCheck.report.includes("Sales / BANGLE") && dayBookCheck.report.includes("Cash sale"), "Day Book printable report is missing transaction descriptions");
assert(!dayBookCheck.report.includes("Other branch"), "Day Book cost-center filter included another branch");

const daySummaryDialogCheck = vm.runInContext(`
  dayEndSummaryOptions = { from: "07/08/2026", to: "07/08/2026", salesOnly: false, categories: ["Diamond", "Gold", "Other", "Pure Gold", "Silver"], ready: false };
  dayEndSummaryDialog();
`, context);
for (const field of ["Sales Only", "Diamond", "Gold", "Other", "Pure Gold", "Silver"]) assert(daySummaryDialogCheck.includes(field), `Day Summary dialog is missing ${field}`);

const taxHsnCheck = vm.runInContext(`
  const savedBills = state.bills;
  state.bills = [{ id: "TAX-1", type: "Sales", date: "10/04/2026", billNo: "CM100", customer: "Tax Customer", gstNo: "32ABCDE1234F1Z5", discount: 30, sections: { sales: [
    { itemName: "SILVER RING", hsnCode: "71131120", gross: 10, stone: 0, net: 10, rate: 100, totalMc: 50, gstPercent: 3 },
    { itemName: "DIAMOND RING", hsnCode: "7113", gross: 2, stone: 0, net: 2, rate: 500, diamondAmount: 400, totalMc: 100, gstPercent: 3 }
  ] } }];
  salesReportOptions = { ...salesReportOptions, from: "01/04/2026", to: "30/04/2026", shown: true };
  const summary = taxSalesHsnRows(false);
  const category = taxSalesHsnRows(true);
  taxReportType = "Sales With HSN Summary";
  const summaryScreen = taxSalesHsnReportScreen();
  taxReportType = "Sales With HSN Summary By Category";
  const categoryScreen = taxSalesHsnReportScreen();
  state.bills = savedBills;
  ({ summary, category, summaryScreen, categoryScreen });
`, context);
assert.equal(taxHsnCheck.summary.length, 2, "HSN Summary should create one row per invoice and HSN code");
assert.equal(taxHsnCheck.category.length, 2, "HSN category report should preserve separate item categories");
assert(taxHsnCheck.category.some((row) => row.itemCategory === "Silver") && taxHsnCheck.category.some((row) => row.itemCategory === "Diamond"), "HSN category classification is incorrect");
for (const row of taxHsnCheck.summary) {
  assert.equal(Number((row.cgst + row.sgst + row.igst).toFixed(6)), Number(row.gst.toFixed(6)), "HSN GST split does not reconcile");
  assert.equal(Number(row.total.toFixed(6)), Number((row.taxable + row.gst - row.discount).toFixed(6)), "HSN row total formula is incorrect");
}
for (const column of ["Slno", "Date", "Billno", "CustName", "GstNo", "hsnCode", "Gross", "Amount", "DmdAmt", "Making Charge", "Taxable", "GST", "CGST", "SGST", "IGST", "Discount", "Total"]) assert(taxHsnCheck.summaryScreen.includes(column), `HSN Summary is missing ${column}`);
assert(taxHsnCheck.categoryScreen.includes("item_category"), "HSN Summary By Category is missing item_category");
assert(taxHsnCheck.categoryScreen.includes("Sales With HSN Summary By Category"), "HSN Summary By Category screen did not render");

const taxModesCheck = vm.runInContext(`
  const saved = { bills: state.bills, smithWorkOrders: state.smithWorkOrders, directPurchases: state.directPurchases, diamondPurchases: state.diamondPurchases, dmdStonePurchases: state.dmdStonePurchases, directPurchaseReturns: state.directPurchaseReturns, diamondPurchaseReturns: state.diamondPurchaseReturns, dmdReturns: state.dmdReturns, exchanges: state.exchanges };
  const taxFixtureSale = { id: "SALE-TAX", type: "Sales", date: "10/04/2028", entryNo: "S1", customer: "Customer", phone: "999", discount: 10, roundOff: 0.5, sections: { sales: [{ itemName: "GOLD RING", hsnCode: "7113", gross: 2, stone: 0, net: 2, rate: 100, makingCharge: 20, gstPercent: 3 }], exchange: [{ itemName: "OLD GOLD", gross: 1, stone: 0, net: 1, rate: 80 }], return: [{ itemName: "RING", gross: 0.5, stone: 0, net: 0.5, rate: 100, makingCharge: 5, gstPercent: 3 }] }, paymentBreakup: { bank: 25 } };
  const taxFixturePurchase = { id: "PUR-TAX", type: "Purchase", date: "11/04/2028", entryNo: "P1", partyName: "Supplier", discount: 5, addition: 2, roundOff: 0.25, invoiceTotal: 100, lines: [{ gross: 1, stone: 0, net: 1, amount: 99 }] };
  const taxFixturePurchaseReturn = { id: "PR-TAX", type: "Purchase Return", date: "12/04/2028", entryNo: "PR1", partyName: "Supplier", discount: 1, invoiceTotal: 50, lines: [{ gross: 0.5, stone: 0, net: 0.5, amount: 49 }] };
  state.bills = [taxFixtureSale, taxFixturePurchase, taxFixturePurchaseReturn]; state.smithWorkOrders = [{ id: "SM-TAX", entryNo: "SM1", date: "13/04/2028", lines: [{ itemName: "CHAIN", hsnCode: "7113", gross: 2, stone: 0, netWeight: 2, cost: 200, taxPercent: 3 }] }];
  state.directPurchases = []; state.diamondPurchases = []; state.dmdStonePurchases = []; state.directPurchaseReturns = []; state.diamondPurchaseReturns = []; state.dmdReturns = []; state.exchanges = [];
  salesReportOptions = { ...salesReportOptions, from: "01/04/2028", to: "30/04/2028", shown: true };
  const result = { smith: taxSmithReportRows(), purchaseSummary: taxPurchaseSummaryRows(), sales: taxSalesDetailRows(), salesReturn: taxSalesReturnRows(), purchase: taxPurchaseRows(), purchaseReturn: taxPurchaseReturnRows(), salesExchange: taxSalesExchangeRows(), exchange: taxExchangeReportRows(), invoiceWise: taxSalesInvoiceWiseRows(), screens: {} };
  for (const type of ["Smith Report", "Purchase Summary", "Sales", "Sales Return", "Purchase", "Purchase Return", "Sales With Exchange", "Exchange Report", "Sales Invoice Wise"]) { taxReportType = type; result.screens[type] = taxSalesHsnReportScreen(); }
  Object.assign(state, saved);
  result;
`, context);
assert.equal(taxModesCheck.smith.length, 1, "Smith tax report did not load smith transactions");
assert.equal(taxModesCheck.purchaseSummary.length, 1, "Purchase Summary should include purchase invoices and exclude purchase returns");
assert.equal(taxModesCheck.sales[0].netAmount, taxModesCheck.sales[0].taxable + taxModesCheck.sales[0].taxAmount - taxModesCheck.sales[0].discount, "Sales tax NetAmount does not reconcile");
assert.equal(taxModesCheck.salesReturn[0].total, taxModesCheck.salesReturn[0].taxableAmount + taxModesCheck.salesReturn[0].gst, "Sales Return total does not reconcile");
assert.equal(Number((taxModesCheck.purchase[0].sgst + taxModesCheck.purchase[0].cgst).toFixed(6)), Number(taxModesCheck.purchase[0].taxAmount.toFixed(6)), "Purchase GST split does not reconcile");
assert.equal(taxModesCheck.purchaseReturn.length, 1, "Purchase Return report included the wrong transaction set");
assert.equal(taxModesCheck.exchange[0].amount, taxModesCheck.exchange[0].netWeight * taxModesCheck.exchange[0].rate, "Exchange Report amount formula is incorrect");
assert.equal(taxModesCheck.invoiceWise[0].invoiceTotal, taxModesCheck.invoiceWise[0].taxableValue + taxModesCheck.invoiceWise[0].gst - taxModesCheck.invoiceWise[0].discount + taxModesCheck.invoiceWise[0].roundOff, "Sales Invoice Wise total does not reconcile");
const requiredTaxColumns = {
  "Smith Report": ["TDate", "Entryno", "hsncode", "NetWeight", "TaxAmount"], "Purchase Summary": ["TDate", "Entryno", "NetWeight", "Amount"], "Sales": ["brancheno", "item_Category", "SGST_PERC", "NetAmount"], "Sales Return": ["BillNo", "StoneCharge", "TaxableAmt", "Total"], "Purchase": ["EntryNo", "TotalWght", "RoundOff", "NetTotal"], "Purchase Return": ["EntryNo", "TaxAmount", "RoundOff", "NetTotal"], "Sales With Exchange": ["cust_Phone", "exchange", "TtlNetWght", "bankCardDetails"], "Exchange Report": ["branchENo", "itemDescription", "NetWeight", "Amount"], "Sales Invoice Wise": ["InvoiceDate", "BillType", "DMDCarat", "Taxable_Value", "Invoice_Total"]
};
for (const [type, columns] of Object.entries(requiredTaxColumns)) for (const column of columns) assert(taxModesCheck.screens[type].includes(column), `${type} is missing ${column}`);

const billReceivableCheck = vm.runInContext(`(() => {
  const saved = { bills: state.bills, billwiseCollections: state.billwiseCollections, active, salesView };
  state.bills = [
    { id: "REC-1", type: "Sales", entryNo: "CM100", billNo: "CM100", date: "01/04/2029", dueDate: "10/04/2029", customerId: "C1", customer: "Customer One", phone: "9001", address: "Main Road", place: "Edakkara", agentId: "A1", agentName: "Agent One", staffName: "Sales One", invoiceTotal: 1000, totals: { invoiceTotal: 1000 }, paymentBreakup: { cash: 200 }, line: { itemName: "RING", qty: 1, gross: 1, stone: 0, wastage: 0, net: 1, rate: 1000, va: 0, makingCharge: 0, tax: 0, amount: 1000 }, sections: { sales: [{ itemName: "RING", gross: 1, stone: 0, net: 1, rate: 1000, itemTotal: 1000 }] } },
    { id: "REC-2", type: "Sales", entryNo: "CM101", billNo: "CM101", date: "02/04/2029", dueDate: "12/04/2029", customerId: "C1", customer: "Customer One", phone: "9001", address: "Main Road", place: "Edakkara", agentId: "A1", agentName: "Agent One", staffName: "Sales One", invoiceTotal: 500, totals: { invoiceTotal: 500 }, paymentBreakup: { cash: 100 }, line: { itemName: "CHAIN", qty: 1, gross: 0.5, stone: 0, wastage: 0, net: 0.5, rate: 1000, va: 0, makingCharge: 0, tax: 0, amount: 500 }, sections: { sales: [{ itemName: "CHAIN", gross: 0.5, stone: 0, net: 0.5, rate: 1000, itemTotal: 500 }] } }
  ];
  state.billwiseCollections = [];
  salesReportOptions = { ...salesReportOptions, from: "01/04/2029", to: "30/04/2029", shown: true };
  billReportFilters = { agent: "", salesman: "" };
  const detail = customerReceivableReportConfig(), summary = agentWiseReceivableSummaryConfig(), agentWise = agentWiseReceivableConfig();
  billReportType = "Customer Receivable"; const detailScreen = customerReceivableReportScreen();
  billReportType = "AgentWise Customer Receivable Summary"; const summaryScreen = customerReceivableReportScreen();
  billReportType = "Agent wise Customer Receivable"; const agentScreen = customerReceivableReportScreen();
  openReportBillDetail({ dataset: { reportBillId: "REC-2", reportEntryNo: "CM101", reportBillNo: "CM101", reportSection: "sales", reportTarget: "sales", reportStorage: "bills", reportView: "Sales Invoice" } });
  const drill = { active, salesView, opened: state.bills[0]?.id };
  state.bills = saved.bills; state.billwiseCollections = saved.billwiseCollections; active = saved.active; salesView = saved.salesView;
  return { detail, summary, agentWise, detailScreen, summaryScreen, agentScreen, drill };
})()`, context);
assert.equal(billReceivableCheck.detail.rows.length, 2, "Customer Receivable should show each outstanding sales invoice");
assert.equal(billReceivableCheck.summary.rows.length, 1, "AgentWise Customer Receivable Summary should consolidate the same customer");
assert.equal(billReceivableCheck.summary.rows[0].balance, billReceivableCheck.detail.rows.reduce((sum, row) => sum + row.balance, 0), "AgentWise receivable summary balance does not reconcile");
assert.equal(billReceivableCheck.summary.rows[0].sourceBillId, "REC-2", "AgentWise summary should drill into the latest outstanding invoice");
for (const column of ["AgentName", "SalesMen", "EntryNo", "EntryDate", "PartyID", "PartyName", "Phone", "InvoiceTotal", "TotalReceived", "Adjustments", "Balance", "DueDate", "DueDays"]) assert(billReceivableCheck.detailScreen.includes(column), `Customer Receivable is missing ${column}`);
for (const column of ["AgentId", "AgentName", "PartyID", "PartyName", "Phone", "Address", "Place", "LastInvDue", "Balance", "LedgerBalance"]) assert(billReceivableCheck.summaryScreen.includes(column), `AgentWise Customer Receivable Summary is missing ${column}`);
assert(billReceivableCheck.agentScreen.includes("AgentName") && billReceivableCheck.agentScreen.includes("EntryNo"), "Agent wise Customer Receivable did not render its invoice columns");
assert(billReceivableCheck.detailScreen.includes('data-report-bill-id="REC-1"') && billReceivableCheck.summaryScreen.includes('data-report-bill-id="REC-2"'), "Receivable rows are not configured for double-click drill-down");
assert.equal(billReceivableCheck.drill.active, "Sales", "Receivable double-click did not open Sales");
assert.equal(billReceivableCheck.drill.salesView, "Sales Invoice", "Receivable double-click opened the wrong Sales screen");
assert.equal(billReceivableCheck.drill.opened, "REC-2", "Receivable double-click opened the wrong Sales Entry");

const orderBalanceCheck = vm.runInContext(`(() => {
  const saved = { salesOrders: state.salesOrders, orderAdvances: state.orderAdvances, orderAdvanceRefunds: state.orderAdvanceRefunds, active, salesView };
  const base = state.salesOrders[0];
  const order = { ...base, id: "ORDER-BAL-1", entryNo: "2121", billNo: "2121", refNo: "2121", date: "05/04/2030", customerId: "C100", customer: "Order Customer", paymentBreakup: { ...base.paymentBreakup, cash: 300 }, adjustments: { ...base.adjustments, card: 50 }, sections: { ...base.sections, exchange: [{ ...(base.sections?.exchange?.[0] || base.sections?.sales?.[0]), itemName: "OLD GOLD", itemTotal: 100, amount: 100 }] } };
  state.salesOrders = [order];
  state.orderAdvances = [normalizeOrderAdvanceRecord({ id: "ADV-BAL", orderId: order.id, orderEntryNo: order.entryNo, advanceAmount: 200, totalAmount: 200, date: "06/04/2030" }, "advance")];
  state.orderAdvanceRefunds = [normalizeOrderAdvanceRecord({ id: "REF-BAL", orderId: order.id, orderEntryNo: order.entryNo, refundAmount: 25, date: "07/04/2030" }, "refund")];
  salesReportOptions = { ...salesReportOptions, from: "01/04/2030", to: "30/04/2030", shown: true };
  const config = orderBalanceReportConfig(); billReportType = "Order Balance"; const screen = customerReceivableReportScreen();
  openReportBillDetail({ dataset: { reportBillId: order.id, reportEntryNo: order.entryNo, reportBillNo: order.billNo, reportSection: "sales-order", reportTarget: "sales-order", reportStorage: "salesOrders", reportView: "Sales Order" } });
  const drill = { active, salesView, opened: state.salesOrders[0]?.id };
  state.salesOrders = saved.salesOrders; state.orderAdvances = saved.orderAdvances; state.orderAdvanceRefunds = saved.orderAdvanceRefunds; active = saved.active; salesView = saved.salesView;
  return { config, screen, drill };
})()`, context);
assert.equal(orderBalanceCheck.config.rows.length, 1, "Order Balance did not load the sales order");
const orderBalanceRow = orderBalanceCheck.config.rows[0];
assert.equal(orderBalanceRow.balance, orderBalanceRow.exchangeAdvance + orderBalanceRow.cashAdvance - orderBalanceRow.cashRefund, "Order Balance formula is incorrect");
for (const column of ["custID", "PartyName", "OrderNo", "eDate", "exchangeAdvance", "cashAdvance", "CashRefund", "Balance"]) assert(orderBalanceCheck.screen.includes(column), `Order Balance is missing ${column}`);
assert(!orderBalanceCheck.screen.includes("Supplier Payable"), "Supplier Payable was not removed from Bills Reports");
assert(orderBalanceCheck.screen.includes('data-report-target="sales-order"'), "Order Balance rows are not configured for Order Entry drill-down");
assert.equal(orderBalanceCheck.drill.active, "Sales", "Order Balance double-click did not open Sales");
assert.equal(orderBalanceCheck.drill.salesView, "Sales Order", "Order Balance double-click opened the wrong screen");
assert.equal(orderBalanceCheck.drill.opened, "ORDER-BAL-1", "Order Balance double-click opened the wrong order");

const complimentaryReportCheck = vm.runInContext(`(() => {
  const saved = { purchases: state.complimentaryPurchases, issues: state.complimentaryIssues, stock: state.complimentaryStock, movementOptions: complimentaryMovementOptions, active, workOrderView, complimentaryView, purchaseDraft: complimentaryPurchaseDraft, issueDraft: complimentaryIssueDraft };
  state.complimentaryPurchases = [normalizeComplimentaryPurchase({ id: "COMP-P", entryNo: "CP1", date: "01/04/2031", partyName: "Gift Supplier", preparedBy: "Staff", addition: 10, discount: 0, lines: [{ itemId: "GBX", itemName: "Gift Box", quantity: 10, foc: 2, price: 5, unit: "Nos" }] })];
  state.complimentaryIssues = [
    normalizeComplimentaryIssue({ id: "COMP-I", entryNo: "CI1", date: "02/04/2031", issueType: "Sales / Issue", invoiceNo: "CM1", preparedBy: "Staff", remarks: "Gift with customer purchase", lines: [{ itemId: "GBX", itemName: "Gift Box", quantity: 3, unit: "Nos" }] }),
    normalizeComplimentaryIssue({ id: "COMP-N", entryNo: "CI2", date: "03/04/2031", issueType: "Promotion", invoiceNo: "", preparedBy: "Staff", lines: [{ itemId: "CBG", itemName: "Carry Bag", quantity: 1, unit: "Nos" }] })
  ];
  salesReportOptions = { ...salesReportOptions, from: "01/04/2031", to: "30/04/2031", shown: true };
  complimentaryMovementOptions = { item: "Gift Box", from: "01/04/2031", to: "30/04/2031", ready: false };
  const purchase = complimentaryPurchaseReportRows(), allIssues = complimentaryIssueReportRows(false), sales = complimentaryIssueReportRows(true), stock = complimentaryStockReportRows(), movement = complimentaryStockMovementRows(), movementDialog = complimentaryMovementDialog();
  const screens = {};
  for (const type of COMPLIMENTARY_REPORT_TYPES) { complimentaryReportType = type; screens[type] = complimentaryItemsReportScreen(); }
  const giftBox = stock.find((row) => row.itemName === "Gift Box");
  openReportBillDetail({ dataset: { reportBillId: "COMP-I", reportEntryNo: "CI1", reportTarget: "complimentary-issue", reportStorage: "complimentaryIssues", reportView: "Complimentary Item Issue" } });
  const issueDrill = { active, workOrderView, complimentaryView, id: complimentaryIssueDraft?.id };
  openReportBillDetail({ dataset: { reportBillId: "COMP-P", reportEntryNo: "CP1", reportTarget: "complimentary-purchase", reportStorage: "complimentaryPurchases", reportView: "Complimentary Item Purchase" } });
  const purchaseDrill = { active, workOrderView, complimentaryView, id: complimentaryPurchaseDraft?.id };
  state.complimentaryPurchases = saved.purchases; state.complimentaryIssues = saved.issues; state.complimentaryStock = saved.stock; complimentaryMovementOptions = saved.movementOptions; active = saved.active; workOrderView = saved.workOrderView; complimentaryView = saved.complimentaryView; complimentaryPurchaseDraft = saved.purchaseDraft; complimentaryIssueDraft = saved.issueDraft;
  return { purchase, allIssues, sales, stock, movement, movementDialog, screens, giftBox, issueDrill, purchaseDrill };
})()`, context);
assert.equal(complimentaryReportCheck.purchase[0].itemTotal, 40, "Complimentary purchase must exclude free-of-cost units from its payable total");
assert.equal(complimentaryReportCheck.purchase[0].itemCost, 5, "Complimentary gift stock cost allocation is incorrect");
assert.equal(complimentaryReportCheck.allIssues.length, 2, "Item List should include every complimentary gift issue");
assert.equal(complimentaryReportCheck.sales.length, 1, "Sales must include only gifts tied to a customer sale");
assert.equal(complimentaryReportCheck.sales[0].saleBillNo, "CM1", "Sales gift issue lost its customer invoice link");
assert.equal(complimentaryReportCheck.giftBox.stock, 95, "Complimentary gift stock should equal opening plus purchases minus customer issues");
assert.equal(complimentaryReportCheck.giftBox.drillTarget, "complimentary-issue", "Stock should drill to its latest gift transaction");
assert(complimentaryReportCheck.movement.length > 0 && complimentaryReportCheck.movement.every((row) => row.itemName === "Gift Box"), "Stock Movement item filter included another gift item");
for (const field of ["Item", "From", "To", "OK", "Cancel"]) assert(complimentaryReportCheck.movementDialog.includes(field), `Stock Movement dialog is missing ${field}`);
for (const column of ["Type", "entryno", "Date", "SmanName", "Sup Customer", "itemID", "itemName", "Unit", "Qty", "foc", "Amount", "Cost"]) assert(complimentaryReportCheck.screens["Stock Movement"].includes(column), `Stock Movement is missing ${column}`);
assert(complimentaryReportCheck.screens["Stock Movement"].includes('data-report-bill-id="COMP-I"'), "Stock Movement gift issues are not configured for bill drill-down");
for (const column of ["itemID", "itemName", "Stock"]) assert(complimentaryReportCheck.screens.Stock.includes(column), `Complimentary Stock is missing ${column}`);
for (const column of ["SmanName", "entryNo", "Date", "itemCode", "ItemName", "Unit", "Qty", "issueMode", "saleBillNo", "Remarks"]) assert(complimentaryReportCheck.screens["Item List"].includes(column), `Complimentary Item List is missing ${column}`);
assert(complimentaryReportCheck.screens.Stock.includes('data-report-bill-id="COMP-I"'), "Complimentary Stock rows are not configured for bill drill-down");
assert.equal(complimentaryReportCheck.issueDrill.active, "Work Orders", "Gift issue drill-down did not open transactions");
assert.equal(complimentaryReportCheck.issueDrill.complimentaryView, "Complimentary Item Issue", "Gift issue drill-down opened the wrong bill");
assert.equal(complimentaryReportCheck.issueDrill.id, "COMP-I", "Gift issue drill-down opened the wrong record");
assert.equal(complimentaryReportCheck.purchaseDrill.complimentaryView, "Complimentary Item Purchase", "Gift purchase drill-down opened the wrong bill");
assert.equal(complimentaryReportCheck.purchaseDrill.id, "COMP-P", "Gift purchase drill-down opened the wrong record");
assert.equal(vm.runInContext(`REPORT_ROOT_MENU_ITEMS.some((item) => item.label === "Sample Issue/Return")`, context), false, "Sample Issue/Return was not removed from Reports");

const discountVoucherCheck = vm.runInContext(`(() => {
  const saved = { coupons: state.miscellaneous.discountCoupons, bills: state.bills, active, managementView, miscellaneousView, salesView, filter: discountVoucherReportFilter };
  state.miscellaneous.discountCoupons = [{ id: "CP1", couponNo: "CP1", value: 100, active: true, issueDate: "01/04/2032" }, { id: "CP2", couponNo: "CP2", value: 50, active: true, issueDate: "02/04/2032" }];
  state.bills = [{ id: "DV-SALE", type: "Sales", entryNo: "CM-DV", billNo: "CM-DV", date: "03/04/2032", couponNo: "CP1", adjustments: { coupon: 100 }, line: { itemName: "RING", qty: 1, gross: 1, stone: 0, wastage: 0, net: 1, rate: 100, va: 0, makingCharge: 0, tax: 0, amount: 100 }, sections: { sales: [{ itemName: "RING", qty: 1, gross: 1, stone: 0, net: 1, rate: 100, amount: 100 }] } }];
  discountVoucherReportFilter = "All"; const all = discountVoucherReportRows(), screen = discountVoucherReportScreen();
  discountVoucherReportFilter = "Issued"; const issued = discountVoucherReportRows();
  discountVoucherReportFilter = "Redeemed"; const redeemed = discountVoucherReportRows();
  openReportBillDetail({ dataset: { reportBillId: "DV-SALE", reportEntryNo: "CM-DV", reportTarget: "sales", reportStorage: "bills", reportView: "Sales Invoice" } });
  const redeemedDrill = { active, salesView, id: state.bills[0]?.id };
  openReportBillDetail({ dataset: { reportBillId: "CP2", reportEntryNo: "CP2", reportTarget: "discount-coupon-master", reportStorage: "", reportView: "Discount Coupon Master" } });
  const issuedDrill = { active, managementView, miscellaneousView, id: managementSelection.miscellaneous.discountCoupons };
  state.miscellaneous.discountCoupons = saved.coupons; state.bills = saved.bills; active = saved.active; managementView = saved.managementView; miscellaneousView = saved.miscellaneousView; salesView = saved.salesView; discountVoucherReportFilter = saved.filter;
  return { all, issued, redeemed, screen, redeemedDrill, issuedDrill };
})()`, context);
assert.equal(discountVoucherCheck.all.length, 2, "Discount Voucher All did not reconcile issued and redeemed vouchers");
assert.equal(discountVoucherCheck.issued.length, 1, "Discount Voucher Issued filter is incorrect");
assert.equal(discountVoucherCheck.redeemed.length, 1, "Discount Voucher Redeemed filter is incorrect");
for (const column of ["CouponID", "CouponAmt", "IssueNo", "IssueDate", "RedeemNo", "RedeemDate", "CouponStatus"]) assert(discountVoucherCheck.screen.includes(column), `Discount Voucher is missing ${column}`);
assert(discountVoucherCheck.screen.includes('data-report-bill-id="DV-SALE"') && discountVoucherCheck.screen.includes('data-report-bill-id="CP2"'), "Discount Voucher rows are not drillable");
assert.equal(discountVoucherCheck.redeemedDrill.active, "Sales", "Redeemed voucher did not open Sales Entry");
assert.equal(discountVoucherCheck.redeemedDrill.id, "DV-SALE", "Redeemed voucher opened the wrong Sales Entry");
assert.equal(discountVoucherCheck.issuedDrill.miscellaneousView, "Discount Coupon Master", "Issued voucher did not open its voucher master");
assert.equal(discountVoucherCheck.issuedDrill.id, "CP2", "Issued voucher opened the wrong master record");
for (const removed of ["Day Account Transactions", "Chart Of Accounts"]) assert(!vm.runInContext(`VOUCHER_REPORT_ITEMS`, context).includes(removed), `${removed} was not removed from Voucher Reports`);
for (const removed of ["Opening Balance", "Receipt Due Report", "Sub Schedule Wise Ledger"]) assert(!vm.runInContext(`FINANCIAL_REPORT_ITEMS`, context).includes(removed), `${removed} was not removed from Financial Reports`);
for (const removed of ["Stock Compare", "Other Location Stock"]) assert(!vm.runInContext(`STOCK_CURRENT_REPORTS`, context).includes(removed), `${removed} was not removed from CurrentStock reports`);

const sundryDebtorsCheck = vm.runInContext(`(() => {
  const saved = { parties: state.parties, bills: state.bills, from: financialReportOptions.from, to: financialReportOptions.to, view: sundryDebtorsView };
  state.parties = [{ id: "C-DEBT", customerCode: "C-DEBT", name: "DEBTOR TEST CUSTOMER", type: "Customer", openingBalance: 0, address: "Debtor Road", place: "Edakkara", phone: "9000", mobile: "9111" }];
  state.bills = [{ id: "DEBT-SALE", type: "Sales", entryNo: "CM-DEBT", date: "05/04/2033", dueDate: "15/04/2033", customer: "DEBTOR TEST CUSTOMER", invoiceTotal: 500, paid: 100, totals: { invoiceTotal: 500, cashReceived: 100 }, sections: { sales: [] } }];
  financialReportOptions = { ...financialReportOptions, from: "01/04/2033", to: "30/04/2033", shown: true, page: 0 };
  sundryDebtorsView = "General";
  const data = sundryDebtorsGeneralData(), screens = {};
  for (const view of ["General", "Detailed", "Datestamp", "With Due Date"]) { sundryDebtorsView = view; screens[view] = sundryDebtorsReportScreen(); }
  state.parties = saved.parties; state.bills = saved.bills; financialReportOptions = { ...financialReportOptions, from: saved.from, to: saved.to }; sundryDebtorsView = saved.view;
  return { data, screen: screens.General, screens };
})()`, context);
assert.equal(sundryDebtorsCheck.data.rows.length, 1, "Sundry Debtors General did not load customer balances");
assert.equal(sundryDebtorsCheck.data.totalClosing, sundryDebtorsCheck.data.totalDebit - sundryDebtorsCheck.data.totalCredit, "Sundry Debtors closing total does not reconcile");
for (const column of ["Id", "Name", "Debit", "Credit", "Closing"]) assert(sundryDebtorsCheck.screen.includes(column), `Sundry Debtors General is missing ${column}`);
for (const view of ["General", "Detailed", "Datestamp", "With Due Date"]) assert(sundryDebtorsCheck.screen.includes(view), `Sundry Debtors selector is missing ${view}`);
assert(sundryDebtorsCheck.screen.includes("<tfoot>") && sundryDebtorsCheck.screen.includes("Total"), "Sundry Debtors General is missing its final totals row");
for (const column of ["PartyAddress", "place", "Phone", "mobile", "Debit", "Credit", "Closing"]) assert(sundryDebtorsCheck.screens.Detailed.includes(column), `Sundry Debtors Detailed is missing ${column}`);
for (const column of ["Opening", "Debit", "Credit", "Closing"]) assert(sundryDebtorsCheck.screens.Datestamp.includes(column), `Sundry Debtors Datestamp is missing ${column}`);
for (const column of ["PartyAddress", "Phone", "mobile", "Closing", "DR_CR", "LastDueDate"]) assert(sundryDebtorsCheck.screens["With Due Date"].includes(column), `Sundry Debtors With Due Date is missing ${column}`);
assert(sundryDebtorsCheck.screens["With Due Date"].includes("15/04/2033") && !sundryDebtorsCheck.screens["With Due Date"].includes("01/01/1900"), "Sundry Debtors due-date logic is incorrect");
for (const screen of Object.values(sundryDebtorsCheck.screens)) assert(screen.includes("<tfoot>") && screen.includes("Total"), "A Sundry Debtors view is missing its totals footer");

const sundryCreditorsCheck = vm.runInContext(`(() => {
  const saved = { parties: state.parties, bills: state.bills, accountMasters: state.accountMasters, from: financialReportOptions.from, to: financialReportOptions.to };
  state.parties = [{ id: "S-CRED", supplierCode: "S-CRED", name: "CREDITOR TEST SUPPLIER", type: "Supplier", openingBalance: 0, balanceType: "Cr" }];
  state.accountMasters = [];
  state.bills = [{ id: "CRED-PURCHASE", type: "Purchase Invoice", entryNo: "P-CRED", date: "05/04/2034", supplier: "CREDITOR TEST SUPPLIER", partyName: "CREDITOR TEST SUPPLIER", invoiceTotal: 800, paid: 200, totals: { invoiceTotal: 800, cashPaid: 200 } }];
  financialReportOptions = { ...financialReportOptions, from: "01/04/2034", to: "30/04/2034", shown: true, page: 0 };
  const data = sundryCreditorsReportData(), screen = financialReportView("Sundry Creditors");
  state.parties = saved.parties; state.bills = saved.bills; state.accountMasters = saved.accountMasters; financialReportOptions = { ...financialReportOptions, from: saved.from, to: saved.to };
  return { data, screen };
})()`, context);
assert.equal(sundryCreditorsCheck.data.rows.length, 1, "Sundry Creditors did not load supplier balances");
assert.equal(sundryCreditorsCheck.data.rows[0].credit, 800, "Sundry Creditors purchase credit is incorrect");
assert.equal(sundryCreditorsCheck.data.rows[0].debit, 200, "Sundry Creditors payment debit is incorrect");
assert.equal(sundryCreditorsCheck.data.rows[0].balance, -600, "Sundry Creditors balance is incorrect");
for (const column of ["ID", "Name", "Credit", "Debit", "Balance", "DR_CR"]) assert(sundryCreditorsCheck.screen.includes(column), `Sundry Creditors is missing ${column}`);
assert(!sundryCreditorsCheck.screen.includes("<select"), "Sundry Creditors must not contain a view dropdown");
assert(sundryCreditorsCheck.screen.includes("<tfoot>") && sundryCreditorsCheck.screen.includes("Total"), "Sundry Creditors is missing its totals footer");

const utilitiesCheck = vm.runInContext(`(() => {
  const saved = { bills: state.bills, openingStockEntries: state.openingStockEntries, itemTransfers: state.itemTransfers, stock: state.stock, utilityView, barcodeCheckingQuery, utilities: state.utilities };
  state.openingStockEntries = [{ id: "BC-IN", entryNo: "0", date: "01/04/2035", location: "Shop", lines: [{ barcode: "B002753", itemName: "BANGLE", qty: 1, gross: 10, stone: 0, net: 10 }] }];
  state.bills = [{ id: "BC-OUT", type: "Sales", entryNo: "CM01292", date: "06/08/2035", customer: "ANEESH", sections: { sales: [{ barcode: "B002753", itemName: "BANGLE", qty: 1, gross: 10, stone: 0, net: 10 }] } }];
  state.itemTransfers = []; state.stock = [];
  barcodeCheckingQuery = "B002753"; utilityView = "Barcode Checking";
  const movements = barcodeMovementData("B002753"), checking = barcodeCheckingScreen();
  utilityView = "Barcode Verification"; barcodeVerification = { scan: "", location: "Shop", tagWeight: 0, autoVerify: false, appendScans: false, appendExpected: false, scanned: [], expected: [], verified: [] };
  const verification = barcodeVerificationScreen();
  state.utilities = { dayLock: { locked: true, from: "01/08/2035", to: "07/08/2035", user: "OWNER", lockedAt: "" } };
  const locked = isTransactionDateLocked("06/08/2035"), open = isTransactionDateLocked("08/08/2035");
  state.bills = saved.bills; state.openingStockEntries = saved.openingStockEntries; state.itemTransfers = saved.itemTransfers; state.stock = saved.stock; state.utilities = saved.utilities; utilityView = saved.utilityView; barcodeCheckingQuery = saved.barcodeCheckingQuery;
  return { movements, checking, verification, locked, open, menu: UTILITY_ITEMS };
})()`, context);
assert.equal(Array.from(utilitiesCheck.menu).join("|"), ["Day Lock", "Barcode Verification", "Barcode Checking", "System Diagnostics", "Audit & Event Logs", "Backup & Restore", "Data Integrity Check", "Print Setup"].join("|"), "Utilities menu does not contain the approved eight tools");
assert.equal(utilitiesCheck.movements.length, 2, "Barcode Checking did not reconstruct the full movement trail");
assert.equal(utilitiesCheck.movements.at(-1).direction, "OUT", "Barcode Checking did not identify the final sale movement");
assert(utilitiesCheck.checking.includes("Sold Out") && utilitiesCheck.checking.includes("CM01292"), "Barcode Checking status or trail is incorrect");
for (const label of ["Auto Verify", "Append", "Tag Weight", "Verify", "No. of Record"]) assert(utilitiesCheck.verification.includes(label), `Barcode Verification is missing ${label}`);
assert.equal(utilitiesCheck.locked, true, "Day Lock did not block an in-range date");
assert.equal(utilitiesCheck.open, false, "Day Lock incorrectly blocked an out-of-range date");

console.log("Goldland runtime and demo-data tests passed.");
