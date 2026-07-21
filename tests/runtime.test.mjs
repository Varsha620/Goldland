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
const state = JSON.parse(storage.get("goldland-state"));
assert.equal(state.demoDataVersion, 1, "Demo migration version was not persisted");

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
