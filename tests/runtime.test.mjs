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
  }, { returnMode: true })
`, context);
assert.equal(dmdReturnMcCheck.purchaseMaking, 450, "DMD Return purchase MC should be net weight * purchase MC");
assert.equal(dmdReturnMcCheck.total, 11450, "DMD Return total should include purchase MC");
assert.equal(dmdReturnMcCheck.amount, 11450, "DMD Return amount should carry the purchase-side total");
assert.equal(dmdReturnMcCheck.salesAmt, 0, "DMD Return sales amount must stay zero until sold");

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
