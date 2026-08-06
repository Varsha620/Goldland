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
assert.equal(state.demoDataVersion, 1, "Demo migration version was not persisted");
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

console.log("Goldland runtime and demo-data tests passed.");
