const ACCESS_PASSWORD = "goldland2026";
const SALES_ITEMS = ["Sales Invoice", "Sales Return", "DMD Return/DMD OP", "DMD Sales WholeSales", "Sales Order", "Additional Order Advance", "Order Advance Refund"];
const PURCHASE_ITEMS = ["Purchase Invoice", "Purchase Return", "Diamond Purchase", "Diamond Purchase Return", "Direct Purchase", "Direct Purchase Return", "DMD Stone Purchase"];
const WORK_ORDER_ITEMS = ["Smith", "Jeweller", "Refining", "Sample", "Polishing", "Service / Job", "Complimentary Item"];
const ACCOUNT_ITEMS = ["Account Ledger", "Cash Receipt", "Cash Payment", "Bank Deposit", "Bank Withdrawal", "Journal Voucher", "PDC Transactions", "Direct Entry", "Expense Entry", "Bill Wise Collection", "Bill Wise Payment", "Discount in Credit Note", "Discount in Debit Note", "Custom Voucher"];
const MANAGEMENT_ITEMS = ["Customers", "Suppliers", "Smiths", "Refiners", "Employees", "Item Category", "Miscellaneous", "Item Creation", "Account Creation"];
const EXPANDABLE_NAVS = new Set(["Sales", "Purchase", "Stock", "Work Orders", "Accounts", "Management"]);
const OPENING_STOCK_VIEW = "Opening Stock Account Entry";
const STOCK_ITEMS = ["Stock Register", "Barcode Entry", OPENING_STOCK_VIEW, "Stock Adjustments", "Item Transfer", "Gold Deposit", "Gold Withdrawal"];
const REPORT_MENU_GROUPS = [
  { title: "Stock", items: ["Stock", "Stock Ledger", "Stock Register", "Stock Adjustment", "Sample Issue/Return"] },
  { title: "Sales", items: ["Sales", "Sales Profit", "Sales Return", "Exchange", "Sales Order"] },
  { title: "Purchase", items: ["Purchase", "Purchase Return", "Direct Gold Purchase", "Direct Gold Purchase Return"] },
  { title: "Diamond", items: ["Diamond"] },
  { title: "Transfers", items: ["Transfers"] },
  { title: "Barcode", items: ["Barcode Entry", "Barcode/HUID Stock Report"] },
  { title: "Tax", items: ["Tax Reports", "GST Invoice Export"] },
  { title: "Bills", items: ["Bills Reports", "Bills Payables", "Today's Dues"] },
  { title: "Cash/Accounts", items: ["Cash Point", "Discount Voucher", "Party Ledger"] },
  { title: "Service/Job", items: ["Service / Job", "Complementary Items"] },
  { title: "Day End", items: ["Day end Report", "Day Summary", "Audit Trail", "Rate History", "Scheme Member Ledger"] }
];
const PINNED_REPORTS = ["Day Summary", "Stock", "Sales", "Bills Reports", "Tax Reports", "Day end Report"];
const DEMO_DATA_VERSION = 1;

const seed = {
  user: { name: "Goldland Staff" },
  rates: [
    rate("Gold", "24K", 9840, "09:05", "Opening rate"),
    rate("Gold", "22K", 9020, "09:05", "Opening rate"),
    rate("Gold", "18K", 7380, "09:05", "Opening rate"),
    rate("Silver", "999", 124, "09:05", "Opening rate"),
    rate("Diamond", "VVS/ct", 64000, "10:35", "Supplier update"),
    rate("Gold", "22K", 9075, "13:20", "Market moved")
  ],
  bills: [
    {
      id: "GL-S-2026-0019",
      entryNo: "C02033",
      date: "30-08-2025",
      time: "10:42",
      customer: "Rahul U M",
      customerId: "H1910",
      staffId: "STF001",
      staffName: "Akhil",
      billNo: "20260521_1",
      prepareEinvoice: false,
      address: "Uppamoochikkal, Valikad",
      phone: "8281900323",
      type: "Sale",
      itemCategory: "B2C",
      amount: 128540,
      paid: 100000,
      discount: 0,
      taxAmount: 3744,
      balance: 28540,
      adjustments: { salesReturn: 0, exchange: 0, salesOrder: 0, coupon: 0, card: 0, totalAdjustments: 0 },
      totals: { salesTotal: 124796, dmdAmount: 0, kfcGstAmount: 0, addition: 0, vaDiscount: 0, flatDiscount: 0, rateDifference: 0, invoiceTotal: 128540, ledgerBalance: 0, billAmountRoundOff: 0, cashReceived: 100000, balance: 28540 },
      rateSnapshot: "22K Rs.9020/g",
      line: {
        barcode: "GL22-1042",
        itemName: "Chain",
        description: "22K gold chain",
        qty: 1,
        gross: 14.204,
        stone: 0,
        wastage: 0.62,
        net: 14.824,
        stoneCharge: 0,
        rate: 9020,
        va: 4.5,
        mcPerGm: 850,
        totalMc: 12074,
        taxPct: 3,
        tax: 3744,
        amount: 128540
      }
    },
    {
      id: "GL-P-2026-0041",
      entryNo: "1069",
      date: "30-08-2025",
      time: "12:18",
      customer: "Vinod Sat",
      customerId: "9998",
      staffId: "STF002",
      staffName: "Sajitha",
      billNo: "20260521_2",
      prepareEinvoice: false,
      address: "Ooty Road",
      phone: "",
      type: "Old gold purchase",
      itemCategory: "B2C",
      amount: 55790,
      paid: 55790,
      discount: 0,
      taxAmount: 0,
      balance: 0,
      adjustments: { salesReturn: 0, exchange: 55790, salesOrder: 0, coupon: 0, card: 0, totalAdjustments: 55790 },
      totals: { salesTotal: 0, dmdAmount: 0, kfcGstAmount: 0, addition: 0, vaDiscount: 0, flatDiscount: 0, rateDifference: 0, invoiceTotal: 55790, ledgerBalance: 0, billAmountRoundOff: 0, cashReceived: 55790, balance: 0 },
      rateSnapshot: "22K Rs.9075/g",
      line: {
        barcode: "OLD-0041",
        itemName: "Old Gold",
        description: "Customer old gold purchase",
        qty: 1,
        gross: 7.12,
        stone: 0,
        wastage: 0,
        net: 6.148,
        stoneCharge: 0,
        rate: 9075,
        va: 0,
        mcPerGm: 0,
        totalMc: 0,
        taxPct: 0,
        tax: 0,
        amount: 55790
      }
    }
  ],
  salesOrders: [
    {
      id: "GL-O-2026-2210",
      entryNo: "2210",
      refNo: "2210",
      billNo: "20260522_ORD",
      prepareEinvoice: false,
      date: "22-05-2026",
      time: "14:05",
      customer: "Rahul U M",
      customerId: "H1910",
      staffId: "STF001",
      staffName: "Akhil",
      address: "Uppamoochikkal, Valikad",
      phone: "8281900323",
      type: "Sales Order",
      itemCategory: "B2C",
      introducer: "",
      dueDate: "22/05/2026",
      amount: 0,
      paid: 0,
      discount: 0,
      taxAmount: 0,
      balance: 0,
      adjustments: { salesReturn: 0, exchange: 0, salesOrder: 0, coupon: 0, card: 0, totalAdjustments: 0 },
      totals: { salesTotal: 0, dmdAmount: 0, kfcGstAmount: 0, addition: 0, flatDiscount: 0, rateDifference: 0, invoiceTotal: 0, ledgerBalance: 0, billAmountRoundOff: 0, cashReceived: 0, balance: 0 },
      rateSnapshot: "22K Rs.9075/g",
      sections: { sales: [], exchange: [], return: [] },
      paymentBreakup: { cash: 0, gpay: 0, card: 0, bank: 0, other: 0, reference: "" }
    }
  ],
  dmdReturns: [
    {
      id: "DMD-RET-001",
      entryNo: "1",
      date: "30-05-2026",
      time: "11:42",
      preparedBy: "Akhil",
      customerId: "",
      customer: "",
      gstin: "",
      panCardNo: "",
      paymentMode: "Cash",
      returnType: "Sales Return",
      addition: 0,
      discount: 0,
      tdsTcs: 0,
      taxPct: 3,
      cash: 0,
      lines: []
    }
  ],
  dmdWholesales: [
    {
      id: "DMD-WHS-001",
      entryNo: "1",
      date: "30-05-2026",
      time: "12:23",
      invoiceNo: "",
      invoiceDate: "30-05-2026",
      customer: "",
      partyName: "",
      preparedBy: "Akhil",
      addToStock: true,
      addition: 0,
      discount: 0,
      gstPct: 3,
      cashPayment: 0,
      ornamentLines: [],
      diamondLines: []
    }
  ],
  stock: [
    { item: "Baby Ring", purity: "22K", huid: "HUID-7K81", qty: 73, gross: 14.204, opening: 14.204, addition: 0, deduction: 0, closing: 14.204, status: "Ready" },
    { item: "Bangle", purity: "22K", huid: "HUID-1M22", qty: 464, gross: 3129.262, opening: 3129.262, addition: 0, deduction: 0, closing: 3129.262, status: "Ready" },
    { item: "Diamond Ring", purity: "18K", huid: "DIA-4431", qty: 84, gross: 92.77, opening: 92.77, addition: 0, deduction: 0, closing: 92.77, status: "Low review" },
    { item: "Chain", purity: "22K", huid: "HUID-9Q21", qty: 236, gross: 2327.178, opening: 2327.178, addition: 0, deduction: 0, closing: 2327.178, status: "Ready" }
  ],
  complimentaryStock: [
    { itemId: "GBX", itemName: "Gift Box", unit: "Nos", purchased: 100, issued: 12, balance: 88 },
    { itemId: "CBG", itemName: "Carry Bag", unit: "Nos", purchased: 250, issued: 40, balance: 210 },
    { itemId: "CLN", itemName: "Cleaning Cloth", unit: "Nos", purchased: 75, issued: 8, balance: 67 }
  ],
  complimentaryPurchases: [],
  complimentaryIssues: [],
  itemMasters: [
    { itemId: "DBR", itemName: "DIAMOND BRACELET", regionalName: "", subGroup: "DMD", product: "Diamond", brand: "", model: "", hsnTax: "7113 / 3%", typeWastage: "22ct", va: 0, mcGram: 0, openingNos: 0, openingGross: 0, openingStone: 0, openingNet: 0, openingDate: "22/05/2026", itemStockTouch: 0, closingNos: 0, closingGross: 0, closingStone: 0, closingNet: 0, closingStockTouch: 0, ornament: true, barcodeCompulsory: false, reservedItem: false, hideInStockReports: false },
    { itemId: "R", itemName: "RING", regionalName: "", subGroup: "GLD", product: "Gold", brand: "", model: "", hsnTax: "7113 / 3%", typeWastage: "22ct", va: 4.5, mcGram: 0, openingNos: 0, openingGross: 0, openingStone: 0, openingNet: 0, openingDate: "22/05/2026", itemStockTouch: 0, closingNos: 0, closingGross: 0, closingStone: 0, closingNet: 0, closingStockTouch: 0, ornament: true, barcodeCompulsory: true, reservedItem: false, hideInStockReports: false },
    { itemId: "SIL", itemName: "SILVER ORNAMENTS", regionalName: "", subGroup: "SLV", product: "Silver", brand: "", model: "", hsnTax: "7113 / 3%", typeWastage: "Silver", va: 0, mcGram: 0, openingNos: 0, openingGross: 0, openingStone: 0, openingNet: 0, openingDate: "22/05/2026", itemStockTouch: 0, closingNos: 0, closingGross: 0, closingStone: 0, closingNet: 0, closingStockTouch: 0, ornament: true, barcodeCompulsory: false, reservedItem: false, hideInStockReports: false }
  ],
  itemCategories: {
    products: [
      { id: "DM", name: "DIAMOND", status: "Active", description: "" },
      { id: "GD", name: "GOLD", status: "Active", description: "" }
    ],
    brands: [
      { id: "TL", name: "TALIYA", status: "Active", description: "" }
    ],
    models: [],
    units: [
      { id: "1", name: "Nos" }
    ],
    subGroups: [
      { id: "SIL", name: "75%", remarks: "" },
      { id: "SC", name: "SCHAIN", remarks: "" },
      { id: "SBR", name: "SILVER BR", remarks: "" },
      { id: "SL", name: "SILVER LKT", remarks: "" }
    ],
    prefixes: [
      { id: "1", number: 1, description: "Gold", prefix: "M" },
      { id: "2", number: 2, description: "Silver", prefix: "M" },
      { id: "3", number: 3, description: "Diamond", prefix: "M" },
      { id: "4", number: 4, description: "Platinum", prefix: "M" },
      { id: "5", number: 5, description: "Birth Stones", prefix: "M" },
      { id: "6", number: 6, description: "Old Gold", prefix: "M" },
      { id: "7", number: 7, description: "Old Silver", prefix: "M" },
      { id: "9", number: 9, description: "Pure Gold", prefix: "M" },
      { id: "10", number: 10, description: "Watch", prefix: "M" },
      { id: "11", number: 11, description: "Other", prefix: "" }
    ]
  },
  miscellaneous: {
    agents: [
      { id: "A0001", name: "DN", subSchedule: "Agents", openingBalance: 0, balanceType: "Dr", opDate: "29/05/2026", address: "", city: "", place: "", state: "KERALA", country: "INDIA", gstin: "", fax: "", phone: "", mobile: "", email: "", website: "", status: "Active" },
      { id: "A0002", name: "UR", subSchedule: "Agents", openingBalance: 0, balanceType: "Dr", opDate: "29/05/2026", address: "", city: "", place: "", state: "KERALA", country: "INDIA", gstin: "", fax: "", phone: "", mobile: "", email: "", website: "", status: "Active" }
    ],
    areas: [],
    costCenters: [
      { id: "1", name: "cost1", controlAccount: "", isDefault: true }
    ],
    discountCoupons: [],
    stockLocations: [
      { id: "1", name: "LK1", isDefault: true }
    ],
    cards: [
      { id: "1", code: "1", name: "UPI", bank: "Canara Bank Edakkara", bankChargeId: "Addition", commissionPct: 0 },
      { id: "2", code: "2", name: "Debit Card", bank: "Canara Bank Edakkara", bankChargeId: "Addition", commissionPct: 0 },
      { id: "3", code: "3", name: "Credit Card", bank: "Canara Bank Edakkara", bankChargeId: "Addition", commissionPct: 0 }
    ],
    counters: [],
    taxSchedules: [
      { id: "0", value: 0, description: "0", purchaseTax: 0, salesTax: 0, cess: 0, inputVat: "Input Vat" },
      { id: "3", value: 0, description: "", purchaseTax: 1.5, salesTax: 1.5, cess: 0, inputVat: "" }
    ],
    nonTradeSuppliers: []
  },
  parties: [
    { customerCode: "C0001", name: "Rahul U M", type: "Customer", phone: "8281900323", status: "2 active bills" },
    { customerCode: "C0142", name: "ABDULLATHEEF", type: "Customer", phone: "", status: "Scheduled voucher party" },
    { customerCode: "S0014", name: "AJAYA KUMAR", type: "Supplier", address: "PADIKKAL [H]", phone: "", status: "Active supplier" },
    { customerCode: "S0001", name: "Vinod Sat", type: "Supplier", phone: "", status: "Ledger balance pending" },
    { name: "Anaida", type: "Scheme member", phone: "", status: "Due follow-up" },
    { customerCode: "M0001", name: "Ravi Smith", type: "Smith", phone: "9447000101", status: "18.720 g pending" },
    { name: "Babu Jeweller", type: "Jeweller", phone: "9447000102", status: "42.500 g issued" },
    { customerCode: "R0001", name: "Metro Refiner", type: "Refiner", phone: "9447000103", status: "Melting issue pending" }
  ],
  staffs: [
    { staffId: "329", employeeId: "329", name: "ABDUL SALAM AP", phone: "", status: "Active", handled: 0, sales: 0 },
    { staffId: "STF001", name: "Akhil", phone: "9447000001", status: "Active", handled: 18, sales: 642500 },
    { staffId: "STF002", name: "Sajitha", phone: "9447000002", status: "Active", handled: 12, sales: 388200 },
    { staffId: "STF003", name: "Nishad", phone: "9447000003", status: "Active", handled: 7, sales: 0 }
  ],
  workLogs: [
    { refNo: "JW-001", date: "01/09/2025", workflow: "Jeweller", action: "Transfer", party: "Babu Jeweller", item: "Bangle", qty: 4, gross: 42.5, issue: 42.5, receive: 0, balance: 42.5, status: "Issued" },
    { refNo: "SM-002", date: "01/09/2025", workflow: "Smith", action: "Issue", party: "Ravi Smith", item: "Chain", qty: 2, gross: 18.72, issue: 18.72, receive: 0, balance: 18.72, status: "Issued" },
    { refNo: "RF-003", date: "01/09/2025", workflow: "Refiner", action: "Melting Issue", party: "Refiner", item: "Old Gold", qty: 1, gross: 37.1, issue: 37.1, receive: 0, balance: 37.1, status: "Pending" }
  ],
  serviceJobs: [],
  serviceClosures: [],
  schemes: [
    { memberId: "H1910", member: "Anaida", address: "Uppamoochikkal", place: "Valikad", mobile: "8281900323", scheme: "MT Suvarna", book: "MT24430", qty: 0, joinDate: "01/09/2025", endDate: "01/09/2026", due: 500, opAmount: 1119146, opWeight: 0.269, opDate: "01/09/2025", collection: 500, balance: 1125146 },
    { memberId: "H1909", member: "Muhammed Basheer", address: "Poomthuruth", place: "Bho", mobile: "", scheme: "MT Suvarna", book: "MT2034", qty: 0, joinDate: "01/09/2025", endDate: "01/09/2026", due: 5000, opAmount: 115146, opWeight: 0, opDate: "01/09/2025", collection: 5000, balance: 120146 },
    { memberId: "H1918", member: "Aleena Reji", address: "Anilimoottil", place: "Poth", mobile: "", scheme: "MT Suvarna", book: "MT15188", qty: 0, joinDate: "01/09/2025", endDate: "01/09/2026", due: 50000, opAmount: 889586, opWeight: 0, opDate: "01/09/2025", collection: 50000, balance: 939586 }
  ],
  accounts: [
    { date: "28-08-2025", vouNo: "CP/322", ledger: "Cash in Hand", particular: "Cash in Hand tm purchase", debit: 522377, credit: 0, balance: 522377, crdr: "Dr" },
    { date: "31-03-2026", vouNo: "/", ledger: "Canara Bank Edak", particular: "Balance", debit: 0, credit: 154043, balance: -154043, crdr: "Cr" },
    { date: "03-04-2025", vouNo: "SCMR/13325", ledger: "Scheme Collection", particular: "Scheme collection receipt", debit: 0, credit: 1225233, balance: -1225233, crdr: "Cr" }
  ],
  accountMasters: [
    { accountId: "G0087", accountName: "SHOP CASH", aliasName: "", subSchedule: "Cash", openingBalance: 0, balanceType: "Dr", opDate: "21/05/2026", status: "ACTIVE", costCenter: "Main shop", mobile: "", adminOnly: false },
    { accountId: "CNRB", accountName: "Canara Bank Edakkara", aliasName: "", subSchedule: "Bank", openingBalance: 154043, balanceType: "Cr", opDate: "21/05/2026", status: "ACTIVE", costCenter: "Main shop", mobile: "", adminOnly: false }
  ],
  bankDeposits: [],
  bankWithdrawals: [],
  pdcBankSubmissions: [],
  pdcIssues: [],
  pdcRequests: [],
  pdcReceipts: [],
  pdcChequeBounces: [],
  pdcChequeRequests: [],
  cashReceipts: [],
  cashPayments: [],
  journalVouchers: [],
  directEntries: [],
  expenseEntries: [],
  customVouchers: [],
  audit: [
    audit("Updated 22K gold rate to Rs.9075/g", "13:20"),
    audit("Approved old gold purchase GL-P-2026-0041", "12:20"),
    audit("Created invoice GL-S-2026-0019", "10:43")
  ]
};

const DMD_RETURN_TYPES = ["Sales Return", "Opening Stock", "Local Purchase"];

let state = null;
state = loadState();
state = ensureDemoData(state);
let active = "Dashboard";
let expandedNavGroups = new Set();
let managementView = "Customers";
let itemCategoryView = "Product";
let miscellaneousView = "Agent";
let managementSelection = { parties: {}, employee: "", itemMaster: "", accountMaster: "", categories: {}, miscellaneous: {} };
let salesView = "Sales Invoice";
let salesOrderView = "Sales Order";
let purchaseView = "Purchase Invoice";
let stockView = "Stock Register";
let workOrderView = "Smith";
let smithWorkView = "Smith";
let accountView = "Account Ledger";
let billingView = "Sales";
let orderAdvanceDraft = defaultOrderAdvanceDraft("advance");
let orderAdvanceRefundDraft = defaultOrderAdvanceDraft("refund");
let smithWorkDraft = null;
let cashWeightSmithDraft = null;
let jewellerWorkDraft = null;
let cashWeightJewellerDraft = null;
let stockAdjustmentDraft = null;
let openingStockDraft = null;
let goldDepositDraft = null;
let goldWithdrawalDraft = null;
let sampleWorkView = "Sample Issue";
let sampleIssueDraft = null;
let sampleReturnDraft = null;
let polishingDraft = null;
let serviceWorkView = "New Service / Job";
let serviceNewDraft = null;
let serviceCloseDraft = null;
let refineryView = "Refinery Issue";
let refineryReturnView = "Test Return";
let refineryFinalView = "Final Return";
let refineryIssueDraft = null;
let refineryReturnDraft = null;
let refineryFinalDraft = null;
let meltingIssueDraft = null;
let meltingReturnDraft = null;
let meltingReturnView = "Final Return";
let billwiseDrafts = {};
let bankTransactionDrafts = {};
let pdcView = "Bank Submission";
let pdcDrafts = {};
let cashVoucherDrafts = {};
let journalVoucherDraft = null;
let directEntryDraft = null;
let expenseEntryDraft = null;
let complimentaryView = "Complimentary Item Purchase";
let complimentaryPurchaseDraft = null;
let complimentaryIssueDraft = null;
let complimentaryPurchaseSelectedRow = 0;
let complimentaryIssueSelectedRow = 0;
let existingRecordPickerItems = [];
let customVoucherDraft = null;
let customVoucherEntryDraft = null;
let customVoucherConfirmDelete = true;
let selectedReport = "Day Summary";
let reportSearch = "";
let globalMenuSearch = "";
let recentReportItems = [];
let authenticated = sessionStorage.getItem("goldland-authenticated") === "true";

function rate(type, grade, price, time, reason) {
  return { id: crypto.randomUUID(), type, grade, price, time, reason, user: "Goldland", date: "2026-05-16" };
}

function audit(action, time = nowTime()) {
  return { id: crypto.randomUUID(), user: "Goldland", action, time, date: "2026-05-16" };
}

function nextCustomerId() {
  const source = typeof state === "undefined" ? seed.parties : state.parties;
  const count = (source || []).filter((party) => party.type === "Customer").length + 1;
  return `C${String(count).padStart(4, "0")}`;
}

function nextPartyCode(type) {
  const prefixes = { Customer: "C", Supplier: "S", Smith: "M", Refiner: "R" };
  const source = typeof state === "undefined" ? seed.parties : state.parties;
  const count = (source || []).filter((party) => party.type === type).length + 1;
  return `${prefixes[type] || "P"}${String(count).padStart(4, "0")}`;
}

function nextEmployeeId() {
  const source = typeof state === "undefined" ? seed.staffs : state.staffs;
  return `E${String((source || []).length + 1).padStart(4, "0")}`;
}

function nextAccountMasterId() {
  const source = typeof state === "undefined" ? seed.accountMasters : state.accountMasters;
  return `G${String((source || []).length + 106).padStart(4, "0")}`;
}

function nextItemMasterId() {
  const source = typeof state === "undefined" ? seed.itemMasters : state.itemMasters;
  return `IT${String((source || []).length + 1).padStart(3, "0")}`;
}

function loadState() {
  const stored = localStorage.getItem("goldland-state");
  const parsed = stored ? JSON.parse(stored) : structuredClone(seed);
  return {
    ...structuredClone(seed),
    ...parsed,
    bills: (parsed.bills || seed.bills).map(normalizeBill),
    salesOrders: (parsed.salesOrders || seed.salesOrders).map(normalizeBill),
    stock: (parsed.stock || seed.stock).map(normalizeStock),
    parties: (parsed.parties || seed.parties).map(normalizeParty),
    staffs: (parsed.staffs || seed.staffs).map(normalizeStaff),
    workLogs: (parsed.workLogs || seed.workLogs).map(normalizeWorkLog),
    schemes: (parsed.schemes || seed.schemes).map(normalizeScheme),
    accounts: (parsed.accounts || seed.accounts).map(normalizeAccount),
    accountMasters: (parsed.accountMasters || seed.accountMasters).map(normalizeAccountMaster),
    itemMasters: (parsed.itemMasters || seed.itemMasters).map(normalizeItemMaster),
    dmdReturns: (parsed.dmdReturns || seed.dmdReturns).map(normalizeDmdReturnBill),
    dmdWholesales: (parsed.dmdWholesales || seed.dmdWholesales).map(normalizeDmdWholesaleBill),
    dmdStonePurchases: (parsed.dmdStonePurchases || []).map(normalizeDmdStonePurchaseBill),
    diamondPurchases: (parsed.diamondPurchases || []).map(normalizeDiamondPurchaseBill),
    directPurchases: (parsed.directPurchases || []).map(normalizeDirectPurchaseBill),
    directPurchaseReturns: (parsed.directPurchaseReturns || []).map(normalizeDirectPurchaseReturnBill),
    diamondPurchaseReturns: (parsed.diamondPurchaseReturns || []).map(normalizeDiamondPurchaseReturnBill),
    orderAdvances: (parsed.orderAdvances || []).map((item) => normalizeOrderAdvanceRecord(item, "advance")),
    orderAdvanceRefunds: (parsed.orderAdvanceRefunds || []).map((item) => normalizeOrderAdvanceRecord(item, "refund")),
    smithWorkOrders: (parsed.smithWorkOrders || []).map(normalizeSmithWorkOrder),
    cashWeightSmiths: (parsed.cashWeightSmiths || []).map(normalizeCashWeightSmith),
    jewellerWorkOrders: (parsed.jewellerWorkOrders || []).map(normalizeJewellerWorkOrder),
    cashWeightJewellers: (parsed.cashWeightJewellers || []).map(normalizeCashWeightJeweller),
    stockAdjustments: (parsed.stockAdjustments || []).map(normalizeStockAdjustment),
    openingStockEntries: (parsed.openingStockEntries || []).map(normalizeOpeningStockEntry),
    goldDeposits: (parsed.goldDeposits || []).map((item) => normalizeGoldDeposit(item, "Deposit")),
    goldWithdrawals: (parsed.goldWithdrawals || []).map((item) => normalizeGoldDeposit(item, "Withdrawal")),
    sampleIssues: (parsed.sampleIssues || []).map((item) => normalizeSample(item, "Issue")),
    sampleReturns: (parsed.sampleReturns || []).map((item) => normalizeSample(item, "Return")),
    polishingEntries: (parsed.polishingEntries || []).map(normalizePolishingEntry),
    serviceJobs: (parsed.serviceJobs || []).map((item) => normalizeServiceJob(item, "New")),
    serviceClosures: (parsed.serviceClosures || []).map((item) => normalizeServiceJob(item, "Close")),
    refineryIssues: (parsed.refineryIssues || []).map(normalizeRefineryIssue),
    refineryReturns: (parsed.refineryReturns || []).map(normalizeRefineryReturn),
    refineryFinalReturns: (parsed.refineryFinalReturns || []).map(normalizeRefineryFinalReturn),
    meltingIssues: (parsed.meltingIssues || []).map(normalizeMeltingIssue),
    meltingReturns: (parsed.meltingReturns || []).map(normalizeMeltingReturn),
    complimentaryStock: (parsed.complimentaryStock || seed.complimentaryStock).map(normalizeComplimentaryStock),
    complimentaryPurchases: (parsed.complimentaryPurchases || []).map(normalizeComplimentaryPurchase),
    complimentaryIssues: (parsed.complimentaryIssues || []).map(normalizeComplimentaryIssue),
    billwiseCollections: (parsed.billwiseCollections || []).map((item) => normalizeBillwiseTransaction(item, "collection")),
    billwisePayments: (parsed.billwisePayments || []).map((item) => normalizeBillwiseTransaction(item, "payment")),
    billwiseCreditDiscounts: (parsed.billwiseCreditDiscounts || []).map((item) => normalizeBillwiseTransaction(item, "credit")),
    billwiseDebitDiscounts: (parsed.billwiseDebitDiscounts || []).map((item) => normalizeBillwiseTransaction(item, "debit")),
    bankDeposits: (parsed.bankDeposits || []).map((item) => normalizeBankTransaction(item, "deposit")),
    bankWithdrawals: (parsed.bankWithdrawals || []).map((item) => normalizeBankTransaction(item, "withdrawal")),
    pdcBankSubmissions: (parsed.pdcBankSubmissions || []).map((item) => normalizePdcRecord(item, "submission")),
    pdcIssues: (parsed.pdcIssues || []).map((item) => normalizePdcRecord(item, "issue")),
    pdcRequests: (parsed.pdcRequests || []).map((item) => normalizePdcRecord(item, "pdcRequest")),
    pdcReceipts: (parsed.pdcReceipts || []).map((item) => normalizePdcRecord(item, "receipt")),
    pdcChequeBounces: (parsed.pdcChequeBounces || []).map((item) => normalizePdcRecord(item, "bounce")),
    pdcChequeRequests: (parsed.pdcChequeRequests || []).map((item) => normalizePdcRecord(item, "request")),
    cashReceipts: (parsed.cashReceipts || []).map((item) => normalizeCashVoucher(item, "receipt")),
    cashPayments: (parsed.cashPayments || []).map((item) => normalizeCashVoucher(item, "payment")),
    journalVouchers: (parsed.journalVouchers || []).map(normalizeJournalVoucher),
    directEntries: (parsed.directEntries || []).map(normalizeDirectEntry),
    expenseEntries: (parsed.expenseEntries || []).map(normalizeExpenseEntry),
    customVouchers: (parsed.customVouchers || []).map(normalizeCustomVoucher),
    itemCategories: normalizeItemCategories(parsed.itemCategories || seed.itemCategories),
    miscellaneous: normalizeMiscellaneous(parsed.miscellaneous || seed.miscellaneous)
  };
}

function ensureDemoData(current) {
  if (Number(current.demoDataVersion || 0) >= DEMO_DATA_VERSION) return current;
  const addMissing = (collection, records, normalizer) => {
    current[collection] ||= [];
    records.forEach((record) => {
      if (!current[collection].some((item) => item.id === record.id || (record.entryNo && item.entryNo === record.entryNo))) {
        current[collection].push(normalizer(record));
      }
    });
  };

  addMissing("smithWorkOrders", [{
    id: "DEMO-SMITH-001",
    entryNo: "NR00006",
    refNo: "DEMO-SMITH",
    date: "24-06-2026",
    time: "10:15",
    paymentMode: "Credit",
    transType: "Issue",
    smithCode: "M0001",
    smithName: "Ravi Smith",
    preparedBy: "Akhil",
    postOnlyMc: true,
    skipStone: true,
    remarks: "Demo chain work issued to smith",
    lines: [
      { id: "DEMO-SMITH-L1", barcode: "GL22-1042", itemName: "Chain", mode: "OUT", qty: 2, gross: 18.72, stone: 0, touch: 91.6, wastage: 0.45, smWeight: 18.72, mcGram: 780, rate: 9075 },
      { id: "DEMO-SMITH-L2", barcode: "HUID-7K81", itemName: "Baby Ring", mode: "OUT", qty: 3, gross: 6.45, stone: 0.18, touch: 91.6, wastage: 0.3, smWeight: 6.27, mcGram: 650, rate: 9075 }
    ]
  }], normalizeSmithWorkOrder);

  addMissing("jewellerWorkOrders", [{
    id: "DEMO-JEWELLER-001",
    entryNo: "AR00001",
    refNo: "DEMO-JW",
    date: "24-06-2026",
    time: "10:35",
    paymentMode: "Credit",
    transType: "Normal Work",
    jewellerCode: "",
    jewellerName: "Babu Jeweller",
    preparedBy: "Sajitha",
    skipStone: true,
    showRate: true,
    remarks: "Demo bangle finishing work",
    lines: [
      { id: "DEMO-JW-L1", barcode: "HUID-1M22", itemName: "Bangle", mode: "OUT", qty: 4, gross: 42.5, stone: 0, touch: 91.6, wastage: 0.5, jwWeight: 42.5, mcGram: 720, vaPercent: 3.5, rate: 9075 }
    ]
  }], normalizeJewellerWorkOrder);

  addMissing("refineryIssues", [{
    id: "DEMO-REF-ISSUE-001",
    entryNo: "NR00021",
    refNo: "DEMO-RF",
    date: "24-06-2026",
    time: "11:00",
    expectedTouch: 91.6,
    metalType: "Gold",
    refinerName: "Metro Refiner",
    preparedBy: "Akhil",
    remark: "Mixed old gold sent for refining",
    lines: [
      { id: "DEMO-RFI-L1", itemId: "OLD-GOLD", itemName: "Old Gold Lot A", qty: 12, gross: 37.1, stone: 1.2, net: 35.9, rate: 9075 },
      { id: "DEMO-RFI-L2", itemId: "SCRAP", itemName: "Gold Scrap", qty: 8, gross: 18.65, stone: 0.35, net: 18.3, rate: 9075 }
    ]
  }], normalizeRefineryIssue);

  addMissing("refineryReturns", [{
    id: "DEMO-REF-RETURN-001",
    entryNo: "RR00009",
    refNo: "DEMO-RF-TEST",
    date: "24-06-2026",
    time: "14:10",
    pendingIssueId: "DEMO-REF-ISSUE-001",
    preparedBy: "Sajitha",
    remark: "Test return received from Metro Refiner",
    lines: [
      { id: "DEMO-RFR-L1", itemName: "Old Gold Lot A", issuedWeight: 35.9, meltingLoss: 0.22, receivedWeight: 35.15, bottleStockWeight: 0.18, testWeight: 0.15, reissueWeight: 0.35 },
      { id: "DEMO-RFR-L2", itemName: "Gold Scrap", issuedWeight: 18.3, meltingLoss: 0.12, receivedWeight: 17.91, bottleStockWeight: 0.08, testWeight: 0.09, reissueWeight: 0.19 }
    ]
  }], normalizeRefineryReturn);

  addMissing("refineryFinalReturns", [{
    id: "DEMO-REF-FINAL-001",
    entryNo: "FR00004",
    refNo: "DEMO-RF-FINAL",
    date: "24-06-2026",
    time: "16:05",
    pendingIssueId: "DEMO-REF-ISSUE-001",
    expectedTouch: 91.6,
    preparedBy: "Nishad",
    remark: "Final refined gold received",
    refinerCharge: 1800,
    addition: 0,
    discount: 100,
    cashPaid: 250000,
    lines: [
      { id: "DEMO-RFF-L1", itemName: "Refined Gold Bar A", receivedWeight: 35.15, acidingLoss: 0.12, testWeight: 35.03, touch: 99.5, bottleStockWeight: 0.18, rate: 9840 },
      { id: "DEMO-RFF-L2", itemName: "Refined Gold Bar B", receivedWeight: 17.91, acidingLoss: 0.08, testWeight: 17.83, touch: 99.4, bottleStockWeight: 0.08, rate: 9840 }
    ]
  }], normalizeRefineryFinalReturn);

  addMissing("meltingIssues", [{
    id: "DEMO-MELT-ISSUE-001",
    entryNo: "MI00005",
    refNo: "DEMO-MELT",
    date: "24-06-2026",
    time: "11:30",
    issueType: "Melting",
    refinerName: "Metro Refiner",
    preparedBy: "Akhil",
    lines: [
      { id: "DEMO-MI-L1", itemId: "22K-SCRAP", itemName: "22K Gold Scrap", qty: 15, gross: 28.4, stone: 0.6, net: 27.8, rate: 9075 }
    ]
  }], normalizeMeltingIssue);

  addMissing("meltingReturns", [{
    id: "DEMO-MELT-RETURN-001",
    entryNo: "MR00001",
    refNo: "DEMO-MELT-RET",
    date: "24-06-2026",
    time: "15:00",
    pendingIssueId: "DEMO-MELT-ISSUE-001",
    preparedBy: "Sajitha",
    remark: "Melted bar received and tested",
    refinerCharge: 950,
    discount: 50,
    cashPaid: 150000,
    lines: [
      { id: "DEMO-MR-L1", itemName: "Melted Gold Bar", issuedWeight: 27.8, meltingLoss: 0.18, testWeight: 27.5, receivedWeight: 27.62, touch: 91.7, rate: 9075, bottleStockWeight: 0.12 }
    ]
  }], normalizeMeltingReturn);

  addMissing("sampleIssues", [{
    id: "DEMO-SAMPLE-ISSUE-001",
    type: "Issue",
    entryNo: "SI00003",
    refNo: "DEMO-SAMPLE",
    date: "24-06-2026",
    time: "12:05",
    sampleCode: "SMP-CHAIN",
    sampleLabel: "Sample Issue",
    selectJeweller: true,
    jewellerName: "Babu Jeweller",
    preparedBy: "Sajitha",
    remarks: "Customer selection samples",
    showRate: true,
    lines: [
      { id: "DEMO-SI-L1", itemId: "R", barcode: "HUID-7K81", itemName: "Baby Ring", qty: 2, gross: 4.25, stone: 0.15, rate: 9075, hmc: 900, taxPct: 3 }
    ]
  }], (item) => normalizeSample(item, "Issue"));

  addMissing("sampleReturns", [{
    id: "DEMO-SAMPLE-RETURN-001",
    type: "Return",
    entryNo: "SR00002",
    refNo: "DEMO-SAMPLE-RET",
    date: "24-06-2026",
    time: "17:10",
    sampleCode: "SMP-CHAIN",
    sampleLabel: "Sample Return",
    selectJeweller: true,
    jewellerName: "Babu Jeweller",
    preparedBy: "Nishad",
    remarks: "Samples returned in good condition",
    lines: [
      { id: "DEMO-SR-L1", itemId: "R", barcode: "HUID-7K81", itemName: "Baby Ring", qty: 2, gross: 4.25, stone: 0.15, rate: 9075, hmc: 900, taxPct: 3 }
    ]
  }], (item) => normalizeSample(item, "Return"));

  addMissing("polishingEntries", [{
    id: "DEMO-POLISH-001",
    entryNo: "PL00002",
    refNo: "DEMO-POLISH",
    date: "24-06-2026",
    time: "12:30",
    hasParty: true,
    partyName: "Babu Jeweller",
    preparedBy: "Nishad",
    remarks: "Diamond ring polishing and stone inspection",
    lines: [
      { id: "DEMO-PL-L1", itemId: "DBR", barcode: "DIA-4431", itemName: "Diamond Ring", qty: 1, gross: 5.85, stone: 0.42 }
    ],
    stones: [
      { id: "DEMO-PL-S1", code: "DIA", barcode: "DIA-4431", colorType: "Diamond", colorScale: "EF", shape: "Round", cut: "Excellent", clarity: "VVS", sieveSize: "1.5 mm", caratCent: 0.32, ct: "Ct", pcs: 7, purchaseRate: 58000, sellingRate: 64000 }
    ]
  }], normalizePolishingEntry);

  addMissing("serviceJobs", [{
    id: "DEMO-SERVICE-001",
    type: "New",
    entryNo: "JB00005",
    refNo: "DEMO-SERVICE",
    date: "24-06-2026",
    time: "13:00",
    dueDays: 1,
    dueDate: "25-06-2026",
    salesMan: "Akhil",
    jobStatus: "Pending",
    partyAccount: "C0001",
    partyName: "Rahul U M",
    place: "Valikad",
    contactNo: "8281900323",
    remarks: "Resize ring and tighten stones",
    approxAmount: 1800,
    advance: 500,
    lines: [
      { id: "DEMO-SVC-L1", itemName: "Diamond Ring", description: "18K customer ring", nos: 1, gross: 5.85, stone: 0.42, complaint: "Ring size tight; one stone loose" }
    ]
  }], (item) => normalizeServiceJob(item, "New"));

  addMissing("serviceClosures", [{
    id: "DEMO-SERVICE-CLOSE-001",
    type: "Close",
    entryNo: "JBC00002",
    refNo: "JB00005",
    date: "25-06-2026",
    time: "09:30",
    dueDays: 0,
    dueDate: "25-06-2026",
    salesMan: "Akhil",
    jobStatus: "Closed",
    partyAccount: "C0001",
    partyName: "Rahul U M",
    place: "Valikad",
    contactNo: "8281900323",
    remarks: "Resized and stones secured",
    approxAmount: 1800,
    advance: 500,
    lines: [
      { id: "DEMO-SVCC-L1", itemName: "Diamond Ring", description: "18K customer ring", nos: 1, gross: 5.84, stone: 0.42, complaint: "Completed" }
    ]
  }], (item) => normalizeServiceJob(item, "Close"));

  addMissing("complimentaryPurchases", [{
    id: "DEMO-COMP-PURCHASE-001",
    entryNo: "CP00003",
    refNo: "DEMO-GIFT",
    date: "24-06-2026",
    time: "13:20:00",
    mode: "Credit",
    partyId: "S0014",
    partyName: "AJAYA KUMAR",
    address: "PADIKKAL [H]",
    preparedBy: "ABDUL SALAM AP",
    addition: 100,
    discount: 50,
    lines: [
      { id: "DEMO-CP-L1", itemId: "GBX", itemName: "Gift Box", quantity: 25, unit: "Nos", foc: 2, price: 65 },
      { id: "DEMO-CP-L2", itemId: "CBG", itemName: "Carry Bag", quantity: 50, unit: "Nos", foc: 5, price: 18 }
    ]
  }], normalizeComplimentaryPurchase);

  addMissing("complimentaryIssues", [{
    id: "DEMO-COMP-ISSUE-001",
    entryNo: "CI00004",
    refNo: "DEMO-GIFT-OUT",
    date: "24-06-2026",
    time: "14:00:00",
    issueType: "Sales / Issue",
    invoiceNo: "C02033",
    preparedBy: "Akhil",
    remarks: "Packing issued with demo invoice",
    lines: [
      { id: "DEMO-CI-L1", itemId: "GBX", itemName: "Gift Box", quantity: 1, unit: "Nos" },
      { id: "DEMO-CI-L2", itemId: "CBG", itemName: "Carry Bag", quantity: 1, unit: "Nos" }
    ]
  }], normalizeComplimentaryIssue);

  addMissing("bankDeposits", [{
    id: "DEMO-BANK-DEPOSIT-001",
    type: "deposit",
    voucherNo: "BD00018",
    refNo: "DEMO-BANK",
    date: "2026-06-24",
    time: "15:20:00",
    preparedBy: "ABDUL SALAM AP",
    costCenter: "cost1",
    bankAccount: "Canara Bank Edakkara",
    handledBy: "Akhil",
    narration: "Daily cash deposited to bank",
    lines: [
      { id: "DEMO-BD-L1", headId: "G0087", accountHead: "SHOP CASH", amount: 125000, remarks: "Counter collection", voucherNo: "CASH-24", voucherDate: "2026-06-24" }
    ]
  }], (item) => normalizeBankTransaction(item, "deposit"));

  addMissing("pdcReceipts", [{
    id: "DEMO-PDC-RECEIPT-001",
    type: "receipt",
    entryNo: "PR00012",
    refNo: "DEMO-PDC",
    date: "2026-06-24",
    time: "15:40:00",
    preparedBy: "ABDUL SALAM AP",
    receivedBy: "Akhil",
    partyCode: "C0001",
    partyName: "Rahul U M",
    chequeNo: "458921",
    chequeDate: "2026-06-28",
    chequeAmount: 28540,
    bankName: "Canara Bank Edakkara",
    remark: "Balance cheque against invoice C02033",
    lines: [
      { id: "DEMO-PDC-L1", invoiceNo: "C02033", invoiceType: "Sales", invoiceDate: "2025-08-30", billAmount: 128540, paid: 100000, received: 28540, remark: "Full balance", cvRid: "C02033" }
    ]
  }], (item) => normalizePdcRecord(item, "receipt"));

  addMissing("cashReceipts", [{
    id: "DEMO-CASH-RECEIPT-001",
    type: "receipt",
    voucherNo: "CR00031",
    refNo: "DEMO-CASH",
    date: "2026-06-24",
    time: "16:00:00",
    preparedBy: "ABDUL SALAM AP",
    costCenter: "cost1",
    cashAccount: "SHOP CASH",
    handledBy: "Sajitha",
    narration: "Scheme collection received",
    lines: [
      { id: "DEMO-CR-L1", headId: "H1910", accountHead: "Anaida - MT Suvarna", amount: 5000, discount: 0, remarks: "June installment", voucherNo: "SC-24430", voucherDate: "2026-06-24" }
    ]
  }], (item) => normalizeCashVoucher(item, "receipt"));

  addMissing("journalVouchers", [{
    id: "DEMO-JOURNAL-001",
    voucherNo: "JV00008",
    refNo: "DEMO-JV",
    date: "2026-06-24",
    time: "16:20:00",
    costCenter: "cost1",
    preparedBy: "ABDUL SALAM AP",
    narration: "Demo refiner charge posting",
    lines: [
      { id: "DEMO-JV-L1", accountId: "REF-CHG", accountHead: "Refining Charges", debit: 1800, credit: 0, remark: "Metro Refiner charge" },
      { id: "DEMO-JV-L2", accountId: "CNRB", accountHead: "Canara Bank Edakkara", debit: 0, credit: 1800, remark: "Payment adjustment" }
    ]
  }], normalizeJournalVoucher);

  current.demoDataVersion = DEMO_DATA_VERSION;
  rebuildComplimentaryStockForState(current);
  localStorage.setItem("goldland-state", JSON.stringify(current));
  return current;
}

function rebuildComplimentaryStockForState(targetState) {
  const previousState = state;
  state = targetState;
  rebuildComplimentaryStock();
  targetState.complimentaryStock = state.complimentaryStock;
  state = previousState;
}

function normalizeItemCategories(categories = {}) {
  const cleanMaster = (item = {}) => ({
    id: item.id || item.code || crypto.randomUUID(),
    name: item.name || "",
    status: item.status || "Active",
    description: item.description || ""
  });
  return {
    products: (categories.products || []).map(cleanMaster),
    brands: (categories.brands || []).map(cleanMaster),
    models: (categories.models || []).map(cleanMaster),
    units: (categories.units || []).map((item = {}) => ({
      id: item.id || crypto.randomUUID(),
      name: item.name || item.unitName || ""
    })),
    subGroups: (categories.subGroups || []).map((item = {}) => ({
      id: item.id || item.code || crypto.randomUUID(),
      name: item.name || "",
      remarks: item.remarks || item.description || ""
    })),
    prefixes: (categories.prefixes || []).map((item = {}, index) => ({
      id: item.id || String(item.number || index + 1),
      number: Number(item.number || index + 1),
      description: item.description || "",
      prefix: item.prefix || ""
    }))
  };
}

function normalizeMiscellaneous(misc = {}) {
  const source = { ...seed.miscellaneous, ...misc };
  return {
    agents: (source.agents || []).map((item) => normalizeMiscParty(item, "A")),
    areas: (source.areas || []).map((item, index) => normalizeSimpleMisc(item, String(index + 1))),
    costCenters: (source.costCenters || []).map((item, index) => ({
      id: item.id || String(index + 1),
      name: item.name || "",
      controlAccount: item.controlAccount || "",
      isDefault: Boolean(item.isDefault)
    })),
    discountCoupons: (source.discountCoupons || []).map((item, index) => ({
      id: item.id || item.couponNo || `CP${String(index + 1).padStart(3, "0")}`,
      couponNo: item.couponNo || item.id || `CP${String(index + 1).padStart(3, "0")}`,
      value: Number(item.value || item.couponValue || 0),
      active: item.active !== false
    })),
    stockLocations: (source.stockLocations || []).map((item, index) => ({
      id: item.id || String(index + 1),
      name: item.name || item.locationName || "",
      isDefault: Boolean(item.isDefault)
    })),
    cards: (source.cards || []).map((item, index) => ({
      id: item.id || String(index + 1),
      code: item.code || String(index + 1),
      name: item.name || "",
      bank: item.bank || "",
      bankChargeId: item.bankChargeId || "Addition",
      commissionPct: Number(item.commissionPct || 0)
    })),
    counters: (source.counters || []).map((item, index) => normalizeSimpleMisc(item, String(index + 1))),
    taxSchedules: (source.taxSchedules || []).map((item, index) => ({
      id: item.id || String(index),
      value: Number(item.value || 0),
      description: item.description || "",
      purchaseTax: Number(item.purchaseTax || 0),
      salesTax: Number(item.salesTax || 0),
      cess: Number(item.cess || 0),
      inputVat: item.inputVat || ""
    })),
    nonTradeSuppliers: (source.nonTradeSuppliers || []).map((item) => normalizeMiscParty(item, "N"))
  };
}

function normalizeSimpleMisc(item = {}, fallbackId = "1") {
  return {
    id: item.id || fallbackId,
    name: item.name || item.areaName || "",
    description: item.description || ""
  };
}

function normalizeMiscParty(item = {}, prefix = "A") {
  return {
    id: item.id || `${prefix}${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`,
    name: item.name || "",
    subSchedule: item.subSchedule || (prefix === "A" ? "Agents" : "Supplier"),
    openingBalance: Number(item.openingBalance || 0),
    balanceType: item.balanceType || "Dr",
    opDate: item.opDate || new Date().toLocaleDateString("en-GB"),
    openingWeight: Number(item.openingWeight || 0),
    weightType: item.weightType || "Give",
    address: item.address || "",
    city: item.city || "",
    place: item.place || "",
    state: item.state || "KERALA",
    country: item.country || "INDIA",
    gstin: item.gstin || "",
    fax: item.fax || "",
    phone: item.phone || "",
    mobile: item.mobile || "",
    email: item.email || "",
    website: item.website || "",
    status: item.status || "Active",
    birthDate: item.birthDate || "26/12/2000",
    joinDate: item.joinDate || new Date().toLocaleDateString("en-GB")
  };
}

function normalizeItemMaster(item = {}) {
  const openingGross = Number(item.openingGross || item.gross || 0);
  const openingStone = Number(item.openingStone || item.stone || 0);
  const closingGross = Number(item.closingGross ?? openingGross);
  const closingStone = Number(item.closingStone ?? openingStone);
  return {
    id: item.id || item.itemId || crypto.randomUUID(),
    itemId: item.itemId || nextItemMasterId(),
    itemName: item.itemName || item.name || "",
    regionalName: item.regionalName || "",
    subGroup: item.subGroup || "",
    product: item.product || "Gold",
    brand: item.brand || "",
    model: item.model || "",
    description1: item.description1 || "",
    description2: item.description2 || "",
    hsnTax: item.hsnTax || "7113 / 3%",
    typeWastage: item.typeWastage || item.purity || "22ct",
    va: Number(item.va || 0),
    mcGram: Number(item.mcGram || 0),
    openingNos: Number(item.openingNos || item.qty || 0),
    openingGross,
    openingStone,
    openingNet: Number(item.openingNet ?? Math.max(0, openingGross - openingStone)),
    openingDate: item.openingDate || new Date().toLocaleDateString("en-GB"),
    itemStockTouch: Number(item.itemStockTouch || 0),
    closingNos: Number(item.closingNos ?? item.openingNos ?? item.qty ?? 0),
    closingGross,
    closingStone,
    closingNet: Number(item.closingNet ?? Math.max(0, closingGross - closingStone)),
    closingStockTouch: Number(item.closingStockTouch || item.itemStockTouch || 0),
    ornament: item.ornament !== false,
    barcodeCompulsory: Boolean(item.barcodeCompulsory),
    reservedItem: Boolean(item.reservedItem),
    hideInStockReports: Boolean(item.hideInStockReports)
  };
}

function normalizeParty(item) {
  const id = item.id || item.customerCode || item.customerId || crypto.randomUUID();
  return {
    id,
    customerCode: item.customerCode || item.customerId || (item.type === "Customer" ? id : ""),
    name: item.name || "",
    type: item.type || "Customer",
    phone: item.phone || "",
    mobile: item.mobile || item.phone || "",
    email: item.email || "",
    place: item.place || "",
    city: item.city || "",
    state: item.state || item.stateProvince || "KERALA",
    country: item.country || "INDIA",
    address: item.address || "",
    panGst: item.panGst || item.pan || "",
    gstin: item.gstin || item.panGst || item.pan || "",
    fax: item.fax || "",
    website: item.website || "",
    pinCode: item.pinCode || item.pin || "",
    aadhaar: item.aadhaar || item.aadhar || "",
    agent: item.agent || "",
    status: item.status || "Active",
    openingBalance: Number(item.openingBalance || 0),
    balanceType: item.balanceType || "Dr",
    openingWeight: Number(item.openingWeight || 0),
    weightType: item.weightType || "Give",
    birthDate: item.birthDate || "26/12/2000",
    joinDate: item.joinDate || new Date().toLocaleDateString("en-GB"),
    opDate: item.opDate || item.joinDate || new Date().toLocaleDateString("en-GB"),
    touch: Number(item.touch || 100),
    convTouch: Number(item.convTouch || 100),
    wastage: Number(item.wastage || 0)
  };
}

function normalizeBill(bill) {
  const line = bill.line || {};
  const amount = Number(bill.amount || line.amount || 0);
  const paid = Number(bill.paid || 0);
  const sectionName = sectionForBillType(bill.type);
  const normalizedLine = normalizeBillLine(line, amount, bill, sectionName);
  const sections = bill.sections || {
    sales: sectionName === "sales" ? [normalizedLine] : [],
    exchange: sectionName === "exchange" ? [normalizedLine] : [],
    return: sectionName === "return" ? [normalizedLine] : []
  };
  return {
    entryNo: bill.entryNo || bill.id,
    refNo: bill.refNo || bill.entryNo || bill.id,
    billNo: bill.billNo || "20260521_1",
    prepareEinvoice: Boolean(bill.prepareEinvoice),
    date: bill.date || "16-05-2026",
    time: bill.time || nowTime(),
    customerId: bill.customerId || "",
    customerCode: bill.customerCode || bill.customerId || "",
    customerCity: bill.customerCity || "",
    customerPlace: bill.customerPlace || "",
    customerState: bill.customerState || "KERALA",
    customerCountry: bill.customerCountry || "INDIA",
    customerPanGst: bill.customerPanGst || "",
    customerPinCode: bill.customerPinCode || "",
    customerMobile: bill.customerMobile || bill.phone || "",
    customerEmail: bill.customerEmail || "",
    customerAadhaar: bill.customerAadhaar || "",
    customerAgent: bill.customerAgent || "",
    customerOpeningBalance: Number(bill.customerOpeningBalance || 0),
    customerBalanceType: bill.customerBalanceType || "Dr",
    customerOpeningWeight: Number(bill.customerOpeningWeight || 0),
    customerWeightType: bill.customerWeightType || "Give",
    customerBirthDate: bill.customerBirthDate || "",
    customerJoinDate: bill.customerJoinDate || "",
    staffId: bill.staffId || "",
    staffName: bill.staffName || "",
    address: bill.address || "",
    phone: bill.phone || "",
    itemCategory: bill.itemCategory || "B2C",
    discount: Number(bill.discount || 0),
    taxAmount: Number(bill.taxAmount || line.tax || 0),
    balance: Number(bill.balance ?? amount - paid),
    paymentMode: bill.paymentMode || "Cash",
    paymentBreakup: normalizePaymentBreakup(bill.paymentBreakup),
    ...bill,
    adjustments: normalizeAdjustments(bill.adjustments),
    totals: normalizeBillTotals(bill.totals, amount, paid, bill.balance),
    line: normalizedLine,
    sections: {
      sales: (sections.sales || []).map((item) => normalizeBillLine(item, item.amount, bill, "sales")),
      exchange: (sections.exchange || []).map((item) => normalizeBillLine(item, item.amount, bill, "exchange")),
      return: (sections.return || []).map((item) => normalizeBillLine(item, item.amount, bill, "return"))
    }
  };
}

function normalizePaymentBreakup(paymentBreakup = {}) {
  return {
    cash: Number(paymentBreakup.cash || 0),
    gpay: Number(paymentBreakup.gpay || 0),
    card: Number(paymentBreakup.card || 0),
    bank: Number(paymentBreakup.bank || 0),
    other: Number(paymentBreakup.other || 0),
    reference: paymentBreakup.reference || ""
  };
}

function normalizeOrderAdvanceRecord(record = {}, type = "advance") {
  const isRefund = type === "refund" || record.type === "refund";
  const advanceAmount = Number(record.advanceAmount || record.totalAmount || 0);
  const refundAmount = Number(record.refundAmount || 0);
  return {
    id: record.id || crypto.randomUUID(),
    type: isRefund ? "refund" : "advance",
    orderId: record.orderId || "",
    orderEntryNo: record.orderEntryNo || record.pickOrder || "",
    orderRefNo: record.orderRefNo || "",
    goldRateGram: Number(record.goldRateGram || activeGoldRate() || 0),
    goldRateEightGram: Number(record.goldRateEightGram || (Number(record.goldRateGram || activeGoldRate() || 0) * 8)),
    entryNo: record.entryNo || "",
    refNo: record.refNo || "",
    date: record.date || new Date().toLocaleDateString("en-GB"),
    time: record.time || nowTime(),
    preparedBy: record.preparedBy || state?.staffs?.[0]?.name || seed.staffs?.[0]?.name || "",
    paymentMode: record.paymentMode || "Cash",
    cashBank: record.cashBank || "Cash in Hand",
    advanceAmount: isRefund ? 0 : advanceAmount,
    advanceWeight: 0,
    exchangeAmount: 0,
    exchangeWeight: 0,
    totalAmount: isRefund ? 0 : advanceAmount,
    totalWeight: 0,
    refundAmount,
    refundWeight: 0,
    remark: record.remark || ""
  };
}

function billwiseStorageKey(type) {
  return {
    collection: "billwiseCollections",
    payment: "billwisePayments",
    credit: "billwiseCreditDiscounts",
    debit: "billwiseDebitDiscounts"
  }[type] || "billwiseCollections";
}

function defaultBillwiseLine(type = "collection") {
  return normalizeBillwiseLine({
    invoiceNo: "",
    invoiceType: "",
    invoiceDate: new Date().toLocaleDateString("en-GB"),
    billAmount: 0
  }, type);
}

function normalizeBillwiseLine(line = {}, type = "collection") {
  const billAmount = Number(line.billAmount || 0);
  const totalReceived = Number(line.totalReceived || line.totalRecieved || 0);
  const totalPaid = Number(line.totalPaid || 0);
  const oldCreditNote = Number(line.oldCreditNote || line.oldCNote || 0);
  const dnd = Number(line.dnd || 0);
  const received = Number(line.received || 0);
  const paid = Number(line.paid || 0);
  const discount = Number(line.discount || 0);
  const balance = type === "collection"
    ? billAmount - totalReceived - oldCreditNote - received - discount
    : type === "payment"
      ? billAmount - totalPaid - dnd - paid
      : type === "credit"
        ? billAmount - paid - received
        : billAmount - totalPaid - received;
  return {
    id: line.id || crypto.randomUUID(),
    invoiceNo: line.invoiceNo || "",
    invoiceType: line.invoiceType || "",
    invoiceDate: line.invoiceDate || new Date().toLocaleDateString("en-GB"),
    billAmount,
    totalReceived,
    oldCreditNote,
    totalPaid,
    dnd,
    paid,
    received,
    discount,
    balance: Number(balance.toFixed(3)),
    remark: line.remark || ""
  };
}

function defaultBillwiseTransaction(type = "collection") {
  const isCollection = type === "collection";
  const isPayment = type === "payment";
  const staffName = state?.staffs?.[0]?.name || seed.staffs?.[0]?.name || "";
  return normalizeBillwiseTransaction({
    type,
    entryNo: "",
    refNo: "",
    date: new Date().toLocaleDateString("en-GB"),
    time: nowTimeWithSeconds(),
    partyName: "",
    customerName: "",
    paymentMode: "Cash",
    cashAccount: "Cash in Hand",
    costCenter: "cost1",
    preparedBy: staffName,
    receivedBy: staffName,
    discountAccount: "Discount",
    lines: [defaultBillwiseLine(type)],
    collectionAmount: isCollection ? 0 : undefined,
    paidAmount: isPayment ? 0 : undefined,
    discount: 0
  }, type);
}

function normalizeBillwiseTransaction(record = {}, type = "collection") {
  const recordType = record.type || type;
  const lines = (record.lines?.length ? record.lines : [defaultBillwiseLine(recordType)]).map((line) => normalizeBillwiseLine(line, recordType));
  const collectionAmount = Number(record.collectionAmount ?? sumBy(lines, "received"));
  const paidAmount = Number(record.paidAmount ?? (recordType === "payment" ? sumBy(lines, "paid") : sumBy(lines, "received")));
  const discount = Number(record.discount ?? sumBy(lines, "discount"));
  return {
    id: record.id || crypto.randomUUID(),
    type: recordType,
    entryNo: record.entryNo || "",
    refNo: record.refNo || "",
    date: record.date || new Date().toLocaleDateString("en-GB"),
    time: record.time || nowTimeWithSeconds(),
    partyName: record.partyName || record.customerName || "",
    customerName: record.customerName || record.partyName || "",
    paymentMode: record.paymentMode || "Cash",
    cashCode: record.cashCode || "12",
    cashAccount: record.cashAccount || "Cash in Hand",
    costCenter: record.costCenter || "cost1",
    preparedBy: record.preparedBy || state?.staffs?.[0]?.name || seed.staffs?.[0]?.name || "",
    receivedBy: record.receivedBy || state?.staffs?.[0]?.name || seed.staffs?.[0]?.name || "",
    discountAccount: record.discountAccount || "Discount",
    collectionAmount,
    collectionReference: Number(record.collectionReference || 0),
    paidAmount,
    paidReference: Number(record.paidReference || 0),
    discount,
    discountReference: Number(record.discountReference || 0),
    lines,
    createdAt: record.createdAt || new Date().toISOString()
  };
}

function sumBy(rows, key) {
  return (rows || []).reduce((sum, row) => sum + Number(row?.[key] || 0), 0);
}

function billwiseFinancials(record, type = "collection") {
  const lines = (record?.lines || []).map((line) => normalizeBillwiseLine(line, type));
  const collectionAmount = sumBy(lines, "received");
  const paidAmount = type === "payment" ? sumBy(lines, "paid") : sumBy(lines, "received");
  const discount = sumBy(lines, "discount");
  const totalAmount = type === "collection" ? collectionAmount + discount : paidAmount;
  return {
    collectionAmount,
    paidAmount,
    discount,
    totalAmount,
    balance: sumBy(lines, "balance")
  };
}

function normalizeBillLine(line, fallbackAmount = 0, bill = {}, sectionKey = "sales") {
  const snapshotNumbers = String(bill.rateSnapshot || "").match(/\d+(?:\.\d+)?/g) || [];
  const snapshotRate = snapshotNumbers.length ? Number(snapshotNumbers[snapshotNumbers.length - 1]) : 0;
  const normalized = {
    id: line.id || line.barcode || crypto.randomUUID(),
    barcode: line.barcode || "",
    item: line.item || line.itemName || "OG",
    itemName: line.itemName || line.item || "Ornament",
    description: line.description || bill.type || "",
    qty: Number(line.qty || 1),
    gross: Number(line.gross || line.grossWeight || 0),
    stone: Number(line.stone || line.stoneWeight || line.stnWght || 0),
    mudLess: Number(line.mudLess || 0),
    lessPct: Number(line.lessPct || 0),
    lessWeight: Number(line.lessWeight || 0),
    touchPct: Number(line.touchPct || 0),
    touchLess: Number(line.touchLess || 0),
    wastage: Number(line.wastage || 0),
    net: Number(line.net || line.netWeight || 0),
    stoneCharge: Number(line.stoneCharge || line.stnCharge || 0),
    rateLessPct: Number(line.rateLessPct || 0),
    ratePct: Number(line.ratePct || 0),
    rate: Number(line.rate || snapshotRate || activeGoldRate()),
    va: Number(line.va || 0),
    mcPerGm: Number(line.mcPerGm || 0),
    totalMc: Number(line.totalMc || line.makingCharge || 0),
    makingCharge: Number(line.makingCharge || line.totalMc || 0),
    vaDiscountPct: Number(line.vaDiscountPct || line.vaDisPct || 0),
    vaAfterDiscount: Number(line.vaAfterDiscount || 0),
    dmdAmount: Number(line.dmdAmount || 0),
    discount: Number(line.discount || 0),
    taxPct: Number(line.taxPct || 3),
    tax: Number(line.tax || 0),
    cessPct: Number(line.cessPct || 0),
    cessAmount: Number(line.cessAmount || 0),
    huid: line.huid || "",
    itemDescription: line.itemDescription || line.description || "",
    itemCode: line.itemCode || line.itemId || line.barcode || "",
    length: line.length || "",
    breadth: line.breadth || "",
    model: line.model || "",
    amount: Number(line.amount || line.itemTotal || fallbackAmount || 0),
    itemTotal: Number(line.itemTotal || line.amount || fallbackAmount || 0)
  };
  return calculateBillLine(normalized, sectionKey, fallbackAmount);
}

function normalizeDmdReturnBill(bill = {}) {
  const legacyLines = (bill.lines || []).map(normalizeDmdReturnLine);
  const ornamentSource = bill.ornamentLines?.length ? bill.ornamentLines : legacyLines.map((line) => ({
    itemId: line.barcode || line.itemName || "",
    itemName: line.itemName || line.itemDescription || "DMD Return",
    itemDescription: line.itemDescription || "",
    barcode: line.barcode || "",
    nos: line.qty || 1,
    gross: line.gross || 0,
    stone: line.diamondWtCent || 0,
    stonePrice: line.crtCentRate || 0,
    va: 0,
    goldType: "22K",
    salesType: "Weight",
    goldRate: line.rateRtgs || activeGoldRate(),
    dmdWgt: line.diamondWtCent || 0,
    stnSPrice: 0,
    purMc: line.mcGrm || 0,
    salesMc: line.mcGrm || 0
  }));
  return {
    id: bill.id || crypto.randomUUID(),
    entryNo: bill.entryNo || "1",
    date: bill.date || new Date().toLocaleDateString("en-GB"),
    time: bill.time || nowTime(),
    preparedBy: bill.preparedBy || state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    customerId: bill.customerId || "",
    customer: bill.customer || "",
    gstin: bill.gstin || "",
    panCardNo: bill.panCardNo || "",
    paymentMode: bill.paymentMode || "Cash",
    returnType: DMD_RETURN_TYPES.includes(bill.returnType) ? bill.returnType : "Sales Return",
    addition: Number(bill.addition || 0),
    discount: Number(bill.discount || 0),
    tdsTcs: Number(bill.tdsTcs || 0),
    taxPct: Number(bill.taxPct || 3),
    cash: Number(bill.cash || 0),
    invoiceNo: bill.invoiceNo || "",
    invoiceDate: bill.invoiceDate || new Date().toLocaleDateString("en-GB"),
    partyName: bill.partyName || "",
    addToStock: bill.addToStock !== false,
    lines: legacyLines,
    ornamentLines: ornamentSource.map((line) => normalizeDmdWholesaleLine(line, { returnMode: true, returnType: bill.returnType || "Sales Return" })),
    diamondLines: (bill.diamondLines || []).map(normalizeDmdStoneLine)
  };
}

function normalizeDmdReturnLine(line = {}) {
  const normalized = {
    id: line.id || crypto.randomUUID(),
    barcode: line.barcode || "",
    itemDescription: line.itemDescription || line.description || "",
    itemName: line.itemName || line.itemDescription || "DMD Item",
    qty: Number(line.qty || 1),
    gross: Number(line.gross || 0),
    previousWeight: Number(line.previousWeight || 0),
    diamondWtCent: Number(line.diamondWtCent || 0),
    colourStoneWt: Number(line.colourStoneWt || 0),
    touch: Number(line.touch || 75.5),
    rateRtgs: Number(line.rateRtgs || activeGoldRate()),
    crtCentRate: Number(line.crtCentRate || latestDiamondRate()),
    diamondAmount: Number(line.diamondAmount || 0),
    mcGrm: Number(line.mcGrm || 0)
  };
  return calculateDmdReturnLine(normalized);
}

function calculateDmdReturnLine(line = {}) {
  const netWeight = Math.max(0, Number(line.gross || 0) - Number(line.previousWeight || 0) - Number(line.diamondWtCent || 0) - Number(line.colourStoneWt || 0));
  const pureWeight = netWeight * (Number(line.touch || 0) / 100);
  const goldAmount = pureWeight * Number(line.rateRtgs || 0);
  const diamondAmount = Number(line.diamondAmount || 0) || Number(line.diamondWtCent || 0) * Number(line.crtCentRate || 0);
  const makingCharge = netWeight * Number(line.mcGrm || 0);
  const amount = Math.round(goldAmount + diamondAmount + makingCharge);
  return { ...line, netWeight, pureWeight, goldAmount, diamondAmount, makingCharge, amount, itemTotal: amount };
}

function normalizeDmdWholesaleBill(bill = {}) {
  const convertedLines = (bill.ornamentLines || []).map((line) => normalizeDmdReturnLine({
    id: line.id,
    barcode: line.barcode || line.itemId || "",
    itemDescription: line.itemDescription || line.itemName || "",
    itemName: line.itemName || line.itemDescription || "DMD WholeSales",
    qty: line.nos || 1,
    gross: line.gross || 0,
    previousWeight: line.previousWeight || 0,
    diamondWtCent: line.dmdWgt || line.stone || 0,
    colourStoneWt: line.colourStoneWt || 0,
    touch: line.touch || 75.5,
    rateRtgs: line.goldRate || activeGoldRate(),
    crtCentRate: line.stnSPrice || line.stonePrice || latestDiamondRate(),
    diamondAmount: line.diamondAmount || 0,
    mcGrm: line.salesMc || line.mcGrm || 0
  }));
  return {
    id: bill.id || crypto.randomUUID(),
    entryNo: bill.entryNo || "1",
    date: bill.date || new Date().toLocaleDateString("en-GB"),
    time: bill.time || nowTime(),
    invoiceNo: bill.invoiceNo || "",
    invoiceDate: bill.invoiceDate || new Date().toLocaleDateString("en-GB"),
    customer: bill.customer || "",
    partyName: bill.partyName || "",
    preparedBy: bill.preparedBy || state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    addToStock: bill.addToStock !== false,
    addition: Number(bill.addition || 0),
    discount: Number(bill.discount || 0),
    gstPct: Number(bill.gstPct || 3),
    cashPayment: Number(bill.cashPayment || 0),
    paymentMode: bill.paymentMode || "Cash",
    gstin: bill.gstin || "",
    panCardNo: bill.panCardNo || "",
    tdsTcs: Number(bill.tdsTcs || 0),
    cash: Number(bill.cash || bill.cashPayment || 0),
    lines: (bill.lines?.length ? bill.lines : convertedLines).map(normalizeDmdReturnLine),
    ornamentLines: (bill.ornamentLines || []).map(normalizeDmdWholesaleLine),
    diamondLines: (bill.diamondLines || []).map(normalizeDmdStoneLine)
  };
}

function normalizeDiamondPurchaseBill(bill = {}) {
  return {
    id: bill.id || crypto.randomUUID(),
    entryNo: bill.entryNo || "3",
    refNo: bill.refNo || "",
    date: bill.date || new Date().toLocaleDateString("en-GB"),
    time: bill.time || nowTime(),
    invoiceNo: bill.invoiceNo || "",
    invoiceDate: bill.invoiceDate || new Date().toLocaleDateString("en-GB"),
    paymentMode: bill.paymentMode || "Credit",
    itemCategory: bill.itemCategory || "B2C",
    supplierSmith: bill.supplierSmith || "",
    partyName: bill.partyName || "",
    preparedBy: bill.preparedBy || state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    postToSmith: Boolean(bill.postToSmith),
    addition: Number(bill.addition || 0),
    discount: Number(bill.discount || 0),
    gstPct: Number(bill.gstPct || 3),
    tcsPct: Number(bill.tcsPct || 0),
    tdsPct: Number(bill.tdsPct || 0),
    cashPayment: Number(bill.cashPayment || 0),
    ornamentLines: (bill.ornamentLines || []).map(normalizeDmdWholesaleLine),
    diamondLines: (bill.diamondLines || []).map(normalizeDmdStoneLine)
  };
}

function normalizeDiamondPurchaseReturnBill(bill = {}) {
  return {
    id: bill.id || crypto.randomUUID(),
    entryNo: bill.entryNo || "",
    refNo: bill.refNo || "",
    date: bill.date || new Date().toLocaleDateString("en-GB"),
    time: bill.time || nowTime(),
    invoiceNo: bill.invoiceNo || "",
    invoiceDate: bill.invoiceDate || new Date().toLocaleDateString("en-GB"),
    supplierSmith: bill.supplierSmith || "",
    preparedBy: bill.preparedBy || state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    postToSmith: Boolean(bill.postToSmith),
    addition: Number(bill.addition || 0),
    discount: Number(bill.discount || 0),
    gstPct: Number(bill.gstPct || 3),
    cashPayment: Number(bill.cashPayment || 0),
    ornamentLines: (bill.ornamentLines || []).map(normalizeDiamondPurchaseReturnLine),
    diamondLines: (bill.diamondLines || []).map(normalizeDmdPurchaseStoneLine)
  };
}

function normalizeDmdStonePurchaseBill(bill = {}) {
  return {
    id: bill.id || crypto.randomUUID(),
    entryNo: bill.entryNo || "",
    refNo: bill.refNo || "",
    date: bill.date || new Date().toLocaleDateString("en-GB"),
    time: bill.time || nowTime(),
    invoiceNo: bill.invoiceNo || "",
    invoiceDate: bill.invoiceDate || new Date().toLocaleDateString("en-GB"),
    paymentMode: bill.paymentMode || bill.invoiceMode || "Credit",
    itemCategory: bill.itemCategory || bill.type || "B2C",
    supplierSmith: bill.supplierSmith || "",
    partyName: bill.partyName || "",
    preparedBy: bill.preparedBy || state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    addition: Number(bill.addition || 0),
    discount: Number(bill.discount || 0),
    cashPayment: Number(bill.cashPayment || 0),
    lines: (bill.lines || bill.diamondLines || []).map(normalizeDmdPurchaseStoneLine)
  };
}

function normalizeDirectPurchaseBill(bill = {}) {
  const normalized = {
    id: bill.id || crypto.randomUUID(),
    entryNo: bill.entryNo || "10",
    refNo: bill.refNo || "",
    date: bill.date || new Date().toLocaleDateString("en-GB"),
    time: bill.time || nowTime(),
    paymentMode: bill.paymentMode || bill.mode || "Cash",
    itemCategory: bill.itemCategory || bill.type || "B2B",
    bankAccount: bill.bankAccount || "Cash in Hand",
    preparedBy: bill.preparedBy || state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    partyChecked: Boolean(bill.partyChecked),
    partyId: bill.partyId || "",
    partyName: bill.partyName || bill.customer || "",
    address: bill.address || "",
    phone: bill.phone || "",
    addition: Number(bill.addition || 0),
    discount: Number(bill.discount || 0),
    cess: Number(bill.cess || 0),
    roundOff: Number(bill.roundOff || 0),
    cashPayment: Number(bill.cashPayment || bill.payment || 0),
    accountBalance: Number(bill.accountBalance || 0),
    lines: (bill.lines || []).map(normalizeDirectPurchaseLine)
  };
  return normalized;
}

function normalizeDirectPurchaseReturnBill(bill = {}) {
  return {
    ...normalizeDirectPurchaseBill({
      entryNo: "30",
      itemCategory: "B2B",
      ...bill
    }),
    returnRefNo: bill.returnRefNo || bill.refNo || ""
  };
}

function normalizeDirectPurchaseLine(line = {}) {
  const normalized = {
    id: line.id || crypto.randomUUID(),
    itemId: line.itemId || line.item || "",
    itemName: line.itemName || line.item || "",
    qty: Number(line.qty || line.nos || 1),
    gross: Number(line.gross || line.grossWeight || 0),
    stone: Number(line.stone || line.stoneWeight || 0),
    rate: Number(line.rate || activeGoldRate()),
    stoneCharge: Number(line.stoneCharge || line.stnCharge || 0),
    mcPerGm: Number(line.mcPerGm || line.mcGrm || 0),
    totalMc: Number(line.totalMc || line.makingCharge || 0),
    _editedField: line._editedField || "",
    taxPct: Number(line.taxPct || 0),
    cessPct: Number(line.cessPct || line.cessPerc || 0)
  };
  return calculateDirectPurchaseLine(normalized);
}

function calculateDirectPurchaseLine(line = {}) {
  const net = Math.max(0, Number(line.gross || 0) - Number(line.stone || 0));
  const metalValue = net * Number(line.rate || 0);
  const manualMc = resolveMakingChargePair(line, net, line.rate, 0, "direct");
  const totalMc = manualMc.makingCharge;
  const taxable = Math.max(0, metalValue + Number(line.stoneCharge || 0) + totalMc);
  const tax = taxable * (Number(line.taxPct || 0) / 100);
  const cessAmount = taxable * (Number(line.cessPct || 0) / 100);
  const amount = Math.round(taxable + tax + cessAmount);
  return { ...line, mcPerGm: manualMc.mcPerGm, net, metalValue, totalMc, tax, cessAmount, amount, itemTotal: amount };
}

function normalizeDiamondPurchaseReturnLine(line = {}) {
  const normalized = {
    id: line.id || crypto.randomUUID(),
    itemId: line.itemId || line.item || "",
    itemName: line.itemName || line.item || "",
    barcode: line.barcode || "",
    nos: Number(line.nos || line.qty || 1),
    gross: Number(line.gross || 0),
    stone: Number(line.stone || 0),
    type: line.type || "",
    stonePrice: Number(line.stonePrice || 0),
    goldType: line.goldType || "22K",
    goldRate: Number(line.goldRate || activeGoldRate()),
    dmdWgt: Number(line.dmdWgt || line.diamondWeight || 0),
    purMc: Number(line.purMc || line.purchaseMc || 0),
    salesType: line.salesType || "Weight"
  };
  return calculateDiamondPurchaseReturnLine(normalized);
}

function calculateDiamondPurchaseReturnLine(line = {}) {
  const netWeight = Math.max(0, Number(line.gross || 0) - Number(line.stone || 0));
  const goldAmount = netWeight * Number(line.goldRate || 0);
  const stoneAmount = Number(line.stone || 0) * Number(line.stonePrice || 0);
  const diamondAmount = Number(line.dmdWgt || 0) * Number(line.stonePrice || latestDiamondRate() || 0);
  const purchaseMaking = netWeight * Number(line.purMc || 0);
  const total = Math.round(goldAmount + stoneAmount + diamondAmount + purchaseMaking);
  return { ...line, netWeight, goldAmount, stoneAmount, diamondAmount, purchaseMaking, total, amount: total, salesAmt: total };
}

function normalizeDmdWholesaleLine(line = {}, options = {}) {
  const normalized = {
    id: line.id || crypto.randomUUID(),
    itemId: line.itemId || line.item || "",
    itemName: line.itemName || "",
    itemDescription: line.itemDescription || line.description || "",
    barcode: line.barcode || "",
    nos: Number(line.nos || line.qty || 1),
    gross: Number(line.gross || 0),
    stone: Number(line.stone || 0),
    stonePrice: Number(line.stonePrice || 0),
    va: Number(line.va || 0),
    goldType: line.goldType || "22K",
    salesType: line.salesType || "Weight",
    goldRate: Number(line.goldRate || activeGoldRate()),
    dmdWgt: Number(line.dmdWgt || 0),
    stnSPrice: Number(line.stnSPrice || 0),
    purMc: Number(line.purMc || 0),
    salesMc: Number(line.salesMc || 0)
  };
  return calculateDmdWholesaleLine(normalized, options);
}

function calculateDmdWholesaleLine(line = {}, options = {}) {
  const netWeight = Math.max(0, Number(line.gross || 0) - Number(line.stone || 0));
  const goldBasis = line.salesType === "Nos" ? Number(line.nos || 0) : netWeight;
  const goldAmount = goldBasis * Number(line.goldRate || 0);
  const vaAmount = goldAmount * (Number(line.va || 0) / 100);
  const stoneAmount = Number(line.stone || 0) * Number(line.stonePrice || 0);
  const diamondAmount = Number(line.dmdWgt || 0) * Number(line.stnSPrice || 0);
  const purchaseMaking = netWeight * Number(line.purMc || 0);
  const salesMaking = netWeight * Number(line.salesMc || 0);
  if (options.returnMode) {
    const returnType = DMD_RETURN_TYPES.includes(options.returnType || line.returnType) ? (options.returnType || line.returnType) : "Sales Return";
    const baseTotal = goldAmount + vaAmount + stoneAmount + diamondAmount;
    const returnMaking = returnType === "Sales Return" ? salesMaking : purchaseMaking;
    const total = Math.round(baseTotal + returnMaking);
    return { ...line, returnType, netWeight, goldAmount, vaAmount, stoneAmount, diamondAmount, purchaseMaking, salesMaking, total, salesAmt: 0, amount: total };
  }
  const salesAmt = Math.round(goldAmount + vaAmount + stoneAmount + diamondAmount + salesMaking);
  return { ...line, netWeight, goldAmount, vaAmount, stoneAmount, diamondAmount, purchaseMaking, salesMaking, total: salesAmt, salesAmt, amount: salesAmt };
}

function normalizeDmdStoneLine(line = {}) {
  return {
    id: line.id || crypto.randomUUID(),
    itemId: line.itemId || line.idCode || "",
    itemName: line.itemName || line.item || line.name || "",
    nos: Number(line.nos || line.qty || 1),
    colorType: line.colorType || "",
    colorScale: line.colorScale || "",
    shape: line.shape || "",
    cut: line.cut || "",
    clarity: line.clarity || "",
    sieveSize: line.sieveSize || "",
    caratCent: Number(line.caratCent || 0),
    ct: line.ct || "Cnt",
    pcs: Number(line.pcs || 0),
    purchaseRate: Number(line.purchaseRate || 0),
    sellingRate: Number(line.sellingRate || latestDiamondRate()),
    amount: Number(line.amount || 0)
  };
}

function normalizeDmdPurchaseStoneLine(line = {}) {
  const normalized = normalizeDmdStoneLine(line);
  const amount = Number(normalized.amount || normalized.caratCent * normalized.purchaseRate || 0);
  return { ...normalized, amount };
}

function calculateBillLine(line, sectionKey = "sales", fallbackAmount = 0) {
  const isWeightDeductSection = (sectionKey === "exchange" || sectionKey === "purchase");
  const wStn = Math.max(0, Number(line.gross || 0) - Number(line.stone || 0));

  let lessWeight = Number(line.lessWeight || 0);
  if (isWeightDeductSection && Number(line.lessPct || 0) > 0) {
    lessWeight = Math.max(0, wStn - Number(line.mudLess || 0)) * (Number(line.lessPct || 0) / 100);
  }

  let touchLess = Number(line.touchLess || 0);
  const wLess = Math.max(0, wStn - Number(line.mudLess || 0) - lessWeight);
  if (isWeightDeductSection && Number(line.touchPct || 0) > 0 && Number(line.touchPct || 0) < 100) {
    touchLess = wLess * (1 - Number(line.touchPct || 0) / 100);
  }

  const net = isWeightDeductSection 
    ? Math.max(0, wLess - touchLess)
    : wStn;

  const rate = Number(line.rate || 0);
  const metalValue = net * rate;
  const makingChargeWeight = calculateMakingChargeWeight(net, line.va, sectionKey);
  const manualMc = resolveMakingChargePair(line, net, rate, makingChargeWeight, sectionKey);
  const makingCharge = manualMc.makingCharge;
  const vaAmount = makingCharge;
  const vaAfterDiscount = Math.max(0, vaAmount - (vaAmount * (Number(line.vaDiscountPct || 0) / 100)));
  const rateLess = (sectionKey === "exchange" || sectionKey === "purchase") ? metalValue * (Number(line.rateLessPct || 0) / 100) : 0;
  const stoneCharge = Number(line.stoneCharge || 0);
  const beforeTax = Math.max(0, metalValue + makingCharge + stoneCharge - rateLess - Number(line.discount || 0));
  const tax = sectionKey === "exchange" ? 0 : beforeTax * (Number(line.taxPct || 0) / 100);
  const cessAmount = beforeTax * (Number(line.cessPct || 0) / 100);
  const amount = Math.round(beforeTax + tax + cessAmount);
  const computedAmount = amount || Number(fallbackAmount || 0);
  return {
    ...line,
    lessWeight,
    touchLess,
    net,
    metalValue,
    makingChargeWeight,
    mcPerGm: manualMc.mcPerGm,
    vaAmount,
    vaAfterDiscount,
    makingCharge,
    totalMc: makingCharge,
    tax,
    cessAmount,
    amount: computedAmount,
    itemTotal: computedAmount
  };
}

function calculateMakingChargeWeight(netWeight, vaPercent, sectionKey = "sales") {
  if (sectionKey === "exchange") return 0;
  return Number(netWeight || 0) * (Number(vaPercent || 0) / 100);
}

function calculateMakingChargeAmount(makingChargeWeight, rate) {
  return Number((Number(makingChargeWeight || 0) * Number(rate || 0)).toFixed(2));
}

function resolveMakingChargePair(line, netWeight, rate, makingChargeWeight, sectionKey = "sales") {
  if (sectionKey === "exchange" || sectionKey === "purchase") return { mcPerGm: 0, makingCharge: 0 };
  const net = Number(netWeight || 0);
  if (["sales", "order", "return"].includes(sectionKey)) {
    const makingCharge = calculateMakingChargeAmount(makingChargeWeight, rate);
    return {
      mcPerGm: net > 0 ? makingCharge / net : 0,
      makingCharge
    };
  }
  const editedField = line._editedField || "";
  const enteredMcPerGm = Number(line.mcPerGm || 0);
  const enteredTotalMc = Number(line.makingCharge || line.totalMc || 0);
  if (editedField === "makingCharge" || editedField === "totalMc") {
    return {
      mcPerGm: net > 0 ? enteredTotalMc / net : enteredMcPerGm,
      makingCharge: enteredTotalMc
    };
  }
  if (enteredMcPerGm > 0) {
    return {
      mcPerGm: enteredMcPerGm,
      makingCharge: net * enteredMcPerGm
    };
  }
  if (enteredTotalMc > 0) {
    return {
      mcPerGm: net > 0 ? enteredTotalMc / net : 0,
      makingCharge: enteredTotalMc
    };
  }
  return {
    mcPerGm: enteredMcPerGm,
    makingCharge: calculateMakingChargeAmount(makingChargeWeight, rate)
  };
}


function normalizeAdjustments(adjustments = {}) {
  return {
    salesReturn: Number(adjustments.salesReturn || 0),
    exchange: Number(adjustments.exchange || 0),
    salesOrder: Number(adjustments.salesOrder || 0),
    coupon: Number(adjustments.coupon || 0),
    card: Number(adjustments.card || 0),
    totalAdjustments: Number(adjustments.totalAdjustments || 0)
  };
}

function normalizeBillTotals(totals = {}, amount = 0, paid = 0, balance = amount - paid) {
  return {
    salesTotal: Number(totals.salesTotal || 0),
    dmdAmount: Number(totals.dmdAmount || 0),
    kfcGstAmount: Number(totals.kfcGstAmount || 0),
    addition: Number(totals.addition || 0),
    vaDiscount: Number(totals.vaDiscount || 0),
    flatDiscount: Number(totals.flatDiscount || 0),
    rateDifference: Number(totals.rateDifference || 0),
    invoiceTotal: Number(totals.invoiceTotal || amount),
    ledgerBalance: Number(totals.ledgerBalance || 0),
    billAmountRoundOff: Number(totals.billAmountRoundOff || 0),
    cashReceived: Number(totals.cashReceived || paid),
    balance: Number(totals.balance ?? balance)
  };
}

function sectionForBillType(type = "") {
  const lower = type.toLowerCase();
  if (lower.includes("return")) return "return";
  if (lower.includes("exchange") || lower.includes("old gold") || lower.includes("purchase")) return "exchange";
  return "sales";
}

function normalizeStaff(item) {
  return {
    staffId: item.staffId || item.employeeId || `STF${String(Math.floor(Math.random() * 999)).padStart(3, "0")}`,
    employeeId: item.employeeId || item.staffId || "",
    name: item.name || "",
    designation: item.designation || "Sales Staff",
    openingBalance: Number(item.openingBalance || 0),
    balanceType: item.balanceType || "Dr",
    opDate: item.opDate || new Date().toLocaleDateString("en-GB"),
    address: item.address || "",
    city: item.city || "",
    place: item.place || "",
    state: item.state || item.stateProvince || "KERALA",
    country: item.country || "INDIA",
    phone: item.phone || "",
    mobile: item.mobile || item.phone || "",
    pointCardNo: item.pointCardNo || "",
    basicSalary: Number(item.basicSalary || 0),
    ta: Number(item.ta || 0),
    da: Number(item.da || 0),
    hra: Number(item.hra || 0),
    status: item.status || "Active",
    birthDate: item.birthDate || "26/12/2000",
    joinDate: item.joinDate || new Date().toLocaleDateString("en-GB"),
    handled: Number(item.handled || 0),
    sales: Number(item.sales || 0)
  };
}

function normalizeWorkLog(item) {
  return {
    refNo: item.refNo || `WL-${Date.now()}`,
    date: item.date || new Date().toLocaleDateString("en-GB"),
    workflow: item.workflow || "Stock",
    action: item.action || "Issue",
    party: item.party || "",
    item: item.item || "",
    qty: Number(item.qty || 0),
    gross: Number(item.gross || 0),
    issue: Number(item.issue || 0),
    receive: Number(item.receive || 0),
    balance: Number(item.balance ?? Number(item.issue || 0) - Number(item.receive || 0)),
    status: item.status || "Pending"
  };
}

function defaultSmithWorkLine() {
  return normalizeSmithWorkLine({
    id: "",
    barcode: "",
    itemName: "",
    mode: "IN",
    qty: 0,
    gross: 0,
    stone: 0,
    touch: 0,
    wastage: 0,
    smWeight: 0,
    stoneCharge: 0,
    mcGram: 0,
    hmc: 0,
    rate: activeGoldRate()
  });
}

function normalizeSmithWorkLine(item = {}) {
  const gross = Number(item.gross || 0);
  const stone = Number(item.stone || 0);
  const mudLess = Number(item.mudLess || 0);
  const smWeight = Number(item.smWeight ?? Math.max(0, gross - stone - mudLess));
  const mcGram = Number(item.mcGram || 0);
  const mc = Number(item.mc ?? smWeight * mcGram);
  const hmc = Number(item.hmc || 0);
  const stoneCharge = Number(item.stoneCharge || item.stnCharge || 0);
  const rate = Number(item.rate || activeGoldRate() || 0);
  const total = Number(item.total ?? (smWeight * rate) + stoneCharge + mc + hmc);
  return {
    id: item.id || crypto.randomUUID(),
    barcode: item.barcode || "",
    itemName: item.itemName || item.item || "",
    mode: item.mode || "IN",
    qty: Number(item.qty || item.nos || 0),
    gross,
    stone,
    touch: Number(item.touch || 0),
    wastage: Number(item.wastage || 0),
    smWeight,
    stoneCharge,
    mcGram,
    mc,
    hmc,
    rate,
    mudLess,
    total
  };
}

function defaultSmithWorkOrder() {
  const smith = (state?.parties || seed.parties || []).find((party) => party.type === "Smith") || {};
  const staff = (state?.staffs || seed.staffs || [])[0] || {};
  return normalizeSmithWorkOrder({
    entryNo: `NR${String(((state?.smithWorkOrders || []).length || 0) + 6).padStart(5, "0")}`,
    refNo: "",
    date: new Date().toLocaleDateString("en-GB"),
    time: nowTime(),
    paymentMode: "Credit",
    transType: "Normal",
    taxable: false,
    skipStone: true,
    itemTouch: false,
    smithCode: smith.customerCode || "",
    smithName: smith.name || "",
    preparedBy: staff.name || "",
    postOnlyMc: true,
    showRate: false,
    gstPct: 0,
    addition: 0,
    discount: 0,
    cashPayment: 0,
    remarks: "",
    lines: []
  });
}

function normalizeSmithWorkOrder(item = {}) {
  return {
    id: item.id || crypto.randomUUID(),
    entryNo: item.entryNo || "NR00006",
    refNo: item.refNo || "",
    date: item.date || new Date().toLocaleDateString("en-GB"),
    time: item.time || nowTime(),
    paymentMode: item.paymentMode || "Credit",
    transType: item.transType || "Normal",
    taxable: Boolean(item.taxable),
    skipStone: item.skipStone !== false,
    itemTouch: Boolean(item.itemTouch),
    smithCode: item.smithCode || "",
    smithName: item.smithName || "",
    preparedBy: item.preparedBy || "",
    postOnlyMc: item.postOnlyMc !== false,
    showRate: Boolean(item.showRate),
    gstPct: Number(item.gstPct || 0),
    addition: Number(item.addition || 0),
    discount: Number(item.discount || 0),
    cashPayment: Number(item.cashPayment || 0),
    remarks: item.remarks || "",
    lines: (item.lines || []).map(normalizeSmithWorkLine)
  };
}

function defaultCashWeightSmithLine() {
  return normalizeCashWeightSmithLine({
    amount: 0,
    rate: activeGoldRate(),
    weight: 0,
    touch: 99.5,
    convert: 100
  });
}

function normalizeCashWeightSmithLine(item = {}) {
  const amount = Number(item.amount || 0);
  const rate = Number(item.rate || activeGoldRate() || 0);
  const weight = Number(item.weight || (rate ? amount / rate : 0));
  const touch = Number(item.touch || 99.5);
  const convert = Number(item.convert || 100);
  const netWeight = Number(item.netWeight ?? (convert ? weight * touch / convert : weight));
  return {
    id: item.id || crypto.randomUUID(),
    amount,
    rate,
    weight,
    touch,
    convert,
    netWeight
  };
}

function defaultCashWeightSmith() {
  const smith = (state?.parties || seed.parties || []).find((party) => party.type === "Smith") || {};
  const staff = (state?.staffs || seed.staffs || [])[0] || {};
  return normalizeCashWeightSmith({
    entryNo: `CF${String(((state?.cashWeightSmiths || []).length || 0) + 1).padStart(5, "0")}`,
    refNo: "",
    date: new Date().toLocaleDateString("en-GB"),
    time: nowTime(),
    mode: "Payment",
    partyType: "Smith",
    onAccount: false,
    partyCode: smith.customerCode || "",
    partyName: smith.name || "",
    preparedBy: staff.name || "",
    cashBankCode: "322",
    cashBank: "Canara Bank Edakkara",
    remarks: "",
    lines: []
  });
}

function normalizeCashWeightSmith(item = {}) {
  return {
    id: item.id || crypto.randomUUID(),
    entryNo: item.entryNo || "CF00001",
    refNo: item.refNo || "",
    date: item.date || new Date().toLocaleDateString("en-GB"),
    time: item.time || nowTime(),
    mode: item.mode || "Payment",
    partyType: item.partyType || "Smith",
    onAccount: Boolean(item.onAccount),
    partyCode: item.partyCode || "",
    partyName: item.partyName || "",
    preparedBy: item.preparedBy || "",
    cashBankCode: item.cashBankCode || "322",
    cashBank: item.cashBank || "Canara Bank Edakkara",
    remarks: item.remarks || "",
    lines: (item.lines || []).map(normalizeCashWeightSmithLine)
  };
}

function defaultJewellerWorkLine() {
  return normalizeJewellerWorkLine({
    id: "",
    barcode: "",
    itemName: "",
    mode: "OUT",
    qty: 0,
    gross: 0,
    stone: 0,
    touch: 0,
    wastage: 0,
    jwWeight: 0,
    stoneCharge: 0,
    mcGram: 0,
    vaPercent: 0,
    hmc: 0,
    rate: activeGoldRate()
  });
}

function normalizeJewellerWorkLine(item = {}) {
  const gross = Number(item.gross || 0);
  const stone = Number(item.stone || 0);
  const mudLess = Number(item.mudLess || 0);
  const jwWeight = Number(item.jwWeight ?? Math.max(0, gross - stone - mudLess));
  const mcGram = Number(item.mcGram || 0);
  const vaPercent = Number(item.vaPercent || item.va || 0);
  const rate = Number(item.rate || activeGoldRate() || 0);
  const stoneCharge = Number(item.stoneCharge || item.stnCharge || 0);
  const mc = Number(item.mc ?? item.mcAmt ?? (jwWeight * mcGram) + ((jwWeight * vaPercent / 100) * rate));
  const hmc = Number(item.hmc || 0);
  const pureWeight = Number(item.pureWeight ?? (jwWeight * Number(item.touch || 0) / 100));
  const total = Number(item.total ?? (jwWeight * rate) + stoneCharge + mc + hmc);
  return {
    id: item.id || crypto.randomUUID(),
    barcode: item.barcode || "",
    itemName: item.itemName || item.item || "",
    mode: item.mode || "OUT",
    qty: Number(item.qty || item.nos || 0),
    gross,
    stone,
    touch: Number(item.touch || 0),
    wastage: Number(item.wastage || 0),
    jwWeight,
    stoneCharge,
    mcGram,
    vaPercent,
    mc,
    hmc,
    rate,
    mudLess,
    pureWeight,
    total,
    net: Number(item.net ?? jwWeight),
    iCode: item.iCode || "",
    itemId: item.itemId || "",
    barSlno: item.barSlno || "",
    gType: item.gType || "",
    iType: item.iType || "",
    description: item.description || item.descri || ""
  };
}

function defaultJewellerWorkOrder() {
  const jeweller = (state?.parties || seed.parties || []).find((party) => party.type === "Jeweller") || {};
  const staff = (state?.staffs || seed.staffs || [])[0] || {};
  return normalizeJewellerWorkOrder({
    entryNo: `AR${String(((state?.jewellerWorkOrders || []).length || 0) + 1).padStart(5, "0")}`,
    refNo: "",
    date: new Date().toLocaleDateString("en-GB"),
    time: nowTime(),
    paymentMode: "Credit",
    transType: "Normal Work",
    jewellerChecked: false,
    skipStone: true,
    itemTouch: false,
    jewellerCode: jeweller.customerCode || "",
    jewellerName: jeweller.name || "",
    preparedBy: staff.name || "",
    exportEnabled: false,
    autoBarcode: false,
    showRate: false,
    ledgerPost: false,
    gstPct: 0,
    addition: 0,
    discount: 0,
    cashPayment: 0,
    remarks: "",
    lines: []
  });
}

function normalizeJewellerWorkOrder(item = {}) {
  return {
    id: item.id || crypto.randomUUID(),
    entryNo: item.entryNo || "AR00001",
    refNo: item.refNo || "",
    date: item.date || new Date().toLocaleDateString("en-GB"),
    time: item.time || nowTime(),
    paymentMode: item.paymentMode || "Credit",
    transType: item.transType || "Normal Work",
    jewellerChecked: Boolean(item.jewellerChecked),
    skipStone: item.skipStone !== false,
    itemTouch: Boolean(item.itemTouch),
    jewellerCode: item.jewellerCode || "",
    jewellerName: item.jewellerName || "",
    preparedBy: item.preparedBy || "",
    exportEnabled: Boolean(item.exportEnabled),
    autoBarcode: Boolean(item.autoBarcode),
    showRate: Boolean(item.showRate),
    ledgerPost: Boolean(item.ledgerPost),
    gstPct: Number(item.gstPct || 0),
    addition: Number(item.addition || 0),
    discount: Number(item.discount || 0),
    cashPayment: Number(item.cashPayment || 0),
    remarks: item.remarks || "",
    lines: (item.lines || []).map(normalizeJewellerWorkLine)
  };
}

function defaultCashWeightJeweller() {
  const jeweller = (state?.parties || seed.parties || []).find((party) => party.type === "Jeweller") || {};
  const staff = (state?.staffs || seed.staffs || [])[0] || {};
  return normalizeCashWeightJeweller({
    entryNo: `CF${String(((state?.cashWeightJewellers || []).length || 0) + 1).padStart(5, "0")}`,
    refNo: "",
    date: new Date().toLocaleDateString("en-GB"),
    time: nowTime(),
    mode: "Payment",
    partyType: "Jeweller",
    onAccount: false,
    partyCode: jeweller.customerCode || "",
    partyName: jeweller.name || "",
    preparedBy: staff.name || "",
    cashBankCode: "322",
    cashBank: "Canara Bank Edakkara",
    remarks: "",
    lines: []
  });
}

function normalizeCashWeightJeweller(item = {}) {
  return {
    ...normalizeCashWeightSmith(item),
    partyType: "Jeweller",
    lines: (item.lines || []).map(normalizeCashWeightSmithLine)
  };
}

function normalizeStock(item) {
  const gross = Number(item.gross || 0);
  return {
    opening: Number(item.opening ?? gross),
    addition: Number(item.addition || 0),
    deduction: Number(item.deduction || 0),
    closing: Number(item.closing ?? gross),
    ...item
  };
}

const OPENING_STOCK_DESCRIPTIONS = [
  "Gold Ornaments",
  "Pure Gold",
  "Old Gold",
  "Diamond 18Ct",
  "Diamond Nos Item",
  "Diamond Ct",
  "Silver",
  "Old Silver",
  "Other",
  "Watch",
  "Stone",
  "Jeweller",
  "Smith",
  "Refiner"
];

function financialYearOpeningDate() {
  const now = new Date();
  const year = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
  return `${year}-04-01`;
}

function financialYear(dateValue = financialYearOpeningDate()) {
  const date = new Date(dateValue);
  const fallback = new Date(financialYearOpeningDate());
  const safeDate = Number.isNaN(date.getTime()) ? fallback : date;
  const startYear = safeDate.getMonth() >= 3 ? safeDate.getFullYear() : safeDate.getFullYear() - 1;
  return `${startYear}-${startYear + 1}`;
}

function normalizeOpeningStockLine(line = {}) {
  const weight = Number(line.weight || 0);
  const stone = Number(line.stone || 0);
  const netWeight = Number(line.netWeight ?? Math.max(0, weight - stone));
  const rate = Number(line.rate || 0);
  const percent = Number(line.percent ?? line.purityPercent ?? 0);
  const amount = Number(line.amount ?? netWeight * rate);
  const pureWeight = Number(line.pureWeight ?? (netWeight * percent) / 100);
  return {
    id: line.id || crypto.randomUUID(),
    description: line.description || "",
    weight,
    stone,
    netWeight,
    rate,
    amount,
    percent,
    pureWeight,
    active: line.active !== false
  };
}

function normalizeOpeningStockEntry(record = {}) {
  const openingDate = record.openingDate || financialYearOpeningDate();
  const existing = new Map((record.lines || []).map((line) => [line.description, line]));
  return {
    id: record.id || crypto.randomUUID(),
    openingDate,
    financialYear: record.financialYear || financialYear(openingDate),
    lines: OPENING_STOCK_DESCRIPTIONS.map((description) => normalizeOpeningStockLine({ description, ...(existing.get(description) || {}) }))
  };
}

function defaultOpeningStockEntry(date = financialYearOpeningDate()) {
  return normalizeOpeningStockEntry({ openingDate: date });
}

function openingStockTotals(record = {}) {
  const lines = (record.lines || []).map(normalizeOpeningStockLine);
  return {
    weight: sumField(lines, "weight"),
    stone: sumField(lines, "stone"),
    netWeight: sumField(lines, "netWeight"),
    amount: sumField(lines, "amount"),
    pureWeight: sumField(lines, "pureWeight")
  };
}

function recalculateOpeningStockLine(line = {}) {
  const next = { ...line };
  next.weight = Number(next.weight || 0);
  next.stone = Number(next.stone || 0);
  next.netWeight = Math.max(0, next.weight - next.stone);
  next.rate = Number(next.rate || 0);
  next.percent = Number(next.percent || 0);
  next.amount = next.netWeight * next.rate;
  next.pureWeight = (next.netWeight * next.percent) / 100;
  return normalizeOpeningStockLine(next);
}

function defaultStockAdjustmentLine() {
  return normalizeStockAdjustmentLine({
    type: "Barcode Only",
    nos: 0,
    gross: 0,
    stone: 0
  });
}

function normalizeStockAdjustmentLine(line = {}) {
  const stockItem = (state?.stock || seed.stock || []).find((item) => item.item === line.itemName || item.huid === line.barcode);
  const nos = Number(line.nos || line.qty || 0);
  const gross = Number(line.gross || 0);
  const stone = Number(line.stone || 0);
  const net = Math.max(0, Number(line.net ?? gross - stone));
  const nosAdd = Number(line.nosAdd || line.addNos || 0);
  const grossAdd = Number(line.grossAdd || line.addGross || 0);
  const stoneAdd = Number(line.stoneAdd || line.addStone || 0);
  const nosLess = Number(line.nosLess || line.lessNos || 0);
  const grossLess = Number(line.grossLess || line.lessGross || 0);
  const stoneLess = Number(line.stoneLess || line.lessStone || 0);
  const openingNos = Number(line.openingNos ?? stockItem?.qty ?? nos);
  const openingGross = Number(line.openingGross ?? stockItem?.gross ?? gross);
  const openingStone = Number(line.openingStone ?? stockItem?.stone ?? stone);
  const closingNos = Number(line.closingNos ?? openingNos + nosAdd - nosLess);
  const closingGross = Number(line.closingGross ?? openingGross + grossAdd - grossLess);
  const closingStone = Number(line.closingStone ?? openingStone + stoneAdd - stoneLess);
  const closingNet = Math.max(0, Number(line.closingNet ?? closingGross - closingStone));
  return {
    id: line.id || crypto.randomUUID(),
    type: line.type || "Barcode Only",
    barcode: line.barcode || "",
    itemName: line.itemName || "",
    nos,
    gross,
    stone,
    net,
    nosAdd,
    grossAdd,
    stoneAdd,
    nosLess,
    grossLess,
    stoneLess,
    closingNos,
    closingGross,
    closingStone,
    closingNet,
    active: line.active !== false
  };
}

function defaultStockAdjustment() {
  return normalizeStockAdjustment({
    entryNo: `SA${String(((state?.stockAdjustments || []).length || 0) + 1).padStart(5, "0")}`,
    date: new Date().toLocaleDateString("en-GB"),
    time: nowTime(),
    preparedBy: state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    reason: "",
    lines: []
  });
}

function normalizeStockAdjustment(record = {}) {
  return {
    id: record.id || crypto.randomUUID(),
    entryNo: record.entryNo || "SA00001",
    refNo: record.refNo || "",
    date: record.date || new Date().toLocaleDateString("en-GB"),
    time: record.time || nowTime(),
    preparedBy: record.preparedBy || state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    reason: record.reason || "",
    lines: (record.lines || []).map(normalizeStockAdjustmentLine)
  };
}

function defaultGoldDepositLine() {
  return normalizeGoldDepositLine({
    itemId: "OG",
    itemName: "OLD GOLD",
    rate: activeGoldRate()
  });
}

function normalizeGoldDepositLine(line = {}) {
  const gross = Number(line.gross || 0);
  const stone = Number(line.stone || 0);
  const mudless = Number(line.mudless || line.mudLess || 0);
  const net = Math.max(0, Number(line.net ?? gross - stone - mudless));
  const touch = Number(line.touch || 0);
  const partyWeight = Number(line.partyWeight ?? line.prtyWgt ?? (touch ? net * touch / 100 : net));
  const rate = Number(line.rate || activeGoldRate());
  const amount = Number(line.amount ?? partyWeight * rate);
  return {
    id: line.id || crypto.randomUUID(),
    itemId: line.itemId || line.idCode || "OG",
    itemName: line.itemName || "OLD GOLD",
    gross,
    stone,
    mudless,
    net,
    touch,
    partyWeight,
    rate,
    amount,
    active: line.active !== false
  };
}

function defaultGoldDeposit(type = "Deposit") {
  const source = type === "Withdrawal" ? state?.goldWithdrawals : state?.goldDeposits;
  return normalizeGoldDeposit({
    type,
    entryNo: `${type === "Withdrawal" ? "GW" : "GD"}${String(((source || []).length || 0) + 1).padStart(5, "0")}`,
    date: new Date().toLocaleDateString("en-GB"),
    time: nowTime(),
    dueDate: new Date().toLocaleDateString("en-GB"),
    preparedBy: state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    lines: []
  }, type);
}

function normalizeGoldDeposit(record = {}, fallbackType = "Deposit") {
  const type = record.type || fallbackType;
  const lines = (record.lines || []).map(normalizeGoldDepositLine);
  const totals = goldDepositFinancials({ ...record, lines });
  return {
    id: record.id || crypto.randomUUID(),
    type,
    entryNo: record.entryNo || (type === "Withdrawal" ? "GW00001" : "GD00001"),
    refNo: record.refNo || "",
    date: record.date || new Date().toLocaleDateString("en-GB"),
    time: record.time || nowTime(),
    byAmount: Boolean(record.byAmount),
    partyName: record.partyName || "",
    preparedBy: record.preparedBy || state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    remarks: record.remarks || "",
    dueDate: record.dueDate || new Date().toLocaleDateString("en-GB"),
    balanceWeight: Number(record.balanceWeight ?? totals.totalWeight),
    balanceAmount: Number(record.balanceAmount ?? totals.totalAmount),
    totalWeight: totals.totalWeight,
    totalAmount: totals.totalAmount,
    lines
  };
}

function goldDepositFinancials(record = {}) {
  const lines = (record.lines || []).filter((line) => line.active !== false);
  return {
    totalWeight: sumField(lines, "partyWeight"),
    totalAmount: sumField(lines, "amount"),
    gross: sumField(lines, "gross"),
    stone: sumField(lines, "stone"),
    net: sumField(lines, "net")
  };
}

function defaultSampleLine() {
  return normalizeSampleLine({
    qty: 1,
    gross: 0,
    stone: 0,
    rate: activeGoldRate(),
    hmc: 0,
    taxPct: 0
  });
}

function normalizeSampleLine(line = {}) {
  const qty = Number(line.qty ?? line.nos ?? 1);
  const gross = Number(line.gross ?? line.grossWeight ?? 0);
  const stone = Number(line.stone ?? line.stoneWeight ?? 0);
  const net = Math.max(0, Number(line.net ?? line.netWeight ?? gross - stone));
  const rate = Number(line.rate ?? activeGoldRate() ?? 0);
  const hmc = Number(line.hmc ?? 0);
  const taxPct = Number(line.taxPct ?? line.taxPercent ?? 0);
  const base = Number(line.base ?? (net * rate) + hmc);
  const taxAmount = Number(line.taxAmount ?? (base * taxPct) / 100);
  const total = Number(line.total ?? base + taxAmount);
  return {
    id: line.id || crypto.randomUUID(),
    itemId: line.itemId || line.idCode || "",
    barcode: line.barcode || "",
    itemName: line.itemName || "",
    qty,
    gross,
    stone,
    net,
    rate,
    hmc,
    taxPct,
    taxAmount,
    total,
    active: line.active !== false
  };
}

function defaultSample(type = "Issue") {
  const isReturn = type === "Return";
  const source = isReturn ? state?.sampleReturns : state?.sampleIssues;
  const jeweller = (state?.parties || seed.parties || []).find((party) => party.type === "Jeweller");
  return normalizeSample({
    type,
    entryNo: `${isReturn ? "SR" : "SI"}${String(((source || []).length || 0) + 1).padStart(5, "0")}`,
    refNo: "",
    date: new Date().toLocaleDateString("en-GB"),
    time: nowTime(),
    sampleCode: "",
    sampleLabel: isReturn ? "Sample Return" : "Sample Issue",
    selectJeweller: false,
    jewellerCode: jeweller?.customerCode || jeweller?.code || "",
    jewellerName: jeweller?.name || "",
    preparedBy: state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    remarks: "",
    showRate: false,
    lines: []
  }, type);
}

function normalizeSample(record = {}, fallbackType = "Issue") {
  const type = record.type || fallbackType;
  const lines = (record.lines || []).map(normalizeSampleLine);
  const totals = sampleFinancials({ lines });
  return {
    id: record.id || crypto.randomUUID(),
    type,
    entryNo: record.entryNo || (type === "Return" ? "SR00001" : "SI00001"),
    refNo: record.refNo || "",
    date: record.date || new Date().toLocaleDateString("en-GB"),
    time: record.time || nowTime(),
    sampleCode: record.sampleCode || "",
    sampleLabel: record.sampleLabel || (type === "Return" ? "Sample Return" : "Sample Issue"),
    selectJeweller: Boolean(record.selectJeweller),
    jewellerCode: record.jewellerCode || "",
    jewellerName: record.jewellerName || "",
    preparedBy: record.preparedBy || state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    remarks: record.remarks || "",
    showRate: Boolean(record.showRate),
    totalAmount: totals.totalAmount,
    lines
  };
}

function sampleFinancials(record = {}) {
  const lines = (record.lines || []).map(normalizeSampleLine).filter((line) => line.active !== false);
  return {
    qty: sumField(lines, "qty"),
    gross: sumField(lines, "gross"),
    stone: sumField(lines, "stone"),
    net: sumField(lines, "net"),
    taxAmount: sumField(lines, "taxAmount"),
    totalAmount: sumField(lines, "total")
  };
}

function defaultPolishingLine() {
  return normalizePolishingLine({
    qty: 1,
    gross: 0,
    stone: 0
  });
}

function normalizePolishingLine(line = {}) {
  const qty = Number(line.qty ?? line.nos ?? 1);
  const gross = Number(line.gross ?? line.grossWeight ?? 0);
  const stone = Number(line.stone ?? line.stoneWeight ?? 0);
  const net = Math.max(0, Number(line.net ?? line.netWeight ?? gross - stone));
  return {
    id: line.id || crypto.randomUUID(),
    itemId: line.itemId || line.idCode || line.itemCode || "",
    barcode: line.barcode || "",
    itemName: line.itemName || "",
    qty,
    gross,
    stone,
    net,
    active: line.active !== false
  };
}

function defaultPolishingStoneLine() {
  return normalizePolishingStoneLine({
    ct: "Cnt",
    pcs: 0,
    purchaseRate: 0,
    sellingRate: 0
  });
}

function normalizePolishingStoneLine(line = {}) {
  const caratCent = Number(line.caratCent ?? line.carat ?? 0);
  const pcs = Number(line.pcs ?? 0);
  const purchaseRate = Number(line.purchaseRate ?? line.pRate ?? 0);
  const sellingRate = Number(line.sellingRate ?? line.sRate ?? 0);
  const computedAmount = (caratCent > 0 ? caratCent : pcs) * sellingRate;
  return {
    id: line.id || crypto.randomUUID(),
    code: line.code || line.iCode || "",
    barcode: line.barcode || "",
    colorType: line.colorType || "",
    colorScale: line.colorScale || "",
    shape: line.shape || "",
    cut: line.cut || "",
    clarity: line.clarity || "",
    sieveSize: line.sieveSize || line.seiveSize || "",
    caratCent,
    ct: line.ct || "Cnt",
    pcs,
    purchaseRate,
    sellingRate,
    amount: Number(line.amount ?? computedAmount),
    active: line.active !== false
  };
}

function defaultPolishingEntry() {
  const source = state?.polishingEntries || [];
  return normalizePolishingEntry({
    entryNo: `PL${String((source.length || 0) + 1).padStart(5, "0")}`,
    refNo: "",
    date: new Date().toLocaleDateString("en-GB"),
    time: nowTime(),
    hasParty: false,
    partyName: "",
    preparedBy: state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    remarks: "",
    lines: [],
    stones: []
  });
}

function normalizePolishingEntry(record = {}) {
  const lines = (record.lines || []).map(normalizePolishingLine);
  const stones = (record.stones || record.stoneLines || []).map(normalizePolishingStoneLine);
  const totals = polishingFinancials({ lines, stones });
  return {
    id: record.id || crypto.randomUUID(),
    entryNo: record.entryNo || "PL00001",
    refNo: record.refNo || "",
    date: record.date || new Date().toLocaleDateString("en-GB"),
    time: record.time || nowTime(),
    hasParty: Boolean(record.hasParty),
    partyName: record.partyName || "",
    preparedBy: record.preparedBy || state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    remarks: record.remarks || "",
    totalQty: totals.qty,
    totalGross: totals.gross,
    totalStone: totals.stone,
    totalNet: totals.net,
    stoneAmount: totals.stoneAmount,
    totalAmount: totals.totalAmount,
    lines,
    stones
  };
}

function polishingFinancials(record = {}) {
  const lines = (record.lines || []).map(normalizePolishingLine).filter((line) => line.active !== false);
  const stones = (record.stones || []).map(normalizePolishingStoneLine).filter((line) => line.active !== false);
  return {
    qty: sumField(lines, "qty"),
    gross: sumField(lines, "gross"),
    stone: sumField(lines, "stone"),
    net: sumField(lines, "net"),
    stoneAmount: sumField(stones, "amount"),
    totalAmount: sumField(stones, "amount")
  };
}

function defaultServiceLine() {
  return normalizeServiceLine({
    nos: 0,
    gross: 0,
    stone: 0
  });
}

function normalizeServiceLine(line = {}) {
  const nos = Number(line.nos ?? line.qty ?? 0);
  const gross = Number(line.gross ?? line.grossWeight ?? 0);
  const stone = Number(line.stone ?? line.stoneWeight ?? 0);
  const net = Math.max(0, Number(line.net ?? line.netWeight ?? gross - stone));
  return {
    id: line.id || crypto.randomUUID(),
    itemName: line.itemName || "",
    description: line.description || "",
    nos,
    gross,
    stone,
    net,
    complaint: line.complaint || "",
    active: line.active !== false
  };
}

function defaultServiceJob(type = "New") {
  const isClose = type === "Close";
  const source = isClose ? state?.serviceClosures : state?.serviceJobs;
  const staff = state?.staffs?.[0] || seed.staffs[0] || {};
  return normalizeServiceJob({
    type,
    entryNo: `${isClose ? "JBC" : "JB"}${String(((source || []).length || 0) + 1).padStart(5, "0")}`,
    refNo: "",
    date: new Date().toLocaleDateString("en-GB"),
    time: nowTime(),
    dueDays: 0,
    dueDate: new Date().toLocaleDateString("en-GB"),
    salesMan: staff.name || "",
    jobStatus: isClose ? "Closed" : "Pending",
    partyAccount: "",
    partyName: "",
    place: "",
    contactNo: "",
    remarks: "",
    approxAmount: 0,
    advance: 0,
    lines: []
  }, type);
}

function normalizeServiceJob(record = {}, fallbackType = "New") {
  const type = record.type || fallbackType;
  const lines = (record.lines || []).map(normalizeServiceLine);
  const totals = serviceFinancials({ ...record, lines });
  return {
    id: record.id || crypto.randomUUID(),
    type,
    entryNo: record.entryNo || (type === "Close" ? "JBC00001" : "JB00001"),
    refNo: record.refNo || "",
    date: record.date || new Date().toLocaleDateString("en-GB"),
    time: record.time || nowTime(),
    dueDays: Number(record.dueDays || 0),
    dueDate: record.dueDate || new Date().toLocaleDateString("en-GB"),
    salesMan: record.salesMan || state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    jobStatus: record.jobStatus || (type === "Close" ? "Closed" : "Pending"),
    partyAccount: record.partyAccount || "",
    partyName: record.partyName || "",
    place: record.place || "",
    contactNo: record.contactNo || "",
    remarks: record.remarks || "",
    approxAmount: Number(record.approxAmount || 0),
    advance: Number(record.advance || 0),
    balance: totals.balance,
    lines
  };
}

function serviceFinancials(record = {}) {
  const lines = (record.lines || []).map(normalizeServiceLine).filter((line) => line.active !== false);
  const approxAmount = Number(record.approxAmount || 0);
  const advance = Number(record.advance || 0);
  return {
    nos: sumField(lines, "nos"),
    gross: sumField(lines, "gross"),
    stone: sumField(lines, "stone"),
    net: sumField(lines, "net"),
    approxAmount,
    advance,
    balance: Math.max(0, approxAmount - advance)
  };
}

function refinerOptions() {
  const options = (state?.parties || seed.parties || [])
    .filter((party) => party.type === "Refiner")
    .map((party) => party.name)
    .filter(Boolean);
  return options.length ? options : ["Metro Refiner", "SPJN ACID"];
}

function defaultRefineryIssueLine() {
  return normalizeRefineryIssueLine({
    qty: 0,
    gross: 0,
    stone: 0,
    rate: activeGoldRate()
  });
}

function normalizeRefineryIssueLine(line = {}) {
  const qty = Number(line.qty || line.nos || 0);
  const gross = Number(line.gross || 0);
  const stone = Number(line.stone || 0);
  const net = Math.max(0, Number(line.net ?? gross - stone));
  const rate = Number(line.rate || activeGoldRate() || 0);
  const amount = Number(line.amount ?? net * rate);
  return {
    id: line.id || crypto.randomUUID(),
    itemId: line.itemId || line.idCode || "",
    itemName: line.itemName || "",
    qty,
    gross,
    stone,
    net,
    rate,
    amount,
    active: line.active !== false
  };
}

function defaultRefineryIssue() {
  const refiner = refinerOptions()[0] || "";
  return normalizeRefineryIssue({
    entryNo: `NR${String(((state?.refineryIssues || []).length || 0) + 1).padStart(5, "0")}`,
    refNo: "",
    date: new Date().toLocaleDateString("en-GB"),
    time: nowTime(),
    expectedTouch: 0,
    metalType: "Gold",
    refinerName: refiner,
    preparedBy: state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    remark: "",
    lines: []
  });
}

function normalizeRefineryIssue(record = {}) {
  return {
    id: record.id || crypto.randomUUID(),
    entryNo: record.entryNo || "NR00001",
    refNo: record.refNo || "",
    date: record.date || new Date().toLocaleDateString("en-GB"),
    time: record.time || nowTime(),
    expectedTouch: Number(record.expectedTouch || 0),
    metalType: record.metalType || "Gold",
    refinerName: record.refinerName || refinerOptions()[0] || "",
    preparedBy: record.preparedBy || state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    remark: record.remark || "",
    lines: (record.lines || []).map(normalizeRefineryIssueLine)
  };
}

function refineryIssueFinancials(record = {}) {
  const lines = (record.lines || []).map(normalizeRefineryIssueLine);
  return {
    qty: sumField(lines, "qty"),
    gross: sumField(lines, "gross"),
    stone: sumField(lines, "stone"),
    issueWeight: sumField(lines, "net"),
    issueAmount: sumField(lines, "amount")
  };
}

function refineryPendingOptions() {
  const issues = state?.refineryIssues || [];
  return issues.map((issue) => ({
    id: issue.id,
    label: `${issue.entryNo}${issue.refinerName ? ` - ${issue.refinerName}` : ""}`
  }));
}

function selectedRefineryIssue(issueId) {
  return (state?.refineryIssues || []).find((issue) => issue.id === issueId || issue.entryNo === issueId) || null;
}

function selectedRefineryReturn(issueId) {
  const issue = selectedRefineryIssue(issueId);
  return (state?.refineryReturns || []).find((record) =>
    record.pendingIssueId === issueId ||
    record.pendingIssueId === issue?.id ||
    record.pendingIssueId === issue?.entryNo
  ) || null;
}

function defaultRefineryReturnLine(source = {}) {
  return normalizeRefineryReturnLine({
    itemName: source.itemName || "",
    issuedWeight: Number(source.issuedWeight ?? source.net ?? 0),
    meltingLoss: 0,
    receivedWeight: Number(source.receivedWeight ?? source.net ?? 0),
    bottleStockWeight: 0,
    testWeight: 0,
    reissueWeight: 0
  });
}

function normalizeRefineryReturnLine(line = {}) {
  const issuedWeight = Number(line.issuedWeight || 0);
  const receivedWeight = Number(line.receivedWeight || 0);
  const bottleStockWeight = Number(line.bottleStockWeight || 0);
  const testWeight = Number(line.testWeight || 0);
  const reissueWeight = Number(line.reissueWeight || 0);
  const meltingLoss = Math.max(0, Number(line.meltingLoss ?? issuedWeight - receivedWeight - bottleStockWeight - reissueWeight));
  return {
    id: line.id || crypto.randomUUID(),
    itemName: line.itemName || "",
    issuedWeight,
    meltingLoss,
    receivedWeight,
    bottleStockWeight,
    testWeight,
    reissueWeight,
    active: line.active !== false
  };
}

function defaultRefineryReturn() {
  const issue = (state?.refineryIssues || [])[0];
  return normalizeRefineryReturn({
    entryNo: `RR${String(((state?.refineryReturns || []).length || 0) + 1).padStart(5, "0")}`,
    refNo: "",
    date: new Date().toLocaleDateString("en-GB"),
    time: nowTime(),
    pendingIssueId: issue?.id || "",
    preparedBy: state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    remark: "",
    lines: issue ? issue.lines.map(defaultRefineryReturnLine) : []
  });
}

function normalizeRefineryReturn(record = {}) {
  const issue = selectedRefineryIssue(record.pendingIssueId);
  const sourceLines = record.lines?.length ? record.lines : issue?.lines?.map(defaultRefineryReturnLine) || [];
  return {
    id: record.id || crypto.randomUUID(),
    entryNo: record.entryNo || "RR00001",
    refNo: record.refNo || "",
    date: record.date || new Date().toLocaleDateString("en-GB"),
    time: record.time || nowTime(),
    pendingIssueId: record.pendingIssueId || issue?.id || "",
    preparedBy: record.preparedBy || state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    remark: record.remark || "",
    lines: sourceLines.map(normalizeRefineryReturnLine)
  };
}

function refineryReturnFinancials(record = {}) {
  const lines = (record.lines || []).map(normalizeRefineryReturnLine);
  return {
    issuedWeight: sumField(lines, "issuedWeight"),
    meltingLoss: sumField(lines, "meltingLoss"),
    receivedWeight: sumField(lines, "receivedWeight"),
    bottleStockWeight: sumField(lines, "bottleStockWeight"),
    testWeight: sumField(lines, "testWeight"),
    reissueWeight: sumField(lines, "reissueWeight")
  };
}

function defaultRefineryFinalLine(source = {}) {
  return normalizeRefineryFinalLine({
    itemName: source.itemName || "",
    receivedWeight: Number(source.receivedWeight ?? source.net ?? 0),
    acidingLoss: 0,
    testWeight: Number(source.testWeight ?? source.receivedWeight ?? source.net ?? 0),
    touch: 0,
    bottleStockWeight: Number(source.bottleStockWeight || 0),
    rate: activeGoldRate()
  });
}

function normalizeRefineryFinalLine(line = {}) {
  const receivedWeight = Number(line.receivedWeight || 0);
  const acidingLoss = Number(line.acidingLoss || 0);
  const testWeight = Math.max(0, Number(line.testWeight ?? receivedWeight - acidingLoss));
  const touch = Number(line.touch || 0);
  const bottleStockWeight = Number(line.bottleStockWeight || 0);
  const rate = Number(line.rate || activeGoldRate() || 0);
  const amount = Number(line.amount ?? testWeight * rate);
  return {
    id: line.id || crypto.randomUUID(),
    itemName: line.itemName || "",
    receivedWeight,
    acidingLoss,
    testWeight,
    touch,
    bottleStockWeight,
    rate,
    amount,
    active: line.active !== false
  };
}

function defaultRefineryFinalReturn() {
  const returnRecord = (state?.refineryReturns || [])[0];
  const issue = selectedRefineryIssue(returnRecord?.pendingIssueId);
  return normalizeRefineryFinalReturn({
    entryNo: `FR${String(((state?.refineryFinalReturns || []).length || 0) + 1).padStart(5, "0")}`,
    refNo: "",
    date: new Date().toLocaleDateString("en-GB"),
    time: nowTime(),
    pendingIssueId: issue?.id || returnRecord?.pendingIssueId || "",
    expectedTouch: issue?.expectedTouch || 0,
    diffTouch: 0,
    preparedBy: state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    remark: "",
    refinerCharge: 0,
    addition: 0,
    discount: 0,
    cashPaid: 0,
    lines: returnRecord?.lines?.length ? returnRecord.lines.map(defaultRefineryFinalLine) : issue?.lines?.map(defaultRefineryFinalLine) || []
  });
}

function normalizeRefineryFinalReturn(record = {}) {
  const returnRecord = (state?.refineryReturns || []).find((item) => item.pendingIssueId === record.pendingIssueId);
  const issue = selectedRefineryIssue(record.pendingIssueId);
  const sourceLines = record.lines?.length ? record.lines : returnRecord?.lines?.map(defaultRefineryFinalLine) || issue?.lines?.map(defaultRefineryFinalLine) || [];
  const expectedTouch = Number(record.expectedTouch ?? issue?.expectedTouch ?? 0);
  const lines = sourceLines.map(normalizeRefineryFinalLine);
  const avgTouch = lines.length ? sumField(lines, "touch") / lines.length : 0;
  return {
    id: record.id || crypto.randomUUID(),
    entryNo: record.entryNo || "FR00001",
    refNo: record.refNo || "",
    date: record.date || new Date().toLocaleDateString("en-GB"),
    time: record.time || nowTime(),
    pendingIssueId: record.pendingIssueId || issue?.id || "",
    expectedTouch,
    diffTouch: Number(record.diffTouch ?? expectedTouch - avgTouch),
    preparedBy: record.preparedBy || state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    remark: record.remark || "",
    refinerCharge: Number(record.refinerCharge || 0),
    addition: Number(record.addition || 0),
    discount: Number(record.discount || 0),
    cashPaid: Number(record.cashPaid || 0),
    lines
  };
}

function refineryFinalFinancials(record = {}) {
  const lines = (record.lines || []).map(normalizeRefineryFinalLine);
  const refinedAmount = sumField(lines, "amount");
  const total = refinedAmount + Number(record.refinerCharge || 0) + Number(record.addition || 0) - Number(record.discount || 0);
  const cashPaid = Number(record.cashPaid || 0);
  return {
    receivedWeight: sumField(lines, "receivedWeight"),
    acidingLoss: sumField(lines, "acidingLoss"),
    testWeight: sumField(lines, "testWeight"),
    bottleStockWeight: sumField(lines, "bottleStockWeight"),
    refinedAmount,
    total,
    cashPaid,
    balance: total - cashPaid
  };
}

function defaultMeltingIssueLine() {
  return normalizeMeltingIssueLine({
    qty: 0,
    gross: 0,
    stone: 0,
    rate: activeGoldRate()
  });
}

function normalizeMeltingIssueLine(line = {}) {
  const qty = Number(line.qty || line.nos || 0);
  const gross = Number(line.gross || 0);
  const stone = Number(line.stone || line.stoneWeight || 0);
  const net = Math.max(0, Number(line.net ?? gross - stone));
  const rate = Number(line.rate || activeGoldRate() || 0);
  const amount = Number(line.amount ?? net * rate);
  return {
    id: line.id || crypto.randomUUID(),
    itemId: line.itemId || "",
    itemName: line.itemName || "",
    qty,
    gross,
    stone,
    net,
    rate,
    amount,
    active: line.active !== false
  };
}

function defaultMeltingIssue() {
  return normalizeMeltingIssue({
    entryNo: `MI${String(((state?.meltingIssues || []).length || 0) + 1).padStart(5, "0")}`,
    refNo: "",
    date: new Date().toLocaleDateString("en-GB"),
    time: nowTime(),
    issueType: "Melting",
    refinerName: refinerOptions()[0] || "",
    preparedBy: state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    lines: []
  });
}

function normalizeMeltingIssue(record = {}) {
  return {
    id: record.id || crypto.randomUUID(),
    entryNo: record.entryNo || "MI00001",
    refNo: record.refNo || "",
    date: record.date || new Date().toLocaleDateString("en-GB"),
    time: record.time || nowTime(),
    issueType: record.issueType || "Melting",
    refinerName: record.refinerName || refinerOptions()[0] || "",
    preparedBy: record.preparedBy || state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    lines: (record.lines || []).map(normalizeMeltingIssueLine)
  };
}

function meltingIssueFinancials(record = {}) {
  const lines = (record.lines || []).map(normalizeMeltingIssueLine);
  return {
    qty: sumField(lines, "qty"),
    gross: sumField(lines, "gross"),
    stone: sumField(lines, "stone"),
    issueWeight: sumField(lines, "net"),
    issueAmount: sumField(lines, "amount")
  };
}

function meltingPendingOptions() {
  return (state?.meltingIssues || []).map((issue) => ({
    id: issue.id,
    label: `${issue.entryNo}${issue.refinerName ? ` - ${issue.refinerName}` : ""}`
  }));
}

function selectedMeltingIssue(issueId) {
  return (state?.meltingIssues || []).find((issue) => issue.id === issueId || issue.entryNo === issueId) || null;
}

function defaultMeltingReturnLine(source = {}) {
  return normalizeMeltingReturnLine({
    itemName: source.itemName || "",
    issuedWeight: Number(source.issuedWeight ?? source.net ?? 0),
    meltingLoss: 0,
    testWeight: Number(source.testWeight ?? source.net ?? 0),
    receivedWeight: Number(source.receivedWeight ?? source.net ?? 0),
    touch: 0,
    rate: Number(source.rate || activeGoldRate() || 0),
    bottleStockWeight: 0
  });
}

function normalizeMeltingReturnLine(line = {}) {
  const issuedWeight = Number(line.issuedWeight || 0);
  const meltingLoss = Number(line.meltingLoss || 0);
  const testWeight = Number(line.testWeight || 0);
  const receivedWeight = Math.max(0, Number(line.receivedWeight ?? issuedWeight - meltingLoss));
  const touch = Number(line.touch || 0);
  const rate = Number(line.rate || activeGoldRate() || 0);
  const bottleStockWeight = Number(line.bottleStockWeight || 0);
  const amount = Number(line.amount ?? receivedWeight * rate);
  return {
    id: line.id || crypto.randomUUID(),
    itemName: line.itemName || "",
    issuedWeight,
    meltingLoss,
    testWeight,
    receivedWeight,
    touch,
    rate,
    bottleStockWeight,
    amount,
    active: line.active !== false
  };
}

function defaultMeltingReturn() {
  const issue = (state?.meltingIssues || [])[0];
  return normalizeMeltingReturn({
    entryNo: `MR${String(((state?.meltingReturns || []).length || 0) + 1).padStart(5, "0")}`,
    refNo: "",
    date: new Date().toLocaleDateString("en-GB"),
    time: nowTime(),
    pendingIssueId: issue?.id || "",
    preparedBy: state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    remark: "",
    refinerCharge: 0,
    addition: 0,
    discount: 0,
    cashPaid: 0,
    lines: issue ? issue.lines.map(defaultMeltingReturnLine) : []
  });
}

function normalizeMeltingReturn(record = {}) {
  const issue = selectedMeltingIssue(record.pendingIssueId);
  const sourceLines = record.lines?.length ? record.lines : issue?.lines?.map(defaultMeltingReturnLine) || [];
  return {
    id: record.id || crypto.randomUUID(),
    entryNo: record.entryNo || "MR00001",
    refNo: record.refNo || "",
    date: record.date || new Date().toLocaleDateString("en-GB"),
    time: record.time || nowTime(),
    pendingIssueId: record.pendingIssueId || issue?.id || "",
    preparedBy: record.preparedBy || state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    remark: record.remark || "",
    refinerCharge: Number(record.refinerCharge || 0),
    addition: Number(record.addition || 0),
    discount: Number(record.discount || 0),
    cashPaid: Number(record.cashPaid || 0),
    lines: sourceLines.map(normalizeMeltingReturnLine)
  };
}

function meltingReturnFinancials(record = {}) {
  const lines = (record.lines || []).map(normalizeMeltingReturnLine);
  const amount = sumField(lines, "amount");
  const total = amount + Number(record.refinerCharge || 0) + Number(record.addition || 0) - Number(record.discount || 0);
  const cashPaid = Number(record.cashPaid || 0);
  return {
    issuedWeight: sumField(lines, "issuedWeight"),
    meltingLoss: sumField(lines, "meltingLoss"),
    testWeight: sumField(lines, "testWeight"),
    receivedWeight: sumField(lines, "receivedWeight"),
    bottleStockWeight: sumField(lines, "bottleStockWeight"),
    amount,
    total,
    cashPaid,
    balance: total - cashPaid
  };
}

function normalizeComplimentaryStock(record = {}) {
  const purchased = Number(record.purchased || 0);
  const issued = Number(record.issued || 0);
  return {
    id: record.id || record.itemId || crypto.randomUUID(),
    itemId: record.itemId || record.id || "",
    itemName: record.itemName || record.name || "",
    unit: record.unit || "Nos",
    purchased,
    issued,
    balance: Number(record.balance ?? (purchased - issued))
  };
}

function complimentaryItemCatalog() {
  const fromStock = (state?.complimentaryStock || seed.complimentaryStock || []).map((item) => ({
    itemId: item.itemId,
    itemName: item.itemName,
    unit: item.unit || "Nos"
  }));
  const fromMasters = (state?.itemMasters || seed.itemMasters || []).map((item) => ({
    itemId: item.itemId,
    itemName: item.itemName,
    unit: "Nos"
  }));
  const map = new Map();
  [...fromStock, ...fromMasters].filter((item) => item.itemName).forEach((item) => {
    map.set(item.itemName, item);
  });
  return [...map.values()];
}

function complimentaryUnitOptions() {
  const units = (state?.itemCategories?.units || seed.itemCategories.units || []).map((unit) => unit.name).filter(Boolean);
  return [...new Set(["Nos", ...units])];
}

function complimentaryItemDropdown(index, value, type) {
  const options = complimentaryItemCatalog().map((item) => item.itemName);
  const list = [...new Set(["", ...options, value].filter((item) => item !== undefined))];
  return `<select class="grid-input" data-complimentary-${type}-line-field="itemName" data-index="${index}">${list.map((option) => `<option ${option === value ? "selected" : ""}>${option}</option>`).join("")}</select>`;
}

function complimentaryLineSelect(field, value, options, type, index) {
  const list = [...new Set(["", ...(options || []), value].filter((item) => item !== undefined))];
  return `<select class="grid-input" data-complimentary-${type}-line-field="${field}" data-index="${index}">${list.map((option) => `<option ${option === value ? "selected" : ""}>${option}</option>`).join("")}</select>`;
}

function complimentaryPartyDropdown(field, value, attr, type = "Supplier") {
  const options = (state?.parties || []).filter((party) => party.type === type).map((party) => party.name).filter(Boolean);
  const list = [...new Set(["", ...options, value].filter((item) => item !== undefined))];
  return `<select class="classic-input" ${attr}="${field}">${list.map((option) => `<option ${option === value ? "selected" : ""}>${option}</option>`).join("")}</select>`;
}

function defaultComplimentaryPurchaseLine() {
  return {
    id: crypto.randomUUID(),
    itemId: "",
    itemName: "",
    quantity: 0,
    unit: "Nos",
    foc: 0,
    price: 0,
    total: 0
  };
}

function normalizeComplimentaryPurchaseLine(line = {}) {
  const catalogItem = complimentaryItemCatalog().find((item) => item.itemName === line.itemName || item.itemId === line.itemId);
  const quantity = Number(line.quantity || 0);
  const foc = Number(line.foc || 0);
  const price = Number(line.price || 0);
  const chargeableQty = Math.max(quantity - foc, 0);
  return {
    id: line.id || crypto.randomUUID(),
    itemId: line.itemId || catalogItem?.itemId || "",
    itemName: line.itemName || catalogItem?.itemName || "",
    quantity,
    unit: line.unit || catalogItem?.unit || "Nos",
    foc,
    price,
    total: chargeableQty * price
  };
}

function defaultComplimentaryIssueLine() {
  return {
    id: crypto.randomUUID(),
    itemId: "",
    itemName: "",
    quantity: 0,
    unit: "Nos"
  };
}

function normalizeComplimentaryIssueLine(line = {}) {
  const catalogItem = complimentaryItemCatalog().find((item) => item.itemName === line.itemName || item.itemId === line.itemId);
  return {
    id: line.id || crypto.randomUUID(),
    itemId: line.itemId || catalogItem?.itemId || "",
    itemName: line.itemName || catalogItem?.itemName || "",
    quantity: Number(line.quantity || 0),
    unit: line.unit || catalogItem?.unit || "Nos"
  };
}

function defaultComplimentaryPurchase() {
  const supplier = supplierPartyByCode("S0014") || (state?.parties || []).find((party) => party.type === "Supplier");
  const staff = (state?.staffs || []).find((item) => item.name === "ABDUL SALAM AP") || state?.staffs?.[0] || seed.staffs[0];
  return {
    id: crypto.randomUUID(),
    entryNo: `CP${String((state?.complimentaryPurchases || []).length + 1).padStart(5, "0")}`,
    refNo: "",
    date: complimentaryDateValue(),
    time: nowTimeWithSeconds(),
    mode: "Credit",
    partyId: supplier?.customerCode || "",
    partyName: supplier?.name || "",
    address: supplier?.address || "",
    preparedBy: staff?.name || "",
    addition: 0,
    discount: 0,
    lines: [defaultComplimentaryPurchaseLine()]
  };
}

function complimentaryPurchaseFinancials(record = {}) {
  const lines = (record.lines || []).map(normalizeComplimentaryPurchaseLine);
  const billAmount = sumField(lines, "total");
  const addition = Number(record.addition || 0);
  const discount = Number(record.discount || 0);
  return {
    billAmount,
    addition,
    discount,
    invoiceTotal: billAmount + addition - discount
  };
}

function normalizeComplimentaryPurchase(record = {}) {
  const lines = (record.lines?.length ? record.lines : [defaultComplimentaryPurchaseLine()]).map(normalizeComplimentaryPurchaseLine);
  const financials = complimentaryPurchaseFinancials({ ...record, lines });
  return {
    id: record.id || crypto.randomUUID(),
    entryNo: record.entryNo || "",
    refNo: record.refNo || "",
    date: record.date || complimentaryDateValue(),
    time: record.time || nowTimeWithSeconds(),
    mode: record.mode || "Credit",
    partyId: record.partyId || "",
    partyName: record.partyName || "",
    address: record.address || "",
    preparedBy: record.preparedBy || state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    addition: financials.addition,
    discount: financials.discount,
    billAmount: financials.billAmount,
    invoiceTotal: financials.invoiceTotal,
    lines
  };
}

function defaultComplimentaryIssue() {
  const staff = (state?.staffs || []).find((item) => item.name === "ABDUL SALAM AP") || state?.staffs?.[0] || seed.staffs[0];
  return {
    id: crypto.randomUUID(),
    entryNo: `CI${String((state?.complimentaryIssues || []).length + 1).padStart(5, "0")}`,
    refNo: "",
    date: complimentaryDateValue(),
    time: nowTimeWithSeconds(),
    issueType: "Sales / Issue",
    invoiceNo: "",
    preparedBy: staff?.name || "",
    remarks: "",
    lines: [defaultComplimentaryIssueLine()]
  };
}

function normalizeComplimentaryIssue(record = {}) {
  return {
    id: record.id || crypto.randomUUID(),
    entryNo: record.entryNo || "",
    refNo: record.refNo || "",
    date: record.date || complimentaryDateValue(),
    time: record.time || nowTimeWithSeconds(),
    issueType: record.issueType || "Sales / Issue",
    invoiceNo: record.invoiceNo || "",
    preparedBy: record.preparedBy || state?.staffs?.[0]?.name || seed.staffs[0]?.name || "",
    remarks: record.remarks || "",
    lines: (record.lines?.length ? record.lines : [defaultComplimentaryIssueLine()]).map(normalizeComplimentaryIssueLine)
  };
}

function rebuildComplimentaryStock() {
  const map = new Map();
  (seed.complimentaryStock || []).forEach((item) => {
    const normalized = normalizeComplimentaryStock(item);
    map.set(normalized.itemName, normalized);
  });
  (state.complimentaryPurchases || []).forEach((purchase) => {
    (purchase.lines || []).forEach((line) => {
      const normalized = normalizeComplimentaryPurchaseLine(line);
      if (!normalized.itemName) return;
      const current = map.get(normalized.itemName) || normalizeComplimentaryStock(normalized);
      current.itemId = normalized.itemId || current.itemId;
      current.unit = normalized.unit || current.unit;
      current.purchased += Number(normalized.quantity || 0);
      map.set(normalized.itemName, current);
    });
  });
  (state.complimentaryIssues || []).forEach((issue) => {
    (issue.lines || []).forEach((line) => {
      const normalized = normalizeComplimentaryIssueLine(line);
      if (!normalized.itemName) return;
      const current = map.get(normalized.itemName) || normalizeComplimentaryStock(normalized);
      current.itemId = normalized.itemId || current.itemId;
      current.unit = normalized.unit || current.unit;
      current.issued += Number(normalized.quantity || 0);
      map.set(normalized.itemName, current);
    });
  });
  state.complimentaryStock = [...map.values()].map((item) => normalizeComplimentaryStock({
    ...item,
    balance: Number(item.purchased || 0) - Number(item.issued || 0)
  }));
}

function complimentaryStockAvailable(itemName, excludeIssueId = "") {
  rebuildComplimentaryStock();
  const stock = (state.complimentaryStock || []).find((item) => item.itemName === itemName);
  let available = Number(stock?.balance || 0);
  if (excludeIssueId) {
    const existing = (state.complimentaryIssues || []).find((issue) => issue.id === excludeIssueId);
    (existing?.lines || []).forEach((line) => {
      if (line.itemName === itemName) available += Number(line.quantity || 0);
    });
  }
  return available;
}

function validateComplimentaryIssueStock(record = {}) {
  for (const line of record.lines || []) {
    const normalized = normalizeComplimentaryIssueLine(line);
    if (!normalized.itemName || Number(normalized.quantity || 0) <= 0) continue;
    const available = complimentaryStockAvailable(normalized.itemName, record.id);
    if (Number(normalized.quantity) > available) {
      return {
        ok: false,
        message: `Insufficient stock for ${normalized.itemName}. Available ${numericValue(available, 2)} ${normalized.unit}.`
      };
    }
  }
  return { ok: true };
}

function supplierPartyByCode(code = "") {
  const normalized = String(code || "").trim().toUpperCase();
  if (!normalized) return null;
  return (state.parties || []).find((party) => party.type === "Supplier" && String(party.customerCode || "").toUpperCase() === normalized) || null;
}

function supplierPartyByName(name = "") {
  return (state.parties || []).find((party) => party.type === "Supplier" && party.name === name) || null;
}

function normalizeScheme(item) {
  return {
    memberId: item.memberId || "",
    address: item.address || "",
    place: item.place || "",
    mobile: item.mobile || "",
    qty: Number(item.qty || 0),
    joinDate: item.joinDate || "",
    endDate: item.endDate || "",
    opAmount: Number(item.opAmount || 0),
    opWeight: Number(item.opWeight || 0),
    opDate: item.opDate || "",
    collection: Number(item.collection || item.due || 0),
    ...item
  };
}

function normalizeAccount(item) {
  return {
    date: item.date || "16-05-2026",
    vouNo: item.vouNo || "",
    particular: item.particular || item.ledger,
    crdr: item.crdr || (Number(item.balance || 0) < 0 ? "Cr" : "Dr"),
    ...item
  };
}

function normalizeAccountMaster(item) {
  return {
    accountId: item.accountId || item.id || nextAccountMasterId(),
    accountName: item.accountName || item.name || "",
    aliasName: item.aliasName || "",
    subSchedule: item.subSchedule || "Agents",
    openingBalance: Number(item.openingBalance || 0),
    balanceType: item.balanceType || "Dr",
    opDate: item.opDate || new Date().toLocaleDateString("en-GB"),
    status: item.status || "ACTIVE",
    costCenter: item.costCenter || "Main shop",
    mobile: item.mobile || item.phone || "",
    adminOnly: Boolean(item.adminOnly)
  };
}

function saveState() {
  localStorage.setItem("goldland-state", JSON.stringify(state));
}

function money(value) {
  return `Rs.${Number(value).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

function signedMoney(value) {
  const number = Number(value || 0);
  return number < 0 ? `-${money(Math.abs(number))}` : money(number);
}

function grams(value) {
  return `${Number(value).toLocaleString("en-IN", { maximumFractionDigits: 3 })} g`;
}

function numericValue(value, decimals = 3) {
  const number = Number(value || 0);
  if (!Number.isFinite(number)) return "0";
  return number.toFixed(decimals).replace(/\.?0+$/, "");
}

function moneyValue(value) {
  return numericValue(value, 2);
}

function parseEntryNumber(value) {
  const normalized = String(value ?? "").replace(/[^0-9.-]/g, "");
  return Number(normalized) || 0;
}

function activeGoldRate() {
  const source = state?.rates || seed.rates;
  const map = new Map();
  for (const item of source || []) map.set(`${item.type}-${item.grade}`, item);
  return map.get("Gold-22K")?.price || 0;
}

function latestDiamondRate() {
  const source = state?.rates || seed.rates;
  const diamond = [...(source || [])].reverse().find((item) => item.type === "Diamond");
  return Number(diamond?.price || 0);
}

function defaultEntryLine(section = "sales") {
  const rate = activeGoldRate();
  const defaults = {
    sales: { item: "GLD", itemName: "", description: "", qty: 1, gross: 0, stone: 0, wastage: 0, stoneCharge: 0, rate, va: 0, makingCharge: 0, taxPct: 3 },
    order: { item: "GLD", itemCode: "", itemName: "", qty: 1, gross: 0, stone: 0, wastage: 0, stoneCharge: 0, rate, va: 0, makingCharge: 0, taxPct: 0, length: "", breadth: "", model: "" },
    exchange: { item: "OG", itemName: "OLD GOLD", qty: 1, gross: 0, stone: 0, mudLess: 0, lessPct: 0, lessWeight: 0, touchPct: 0, touchLess: 0, stoneCharge: 0, rateLessPct: 0, rate, taxPct: 0 },
    return: { item: "GLD", itemName: "", qty: 1, gross: 0, stone: 0, wastage: 0, stoneCharge: 0, va: 0, makingCharge: 0, rate, taxPct: 3 },
    purchase: { item: "OG", itemName: "OLD GOLD", qty: 1, gross: 0, stone: 0, mudLess: 0, lessPct: 0, lessWeight: 0, touchPct: 0, touchLess: 0, stoneCharge: 0, rateLessPct: 0, rate, taxPct: 0 }
  };
  const key = section === "purchase" ? "purchase" : section;
  return normalizeBillLine(defaults[key] || defaults.sales, 0, state.bills[0] || {}, key);
}

function nowTime() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function nowTimeWithSeconds() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
}

function complimentaryDateValue(date = new Date()) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}-${months[date.getMonth()]}-${year}`;
}

function defaultOrderAdvanceDraft(type = "advance") {
  const order = state?.salesOrders?.[0] || seed.salesOrders?.[0] || {};
  const base = {
    pickOrder: order.entryNo || order.refNo || "",
    goldRateGram: activeGoldRate(),
    goldRateEightGram: activeGoldRate() * 8,
    entryNo: "",
    refNo: "",
    date: new Date().toLocaleDateString("en-GB"),
    time: nowTimeWithSeconds(),
    preparedBy: state?.staffs?.[0]?.name || seed.staffs?.[0]?.name || "",
    paymentMode: "Cash",
    cashBank: "Cash in Hand",
    advanceAmount: 0,
    advanceWeight: 0,
    exchangeAmount: 0,
    exchangeWeight: 0,
    refundAmount: 0,
    refundWeight: 0,
    remark: ""
  };
  return type === "refund" ? { ...base, preparedBy: state?.staffs?.[0]?.name || "ABDUL SALAM AP" } : base;
}

function latestRates() {
  const map = new Map();
  for (const item of state.rates) map.set(`${item.type}-${item.grade}`, item);
  return [...map.values()];
}

function latestRateValue(type, grade, fallback = 0) {
  return latestRates().find((item) => item.type === type && item.grade === grade)?.price ?? fallback;
}

function totals() {
  const sales = state.bills.filter((bill) => bill.type.includes("Sale")).reduce((sum, bill) => sum + bill.amount, 0);
  const purchases = state.bills.filter((bill) => bill.type.toLowerCase().includes("purchase")).reduce((sum, bill) => sum + bill.amount, 0);
  const cash = state.accounts.find((row) => row.ledger === "Cash in Hand")?.balance || 0;
  const stockWeight = state.stock.reduce((sum, item) => sum + Number(item.gross), 0);
  const schemeDue = state.schemes.reduce((sum, item) => sum + Number(item.due), 0);
  return { sales, purchases, cash, stockWeight, schemeDue };
}

function render() {
  document.getElementById("app").innerHTML = authenticated ? appShell() : loginScreen();
  bindEvents();
}

function renderAndFocus(selector) {
  render();
  const field = document.querySelector(selector);
  if (!field) return;
  field.focus();
  const end = field.value.length;
  field.setSelectionRange?.(end, end);
}

function loginScreen() {
  return `
    <main class="login-shell">
      <form class="login-card" id="loginForm">
        <div class="brand-mark">G</div>
        <p class="eyebrow">Goldland secure access</p>
        <h1>Enter shop password</h1>
        <p>One password opens the complete shop system for authorized staff.</p>
        <label>
          <span>Password</span>
          <input name="password" type="password" autocomplete="current-password" autofocus required />
        </label>
        <button class="primary">Unlock Goldland</button>
      </form>
    </main>
  `;
}

function appShell() {
  return `
    <main class="shell">
      ${sidebar()}
      <section class="workspace">
        ${topbar()}
        <div class="content">${route()}</div>
      </section>
    </main>
  `;
}

function sidebar() {
  const nav = ["Dashboard", "Schemes", "Reports"];
  const stockItems = STOCK_ITEMS;
  const workItems = WORK_ORDER_ITEMS;
  const isGroupOpen = (name) => expandedNavGroups.has(name);
  return `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">G</div>
        <div>
          <strong>Goldland</strong>
          <span>Jewellery ERP</span>
        </div>
      </div>
      <nav>
        <button class="nav ${active === "Dashboard" ? "active" : ""}" data-nav="Dashboard">${icon("Dashboard")}<span>Dashboard</span></button>
        <div class="nav-group ${isGroupOpen("Sales") ? "open" : ""}">
          <button class="nav ${active === "Sales" ? "active" : ""}" data-nav="Sales">${icon("Billing")}<span>Sales</span><span class="chevron">⌄</span></button>
          <div class="subnav">
            ${SALES_ITEMS.map((item) => `<button class="subnav-item ${active === "Sales" && salesView === item ? "active" : ""}" data-sales-section="${item}">${item}</button>`).join("")}
          </div>
        </div>
        <div class="nav-group ${isGroupOpen("Purchase") ? "open" : ""}">
          <button class="nav ${active === "Purchase" ? "active" : ""}" data-nav="Purchase">${icon("Transactions")}<span>Purchase</span><span class="chevron">⌄</span></button>
          <div class="subnav">
            ${PURCHASE_ITEMS.map((item) => `<button class="subnav-item ${active === "Purchase" && purchaseView === item ? "active" : ""}" data-purchase-section="${item}">${item}</button>`).join("")}
          </div>
        </div>
        <div class="nav-group ${isGroupOpen("Stock") ? "open" : ""}">
          <button class="nav ${active === "Stock" ? "active" : ""}" data-nav="Stock">${icon("Stock")}<span>Stock</span><span class="chevron">v</span></button>
          <div class="subnav">
            ${stockItems.map((item) => `<button class="subnav-item ${active === "Stock" && stockView === item ? "active" : ""}" data-stock-section="${item}">${item}</button>`).join("")}
          </div>
        </div>
        <div class="nav-group ${isGroupOpen("Work Orders") ? "open" : ""}">
          <button class="nav ${active === "Work Orders" ? "active" : ""}" data-nav="Work Orders">${icon("Work Orders")}<span>Work Orders</span><span class="chevron">v</span></button>
          <div class="subnav">
            ${workItems.map((item) => `<button class="subnav-item ${active === "Work Orders" && workOrderView === item ? "active" : ""}" data-work-section="${item}">${item}</button>`).join("")}
          </div>
        </div>
        <div class="nav-group ${isGroupOpen("Accounts") ? "open" : ""}">
          <button class="nav ${active === "Accounts" ? "active" : ""}" data-nav="Accounts">${icon("Accounts")}<span>Accounts</span><span class="chevron">v</span></button>
          <div class="subnav">
            ${ACCOUNT_ITEMS.map((item) => `<button class="subnav-item ${active === "Accounts" && accountView === item ? "active" : ""}" data-account-section="${item}">${item}</button>`).join("")}
          </div>
        </div>
        <div class="nav-group ${isGroupOpen("Management") ? "open" : ""}">
          <button class="nav ${active === "Management" ? "active" : ""}" data-nav="Management">${icon("Management")}<span>Management</span><span class="chevron">⌄</span></button>
          <div class="subnav">
            ${MANAGEMENT_ITEMS.map((item) => `<button class="subnav-item ${active === "Management" && managementView === item ? "active" : ""}" data-management="${item}">${item}</button>`).join("")}
          </div>
        </div>
        ${nav.slice(1).map((item) => `<button class="nav ${active === item ? "active" : ""}" data-nav="${item}">${icon(item)}<span>${item}</span></button>`).join("")}
      </nav>
      <div class="security-card">
        <span>Access mode</span>
        <strong>Single password</strong>
        <button class="secondary full" data-action="logout">Lock</button>
      </div>
    </aside>
  `;
}

function topbar() {
  const rateText = latestRates()
    .filter((item) => item.type === "Gold")
    .map((item) => `${item.grade} ${money(item.price)}/g`)
    .join(" | ");
  const title = active === "Management" ? managementView : active === "Sales" ? salesView : active === "Purchase" ? purchaseView : active === "Stock" ? stockView : active === "Work Orders" ? (workOrderView === "Complimentary Item" ? complimentaryView : workOrderView) : active === "Accounts" ? accountView : active === "Reports" ? selectedReport || "Reports" : active;

  return `
    <header class="topbar">
      <div>
        <p class="eyebrow">Local-first shop system</p>
        <h1>${title}</h1>
      </div>
      <label class="command">
        <span>Find</span>
        <input id="search" data-global-menu-search placeholder="menu, report, bill, HUID..." value="${escapeHtml(globalMenuSearch)}" autocomplete="off" />
        <kbd>Ctrl K</kbd>
        ${globalSearchResults()}
      </label>
      <div class="topbar-rate-area">
        <div class="rate-strip">${rateText}</div>
        <button class="rate-update-button" data-action="open-rate">Rate Update</button>
      </div>
    </header>
  `;
}

function route() {
  if (active === "Dashboard") return dashboard();
  if (active === "Sales") return sales();
  if (active === "Purchase") return purchase();
  if (active === "Billing") return sales();
  if (active === "Transactions") return transactions();
  if (active === "Stock") return stock();
  if (active === "Work Orders") return workOrders();
  if (active === "Management") return management();
  if (active === "Schemes") return schemes();
  if (active === "Accounts") return accounts();
  return reports();
}

function dashboard() {
  const t = totals();
  const lowStock = state.stock.filter((item) => item.status !== "Ready").length;
  const pendingWork = state.workLogs.filter((log) => log.status !== "Closed" && log.status !== "Received").length;
  const receivable = state.bills.reduce((sum, bill) => sum + Number(bill.balance || 0), 0);
  const activeStaff = state.staffs.filter((staff) => staff.status === "Active").length;
  const topStaff = state.staffs.slice().sort((a, b) => b.sales - a.sales)[0];
  return `
    <section class="grid overview">
      ${metric("Today sales", money(t.sales), "+8.4% vs yesterday")}
      ${metric("Purchases", money(t.purchases), "old gold and supplier")}
      ${metric("Cash position", money(t.cash), "after current day book")}
      ${metric("Gold stock", grams(t.stockWeight), "all purities")}
      ${metric("Scheme dues", money(t.schemeDue), "collection follow-up")}
      ${metric("Receivable", money(receivable), "customer balances")}
      ${metric("Pending work", pendingWork, "smith/jeweller/refiner")}
      ${metric("Active staffs", activeStaff, `${topStaff?.name || "No staff"} leading today`)}
    </section>
    <section class="split">
      <div class="panel">
        <div class="panel-head">
          <h2>Business Snapshot</h2>
        </div>
        ${table(["Area", "Status", "Value", "Next Step"], [
          ["Billing", "Open", money(t.sales), "Print pending customer copies"],
          ["Stock", lowStock ? "Review" : "Clear", `${lowStock} items`, "Check low review and draft stock"],
          ["Schemes", "Follow-up", money(t.schemeDue), "Collect member dues"],
          ["Accounts", "Day close", money(t.cash), "Verify cash and bank entries"],
          ["Workflows", "Pending", `${pendingWork} entries`, "Receive or reconcile issued items"]
        ])}
      </div>
      <div class="panel">
        <div class="panel-head"><h2>Staff Performance</h2></div>
        ${table(["Staff ID", "Name", "Bills", "Sales"], state.staffs.map((staff) => [staff.staffId, staff.name, staff.handled, money(staff.sales)]))}
      </div>
    </section>
  `;
}

function sales() {
  return `
    ${moduleSwitcher("Sales", SALES_ITEMS, salesView, "data-sales-section")}
    ${salesView === "Sales Return" ? salesReturn() : salesView === "DMD Return/DMD OP" ? dmdReturn() : salesView === "DMD Sales WholeSales" ? dmdWholesale() : salesView === "Sales Order" ? salesOrder() : salesView === "Additional Order Advance" ? additionalOrderAdvance() : salesView === "Order Advance Refund" ? orderAdvanceRefund() : billing()}
  `;
}

function purchase() {
  return `
    ${moduleSwitcher("Purchase", PURCHASE_ITEMS, purchaseView, "data-purchase-section")}
    ${purchaseView === "Purchase Return" ? purchaseReturn() : purchaseView === "Purchase Invoice" ? purchaseEntry() : purchaseView === "Diamond Purchase" ? diamondPurchase() : purchaseView === "Diamond Purchase Return" ? diamondPurchaseReturn() : purchaseView === "Direct Purchase" ? directPurchase() : purchaseView === "Direct Purchase Return" ? directPurchaseReturn() : purchaseView === "DMD Stone Purchase" ? dmdStonePurchase() : purchaseAddon(purchaseView)}
  `;
}

function moduleSwitcher(title, items, current, attr) {
  return `
    <section class="panel module-switcher">
      <div>
        <p class="eyebrow">${title}</p>
        <h2>${current}</h2>
      </div>
      <div class="module-tabs">
        ${items.map((item) => `<button class="module-tab ${current === item ? "active" : ""}" ${attr}="${item}">${item}</button>`).join("")}
      </div>
    </section>
  `;
}

function additionalOrderAdvance() {
  const order = findSalesOrderForAdvance(orderAdvanceDraft.pickOrder);
  const summary = orderAdvanceSummary(order, orderAdvanceDraft, "advance");
  return `
    <section class="classic-billing-shell clean-entry-shell order-advance-shell panel">
      ${orderAdvanceToolbar("advance")}
      <div class="order-advance-window">
        ${orderAdvanceEntryPanel("advance", orderAdvanceDraft, summary)}
        ${orderAdvanceDetailsPanel(order, summary, "advance")}
      </div>
    </section>
  `;
}

function orderAdvanceRefund() {
  const order = findSalesOrderForAdvance(orderAdvanceRefundDraft.pickOrder);
  const summary = orderAdvanceSummary(order, orderAdvanceRefundDraft, "refund");
  return `
    <section class="classic-billing-shell clean-entry-shell order-advance-shell panel">
      ${orderAdvanceToolbar("refund")}
      <div class="order-advance-window">
        ${orderAdvanceEntryPanel("refund", orderAdvanceRefundDraft, summary)}
        ${orderAdvanceDetailsPanel(order, summary, "refund")}
      </div>
    </section>
  `;
}

function orderAdvanceToolbar(type) {
  const isRefund = type === "refund";
  const buttons = isRefund
    ? [["New", "new-order-refund"], ["Save F9", "save-order-refund"], ["Refresh", "retrieve-order-refund"], ["Delete", "delete-order-refund"], ["Print", "print-order-advance"], ["Close", "close-order-advance"]]
    : [["New", "new-order-advance"], ["Save F9", "save-order-advance"], ["Find", "retrieve-order-advance"], ["Print", "print-order-advance"], ["Delete", "delete-order-advance"], ["Close", "close-order-advance"]];
  return `<div class="entry-actions body-toolbar order-advance-toolbar">${buttons.map(([label, action]) => toolbarButton(label, action)).join("")}${isRefund ? `<button class="toolbar-button muted-toolbar-button" disabled>Search</button>` : ""}</div>`;
}

function orderAdvanceEntryPanel(type, draft, summary) {
  const isRefund = type === "refund";
  return `
    <div class="order-advance-panel order-entry-panel">
      <div class="order-pick-row">
        <span>Pick Sales Order</span>
        <input data-order-${type}-field="pickOrder" value="${draft.pickOrder || ""}" />
        <button class="classic-red-button" data-action="retrieve-order-${isRefund ? "refund" : "advance"}">Retrieve</button>
      </div>
      <div class="order-advance-form-grid">
        ${orderAdvanceDualField(type, "Gold Rate", "goldRateGram", "goldRateEightGram", draft.goldRateGram, draft.goldRateEightGram)}
        ${orderAdvanceDualField(type, "Entry No, Ref No", "entryNo", "refNo", draft.entryNo, draft.refNo, "text")}
        ${orderAdvanceDateTimeField(type, draft)}
        ${orderAdvanceSelectField(type, "Prepared By", "preparedBy", draft.preparedBy, staffNameOptions())}
        ${isRefund ? "" : orderAdvanceSelectField(type, "Payment Mode", "paymentMode", draft.paymentMode, ["Cash", "Credit", "Bank", "Mixed"])}
        ${isRefund ? "" : orderAdvanceSelectField(type, "Cash/Bank", "cashBank", draft.cashBank, cashBankOptions())}
        ${isRefund ? orderAdvanceAmountField(type, "Refund Amount", "refundAmount", draft.refundAmount) : ""}
        ${isRefund ? "" : orderAdvanceAmountField(type, "Additional Advance", "advanceAmount", draft.advanceAmount)}
        ${isRefund ? "" : orderAdvanceReadonlyAmount("Entry Total", moneyValue(summary.draftTotalAmount), "draftTotal")}
        <label class="classic-field order-advance-remark"><span>Remark</span><textarea data-order-${type}-field="remark">${draft.remark || ""}</textarea></label>
      </div>
    </div>
  `;
}

function orderAdvanceDetailsPanel(order, summary, type) {
  const isRefund = type === "refund";
  return `
    <div class="order-advance-panel order-details-panel">
      <h3>Sales Order Details</h3>
      <div class="order-advance-form-grid">
        ${orderAdvanceReadonlyDual("Order No, Ref No", order?.entryNo || "", order?.refNo || "")}
        ${orderAdvanceReadonlyDual("Ord Date, Delvry Date", order?.date || "", order?.dueDate || "")}
        <label class="classic-field order-advance-remark"><span>Party Details</span><textarea readonly>${orderPartyDetails(order)}</textarea></label>
        ${orderAdvanceReadonlyStaff("Prepared By", order?.staffName || order?.preparedBy || "")}
        ${orderAdvanceReadonlyAmount("Quotation Amount", moneyValue(summary.approximate))}
        ${orderAdvanceReadonlyAmount("Original Advance", moneyValue(summary.baseAdvance))}
        ${orderAdvanceReadonlyAmount("Additional Advance", moneyValue(summary.additionalAdvance))}
        ${orderAdvanceReadonlyAmount("Advance Refund", moneyValue(summary.advanceRefund))}
        ${orderAdvanceReadonlyAmount("Available Advance", moneyValue(summary.netAdvance), "emphasis")}
        ${orderAdvanceReadonlyAmount("Quotation Less Advance", moneyValue(summary.quoteBalance))}
        <label class="classic-field order-advance-remark"><span>Remark</span><textarea readonly>${latestOrderRemark(order, type)}</textarea></label>
      </div>
    </div>
  `;
}

function orderAdvanceDualField(type, label, leftField, rightField, leftValue, rightValue, inputMode = "decimal") {
  return `
    <label class="classic-field split-field"><span>${label}</span><span class="field-pair">
      <input data-order-${type}-field="${leftField}" inputmode="${inputMode}" value="${inputMode === "decimal" ? numericValue(leftValue, 3) : leftValue || ""}" />
      <input data-order-${type}-field="${rightField}" inputmode="${inputMode}" value="${inputMode === "decimal" ? numericValue(rightValue, 3) : rightValue || ""}" />
    </span></label>
  `;
}

function orderAdvanceAmountField(type, label, field, value, inputMode = "decimal") {
  return `
    <label class="classic-field"><span>${label}</span>
      <input data-order-${type}-field="${field}" inputmode="${inputMode}" value="${inputMode === "decimal" ? moneyValue(value) : value || ""}" />
    </label>
  `;
}

function orderAdvanceDateTimeField(type, draft) {
  return `
    <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair">
      <input type="date" data-order-${type}-field="date" value="${toDateInputValue(draft.date)}" />
      <input data-order-${type}-field="time" value="${draft.time || nowTimeWithSeconds()}" />
    </span></label>
  `;
}

function orderAdvanceSelectField(type, label, field, value, options) {
  return `<label class="classic-field"><span>${label}</span><select data-order-${type}-field="${field}">${options.map((option) => `<option ${String(option) === String(value) ? "selected" : ""}>${option}</option>`).join("")}</select></label>`;
}

function orderAdvanceReadonlyDual(label, leftValue, rightValue, variant = "") {
  const leftLive = variant === "draftTotal" ? ` data-order-live="draftTotalAmount"` : "";
  const rightLive = variant === "draftTotal" ? ` data-order-live="draftTotalWeight"` : "";
  return `
    <label class="classic-field split-field readonly-dual ${variant}"><span>${label}</span><span class="field-pair">
      <input${leftLive} value="${leftValue ?? ""}" readonly />
      <input${rightLive} value="${rightValue ?? ""}" readonly />
    </span></label>
  `;
}

function orderAdvanceReadonlyAmount(label, value, variant = "") {
  const live = variant === "draftTotal" ? ` data-order-live="draftTotalAmount"` : "";
  return `
    <label class="classic-field readonly-dual ${variant}"><span>${label}</span>
      <input${live} value="${value ?? ""}" readonly />
    </label>
  `;
}

function orderAdvanceReadonlyStaff(label, value) {
  return `<label class="classic-field"><span>${label}</span>${readonlyEmployeeDropdown(value)}</label>`;
}

function staffNameOptions() {
  const names = (state.staffs || []).map((staff) => staff.name).filter(Boolean);
  return names.length ? names : ["Goldland Staff"];
}

function agentNameOptions(includeBlank = true) {
  const agents = (state.miscellaneous?.agents || seed.miscellaneous?.agents || []).map((agent) => agent.name).filter(Boolean);
  const staff = staffNameOptions();
  return [...new Set([...(includeBlank ? [""] : []), ...agents, ...staff])];
}

function cashBankOptions() {
  const cardMasters = state.miscellaneous?.cardMasters || [];
  const cardBanks = cardMasters.map((item) => item.bank || item.name).filter(Boolean);
  return [...new Set(["Cash in Hand", "Scheme Cash", "Canara Bank Edak", "Federal Bank Edak", "UPI Payment", "Bank", ...cardBanks])];
}

function findSalesOrderForAdvance(value) {
  const pick = String(value || "").trim();
  const orders = state.salesOrders || [];
  if (!pick) return salesOrderBill();
  return orders.find((order) => [order.id, order.entryNo, order.refNo, order.billNo].filter(Boolean).some((field) => String(field).toLowerCase() === pick.toLowerCase())) || null;
}

function orderAdvanceSummary(order, draft = {}, draftType = "advance") {
  if (!order) return emptyOrderAdvanceSummary(draft, draftType);
  const financials = billFinancials(order);
  const baseAdvance = Number(order.paymentBreakup?.cash || 0) + Number(order.adjustments?.card || 0);
  const advances = orderAdvanceRecords(order, "advance");
  const refunds = orderAdvanceRecords(order, "refund");
  const savedAdditional = advances.reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);
  const savedRefund = refunds.reduce((sum, item) => sum + Number(item.refundAmount || 0), 0);
  const draftAdvance = draftType === "advance" ? Number(draft.advanceAmount || 0) : 0;
  const draftRefund = draftType === "refund" ? Number(draft.refundAmount || 0) : 0;
  const approximateWeight = sumField(order.sections?.sales || [], "net");
  const additionalAdvance = savedAdditional + draftAdvance;
  const advanceRefund = savedRefund + draftRefund;
  const netAdvance = baseAdvance + additionalAdvance - advanceRefund;
  const quoteBalance = financials.invoiceTotal - netAdvance;
  return {
    approximate: financials.invoiceTotal,
    approximateWeight,
    baseAdvance,
    baseAdvanceWeight: 0,
    exchangeTotal: financials.exchangeTotal,
    exchangeWeight: 0,
    returnTotal: financials.returnTotal,
    returnWeight: 0,
    additionalAdvance,
    additionalAdvanceWeight: 0,
    advanceRefund,
    advanceRefundWeight: 0,
    netAdvance,
    netAdvanceWeight: 0,
    balance: netAdvance,
    quoteBalance,
    balanceWeight: 0,
    draftTotalAmount: draftAdvance,
    draftTotalWeight: 0
  };
}

function emptyOrderAdvanceSummary(draft = {}, draftType = "advance") {
  const draftTotalAmount = draftType === "advance" ? Number(draft.advanceAmount || 0) : 0;
  return { approximate: 0, approximateWeight: 0, baseAdvance: 0, baseAdvanceWeight: 0, exchangeTotal: 0, exchangeWeight: 0, returnTotal: 0, returnWeight: 0, additionalAdvance: draftTotalAmount, additionalAdvanceWeight: 0, advanceRefund: Number(draft.refundAmount || 0), advanceRefundWeight: 0, netAdvance: 0, netAdvanceWeight: 0, balance: 0, quoteBalance: 0, balanceWeight: 0, draftTotalAmount, draftTotalWeight: 0 };
}

function orderAdvanceRecords(order, type) {
  const source = type === "refund" ? state.orderAdvanceRefunds || [] : state.orderAdvances || [];
  return source.filter((item) => orderAdvanceRecordMatchesOrder(item, order));
}

function orderAdvanceRecordMatchesOrder(item, order) {
  if (!order) return false;
  const orderKeys = [order.id, order.entryNo, order.refNo, order.billNo].filter(Boolean).map(String);
  return [item.orderId, item.orderEntryNo, item.orderRefNo].filter(Boolean).some((field) => orderKeys.includes(String(field)));
}

function orderPartyDetails(order) {
  if (!order) return "";
  return [order.customer || order.partyName || "", order.address || "", order.phone ? `Phone: ${order.phone}` : ""].filter(Boolean).join("\n");
}

function latestOrderRemark(order, type) {
  const records = orderAdvanceRecords(order, type === "refund" ? "refund" : "advance");
  return records[0]?.remark || "";
}

function billing() {
  const latestBill = state.bills[0];
  const billsToday = todayBills();
  const sections = billingSections(latestBill);
  const current = sections[billingView] || sections.Sales;
  return `
    <section class="classic-billing-shell clean-entry-shell panel">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Save (F9)", "save-current-bill")}
        ${toolbarButton("Edit", "edit-current-bill")}
        ${toolbarButton("Delete", "void-bill")}
        ${toolbarButton("Repost", "repost-bill")}
        ${toolbarButton("Previous", "previous-bill")}
        ${toolbarButton("Next", "next-bill")}
        ${toolbarButton("Print", "print-last-bill")}
        ${toolbarButton("Settings", "billing-settings")}
        ${toolbarButton("Notes", "billing-notes")}
        ${toolbarButton("Refresh", "refresh")}
        ${toolbarButton("Close", "close-billing")}
        <strong class="classic-rate">Rate: ${latestBill?.rateSnapshot || "No active rate"}</strong>
        <button class="toolbar-button help-button" data-action="help">Help</button>
      </div>
      ${classicBillHeader(latestBill)}
      <div class="classic-tabs">
        ${["Sales", "Exchange", "Return"].map((item) => `<button class="bill-tab ${billingView === item ? "active" : ""}" data-billing-view="${item}">${item} ${item === "Sales" ? "(F4)" : item === "Exchange" ? "(F7)" : "(F6)"}</button>`).join("")}
      </div>
      ${classicBillingSection(billingView, current.rows, current.entryColumns, current.entryMapper, current.columns, current.mapper)}
      ${classicTotalStrip(latestBill, billingView)}
      ${billingTotals(latestBill)}
    </section>
    <details class="panel billing-register-drawer">
      <summary>Today's Bill Register and Customer Copy</summary>
      <div class="split">
        <div class="invoice-preview-panel">
          <div class="panel-head">
            <h2>Customer Bill Preview</h2>
            <button class="secondary" data-action="print-last-bill">Print</button>
          </div>
          ${invoicePreview(latestBill)}
        </div>
        <div>
          <div class="panel-head">
            <h2>Today's Bill Register</h2>
            <span class="soft-note">${billsToday.length} bills today</span>
          </div>
          ${billsToday.length ? table(["Entry No", "Bill No", "Date", "Staff ID", "Staff", "Customer ID", "Customer", "Sales", "Exchange", "Return", "Invoice Total", "Cash Received", "Balance"], billsToday.map(billRow)) : `<p class="soft-note">No bills posted today yet.</p>`}
        </div>
      </div>
    </details>
  `;
}

function salesOrder() {
  const order = salesOrderBill();
  const sections = {
    "Sales Order": {
      rows: order?.sections.sales || [],
      entryColumns: salesOrderEntryColumns(),
      entryRow: salesOrderEntryRow(defaultEntryLine("order")),
      columns: salesOrderColumns(),
      rowsMapped: (order?.sections.sales || []).map(salesOrderRow)
    },
    Exchange: {
      rows: order?.sections.exchange || [],
      entryColumns: salesOrderExchangeEntryColumns(),
      entryRow: salesOrderExchangeEntryRow(defaultEntryLine("exchange")),
      columns: salesOrderExchangeColumns(),
      rowsMapped: (order?.sections.exchange || []).map(salesOrderExchangeRow)
    },
    Return: {
      rows: order?.sections.return || [],
      entryColumns: salesOrderReturnEntryColumns(),
      entryRow: salesOrderReturnEntryRow(defaultEntryLine("return")),
      columns: salesOrderReturnColumns(),
      rowsMapped: (order?.sections.return || []).map(salesOrderReturnRow)
    }
  };
  const current = sections[salesOrderView] || sections["Sales Order"];
  return `
    <section class="classic-billing-shell clean-entry-shell panel sales-order-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Refresh", "refresh")}
        ${toolbarButton("Save", "save-current-bill")}
        ${toolbarButton("Edit", "edit-current-bill")}
        ${toolbarButton("Delete", "void-bill")}
        ${toolbarButton("Close Order", "close-billing")}
        ${toolbarButton("Previous", "previous-bill")}
        ${toolbarButton("Next", "next-bill")}
        ${toolbarButton("Print", "print-last-bill")}
        ${toolbarButton("Settings", "billing-settings")}
        ${toolbarButton("Close", "close-billing")}
        <strong class="classic-rate">Rate: ${order?.rateSnapshot || "No active rate"}</strong>
        <strong class="classic-rate small-rate">Counter: C1</strong>
      </div>
      ${salesOrderHeader(order)}
      <div class="classic-tabs">
        ${["Sales Order", "Exchange", "Return"].map((item) => `<button class="bill-tab ${salesOrderView === item ? "active" : ""}" data-order-view="${item}">${item} ${item === "Sales Order" ? "(F4)" : item === "Exchange" ? "(F7)" : "(F6)"}</button>`).join("")}
      </div>
      ${classicTransactionTable(`sales-order ${salesOrderView === "Sales Order" ? "sales-order-main" : ""}`, current.entryColumns, current.entryRow, current.columns, current.rowsMapped)}
      ${classicTotalStrip(order, salesOrderView)}
      ${salesOrderTotals(order)}
    </section>
  `;
}

function transactionLauncherPage(title, note, actions = []) {
  return `
    <section class="panel transaction-hero">
      <div>
        <p class="eyebrow">Simple transaction shortcut</p>
        <h2>${title}</h2>
        <p>${note}</p>
      </div>
    </section>
    <section class="grid transaction-grid compact-transaction-grid">
      <article class="transaction-card">
        <div class="transaction-card-head">
          <div>
            <h3>${title}</h3>
            <p>Kept from the old transaction menu, but placed in the right work area.</p>
          </div>
        </div>
        <div class="transaction-list">
          ${actions.map(([label, value, attr]) => attr ? `<button class="transaction-row" ${attr}="${value}"><span>${label}</span></button>` : `<button class="transaction-row" data-action="${value}"><span>${label}</span></button>`).join("")}
        </div>
      </article>
    </section>
  `;
}

function purchaseAddon(view) {
  const configs = {
    "Diamond Purchase": ["Purchase diamond stock with carat, color, clarity and selling-rate details.", "open-transaction-diamond-purchase"],
    "Diamond Purchase Return": ["Return diamond purchase stock to supplier.", "open-transaction-diamond-purchase-return"],
    "Direct Purchase": ["Record direct purchase without the regular supplier invoice flow.", "open-transaction-direct-purchase"],
    "Direct Purchase Return": ["Reverse a direct purchase entry.", "open-transaction-direct-purchase-return"],
    "DMD Stone Purchase": ["Purchase loose DMD stones using the diamond stock structure.", "open-transaction-dmd-stone-purchase"]
  };
  const [note, action] = configs[view] || ["Open purchase-related transaction.", "open-transaction-purchase"];
  return transactionLauncherPage(view, note, [["Open Related Entry", action], ["Go To Purchase Invoice", "Purchase Invoice", "data-purchase-section"]]);
}

function salesReturn() {
  const bill = state.bills[0];
  const rows = bill?.sections.return?.length ? bill.sections.return : [normalizeBillLine({ itemName: "Returned Item", description: "From sales bill", qty: 1, gross: 4.82, stone: 0, wastage: 0, stoneCharge: 0, rate: 9020, va: 3, makingCharge: 1200, taxPct: 3 }, 0, {}, "return")];
  const totals = rows.reduce((sum, row) => sum + Number(row.amount || row.itemTotal || 0), 0);
  return `
    <section class="classic-billing-shell clean-entry-shell panel">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Refresh", "refresh")}
        ${toolbarButton("Save", "save-current-bill")}
        ${toolbarButton("Edit", "edit-current-bill")}
        ${toolbarButton("Delete", "void-bill")}
        ${toolbarButton("Previous", "previous-bill")}
        ${toolbarButton("Next", "next-bill")}
        ${toolbarButton("Print", "print-last-bill")}
        ${toolbarButton("Pick From Sales", "pick-from-sales")}
        ${toolbarButton("Close", "close-billing")}
        <strong class="classic-rate">Gold Rate ${money(latestRates().find((rateItem) => rateItem.type === "Gold" && rateItem.grade === "22K")?.price || 0)}</strong>
        <strong class="classic-rate small-rate">Silver Rate ${money(latestRates().find((rateItem) => rateItem.type === "Silver")?.price || 0)}</strong>
      </div>
      ${transactionHeader("Return", bill, { headerClass: "sales-return-header", partyLabel: "Customer", nameLabel: "Customer Name", preparedLabel: "Prepared By", staffSelect: true })}
      ${classicTransactionTable("sales-return", returnEntryColumns(), returnEntryRow(defaultEntryLine("return")), returnColumns(), rows.map(returnRow))}
      ${returnTotals(totals)}
    </section>
  `;
}

function purchaseEntry() {
  const bill = purchaseBill();
  const rows = purchaseRows();
  const totals = purchaseFinancials(rows);
  return `
    <section class="classic-billing-shell clean-entry-shell panel purchase-entry-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Refresh", "refresh")}
        ${toolbarButton("Save F9", "save-current-bill")}
        ${toolbarButton("Delete Row", "void-bill")}
        ${toolbarButton("Edit", "edit-current-bill")}
        ${toolbarButton("Previous", "previous-bill")}
        ${toolbarButton("Next", "next-bill")}
        ${toolbarButton("Print", "print-last-bill")}
        ${toolbarButton("Delete", "void-bill")}
        ${toolbarButton("Close", "close-billing")}
        <strong class="classic-rate">Gold Rate ${money(latestRates().find((rateItem) => rateItem.type === "Gold" && rateItem.grade === "22K")?.price || 0)}</strong>
        <strong class="classic-rate small-rate">Silver Rate ${money(latestRates().find((rateItem) => rateItem.type === "Silver")?.price || 0)}</strong>
      </div>
      ${purchaseInvoiceHeader(bill)}
      ${classicTransactionTable("purchase-entry", purchaseEntryColumns(), purchaseEntryRow(defaultEntryLine("purchase")), purchaseColumns(), rows.map(purchaseRow))}
      ${classicTotalStrip(bill, "Purchase")}
      ${purchaseTotals(totals, true)}
    </section>
  `;
}

function purchaseReturn() {
  const bill = purchaseBill();
  const rows = purchaseRows();
  const totals = purchaseFinancials(rows);
  return `
    <section class="classic-billing-shell clean-entry-shell panel purchase-entry-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Save F9", "save-current-bill")}
        ${toolbarButton("Refresh", "refresh")}
        ${toolbarButton("Delete Row", "void-bill")}
        ${toolbarButton("Edit", "edit-current-bill")}
        ${toolbarButton("Previous", "previous-bill")}
        ${toolbarButton("Next", "next-bill")}
        ${toolbarButton("Print", "print-last-bill")}
        ${toolbarButton("Delete", "void-bill")}
        ${toolbarButton("Close", "close-billing")}
        <strong class="classic-rate">Gold Rate ${money(latestRates().find((rateItem) => rateItem.type === "Gold" && rateItem.grade === "22K")?.price || 0)}</strong>
      </div>
      ${purchaseReturnHeader(bill)}
      ${classicTransactionTable("purchase-return", purchaseReturnEntryColumns(), purchaseReturnEntryRow(defaultEntryLine("purchase")), purchaseReturnColumns(), rows.map(purchaseReturnRow))}
      ${purchaseReturnTotals(totals)}
    </section>
  `;
}

function diamondPurchase() {
  state.diamondPurchases ||= [normalizeDiamondPurchaseBill()];
  state.diamondPurchases[0] = normalizeDiamondPurchaseBill(state.diamondPurchases[0]);
  const bill = state.diamondPurchases[0];
  const totals = diamondPurchaseFinancials(bill);
  return `
    <section class="classic-billing-shell clean-entry-shell panel purchase-entry-shell diamond-purchase-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Save F9", "save-current-bill")}
        ${toolbarButton("Refresh", "refresh")}
        ${toolbarButton("Edit", "edit-current-bill")}
        ${toolbarButton("Previous", "previous-bill")}
        ${toolbarButton("Next", "next-bill")}
        ${toolbarButton("Barcode", "open-stock")}
        ${toolbarButton("Print", "print-last-bill")}
        ${toolbarButton("Delete", "void-bill")}
        ${toolbarButton("Close", "close-billing")}
        <strong class="classic-rate">Gold Rate ${money(activeGoldRate())}</strong>
      </div>
      ${diamondPurchaseHeader(bill)}
      ${classicTransactionTable("diamond-purchase-ornament", dmdWholesaleEntryColumns(), dmdWholesaleEntryRow(defaultDmdWholesaleLine()), dmdReturnOpColumns(), bill.ornamentLines.map(diamondPurchaseOrnamentRow))}
      ${classicTransactionTable("diamond-purchase-stone", dmdStoneEntryColumns(), dmdStoneEntryRow(defaultDmdStoneLine()), dmdStoneColumns(), bill.diamondLines.map(diamondPurchaseStoneRow))}
      ${diamondPurchaseTotals(totals)}
    </section>
  `;
}

function diamondPurchaseReturn() {
  state.diamondPurchaseReturns ||= [normalizeDiamondPurchaseReturnBill()];
  state.diamondPurchaseReturns[0] = normalizeDiamondPurchaseReturnBill(state.diamondPurchaseReturns[0]);
  const bill = state.diamondPurchaseReturns[0];
  const totals = diamondPurchaseReturnFinancials(bill);
  return `
    <section class="classic-billing-shell clean-entry-shell panel purchase-entry-shell diamond-purchase-shell diamond-purchase-return-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Save F9", "save-current-bill")}
        ${toolbarButton("Refresh", "refresh")}
        ${toolbarButton("Edit", "edit-current-bill")}
        ${toolbarButton("Delete", "void-bill")}
        ${toolbarButton("Print", "print-last-bill")}
        ${toolbarButton("Close", "close-billing")}
        <strong class="classic-rate">Gold Rate ${money(activeGoldRate())}</strong>
      </div>
      ${diamondPurchaseReturnHeader(bill)}
      ${classicTransactionTable("diamond-purchase-return-ornament", diamondPurchaseReturnEntryColumns(), diamondPurchaseReturnEntryRow(defaultDiamondPurchaseReturnLine()), diamondPurchaseReturnColumns(), bill.ornamentLines.map(diamondPurchaseReturnOrnamentRow))}
      ${classicTransactionTable("diamond-purchase-return-stone", dmdStoneEntryColumns(), dmdStoneEntryRow(defaultDmdStoneLine()), dmdStoneColumns(), bill.diamondLines.map(diamondPurchaseReturnStoneRow))}
      ${diamondPurchaseReturnTotals(totals)}
    </section>
  `;
}

function dmdStonePurchase() {
  state.dmdStonePurchases ||= [normalizeDmdStonePurchaseBill()];
  state.dmdStonePurchases[0] = normalizeDmdStonePurchaseBill(state.dmdStonePurchases[0]);
  const bill = state.dmdStonePurchases[0];
  const totals = dmdStonePurchaseFinancials(bill);
  return `
    <section class="classic-billing-shell clean-entry-shell panel dmd-stone-purchase-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Refresh", "refresh")}
        ${toolbarButton("Save F9", "save-dmd-stone-purchase")}
        ${toolbarButton("Edit", "edit-dmd-stone-purchase")}
        ${toolbarButton("Print", "print-dmd-stone-purchase")}
        ${toolbarButton("Barcode", "barcode-dmd-stone-purchase")}
        ${toolbarButton("Delete", "delete-dmd-stone-purchase")}
        ${toolbarButton("Close", "close-purchase")}
        <span class="toolbar-spacer"></span>
        <label class="rate-chip"><span>Gold Rate</span><input value="${moneyValue(activeGoldRate())}" readonly /></label>
      </div>
      ${dmdStonePurchaseHeader(bill)}
      ${classicTransactionTable("dmd-stone-purchase", dmdStonePurchaseEntryColumns(), dmdStonePurchaseEntryRow(defaultDmdStoneLine()), dmdStonePurchaseColumns(), bill.lines.map(dmdStonePurchaseRow))}
      ${dmdStonePurchaseTotals(totals)}
    </section>
  `;
}

function directPurchase() {
  state.directPurchases ||= [normalizeDirectPurchaseBill()];
  state.directPurchases[0] = normalizeDirectPurchaseBill(state.directPurchases[0]);
  const bill = state.directPurchases[0];
  const totals = directPurchaseFinancials(bill);
  return `
    <section class="classic-billing-shell clean-entry-shell panel purchase-entry-shell direct-purchase-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Refresh", "refresh")}
        ${toolbarButton("Save F9", "save-current-bill")}
        ${toolbarButton("Delete Row", "void-bill")}
        ${toolbarButton("Edit", "edit-current-bill")}
        ${toolbarButton("Previous", "previous-bill")}
        ${toolbarButton("Next", "next-bill")}
        ${toolbarButton("Print", "print-last-bill")}
        ${toolbarButton("Delete", "void-bill")}
        ${toolbarButton("Close", "close-billing")}
        <strong class="classic-rate">Gold Rate ${money(activeGoldRate())}</strong>
        <strong class="classic-rate small-rate">Silver Rate ${money(latestRates().find((rateItem) => rateItem.type === "Silver")?.price || 0)}</strong>
      </div>
      ${directPurchaseHeader(bill)}
      ${classicTransactionTable("direct-purchase", directPurchaseEntryColumns(), directPurchaseEntryRow(defaultDirectPurchaseLine()), directPurchaseColumns(), bill.lines.map(directPurchaseRow))}
      ${directPurchaseTotals(totals)}
    </section>
  `;
}

function directPurchaseReturn() {
  state.directPurchaseReturns ||= [normalizeDirectPurchaseReturnBill()];
  state.directPurchaseReturns[0] = normalizeDirectPurchaseReturnBill(state.directPurchaseReturns[0]);
  const bill = state.directPurchaseReturns[0];
  const totals = directPurchaseFinancials(bill);
  return `
    <section class="classic-billing-shell clean-entry-shell panel purchase-entry-shell direct-purchase-shell direct-purchase-return-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Refresh", "refresh")}
        ${toolbarButton("Save F9", "save-current-bill")}
        ${toolbarButton("Delete Row", "void-bill")}
        ${toolbarButton("Edit", "edit-current-bill")}
        ${toolbarButton("Previous", "previous-bill")}
        ${toolbarButton("Next", "next-bill")}
        ${toolbarButton("Print", "print-last-bill")}
        ${toolbarButton("Delete", "void-bill")}
        ${toolbarButton("Close", "close-billing")}
        <strong class="classic-rate">Gold Rate ${money(activeGoldRate())}</strong>
        <strong class="classic-rate small-rate">Silver Rate ${money(latestRates().find((rateItem) => rateItem.type === "Silver")?.price || 0)}</strong>
      </div>
      ${directPurchaseHeader(bill, { isReturn: true })}
      ${classicTransactionTable("direct-purchase-return", directPurchaseEntryColumns(), directPurchaseEntryRow(defaultDirectPurchaseLine()), directPurchaseReturnColumns(), bill.lines.map(directPurchaseReturnRow))}
      ${directPurchaseTotals(totals)}
    </section>
  `;
}

function todayBills() {
  const today = new Date().toLocaleDateString("en-GB");
  return state.bills.filter((bill) => sameDate(bill.date, today));
}

function sameDate(left, right) {
  return String(left || "").replaceAll("-", "/") === String(right || "").replaceAll("-", "/");
}

function billingSections(bill) {
  return {
    Sales: {
      rows: bill?.sections.sales || [],
      entryColumns: salesEntryColumns(),
      entryMapper: salesEntryRow,
      columns: salesColumns(),
      mapper: salesRow,
      note: "New ornaments, diamond sales and normal invoice items."
    },
    Exchange: {
      rows: bill?.sections.exchange || [],
      entryColumns: exchangeEntryColumns(),
      entryMapper: exchangeEntryRow,
      columns: exchangeColumns(),
      mapper: exchangeRow,
      note: "Old gold, purchase weight and exchange value entries."
    },
    Return: {
      rows: bill?.sections.return || [],
      entryColumns: returnEntryColumns(),
      entryMapper: returnEntryRow,
      columns: returnColumns(),
      mapper: returnRow,
      note: "Sales return items and refund or adjustment value."
    }
  };
}

function billFinancials(bill) {
  if (!bill) return { salesTotal: 0, exchangeTotal: 0, returnTotal: 0, discountTotal: 0, taxTotal: 0, totalAdjustments: 0, invoiceTotal: 0, cashReceived: 0, balance: 0, refundAmount: 0, paymentLabel: "No cash payment needed" };
  const salesTotal = sumLines(bill.sections.sales);
  const exchangeTotal = sumLines(bill.sections.exchange);
  const returnTotal = sumLines(bill.sections.return);
  const salesOrder = Number(bill.adjustments?.salesOrder || 0);
  const coupon = Number(bill.adjustments?.coupon || 0);
  const flatDiscount = Number(bill.totals?.flatDiscount || bill.discount || 0);
  const addition = Number(bill.totals?.addition || 0);
  const dmdAmount = Number(bill.totals?.dmdAmount || 0);
  const kfcGstAmount = Number(bill.totals?.kfcGstAmount || 0);
  const rateDifference = Number(bill.totals?.rateDifference || 0);
  const paymentBreakup = normalizePaymentBreakup(bill.paymentBreakup);
  const paymentTotal = paymentBreakup.cash + paymentBreakup.gpay + paymentBreakup.card + paymentBreakup.bank + paymentBreakup.other;
  const baseCashReceived = paymentTotal > 0 ? Number(bill.paid || 0) : Number(bill.totals?.cashReceived || bill.paid || 0);
  const cashReceived = baseCashReceived + paymentTotal;
  const discountTotal = flatDiscount + coupon;
  const totalAdjustments = exchangeTotal + returnTotal + salesOrder + discountTotal;
  const taxTotal = ["sales", "return", "exchange"].reduce((sum, section) => {
    return sum + (bill.sections?.[section] || []).reduce((inner, line) => line.inactive ? inner : inner + Number(line.tax || 0), 0);
  }, 0);
  const invoiceTotal = salesTotal - exchangeTotal - returnTotal - salesOrder - discountTotal + addition + dmdAmount + kfcGstAmount + rateDifference;
  const ledgerAndRoundOff = Number(bill.totals?.ledgerBalance || 0) + Number(bill.totals?.billAmountRoundOff || 0);
  const netDue = invoiceTotal - cashReceived + ledgerAndRoundOff;
  const balance = Math.abs(netDue);
  const refundAmount = netDue < 0 ? Math.abs(netDue) : 0;
  const paymentLabel = netDue > 0 ? "Cash to be received from customer" : netDue < 0 ? "Cash to be paid/refunded to customer" : "No cash payment needed";
  return { salesTotal, exchangeTotal, returnTotal, discountTotal, taxTotal, totalAdjustments, invoiceTotal, cashReceived, balance, refundAmount, paymentLabel };
}

function applyBillFinancials(bill) {
  if (!bill) return billFinancials();
  const financials = billFinancials(bill);
  bill.adjustments = {
    ...bill.adjustments,
    salesReturn: financials.returnTotal,
    exchange: financials.exchangeTotal,
    totalAdjustments: financials.totalAdjustments
  };
  bill.totals = {
    ...bill.totals,
    salesTotal: financials.salesTotal,
    discountTotal: financials.discountTotal,
    taxTotal: financials.taxTotal,
    invoiceTotal: financials.invoiceTotal,
    cashReceived: financials.cashReceived,
    balance: financials.balance,
    refundAmount: financials.refundAmount
  };
  bill.amount = financials.invoiceTotal;
  bill.balance = financials.balance;
  bill.taxAmount = financials.taxTotal;
  return financials;
}

function complimentaryModule() {
  const items = ["Complimentary Item Purchase", "Complimentary Item Issue"];
  if (!items.includes(complimentaryView)) complimentaryView = items[0];
  return `
    ${moduleSwitcher("Work Orders", WORK_ORDER_ITEMS, "Complimentary Item", "data-work-section")}
    ${moduleSwitcher("Complimentary Item", items, complimentaryView, "data-complimentary-section")}
    ${complimentaryView === "Complimentary Item Issue" ? complimentaryIssueScreen() : complimentaryPurchaseScreen()}
    ${complimentaryStockPanel()}
    ${complimentaryRegisterPanel()}
  `;
}

function complimentaryStockPanel() {
  rebuildComplimentaryStock();
  const rows = (state.complimentaryStock || []).map((item) => [
    item.itemId || "-",
    item.itemName,
    item.unit,
    numericValue(item.purchased, 2),
    numericValue(item.issued, 2),
    numericValue(item.balance, 2)
  ]);
  return `
    <section class="panel complimentary-register-panel">
      <div class="panel-head"><h2>Complimentary Stock Balance</h2></div>
      ${table(["Item ID", "Item Name", "Unit", "Purchased", "Issued", "Balance"], rows.length ? rows : [["-", "No complimentary stock yet", "-", "0", "0", "0"]])}
    </section>
  `;
}

function complimentaryRegisterPanel() {
  const isPurchase = complimentaryView === "Complimentary Item Purchase";
  const records = isPurchase ? (state.complimentaryPurchases || []) : (state.complimentaryIssues || []);
  const columns = isPurchase
    ? ["Entry No", "Date", "Party", "Bill Amount", "Invoice Total", "Prepared By", "Load"]
    : ["Entry No", "Date", "Issue Type", "Invoice No", "Prepared By", "Load"];
  const rows = records.map((record) => {
    if (isPurchase) {
      const financials = complimentaryPurchaseFinancials(record);
      return [
        record.entryNo,
        record.date,
        record.partyName || "-",
        moneyValue(financials.billAmount),
        moneyValue(financials.invoiceTotal),
        record.preparedBy || "-",
        `<button class="text-button" data-action="load-complimentary-purchase" data-record-id="${record.id}">Load</button>`
      ];
    }
    return [
      record.entryNo,
      record.date,
      record.issueType || "-",
      record.invoiceNo || "-",
      record.preparedBy || "-",
      `<button class="text-button" data-action="load-complimentary-issue" data-record-id="${record.id}">Load</button>`
    ];
  });
  return `
    <section class="panel complimentary-register-panel">
      <div class="panel-head"><h2>${isPurchase ? "Saved Purchases" : "Saved Issues"}</h2></div>
      ${table(columns, rows.length ? rows : (isPurchase ? [["No purchase entries saved yet", "-", "-", "-", "-", "-", "-"]] : [["No issue entries saved yet", "-", "-", "-", "-", "-"]]))}
    </section>
  `;
}

function complimentaryPurchaseScreen() {
  complimentaryPurchaseDraft = normalizeComplimentaryPurchase(complimentaryPurchaseDraft || defaultComplimentaryPurchase());
  const record = complimentaryPurchaseDraft;
  const financials = complimentaryPurchaseFinancials(record);
  return `
    <section class="classic-billing-shell clean-entry-shell complimentary-shell">
      <div class="complimentary-window-title">Complimentary Item Purchase</div>
      ${complimentaryToolbar("purchase")}
      <div class="complimentary-header">
        <div class="classic-fields left">
          <label class="classic-field split-field"><span>Entry No, Ref No</span><span class="field-pair"><input data-complimentary-purchase-field="entryNo" value="${record.entryNo}" /><input data-complimentary-purchase-field="refNo" value="${record.refNo}" /></span></label>
          <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair"><input data-complimentary-purchase-field="date" value="${record.date}" /><input data-complimentary-purchase-field="time" value="${record.time}" /></span></label>
          <label class="classic-field"><span>Mode</span>${plainSelect("mode", record.mode, ["Credit", "Cash", "Bank"], "data-complimentary-purchase-field")}</label>
        </div>
        <div class="classic-fields right">
          <label class="classic-field split-field"><span>Party Name</span><span class="field-pair staff-pair"><input class="classic-code" data-complimentary-purchase-field="partyId" value="${record.partyId}" />${complimentaryPartyDropdown("partyName", record.partyName, "data-complimentary-purchase-field", "Supplier")}</span></label>
          <label class="classic-field"><span>Address</span><input data-complimentary-purchase-field="address" value="${record.address}" /></label>
          <label class="classic-field split-field"><span>Prepared By</span><span class="field-pair staff-pair"><input class="classic-code" value="${staffCodeForName(record.preparedBy)}" readonly />${employeeDropdown("preparedBy", record.preparedBy, "data-complimentary-purchase-field")}</span></label>
        </div>
      </div>
      ${complimentaryPurchaseTable(record)}
      <div class="complimentary-bottom">
        <div></div>
        <div class="classic-totals compact">
          <label><span>Bill Amount</span><output data-comp-purchase-output="billAmount">${moneyValue(financials.billAmount)}</output></label>
          <label><span>Addition</span><input data-complimentary-purchase-field="addition" inputmode="decimal" value="${moneyValue(financials.addition)}" /></label>
          <label><span>Discount</span><input data-complimentary-purchase-field="discount" inputmode="decimal" value="${moneyValue(financials.discount)}" /></label>
          <label><span>Invoice Total</span><output class="highlight-total" data-comp-purchase-output="invoiceTotal">${moneyValue(financials.invoiceTotal)}</output></label>
        </div>
      </div>
    </section>
  `;
}

function complimentaryIssueScreen() {
  complimentaryIssueDraft = normalizeComplimentaryIssue(complimentaryIssueDraft || defaultComplimentaryIssue());
  const record = complimentaryIssueDraft;
  return `
    <section class="classic-billing-shell clean-entry-shell complimentary-shell">
      <div class="complimentary-window-title">Complimentary Item Issue</div>
      ${complimentaryToolbar("issue")}
      <div class="complimentary-header">
        <div class="classic-fields left">
          <label class="classic-field split-field"><span>Entry No, Ref No</span><span class="field-pair"><input data-complimentary-issue-field="entryNo" value="${record.entryNo}" /><input data-complimentary-issue-field="refNo" value="${record.refNo}" /></span></label>
          <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair"><input data-complimentary-issue-field="date" value="${record.date}" /><input data-complimentary-issue-field="time" value="${record.time}" /></span></label>
          <label class="classic-field"><span>Issue Type</span>${plainSelect("issueType", record.issueType, ["Sales / Issue", "Gift Issue", "Customer Scheme", "Promotion", "Damaged Replacement"], "data-complimentary-issue-field")}</label>
          <label class="classic-field"><span>Invoice No</span><input data-complimentary-issue-field="invoiceNo" value="${record.invoiceNo}" /></label>
        </div>
        <div class="classic-fields right">
          <label class="classic-field split-field"><span>Prepared</span><span class="field-pair staff-pair"><input class="classic-code" value="${staffCodeForName(record.preparedBy)}" readonly />${employeeDropdown("preparedBy", record.preparedBy, "data-complimentary-issue-field")}</span></label>
          <label class="classic-field tall-field"><span>Remarks</span><textarea data-complimentary-issue-field="remarks">${record.remarks}</textarea></label>
        </div>
      </div>
      ${complimentaryIssueTable(record)}
    </section>
  `;
}

function complimentaryToolbar(type) {
  const prefix = type === "purchase" ? "complimentary-purchase" : "complimentary-issue";
  const labels = type === "purchase"
    ? ["Refresh", "Save", "Edit", "Delete", "Print", "Add Row", "Insert Row", "Delete Row", "Del All Rows", "Close"]
    : ["Save", "Edit", "Delete", "Refresh", "Print", "Add Row", "Insert Row", "Delete Row", "Del All Rows", "Close"];
  const actionByLabel = {
    Refresh: `refresh-${prefix}`,
    Save: `save-${prefix}`,
    Edit: `edit-${prefix}`,
    Delete: `delete-${prefix}`,
    Print: `print-${prefix}`,
    "Add Row": `add-${prefix}-row`,
    "Insert Row": `insert-${prefix}-row`,
    "Delete Row": `delete-selected-${prefix}-row`,
    "Del All Rows": `delete-all-${prefix}-rows`,
    Close: "close-complimentary"
  };
  return `<div class="classic-toolbar complimentary-toolbar">${labels.map((label) => toolbarButton(label, actionByLabel[label])).join("")}</div>`;
}

function complimentaryPurchaseTable(record) {
  const lines = record.lines?.length ? record.lines : [defaultComplimentaryPurchaseLine()];
  return `
    <section class="complimentary-table-panel">
      <div class="complimentary-table-wrap">
        <table class="complimentary-table">
          <thead><tr><th>Sl</th><th>ID</th><th>Item Name</th><th>Quantity</th><th>Unit</th><th>FOC</th><th>Price</th><th>Total</th></tr></thead>
          <tbody>${lines.map((line, index) => complimentaryPurchaseRow(line, index)).join("")}</tbody>
        </table>
      </div>
    </section>
  `;
}

function complimentaryPurchaseRow(line, index) {
  const item = normalizeComplimentaryPurchaseLine(line);
  const selected = index === complimentaryPurchaseSelectedRow ? " selected" : "";
  return `
    <tr class="complimentary-row${selected}" data-complimentary-purchase-row="${index}">
      <td>${index + 1}</td>
      <td><input class="grid-input" data-complimentary-purchase-line-field="itemId" data-index="${index}" value="${item.itemId}" /></td>
      <td>${complimentaryItemDropdown(index, item.itemName, "purchase")}</td>
      <td><input class="grid-input numeric" inputmode="decimal" data-complimentary-purchase-line-field="quantity" data-index="${index}" value="${moneyValue(item.quantity)}" /></td>
      <td>${complimentaryLineSelect("unit", item.unit, complimentaryUnitOptions(), "purchase", index)}</td>
      <td><input class="grid-input numeric" inputmode="decimal" data-complimentary-purchase-line-field="foc" data-index="${index}" value="${moneyValue(item.foc)}" /></td>
      <td><input class="grid-input numeric" inputmode="decimal" data-complimentary-purchase-line-field="price" data-index="${index}" value="${moneyValue(item.price)}" /></td>
      <td><output class="grid-output auto-field" data-comp-purchase-row-total="${index}">${moneyValue(item.total)}</output></td>
    </tr>
  `;
}

function complimentaryIssueTable(record) {
  const lines = record.lines?.length ? record.lines : [defaultComplimentaryIssueLine()];
  return `
    <section class="complimentary-table-panel">
      <div class="complimentary-table-wrap">
        <table class="complimentary-table issue">
          <thead><tr><th>Sl</th><th>Item ID</th><th>Item Name</th><th>Quantity</th><th>Unit</th></tr></thead>
          <tbody>${lines.map((line, index) => complimentaryIssueRow(line, index)).join("")}</tbody>
        </table>
      </div>
    </section>
  `;
}

function complimentaryIssueRow(line, index) {
  const item = normalizeComplimentaryIssueLine(line);
  const selected = index === complimentaryIssueSelectedRow ? " selected" : "";
  return `
    <tr class="complimentary-row${selected}" data-complimentary-issue-row="${index}">
      <td>${index + 1}</td>
      <td><input class="grid-input" data-complimentary-issue-line-field="itemId" data-index="${index}" value="${item.itemId}" /></td>
      <td>${complimentaryItemDropdown(index, item.itemName, "issue")}</td>
      <td><input class="grid-input numeric" inputmode="decimal" data-complimentary-issue-line-field="quantity" data-index="${index}" value="${moneyValue(item.quantity)}" /></td>
      <td>${complimentaryLineSelect("unit", item.unit, complimentaryUnitOptions(), "issue", index)}</td>
    </tr>
  `;
}

function transactions() {
  const groups = [
    {
      title: "Sales",
      note: "Customer-facing billing actions.",
      primary: "Sales Invoice",
      actions: [
        ["Sales Invoice", "Ctrl+F2", "open-bill"],
        ["Sales Return", "Ctrl+F3", "set-billing-return"],
        ["DMD Return/DMD OP", "", "open-transaction-dmd-return"],
        ["DMD Sales WholeSales", "", "open-transaction-dmd-wholesale"]
      ]
    },
    {
      title: "Purchase",
      note: "Supplier and old-gold purchase flows.",
      primary: "Purchase Invoice",
      actions: [
        ["Purchase Invoice", "Ctrl+F5", "set-billing-exchange"],
        ["Purchase Return", "Ctrl+F6", "open-transaction-purchase-return"],
        ["Diamond Purchase", "Ctrl+D", "open-transaction-diamond-purchase"],
        ["Diamond Purchase Return", "", "open-transaction-diamond-purchase-return"],
        ["Direct Purchase", "", "open-transaction-direct-purchase"],
        ["Direct Purchase Return", "", "open-transaction-direct-purchase-return"],
        ["DMD Stone Purchase", "", "open-transaction-dmd-stone-purchase"]
      ]
    },
    {
      title: "Sales Order",
      note: "Advance and order tracking.",
      primary: "New Order",
      actions: [
        ["New Order", "", "open-transaction-new-order"],
        ["Additional Order Advance", "", "open-transaction-order-advance"],
        ["Order Advance Cash Refund", "", "open-transaction-order-refund"]
      ]
    },
    {
      title: "Stock Entry",
      note: "Barcode, opening stock and manual adjustment.",
      primary: "Barcode Entry",
      actions: [
        ["Barcode Entry", "Ctrl+F4", "open-stock"],
        ["Stock Adjustments", "", "open-stock-adjustment"],
        ["Opening Stock Account Entry", "", "open-opening-stock"]
      ]
    },
    {
      title: "Smith Transfers",
      note: "Smith issue, return and cash-for-weight entries.",
      primary: "Smith",
      actions: [
        ["Smith", "Ctrl+S", "open-work-smith"],
        ["Cash for Weight Smith", "", "open-work-cash-smith"]
      ]
    },
    {
      title: "Jeweller Transfers",
      note: "Jeweller transfer and cash-for-weight entries.",
      primary: "Jeweller",
      actions: [
        ["Jeweller", "Alt+J", "open-work-jeweller"],
        ["Cash for Weight Jeweller", "", "open-work-cash-jeweller"]
      ]
    },
    {
      title: "Stock Transfers",
      note: "Internal item movement.",
      primary: "Item Transfer",
      actions: [
        ["Item Transfer", "", "open-work-transfer"]
      ]
    },
    {
      title: "Work / Refining",
      note: "Issue, return and close job-work items.",
      primary: "Refining Issue",
      actions: [
        ["Refining Issue", "", "open-work-refiner"],
        ["Refining Return", "", "open-work-refiner"],
        ["Sample Issue", "", "open-work-sample"],
        ["Sample Return", "", "open-work-sample"],
        ["Polishing", "", "open-work-polishing"],
        ["New Service / Job", "", "open-service-new"],
        ["Close Service / Job", "", "open-service-close"]
      ]
    },
    {
      title: "Gold & Complimentary",
      note: "Non-sale movement that still affects stock/accounts.",
      primary: "Gold Deposit / Withdrawal",
      actions: [
        ["Gold Deposit / Withdrawal", "", "open-transaction-gold-deposit"],
        ["Complimentary Item Purchase", "", "open-transaction-complimentary-purchase"],
        ["Complimentary Item Sales / Issue", "", "open-transaction-complimentary-sales"]
      ]
    },
    {
      title: "Accounts & Vouchers",
      note: "Cash, bank, bill-wise collection and custom vouchers.",
      primary: "Cash Receipt",
      actions: [
        ["Bill Wise Collection", "Alt+C", "open-billwise-collection"],
        ["Bill Wise Payment", "Alt+P", "open-billwise-payment"],
        ["Discount in Debit Note", "", "open-billwise-debit"],
        ["Discount in Credit Note", "", "open-billwise-credit"],
        ["Custom Voucher", "", "open-custom-voucher"],
        ["Cash Receipt", "Ctrl+R", "open-account"],
        ["Cash Payment", "Ctrl+P", "open-account"],
        ["Bank Deposit", "", "open-account"],
        ["Bank Withdrawals", "", "open-account"],
        ["Journal Voucher", "Ctrl+J", "open-account"],
        ["Direct Entry", "", "open-account"]
      ]
    }
  ];

  return `
    <section class="panel transaction-hero">
      <div>
        <p class="eyebrow">Transactions</p>
        <h2>Clean transaction launcher</h2>
        <p>All old transaction menu items are kept, but grouped by the work staff actually do.</p>
      </div>
      <div class="transaction-quick">
        <button class="primary" data-action="open-bill">Sales Invoice</button>
        <button class="secondary" data-action="set-billing-exchange">Purchase / Exchange</button>
        <button class="secondary" data-action="open-stock">Barcode Entry</button>
      </div>
    </section>
    <section class="transaction-grid">
      ${groups.map(transactionGroup).join("")}
    </section>
  `;
}

function transactionGroup(group) {
  return `
    <article class="transaction-card">
      <div class="transaction-card-head">
        <div>
          <h3>${group.title}</h3>
          <p>${group.note}</p>
        </div>
        <button class="text-button" data-action="${group.actions[0][2]}">${group.primary}</button>
      </div>
      <div class="transaction-list">
        ${group.actions.map(([label, shortcut, action]) => `
          <button class="transaction-row" data-action="${action}">
            <span>${label}</span>
            ${shortcut ? `<kbd>${shortcut}</kbd>` : ""}
          </button>
        `).join("")}
      </div>
    </article>
  `;
}

function stock() {
  const activeScreen = stockView === "Stock Adjustments"
    ? stockAdjustmentScreen()
    : stockView === OPENING_STOCK_VIEW
      ? openingStockScreen()
      : stockView === "Gold Deposit"
        ? goldDepositScreen("Deposit")
        : stockView === "Gold Withdrawal"
          ? goldDepositScreen("Withdrawal")
          : stockView !== "Stock Register"
            ? stockActionPage(stockView)
            : stockRegisterScreen();
  return `
    ${moduleSwitcher("Stock", STOCK_ITEMS, stockView, "data-stock-section")}
    ${activeScreen}
  `;
}

function stockRegisterScreen() {
  return `
    <section class="panel">
      <div class="panel-head">
        <h2>Manual Stock Register</h2>
        <div class="panel-actions">
          <button class="secondary" data-action="open-opening-stock">Opening Stock</button>
          <button class="secondary" data-action="open-stock">Add New Item</button>
        </div>
      </div>
      ${table(["Item Name", "Purity", "HUID/BIS", "Qty", "Opening", "Addition", "Deduction", "Closing", "Gross", "Status"], state.stock.map((s) => [s.item, s.purity, s.huid, s.qty, grams(s.opening), grams(s.addition), grams(s.deduction), grams(s.closing), grams(s.gross), s.status]))}
    </section>
    <section class="grid workflow-grid">
      ${workflow("Smith", "Issue, receive, ledger and reconciliation", "open-work-smith")}
      ${workflow("Jeweller", "Transfer, detailed ledger and stock balance", "open-work-jeweller")}
      ${workflow("Refiner", "Melting issue, return and wastage tracking", "open-work-refiner")}
      ${workflow("Polishing", "Issue, receive and polishing balance", "open-work-polishing")}
      ${workflow("Sample", "Sample issue and sample return", "open-work-sample")}
      ${workflow("Service / Job", "New service, close service and payment", "open-service-new")}
      ${workflow("Transfers", "Smith, jeweller and item transfer", "open-work-transfer")}
      ${workflow("Stock Adjustment", "Addition, deduction and reconciliation", "open-stock-adjustment")}
    </section>
    <section class="panel">
      <div class="panel-head"><h2>Stock Workflow Register</h2></div>
      ${table(["Ref No", "Date", "Workflow", "Action", "Party", "Item", "Qty", "Gross", "Issue", "Receive", "Balance", "Status"], state.workLogs.map((w) => [w.refNo, w.date, w.workflow, w.action, w.party, w.item, w.qty, grams(w.gross), grams(w.issue), grams(w.receive), grams(w.balance), w.status]))}
    </section>
  `;
}

function management() {
  const sections = ["Customers", "Suppliers", "Smiths", "Refiners", "Employees", "Item Category", "Miscellaneous", "Item Creation", "Account Creation"];
  const views = {
    Customers: () => managementPartyWindow("Customer Master", "Customer", customerColumns(), customerRow, "open-customer"),
    Suppliers: () => managementPartyWindow("Supplier Master", "Supplier", supplierColumns(), supplierRow, "open-supplier"),
    Smiths: () => managementPartyWindow("Smith Master", "Smith", smithColumns(), smithRow, "open-smith"),
    Refiners: () => managementPartyWindow("Refiner Master", "Refiner", refinerColumns(), refinerRow, "open-refiner"),
    Employees: employeeWindow,
    "Item Category": itemCategoryWindow,
    Miscellaneous: miscellaneousWindow,
    "Item Creation": itemCreationWindow,
    "Account Creation": accountMasterWindow
  };
  return `
    <section class="panel management-hero management-station">
      <div>
        <p class="eyebrow">Master management</p>
        <h2>${managementView}</h2>
        <p>Separate master windows for party, staff, item and account records.</p>
      </div>
      <div class="module-tabs">
        ${sections.map((item) => `<button class="module-tab ${managementView === item ? "active" : ""}" data-management="${item}">${item}</button>`).join("")}
      </div>
    </section>
    ${views[managementView]?.() || views.Customers()}
  `;
}

function openOpeningStockEntry() {
  active = "Stock";
  expandedNavGroups.add("Stock");
  stockView = OPENING_STOCK_VIEW;
  openingStockDraft = normalizeOpeningStockEntry(
    openingStockDraft || state.openingStockEntries?.[0] || defaultOpeningStockEntry()
  );
  render();
}

function stockActionPage(view) {
  const configs = {
    "Barcode Entry": ["Create or print barcode records for stock items.", "open-stock"],
    [OPENING_STOCK_VIEW]: ["Enter opening stock balances for the financial year.", "open-opening-stock"],
    "Stock Adjustments": ["Approve additions, deductions and reconciliation corrections.", "open-stock-adjustment"],
    "Item Transfer": ["Move stock between internal item groups.", "open-work-transfer"],
    "Gold Deposit": ["Record gold deposited into the shop account.", "open-transaction-gold-deposit"],
    "Gold Withdrawal": ["Record gold withdrawn from the shop account.", "open-transaction-gold-withdrawal"]
  };
  const [note, action] = configs[view] || ["Open stock transaction.", "open-stock"];
  return transactionLauncherPage(view, note, [["Open Window", action], ["Back To Stock Register", "Stock Register", "data-stock-section"]]);
}

function openingStockScreen() {
  state.openingStockEntries ||= [];
  openingStockDraft = normalizeOpeningStockEntry(openingStockDraft || state.openingStockEntries[0] || defaultOpeningStockEntry());
  const totals = openingStockTotals(openingStockDraft);
  return `
    <section class="classic-billing-shell clean-entry-shell panel opening-stock-shell">
      <div class="opening-stock-title">Opening Stock</div>
      <div class="opening-stock-controls">
        <label class="classic-field inline-date-field"><span>Opening Date</span><input class="classic-input" type="date" data-opening-stock-date value="${toDateInputValue(openingStockDraft.openingDate)}" /></label>
        <button class="secondary compact-button" data-action="show-opening-stock">Show</button>
      </div>
      <div class="opening-stock-grid-wrap">
        <table class="opening-stock-grid">
          <thead>
            <tr>${["Description", "Weight", "Stone", "Net Weight", "Rate", "Amount", "%", "Pure Wght"].map((head) => `<th>${head}</th>`).join("")}</tr>
          </thead>
          <tbody>${openingStockDraft.lines.map(openingStockRow).join("")}</tbody>
        </table>
      </div>
      <div class="opening-stock-footer">
        <input class="classic-input opening-stock-code" value="--- --- ---" readonly />
        <input class="classic-input opening-stock-total" value="${numericValue(totals.pureWeight, 3)}" readonly />
        <button class="classic-ok-button" data-action="save-opening-stock">OK</button>
      </div>
    </section>
  `;
}

function openingStockRow(line, index) {
  const selected = index === 0 ? "selected" : "";
  return `
    <tr class="${selected}">
      <td class="description-cell">${line.description}</td>
      <td><input data-opening-stock-row="${index}" data-opening-stock-field="weight" value="${numericValue(line.weight, 3)}" inputmode="decimal" /></td>
      <td><input data-opening-stock-row="${index}" data-opening-stock-field="stone" value="${numericValue(line.stone, 3)}" inputmode="decimal" /></td>
      <td><input class="readonly-cell" value="${numericValue(line.netWeight, 3)}" readonly /></td>
      <td><input data-opening-stock-row="${index}" data-opening-stock-field="rate" value="${numericValue(line.rate, 2)}" inputmode="decimal" /></td>
      <td><input class="readonly-cell" value="${moneyValue(line.amount)}" readonly /></td>
      <td><input data-opening-stock-row="${index}" data-opening-stock-field="percent" value="${numericValue(line.percent, 2)}" inputmode="decimal" /></td>
      <td><input class="readonly-cell" value="${numericValue(line.pureWeight, 3)}" readonly /></td>
    </tr>
  `;
}

function stockAdjustmentScreen() {
  state.stockAdjustments ||= [];
  stockAdjustmentDraft = normalizeStockAdjustment(stockAdjustmentDraft || state.stockAdjustments[0] || defaultStockAdjustment());
  const record = stockAdjustmentDraft;
  return `
    <section class="classic-billing-shell clean-entry-shell panel stock-adjustment-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Save", "save-stock-adjustment")}
        ${toolbarButton("Refresh", "refresh-stock-adjustment")}
        ${toolbarButton("Delete", "delete-stock-adjustment")}
        ${toolbarButton("Edit", "edit-current-bill")}
        ${toolbarButton("Print", "print-stock-adjustment")}
        ${toolbarButton("Close", "close-stock-adjustment")}
      </div>
      ${stockAdjustmentHeader(record)}
      ${classicTransactionTable("stock-adjustment-entry", stockAdjustmentEntryColumns(), stockAdjustmentEntryRow(defaultStockAdjustmentLine()), stockAdjustmentColumns(), record.lines.map(stockAdjustmentRow))}
    </section>
  `;
}

function stockAdjustmentHeader(record) {
  return `
    <div class="transaction-entry-header stock-adjustment-header">
      <div class="stock-adjustment-left">
        <label class="classic-field split-field stock-adjustment-line"><span>Entry No, Ref No</span><span class="field-pair"><input class="classic-input" data-stock-adjust-field="entryNo" value="${record.entryNo}" /><input class="classic-input" data-stock-adjust-field="refNo" value="${record.refNo}" /></span></label>
        <label class="classic-field split-field stock-adjustment-line"><span>Date, Time</span><span class="field-pair"><input class="classic-input" data-stock-adjust-field="date" value="${record.date}" /><input class="classic-input" data-stock-adjust-field="time" value="${record.time}" /></span></label>
      </div>
      <div class="stock-adjustment-right">
        <label class="classic-field split-field stock-adjustment-line"><span>Prepared By</span><span class="field-pair staff-pair"><input class="classic-code" value="${staffCodeForName(record.preparedBy)}" readonly />${employeeDropdown("preparedBy", record.preparedBy, "data-stock-adjust-field")}</span></label>
        <label class="classic-field stock-adjustment-line reason-line"><span>Reason</span><textarea class="classic-input reason-box" data-stock-adjust-field="reason">${record.reason}</textarea></label>
      </div>
    </div>
  `;
}

function stockAdjustmentEntryColumns() {
  return ["ID", "Type", "Barcode", "Item Name", "Nos", "Gross", "Stone", "Net", "+", "+ Gross", "+ Stone", "- Nos", "- Gross", "- Stone", "Cls Nos", "Cls Gross", "Cls Stone", "Cls Net", "Add"];
}

function stockAdjustmentColumns() {
  return ["Sl", "X", "Type", "Barcode", "Item Name", "Nos", "Gross", "Stone", "Net", "Nos Add", "Gross Add", "Stone Add", "Nos Less", "Gross Less", "Stone Less", "Closing Nos", "Closing Gross", "Closing Stone", "Closing Net"];
}

function stockAdjustmentEntryRow(line) {
  return [
    editCell("id", ""),
    selectCell("type", line.type, ["Barcode Only", "Item Wise", "Manual"]),
    editCell("barcode", line.barcode),
    editCell("itemName", line.itemName),
    editCell("nos", numericValue(line.nos, 0), "decimal"),
    editCell("gross", grams(line.gross), "decimal"),
    editCell("stone", grams(line.stone), "decimal"),
    autoCell("net", grams(line.net), "decimal"),
    editCell("nosAdd", numericValue(line.nosAdd, 0), "decimal"),
    editCell("grossAdd", grams(line.grossAdd), "decimal"),
    editCell("stoneAdd", grams(line.stoneAdd), "decimal"),
    editCell("nosLess", numericValue(line.nosLess, 0), "decimal"),
    editCell("grossLess", grams(line.grossLess), "decimal"),
    editCell("stoneLess", grams(line.stoneLess), "decimal"),
    autoCell("closingNos", numericValue(line.closingNos, 0), "decimal"),
    autoCell("closingGross", grams(line.closingGross), "decimal"),
    autoCell("closingStone", grams(line.closingStone), "decimal"),
    autoCell("closingNet", grams(line.closingNet), "decimal"),
    `<button class="grid-add-button" data-action="add-stock-adjustment-line">+</button>`
  ];
}

function stockAdjustmentRow(line, index) {
  return [
    index + 1,
    `<button class="grid-delete" data-action="delete-stock-adjustment-line" data-index="${index}">x</button>`,
    line.type,
    line.barcode,
    line.itemName,
    numericValue(line.nos, 0),
    grams(line.gross),
    grams(line.stone),
    grams(line.net),
    numericValue(line.nosAdd, 0),
    grams(line.grossAdd),
    grams(line.stoneAdd),
    numericValue(line.nosLess, 0),
    grams(line.grossLess),
    grams(line.stoneLess),
    numericValue(line.closingNos, 0),
    grams(line.closingGross),
    grams(line.closingStone),
    grams(line.closingNet)
  ];
}

function goldDepositScreen(type = "Deposit") {
  const isWithdrawal = type === "Withdrawal";
  const collection = isWithdrawal ? "goldWithdrawals" : "goldDeposits";
  if (isWithdrawal) goldWithdrawalDraft = normalizeGoldDeposit(goldWithdrawalDraft || state[collection]?.[0] || defaultGoldDeposit(type), type);
  else goldDepositDraft = normalizeGoldDeposit(goldDepositDraft || state[collection]?.[0] || defaultGoldDeposit(type), type);
  const record = isWithdrawal ? goldWithdrawalDraft : goldDepositDraft;
  const totals = goldDepositFinancials(record);
  const title = isWithdrawal ? "Gold Deposit Withdrawal" : "Gold Deposit";
  return `
    <section class="classic-billing-shell clean-entry-shell panel gold-deposit-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Save F9", `save-gold-${isWithdrawal ? "withdrawal" : "deposit"}`)}
        ${toolbarButton("Refresh", `refresh-gold-${isWithdrawal ? "withdrawal" : "deposit"}`)}
        ${toolbarButton("Edit", "edit-current-bill")}
        ${toolbarButton("Delete", `delete-gold-${isWithdrawal ? "withdrawal" : "deposit"}`)}
        ${toolbarButton("Print", "print-gold-deposit")}
        ${toolbarButton("Close", "close-gold-deposit")}
        <span class="toolbar-rate">Gold Rate <input value="${moneyValue(activeGoldRate())}" readonly /></span>
      </div>
      <div class="gold-deposit-title">${title}</div>
      ${goldDepositHeader(record, isWithdrawal)}
      ${classicTransactionTable("gold-deposit-entry", goldDepositEntryColumns(), goldDepositEntryRow(defaultGoldDepositLine()), goldDepositColumns(), record.lines.map(goldDepositRow))}
      ${goldDepositBottom(record, totals)}
    </section>
  `;
}

function goldDepositHeader(record, isWithdrawal) {
  const attr = isWithdrawal ? "data-gold-withdrawal-field" : "data-gold-deposit-field";
  return `
    <div class="transaction-entry-header gold-deposit-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Ref No</span><span class="field-pair"><input ${attr}="entryNo" value="${record.entryNo}" /><input ${attr}="refNo" value="${record.refNo}" /></span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair"><input type="date" ${attr}="date" value="${toDateInputValue(record.date)}" /><input ${attr}="time" value="${record.time}" /></span></label>
      </div>
      <div class="classic-fields middle">
        <label class="checkbox-line gold-by-amount"><input type="checkbox" ${record.byAmount ? "checked" : ""} ${attr}="byAmount" /> <strong>By Amount</strong></label>
      </div>
      <div class="classic-fields right">
        <label class="classic-field"><span>Party Name</span><input ${attr}="partyName" value="${record.partyName}" /></label>
        <label class="classic-field"><span>Prepared By</span>${employeeDropdown("preparedBy", record.preparedBy, attr)}</label>
      </div>
    </div>
  `;
}

function goldDepositEntryColumns() {
  return ["Item ID", "Item Name", "Gross", "Stone", "MudLess", "Net", "Touch", "PrtyWgt", "Rate", "Amount", "Add"];
}

function goldDepositEntryRow(line) {
  return [
    editCell("itemId", line.itemId),
    editCell("itemName", line.itemName),
    editCell("gross", numericValue(line.gross), "decimal"),
    editCell("stone", numericValue(line.stone), "decimal"),
    editCell("mudless", numericValue(line.mudless), "decimal"),
    autoCell("net", numericValue(line.net), "decimal"),
    editCell("touch", numericValue(line.touch, 2), "decimal"),
    autoCell("partyWeight", numericValue(line.partyWeight), "decimal"),
    editCell("rate", moneyValue(line.rate), "decimal"),
    editCell("amount", moneyValue(line.amount), "decimal"),
    `<button class="grid-add-button" data-action="add-gold-deposit-line">+ Add</button>`
  ];
}

function goldDepositColumns() {
  return ["SL", "ID", "Item Name", "Gross", "Stone", "Mudless", "Net", "Touch", "PrtyWgt", "Rate", "Amount", "X"];
}

function goldDepositRow(line, index) {
  return [
    index + 1,
    line.itemId,
    line.itemName,
    grams(line.gross),
    grams(line.stone),
    numericValue(line.mudless, 2),
    grams(line.net),
    numericValue(line.touch, 2),
    grams(line.partyWeight),
    money(line.rate),
    money(line.amount),
    `<button class="line-delete" data-action="delete-gold-deposit-line" data-index="${index}">x</button>`
  ];
}

function goldDepositBottom(record, totals) {
  const attr = record.type === "Withdrawal" ? "data-gold-withdrawal-field" : "data-gold-deposit-field";
  return `
    <div class="gold-deposit-bottom">
      <label class="classic-field remarks-line"><span>Remarks</span><input ${attr}="remarks" value="${record.remarks}" /></label>
      <label class="classic-field compact-date"><span>Due Date</span><input type="date" ${attr}="dueDate" value="${toDateInputValue(record.dueDate)}" /></label>
      <div class="gold-deposit-readouts">
        <span>Balance Weight/Amount</span>
        <input class="green-readout" value="${numericValue(record.balanceWeight ?? totals.totalWeight)}" readonly />
        <input class="green-readout" value="${moneyValue(record.balanceAmount ?? totals.totalAmount)}" readonly />
      </div>
      <div class="gold-deposit-readouts">
        <span>Total Weight/Amount</span>
        <input class="blue-readout" value="${numericValue(totals.totalWeight)}" readonly />
        <input class="blue-readout" value="${moneyValue(totals.totalAmount)}" readonly />
      </div>
    </div>
  `;
}

function workOrders() {
  if (workOrderView === "Complimentary Item") return complimentaryModule();
  if (workOrderView === "Refining") return refineryWorkOrders();
  if (workOrderView === "Sample") return sampleWorkOrders();
  if (workOrderView === "Polishing") return polishingScreen();
  if (workOrderView === "Service / Job") return serviceWorkOrders();
  if (workOrderView === "Smith" || workOrderView === "Jeweller") return smithWorkOrders();
  const keyMap = {
    Smith: "smith",
    Jeweller: "jeweller",
    Refining: "refiner",
    Sample: "sample",
    Polishing: "polishing",
    "Service / Job": "service"
  };
  const key = keyMap[workOrderView] || "smith";
  const config = workConfig(key);
  return `
    ${moduleSwitcher("Work Orders", WORK_ORDER_ITEMS, workOrderView, "data-work-section")}
    <section class="panel transaction-hero">
      <div>
        <p class="eyebrow">Work orders</p>
        <h2>${config.workflow}</h2>
        <p>Issue, receive and reconcile job-work items without searching through transaction submenus.</p>
      </div>
      <button class="primary" data-action="open-work-${key}">Open ${config.workflow}</button>
    </section>
    <section class="grid transaction-grid compact-transaction-grid">
      <article class="transaction-card">
        <div class="transaction-card-head">
          <div>
            <h3>${config.workflow}</h3>
            <p>Actions available for this workflow.</p>
          </div>
        </div>
        <div class="transaction-list">
          ${config.actions.map((action) => `<button class="transaction-row" data-action="open-work-${key}"><span>${action}</span></button>`).join("")}
        </div>
      </article>
    </section>
    <section class="panel">
      <div class="panel-head"><h2>${config.workflow} Register</h2></div>
      ${table(["Ref No", "Date", "Workflow", "Action", "Party", "Item", "Qty", "Gross", "Issue", "Receive", "Balance", "Status"], state.workLogs.filter((w) => w.workflow === config.workflow || config.workflow === "Service / Job").map((w) => [w.refNo, w.date, w.workflow, w.action, w.party, w.item, w.qty, grams(w.gross), grams(w.issue), grams(w.receive), grams(w.balance), w.status]))}
    </section>
  `;
}

function serviceWorkOrders() {
  const tabs = ["New Service / Job", "Close Service / Job"];
  if (!tabs.includes(serviceWorkView)) serviceWorkView = tabs[0];
  const type = serviceWorkView === "Close Service / Job" ? "Close" : "New";
  return `
    ${moduleSwitcher("Work Orders", WORK_ORDER_ITEMS, workOrderView, "data-work-section")}
    <section class="panel management-hero work-smith-hero service-hero">
      <div>
        <p class="eyebrow">Service / job work</p>
        <h2>${serviceWorkView}</h2>
        <p>Register service jobs with item complaints, due details, advance and final balance.</p>
      </div>
      <div class="module-tabs compact-tabs">
        ${tabs.map((tab) => `<button class="module-tab ${serviceWorkView === tab ? "active" : ""}" data-service-view="${tab}">${tab}</button>`).join("")}
      </div>
    </section>
    ${serviceJobScreen(type)}
  `;
}

function serviceJobScreen(type = "New") {
  const isClose = type === "Close";
  state.serviceJobs ||= [];
  state.serviceClosures ||= [];
  if (isClose) {
    serviceCloseDraft = normalizeServiceJob(serviceCloseDraft || state.serviceClosures[0] || defaultServiceJob("Close"), "Close");
  } else {
    serviceNewDraft = normalizeServiceJob(serviceNewDraft || state.serviceJobs[0] || defaultServiceJob("New"), "New");
  }
  const record = isClose ? serviceCloseDraft : serviceNewDraft;
  const totals = serviceFinancials(record);
  const prefix = isClose ? "service-close" : "service-new";
  return `
    <section class="classic-billing-shell clean-entry-shell panel service-job-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("New", `refresh-${prefix}`)}
        ${toolbarButton("Save", `save-${prefix}`)}
        ${toolbarButton("Refresh", `refresh-${prefix}`)}
        ${toolbarButton("Search", "find-service-job")}
        ${toolbarButton("Delete", `delete-${prefix}`)}
        ${toolbarButton("Print", "print-service-job")}
        ${toolbarButton("Previous", "previous-bill")}
        ${toolbarButton("Next", "next-bill")}
        ${toolbarButton("Close", "close-work-orders")}
      </div>
      ${serviceJobHeader(record)}
      ${classicTransactionTable("service-job-entry", serviceEntryColumns(), serviceEntryRow(defaultServiceLine()), serviceColumns(), record.lines.map((line, index) => serviceRow(line, index)))}
      ${serviceBottom(record, totals)}
    </section>
  `;
}

function serviceJobHeader(record) {
  return `
    <div class="transaction-entry-header sample-header service-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Ref No</span><span class="field-pair"><input data-service-field="entryNo" value="${record.entryNo}" /><input data-service-field="refNo" value="${record.refNo}" /></span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair"><input type="date" data-service-field="date" value="${toDateInputValue(record.date)}" /><input data-service-field="time" value="${record.time}" /></span></label>
        <label class="classic-field split-field"><span>Due Days, Date</span><span class="field-pair"><input inputmode="numeric" data-service-field="dueDays" value="${record.dueDays}" /><input type="date" data-service-field="dueDate" value="${toDateInputValue(record.dueDate)}" /></span></label>
        <label class="classic-field"><span>Sales Man</span>${employeeDropdown("salesMan", record.salesMan, "data-service-field")}</label>
        <label class="classic-field"><span>Job Status</span><select class="classic-input" data-service-field="jobStatus">${["Pending", "In Progress", "Ready", "Closed", "Cancelled"].map((status) => `<option ${record.jobStatus === status ? "selected" : ""}>${status}</option>`).join("")}</select></label>
      </div>
      <div class="classic-fields right">
        <label class="classic-field"><span>Party Account</span><input data-service-field="partyAccount" value="${record.partyAccount}" /></label>
        <label class="classic-field"><span>Party Name</span><input data-service-field="partyName" value="${record.partyName}" list="customer-options" /></label>
        <label class="classic-field"><span>Place</span><input data-service-field="place" value="${record.place}" /></label>
        <label class="classic-field"><span>Contact No.</span><input data-service-field="contactNo" value="${record.contactNo}" /></label>
      </div>
    </div>
  `;
}

function serviceEntryColumns() {
  return ["#", "Item Name", "Description", "Nos", "Gross Wght", "Stone Wght", "Net Weight", "Complaint", "Add"];
}

function serviceEntryRow(line) {
  return [
    "",
    editCell("itemName", line.itemName),
    editCell("description", line.description),
    editCell("nos", line.nos, "numeric"),
    editCell("gross", numericValue(line.gross), "decimal"),
    editCell("stone", numericValue(line.stone), "decimal"),
    autoCell("net", numericValue(line.net), "decimal"),
    editCell("complaint", line.complaint),
    `<button class="grid-add-button" data-action="add-service-line">Add</button>`
  ];
}

function serviceColumns() {
  return ["Sl", "X", "Item Name", "Description", "Nos", "Gross Weight", "Stone Weight", "Net Weight", "Complaint"];
}

function serviceLineInput(index, field, value, mode = "text", extraClass = "") {
  return `<input class="grid-input ${extraClass}" data-service-line-field="${field}" data-index="${index}" inputmode="${mode}" value="${value ?? ""}" />`;
}

function serviceRow(line, index) {
  return [
    index + 1,
    `<button class="row-remove" data-action="delete-service-line" data-index="${index}">X</button>`,
    serviceLineInput(index, "itemName", line.itemName),
    serviceLineInput(index, "description", line.description),
    serviceLineInput(index, "nos", line.nos, "numeric"),
    serviceLineInput(index, "gross", numericValue(line.gross), "decimal"),
    serviceLineInput(index, "stone", numericValue(line.stone), "decimal"),
    serviceLineInput(index, "net", numericValue(line.net), "decimal", "auto-field"),
    serviceLineInput(index, "complaint", line.complaint)
  ];
}

function serviceBottom(record, totals) {
  return `
    <div class="service-bottom classic-bottom-grid">
      <label class="classic-field remarks-wide"><span>Remarks</span><textarea data-service-field="remarks">${record.remarks}</textarea></label>
      <div class="bill-totals return-bottom service-totals">
        <label><span>Aprx Amount</span><input data-service-field="approxAmount" inputmode="decimal" value="${moneyValue(totals.approxAmount)}" /></label>
        <label><span>Advance</span><input data-service-field="advance" inputmode="decimal" value="${moneyValue(totals.advance)}" /></label>
        <label><span>Balance</span><input class="orange-readout" value="${moneyValue(totals.balance)}" readonly /></label>
      </div>
    </div>
  `;
}

function sampleWorkOrders() {
  const tabs = ["Sample Issue", "Sample Return"];
  if (!tabs.includes(sampleWorkView)) sampleWorkView = tabs[0];
  return `
    ${moduleSwitcher("Work Orders", WORK_ORDER_ITEMS, workOrderView, "data-work-section")}
    <section class="panel management-hero work-smith-hero sample-hero">
      <div>
        <p class="eyebrow">Sample workflow</p>
        <h2>${sampleWorkView}</h2>
        <p>Issue and receive sample ornaments with jeweller, prepared-by and stock movement tracking.</p>
      </div>
      <div class="module-tabs compact-tabs">
        ${tabs.map((tab) => `<button class="module-tab ${sampleWorkView === tab ? "active" : ""}" data-sample-view="${tab}">${tab}</button>`).join("")}
      </div>
    </section>
    ${sampleWorkView === "Sample Return" ? sampleScreen("Return") : sampleScreen("Issue")}
  `;
}

function sampleScreen(type = "Issue") {
  const isReturn = type === "Return";
  state.sampleIssues ||= [];
  state.sampleReturns ||= [];
  if (isReturn) {
    sampleReturnDraft = normalizeSample(sampleReturnDraft || state.sampleReturns[0] || defaultSample("Return"), "Return");
  } else {
    sampleIssueDraft = normalizeSample(sampleIssueDraft || state.sampleIssues[0] || defaultSample("Issue"), "Issue");
  }
  const record = isReturn ? sampleReturnDraft : sampleIssueDraft;
  const totals = sampleFinancials(record);
  const prefix = isReturn ? "sample-return" : "sample-issue";
  return `
    <section class="classic-billing-shell clean-entry-shell panel sample-work-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Refresh", `refresh-${prefix}`)}
        ${toolbarButton("Save", `save-${prefix}`)}
        ${toolbarButton("Edit", "edit-current-bill")}
        ${toolbarButton("Delete", `delete-${prefix}`)}
        ${toolbarButton("Print", "print-sample")}
        ${toolbarButton("Previous", "previous-bill")}
        ${toolbarButton("Next", "next-bill")}
        ${toolbarButton("Close", "close-work-orders")}
      </div>
      ${sampleHeader(record, type)}
      ${classicTransactionTable("sample-entry", sampleEntryColumns(), sampleEntryRow(defaultSampleLine()), sampleColumns(), record.lines.map((line, index) => sampleRow(line, index, type)))}
      ${sampleBottom(record, totals, type)}
    </section>
  `;
}

function sampleHeader(record, type) {
  const attr = type === "Return" ? "data-sample-return-field" : "data-sample-issue-field";
  return `
    <div class="transaction-entry-header sample-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Date</span><span class="field-pair"><input ${attr}="entryNo" value="${record.entryNo}" /><input type="date" ${attr}="date" value="${toDateInputValue(record.date)}" /></span></label>
        <label class="classic-field split-field"><span>Ref. No, Time</span><span class="field-pair"><input ${attr}="refNo" value="${record.refNo}" /><input ${attr}="time" value="${record.time}" /></span></label>
      </div>
      <div class="sample-title-center">
        <input ${attr}="sampleCode" value="${record.sampleCode}" />
        <strong>${type === "Return" ? "Sample Return" : "Sample Issue"}</strong>
      </div>
      <div class="classic-fields right">
        <label class="classic-check inline-check"><input type="checkbox" ${attr}="selectJeweller" ${record.selectJeweller ? "checked" : ""} /><span>Jeweller</span>${jewellerDropdown("jewellerName", record.jewellerName, attr)}</label>
        <label class="classic-field split-field"><span>Prepared By</span><span class="field-pair staff-pair"><input class="classic-code" value="${staffCodeForName(record.preparedBy)}" readonly />${employeeDropdown("preparedBy", record.preparedBy, attr)}</span></label>
      </div>
    </div>
  `;
}

function sampleEntryColumns() {
  return ["ID", "Barcode", "Item Name", "Qty", "Gross", "Stone", "Net Wght", "Rate", "HMC", "Tax", "Tax Amt", "Total", "Add"];
}

function sampleEntryRow(line) {
  return [
    editCell("itemId", line.itemId),
    editCell("barcode", line.barcode),
    editCell("itemName", line.itemName),
    editCell("qty", numericValue(line.qty, 0), "decimal"),
    editCell("gross", numericValue(line.gross), "decimal"),
    editCell("stone", numericValue(line.stone), "decimal"),
    autoCell("net", numericValue(line.net), "decimal"),
    editCell("rate", moneyValue(line.rate), "decimal"),
    editCell("hmc", moneyValue(line.hmc), "decimal"),
    editCell("taxPct", numericValue(line.taxPct), "decimal"),
    autoCell("taxAmount", moneyValue(line.taxAmount), "decimal"),
    autoCell("total", moneyValue(line.total), "decimal"),
    `<button class="grid-add-button" data-action="add-sample-line">+ Add</button>`
  ];
}

function sampleColumns() {
  return ["SL", "X", "ID", "Barcode", "Item Name", "Qty", "Gross", "Stone", "Net Wght", "Rate", "HMC", "Tax", "Tax Amt", "Total"];
}

function sampleRow(line, index, type) {
  const action = type === "Return" ? "delete-sample-return-line" : "delete-sample-issue-line";
  return [
    index + 1,
    `<button class="mini-danger" data-action="${action}" data-index="${index}">X</button>`,
    line.itemId || "",
    line.barcode || "",
    line.itemName || "",
    numericValue(line.qty, 0),
    grams(line.gross),
    grams(line.stone),
    grams(line.net),
    money(line.rate),
    money(line.hmc),
    numericValue(line.taxPct),
    money(line.taxAmount),
    money(line.total)
  ];
}

function sampleBottom(record, totals, type) {
  const attr = type === "Return" ? "data-sample-return-field" : "data-sample-issue-field";
  return `
    <div class="sample-bottom">
      <label class="sample-remarks"><span>Remarks</span><textarea ${attr}="remarks">${record.remarks}</textarea></label>
      <label class="classic-check"><input type="checkbox" ${attr}="showRate" ${record.showRate ? "checked" : ""} /><span>Show Rate</span></label>
      <span></span>
      <label class="sample-total"><span>Total Amount</span><input value="${moneyValue(totals.totalAmount)}" readonly /></label>
    </div>
  `;
}

function polishingScreen() {
  state.polishingEntries ||= [];
  polishingDraft = normalizePolishingEntry(polishingDraft || state.polishingEntries[0] || defaultPolishingEntry());
  const record = polishingDraft;
  const totals = polishingFinancials(record);
  return `
    ${moduleSwitcher("Work Orders", WORK_ORDER_ITEMS, workOrderView, "data-work-section")}
    <section class="classic-billing-shell clean-entry-shell panel sample-work-shell polishing-work-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Refresh", "refresh-polishing")}
        ${toolbarButton("Update", "save-polishing")}
        ${toolbarButton("Edit", "edit-current-bill")}
        ${toolbarButton("Delete", "delete-polishing")}
        ${toolbarButton("Print", "print-polishing")}
        ${toolbarButton("Close", "close-work-orders")}
      </div>
      ${polishingHeader(record)}
      ${classicTransactionTable("polishing-item-entry", polishingEntryColumns(), polishingEntryRow(defaultPolishingLine()), polishingColumns(), record.lines.map(polishingRow))}
      ${classicTransactionTable("polishing-stone-entry", polishingStoneEntryColumns(), polishingStoneEntryRow(defaultPolishingStoneLine()), polishingStoneColumns(), record.stones.map(polishingStoneRow))}
      ${polishingBottom(record, totals)}
    </section>
  `;
}

function polishingHeader(record) {
  const partyOptions = ["", ...(state.parties || []).map((party) => party.name)];
  return `
    <div class="transaction-entry-header polishing-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Date</span><span class="field-pair"><input data-polishing-field="entryNo" value="${record.entryNo}" /><input type="date" data-polishing-field="date" value="${toDateInputValue(record.date)}" /></span></label>
        <label class="classic-field split-field"><span>Ref. No, Time</span><span class="field-pair"><input data-polishing-field="refNo" value="${record.refNo}" /><input data-polishing-field="time" value="${record.time}" /></span></label>
      </div>
      <div class="classic-fields right">
        <label class="classic-check inline-check"><input type="checkbox" data-polishing-field="hasParty" ${record.hasParty ? "checked" : ""} /><span>Party Name</span><select data-polishing-field="partyName">${partyOptions.map((option) => `<option ${option === record.partyName ? "selected" : ""}>${option}</option>`).join("")}</select></label>
        <label class="classic-field split-field"><span>Prepared By</span><span class="field-pair staff-pair"><input class="classic-code" value="${staffCodeForName(record.preparedBy)}" readonly />${employeeDropdown("preparedBy", record.preparedBy, "data-polishing-field")}</span></label>
      </div>
    </div>
  `;
}

function polishingEntryColumns() {
  return ["ID", "Barcode", "Item Name", "Qty", "Gross", "Stone", "Net Wght", "Add"];
}

function polishingEntryRow(line) {
  return [
    editCell("itemId", line.itemId),
    editCell("barcode", line.barcode),
    editCell("itemName", line.itemName),
    editCell("qty", numericValue(line.qty, 0), "decimal"),
    editCell("gross", numericValue(line.gross), "decimal"),
    editCell("stone", numericValue(line.stone), "decimal"),
    autoCell("net", numericValue(line.net), "decimal"),
    `<button class="grid-add-button" data-action="add-polishing-line">+ Add</button>`
  ];
}

function polishingColumns() {
  return ["X", "Sl", "ID", "Barcode", "Item Name", "Qty", "Gross", "Stone", "Net Wght"];
}

function polishingRow(line, index) {
  return [
    `<button class="mini-danger" data-action="delete-polishing-line" data-index="${index}">X</button>`,
    index + 1,
    line.itemId || "",
    line.barcode || "",
    line.itemName || "",
    numericValue(line.qty, 0),
    grams(line.gross),
    grams(line.stone),
    grams(line.net)
  ];
}

function polishingStoneEntryColumns() {
  return ["ICo", "Barcode", "Color Type", "Color Scale", "Shape", "Cut", "Clarity", "Seive/Size", "Carat/Cent", "CT", "Pcs", "Purchase Rate", "Selling Rate", "Amount", "Add"];
}

function polishingStoneEntryRow(line) {
  return [
    editCell("code", line.code),
    editCell("barcode", line.barcode),
    selectCell("colorType", line.colorType, ["", "White", "Fancy", "Yellow", "Blue", "Pink"]),
    selectCell("colorScale", line.colorScale, ["", "D", "E", "F", "G", "H", "I"]),
    selectCell("shape", line.shape, ["", "Round", "Oval", "Pear", "Princess", "Emerald"]),
    selectCell("cut", line.cut, ["", "Excellent", "Very Good", "Good", "Fair"]),
    selectCell("clarity", line.clarity, ["", "VVS", "VS", "SI", "I"]),
    editCell("sieveSize", line.sieveSize),
    editCell("caratCent", numericValue(line.caratCent), "decimal"),
    selectCell("ct", line.ct, ["Cnt", "Ct"]),
    editCell("pcs", numericValue(line.pcs, 0), "decimal"),
    editCell("purchaseRate", moneyValue(line.purchaseRate), "decimal"),
    editCell("sellingRate", moneyValue(line.sellingRate), "decimal"),
    autoCell("amount", moneyValue(line.amount), "decimal"),
    `<button class="grid-add-button" data-action="add-polishing-stone">+ Add</button>`
  ];
}

function polishingStoneColumns() {
  return ["X", "Sl", "ICo", "Barcode", "Color Type", "Color Scale", "Shape", "Cut", "Clarity", "Seive / Size", "Carat / Cent", "CT", "Pcs", "Purchase Rate", "Selling Rate", "Amount"];
}

function polishingStoneRow(line, index) {
  return [
    `<button class="mini-danger" data-action="delete-polishing-stone" data-index="${index}">X</button>`,
    index + 1,
    line.code || "",
    line.barcode || "",
    line.colorType || "",
    line.colorScale || "",
    line.shape || "",
    line.cut || "",
    line.clarity || "",
    line.sieveSize || "",
    numericValue(line.caratCent),
    line.ct || "",
    numericValue(line.pcs, 0),
    money(line.purchaseRate),
    money(line.sellingRate),
    money(line.amount)
  ];
}

function polishingBottom(record, totals) {
  return `
    <div class="polishing-bottom">
      <label class="sample-remarks"><span>Remarks</span><textarea data-polishing-field="remarks">${record.remarks}</textarea></label>
      <div class="polishing-totals">
        <span>Total Net Weight</span><input value="${grams(totals.net)}" readonly />
        <span>Stone Amount</span><input value="${moneyValue(totals.stoneAmount)}" readonly />
        <span>Total Amount</span><input value="${moneyValue(totals.totalAmount)}" readonly />
      </div>
    </div>
  `;
}

function refineryWorkOrders() {
  const tabs = ["Refinery Issue", "Refinery Return", "Refinery Final Return", "Melting Issue", "Melting Return"];
  if (!tabs.includes(refineryView)) refineryView = tabs[0];
  const activeScreen = refineryView === "Refinery Return"
    ? refineryReturnScreen()
    : refineryView === "Refinery Final Return"
      ? refineryFinalReturnScreen()
      : refineryView === "Melting Issue"
        ? meltingIssueScreen()
        : refineryView === "Melting Return"
          ? meltingReturnScreen()
          : refineryIssueScreen();
  return `
    ${moduleSwitcher("Work Orders", WORK_ORDER_ITEMS, workOrderView, "data-work-section")}
    <section class="panel management-hero work-smith-hero refinery-hero">
      <div>
        <p class="eyebrow">Refinery workflow</p>
        <h2>${refineryView}</h2>
        <p>Issue melting items, record test return, and close final refined return with live weight and amount calculations.</p>
      </div>
      <div class="module-tabs compact-tabs">
        ${tabs.map((item) => `<button class="module-tab ${refineryView === item ? "active" : ""}" data-refinery-view="${item}">${item}</button>`).join("")}
      </div>
    </section>
    ${activeScreen}
  `;
}

function refineryIssueScreen() {
  state.refineryIssues ||= [];
  refineryIssueDraft = normalizeRefineryIssue(refineryIssueDraft || state.refineryIssues[0] || defaultRefineryIssue());
  const record = refineryIssueDraft;
  const totals = refineryIssueFinancials(record);
  return `
    <section class="classic-billing-shell clean-entry-shell panel smith-work-shell refinery-work-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Save", "save-refinery-issue")}
        ${toolbarButton("Refresh", "refresh-refinery-issue")}
        ${toolbarButton("Edit", "edit-current-bill")}
        ${toolbarButton("Delete", "delete-refinery-issue")}
        ${toolbarButton("Close", "close-work-orders")}
      </div>
      ${refineryIssueHeader(record)}
      ${classicTransactionTable("refinery-issue-entry", refineryIssueEntryColumns(), refineryIssueEntryRow(defaultRefineryIssueLine()), refineryIssueColumns(), record.lines.map(refineryIssueRow))}
      <div class="refinery-work-bottom issue-bottom">
        ${refineryTotalInput("Issue Weight", numericValue(totals.issueWeight), true)}
        ${refineryTotalInput("Issue Amount", moneyValue(totals.issueAmount), true)}
      </div>
    </section>
  `;
}

function meltingIssueScreen() {
  state.meltingIssues ||= [];
  meltingIssueDraft = normalizeMeltingIssue(meltingIssueDraft || state.meltingIssues[0] || defaultMeltingIssue());
  const record = meltingIssueDraft;
  const totals = meltingIssueFinancials(record);
  return `
    <section class="classic-billing-shell clean-entry-shell panel smith-work-shell refinery-work-shell melting-work-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Save F9", "save-melting-issue")}
        ${toolbarButton("Refresh", "refresh-melting-issue")}
        ${toolbarButton("Edit", "edit-current-bill")}
        ${toolbarButton("Delete", "delete-melting-issue")}
        ${toolbarButton("Close", "close-work-orders")}
      </div>
      ${meltingIssueHeader(record)}
      ${classicTransactionTable("melting-issue-entry", meltingIssueEntryColumns(), meltingIssueEntryRow(defaultMeltingIssueLine()), meltingIssueColumns(), record.lines.map(meltingIssueRow))}
      <div class="refinery-work-bottom issue-bottom">
        ${refineryTotalInput("Issue Weight", numericValue(totals.issueWeight), true)}
        ${refineryTotalInput("Issue Amount", moneyValue(totals.issueAmount), true)}
      </div>
    </section>
  `;
}

function meltingIssueHeader(record) {
  return `
    <div class="transaction-entry-header refinery-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Ref No</span><span class="field-pair"><input data-melting-issue-field="entryNo" value="${record.entryNo}" /><input data-melting-issue-field="refNo" value="${record.refNo}" /></span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair"><input type="date" data-melting-issue-field="date" value="${toDateInputValue(record.date)}" /><input data-melting-issue-field="time" value="${record.time}" /></span></label>
        <label class="classic-field"><span>Issue Type</span>${plainSelect("issueType", record.issueType, ["Melting", "Testing", "Re-Melting"], "data-melting-issue-field")}</label>
      </div>
      <div class="classic-fields right">
        <label class="classic-field"><span>Refiner Name</span>${refinerDropdown("refinerName", record.refinerName, "data-melting-issue-field")}</label>
        <label class="classic-field"><span>Prepared By</span>${employeeDropdown("preparedBy", record.preparedBy, "data-melting-issue-field")}</label>
      </div>
    </div>
  `;
}

function meltingIssueEntryColumns() {
  return ["Item ID", "Item Name", "Nos", "Gross Wght", "Stone Wght", "Net Wght", "Rate", "Amount", "Add"];
}

function meltingIssueEntryRow(line) {
  return [
    editCell("itemId", line.itemId),
    editCell("itemName", line.itemName),
    editCell("qty", numericValue(line.qty, 0), "decimal"),
    editCell("gross", numericValue(line.gross), "decimal"),
    editCell("stone", numericValue(line.stone), "decimal"),
    autoCell("net", numericValue(line.net), "decimal"),
    editCell("rate", moneyValue(line.rate), "decimal"),
    autoCell("amount", moneyValue(line.amount), "decimal"),
    `<button class="grid-add-button" data-action="add-melting-issue-line">+ Add</button>`
  ];
}

function meltingIssueColumns() {
  return ["SL", "ID", "Item Name", "Qty", "Gross", "Stone", "Net", "Rate", "Amount", "X"];
}

function meltingIssueRow(line, index) {
  return [
    index + 1,
    line.itemId || "",
    line.itemName || "",
    numericValue(line.qty, 0),
    grams(line.gross),
    grams(line.stone),
    grams(line.net),
    money(line.rate),
    money(line.amount),
    `<button class="line-delete" data-action="delete-melting-issue-line" data-index="${index}">x</button>`
  ];
}

function meltingReturnScreen() {
  state.meltingReturns ||= [];
  meltingReturnDraft = normalizeMeltingReturn(meltingReturnDraft || state.meltingReturns[0] || defaultMeltingReturn());
  const record = meltingReturnDraft;
  const totals = meltingReturnFinancials(record);
  const issueActive = meltingReturnView === "Issue";
  return `
    <section class="classic-billing-shell clean-entry-shell panel smith-work-shell refinery-work-shell melting-work-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Save", "save-melting-return")}
        ${toolbarButton("Refresh", "refresh-melting-return")}
        ${toolbarButton("Search", "find-melting-return")}
        ${toolbarButton("Delete", "delete-melting-return")}
        ${toolbarButton("Close", "close-work-orders")}
      </div>
      <div class="classic-subtabs refinery-inner-tabs">
        <button class="${issueActive ? "" : "active"}" type="button" data-melting-return-view="Final Return">Final Return</button>
        <button class="${issueActive ? "active" : ""}" type="button" data-melting-return-view="Issue">Issue</button>
      </div>
      ${issueActive ? meltingReturnIssueDetails(record) : `
        ${meltingReturnHeader(record)}
        <section class="classic-entry-area billing-section refinery-final-table">
          <div class="classic-detail-grid">${table(meltingReturnColumns(), record.lines.map(meltingReturnRow))}</div>
        </section>
        ${meltingReturnTotals(record, totals)}
      `}
    </section>
  `;
}

function meltingReturnIssueDetails(returnRecord) {
  const issue = selectedMeltingIssue(returnRecord.pendingIssueId);
  const lines = issue?.lines || [];
  return `
    <div class="transaction-entry-header refinery-header melting-return-issue-header">
      <div class="classic-fields left">
        ${refineryIssuedReadout("Entry No, Ref No", issue?.entryNo, issue?.refNo, "", true)}
        ${refineryIssuedReadout("Date, Time", issue?.date, issue?.time, "", true)}
      </div>
      <div class="melting-issue-type-readout">
        <input value="${issue?.issueType || ""}" readonly aria-label="Issue type" />
      </div>
      <div class="classic-fields right">
        ${refineryIssuedReadout("Refiner Name", issue?.refinerName)}
        ${refineryPreparedByReadout(issue?.preparedBy)}
      </div>
    </div>
    <section class="classic-entry-area billing-section melting-return-issue-table">
      <div class="classic-detail-grid">
        ${table(meltingReturnIssueColumns(), lines.map(meltingReturnIssueRow))}
        ${issue ? "" : `<div class="refinery-issued-empty">Select a pending Melting Issue in Final Return to view its details.</div>`}
      </div>
    </section>
  `;
}

function meltingReturnIssueColumns() {
  return ["Sl", "Item Name", "Qty", "Gross Weight", "Net Weight", "Rate", "Amount"];
}

function meltingReturnIssueRow(line, index) {
  return [
    index + 1,
    line.itemName || "",
    numericValue(line.qty, 0),
    grams(line.gross),
    grams(line.net),
    money(line.rate),
    money(line.amount)
  ];
}

function meltingReturnHeader(record) {
  return `
    <div class="transaction-entry-header refinery-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Ref No</span><span class="field-pair"><input data-melting-return-field="entryNo" value="${record.entryNo}" /><input data-melting-return-field="refNo" value="${record.refNo}" /></span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair"><input type="date" data-melting-return-field="date" value="${toDateInputValue(record.date)}" /><input data-melting-return-field="time" value="${record.time}" /></span></label>
        <label class="classic-field split-field"><span>Pending</span><span class="field-pair">${meltingPendingDropdown("pendingIssueId", record.pendingIssueId, "data-melting-return-field")}<input value="${moneyValue(activeGoldRate())}" readonly /></span></label>
      </div>
      <div class="classic-fields right">
        <label class="classic-field"><span>Prepared By</span>${employeeDropdown("preparedBy", record.preparedBy, "data-melting-return-field")}</label>
        <label class="classic-field"><span>Remark</span><textarea data-melting-return-field="remark">${record.remark}</textarea></label>
      </div>
    </div>
  `;
}

function meltingReturnColumns() {
  return ["Sl", "Item Name", "Issued Weight", "Melting Loss", "Test Weight", "Received Weight", "Touch", "Rate", "Bottle Stock Weight", "Amount"];
}

function meltingReturnRow(line, index) {
  return [
    index + 1,
    editableMeltingReturnLineInput(index, "itemName", line.itemName),
    editableMeltingReturnLineInput(index, "issuedWeight", numericValue(line.issuedWeight), "decimal"),
    editableMeltingReturnLineInput(index, "meltingLoss", numericValue(line.meltingLoss), "decimal"),
    editableMeltingReturnLineInput(index, "testWeight", numericValue(line.testWeight), "decimal"),
    editableMeltingReturnLineInput(index, "receivedWeight", numericValue(line.receivedWeight), "decimal"),
    editableMeltingReturnLineInput(index, "touch", numericValue(line.touch), "decimal"),
    editableMeltingReturnLineInput(index, "rate", moneyValue(line.rate), "decimal"),
    editableMeltingReturnLineInput(index, "bottleStockWeight", numericValue(line.bottleStockWeight), "decimal"),
    `<input class="grid-input auto-field" value="${moneyValue(line.amount)}" readonly />`
  ];
}

function meltingReturnTotals(record, totals) {
  return `
    <div class="refinery-work-bottom refinery-final-bottom">
      <div class="classic-fields">
        ${meltingTotalInput("Refiner charge", moneyValue(record.refinerCharge), false, "refinerCharge")}
        ${meltingTotalInput("Addition", moneyValue(record.addition), false, "addition")}
        ${meltingTotalInput("Discount", moneyValue(record.discount), false, "discount")}
      </div>
      <div class="classic-fields">
        ${meltingTotalInput("Total", moneyValue(totals.total), true)}
        ${meltingTotalInput("Cash paid", moneyValue(record.cashPaid), false, "cashPaid")}
        ${meltingTotalInput("Balance", moneyValue(totals.balance), true)}
      </div>
    </div>
  `;
}

function refineryIssueHeader(record) {
  return `
    <div class="transaction-entry-header refinery-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Ref No</span><span class="field-pair"><input data-refinery-issue-field="entryNo" value="${record.entryNo}" /><input data-refinery-issue-field="refNo" value="${record.refNo}" /></span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair"><input type="date" data-refinery-issue-field="date" value="${toDateInputValue(record.date)}" /><input data-refinery-issue-field="time" value="${record.time}" /></span></label>
        <label class="classic-field split-field"><span>Expected Touch</span><span class="field-pair"><input class="important-input" data-refinery-issue-field="expectedTouch" value="${moneyValue(record.expectedTouch)}" />${plainSelect("metalType", record.metalType, ["Gold", "Silver"], "data-refinery-issue-field")}</span></label>
      </div>
      <div class="classic-fields right">
        <label class="classic-field"><span>Refiner Name</span>${refinerDropdown("refinerName", record.refinerName, "data-refinery-issue-field")}</label>
        <label class="classic-field"><span>Prepared By</span>${employeeDropdown("preparedBy", record.preparedBy, "data-refinery-issue-field")}</label>
        <label class="classic-field"><span>Remark</span><input data-refinery-issue-field="remark" value="${record.remark}" /></label>
      </div>
    </div>
  `;
}

function refineryIssueEntryColumns() {
  return ["ID", "Item Name", "Qty", "Gross", "Stone", "Net", "Rate", "Amount", "Add"];
}

function refineryIssueEntryRow(line) {
  return [
    editCell("itemId", line.itemId),
    editCell("itemName", line.itemName),
    editCell("qty", numericValue(line.qty, 0), "decimal"),
    editCell("gross", numericValue(line.gross), "decimal"),
    editCell("stone", numericValue(line.stone), "decimal"),
    autoCell("net", numericValue(line.net), "decimal"),
    editCell("rate", moneyValue(line.rate), "decimal"),
    autoCell("amount", moneyValue(line.amount), "decimal"),
    `<button class="grid-add-button" data-action="add-refinery-issue-line">+ Add</button>`
  ];
}

function refineryIssueColumns() {
  return ["SL", "ID", "Item Name", "Qty", "Gross", "Stone", "Net", "Rate", "Amount", "X"];
}

function refineryIssueRow(line, index) {
  return [
    index + 1,
    line.itemId || "",
    line.itemName || "",
    numericValue(line.qty, 0),
    grams(line.gross),
    grams(line.stone),
    grams(line.net),
    money(line.rate),
    money(line.amount),
    `<button class="line-delete" data-action="delete-refinery-issue-line" data-index="${index}">x</button>`
  ];
}

function refineryReturnScreen() {
  state.refineryReturns ||= [];
  refineryReturnDraft = normalizeRefineryReturn(refineryReturnDraft || state.refineryReturns[0] || defaultRefineryReturn());
  const record = refineryReturnDraft;
  const totals = refineryReturnFinancials(record);
  const issuedDetailsActive = refineryReturnView === "Issued Details";
  return `
    <section class="classic-billing-shell clean-entry-shell panel smith-work-shell refinery-work-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Save", "save-refinery-return")}
        ${toolbarButton("Refresh", "refresh-refinery-return")}
        ${toolbarButton("Edit", "edit-current-bill")}
        ${toolbarButton("Delete", "delete-refinery-return")}
        ${toolbarButton("Close", "close-work-orders")}
      </div>
      <div class="classic-subtabs refinery-inner-tabs">
        <button class="${issuedDetailsActive ? "" : "active"}" type="button" data-refinery-return-view="Test Return">Test Return</button>
        <button class="${issuedDetailsActive ? "active" : ""}" type="button" data-refinery-return-view="Issued Details">Issued Details</button>
      </div>
      ${issuedDetailsActive ? refineryIssuedDetails(record) : `
        ${refineryReturnHeader(record)}
        <section class="classic-entry-area billing-section refinery-return-table">
          <div class="classic-detail-grid">${table(refineryReturnColumns(), record.lines.map(refineryReturnRow))}</div>
        </section>
        <div class="refinery-work-bottom">
          ${refineryTotalInput("Issued Weight", numericValue(totals.issuedWeight), true)}
          ${refineryTotalInput("Melting Loss", numericValue(totals.meltingLoss), true)}
          ${refineryTotalInput("Received Weight", numericValue(totals.receivedWeight), true)}
          ${refineryTotalInput("Bottle Stock Weight", numericValue(totals.bottleStockWeight), true)}
          ${refineryTotalInput("Test Weight", numericValue(totals.testWeight), true)}
          ${refineryTotalInput("Reissue Weight", numericValue(totals.reissueWeight), true)}
        </div>
      `}
    </section>
  `;
}

function refineryIssuedDetails(returnRecord, extraClass = "") {
  const issue = selectedRefineryIssue(returnRecord.pendingIssueId);
  const lines = issue?.lines || [];
  return `
    <div class="transaction-entry-header refinery-header refinery-issued-header ${extraClass}">
      <div class="classic-fields left">
        ${refineryIssuedReadout("Entry No, Ref No", issue?.entryNo, issue?.refNo, "", true)}
        ${refineryIssuedReadout("Date, Time", issue?.date, issue?.time, "", true)}
        ${refineryIssuedReadout("Expected Touch", issue ? moneyValue(issue.expectedTouch) : "", "", "important-input")}
      </div>
      <div class="classic-fields right">
        ${refineryIssuedReadout("Refiner Name", issue?.refinerName)}
        ${refineryPreparedByReadout(issue?.preparedBy)}
        ${refineryIssuedReadout("Remark", issue?.remark)}
      </div>
    </div>
    <section class="classic-entry-area billing-section refinery-issued-table ${extraClass}">
      <div class="classic-detail-grid">
        ${table(refineryIssuedColumns(), lines.map(refineryIssuedRow))}
        ${issue ? "" : `<div class="refinery-issued-empty">Select a refinery pending issue in Test Return to view its issued details.</div>`}
      </div>
    </section>
  `;
}

function refineryIssuedReadout(label, first = "", second = "", inputClass = "", paired = false) {
  const inputs = `<input class="${inputClass}" value="${first || ""}" readonly />${paired ? `<input value="${second || ""}" readonly />` : ""}`;
  return `<label class="classic-field ${paired ? "split-field" : ""}"><span>${label}</span><span class="${paired ? "field-pair" : "issued-readout"}">${inputs}</span></label>`;
}

function refineryPreparedByReadout(value = "") {
  return `<label class="classic-field"><span>Prepared By</span>${readonlyEmployeeDropdown(value)}</label>`;
}

function refineryIssuedColumns() {
  return ["Sl", "Item Name", "Qty", "Gross Weight", "Stone Weight", "Net Weight", "Rate", "Amount"];
}

function refineryIssuedRow(line, index) {
  return [
    index + 1,
    line.itemName || "",
    numericValue(line.qty, 0),
    grams(line.gross),
    grams(line.stone),
    grams(line.net),
    money(line.rate),
    money(line.amount)
  ];
}

function refineryReturnHeader(record) {
  return `
    <div class="transaction-entry-header refinery-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Ref No</span><span class="field-pair"><input data-refinery-return-field="entryNo" value="${record.entryNo}" /><input data-refinery-return-field="refNo" value="${record.refNo}" /></span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair"><input type="date" data-refinery-return-field="date" value="${toDateInputValue(record.date)}" /><input data-refinery-return-field="time" value="${record.time}" /></span></label>
        <label class="classic-field"><span>Refinary Pending</span>${refineryPendingDropdown("pendingIssueId", record.pendingIssueId, "data-refinery-return-field")}</label>
      </div>
      <div class="classic-fields right">
        <label class="classic-field"><span>Prepared By</span>${employeeDropdown("preparedBy", record.preparedBy, "data-refinery-return-field")}</label>
        <label class="classic-field"><span>Remark</span><input data-refinery-return-field="remark" value="${record.remark}" /></label>
      </div>
    </div>
  `;
}

function refineryReturnColumns() {
  return ["Sl", "Item Name", "Issued Weight", "Melting Loss", "Received Weight", "Bottle Stock Weight", "Test Weight", "Reissue Weight"];
}

function refineryReturnRow(line, index) {
  return [
    index + 1,
    editableRefineryLineInput("return", index, "itemName", line.itemName),
    editableRefineryLineInput("return", index, "issuedWeight", numericValue(line.issuedWeight), "decimal"),
    editableRefineryLineInput("return", index, "meltingLoss", numericValue(line.meltingLoss), "decimal"),
    editableRefineryLineInput("return", index, "receivedWeight", numericValue(line.receivedWeight), "decimal"),
    editableRefineryLineInput("return", index, "bottleStockWeight", numericValue(line.bottleStockWeight), "decimal"),
    editableRefineryLineInput("return", index, "testWeight", numericValue(line.testWeight), "decimal"),
    editableRefineryLineInput("return", index, "reissueWeight", numericValue(line.reissueWeight), "decimal")
  ];
}

function refineryFinalReturnScreen() {
  state.refineryFinalReturns ||= [];
  refineryFinalDraft = normalizeRefineryFinalReturn(refineryFinalDraft || state.refineryFinalReturns[0] || defaultRefineryFinalReturn());
  const record = refineryFinalDraft;
  const totals = refineryFinalFinancials(record);
  const isFinalReturn = refineryFinalView === "Final Return";
  const isTestReturn = refineryFinalView === "Test Return";
  return `
    <section class="classic-billing-shell clean-entry-shell panel smith-work-shell refinery-work-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Save F9", "save-refinery-final")}
        ${toolbarButton("Refresh", "refresh-refinery-final")}
        ${toolbarButton("Find", "find-refinery-final")}
        ${toolbarButton("Delete", "delete-refinery-final")}
        ${toolbarButton("Close", "close-work-orders")}
        <strong class="classic-rate">Gold 24ct: ${moneyValue(activeGoldRate())}</strong>
        <strong class="classic-rate">Gold Rate <input class="mini-rate" value="${moneyValue(activeGoldRate())}" readonly /></strong>
      </div>
      <div class="classic-subtabs refinery-inner-tabs">
        <button class="${isFinalReturn ? "active" : ""}" type="button" data-refinery-final-view="Final Return">Final Return</button>
        <button class="${isTestReturn ? "active" : ""}" type="button" data-refinery-final-view="Test Return">Test Return</button>
        <button class="${!isFinalReturn && !isTestReturn ? "active" : ""}" type="button" data-refinery-final-view="Issue">Issue</button>
      </div>
      ${isFinalReturn ? `
        ${refineryFinalHeader(record, totals)}
        <section class="classic-entry-area billing-section refinery-final-table">
          <div class="classic-detail-grid">${table(refineryFinalColumns(), record.lines.map(refineryFinalRow))}</div>
        </section>
        ${refineryFinalTotals(record, totals)}
      ` : isTestReturn
        ? refineryFinalTestReturnDetails(record)
        : refineryIssuedDetails(record, "refinery-final-issue-view")}
    </section>
  `;
}

function refineryFinalTestReturnDetails(finalRecord) {
  const returnRecord = selectedRefineryReturn(finalRecord.pendingIssueId);
  const lines = returnRecord?.lines || [];
  return `
    <div class="transaction-entry-header refinery-header refinery-test-return-header">
      <div class="classic-fields left">
        ${refineryIssuedReadout("Entry No, Ref No", returnRecord?.entryNo, returnRecord?.refNo, "", true)}
        ${refineryIssuedReadout("Date, Time", returnRecord?.date, returnRecord?.time, "", true)}
      </div>
      <div class="refinery-test-touch">
        <input value="${moneyValue(finalRecord.expectedTouch)}" readonly aria-label="Expected touch" />
      </div>
      <div class="classic-fields right">
        ${refineryPreparedByReadout(returnRecord?.preparedBy)}
        ${refineryIssuedReadout("Remark", returnRecord?.remark)}
      </div>
    </div>
    <section class="classic-entry-area billing-section refinery-final-test-table">
      <div class="classic-detail-grid">
        ${table(refineryFinalTestColumns(), lines.map(refineryFinalTestRow))}
        ${returnRecord ? "" : `<div class="refinery-issued-empty">Save a Test Return for the selected pending issue to view its details here.</div>`}
      </div>
    </section>
  `;
}

function refineryFinalTestColumns() {
  return ["Sl", "Item Name", "Issued Weight", "Mud Less", "Received Weight", "Bottle Stock Weight", "Test Weight", "Reissue Weight"];
}

function refineryFinalTestRow(line, index) {
  return [
    index + 1,
    line.itemName || "",
    grams(line.issuedWeight),
    grams(line.meltingLoss),
    grams(line.receivedWeight),
    grams(line.bottleStockWeight),
    grams(line.testWeight),
    grams(line.reissueWeight)
  ];
}

function refineryFinalHeader(record, totals) {
  return `
    <div class="transaction-entry-header refinery-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Ref No</span><span class="field-pair"><input data-refinery-final-field="entryNo" value="${record.entryNo}" /><input data-refinery-final-field="refNo" value="${record.refNo}" /></span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair"><input type="date" data-refinery-final-field="date" value="${toDateInputValue(record.date)}" /><input data-refinery-final-field="time" value="${record.time}" /></span></label>
        <label class="classic-field"><span>Refinary Pending</span>${refineryPendingDropdown("pendingIssueId", record.pendingIssueId, "data-refinery-final-field")}</label>
        <label class="classic-field split-field"><span>Expected, Diff. Touch</span><span class="field-pair"><input data-refinery-final-field="expectedTouch" value="${moneyValue(record.expectedTouch)}" /><input data-refinery-final-field="diffTouch" value="${moneyValue(record.diffTouch)}" /></span></label>
      </div>
      <div class="classic-fields right">
        <label class="classic-field"><span>Prepared By</span>${employeeDropdown("preparedBy", record.preparedBy, "data-refinery-final-field")}</label>
        <label class="classic-field"><span>Remark</span><textarea data-refinery-final-field="remark">${record.remark}</textarea></label>
        <label class="classic-field split-field"><span>Issued, Refined Amt</span><span class="field-pair"><input value="${moneyValue(refineryIssueFinancials(selectedRefineryIssue(record.pendingIssueId) || {}).issueAmount)}" readonly /><input value="${moneyValue(totals.refinedAmount)}" readonly /></span></label>
      </div>
    </div>
  `;
}

function refineryFinalColumns() {
  return ["Sl", "Item Name", "Received Weight", "Aciding Loss", "Test Weight", "Touch", "Bottle Stock Weight", "Rate", "Amount"];
}

function refineryFinalRow(line, index) {
  return [
    index + 1,
    editableRefineryLineInput("final", index, "itemName", line.itemName),
    editableRefineryLineInput("final", index, "receivedWeight", numericValue(line.receivedWeight), "decimal"),
    editableRefineryLineInput("final", index, "acidingLoss", numericValue(line.acidingLoss), "decimal"),
    editableRefineryLineInput("final", index, "testWeight", numericValue(line.testWeight), "decimal"),
    editableRefineryLineInput("final", index, "touch", numericValue(line.touch), "decimal"),
    editableRefineryLineInput("final", index, "bottleStockWeight", numericValue(line.bottleStockWeight), "decimal"),
    editableRefineryLineInput("final", index, "rate", moneyValue(line.rate), "decimal"),
    `<input class="grid-input auto-field" value="${moneyValue(line.amount)}" readonly />`
  ];
}

function refineryFinalTotals(record, totals) {
  return `
    <div class="refinery-work-bottom refinery-final-bottom">
      <div class="classic-fields">
        ${refineryTotalInput("Refiner charge", moneyValue(record.refinerCharge), false, "refinerCharge")}
        ${refineryTotalInput("Addition", moneyValue(record.addition), false, "addition")}
        ${refineryTotalInput("Discount", moneyValue(record.discount), false, "discount")}
      </div>
      <div class="classic-fields">
        ${refineryTotalInput("Total", moneyValue(totals.total), true)}
        ${refineryTotalInput("Cash paid", moneyValue(record.cashPaid), false, "cashPaid")}
        ${refineryTotalInput("Balance", moneyValue(totals.balance), true)}
      </div>
    </div>
  `;
}

function editableRefineryLineInput(kind, index, field, value, inputMode = "text") {
  const attr = kind === "final" ? "data-refinery-final-line-field" : "data-refinery-return-line-field";
  return `<input class="grid-input" ${attr}="${field}" data-index="${index}" inputmode="${inputMode}" value="${value ?? ""}" />`;
}

function editableMeltingReturnLineInput(index, field, value, inputMode = "text") {
  return `<input class="grid-input" data-melting-return-line-field="${field}" data-index="${index}" inputmode="${inputMode}" value="${value ?? ""}" />`;
}

function refineryTotalInput(label, value, readonly = true, field = "") {
  const attr = field ? `data-refinery-final-field="${field}"` : "";
  return `<label class="classic-total-box wide"><span>${label}</span><input ${attr} value="${value}" ${readonly ? "readonly" : ""} /></label>`;
}

function meltingTotalInput(label, value, readonly = true, field = "") {
  const attr = field ? `data-melting-return-field="${field}"` : "";
  return `<label class="classic-total-box wide"><span>${label}</span><input ${attr} value="${value}" ${readonly ? "readonly" : ""} /></label>`;
}

function refinerDropdown(field, value, attr) {
  const options = ["", ...refinerOptions()];
  return `<select class="classic-input" ${attr}="${field}">${options.map((option) => `<option ${option === value ? "selected" : ""}>${option}</option>`).join("")}</select>`;
}

function refineryPendingDropdown(field, value, attr) {
  const options = refineryPendingOptions();
  return `<select class="classic-input" ${attr}="${field}">
    <option value="">Select pending issue</option>
    ${options.map((option) => `<option value="${option.id}" ${option.id === value ? "selected" : ""}>${option.label}</option>`).join("")}
  </select>`;
}

function meltingPendingDropdown(field, value, attr) {
  const options = meltingPendingOptions();
  return `<select class="classic-input" ${attr}="${field}">
    <option value="">Select pending issue</option>
    ${options.map((option) => `<option value="${option.id}" ${option.id === value ? "selected" : ""}>${option.label}</option>`).join("")}
  </select>`;
}

function smithWorkOrders() {
  const tabs = workOrderView === "Jeweller"
    ? ["Jeweller", "Cash for Weight Jeweller"]
    : ["Smith", "Cash for Weight Smith"];
  if (!tabs.includes(smithWorkView)) smithWorkView = tabs[0];
  const activeScreen = smithWorkView === "Cash for Weight Smith"
    ? cashForWeightSmithScreen()
    : smithWorkView === "Jeweller"
      ? jewellerWorkOrderScreen()
      : smithWorkView === "Cash for Weight Jeweller"
        ? cashForWeightJewellerScreen()
        : smithWorkOrderScreen();
  return `
    ${moduleSwitcher("Work Orders", WORK_ORDER_ITEMS, workOrderView, "data-work-section")}
    <section class="panel management-hero work-smith-hero">
      <div>
        <p class="eyebrow">Work order workflow</p>
        <h2>${smithWorkView}</h2>
        <p>Issue, receive, pay by weight and keep Smith/Jeweller touch and wastage balances in one compact window.</p>
      </div>
      <div class="module-tabs compact-tabs">
        ${tabs.map((item) => `<button class="module-tab ${smithWorkView === item ? "active" : ""}" data-smith-work-view="${item}">${item}</button>`).join("")}
      </div>
    </section>
    ${activeScreen}
  `;
}

function smithWorkOrderScreen() {
  state.smithWorkOrders ||= [];
  smithWorkDraft = normalizeSmithWorkOrder(smithWorkDraft || state.smithWorkOrders[0] || defaultSmithWorkOrder());
  const bill = smithWorkDraft;
  const totals = smithWorkFinancials(bill);
  return `
    <section class="classic-billing-shell clean-entry-shell panel smith-work-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Refresh", "refresh-smith-work")}
        ${toolbarButton("Save", "save-smith-work")}
        ${toolbarButton("Edit", "edit-current-bill")}
        ${toolbarButton("Delete", "delete-smith-work")}
        ${toolbarButton("Previous", "previous-bill")}
        ${toolbarButton("Next", "next-bill")}
        ${toolbarButton("Print", "print-smith-work")}
        ${toolbarButton("Add Exp", "open-account")}
        ${toolbarButton("Close", "close-work-orders")}
        <strong class="classic-rate">Gold Rate <input class="mini-rate" data-smith-field="goldRate" value="${moneyValue(activeGoldRate())}" readonly /></strong>
      </div>
      ${smithWorkHeader(bill)}
      ${classicTransactionTable("smith-work-entry", smithWorkEntryColumns(), smithWorkEntryRow(defaultSmithWorkLine()), smithWorkColumns(), bill.lines.map(smithWorkRow))}
      ${smithWorkTotals(bill, totals)}
    </section>
  `;
}

function cashForWeightSmithScreen() {
  state.cashWeightSmiths ||= [];
  cashWeightSmithDraft = normalizeCashWeightSmith(cashWeightSmithDraft || state.cashWeightSmiths[0] || defaultCashWeightSmith());
  const record = cashWeightSmithDraft;
  const totals = cashWeightSmithFinancials(record);
  return `
    <section class="classic-billing-shell clean-entry-shell panel smith-work-shell cash-weight-smith-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Refresh", "refresh-cash-smith")}
        ${toolbarButton("Save", "save-cash-smith")}
        ${toolbarButton("Edit", "edit-current-bill")}
        ${toolbarButton("Delete", "delete-cash-smith")}
        ${toolbarButton("Previous", "previous-bill")}
        ${toolbarButton("Next", "next-bill")}
        ${toolbarButton("Print", "print-cash-smith")}
        ${toolbarButton("Close", "close-work-orders")}
        <strong class="classic-rate">Gold Rate <input class="mini-rate" value="${moneyValue(activeGoldRate())}" readonly /></strong>
      </div>
      ${cashWeightSmithHeader(record)}
      ${classicTransactionTable("cash-smith-entry", cashWeightSmithEntryColumns(), cashWeightSmithEntryRow(defaultCashWeightSmithLine()), cashWeightSmithColumns(), record.lines.map(cashWeightSmithRow))}
      ${cashWeightSmithTotals(record, totals)}
    </section>
  `;
}

function jewellerWorkOrderScreen() {
  state.jewellerWorkOrders ||= [];
  jewellerWorkDraft = normalizeJewellerWorkOrder(jewellerWorkDraft || state.jewellerWorkOrders[0] || defaultJewellerWorkOrder());
  const bill = jewellerWorkDraft;
  const totals = jewellerWorkFinancials(bill);
  return `
    <section class="classic-billing-shell clean-entry-shell panel smith-work-shell jeweller-work-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Refresh", "refresh-jeweller-work")}
        ${toolbarButton("Save", "save-jeweller-work")}
        ${toolbarButton("Edit", "edit-current-bill")}
        ${toolbarButton("Delete", "delete-jeweller-work")}
        ${toolbarButton("Print", "print-jeweller-work")}
        ${toolbarButton("Previous", "previous-bill")}
        ${toolbarButton("Next", "next-bill")}
        ${toolbarButton("Export", "export-report")}
        ${toolbarButton("Import", "import-stock")}
        ${toolbarButton("Close", "close-work-orders")}
        ${toolbarButton("AccRepost", "open-account")}
        <strong class="classic-rate">Gold Rate <input class="mini-rate" value="${moneyValue(activeGoldRate())}" readonly /></strong>
      </div>
      ${jewellerWorkHeader(bill)}
      ${classicTransactionTable("jeweller-work-entry", jewellerWorkEntryColumns(), jewellerWorkEntryRow(defaultJewellerWorkLine()), jewellerWorkColumns(), bill.lines.map(jewellerWorkRow))}
      ${jewellerWorkTotals(bill, totals)}
    </section>
  `;
}

function cashForWeightJewellerScreen() {
  state.cashWeightJewellers ||= [];
  cashWeightJewellerDraft = normalizeCashWeightJeweller(cashWeightJewellerDraft || state.cashWeightJewellers[0] || defaultCashWeightJeweller());
  const record = cashWeightJewellerDraft;
  const totals = cashWeightJewellerFinancials(record);
  return `
    <section class="classic-billing-shell clean-entry-shell panel smith-work-shell cash-weight-jeweller-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Refresh", "refresh-cash-jeweller")}
        ${toolbarButton("Save", "save-cash-jeweller")}
        ${toolbarButton("Edit", "edit-current-bill")}
        ${toolbarButton("Delete", "delete-cash-jeweller")}
        ${toolbarButton("Previous", "previous-bill")}
        ${toolbarButton("Next", "next-bill")}
        ${toolbarButton("Print", "print-cash-jeweller")}
        ${toolbarButton("Close", "close-work-orders")}
        <strong class="classic-rate">Gold Rate <input class="mini-rate" value="${moneyValue(activeGoldRate())}" readonly /></strong>
      </div>
      ${cashWeightJewellerHeader(record)}
      ${classicTransactionTable("cash-jeweller-entry", cashWeightSmithEntryColumns(), cashWeightJewellerEntryRow(defaultCashWeightSmithLine()), cashWeightSmithColumns(), record.lines.map(cashWeightJewellerRow))}
      ${cashWeightJewellerTotals(record, totals)}
    </section>
  `;
}

function smithWorkHeader(bill) {
  return `
    <div class="transaction-entry-header smith-work-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Ref. No</span><span class="field-pair"><input data-smith-field="entryNo" value="${bill.entryNo}" /><input data-smith-field="refNo" value="${bill.refNo}" /></span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair"><input type="date" data-smith-field="date" value="${toDateInputValue(bill.date)}" /><input data-smith-field="time" value="${bill.time}" /></span></label>
        <label class="classic-field split-field"><span>Mode, Trans Type</span><span class="field-pair">${plainSelect("paymentMode", bill.paymentMode, ["Cash", "Credit", "Bank"], "data-smith-field")}${plainSelect("transType", bill.transType, ["Normal", "Issue", "Return", "Final Return", "Melting Issue", "Melting Return"], "data-smith-field")}</span></label>
      </div>
      <div class="classic-fields middle smith-flags">
        <label class="checkbox-line"><input type="checkbox" data-smith-check="taxable" ${bill.taxable ? "checked" : ""} /> <strong class="danger-text">Taxable</strong></label>
        <label class="checkbox-line"><input type="checkbox" data-smith-check="skipStone" ${bill.skipStone ? "checked" : ""} /> Skip Stone &lt;F11&gt;</label>
        <label class="checkbox-line"><input type="checkbox" data-smith-check="itemTouch" ${bill.itemTouch ? "checked" : ""} /> Item Touch</label>
      </div>
      <div class="classic-fields right">
        <label class="classic-field split-field"><span>Smith Name</span><span class="field-pair short-code"><input data-smith-field="smithCode" value="${bill.smithCode}" />${smithDropdown("smithName", bill.smithName, "data-smith-field")}</span></label>
        <label class="classic-field split-field"><span>Prepared By</span><span class="field-pair short-code"><input value="${staffCodeForName(bill.preparedBy)}" readonly />${employeeDropdown("preparedBy", bill.preparedBy, "data-smith-field")}</span></label>
      </div>
    </div>
  `;
}

function cashWeightSmithHeader(record) {
  return `
    <div class="transaction-entry-header smith-work-header cash-smith-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Date</span><span class="field-pair"><input data-cash-smith-field="entryNo" value="${record.entryNo}" /><input type="date" data-cash-smith-field="date" value="${toDateInputValue(record.date)}" /></span></label>
        <label class="classic-field split-field"><span>Ref. No, Time</span><span class="field-pair"><input data-cash-smith-field="refNo" value="${record.refNo}" /><input data-cash-smith-field="time" value="${record.time}" /></span></label>
        <label class="classic-field split-field"><span>Mode, Party Type</span><span class="field-pair">${plainSelect("mode", record.mode, ["Payment", "Receipt"], "data-cash-smith-field")}<select class="classic-input" data-cash-smith-field="partyType"><option selected>Smith</option></select></span></label>
      </div>
      <div class="classic-fields middle">
        <label class="checkbox-line on-account-line"><input type="checkbox" data-cash-smith-check="onAccount" ${record.onAccount ? "checked" : ""} /> On Account</label>
      </div>
      <div class="classic-fields right">
        <label class="classic-field split-field"><span>Party Name</span><span class="field-pair short-code"><input data-cash-smith-field="partyCode" value="${record.partyCode}" />${smithDropdown("partyName", record.partyName, "data-cash-smith-field")}</span></label>
        <label class="classic-field split-field"><span>Prepared By</span><span class="field-pair short-code"><input value="${staffCodeForName(record.preparedBy)}" readonly />${employeeDropdown("preparedBy", record.preparedBy, "data-cash-smith-field")}</span></label>
        <label class="classic-field split-field"><span>Cash / Bank</span><span class="field-pair short-code"><input data-cash-smith-field="cashBankCode" value="${record.cashBankCode}" />${cashBankDropdown("cashBank", record.cashBank, "data-cash-smith-field")}</span></label>
      </div>
    </div>
  `;
}

function jewellerWorkHeader(bill) {
  return `
    <div class="transaction-entry-header smith-work-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Date</span><span class="field-pair"><input data-jeweller-field="entryNo" value="${bill.entryNo}" /><input type="date" data-jeweller-field="date" value="${toDateInputValue(bill.date)}" /></span></label>
        <label class="classic-field split-field"><span>Ref. No, Time</span><span class="field-pair"><input data-jeweller-field="refNo" value="${bill.refNo}" /><input data-jeweller-field="time" value="${bill.time}" /></span></label>
        <label class="classic-field split-field"><span>Mode,Trans Type</span><span class="field-pair">${plainSelect("paymentMode", bill.paymentMode, ["Cash", "Credit", "Bank"], "data-jeweller-field")}${plainSelect("transType", bill.transType, ["Normal Work", "Issue", "Return", "Final Return", "Melting Issue", "Melting Return"], "data-jeweller-field")}</span></label>
      </div>
      <div class="classic-fields middle smith-flags">
        <label class="checkbox-line"><input type="checkbox" data-jeweller-check="skipStone" ${bill.skipStone ? "checked" : ""} /> Skip Stone &lt;F11&gt;</label>
        <label class="checkbox-line"><input type="checkbox" data-jeweller-check="itemTouch" ${bill.itemTouch ? "checked" : ""} /> Item Touch</label>
      </div>
      <div class="classic-fields right">
        <label class="checkbox-line"><input type="checkbox" data-jeweller-check="jewellerChecked" ${bill.jewellerChecked ? "checked" : ""} /> Jeweller</label>
        <label class="classic-field split-field"><span>Jeweller</span><span class="field-pair short-code"><input data-jeweller-field="jewellerCode" value="${bill.jewellerCode}" />${jewellerDropdown("jewellerName", bill.jewellerName, "data-jeweller-field")}</span></label>
        <label class="classic-field split-field"><span>Prepared By</span><span class="field-pair short-code"><input value="${staffCodeForName(bill.preparedBy)}" readonly />${employeeDropdown("preparedBy", bill.preparedBy, "data-jeweller-field")}</span></label>
      </div>
    </div>
  `;
}

function cashWeightJewellerHeader(record) {
  return `
    <div class="transaction-entry-header smith-work-header cash-smith-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Date</span><span class="field-pair"><input data-cash-jeweller-field="entryNo" value="${record.entryNo}" /><input type="date" data-cash-jeweller-field="date" value="${toDateInputValue(record.date)}" /></span></label>
        <label class="classic-field split-field"><span>Ref. No, Time</span><span class="field-pair"><input data-cash-jeweller-field="refNo" value="${record.refNo}" /><input data-cash-jeweller-field="time" value="${record.time}" /></span></label>
        <label class="classic-field split-field"><span>Mode, Party Type</span><span class="field-pair">${plainSelect("mode", record.mode, ["Payment", "Receipt"], "data-cash-jeweller-field")}<select class="classic-input" data-cash-jeweller-field="partyType"><option selected>Jeweller</option></select></span></label>
      </div>
      <div class="classic-fields middle">
        <label class="checkbox-line on-account-line"><input type="checkbox" data-cash-jeweller-check="onAccount" ${record.onAccount ? "checked" : ""} /> On Account</label>
      </div>
      <div class="classic-fields right">
        <label class="classic-field split-field"><span>Party Name</span><span class="field-pair short-code"><input data-cash-jeweller-field="partyCode" value="${record.partyCode}" />${jewellerDropdown("partyName", record.partyName, "data-cash-jeweller-field")}</span></label>
        <label class="classic-field split-field"><span>Prepared By</span><span class="field-pair short-code"><input value="${staffCodeForName(record.preparedBy)}" readonly />${employeeDropdown("preparedBy", record.preparedBy, "data-cash-jeweller-field")}</span></label>
        <label class="classic-field split-field"><span>Cash / Bank</span><span class="field-pair short-code"><input data-cash-jeweller-field="cashBankCode" value="${record.cashBankCode}" />${cashBankDropdown("cashBank", record.cashBank, "data-cash-jeweller-field")}</span></label>
      </div>
    </div>
  `;
}

function plainSelect(field, value, options, attr) {
  return `<select class="classic-input" ${attr}="${field}">${options.map((option) => `<option ${option === value ? "selected" : ""}>${option}</option>`).join("")}</select>`;
}

function smithDropdown(field, value, attr) {
  const options = (state.parties || []).filter((party) => party.type === "Smith").map((party) => party.name).filter(Boolean);
  const list = options.length ? ["", ...options] : ["", "PRABBHA", "Heera Chains", "MJ GOLD"];
  return `<select class="classic-input" ${attr}="${field}">${list.map((option) => `<option ${option === value ? "selected" : ""}>${option}</option>`).join("")}</select>`;
}

function jewellerDropdown(field, value, attr) {
  const options = (state.parties || []).filter((party) => party.type === "Jeweller").map((party) => party.name).filter(Boolean);
  const list = options.length ? ["", ...options] : ["", "Babu Jeweller", "MJ GOLD", "A J C M GOLD"];
  return `<select class="classic-input" ${attr}="${field}">${list.map((option) => `<option ${option === value ? "selected" : ""}>${option}</option>`).join("")}</select>`;
}

function employeeDropdown(field, value, attr) {
  const options = (state.staffs || []).map((staff) => staff.name).filter(Boolean);
  const list = options.length ? ["", ...options] : ["", "BIJU GEORGE", "ABDUL SALAM AP"];
  return `<select class="classic-input" ${attr}="${field}">${list.map((option) => `<option ${option === value ? "selected" : ""}>${option}</option>`).join("")}</select>`;
}

function readonlyEmployeeDropdown(value = "") {
  const options = staffNameOptions();
  const hasSelectedStaff = options.includes(value);
  return `<select class="classic-input prepared-by-readonly" disabled aria-label="Prepared By">
    <option value="" ${hasSelectedStaff ? "" : "selected"}>Select staff</option>
    ${options.map((option) => `<option ${option === value ? "selected" : ""}>${option}</option>`).join("")}
  </select>`;
}

function cashBankDropdown(field, value, attr) {
  const options = (state.accountMasters || []).filter((account) => /bank|cash/i.test(`${account.subSchedule} ${account.accountName}`)).map((account) => account.accountName);
  const list = options.length ? options : ["Cash in Hand", "Canara Bank Edakkara", "Scheme Cash"];
  return `<select class="classic-input" ${attr}="${field}">${list.map((option) => `<option ${option === value ? "selected" : ""}>${option}</option>`).join("")}</select>`;
}

function staffCodeForName(name) {
  const staff = (state.staffs || []).find((item) => item.name === name);
  return staff?.employeeId || staff?.staffId || "";
}

function smithOpeningWeight(name) {
  const smith = (state.parties || []).find((party) => party.type === "Smith" && party.name === name);
  return Number(smith?.openingWeight || 0);
}

function jewellerOpeningWeight(name) {
  const jeweller = (state.parties || []).find((party) => party.type === "Jeweller" && party.name === name);
  return Number(jeweller?.openingWeight || 0);
}

function smithWorkEntryColumns() {
  return ["ID", "Barcode", "Item Name", "Mode", "Qty", "Gross", "Stone", "Touch", "Wastage", "SM Wght", "Stn Chge", "MC/Grm", "MC", "HMC", "Rate", "Total", "Add"];
}

function smithWorkColumns() {
  return ["Sl", "X", "Barcode", "Item Name", "Mode", "Nos", "Gross", "Stone", "Touch", "Wastage", "SmWght", "StnCharge", "MC/Grm", "MC", "HMC", "Rate", "MudLess", "Total"];
}

function smithWorkEntryRow(line) {
  return [
    editCell("id", ""),
    editCell("barcode", ""),
    editCell("itemName", ""),
    selectCell("mode", "IN", ["IN", "OUT"]),
    editCell("qty", "0", "decimal"),
    editCell("gross", "0.000", "decimal"),
    editCell("stone", "0.000", "decimal"),
    editCell("touch", "0.00", "decimal"),
    editCell("wastage", "0.000", "decimal"),
    autoCell("smWeight", "0.000", "decimal"),
    editCell("stoneCharge", "0.000", "decimal"),
    editCell("mcGram", "0.000", "decimal"),
    autoCell("mc", "0.000", "decimal"),
    editCell("hmc", "0.000", "decimal"),
    editCell("rate", moneyValue(activeGoldRate()), "decimal"),
    autoCell("total", "0.000", "decimal"),
    `<button class="grid-add-button" data-action="add-smith-work-line">+</button>`
  ];
}

function smithWorkRow(line, index) {
  return [
    index + 1,
    `<button class="line-delete" data-action="delete-smith-work-line" data-index="${index}">x</button>`,
    line.barcode || "-",
    line.itemName || "-",
    line.mode,
    numericValue(line.qty, 0),
    grams(line.gross),
    grams(line.stone),
    numericValue(line.touch, 2),
    numericValue(line.wastage),
    grams(line.smWeight),
    money(line.stoneCharge),
    moneyValue(line.mcGram),
    money(line.mc),
    money(line.hmc),
    money(line.rate),
    grams(line.mudLess),
    money(line.total)
  ];
}

function cashWeightSmithEntryColumns() {
  return ["Amount", "Rate", "Weight", "Touch", "Convert", "Net Weight", "Add"];
}

function cashWeightSmithColumns() {
  return ["Sl", "X", "Amount", "Rate", "Weight", "Touch", "Convert", "Net Weight"];
}

function cashWeightSmithEntryRow() {
  return [
    editCell("amount", "0.000", "decimal"),
    editCell("rate", moneyValue(activeGoldRate()), "decimal"),
    editCell("weight", "0.000", "decimal"),
    editCell("touch", "99.50", "decimal"),
    editCell("convert", "100.00", "decimal"),
    autoCell("netWeight", "0.000", "decimal"),
    `<button class="grid-add-button" data-action="add-cash-smith-line">Add</button>`
  ];
}

function cashWeightSmithRow(line, index) {
  return [
    index + 1,
    `<button class="line-delete" data-action="delete-cash-smith-line" data-index="${index}">x</button>`,
    money(line.amount),
    money(line.rate),
    grams(line.weight),
    numericValue(line.touch, 2),
    numericValue(line.convert, 2),
    grams(line.netWeight)
  ];
}

function jewellerWorkEntryColumns() {
  return ["ID", "Barcode", "Item Name", "Mode", "Qty", "Gross", "Stone", "Wastage", "Touch", "JW Wght", "Stn Chge", "Mc/Grm", "VA%", "MC Amt", "HMC", "Rate", "Total", "Add"];
}

function jewellerWorkColumns() {
  return ["#", "X", "Barcode", "Item Name", "Mode", "Qty", "Gross", "Stone", "Wastage", "Touch", "JwWght", "StnCharge", "MC/Grm", "VA%", "MC", "HMC", "Rate", "MudLess", "Pure Wght", "Total", "Net", "ICode", "Item ID", "Bar Slno", "GType", "IType", "Descri"];
}

function jewellerWorkEntryRow(line) {
  return [
    editCell("id", ""),
    editCell("barcode", ""),
    editCell("itemName", ""),
    selectCell("mode", line.mode || "OUT", ["IN", "OUT"]),
    editCell("qty", "0", "decimal"),
    editCell("gross", "0.000", "decimal"),
    editCell("stone", "0.000", "decimal"),
    editCell("wastage", "0.000", "decimal"),
    editCell("touch", "0.00", "decimal"),
    autoCell("jwWeight", "0.000", "decimal"),
    editCell("stoneCharge", "0.000", "decimal"),
    editCell("mcGram", "0.000", "decimal"),
    editCell("vaPercent", "0.00", "decimal"),
    autoCell("mc", "0.000", "decimal"),
    editCell("hmc", "0.000", "decimal"),
    editCell("rate", moneyValue(activeGoldRate()), "decimal"),
    autoCell("total", "0.000", "decimal"),
    `<button class="grid-add-button" data-action="add-jeweller-work-line">Add</button>`
  ];
}

function jewellerWorkRow(line, index) {
  return [
    index + 1,
    `<button class="line-delete" data-action="delete-jeweller-work-line" data-index="${index}">x</button>`,
    line.barcode || "-",
    line.itemName || "-",
    line.mode,
    numericValue(line.qty, 0),
    grams(line.gross),
    grams(line.stone),
    numericValue(line.wastage),
    numericValue(line.touch, 2),
    grams(line.jwWeight),
    money(line.stoneCharge),
    moneyValue(line.mcGram),
    numericValue(line.vaPercent, 2),
    money(line.mc),
    money(line.hmc),
    money(line.rate),
    grams(line.mudLess),
    grams(line.pureWeight),
    money(line.total),
    grams(line.net),
    line.iCode || "",
    line.itemId || "",
    line.barSlno || "",
    line.gType || "",
    line.iType || "",
    line.description || ""
  ];
}

function cashWeightJewellerEntryRow() {
  return [
    editCell("amount", "0.000", "decimal"),
    editCell("rate", moneyValue(activeGoldRate()), "decimal"),
    editCell("weight", "0.000", "decimal"),
    editCell("touch", "99.50", "decimal"),
    editCell("convert", "100.00", "decimal"),
    autoCell("netWeight", "0.000", "decimal"),
    `<button class="grid-add-button" data-action="add-cash-jeweller-line">Add</button>`
  ];
}

function cashWeightJewellerRow(line, index) {
  return [
    index + 1,
    `<button class="line-delete" data-action="delete-cash-jeweller-line" data-index="${index}">x</button>`,
    money(line.amount),
    money(line.rate),
    grams(line.weight),
    numericValue(line.touch, 2),
    numericValue(line.convert, 2),
    grams(line.netWeight)
  ];
}

function smithWorkFinancials(bill) {
  const lines = (bill.lines || []).map(normalizeSmithWorkLine);
  const totalIn = lines.filter((line) => line.mode === "IN");
  const totalOut = lines.filter((line) => line.mode === "OUT");
  const totalInQty = sumField(totalIn, "qty");
  const totalOutQty = sumField(totalOut, "qty");
  const totalInWeight = sumField(totalIn, "smWeight");
  const totalOutWeight = sumField(totalOut, "smWeight");
  const smWeight = totalInWeight - totalOutWeight;
  const opening = smithOpeningWeight(bill.smithName);
  const closing = opening + smWeight;
  const stoneAmt = sumField(lines, "stoneCharge");
  const smithMc = sumField(lines, "mc");
  const lineTotal = sumField(lines, "total");
  const totalAmt = bill.postOnlyMc ? stoneAmt + smithMc + sumField(lines, "hmc") : lineTotal;
  const taxableBase = totalAmt + Number(bill.addition || 0) - Number(bill.discount || 0);
  const gst = bill.taxable ? taxableBase * (Number(bill.gstPct || 0) / 100) : 0;
  const netTotal = taxableBase + gst;
  const balance = netTotal - Number(bill.cashPayment || 0);
  return { totalInQty, totalOutQty, totalInWeight, totalOutWeight, smWeight, opening, closing, stoneAmt, totalAmt, smithMc, gst, netTotal, balance };
}

function cashWeightSmithFinancials(record) {
  const lines = (record.lines || []).map(normalizeCashWeightSmithLine);
  const amount = sumField(lines, "amount");
  const weight = sumField(lines, "weight");
  const netWeight = sumField(lines, "netWeight");
  const opening = smithOpeningWeight(record.partyName);
  const closing = opening + netWeight;
  return { amount, weight, netWeight, opening, closing };
}

function jewellerWorkFinancials(bill) {
  const lines = (bill.lines || []).map(normalizeJewellerWorkLine);
  const totalIn = lines.filter((line) => line.mode === "IN");
  const totalOut = lines.filter((line) => line.mode === "OUT");
  const totalInQty = sumField(totalIn, "qty");
  const totalOutQty = sumField(totalOut, "qty");
  const totalInWeight = sumField(totalIn, "jwWeight");
  const totalOutWeight = sumField(totalOut, "jwWeight");
  const jwWeight = totalInWeight - totalOutWeight;
  const opening = jewellerOpeningWeight(bill.jewellerName);
  const closing = opening + jwWeight;
  const jewellerMc = sumField(lines, "mc");
  const totalAmount = sumField(lines, "total");
  const taxableBase = totalAmount + Number(bill.addition || 0) - Number(bill.discount || 0);
  const gst = taxableBase * (Number(bill.gstPct || 0) / 100);
  const netTotal = taxableBase + gst;
  const balance = netTotal - Number(bill.cashPayment || 0);
  return { totalInQty, totalOutQty, totalInWeight, totalOutWeight, jwWeight, opening, closing, totalAmount, jewellerMc, gst, netTotal, balance };
}

function cashWeightJewellerFinancials(record) {
  const lines = (record.lines || []).map(normalizeCashWeightSmithLine);
  const amount = sumField(lines, "amount");
  const weight = sumField(lines, "weight");
  const netWeight = sumField(lines, "netWeight");
  const opening = jewellerOpeningWeight(record.partyName);
  const closing = opening + netWeight;
  return { amount, weight, netWeight, opening, closing };
}

function smithWorkTotals(bill, totals) {
  return `
    <div class="smith-work-bottom">
      <div class="smith-summary-left">
        <div class="smith-inline-flags">
          <label class="checkbox-line"><input type="checkbox" data-smith-check="showRate" ${bill.showRate ? "checked" : ""} /> Show Rate</label>
          <label class="checkbox-line"><input type="checkbox" data-smith-check="postOnlyMc" ${bill.postOnlyMc ? "checked" : ""} /> Post Only MC</label>
          <span>Total IN</span><input readonly value="${numericValue(totals.totalInQty, 0)}" /><input readonly value="${numericValue(totals.totalInWeight)}" />
          <span>Total OUT</span><input readonly value="${numericValue(totals.totalOutQty, 0)}" /><input readonly value="${numericValue(totals.totalOutWeight)}" />
          <span>Sm Wt</span><input readonly value="${numericValue(totals.smWeight)}" />
          <span>Net.Wt</span><input readonly value="${numericValue(totals.smWeight)}" />
        </div>
        ${smithTouchMatrix("Smith Touch /", totals.opening, totals.totalInWeight, totals.totalOutWeight, totals.closing, totals.totalAmt)}
        <label class="smith-remarks"><span>Remarks</span><textarea data-smith-field="remarks">${bill.remarks}</textarea></label>
      </div>
      <div class="smith-total-form">
        ${smithMoneyField("Stone Amt", totals.stoneAmt, "readonly")}
        ${smithMoneyField("Total Amt", totals.totalAmt, "readonly total")}
        ${smithMoneyField("Smith MC", totals.smithMc, "readonly")}
        <label><span>Gst%, Amt</span><input data-smith-field="gstPct" value="${moneyValue(bill.gstPct)}" /><input readonly value="${moneyValue(totals.gst)}" /></label>
        ${smithEditableMoneyField("Addition", bill.addition, "addition")}
        ${smithEditableMoneyField("Discount", bill.discount, "discount")}
        ${smithMoneyField("Net Total", totals.netTotal, "readonly highlight")}
        ${smithEditableMoneyField("Cash Payment", bill.cashPayment, "cashPayment")}
        ${smithMoneyField("Balance", totals.balance, "readonly balance")}
      </div>
    </div>
  `;
}

function cashWeightSmithTotals(record, totals) {
  return `
    <div class="smith-work-bottom cash-smith-bottom">
      <div class="smith-summary-left">
        <div class="cash-smith-total-line">
          <span>Total</span>
          <input readonly value="${moneyValue(totals.amount)}" />
          <input readonly value="${numericValue(totals.weight)}" />
          <input readonly value="${numericValue(totals.netWeight)}" />
        </div>
        ${smithTouchMatrix("Smith Touch / Wastage", totals.opening, totals.netWeight, 0, totals.closing, totals.amount)}
        <label class="smith-remarks"><span>Remarks</span><textarea data-cash-smith-field="remarks">${record.remarks}</textarea></label>
      </div>
    </div>
  `;
}

function jewellerWorkTotals(bill, totals) {
  return `
    <div class="smith-work-bottom">
      <div class="smith-summary-left">
        <div class="smith-inline-flags">
          <label class="checkbox-line"><input type="checkbox" data-jeweller-check="exportEnabled" ${bill.exportEnabled ? "checked" : ""} /> Export</label>
          <label class="checkbox-line"><input type="checkbox" data-jeweller-check="autoBarcode" ${bill.autoBarcode ? "checked" : ""} /> Auto Barcode</label>
          <label class="checkbox-line"><input type="checkbox" data-jeweller-check="showRate" ${bill.showRate ? "checked" : ""} /> Show Rate</label>
          <label class="checkbox-line"><input type="checkbox" data-jeweller-check="ledgerPost" ${bill.ledgerPost ? "checked" : ""} /> Ledger Post</label>
          <span>Total IN</span><input readonly value="${numericValue(totals.totalInQty, 0)}" /><input readonly value="${numericValue(totals.totalInWeight)}" />
          <span>OUT</span><input readonly value="${numericValue(totals.totalOutQty, 0)}" /><input readonly value="${numericValue(totals.totalOutWeight)}" />
        </div>
        ${smithTouchMatrix("Jeweller Touch", totals.opening, totals.totalInWeight, totals.totalOutWeight, totals.closing, totals.totalAmount)}
        <label class="smith-remarks"><span>Remarks</span><textarea data-jeweller-field="remarks">${bill.remarks}</textarea></label>
      </div>
      <div class="smith-total-form">
        ${smithMoneyField("Total Amount", totals.totalAmount, "readonly total")}
        ${smithMoneyField("Jeweller MC", totals.jewellerMc, "readonly")}
        <label><span>Gst%, Amount</span><input data-jeweller-field="gstPct" value="${moneyValue(bill.gstPct)}" /><input readonly value="${moneyValue(totals.gst)}" /></label>
        ${smithEditableMoneyFieldWithAttr("Addition", bill.addition, "addition", "data-jeweller-field")}
        ${smithEditableMoneyFieldWithAttr("Discount", bill.discount, "discount", "data-jeweller-field")}
        ${smithMoneyField("Net Total", totals.netTotal, "readonly highlight")}
        ${smithEditableMoneyFieldWithAttr("Cash", bill.cashPayment, "cashPayment", "data-jeweller-field")}
        ${smithMoneyField("Balance", totals.balance, "readonly balance")}
      </div>
    </div>
  `;
}

function cashWeightJewellerTotals(record, totals) {
  return `
    <div class="smith-work-bottom cash-smith-bottom">
      <div class="smith-summary-left">
        <div class="cash-smith-total-line">
          <span>Total</span>
          <input readonly value="${moneyValue(totals.amount)}" />
          <input readonly value="${numericValue(totals.weight)}" />
          <input readonly value="${numericValue(totals.netWeight)}" />
        </div>
        ${smithTouchMatrix("Jeweller Touch / Wastage", totals.opening, totals.netWeight, 0, totals.closing, totals.amount)}
        <label class="smith-remarks"><span>Remarks</span><textarea data-cash-jeweller-field="remarks">${record.remarks}</textarea></label>
      </div>
    </div>
  `;
}

function smithTouchMatrix(title, opening, totalIn, totalOut, closing, amount) {
  return `
    <div class="smith-touch-card">
      <div class="smith-touch-head"><span>${title}</span><strong>${numericValue(closing)}</strong><strong>${moneyValue(amount)}</strong></div>
      <div class="smith-matrix">
        <span></span><strong>Opening</strong><strong>Total IN</strong><strong>Total Out</strong><strong>Closing</strong>
        <strong>Weight</strong><input readonly value="${numericValue(opening)}" /><input readonly value="${numericValue(totalIn)}" /><input readonly value="${numericValue(totalOut)}" /><input readonly value="${numericValue(closing)}" />
        <strong>Amount</strong><input readonly value="0.000" /><input readonly value="${moneyValue(amount)}" /><input readonly value="0.00" /><input readonly value="${moneyValue(amount)}" />
      </div>
    </div>
  `;
}

function smithMoneyField(label, value, className = "") {
  return `<label><span>${label}</span><input class="${className}" readonly value="${moneyValue(value)}" /></label>`;
}

function smithEditableMoneyField(label, value, field) {
  return `<label><span>${label}</span><input data-smith-field="${field}" value="${moneyValue(value)}" /></label>`;
}

function smithEditableMoneyFieldWithAttr(label, value, field, attr) {
  return `<label><span>${label}</span><input ${attr}="${field}" value="${moneyValue(value)}" /></label>`;
}

function dmdReturn() {
  state.dmdReturns ||= [normalizeDmdReturnBill()];
  state.dmdReturns[0] = normalizeDmdReturnBill(state.dmdReturns[0]);
  const bill = state.dmdReturns[0];
  const totals = dmdReturnFinancials(bill);
  return `
    <section class="classic-billing-shell clean-entry-shell panel dmd-return-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Save F9", "save-dmd-return")}
        ${toolbarButton("Refresh", "refresh")}
        ${toolbarButton("Edit", "edit-current-bill")}
        ${toolbarButton("Previous", "previous-bill")}
        ${toolbarButton("Next", "next-bill")}
        ${toolbarButton("Barcode", "open-stock")}
        ${toolbarButton("Delete", "void-bill")}
        ${toolbarButton("Print", "print-last-bill")}
        ${toolbarButton("Close", "close-billing")}
        <strong class="classic-rate">Gold Rate ${moneyValue(activeGoldRate())}</strong>
      </div>
      ${dmdWholesaleHeader(bill)}
      ${classicTransactionTable("dmd-return-ornament", dmdWholesaleEntryColumns(), dmdWholesaleEntryRow(defaultDmdWholesaleLine()), dmdReturnOpColumns(), bill.ornamentLines.map(dmdReturnOpRow))}
      ${classicTransactionTable("dmd-return-stone", dmdStoneEntryColumns(), dmdStoneEntryRow(defaultDmdStoneLine()), dmdStoneColumns(), bill.diamondLines.map(dmdReturnStoneRow))}
      ${dmdWholesaleTotals(totals, bill)}
    </section>
  `;
}

function dmdWholesale() {
  state.dmdWholesales ||= [normalizeDmdWholesaleBill()];
  state.dmdWholesales[0] = normalizeDmdWholesaleBill(state.dmdWholesales[0]);
  const bill = state.dmdWholesales[0];
  const totals = dmdWholeSalesClassicFinancials(bill);
  return `
    <section class="classic-billing-shell clean-entry-shell panel dmd-wholesale-shell">
      <div class="entry-actions body-toolbar">
        ${toolbarButton("Refresh", "refresh")}
        ${toolbarButton("Save", "save-dmd-wholesale")}
        ${toolbarButton("Edit", "edit-current-bill")}
        ${toolbarButton("Delete", "void-bill")}
        ${toolbarButton("Previous", "previous-bill")}
        ${toolbarButton("Next", "next-bill")}
        ${toolbarButton("Print", "print-last-bill")}
        ${toolbarButton("Settings", "billing-settings")}
        ${toolbarButton("Notes", "billing-notes")}
        ${toolbarButton("Close", "close-billing")}
        <strong class="classic-rate">Rate: 1Grm:-${moneyValue(activeGoldRate())}, 8Grm:-${moneyValue(activeGoldRate() * 8)}</strong>
        <button class="toolbar-button help-button" data-action="help">Help</button>
      </div>
      ${dmdReturnHeader(bill)}
      ${classicTransactionTable("dmd-wholesale-entry", dmdWholeSalesClassicEntryColumns(), dmdReturnEntryRow(defaultDmdReturnLine()), dmdWholeSalesClassicColumns(), bill.lines.map(dmdWholeSalesClassicRow))}
      ${dmdReturnTotals(totals, bill)}
    </section>
  `;
}

function managementPartyWindow(title, type, columns, rowMapper, action) {
  const records = state.parties.filter((party) => party.type === type);
  const selected = records.find((party) => party.id === managementSelection.parties[type]) || records[0];
  const listHeaders = [type === "Refiner" ? "account_ID" : "ID", "Name"];
  const rows = records.map((party) => [
    masterSelectCell(party.customerCode, "party", party.id, type, selected?.id === party.id),
    masterSelectCell(party.name, "party", party.id, type, selected?.id === party.id)
  ]);
  return `
    <section class="panel management-panel master-window">
      <div class="classic-billing-toolbar management-toolbar">
        ${toolbarButton("New", action)}
        ${selected ? toolbarButton("Delete", `delete-party-${selected.id}`) : ""}
        ${toolbarButton("Refresh", "refresh")}
        <span class="toolbar-spacer"></span>
        <strong>${title}</strong>
      </div>
      <div class="master-split">
        <div class="master-list-pane">
          <label class="master-search"><span>${type === "Account" ? "Quick Search" : "Search"}</span><input type="search" placeholder="Search ${type.toLowerCase()}..." /></label>
          ${rows.length ? table(listHeaders, rows) : `<p class="soft-note empty-master">No ${type.toLowerCase()} records added yet.</p>`}
        </div>
        <div class="master-detail-pane">
          <h2>${title}</h2>
          <p class="soft-note">Double-click a record on the left to edit it here.</p>
          ${selected ? partyInlineForm(selected, type) : `<p class="soft-note">Add a ${type.toLowerCase()} record to view details here.</p>`}
        </div>
      </div>
    </section>
  `;
}

function masterSelectCell(value, kind, id, group = "", active = false) {
  return `<span class="master-select-cell ${active ? "active" : ""}" data-master-kind="${kind}" data-master-id="${id}" data-master-group="${group}">${value || "-"}</span>`;
}

function managementRowWithActions(row, editAction, deleteAction) {
  return [
    ...row,
    `<div class="row-actions">
      <button class="icon-action" data-action="${editAction}" title="Edit">Edit</button>
      <button class="icon-action danger" data-action="${deleteAction}" title="Delete">Delete</button>
    </div>`
  ];
}

function inlineMasterForm(handlerName, body, submitText) {
  return `<form class="inline-master-form" data-form="${handlerName}">
    ${body}
    <div class="inline-master-actions">
      <button class="primary">${submitText}</button>
    </div>
  </form>`;
}

function partyInlineForm(party, type) {
  const isCustomer = type === "Customer";
  const isSupplier = type === "Supplier";
  const isSmith = type === "Smith";
  const isRefiner = type === "Refiner";
  const identityName = isCustomer ? "panGst" : "gstin";
  const identityLabel = isCustomer ? "PAN/GST" : "GSTIN";
  return inlineMasterForm("party", `
    <input type="hidden" name="type" value="${type}" />
    <input type="hidden" name="recordId" value="${party.id}" />
    <section class="master-inline-section">
      <div class="master-inline-grid">
        ${input("customerCode", `${type} ID`, party.customerCode, "text", "required")}
        ${input("name", `${type} Name`, party.name, "text", "required")}
        ${select("status", "Status", ["Active", "Inactive"], party.status || "Active")}
      </div>
    </section>
    <section class="master-inline-section">
      <div class="master-inline-grid balance-grid">
        ${input("openingBalance", "Opening Balance", party.openingBalance, "number", "min='0' step='0.01'")}
        ${select("balanceType", "Bal Type", ["Dr", "Cr"], party.balanceType)}
        ${input("opDate", "Opening Date", party.opDate)}
        ${input("openingWeight", "Opening Weight", party.openingWeight, "number", "min='0' step='0.001'")}
        ${select("weightType", "Weight Type", ["Give", "Receive"], party.weightType)}
      </div>
    </section>
    <section class="master-inline-section">
      <div class="master-inline-grid">
        ${input("address", "Address", party.address)}
        ${input("city", "City", party.city)}
        ${input("place", "Place", party.place)}
        ${select("state", "State/Province", ["KERALA", "TAMIL NADU", "KARNATAKA", "OTHER"], party.state)}
        ${select("country", "Country", ["INDIA", "UAE", "OTHER"], party.country)}
        ${input(identityName, identityLabel, isCustomer ? party.panGst : party.gstin)}
        ${isCustomer ? input("pinCode", "PIN Code", party.pinCode) : ""}
        ${isSupplier || isSmith || isRefiner ? input("fax", "Fax", party.fax) : ""}
        ${input("phone", "Phone", party.phone)}
        ${input("mobile", "Mobile", party.mobile)}
        ${input("email", "Email Address", party.email, "email")}
        ${isSupplier || isSmith || isRefiner ? input("website", "Website", party.website) : ""}
        ${isCustomer ? input("aadhaar", "Aadhar", party.aadhaar) : ""}
        ${isCustomer ? select("agent", "Agent", agentNameOptions(), party.agent) : ""}
        ${isCustomer || isSupplier ? input("birthDate", "D-O-Birth", party.birthDate) : ""}
        ${isCustomer || isSupplier ? input("joinDate", "Join", party.joinDate) : ""}
      </div>
    </section>
    ${isSmith ? `<section class="master-inline-section"><div class="master-inline-grid compact-three">
      ${input("touch", "Touch", party.touch, "number", "min='0' step='0.01'")}
      ${input("convTouch", "Conv. Touch", party.convTouch, "number", "min='0' step='0.01'")}
      ${input("wastage", "Wastage", party.wastage, "number", "min='0' step='0.001'")}
    </div></section>` : ""}
  `, `Update ${type}`);
}

function masterReadonlyForm(fields) {
  return `<div class="master-readonly-form">${fields.map((field) => `
    <label class="${field.wide ? "wide" : ""}">
      <span>${field.label}</span>
      <input value="${field.value ?? ""}" readonly />
    </label>`).join("")}</div>`;
}

function partyDetailFields(party, type) {
  const common = [
    { label: `${type} ID`, value: party.customerCode },
    { label: `${type} Name`, value: party.name },
    { label: "Opening Balance", value: moneyValue(party.openingBalance) },
    { label: "Bal Type", value: party.balanceType },
    { label: "Opening Date", value: party.opDate },
    { label: "Opening Weight", value: numericValue(party.openingWeight) },
    { label: "Weight Type", value: party.weightType },
    { label: "Address", value: party.address, wide: true },
    { label: "City", value: party.city },
    { label: "Place", value: party.place },
    { label: "State/Province", value: party.state },
    { label: "Country", value: party.country }
  ];
  if (type === "Customer") {
    return [
      ...common,
      { label: "PAN/GST", value: party.panGst },
      { label: "PIN Code", value: party.pinCode },
      { label: "Phone", value: party.phone },
      { label: "Mobile", value: party.mobile },
      { label: "Email Address", value: party.email },
      { label: "Aadhar", value: party.aadhaar },
      { label: "Agent", value: party.agent },
      { label: "Status", value: party.status },
      { label: "D-O-Birth", value: party.birthDate },
      { label: "Join", value: party.joinDate }
    ];
  }
  const supplierLike = [
    ...common,
    { label: "GSTIN", value: party.gstin },
    { label: "Fax", value: party.fax },
    { label: "Phone", value: party.phone },
    { label: "Mobile", value: party.mobile },
    { label: "Email Address", value: party.email },
    { label: "Website", value: party.website }
  ];
  if (type === "Smith") {
    return [
      ...supplierLike,
      { label: "Touch", value: numericValue(party.touch, 2) },
      { label: "Conv. Touch", value: numericValue(party.convTouch, 2) },
      { label: "Wastage", value: numericValue(party.wastage) },
      { label: "Status", value: party.status },
      { label: "Date", value: party.opDate }
    ];
  }
  if (type === "Refiner") {
    return [...supplierLike, { label: "Status", value: party.status }];
  }
  return [
    ...supplierLike,
    { label: "Status", value: party.status },
    { label: "D-O-Birth", value: party.birthDate },
    { label: "Join", value: party.joinDate }
  ];
}

function employeeDetailFields(employee) {
  return [
    { label: "Employee ID", value: employee.employeeId || employee.staffId },
    { label: "Employee Name", value: employee.name },
    { label: "Designation", value: employee.designation },
    { label: "Opening Balance", value: moneyValue(employee.openingBalance) },
    { label: "Bal Type", value: employee.balanceType },
    { label: "Opening Date", value: employee.opDate },
    { label: "Address", value: employee.address, wide: true },
    { label: "City", value: employee.city },
    { label: "Place", value: employee.place },
    { label: "State/Province", value: employee.state },
    { label: "Country", value: employee.country },
    { label: "Mobile", value: employee.mobile },
    { label: "Point Card No", value: employee.pointCardNo },
    { label: "Basic Salary", value: moneyValue(employee.basicSalary) },
    { label: "TA", value: moneyValue(employee.ta) },
    { label: "DA", value: moneyValue(employee.da) },
    { label: "HRA", value: moneyValue(employee.hra) },
    { label: "Status", value: employee.status },
    { label: "D-O-Birth", value: employee.birthDate },
    { label: "D-O-Join", value: employee.joinDate }
  ];
}

function accountDetailFields(account) {
  return [
    { label: "ID", value: account.accountId },
    { label: "Account Name", value: account.accountName },
    { label: "Alias Name", value: account.aliasName, wide: true },
    { label: "Sub Schedule", value: account.subSchedule },
    { label: "Opening Balance", value: moneyValue(account.openingBalance) },
    { label: "Bal Type", value: account.balanceType },
    { label: "Op Date, Rate", value: account.opDate },
    { label: "Status", value: account.status },
    { label: "Cost Center", value: account.costCenter },
    { label: "Mobile No.", value: account.mobile },
    { label: "Admin ONLY", value: account.adminOnly ? "Yes" : "No" }
  ];
}

function customerColumns() {
  return ["ID", "Name", "Opening Balance", "Bal Type", "Opening Weight", "Weight Type", "Address", "City", "Place", "State/Province", "Country", "PAN/GST", "PIN Code", "Phone", "Mobile", "Email Address", "Aadhar", "Agent", "Status", "D-O-Birth", "Join"];
}

function customerRow(customer) {
  return [
    customer.customerCode,
    customer.name,
    money(customer.openingBalance),
    customer.balanceType,
    grams(customer.openingWeight),
    customer.weightType,
    customer.address || "-",
    customer.city || "-",
    customer.place || "-",
    customer.state,
    customer.country,
    customer.panGst || "-",
    customer.pinCode || "-",
    customer.phone || "-",
    customer.mobile || "-",
    customer.email || "-",
    customer.aadhaar || "-",
    customer.agent || "-",
    customer.status,
    customer.birthDate,
    customer.joinDate
  ];
}

function supplierColumns() {
  return ["ID", "Name", "Opening Balance", "Bal Type", "Opening Weight", "Weight Type", "Address", "City", "Place", "State/Province", "Country", "GSTIN", "Fax", "Phone", "Mobile", "Email Address", "Website", "Status", "D-O-Birth", "Join"];
}

function supplierRow(supplier) {
  return [
    supplier.customerCode,
    supplier.name,
    money(supplier.openingBalance),
    supplier.balanceType,
    grams(supplier.openingWeight),
    supplier.weightType,
    supplier.address || "-",
    supplier.city || "-",
    supplier.place || "-",
    supplier.state,
    supplier.country,
    supplier.gstin || "-",
    supplier.fax || "-",
    supplier.phone || "-",
    supplier.mobile || "-",
    supplier.email || "-",
    supplier.website || "-",
    supplier.status,
    supplier.birthDate,
    supplier.joinDate
  ];
}

function smithColumns() {
  return ["ID", "Name", "Opening Balance", "Bal Type", "Opening Weight", "Weight Type", "Address", "City", "Place", "State/Province", "Country", "GSTIN", "Fax", "Phone", "Mobile", "Email Address", "Website", "Touch", "Conv. Touch", "Wastage", "Status", "Date"];
}

function smithRow(smith) {
  return [
    smith.customerCode,
    smith.name,
    money(smith.openingBalance),
    smith.balanceType,
    grams(smith.openingWeight),
    smith.weightType,
    smith.address || "-",
    smith.city || "-",
    smith.place || "-",
    smith.state,
    smith.country,
    smith.gstin || "-",
    smith.fax || "-",
    smith.phone || "-",
    smith.mobile || "-",
    smith.email || "-",
    smith.website || "-",
    smith.touch,
    smith.convTouch,
    smith.wastage,
    smith.status,
    smith.opDate
  ];
}

function refinerColumns() {
  return ["account_ID", "Name", "Opening Balance", "Bal Type", "Opening Weight", "Weight Type", "Address", "City", "Place", "State/Province", "Country", "GSTIN", "Fax", "Phone", "Mobile", "Email Address", "Website", "Status"];
}

function refinerRow(refiner) {
  return [
    refiner.customerCode,
    refiner.name,
    money(refiner.openingBalance),
    refiner.balanceType,
    grams(refiner.openingWeight),
    refiner.weightType,
    refiner.address || "-",
    refiner.city || "-",
    refiner.place || "-",
    refiner.state,
    refiner.country,
    refiner.gstin || "-",
    refiner.fax || "-",
    refiner.phone || "-",
    refiner.mobile || "-",
    refiner.email || "-",
    refiner.website || "-",
    refiner.status
  ];
}

function employeeColumns() {
  return ["AccID", "Name", "Employee ID", "Employee Name", "Designation", "Opening Balance", "Bal Type", "Op Date", "Address", "City", "Place", "State/Province", "Country", "Mobile", "Point Card No", "Basic Salary", "TA", "DA", "HRA", "Status", "D-O-Birth", "D-O-Join", "Bills Handled", "Sales"];
}

function employeeRow(employee) {
  return [
    employee.staffId,
    employee.name,
    employee.employeeId || employee.staffId,
    employee.name,
    employee.designation,
    money(employee.openingBalance),
    employee.balanceType,
    employee.opDate,
    employee.address || "-",
    employee.city || "-",
    employee.place || "-",
    employee.state,
    employee.country,
    employee.mobile || employee.phone || "-",
    employee.pointCardNo || "-",
    money(employee.basicSalary),
    money(employee.ta),
    money(employee.da),
    money(employee.hra),
    employee.status,
    employee.birthDate,
    employee.joinDate,
    employee.handled,
    money(employee.sales)
  ];
}

function employeeWindow() {
  const selected = state.staffs.find((staff) => staff.staffId === managementSelection.employee) || state.staffs[0];
  const rows = state.staffs.map((staff) => [
    masterSelectCell(staff.staffId, "employee", staff.staffId, "", selected?.staffId === staff.staffId),
    masterSelectCell(staff.name, "employee", staff.staffId, "", selected?.staffId === staff.staffId)
  ]);
  return `
    <section class="panel management-panel master-window">
      <div class="classic-billing-toolbar management-toolbar">
        ${toolbarButton("New", "open-employee")}
        ${selected ? toolbarButton("Delete", `delete-employee-${selected.staffId}`) : ""}
        ${toolbarButton("Refresh", "refresh")}
        <span class="toolbar-spacer"></span>
        <strong>Employee Master</strong>
      </div>
      <div class="master-split">
        <div class="master-list-pane">
          <label class="master-search"><span>Search</span><input type="search" placeholder="Search employee..." /></label>
          ${table(["AccID", "Name"], rows)}
        </div>
        <div class="master-detail-pane">
          <h2>Employee Master</h2>
          <p class="soft-note">Double-click an employee on the left to edit it here.</p>
          ${selected ? employeeInlineForm(selected) : `<p class="soft-note">Add an employee record to view details here.</p>`}
        </div>
      </div>
    </section>
  `;
}

function employeeInlineForm(employee) {
  return inlineMasterForm("staff", `
    <input type="hidden" name="recordId" value="${employee.staffId}" />
    <section class="master-inline-section"><div class="master-inline-grid">
      ${input("staffId", "AccID", employee.staffId, "text", "required")}
      ${input("employeeId", "Employee ID", employee.employeeId || employee.staffId, "text", "required")}
      ${input("name", "Employee Name", employee.name, "text", "required")}
      ${select("designation", "Designation", ["Sales Staff", "Billing Staff", "Stock Staff", "Accountant", "Manager"], employee.designation)}
      ${select("status", "Status", ["Active", "Inactive"], employee.status)}
    </div></section>
    <section class="master-inline-section"><div class="master-inline-grid balance-grid">
      ${input("openingBalance", "Opening Balance", employee.openingBalance, "number", "min='0' step='0.01'")}
      ${select("balanceType", "Bal Type", ["Dr", "Cr"], employee.balanceType)}
      ${input("opDate", "Op Date", employee.opDate)}
    </div></section>
    <section class="master-inline-section"><div class="master-inline-grid">
      ${input("address", "Address", employee.address)}
      ${input("city", "City", employee.city)}
      ${input("place", "Place", employee.place)}
      ${select("state", "State/Province", ["KERALA", "TAMIL NADU", "KARNATAKA", "OTHER"], employee.state)}
      ${select("country", "Country", ["INDIA", "UAE", "OTHER"], employee.country)}
      ${input("mobile", "Mobile", employee.mobile)}
      ${input("pointCardNo", "Point Card No", employee.pointCardNo)}
      ${input("basicSalary", "Basic Salary", employee.basicSalary, "number", "min='0' step='0.01'")}
      ${input("ta", "TA", employee.ta, "number", "min='0' step='0.01'")}
      ${input("da", "DA", employee.da, "number", "min='0' step='0.01'")}
      ${input("hra", "HRA", employee.hra, "number", "min='0' step='0.01'")}
      ${input("birthDate", "D-O-Birth", employee.birthDate)}
      ${input("joinDate", "D-O-Join", employee.joinDate)}
    </div></section>
  `, "Update Employee");
}

function itemCreationColumns() {
  return ["ID", "Name", "product_No", "Regional Name", "Sub Group", "Product", "Brand", "Model", "HSN/TAX", "Type, Wastage", "VA%", "MC/Gram", "Opening Nos", "Opening Gross", "Opening Stone", "Opening Net", "Opening Date", "Item Stock Touch", "Closing Nos", "Closing Gross", "Closing Stone", "Closing Net", "Closing Stock Touch", "Ornament", "Barcode Compulsory", "Reserved Item", "Hide in Stock Reports"];
}

function itemCategoryWindow() {
  const groups = ["Product", "Brand", "Model", "Unit", "Sub Group", "Item Category Prefix"];
  const key = itemCategoryKey(itemCategoryView);
  return `
    <section class="panel management-hero management-station item-category-station">
      <div>
        <p class="eyebrow">Item category</p>
        <h2>${itemCategoryView}</h2>
        <p>Manage dropdown masters used while creating jewellery items.</p>
      </div>
      <div class="module-tabs">
        ${groups.map((item) => `<button class="module-tab ${itemCategoryView === item ? "active" : ""}" data-item-category="${item}">${item}</button>`).join("")}
      </div>
    </section>
    ${categoryMasterWindow(key, itemCategoryView)}
  `;
}

function miscellaneousWindow() {
  const groups = ["Agent", "Area", "Cost Center", "Discount Coupon Master", "StockPlace / Location", "Card Master", "Counter", "Tax Schedule", "Non Trade Supplier"];
  const key = miscellaneousKey(miscellaneousView);
  return `
    <section class="panel management-hero management-station item-category-station">
      <div>
        <p class="eyebrow">Miscellaneous</p>
        <h2>${miscellaneousView}</h2>
        <p>Small master lists used by dropdowns across billing, accounts, stock and management.</p>
      </div>
      <div class="module-tabs compact-tabs">
        ${groups.map((item) => `<button class="module-tab ${miscellaneousView === item ? "active" : ""}" data-miscellaneous="${item}">${item}</button>`).join("")}
      </div>
    </section>
    ${miscellaneousMasterWindow(key, miscellaneousView)}
  `;
}

function miscellaneousKey(label) {
  return {
    Agent: "agents",
    Area: "areas",
    "Cost Center": "costCenters",
    "Discount Coupon Master": "discountCoupons",
    "StockPlace / Location": "stockLocations",
    "Card Master": "cards",
    Counter: "counters",
    "Tax Schedule": "taxSchedules",
    "Non Trade Supplier": "nonTradeSuppliers"
  }[label] || "agents";
}

function miscellaneousMasterWindow(key, title) {
  const records = state.miscellaneous[key] || [];
  const selected = records.find((record) => miscRecordId(record) === managementSelection.miscellaneous[key]) || records[0];
  return `
    <section class="panel management-panel master-window misc-master-window">
      <div class="classic-billing-toolbar management-toolbar">
        ${toolbarButton("New", `open-misc-${key}`)}
        ${selected ? toolbarButton("Delete", `delete-misc-${key}-${miscRecordId(selected)}`) : ""}
        ${toolbarButton("Refresh", "refresh")}
        <span class="toolbar-spacer"></span>
        <strong>${title} Master</strong>
      </div>
      <div class="master-split misc-master-split">
        <div class="master-list-pane">
          <label class="master-search wide-search"><span>Search</span><input type="search" placeholder="Search ${title.toLowerCase()}..." /></label>
          ${records.length ? table(miscListHeaders(key), records.map((record, index) => miscListRow(key, record, index, selected))) : `<p class="soft-note empty-master">No ${title.toLowerCase()} records added yet.</p>`}
        </div>
        <div class="master-detail-pane">
          <h2>${title} Master</h2>
          <p class="soft-note">Double-click a row on the left to edit it here. Dropdowns update automatically after save.</p>
          ${selected ? miscInlineForm(key, selected) : `<p class="soft-note">Add a ${title.toLowerCase()} record to view details here.</p>`}
        </div>
      </div>
    </section>
  `;
}

function miscRecordId(record) {
  return record.id || record.code || record.couponNo || record.name;
}

function miscListHeaders(key) {
  if (key === "agents") return ["AccID", "Name"];
  if (key === "areas") return ["ID", "Area Name"];
  if (key === "costCenters") return ["ID", "Name"];
  if (key === "discountCoupons") return ["Coupon No", "Value"];
  if (key === "stockLocations") return ["ID", "Name"];
  if (key === "cards") return ["Sl", "Code", "Name"];
  if (key === "taxSchedules") return ["Sl", "ID", "Value", "Description", "P. Tax", "S. Tax", "Cess"];
  if (key === "nonTradeSuppliers") return ["ID", "Name"];
  return ["Sl", "ID", "Name", "Description"];
}

function miscListRow(key, record, index, selected) {
  const active = miscRecordId(selected || {}) === miscRecordId(record);
  const cell = (value) => masterSelectCell(value, "miscellaneous", miscRecordId(record), key, active);
  if (key === "agents") return [cell(record.id), cell(record.name)];
  if (key === "areas") return [cell(record.id), cell(record.name)];
  if (key === "costCenters") return [cell(record.id), cell(record.name)];
  if (key === "discountCoupons") return [cell(record.couponNo), cell(moneyValue(record.value))];
  if (key === "stockLocations") return [cell(record.id), cell(record.name)];
  if (key === "cards") return [cell(index + 1), cell(record.code), cell(record.name)];
  if (key === "taxSchedules") return [cell(index + 1), cell(record.id), cell(moneyValue(record.value)), cell(record.description), cell(record.purchaseTax), cell(record.salesTax), cell(record.cess)];
  if (key === "nonTradeSuppliers") return [cell(record.id), cell(record.name)];
  return [cell(index + 1), cell(record.id), cell(record.name), cell(record.description)];
}

function miscInlineForm(key, record) {
  return inlineMasterForm("miscellaneous", `
    <input type="hidden" name="key" value="${key}" />
    <input type="hidden" name="recordId" value="${miscRecordId(record)}" />
    ${miscFormBody(key, record)}
  `, `Update ${miscellaneousTitle(key)}`);
}

function miscellaneousTitle(key) {
  return {
    agents: "Agent",
    areas: "Area",
    costCenters: "Cost Center",
    discountCoupons: "Discount Coupon",
    stockLocations: "Stock Location",
    cards: "Card",
    counters: "Counter",
    taxSchedules: "Tax Schedule",
    nonTradeSuppliers: "Non Trade Supplier"
  }[key] || "Miscellaneous";
}

function miscFormBody(key, record = {}) {
  if (key === "agents" || key === "nonTradeSuppliers") {
    const isAgent = key === "agents";
    return `<section class="master-inline-section"><div class="master-inline-grid">
      ${input("id", `${isAgent ? "Agent" : "Supplier"} ID`, record.id || nextMiscId(key), "text", "required")}
      ${input("name", `${isAgent ? "Agent" : "Supplier"} Name`, record.name || "", "text", "required")}
      ${isAgent ? input("subSchedule", "Sub Schedule", record.subSchedule || "Agents", "text", "readonly") : ""}
      ${input("openingBalance", "Opening Balance", record.openingBalance ?? 0, "number", "min='0' step='0.01'")}
      ${select("balanceType", "Bal Type", ["Dr", "Cr"], record.balanceType || "Dr")}
      ${input("opDate", "Date", record.opDate || new Date().toLocaleDateString("en-GB"))}
      ${!isAgent ? input("openingWeight", "Opening Weight", record.openingWeight ?? 0, "number", "min='0' step='0.001'") : ""}
      ${!isAgent ? select("weightType", "Weight Type", ["Give", "Receive"], record.weightType || "Give") : ""}
      ${input("address", "Address", record.address || "")}
      ${input("city", "City", record.city || "")}
      ${input("place", "Place", record.place || "")}
      ${select("state", "State/Province", ["KERALA", "TAMIL NADU", "KARNATAKA", "OTHER"], record.state || "KERALA")}
      ${select("country", "Country", ["INDIA", "UAE", "OTHER"], record.country || "INDIA")}
      ${input("gstin", "GSTIN", record.gstin || "")}
      ${input("fax", "Fax", record.fax || "")}
      ${input("phone", "Phone", record.phone || "")}
      ${input("mobile", "Mobile", record.mobile || "")}
      ${input("email", "Email Address", record.email || "", "email")}
      ${input("website", "Website", record.website || "")}
      ${select("status", "Status", ["Active", "Inactive"], record.status || "Active")}
      ${!isAgent ? input("birthDate", "D-O-Birth", record.birthDate || "26/12/2000") : ""}
      ${!isAgent ? input("joinDate", "Join", record.joinDate || new Date().toLocaleDateString("en-GB")) : ""}
    </div></section>`;
  }
  if (key === "areas") return `<section class="master-inline-section"><div class="master-inline-grid">
    ${input("id", "ID", record.id || nextMiscId(key), "text", "required")}
    ${input("name", "Area Name", record.name || "", "text", "required")}
    ${input("description", "Description", record.description || "")}
  </div></section>`;
  if (key === "costCenters") return `<section class="master-inline-section"><div class="master-inline-grid">
    ${input("id", "Cost Center ID", record.id || nextMiscId(key), "text", "required")}
    ${input("name", "Cost Center Name", record.name || "", "text", "required")}
    ${select("controlAccount", "Control Account", miscOptions("accounts", ["", ...state.accountMasters.map((item) => item.accountName)]), record.controlAccount || "")}
    ${select("isDefault", "Default", ["No", "Yes"], record.isDefault ? "Yes" : "No")}
  </div></section>`;
  if (key === "discountCoupons") return `<section class="master-inline-section"><div class="master-inline-grid">
    ${input("couponNo", "Coupon No/ID", record.couponNo || record.id || nextMiscId(key), "text", "required")}
    ${input("value", "Coupon Value", record.value ?? 0, "number", "min='0' step='0.01'")}
    ${select("active", "Active", ["Yes", "No"], record.active === false ? "No" : "Yes")}
  </div></section>`;
  if (key === "stockLocations") return `<section class="master-inline-section"><div class="master-inline-grid">
    ${input("id", "Location ID", record.id || nextMiscId(key), "text", "required")}
    ${input("name", "Location Name", record.name || "", "text", "required")}
    ${select("isDefault", "Default", ["No", "Yes"], record.isDefault ? "Yes" : "No")}
  </div></section>`;
  if (key === "cards") return `<section class="master-inline-section"><div class="master-inline-grid">
    ${input("code", "Code", record.code || nextMiscId(key), "text", "required")}
    ${input("id", "ID", record.id || record.code || nextMiscId(key), "text", "required")}
    ${input("name", "Name", record.name || "", "text", "required")}
    ${select("bank", "Bank", miscOptions("banks", ["Canara Bank Edakkara", "Federal Bank Edakkara", "UPI Payment"]), record.bank || "")}
    ${select("bankChargeId", "Bank Charge ID", ["Addition", "Discount", "Expense"], record.bankChargeId || "Addition")}
    ${input("commissionPct", "Commission %", record.commissionPct ?? 0, "number", "min='0' step='0.001'")}
  </div></section>`;
  if (key === "taxSchedules") return `<section class="master-inline-section"><div class="master-inline-grid">
    ${input("id", "VAT ID", record.id || nextMiscId(key), "text", "required")}
    ${input("value", "Value", record.value ?? 0, "number", "min='0' step='0.01'")}
    ${input("description", "Description", record.description || "")}
    ${input("purchaseTax", "Purchase Tax%", record.purchaseTax ?? 0, "number", "min='0' step='0.001'")}
    ${input("salesTax", "Sales Tax%", record.salesTax ?? 0, "number", "min='0' step='0.001'")}
    ${input("cess", "Cess", record.cess ?? 0, "number", "min='0' step='0.001'")}
    ${input("inputVat", "Input VAT", record.inputVat || "")}
  </div></section>`;
  return `<section class="master-inline-section"><div class="master-inline-grid">
    ${input("id", "ID", record.id || nextMiscId(key), "text", "required")}
    ${input("name", "Name", record.name || "", "text", "required")}
    ${input("description", "Description", record.description || "")}
  </div></section>`;
}

function nextMiscId(key) {
  const count = (state.miscellaneous?.[key] || []).length + 1;
  const prefixes = { agents: "A", areas: "AR", costCenters: "CC", discountCoupons: "CP", stockLocations: "LK", cards: "", counters: "CN", taxSchedules: "T", nonTradeSuppliers: "N" };
  return `${prefixes[key] || "M"}${String(count).padStart(key === "cards" ? 1 : 4, "0")}`;
}

function miscOptions(key, fallback = []) {
  const map = {
    agents: () => (state.miscellaneous?.agents || []).map((item) => item.name),
    areas: () => (state.miscellaneous?.areas || []).map((item) => item.name),
    costCenters: () => (state.miscellaneous?.costCenters || []).map((item) => item.name),
    stockLocations: () => (state.miscellaneous?.stockLocations || []).map((item) => item.name),
    cards: () => (state.miscellaneous?.cards || []).map((item) => item.name),
    coupons: () => (state.miscellaneous?.discountCoupons || []).filter((item) => item.active !== false).map((item) => item.couponNo),
    taxSchedules: () => (state.miscellaneous?.taxSchedules || []).map((item) => item.description ? `${item.id} / ${item.salesTax || item.value}%` : `${item.id} / ${item.salesTax || item.value}%`),
    banks: () => state.accountMasters.filter((item) => item.subSchedule === "Bank").map((item) => item.accountName),
    accounts: () => state.accountMasters.map((item) => item.accountName)
  };
  return [...new Set([...(map[key]?.() || []), ...fallback].filter((item) => item !== undefined && item !== null))];
}

function itemCategoryKey(label) {
  return {
    Product: "products",
    Brand: "brands",
    Model: "models",
    Unit: "units",
    "Sub Group": "subGroups",
    "Item Category Prefix": "prefixes"
  }[label] || "products";
}

function categoryMasterWindow(key, title) {
  const records = state.itemCategories[key] || [];
  const selected = records.find((record) => record.id === managementSelection.categories[key]) || records[0];
  const addAction = `open-category-${key}`;
  const splitClass = key === "subGroups" ? "subgroup-master-split" : "category-master-split";
  return `
    <section class="panel management-panel master-window category-master-window ${key === "prefixes" ? "prefix-master-window" : ""}">
      <div class="classic-billing-toolbar management-toolbar">
        ${toolbarButton("New", addAction)}
        ${selected ? toolbarButton("Delete", `delete-category-${key}-${selected.id}`) : ""}
        ${toolbarButton("Refresh", "refresh")}
        <span class="toolbar-spacer"></span>
        <strong>${title} Master</strong>
      </div>
      <div class="master-split ${splitClass}">
        <div class="master-list-pane">
          <label class="master-search wide-search"><span>Quick Search</span><input type="search" placeholder="Search ${title.toLowerCase()}..." /></label>
          ${table(categoryListHeaders(key), records.map((record, index) => categoryListRow(key, record, index)))}
        </div>
        <div class="master-detail-pane category-detail-pane">
          <h2>${title === "Item Category Prefix" ? "Entry Prefixes" : `${title} Master`}</h2>
          <p class="soft-note">Double-click a ${title.toLowerCase()} row on the left to edit it here.</p>
          ${selected ? categoryInlineForm(key, selected) : `<p class="soft-note">Add a ${title.toLowerCase()} record to view details here.</p>`}
        </div>
      </div>
    </section>
  `;
}

function categoryListHeaders(key) {
  if (key === "units") return ["ID", "Unit Name"];
  if (key === "subGroups") return ["Code", "Name"];
  if (key === "prefixes") return ["#", "Description", "Prefix"];
  return ["Sl", "ID", "Name", "Description"];
}

function categoryListRow(key, record, index) {
  const active = managementSelection.categories[key] === record.id;
  if (key === "units") return [masterSelectCell(record.id, "category", record.id, key, active), masterSelectCell(record.name, "category", record.id, key, active)];
  if (key === "subGroups") return [masterSelectCell(record.id, "category", record.id, key, active), masterSelectCell(record.name, "category", record.id, key, active)];
  if (key === "prefixes") return [masterSelectCell(record.number, "category", record.id, key, active), masterSelectCell(record.description, "category", record.id, key, active), masterSelectCell(record.prefix, "category", record.id, key, active)];
  return [masterSelectCell(index + 1, "category", record.id, key, active), masterSelectCell(record.id, "category", record.id, key, active), masterSelectCell(record.name, "category", record.id, key, active), masterSelectCell(record.description || "", "category", record.id, key, active)];
}

function categoryDetail(key, record) {
  if (key === "units") {
    return masterReadonlyForm([
      { label: "Item ID", value: record.id },
      { label: "Item Name", value: record.name }
    ]);
  }
  if (key === "subGroups") {
    return `
      ${masterReadonlyForm([
        { label: "ID", value: record.id },
        { label: "Name", value: record.name },
        { label: "Remarks", value: record.remarks, wide: true }
      ])}
      <div class="master-help-lines">
        <p>ID - Minimum 1 Character</p>
        <p>ID - Maximum 5 Character</p>
      </div>`;
  }
  if (key === "prefixes") {
    return masterReadonlyForm([
      { label: "#", value: record.number },
      { label: "Description", value: record.description },
      { label: "Prefix", value: record.prefix }
    ]);
  }
  return masterReadonlyForm([
    { label: "ID", value: record.id },
    { label: "Name", value: record.name },
    { label: "Status", value: record.status },
    { label: "Description", value: record.description, wide: true }
  ]);
}

function categoryInlineForm(key, record) {
  if (key === "units") {
    return inlineMasterForm("itemCategory", `
      <input type="hidden" name="key" value="${key}" />
      <input type="hidden" name="recordId" value="${record.id}" />
      <section class="master-inline-section"><div class="master-inline-grid">
        ${input("id", "Item ID", record.id, "text", "required")}
        ${input("name", "Item Name", record.name, "text", "required")}
      </div></section>
    `, "Update Unit");
  }
  if (key === "subGroups") {
    return inlineMasterForm("itemCategory", `
      <input type="hidden" name="key" value="${key}" />
      <input type="hidden" name="recordId" value="${record.id}" />
      <section class="master-inline-section compact-subgroup-editor">
        <div class="master-inline-grid subgroup-edit-grid">
          ${input("id", "ID", record.id, "text", "required maxlength='5'")}
          ${input("name", "Name", record.name, "text", "required")}
          ${input("remarks", "Remarks", record.remarks)}
        </div>
        <div class="master-help-lines compact">
          <p>ID: 1 to 5 characters</p>
        </div>
      </section>
    `, "Update Sub Group");
  }
  if (key === "prefixes") {
    return inlineMasterForm("itemCategory", `
      <input type="hidden" name="key" value="${key}" />
      <input type="hidden" name="recordId" value="${record.id}" />
      <section class="master-inline-section"><div class="master-inline-grid">
        ${input("number", "#", record.number, "number", "min='1' step='1' required")}
        ${input("description", "Description", record.description, "text", "required")}
        ${input("prefix", "Prefix", record.prefix)}
      </div></section>
    `, "Update Prefix");
  }
  return inlineMasterForm("itemCategory", `
    <input type="hidden" name="key" value="${key}" />
    <input type="hidden" name="recordId" value="${record.id}" />
    <section class="master-inline-section"><div class="master-inline-grid">
      ${input("id", "ID", record.id, "text", "required")}
      ${input("name", "Name", record.name, "text", "required")}
      ${select("status", "Status", ["Active", "Inactive"], record.status)}
      ${input("description", "Description", record.description)}
    </div></section>
  `, `Update ${categoryTitle(key)}`);
}

function categoryOptions(key, fallback = []) {
  const values = (state.itemCategories?.[key] || []).map((item) => item.name || item.id).filter(Boolean);
  return [...new Set([...values, ...fallback])];
}

function itemCreationRow(item) {
  return [
    item.itemId,
    item.itemName,
    item.product,
    item.regionalName || "-",
    item.subGroup || "-",
    item.product,
    item.brand || "-",
    item.model || "-",
    item.hsnTax,
    item.typeWastage,
    numericValue(item.va, 2),
    moneyValue(item.mcGram),
    item.openingNos,
    grams(item.openingGross),
    grams(item.openingStone),
    grams(item.openingNet),
    item.openingDate,
    numericValue(item.itemStockTouch, 3),
    item.closingNos,
    grams(item.closingGross),
    grams(item.closingStone),
    grams(item.closingNet),
    numericValue(item.closingStockTouch, 3),
    item.ornament ? "Yes" : "No",
    item.barcodeCompulsory ? "Yes" : "No",
    item.reservedItem ? "Yes" : "No",
    item.hideInStockReports ? "Yes" : "No"
  ];
}

function itemCreationWindow() {
  const selected = state.itemMasters.find((item) => item.itemId === managementSelection.itemMaster) || state.itemMasters[0];
  const rows = state.itemMasters.map((item) => [
    masterSelectCell(item.itemId, "itemMaster", item.itemId, "", selected?.itemId === item.itemId),
    masterSelectCell(item.itemName, "itemMaster", item.itemId, "", selected?.itemId === item.itemId),
    masterSelectCell(item.product || "-", "itemMaster", item.itemId, "", selected?.itemId === item.itemId)
  ]);
  return `
    <section class="panel management-panel item-creation-panel master-window">
      <div class="classic-billing-toolbar management-toolbar">
        ${toolbarButton("New", "open-item-master")}
        ${selected ? toolbarButton("Delete", `delete-item-master-${selected.itemId}`) : ""}
        ${toolbarButton("Refresh", "refresh")}
        <span class="toolbar-spacer"></span>
        <strong>Item Creation</strong>
      </div>
      <div class="master-split item-master-split">
        <div class="master-list-pane">
          <label class="master-search wide-search"><span>Quick Search</span><input type="search" placeholder="Search item..." /></label>
          ${table(["ID", "Name", "product_No", ""], rows)}
        </div>
        <div class="master-detail-pane item-detail-pane">
          <h2>Item Creation</h2>
          <p class="soft-note">Double-click an item on the left to edit its master and weight details here.</p>
          ${selected ? itemMasterInlineForm(selected) : `<p class="soft-note">Add an item master to view details here.</p>`}
        </div>
      </div>
    </section>
  `;
}

function itemMasterInlineForm(item) {
  return inlineMasterForm("itemMaster", `
    <input type="hidden" name="recordId" value="${item.itemId}" />
    <div class="master-tabs">
      <button type="button" class="master-tab active">Master Details</button>
      <button type="button" class="master-tab">Item Descriptions</button>
    </div>
    <section class="master-inline-section">
      <div class="master-inline-grid">
        ${input("itemId", "Item ID", item.itemId, "text", "required")}
        ${select("itemGroup", "Item Group", ["Gold", "Diamond", "Silver", "Stone", "Other"], item.product || "Gold")}
        ${input("itemName", "Item Name", item.itemName, "text", "required")}
        ${input("regionalName", "Regional Name", item.regionalName)}
        ${select("subGroup", "Sub Group", categoryOptions("subGroups", ["", "ANKLET", "BANGLE", "CHAIN", "RING"]), item.subGroup || "")}
        ${select("product", "Product", categoryOptions("products", ["Gold", "Diamond", "Silver", "Stone"]), item.product || "Gold")}
        ${select("brand", "Brand", categoryOptions("brands", ["", "Goldland", "Local"]), item.brand || "")}
        ${select("model", "Model", categoryOptions("models", ["", "Regular", "Antique"]), item.model || "")}
        ${select("hsnTax", "HSN / TAX", miscOptions("taxSchedules", ["7113 / 3%", "7108 / 3%", "7117 / 3%", "GST exempt", "Custom"]), item.hsnTax)}
        ${select("typeWastage", "Type, Wastage", ["22ct", "24ct", "18ct", "Silver", "Diamond"], item.typeWastage)}
        ${input("wastage", "Wastage", item.wastage, "number", "min='0' step='0.001'")}
        ${input("va", "VA%", item.va, "number", "min='0' step='0.01'")}
        ${input("mcGram", "MC/Gram", item.mcGram, "number", "min='0' step='0.001'")}
        ${input("description1", "Description 1", item.description1)}
        ${input("description2", "Description 2", item.description2)}
      </div>
    </section>
    <section class="master-inline-section item-weight-readout inline-weight-readout">
      <h3>Weight Details</h3>
      <div class="item-weight-grid">
        <span></span><strong>Opening</strong><strong>Closing</strong>
        <span>Nos</span>${input("openingNos", "", item.openingNos, "number", "min='0' step='1'")}${input("closingNos", "", item.closingNos, "number", "min='0' step='1'")}
        <span>Gross Weight</span>${input("openingGross", "", item.openingGross, "number", "min='0' step='0.001'")}${input("closingGross", "", item.closingGross, "number", "min='0' step='0.001'")}
        <span>Stone Weight</span>${input("openingStone", "", item.openingStone, "number", "min='0' step='0.001'")}${input("closingStone", "", item.closingStone, "number", "min='0' step='0.001'")}
        <span>Net Weight</span>${input("openingNet", "", item.openingNet, "number", "readonly")}${input("closingNet", "", item.closingNet, "number", "readonly")}
        <span>Opening Date</span>${input("openingDate", "", item.openingDate)}${input("closingDate", "", item.closingDate || item.openingDate)}
        <span>Item, Stock Touch</span>${input("itemStockTouch", "", item.itemStockTouch, "number", "min='0' step='0.001'")}${input("closingStockTouch", "", item.closingStockTouch, "number", "min='0' step='0.001'")}
      </div>
      <div class="item-checks">
        ${checkbox("ornament", "Ornament", item.ornament !== false)}
        ${checkbox("barcodeCompulsory", "Barcode Compulsory", item.barcodeCompulsory)}
        ${checkbox("reservedItem", "Reserved Item", item.reservedItem)}
        ${checkbox("hideInStockReports", "Hide in Stock Reports", item.hideInStockReports)}
      </div>
    </section>
  `, "Update Item");
}

function itemMasterDetail(item) {
  return `
    <div class="master-tabs">
      <button class="master-tab active">Master Details</button>
      <button class="master-tab">Item Descriptions</button>
    </div>
    ${masterReadonlyForm([
      { label: "Item ID", value: item.itemId },
      { label: "Item Name", value: item.itemName },
      { label: "Regional Name", value: item.regionalName },
      { label: "Sub Group", value: item.subGroup },
      { label: "Product", value: item.product },
      { label: "Brand", value: item.brand },
      { label: "Model", value: item.model },
      { label: "HSN / TAX", value: item.hsnTax },
      { label: "Type, Wastage", value: item.typeWastage },
      { label: "Wastage", value: numericValue(item.wastage) },
      { label: "VA%", value: numericValue(item.va, 2) },
      { label: "MC/Gram", value: moneyValue(item.mcGram) },
      { label: "Description 1", value: item.description1, wide: true },
      { label: "Description 2", value: item.description2, wide: true }
    ])}
    <div class="item-weight-readout">
      <h3>Weight Details</h3>
      <div class="item-weight-grid">
        <span></span><strong>Opening</strong><strong>Closing</strong>
        <span>Nos</span><input value="${item.openingNos}" readonly /><input value="${item.closingNos}" readonly />
        <span>Gross Weight</span><input value="${numericValue(item.openingGross)}" readonly /><input value="${numericValue(item.closingGross)}" readonly />
        <span>Stone Weight</span><input value="${numericValue(item.openingStone)}" readonly /><input value="${numericValue(item.closingStone)}" readonly />
        <span>Net Weight</span><input value="${numericValue(item.openingNet)}" readonly /><input value="${numericValue(item.closingNet)}" readonly />
        <span>Opening Date</span><input value="${item.openingDate}" readonly /><input value="${item.closingDate || item.openingDate}" readonly />
        <span>Item, Stock Touch</span><input value="${numericValue(item.itemStockTouch)}" readonly /><input value="${numericValue(item.closingStockTouch)}" readonly />
      </div>
      <div class="item-checks">
        <span>${item.ornament ? "[x]" : "[ ]"} Ornament</span>
        <span>${item.barcodeCompulsory ? "[x]" : "[ ]"} Barcode Compulsory</span>
        <span>${item.reservedItem ? "[x]" : "[ ]"} Reserved Item</span>
        <span>${item.hideInStockReports ? "[x]" : "[ ]"} Hide in Stock Reports</span>
      </div>
    </div>
  `;
}

function accountMasterColumns() {
  return ["Accid", "Name", "ID", "Account Name", "Alias Name", "Sub Schedule", "Opening Balance", "Bal Type", "Op Date, Rate", "Status", "Cost Center", "Mobile No.", "Admin ONLY"];
}

function accountMasterRow(account) {
  return [
    account.accountId,
    account.accountName,
    account.accountId,
    account.accountName,
    account.aliasName || "-",
    account.subSchedule,
    money(account.openingBalance),
    account.balanceType,
    account.opDate,
    account.status,
    account.costCenter,
    account.mobile || "-",
    account.adminOnly ? "Yes" : "No"
  ];
}

function accountMasterWindow() {
  const selected = state.accountMasters.find((account) => account.accountId === managementSelection.accountMaster) || state.accountMasters[0];
  const rows = state.accountMasters.map((account) => [
    masterSelectCell(account.accountId, "accountMaster", account.accountId, "", selected?.accountId === account.accountId),
    masterSelectCell(account.accountName, "accountMaster", account.accountId, "", selected?.accountId === account.accountId)
  ]);
  return `
    <section class="panel management-panel master-window">
      <div class="classic-billing-toolbar management-toolbar">
        ${toolbarButton("New", "open-account-master")}
        ${selected ? toolbarButton("Edit", `edit-account-master-${selected.accountId}`) : ""}
        ${selected ? toolbarButton("Delete", `delete-account-master-${selected.accountId}`) : ""}
        ${toolbarButton("Refresh", "refresh")}
        <span class="toolbar-spacer"></span>
        <strong>Account Creation</strong>
      </div>
      <div class="master-split account-master-split">
        <div class="master-list-pane">
          <label class="master-search"><span>Quick Search</span><input type="search" placeholder="Search account..." /></label>
          ${table(["Accid", "Name"], rows)}
        </div>
        <div class="master-detail-pane">
          <h2>Account Creation</h2>
          <p class="soft-note">Double-click an account on the left to edit it here.</p>
          ${selected ? accountInlineForm(selected) : `<p class="soft-note">Add an account record to view details here.</p>`}
        </div>
      </div>
    </section>
  `;
}

function accountInlineForm(account) {
  return inlineMasterForm("accountMaster", `
    <input type="hidden" name="recordId" value="${account.accountId}" />
    <section class="master-inline-section"><div class="master-inline-grid">
      ${input("accountId", "ID", account.accountId, "text", "required")}
      ${input("accountName", "Account Name", account.accountName, "text", "required")}
      ${input("aliasName", "Alias Name", account.aliasName)}
      ${select("subSchedule", "Sub Schedule", ["Agents", "Cash", "Bank", "Supplier", "Customer", "Expense", "Income"], account.subSchedule)}
      ${input("openingBalance", "Opening Balance", account.openingBalance, "number", "min='0' step='0.01'")}
      ${select("balanceType", "Bal Type", ["Dr", "Cr"], account.balanceType)}
      ${input("opDate", "Op Date, Rate", account.opDate)}
      ${select("status", "Status", ["ACTIVE", "INACTIVE"], account.status)}
      ${select("costCenter", "Cost Center", miscOptions("costCenters", ["Main shop"]), account.costCenter)}
      ${input("mobile", "Mobile No.", account.mobile)}
      ${select("adminOnly", "Admin ONLY", ["No", "Yes"], account.adminOnly ? "Yes" : "No")}
    </div></section>
  `, "Update Account");
}

function schemes() {
  return `
    <section class="panel">
      <div class="panel-head">
        <h2>Scheme / Chitty</h2>
        <button class="primary" data-action="open-scheme">Add New Collection</button>
      </div>
      ${table(["Member ID", "Member Name", "Address", "Place", "Mobile", "Scheme", "Book No", "Qty", "Join Date", "End Date", "Op Amount", "Op Weight", "Op Date", "Collection", "Due", "Balance"], state.schemes.map((s) => [s.memberId, s.member, s.address, s.place, s.mobile || "-", s.scheme, s.book, s.qty, s.joinDate, s.endDate, money(s.opAmount), s.opWeight, s.opDate, money(s.collection), money(s.due), money(s.balance)]))}
    </section>
  `;
}

function accounts() {
  const accountBody = accountView === "Account Ledger" ? `
    <section class="panel">
      <div class="panel-head">
        <h2>Accounts 2026-2027</h2>
        <div class="button-row">
          <button class="secondary" data-action="open-account">Add New Entry</button>
          <button class="secondary" data-action="export-report">Export</button>
        </div>
      </div>
      ${table(["Date", "Voucher No", "Ledger", "Particular", "Debit Amt", "Credit Amt", "Balance", "Cr/Dr"], state.accounts.map((a) => [a.date, a.vouNo, a.ledger, a.particular, money(a.debit), money(a.credit), money(a.balance), a.crdr]))}
    </section>
  ` : accountActionPage(accountView);
  return `
    ${moduleSwitcher("Accounts", ACCOUNT_ITEMS, accountView, "data-account-section")}
    ${accountBody}
  `;
}

function accountActionPage(view) {
  const billwiseType = billwiseTypeFromView(view);
  if (billwiseType) return billwiseTransactionScreen(billwiseType);
  if (view === "Cash Receipt") return cashVoucherScreen("receipt");
  if (view === "Cash Payment") return cashVoucherScreen("payment");
  if (view === "Bank Deposit") return bankTransactionScreen("deposit");
  if (view === "Bank Withdrawal") return bankTransactionScreen("withdrawal");
  if (view === "PDC Transactions") return pdcTransactionsScreen();
  if (view === "Journal Voucher") return journalVoucherScreen();
  if (view === "Direct Entry") return directEntryScreen();
  if (view === "Expense Entry") return expenseEntryScreen();
  if (view === "Custom Voucher") return customVoucherScreen();
  const configs = {
    "Cash Receipt": "Receive cash from customers or other ledgers.",
    "Cash Payment": "Record cash paid from the shop.",
    "Bank Deposit": "Move cash or receipts into bank.",
    "Bank Withdrawal": "Record bank withdrawal to cash or ledger.",
    "Journal Voucher": "Create accounting journal adjustments.",
    "PDC Transactions": "Track post-dated cheque transactions.",
    "Direct Entry": "Enter direct debit/credit ledger transactions.",
    "Expense Entry": "Post shop expenses.",
    "Bill Wise Collection": "Collect against pending bills.",
    "Bill Wise Payment": "Pay against pending purchase or ledger bills.",
    "Discount in Credit Note": "Apply discount against credit note balances.",
    "Discount in Debit Note": "Apply discount against debit note balances.",
    "Custom Voucher": "Create a custom voucher entry."
  };
  return transactionLauncherPage(view, configs[view] || "Open account transaction.", [["Open Entry Window", "open-account"], ["Back To Ledger", "Account Ledger", "data-account-section"]]);
}

function billwiseTypeFromView(view) {
  return {
    "Bill Wise Collection": "collection",
    "Bill Wise Payment": "payment",
    "Discount in Credit Note": "credit",
    "Discount in Debit Note": "debit"
  }[view] || "";
}

function billwiseViewFromType(type) {
  return {
    collection: "Bill Wise Collection",
    payment: "Bill Wise Payment",
    credit: "Discount in Credit Note",
    debit: "Discount in Debit Note"
  }[type] || "Bill Wise Collection";
}

function billwiseTitle(type) {
  return {
    collection: "Billwise Collection",
    payment: "Billwise Payment",
    credit: "CreditNote Discount",
    debit: "DebitNote Discount"
  }[type] || "Billwise Collection";
}

function billwiseDraft(type) {
  if (!billwiseDrafts[type]) {
    billwiseDrafts[type] = normalizeBillwiseTransaction(state[billwiseStorageKey(type)]?.[0] || defaultBillwiseTransaction(type), type);
  }
  return billwiseDrafts[type];
}

function billwiseTransactionScreen(type) {
  const record = billwiseDraft(type);
  const financials = billwiseFinancials(record, type);
  return `
    <section class="clean-entry-shell billwise-shell" data-billwise-type="${type}">
      ${billwiseToolbar(type)}
      ${billwiseHeader(type, record, financials)}
      <div class="billwise-table-panel">
        <div class="billwise-table-actions">
          <strong>${billwiseTitle(type)} allocation</strong>
          <button class="secondary" data-action="add-billwise-row-${type}">Add Invoice Row</button>
        </div>
        ${billwiseTable(type, record)}
      </div>
      ${billwiseBottomStrip(type, financials)}
    </section>
  `;
}

function billwiseToolbar(type) {
  const middle = type === "payment" ? toolbarButton("Discount", `open-billwise-credit`) : "";
  return `
    <div class="entry-actions body-toolbar billwise-toolbar">
      ${toolbarButton("New", `new-billwise-${type}`)}
      ${toolbarButton("Save F9", `save-billwise-${type}`)}
      ${toolbarButton("Refresh", `refresh-billwise-${type}`)}
      ${toolbarButton("Edit", `edit-billwise-${type}`)}
      ${toolbarButton("Delete", `delete-billwise-${type}`)}
      ${toolbarButton("Print", `print-billwise-${type}`)}
      ${middle}
      ${toolbarButton("Ledger", `ledger-billwise-${type}`)}
      ${toolbarButton("Close", "close-account-action")}
      <span class="toolbar-spacer"></span>
      <label class="rate-inline"><span>Gold Rate</span><input value="${activeGoldRate()}" readonly /></label>
    </div>
  `;
}

function billwiseHeader(type, record, financials) {
  const partyLabel = type === "collection" ? "Customer Name" : "Party Name";
  const amountLabel = type === "collection" ? "Collection Amount" : "Paid Amount";
  const partyValue = type === "collection" ? record.customerName : record.partyName;
  return `
    <div class="transaction-entry-header billwise-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Ref No</span><span class="field-pair">${billwiseField(type, "entryNo", record.entryNo)}${billwiseField(type, "refNo", record.refNo)}</span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair">${billwiseField(type, "date", toDateInputValue(record.date), "date")}${billwiseField(type, "time", record.time)}</span></label>
        ${billwiseLabeledField(type, type === "collection" ? "customerName" : "partyName", partyLabel, partyValue)}
        <label class="classic-field split-field amount-pair"><span>${amountLabel}</span><span class="field-pair">${billwiseAuto(type, type === "collection" ? "collectionAmount" : "paidAmount", moneyValue(type === "collection" ? financials.collectionAmount : financials.paidAmount))}${billwiseField(type, `${type === "collection" ? "collection" : "paid"}Reference`, moneyValue(record[`${type === "collection" ? "collection" : "paid"}Reference`] || 0), "number")}</span></label>
        ${type === "collection" ? `<label class="classic-field split-field"><span>Discount</span><span class="field-pair">${billwiseField(type, "discount", moneyValue(record.discount), "number")}${billwiseAuto(type, "discountAuto", moneyValue(financials.discount))}</span></label>` : ""}
      </div>
      <div class="classic-fields right">
        ${type === "collection" ? `<div class="radio-row billwise-mode"><label><input type="radio" name="billwiseMode" data-billwise-field="paymentMode" value="Cash" ${record.paymentMode === "Cash" ? "checked" : ""} />Cash</label><label><input type="radio" name="billwiseMode" data-billwise-field="paymentMode" value="Bank" ${record.paymentMode === "Bank" ? "checked" : ""} />Bank</label><button class="primary compact-action" data-action="auto-allocate-billwise-${type}">Auto Allocate</button></div>` : ""}
        ${type === "collection" || type === "payment" ? billwiseSelect(type, "costCenter", "Cost Center", miscOptions("costCenters", ["cost1"]), record.costCenter) : billwiseLabeledField(type, "discountAccount", "Discount Account", record.discountAccount)}
        ${type === "collection" ? `<label class="classic-field split-field"><span>Cash</span><span class="field-pair">${billwiseField(type, "cashCode", record.cashCode)}${billwiseSelectOnly(type, "cashAccount", ["Cash in Hand", "Scheme Cash", "Canara Bank Edak", "Federal Bank Edak", "Bank"], record.cashAccount)}</span></label>` : ""}
        ${type === "payment" ? billwiseSelect(type, "cashAccount", "Cash Account", ["Cash in Hand", "Scheme Cash", "Canara Bank Edak", "Federal Bank Edak", "Bank"], record.cashAccount) : ""}
        ${billwiseSelect(type, "preparedBy", "Prepared By", staffNameOptions(), record.preparedBy)}
        ${type !== "collection" ? billwiseSelect(type, "receivedBy", "Received By", staffNameOptions(), record.receivedBy) : ""}
      </div>
    </div>
  `;
}

function billwiseLabeledField(type, field, label, value, inputType = "text") {
  return `<label class="classic-field"><span>${label}</span>${billwiseField(type, field, value, inputType)}</label>`;
}

function billwiseField(type, field, value = "", inputType = "text") {
  return `<input data-billwise-type="${type}" data-billwise-field="${field}" type="${inputType}" value="${value ?? ""}" />`;
}

function billwiseAuto(type, field, value = "") {
  return `<input class="auto-field" data-billwise-type="${type}" data-billwise-field="${field}" value="${value ?? ""}" readonly />`;
}

function billwiseSelect(type, field, label, options, selected) {
  return `<label class="classic-field"><span>${label}</span>${billwiseSelectOnly(type, field, options, selected)}</label>`;
}

function billwiseSelectOnly(type, field, options, selected) {
  const unique = [...new Set((options || []).filter(Boolean))];
  return `<select data-billwise-type="${type}" data-billwise-field="${field}">${unique.map((option) => `<option ${option === selected ? "selected" : ""}>${option}</option>`).join("")}</select>`;
}

function billwiseColumns(type) {
  if (type === "collection") return ["Sl#", "", "Invoice No", "InvoiceType", "Invoice Date", "Bill Amount", "TotalReceived", "Old/CNote", "Received", "Discount", "Balance", "Remark"];
  if (type === "payment") return ["Sl#", "", "Invoice No", "InvoiceType", "Invoice Date", "Bill Amount", "Total Paid", "DND", "Paid", "Balance", "Remark"];
  if (type === "credit") return ["Sl#", "", "Invoice No", "InvoiceType", "Invoice Date", "Bill Amount", "Paid", "Received", "Balance", "Remark"];
  return ["Sl#", "", "Invoice No", "InvoiceType", "Invoice Date", "Bill Amount", "Total Paid", "Received", "Balance", "Remark"];
}

function billwiseTable(type, record) {
  const rows = (record.lines || []).map((line, index) => normalizeBillwiseLine(line, type));
  const cells = rows.map((line, index) => `<tr>${billwiseRow(type, line, index).map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("");
  return `
    <div class="table-wrap billwise-table-wrap">
      <table class="billwise-table">
        <thead><tr>${billwiseColumns(type).map((column) => `<th>${column}</th>`).join("")}</tr></thead>
        <tbody>${cells}</tbody>
      </table>
    </div>
  `;
}

function billwiseRow(type, line, index) {
  const common = [
    String(index + 1),
    `<button class="line-delete" title="Remove row" data-action="delete-billwise-row-${type}" data-index="${index}">x</button>`,
    billwiseLineField(type, index, "invoiceNo", line.invoiceNo),
    billwiseLineField(type, index, "invoiceType", line.invoiceType),
    billwiseLineField(type, index, "invoiceDate", toDateInputValue(line.invoiceDate), "date"),
    billwiseLineField(type, index, "billAmount", moneyValue(line.billAmount), "number")
  ];
  if (type === "collection") {
    return [...common, billwiseLineField(type, index, "totalReceived", moneyValue(line.totalReceived), "number"), billwiseLineField(type, index, "oldCreditNote", moneyValue(line.oldCreditNote), "number"), billwiseLineField(type, index, "received", moneyValue(line.received), "number"), billwiseLineField(type, index, "discount", moneyValue(line.discount), "number"), billwiseLineAuto(line.balance), billwiseLineField(type, index, "remark", line.remark)];
  }
  if (type === "payment") {
    return [...common, billwiseLineField(type, index, "totalPaid", moneyValue(line.totalPaid), "number"), billwiseLineField(type, index, "dnd", moneyValue(line.dnd), "number"), billwiseLineField(type, index, "paid", moneyValue(line.paid), "number"), billwiseLineAuto(line.balance), billwiseLineField(type, index, "remark", line.remark)];
  }
  if (type === "credit") {
    return [...common, billwiseLineField(type, index, "paid", moneyValue(line.paid), "number"), billwiseLineField(type, index, "received", moneyValue(line.received), "number"), billwiseLineAuto(line.balance), billwiseLineField(type, index, "remark", line.remark)];
  }
  return [...common, billwiseLineField(type, index, "totalPaid", moneyValue(line.totalPaid), "number"), billwiseLineField(type, index, "received", moneyValue(line.received), "number"), billwiseLineAuto(line.balance), billwiseLineField(type, index, "remark", line.remark)];
}

function billwiseLineField(type, index, field, value = "", inputType = "text") {
  return `<input class="grid-input" data-billwise-type="${type}" data-billwise-line="${index}" data-billwise-line-field="${field}" type="${inputType}" value="${value ?? ""}" />`;
}

function billwiseLineAuto(value) {
  return `<input class="grid-input auto-field" value="${moneyValue(value)}" readonly />`;
}

function billwiseBottomStrip(type, financials) {
  if (type === "collection") return "";
  return `<div class="billwise-total-strip"><strong>Total Amount</strong><span>Only</span><output>${moneyValue(financials.totalAmount)}</output></div>`;
}

function bankTransactionStorageKey(type) {
  return type === "withdrawal" ? "bankWithdrawals" : "bankDeposits";
}

function bankTransactionTitle(type) {
  return type === "withdrawal" ? "Bank Payment" : "Bank Deposit";
}

function bankTransactionView(type) {
  return type === "withdrawal" ? "Bank Withdrawal" : "Bank Deposit";
}

function bankCostCenters() {
  const centers = (state?.miscellaneous?.costCenters || seed.miscellaneous?.costCenters || []).map((item) => item.name).filter(Boolean);
  return [...new Set(["cost1", ...centers])];
}

function bankStaffOptions() {
  return [...new Set([...(state?.staffs || seed.staffs || []).map((staff) => staff.name).filter(Boolean), "ABDUL SALAM AP"])];
}

function bankAccountOptions() {
  const masters = state?.accountMasters || seed.accountMasters || [];
  const bankMasters = masters
    .filter((account) => /bank/i.test(`${account.subSchedule || ""} ${account.accountName || ""}`))
    .map((account) => account.accountName)
    .filter(Boolean);
  return [...new Set(["Canara Bank Edakkara", "Federal Bank Edakkara", "NILAMBUR CO-OPERATIVE URBAN BANK", ...bankMasters])];
}

function bankAccountHeadOptions() {
  const masters = (state?.accountMasters || seed.accountMasters || []).map((account) => ({
    id: account.accountId || "",
    name: account.accountName || ""
  }));
  const ledgers = (state?.accounts || seed.accounts || []).map((account) => ({
    id: account.accountId || "",
    name: account.ledger || account.particular || ""
  }));
  return [...masters, ...ledgers]
    .filter((account) => account.name)
    .filter((account, index, list) => list.findIndex((item) => item.name === account.name) === index);
}

function defaultBankTransactionLine() {
  return {
    id: crypto.randomUUID(),
    headId: "",
    accountHead: "",
    amount: 0,
    remarks: "",
    voucherNo: "",
    voucherDate: toDateInputValue(new Date())
  };
}

function normalizeBankTransactionLine(line = {}) {
  return {
    id: line.id || crypto.randomUUID(),
    headId: line.headId || "",
    accountHead: line.accountHead || "",
    amount: Number(line.amount || 0),
    remarks: line.remarks || "",
    voucherNo: line.voucherNo || "",
    voucherDate: toDateInputValue(line.voucherDate || new Date())
  };
}

function defaultBankTransaction(type = "deposit") {
  const today = toDateInputValue(new Date());
  const staff = bankStaffOptions()[0] || "";
  return normalizeBankTransaction({
    id: crypto.randomUUID(),
    type,
    voucherNo: "",
    refNo: "",
    date: today,
    time: nowTimeWithSeconds(),
    preparedBy: staff,
    costCenter: bankCostCenters()[0] || "cost1",
    bankAccount: bankAccountOptions()[0] || "Canara Bank Edakkara",
    handledBy: staff,
    entry: defaultBankTransactionLine(),
    lines: [],
    showAllAccount: false,
    noPrint: false,
    rateFixed: false,
    narration: ""
  }, type);
}

function normalizeBankTransaction(record = {}, type = "deposit") {
  const today = toDateInputValue(new Date());
  const staff = bankStaffOptions()[0] || "";
  const lines = (record.lines || []).map(normalizeBankTransactionLine);
  const clean = {
    id: record.id || crypto.randomUUID(),
    type: record.type || type,
    voucherNo: record.voucherNo || "",
    refNo: record.refNo || "",
    date: toDateInputValue(record.date || today),
    time: record.time || nowTimeWithSeconds(),
    preparedBy: record.preparedBy || staff,
    costCenter: record.costCenter || bankCostCenters()[0] || "cost1",
    bankAccount: record.bankAccount || bankAccountOptions()[0] || "Canara Bank Edakkara",
    handledBy: record.handledBy || staff,
    entry: normalizeBankTransactionLine(record.entry || defaultBankTransactionLine()),
    lines,
    showAllAccount: Boolean(record.showAllAccount),
    noPrint: Boolean(record.noPrint),
    rateFixed: Boolean(record.rateFixed),
    narration: record.narration || ""
  };
  clean.totalAmount = bankTransactionFinancials(clean).totalAmount;
  return clean;
}

function bankTransactionFinancials(record) {
  return {
    totalAmount: sumBy(record.lines || [], "amount")
  };
}

function bankTransactionDraft(type) {
  if (!bankTransactionDrafts[type]) {
    bankTransactionDrafts[type] = normalizeBankTransaction(state[bankTransactionStorageKey(type)]?.[0] || defaultBankTransaction(type), type);
  }
  return bankTransactionDrafts[type];
}

function bankTransactionScreen(type) {
  const record = bankTransactionDraft(type);
  const financials = bankTransactionFinancials(record);
  return `
    <section class="clean-entry-shell bank-transaction-shell" data-bank-type="${type}">
      ${bankTransactionToolbar(type)}
      ${bankTransactionHeader(type, record)}
      <div class="bank-transaction-table-panel">
        ${bankTransactionEntryRow(type, record)}
        ${bankTransactionTable(type, record)}
      </div>
      ${bankTransactionTotalStrip(financials)}
      ${bankTransactionFooter(type, record)}
    </section>
  `;
}

function bankTransactionToolbar(type) {
  return `
    <div class="entry-actions body-toolbar bank-transaction-toolbar">
      ${toolbarButton("Save", `save-bank-transaction-${type}`)}
      ${toolbarButton("Refresh", `refresh-bank-transaction-${type}`)}
      ${toolbarButton("Edit", `edit-bank-transaction-${type}`)}
      ${toolbarButton("Delete", `delete-bank-transaction-${type}`)}
      ${toolbarButton("Print", `print-bank-transaction-${type}`)}
      ${toolbarButton("Close", "close-account-action")}
      <span class="toolbar-spacer"></span>
      <label class="rate-inline"><span>Gold Rate</span><input value="${activeGoldRate()}" readonly /></label>
    </div>
  `;
}

function bankTransactionHeader(type, record) {
  const handledLabel = type === "withdrawal" ? "Paid By" : "Received By";
  return `
    <div class="transaction-entry-header bank-transaction-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Voucher No, Ref No</span><span class="field-pair">${bankField(type, "voucherNo", record.voucherNo)}${bankField(type, "refNo", record.refNo)}</span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair">${bankField(type, "date", toDateInputValue(record.date), "date")}${bankField(type, "time", record.time)}</span></label>
        ${bankSelect(type, "preparedBy", "Prepared By", bankStaffOptions(), record.preparedBy)}
      </div>
      <div class="classic-fields right">
        ${bankSelect(type, "costCenter", "Cost Center", bankCostCenters(), record.costCenter)}
        ${bankSelect(type, "bankAccount", "Bank Account", bankAccountOptions(), record.bankAccount)}
        ${bankSelect(type, "handledBy", handledLabel, bankStaffOptions(), record.handledBy)}
      </div>
    </div>
  `;
}

function bankField(type, field, value = "", inputType = "text") {
  return `<input data-bank-type="${type}" data-bank-field="${field}" type="${inputType}" value="${value ?? ""}" />`;
}

function bankSelect(type, field, label, options, selected) {
  return `<label class="classic-field"><span>${label}</span>${bankSelectOnly(type, field, options, selected)}</label>`;
}

function bankSelectOnly(type, field, options, selected) {
  const unique = [...new Set((options || []).filter(Boolean))];
  return `<select data-bank-type="${type}" data-bank-field="${field}">${unique.map((option) => `<option ${option === selected ? "selected" : ""}>${option}</option>`).join("")}</select>`;
}

function bankTransactionEntryRow(type, record) {
  const entry = normalizeBankTransactionLine(record.entry || {});
  const heads = bankAccountHeadOptions();
  const listId = `bank-head-options-${type}`;
  return `
    <datalist id="${listId}">${heads.map((account) => `<option value="${account.name}" data-id="${account.id}"></option>`).join("")}</datalist>
    <div class="bank-transaction-entry-wrap">
      <table class="bank-transaction-entry-grid">
        <colgroup>
          <col style="width: 130px" /><col style="width: 320px" /><col style="width: 150px" /><col style="width: 220px" /><col style="width: 130px" /><col style="width: 140px" /><col style="width: 82px" />
        </colgroup>
        <thead><tr><th>Head ID</th><th>Account Head</th><th>Amount</th><th>Remarks</th><th>Voucher No</th><th>Voucher Date</th><th></th></tr></thead>
        <tbody>
          <tr>
            <td><input data-bank-type="${type}" data-bank-entry-field="headId" value="${entry.headId}" /></td>
            <td><input list="${listId}" data-bank-type="${type}" data-bank-entry-field="accountHead" value="${entry.accountHead}" /></td>
            <td><input class="numeric" data-bank-type="${type}" data-bank-entry-field="amount" type="number" value="${moneyValue(entry.amount)}" /></td>
            <td><input data-bank-type="${type}" data-bank-entry-field="remarks" value="${entry.remarks}" /></td>
            <td><input data-bank-type="${type}" data-bank-entry-field="voucherNo" value="${entry.voucherNo}" /></td>
            <td><input data-bank-type="${type}" data-bank-entry-field="voucherDate" type="date" value="${toDateInputValue(entry.voucherDate)}" /></td>
            <td><button class="compact-action" data-action="add-bank-transaction-line-${type}">Add</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function bankTransactionTable(type, record) {
  const rows = (record.lines || []).map((line, index) => normalizeBankTransactionLine(line));
  return `
    <div class="table-wrap bank-transaction-table-wrap">
      <table class="bank-transaction-table">
        <colgroup>
          <col style="width: 52px" /><col style="width: 44px" /><col style="width: 130px" /><col style="width: 320px" /><col style="width: 150px" /><col style="width: 220px" /><col style="width: 130px" /><col style="width: 140px" />
        </colgroup>
        <thead><tr><th>Sl#</th><th></th><th>Head ID</th><th>Account Head</th><th>Amount</th><th>Remarks</th><th>Voucher No</th><th>Voucher Date</th></tr></thead>
        <tbody>
          ${rows.map((line, index) => `
            <tr>
              <td>${index + 1}</td>
              <td><button class="line-delete" data-action="delete-bank-transaction-line-${type}" data-index="${index}" title="Remove row">x</button></td>
              <td><input data-bank-type="${type}" data-bank-line="${index}" data-bank-line-field="headId" value="${line.headId}" /></td>
              <td><input data-bank-type="${type}" data-bank-line="${index}" data-bank-line-field="accountHead" value="${line.accountHead}" /></td>
              <td><input class="numeric" data-bank-type="${type}" data-bank-line="${index}" data-bank-line-field="amount" type="number" value="${moneyValue(line.amount)}" /></td>
              <td><input data-bank-type="${type}" data-bank-line="${index}" data-bank-line-field="remarks" value="${line.remarks}" /></td>
              <td><input data-bank-type="${type}" data-bank-line="${index}" data-bank-line-field="voucherNo" value="${line.voucherNo}" /></td>
              <td><input data-bank-type="${type}" data-bank-line="${index}" data-bank-line-field="voucherDate" type="date" value="${toDateInputValue(line.voucherDate)}" /></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function bankTransactionTotalStrip(financials) {
  return `<div class="bank-transaction-total-strip"><strong>Total Amount</strong><output>${moneyValue(financials.totalAmount)}</output><span>-</span></div>`;
}

function bankTransactionFooter(type, record) {
  return `
    <div class="bank-transaction-footer">
      <div class="bank-transaction-checks">
        <label><input type="checkbox" data-bank-type="${type}" data-bank-field="showAllAccount" ${record.showAllAccount ? "checked" : ""} /> Show All Account</label>
        <label><input type="checkbox" data-bank-type="${type}" data-bank-field="noPrint" ${record.noPrint ? "checked" : ""} /> <strong>No Print</strong></label>
        <label><input type="checkbox" data-bank-type="${type}" data-bank-field="rateFixed" ${record.rateFixed ? "checked" : ""} /> Rate Fixed</label>
      </div>
      <label class="bank-transaction-narration"><span>Narration</span><textarea data-bank-type="${type}" data-bank-field="narration">${record.narration || ""}</textarea></label>
    </div>
  `;
}

function pdcTypeFromView(view) {
  return {
    "PDC Issue": "issue",
    "PDC Request": "pdcRequest",
    "Bank Submission": "submission",
    "PDC Receipt": "receipt",
    "Cheque Bounce": "bounce",
    "Cheque Represent": "request",
    "Cheque Request": "request"
  }[view] || "submission";
}

function pdcViewFromType(type) {
  return {
    issue: "PDC Issue",
    pdcRequest: "PDC Request",
    submission: "Bank Submission",
    receipt: "PDC Receipt",
    bounce: "Cheque Bounce",
    request: "Cheque Represent"
  }[type] || "Bank Submission";
}

function pdcStorageKey(type) {
  return {
    issue: "pdcIssues",
    pdcRequest: "pdcRequests",
    submission: "pdcBankSubmissions",
    receipt: "pdcReceipts",
    bounce: "pdcChequeBounces",
    request: "pdcChequeRequests"
  }[type] || "pdcBankSubmissions";
}

function pdcTitle(type) {
  return {
    issue: "PDC Issue",
    pdcRequest: "PDC Request",
    submission: "PDC Bank Submission",
    receipt: "PDC Receipt",
    bounce: "Cheque Bounce",
    request: "Represent Bounced Cheque"
  }[type] || "PDC Bank Submission";
}

function pdcAttr(value) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function defaultPdcSubmissionLine() {
  return {
    id: crypto.randomUUID(),
    chequeNo: "",
    chequeDate: toDateInputValue(new Date()),
    amount: 0,
    entryDate: toDateInputValue(new Date()),
    partyName: ""
  };
}

function normalizePdcSubmissionLine(line = {}) {
  return {
    id: line.id || crypto.randomUUID(),
    chequeNo: line.chequeNo || "",
    chequeDate: toDateInputValue(line.chequeDate || new Date()),
    amount: Number(line.amount || 0),
    entryDate: toDateInputValue(line.entryDate || new Date()),
    partyName: line.partyName || ""
  };
}

function defaultPdcBounceLine() {
  return {
    id: crypto.randomUUID(),
    entryNo: "",
    chequeNo: "",
    type: "PDC",
    amount: 0,
    chequeDate: toDateInputValue(new Date()),
    serviceChargeBank: 0,
    serviceChargeParty: 0,
    partyName: ""
  };
}

function normalizePdcBounceLine(line = {}) {
  return {
    id: line.id || crypto.randomUUID(),
    entryNo: line.entryNo || "",
    chequeNo: line.chequeNo || "",
    type: line.type || "PDC",
    amount: Number(line.amount || 0),
    chequeDate: toDateInputValue(line.chequeDate || new Date()),
    serviceChargeBank: Number(line.serviceChargeBank || 0),
    serviceChargeParty: Number(line.serviceChargeParty || 0),
    partyName: line.partyName || ""
  };
}

function defaultPdcReceiptLine() {
  return {
    id: crypto.randomUUID(),
    invoiceNo: "",
    invoiceType: "Sales",
    invoiceDate: toDateInputValue(new Date()),
    billAmount: 0,
    paid: 0,
    received: 0,
    balance: 0,
    remark: "",
    cvRid: ""
  };
}

function normalizePdcReceiptLine(line = {}) {
  const billAmount = Number(line.billAmount || 0);
  const paid = Number(line.paid || 0);
  const received = Number(line.received || 0);
  return {
    id: line.id || crypto.randomUUID(),
    invoiceNo: line.invoiceNo || "",
    invoiceType: line.invoiceType || "Sales",
    invoiceDate: toDateInputValue(line.invoiceDate || new Date()),
    billAmount,
    paid,
    received,
    balance: billAmount - paid - received,
    remark: line.remark || "",
    cvRid: line.cvRid || ""
  };
}

function defaultPdcRecord(type = "submission") {
  const today = toDateInputValue(new Date());
  const staff = bankStaffOptions()[0] || "";
  return normalizePdcRecord({
    id: crypto.randomUUID(),
    type,
    entryNo: "",
    refNo: "",
    date: today,
    time: nowTimeWithSeconds(),
    preparedBy: staff,
    preparedByCode: "",
    receivedBy: staff,
    receivedByCode: "",
    partyCode: "",
    partyName: "",
    chequeNo: "",
    chequeDate: today,
    chequeAmount: 0,
    bankAccount: bankAccountOptions()[0] || "Canara Bank Edakkara",
    bankName: bankAccountOptions()[0] || "Canara Bank Edakkara",
    entry: type === "bounce" ? defaultPdcBounceLine() : ["receipt", "issue", "pdcRequest"].includes(type) ? defaultPdcReceiptLine() : defaultPdcSubmissionLine(),
    lines: [],
    bouncedChequeId: "",
    reasonForRepresent: "As Per Party Request",
    remark: ""
  }, type);
}

function normalizePdcRecord(record = {}, type = "submission") {
  const today = toDateInputValue(new Date());
  const staff = bankStaffOptions()[0] || "";
  const cleanType = record.type || type;
  const lines = cleanType === "bounce"
    ? (record.lines || []).map(normalizePdcBounceLine)
    : ["receipt", "issue", "pdcRequest"].includes(cleanType)
      ? (record.lines || []).map(normalizePdcReceiptLine)
      : cleanType === "submission"
      ? (record.lines || []).map(normalizePdcSubmissionLine)
      : [];
  const clean = {
    id: record.id || crypto.randomUUID(),
    type: cleanType,
    entryNo: record.entryNo || "",
    refNo: record.refNo || "",
    date: toDateInputValue(record.date || today),
    time: record.time || nowTimeWithSeconds(),
    preparedBy: record.preparedBy || staff,
    preparedByCode: record.preparedByCode || "",
    receivedBy: record.receivedBy || staff,
    receivedByCode: record.receivedByCode || "",
    partyCode: record.partyCode || "",
    partyName: record.partyName || record.party || "",
    chequeNo: record.chequeNo || "",
    bankAccount: record.bankAccount || record.bankName || bankAccountOptions()[0] || "Canara Bank Edakkara",
    bankName: record.bankName || record.bankAccount || bankAccountOptions()[0] || "Canara Bank Edakkara",
    entry: cleanType === "bounce" ? normalizePdcBounceLine(record.entry || {}) : ["receipt", "issue", "pdcRequest"].includes(cleanType) ? normalizePdcReceiptLine(record.entry || {}) : normalizePdcSubmissionLine(record.entry || {}),
    lines,
    bouncedChequeId: record.bouncedChequeId || "",
    requestEntryNo: record.requestEntryNo || record.entryNo || "",
    requestEntryDate: toDateInputValue(record.requestEntryDate || record.date || today),
    chequeDate: toDateInputValue(record.chequeDate || today),
    chequeAmount: Number(record.chequeAmount || 0),
    party: record.party || record.partyName || "",
    reason: record.reason || "",
    reasonForRepresent: record.reasonForRepresent || "As Per Party Request",
    remark: record.remark || ""
  };
  if (cleanType === "request" && clean.bouncedChequeId) applyPdcBounceToRequest(clean);
  clean.totalAmount = pdcFinancials(clean, cleanType).totalAmount;
  return clean;
}

function pdcFinancials(record = {}, type = record.type || "submission") {
  if (type === "submission") return { totalAmount: sumBy(record.lines || [], "amount") };
  if (["issue", "pdcRequest"].includes(type)) {
    return {
      totalAmount: sumBy(record.lines || [], "received"),
      chequeAmount: Number(record.chequeAmount || 0),
      balanceAmount: Number(record.chequeAmount || 0) - sumBy(record.lines || [], "received")
    };
  }
  if (type === "receipt") {
    return {
      totalAmount: sumBy(record.lines || [], "received"),
      chequeAmount: Number(record.chequeAmount || 0),
      balanceAmount: Number(record.chequeAmount || 0) - sumBy(record.lines || [], "received")
    };
  }
  if (type === "bounce") {
    return {
      totalAmount: sumBy(record.lines || [], "amount"),
      totalServiceChargeBank: sumBy(record.lines || [], "serviceChargeBank"),
      totalServiceChargeParty: sumBy(record.lines || [], "serviceChargeParty")
    };
  }
  return { totalAmount: Number(record.chequeAmount || 0) };
}

function pdcDraft(type) {
  if (!pdcDrafts[type]) {
    pdcDrafts[type] = normalizePdcRecord(state[pdcStorageKey(type)]?.[0] || defaultPdcRecord(type), type);
  }
  return pdcDrafts[type];
}

function pdcBounceOptions() {
  const rows = (state.pdcChequeBounces || []).flatMap((record) => (record.lines || []).map((line) => ({
    id: `${record.id}:${line.id}`,
    record,
    line: normalizePdcBounceLine(line)
  })));
  return rows;
}

function findPdcBounceOption(id) {
  return pdcBounceOptions().find((option) => option.id === id);
}

function applyPdcBounceToRequest(record) {
  const match = findPdcBounceOption(record.bouncedChequeId);
  if (!match) return record;
  record.requestEntryNo = match.line.entryNo || match.record.entryNo || "";
  record.requestEntryDate = toDateInputValue(match.record.date || new Date());
  record.chequeDate = toDateInputValue(match.line.chequeDate || new Date());
  record.chequeAmount = Number(match.line.amount || 0);
  record.party = match.line.partyName || "";
  record.reason = `Bounced cheque ${match.line.chequeNo || ""}`.trim();
  return record;
}

function pdcTransactionsScreen() {
  const views = ["PDC Issue", "PDC Request", "PDC Receipt", "Bank Submission", "Cheque Bounce", "Cheque Represent"];
  const type = pdcTypeFromView(pdcView);
  return `
    ${moduleSwitcher("PDC Transactions", views, pdcView, "data-pdc-section")}
    <section class="clean-entry-shell bank-transaction-shell pdc-shell" data-pdc-type="${type}">
      ${pdcToolbar(type)}
      ${type === "request" ? pdcChequeRepresentScreen() : type === "bounce" ? pdcChequeBounceScreen() : type === "receipt" ? pdcReceiptScreen() : type === "issue" ? pdcIssueScreen() : type === "pdcRequest" ? pdcRequestScreen() : pdcBankSubmissionScreen()}
    </section>
  `;
}

function pdcToolbar(type) {
  if (type === "request") {
    return `
      <div class="entry-actions body-toolbar bank-transaction-toolbar">
        ${toolbarButton("New", `new-pdc-${type}`)}
        ${toolbarButton("Save F9", `save-pdc-${type}`)}
        ${toolbarButton("Refresh", `refresh-pdc-${type}`)}
        <button class="toolbar-button muted" disabled>Search</button>
        ${toolbarButton("Close", "close-account-action")}
        <span class="toolbar-spacer"></span>
        <label class="rate-inline"><span>Gold Rate</span><input value="${activeGoldRate()}" readonly /></label>
      </div>
    `;
  }
  return `
    <div class="entry-actions body-toolbar bank-transaction-toolbar">
      ${toolbarButton("New", `new-pdc-${type}`)}
      ${toolbarButton(type === "submission" ? "Save" : "Save F9", `save-pdc-${type}`)}
      ${toolbarButton("Refresh", `refresh-pdc-${type}`)}
      ${type !== "submission" ? toolbarButton("Print", `print-pdc-${type}`) : ""}
      ${type !== "submission" ? toolbarButton("Delete", `delete-pdc-${type}`) : ""}
      ${toolbarButton("Close", "close-account-action")}
      ${type === "receipt" ? toolbarButton("Search", "search-pdc-receipt") : `<button class="toolbar-button muted" disabled>Search</button>`}
      <span class="toolbar-spacer"></span>
      ${type === "submission" ? "" : `<label class="rate-inline"><span>Gold Rate</span><input value="${activeGoldRate()}" readonly /></label>`}
    </div>
  `;
}

function pdcField(type, field, value = "", inputType = "text", readonly = false) {
  return `<input data-pdc-type="${type}" data-pdc-field="${field}" type="${inputType}" value="${pdcAttr(value)}" ${readonly ? "readonly" : ""} />`;
}

function pdcEntryField(type, field, value = "", inputType = "text") {
  return `<input class="grid-input" data-pdc-type="${type}" data-pdc-entry-field="${field}" type="${inputType}" value="${pdcAttr(value)}" />`;
}

function pdcLineField(type, index, field, value = "", inputType = "text") {
  return `<input class="grid-input" data-pdc-type="${type}" data-pdc-line="${index}" data-pdc-line-field="${field}" type="${inputType}" value="${pdcAttr(value)}" />`;
}

function pdcSelectOnly(type, field, options, selected, entry = false) {
  const attr = entry ? "data-pdc-entry-field" : "data-pdc-field";
  return `<select data-pdc-type="${type}" ${attr}="${field}">${[...new Set(options.filter(Boolean))].map((option) => `<option ${option === selected ? "selected" : ""}>${option}</option>`).join("")}</select>`;
}

function pdcSelect(type, field, label, options, selected) {
  return `<label class="classic-field"><span>${label}</span>${pdcSelectOnly(type, field, options, selected)}</label>`;
}

function pdcPartyOptions() {
  return [...new Set((state.parties || []).map((party) => party.name).filter(Boolean))];
}

function pdcStaffCode(name) {
  const match = (state.staffs || []).find((staff) => staff.name === name || staff.staffId === name || staff.employeeId === name);
  return match?.staffId || match?.employeeId || "";
}

function pdcReceiptScreen() {
  const type = "receipt";
  const record = pdcDraft(type);
  const financials = pdcFinancials(record, type);
  return `
    <div class="transaction-entry-header pdc-receipt-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Ref No</span><span class="field-pair">${pdcField(type, "entryNo", record.entryNo)}${pdcField(type, "refNo", record.refNo)}</span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair">${pdcField(type, "date", toDateInputValue(record.date), "date")}${pdcField(type, "time", record.time)}</span></label>
        <label class="classic-field split-field"><span>Cheque No, Date</span><span class="field-pair">${pdcField(type, "chequeNo", record.chequeNo)}${pdcField(type, "chequeDate", toDateInputValue(record.chequeDate), "date")}</span></label>
        <label class="classic-field split-field amount-pair"><span>Cheque Amount</span><span class="field-pair">${pdcField(type, "receivedTotal", moneyValue(financials.totalAmount), "number", true)}${pdcField(type, "chequeAmount", moneyValue(record.chequeAmount), "number")}</span></label>
      </div>
      <div class="classic-fields right">
        <label class="classic-field split-field"><span>Party Name</span><span class="field-pair">${pdcField(type, "partyCode", record.partyCode)}${pdcSelectOnly(type, "partyName", pdcPartyOptions(), record.partyName)}</span></label>
        <label class="classic-field split-field"><span>Prepared By</span><span class="field-pair">${pdcField(type, "preparedByCode", record.preparedByCode || pdcStaffCode(record.preparedBy))}${pdcSelectOnly(type, "preparedBy", bankStaffOptions(), record.preparedBy)}</span></label>
        <label class="classic-field split-field"><span>Received By</span><span class="field-pair">${pdcField(type, "receivedByCode", record.receivedByCode || pdcStaffCode(record.receivedBy))}${pdcSelectOnly(type, "receivedBy", bankStaffOptions(), record.receivedBy)}</span></label>
      </div>
    </div>
    <div class="bank-transaction-table-panel pdc-receipt-table-panel">
      <div class="table-wrap bank-transaction-table-wrap pdc-receipt-table-wrap">
        <table class="bank-transaction-table pdc-receipt-table">
          <colgroup><col style="width:52px" /><col style="width:150px" /><col style="width:130px" /><col style="width:145px" /><col style="width:140px" /><col style="width:120px" /><col style="width:120px" /><col style="width:120px" /><col style="width:220px" /><col style="width:100px" /><col style="width:64px" /></colgroup>
          <thead><tr><th>Sl#</th><th>Invoice No</th><th>InvoiceType</th><th>Invoice Date</th><th>Bill Amount</th><th>Paid</th><th>Received</th><th>Balance</th><th>Remark</th><th>CVrid</th><th></th></tr></thead>
          <tbody>
            <tr>
              <td></td>
              <td>${pdcEntryField(type, "invoiceNo", record.entry.invoiceNo)}</td>
              <td>${pdcEntryField(type, "invoiceType", record.entry.invoiceType)}</td>
              <td>${pdcEntryField(type, "invoiceDate", toDateInputValue(record.entry.invoiceDate), "date")}</td>
              <td>${pdcEntryField(type, "billAmount", moneyValue(record.entry.billAmount), "number")}</td>
              <td>${pdcEntryField(type, "paid", moneyValue(record.entry.paid), "number")}</td>
              <td>${pdcEntryField(type, "received", moneyValue(record.entry.received), "number")}</td>
              <td><input class="grid-input auto-field numeric" value="${moneyValue(record.entry.balance)}" readonly /></td>
              <td>${pdcEntryField(type, "remark", record.entry.remark)}</td>
              <td>${pdcEntryField(type, "cvRid", record.entry.cvRid)}</td>
              <td><button class="compact-action" data-action="add-pdc-line-${type}">Add</button></td>
            </tr>
            ${(record.lines || []).map((line, index) => {
              const row = normalizePdcReceiptLine(line);
              return `<tr>
                <td>${index + 1}<button class="line-delete" data-action="delete-pdc-line-${type}" data-index="${index}" title="Remove row">x</button></td>
                <td>${pdcLineField(type, index, "invoiceNo", row.invoiceNo)}</td>
                <td>${pdcLineField(type, index, "invoiceType", row.invoiceType)}</td>
                <td>${pdcLineField(type, index, "invoiceDate", toDateInputValue(row.invoiceDate), "date")}</td>
                <td>${pdcLineField(type, index, "billAmount", moneyValue(row.billAmount), "number")}</td>
                <td>${pdcLineField(type, index, "paid", moneyValue(row.paid), "number")}</td>
                <td>${pdcLineField(type, index, "received", moneyValue(row.received), "number")}</td>
                <td><input class="grid-input auto-field numeric" value="${moneyValue(row.balance)}" readonly /></td>
                <td>${pdcLineField(type, index, "remark", row.remark)}</td>
                <td>${pdcLineField(type, index, "cvRid", row.cvRid)}</td>
                <td></td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>
    ${pdcReceiptTotalStrip(financials)}
    ${pdcReceiptRegister()}
  `;
}

function pdcReceiptTotalStrip(financials) {
  return `<div class="bank-transaction-total-strip pdc-receipt-total-strip"><strong>Total Amount :</strong><span>-</span><output>${moneyValue(financials.totalAmount)}</output></div>`;
}

function pdcReceiptRegister() {
  const rows = (state.pdcReceipts || []).slice(0, 8).map((record) => {
    const clean = normalizePdcRecord(record, "receipt");
    return `<tr>
      <td>${clean.entryNo || "-"}</td>
      <td>${formatDisplayDate(clean.date)}</td>
      <td>${clean.partyName || "-"}</td>
      <td>${clean.chequeNo || "-"}</td>
      <td>${moneyValue(clean.totalAmount)}</td>
      <td><button class="compact-action" data-action="load-pdc-receipt" data-record-id="${pdcAttr(clean.id)}">Load</button></td>
    </tr>`;
  }).join("");
  return `
    <div class="panel pdc-receipt-register">
      <div class="panel-head"><h2>Saved PDC Receipts</h2><small>Use Search or Load to reopen a saved entry.</small></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Entry No</th><th>Date</th><th>Party</th><th>Cheque No</th><th>Total</th><th>Open</th></tr></thead>
          <tbody>${rows || `<tr><td colspan="6">No PDC receipts saved yet.</td></tr>`}</tbody>
        </table>
      </div>
    </div>
  `;
}

function pdcIssueScreen() {
  const type = "issue";
  const record = pdcDraft(type);
  const financials = pdcFinancials(record, type);
  return `
    <div class="transaction-entry-header pdc-receipt-header pdc-issue-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Ref No</span><span class="field-pair">${pdcField(type, "entryNo", record.entryNo)}${pdcField(type, "refNo", record.refNo)}</span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair">${pdcField(type, "date", toDateInputValue(record.date), "date")}${pdcField(type, "time", record.time)}</span></label>
        <label class="classic-field split-field"><span>Cheque No, Date</span><span class="field-pair">${pdcField(type, "chequeNo", record.chequeNo)}${pdcField(type, "chequeDate", toDateInputValue(record.chequeDate), "date")}</span></label>
        <label class="classic-field split-field amount-pair"><span>Cheque Amount</span><span class="field-pair">${pdcField(type, "receivedTotal", moneyValue(financials.totalAmount), "number", true)}${pdcField(type, "chequeAmount", moneyValue(record.chequeAmount), "number")}</span></label>
      </div>
      <div class="classic-fields right">
        ${pdcSelect(type, "bankName", "Bank Name", bankAccountOptions(), record.bankName)}
        <label class="classic-field split-field"><span>Party Name</span><span class="field-pair">${pdcField(type, "partyCode", record.partyCode)}${pdcSelectOnly(type, "partyName", pdcPartyOptions(), record.partyName)}</span></label>
        <label class="classic-field split-field"><span>Prepared By</span><span class="field-pair">${pdcField(type, "preparedByCode", record.preparedByCode || pdcStaffCode(record.preparedBy))}${pdcSelectOnly(type, "preparedBy", bankStaffOptions(), record.preparedBy)}</span></label>
        <label class="classic-field split-field"><span>Received By</span><span class="field-pair">${pdcField(type, "receivedByCode", record.receivedByCode || pdcStaffCode(record.receivedBy))}${pdcSelectOnly(type, "receivedBy", bankStaffOptions(), record.receivedBy)}</span></label>
      </div>
    </div>
    <div class="bank-transaction-table-panel pdc-receipt-table-panel">
      <div class="table-wrap bank-transaction-table-wrap pdc-receipt-table-wrap">
        <table class="bank-transaction-table pdc-receipt-table pdc-issue-table">
          <colgroup><col style="width:52px" /><col style="width:150px" /><col style="width:130px" /><col style="width:145px" /><col style="width:140px" /><col style="width:120px" /><col style="width:120px" /><col style="width:120px" /><col style="width:220px" /><col style="width:100px" /><col style="width:64px" /></colgroup>
          <thead><tr><th>Sl#</th><th>Invoice No</th><th>InvoiceType</th><th>Invoice Date</th><th>Bill Amount</th><th>Paid</th><th>Received</th><th>Balance</th><th>Remark</th><th>CVrid</th><th></th></tr></thead>
          <tbody>
            <tr>
              <td></td>
              <td>${pdcEntryField(type, "invoiceNo", record.entry.invoiceNo)}</td>
              <td>${pdcEntryField(type, "invoiceType", record.entry.invoiceType)}</td>
              <td>${pdcEntryField(type, "invoiceDate", toDateInputValue(record.entry.invoiceDate), "date")}</td>
              <td>${pdcEntryField(type, "billAmount", moneyValue(record.entry.billAmount), "number")}</td>
              <td>${pdcEntryField(type, "paid", moneyValue(record.entry.paid), "number")}</td>
              <td>${pdcEntryField(type, "received", moneyValue(record.entry.received), "number")}</td>
              <td><input class="grid-input auto-field numeric" value="${moneyValue(record.entry.balance)}" readonly /></td>
              <td>${pdcEntryField(type, "remark", record.entry.remark)}</td>
              <td>${pdcEntryField(type, "cvRid", record.entry.cvRid)}</td>
              <td><button class="compact-action" data-action="add-pdc-line-${type}">Add</button></td>
            </tr>
            ${(record.lines || []).map((line, index) => {
              const row = normalizePdcReceiptLine(line);
              return `<tr>
                <td>${index + 1}<button class="line-delete" data-action="delete-pdc-line-${type}" data-index="${index}" title="Remove row">x</button></td>
                <td>${pdcLineField(type, index, "invoiceNo", row.invoiceNo)}</td>
                <td>${pdcLineField(type, index, "invoiceType", row.invoiceType)}</td>
                <td>${pdcLineField(type, index, "invoiceDate", toDateInputValue(row.invoiceDate), "date")}</td>
                <td>${pdcLineField(type, index, "billAmount", moneyValue(row.billAmount), "number")}</td>
                <td>${pdcLineField(type, index, "paid", moneyValue(row.paid), "number")}</td>
                <td>${pdcLineField(type, index, "received", moneyValue(row.received), "number")}</td>
                <td><input class="grid-input auto-field numeric" value="${moneyValue(row.balance)}" readonly /></td>
                <td>${pdcLineField(type, index, "remark", row.remark)}</td>
                <td>${pdcLineField(type, index, "cvRid", row.cvRid)}</td>
                <td></td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>
    ${pdcIssueTotalStrip(financials)}
  `;
}

function pdcIssueTotalStrip(financials) {
  return `<div class="bank-transaction-total-strip pdc-receipt-total-strip"><strong>Total Amount:</strong><span>-</span><output>${moneyValue(financials.totalAmount)}</output></div>`;
}

function pdcRequestScreen() {
  const type = "pdcRequest";
  const record = pdcDraft(type);
  const financials = pdcFinancials(record, type);
  return `
    <div class="transaction-entry-header pdc-receipt-header pdc-request-allocation-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Ref No</span><span class="field-pair">${pdcField(type, "entryNo", record.entryNo)}${pdcField(type, "refNo", record.refNo)}</span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair">${pdcField(type, "date", toDateInputValue(record.date), "date")}${pdcField(type, "time", record.time)}</span></label>
        <label class="classic-field split-field"><span>Cheque No, Date</span><span class="field-pair">${pdcField(type, "chequeNo", record.chequeNo)}${pdcField(type, "chequeDate", toDateInputValue(record.chequeDate), "date")}</span></label>
        <label class="classic-field split-field amount-pair"><span>Cheque Amount</span><span class="field-pair">${pdcField(type, "receivedTotal", moneyValue(financials.totalAmount), "number", true)}${pdcField(type, "chequeAmount", moneyValue(record.chequeAmount), "number")}</span></label>
      </div>
      <div class="classic-fields right">
        <label class="classic-field split-field"><span>Party Name</span><span class="field-pair">${pdcField(type, "partyCode", record.partyCode)}${pdcSelectOnly(type, "partyName", pdcPartyOptions(), record.partyName)}</span></label>
        <label class="classic-field split-field"><span>Prepared By</span><span class="field-pair">${pdcField(type, "preparedByCode", record.preparedByCode || pdcStaffCode(record.preparedBy))}${pdcSelectOnly(type, "preparedBy", bankStaffOptions(), record.preparedBy)}</span></label>
        <label class="classic-field split-field"><span>Received By</span><span class="field-pair">${pdcField(type, "receivedByCode", record.receivedByCode || pdcStaffCode(record.receivedBy))}${pdcSelectOnly(type, "receivedBy", bankStaffOptions(), record.receivedBy)}</span></label>
      </div>
    </div>
    <div class="bank-transaction-table-panel pdc-receipt-table-panel">
      <div class="table-wrap bank-transaction-table-wrap pdc-receipt-table-wrap">
        <table class="bank-transaction-table pdc-receipt-table pdc-request-allocation-table">
          <colgroup><col style="width:52px" /><col style="width:150px" /><col style="width:130px" /><col style="width:145px" /><col style="width:140px" /><col style="width:120px" /><col style="width:120px" /><col style="width:120px" /><col style="width:220px" /><col style="width:100px" /><col style="width:64px" /></colgroup>
          <thead><tr><th>Sl#</th><th>Invoice No</th><th>InvoiceType</th><th>Invoice Date</th><th>Bill Amount</th><th>Paid</th><th>Received</th><th>Balance</th><th>Remark</th><th>CVrid</th><th></th></tr></thead>
          <tbody>
            <tr>
              <td></td>
              <td>${pdcEntryField(type, "invoiceNo", record.entry.invoiceNo)}</td>
              <td>${pdcEntryField(type, "invoiceType", record.entry.invoiceType)}</td>
              <td>${pdcEntryField(type, "invoiceDate", toDateInputValue(record.entry.invoiceDate), "date")}</td>
              <td>${pdcEntryField(type, "billAmount", moneyValue(record.entry.billAmount), "number")}</td>
              <td>${pdcEntryField(type, "paid", moneyValue(record.entry.paid), "number")}</td>
              <td>${pdcEntryField(type, "received", moneyValue(record.entry.received), "number")}</td>
              <td><input class="grid-input auto-field numeric" value="${moneyValue(record.entry.balance)}" readonly /></td>
              <td>${pdcEntryField(type, "remark", record.entry.remark)}</td>
              <td>${pdcEntryField(type, "cvRid", record.entry.cvRid)}</td>
              <td><button class="compact-action" data-action="add-pdc-line-${type}">Add</button></td>
            </tr>
            ${(record.lines || []).map((line, index) => {
              const row = normalizePdcReceiptLine(line);
              return `<tr>
                <td>${index + 1}<button class="line-delete" data-action="delete-pdc-line-${type}" data-index="${index}" title="Remove row">x</button></td>
                <td>${pdcLineField(type, index, "invoiceNo", row.invoiceNo)}</td>
                <td>${pdcLineField(type, index, "invoiceType", row.invoiceType)}</td>
                <td>${pdcLineField(type, index, "invoiceDate", toDateInputValue(row.invoiceDate), "date")}</td>
                <td>${pdcLineField(type, index, "billAmount", moneyValue(row.billAmount), "number")}</td>
                <td>${pdcLineField(type, index, "paid", moneyValue(row.paid), "number")}</td>
                <td>${pdcLineField(type, index, "received", moneyValue(row.received), "number")}</td>
                <td><input class="grid-input auto-field numeric" value="${moneyValue(row.balance)}" readonly /></td>
                <td>${pdcLineField(type, index, "remark", row.remark)}</td>
                <td>${pdcLineField(type, index, "cvRid", row.cvRid)}</td>
                <td></td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>
    ${pdcRequestTotalStrip(financials)}
  `;
}

function pdcRequestTotalStrip(financials) {
  return `<div class="bank-transaction-total-strip pdc-receipt-total-strip"><strong>Total Amount :</strong><span>-</span><output>${moneyValue(financials.totalAmount)}</output></div>`;
}

function pdcIssueRequestScreen(type) {
  const record = pdcDraft(type);
  const title = pdcTitle(type);
  return `
    <div class="transaction-entry-header bank-transaction-header pdc-issue-request-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Ref No</span><span class="field-pair">${pdcField(type, "entryNo", record.entryNo)}${pdcField(type, "refNo", record.refNo)}</span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair">${pdcField(type, "date", toDateInputValue(record.date), "date")}${pdcField(type, "time", record.time)}</span></label>
        ${pdcSelect(type, "bankAccount", type === "issue" ? "Issue Bank" : "Request Bank", bankAccountOptions(), record.bankAccount)}
      </div>
      <div class="classic-fields right">
        <label class="classic-field split-field"><span>Prepared By</span><span class="field-pair">${pdcField(type, "preparedByCode", record.preparedByCode || pdcStaffCode(record.preparedBy))}${pdcSelectOnly(type, "preparedBy", bankStaffOptions(), record.preparedBy)}</span></label>
        <label class="classic-field textarea-field"><span>Remark</span><textarea data-pdc-type="${type}" data-pdc-field="remark">${pdcAttr(record.remark)}</textarea></label>
      </div>
    </div>
    <div class="bank-transaction-table-panel">
      <div class="panel-head pdc-inline-heading"><h2>${title}</h2><button class="secondary" data-action="add-pdc-line-${type}">Add Cheque Row</button></div>
      <div class="table-wrap bank-transaction-table-wrap">
        <table class="bank-transaction-table">
          <colgroup><col style="width:52px" /><col style="width:170px" /><col style="width:150px" /><col style="width:150px" /><col style="width:150px" /><col style="width:320px" /><col style="width:72px" /></colgroup>
          <thead><tr><th>Sl</th><th>Cheque No</th><th>Cheque Date</th><th>Amount</th><th>Entry Date</th><th>Party Name</th><th></th></tr></thead>
          <tbody>
            <tr>
              <td></td>
              <td>${pdcEntryField(type, "chequeNo", record.entry.chequeNo)}</td>
              <td>${pdcEntryField(type, "chequeDate", toDateInputValue(record.entry.chequeDate), "date")}</td>
              <td>${pdcEntryField(type, "amount", moneyValue(record.entry.amount), "number")}</td>
              <td>${pdcEntryField(type, "entryDate", toDateInputValue(record.entry.entryDate), "date")}</td>
              <td>${pdcEntryField(type, "partyName", record.entry.partyName)}</td>
              <td><button class="compact-action" data-action="add-pdc-line-${type}">Add</button></td>
            </tr>
            ${(record.lines || []).map((line, index) => {
              const row = normalizePdcSubmissionLine(line);
              return `<tr>
                <td>${index + 1}</td>
                <td>${pdcLineField(type, index, "chequeNo", row.chequeNo)}</td>
                <td>${pdcLineField(type, index, "chequeDate", toDateInputValue(row.chequeDate), "date")}</td>
                <td>${pdcLineField(type, index, "amount", moneyValue(row.amount), "number")}</td>
                <td>${pdcLineField(type, index, "entryDate", toDateInputValue(row.entryDate), "date")}</td>
                <td>${pdcLineField(type, index, "partyName", row.partyName)}</td>
                <td><button class="line-delete" data-action="delete-pdc-line-${type}" data-index="${index}" title="Remove row">x</button></td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>
    ${bankTransactionTotalStrip(pdcFinancials(record, type))}
  `;
}

function pdcBankSubmissionScreen() {
  const type = "submission";
  const record = pdcDraft(type);
  return `
    ${pdcSplitHeader(type, record, "Entry Date, Time", "Bank Account")}
    <div class="bank-transaction-table-panel">
      <div class="table-wrap bank-transaction-table-wrap">
        <table class="bank-transaction-table">
          <colgroup><col style="width:52px" /><col style="width:170px" /><col style="width:150px" /><col style="width:150px" /><col style="width:150px" /><col style="width:320px" /><col style="width:72px" /></colgroup>
          <thead><tr><th>Sl</th><th>Cheque No</th><th>Cheque Date</th><th>Amount</th><th>Entry Date</th><th>Party Name</th><th></th></tr></thead>
          <tbody>
            <tr>
              <td></td>
              <td>${pdcEntryField(type, "chequeNo", record.entry.chequeNo)}</td>
              <td>${pdcEntryField(type, "chequeDate", toDateInputValue(record.entry.chequeDate), "date")}</td>
              <td>${pdcEntryField(type, "amount", moneyValue(record.entry.amount), "number")}</td>
              <td>${pdcEntryField(type, "entryDate", toDateInputValue(record.entry.entryDate), "date")}</td>
              <td>${pdcEntryField(type, "partyName", record.entry.partyName)}</td>
              <td><button class="compact-action" data-action="add-pdc-line-${type}">Add</button></td>
            </tr>
            ${(record.lines || []).map((line, index) => {
              const row = normalizePdcSubmissionLine(line);
              return `<tr>
                <td>${index + 1}</td>
                <td>${pdcLineField(type, index, "chequeNo", row.chequeNo)}</td>
                <td>${pdcLineField(type, index, "chequeDate", toDateInputValue(row.chequeDate), "date")}</td>
                <td>${pdcLineField(type, index, "amount", moneyValue(row.amount), "number")}</td>
                <td>${pdcLineField(type, index, "entryDate", toDateInputValue(row.entryDate), "date")}</td>
                <td>${pdcLineField(type, index, "partyName", row.partyName)}</td>
                <td><button class="line-delete" data-action="delete-pdc-line-${type}" data-index="${index}" title="Remove row">x</button></td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>
    ${bankTransactionTotalStrip(pdcFinancials(record, type))}
  `;
}

function pdcChequeBounceScreen() {
  const type = "bounce";
  const record = pdcDraft(type);
  return `
    ${pdcSplitHeader(type, record, "Date, Time", "Bank Name")}
    <div class="bank-transaction-table-panel">
      <div class="table-wrap bank-transaction-table-wrap">
        <table class="bank-transaction-table">
          <colgroup><col style="width:48px" /><col style="width:100px" /><col style="width:160px" /><col style="width:100px" /><col style="width:130px" /><col style="width:130px" /><col style="width:170px" /><col style="width:170px" /><col style="width:250px" /><col style="width:66px" /></colgroup>
          <thead><tr><th>Sl</th><th>Entry No</th><th>Cheque No</th><th>Type</th><th>Amount</th><th>Cheque Date</th><th>Service Charge [Bank]</th><th>Service Charge [Party]</th><th>Party Name</th><th></th></tr></thead>
          <tbody>
            <tr>
              <td></td>
              <td>${pdcEntryField(type, "entryNo", record.entry.entryNo)}</td>
              <td>${pdcEntryField(type, "chequeNo", record.entry.chequeNo)}</td>
              <td>${pdcSelectOnly(type, "type", ["PDC", "Normal"], record.entry.type, true)}</td>
              <td>${pdcEntryField(type, "amount", moneyValue(record.entry.amount), "number")}</td>
              <td>${pdcEntryField(type, "chequeDate", toDateInputValue(record.entry.chequeDate), "date")}</td>
              <td>${pdcEntryField(type, "serviceChargeBank", moneyValue(record.entry.serviceChargeBank), "number")}</td>
              <td>${pdcEntryField(type, "serviceChargeParty", moneyValue(record.entry.serviceChargeParty), "number")}</td>
              <td>${pdcEntryField(type, "partyName", record.entry.partyName)}</td>
              <td><button class="compact-action" data-action="add-pdc-line-${type}">Add</button></td>
            </tr>
            ${(record.lines || []).map((line, index) => {
              const row = normalizePdcBounceLine(line);
              return `<tr>
                <td>${index + 1}</td>
                <td>${pdcLineField(type, index, "entryNo", row.entryNo)}</td>
                <td>${pdcLineField(type, index, "chequeNo", row.chequeNo)}</td>
                <td><select class="grid-input" data-pdc-type="${type}" data-pdc-line="${index}" data-pdc-line-field="type">${["PDC", "Normal"].map((option) => `<option ${option === row.type ? "selected" : ""}>${option}</option>`).join("")}</select></td>
                <td>${pdcLineField(type, index, "amount", moneyValue(row.amount), "number")}</td>
                <td>${pdcLineField(type, index, "chequeDate", toDateInputValue(row.chequeDate), "date")}</td>
                <td>${pdcLineField(type, index, "serviceChargeBank", moneyValue(row.serviceChargeBank), "number")}</td>
                <td>${pdcLineField(type, index, "serviceChargeParty", moneyValue(row.serviceChargeParty), "number")}</td>
                <td>${pdcLineField(type, index, "partyName", row.partyName)}</td>
                <td><button class="line-delete" data-action="delete-pdc-line-${type}" data-index="${index}" title="Remove row">x</button></td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>
    ${bankTransactionTotalStrip(pdcFinancials(record, type))}
  `;
}

function pdcSplitHeader(type, record, dateLabel, bankLabel) {
  return `
    <div class="transaction-entry-header bank-transaction-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Ref No</span><span class="field-pair">${pdcField(type, "entryNo", record.entryNo)}${pdcField(type, "refNo", record.refNo)}</span></label>
        <label class="classic-field split-field"><span>${dateLabel}</span><span class="field-pair">${pdcField(type, "date", toDateInputValue(record.date), "date")}${pdcField(type, "time", record.time)}</span></label>
      </div>
      <div class="classic-fields right">
        ${pdcSelect(type, type === "bounce" ? "bankName" : "bankAccount", bankLabel, bankAccountOptions(), type === "bounce" ? record.bankName : record.bankAccount)}
        ${pdcSelect(type, "preparedBy", "Prepared By", bankStaffOptions(), record.preparedBy)}
      </div>
    </div>
  `;
}

function pdcChequeRepresentScreen() {
  const type = "request";
  const record = pdcDraft(type);
  const bounced = pdcBounceOptions();
  const options = [`<option value="">Select bounced cheque</option>`, ...bounced.map((option) => `<option value="${pdcAttr(option.id)}" ${option.id === record.bouncedChequeId ? "selected" : ""}>${pdcAttr(`${option.line.chequeNo || "Cheque"} - ${option.line.partyName || "Party"} - ${moneyValue(option.line.amount)}`)}</option>`)].join("");
  return `
    <div class="transaction-entry-header pdc-request-header pdc-represent-header">
      <div class="classic-fields left pdc-represent-panel">
        <label class="classic-field split-field"><span>Entry No, Ref No</span><span class="field-pair">${pdcField(type, "entryNo", record.entryNo)}${pdcField(type, "refNo", record.refNo)}</span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair">${pdcField(type, "date", toDateInputValue(record.date), "date")}${pdcField(type, "time", record.time)}</span></label>
        <label class="classic-field split-field"><span>Prepared By</span><span class="field-pair">${pdcField(type, "preparedByCode", record.preparedByCode || pdcStaffCode(record.preparedBy))}${pdcSelectOnly(type, "preparedBy", bankStaffOptions(), record.preparedBy)}</span></label>
        <label class="classic-field"><span>Bounced Cheques</span><select data-pdc-type="${type}" data-pdc-field="bouncedChequeId">${options}</select></label>
        ${pdcSelect(type, "bankAccount", "Bank Account", bankAccountOptions(), record.bankAccount)}
        ${pdcSelect(type, "reasonForRepresent", "Reason for Represent", ["As Per Party Request", "Bank Advice", "Wrong Date", "Insufficient Funds Cleared"], record.reasonForRepresent)}
        <label class="classic-field textarea-field"><span>Remark</span><textarea data-pdc-type="${type}" data-pdc-field="remark">${pdcAttr(record.remark)}</textarea></label>
      </div>
      <div class="classic-fields right pdc-represent-panel">
        <label class="classic-field"><span>Entry No</span>${pdcField(type, "requestEntryNo", record.requestEntryNo, "text", true)}</label>
        <label class="classic-field"><span>Entry Date</span>${pdcField(type, "requestEntryDate", toDateInputValue(record.requestEntryDate), "date", true)}</label>
        <label class="classic-field"><span>Cheque Date</span>${pdcField(type, "chequeDate", toDateInputValue(record.chequeDate), "date", true)}</label>
        <label class="classic-field"><span>Cheque Amount</span>${pdcField(type, "chequeAmount", moneyValue(record.chequeAmount), "number", true)}</label>
        <label class="classic-field"><span>Party</span>${pdcField(type, "party", record.party, "text", true)}</label>
        <label class="classic-field"><span>Reason</span>${pdcField(type, "reason", record.reason, "text", true)}</label>
      </div>
    </div>
  `;
}

function defaultJournalVoucherLine() {
  return {
    id: crypto.randomUUID(),
    accountId: "",
    accountHead: "",
    debit: 0,
    credit: 0,
    remark: ""
  };
}

function normalizeJournalVoucherLine(line = {}) {
  return {
    id: line.id || crypto.randomUUID(),
    accountId: line.accountId || line.headId || "",
    accountHead: line.accountHead || line.head || line.ledger || "",
    debit: Number(line.debit || 0),
    credit: Number(line.credit || 0),
    remark: line.remark || line.remarks || ""
  };
}

function journalVoucherFinancials(record = {}) {
  const lines = (record.lines || []).map(normalizeJournalVoucherLine);
  const totalDebit = sumBy(lines, "debit");
  const totalCredit = sumBy(lines, "credit");
  return {
    totalDebit,
    totalCredit,
    difference: totalDebit - totalCredit
  };
}

function defaultJournalVoucher() {
  const today = toDateInputValue(new Date());
  return normalizeJournalVoucher({
    id: crypto.randomUUID(),
    voucherNo: "",
    refNo: "",
    date: today,
    time: nowTimeWithSeconds(),
    costCenter: bankCostCenters()[0] || "cost1",
    preparedBy: bankStaffOptions()[0] || "",
    entry: defaultJournalVoucherLine(),
    lines: [],
    rateFixed: false,
    ignoreReverseAccount: false,
    narration: ""
  });
}

function normalizeJournalVoucher(record = {}) {
  const today = toDateInputValue(new Date());
  const clean = {
    id: record.id || crypto.randomUUID(),
    voucherNo: record.voucherNo || record.voucher || "",
    refNo: record.refNo || "",
    date: toDateInputValue(record.date || today),
    time: record.time || nowTimeWithSeconds(),
    costCenter: record.costCenter || bankCostCenters()[0] || "cost1",
    preparedBy: record.preparedBy || bankStaffOptions()[0] || "",
    entry: normalizeJournalVoucherLine(record.entry || defaultJournalVoucherLine()),
    lines: (record.lines || []).map(normalizeJournalVoucherLine),
    rateFixed: Boolean(record.rateFixed),
    ignoreReverseAccount: Boolean(record.ignoreReverseAccount),
    narration: record.narration || ""
  };
  return {
    ...clean,
    ...journalVoucherFinancials(clean)
  };
}

function journalVoucherDraftRecord() {
  if (!journalVoucherDraft) journalVoucherDraft = normalizeJournalVoucher(state.journalVouchers?.[0] || defaultJournalVoucher());
  return journalVoucherDraft;
}

function resolveJournalAccount(value) {
  return bankAccountHeadOptions().find((account) => account.name === value || account.id === value);
}

function journalVoucherScreen() {
  const record = journalVoucherDraftRecord();
  const financials = journalVoucherFinancials(record);
  return `
    <section class="clean-entry-shell bank-transaction-shell journal-voucher-shell">
      ${journalVoucherToolbar()}
      ${journalVoucherHeader(record)}
      <div class="bank-transaction-table-panel">
        ${journalVoucherEntryRow(record)}
        ${journalVoucherTable(record)}
      </div>
      ${journalVoucherTotalStrip(financials)}
      ${journalVoucherFooter(record)}
    </section>
  `;
}

function journalVoucherToolbar() {
  return `
    <div class="entry-actions body-toolbar bank-transaction-toolbar">
      ${toolbarButton("Save", "save-journal-voucher")}
      ${toolbarButton("Refresh", "refresh-journal-voucher")}
      ${toolbarButton("Edit", "edit-journal-voucher")}
      ${toolbarButton("Delete", "delete-journal-voucher")}
      ${toolbarButton("Print", "print-journal-voucher")}
      ${toolbarButton("Close", "close-account-action")}
      <span class="toolbar-spacer"></span>
      <label class="rate-inline"><span>Gold Rate</span><input value="${activeGoldRate()}" readonly /></label>
    </div>
  `;
}

function journalVoucherHeader(record) {
  return `
    <div class="transaction-entry-header bank-transaction-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Voucher No, Ref No</span><span class="field-pair">${journalField("voucherNo", record.voucherNo)}${journalField("refNo", record.refNo)}</span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair">${journalField("date", toDateInputValue(record.date), "date")}${journalField("time", record.time)}</span></label>
      </div>
      <div class="classic-fields right">
        ${journalSelect("costCenter", "Cost Center", bankCostCenters(), record.costCenter)}
        ${journalSelect("preparedBy", "Prepared By", bankStaffOptions(), record.preparedBy)}
      </div>
    </div>
  `;
}

function journalField(field, value = "", inputType = "text") {
  return `<input data-journal-field="${field}" type="${inputType}" value="${value ?? ""}" />`;
}

function journalSelect(field, label, options, selected) {
  const unique = [...new Set((options || []).filter(Boolean))];
  return `<label class="classic-field"><span>${label}</span><select data-journal-field="${field}">${unique.map((option) => `<option ${option === selected ? "selected" : ""}>${option}</option>`).join("")}</select></label>`;
}

function journalVoucherEntryRow(record) {
  const entry = normalizeJournalVoucherLine(record.entry || {});
  const heads = bankAccountHeadOptions();
  return `
    <datalist id="journal-account-options">${heads.map((account) => `<option value="${account.name}" data-id="${account.id}"></option>`).join("")}</datalist>
    <div class="bank-transaction-entry-wrap">
      <table class="bank-transaction-entry-grid">
        <colgroup>
          <col style="width: 140px" /><col style="width: 340px" /><col style="width: 150px" /><col style="width: 150px" /><col style="width: 260px" /><col style="width: 82px" />
        </colgroup>
        <thead><tr><th>ID</th><th>Account Head</th><th>Debit</th><th>Credit</th><th>Remark</th><th></th></tr></thead>
        <tbody>
          <tr>
            <td><input data-journal-entry-field="accountId" value="${entry.accountId}" /></td>
            <td><input list="journal-account-options" data-journal-entry-field="accountHead" value="${entry.accountHead}" /></td>
            <td><input class="numeric" data-journal-entry-field="debit" type="number" value="${moneyValue(entry.debit)}" /></td>
            <td><input class="numeric" data-journal-entry-field="credit" type="number" value="${moneyValue(entry.credit)}" /></td>
            <td><input data-journal-entry-field="remark" value="${entry.remark}" /></td>
            <td><button class="compact-action" data-action="add-journal-voucher-line">Add</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function journalVoucherTable(record) {
  const rows = (record.lines || []).map((line) => normalizeJournalVoucherLine(line));
  return `
    <div class="table-wrap bank-transaction-table-wrap">
      <table class="bank-transaction-table">
        <colgroup>
          <col style="width: 52px" /><col style="width: 44px" /><col style="width: 140px" /><col style="width: 340px" /><col style="width: 150px" /><col style="width: 150px" /><col style="width: 260px" />
        </colgroup>
        <thead><tr><th>Sl</th><th>X</th><th>ID</th><th>Account Head</th><th>Debit</th><th>Credit</th><th>Remark</th></tr></thead>
        <tbody>
          ${rows.map((line, index) => `
            <tr>
              <td>${index + 1}</td>
              <td><button class="line-delete" data-action="delete-journal-voucher-line" data-index="${index}" title="Remove row">x</button></td>
              <td><input data-journal-line="${index}" data-journal-line-field="accountId" value="${line.accountId}" /></td>
              <td><input list="journal-account-options" data-journal-line="${index}" data-journal-line-field="accountHead" value="${line.accountHead}" /></td>
              <td><input class="numeric" data-journal-line="${index}" data-journal-line-field="debit" type="number" value="${moneyValue(line.debit)}" /></td>
              <td><input class="numeric" data-journal-line="${index}" data-journal-line-field="credit" type="number" value="${moneyValue(line.credit)}" /></td>
              <td><input data-journal-line="${index}" data-journal-line-field="remark" value="${line.remark}" /></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function journalVoucherTotalStrip(financials) {
  return `<div class="bank-transaction-total-strip"><strong>Total Amount</strong><output>${moneyValue(financials.totalDebit)}</output><output>${moneyValue(financials.totalCredit)}</output></div>`;
}

function journalVoucherFooter(record) {
  return `
    <div class="bank-transaction-footer">
      <div class="bank-transaction-checks">
        <label><input type="checkbox" data-journal-field="rateFixed" ${record.rateFixed ? "checked" : ""} /> Rate Fixed</label>
        <label><input type="checkbox" data-journal-field="ignoreReverseAccount" ${record.ignoreReverseAccount ? "checked" : ""} /> Ignore Rev.Acc</label>
      </div>
      <label class="bank-transaction-narration"><span>Narration</span><textarea data-journal-field="narration">${record.narration || ""}</textarea></label>
    </div>
  `;
}

function cashVoucherStorageKey(type) {
  return type === "payment" ? "cashPayments" : "cashReceipts";
}

function cashVoucherTitle(type) {
  return type === "payment" ? "Cash Payment (Normal)" : "Cash Receipt (Normal)";
}

function cashVoucherView(type) {
  return type === "payment" ? "Cash Payment" : "Cash Receipt";
}

function defaultCashVoucherLine(type = "receipt") {
  return {
    id: crypto.randomUUID(),
    headId: "",
    accountHead: "",
    amount: 0,
    discount: type === "receipt" ? 0 : 0,
    remarks: "",
    voucherNo: "",
    voucherDate: toDateInputValue(new Date())
  };
}

function normalizeCashVoucherLine(line = {}, type = "receipt") {
  return {
    id: line.id || crypto.randomUUID(),
    headId: line.headId || "",
    accountHead: line.accountHead || "",
    amount: Number(line.amount || 0),
    discount: type === "receipt" ? Number(line.discount || 0) : 0,
    remarks: line.remarks || "",
    voucherNo: line.voucherNo || "",
    voucherDate: toDateInputValue(line.voucherDate || new Date())
  };
}

function defaultCashVoucher(type = "receipt") {
  const today = toDateInputValue(new Date());
  const staff = bankStaffOptions()[0] || "";
  return normalizeCashVoucher({
    id: crypto.randomUUID(),
    type,
    voucherNo: "",
    refNo: "",
    date: today,
    time: nowTimeWithSeconds(),
    preparedBy: staff,
    costCenter: bankCostCenters()[0] || "cost1",
    cashAccount: "Cash in Hand",
    handledBy: staff,
    openingBalance: 0,
    entry: defaultCashVoucherLine(type),
    lines: [],
    showAllAccount: true,
    enableCashAccount: false,
    noPrint: false,
    rateFixed: false,
    narration: ""
  }, type);
}

function normalizeCashVoucher(record = {}, type = "receipt") {
  const today = toDateInputValue(new Date());
  const staff = bankStaffOptions()[0] || "";
  const lines = (record.lines || []).map((line) => normalizeCashVoucherLine(line, type));
  const clean = {
    id: record.id || crypto.randomUUID(),
    type: record.type || type,
    voucherNo: record.voucherNo || "",
    refNo: record.refNo || "",
    date: toDateInputValue(record.date || today),
    time: record.time || nowTimeWithSeconds(),
    preparedBy: record.preparedBy || staff,
    costCenter: record.costCenter || bankCostCenters()[0] || "cost1",
    cashAccount: record.cashAccount || "Cash in Hand",
    handledBy: record.handledBy || staff,
    openingBalance: Number(record.openingBalance || 0),
    entry: normalizeCashVoucherLine(record.entry || defaultCashVoucherLine(type), type),
    lines,
    showAllAccount: record.showAllAccount !== undefined ? Boolean(record.showAllAccount) : true,
    enableCashAccount: Boolean(record.enableCashAccount),
    noPrint: Boolean(record.noPrint),
    rateFixed: Boolean(record.rateFixed),
    narration: record.narration || ""
  };
  return { ...clean, ...cashVoucherFinancials(clean, type) };
}

function cashVoucherFinancials(record = {}, type = "receipt") {
  const lines = (record.lines || []).map((line) => normalizeCashVoucherLine(line, type));
  const grossAmount = sumBy(lines, "amount");
  const discountAmount = type === "receipt" ? sumBy(lines, "discount") : 0;
  const totalAmount = Math.max(0, grossAmount - discountAmount);
  const openingBalance = Number(record.openingBalance || 0);
  const closingBalance = type === "payment" ? openingBalance - totalAmount : openingBalance + totalAmount;
  return { grossAmount, discountAmount, totalAmount, openingBalance, closingBalance };
}

function cashVoucherDraft(type) {
  if (!cashVoucherDrafts[type]) {
    cashVoucherDrafts[type] = normalizeCashVoucher(state[cashVoucherStorageKey(type)]?.[0] || defaultCashVoucher(type), type);
  }
  return cashVoucherDrafts[type];
}

function cashVoucherScreen(type) {
  const record = cashVoucherDraft(type);
  const financials = cashVoucherFinancials(record, type);
  return `
    <section class="clean-entry-shell bank-transaction-shell cash-voucher-shell" data-cash-voucher-type="${type}">
      ${cashVoucherToolbar(type)}
      ${cashVoucherHeader(type, record)}
      <div class="bank-transaction-table-panel">
        ${cashVoucherEntryRow(type, record)}
        ${cashVoucherTable(type, record)}
      </div>
      ${cashVoucherTotalStrip(type, financials)}
      ${cashVoucherFooter(type, record)}
    </section>
  `;
}

function cashVoucherToolbar(type) {
  return `
    <div class="entry-actions body-toolbar bank-transaction-toolbar">
      ${toolbarButton("Save", `save-cash-voucher-${type}`)}
      ${toolbarButton("Refresh", `refresh-cash-voucher-${type}`)}
      ${toolbarButton("Edit", `edit-cash-voucher-${type}`)}
      ${toolbarButton("Delete", `delete-cash-voucher-${type}`)}
      ${toolbarButton("Print", `print-cash-voucher-${type}`)}
      ${toolbarButton("Close", "close-account-action")}
      <span class="toolbar-spacer"></span>
      <label class="rate-inline"><span>Gold Rate</span><input value="${activeGoldRate()}" readonly /></label>
    </div>
  `;
}

function cashVoucherHeader(type, record) {
  const handledLabel = type === "payment" ? "Paid By" : "Received By";
  return `
    <div class="transaction-entry-header bank-transaction-header cash-voucher-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Voucher No, Ref No</span><span class="field-pair">${cashVoucherField(type, "voucherNo", record.voucherNo)}${cashVoucherField(type, "refNo", record.refNo)}</span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair">${cashVoucherField(type, "date", toDateInputValue(record.date), "date")}${cashVoucherField(type, "time", record.time)}</span></label>
        ${cashVoucherSelect(type, "preparedBy", "Prepared By", bankStaffOptions(), record.preparedBy)}
      </div>
      <div class="classic-fields right">
        ${cashVoucherSelect(type, "costCenter", "Cost Center", bankCostCenters(), record.costCenter)}
        ${cashVoucherSelect(type, "cashAccount", "Cash Account", ["Cash in Hand", "Scheme Cash"], record.cashAccount, !record.enableCashAccount)}
        ${cashVoucherSelect(type, "handledBy", handledLabel, bankStaffOptions(), record.handledBy)}
      </div>
    </div>
  `;
}

function cashVoucherField(type, field, value = "", inputType = "text") {
  return `<input data-cash-voucher-type="${type}" data-cash-voucher-field="${field}" type="${inputType}" value="${value ?? ""}" />`;
}

function cashVoucherSelect(type, field, label, options, selected, disabled = false) {
  return `<label class="classic-field"><span>${label}</span>${cashVoucherSelectOnly(type, field, options, selected, disabled)}</label>`;
}

function cashVoucherSelectOnly(type, field, options, selected, disabled = false) {
  const unique = [...new Set((options || []).filter(Boolean))];
  return `<select data-cash-voucher-type="${type}" data-cash-voucher-field="${field}" ${disabled ? "disabled" : ""}>${unique.map((option) => `<option ${option === selected ? "selected" : ""}>${option}</option>`).join("")}</select>`;
}

function cashVoucherEntryRow(type, record) {
  const entry = normalizeCashVoucherLine(record.entry || {}, type);
  const heads = bankAccountHeadOptions();
  const listId = `cash-voucher-head-options-${type}`;
  const discountHead = type === "receipt" ? `<th>Discount</th>` : "";
  const discountCell = type === "receipt" ? `<td><input class="numeric" data-cash-voucher-type="${type}" data-cash-voucher-entry-field="discount" type="number" value="${moneyValue(entry.discount)}" /></td>` : "";
  return `
    <datalist id="${listId}">${heads.map((account) => `<option value="${account.name}" data-id="${account.id}"></option>`).join("")}</datalist>
    <div class="bank-transaction-entry-wrap">
      <table class="bank-transaction-entry-grid cash-voucher-entry-grid ${type}">
        <colgroup>
          <col style="width: 130px" /><col style="width: 330px" /><col style="width: 140px" />${type === "receipt" ? '<col style="width: 120px" />' : ""}<col style="width: 220px" /><col style="width: 130px" /><col style="width: 140px" /><col style="width: 82px" />
        </colgroup>
        <thead><tr><th>Head ID</th><th>Account Head</th><th>Amount</th>${discountHead}<th>Remarks</th><th>Voucher No</th><th>Voucher Date</th><th></th></tr></thead>
        <tbody>
          <tr>
            <td><input data-cash-voucher-type="${type}" data-cash-voucher-entry-field="headId" value="${entry.headId}" /></td>
            <td><input list="${listId}" data-cash-voucher-type="${type}" data-cash-voucher-entry-field="accountHead" value="${entry.accountHead}" /></td>
            <td><input class="numeric" data-cash-voucher-type="${type}" data-cash-voucher-entry-field="amount" type="number" value="${moneyValue(entry.amount)}" /></td>
            ${discountCell}
            <td><input data-cash-voucher-type="${type}" data-cash-voucher-entry-field="remarks" value="${entry.remarks}" /></td>
            <td><input data-cash-voucher-type="${type}" data-cash-voucher-entry-field="voucherNo" value="${entry.voucherNo}" /></td>
            <td><input data-cash-voucher-type="${type}" data-cash-voucher-entry-field="voucherDate" type="date" value="${toDateInputValue(entry.voucherDate)}" /></td>
            <td><button class="compact-action" data-action="add-cash-voucher-line-${type}">Add</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function cashVoucherTable(type, record) {
  const rows = (record.lines || []).map((line) => normalizeCashVoucherLine(line, type));
  const discountHead = type === "receipt" ? "<th>Discount</th>" : "";
  return `
    <div class="table-wrap bank-transaction-table-wrap">
      <table class="bank-transaction-table cash-voucher-table ${type}">
        <colgroup>
          <col style="width: 52px" /><col style="width: 44px" /><col style="width: 130px" /><col style="width: 330px" /><col style="width: 140px" />${type === "receipt" ? '<col style="width: 120px" />' : ""}<col style="width: 220px" /><col style="width: 130px" /><col style="width: 140px" />
        </colgroup>
        <thead><tr><th>Sl#</th><th></th><th>Head ID</th><th>Account Head</th><th>Amount</th>${discountHead}<th>Remarks</th><th>Voucher No</th><th>Voucher Date</th></tr></thead>
        <tbody>
          ${rows.map((line, index) => `
            <tr>
              <td>${index + 1}</td>
              <td><button class="line-delete" data-action="delete-cash-voucher-line-${type}" data-index="${index}" title="Remove row">x</button></td>
              <td><input data-cash-voucher-type="${type}" data-cash-voucher-line="${index}" data-cash-voucher-line-field="headId" value="${line.headId}" /></td>
              <td><input data-cash-voucher-type="${type}" data-cash-voucher-line="${index}" data-cash-voucher-line-field="accountHead" value="${line.accountHead}" /></td>
              <td><input class="numeric" data-cash-voucher-type="${type}" data-cash-voucher-line="${index}" data-cash-voucher-line-field="amount" type="number" value="${moneyValue(line.amount)}" /></td>
              ${type === "receipt" ? `<td><input class="numeric" data-cash-voucher-type="${type}" data-cash-voucher-line="${index}" data-cash-voucher-line-field="discount" type="number" value="${moneyValue(line.discount)}" /></td>` : ""}
              <td><input data-cash-voucher-type="${type}" data-cash-voucher-line="${index}" data-cash-voucher-line-field="remarks" value="${line.remarks}" /></td>
              <td><input data-cash-voucher-type="${type}" data-cash-voucher-line="${index}" data-cash-voucher-line-field="voucherNo" value="${line.voucherNo}" /></td>
              <td><input data-cash-voucher-type="${type}" data-cash-voucher-line="${index}" data-cash-voucher-line-field="voucherDate" type="date" value="${toDateInputValue(line.voucherDate)}" /></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function cashVoucherTotalStrip(type, financials) {
  if (type === "payment") {
    return `<div class="bank-transaction-total-strip cash-voucher-total-strip payment"><strong>Total Amount</strong><output>${moneyValue(financials.totalAmount)}</output><span>-</span></div>`;
  }
  return `
    <div class="bank-transaction-total-strip cash-voucher-total-strip receipt">
      <strong>Total Amount</strong><output>${moneyValue(financials.totalAmount)}</output>
      <span>Opening</span><output class="cash-voucher-numeric-danger">${moneyValue(financials.openingBalance)}</output>
      <span>Closing</span><output class="cash-voucher-numeric-danger">${moneyValue(financials.closingBalance)}</output>
    </div>
  `;
}

function cashVoucherFooter(type, record) {
  return `
    <div class="bank-transaction-footer cash-voucher-footer">
      <div class="bank-transaction-checks">
        <label><input type="checkbox" data-cash-voucher-type="${type}" data-cash-voucher-field="showAllAccount" ${record.showAllAccount ? "checked" : ""} /> Show All Account</label>
        <label><input type="checkbox" data-cash-voucher-type="${type}" data-cash-voucher-field="noPrint" ${record.noPrint ? "checked" : ""} /> <strong>No Print</strong></label>
        <label><input type="checkbox" data-cash-voucher-type="${type}" data-cash-voucher-field="enableCashAccount" ${record.enableCashAccount ? "checked" : ""} /> Enable Cash A/c</label>
        <label><input type="checkbox" data-cash-voucher-type="${type}" data-cash-voucher-field="rateFixed" ${record.rateFixed ? "checked" : ""} /> Rate Fixed</label>
      </div>
      <label class="bank-transaction-narration"><span>Narration</span><textarea data-cash-voucher-type="${type}" data-cash-voucher-field="narration">${record.narration || ""}</textarea></label>
    </div>
  `;
}

function defaultDirectEntryLine() {
  return {
    id: crypto.randomUUID(),
    date: toDateInputValue(new Date()),
    accountHead: "",
    receipt: 0,
    payment: 0,
    remark: ""
  };
}

function normalizeDirectEntryLine(line = {}) {
  return {
    id: line.id || crypto.randomUUID(),
    date: toDateInputValue(line.date || new Date()),
    accountHead: line.accountHead || "",
    receipt: Number(line.receipt || 0),
    payment: Number(line.payment || 0),
    remark: line.remark || ""
  };
}

function defaultDirectEntry() {
  const today = toDateInputValue(new Date());
  return normalizeDirectEntry({
    id: crypto.randomUUID(),
    entryNo: `DE${String((state?.directEntries || []).length + 1).padStart(5, "0")}`,
    mode: "Cash",
    costCenter: bankCostCenters()[0] || "cost1",
    cashBank: "Cash in Hand",
    preparedBy: bankStaffOptions()[0] || "",
    repeatLastHead: false,
    repeatLastNarration: false,
    entry: { ...defaultDirectEntryLine(), date: today },
    lines: []
  });
}

function normalizeDirectEntry(record = {}) {
  const lines = (record.lines || []).map(normalizeDirectEntryLine);
  const clean = {
    id: record.id || crypto.randomUUID(),
    entryNo: record.entryNo || "",
    mode: record.mode || "Cash",
    costCenter: record.costCenter || bankCostCenters()[0] || "cost1",
    cashBank: record.cashBank || "Cash in Hand",
    preparedBy: record.preparedBy || bankStaffOptions()[0] || "",
    repeatLastHead: Boolean(record.repeatLastHead),
    repeatLastNarration: Boolean(record.repeatLastNarration),
    entry: normalizeDirectEntryLine(record.entry || defaultDirectEntryLine()),
    lines
  };
  return { ...clean, ...directEntryFinancials(clean) };
}

function directEntryFinancials(record = {}) {
  const lines = (record.lines || []).map(normalizeDirectEntryLine);
  const totalReceipt = sumField(lines, "receipt");
  const totalPayment = sumField(lines, "payment");
  return {
    totalReceipt,
    totalPayment,
    balance: totalReceipt - totalPayment
  };
}

function directEntryRecord() {
  directEntryDraft = normalizeDirectEntry(directEntryDraft || state.directEntries?.[0] || defaultDirectEntry());
  return directEntryDraft;
}

function directEntryScreen() {
  const record = directEntryRecord();
  const financials = directEntryFinancials(record);
  return `
    <section class="clean-entry-shell account-entry-shell direct-entry-shell">
      <div class="entry-actions body-toolbar account-entry-toolbar">
        ${toolbarButton("Save F9", "save-direct-entry")}
        ${toolbarButton("Refresh", "refresh-direct-entry")}
        ${toolbarButton("Close", "close-account-action")}
      </div>
      ${directEntryHeader(record)}
      <div class="account-entry-table-panel">
        ${directEntryEntryRow(record)}
        ${directEntryTable(record)}
      </div>
      <div class="account-entry-total-strip three">
        <span>Receipt Total</span><output>${moneyValue(financials.totalReceipt)}</output>
        <span>Payment Total</span><output>${moneyValue(financials.totalPayment)}</output>
        <strong>Balance</strong><output>${moneyValue(financials.balance)}</output>
      </div>
    </section>
  `;
}

function directEntryHeader(record) {
  const bankAccounts = ["Cash in Hand", ...bankAccountOptions(), "Scheme Cash"];
  return `
    <div class="account-entry-header direct-entry-header">
      <div class="direct-entry-mode">
        ${["Cash", "Bank", "Cash & Bank"].map((mode) => `<label><input type="radio" name="direct-entry-mode" data-direct-entry-field="mode" value="${mode}" ${record.mode === mode ? "checked" : ""} /> ${mode}</label>`).join("")}
      </div>
      <div class="classic-fields">
        ${directSelect("costCenter", "Cost Center", bankCostCenters(), record.costCenter)}
        ${directSelect("cashBank", "Cash/Bank", bankAccounts, record.cashBank)}
      </div>
      <div class="classic-fields">
        ${directSelect("preparedBy", "Prepared By", bankStaffOptions(), record.preparedBy)}
        <label class="plain-check"><input type="checkbox" data-direct-entry-field="repeatLastHead" ${record.repeatLastHead ? "checked" : ""} /> Repeat Last Head</label>
        <label class="plain-check"><input type="checkbox" data-direct-entry-field="repeatLastNarration" ${record.repeatLastNarration ? "checked" : ""} /> Repeat Last Narration</label>
      </div>
    </div>
  `;
}

function directEntryEntryRow(record) {
  const entry = normalizeDirectEntryLine(record.entry || {});
  const listId = "direct-entry-account-heads";
  const heads = bankAccountHeadOptions();
  return `
    <datalist id="${listId}">${heads.map((account) => `<option value="${account.name}"></option>`).join("")}</datalist>
    <div class="account-entry-entry-wrap">
      <table class="account-entry-grid direct-entry-grid">
        <colgroup>
          <col style="width: 150px" /><col style="width: 340px" /><col style="width: 120px" /><col style="width: 120px" /><col style="width: 360px" /><col style="width: 86px" />
        </colgroup>
        <thead><tr><th>Date</th><th>Account Head</th><th>Receipt</th><th>Payment</th><th>Remark</th><th></th></tr></thead>
        <tbody><tr>
          <td><input type="date" data-direct-entry-entry-field="date" value="${entry.date}" /></td>
          <td><input list="${listId}" data-direct-entry-entry-field="accountHead" value="${entry.accountHead}" /></td>
          <td><input class="numeric" type="number" data-direct-entry-entry-field="receipt" value="${moneyValue(entry.receipt)}" /></td>
          <td><input class="numeric" type="number" data-direct-entry-entry-field="payment" value="${moneyValue(entry.payment)}" /></td>
          <td><input data-direct-entry-entry-field="remark" value="${entry.remark}" /></td>
          <td><button class="compact-action" data-action="add-direct-entry-line">Add</button></td>
        </tr></tbody>
      </table>
    </div>
  `;
}

function directEntryTable(record) {
  const rows = (record.lines || []).map(normalizeDirectEntryLine);
  return `
    <div class="table-wrap account-entry-table-wrap">
      <table class="account-entry-table direct-entry-table">
        <colgroup>
          <col style="width: 52px" /><col style="width: 44px" /><col style="width: 150px" /><col style="width: 340px" /><col style="width: 120px" /><col style="width: 120px" /><col style="width: 360px" />
        </colgroup>
        <thead><tr><th>SL</th><th>X</th><th>Date</th><th>Account Head</th><th>Receipt</th><th>Payment</th><th>Remark</th></tr></thead>
        <tbody>
          ${rows.map((line, index) => `
            <tr>
              <td>${index + 1}</td>
              <td><button class="line-delete" data-action="delete-direct-entry-line" data-index="${index}" title="Remove row">x</button></td>
              <td><input type="date" data-direct-entry-line="${index}" data-direct-entry-line-field="date" value="${line.date}" /></td>
              <td><input data-direct-entry-line="${index}" data-direct-entry-line-field="accountHead" value="${line.accountHead}" /></td>
              <td><input class="numeric" type="number" data-direct-entry-line="${index}" data-direct-entry-line-field="receipt" value="${moneyValue(line.receipt)}" /></td>
              <td><input class="numeric" type="number" data-direct-entry-line="${index}" data-direct-entry-line-field="payment" value="${moneyValue(line.payment)}" /></td>
              <td><input data-direct-entry-line="${index}" data-direct-entry-line-field="remark" value="${line.remark}" /></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function directSelect(field, label, options, selected) {
  const unique = [...new Set((options || []).filter(Boolean))];
  return `<label class="classic-field"><span>${label}</span><select data-direct-entry-field="${field}">${unique.map((option) => `<option ${option === selected ? "selected" : ""}>${option}</option>`).join("")}</select></label>`;
}

function expenseSupplierOptions() {
  return [...new Set([
    ...(state?.parties || []).filter((party) => party.type === "Supplier").map((party) => party.name).filter(Boolean),
    "AJAYA KUMAR",
    "NALUKANDATHIL JEWELLERS"
  ])];
}

function defaultExpenseEntryLine() {
  return {
    id: crypto.randomUUID(),
    ledgerHead: "",
    billNo: "",
    billDate: toDateInputValue(new Date()),
    hsnCode: "",
    taxable: 0,
    gst: 0,
    tdsPercent: 0,
    tds: 0,
    total: 0,
    remarks: ""
  };
}

function normalizeExpenseEntryLine(line = {}) {
  const taxable = Number(line.taxable || 0);
  const gst = Number(line.gst || 0);
  const tdsPercent = Number(line.tdsPercent || 0);
  const tds = Number(line.tds || (taxable * tdsPercent / 100) || 0);
  return {
    id: line.id || crypto.randomUUID(),
    ledgerHead: line.ledgerHead || "",
    billNo: line.billNo || "",
    billDate: toDateInputValue(line.billDate || new Date()),
    hsnCode: line.hsnCode || "",
    taxable,
    gst,
    tdsPercent,
    tds,
    total: Number(line.total || (taxable + gst - tds) || 0),
    remarks: line.remarks || ""
  };
}

function defaultExpenseEntry() {
  const today = toDateInputValue(new Date());
  return normalizeExpenseEntry({
    id: crypto.randomUUID(),
    entryNo: `EX${String((state?.expenseEntries || []).length + 1).padStart(5, "0")}`,
    refNo: "",
    date: today,
    time: nowTimeWithSeconds(),
    costCenter: bankCostCenters()[0] || "cost1",
    cashAccount: "Cash in Hand",
    remarks: "",
    supplier: "",
    gstin: "",
    preparedBy: bankStaffOptions()[0] || "",
    supplierType: "Local",
    paymentMode: "Cash",
    entry: defaultExpenseEntryLine(),
    lines: []
  });
}

function normalizeExpenseEntry(record = {}) {
  const lines = (record.lines || []).map(normalizeExpenseEntryLine);
  const clean = {
    id: record.id || crypto.randomUUID(),
    entryNo: record.entryNo || "",
    refNo: record.refNo || "",
    date: toDateInputValue(record.date || new Date()),
    time: record.time || nowTimeWithSeconds(),
    costCenter: record.costCenter || bankCostCenters()[0] || "cost1",
    cashAccount: record.cashAccount || "Cash in Hand",
    remarks: record.remarks || "",
    supplier: record.supplier || "",
    gstin: record.gstin || "",
    preparedBy: record.preparedBy || bankStaffOptions()[0] || "",
    supplierType: record.supplierType || "Local",
    paymentMode: record.paymentMode || "Cash",
    entry: normalizeExpenseEntryLine(record.entry || defaultExpenseEntryLine()),
    lines
  };
  return { ...clean, ...expenseEntryFinancials(clean) };
}

function expenseEntryFinancials(record = {}) {
  const lines = (record.lines || []).map(normalizeExpenseEntryLine);
  const billAmount = sumField(lines, "taxable");
  const gstAmount = sumField(lines, "gst");
  const tdsAmount = sumField(lines, "tds");
  const invoiceTotal = sumField(lines, "total");
  return { billAmount, gstAmount, tdsAmount, invoiceTotal };
}

function expenseEntryRecord() {
  expenseEntryDraft = normalizeExpenseEntry(expenseEntryDraft || state.expenseEntries?.[0] || defaultExpenseEntry());
  return expenseEntryDraft;
}

function expenseEntryScreen() {
  const record = expenseEntryRecord();
  const financials = expenseEntryFinancials(record);
  return `
    <section class="clean-entry-shell account-entry-shell expense-entry-shell">
      <div class="entry-actions body-toolbar account-entry-toolbar">
        ${toolbarButton("Refresh", "refresh-expense-entry")}
        ${toolbarButton("Save F9", "save-expense-entry")}
        ${toolbarButton("Edit", "edit-expense-entry")}
        ${toolbarButton("Delete", "delete-expense-entry")}
        ${toolbarButton("Close", "close-account-action")}
      </div>
      ${expenseEntryHeader(record)}
      <div class="account-entry-table-panel">
        ${expenseEntryEntryRow(record)}
        ${expenseEntryTable(record)}
      </div>
      <div class="expense-entry-summary">
        <span>Bill Amount</span><output>${moneyValue(financials.billAmount)}</output>
        <span>GST</span><output>${moneyValue(financials.gstAmount)}</output>
        <span>TDS</span><output>${moneyValue(financials.tdsAmount)}</output>
        <strong>Invoice Total</strong><output>${moneyValue(financials.invoiceTotal)}</output>
      </div>
    </section>
  `;
}

function expenseEntryHeader(record) {
  return `
    <div class="account-entry-header expense-entry-header">
      <fieldset>
        <legend>Entry Details</legend>
        <label class="classic-field split-field"><span>Entry No, Ref No</span><span class="field-pair"><input data-expense-entry-field="entryNo" value="${record.entryNo}" /><input data-expense-entry-field="refNo" value="${record.refNo}" /></span></label>
        <label class="classic-field split-field"><span>Entry Date, Time</span><span class="field-pair"><input type="date" data-expense-entry-field="date" value="${record.date}" /><input data-expense-entry-field="time" value="${record.time}" /></span></label>
        ${expenseSelect("costCenter", "Cost Center", bankCostCenters(), record.costCenter)}
        ${expenseSelect("cashAccount", "Cash Account", ["Cash in Hand", ...bankAccountOptions()], record.cashAccount)}
      </fieldset>
      <fieldset>
        <legend>Remarks</legend>
        <textarea data-expense-entry-field="remarks">${record.remarks || ""}</textarea>
      </fieldset>
      <fieldset>
        <legend>Supplier Details</legend>
        ${expenseInputWithList("supplier", "Supplier", expenseSupplierOptions(), record.supplier)}
        <label class="classic-field"><span>GSTIN</span><input data-expense-entry-field="gstin" value="${record.gstin}" /></label>
        ${expenseSelect("preparedBy", "Prepared By", bankStaffOptions(), record.preparedBy)}
        <div class="expense-type-row">
          ${expenseSelect("supplierType", "Type", ["Local", "Interstate", "Unregistered"], record.supplierType)}
          ${["Cash", "Credit"].map((mode) => `<label><input type="radio" name="expense-payment-mode" data-expense-entry-field="paymentMode" value="${mode}" ${record.paymentMode === mode ? "checked" : ""} /> ${mode}</label>`).join("")}
        </div>
      </fieldset>
    </div>
  `;
}

function expenseEntryEntryRow(record) {
  const entry = normalizeExpenseEntryLine(record.entry || {});
  const listId = "expense-ledger-heads";
  const heads = bankAccountHeadOptions();
  return `
    <datalist id="${listId}">${heads.map((account) => `<option value="${account.name}"></option>`).join("")}</datalist>
    <div class="account-entry-entry-wrap">
      <table class="account-entry-grid expense-entry-grid">
        <colgroup>
          <col style="width: 300px" /><col style="width: 110px" /><col style="width: 120px" /><col style="width: 120px" /><col style="width: 100px" /><col style="width: 90px" /><col style="width: 90px" /><col style="width: 90px" /><col style="width: 110px" /><col style="width: 260px" /><col style="width: 86px" />
        </colgroup>
        <thead><tr><th>Ledger Head</th><th>Bill No</th><th>Bill Date</th><th>HSN Code</th><th>Taxable</th><th>GST</th><th>TDS%</th><th>TDS</th><th>Total</th><th>Remarks</th><th></th></tr></thead>
        <tbody><tr>
          <td><input list="${listId}" data-expense-entry-entry-field="ledgerHead" value="${entry.ledgerHead}" /></td>
          <td><input data-expense-entry-entry-field="billNo" value="${entry.billNo}" /></td>
          <td><input type="date" data-expense-entry-entry-field="billDate" value="${entry.billDate}" /></td>
          <td><input data-expense-entry-entry-field="hsnCode" value="${entry.hsnCode}" /></td>
          <td><input class="numeric" type="number" data-expense-entry-entry-field="taxable" value="${moneyValue(entry.taxable)}" /></td>
          <td><input class="numeric" type="number" data-expense-entry-entry-field="gst" value="${moneyValue(entry.gst)}" /></td>
          <td><input class="numeric" type="number" data-expense-entry-entry-field="tdsPercent" value="${moneyValue(entry.tdsPercent)}" /></td>
          <td><input class="numeric" type="number" data-expense-entry-entry-field="tds" value="${moneyValue(entry.tds)}" /></td>
          <td><input class="numeric auto-field" value="${moneyValue(entry.total)}" readonly /></td>
          <td><input data-expense-entry-entry-field="remarks" value="${entry.remarks}" /></td>
          <td><button class="compact-action" data-action="add-expense-entry-line">Add</button></td>
        </tr></tbody>
      </table>
    </div>
  `;
}

function expenseEntryTable(record) {
  const rows = (record.lines || []).map(normalizeExpenseEntryLine);
  return `
    <div class="table-wrap account-entry-table-wrap">
      <table class="account-entry-table expense-entry-table">
        <colgroup>
          <col style="width: 52px" /><col style="width: 44px" /><col style="width: 300px" /><col style="width: 110px" /><col style="width: 120px" /><col style="width: 120px" /><col style="width: 100px" /><col style="width: 90px" /><col style="width: 90px" /><col style="width: 90px" /><col style="width: 110px" /><col style="width: 260px" />
        </colgroup>
        <thead><tr><th>SL</th><th>X</th><th>Ledger Head</th><th>Bill No</th><th>Bill Date</th><th>HSN Code</th><th>Taxable</th><th>GST</th><th>TDS%</th><th>TDS</th><th>Total</th><th>Remarks</th></tr></thead>
        <tbody>
          ${rows.map((line, index) => `
            <tr>
              <td>${index + 1}</td>
              <td><button class="line-delete" data-action="delete-expense-entry-line" data-index="${index}" title="Remove row">x</button></td>
              <td><input data-expense-entry-line="${index}" data-expense-entry-line-field="ledgerHead" value="${line.ledgerHead}" /></td>
              <td><input data-expense-entry-line="${index}" data-expense-entry-line-field="billNo" value="${line.billNo}" /></td>
              <td><input type="date" data-expense-entry-line="${index}" data-expense-entry-line-field="billDate" value="${line.billDate}" /></td>
              <td><input data-expense-entry-line="${index}" data-expense-entry-line-field="hsnCode" value="${line.hsnCode}" /></td>
              <td><input class="numeric" type="number" data-expense-entry-line="${index}" data-expense-entry-line-field="taxable" value="${moneyValue(line.taxable)}" /></td>
              <td><input class="numeric" type="number" data-expense-entry-line="${index}" data-expense-entry-line-field="gst" value="${moneyValue(line.gst)}" /></td>
              <td><input class="numeric" type="number" data-expense-entry-line="${index}" data-expense-entry-line-field="tdsPercent" value="${moneyValue(line.tdsPercent)}" /></td>
              <td><input class="numeric" type="number" data-expense-entry-line="${index}" data-expense-entry-line-field="tds" value="${moneyValue(line.tds)}" /></td>
              <td><input class="numeric auto-field" value="${moneyValue(line.total)}" readonly /></td>
              <td><input data-expense-entry-line="${index}" data-expense-entry-line-field="remarks" value="${line.remarks}" /></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function expenseSelect(field, label, options, selected) {
  const unique = [...new Set((options || []).filter(Boolean))];
  return `<label class="classic-field"><span>${label}</span><select data-expense-entry-field="${field}">${unique.map((option) => `<option ${option === selected ? "selected" : ""}>${option}</option>`).join("")}</select></label>`;
}

function expenseInputWithList(field, label, options, value) {
  const listId = `expense-${field}-options`;
  return `<label class="classic-field"><span>${label}</span><input list="${listId}" data-expense-entry-field="${field}" value="${value || ""}" /><datalist id="${listId}">${options.map((option) => `<option value="${option}"></option>`).join("")}</datalist></label>`;
}

const CUSTOM_VOUCHER_ACCOUNT_TYPES = ["Receivable", "Payable"];
const CUSTOM_VOUCHER_SETTLEMENT_TYPES = ["One Time", "Monthly", "Quarterly", "Yearly"];

function customVoucherDescriptions() {
  const fromMasters = (state?.accountMasters || seed.accountMasters || []).map((item) => item.accountName).filter(Boolean);
  return [...new Set(["", "Rent", "Salary", "Insurance", "Electricity", "Shop Expense", "Interest", "Commission", ...fromMasters])];
}

function customVoucherParties(accountType = "Receivable") {
  const partyType = accountType === "Payable" ? "Supplier" : "Customer";
  return (state?.parties || []).filter((party) => party.type === partyType).map((party) => party.name).filter(Boolean);
}

function defaultCustomVoucherEntryLine() {
  const today = toDateInputValue(new Date());
  return {
    description: "",
    settlementType: "One Time",
    amount: 0,
    nos: 1,
    paymentDate: today,
    remarks: ""
  };
}

function defaultCustomVoucher() {
  const today = toDateInputValue(new Date());
  const staff = (state?.staffs || []).find((item) => item.name === "ABDUL SALAM AP") || state?.staffs?.[0] || seed.staffs[0];
  const partyName = customVoucherParties("Receivable")[0] || "";
  return {
    id: crypto.randomUUID(),
    entryNo: `CV${String((state?.customVouchers || []).length + 1).padStart(5, "0")}`,
    refNo: "",
    date: today,
    time: nowTimeWithSeconds(),
    periodFrom: today,
    periodTo: today,
    accountType: "Receivable",
    partyName,
    preparedBy: staff?.name || "",
    confirmBeforeDelete: true,
    lines: []
  };
}

function normalizeCustomVoucherLine(line = {}) {
  return {
    id: line.id || crypto.randomUUID(),
    description: line.description || "",
    mode: line.mode || line.settlementType || "One Time",
    amount: Number(line.amount || 0),
    paymentDate: toDateInputValue(line.paymentDate),
    remarks: line.remarks || ""
  };
}

function normalizeCustomVoucher(record = {}) {
  const today = toDateInputValue(new Date());
  return {
    id: record.id || crypto.randomUUID(),
    entryNo: record.entryNo || "",
    refNo: record.refNo || "",
    date: toDateInputValue(record.date || today),
    time: record.time || nowTimeWithSeconds(),
    periodFrom: toDateInputValue(record.periodFrom || record.date || today),
    periodTo: toDateInputValue(record.periodTo || record.periodFrom || record.date || today),
    accountType: record.accountType || "Receivable",
    partyName: record.partyName || "",
    preparedBy: record.preparedBy || state?.staffs?.[0]?.name || "",
    confirmBeforeDelete: record.confirmBeforeDelete !== false,
    totalAmount: sumField((record.lines || []).map(normalizeCustomVoucherLine), "amount"),
    lines: (record.lines || []).map(normalizeCustomVoucherLine)
  };
}

function customVoucherFinancials(record = {}) {
  const lines = (record.lines || []).map(normalizeCustomVoucherLine);
  return { lineCount: lines.length, totalAmount: sumField(lines, "amount") };
}

function addMonthsToDate(dateInput, months) {
  const date = new Date(toDateInputValue(dateInput));
  date.setMonth(date.getMonth() + Number(months || 0));
  return date.toISOString().slice(0, 10);
}

function formatDisplayDate(value) {
  const iso = toDateInputValue(value);
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}

function isDateWithinPeriod(dateValue, periodFrom, periodTo) {
  const date = toDateInputValue(dateValue);
  const from = toDateInputValue(periodFrom);
  const to = toDateInputValue(periodTo);
  return date >= from && date <= to;
}

function buildCustomVoucherLinesFromEntry(entry = {}, periodFrom, periodTo) {
  const amount = Number(entry.amount || 0);
  const nos = Math.max(1, Math.floor(Number(entry.nos || 1)));
  const settlementType = entry.settlementType || "One Time";
  const installment = amount / nos;
  const lines = [];
  let paymentDate = toDateInputValue(entry.paymentDate || periodFrom);

  for (let index = 0; index < nos; index += 1) {
    if (index > 0) {
      if (settlementType === "Monthly") paymentDate = addMonthsToDate(paymentDate, 1);
      else if (settlementType === "Quarterly") paymentDate = addMonthsToDate(paymentDate, 3);
      else if (settlementType === "Yearly") paymentDate = addMonthsToDate(paymentDate, 12);
    }
    if (!isDateWithinPeriod(paymentDate, periodFrom, periodTo)) {
      throw new Error(`Payment date ${formatDisplayDate(paymentDate)} falls outside the selected period.`);
    }
    lines.push(normalizeCustomVoucherLine({
      description: entry.description,
      mode: settlementType,
      amount: installment,
      paymentDate,
      remarks: entry.remarks
    }));
  }
  return lines;
}

function customVoucherDraftRecord() {
  customVoucherDraft = normalizeCustomVoucher(customVoucherDraft || defaultCustomVoucher());
  return customVoucherDraft;
}

function customVoucherEntryRecord() {
  customVoucherEntryDraft = { ...defaultCustomVoucherEntryLine(), ...(customVoucherEntryDraft || {}) };
  return customVoucherEntryDraft;
}

function customVoucherScreen() {
  const record = customVoucherDraftRecord();
  const entry = customVoucherEntryRecord();
  const financials = customVoucherFinancials(record);
  customVoucherConfirmDelete = record.confirmBeforeDelete !== false;
  return `
    <section class="clean-entry-shell custom-voucher-shell">
      <div class="custom-voucher-window-title">ScheduledVoucher</div>
      ${customVoucherToolbar()}
      ${customVoucherHeader(record)}
      ${customVoucherEntryRow(entry)}
      ${customVoucherTable(record)}
      ${customVoucherFooter(record, financials)}
    </section>
    ${customVoucherRegisterPanel()}
  `;
}

function customVoucherToolbar() {
  return `
    <div class="entry-actions body-toolbar custom-voucher-toolbar">
      ${toolbarButton("New", "new-custom-voucher")}
      ${toolbarButton("Save", "save-custom-voucher")}
      ${toolbarButton("Refresh", "refresh-custom-voucher")}
      ${toolbarButton("Search", "search-custom-voucher")}
      ${toolbarButton("Close", "close-account-action")}
    </div>
  `;
}

function customVoucherHeader(record) {
  return `
    <div class="transaction-entry-header custom-voucher-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Ref No</span><span class="field-pair"><input data-custom-voucher-field="entryNo" value="${record.entryNo}" /><input data-custom-voucher-field="refNo" value="${record.refNo}" /></span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair"><input type="date" data-custom-voucher-field="date" value="${record.date}" /><input data-custom-voucher-field="time" value="${record.time}" /></span></label>
        <label class="classic-field split-field"><span>Period</span><span class="field-pair"><input type="date" data-custom-voucher-field="periodFrom" value="${record.periodFrom}" /><input type="date" data-custom-voucher-field="periodTo" value="${record.periodTo}" /></span></label>
      </div>
      <div class="classic-fields right">
        <label class="classic-field"><span>Account Type</span>${plainSelect("accountType", record.accountType, CUSTOM_VOUCHER_ACCOUNT_TYPES, "data-custom-voucher-field")}</label>
        <label class="classic-field"><span>Party Name</span>${customVoucherPartySelect(record.accountType, record.partyName)}</label>
        <label class="classic-field"><span>Prepared By</span>${employeeDropdown("preparedBy", record.preparedBy, "data-custom-voucher-field")}</label>
      </div>
    </div>
  `;
}

function customVoucherPartySelect(accountType, selected) {
  const options = customVoucherParties(accountType);
  const list = [...new Set(["", ...options, selected].filter((item) => item !== undefined))];
  return `<select class="classic-input" data-custom-voucher-field="partyName">${list.map((option) => `<option ${option === selected ? "selected" : ""}>${option}</option>`).join("")}</select>`;
}

function customVoucherEntryRow(entry) {
  return `
    <div class="custom-voucher-entry-wrap">
      <table class="custom-voucher-entry-grid">
        <thead>
          <tr>
            <th>Description</th>
            <th>Settlement Type</th>
            <th>Amount</th>
            <th>Nos</th>
            <th>Payment Date</th>
            <th>Remarks</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${plainSelect("description", entry.description, customVoucherDescriptions(), "data-custom-voucher-entry-field")}</td>
            <td>${plainSelect("settlementType", entry.settlementType, CUSTOM_VOUCHER_SETTLEMENT_TYPES, "data-custom-voucher-entry-field")}</td>
            <td><input class="numeric" inputmode="decimal" data-custom-voucher-entry-field="amount" value="${moneyValue(entry.amount)}" /></td>
            <td><input class="numeric" inputmode="numeric" data-custom-voucher-entry-field="nos" value="${numericValue(entry.nos, 0)}" /></td>
            <td><input type="date" data-custom-voucher-entry-field="paymentDate" value="${entry.paymentDate}" /></td>
            <td><input data-custom-voucher-entry-field="remarks" value="${entry.remarks}" /></td>
            <td><button class="classic-add-button" data-action="add-custom-voucher-line">Add</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function customVoucherTable(record) {
  const lines = record.lines || [];
  return `
    <div class="custom-voucher-table-panel">
      <div class="table-wrap custom-voucher-table-wrap">
        <table class="custom-voucher-table">
          <thead><tr><th>Description</th><th>Mode</th><th>Amount</th><th>Payment Date</th><th>Remarks</th></tr></thead>
          <tbody>${lines.length ? lines.map((line, index) => customVoucherGridRow(line, index)).join("") : `<tr><td colspan="5" class="soft-note">Add scheduled rows using the entry strip above.</td></tr>`}</tbody>
        </table>
      </div>
    </div>
  `;
}

function customVoucherGridRow(line, index) {
  const item = normalizeCustomVoucherLine(line);
  return `
    <tr class="custom-voucher-grid-row" data-custom-voucher-line="${index}">
      <td>${item.description || "-"}</td>
      <td>${item.mode}</td>
      <td class="numeric">${moneyValue(item.amount)}</td>
      <td>${formatDisplayDate(item.paymentDate)}</td>
      <td>${item.remarks || "-"}</td>
    </tr>
  `;
}

function customVoucherFooter(record, financials) {
  return `
    <div class="custom-voucher-footer">
      <label class="confirm-delete"><input type="checkbox" data-custom-voucher-field="confirmBeforeDelete" ${record.confirmBeforeDelete !== false ? "checked" : ""} />Confirm Before delete a Row</label>
      <span class="footer-hint">Double_Click on Row to Delete</span>
      <div class="custom-voucher-total"><span>Total Amount</span><span>Only</span><output>${moneyValue(financials.totalAmount)}</output></div>
    </div>
  `;
}

function customVoucherRegisterPanel() {
  const rows = (state.customVouchers || []).map((record) => {
    const financials = customVoucherFinancials(record);
    return [
      record.entryNo,
      record.date,
      record.accountType,
      record.partyName || "-",
      moneyValue(financials.totalAmount),
      String(financials.lineCount),
      `<button class="text-button" data-action="load-custom-voucher" data-record-id="${record.id}">Load</button>`
    ];
  });
  return `
    <section class="panel custom-voucher-register-panel">
      <div class="panel-head"><h2>Saved Custom Vouchers</h2></div>
      ${table(["Entry No", "Date", "Account Type", "Party", "Total", "Rows", "Load"], rows.length ? rows : [["No custom vouchers saved yet", "-", "-", "-", "-", "-", "-"]])}
    </section>
  `;
}

function reports() {
  const matches = filteredMenuItems(reportSearch, 200).filter((item) => item.module === "Reports");
  const pinned = PINNED_REPORTS.map((name) => reportQuickButton(name, "pin")).join("");
  const recent = recentReportItems.length
    ? recentReportItems.map((name) => reportQuickButton(name, "recent")).join("")
    : `<p class="soft-note">Opened reports will appear here during the session.</p>`;
  return `
    <section class="panel report-center-hero">
      <div>
        <p class="eyebrow">Reports</p>
        <h2>Searchable report center</h2>
        <p>Old report names are preserved, but grouped so the full menu does not crowd the main sidebar.</p>
      </div>
      <label class="report-search">
        <span>Find report</span>
        <input data-report-search value="${escapeHtml(reportSearch)}" placeholder="sales profit, barcode, day end..." autocomplete="off" />
      </label>
    </section>
    <section class="report-quick-grid">
      <article class="panel report-quick-panel">
        <div class="panel-head"><h2>Pinned</h2></div>
        <div class="report-pill-row">${pinned}</div>
      </article>
      <article class="panel report-quick-panel">
        <div class="panel-head"><h2>Recent</h2></div>
        <div class="report-pill-row">${recent}</div>
      </article>
    </section>
    ${reportSearch.trim() ? `
      <section class="panel report-search-results-panel">
        <div class="panel-head"><h2>Search Results</h2></div>
        <div class="report-result-list">
          ${matches.length ? matches.map((item) => reportResultButton(item)).join("") : `<p class="soft-note">No matching reports found.</p>`}
        </div>
      </section>
    ` : ""}
    <section class="report-module-grid">
      ${REPORT_MENU_GROUPS.map(reportGroupCard).join("")}
    </section>
    <section class="panel report-preview-panel">
      <div class="panel-head">
        <h2>${escapeHtml(selectedReport)}</h2>
        <div class="panel-actions">
          <button class="secondary" data-action="export-report">Export</button>
          <button class="primary" data-action="print-now">Print</button>
        </div>
      </div>
      ${reportPreview(selectedReport)}
    </section>
  `;
}

function reportQuickButton(name, kind) {
  const label = kind === "pin" ? "Pinned" : "Recent";
  return `<button class="report-pill ${selectedReport === name ? "active" : ""}" data-report-item="${escapeHtml(name)}"><span>${escapeHtml(name)}</span><small>${label}</small></button>`;
}

function reportResultButton(item) {
  return `
    <button class="report-result" data-report-item="${escapeHtml(item.label)}">
      <span>${escapeHtml(item.label)}</span>
      <small>${escapeHtml(item.group)}</small>
    </button>
  `;
}

function reportGroupCard(group) {
  return `
    <details class="report-group" ${group.items.includes(selectedReport) ? "open" : ""}>
      <summary>
        <span>${escapeHtml(group.title)}</span>
        <small>${group.items.length} reports</small>
      </summary>
      <div class="report-group-items">
        ${group.items.map((item) => `
          <button class="report-row ${selectedReport === item ? "active" : ""}" data-report-item="${escapeHtml(item)}">
            <span>${escapeHtml(item)}</span>
            <small>Open</small>
          </button>
        `).join("")}
      </div>
    </details>
  `;
}

function reportPreview(name) {
  if (name === "Audit Trail") {
    return table(["Time", "User", "Action"], state.audit.map((a) => [a.time, a.user, a.action]));
  }
  if (name === "Rate History") {
    return rateTimeline();
  }
  const group = REPORT_MENU_GROUPS.find((item) => item.items.includes(name))?.title || "Reports";
  return `
    <div class="report-placeholder">
      <strong>${escapeHtml(name)}</strong>
      <p>${escapeHtml(group)} report screen placeholder. Final columns, filters, Excel/PDF output and print format will be completed during production report implementation.</p>
      <div class="report-placeholder-grid">
        ${readout("Menu Group", group)}
        ${readout("Status", "Planned")}
        ${readout("Output", "View / Print / Export")}
      </div>
    </div>
  `;
}

function billHeader(bill) {
  if (!bill) return `<p class="soft-note">No bill selected.</p>`;
  return `
    <div class="bill-header-card">
      <div class="billing-rate-line">
        <span class="rate-pill">Rate: ${bill.rateSnapshot}</span>
      </div>
      <div class="bill-header-groups">
        <section>
          <h3>Bill</h3>
          <div class="bill-header-grid compact">
            ${billField("Entry No, Ref No", bill.entryNo)}
            ${billField("Bill No", bill.billNo)}
            ${billField("Date, Time", `${bill.date} ${bill.time}`)}
            ${billSelectField("Item Category", bill.itemCategory, ["B2C", "B2B"])}
            ${billField("Prepare eINVOICE", bill.prepareEinvoice ? "Yes" : "No")}
          </div>
        </section>
        <section>
          <h3>Customer & Staff</h3>
          <div class="bill-header-grid compact">
            ${billField("Cust ID", bill.customerId || "-")}
            ${billField("Customer Name", bill.customer)}
            ${billField("Address", bill.address || "-")}
            ${billField("Phone", bill.phone || "-")}
            ${billSelectField("Staff, Agent", bill.staffName || "-", staffNameOptions())}
          </div>
        </section>
      </div>
    </div>
  `;
}

function billField(label, value) {
  return `<label class="bill-field"><span>${label}</span><input value="${value ?? ""}" /></label>`;
}

function billSelectField(label, value, options) {
  return `<label class="bill-field"><span>${label}</span><select>${options.map((option) => `<option ${option === value ? "selected" : ""}>${option}</option>`).join("")}</select></label>`;
}

function classicBillHeader(bill) {
  if (!bill) return `<div class="classic-bill-header"><p class="soft-note">No bill selected.</p></div>`;
  return `
    <div class="classic-bill-header">
      <div class="classic-fields left">
        ${classicField("Entry No, Ref No", bill.entryNo)}
        ${classicField("Date, Time", bill.date)}
        ${classicField("Staff,Agent", `${bill.staffName || "-"} (${bill.staffId || "-"})`)}
        ${classicField("Item Category", bill.itemCategory || "B2C", "select")}
      </div>
      <div class="classic-center-fields">
        <input class="classic-bill-no" value="${bill.billNo || ""}" />
        <label class="classic-checkbox"><input type="checkbox" ${bill.prepareEinvoice ? "checked" : ""} /> <span>Prepare eINVOICE</span></label>
      </div>
      <div class="classic-fields right">
        ${customerLookupField("Cust ID", "customerId", bill.customerId || "")}
        ${customerLookupField("Customer Name", "customer", bill.customer || "")}
        ${customerLookupField("Address", "address", bill.address || "")}
        ${customerLookupField("Phone", "phone", bill.phone || "")}
        ${customerQuickAddButton()}
      </div>
    </div>
  `;
}

function salesOrderHeader(order) {
  if (!order) return `<div class="classic-bill-header order-header"><p class="soft-note">No sales order selected.</p></div>`;
  const dateValue = toDateInputValue(order.date);
  const dueDateValue = toDateInputValue(order.dueDate);
  const paymentMode = order.paymentMode || "Cash";
  return `
    <div class="transaction-entry-header sales-order-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Order No, Ref No</span><span class="field-pair"><input value="${order.entryNo || "2221"}" /><input value="${order.refNo || ""}" /></span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair"><input type="date" value="${dateValue}" title="${order.date || ""}" /><input value="${order.time || nowTime()}" readonly /></span></label>
        <label class="classic-field split-field"><span>Prepared By, Type</span><span class="field-pair">${staffDropdownCell("staffName", order.staffName || "")}<select data-header-field="paymentMode"><option ${paymentMode === "Cash" ? "selected" : ""}>Cash</option><option ${paymentMode === "Credit" ? "selected" : ""}>Credit</option><option ${paymentMode === "Bank" ? "selected" : ""}>Bank</option></select></span></label>
        ${classicField("Introducer", order.introducer || "")}
      </div>
      <div class="classic-fields right">
        <label class="classic-field party-check-field"><span>Cust ID</span><span class="field-pair party-pair"><input type="checkbox" ${order.customerId ? "checked" : ""} /><input data-customer-field="customerId" data-customer-lookup value="${order.customerId || ""}" list="customer-lookup-options" /></span></label>
        ${customerLookupField("Customer Name", "customer", order.customer || "")}
        ${customerLookupField("Address", "address", order.address || "")}
        ${customerLookupField("Phone", "phone", order.phone || "")}
        ${customerQuickAddButton()}
      </div>
    </div>
    <input type="hidden" class="order-due-date-value" value="${dueDateValue}" />
  `;
}

function classicField(label, value, type = "text") {
  if (type === "select") {
    return `<label class="classic-field"><span>${label}</span><select><option ${value === "B2C" ? "selected" : ""}>B2C</option><option ${value === "B2B" ? "selected" : ""}>B2B</option></select></label>`;
  }
  return `<label class="classic-field"><span>${label}</span><input value="${value ?? ""}" /></label>`;
}

function customerLookupField(label, field, value = "") {
  const lookup = ["customerId", "customer", "phone"].includes(field) ? " data-customer-lookup list=\"customer-lookup-options\"" : "";
  return `<label class="classic-field"><span>${label}</span><input data-customer-field="${field}"${lookup} value="${value ?? ""}" /></label>`;
}

function customerQuickAddButton() {
  return `<button type="button" class="text-button customer-quick-add" data-action="quick-add-customer">New Customer</button>${customerLookupDatalist()}`;
}

function customerLookupDatalist() {
  const options = customerLookupOptions().map((value) => `<option value="${pdcAttr(value)}"></option>`).join("");
  return `<datalist id="customer-lookup-options">${options}</datalist>`;
}

function customerLookupOptions() {
  const values = [];
  (state.parties || []).filter((party) => party.type === "Customer").forEach((party) => {
    [party.customerCode, party.id, party.name, party.phone, party.mobile].filter(Boolean).forEach((value) => values.push(String(value)));
  });
  return [...new Set(values)];
}

function classicSelectField(label, field, value, options) {
  return `<label class="classic-field"><span>${label}</span><select data-header-field="${field}">${options.map((option) => `<option ${option === value ? "selected" : ""}>${option}</option>`).join("")}</select></label>`;
}

function purchaseInvoiceHeader(bill) {
  const entryNo = bill?.entryNo || "308";
  const dateValue = toDateInputValue(bill?.date);
  const displayDate = bill?.date || new Date().toLocaleDateString("en-GB");
  const mode = bill?.mode || bill?.paymentMode || "Cash";
  const type = bill?.itemCategory || bill?.category || "B2C";
  return `
    <div class="transaction-entry-header purchase-invoice-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Ref No</span><span class="field-pair"><input value="${entryNo}" /><input value="${bill?.refNo || ""}" /></span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair"><input type="date" value="${dateValue}" title="${displayDate}" /><input value="${bill?.time || new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}" readonly /></span></label>
        <label class="classic-field split-field"><span>Mode, Type</span><span class="field-pair"><select data-header-field="paymentMode"><option ${mode === "Cash" ? "selected" : ""}>Cash</option><option ${mode === "Credit" ? "selected" : ""}>Credit</option></select><select data-header-field="itemCategory"><option ${type === "B2C" ? "selected" : ""}>B2C</option><option ${type === "B2B" ? "selected" : ""}>B2B</option></select></span></label>
        <label class="classic-field"><span>Prepared By</span>${staffDropdownCell("staffName", bill?.staffName || bill?.preparedBy || "")}</label>
      </div>
      <div class="classic-fields right">
        <label class="classic-field party-check-field"><span>Party</span><span class="field-pair party-pair"><input type="checkbox" ${bill?.partyChecked ? "checked" : ""} /><input data-customer-field="customerId" data-customer-lookup value="${bill?.customerId || ""}" list="customer-lookup-options" /></span></label>
        ${customerLookupField("Name", "customer", bill?.customer || bill?.partyName || "")}
        ${customerLookupField("Address", "address", bill?.address || "")}
        ${customerLookupField("Phone", "phone", bill?.phone || "")}
        ${customerQuickAddButton()}
      </div>
    </div>
  `;
}

function purchaseReturnHeader(bill) {
  const entryNo = bill?.returnEntryNo || "2";
  const dateValue = toDateInputValue(bill?.date);
  const displayDate = bill?.date || new Date().toLocaleDateString("en-GB");
  const mode = bill?.mode || bill?.paymentMode || "Cash";
  const location = bill?.location || "LK1";
  const locationOptions = stockLocationOptions();
  return `
    <div class="transaction-entry-header purchase-return-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Ref No</span><span class="field-pair"><input value="${entryNo}" /><input value="${bill?.returnRefNo || ""}" /></span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair"><input type="date" value="${dateValue}" title="${displayDate}" /><input value="${bill?.time || new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}" readonly /></span></label>
        <label class="classic-field split-field"><span>Mode, Location</span><span class="field-pair"><select data-header-field="paymentMode"><option ${mode === "Cash" ? "selected" : ""}>Cash</option><option ${mode === "Credit" ? "selected" : ""}>Credit</option></select><select data-header-field="location">${locationOptions.map((option) => `<option ${option === location ? "selected" : ""}>${option}</option>`).join("")}</select></span></label>
      </div>
      <div class="classic-fields right">
        <label class="classic-field party-check-field"><span>Party Name</span><span class="field-pair party-pair"><input type="checkbox" ${bill?.partyChecked ? "checked" : ""} /><input value="${bill?.partyName || bill?.customer || ""}" /></span></label>
        ${classicField("Address", bill?.address || "")}
        <label class="classic-field"><span>Prepared By</span>${staffDropdownCell("preparedBy", bill?.preparedBy || bill?.staffName || "")}</label>
      </div>
    </div>
  `;
}

function directPurchaseHeader(bill, options = {}) {
  const dateValue = toDateInputValue(bill?.date);
  const displayDate = bill?.date || new Date().toLocaleDateString("en-GB");
  const bankOptions = ["Cash in Hand", "Scheme Cash", "Canara Bank Edak", "Federal Bank Edak", "Bank"];
  const entryNo = options.isReturn ? (bill.entryNo || "30") : (bill.entryNo || "10");
  return `
    <div class="transaction-entry-header purchase-invoice-header direct-purchase-header ${options.isReturn ? "direct-purchase-return-header" : ""}">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Ref No</span><span class="field-pair"><input value="${entryNo}" /><input value="${bill.refNo || bill.returnRefNo || ""}" /></span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair"><input type="date" value="${dateValue}" title="${displayDate}" /><input value="${bill.time || nowTime()}" readonly /></span></label>
        <label class="classic-field split-field"><span>Mode, Type</span><span class="field-pair"><select><option ${bill.paymentMode === "Cash" ? "selected" : ""}>Cash</option><option ${bill.paymentMode === "Credit" ? "selected" : ""}>Credit</option><option ${bill.paymentMode === "Bank" ? "selected" : ""}>Bank</option></select><select><option ${bill.itemCategory === "B2B" ? "selected" : ""}>B2B</option><option ${bill.itemCategory === "B2C" ? "selected" : ""}>B2C</option></select></span></label>
        <label class="classic-field"><span>Bank Account</span><select>${bankOptions.map((option) => `<option ${option === bill.bankAccount ? "selected" : ""}>${option}</option>`).join("")}</select></label>
        <label class="classic-field"><span>Prepared By</span>${staffDropdownCell("preparedBy", bill.preparedBy || "")}</label>
      </div>
      <div class="classic-fields right">
        <label class="classic-field party-check-field"><span>Party</span><span class="field-pair party-pair"><input type="checkbox" ${bill.partyChecked ? "checked" : ""} /><input value="${bill.partyId || ""}" /></span></label>
        ${customerLookupField("Name", "customer", bill.partyName || "")}
        ${customerLookupField("Address", "address", bill.address || "")}
        ${customerLookupField("Phone", "phone", bill.phone || "")}
        ${customerQuickAddButton()}
      </div>
    </div>
  `;
}

function diamondPurchaseHeader(bill) {
  const dateValue = toDateInputValue(bill.date);
  const invoiceDate = toDateInputValue(bill.invoiceDate);
  const partyOptions = diamondPartyOptions();
  return `
    <div class="transaction-entry-header dmd-header diamond-purchase-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Ref No.</span><span class="field-pair"><input value="${bill.entryNo || "3"}" /><input value="${bill.refNo || ""}" /></span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair"><input type="date" value="${dateValue}" /><input value="${bill.time || nowTime()}" readonly /></span></label>
        <label class="classic-field split-field"><span>Invoice No, Date</span><span class="field-pair"><input value="${bill.invoiceNo || ""}" /><input type="date" value="${invoiceDate}" /></span></label>
        <label class="classic-field split-field"><span>Invoice Mode, Type</span><span class="field-pair"><select><option ${bill.paymentMode === "Credit" ? "selected" : ""}>Credit</option><option ${bill.paymentMode === "Cash" ? "selected" : ""}>Cash</option><option ${bill.paymentMode === "Bank" ? "selected" : ""}>Bank</option></select><select><option ${bill.itemCategory === "B2C" ? "selected" : ""}>B2C</option><option ${bill.itemCategory === "B2B" ? "selected" : ""}>B2B</option></select></span></label>
      </div>
      <div class="classic-fields right">
        <label class="classic-field"><span>Supplier / Smith</span><select>${partyOptions.map((option) => `<option ${option === bill.supplierSmith ? "selected" : ""}>${option}</option>`).join("")}</select></label>
        ${classicField("Party Name", bill.partyName || "")}
        <label class="classic-field"><span>Prepared By</span>${staffDropdownCell("preparedBy", bill.preparedBy || "")}</label>
        <div class="radio-row smith-transfer-row"><span>Post To Smith transfer?</span><label><input type="radio" name="diamondSmithTransfer" ${bill.postToSmith ? "checked" : ""} />Yes</label><label><input type="radio" name="diamondSmithTransfer" ${!bill.postToSmith ? "checked" : ""} />No</label></div>
      </div>
    </div>
  `;
}

function diamondPurchaseReturnHeader(bill) {
  const dateValue = toDateInputValue(bill.date);
  const invoiceDate = toDateInputValue(bill.invoiceDate);
  const partyOptions = diamondPartyOptions();
  return `
    <div class="transaction-entry-header dmd-header diamond-purchase-header diamond-purchase-return-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Ref No.</span><span class="field-pair"><input value="${bill.entryNo || ""}" /><input value="${bill.refNo || ""}" /></span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair"><input type="date" value="${dateValue}" /><input value="${bill.time || nowTime()}" readonly /></span></label>
        <label class="classic-field split-field"><span>Invoice No, Date</span><span class="field-pair"><input value="${bill.invoiceNo || ""}" /><input type="date" value="${invoiceDate}" /></span></label>
      </div>
      <div class="classic-fields right">
        <label class="classic-field"><span>Supplier / Smith</span><select>${partyOptions.map((option) => `<option ${option === bill.supplierSmith ? "selected" : ""}>${option}</option>`).join("")}</select></label>
        <label class="classic-field"><span>Prepared By</span>${staffDropdownCell("preparedBy", bill.preparedBy || "")}</label>
        <div class="radio-row smith-transfer-row"><span>Post To Smith transfer?</span><label><input type="radio" name="diamondReturnSmithTransfer" ${bill.postToSmith ? "checked" : ""} />Yes</label><label><input type="radio" name="diamondReturnSmithTransfer" ${!bill.postToSmith ? "checked" : ""} />No</label></div>
      </div>
    </div>
  `;
}

function dmdStonePurchaseHeader(bill) {
  const dateValue = toDateInputValue(bill.date);
  const invoiceDate = toDateInputValue(bill.invoiceDate);
  const partyOptions = diamondPartyOptions();
  return `
    <div class="transaction-entry-header dmd-header dmd-stone-purchase-header">
      <div class="classic-fields left">
        <label class="classic-field split-field"><span>Entry No, Ref No.</span><span class="field-pair"><input value="${bill.entryNo || ""}" /><input value="${bill.refNo || ""}" /></span></label>
        <label class="classic-field split-field"><span>Date, Time</span><span class="field-pair"><input type="date" value="${dateValue}" /><input value="${bill.time || nowTime()}" readonly /></span></label>
        <label class="classic-field split-field"><span>Invoice No, Date</span><span class="field-pair"><input value="${bill.invoiceNo || ""}" /><input type="date" value="${invoiceDate}" /></span></label>
        <label class="classic-field split-field"><span>Invoice Mode, Type</span><span class="field-pair"><select><option ${bill.paymentMode === "Credit" ? "selected" : ""}>Credit</option><option ${bill.paymentMode === "Cash" ? "selected" : ""}>Cash</option><option ${bill.paymentMode === "Bank" ? "selected" : ""}>Bank</option></select><select><option ${bill.itemCategory === "B2C" ? "selected" : ""}>B2C</option><option ${bill.itemCategory === "B2B" ? "selected" : ""}>B2B</option></select></span></label>
      </div>
      <div class="classic-fields right">
        <label class="classic-field"><span>Supplier / Smith</span><select>${partyOptions.map((option) => `<option ${option === bill.supplierSmith ? "selected" : ""}>${option}</option>`).join("")}</select></label>
        ${classicField("Party Name", bill.partyName || "")}
        <label class="classic-field"><span>Prepared By</span>${staffDropdownCell("preparedBy", bill.preparedBy || "")}</label>
      </div>
    </div>
  `;
}

function diamondPartyOptions() {
  const parties = (state.parties || []).filter((party) => ["Supplier", "Smith"].includes(party.type)).map((party) => party.name || party.customerName).filter(Boolean);
  return parties.length ? ["", ...parties] : ["", "Supplier", "Smith"];
}

function stockLocationOptions() {
  const records = state.miscellaneous?.stockLocations || state.miscellaneous?.stockPlaces || state.miscellaneous?.locations || [];
  const names = records.map((record) => record.name || record.locationName || record.id).filter(Boolean);
  return names.length ? names : ["LK1", "Main Stock"];
}

function toDateInputValue(value) {
  const text = String(value || "");
  const match = text.match(/^(\d{2})[/-](\d{2})[/-](\d{4})$/);
  if (match) return `${match[3]}-${match[2]}-${match[1]}`;
  const parsed = Date.parse(text);
  if (!Number.isNaN(parsed)) return new Date(parsed).toISOString().slice(0, 10);
  return new Date().toISOString().slice(0, 10);
}

function readout(label, value) {
  return `<div class="readout"><span>${label}</span><strong>${value}</strong></div>`;
}

function removableReadout(label, value, action, field) {
  return `<div class="readout removable-readout"><span>${label}</span><strong>${value}</strong><button class="line-delete" title="Remove ${label}" data-action="${action}" data-discount-field="${field}">x</button></div>`;
}

function cardReadout(value, scope = "sales") {
  return `<div class="readout card-readout" data-card-transactions data-card-scope="${scope}" title="Double-click to split card or UPI payment"><span>Card (F8)</span><strong>${value}</strong></div>`;
}

function toolbarButton(label, action) {
  return `<button class="toolbar-button" data-action="${action}">${label}</button>`;
}

function editCell(field, value = "", inputMode = "text") {
  return `<input class="grid-input" data-line-field="${field}" inputmode="${inputMode}" value="${value ?? ""}"${itemFieldListAttribute(field)} />${itemFieldListAttribute(field) ? itemDatalist(field) : ""}`;
}

function autoCell(field, value = "", inputMode = "text") {
  const editable = ["makingCharge", "totalMc"].includes(field);
  return `<input class="grid-input auto-field" data-line-field="${field}" inputmode="${inputMode}" value="${value ?? ""}" ${editable ? `title="Editable: MC/gm and total MC recalculate each other"` : `readonly title="Auto calculated"`} />`;
}

function selectCell(field, value, options) {
  return `<select class="grid-input" data-line-field="${field}">${options.map((option) => `<option ${option === value ? "selected" : ""}>${option}</option>`).join("")}</select>`;
}

function calcCell(field, value) {
  return `<output class="grid-output" data-line-output="${field}">${value ?? ""}</output>`;
}

function addMarkerCell() {
  return `<span class="grid-add-marker" title="Press Enter to add this line">▼</span>`;
}

function billingSection(title, rows, entryColumns, entryMapper, columns, mapper) {
  return `
    <section class="billing-section">
      <div class="billing-section-head">
        <h3>${title}</h3>
        <span>${rows.length} entries</span>
      </div>
      ${table(entryColumns, [entryMapper(rows[0] || normalizeBillLine({}, 0))])}
      ${table(columns, rows.map(mapper))}
    </section>
  `;
}

function classicBillingSection(title, rows, entryColumns, entryMapper, columns, mapper) {
  const normalizedFirst = defaultEntryLine(title.toLowerCase());
  const isSalesSection = title === "Sales";
  const sectionKey = title.toLowerCase();
  const detailRows = rows.length
    ? tableWithRowAttrs(columns, rows.map((row, index) => ({
        attrs: `data-edit-line-scope="bill" data-edit-line-section="${sectionKey}" data-edit-line-index="${index}" title="Double-click to edit this row"`,
        cells: mapper(row, index)
      })))
    : table(columns, []);
  return `
    <section class="classic-entry-area billing-section">
      <div class="classic-entry-grid">
        ${table(entryColumns, [entryMapper(normalizedFirst)])}
      </div>
      <div class="classic-subtabs">
        ${isSalesSection ? `<button class="active" type="button" data-classic-subtab="sales">Sales</button><button type="button" data-classic-subtab="diamond">Diamond</button>` : `<span class="active">${title}</span>`}
      </div>
      ${isSalesSection ? `
        <div class="classic-detail-grid" data-classic-panel="sales">${detailRows}</div>
        <div class="classic-detail-grid is-hidden" data-classic-panel="diamond">${table(diamondColumns(), [])}</div>
      ` : `<div class="classic-detail-grid">${detailRows}</div>`}
    </section>
  `;
}

function transactionHeader(kind, bill, options = {}) {
  const entryNo = kind === "Return" ? "14" : kind === "Purchase Return" ? "2" : bill?.entryNo || "262";
  const party = bill?.customer || "";
  const partyLabel = options.partyLabel || "Party";
  const nameLabel = options.nameLabel || "Name";
  const preparedLabel = options.preparedLabel || "Prepared By";
  const modeLabel = options.modeLabel || "Mode, Type";
  return `
    <div class="transaction-entry-header ${options.headerClass || ""}">
      <div class="classic-fields left">
        ${classicField("Entry No, Ref No", entryNo)}
        ${classicField("Date, Time", new Date().toLocaleDateString("en-GB"))}
        ${kind === "Purchase" || kind === "Purchase Return" ? classicField(modeLabel, "Cash / B2C", "text") : ""}
        <label class="classic-field"><span>${preparedLabel}</span>${staffDropdownCell("staffName", bill?.staffName || bill?.preparedBy || "")}</label>
      </div>
      <div class="classic-fields right">
        ${classicField(partyLabel, party)}
        ${classicField(nameLabel, party)}
        ${classicField("Address", bill?.address || "")}
        ${classicField("Phone", bill?.phone || "")}
      </div>
    </div>
  `;
}

function classicTransactionTable(kind, entryColumns, entryRow, columns, rows) {
  return `
    <section class="classic-entry-area billing-section ${kind}" data-entry-kind="${kind}">
      <div class="classic-entry-grid">${table(entryColumns, [entryRow])}</div>
      <div class="classic-detail-grid">${tableWithRowAttrs(columns, rows.map((row, index) => ({
        attrs: `data-edit-line-scope="transaction" data-edit-line-kind="${kind}" data-edit-line-index="${index}" title="Double-click to edit this row"`,
        cells: row
      })))}</div>
    </section>
  `;
}

function staffDropdownCell(field, selected = "") {
  const options = staffNameOptions();
  return `<select class="classic-input" data-header-field="${field}">${options.map((name) => `<option ${name === selected ? "selected" : ""}>${name}</option>`).join("")}</select>`;
}

function itemCatalogRows() {
  const stockRows = (state?.stock || seed.stock || []).map((item, index) => ({
    sl: index + 1,
    itemId: item.itemId || item.huid || item.barcode || item.item || "",
    itemName: item.item || item.itemName || "",
    itemType: item.purity || item.typeWastage || "",
    itemCategory: item.product || item.category || (String(item.item || "").toLowerCase().includes("diamond") ? "Diamond" : "Gold")
  }));
  const masterRows = (state?.itemMasters || seed.itemMasters || []).map((item, index) => ({
    sl: stockRows.length + index + 1,
    itemId: item.itemId || item.itemCode || "",
    itemName: item.itemName || "",
    itemType: item.typeWastage || item.subGroup || "",
    itemCategory: item.product || ""
  }));
  const seen = new Set();
  return [...stockRows, ...masterRows].filter((item) => {
    const key = `${item.itemId}|${item.itemName}`.toLowerCase();
    if (!item.itemName || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function itemDatalistId(field = "itemName") {
  return `item-catalog-${field}`;
}

function itemDatalist(field = "itemName") {
  const valueFor = (item) => ["itemId", "itemCode", "barcode"].includes(field) ? item.itemId : item.itemName;
  return `<datalist id="${itemDatalistId(field)}">${itemCatalogRows().map((item) => `<option value="${pdcAttr(valueFor(item))}" label="${pdcAttr(`${item.itemId} | ${item.itemType} | ${item.itemCategory}`)}"></option>`).join("")}</datalist>`;
}

function itemFieldListAttribute(field) {
  return ["itemName", "item", "itemId", "itemCode", "itemDescription", "description", "barcode"].includes(field) ? ` list="${itemDatalistId(field)}"` : "";
}

function findItemCatalogMatch(value = "") {
  const key = String(value || "").trim().toLowerCase();
  if (!key) return null;
  return itemCatalogRows().find((item) => [item.itemId, item.itemName].some((candidate) => String(candidate || "").trim().toLowerCase() === key)) || null;
}

function enrichLineFromItemCatalog(line = {}) {
  const match = findItemCatalogMatch(line.itemName) || findItemCatalogMatch(line.item) || findItemCatalogMatch(line.itemCode) || findItemCatalogMatch(line.barcode);
  if (!match) return line;
  const master = (state.itemMasters || []).find((item) => item.itemName === match.itemName || item.itemId === match.itemId);
  return {
    ...line,
    item: line.item || match.itemId,
    itemCode: line.itemCode || match.itemId,
    itemName: match.itemName || line.itemName,
    va: Number(line.va || master?.va || 0),
    mcPerGm: Number(line.mcPerGm || master?.mcGram || 0)
  };
}

function dmdReturnHeader(bill) {
  return `
    <div class="transaction-entry-header dmd-header dmd-return-header">
      <div class="classic-fields left">
        ${classicField("Entry No, Ref No", bill.entryNo)}
        ${classicField("Date, Time", bill.date)}
        <label class="classic-field"><span>Prepared By</span>${staffDropdownCell("preparedBy", bill.preparedBy)}</label>
        <div class="radio-row">
          ${["Cash", "Credit", "Bank"].map((mode) => `<label><input type="radio" name="dmdReturnMode" ${bill.paymentMode === mode ? "checked" : ""} />${mode}</label>`).join("")}
        </div>
      </div>
      <div class="classic-fields right">
        ${customerLookupField("Cust ID", "customerId", bill.customerId)}
        ${customerLookupField("Customer Name", "customer", bill.customer)}
        ${classicField("GSTIN", bill.gstin)}
        ${classicField("Pan Card No", bill.panCardNo)}
        ${customerQuickAddButton()}
      </div>
    </div>
  `;
}

function dmdWholesaleHeader(bill) {
  return `
    <div class="transaction-entry-header dmd-header dmd-wholesale-header">
      <div class="classic-fields left">
        ${classicField("Entry No, Ref No.", bill.entryNo)}
        ${classicField("Date, Time", bill.date)}
        ${classicField("Invoice No, Date", bill.invoiceNo || bill.invoiceDate)}
      </div>
      <div class="classic-fields middle">
        ${classicField("Invoice Date", bill.invoiceDate)}
        <label class="checkbox-line"><input type="checkbox" ${bill.addToStock ? "checked" : ""} /> Add to Stock</label>
        <label class="classic-field"><span>Return Type</span><select data-dmd-return-field="returnType">${DMD_RETURN_TYPES.map((type) => `<option ${type === (bill.returnType || "Sales Return") ? "selected" : ""}>${type}</option>`).join("")}</select></label>
      </div>
      <div class="classic-fields right">
        ${customerLookupField("Customer", "customer", bill.customer)}
        ${customerLookupField("Party Name", "customer", bill.partyName)}
        <label class="classic-field"><span>Prepared By</span>${staffDropdownCell("preparedBy", bill.preparedBy)}</label>
        ${customerQuickAddButton()}
      </div>
    </div>
  `;
}

function classicTotalStrip(bill, sectionTitle) {
  if (!bill) return "";
  let sectionKey = sectionTitle.toLowerCase();
  if (sectionKey === "sales order") sectionKey = "sales";
  if (sectionKey.includes("purchase")) sectionKey = "exchange";
  const rows = bill.sections?.[sectionKey] || [];
  return `
    <div class="classic-total-strip">
      ${classicTotalBox("Total", sumField(rows, "qty"))}
      ${classicTotalBox("Gross", grams(sumField(rows, "gross")))}
      ${classicTotalBox("Stone", grams(sumField(rows, "stone")))}
      ${classicTotalBox("Wastage", grams(sumField(rows, "wastage")))}
      ${classicTotalBox("Net", grams(sumField(rows, "net")))}
      ${classicTotalBox(`${sectionTitle} Total`, money(sumLines(rows)), true)}
    </div>
  `;
}

function classicTotalBox(label, value, wide = false) {
  return `<label class="classic-total-box ${wide ? "wide" : ""}" data-total-label="${label}"><span>${label}</span><input data-total-value="${label}" value="${value}" readonly /></label>`;
}

function salesEntryColumns() {
  return ["Barcode", "Item", "Description", "Qty", "Gross", "Stone", "Wastage", "Net", "Stn Charge", "Rate", "VA%", "MC/Grm", "Total MC", "Tax%", "Tax", "Amount"];
}

function salesColumns() {
  return ["X", "Sl", "Barcode", "Item Name", "Description", "Qty", "Gross Weight", "Stone Weight", "Wastage", "Net Weight", "Stone Charge", "Rate", "VA%", "Making Charge", "MC/Grm", "VA Dis%", "VA After Disc", "Amount", "Dmd Amt", "Discount", "Tax %", "Tax Amt", "Cess Amt", "Item Total", "HUID", "CessPerc"];
}

function diamondColumns() {
  return ["IID", "IName", "Barcode", "Color Type", "Colour Scale", "Shape", "Cut", "Clarity", "Seive", "Carat / Cent", "CT", "Pcs", "Selling Rate"];
}

function salesOrderEntryColumns() {
  return ["Item ID", "Item Name", "Qty", "Gross", "Stone", "Wastage", "Net", "Stn Charge", "Rate", "VA%", "MC/Grm", "MC", "Amount", "Length", "Breadth", "Model", "Add"];
}

function salesOrderColumns() {
  return ["X", "Sl", "Item Code", "Item Name", "Qty", "Gross Weight", "Stone Weight", "Wastage", "Net Weight", "Stone Charge", "Rate", "VA%", "MC/Grm", "Making Charge", "Amount", "Length", "Breadth", "Model"];
}

function salesOrderExchangeEntryColumns() {
  return ["ID", "Item", "Qty", "Gross", "Stone", "MudLess", "Less%", "Less Weight", "Touch%", "Touch Less", "Net Wght", "Stn Charge", "Rate", "Item Total", "Add"];
}

function salesOrderExchangeColumns() {
  return ["X", "#", "Item Name", "Qty", "Gross Wght", "Stn Wght", "Mud Less", "Less %", "Wght Less", "Touch %", "Touch Less", "Net Wght", "Stn Chge", "Rate", "Amount", "Item Descri"];
}

function salesOrderReturnEntryColumns() {
  return ["ID", "Name", "Qty", "Gross Weight", "Stone", "Wastage", "Net Weight", "Stn Charge", "VA%", "MC/Grm", "Make Charge", "Rate", "Tax%", "Tax Amt", "Amount", "Add"];
}

function salesOrderReturnColumns() {
  return ["X", "Sl", "Item Name", "Qty", "Gross Weight", "Stone Weight", "Wastage", "Net Weight", "StnCharge", "VA%", "MC/Grm", "Making Charge", "Rate", "Tax%", "TaxAmt", "Total", "CessPerc", "Cess Amt"];
}

function exchangeEntryColumns() {
  return ["ID", "Item", "Qty", "Gross", "Stone", "MudLess", "Less%", "Less Weight", "Touch%", "Touch Less", "Net Wght", "Stn Charge", "RateLess%", "Rate", "Item Total"];
}

function exchangeColumns() {
  return ["X", "#", "Item Name", "Qty", "Gross Wght", "Stn Wght", "Mud Less", "Less%", "Wght Less", "Touch%", "Touch Less", "Net Wght", "Stn Chge", "Rate%", "Rate", "Amount", "ItemDescri"];
}

function returnEntryColumns() {
  return ["ID", "Name", "Description", "Qty", "GrossWT", "StoneWT", "Wastage", "NetWT", "Stn Charge", "VA%", "MC/Grm", "TotalMC", "Rate", "Tax%", "Tax Amt", "Amt", "Add"];
}

function returnColumns() {
  return ["Sl", "X", "Item Name", "Description", "Qty", "Gross Weight", "Stone Weight", "Wastage", "Net Weight", "Stn Charge", "VA%", "MC/Grm", "Making Charge", "Rate", "Tax%", "TaxAmt", "Total"];
}

function purchaseEntryColumns() {
  return ["ID", "Item", "Qty", "Gross", "Stone", "MudLess", "Less%", "Less Weight", "Touch%", "Touch Less", "Net Wght", "Stn Charge", "RateLess%", "Rate", "Tax%", "Tax Amt", "Item Total", "Add"];
}

function purchaseColumns() {
  return ["X", "#", "Item Name", "Qty", "Gross Wght", "Stone Wght", "Mud Less", "Less %", "Wght Less", "Touch %", "Touch Less", "Net Wght", "Stone Chge", "Rate%", "Rate", "Tax%", "TaxAmt", "Amount"];
}

function purchaseReturnEntryColumns() {
  return ["Item ID", "Item", "Qty", "Gross", "Stone", "MudLess", "Less%", "Less Weight", "Touch%", "Touch Less", "Net Weight", "Stn Charge", "Rate", "Total", "Add"];
}

function purchaseReturnColumns() {
  return ["Sl", "X", "ItemID", "Item Name", "Nos", "Gross Weight", "Stone Weight", "Mud Less", "Less %", "Weight Less", "Touch %", "Touch Less", "Net Weight", "Stone Charge", "Rate", "Amount"];
}

function directPurchaseEntryColumns() {
  return ["ID", "Item", "Qty", "Gross", "Stone", "Net Wght", "Rate", "Stn Charge", "MC/Grm", "Total MC", "Tax%", "Tax Amt", "Item Total", "Add"];
}

function directPurchaseColumns() {
  return ["X", "#", "Item Name", "Qty", "Gross Wght", "Stone Wght", "Net Wght", "Rate", "Stone Chge", "MC/Grm", "Total MC", "Tax%", "TaxAmt", "Amount", "CessPerc", "CessAmt"];
}

function directPurchaseReturnColumns() {
  return ["X", "#", "Item Name", "Qty", "Gross Wght", "Stone Wght", "Net Wght", "Rate", "Stone Chge", "MC/Grm", "Total MC", "Tax%", "TaxAmt", "Amount", "CessPerc", "CessAmt"];
}

function dmdReturnEntryColumns() {
  return ["Barcode", "Item Description", "Qty", "Gross Wght", "Precious Wght", "Diamond Wt/Cent", "Colour Stone Wt", "Net Weight", "Touch", "Pure Wght", "Rate RTGS", "Crt/Cent Rate", "Diamond Amount", "MC Grm", "Total MC", "Item Total"];
}

function dmdReturnColumns() {
  return ["X", "Sl", "IID", "Item Name", "Qty", "Gross Weight", "Precious Weight", "Diamond WT/Cent", "Color Stone", "Net Weight", "Touch", "Pure Wght", "Rate RTGS", "Crt/Cent Rate", "Diamond Amount", "MC Grm", "Making Charge", "Amount"];
}

function dmdWholeSalesClassicEntryColumns() {
  return ["Barcode", "Item Description", "Qty", "Gross Wght", "Precious Wght", "Diamond Wt/Cent", "Colour Stone Wt", "Net Weight", "Touch", "Pure Wght", "Rate RTGS", "Crt/Cnt Rate", "Diamond Amount", "MC Grm", "Total MC", "Item Total"];
}

function dmdWholeSalesClassicColumns() {
  return ["X", "Sl", "IID", "Item Name", "Qty", "Gross Weight", "Precious Weight", "Diamond WT/Cent", "Color Stone", "Net Weight", "Touch", "Pure Wght", "Rate", "RTGS", "Crt/Cnt Rate", "Diamond Amount", "MC Grm", "Making Charge", "Amount", "Barcode", "Preci_Amt", "Clr Stn Amt"];
}

function dmdWholesaleEntryColumns() {
  return ["Item", "Descri", "Nos", "Gross", "Stone", "Stone Price", "VA%", "Gold Type", "Sales Type", "Gold Rate", "Total", "DmdWgt", "Stn S.price", "Pur. MC", "Sales MC", "Sales Amt", "Add"];
}

function diamondPurchaseReturnEntryColumns() {
  return ["Item ID", "Item", "Barcode", "Nos", "Gross", "Stone", "Net Weight", "Type", "Stone Price", "Gold Type", "Gold Rate", "Total", "DmdWgt", "Pur. MC", "Add"];
}

function diamondPurchaseReturnColumns() {
  return ["X", "SL", "Item ID", "ItemName", "Barcode", "Nos", "Gross Weight", "Stone Weight", "Net Weight", "Stone Price", "Gold Type", "Gold Rate", "Total", "Diamond Weight", "Purchase MC", "SaleType"];
}

function dmdWholesaleColumns() {
  return ["X", "SL", "Item ID", "ItemName", "Item Description", "Barcode", "Nos", "Gross Weight", "Stone Weight", "Net Weight", "Stone Price", "VA %", "Gold Type", "SaleType", "Gold Rate", "Total", "DmdWgt", "Stn S.price", "Pur. MC", "Sales MC", "Sales Amt"];
}

function dmdReturnOpColumns() {
  return ["X", "SL", "Item ID", "ItemName", "Item Description", "Barcode", "Nos", "Gross Weight", "Stone Weight", "Net Weight", "Stone Price", "VA %", "Gold Type", "SaleType", "Gold Rate", "Total", "Diamond Weight", "Stone Sales Price", "Purchase MC", "Sale MC", "Sale Amount"];
}

function dmdStoneEntryColumns() {
  return ["Color Type", "Color Scale", "Shape", "Cut", "Clarity", "Seive/Size", "Carat/Cent", "CT", "Pcs", "P.Rate", "S.Rate", "Add"];
}

function dmdStoneColumns() {
  return ["X", "Sl", "ICol", "Barcode", "Color Type", "Color Scale", "Shape", "Cut", "Clarity", "Seive / Size", "Carat / Cent", "CT", "Pcs", "Purchase Rate", "Selling Rate", "Amount"];
}

function dmdStonePurchaseEntryColumns() {
  return ["Item", "Nos", "Crt/Cnt", "CT", "Pcs", "Rate", "Sales Rate", "Total", "Color Type", "Color Scale", "Shape", "Cut", "Clarity", "Seive/Size", "Add"];
}

function dmdStonePurchaseColumns() {
  return ["X", "SL", "ID", "ItemName", "Nos", "Crt/Cnt", "Type", "Pcs", "Rate", "Sales Rate", "Total", "ColorType", "Scale", "Shape", "Cut", "Clarity", "Seive/Size"];
}

function salesEntryRow(line) {
  return [
    editCell("barcode", line.barcode || ""),
    editCell("itemName", line.itemName || ""),
    editCell("description", line.description || ""),
    editCell("qty", numericValue(line.qty, 0), "decimal"),
    editCell("gross", numericValue(line.gross), "decimal"),
    editCell("stone", numericValue(line.stone), "decimal"),
    editCell("wastage", numericValue(line.wastage), "decimal"),
    calcCell("net", grams(line.net)),
    editCell("stoneCharge", moneyValue(line.stoneCharge), "decimal"),
    editCell("rate", moneyValue(line.rate), "decimal"),
    editCell("va", numericValue(line.va, 2), "decimal"),
    editCell("mcPerGm", numericValue(line.mcPerGm, 2), "decimal"),
    autoCell("makingCharge", moneyValue(line.makingCharge), "decimal"),
    editCell("taxPct", numericValue(line.taxPct, 2), "decimal"),
    calcCell("tax", money(line.tax)),
    calcCell("amount", money(line.amount))
  ];
}

function salesRow(line, index) {
  return [
    deleteLineButton("sales", line.id),
    index + 1,
    line.barcode || "-",
    line.itemName,
    line.description,
    line.qty,
    grams(line.gross),
    grams(line.stone),
    grams(line.wastage),
    grams(line.net),
    money(line.stoneCharge),
    money(line.rate),
    line.va,
    money(line.makingCharge),
    numericValue(line.mcPerGm, 2),
    numericValue(line.vaDiscountPct, 2),
    money(line.vaAfterDiscount),
    money(line.metalValue),
    money(line.dmdAmount),
    money(line.discount),
    line.taxPct,
    money(line.tax),
    money(line.cessAmount),
    money(line.itemTotal),
    line.huid || "-",
    numericValue(line.cessPct, 2)
  ];
}

function salesOrderEntryRow(line) {
  return [
    editCell("itemCode", line.itemCode || line.barcode || ""),
    editCell("itemName", line.itemName || ""),
    editCell("qty", numericValue(line.qty, 0), "decimal"),
    editCell("gross", numericValue(line.gross), "decimal"),
    editCell("stone", numericValue(line.stone), "decimal"),
    editCell("wastage", numericValue(line.wastage), "decimal"),
    calcCell("net", grams(line.net)),
    editCell("stoneCharge", moneyValue(line.stoneCharge), "decimal"),
    editCell("rate", moneyValue(line.rate), "decimal"),
    editCell("va", numericValue(line.va, 2), "decimal"),
    editCell("mcPerGm", numericValue(line.mcPerGm, 2), "decimal"),
    autoCell("makingCharge", moneyValue(line.makingCharge), "decimal"),
    calcCell("amount", money(line.amount)),
    editCell("length", line.length || ""),
    editCell("breadth", line.breadth || ""),
    editCell("model", line.model || ""),
    addMarkerCell()
  ];
}

function salesOrderRow(line, index) {
  return [deleteLineButton("sales", line.id, "order"), index + 1, line.itemCode || line.barcode || "-", line.itemName, line.qty, grams(line.gross), grams(line.stone), grams(line.wastage), grams(line.net), money(line.stoneCharge), money(line.rate), line.va, numericValue(line.mcPerGm, 2), money(line.makingCharge), money(line.amount), line.length || "-", line.breadth || "-", line.model || "-"];
}

function salesOrderExchangeEntryRow(line) {
  return [
    selectCell("item", line.item || "OG", ["OG", "DMD", "SLV"]),
    editCell("itemName", line.itemName || "OLD GOLD"),
    editCell("qty", numericValue(line.qty, 0), "decimal"),
    editCell("gross", numericValue(line.gross), "decimal"),
    editCell("stone", numericValue(line.stone), "decimal"),
    editCell("mudLess", numericValue(line.mudLess), "decimal"),
    editCell("lessPct", numericValue(line.lessPct, 2), "decimal"),
    editCell("lessWeight", numericValue(line.lessWeight), "decimal"),
    editCell("touchPct", numericValue(line.touchPct, 2), "decimal"),
    editCell("touchLess", numericValue(line.touchLess), "decimal"),
    calcCell("net", grams(line.net)),
    editCell("stoneCharge", moneyValue(line.stoneCharge), "decimal"),
    editCell("rate", moneyValue(line.rate), "decimal"),
    calcCell("amount", money(line.itemTotal || line.amount)),
    addMarkerCell()
  ];
}

function salesOrderExchangeRow(line, index) {
  return [
    deleteLineButton("exchange", line.id, "order"),
    index + 1,
    line.itemName || line.item || "OLD GOLD",
    line.qty,
    grams(line.gross),
    grams(line.stone),
    grams(line.mudLess),
    numericValue(line.lessPct, 2),
    grams(line.lessWeight),
    numericValue(line.touchPct, 2),
    grams(line.touchLess),
    grams(line.net),
    money(line.stoneCharge),
    money(line.rate),
    money(line.amount || line.itemTotal),
    line.itemDescription || line.description || "-"
  ];
}

function salesOrderReturnEntryRow(line) {
  return [
    selectCell("item", line.item || "", ["", "GLD", "DMD", "SLV"]),
    editCell("itemName", line.itemName || ""),
    editCell("qty", numericValue(line.qty, 0), "decimal"),
    editCell("gross", numericValue(line.gross), "decimal"),
    editCell("stone", numericValue(line.stone), "decimal"),
    editCell("wastage", numericValue(line.wastage), "decimal"),
    calcCell("net", grams(line.net)),
    editCell("stoneCharge", moneyValue(line.stoneCharge), "decimal"),
    editCell("va", numericValue(line.va, 2), "decimal"),
    editCell("mcPerGm", numericValue(line.mcPerGm, 2), "decimal"),
    autoCell("makingCharge", moneyValue(line.makingCharge), "decimal"),
    editCell("rate", moneyValue(line.rate), "decimal"),
    editCell("taxPct", numericValue(line.taxPct, 2), "decimal"),
    calcCell("tax", money(line.tax)),
    calcCell("amount", money(line.amount || line.itemTotal)),
    addMarkerCell()
  ];
}

function salesOrderReturnRow(line, index) {
  return [
    deleteLineButton("return", line.id, "order"),
    index + 1,
    line.itemName || line.item || "-",
    line.qty,
    grams(line.gross),
    grams(line.stone),
    grams(line.wastage),
    grams(line.net),
    money(line.stoneCharge),
    numericValue(line.va, 2),
    numericValue(line.mcPerGm, 2),
    money(line.makingCharge),
    money(line.rate),
    numericValue(line.taxPct, 2),
    money(line.tax),
    money(line.itemTotal || line.amount),
    numericValue(line.cessPct, 2),
    money(line.cessAmount)
  ];
}

function exchangeEntryRow(line) {
  return [
    selectCell("item", line.item || "OG", ["OG", "DMD", "SLV"]),
    editCell("itemName", line.itemName || "OLD GOLD"),
    editCell("qty", numericValue(line.qty, 0), "decimal"),
    editCell("gross", numericValue(line.gross), "decimal"),
    editCell("stone", numericValue(line.stone), "decimal"),
    editCell("mudLess", numericValue(line.mudLess), "decimal"),
    editCell("lessPct", numericValue(line.lessPct, 2), "decimal"),
    editCell("lessWeight", numericValue(line.lessWeight), "decimal"),
    editCell("touchPct", numericValue(line.touchPct, 2), "decimal"),
    editCell("touchLess", numericValue(line.touchLess), "decimal"),
    calcCell("net", grams(line.net)),
    editCell("stoneCharge", moneyValue(line.stoneCharge), "decimal"),
    editCell("rateLessPct", numericValue(line.rateLessPct, 2), "decimal"),
    editCell("rate", moneyValue(line.rate), "decimal"),
    calcCell("amount", money(line.itemTotal || line.amount))
  ];
}

function exchangeRow(line, index) {
  return [deleteLineButton("exchange", line.id), index + 1, line.itemName, line.qty, grams(line.gross), grams(line.stone), grams(line.mudLess), line.lessPct, grams(line.lessWeight), line.touchPct, grams(line.touchLess), grams(line.net), money(line.stoneCharge), line.ratePct || line.rateLessPct || 0, money(line.rate), money(line.amount), line.itemDescription || line.description || "-"];
}

function exchangeRowScoped(line, index, scope) {
  return [deleteLineButton("exchange", line.id, scope), index + 1, line.itemName, line.qty, grams(line.gross), grams(line.stone), grams(line.mudLess), line.lessPct, grams(line.lessWeight), line.touchPct, grams(line.touchLess), grams(line.net), money(line.stoneCharge), line.ratePct || line.rateLessPct || 0, money(line.rate), money(line.amount), line.itemDescription || line.description || "-"];
}

function returnEntryRow(line) {
  return [
    selectCell("item", line.item || "", ["", "GLD", "DMD", "SLV"]),
    editCell("itemName", line.itemName || ""),
    editCell("description", line.description || ""),
    editCell("qty", numericValue(line.qty, 0), "decimal"),
    editCell("gross", numericValue(line.gross), "decimal"),
    editCell("stone", numericValue(line.stone), "decimal"),
    editCell("wastage", numericValue(line.wastage), "decimal"),
    calcCell("net", grams(line.net)),
    editCell("stoneCharge", moneyValue(line.stoneCharge), "decimal"),
    editCell("va", numericValue(line.va, 2), "decimal"),
    editCell("mcPerGm", numericValue(line.mcPerGm, 2), "decimal"),
    autoCell("makingCharge", moneyValue(line.makingCharge), "decimal"),
    editCell("rate", moneyValue(line.rate), "decimal"),
    editCell("taxPct", numericValue(line.taxPct, 2), "decimal"),
    calcCell("tax", money(line.tax)),
    calcCell("amount", money(line.amount)),
    "<span class=\"grid-output muted\">+</span>"
  ];
}

function returnRow(line, index) {
  return [index + 1, deleteLineButton("return", line.id), line.itemName, line.description || "-", line.qty, grams(line.gross), grams(line.stone), grams(line.wastage), grams(line.net), money(line.stoneCharge), line.va, numericValue(line.mcPerGm, 2), money(line.makingCharge), money(line.rate), line.taxPct, money(line.tax), money(line.itemTotal)];
}

function returnRowScoped(line, index, scope) {
  return [index + 1, deleteLineButton("return", line.id, scope), line.itemName, line.description || "-", line.qty, grams(line.gross), grams(line.stone), grams(line.wastage), grams(line.net), money(line.stoneCharge), line.va, numericValue(line.mcPerGm, 2), money(line.makingCharge), money(line.rate), line.taxPct, money(line.tax), money(line.itemTotal)];
}

function purchaseEntryRow(line) {
  return [
    selectCell("item", line.item || "", ["", "OG", "GLD", "DMD", "SLV"]),
    editCell("itemName", line.itemName || ""),
    editCell("qty", numericValue(line.qty, 0), "decimal"),
    editCell("gross", numericValue(line.gross), "decimal"),
    editCell("stone", numericValue(line.stone), "decimal"),
    editCell("mudLess", numericValue(line.mudLess), "decimal"),
    editCell("lessPct", numericValue(line.lessPct, 2), "decimal"),
    editCell("lessWeight", numericValue(line.lessWeight), "decimal"),
    editCell("touchPct", numericValue(line.touchPct, 2), "decimal"),
    editCell("touchLess", numericValue(line.touchLess), "decimal"),
    calcCell("net", grams(line.net)),
    editCell("stoneCharge", moneyValue(line.stoneCharge), "decimal"),
    editCell("rateLessPct", numericValue(line.rateLessPct, 2), "decimal"),
    editCell("rate", moneyValue(line.rate), "decimal"),
    editCell("taxPct", numericValue(line.taxPct, 2), "decimal"),
    calcCell("tax", money(line.tax)),
    calcCell("amount", money(line.itemTotal || line.amount)),
    "<span class=\"grid-output muted\">+</span>"
  ];
}

function purchaseRow(line, index) {
  return [deleteLineButton("exchange", line.id, "purchase"), index + 1, line.itemName, line.qty, grams(line.gross), grams(line.stone), grams(line.mudLess), line.lessPct, grams(line.lessWeight), line.touchPct, grams(line.touchLess), grams(line.net), money(line.stoneCharge), line.ratePct || line.rateLessPct || 0, money(line.rate), line.taxPct, money(line.tax), money(line.amount || line.itemTotal)];
}

function purchaseReturnEntryRow(line) {
  return [
    selectCell("item", line.item || "", ["", "OG", "GLD", "DMD", "SLV"]),
    editCell("itemName", line.itemName || ""),
    editCell("qty", numericValue(line.qty, 0), "decimal"),
    editCell("gross", numericValue(line.gross), "decimal"),
    editCell("stone", numericValue(line.stone), "decimal"),
    editCell("mudLess", numericValue(line.mudLess), "decimal"),
    editCell("lessPct", numericValue(line.lessPct, 2), "decimal"),
    editCell("lessWeight", numericValue(line.lessWeight), "decimal"),
    editCell("touchPct", numericValue(line.touchPct, 2), "decimal"),
    editCell("touchLess", numericValue(line.touchLess), "decimal"),
    calcCell("net", grams(line.net)),
    editCell("stoneCharge", moneyValue(line.stoneCharge), "decimal"),
    editCell("rate", moneyValue(line.rate), "decimal"),
    calcCell("amount", money(line.itemTotal || line.amount)),
    "<span class=\"grid-output muted\">+</span>"
  ];
}

function purchaseReturnRow(line, index) {
  return [index + 1, deleteLineButton("exchange", line.id, "purchase"), line.item || "", line.itemName, line.qty, grams(line.gross), grams(line.stone), grams(line.mudLess), line.lessPct, grams(line.lessWeight), line.touchPct, grams(line.touchLess), grams(line.net), money(line.stoneCharge), money(line.rate), money(line.amount || line.itemTotal)];
}

function defaultDirectPurchaseLine() {
  return normalizeDirectPurchaseLine({ qty: 1, gross: 0, stone: 0, rate: activeGoldRate(), stoneCharge: 0, mcPerGm: 0, taxPct: 0, cessPct: 0 });
}

function directPurchaseEntryRow(line) {
  return [
    selectCell("itemId", line.itemId || "", ["", "OG", "GLD", "DMD", "SLV"]),
    editCell("itemName", line.itemName || ""),
    editCell("qty", numericValue(line.qty, 0), "decimal"),
    editCell("gross", numericValue(line.gross), "decimal"),
    editCell("stone", numericValue(line.stone), "decimal"),
    calcCell("net", grams(line.net)),
    editCell("rate", moneyValue(line.rate), "decimal"),
    editCell("stoneCharge", moneyValue(line.stoneCharge), "decimal"),
    editCell("mcPerGm", moneyValue(line.mcPerGm), "decimal"),
    autoCell("totalMc", moneyValue(line.totalMc), "decimal"),
    editCell("taxPct", numericValue(line.taxPct, 2), "decimal"),
    calcCell("tax", money(line.tax)),
    calcCell("itemTotal", money(line.itemTotal)),
    "<span class=\"grid-output muted\">+</span>"
  ];
}

function directPurchaseRow(line, index) {
  return [
    deleteLineButton("directPurchase", line.id, "direct-purchase"),
    index + 1,
    line.itemName || line.itemId || "-",
    line.qty,
    grams(line.gross),
    grams(line.stone),
    grams(line.net),
    money(line.rate),
    money(line.stoneCharge),
    money(line.mcPerGm),
    money(line.totalMc),
    numericValue(line.taxPct, 2),
    money(line.tax),
    money(line.itemTotal),
    numericValue(line.cessPct, 2),
    money(line.cessAmount)
  ];
}

function directPurchaseReturnRow(line, index) {
  return [
    deleteLineButton("directPurchaseReturn", line.id, "direct-purchase-return"),
    index + 1,
    line.itemName || line.itemId || "-",
    line.qty,
    grams(line.gross),
    grams(line.stone),
    grams(line.net),
    money(line.rate),
    money(line.stoneCharge),
    money(line.mcPerGm),
    money(line.totalMc),
    numericValue(line.taxPct, 2),
    money(line.tax),
    money(line.itemTotal),
    numericValue(line.cessPct, 2),
    money(line.cessAmount)
  ];
}

function defaultDmdReturnLine() {
  return normalizeDmdReturnLine({ barcode: "", itemDescription: "", qty: 1, gross: 0, previousWeight: 0, diamondWtCent: 0, colourStoneWt: 0, touch: 75.5, rateRtgs: activeGoldRate(), crtCentRate: latestDiamondRate(), mcGrm: 0 });
}

function dmdReturnEntryRow(line) {
  return [
    editCell("barcode", line.barcode || ""),
    editCell("itemDescription", line.itemDescription || ""),
    editCell("qty", numericValue(line.qty, 0), "decimal"),
    editCell("gross", numericValue(line.gross), "decimal"),
    editCell("previousWeight", numericValue(line.previousWeight), "decimal"),
    editCell("diamondWtCent", numericValue(line.diamondWtCent), "decimal"),
    editCell("colourStoneWt", numericValue(line.colourStoneWt), "decimal"),
    calcCell("netWeight", grams(line.netWeight)),
    editCell("touch", numericValue(line.touch, 2), "decimal"),
    calcCell("pureWeight", grams(line.pureWeight)),
    editCell("rateRtgs", moneyValue(line.rateRtgs), "decimal"),
    editCell("crtCentRate", moneyValue(line.crtCentRate), "decimal"),
    autoCell("diamondAmount", moneyValue(line.diamondAmount), "decimal"),
    editCell("mcGrm", moneyValue(line.mcGrm), "decimal"),
    calcCell("makingCharge", money(line.makingCharge)),
    calcCell("amount", money(line.amount))
  ];
}

function dmdReturnRow(line, index) {
  return [deleteLineButton("dmdReturn", line.id, "dmd-return"), index + 1, line.barcode || "-", line.itemName || line.itemDescription || "-", line.qty, grams(line.gross), grams(line.previousWeight), grams(line.diamondWtCent), grams(line.colourStoneWt), grams(line.netWeight), numericValue(line.touch, 2), grams(line.pureWeight), money(line.rateRtgs), money(line.crtCentRate), money(line.diamondAmount), money(line.mcGrm), money(line.makingCharge), money(line.amount)];
}

function dmdWholeSalesClassicRow(line, index) {
  const preciousAmount = Number(line.previousWeight || 0) * Number(line.rateRtgs || 0);
  const colorStoneAmount = Number(line.colourStoneWt || 0) * Number(line.crtCentRate || 0);
  return [
    deleteLineButton("dmdWholeSales", line.id, "dmd-wholesale"),
    index + 1,
    line.barcode || "-",
    line.itemName || line.itemDescription || "-",
    line.qty,
    grams(line.gross),
    grams(line.previousWeight),
    grams(line.diamondWtCent),
    grams(line.colourStoneWt),
    grams(line.netWeight),
    numericValue(line.touch, 2),
    grams(line.pureWeight),
    money(line.rateRtgs),
    "RTGS",
    money(line.crtCentRate),
    money(line.diamondAmount),
    money(line.mcGrm),
    money(line.makingCharge),
    money(line.amount),
    line.barcode || "-",
    money(preciousAmount),
    money(colorStoneAmount)
  ];
}

function defaultDmdWholesaleLine() {
  return normalizeDmdWholesaleLine({ nos: 1, gross: 0, stone: 0, stonePrice: 0, va: 0, goldType: "22K", salesType: "Weight", goldRate: activeGoldRate(), dmdWgt: 0, stnSPrice: 0, purMc: 0, salesMc: 0 });
}

function defaultDiamondPurchaseReturnLine() {
  return normalizeDiamondPurchaseReturnLine({ nos: 1, gross: 0, stone: 0, type: "", stonePrice: latestDiamondRate(), goldType: "22K", goldRate: activeGoldRate(), dmdWgt: 0, purMc: 0, salesType: "Weight" });
}

function dmdWholesaleEntryRow(line) {
  return [
    editCell("itemId", line.itemId || ""),
    editCell("itemDescription", line.itemDescription || ""),
    editCell("nos", numericValue(line.nos, 0), "decimal"),
    editCell("gross", numericValue(line.gross), "decimal"),
    editCell("stone", numericValue(line.stone), "decimal"),
    editCell("stonePrice", moneyValue(line.stonePrice), "decimal"),
    editCell("va", numericValue(line.va, 2), "decimal"),
    selectCell("goldType", line.goldType || "22K", ["24K", "22K", "21K", "18K"]),
    selectCell("salesType", line.salesType || "Weight", ["Weight", "Nos"]),
    editCell("goldRate", moneyValue(line.goldRate), "decimal"),
    calcCell("total", money(line.total)),
    editCell("dmdWgt", numericValue(line.dmdWgt), "decimal"),
    editCell("stnSPrice", moneyValue(line.stnSPrice), "decimal"),
    editCell("purMc", moneyValue(line.purMc), "decimal"),
    editCell("salesMc", moneyValue(line.salesMc), "decimal"),
    calcCell("salesAmt", money(line.salesAmt)),
    "<span class=\"grid-output muted\">+</span>"
  ];
}

function diamondPurchaseReturnEntryRow(line) {
  return [
    editCell("itemId", line.itemId || ""),
    editCell("itemName", line.itemName || ""),
    editCell("barcode", line.barcode || ""),
    editCell("nos", numericValue(line.nos, 0), "decimal"),
    editCell("gross", numericValue(line.gross), "decimal"),
    editCell("stone", numericValue(line.stone), "decimal"),
    calcCell("netWeight", grams(line.netWeight)),
    selectCell("type", line.type || "", ["", "Ornament", "Loose Stone", "Diamond"]),
    editCell("stonePrice", moneyValue(line.stonePrice), "decimal"),
    selectCell("goldType", line.goldType || "22K", ["24K", "22K", "21K", "18K"]),
    editCell("goldRate", moneyValue(line.goldRate), "decimal"),
    calcCell("total", money(line.total)),
    editCell("dmdWgt", numericValue(line.dmdWgt), "decimal"),
    editCell("purMc", moneyValue(line.purMc), "decimal"),
    "<span class=\"grid-output muted\">+</span>"
  ];
}

function dmdWholesaleRow(line, index) {
  return [deleteLineButton("dmdWholesale", line.id, "dmd-wholesale"), index + 1, line.itemId || "-", line.itemName || "-", line.itemDescription || "-", line.barcode || "-", line.nos, grams(line.gross), grams(line.stone), grams(line.netWeight), money(line.stonePrice), numericValue(line.va, 2), line.goldType, line.salesType, money(line.goldRate), money(line.total), grams(line.dmdWgt), money(line.stnSPrice), money(line.purMc), money(line.salesMc), money(line.salesAmt)];
}

function dmdReturnOpRow(line, index) {
  return [deleteLineButton("dmdReturnOrnament", line.id, "dmd-return"), index + 1, line.itemId || "-", line.itemName || "-", line.itemDescription || "-", line.barcode || "-", line.nos, grams(line.gross), grams(line.stone), grams(line.netWeight), money(line.stonePrice), numericValue(line.va, 2), line.goldType, line.salesType, money(line.goldRate), money(line.total), grams(line.dmdWgt), money(line.stnSPrice), money(line.purMc), money(line.salesMc), money(line.salesAmt)];
}

function diamondPurchaseOrnamentRow(line, index) {
  return [deleteLineButton("diamondPurchaseOrnament", line.id, "diamond-purchase"), index + 1, line.itemId || "-", line.itemName || "-", line.itemDescription || "-", line.barcode || "-", line.nos, grams(line.gross), grams(line.stone), grams(line.netWeight), money(line.stonePrice), numericValue(line.va, 2), line.goldType, line.salesType, money(line.goldRate), money(line.total), grams(line.dmdWgt), money(line.stnSPrice), money(line.purMc), money(line.salesMc), money(line.salesAmt)];
}

function diamondPurchaseReturnOrnamentRow(line, index) {
  return [deleteLineButton("diamondPurchaseReturnOrnament", line.id, "diamond-purchase-return"), index + 1, line.itemId || "-", line.itemName || "-", line.barcode || "-", line.nos, grams(line.gross), grams(line.stone), grams(line.netWeight), money(line.stonePrice), line.goldType, money(line.goldRate), money(line.total), grams(line.dmdWgt), money(line.purMc), line.salesType || "-"];
}

function defaultDmdStoneLine() {
  return normalizeDmdStoneLine({ colorType: "", colorScale: "", shape: "", cut: "", clarity: "", sieveSize: "", caratCent: 0, ct: "Cnt", pcs: 0, purchaseRate: 0, sellingRate: latestDiamondRate() });
}

function dmdStoneEntryRow(line) {
  return [
    selectCell("colorType", line.colorType || "", ["", "White", "Color", "Birth Stone"]),
    selectCell("colorScale", line.colorScale || "", ["", "D", "E", "F", "G", "H"]),
    selectCell("shape", line.shape || "", ["", "Round", "Oval", "Pear", "Princess"]),
    selectCell("cut", line.cut || "", ["", "Excellent", "Very Good", "Good"]),
    selectCell("clarity", line.clarity || "", ["", "VVS", "VS", "SI"]),
    editCell("sieveSize", line.sieveSize || ""),
    editCell("caratCent", numericValue(line.caratCent), "decimal"),
    selectCell("ct", line.ct || "Cnt", ["Cnt", "Ct"]),
    editCell("pcs", numericValue(line.pcs, 0), "decimal"),
    editCell("purchaseRate", moneyValue(line.purchaseRate), "decimal"),
    editCell("sellingRate", moneyValue(line.sellingRate), "decimal"),
    "<span class=\"grid-output muted\">+</span>"
  ];
}

function dmdStonePurchaseEntryRow(line) {
  return [
    editCell("itemName", line.itemName || line.colorType || ""),
    editCell("nos", numericValue(line.nos || 1, 0), "decimal"),
    editCell("caratCent", numericValue(line.caratCent), "decimal"),
    selectCell("ct", line.ct || "Cnt", ["Cnt", "Ct"]),
    editCell("pcs", numericValue(line.pcs, 0), "decimal"),
    editCell("purchaseRate", moneyValue(line.purchaseRate), "decimal"),
    editCell("sellingRate", moneyValue(line.sellingRate), "decimal"),
    calcCell("amount", money(line.amount)),
    selectCell("colorType", line.colorType || "", ["", "White", "Color", "Birth Stone"]),
    selectCell("colorScale", line.colorScale || "", ["", "D", "E", "F", "G", "H"]),
    selectCell("shape", line.shape || "", ["", "Round", "Oval", "Pear", "Princess"]),
    selectCell("cut", line.cut || "", ["", "Excellent", "Very Good", "Good"]),
    selectCell("clarity", line.clarity || "", ["", "VVS", "VS", "SI"]),
    editCell("sieveSize", line.sieveSize || ""),
    "<span class=\"grid-output muted\">+</span>"
  ];
}

function dmdStoneRow(line, index) {
  const amount = Number(line.amount || line.caratCent * line.sellingRate || 0);
  return [deleteLineButton("dmdStone", line.id, "dmd-wholesale"), index + 1, line.colorType || "-", line.barcode || "-", line.colorType || "-", line.colorScale || "-", line.shape || "-", line.cut || "-", line.clarity || "-", line.sieveSize || "-", numericValue(line.caratCent), line.ct, line.pcs, money(line.purchaseRate), money(line.sellingRate), money(amount)];
}

function dmdReturnStoneRow(line, index) {
  const amount = Number(line.amount || line.caratCent * line.sellingRate || 0);
  return [deleteLineButton("dmdReturnStone", line.id, "dmd-return"), index + 1, line.colorType || "-", line.barcode || "-", line.colorType || "-", line.colorScale || "-", line.shape || "-", line.cut || "-", line.clarity || "-", line.sieveSize || "-", numericValue(line.caratCent), line.ct, line.pcs, money(line.purchaseRate), money(line.sellingRate), money(amount)];
}

function diamondPurchaseStoneRow(line, index) {
  const amount = Number(line.amount || line.caratCent * line.purchaseRate || 0);
  return [deleteLineButton("diamondPurchaseStone", line.id, "diamond-purchase"), index + 1, line.colorType || "-", line.barcode || "-", line.colorType || "-", line.colorScale || "-", line.shape || "-", line.cut || "-", line.clarity || "-", line.sieveSize || "-", numericValue(line.caratCent), line.ct, line.pcs, money(line.purchaseRate), money(line.sellingRate), money(amount)];
}

function diamondPurchaseReturnStoneRow(line, index) {
  const amount = Number(line.amount || line.caratCent * line.purchaseRate || 0);
  return [deleteLineButton("diamondPurchaseReturnStone", line.id, "diamond-purchase-return"), index + 1, line.colorType || "-", line.barcode || "-", line.colorType || "-", line.colorScale || "-", line.shape || "-", line.cut || "-", line.clarity || "-", line.sieveSize || "-", numericValue(line.caratCent), line.ct, line.pcs, money(line.purchaseRate), money(line.sellingRate), money(amount)];
}

function dmdStonePurchaseRow(line, index) {
  const amount = Number(line.amount || line.caratCent * line.purchaseRate || 0);
  return [
    deleteLineButton("dmdStonePurchase", line.id, "dmd-stone-purchase"),
    index + 1,
    line.itemId || line.colorType || "-",
    line.itemName || line.colorType || "-",
    line.nos || 1,
    numericValue(line.caratCent),
    line.ct || "Cnt",
    line.pcs,
    money(line.purchaseRate),
    money(line.sellingRate),
    money(amount),
    line.colorType || "-",
    line.colorScale || "-",
    line.shape || "-",
    line.cut || "-",
    line.clarity || "-",
    line.sieveSize || "-"
  ];
}

function deleteLineButton(section, id, scope = "sales") {
  return `<button class="line-delete" title="Delete item" data-action="delete-line" data-line-section="${section}" data-line-id="${id}" data-line-scope="${scope}">x</button>`;
}

function purchaseBill() {
  return state.bills.find((bill) => bill.type.toLowerCase().includes("purchase")) || state.bills[0];
}

function salesOrderBill() {
  state.salesOrders ||= [];
  if (!state.salesOrders.length) state.salesOrders.push(normalizeBill(structuredClone(seed.salesOrders[0])));
  return state.salesOrders[0];
}

function purchaseRows() {
  const bill = purchaseBill();
  const rows = bill?.sections?.exchange?.length ? bill.sections.exchange : [bill?.line].filter(Boolean);
  return rows.map((row) => normalizeBillLine({ ...row, item: row.item || "OG", itemName: row.itemName || "OLD GOLD", rateLessPct: row.rateLessPct || 0, taxPct: row.taxPct || 0 }, 0, bill, "purchase"));
}

function purchaseFinancials(rows) {
  const billAmount = sumLines(rows);
  return {
    billAmount,
    addition: 0,
    discount: 0,
    gstVat: rows.reduce((sum, row) => sum + Number(row.tax || 0), 0),
    cess: rows.reduce((sum, row) => sum + Number(row.cessAmount || 0), 0),
    tdsTcs: 0,
    invoiceTotal: billAmount,
    roundOff: 0,
    payment: billAmount,
    accountBalance: 0
  };
}

function dmdReturnFinancials(bill) {
  const ornamentAmount = (bill.ornamentLines || []).reduce((sum, line) => sum + Number(line.salesAmt || line.amount || 0), 0);
  const diamondAmount = (bill.diamondLines || []).reduce((sum, line) => sum + Number(line.amount || (line.caratCent * line.sellingRate) || 0), 0);
  const billAmount = ornamentAmount + diamondAmount;
  const taxable = billAmount + Number(bill.addition || 0) - Number(bill.discount || 0);
  const gst = taxable * (Number(bill.gstPct || bill.taxPct || 0) / 100);
  const invoiceTotal = taxable + gst;
  const cashPayment = Number(bill.cashPayment || bill.cash || 0);
  const balance = invoiceTotal - cashPayment;
  return { billAmount, addition: bill.addition, discount: bill.discount, diamondAmount, gst, invoiceTotal, cashPayment, balance };
}

function dmdWholesaleFinancials(bill) {
  const ornamentAmount = bill.ornamentLines.reduce((sum, line) => sum + Number(line.salesAmt || line.amount || 0), 0);
  const diamondAmount = bill.diamondLines.reduce((sum, line) => sum + Number(line.amount || (line.caratCent * line.sellingRate) || 0), 0);
  const billAmount = ornamentAmount + diamondAmount;
  const taxable = billAmount + Number(bill.addition || 0) - Number(bill.discount || 0);
  const gst = taxable * (Number(bill.gstPct || 0) / 100);
  const invoiceTotal = taxable + gst;
  const balance = invoiceTotal - Number(bill.cashPayment || 0);
  return { billAmount, addition: bill.addition, discount: bill.discount, diamondAmount, gst, invoiceTotal, cashPayment: bill.cashPayment, balance };
}

function diamondPurchaseFinancials(bill) {
  const ornamentAmount = (bill.ornamentLines || []).reduce((sum, line) => sum + Number(line.salesAmt || line.amount || 0), 0);
  const diamondAmount = (bill.diamondLines || []).reduce((sum, line) => sum + Number(line.amount || (line.caratCent * line.purchaseRate) || 0), 0);
  const billAmount = ornamentAmount + diamondAmount;
  const taxable = Math.max(0, billAmount + Number(bill.addition || 0) - Number(bill.discount || 0));
  const tcs = taxable * (Number(bill.tcsPct || 0) / 100);
  const tds = taxable * (Number(bill.tdsPct || 0) / 100);
  const gst = taxable * (Number(bill.gstPct || 0) / 100);
  const invoiceTotal = taxable + tcs + gst - tds;
  const balance = invoiceTotal - Number(bill.cashPayment || 0);
  return { billAmount, addition: bill.addition, discount: bill.discount, diamondAmount, tcs, tds, gst, invoiceTotal, cashPayment: bill.cashPayment, balance };
}

function diamondPurchaseReturnFinancials(bill) {
  const ornamentAmount = (bill.ornamentLines || []).reduce((sum, line) => sum + Number(line.total || line.amount || 0), 0);
  const diamondAmount = (bill.diamondLines || []).reduce((sum, line) => sum + Number(line.amount || (line.caratCent * line.purchaseRate) || 0), 0);
  const billAmount = ornamentAmount + diamondAmount;
  const taxable = Math.max(0, billAmount + Number(bill.addition || 0) - Number(bill.discount || 0));
  const gst = taxable * (Number(bill.gstPct || 0) / 100);
  const invoiceTotal = taxable + gst;
  const balance = invoiceTotal - Number(bill.cashPayment || 0);
  return { billAmount, addition: bill.addition, discount: bill.discount, diamondAmount, gst, invoiceTotal, cashPayment: bill.cashPayment, balance };
}

function dmdStonePurchaseFinancials(bill) {
  const billAmount = (bill.lines || []).reduce((sum, line) => sum + Number(line.amount || (line.caratCent * line.purchaseRate) || 0), 0);
  const addition = Number(bill.addition || 0);
  const discount = Number(bill.discount || 0);
  const invoiceTotal = Math.max(0, billAmount + addition - discount);
  const cashPayment = Number(bill.cashPayment || 0);
  const balance = invoiceTotal - cashPayment;
  return { billAmount, addition, discount, invoiceTotal, cashPayment, balance };
}

function directPurchaseFinancials(bill) {
  const rows = bill?.lines || [];
  const billAmount = rows.reduce((sum, line) => sum + Number(line.itemTotal || line.amount || 0), 0);
  const gstVat = rows.reduce((sum, line) => sum + Number(line.tax || 0), 0);
  const addition = Number(bill?.addition || 0);
  const discount = Number(bill?.discount || 0);
  const cess = Number(bill?.cess || 0) + rows.reduce((sum, line) => sum + Number(line.cessAmount || 0), 0);
  const subTotal = Math.max(0, billAmount + addition - discount + cess);
  const roundOff = Number(bill?.roundOff || 0);
  const invoiceTotal = subTotal + roundOff;
  const payment = Number(bill?.cashPayment || 0);
  const accountBalance = invoiceTotal - payment;
  return { billAmount, addition, discount, gstVat, cess, invoiceTotal, roundOff, payment, accountBalance };
}

function dmdWholeSalesClassicFinancials(bill) {
  const salesTotal = (bill.lines || []).reduce((sum, line) => sum + Number(line.amount || 0), 0);
  const gstAmount = salesTotal * (Number(bill.gstPct || bill.taxPct || 3) / 100);
  const subTotal = salesTotal + Number(bill.addition || 0) - Number(bill.discount || 0);
  const billAmount = subTotal + gstAmount + Number(bill.tdsTcs || 0);
  const cash = Number(bill.cash || bill.cashPayment || 0);
  const balance = billAmount - cash;
  return { salesTotal, certification: 0, huidCharge: 0, gstAmount, addition: bill.addition, discount: bill.discount, subTotal, tdsTcs: bill.tdsTcs || 0, billAmount, cash, balance };
}

function diamondPurchaseTotals(totals) {
  return `
    <div class="transaction-bottom-grid dmd-bottom diamond-purchase-bottom">
      <div></div>
      <div></div>
      <div class="adjustments total-block">
        ${readout("Bill Amount", money(totals.billAmount))}
        ${readout("Addition", money(totals.addition))}
        ${readout("Discount", money(totals.discount))}
        ${readout("Diamond Amount", money(totals.diamondAmount))}
        ${readout("TCS", money(totals.tcs))}
        ${readout("TDS", money(totals.tds))}
        ${readout("Gst", money(totals.gst))}
        ${readout("Invoice Total", money(totals.invoiceTotal))}
        ${readout("Cash Payment", money(totals.cashPayment))}
        ${readout("Balance", money(totals.balance))}
      </div>
    </div>
  `;
}

function diamondPurchaseReturnTotals(totals) {
  return `
    <div class="transaction-bottom-grid dmd-bottom diamond-purchase-bottom">
      <div></div>
      <div></div>
      <div class="adjustments total-block">
        ${readout("Bill Amount", money(totals.billAmount))}
        ${readout("Addition", money(totals.addition))}
        ${readout("Discount", money(totals.discount))}
        ${readout("Diamond Amount", money(totals.diamondAmount))}
        ${readout("Gst", money(totals.gst))}
        ${readout("Invoice Total", money(totals.invoiceTotal))}
        ${readout("Cash Payment", money(totals.cashPayment))}
        ${readout("Balance", money(totals.balance))}
      </div>
    </div>
  `;
}

function dmdStonePurchaseTotals(totals) {
  return `
    <div class="transaction-bottom-grid dmd-bottom dmd-stone-purchase-bottom">
      <div></div>
      <div></div>
      <div class="adjustments total-block">
        ${readout("Bill Amount", money(totals.billAmount))}
        ${readout("Addition", money(totals.addition))}
        ${readout("Discount", money(totals.discount))}
        ${readout("Invoice Total", money(totals.invoiceTotal))}
        ${readout("Cash Payment", money(totals.cashPayment))}
        ${readout("Balance", money(totals.balance))}
      </div>
    </div>
  `;
}

function directPurchaseTotals(totals) {
  return `
    <div class="transaction-bottom-grid purchase-bottom direct-purchase-bottom">
      <div class="adjustments">
        ${readout("Bill Amount", money(totals.billAmount))}
        ${readout("Addition", money(totals.addition))}
        ${readout("Discount", money(totals.discount))}
        ${readout("GST / VAT", money(totals.gstVat))}
        ${readout("Cess Amt", money(totals.cess))}
      </div>
      <div class="purchase-payment-lines">
        <input value="0" />
        <input value="0.000" />
        <input value="0.000" />
        <input value="0.000" />
      </div>
      <div class="adjustments total-block">
        ${readout("Invoice Total", money(totals.invoiceTotal))}
        ${readout("Round off", money(totals.roundOff))}
        ${readout("Account Balance", money(totals.accountBalance))}
        ${readout("Cash Payment", money(totals.payment))}
        ${readout("Account Balance", money(totals.accountBalance))}
      </div>
    </div>
  `;
}

function dmdReturnTotals(totals) {
  return `
    <div class="transaction-bottom-grid dmd-bottom">
      <div></div>
      <div class="adjustments">
        ${readout("Sales Total", money(totals.salesTotal))}
        ${readout("Certification", money(totals.certification))}
        ${readout("HUID Charge", money(totals.huidCharge))}
        ${readout("GST Amount", money(totals.gstAmount))}
      </div>
      <div class="adjustments">
        ${readout("Addition", money(totals.addition))}
        ${readout("Discount", money(totals.discount))}
        ${readout("Sub Total", money(totals.subTotal))}
        ${readout("TDS/TCS", money(totals.tdsTcs))}
      </div>
      <div class="adjustments total-block">
        ${readout("Bill Amount", money(totals.billAmount))}
        ${readout("Cash", money(totals.cash))}
        ${readout("Balance", money(totals.balance))}
      </div>
    </div>
  `;
}

function dmdWholesaleTotals(totals) {
  return `
    <div class="transaction-bottom-grid dmd-bottom">
      <div></div>
      <div></div>
      <div class="adjustments total-block">
        ${readout("Bill Amount", money(totals.billAmount))}
        ${readout("Addition", money(totals.addition))}
        ${readout("Discount", money(totals.discount))}
        ${readout("Diamond Amount", money(totals.diamondAmount))}
        ${readout("Gst", money(totals.gst))}
        ${readout("Invoice Total", money(totals.invoiceTotal))}
        ${readout("Cash Payment", money(totals.cashPayment))}
        ${readout("Balance", money(totals.balance))}
      </div>
    </div>
  `;
}

function returnTotals(returnTotal) {
  return `
    <div class="transaction-bottom-grid return-bottom">
      <div class="adjustments">
        ${readout("Return Total", money(returnTotal))}
        ${readout("GST/VAT", money(0))}
        ${readout("Addition", money(0))}
        ${readout("Discount", money(0))}
      </div>
      <div></div>
      <div class="adjustments total-block">
        ${readout("Bill Amount", money(returnTotal))}
        ${readout("Cash Paid", money(returnTotal))}
        ${readout("Balance", money(0))}
      </div>
    </div>
  `;
}

function salesOrderTotals(order) {
  const financials = billFinancials(order);
  const advanceSummary = orderAdvanceSummary(order);
  const advance = advanceSummary.netAdvance;
  return `
    <div class="transaction-bottom-grid order-bottom">
      <div class="adjustments">
        ${readout("Quotation Return", money(financials.returnTotal))}
        ${readout("Quotation Exchange", money(financials.exchangeTotal))}
        <label class="readout editable-readout"><span>Due Date</span><span class="field-pair"><input value="0" /><input type="date" value="${toDateInputValue(order.dueDate)}" /></span></label>
      </div>
      <div class="adjustments">
        ${cardReadout(money(order.adjustments?.card || 0), "order")}
        ${readout("Original Advance", money(order.paymentBreakup?.cash || 0))}
        ${readout("Available Advance", money(advance))}
      </div>
      <div class="adjustments">
        <label class="readout editable-readout"><span>Tax%</span><span class="field-pair"><input value="${numericValue(order.line?.taxPct || 0, 2)}" /><input value="${moneyValue(financials.taxTotal)}" readonly /></span></label>
      </div>
      <div class="adjustments total-block">
        ${readout("Quotation Total", money(financials.invoiceTotal))}
        ${readout("Customer Deposit", money(advance))}
        ${readout("Stock Impact", "None")}
        ${readout("Refunded", money(advanceSummary.advanceRefund))}
        ${readout("Quote Less Advance", money(advanceSummary.quoteBalance))}
      </div>
    </div>
  `;
}

function purchaseTotals(totals, showTaxExtras) {
  return `
    <div class="transaction-bottom-grid purchase-bottom">
      <div class="adjustments">
        ${readout("Bill Amount", money(totals.billAmount))}
        ${readout("Addition", money(totals.addition))}
        ${readout("Discount", money(totals.discount))}
        ${readout("GST / VAT", money(totals.gstVat))}
        ${showTaxExtras ? readout("Cess Amt", money(totals.cess)) + readout("TDS/TCS", money(totals.tdsTcs)) : ""}
      </div>
      <div class="purchase-payment-lines">
        <input />
        <input />
        <input />
        <input />
        <select><option>Cash in Hand</option><option>Scheme Cash</option></select>
        <select><option>Canara Bank Edak</option><option>Federal Bank Edak</option><option>Cash</option></select>
      </div>
      <div class="adjustments total-block">
        ${readout("Invoice Total", money(totals.invoiceTotal))}
        ${readout("Round off", money(totals.roundOff))}
        ${readout(showTaxExtras ? "Payment" : "Cash Received", money(totals.payment))}
        ${readout(showTaxExtras ? "Account Balance" : "Ledger Balance", money(totals.accountBalance))}
      </div>
    </div>
  `;
}

function purchaseReturnTotals(totals) {
  return `
    <div class="transaction-bottom-grid purchase-return-bottom">
      <div class="adjustments">
        ${readout("Bill Amount", money(totals.billAmount))}
        ${readout("Addition", money(totals.addition))}
        ${readout("Discount", money(totals.discount))}
        ${readout("GST / VAT", money(totals.gstVat))}
      </div>
      <div class="purchase-payment-lines">
        <input />
        <input />
        <input />
        <input />
        <input />
      </div>
      <div class="adjustments total-block">
        ${readout("Invoice Total", money(totals.invoiceTotal))}
        ${readout("Account", money(totals.accountBalance))}
        ${readout("Cash Received", money(totals.payment))}
        ${readout("Ledger Balance", money(totals.accountBalance))}
      </div>
    </div>
  `;
}

function billingTotals(bill) {
  if (!bill) return "";
  const financials = billFinancials(bill);
  const adj = {
    ...bill.adjustments,
    salesReturn: financials.returnTotal,
    exchange: financials.exchangeTotal,
    totalAdjustments: financials.totalAdjustments
  };
  const totals = {
    ...bill.totals,
    salesTotal: financials.salesTotal,
    discountTotal: financials.discountTotal,
    taxTotal: financials.taxTotal,
    invoiceTotal: financials.invoiceTotal,
    cashReceived: financials.cashReceived,
    balance: financials.balance,
    refundAmount: financials.refundAmount
  };
  return `
    <div class="billing-bottom">
      <div class="adjustments">
        <h4>Adjustments</h4>
        ${readout("Sales Return", money(adj.salesReturn))}
        ${readout("Exchange", money(adj.exchange))}
        ${readout("SalesORD (F5)", money(adj.salesOrder))}
        ${removableReadout("Coupon", money(adj.coupon), "remove-discount", "coupon")}
        ${cardReadout(money(adj.card))}
        ${readout("Discount Total", money(financials.discountTotal))}
        ${readout("Total Deductions", money(adj.totalAdjustments))}
      </div>
      <div class="adjustments">
        <h4>Invoice</h4>
        ${readout("Sales Total", money(totals.salesTotal))}
        ${readout("Exchange Total", signedMoney(-adj.exchange))}
        ${readout("Return Total", signedMoney(-adj.salesReturn))}
        ${readout("DMD Amt", money(totals.dmdAmount))}
        ${readout("KFC,GST Amo", money(totals.kfcGstAmount))}
        ${readout("Addition", money(totals.addition))}
        ${removableReadout("Flat Disc", money(totals.flatDiscount), "remove-discount", "flatDiscount")}
        ${readout("Rate Difference", money(totals.rateDifference))}
        ${readout("Tax Total", money(financials.taxTotal))}
      </div>
      <div class="adjustments total-block">
        <h4>Payment</h4>
        ${readout("Invoice Total", signedMoney(totals.invoiceTotal))}
        ${readout("Status", financials.paymentLabel)}
        ${readout("Ledger Balance", money(totals.ledgerBalance))}
        ${readout("Bill Amount (R.off)", money(totals.billAmountRoundOff))}
        ${readout("Cash Received", money(totals.cashReceived))}
        ${financials.refundAmount > 0 ? readout("Refund Amount", money(financials.refundAmount)) : ""}
        ${readout("Balance", money(totals.balance))}
      </div>
    </div>
  `;
}

function billRow(bill) {
  const financials = billFinancials(bill);
  return [
    bill.entryNo,
    bill.billNo,
    bill.date,
    bill.staffId || "-",
    bill.staffName || "-",
    bill.customerId,
    bill.customer,
    money(financials.salesTotal),
    money(financials.exchangeTotal),
    money(financials.returnTotal),
    signedMoney(financials.invoiceTotal),
    money(financials.cashReceived),
    money(financials.balance)
  ];
}

function sumLines(rows = []) {
  return rows.reduce((sum, row) => row.inactive ? sum : sum + Number(row.amount || row.itemTotal || 0), 0);
}

function sumField(rows = [], field) {
  return rows.reduce((sum, row) => row.inactive ? sum : sum + Number(row[field] || 0), 0);
}

function invoicePreview(bill) {
  if (!bill) return `<p class="soft-note">No bill available yet.</p>`;
  const line = bill.line;
  return `
    <article class="invoice-copy" id="printableInvoice">
      <header>
        <div>
          <h2>MT GOLD LAND</h2>
          <p>M.T Plaza, Ooty Road</p>
          <p>Customer Copy</p>
        </div>
        <div>
          <strong>${bill.id}</strong>
          <span>${bill.date} ${bill.time}</span>
        </div>
      </header>
      <section class="invoice-meta">
        <span><strong>Customer</strong>${bill.customer}</span>
        <span><strong>Handled By</strong>${bill.staffName || "-"} (${bill.staffId || "-"})</span>
        <span><strong>Phone</strong>${bill.phone || "-"}</span>
        <span><strong>Address</strong>${bill.address || "-"}</span>
        <span><strong>Rate Used</strong>${bill.rateSnapshot}</span>
        <span><strong>Payment</strong>${bill.paymentMode || "Cash"}</span>
      </section>
      ${table(["Item", "Qty", "Gross", "Stone", "Wastage", "Net", "Rate", "VA%", "Making Charge", "Tax", "Amount"], [[line.itemName, line.qty, grams(line.gross), grams(line.stone), grams(line.wastage), grams(line.net), money(line.rate), line.va, money(line.makingCharge), money(line.tax), money(line.amount)]])}
      <footer>
        <div>
          <span>Discount</span>
          <strong>${money(bill.discount)}</strong>
        </div>
        <div>
          <span>Tax</span>
          <strong>${money(bill.taxAmount)}</strong>
        </div>
        <div>
          <span>Bill Amount</span>
          <strong>${money(bill.amount)}</strong>
        </div>
        <div>
          <span>Cash Received</span>
          <strong>${money(bill.paid)}</strong>
        </div>
        <div>
          <span>Balance</span>
          <strong>${money(bill.balance)}</strong>
        </div>
      </footer>
      <p class="invoice-note">Thank you. Please keep this bill for exchange, return, and service reference.</p>
    </article>
  `;
}

function metric(label, value, hint) {
  return `<article class="metric"><span>${label}</span><strong>${value}</strong><small>${hint}</small></article>`;
}

function workflow(title, body, action) {
  return `<button class="workflow" data-action="${action}"><strong>${title}</strong><span>${body}</span></button>`;
}

function reportCard(title, body, action = "export-report") {
  return `<article class="report-card"><strong>${title}</strong><span>${body}</span><button class="text-button" data-action="${action}">Open</button></article>`;
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function menuSearchItems() {
  const items = [
    { label: "Dashboard", module: "Dashboard", group: "Main Menu", target: "nav:Dashboard" },
    { label: "Schemes", module: "Schemes", group: "Main Menu", target: "nav:Schemes" },
    { label: "Reports", module: "Reports", group: "Main Menu", target: "nav:Reports" },
    ...SALES_ITEMS.map((label) => ({ label, module: "Sales", group: "Sales", target: `sales:${label}` })),
    ...PURCHASE_ITEMS.map((label) => ({ label, module: "Purchase", group: "Purchase", target: `purchase:${label}` })),
    ...STOCK_ITEMS.map((label) => ({ label, module: "Stock", group: "Stock", target: `stock:${label}` })),
    ...WORK_ORDER_ITEMS.map((label) => ({ label, module: "Work Orders", group: "Work Orders", target: `work:${label}` })),
    ...ACCOUNT_ITEMS.map((label) => ({ label, module: "Accounts", group: "Accounts", target: `account:${label}` })),
    ...MANAGEMENT_ITEMS.map((label) => ({ label, module: "Management", group: "Management", target: `management:${label}` }))
  ];
  REPORT_MENU_GROUPS.forEach((group) => {
    group.items.forEach((label) => {
      items.push({ label, module: "Reports", group: group.title, target: `report:${label}` });
    });
  });
  return items;
}

function filteredMenuItems(query, limit = 8) {
  const clean = String(query || "").trim().toLowerCase();
  if (!clean) return [];
  return menuSearchItems()
    .filter((item) => `${item.label} ${item.module} ${item.group}`.toLowerCase().includes(clean))
    .slice(0, limit);
}

function globalSearchResults() {
  const matches = filteredMenuItems(globalMenuSearch, 6);
  if (globalMenuSearch.trim().length < 2 || !matches.length) return "";
  return `
    <div class="command-results">
      ${matches.map((item, index) => `
        <button type="button" class="command-result" data-menu-target="${escapeHtml(item.target)}">
          <span>${escapeHtml(item.label)}</span>
          <small>${escapeHtml(item.module)} / ${escapeHtml(item.group)}</small>
        </button>
      `).join("")}
    </div>
  `;
}

function openMenuTarget(target) {
  const [kind, ...rest] = String(target || "").split(":");
  const value = rest.join(":");
  if (!kind || !value) return;
  globalMenuSearch = "";
  if (kind === "nav") {
    active = value;
  }
  if (kind === "sales") {
    active = "Sales";
    expandedNavGroups.add("Sales");
    salesView = value;
  }
  if (kind === "purchase") {
    active = "Purchase";
    expandedNavGroups.add("Purchase");
    purchaseView = value;
  }
  if (kind === "stock") {
    active = "Stock";
    expandedNavGroups.add("Stock");
    stockView = value;
  }
  if (kind === "work") {
    active = "Work Orders";
    expandedNavGroups.add("Work Orders");
    workOrderView = value;
  }
  if (kind === "account") {
    active = "Accounts";
    expandedNavGroups.add("Accounts");
    accountView = value;
  }
  if (kind === "management") {
    active = "Management";
    expandedNavGroups.add("Management");
    managementView = value;
  }
  if (kind === "report") {
    selectReport(value);
  }
  render();
}

function selectReport(name) {
  active = "Reports";
  selectedReport = name || "Day Summary";
  recentReportItems = [selectedReport, ...recentReportItems.filter((item) => item !== selectedReport)].slice(0, 5);
}

function field(label, value) {
  return `<label><span>${label}</span><input value="${value}" /></label>`;
}

function table(headers, rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
        <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function tableWithRowAttrs(headers, rowSpecs) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
        <tbody>${rowSpecs.map((row) => `<tr ${row.attrs || ""}>${row.cells.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function rateTimeline() {
  return `<div class="timeline">${state.rates.slice().reverse().map((r) => `<article><time>${r.time}</time><div><strong>${r.type} ${r.grade} ${money(r.price)}</strong><span>${r.reason} by ${r.user}</span></div></article>`).join("")}</div>`;
}

function openModal(title, description, body, submitText, handlerName) {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop">
      <form class="modal" data-form="${handlerName}">
        <div class="modal-titlebar">
          <div>
            <p class="eyebrow">Goldland master window</p>
            <h2>${title}</h2>
            <p>${description}</p>
          </div>
          <button type="button" class="icon-close" data-action="close-modal">x</button>
        </div>
        <div class="form-grid">${body}</div>
        <footer>
          <button type="button" class="secondary" data-action="close-modal">Cancel</button>
          <button class="primary">${submitText}</button>
        </footer>
      </form>
    </div>
  `);
  document.querySelector(`[data-form="${handlerName}"]`).addEventListener("submit", formHandlers[handlerName]);
  document.querySelectorAll("[data-action='close-modal']").forEach((button) => button.addEventListener("click", closeModal));
  if (handlerName === "bill") setupBillModal();
}

function input(name, label, value = "", type = "text", extra = "") {
  return `<label><span>${label}</span><input name="${name}" type="${type}" value="${value}" ${extra} /></label>`;
}

function select(name, label, options, selectedValue = "") {
  return `<label><span>${label}</span><select name="${name}">${options.map((option) => `<option ${String(option) === String(selectedValue) ? "selected" : ""}>${option}</option>`).join("")}</select></label>`;
}

function bindEvents() {
  document.getElementById("loginForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const password = new FormData(event.currentTarget).get("password");
    if (password !== ACCESS_PASSWORD) {
      toast("Wrong password.");
      return;
    }
    authenticated = true;
    sessionStorage.setItem("goldland-authenticated", "true");
    state.audit.unshift(audit("Unlocked Goldland system"));
    saveState();
    render();
  });

  document.querySelector("[data-global-menu-search]")?.addEventListener("input", (event) => {
    globalMenuSearch = event.currentTarget.value;
    renderAndFocus("[data-global-menu-search]");
  });

  document.querySelector("[data-global-menu-search]")?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const first = filteredMenuItems(globalMenuSearch, 1)[0];
    if (!first) return;
    event.preventDefault();
    openMenuTarget(first.target);
  });

  document.querySelectorAll("[data-menu-target]").forEach((button) => {
    button.addEventListener("click", () => openMenuTarget(button.dataset.menuTarget));
  });

  document.querySelector("[data-report-search]")?.addEventListener("input", (event) => {
    reportSearch = event.currentTarget.value;
    renderAndFocus("[data-report-search]");
  });

  document.querySelectorAll("[data-report-item]").forEach((button) => {
    button.addEventListener("click", () => {
      selectReport(button.dataset.reportItem);
      render();
    });
  });

  document.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      const clicked = button.dataset.nav;
      if (EXPANDABLE_NAVS.has(clicked)) {
        if (expandedNavGroups.has(clicked)) {
          expandedNavGroups.delete(clicked);
        } else {
          expandedNavGroups.add(clicked);
        }
      }
      active = clicked;
      render();
    });
  });

  document.querySelectorAll("[data-management]").forEach((button) => {
    button.addEventListener("click", () => {
      active = "Management";
      expandedNavGroups.add("Management");
      managementView = button.dataset.management;
      render();
    });
  });

  document.querySelectorAll("[data-item-category]").forEach((button) => {
    button.addEventListener("click", () => {
      active = "Management";
      expandedNavGroups.add("Management");
      managementView = "Item Category";
      itemCategoryView = button.dataset.itemCategory;
      render();
    });
  });

  document.querySelectorAll("[data-miscellaneous]").forEach((button) => {
    button.addEventListener("click", () => {
      active = "Management";
      expandedNavGroups.add("Management");
      managementView = "Miscellaneous";
      miscellaneousView = button.dataset.miscellaneous;
      render();
    });
  });

  document.querySelectorAll("[data-sales-section]").forEach((button) => {
    button.addEventListener("click", () => {
      active = "Sales";
      expandedNavGroups.add("Sales");
      salesView = button.dataset.salesSection;
      render();
    });
  });

  document.querySelectorAll("[data-purchase-section]").forEach((button) => {
    button.addEventListener("click", () => {
      active = "Purchase";
      expandedNavGroups.add("Purchase");
      purchaseView = button.dataset.purchaseSection;
      render();
    });
  });

  document.querySelectorAll("[data-stock-section]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.stockSection === OPENING_STOCK_VIEW) {
        openOpeningStockEntry();
        return;
      }
      active = "Stock";
      expandedNavGroups.add("Stock");
      stockView = button.dataset.stockSection;
      render();
    });
  });

  document.querySelectorAll("[data-work-section]").forEach((button) => {
    button.addEventListener("click", () => {
      active = "Work Orders";
      expandedNavGroups.add("Work Orders");
      workOrderView = button.dataset.workSection;
      if (workOrderView === "Smith") smithWorkView = "Smith";
      if (workOrderView === "Jeweller") smithWorkView = "Jeweller";
      if (workOrderView === "Sample") sampleWorkView = "Sample Issue";
      if (workOrderView === "Complimentary Item" && !["Complimentary Item Purchase", "Complimentary Item Issue"].includes(complimentaryView)) {
        complimentaryView = "Complimentary Item Purchase";
      }
      render();
    });
  });

  document.querySelectorAll("[data-account-section]").forEach((button) => {
    button.addEventListener("click", () => {
      active = "Accounts";
      expandedNavGroups.add("Accounts");
      accountView = button.dataset.accountSection;
      render();
    });
  });

  document.querySelectorAll("[data-complimentary-section]").forEach((button) => {
    button.addEventListener("click", () => {
      active = "Work Orders";
      expandedNavGroups.add("Work Orders");
      workOrderView = "Complimentary Item";
      complimentaryView = button.dataset.complimentarySection;
      render();
    });
  });

  document.querySelectorAll("[data-billing-view]").forEach((button) => {
    button.addEventListener("click", () => {
      billingView = button.dataset.billingView;
      render();
    });
  });

  document.querySelectorAll("[data-order-view]").forEach((button) => {
    button.addEventListener("click", () => {
      salesOrderView = button.dataset.orderView;
      render();
    });
  });

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleAction(button.dataset.action, button));
  });

  document.querySelectorAll("[data-master-kind]").forEach((target) => {
    target.addEventListener("dblclick", () => {
      selectManagementRecord(target.dataset.masterKind, target.dataset.masterId, target.dataset.masterGroup);
    });
  });

  document.querySelectorAll(".inline-master-form").forEach((form) => {
    form.addEventListener("submit", formHandlers[form.dataset.form]);
  });

  document.querySelectorAll("[data-card-transactions]").forEach((target) => {
    target.addEventListener("dblclick", () => openCardTransactionsModal(target));
  });

  document.querySelectorAll("[data-classic-subtab]").forEach((button) => {
    button.addEventListener("click", () => {
      const area = button.closest(".classic-entry-area");
      const panel = button.dataset.classicSubtab;
      area?.querySelectorAll("[data-classic-subtab]").forEach((item) => item.classList.toggle("active", item === button));
      area?.querySelectorAll("[data-classic-panel]").forEach((target) => {
        target.classList.toggle("is-hidden", target.dataset.classicPanel !== panel);
      });
    });
  });

  setupItemMasterModal();
  setupEntryGridCalculations();
  setupSavedLineEditing();
  setupBillEnterNavigation();
  setupBillCustomerLookup();
  setupDmdReturnScreens();
  setupOrderAdvanceScreens();
  setupSmithWorkScreens();
  setupOpeningStockScreen();
  setupStockAdjustmentScreen();
  setupGoldDepositScreens();
  setupSampleScreens();
  setupServiceScreens();
  setupPolishingScreen();
  setupRefineryScreens();
  setupComplimentaryScreens();
  setupCustomVoucherScreen();
  setupBillwiseScreens();
  setupBankTransactionScreens();
  setupPdcScreens();
  setupCashVoucherScreens();
  setupJournalVoucherScreen();
  setupDirectEntryScreen();
  setupExpenseEntryScreen();

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      document.getElementById("search")?.focus();
    }
  }, { once: true });
}

function setupBillwiseScreens() {
  document.querySelectorAll("[data-billwise-field]").forEach((field) => {
    const update = () => updateBillwiseField(field.dataset.billwiseType, field.dataset.billwiseField, field.type === "radio" ? field.value : field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      if (field.type === "radio" && !field.checked) return;
      update();
      render();
    });
  });

  document.querySelectorAll("[data-billwise-line-field]").forEach((field) => {
    const update = () => updateBillwiseLine(field.dataset.billwiseType, Number(field.dataset.billwiseLine), field.dataset.billwiseLineField, field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
    field.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addBillwiseRow(field.dataset.billwiseType);
      }
    });
  });
}

function setupBankTransactionScreens() {
  document.querySelectorAll("[data-bank-field]").forEach((field) => {
    const update = () => updateBankTransactionField(field.dataset.bankType, field.dataset.bankField, field.type === "checkbox" ? field.checked : field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
  });

  document.querySelectorAll("[data-bank-entry-field]").forEach((field) => {
    const update = () => updateBankTransactionEntry(field.dataset.bankType, field.dataset.bankEntryField, field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
    field.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addBankTransactionLine(field.dataset.bankType);
      }
    });
  });

  document.querySelectorAll("[data-bank-line-field]").forEach((field) => {
    const update = () => updateBankTransactionLine(field.dataset.bankType, Number(field.dataset.bankLine), field.dataset.bankLineField, field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
  });
}

function updateBankTransactionField(type, field, value) {
  const draft = bankTransactionDraft(type);
  if (["showAllAccount", "noPrint", "rateFixed"].includes(field)) draft[field] = Boolean(value);
  else draft[field] = value;
}

function updateBankTransactionEntry(type, field, value) {
  const draft = bankTransactionDraft(type);
  const entry = normalizeBankTransactionLine(draft.entry || defaultBankTransactionLine());
  entry[field] = field === "amount" ? Number(value || 0) : value;
  if (field === "accountHead") {
    const match = bankAccountHeadOptions().find((account) => account.name === value);
    if (match && !entry.headId) entry.headId = match.id;
  }
  draft.entry = entry;
}

function updateBankTransactionLine(type, index, field, value) {
  const draft = bankTransactionDraft(type);
  const line = normalizeBankTransactionLine(draft.lines[index] || defaultBankTransactionLine());
  line[field] = field === "amount" ? Number(value || 0) : value;
  if (field === "accountHead") {
    const match = bankAccountHeadOptions().find((account) => account.name === value);
    if (match && !line.headId) line.headId = match.id;
  }
  draft.lines[index] = normalizeBankTransactionLine(line);
  draft.totalAmount = bankTransactionFinancials(draft).totalAmount;
}

function addBankTransactionLine(type) {
  const draft = bankTransactionDraft(type);
  const line = normalizeBankTransactionLine(draft.entry || defaultBankTransactionLine());
  if (!line.headId && !line.accountHead && !line.amount) {
    toast("Enter an account head or amount before adding.");
    return;
  }
  draft.lines.push(line);
  draft.entry = defaultBankTransactionLine();
  draft.totalAmount = bankTransactionFinancials(draft).totalAmount;
  render();
}

function deleteBankTransactionLine(type, index) {
  const draft = bankTransactionDraft(type);
  draft.lines = (draft.lines || []).filter((_, rowIndex) => rowIndex !== Number(index));
  draft.totalAmount = bankTransactionFinancials(draft).totalAmount;
  render();
}

function resetBankTransactionAction(type) {
  bankTransactionDrafts[type] = defaultBankTransaction(type);
  accountView = bankTransactionView(type);
  active = "Accounts";
  render();
}

function refreshBankTransactionAction(type) {
  bankTransactionDrafts[type] = normalizeBankTransaction(state[bankTransactionStorageKey(type)]?.[0] || defaultBankTransaction(type), type);
  accountView = bankTransactionView(type);
  active = "Accounts";
  render();
}

function saveBankTransactionAction(type) {
  const key = bankTransactionStorageKey(type);
  const draft = normalizeBankTransaction(bankTransactionDraft(type), type);
  state[key] = [draft, ...(state[key] || []).filter((record) => record.id !== draft.id)];
  bankTransactionDrafts[type] = draft;
  state.audit.unshift(audit(`Saved ${bankTransactionTitle(type)} ${draft.voucherNo || draft.refNo || ""}`.trim()));
  saveState();
  render();
  toast(`${bankTransactionTitle(type)} saved.`);
}

function deleteBankTransactionAction(type) {
  const key = bankTransactionStorageKey(type);
  const draft = bankTransactionDraft(type);
  state[key] = (state[key] || []).filter((record) => record.id !== draft.id);
  bankTransactionDrafts[type] = defaultBankTransaction(type);
  state.audit.unshift(audit(`Deleted ${bankTransactionTitle(type)} entry`));
  saveState();
  render();
  toast(`${bankTransactionTitle(type)} deleted.`);
}

function printBankTransactionAction(type) {
  state.audit.unshift(audit(`Printed ${bankTransactionTitle(type)}`));
  saveState();
  window.print();
}

function setupPdcScreens() {
  document.querySelectorAll("[data-pdc-section]").forEach((button) => {
    button.addEventListener("click", () => {
      pdcView = button.dataset.pdcSection;
      accountView = "PDC Transactions";
      active = "Accounts";
      render();
    });
  });

  document.querySelectorAll("[data-pdc-field]").forEach((field) => {
    const update = () => updatePdcField(field.dataset.pdcType, field.dataset.pdcField, field.type === "checkbox" ? field.checked : field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
  });

  document.querySelectorAll("[data-pdc-entry-field]").forEach((field) => {
    const update = () => updatePdcEntry(field.dataset.pdcType, field.dataset.pdcEntryField, field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
    field.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addPdcLine(field.dataset.pdcType);
      }
    });
  });

  document.querySelectorAll("[data-pdc-line-field]").forEach((field) => {
    const update = () => updatePdcLine(field.dataset.pdcType, Number(field.dataset.pdcLine), field.dataset.pdcLineField, field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
  });
}

function updatePdcField(type, field, value) {
  const draft = pdcDraft(type);
  if (["chequeAmount", "receivedTotal"].includes(field)) draft[field] = Number(value || 0);
  else draft[field] = value;
  if (field === "bankName") draft.bankAccount = value;
  if (field === "bankAccount") draft.bankName = value;
  if (field === "preparedBy") draft.preparedByCode = pdcStaffCode(value);
  if (field === "receivedBy" && ["receipt", "issue", "pdcRequest"].includes(type)) draft.receivedByCode = pdcStaffCode(value);
  if (field === "partyName" && ["receipt", "issue", "pdcRequest"].includes(type)) {
    const party = (state.parties || []).find((item) => item.name === value);
    draft.partyCode = party?.customerCode || party?.customerId || draft.partyCode || "";
  }
  if (type === "request" && field === "bouncedChequeId") applyPdcBounceToRequest(draft);
  draft.totalAmount = pdcFinancials(draft, type).totalAmount;
}

function updatePdcEntry(type, field, value) {
  const draft = pdcDraft(type);
  const entry = type === "bounce"
    ? normalizePdcBounceLine(draft.entry || defaultPdcBounceLine())
    : ["receipt", "issue", "pdcRequest"].includes(type)
      ? normalizePdcReceiptLine(draft.entry || defaultPdcReceiptLine())
      : normalizePdcSubmissionLine(draft.entry || defaultPdcSubmissionLine());
  if (["amount", "serviceChargeBank", "serviceChargeParty", "billAmount", "paid", "received"].includes(field)) entry[field] = Number(value || 0);
  else entry[field] = value;
  draft.entry = ["receipt", "issue", "pdcRequest"].includes(type) ? normalizePdcReceiptLine(entry) : entry;
}

function updatePdcLine(type, index, field, value) {
  const draft = pdcDraft(type);
  const normalizer = type === "bounce" ? normalizePdcBounceLine : ["receipt", "issue", "pdcRequest"].includes(type) ? normalizePdcReceiptLine : normalizePdcSubmissionLine;
  const fallback = type === "bounce" ? defaultPdcBounceLine : ["receipt", "issue", "pdcRequest"].includes(type) ? defaultPdcReceiptLine : defaultPdcSubmissionLine;
  const line = normalizer(draft.lines[index] || fallback());
  if (["amount", "serviceChargeBank", "serviceChargeParty", "billAmount", "paid", "received"].includes(field)) line[field] = Number(value || 0);
  else line[field] = value;
  draft.lines[index] = normalizer(line);
  draft.totalAmount = pdcFinancials(draft, type).totalAmount;
}

function addPdcLine(type) {
  const draft = pdcDraft(type);
  const line = type === "bounce"
    ? normalizePdcBounceLine(draft.entry || defaultPdcBounceLine())
    : ["receipt", "issue", "pdcRequest"].includes(type)
      ? normalizePdcReceiptLine(draft.entry || defaultPdcReceiptLine())
      : normalizePdcSubmissionLine(draft.entry || defaultPdcSubmissionLine());
  if (["receipt", "issue", "pdcRequest"].includes(type) ? (!line.invoiceNo && !line.received && !line.billAmount) : (!line.chequeNo && !line.partyName && !line.amount)) {
    toast(["receipt", "issue", "pdcRequest"].includes(type) ? "Enter invoice allocation details before adding." : "Enter cheque details before adding.");
    return;
  }
  draft.lines.push(line);
  draft.entry = type === "bounce" ? defaultPdcBounceLine() : ["receipt", "issue", "pdcRequest"].includes(type) ? defaultPdcReceiptLine() : defaultPdcSubmissionLine();
  draft.totalAmount = pdcFinancials(draft, type).totalAmount;
  render();
}

function deletePdcLine(type, index) {
  const draft = pdcDraft(type);
  draft.lines = (draft.lines || []).filter((_, rowIndex) => rowIndex !== Number(index));
  draft.totalAmount = pdcFinancials(draft, type).totalAmount;
  render();
}

function resetPdcAction(type) {
  pdcDrafts[type] = defaultPdcRecord(type);
  pdcView = pdcViewFromType(type);
  accountView = "PDC Transactions";
  active = "Accounts";
  render();
}

function refreshPdcAction(type) {
  pdcDrafts[type] = normalizePdcRecord(state[pdcStorageKey(type)]?.[0] || defaultPdcRecord(type), type);
  pdcView = pdcViewFromType(type);
  accountView = "PDC Transactions";
  active = "Accounts";
  render();
}

function savePdcAction(type) {
  const key = pdcStorageKey(type);
  const draft = normalizePdcRecord(pdcDraft(type), type);
  state[key] = [draft, ...(state[key] || []).filter((record) => record.id !== draft.id)];
  pdcDrafts[type] = draft;
  state.audit.unshift(audit(`Saved ${pdcTitle(type)} ${draft.entryNo || draft.refNo || ""}`.trim()));
  saveState();
  render();
  toast(`${pdcTitle(type)} saved.`);
}

function deletePdcAction(type) {
  const key = pdcStorageKey(type);
  const draft = pdcDraft(type);
  state[key] = (state[key] || []).filter((record) => record.id !== draft.id);
  pdcDrafts[type] = defaultPdcRecord(type);
  state.audit.unshift(audit(`Deleted ${pdcTitle(type)} entry`));
  saveState();
  render();
  toast(`${pdcTitle(type)} deleted.`);
}

function printPdcAction(type) {
  state.audit.unshift(audit(`Printed ${pdcTitle(type)}`));
  saveState();
  window.print();
}

function loadPdcReceipt(recordId) {
  const record = (state.pdcReceipts || []).find((item) => item.id === recordId);
  if (!record) {
    toast("PDC receipt not found.");
    return;
  }
  pdcDrafts.receipt = normalizePdcRecord(record, "receipt");
  pdcView = "PDC Receipt";
  accountView = "PDC Transactions";
  active = "Accounts";
  render();
}

function searchPdcReceiptAction() {
  const latest = state.pdcReceipts?.[0];
  if (!latest) {
    toast("No saved PDC receipts to search.");
    return;
  }
  loadPdcReceipt(latest.id);
  toast("Loaded latest PDC receipt.");
}

function setupJournalVoucherScreen() {
  document.querySelectorAll("[data-journal-field]").forEach((field) => {
    const update = () => updateJournalVoucherField(field.dataset.journalField, field.type === "checkbox" ? field.checked : field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
  });

  document.querySelectorAll("[data-journal-entry-field]").forEach((field) => {
    const update = () => updateJournalVoucherEntry(field.dataset.journalEntryField, field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
    field.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addJournalVoucherLine();
      }
    });
  });

  document.querySelectorAll("[data-journal-line-field]").forEach((field) => {
    const update = () => updateJournalVoucherLine(Number(field.dataset.journalLine), field.dataset.journalLineField, field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
  });
}

function updateJournalVoucherField(field, value) {
  const draft = journalVoucherDraftRecord();
  if (["rateFixed", "ignoreReverseAccount"].includes(field)) draft[field] = Boolean(value);
  else draft[field] = value;
  Object.assign(draft, journalVoucherFinancials(draft));
}

function updateJournalVoucherEntry(field, value) {
  const draft = journalVoucherDraftRecord();
  const entry = normalizeJournalVoucherLine(draft.entry || defaultJournalVoucherLine());
  if (["debit", "credit"].includes(field)) {
    entry[field] = Number(value || 0);
    if (field === "debit" && entry.debit > 0) entry.credit = 0;
    if (field === "credit" && entry.credit > 0) entry.debit = 0;
  } else {
    entry[field] = value;
  }
  if (field === "accountHead") {
    const match = resolveJournalAccount(value);
    if (match && !entry.accountId) entry.accountId = match.id;
  }
  if (field === "accountId") {
    const match = resolveJournalAccount(value);
    if (match && !entry.accountHead) entry.accountHead = match.name;
  }
  draft.entry = entry;
}

function updateJournalVoucherLine(index, field, value) {
  const draft = journalVoucherDraftRecord();
  const line = normalizeJournalVoucherLine(draft.lines[index] || defaultJournalVoucherLine());
  if (["debit", "credit"].includes(field)) {
    line[field] = Number(value || 0);
    if (field === "debit" && line.debit > 0) line.credit = 0;
    if (field === "credit" && line.credit > 0) line.debit = 0;
  } else {
    line[field] = value;
  }
  if (field === "accountHead") {
    const match = resolveJournalAccount(value);
    if (match && !line.accountId) line.accountId = match.id;
  }
  if (field === "accountId") {
    const match = resolveJournalAccount(value);
    if (match && !line.accountHead) line.accountHead = match.name;
  }
  draft.lines[index] = normalizeJournalVoucherLine(line);
  Object.assign(draft, journalVoucherFinancials(draft));
}

function addJournalVoucherLine() {
  const draft = journalVoucherDraftRecord();
  const line = normalizeJournalVoucherLine(draft.entry || defaultJournalVoucherLine());
  if (!line.accountId && !line.accountHead) {
    toast("Choose an account head before adding.");
    return;
  }
  if (!line.debit && !line.credit) {
    toast("Enter debit or credit amount before adding.");
    return;
  }
  draft.lines.push({ ...line, id: crypto.randomUUID() });
  draft.entry = defaultJournalVoucherLine();
  Object.assign(draft, journalVoucherFinancials(draft));
  render();
}

function deleteJournalVoucherLine(index) {
  const draft = journalVoucherDraftRecord();
  draft.lines = (draft.lines || []).filter((_, rowIndex) => rowIndex !== Number(index));
  Object.assign(draft, journalVoucherFinancials(draft));
  render();
}

function refreshJournalVoucherAction() {
  journalVoucherDraft = normalizeJournalVoucher(state.journalVouchers?.[0] || defaultJournalVoucher());
  accountView = "Journal Voucher";
  active = "Accounts";
  render();
}

function saveJournalVoucherAction() {
  const draft = normalizeJournalVoucher(journalVoucherDraftRecord());
  if (!draft.lines.length) {
    toast("Add at least one journal row.");
    return;
  }
  if (Math.abs(draft.totalDebit - draft.totalCredit) > 0.005) {
    toast("Debit and credit totals must match before saving.");
    return;
  }
  const voucherNo = draft.voucherNo || draft.refNo || `JV-${draft.date}`;
  state.journalVouchers = [draft, ...(state.journalVouchers || []).filter((record) => record.id !== draft.id)];
  state.accounts = [
    ...draft.lines.map((line) => normalizeAccount({
      date: draft.date,
      vouNo: voucherNo,
      ledger: line.accountHead || line.accountId,
      particular: draft.narration || line.remark || "Journal Voucher",
      debit: line.debit,
      credit: line.credit,
      balance: Number(line.debit || 0) - Number(line.credit || 0),
      crdr: Number(line.debit || 0) >= Number(line.credit || 0) ? "Dr" : "Cr"
    })),
    ...(state.accounts || []).filter((account) => account.vouNo !== voucherNo)
  ];
  journalVoucherDraft = draft;
  state.audit.unshift(audit(`Saved Journal Voucher ${voucherNo}`));
  saveState();
  render();
  toast("Journal voucher saved.");
}

function deleteJournalVoucherAction() {
  const draft = journalVoucherDraftRecord();
  const voucherNo = draft.voucherNo || draft.refNo || `JV-${draft.date}`;
  state.journalVouchers = (state.journalVouchers || []).filter((record) => record.id !== draft.id);
  state.accounts = (state.accounts || []).filter((account) => account.vouNo !== voucherNo);
  journalVoucherDraft = defaultJournalVoucher();
  state.audit.unshift(audit("Deleted Journal Voucher"));
  saveState();
  render();
  toast("Journal voucher deleted.");
}

function printJournalVoucherAction() {
  state.audit.unshift(audit("Printed Journal Voucher"));
  saveState();
  window.print();
}

function setupCashVoucherScreens() {
  document.querySelectorAll("[data-cash-voucher-field]").forEach((field) => {
    const update = () => updateCashVoucherField(field.dataset.cashVoucherType, field.dataset.cashVoucherField, field.type === "checkbox" ? field.checked : field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
  });

  document.querySelectorAll("[data-cash-voucher-entry-field]").forEach((field) => {
    const update = () => updateCashVoucherEntry(field.dataset.cashVoucherType, field.dataset.cashVoucherEntryField, field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
    field.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addCashVoucherLine(field.dataset.cashVoucherType);
      }
    });
  });

  document.querySelectorAll("[data-cash-voucher-line-field]").forEach((field) => {
    const update = () => updateCashVoucherLine(field.dataset.cashVoucherType, Number(field.dataset.cashVoucherLine), field.dataset.cashVoucherLineField, field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
  });
}

function updateCashVoucherField(type, field, value) {
  const draft = cashVoucherDraft(type);
  if (["showAllAccount", "enableCashAccount", "noPrint", "rateFixed"].includes(field)) {
    draft[field] = Boolean(value);
    if (field === "enableCashAccount" && !draft.enableCashAccount) draft.cashAccount = "Cash in Hand";
  } else if (field === "openingBalance") {
    draft[field] = Number(value || 0);
  } else {
    draft[field] = value;
  }
  Object.assign(draft, cashVoucherFinancials(draft, type));
}

function updateCashVoucherEntry(type, field, value) {
  const draft = cashVoucherDraft(type);
  const entry = normalizeCashVoucherLine(draft.entry || defaultCashVoucherLine(type), type);
  entry[field] = ["amount", "discount"].includes(field) ? Number(value || 0) : value;
  if (field === "accountHead") {
    const match = bankAccountHeadOptions().find((account) => account.name === value);
    if (match && !entry.headId) entry.headId = match.id;
  }
  draft.entry = entry;
}

function updateCashVoucherLine(type, index, field, value) {
  const draft = cashVoucherDraft(type);
  const line = normalizeCashVoucherLine(draft.lines[index] || defaultCashVoucherLine(type), type);
  line[field] = ["amount", "discount"].includes(field) ? Number(value || 0) : value;
  if (field === "accountHead") {
    const match = bankAccountHeadOptions().find((account) => account.name === value);
    if (match && !line.headId) line.headId = match.id;
  }
  draft.lines[index] = normalizeCashVoucherLine(line, type);
  Object.assign(draft, cashVoucherFinancials(draft, type));
}

function addCashVoucherLine(type) {
  const draft = cashVoucherDraft(type);
  const line = normalizeCashVoucherLine(draft.entry || defaultCashVoucherLine(type), type);
  if (!line.headId && !line.accountHead && !line.amount) {
    toast("Enter an account head or amount before adding.");
    return;
  }
  draft.lines.push(line);
  draft.entry = defaultCashVoucherLine(type);
  Object.assign(draft, cashVoucherFinancials(draft, type));
  render();
}

function deleteCashVoucherLine(type, index) {
  const draft = cashVoucherDraft(type);
  draft.lines = (draft.lines || []).filter((_, rowIndex) => rowIndex !== Number(index));
  Object.assign(draft, cashVoucherFinancials(draft, type));
  render();
}

function resetCashVoucherAction(type) {
  cashVoucherDrafts[type] = defaultCashVoucher(type);
  accountView = cashVoucherView(type);
  active = "Accounts";
  render();
}

function refreshCashVoucherAction(type) {
  cashVoucherDrafts[type] = normalizeCashVoucher(state[cashVoucherStorageKey(type)]?.[0] || defaultCashVoucher(type), type);
  accountView = cashVoucherView(type);
  active = "Accounts";
  render();
}

function saveCashVoucherAction(type) {
  const key = cashVoucherStorageKey(type);
  const draft = normalizeCashVoucher(cashVoucherDraft(type), type);
  state[key] = [draft, ...(state[key] || []).filter((record) => record.id !== draft.id)];
  cashVoucherDrafts[type] = draft;
  (draft.lines || []).forEach((line) => {
    const amount = type === "receipt" ? Math.max(0, Number(line.amount || 0) - Number(line.discount || 0)) : Number(line.amount || 0);
    state.accounts.unshift(normalizeAccount({
      date: formatDisplayDate(draft.date),
      vouNo: line.voucherNo || draft.voucherNo || draft.refNo || (type === "payment" ? "CP" : "CR"),
      ledger: draft.cashAccount || "Cash in Hand",
      particular: `${cashVoucherTitle(type)} - ${line.accountHead || "Account"}`,
      debit: type === "payment" ? amount : 0,
      credit: type === "receipt" ? amount : 0,
      balance: type === "payment" ? amount : -amount,
      crdr: type === "payment" ? "Dr" : "Cr"
    }));
  });
  state.audit.unshift(audit(`Saved ${cashVoucherTitle(type)} ${draft.voucherNo || draft.refNo || ""}`.trim()));
  saveState();
  render();
  toast(`${cashVoucherTitle(type)} saved.`);
}

function deleteCashVoucherAction(type) {
  const key = cashVoucherStorageKey(type);
  const draft = cashVoucherDraft(type);
  state[key] = (state[key] || []).filter((record) => record.id !== draft.id);
  cashVoucherDrafts[type] = defaultCashVoucher(type);
  state.audit.unshift(audit(`Deleted ${cashVoucherTitle(type)} entry`));
  saveState();
  render();
  toast(`${cashVoucherTitle(type)} deleted.`);
}

function printCashVoucherAction(type) {
  state.audit.unshift(audit(`Printed ${cashVoucherTitle(type)}`));
  saveState();
  window.print();
}

function setupDirectEntryScreen() {
  document.querySelectorAll("[data-direct-entry-field]").forEach((field) => {
    const update = () => updateDirectEntryField(field.dataset.directEntryField, field.type === "checkbox" ? field.checked : field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
  });

  document.querySelectorAll("[data-direct-entry-entry-field]").forEach((field) => {
    const update = () => updateDirectEntryEntry(field.dataset.directEntryEntryField, field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
    field.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addDirectEntryLine();
      }
    });
  });

  document.querySelectorAll("[data-direct-entry-line-field]").forEach((field) => {
    const update = () => updateDirectEntryLine(Number(field.dataset.directEntryLine), field.dataset.directEntryLineField, field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
  });
}

function updateDirectEntryField(field, value) {
  const draft = directEntryRecord();
  if (["repeatLastHead", "repeatLastNarration"].includes(field)) draft[field] = Boolean(value);
  else draft[field] = value;
}

function updateDirectEntryEntry(field, value) {
  const draft = directEntryRecord();
  const entry = normalizeDirectEntryLine(draft.entry || defaultDirectEntryLine());
  entry[field] = ["receipt", "payment"].includes(field) ? Number(value || 0) : value;
  draft.entry = entry;
}

function updateDirectEntryLine(index, field, value) {
  const draft = directEntryRecord();
  const line = normalizeDirectEntryLine(draft.lines[index] || defaultDirectEntryLine());
  line[field] = ["receipt", "payment"].includes(field) ? Number(value || 0) : value;
  draft.lines[index] = normalizeDirectEntryLine(line);
  Object.assign(draft, directEntryFinancials(draft));
}

function addDirectEntryLine() {
  const draft = directEntryRecord();
  const line = normalizeDirectEntryLine(draft.entry || defaultDirectEntryLine());
  if (!line.accountHead && !line.receipt && !line.payment && !line.remark) {
    toast("Enter an account head or amount before adding.");
    return;
  }
  draft.lines.push(line);
  draft.entry = {
    ...defaultDirectEntryLine(),
    accountHead: draft.repeatLastHead ? line.accountHead : "",
    remark: draft.repeatLastNarration ? line.remark : ""
  };
  Object.assign(draft, directEntryFinancials(draft));
  render();
}

function deleteDirectEntryLine(index) {
  const draft = directEntryRecord();
  draft.lines = (draft.lines || []).filter((_, rowIndex) => rowIndex !== Number(index));
  Object.assign(draft, directEntryFinancials(draft));
  render();
}

function resetDirectEntryAction() {
  directEntryDraft = defaultDirectEntry();
  active = "Accounts";
  accountView = "Direct Entry";
  render();
}

function refreshDirectEntryAction() {
  directEntryDraft = normalizeDirectEntry(state.directEntries?.[0] || defaultDirectEntry());
  active = "Accounts";
  accountView = "Direct Entry";
  render();
}

function saveDirectEntryAction() {
  const draft = normalizeDirectEntry(directEntryRecord());
  if (!draft.lines.length) {
    toast("Add at least one direct entry line before saving.");
    return;
  }
  state.directEntries = [draft, ...(state.directEntries || []).filter((record) => record.id !== draft.id)];
  draft.lines.forEach((line) => {
    state.accounts.unshift({
      date: formatDisplayDate(line.date),
      vouNo: draft.entryNo,
      ledger: draft.cashBank,
      particular: `${line.accountHead || "Direct Entry"}${line.remark ? ` - ${line.remark}` : ""}`,
      debit: Number(line.receipt || 0),
      credit: Number(line.payment || 0),
      balance: Number(line.receipt || 0) - Number(line.payment || 0),
      crdr: Number(line.receipt || 0) >= Number(line.payment || 0) ? "Dr" : "Cr"
    });
  });
  directEntryDraft = draft;
  state.audit.unshift(audit(`Saved Direct Entry ${draft.entryNo}`));
  saveState();
  render();
  toast("Direct Entry saved.");
}

function setupExpenseEntryScreen() {
  document.querySelectorAll("[data-expense-entry-field]").forEach((field) => {
    const update = () => updateExpenseEntryField(field.dataset.expenseEntryField, field.type === "radio" ? field.value : field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      if (field.type === "radio" && !field.checked) return;
      update();
      render();
    });
  });

  document.querySelectorAll("[data-expense-entry-entry-field]").forEach((field) => {
    const update = () => updateExpenseEntryEntry(field.dataset.expenseEntryEntryField, field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
    field.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addExpenseEntryLine();
      }
    });
  });

  document.querySelectorAll("[data-expense-entry-line-field]").forEach((field) => {
    const update = () => updateExpenseEntryLine(Number(field.dataset.expenseEntryLine), field.dataset.expenseEntryLineField, field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
  });
}

function recalculateExpenseLine(line) {
  const clean = normalizeExpenseEntryLine(line);
  clean.tds = Number(clean.tds || (clean.taxable * clean.tdsPercent / 100) || 0);
  clean.total = Number(clean.taxable || 0) + Number(clean.gst || 0) - Number(clean.tds || 0);
  return clean;
}

function updateExpenseEntryField(field, value) {
  const draft = expenseEntryRecord();
  draft[field] = value;
}

function updateExpenseEntryEntry(field, value) {
  const draft = expenseEntryRecord();
  const entry = normalizeExpenseEntryLine(draft.entry || defaultExpenseEntryLine());
  entry[field] = ["taxable", "gst", "tdsPercent", "tds"].includes(field) ? Number(value || 0) : value;
  if (field === "tdsPercent") entry.tds = Number(entry.taxable || 0) * Number(entry.tdsPercent || 0) / 100;
  draft.entry = recalculateExpenseLine(entry);
}

function updateExpenseEntryLine(index, field, value) {
  const draft = expenseEntryRecord();
  const line = normalizeExpenseEntryLine(draft.lines[index] || defaultExpenseEntryLine());
  line[field] = ["taxable", "gst", "tdsPercent", "tds"].includes(field) ? Number(value || 0) : value;
  if (field === "tdsPercent") line.tds = Number(line.taxable || 0) * Number(line.tdsPercent || 0) / 100;
  draft.lines[index] = recalculateExpenseLine(line);
  Object.assign(draft, expenseEntryFinancials(draft));
}

function addExpenseEntryLine() {
  const draft = expenseEntryRecord();
  const line = recalculateExpenseLine(draft.entry || defaultExpenseEntryLine());
  if (!line.ledgerHead && !line.billNo && !line.taxable && !line.gst && !line.total) {
    toast("Enter expense details before adding.");
    return;
  }
  draft.lines.push(line);
  draft.entry = defaultExpenseEntryLine();
  Object.assign(draft, expenseEntryFinancials(draft));
  render();
}

function deleteExpenseEntryLine(index) {
  const draft = expenseEntryRecord();
  draft.lines = (draft.lines || []).filter((_, rowIndex) => rowIndex !== Number(index));
  Object.assign(draft, expenseEntryFinancials(draft));
  render();
}

function resetExpenseEntryAction() {
  expenseEntryDraft = defaultExpenseEntry();
  active = "Accounts";
  accountView = "Expense Entry";
  render();
}

function refreshExpenseEntryAction() {
  expenseEntryDraft = normalizeExpenseEntry(state.expenseEntries?.[0] || defaultExpenseEntry());
  active = "Accounts";
  accountView = "Expense Entry";
  render();
}

function saveExpenseEntryAction() {
  const draft = normalizeExpenseEntry(expenseEntryRecord());
  if (!draft.lines.length) {
    toast("Add at least one expense row before saving.");
    return;
  }
  state.expenseEntries = [draft, ...(state.expenseEntries || []).filter((record) => record.id !== draft.id)];
  draft.lines.forEach((line) => {
    state.accounts.unshift({
      date: formatDisplayDate(draft.date),
      vouNo: draft.entryNo,
      ledger: draft.cashAccount,
      particular: `Expense: ${line.ledgerHead || "Ledger"}${line.billNo ? ` / Bill ${line.billNo}` : ""}`,
      debit: 0,
      credit: Number(line.total || 0),
      balance: -Number(line.total || 0),
      crdr: "Cr"
    });
  });
  expenseEntryDraft = draft;
  state.audit.unshift(audit(`Saved Expense Entry ${draft.entryNo}`));
  saveState();
  render();
  toast("Expense Entry saved.");
}

function deleteExpenseEntryAction() {
  const draft = expenseEntryRecord();
  state.expenseEntries = (state.expenseEntries || []).filter((record) => record.id !== draft.id);
  expenseEntryDraft = defaultExpenseEntry();
  state.audit.unshift(audit("Deleted Expense Entry"));
  saveState();
  render();
  toast("Expense Entry deleted.");
}

function updateBillwiseField(type, field, value) {
  const draft = billwiseDraft(type);
  if (["collectionAmount", "paidAmount", "discount", "collectionReference", "paidReference"].includes(field)) draft[field] = Number(value || 0);
  else draft[field] = value;
}

function updateBillwiseLine(type, index, field, value) {
  const draft = billwiseDraft(type);
  const line = draft.lines[index] || defaultBillwiseLine(type);
  line[field] = ["billAmount", "totalReceived", "oldCreditNote", "received", "discount", "totalPaid", "dnd", "paid"].includes(field) ? Number(value || 0) : value;
  draft.lines[index] = normalizeBillwiseLine(line, type);
  const financials = billwiseFinancials(draft, type);
  if (type === "collection") {
    draft.collectionAmount = financials.collectionAmount;
    draft.discount = financials.discount;
  } else {
    draft.paidAmount = financials.paidAmount;
  }
}

function addBillwiseRow(type) {
  const draft = billwiseDraft(type);
  draft.lines.push(defaultBillwiseLine(type));
  render();
}

function deleteBillwiseRow(type, index) {
  const draft = billwiseDraft(type);
  draft.lines = draft.lines.filter((_, rowIndex) => rowIndex !== Number(index));
  if (!draft.lines.length) draft.lines = [defaultBillwiseLine(type)];
  const financials = billwiseFinancials(draft, type);
  draft.collectionAmount = financials.collectionAmount;
  draft.paidAmount = financials.paidAmount;
  draft.discount = financials.discount;
  render();
}

function openBillwiseAction(type) {
  active = "Accounts";
  accountView = billwiseViewFromType(type);
  billwiseDraft(type);
  render();
}

function resetBillwiseAction(type) {
  billwiseDrafts[type] = defaultBillwiseTransaction(type);
  active = "Accounts";
  accountView = billwiseViewFromType(type);
  render();
}

function refreshBillwiseAction(type) {
  billwiseDrafts[type] = normalizeBillwiseTransaction(state[billwiseStorageKey(type)]?.[0] || defaultBillwiseTransaction(type), type);
  active = "Accounts";
  accountView = billwiseViewFromType(type);
  render();
}

function saveBillwiseAction(type) {
  const key = billwiseStorageKey(type);
  const draft = normalizeBillwiseTransaction(billwiseDraft(type), type);
  state[key] = [draft, ...(state[key] || []).filter((record) => record.id !== draft.id)];
  billwiseDrafts[type] = draft;
  state.audit.unshift(audit(`Saved ${billwiseTitle(type)} ${draft.entryNo || draft.refNo || ""}`.trim()));
  saveState();
  render();
  toast(`${billwiseTitle(type)} saved.`);
}

function deleteBillwiseAction(type) {
  const key = billwiseStorageKey(type);
  const draft = billwiseDraft(type);
  state[key] = (state[key] || []).filter((record) => record.id !== draft.id);
  billwiseDrafts[type] = defaultBillwiseTransaction(type);
  state.audit.unshift(audit(`Deleted ${billwiseTitle(type)} entry`));
  saveState();
  render();
  toast(`${billwiseTitle(type)} deleted.`);
}

function printBillwiseAction(type) {
  state.audit.unshift(audit(`Printed ${billwiseTitle(type)}`));
  saveState();
  window.print();
}

function autoAllocateBillwise(type) {
  const draft = billwiseDraft(type);
  let remaining = type === "collection" ? Number(draft.collectionReference || draft.collectionAmount || 0) : Number(draft.paidReference || draft.paidAmount || 0);
  if (remaining <= 0) remaining = sumBy(draft.lines, "billAmount");
  draft.lines = draft.lines.map((line) => {
    const normalized = normalizeBillwiseLine(line, type);
    const alreadySettled = type === "collection"
      ? Number(normalized.totalReceived || 0) + Number(normalized.oldCreditNote || 0) + Number(normalized.discount || 0)
      : type === "payment"
        ? Number(normalized.totalPaid || 0) + Number(normalized.dnd || 0)
        : type === "credit"
          ? Number(normalized.paid || 0)
          : Number(normalized.totalPaid || 0);
    const due = Math.max(0, Number(normalized.billAmount || 0) - alreadySettled);
    const applied = Math.min(remaining, due);
    remaining -= applied;
    if (type === "payment") normalized.paid = applied;
    else normalized.received = applied;
    return normalizeBillwiseLine(normalized, type);
  });
  const financials = billwiseFinancials(draft, type);
  draft.collectionAmount = financials.collectionAmount;
  draft.paidAmount = financials.paidAmount;
  draft.discount = financials.discount;
  render();
  toast("Billwise amount allocated.");
}

function setupCustomVoucherScreen() {
  document.querySelectorAll("[data-custom-voucher-field]").forEach((field) => {
    const update = () => {
      updateCustomVoucherField(field.dataset.customVoucherField, field.type === "checkbox" ? field.checked : field.value);
    };
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      if (field.dataset.customVoucherField === "accountType") render();
    });
  });
  document.querySelectorAll("[data-custom-voucher-entry-field]").forEach((field) => {
    const update = () => updateCustomVoucherEntryField(field.dataset.customVoucherEntryField, field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", update);
    field.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addCustomVoucherLine();
      }
    });
  });
  document.querySelectorAll("[data-custom-voucher-line]").forEach((row) => {
    row.addEventListener("dblclick", () => deleteCustomVoucherLine(Number(row.dataset.customVoucherLine)));
  });
}

function openCustomVoucher() {
  active = "Accounts";
  accountView = "Custom Voucher";
  customVoucherDraft = normalizeCustomVoucher(customVoucherDraft || defaultCustomVoucher());
  customVoucherEntryDraft = defaultCustomVoucherEntryLine();
  render();
}

function updateCustomVoucherField(field, value) {
  customVoucherDraft = customVoucherDraftRecord();
  if (field === "confirmBeforeDelete") {
    customVoucherDraft.confirmBeforeDelete = Boolean(value);
    customVoucherConfirmDelete = customVoucherDraft.confirmBeforeDelete;
    return;
  }
  if (["periodFrom", "periodTo", "date"].includes(field)) customVoucherDraft[field] = toDateInputValue(value);
  else customVoucherDraft[field] = value;
  if (field === "accountType") {
    const parties = customVoucherParties(value);
    if (!parties.includes(customVoucherDraft.partyName)) customVoucherDraft.partyName = parties[0] || "";
  }
  if (field === "periodFrom" && toDateInputValue(customVoucherDraft.periodTo) < toDateInputValue(value)) {
    customVoucherDraft.periodTo = toDateInputValue(value);
  }
  customVoucherDraft = normalizeCustomVoucher(customVoucherDraft);
}

function updateCustomVoucherEntryField(field, value) {
  customVoucherEntryDraft = customVoucherEntryRecord();
  if (["amount", "nos"].includes(field)) customVoucherEntryDraft[field] = Number(value || 0);
  else if (field === "paymentDate") customVoucherEntryDraft.paymentDate = toDateInputValue(value);
  else customVoucherEntryDraft[field] = value;
}

function addCustomVoucherLine() {
  customVoucherDraft = customVoucherDraftRecord();
  const entry = customVoucherEntryRecord();
  if (!entry.description) {
    toast("Select a description before adding a row.");
    return;
  }
  if (Number(entry.amount || 0) <= 0) {
    toast("Enter an amount greater than zero.");
    return;
  }
  try {
    const lines = buildCustomVoucherLinesFromEntry(entry, customVoucherDraft.periodFrom, customVoucherDraft.periodTo);
    customVoucherDraft.lines = [...customVoucherDraft.lines, ...lines];
    customVoucherDraft = normalizeCustomVoucher(customVoucherDraft);
    customVoucherEntryDraft = defaultCustomVoucherEntryLine();
    render();
  } catch (error) {
    toast(error.message || "Could not add schedule row.");
  }
}

function deleteCustomVoucherLine(index) {
  customVoucherDraft = customVoucherDraftRecord();
  const rowIndex = Number(index);
  if (!Number.isFinite(rowIndex) || !customVoucherDraft.lines[rowIndex]) return;
  const remove = () => {
    customVoucherDraft.lines = customVoucherDraft.lines.filter((_, itemIndex) => itemIndex !== rowIndex);
    customVoucherDraft = normalizeCustomVoucher(customVoucherDraft);
    render();
  };
  if (customVoucherConfirmDelete && !window.confirm("Delete this scheduled voucher row?")) return;
  remove();
}

function newCustomVoucher() {
  customVoucherDraft = defaultCustomVoucher();
  customVoucherEntryDraft = defaultCustomVoucherEntryLine();
  render();
}

function refreshCustomVoucher() {
  customVoucherDraft = defaultCustomVoucher();
  customVoucherEntryDraft = defaultCustomVoucherEntryLine();
  render();
  toast("Custom voucher cleared for a fresh entry.");
}

function loadCustomVoucher(recordId) {
  const record = (state.customVouchers || []).find((item) => item.id === recordId);
  if (!record) {
    toast("Custom voucher not found.");
    return;
  }
  customVoucherDraft = normalizeCustomVoucher(structuredClone(record));
  customVoucherEntryDraft = defaultCustomVoucherEntryLine();
  accountView = "Custom Voucher";
  active = "Accounts";
  render();
  toast(`Loaded custom voucher ${record.entryNo}.`);
}

function searchCustomVoucher() {
  const records = state.customVouchers || [];
  if (!records.length) {
    toast("No saved custom vouchers yet.");
    return;
  }
  openModal(
    "Search Custom Voucher",
    "Load a saved scheduled voucher entry.",
    `<div class="table-wrap">${table(["Entry No", "Party", "Date", "Total", "Load"], records.map((record) => {
      const financials = customVoucherFinancials(record);
      return [record.entryNo, record.partyName || "-", record.date, moneyValue(financials.totalAmount), `<button type="button" class="text-button" data-action="load-custom-voucher" data-record-id="${record.id}">Load</button>`];
    }))}</div>`,
    "Close",
    "noop"
  );
  document.querySelectorAll(".modal-backdrop [data-action]").forEach((button) => {
    button.addEventListener("click", () => handleAction(button.dataset.action, button));
  });
}

function saveCustomVoucher() {
  const record = normalizeCustomVoucher(customVoucherDraft || defaultCustomVoucher());
  if (!record.partyName) {
    toast("Select a party name.");
    return;
  }
  if (!record.lines.length) {
    toast("Add at least one scheduled row.");
    return;
  }
  if (Number(record.totalAmount || 0) <= 0) {
    toast("Total amount must be greater than zero.");
    return;
  }
  if (toDateInputValue(record.periodFrom) > toDateInputValue(record.periodTo)) {
    toast("Period start date cannot be after the end date.");
    return;
  }
  state.customVouchers = [record, ...(state.customVouchers || []).filter((item) => item.id !== record.id)];
  const debit = record.accountType === "Payable" ? Number(record.totalAmount || 0) : 0;
  const credit = record.accountType === "Receivable" ? Number(record.totalAmount || 0) : 0;
  state.accounts.unshift({
    date: formatDisplayDate(record.date),
    vouNo: record.entryNo,
    ledger: record.partyName,
    particular: `Custom voucher ${record.accountType} schedule (${record.lines.length} row${record.lines.length === 1 ? "" : "s"})`,
    debit,
    credit,
    balance: debit - credit,
    crdr: debit >= credit ? "Dr" : "Cr"
  });
  state.audit.unshift(audit(`Saved custom voucher ${record.entryNo} for ${record.partyName}`));
  saveState();
  customVoucherDraft = defaultCustomVoucher();
  customVoucherEntryDraft = defaultCustomVoucherEntryLine();
  render();
  toast("Custom voucher saved.");
}

function deleteCustomVoucher() {
  const draft = customVoucherDraft;
  if (draft?.id) state.customVouchers = (state.customVouchers || []).filter((item) => item.id !== draft.id);
  customVoucherDraft = defaultCustomVoucher();
  customVoucherEntryDraft = defaultCustomVoucherEntryLine();
  saveState();
  render();
  toast("Custom voucher deleted.");
}

function setupComplimentaryScreens() {
  document.querySelectorAll("[data-complimentary-purchase-field]").forEach((field) => {
    const update = () => updateComplimentaryPurchaseField(field.dataset.complimentaryPurchaseField, field.value);
    field.addEventListener("input", () => {
      update();
      refreshComplimentaryPurchaseOutputs();
    });
    field.addEventListener("change", () => {
      update();
      render();
    });
  });
  document.querySelectorAll("[data-complimentary-purchase-line-field]").forEach((field) => {
    const update = () => updateComplimentaryPurchaseLine(Number(field.dataset.index), field.dataset.complimentaryPurchaseLineField, field.value);
    field.addEventListener("input", () => {
      update();
      refreshComplimentaryPurchaseOutputs();
    });
    field.addEventListener("change", () => {
      update();
      render();
    });
    field.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addComplimentaryPurchaseRow(Number(field.dataset.index) + 1);
      }
    });
  });
  document.querySelectorAll("[data-complimentary-purchase-row]").forEach((row) => {
    row.addEventListener("click", () => {
      complimentaryPurchaseSelectedRow = Number(row.dataset.complimentaryPurchaseRow);
      document.querySelectorAll("[data-complimentary-purchase-row]").forEach((item) => item.classList.toggle("selected", item === row));
    });
  });
  document.querySelectorAll("[data-complimentary-issue-field]").forEach((field) => {
    const update = () => updateComplimentaryIssueField(field.dataset.complimentaryIssueField, field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
  });
  document.querySelectorAll("[data-complimentary-issue-line-field]").forEach((field) => {
    const update = () => updateComplimentaryIssueLine(Number(field.dataset.index), field.dataset.complimentaryIssueLineField, field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
    field.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addComplimentaryIssueRow(Number(field.dataset.index) + 1);
      }
    });
  });
  document.querySelectorAll("[data-complimentary-issue-row]").forEach((row) => {
    row.addEventListener("click", () => {
      complimentaryIssueSelectedRow = Number(row.dataset.complimentaryIssueRow);
      document.querySelectorAll("[data-complimentary-issue-row]").forEach((item) => item.classList.toggle("selected", item === row));
    });
  });
}

function openComplimentaryPurchase() {
  active = "Work Orders";
  workOrderView = "Complimentary Item";
  complimentaryView = "Complimentary Item Purchase";
  complimentaryPurchaseDraft = normalizeComplimentaryPurchase(complimentaryPurchaseDraft || defaultComplimentaryPurchase());
  render();
}

function openComplimentaryIssue() {
  active = "Work Orders";
  workOrderView = "Complimentary Item";
  complimentaryView = "Complimentary Item Issue";
  complimentaryIssueDraft = normalizeComplimentaryIssue(complimentaryIssueDraft || defaultComplimentaryIssue());
  render();
}

function loadComplimentaryPurchase(recordId) {
  const record = (state.complimentaryPurchases || []).find((item) => item.id === recordId);
  if (!record) {
    toast("Purchase entry not found.");
    return;
  }
  complimentaryPurchaseDraft = normalizeComplimentaryPurchase(structuredClone(record));
  complimentaryPurchaseSelectedRow = 0;
  complimentaryView = "Complimentary Item Purchase";
  active = "Work Orders";
  workOrderView = "Complimentary Item";
  render();
  toast(`Loaded purchase ${record.entryNo}.`);
}

function loadComplimentaryIssue(recordId) {
  const record = (state.complimentaryIssues || []).find((item) => item.id === recordId);
  if (!record) {
    toast("Issue entry not found.");
    return;
  }
  complimentaryIssueDraft = normalizeComplimentaryIssue(structuredClone(record));
  complimentaryIssueSelectedRow = 0;
  complimentaryView = "Complimentary Item Issue";
  active = "Work Orders";
  workOrderView = "Complimentary Item";
  render();
  toast(`Loaded issue ${record.entryNo}.`);
}

function updateComplimentaryPurchaseField(field, value) {
  complimentaryPurchaseDraft = normalizeComplimentaryPurchase(complimentaryPurchaseDraft || defaultComplimentaryPurchase());
  if (["addition", "discount"].includes(field)) complimentaryPurchaseDraft[field] = Number(value || 0);
  else complimentaryPurchaseDraft[field] = value;
  if (field === "partyName") {
    const party = supplierPartyByName(value);
    complimentaryPurchaseDraft.partyId = party?.customerCode || complimentaryPurchaseDraft.partyId || "";
    complimentaryPurchaseDraft.address = party?.address || complimentaryPurchaseDraft.address || "";
  }
  if (field === "partyId") {
    const party = supplierPartyByCode(value);
    if (party) {
      complimentaryPurchaseDraft.partyName = party.name;
      complimentaryPurchaseDraft.address = party.address || "";
    }
  }
  complimentaryPurchaseDraft = normalizeComplimentaryPurchase(complimentaryPurchaseDraft);
}

function updateComplimentaryPurchaseLine(index, field, value) {
  complimentaryPurchaseDraft = normalizeComplimentaryPurchase(complimentaryPurchaseDraft || defaultComplimentaryPurchase());
  const line = { ...(complimentaryPurchaseDraft.lines[index] || defaultComplimentaryPurchaseLine()) };
  line[field] = ["quantity", "foc", "price"].includes(field) ? Number(value || 0) : value;
  const catalogItem = complimentaryItemCatalog().find((item) => item.itemName === line.itemName || item.itemId === line.itemId);
  if (catalogItem && ["itemName", "itemId"].includes(field)) {
    line.itemId = catalogItem.itemId || line.itemId;
    line.itemName = catalogItem.itemName || line.itemName;
    line.unit = catalogItem.unit || line.unit;
  }
  complimentaryPurchaseDraft.lines[index] = normalizeComplimentaryPurchaseLine(line);
  complimentaryPurchaseDraft = normalizeComplimentaryPurchase(complimentaryPurchaseDraft);
}

function updateComplimentaryIssueField(field, value) {
  complimentaryIssueDraft = normalizeComplimentaryIssue(complimentaryIssueDraft || defaultComplimentaryIssue());
  complimentaryIssueDraft[field] = value;
  if (field === "invoiceNo") {
    const bill = (state.bills || []).find((item) => item.billNo === value || item.id === value || item.entryNo === value);
    if (bill && !complimentaryIssueDraft.remarks) {
      complimentaryIssueDraft.remarks = bill.customer ? `Linked to ${bill.customer}` : complimentaryIssueDraft.remarks;
    }
  }
  complimentaryIssueDraft = normalizeComplimentaryIssue(complimentaryIssueDraft);
}

function updateComplimentaryIssueLine(index, field, value) {
  complimentaryIssueDraft = normalizeComplimentaryIssue(complimentaryIssueDraft || defaultComplimentaryIssue());
  const line = { ...(complimentaryIssueDraft.lines[index] || defaultComplimentaryIssueLine()) };
  line[field] = field === "quantity" ? Number(value || 0) : value;
  const catalogItem = complimentaryItemCatalog().find((item) => item.itemName === line.itemName || item.itemId === line.itemId);
  if (catalogItem && ["itemName", "itemId"].includes(field)) {
    line.itemId = catalogItem.itemId || line.itemId;
    line.itemName = catalogItem.itemName || line.itemName;
    line.unit = catalogItem.unit || line.unit;
  }
  complimentaryIssueDraft.lines[index] = normalizeComplimentaryIssueLine(line);
  complimentaryIssueDraft = normalizeComplimentaryIssue(complimentaryIssueDraft);
}

function refreshComplimentaryPurchaseOutputs() {
  if (!complimentaryPurchaseDraft) return;
  complimentaryPurchaseDraft = normalizeComplimentaryPurchase(complimentaryPurchaseDraft);
  const financials = complimentaryPurchaseFinancials(complimentaryPurchaseDraft);
  document.querySelector("[data-comp-purchase-output='billAmount']")?.replaceChildren(document.createTextNode(moneyValue(financials.billAmount)));
  document.querySelector("[data-comp-purchase-output='invoiceTotal']")?.replaceChildren(document.createTextNode(moneyValue(financials.invoiceTotal)));
  complimentaryPurchaseDraft.lines.forEach((line, index) => {
    document.querySelector(`[data-comp-purchase-row-total="${index}"]`)?.replaceChildren(document.createTextNode(moneyValue(normalizeComplimentaryPurchaseLine(line).total)));
  });
}

function addComplimentaryPurchaseRow(insertAt) {
  complimentaryPurchaseDraft = normalizeComplimentaryPurchase(complimentaryPurchaseDraft || defaultComplimentaryPurchase());
  const next = defaultComplimentaryPurchaseLine();
  if (Number.isFinite(insertAt)) complimentaryPurchaseDraft.lines.splice(Math.max(0, insertAt), 0, next);
  else complimentaryPurchaseDraft.lines.push(next);
  render();
}

function addComplimentaryIssueRow(insertAt) {
  complimentaryIssueDraft = normalizeComplimentaryIssue(complimentaryIssueDraft || defaultComplimentaryIssue());
  const next = defaultComplimentaryIssueLine();
  if (Number.isFinite(insertAt)) complimentaryIssueDraft.lines.splice(Math.max(0, insertAt), 0, next);
  else complimentaryIssueDraft.lines.push(next);
  render();
}

function deleteComplimentaryPurchaseRow(index) {
  complimentaryPurchaseDraft = normalizeComplimentaryPurchase(complimentaryPurchaseDraft || defaultComplimentaryPurchase());
  const fallback = complimentaryPurchaseSelectedRow;
  const rowIndex = Number.isFinite(Number(index)) ? Number(index) : fallback;
  complimentaryPurchaseDraft.lines = complimentaryPurchaseDraft.lines.filter((_, itemIndex) => itemIndex !== rowIndex);
  if (!complimentaryPurchaseDraft.lines.length) complimentaryPurchaseDraft.lines = [defaultComplimentaryPurchaseLine()];
  complimentaryPurchaseSelectedRow = Math.min(complimentaryPurchaseSelectedRow, complimentaryPurchaseDraft.lines.length - 1);
  render();
}

function deleteComplimentaryIssueRow(index) {
  complimentaryIssueDraft = normalizeComplimentaryIssue(complimentaryIssueDraft || defaultComplimentaryIssue());
  const fallback = complimentaryIssueSelectedRow;
  const rowIndex = Number.isFinite(Number(index)) ? Number(index) : fallback;
  complimentaryIssueDraft.lines = complimentaryIssueDraft.lines.filter((_, itemIndex) => itemIndex !== rowIndex);
  if (!complimentaryIssueDraft.lines.length) complimentaryIssueDraft.lines = [defaultComplimentaryIssueLine()];
  complimentaryIssueSelectedRow = Math.min(complimentaryIssueSelectedRow, complimentaryIssueDraft.lines.length - 1);
  render();
}

function saveComplimentaryPurchase() {
  const record = normalizeComplimentaryPurchase(complimentaryPurchaseDraft || defaultComplimentaryPurchase());
  if (!record.lines.some((line) => line.itemName && Number(line.quantity || 0) > 0)) {
    toast("Add at least one complimentary purchase item.");
    return;
  }
  state.complimentaryPurchases = [record, ...(state.complimentaryPurchases || []).filter((item) => item.id !== record.id)];
  rebuildComplimentaryStock();
  complimentaryPurchaseDraft = defaultComplimentaryPurchase();
  complimentaryPurchaseSelectedRow = 0;
  state.audit.unshift(audit(`Saved complimentary item purchase ${record.entryNo}`));
  saveState();
  render();
  toast("Complimentary item purchase saved.");
}

function saveComplimentaryIssue() {
  const record = normalizeComplimentaryIssue(complimentaryIssueDraft || defaultComplimentaryIssue());
  if (!record.lines.some((line) => line.itemName && Number(line.quantity || 0) > 0)) {
    toast("Add at least one complimentary issue item.");
    return;
  }
  const stockCheck = validateComplimentaryIssueStock(record);
  if (!stockCheck.ok) {
    toast(stockCheck.message);
    return;
  }
  state.complimentaryIssues = [record, ...(state.complimentaryIssues || []).filter((item) => item.id !== record.id)];
  rebuildComplimentaryStock();
  complimentaryIssueDraft = defaultComplimentaryIssue();
  complimentaryIssueSelectedRow = 0;
  state.audit.unshift(audit(`Saved complimentary item issue ${record.entryNo}`));
  saveState();
  render();
  toast("Complimentary item issue saved.");
}

function deleteComplimentaryPurchase() {
  const draft = complimentaryPurchaseDraft;
  if (draft?.id) state.complimentaryPurchases = (state.complimentaryPurchases || []).filter((item) => item.id !== draft.id);
  complimentaryPurchaseDraft = defaultComplimentaryPurchase();
  rebuildComplimentaryStock();
  state.audit.unshift(audit("Deleted complimentary item purchase entry"));
  saveState();
  render();
  toast("Complimentary purchase cleared.");
}

function deleteComplimentaryIssue() {
  const draft = complimentaryIssueDraft;
  if (draft?.id) state.complimentaryIssues = (state.complimentaryIssues || []).filter((item) => item.id !== draft.id);
  complimentaryIssueDraft = defaultComplimentaryIssue();
  rebuildComplimentaryStock();
  state.audit.unshift(audit("Deleted complimentary item issue entry"));
  saveState();
  render();
  toast("Complimentary issue cleared.");
}

function setupStockAdjustmentScreen() {
  document.querySelectorAll("[data-stock-adjust-field]").forEach((field) => {
    field.addEventListener("input", () => updateStockAdjustmentDraftField(field.dataset.stockAdjustField, field.value));
    field.addEventListener("change", () => {
      updateStockAdjustmentDraftField(field.dataset.stockAdjustField, field.value);
      render();
    });
  });
}

function setupOpeningStockScreen() {
  document.querySelectorAll("[data-opening-stock-date]").forEach((field) => {
    const update = () => updateOpeningStockDate(field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
  });
  document.querySelectorAll("[data-opening-stock-row]").forEach((field) => {
    const update = () => updateOpeningStockLine(Number(field.dataset.openingStockRow), field.dataset.openingStockField, field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
  });
}

function setupGoldDepositScreens() {
  document.querySelectorAll("[data-gold-deposit-field], [data-gold-withdrawal-field]").forEach((field) => {
    const type = field.dataset.goldWithdrawalField ? "Withdrawal" : "Deposit";
    const key = field.dataset.goldWithdrawalField || field.dataset.goldDepositField;
    const update = () => updateGoldDepositDraftField(type, key, field.type === "checkbox" ? field.checked : field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
  });
}

function setupSampleScreens() {
  document.querySelectorAll("[data-sample-view]").forEach((button) => {
    button.addEventListener("click", () => {
      sampleWorkView = button.dataset.sampleView;
      render();
    });
  });
  document.querySelectorAll("[data-sample-issue-field], [data-sample-return-field]").forEach((field) => {
    const type = field.dataset.sampleReturnField ? "Return" : "Issue";
    const key = field.dataset.sampleReturnField || field.dataset.sampleIssueField;
    const update = () => updateSampleDraftField(type, key, field.type === "checkbox" ? field.checked : field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
  });
}

function setupServiceScreens() {
  document.querySelectorAll("[data-service-view]").forEach((button) => {
    button.addEventListener("click", () => {
      serviceWorkView = button.dataset.serviceView;
      render();
    });
  });
  document.querySelectorAll("[data-service-field]").forEach((field) => {
    const update = () => updateServiceDraftField(currentServiceType(), field.dataset.serviceField, field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
  });
  document.querySelectorAll(".service-job-entry tr").forEach((row) => {
    const recalc = () => updateServicePreview(row, readServiceEntryLine(row));
    row.querySelectorAll("[data-line-field]").forEach((field) => {
      field.addEventListener("input", recalc);
      field.addEventListener("change", recalc);
      field.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        appendEntryLine(row);
      });
    });
    recalc();
  });
  document.querySelectorAll("[data-service-line-field]").forEach((field) => {
    const update = () => updateServiceLineField(currentServiceType(), Number(field.dataset.index), field.dataset.serviceLineField, field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
  });
}

function setupPolishingScreen() {
  document.querySelectorAll("[data-polishing-field]").forEach((field) => {
    const update = () => updatePolishingDraftField(field.dataset.polishingField, field.type === "checkbox" ? field.checked : field.value);
    field.addEventListener("input", update);
    field.addEventListener("change", () => {
      update();
      render();
    });
  });
}

function setupSmithWorkScreens() {
  document.querySelectorAll("[data-smith-work-view]").forEach((button) => {
    button.addEventListener("click", () => {
      smithWorkView = button.dataset.smithWorkView;
      render();
    });
  });
  document.querySelectorAll("[data-smith-field]").forEach((field) => {
    field.addEventListener("input", () => updateSmithWorkDraftField(field.dataset.smithField, field.value));
    field.addEventListener("change", () => {
      updateSmithWorkDraftField(field.dataset.smithField, field.value);
      render();
    });
  });
  document.querySelectorAll("[data-smith-check]").forEach((field) => {
    field.addEventListener("change", () => {
      smithWorkDraft = normalizeSmithWorkOrder(smithWorkDraft || defaultSmithWorkOrder());
      smithWorkDraft[field.dataset.smithCheck] = field.checked;
      render();
    });
  });
  document.querySelectorAll("[data-cash-smith-field]").forEach((field) => {
    field.addEventListener("input", () => updateCashSmithDraftField(field.dataset.cashSmithField, field.value));
    field.addEventListener("change", () => {
      updateCashSmithDraftField(field.dataset.cashSmithField, field.value);
      render();
    });
  });
  document.querySelectorAll("[data-cash-smith-check]").forEach((field) => {
    field.addEventListener("change", () => {
      cashWeightSmithDraft = normalizeCashWeightSmith(cashWeightSmithDraft || defaultCashWeightSmith());
      cashWeightSmithDraft[field.dataset.cashSmithCheck] = field.checked;
      render();
    });
  });
  document.querySelectorAll("[data-jeweller-field]").forEach((field) => {
    field.addEventListener("input", () => updateJewellerWorkDraftField(field.dataset.jewellerField, field.value));
    field.addEventListener("change", () => {
      updateJewellerWorkDraftField(field.dataset.jewellerField, field.value);
      render();
    });
  });
  document.querySelectorAll("[data-jeweller-check]").forEach((field) => {
    field.addEventListener("change", () => {
      jewellerWorkDraft = normalizeJewellerWorkOrder(jewellerWorkDraft || defaultJewellerWorkOrder());
      jewellerWorkDraft[field.dataset.jewellerCheck] = field.checked;
      render();
    });
  });
  document.querySelectorAll("[data-cash-jeweller-field]").forEach((field) => {
    field.addEventListener("input", () => updateCashJewellerDraftField(field.dataset.cashJewellerField, field.value));
    field.addEventListener("change", () => {
      updateCashJewellerDraftField(field.dataset.cashJewellerField, field.value);
      render();
    });
  });
  document.querySelectorAll("[data-cash-jeweller-check]").forEach((field) => {
    field.addEventListener("change", () => {
      cashWeightJewellerDraft = normalizeCashWeightJeweller(cashWeightJewellerDraft || defaultCashWeightJeweller());
      cashWeightJewellerDraft[field.dataset.cashJewellerCheck] = field.checked;
      render();
    });
  });
}

function setupRefineryScreens() {
  document.querySelectorAll("[data-refinery-view]").forEach((button) => {
    button.addEventListener("click", () => {
      refineryView = button.dataset.refineryView;
      render();
    });
  });
  document.querySelectorAll("[data-refinery-return-view]").forEach((button) => {
    button.addEventListener("click", () => {
      refineryReturnView = button.dataset.refineryReturnView;
      render();
    });
  });
  document.querySelectorAll("[data-refinery-final-view]").forEach((button) => {
    button.addEventListener("click", () => {
      refineryFinalView = button.dataset.refineryFinalView;
      render();
    });
  });
  document.querySelectorAll("[data-melting-return-view]").forEach((button) => {
    button.addEventListener("click", () => {
      meltingReturnView = button.dataset.meltingReturnView;
      render();
    });
  });
  document.querySelectorAll("[data-refinery-issue-field]").forEach((field) => {
    field.addEventListener("input", () => updateRefineryIssueDraftField(field.dataset.refineryIssueField, field.value));
    field.addEventListener("change", () => {
      updateRefineryIssueDraftField(field.dataset.refineryIssueField, field.value);
      render();
    });
  });
  document.querySelectorAll("[data-refinery-return-field]").forEach((field) => {
    field.addEventListener("input", () => updateRefineryReturnDraftField(field.dataset.refineryReturnField, field.value));
    field.addEventListener("change", () => {
      updateRefineryReturnDraftField(field.dataset.refineryReturnField, field.value);
      render();
    });
  });
  document.querySelectorAll("[data-refinery-final-field]").forEach((field) => {
    field.addEventListener("input", () => updateRefineryFinalDraftField(field.dataset.refineryFinalField, field.value));
    field.addEventListener("change", () => {
      updateRefineryFinalDraftField(field.dataset.refineryFinalField, field.value);
      render();
    });
  });
  document.querySelectorAll("[data-refinery-return-line-field]").forEach((field) => {
    field.addEventListener("input", () => updateRefineryReturnLineField(field.dataset.index, field.dataset.refineryReturnLineField, field.value));
    field.addEventListener("change", () => {
      updateRefineryReturnLineField(field.dataset.index, field.dataset.refineryReturnLineField, field.value);
      render();
    });
  });
  document.querySelectorAll("[data-refinery-final-line-field]").forEach((field) => {
    field.addEventListener("input", () => updateRefineryFinalLineField(field.dataset.index, field.dataset.refineryFinalLineField, field.value));
    field.addEventListener("change", () => {
      updateRefineryFinalLineField(field.dataset.index, field.dataset.refineryFinalLineField, field.value);
      render();
    });
  });
  document.querySelectorAll("[data-melting-issue-field]").forEach((field) => {
    field.addEventListener("input", () => updateMeltingIssueDraftField(field.dataset.meltingIssueField, field.value));
    field.addEventListener("change", () => {
      updateMeltingIssueDraftField(field.dataset.meltingIssueField, field.value);
      render();
    });
  });
  document.querySelectorAll("[data-melting-return-field]").forEach((field) => {
    field.addEventListener("input", () => updateMeltingReturnDraftField(field.dataset.meltingReturnField, field.value));
    field.addEventListener("change", () => {
      updateMeltingReturnDraftField(field.dataset.meltingReturnField, field.value);
      render();
    });
  });
  document.querySelectorAll("[data-melting-return-line-field]").forEach((field) => {
    field.addEventListener("input", () => updateMeltingReturnLineField(field.dataset.index, field.dataset.meltingReturnLineField, field.value));
    field.addEventListener("change", () => {
      updateMeltingReturnLineField(field.dataset.index, field.dataset.meltingReturnLineField, field.value);
      render();
    });
  });
}

function updateSmithWorkDraftField(field, value) {
  smithWorkDraft = normalizeSmithWorkOrder(smithWorkDraft || defaultSmithWorkOrder());
  const numericFields = ["addition", "discount", "cashPayment", "gstPct"];
  smithWorkDraft[field] = numericFields.includes(field) ? parseEntryNumber(value) : value;
  if (field === "smithName") {
    const smith = (state.parties || []).find((party) => party.type === "Smith" && party.name === value);
    if (smith) smithWorkDraft.smithCode = smith.customerCode || smith.customerId || smithWorkDraft.smithCode;
  }
}

function updateCashSmithDraftField(field, value) {
  cashWeightSmithDraft = normalizeCashWeightSmith(cashWeightSmithDraft || defaultCashWeightSmith());
  cashWeightSmithDraft[field] = value;
  if (field === "partyName") {
    const smith = (state.parties || []).find((party) => party.type === "Smith" && party.name === value);
    if (smith) cashWeightSmithDraft.partyCode = smith.customerCode || smith.customerId || cashWeightSmithDraft.partyCode;
  }
}

function updateJewellerWorkDraftField(field, value) {
  jewellerWorkDraft = normalizeJewellerWorkOrder(jewellerWorkDraft || defaultJewellerWorkOrder());
  const numericFields = ["addition", "discount", "cashPayment", "gstPct"];
  jewellerWorkDraft[field] = numericFields.includes(field) ? parseEntryNumber(value) : value;
  if (field === "jewellerName") {
    const jeweller = (state.parties || []).find((party) => party.type === "Jeweller" && party.name === value);
    if (jeweller) jewellerWorkDraft.jewellerCode = jeweller.customerCode || jeweller.customerId || jewellerWorkDraft.jewellerCode;
  }
}

function updateCashJewellerDraftField(field, value) {
  cashWeightJewellerDraft = normalizeCashWeightJeweller(cashWeightJewellerDraft || defaultCashWeightJeweller());
  cashWeightJewellerDraft[field] = value;
  if (field === "partyName") {
    const jeweller = (state.parties || []).find((party) => party.type === "Jeweller" && party.name === value);
    if (jeweller) cashWeightJewellerDraft.partyCode = jeweller.customerCode || jeweller.customerId || cashWeightJewellerDraft.partyCode;
  }
}

function updateStockAdjustmentDraftField(field, value) {
  stockAdjustmentDraft = normalizeStockAdjustment(stockAdjustmentDraft || defaultStockAdjustment());
  stockAdjustmentDraft[field] = value;
}

function updateOpeningStockDate(value) {
  openingStockDraft = normalizeOpeningStockEntry(openingStockDraft || defaultOpeningStockEntry(value));
  openingStockDraft.openingDate = value || financialYearOpeningDate();
  openingStockDraft.financialYear = financialYear(openingStockDraft.openingDate);
}

function updateOpeningStockLine(index, field, value) {
  openingStockDraft = normalizeOpeningStockEntry(openingStockDraft || defaultOpeningStockEntry());
  const line = { ...(openingStockDraft.lines[index] || {}), [field]: parseEntryNumber(value) };
  openingStockDraft.lines[index] = recalculateOpeningStockLine(line);
}

function updateGoldDepositDraftField(type, field, value) {
  const isWithdrawal = type === "Withdrawal";
  const draft = normalizeGoldDeposit((isWithdrawal ? goldWithdrawalDraft : goldDepositDraft) || defaultGoldDeposit(type), type);
  const numericFields = ["balanceWeight", "balanceAmount"];
  if (field === "byAmount") draft.byAmount = Boolean(value);
  else draft[field] = numericFields.includes(field) ? parseEntryNumber(value) : value;
  const totals = goldDepositFinancials(draft);
  draft.totalWeight = totals.totalWeight;
  draft.totalAmount = totals.totalAmount;
  draft.balanceWeight = totals.totalWeight;
  draft.balanceAmount = totals.totalAmount;
  if (isWithdrawal) goldWithdrawalDraft = draft;
  else goldDepositDraft = draft;
}

function updateSampleDraftField(type, field, value) {
  const isReturn = type === "Return";
  const draft = normalizeSample((isReturn ? sampleReturnDraft : sampleIssueDraft) || defaultSample(type), type);
  if (field === "selectJeweller" || field === "showRate") draft[field] = Boolean(value);
  else draft[field] = value;
  if (field === "jewellerName") {
    const jeweller = (state.parties || []).find((party) => party.type === "Jeweller" && party.name === value);
    if (jeweller) draft.jewellerCode = jeweller.customerCode || jeweller.customerId || draft.jewellerCode;
  }
  if (isReturn) sampleReturnDraft = draft;
  else sampleIssueDraft = draft;
}

function updatePolishingDraftField(field, value) {
  polishingDraft = normalizePolishingEntry(polishingDraft || defaultPolishingEntry());
  if (field === "hasParty") polishingDraft[field] = Boolean(value);
  else polishingDraft[field] = value;
}

function updateRefineryIssueDraftField(field, value) {
  refineryIssueDraft = normalizeRefineryIssue(refineryIssueDraft || defaultRefineryIssue());
  refineryIssueDraft[field] = ["expectedTouch"].includes(field) ? parseEntryNumber(value) : value;
}

function updateRefineryReturnDraftField(field, value) {
  refineryReturnDraft = normalizeRefineryReturn(refineryReturnDraft || defaultRefineryReturn());
  refineryReturnDraft[field] = value;
  if (field === "pendingIssueId") {
    const issue = selectedRefineryIssue(value);
    refineryReturnDraft.lines = issue ? issue.lines.map(defaultRefineryReturnLine) : [];
  }
}

function updateRefineryFinalDraftField(field, value) {
  refineryFinalDraft = normalizeRefineryFinalReturn(refineryFinalDraft || defaultRefineryFinalReturn());
  const numericFields = ["expectedTouch", "diffTouch", "refinerCharge", "addition", "discount", "cashPaid"];
  refineryFinalDraft[field] = numericFields.includes(field) ? parseEntryNumber(value) : value;
  if (field === "pendingIssueId") {
    const returnRecord = (state.refineryReturns || []).find((item) => item.pendingIssueId === value);
    const issue = selectedRefineryIssue(value);
    refineryFinalDraft.expectedTouch = issue?.expectedTouch || refineryFinalDraft.expectedTouch;
    refineryFinalDraft.lines = returnRecord?.lines?.length ? returnRecord.lines.map(defaultRefineryFinalLine) : issue?.lines?.map(defaultRefineryFinalLine) || [];
  }
}

function updateRefineryReturnLineField(index, field, value) {
  refineryReturnDraft = normalizeRefineryReturn(refineryReturnDraft || defaultRefineryReturn());
  const line = refineryReturnDraft.lines[Number(index)];
  if (!line) return;
  line[field] = field === "itemName" ? value : parseEntryNumber(value);
  refineryReturnDraft.lines[Number(index)] = normalizeRefineryReturnLine(line);
}

function updateRefineryFinalLineField(index, field, value) {
  refineryFinalDraft = normalizeRefineryFinalReturn(refineryFinalDraft || defaultRefineryFinalReturn());
  const line = refineryFinalDraft.lines[Number(index)];
  if (!line) return;
  line[field] = field === "itemName" ? value : parseEntryNumber(value);
  refineryFinalDraft.lines[Number(index)] = normalizeRefineryFinalLine(line);
  refineryFinalDraft = normalizeRefineryFinalReturn(refineryFinalDraft);
}

function updateMeltingIssueDraftField(field, value) {
  meltingIssueDraft = normalizeMeltingIssue(meltingIssueDraft || defaultMeltingIssue());
  meltingIssueDraft[field] = value;
}

function updateMeltingReturnDraftField(field, value) {
  meltingReturnDraft = normalizeMeltingReturn(meltingReturnDraft || defaultMeltingReturn());
  const numericFields = ["refinerCharge", "addition", "discount", "cashPaid"];
  meltingReturnDraft[field] = numericFields.includes(field) ? parseEntryNumber(value) : value;
  if (field === "pendingIssueId") {
    const issue = selectedMeltingIssue(value);
    meltingReturnDraft.lines = issue ? issue.lines.map(defaultMeltingReturnLine) : [];
  }
}

function updateMeltingReturnLineField(index, field, value) {
  meltingReturnDraft = normalizeMeltingReturn(meltingReturnDraft || defaultMeltingReturn());
  const line = meltingReturnDraft.lines[Number(index)];
  if (!line) return;
  line[field] = field === "itemName" ? value : parseEntryNumber(value);
  meltingReturnDraft.lines[Number(index)] = normalizeMeltingReturnLine(line);
}

function setupOrderAdvanceScreens() {
  document.querySelectorAll("[data-order-advance-field]").forEach((field) => {
    field.addEventListener("input", () => {
      updateOrderAdvanceDraft(orderAdvanceDraft, field.dataset.orderAdvanceField, field.value);
      updateOrderAdvanceLive("advance");
    });
    field.addEventListener("change", () => {
      updateOrderAdvanceDraft(orderAdvanceDraft, field.dataset.orderAdvanceField, field.value);
      render();
    });
  });
  document.querySelectorAll("[data-order-refund-field]").forEach((field) => {
    field.addEventListener("input", () => {
      updateOrderAdvanceDraft(orderAdvanceRefundDraft, field.dataset.orderRefundField, field.value);
      updateOrderAdvanceLive("refund");
    });
    field.addEventListener("change", () => {
      updateOrderAdvanceDraft(orderAdvanceRefundDraft, field.dataset.orderRefundField, field.value);
      render();
    });
  });
}

function setupDmdReturnScreens() {
  document.querySelectorAll("[data-dmd-return-field]").forEach((field) => {
    field.addEventListener("change", () => {
      state.dmdReturns ||= [normalizeDmdReturnBill()];
      const bill = normalizeDmdReturnBill({ ...state.dmdReturns[0], [field.dataset.dmdReturnField]: field.value });
      state.dmdReturns[0] = bill;
      render();
    });
  });
}

function setupBillCustomerLookup() {
  document.querySelectorAll("[data-customer-field]").forEach((field) => {
    field.addEventListener("input", () => updateCurrentCustomerField(field));
    field.addEventListener("change", () => {
      updateCurrentCustomerField(field);
      const match = findCustomerLookupMatch(field.value);
      if (match) {
        applyCustomerToCurrentBill(match, field.closest(".classic-billing-shell, .transaction-entry-header"));
        render();
      }
    });
    field.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      const match = findCustomerLookupMatch(field.value);
      if (!match) return;
      event.preventDefault();
      applyCustomerToCurrentBill(match, field.closest(".classic-billing-shell, .transaction-entry-header"));
      render();
    });
  });
}

function updateCurrentCustomerField(field) {
  const bill = currentCustomerBill(field.closest(".classic-billing-shell, .transaction-entry-header"));
  if (!bill) return;
  const key = field.dataset.customerField;
  const value = field.value;
  if (key === "customer") {
    bill.customer = value;
    bill.partyName = value;
  } else if (key === "customerId") {
    bill.customerId = value;
    bill.customerCode = value;
    bill.partyId = value;
  } else {
    bill[key] = value;
  }
}

function findCustomerLookupMatch(value = "") {
  const key = String(value || "").trim().toLowerCase();
  if (!key) return null;
  return (state.parties || []).find((party) => {
    if (party.type !== "Customer") return false;
    return [party.customerCode, party.id, party.name, party.phone, party.mobile].some((candidate) => String(candidate || "").trim().toLowerCase() === key);
  }) || null;
}

function currentCustomerBill(scope) {
  if (scope?.closest?.(".sales-order-shell") || scope?.classList?.contains("sales-order-header")) return salesOrderBill();
  if (scope?.closest?.(".direct-purchase-return-shell")) return state.directPurchaseReturns?.[0];
  if (scope?.closest?.(".direct-purchase-shell")) return state.directPurchases?.[0];
  if (scope?.closest?.(".dmd-return-shell")) return state.dmdReturns?.[0];
  if (scope?.closest?.(".dmd-wholesale-shell")) return state.dmdWholesales?.[0];
  if (scope?.closest?.(".purchase-entry-shell")) return purchaseBill();
  return state.bills?.[0] || null;
}

function applyCustomerToCurrentBill(customer, scope) {
  const bill = currentCustomerBill(scope);
  if (!bill) return;
  const code = customer.customerCode || customer.customerId || customer.id || "";
  bill.customerId = code;
  bill.customerCode = code;
  bill.partyId = code;
  bill.customer = customer.name || "";
  bill.partyName = customer.name || "";
  bill.address = customer.address || "";
  bill.phone = customer.phone || customer.mobile || "";
  bill.customerMobile = customer.mobile || customer.phone || "";
  bill.customerEmail = customer.email || "";
  bill.customerPlace = customer.place || "";
  bill.customerCity = customer.city || "";
  bill.customerState = customer.state || bill.customerState || "KERALA";
  bill.customerCountry = customer.country || bill.customerCountry || "INDIA";
  bill.customerPanGst = customer.panGst || customer.gstin || "";
  bill.customerPinCode = customer.pinCode || "";
  state.audit.unshift(audit(`Loaded customer ${customer.name || code}`));
  saveState();
}

function updateOrderAdvanceDraft(draft, field, value) {
  const numericFields = ["goldRateGram", "goldRateEightGram", "advanceAmount", "refundAmount"];
  draft[field] = numericFields.includes(field) ? parseEntryNumber(value) : value;
}

function updateOrderAdvanceLive(type) {
  const draft = type === "refund" ? orderAdvanceRefundDraft : orderAdvanceDraft;
  const order = findSalesOrderForAdvance(draft.pickOrder);
  const summary = orderAdvanceSummary(order, draft, type);
  document.querySelectorAll("[data-order-live]").forEach((target) => {
    const key = target.dataset.orderLive;
    if (key === "draftTotalAmount") target.value = moneyValue(summary.draftTotalAmount);
    if (key === "balance") target.value = moneyValue(summary.balance);
    if (key === "netAdvance") target.value = moneyValue(summary.netAdvance);
  });
}

function setupEntryGridCalculations() {
  document.querySelectorAll(".classic-entry-grid table tbody tr").forEach((row) => {
    if (row.closest(".service-job-entry")) return;
    const section = entrySectionForRow(row);
    const recalc = () => {
      if (row.closest(".smith-work-entry")) {
        updateSmithWorkPreview(row, readSmithWorkEntryLine(row));
        return;
      }
      if (row.closest(".cash-smith-entry")) {
        updateCashWeightSmithPreview(row, readCashWeightSmithEntryLine(row));
        return;
      }
      if (row.closest(".jeweller-work-entry")) {
        updateJewellerWorkPreview(row, readJewellerWorkEntryLine(row));
        return;
      }
      if (row.closest(".cash-jeweller-entry")) {
        updateCashWeightJewellerPreview(row, readCashWeightJewellerEntryLine(row));
        return;
      }
      if (row.closest(".stock-adjustment-entry")) {
        updateStockAdjustmentPreview(row, readStockAdjustmentEntryLine(row));
        return;
      }
      if (row.closest(".gold-deposit-entry")) {
        updateGoldDepositPreview(row, readGoldDepositEntryLine(row));
        return;
      }
      if (row.closest(".polishing-item-entry")) {
        updatePolishingPreview(row, readPolishingEntryLine(row));
        return;
      }
      if (row.closest(".polishing-stone-entry")) {
        updatePolishingStonePreview(row, readPolishingStoneEntryLine(row));
        return;
      }
      if (row.closest(".sample-entry")) {
        updateSamplePreview(row, readSampleEntryLine(row));
        return;
      }
      if (row.closest(".refinery-issue-entry")) {
        updateRefineryIssuePreview(row, readRefineryIssueEntryLine(row));
        return;
      }
      if (row.closest(".melting-issue-entry")) {
        updateMeltingIssuePreview(row, readMeltingIssueEntryLine(row));
        return;
      }
      if (row.closest(".dmd-return-entry")) {
        updateDmdReturnPreview(row, readDmdReturnEntryLine(row));
        return;
      }
      if (row.closest(".dmd-return-ornament")) {
        updateDmdWholesalePreview(row, readDmdWholesaleEntryLine(row));
        return;
      }
      if (row.closest(".dmd-return-stone")) {
        updateDmdStonePreview(row, readDmdStoneEntryLine(row));
        return;
      }
      if (row.closest(".dmd-wholesale-ornament")) {
        updateDmdWholesalePreview(row, readDmdWholesaleEntryLine(row));
        return;
      }
      if (row.closest(".dmd-wholesale-entry")) {
        updateDmdReturnPreview(row, readDmdReturnEntryLine(row));
        return;
      }
      if (row.closest(".dmd-wholesale-stone")) {
        updateDmdStonePreview(row, readDmdStoneEntryLine(row));
        return;
      }
      if (row.closest(".diamond-purchase-ornament")) {
        updateDmdWholesalePreview(row, readDmdWholesaleEntryLine(row));
        return;
      }
      if (row.closest(".diamond-purchase-stone")) {
        updateDmdStonePreview(row, readDmdStoneEntryLine(row));
        return;
      }
      if (row.closest(".diamond-purchase-return-ornament")) {
        updateDiamondPurchaseReturnPreview(row, readDiamondPurchaseReturnEntryLine(row));
        return;
      }
      if (row.closest(".diamond-purchase-return-stone")) {
        updateDmdStonePreview(row, readDmdPurchaseStoneEntryLine(row));
        return;
      }
      if (row.closest(".dmd-stone-purchase")) {
        updateDmdStonePreview(row, readDmdStonePurchaseEntryLine(row));
        return;
      }
      if (row.closest(".direct-purchase-return")) {
        updateDirectPurchasePreview(row, readDirectPurchaseEntryLine(row));
        return;
      }
      if (row.closest(".direct-purchase")) {
        updateDirectPurchasePreview(row, readDirectPurchaseEntryLine(row));
        return;
      }
      const line = readEntryLine(row, section);
      const outputs = {
        net: grams(line.net),
        totalMc: money(line.totalMc),
        makingCharge: money(line.makingCharge),
        tax: money(line.tax),
        itemTotal: money(line.itemTotal),
        amount: money(line.amount || line.itemTotal)
      };
      Object.entries(outputs).forEach(([field, value]) => {
        const output = row.querySelector(`[data-line-output="${field}"]`);
        if (output) output.textContent = value;
      });
      
      const inputsToUpdate = {
        item: line.item || "",
        itemCode: line.itemCode || line.item || "",
        itemName: line.itemName || "",
        va: numericValue(line.va, 2),
        lessWeight: numericValue(line.lessWeight),
        touchLess: numericValue(line.touchLess),
        mcPerGm: numericValue(line.mcPerGm, 2),
        totalMc: moneyValue(line.totalMc),
        makingCharge: moneyValue(line.makingCharge)
      };
      Object.entries(inputsToUpdate).forEach(([field, value]) => {
        const input = row.querySelector(`[data-line-field="${field}"]`);
        if (input && document.activeElement !== input) {
          input.value = value;
        }
      });
      
      updateEntryPreviewTotals(row, line, section);
    };
    row.querySelectorAll("[data-line-field]").forEach((input) => {
      input.addEventListener("input", recalc);
      input.addEventListener("change", recalc);
    });
    row.querySelectorAll("[data-line-field]").forEach((input) => {
      input.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        moveToNextBillField(input, () => appendEntryLine(row));
      });
    });
    recalc();
  });
}

function setupBillEnterNavigation() {
  document.querySelectorAll(".classic-billing-shell, .transaction-entry-header").forEach((scope) => {
    scope.querySelectorAll("input, select, textarea").forEach((field) => {
      if (field.dataset.lineField || field.readOnly || field.disabled) return;
      field.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" || event.shiftKey) return;
        event.preventDefault();
        moveToNextBillField(field);
      });
    });
  });
}

function billEntryFields(scope) {
  return [...scope.querySelectorAll("input, select, textarea")]
    .filter((field) => !field.disabled && !field.readOnly && field.type !== "hidden" && field.offsetParent !== null);
}

function moveToNextBillField(currentField, onLastField) {
  const scope = currentField.closest(".classic-billing-shell") || currentField.closest(".modal") || document;
  const fields = billEntryFields(scope);
  const index = fields.indexOf(currentField);
  const next = fields[index + 1];
  if (next) {
    next.focus();
    next.select?.();
    return true;
  }
  onLastField?.();
  return false;
}

function updateEntryPreviewTotals(row, line, section) {
  const area = row.closest(".classic-entry-area");
  const shell = row.closest(".classic-billing-shell");
  const strip = area?.nextElementSibling?.classList?.contains("classic-total-strip") ? area.nextElementSibling : null;
  const baseRows = entryRowsForTotals(row, section);
  const previewRows = [...baseRows, line].filter(Boolean);
  if (strip) {
    const setTotal = (label, value) => {
      const input = strip.querySelector(`[data-total-value="${label}"]`);
      if (input) input.value = value;
    };
    setTotal("Total", numericValue(sumField(previewRows, "qty"), 0));
    setTotal("Gross", grams(sumField(previewRows, "gross")));
    setTotal("Stone", grams(sumField(previewRows, "stone")));
    setTotal("Wastage", grams(sumField(previewRows, "wastage")));
    setTotal("Net", grams(sumField(previewRows, "net")));
    
    const labelKey = row.closest(".purchase-return") 
      ? "Purchase Return Total" 
      : row.closest(".purchase-entry") 
        ? "Purchase Total" 
        : row.closest(".sales-order-shell") && section === "order"
          ? "Sales Order Total"
          : `${capitalize(section)} Total`;
        
    setTotal(labelKey, money(sumLines(previewRows)));
  }
  const returnTotal = shell?.querySelector(".return-bottom .total-block .readout strong");
  if (returnTotal && section === "return") returnTotal.textContent = money(sumLines(previewRows));
}

function entryRowsForTotals(row, section) {
  const bill = row.closest(".sales-order-shell") ? salesOrderBill() : row.closest(".purchase-entry, .purchase-return") ? purchaseBill() : state.bills[0] || {};
  let sectionKey = section;
  if (row.closest(".purchase-entry, .purchase-return")) sectionKey = "exchange";
  if (row.closest(".sales-order-shell") && section === "order") sectionKey = "sales";
  const rows = bill.sections?.[sectionKey] || [];
  return rows.map((item) => normalizeBillLine(item, 0, bill, section === "purchase" ? "purchase" : sectionKey));
}

function capitalize(value) {
  return String(value || "").charAt(0).toUpperCase() + String(value || "").slice(1);
}

function entrySectionForRow(row) {
  if (row.closest(".dmd-return-entry")) return "dmd-return";
  if (row.closest(".dmd-return-ornament")) return "dmd-return-ornament";
  if (row.closest(".dmd-return-stone")) return "dmd-return-stone";
  if (row.closest(".dmd-wholesale-entry")) return "dmd-wholesale-entry";
  if (row.closest(".dmd-wholesale-ornament")) return "dmd-wholesale";
  if (row.closest(".dmd-wholesale-stone")) return "dmd-stone";
  if (row.closest(".diamond-purchase-ornament")) return "diamond-purchase-ornament";
  if (row.closest(".diamond-purchase-stone")) return "diamond-purchase-stone";
  if (row.closest(".diamond-purchase-return-ornament")) return "diamond-purchase-return-ornament";
  if (row.closest(".diamond-purchase-return-stone")) return "diamond-purchase-return-stone";
  if (row.closest(".dmd-stone-purchase")) return "dmd-stone-purchase";
  if (row.closest(".direct-purchase-return")) return "direct-purchase-return";
  if (row.closest(".direct-purchase")) return "direct-purchase";
  if (row.closest(".purchase-entry, .purchase-return")) return "purchase";
  if (row.closest(".sales-order-shell")) {
    if (salesOrderView === "Exchange") return "exchange";
    if (salesOrderView === "Return") return "return";
    return "order";
  }
  if (row.closest(".sales-return")) return "return";
  return billingView.toLowerCase();
}

function setupSavedLineEditing() {
  document.querySelectorAll("[data-edit-line-scope]").forEach((row) => {
    row.addEventListener("dblclick", () => loadSavedLineIntoEntry(row));
  });
}

function loadSavedLineIntoEntry(row) {
  const line = editableLineForRow(row);
  if (!line) {
    toast("Saved row not found.");
    return;
  }
  const entryRow = row.closest(".classic-entry-area")?.querySelector(".classic-entry-grid tbody tr");
  if (!entryRow) return;
  fillEntryRow(entryRow, line);
  entryRow.querySelector("[data-line-field]")?.focus();
  toast("Row loaded into the entry line. Make changes and press Enter to add corrected row.");
}

function editableLineForRow(row) {
  const index = Number(row.dataset.editLineIndex || 0);
  if (row.dataset.editLineScope === "bill") {
    const section = row.dataset.editLineSection || "sales";
    const bill = state.bills[0];
    return bill?.sections?.[section]?.[index] || null;
  }
  const kind = row.dataset.editLineKind || "";
  if (kind.startsWith("sales-order")) {
    const section = salesOrderView === "Exchange" ? "exchange" : salesOrderView === "Return" ? "return" : "sales";
    return salesOrderBill()?.sections?.[section]?.[index] || null;
  }
  if (kind === "purchase-entry" || kind === "purchase-return") return purchaseRows()[index] || null;
  if (kind === "direct-purchase") return state.directPurchases?.[0]?.lines?.[index] || null;
  if (kind === "direct-purchase-return") return state.directPurchaseReturns?.[0]?.lines?.[index] || null;
  if (kind === "dmd-return-ornament") return state.dmdReturns?.[0]?.ornamentLines?.[index] || null;
  if (kind === "dmd-return-stone") return state.dmdReturns?.[0]?.diamondLines?.[index] || null;
  if (kind === "dmd-wholesale-entry") return state.dmdWholesales?.[0]?.lines?.[index] || null;
  if (kind === "diamond-purchase-ornament") return state.diamondPurchases?.[0]?.ornamentLines?.[index] || null;
  if (kind === "diamond-purchase-stone") return state.diamondPurchases?.[0]?.diamondLines?.[index] || null;
  if (kind === "diamond-purchase-return-ornament") return state.diamondPurchaseReturns?.[0]?.ornamentLines?.[index] || null;
  if (kind === "diamond-purchase-return-stone") return state.diamondPurchaseReturns?.[0]?.diamondLines?.[index] || null;
  if (kind === "dmd-stone-purchase") return state.dmdStonePurchases?.[0]?.lines?.[index] || null;
  return null;
}

function fillEntryRow(entryRow, sourceLine) {
  const line = { ...sourceLine };
  const aliases = {
    barcode: ["barcode", "itemCode", "itemId"],
    itemCode: ["itemCode", "barcode", "itemId"],
    itemId: ["itemId", "itemCode", "barcode"],
    item: ["item"],
    itemName: ["itemName", "itemDescription", "colorType", "item"],
    itemDescription: ["itemDescription", "description", "itemName"],
    description: ["description", "itemDescription"],
    qty: ["qty", "nos"],
    nos: ["nos", "qty"],
    gross: ["gross"],
    stone: ["stone"],
    wastage: ["wastage"],
    mudLess: ["mudLess"],
    lessPct: ["lessPct"],
    lessWeight: ["lessWeight"],
    touchPct: ["touchPct", "touch"],
    touch: ["touch", "touchPct"],
    touchLess: ["touchLess"],
    stoneCharge: ["stoneCharge"],
    rateLessPct: ["rateLessPct", "ratePct"],
    rate: ["rate", "goldRate", "rateRtgs"],
    goldRate: ["goldRate", "rate"],
    va: ["va"],
    mcPerGm: ["mcPerGm", "mcGrm"],
    mcGrm: ["mcGrm", "mcPerGm"],
    makingCharge: ["makingCharge", "totalMc"],
    totalMc: ["totalMc", "makingCharge"],
    taxPct: ["taxPct"],
    cessPct: ["cessPct"],
    huid: ["huid"],
    length: ["length"],
    breadth: ["breadth"],
    model: ["model"],
    previousWeight: ["previousWeight"],
    diamondWtCent: ["diamondWtCent", "dmdWgt", "caratCent"],
    colourStoneWt: ["colourStoneWt"],
    crtCentRate: ["crtCentRate", "stnSPrice", "sellingRate"],
    diamondAmount: ["diamondAmount"],
    nos: ["nos", "qty"],
    stonePrice: ["stonePrice"],
    goldType: ["goldType"],
    salesType: ["salesType"],
    dmdWgt: ["dmdWgt", "diamondWtCent"],
    stnSPrice: ["stnSPrice", "crtCentRate", "sellingRate"],
    purMc: ["purMc", "purchaseMaking"],
    salesMc: ["salesMc"],
    type: ["type"],
    colorType: ["colorType", "itemName"],
    colorScale: ["colorScale"],
    shape: ["shape"],
    cut: ["cut"],
    clarity: ["clarity"],
    sieveSize: ["sieveSize"],
    caratCent: ["caratCent", "diamondWtCent"],
    ct: ["ct"],
    pcs: ["pcs"],
    purchaseRate: ["purchaseRate"],
    sellingRate: ["sellingRate"]
  };
  entryRow.querySelectorAll("[data-line-field]").forEach((field) => {
    const key = field.dataset.lineField;
    const candidates = aliases[key] || [key];
    const value = candidates.map((name) => line[name]).find((item) => item !== undefined && item !== null && item !== "");
    if (value === undefined || value === null) return;
    field.value = typeof value === "number" ? numericValue(value, String(key).toLowerCase().includes("qty") || key === "nos" || key === "pcs" ? 0 : 3) : value;
    field.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

function selectManagementRecord(kind, id, group = "") {
  if (!id) return;
  if (kind === "party") managementSelection.parties[group] = id;
  if (kind === "employee") managementSelection.employee = id;
  if (kind === "itemMaster") managementSelection.itemMaster = id;
  if (kind === "accountMaster") managementSelection.accountMaster = id;
  if (kind === "category") managementSelection.categories[group] = id;
  if (kind === "miscellaneous") managementSelection.miscellaneous[group] = id;
  render();
}

function readEntryLine(row, section) {
  const readNumber = (field) => {
    const fieldElement = row.querySelector(`[data-line-field="${field}"]`);
    return parseEntryNumber(fieldElement?.value);
  };
  const readText = (field) => row.querySelector(`[data-line-field="${field}"]`)?.value || "";
  const contextBill = row.closest(".sales-order-shell") ? salesOrderBill() : row.closest(".purchase-entry, .purchase-return") ? purchaseBill() : state.bills[0] || {};
  const editedField = document.activeElement?.closest?.("[data-line-field]")?.dataset?.lineField || "";
  return normalizeBillLine(enrichLineFromItemCatalog({
    id: crypto.randomUUID(),
    barcode: readText("barcode"),
    itemCode: readText("itemCode"),
    item: readText("item"),
    itemName: readText("itemName") || readText("item") || "Ornament",
    description: readText("description"),
    qty: readNumber("qty") || 1,
    gross: readNumber("gross"),
    stone: readNumber("stone"),
    wastage: readNumber("wastage"),
    mudLess: readNumber("mudLess"),
    lessPct: readNumber("lessPct"),
    lessWeight: readNumber("lessWeight"),
    touchPct: readNumber("touchPct"),
    touchLess: readNumber("touchLess"),
    stoneCharge: readNumber("stoneCharge"),
    rateLessPct: readNumber("rateLessPct"),
    rate: readNumber("rate"),
    va: readNumber("va"),
    mcPerGm: readNumber("mcPerGm"),
    vaDiscountPct: readNumber("vaDiscountPct"),
    makingCharge: readNumber("makingCharge"),
    dmdAmount: readNumber("dmdAmount"),
    discount: readNumber("discount"),
    taxPct: readNumber("taxPct"),
    cessPct: readNumber("cessPct"),
    huid: readText("huid"),
    itemDescription: readText("itemDescription"),
    length: readText("length"),
    breadth: readText("breadth"),
    model: readText("model"),
    _editedField: editedField
  }), 0, contextBill, section === "return" ? "return" : section);
}

function updateLineOutputs(row, outputs) {
  Object.entries(outputs).forEach(([field, value]) => {
    const output = row.querySelector(`[data-line-output="${field}"]`);
    if (output) output.textContent = value;
    const input = row.querySelector(`[data-line-field="${field}"]`);
    if (input && document.activeElement !== input) input.value = value;
  });
}

function readDmdReturnEntryLine(row) {
  const readNumber = (field) => parseEntryNumber(row.querySelector(`[data-line-field="${field}"]`)?.value);
  const readText = (field) => row.querySelector(`[data-line-field="${field}"]`)?.value || "";
  return normalizeDmdReturnLine({
    barcode: readText("barcode"),
    itemDescription: readText("itemDescription"),
    itemName: readText("itemDescription") || "DMD Item",
    qty: readNumber("qty") || 1,
    gross: readNumber("gross"),
    previousWeight: readNumber("previousWeight"),
    diamondWtCent: readNumber("diamondWtCent"),
    colourStoneWt: readNumber("colourStoneWt"),
    touch: readNumber("touch"),
    rateRtgs: readNumber("rateRtgs"),
    crtCentRate: readNumber("crtCentRate"),
    diamondAmount: readNumber("diamondAmount"),
    mcGrm: readNumber("mcGrm")
  });
}

function updateDmdReturnPreview(row, line) {
  updateLineOutputs(row, {
    netWeight: grams(line.netWeight),
    pureWeight: grams(line.pureWeight),
    makingCharge: money(line.makingCharge),
    amount: money(line.amount)
  });
  const diamondAmount = row.querySelector(`[data-line-field="diamondAmount"]`);
  if (diamondAmount && document.activeElement !== diamondAmount) diamondAmount.value = moneyValue(line.diamondAmount);
}

function readDmdWholesaleEntryLine(row) {
  const readNumber = (field) => parseEntryNumber(row.querySelector(`[data-line-field="${field}"]`)?.value);
  const readText = (field) => row.querySelector(`[data-line-field="${field}"]`)?.value || "";
  const returnMode = Boolean(row.closest(".dmd-return-ornament"));
  const returnType = row.closest(".dmd-return-shell")?.querySelector("[data-dmd-return-field='returnType']")?.value || state.dmdReturns?.[0]?.returnType || "Sales Return";
  return normalizeDmdWholesaleLine({
    itemId: readText("itemId"),
    itemDescription: readText("itemDescription"),
    itemName: readText("itemId") || "DMD Wholesale",
    nos: readNumber("nos") || 1,
    gross: readNumber("gross"),
    stone: readNumber("stone"),
    stonePrice: readNumber("stonePrice"),
    va: readNumber("va"),
    goldType: readText("goldType"),
    salesType: readText("salesType"),
    goldRate: readNumber("goldRate"),
    dmdWgt: readNumber("dmdWgt"),
    stnSPrice: readNumber("stnSPrice"),
    purMc: readNumber("purMc"),
    salesMc: readNumber("salesMc"),
    returnType
  }, { returnMode, returnType });
}

function updateDmdWholesalePreview(row, line) {
  updateLineOutputs(row, {
    total: money(line.total),
    salesAmt: money(line.salesAmt)
  });
}

function readDiamondPurchaseReturnEntryLine(row) {
  const readNumber = (field) => parseEntryNumber(row.querySelector(`[data-line-field="${field}"]`)?.value);
  const readText = (field) => row.querySelector(`[data-line-field="${field}"]`)?.value || "";
  return normalizeDiamondPurchaseReturnLine({
    itemId: readText("itemId"),
    itemName: readText("itemName") || readText("itemId") || "Diamond Purchase Return",
    barcode: readText("barcode"),
    nos: readNumber("nos") || 1,
    gross: readNumber("gross"),
    stone: readNumber("stone"),
    type: readText("type"),
    stonePrice: readNumber("stonePrice"),
    goldType: readText("goldType"),
    goldRate: readNumber("goldRate"),
    dmdWgt: readNumber("dmdWgt"),
    purMc: readNumber("purMc"),
    salesType: readText("type") || "Weight"
  });
}

function updateDiamondPurchaseReturnPreview(row, line) {
  updateLineOutputs(row, {
    netWeight: grams(line.netWeight),
    total: money(line.total)
  });
}

function readDirectPurchaseEntryLine(row) {
  const readNumber = (field) => parseEntryNumber(row.querySelector(`[data-line-field="${field}"]`)?.value);
  const readText = (field) => row.querySelector(`[data-line-field="${field}"]`)?.value || "";
  const editedField = document.activeElement?.closest?.("[data-line-field]")?.dataset?.lineField || "";
  return normalizeDirectPurchaseLine(enrichLineFromItemCatalog({
    itemId: readText("itemId"),
    itemName: readText("itemName") || readText("itemId") || "Direct Purchase",
    qty: readNumber("qty") || 1,
    gross: readNumber("gross"),
    stone: readNumber("stone"),
    rate: readNumber("rate"),
    stoneCharge: readNumber("stoneCharge"),
    mcPerGm: readNumber("mcPerGm"),
    totalMc: readNumber("totalMc"),
    _editedField: editedField,
    taxPct: readNumber("taxPct")
  }));
}

function updateDirectPurchasePreview(row, line) {
  updateLineOutputs(row, {
    net: grams(line.net),
    mcPerGm: numericValue(line.mcPerGm, 2),
    totalMc: moneyValue(line.totalMc),
    tax: money(line.tax),
    itemTotal: money(line.itemTotal)
  });
  updateDirectPurchasePreviewTotals(row, line);
}

function updateDirectPurchasePreviewTotals(row, line) {
  const shell = row.closest(".direct-purchase-shell");
  const strip = shell?.querySelector(".direct-purchase-bottom");
  if (!strip) return;
  const savedBill = row.closest(".direct-purchase-return")
    ? normalizeDirectPurchaseReturnBill(state.directPurchaseReturns?.[0])
    : normalizeDirectPurchaseBill(state.directPurchases?.[0]);
  const totals = directPurchaseFinancials({
    ...savedBill,
    lines: [...(savedBill.lines || []), line].filter(Boolean)
  });
  const setReadout = (label, value, occurrence = 0) => {
    const readouts = [...strip.querySelectorAll(".readout")].filter((item) => item.querySelector("span")?.textContent === label);
    const target = readouts[occurrence]?.querySelector("strong");
    if (target) target.textContent = value;
  };
  setReadout("Bill Amount", money(totals.billAmount));
  setReadout("Addition", money(totals.addition));
  setReadout("Discount", money(totals.discount));
  setReadout("GST / VAT", money(totals.gstVat));
  setReadout("Cess Amt", money(totals.cess));
  setReadout("Invoice Total", money(totals.invoiceTotal));
  setReadout("Round off", money(totals.roundOff));
  setReadout("Account Balance", money(totals.accountBalance), 0);
  setReadout("Cash Payment", money(totals.payment));
  setReadout("Account Balance", money(totals.accountBalance), 1);
}

function readSmithWorkEntryLine(row) {
  const readNumber = (field) => parseEntryNumber(row.querySelector(`[data-line-field="${field}"]`)?.value);
  const readText = (field) => row.querySelector(`[data-line-field="${field}"]`)?.value || "";
  return normalizeSmithWorkLine({
    barcode: readText("barcode"),
    itemName: readText("itemName"),
    mode: readText("mode") || "IN",
    qty: readNumber("qty"),
    gross: readNumber("gross"),
    stone: readNumber("stone"),
    touch: readNumber("touch"),
    wastage: readNumber("wastage"),
    stoneCharge: readNumber("stoneCharge"),
    mcGram: readNumber("mcGram"),
    hmc: readNumber("hmc"),
    rate: readNumber("rate")
  });
}

function updateSmithWorkPreview(row, line) {
  const updates = {
    smWeight: numericValue(line.smWeight),
    mc: moneyValue(line.mc),
    total: moneyValue(line.total)
  };
  Object.entries(updates).forEach(([field, value]) => {
    const input = row.querySelector(`[data-line-field="${field}"]`);
    if (input && document.activeElement !== input) input.value = value;
  });
}

function readCashWeightSmithEntryLine(row) {
  const readNumber = (field) => parseEntryNumber(row.querySelector(`[data-line-field="${field}"]`)?.value);
  const line = normalizeCashWeightSmithLine({
    amount: readNumber("amount"),
    rate: readNumber("rate"),
    weight: readNumber("weight"),
    touch: readNumber("touch"),
    convert: readNumber("convert")
  });
  const activeField = document.activeElement?.dataset?.lineField;
  if (activeField === "amount" && line.rate) line.weight = line.amount / line.rate;
  if (activeField === "weight" && line.rate) line.amount = line.weight * line.rate;
  line.netWeight = line.convert ? line.weight * line.touch / line.convert : line.weight;
  return normalizeCashWeightSmithLine(line);
}

function updateCashWeightSmithPreview(row, line) {
  const updates = {
    amount: moneyValue(line.amount),
    weight: numericValue(line.weight),
    netWeight: numericValue(line.netWeight)
  };
  Object.entries(updates).forEach(([field, value]) => {
    const input = row.querySelector(`[data-line-field="${field}"]`);
    if (input && document.activeElement !== input) input.value = value;
  });
}

function readJewellerWorkEntryLine(row) {
  const readNumber = (field) => parseEntryNumber(row.querySelector(`[data-line-field="${field}"]`)?.value);
  const readText = (field) => row.querySelector(`[data-line-field="${field}"]`)?.value || "";
  return normalizeJewellerWorkLine({
    barcode: readText("barcode"),
    itemName: readText("itemName"),
    mode: readText("mode") || "OUT",
    qty: readNumber("qty"),
    gross: readNumber("gross"),
    stone: readNumber("stone"),
    wastage: readNumber("wastage"),
    touch: readNumber("touch"),
    stoneCharge: readNumber("stoneCharge"),
    mcGram: readNumber("mcGram"),
    vaPercent: readNumber("vaPercent"),
    hmc: readNumber("hmc"),
    rate: readNumber("rate")
  });
}

function updateJewellerWorkPreview(row, line) {
  const updates = {
    jwWeight: numericValue(line.jwWeight),
    mc: moneyValue(line.mc),
    total: moneyValue(line.total)
  };
  Object.entries(updates).forEach(([field, value]) => {
    const input = row.querySelector(`[data-line-field="${field}"]`);
    if (input && document.activeElement !== input) input.value = value;
  });
}

function readCashWeightJewellerEntryLine(row) {
  return readCashWeightSmithEntryLine(row);
}

function updateCashWeightJewellerPreview(row, line) {
  updateCashWeightSmithPreview(row, line);
}

function readStockAdjustmentEntryLine(row) {
  const readNumber = (field) => parseEntryNumber(row.querySelector(`[data-line-field="${field}"]`)?.value);
  const readText = (field) => row.querySelector(`[data-line-field="${field}"]`)?.value || "";
  return normalizeStockAdjustmentLine({
    type: readText("type"),
    barcode: readText("barcode"),
    itemName: readText("itemName"),
    nos: readNumber("nos"),
    gross: readNumber("gross"),
    stone: readNumber("stone"),
    nosAdd: readNumber("nosAdd"),
    grossAdd: readNumber("grossAdd"),
    stoneAdd: readNumber("stoneAdd"),
    nosLess: readNumber("nosLess"),
    grossLess: readNumber("grossLess"),
    stoneLess: readNumber("stoneLess")
  });
}

function updateStockAdjustmentPreview(row, line) {
  const updates = {
    net: grams(line.net),
    closingNos: numericValue(line.closingNos, 0),
    closingGross: grams(line.closingGross),
    closingStone: grams(line.closingStone),
    closingNet: grams(line.closingNet)
  };
  Object.entries(updates).forEach(([field, value]) => {
    const input = row.querySelector(`[data-line-field="${field}"]`);
    if (input && document.activeElement !== input) input.value = value;
  });
}

function readGoldDepositEntryLine(row) {
  const readNumber = (field) => parseEntryNumber(row.querySelector(`[data-line-field="${field}"]`)?.value);
  const readText = (field) => row.querySelector(`[data-line-field="${field}"]`)?.value || "";
  const amountText = row.querySelector(`[data-line-field="amount"]`)?.value;
  const amountValue = readNumber("amount");
  const activeField = document.activeElement?.dataset?.lineField;
  const type = stockView === "Gold Withdrawal" ? "Withdrawal" : "Deposit";
  const draft = type === "Withdrawal" ? goldWithdrawalDraft : goldDepositDraft;
  const amountWasEntered = activeField === "amount" || (draft?.byAmount && amountValue > 0);
  const line = normalizeGoldDepositLine({
    itemId: readText("itemId"),
    itemName: readText("itemName") || "OLD GOLD",
    gross: readNumber("gross"),
    stone: readNumber("stone"),
    mudless: readNumber("mudless"),
    touch: readNumber("touch"),
    rate: readNumber("rate"),
    amount: String(amountText || "").trim() && amountWasEntered ? amountValue : undefined
  });
  if (draft?.byAmount && line.amount > 0 && line.rate > 0) {
    line.partyWeight = line.amount / line.rate;
  }
  return normalizeGoldDepositLine(line);
}

function updateGoldDepositPreview(row, line) {
  const updates = {
    net: numericValue(line.net),
    partyWeight: numericValue(line.partyWeight),
    amount: moneyValue(line.amount)
  };
  Object.entries(updates).forEach(([field, value]) => {
    const input = row.querySelector(`[data-line-field="${field}"]`);
    if (input && document.activeElement !== input) input.value = value;
  });
}

function readDmdStoneEntryLine(row) {
  const readNumber = (field) => parseEntryNumber(row.querySelector(`[data-line-field="${field}"]`)?.value);
  const readText = (field) => row.querySelector(`[data-line-field="${field}"]`)?.value || "";
  const line = normalizeDmdStoneLine({
    colorType: readText("colorType"),
    colorScale: readText("colorScale"),
    shape: readText("shape"),
    cut: readText("cut"),
    clarity: readText("clarity"),
    sieveSize: readText("sieveSize"),
    caratCent: readNumber("caratCent"),
    ct: readText("ct"),
    pcs: readNumber("pcs"),
    purchaseRate: readNumber("purchaseRate"),
    sellingRate: readNumber("sellingRate")
  });
  line.amount = Math.round(Number(line.caratCent || 0) * Number(line.sellingRate || 0));
  return line;
}

function readDmdPurchaseStoneEntryLine(row) {
  const line = readDmdStoneEntryLine(row);
  line.amount = Math.round(Number(line.caratCent || 0) * Number(line.purchaseRate || 0));
  return line;
}

function readDmdStonePurchaseEntryLine(row) {
  const readNumber = (field) => parseEntryNumber(row.querySelector(`[data-line-field="${field}"]`)?.value);
  const readText = (field) => row.querySelector(`[data-line-field="${field}"]`)?.value || "";
  const line = normalizeDmdPurchaseStoneLine({
    itemName: readText("itemName") || readText("colorType") || "DMD Stone",
    nos: readNumber("nos") || 1,
    colorType: readText("colorType"),
    colorScale: readText("colorScale"),
    shape: readText("shape"),
    cut: readText("cut"),
    clarity: readText("clarity"),
    sieveSize: readText("sieveSize"),
    caratCent: readNumber("caratCent"),
    ct: readText("ct"),
    pcs: readNumber("pcs"),
    purchaseRate: readNumber("purchaseRate"),
    sellingRate: readNumber("sellingRate")
  });
  line.amount = Math.round(Number(line.caratCent || 0) * Number(line.purchaseRate || 0));
  return line;
}

function updateDmdStonePreview(row, line) {
  updateLineOutputs(row, { amount: money(line.amount) });
}

function readRefineryIssueEntryLine(row) {
  const readNumber = (field) => parseEntryNumber(row.querySelector(`[data-line-field="${field}"]`)?.value);
  const readText = (field) => row.querySelector(`[data-line-field="${field}"]`)?.value || "";
  return normalizeRefineryIssueLine({
    itemId: readText("itemId"),
    itemName: readText("itemName") || readText("itemId") || "Refinery Item",
    qty: readNumber("qty"),
    gross: readNumber("gross"),
    stone: readNumber("stone"),
    rate: readNumber("rate")
  });
}

function updateRefineryIssuePreview(row, line) {
  updateLineOutputs(row, {
    net: grams(line.net),
    amount: money(line.amount)
  });
  const updates = {
    net: numericValue(line.net),
    amount: moneyValue(line.amount)
  };
  Object.entries(updates).forEach(([field, value]) => {
    const input = row.querySelector(`[data-line-field="${field}"]`);
    if (input && document.activeElement !== input) input.value = value;
  });
}

function readMeltingIssueEntryLine(row) {
  const readNumber = (field) => parseEntryNumber(row.querySelector(`[data-line-field="${field}"]`)?.value);
  const readText = (field) => row.querySelector(`[data-line-field="${field}"]`)?.value || "";
  return normalizeMeltingIssueLine({
    itemId: readText("itemId"),
    itemName: readText("itemName") || readText("itemId") || "Melting Item",
    qty: readNumber("qty"),
    gross: readNumber("gross"),
    stone: readNumber("stone"),
    rate: readNumber("rate")
  });
}

function updateMeltingIssuePreview(row, line) {
  updateLineOutputs(row, {
    net: grams(line.net),
    amount: money(line.amount)
  });
  const updates = {
    net: numericValue(line.net),
    amount: moneyValue(line.amount)
  };
  Object.entries(updates).forEach(([field, value]) => {
    const input = row.querySelector(`[data-line-field="${field}"]`);
    if (input && document.activeElement !== input) input.value = value;
  });
}

function readSampleEntryLine(row) {
  const readNumber = (field) => parseEntryNumber(row.querySelector(`[data-line-field="${field}"]`)?.value);
  const readText = (field) => row.querySelector(`[data-line-field="${field}"]`)?.value || "";
  return normalizeSampleLine({
    itemId: readText("itemId"),
    barcode: readText("barcode"),
    itemName: readText("itemName"),
    qty: readNumber("qty") || 1,
    gross: readNumber("gross"),
    stone: readNumber("stone"),
    rate: readNumber("rate"),
    hmc: readNumber("hmc"),
    taxPct: readNumber("taxPct")
  });
}

function updateSamplePreview(row, line) {
  updateLineOutputs(row, {
    net: grams(line.net),
    taxAmount: money(line.taxAmount),
    total: money(line.total)
  });
  const updates = {
    net: numericValue(line.net),
    taxAmount: moneyValue(line.taxAmount),
    total: moneyValue(line.total)
  };
  Object.entries(updates).forEach(([field, value]) => {
    const input = row.querySelector(`[data-line-field="${field}"]`);
    if (input && document.activeElement !== input) input.value = value;
  });
}

function readPolishingEntryLine(row) {
  const readNumber = (field) => parseEntryNumber(row.querySelector(`[data-line-field="${field}"]`)?.value);
  const readText = (field) => row.querySelector(`[data-line-field="${field}"]`)?.value || "";
  return normalizePolishingLine({
    itemId: readText("itemId"),
    barcode: readText("barcode"),
    itemName: readText("itemName"),
    qty: readNumber("qty") || 1,
    gross: readNumber("gross"),
    stone: readNumber("stone")
  });
}

function updatePolishingPreview(row, line) {
  updateLineOutputs(row, { net: grams(line.net) });
  const input = row.querySelector(`[data-line-field="net"]`);
  if (input && document.activeElement !== input) input.value = numericValue(line.net);
}

function readPolishingStoneEntryLine(row) {
  const readNumber = (field) => parseEntryNumber(row.querySelector(`[data-line-field="${field}"]`)?.value);
  const readText = (field) => row.querySelector(`[data-line-field="${field}"]`)?.value || "";
  return normalizePolishingStoneLine({
    code: readText("code"),
    barcode: readText("barcode"),
    colorType: readText("colorType"),
    colorScale: readText("colorScale"),
    shape: readText("shape"),
    cut: readText("cut"),
    clarity: readText("clarity"),
    sieveSize: readText("sieveSize"),
    caratCent: readNumber("caratCent"),
    ct: readText("ct") || "Cnt",
    pcs: readNumber("pcs"),
    purchaseRate: readNumber("purchaseRate"),
    sellingRate: readNumber("sellingRate")
  });
}

function updatePolishingStonePreview(row, line) {
  updateLineOutputs(row, { amount: money(line.amount) });
  const input = row.querySelector(`[data-line-field="amount"]`);
  if (input && document.activeElement !== input) input.value = moneyValue(line.amount);
}

function appendEntryLine(row) {
  if (row.closest(".smith-work-entry")) {
    appendSmithWorkLine(row);
    return;
  }
  if (row.closest(".cash-smith-entry")) {
    appendCashWeightSmithLine(row);
    return;
  }
  if (row.closest(".jeweller-work-entry")) {
    appendJewellerWorkLine(row);
    return;
  }
  if (row.closest(".cash-jeweller-entry")) {
    appendCashWeightJewellerLine(row);
    return;
  }
  if (row.closest(".stock-adjustment-entry")) {
    appendStockAdjustmentLine(row);
    return;
  }
  if (row.closest(".gold-deposit-entry")) {
    appendGoldDepositLine(row);
    return;
  }
  if (row.closest(".polishing-item-entry")) {
    appendPolishingLine(row);
    return;
  }
  if (row.closest(".polishing-stone-entry")) {
    appendPolishingStone(row);
    return;
  }
  if (row.closest(".sample-entry")) {
    appendSampleLine(row);
    return;
  }
  if (row.closest(".service-job-entry")) {
    appendServiceLine(row);
    return;
  }
  if (row.closest(".refinery-issue-entry")) {
    appendRefineryIssueLine(row);
    return;
  }
  if (row.closest(".melting-issue-entry")) {
    appendMeltingIssueLine(row);
    return;
  }
  if (row.closest(".dmd-return-entry")) {
    appendDmdReturnLine(row);
    return;
  }
  if (row.closest(".dmd-return-ornament")) {
    appendDmdReturnOrnamentLine(row);
    return;
  }
  if (row.closest(".dmd-return-stone")) {
    appendDmdReturnStoneLine(row);
    return;
  }
  if (row.closest(".dmd-wholesale-entry")) {
    appendDmdWholesaleClassicLine(row);
    return;
  }
  if (row.closest(".dmd-wholesale-ornament")) {
    appendDmdWholesaleLine(row);
    return;
  }
  if (row.closest(".dmd-wholesale-stone")) {
    appendDmdStoneLine(row);
    return;
  }
  if (row.closest(".diamond-purchase-ornament")) {
    appendDiamondPurchaseOrnamentLine(row);
    return;
  }
  if (row.closest(".diamond-purchase-stone")) {
    appendDiamondPurchaseStoneLine(row);
    return;
  }
  if (row.closest(".diamond-purchase-return-ornament")) {
    appendDiamondPurchaseReturnOrnamentLine(row);
    return;
  }
  if (row.closest(".diamond-purchase-return-stone")) {
    appendDiamondPurchaseReturnStoneLine(row);
    return;
  }
  if (row.closest(".dmd-stone-purchase")) {
    appendDmdStonePurchaseLine(row);
    return;
  }
  if (row.closest(".direct-purchase")) {
    appendDirectPurchaseLine(row);
    return;
  }
  if (row.closest(".direct-purchase-return")) {
    appendDirectPurchaseReturnLine(row);
    return;
  }
  const section = entrySectionForRow(row);
  const line = readEntryLine(row, section);
  const hasTypedText = ["barcode", "itemName", "description"].some((field) => row.querySelector(`[data-line-field="${field}"]`)?.value?.trim());
  const hasUsefulValue = hasTypedText || line.gross > 0 || line.amount > 0 || line.itemTotal > 0;
  if (!hasUsefulValue) {
    toast("Enter item details before adding.");
    return;
  }
  const bill = row.closest(".purchase-entry, .purchase-return") ? purchaseBill() : row.closest(".sales-order-shell") ? salesOrderBill() : state.bills[0];
  if (!bill) return;
  const storeSection = row.closest(".purchase-entry, .purchase-return") ? "exchange" : section === "order" ? "sales" : section;
  bill.sections ||= { sales: [], exchange: [], return: [] };
  bill.sections[storeSection] ||= [];
  bill.sections[storeSection].push(line);
  bill.line = line;
  applyBillFinancials(bill);
  state.audit.unshift(audit(`Added ${line.itemName} to ${storeSection} bill`));
  saveState();
  render();
  toast("Item added to bill.");
}

function appendSmithWorkLine(row) {
  const line = readSmithWorkEntryLine(row);
  if (!line.itemName && !line.barcode && line.gross <= 0 && line.total <= 0 && line.mc <= 0) {
    toast("Enter Smith item details before adding.");
    return;
  }
  smithWorkDraft = normalizeSmithWorkOrder(smithWorkDraft || defaultSmithWorkOrder());
  smithWorkDraft.lines.push(line);
  state.audit.unshift(audit(`Added ${line.itemName || "Smith item"} to Smith work order`));
  render();
  toast("Smith item added.");
}

function appendCashWeightSmithLine(row) {
  const line = readCashWeightSmithEntryLine(row);
  if (line.amount <= 0 && line.weight <= 0) {
    toast("Enter amount or weight before adding.");
    return;
  }
  cashWeightSmithDraft = normalizeCashWeightSmith(cashWeightSmithDraft || defaultCashWeightSmith());
  cashWeightSmithDraft.lines.push(line);
  state.audit.unshift(audit("Added cash for weight Smith line"));
  render();
  toast("Cash for weight line added.");
}

function appendJewellerWorkLine(row) {
  const line = readJewellerWorkEntryLine(row);
  if (!line.itemName && !line.barcode && line.gross <= 0 && line.total <= 0 && line.mc <= 0) {
    toast("Enter Jeweller item details before adding.");
    return;
  }
  jewellerWorkDraft = normalizeJewellerWorkOrder(jewellerWorkDraft || defaultJewellerWorkOrder());
  jewellerWorkDraft.lines.push(line);
  state.audit.unshift(audit(`Added ${line.itemName || "Jeweller item"} to Jeweller work order`));
  render();
  toast("Jeweller item added.");
}

function appendCashWeightJewellerLine(row) {
  const line = readCashWeightJewellerEntryLine(row);
  if (line.amount <= 0 && line.weight <= 0) {
    toast("Enter amount or weight before adding.");
    return;
  }
  cashWeightJewellerDraft = normalizeCashWeightJeweller(cashWeightJewellerDraft || defaultCashWeightJeweller());
  cashWeightJewellerDraft.lines.push(line);
  state.audit.unshift(audit("Added cash for weight Jeweller line"));
  render();
  toast("Cash for weight Jeweller line added.");
}

function appendSampleLine(row) {
  const line = readSampleEntryLine(row);
  if (!line.itemName && !line.barcode && !line.itemId && line.gross <= 0 && line.total <= 0) {
    toast("Enter sample item details before adding.");
    return;
  }
  const type = sampleWorkView === "Sample Return" ? "Return" : "Issue";
  if (type === "Return") {
    sampleReturnDraft = normalizeSample(sampleReturnDraft || defaultSample("Return"), "Return");
    sampleReturnDraft.lines.push(line);
  } else {
    sampleIssueDraft = normalizeSample(sampleIssueDraft || defaultSample("Issue"), "Issue");
    sampleIssueDraft.lines.push(line);
  }
  state.audit.unshift(audit(`Added ${line.itemName || line.barcode || "sample item"} to Sample ${type}`));
  render();
  toast(`Sample ${type.toLowerCase()} item added.`);
}

function appendPolishingLine(row) {
  const line = readPolishingEntryLine(row);
  if (!line.itemName && !line.barcode && !line.itemId && line.gross <= 0) {
    toast("Enter polishing item details before adding.");
    return;
  }
  polishingDraft = normalizePolishingEntry(polishingDraft || defaultPolishingEntry());
  polishingDraft.lines.push(line);
  state.audit.unshift(audit(`Added ${line.itemName || line.barcode || "polishing item"} to Polishing`));
  render();
  toast("Polishing item added.");
}

function appendPolishingStone(row) {
  const line = readPolishingStoneEntryLine(row);
  if (!line.barcode && !line.colorType && !line.shape && line.amount <= 0 && line.pcs <= 0 && line.caratCent <= 0) {
    toast("Enter polishing stone details before adding.");
    return;
  }
  polishingDraft = normalizePolishingEntry(polishingDraft || defaultPolishingEntry());
  polishingDraft.stones.push(line);
  state.audit.unshift(audit("Added polishing stone detail"));
  render();
  toast("Polishing stone detail added.");
}

function appendStockAdjustmentLine(row) {
  const line = readStockAdjustmentEntryLine(row);
  const hasText = Boolean(line.barcode || line.itemName);
  const hasMovement = line.nosAdd > 0 || line.grossAdd > 0 || line.stoneAdd > 0 || line.nosLess > 0 || line.grossLess > 0 || line.stoneLess > 0;
  if (!hasText && !hasMovement) {
    toast("Enter stock adjustment details before adding.");
    return;
  }
  stockAdjustmentDraft = normalizeStockAdjustment(stockAdjustmentDraft || defaultStockAdjustment());
  stockAdjustmentDraft.lines.push(line);
  state.audit.unshift(audit(`Added stock adjustment line ${line.itemName || line.barcode || ""}`.trim()));
  render();
  toast("Stock adjustment line added.");
}

function appendGoldDepositLine(row) {
  const type = stockView === "Gold Withdrawal" ? "Withdrawal" : "Deposit";
  const line = readGoldDepositEntryLine(row);
  const hasText = Boolean(line.itemId || line.itemName);
  const hasValue = line.gross > 0 || line.partyWeight > 0 || line.amount > 0;
  if (!hasText && !hasValue) {
    toast(`Enter gold ${type.toLowerCase()} details before adding.`);
    return;
  }
  if (type === "Withdrawal") {
    goldWithdrawalDraft = normalizeGoldDeposit(goldWithdrawalDraft || defaultGoldDeposit(type), type);
    goldWithdrawalDraft.lines.push(line);
  } else {
    goldDepositDraft = normalizeGoldDeposit(goldDepositDraft || defaultGoldDeposit(type), type);
    goldDepositDraft.lines.push(line);
  }
  state.audit.unshift(audit(`Added ${line.itemName || "gold item"} to ${type}`));
  render();
  toast(`${type} item added.`);
}

function appendRefineryIssueLine(row) {
  const line = readRefineryIssueEntryLine(row);
  const hasText = Boolean(line.itemId || line.itemName);
  const hasValue = line.qty > 0 || line.gross > 0 || line.amount > 0;
  if (!hasText && !hasValue) {
    toast("Enter refinery issue item details before adding.");
    return;
  }
  refineryIssueDraft = normalizeRefineryIssue(refineryIssueDraft || defaultRefineryIssue());
  refineryIssueDraft.lines.push(line);
  state.audit.unshift(audit(`Added refinery issue line ${line.itemName || line.itemId || ""}`.trim()));
  render();
  toast("Refinery issue item added.");
}

function appendMeltingIssueLine(row) {
  const line = readMeltingIssueEntryLine(row);
  const hasText = Boolean(line.itemId || line.itemName);
  const hasValue = line.qty > 0 || line.gross > 0 || line.amount > 0;
  if (!hasText && !hasValue) {
    toast("Enter melting issue item details before adding.");
    return;
  }
  meltingIssueDraft = normalizeMeltingIssue(meltingIssueDraft || defaultMeltingIssue());
  meltingIssueDraft.lines.push(line);
  state.audit.unshift(audit(`Added melting issue line ${line.itemName || line.itemId || ""}`.trim()));
  render();
  toast("Melting issue item added.");
}

function deleteSmithWorkLine(index) {
  smithWorkDraft = normalizeSmithWorkOrder(smithWorkDraft || defaultSmithWorkOrder());
  smithWorkDraft.lines.splice(Number(index), 1);
  render();
  toast("Smith item removed.");
}

function deleteCashWeightSmithLine(index) {
  cashWeightSmithDraft = normalizeCashWeightSmith(cashWeightSmithDraft || defaultCashWeightSmith());
  cashWeightSmithDraft.lines.splice(Number(index), 1);
  render();
  toast("Cash for weight line removed.");
}

function deleteJewellerWorkLine(index) {
  jewellerWorkDraft = normalizeJewellerWorkOrder(jewellerWorkDraft || defaultJewellerWorkOrder());
  jewellerWorkDraft.lines.splice(Number(index), 1);
  render();
  toast("Jeweller item removed.");
}

function deleteCashWeightJewellerLine(index) {
  cashWeightJewellerDraft = normalizeCashWeightJeweller(cashWeightJewellerDraft || defaultCashWeightJeweller());
  cashWeightJewellerDraft.lines.splice(Number(index), 1);
  render();
  toast("Cash for weight Jeweller line removed.");
}

function deleteStockAdjustmentLine(index) {
  stockAdjustmentDraft = normalizeStockAdjustment(stockAdjustmentDraft || defaultStockAdjustment());
  stockAdjustmentDraft.lines.splice(Number(index), 1);
  render();
  toast("Stock adjustment line removed.");
}

function deleteGoldDepositLine(index) {
  const type = stockView === "Gold Withdrawal" ? "Withdrawal" : "Deposit";
  if (type === "Withdrawal") {
    goldWithdrawalDraft = normalizeGoldDeposit(goldWithdrawalDraft || defaultGoldDeposit(type), type);
    goldWithdrawalDraft.lines.splice(Number(index), 1);
  } else {
    goldDepositDraft = normalizeGoldDeposit(goldDepositDraft || defaultGoldDeposit(type), type);
    goldDepositDraft.lines.splice(Number(index), 1);
  }
  render();
  toast(`${type} item removed.`);
}

function deleteSampleLine(type, index) {
  const isReturn = type === "Return";
  if (isReturn) {
    sampleReturnDraft = normalizeSample(sampleReturnDraft || defaultSample("Return"), "Return");
    sampleReturnDraft.lines.splice(Number(index), 1);
  } else {
    sampleIssueDraft = normalizeSample(sampleIssueDraft || defaultSample("Issue"), "Issue");
    sampleIssueDraft.lines.splice(Number(index), 1);
  }
  render();
  toast(`Sample ${type.toLowerCase()} item removed.`);
}

function deletePolishingLine(index) {
  polishingDraft = normalizePolishingEntry(polishingDraft || defaultPolishingEntry());
  polishingDraft.lines.splice(Number(index), 1);
  render();
  toast("Polishing item removed.");
}

function deletePolishingStone(index) {
  polishingDraft = normalizePolishingEntry(polishingDraft || defaultPolishingEntry());
  polishingDraft.stones.splice(Number(index), 1);
  render();
  toast("Polishing stone detail removed.");
}

function deleteRefineryIssueLine(index) {
  refineryIssueDraft = normalizeRefineryIssue(refineryIssueDraft || defaultRefineryIssue());
  refineryIssueDraft.lines.splice(Number(index), 1);
  render();
  toast("Refinery issue line removed.");
}

function deleteMeltingIssueLine(index) {
  meltingIssueDraft = normalizeMeltingIssue(meltingIssueDraft || defaultMeltingIssue());
  meltingIssueDraft.lines.splice(Number(index), 1);
  render();
  toast("Melting issue line removed.");
}

function saveSmithWork() {
  smithWorkDraft = normalizeSmithWorkOrder(smithWorkDraft || defaultSmithWorkOrder());
  const totals = smithWorkFinancials(smithWorkDraft);
  state.smithWorkOrders ||= [];
  const index = state.smithWorkOrders.findIndex((item) => item.id === smithWorkDraft.id || item.entryNo === smithWorkDraft.entryNo);
  if (index >= 0) state.smithWorkOrders[index] = smithWorkDraft;
  else state.smithWorkOrders.unshift(smithWorkDraft);
  state.workLogs.unshift(normalizeWorkLog({
    refNo: smithWorkDraft.entryNo,
    date: smithWorkDraft.date,
    workflow: "Smith",
    action: smithWorkDraft.transType,
    party: smithWorkDraft.smithName,
    item: `${smithWorkDraft.lines.length} item(s)`,
    qty: totals.totalInQty + totals.totalOutQty,
    gross: sumField(smithWorkDraft.lines, "gross"),
    issue: totals.totalOutWeight,
    receive: totals.totalInWeight,
    balance: totals.closing,
    status: "Posted"
  }));
  state.audit.unshift(audit(`Saved Smith work order ${smithWorkDraft.entryNo}`));
  saveState();
  render();
  toast("Smith work order saved.");
}

function saveCashWeightSmith() {
  cashWeightSmithDraft = normalizeCashWeightSmith(cashWeightSmithDraft || defaultCashWeightSmith());
  const totals = cashWeightSmithFinancials(cashWeightSmithDraft);
  state.cashWeightSmiths ||= [];
  const index = state.cashWeightSmiths.findIndex((item) => item.id === cashWeightSmithDraft.id || item.entryNo === cashWeightSmithDraft.entryNo);
  if (index >= 0) state.cashWeightSmiths[index] = cashWeightSmithDraft;
  else state.cashWeightSmiths.unshift(cashWeightSmithDraft);
  state.workLogs.unshift(normalizeWorkLog({
    refNo: cashWeightSmithDraft.entryNo,
    date: cashWeightSmithDraft.date,
    workflow: "Smith",
    action: "Cash for Weight Smith",
    party: cashWeightSmithDraft.partyName,
    item: "Cash for weight",
    qty: cashWeightSmithDraft.lines.length,
    gross: totals.weight,
    issue: 0,
    receive: totals.netWeight,
    balance: totals.closing,
    status: "Posted"
  }));
  state.audit.unshift(audit(`Saved cash for weight Smith ${cashWeightSmithDraft.entryNo}`));
  saveState();
  render();
  toast("Cash for weight Smith saved.");
}

function saveJewellerWork() {
  jewellerWorkDraft = normalizeJewellerWorkOrder(jewellerWorkDraft || defaultJewellerWorkOrder());
  const totals = jewellerWorkFinancials(jewellerWorkDraft);
  state.jewellerWorkOrders ||= [];
  const index = state.jewellerWorkOrders.findIndex((item) => item.id === jewellerWorkDraft.id || item.entryNo === jewellerWorkDraft.entryNo);
  if (index >= 0) state.jewellerWorkOrders[index] = jewellerWorkDraft;
  else state.jewellerWorkOrders.unshift(jewellerWorkDraft);
  state.workLogs.unshift(normalizeWorkLog({
    refNo: jewellerWorkDraft.entryNo,
    date: jewellerWorkDraft.date,
    workflow: "Jeweller",
    action: jewellerWorkDraft.transType,
    party: jewellerWorkDraft.jewellerName,
    item: `${jewellerWorkDraft.lines.length} item(s)`,
    qty: totals.totalInQty + totals.totalOutQty,
    gross: sumField(jewellerWorkDraft.lines, "gross"),
    issue: totals.totalOutWeight,
    receive: totals.totalInWeight,
    balance: totals.closing,
    status: "Posted"
  }));
  state.audit.unshift(audit(`Saved Jeweller work order ${jewellerWorkDraft.entryNo}`));
  saveState();
  render();
  toast("Jeweller work order saved.");
}

function saveCashWeightJeweller() {
  cashWeightJewellerDraft = normalizeCashWeightJeweller(cashWeightJewellerDraft || defaultCashWeightJeweller());
  const totals = cashWeightJewellerFinancials(cashWeightJewellerDraft);
  state.cashWeightJewellers ||= [];
  const index = state.cashWeightJewellers.findIndex((item) => item.id === cashWeightJewellerDraft.id || item.entryNo === cashWeightJewellerDraft.entryNo);
  if (index >= 0) state.cashWeightJewellers[index] = cashWeightJewellerDraft;
  else state.cashWeightJewellers.unshift(cashWeightJewellerDraft);
  state.workLogs.unshift(normalizeWorkLog({
    refNo: cashWeightJewellerDraft.entryNo,
    date: cashWeightJewellerDraft.date,
    workflow: "Jeweller",
    action: "Cash for Weight Jeweller",
    party: cashWeightJewellerDraft.partyName,
    item: "Cash for weight",
    qty: cashWeightJewellerDraft.lines.length,
    gross: totals.weight,
    issue: 0,
    receive: totals.netWeight,
    balance: totals.closing,
    status: "Posted"
  }));
  state.audit.unshift(audit(`Saved cash for weight Jeweller ${cashWeightJewellerDraft.entryNo}`));
  saveState();
  render();
  toast("Cash for weight Jeweller saved.");
}

function saveStockAdjustment() {
  stockAdjustmentDraft = normalizeStockAdjustment(stockAdjustmentDraft || defaultStockAdjustment());
  state.stockAdjustments ||= [];
  const index = state.stockAdjustments.findIndex((item) => item.id === stockAdjustmentDraft.id || item.entryNo === stockAdjustmentDraft.entryNo);
  if (index >= 0) state.stockAdjustments[index] = stockAdjustmentDraft;
  else state.stockAdjustments.unshift(stockAdjustmentDraft);
  stockAdjustmentDraft.lines.forEach(applyStockAdjustmentLineToStock);
  state.audit.unshift(audit(`Saved stock adjustment ${stockAdjustmentDraft.entryNo}`));
  saveState();
  render();
  toast("Stock adjustment saved.");
}

function saveOpeningStock() {
  openingStockDraft = normalizeOpeningStockEntry(openingStockDraft || defaultOpeningStockEntry());
  state.openingStockEntries ||= [];
  const index = state.openingStockEntries.findIndex((item) => item.openingDate === openingStockDraft.openingDate);
  if (index >= 0) state.openingStockEntries[index] = openingStockDraft;
  else state.openingStockEntries.unshift(openingStockDraft);
  applyOpeningStockToStock(openingStockDraft);
  state.audit.unshift(audit(`Saved opening stock for ${openingStockDraft.openingDate}`));
  saveState();
  render();
  toast("Opening stock saved.");
}

function showOpeningStock() {
  const selectedDate = openingStockDraft?.openingDate || financialYearOpeningDate();
  const found = (state.openingStockEntries || []).find((item) => item.openingDate === selectedDate);
  openingStockDraft = normalizeOpeningStockEntry(found || { openingDate: selectedDate });
  render();
}

function applyOpeningStockToStock(record) {
  state.stock ||= [];
  (record.lines || []).forEach((line) => {
    const clean = normalizeOpeningStockLine(line);
    if (!clean.weight && !clean.stone && !clean.netWeight && !clean.amount) return;
    let item = state.stock.find((stockItem) => stockItem.item === clean.description);
    if (!item) {
      item = normalizeStock({
        id: crypto.randomUUID(),
        item: clean.description,
        purity: clean.percent ? `${numericValue(clean.percent, 2)}%` : "-",
        huid: "",
        qty: clean.description.toLowerCase().includes("nos") ? clean.weight : 0,
        status: "Ready"
      });
      state.stock.push(item);
    }
    item.opening = clean.netWeight;
    item.gross = clean.weight;
    item.stone = clean.stone;
    item.rate = clean.rate;
    item.openingAmount = clean.amount;
    item.pureWeight = clean.pureWeight;
    item.closing = Number(item.opening || 0) + Number(item.addition || 0) - Number(item.deduction || 0);
  });
}

function saveGoldDeposit(type = "Deposit") {
  const isWithdrawal = type === "Withdrawal";
  const collection = isWithdrawal ? "goldWithdrawals" : "goldDeposits";
  const draft = normalizeGoldDeposit((isWithdrawal ? goldWithdrawalDraft : goldDepositDraft) || defaultGoldDeposit(type), type);
  if (!draft.lines.length) {
    toast(`Add at least one item before saving ${isWithdrawal ? "withdrawal" : "deposit"}.`);
    return;
  }
  state[collection] ||= [];
  const index = state[collection].findIndex((item) => item.id === draft.id || item.entryNo === draft.entryNo);
  if (index >= 0) state[collection][index] = draft;
  else state[collection].unshift(draft);
  draft.lines.forEach((line) => applyGoldDepositLineToStock(line, type));
  const totals = goldDepositFinancials(draft);
  state.workLogs ||= [];
  state.workLogs.unshift(normalizeWorkLog({
    refNo: draft.entryNo,
    date: draft.date,
    workflow: "Stock",
    action: isWithdrawal ? "Gold Deposit Withdrawal" : "Gold Deposit",
    party: draft.partyName,
    item: `${draft.lines.length} item(s)`,
    qty: draft.lines.length,
    gross: totals.gross,
    issue: isWithdrawal ? totals.totalWeight : 0,
    receive: isWithdrawal ? 0 : totals.totalWeight,
    balance: totals.totalWeight,
    status: "Posted"
  }));
  state.audit.unshift(audit(`Saved ${isWithdrawal ? "gold deposit withdrawal" : "gold deposit"} ${draft.entryNo}`));
  if (isWithdrawal) goldWithdrawalDraft = draft;
  else goldDepositDraft = draft;
  saveState();
  render();
  toast(`${isWithdrawal ? "Gold withdrawal" : "Gold deposit"} saved.`);
}

function saveSample(type = "Issue") {
  const isReturn = type === "Return";
  const collection = isReturn ? "sampleReturns" : "sampleIssues";
  const draft = normalizeSample((isReturn ? sampleReturnDraft : sampleIssueDraft) || defaultSample(type), type);
  if (!draft.lines.length) {
    toast(`Add at least one item before saving sample ${type.toLowerCase()}.`);
    return;
  }
  state[collection] ||= [];
  const index = state[collection].findIndex((item) => item.id === draft.id || item.entryNo === draft.entryNo);
  if (index >= 0) state[collection][index] = draft;
  else state[collection].unshift(draft);
  draft.lines.forEach((line) => applySampleLineToStock(line, type));
  const totals = sampleFinancials(draft);
  state.workLogs ||= [];
  state.workLogs.unshift(normalizeWorkLog({
    refNo: draft.entryNo,
    date: draft.date,
    workflow: "Sample",
    action: `Sample ${type}`,
    party: draft.jewellerName,
    item: `${draft.lines.length} item(s)`,
    qty: totals.qty,
    gross: totals.gross,
    issue: isReturn ? 0 : totals.net,
    receive: isReturn ? totals.net : 0,
    balance: totals.net,
    status: "Posted"
  }));
  state.audit.unshift(audit(`Saved sample ${type.toLowerCase()} ${draft.entryNo}`));
  if (isReturn) sampleReturnDraft = draft;
  else sampleIssueDraft = draft;
  saveState();
  render();
  toast(`Sample ${type.toLowerCase()} saved.`);
}

function savePolishing() {
  polishingDraft = normalizePolishingEntry(polishingDraft || defaultPolishingEntry());
  if (!polishingDraft.lines.length && !polishingDraft.stones.length) {
    toast("Add at least one item before updating polishing.");
    return;
  }
  state.polishingEntries ||= [];
  const index = state.polishingEntries.findIndex((item) => item.id === polishingDraft.id || item.entryNo === polishingDraft.entryNo);
  if (index >= 0) state.polishingEntries[index] = polishingDraft;
  else state.polishingEntries.unshift(polishingDraft);
  const totals = polishingFinancials(polishingDraft);
  state.workLogs ||= [];
  state.workLogs.unshift(normalizeWorkLog({
    refNo: polishingDraft.entryNo,
    date: polishingDraft.date,
    workflow: "Polishing",
    action: "Polishing",
    party: polishingDraft.partyName,
    item: `${polishingDraft.lines.length} item(s)`,
    qty: totals.qty,
    gross: totals.gross,
    issue: totals.net,
    receive: 0,
    balance: totals.net,
    status: "Posted"
  }));
  state.audit.unshift(audit(`Saved polishing ${polishingDraft.entryNo}`));
  saveState();
  render();
  toast("Polishing entry updated.");
}

function currentServiceType() {
  return serviceWorkView === "Close Service / Job" ? "Close" : "New";
}

function activeServiceDraft(type = currentServiceType()) {
  const draft = type === "Close" ? serviceCloseDraft : serviceNewDraft;
  return normalizeServiceJob(draft || defaultServiceJob(type), type);
}

function setServiceDraft(type, draft) {
  if (type === "Close") serviceCloseDraft = normalizeServiceJob(draft, "Close");
  else serviceNewDraft = normalizeServiceJob(draft, "New");
}

function updateServiceDraftField(type, field, value) {
  const draft = activeServiceDraft(type);
  const numericFields = ["dueDays", "approxAmount", "advance"];
  draft[field] = numericFields.includes(field) ? parseEntryNumber(value) : value;
  if (field === "partyName") {
    const party = [...(state.parties || []), ...(state.customers || [])].find((item) => item.name === value || item.customerName === value);
    if (party) {
      draft.partyAccount = party.customerCode || party.customerId || party.accountId || party.id || draft.partyAccount;
      draft.place = party.place || party.city || draft.place;
      draft.contactNo = party.mobile || party.phone || draft.contactNo;
    }
  }
  setServiceDraft(type, draft);
}

function readServiceEntryLine(row) {
  const readText = (field) => row.querySelector(`[data-line-field="${field}"]`)?.value?.trim() || "";
  const readNumber = (field) => parseEntryNumber(row.querySelector(`[data-line-field="${field}"]`)?.value);
  return normalizeServiceLine({
    itemName: readText("itemName"),
    description: readText("description"),
    nos: readNumber("nos"),
    gross: readNumber("gross"),
    stone: readNumber("stone"),
    net: readNumber("gross") - readNumber("stone"),
    complaint: readText("complaint")
  });
}

function updateServicePreview(row, line) {
  const input = row.querySelector(`[data-line-field="net"]`);
  if (input && document.activeElement !== input) input.value = numericValue(line.net);
}

function appendServiceLine(row) {
  const type = currentServiceType();
  const line = readServiceEntryLine(row);
  if (!line.itemName && !line.description && !line.complaint && line.gross <= 0 && line.net <= 0) {
    toast("Enter service item details before adding.");
    return;
  }
  const draft = activeServiceDraft(type);
  draft.lines.push(line);
  setServiceDraft(type, draft);
  state.audit.unshift(audit(`Added ${line.itemName || "service item"} to ${type.toLowerCase()} service job`));
  render();
  toast("Service item added.");
}

function updateServiceLineField(type, index, field, value) {
  const draft = activeServiceDraft(type);
  const line = draft.lines[Number(index)];
  if (!line) return;
  if (["nos", "gross", "stone", "net"].includes(field)) line[field] = parseEntryNumber(value);
  else line[field] = value;
  draft.lines[Number(index)] = normalizeServiceLine({
    ...line,
    net: field === "net" ? line.net : Number(line.gross || 0) - Number(line.stone || 0)
  });
  setServiceDraft(type, draft);
}

function deleteServiceLine(type, index) {
  const draft = activeServiceDraft(type);
  draft.lines.splice(Number(index), 1);
  setServiceDraft(type, draft);
  render();
}

function resetServiceJob(type) {
  setServiceDraft(type, defaultServiceJob(type));
  render();
}

function deleteServiceJob(type) {
  const collection = type === "Close" ? "serviceClosures" : "serviceJobs";
  const draft = activeServiceDraft(type);
  state[collection] ||= [];
  const index = state[collection].findIndex((item) => item.id === draft.id || item.entryNo === draft.entryNo);
  if (index >= 0) state[collection].splice(index, 1);
  setServiceDraft(type, defaultServiceJob(type));
  state.audit.unshift(audit(`Deleted ${type.toLowerCase()} service job ${draft.entryNo}`));
  saveState();
  render();
  toast("Service job deleted.");
}

function saveServiceJob(type) {
  const collection = type === "Close" ? "serviceClosures" : "serviceJobs";
  const draft = activeServiceDraft(type);
  if (!draft.partyName && !draft.lines.length) {
    toast("Enter party or service item before saving.");
    return;
  }
  state[collection] ||= [];
  const index = state[collection].findIndex((item) => item.id === draft.id || item.entryNo === draft.entryNo);
  if (index >= 0) state[collection][index] = draft;
  else state[collection].unshift(draft);
  const totals = serviceFinancials(draft);
  state.workLogs ||= [];
  state.workLogs.unshift(normalizeWorkLog({
    refNo: draft.entryNo,
    date: draft.date,
    workflow: "Service / Job",
    action: type === "Close" ? "Close Service / Job" : "New Service / Job",
    party: draft.partyName,
    item: draft.lines[0]?.itemName || `${draft.lines.length} item(s)`,
    qty: totals.nos,
    gross: totals.gross,
    issue: type === "New" ? totals.net : 0,
    receive: type === "Close" ? totals.net : 0,
    balance: totals.balance,
    status: draft.jobStatus
  }));
  setServiceDraft(type, draft);
  state.audit.unshift(audit(`Saved ${type.toLowerCase()} service job ${draft.entryNo}`));
  saveState();
  render();
  toast(`${type === "Close" ? "Close service" : "New service"} saved.`);
}

function saveRefineryIssue() {
  refineryIssueDraft = normalizeRefineryIssue(refineryIssueDraft || defaultRefineryIssue());
  const totals = refineryIssueFinancials(refineryIssueDraft);
  state.refineryIssues ||= [];
  const index = state.refineryIssues.findIndex((item) => item.id === refineryIssueDraft.id || item.entryNo === refineryIssueDraft.entryNo);
  if (index >= 0) state.refineryIssues[index] = refineryIssueDraft;
  else state.refineryIssues.unshift(refineryIssueDraft);
  state.workLogs ||= [];
  state.workLogs.unshift(normalizeWorkLog({
    refNo: refineryIssueDraft.entryNo,
    date: refineryIssueDraft.date,
    workflow: "Refiner",
    action: "Refinery Issue",
    party: refineryIssueDraft.refinerName,
    item: `${refineryIssueDraft.lines.length} item(s)`,
    qty: totals.qty,
    gross: totals.gross,
    issue: totals.issueWeight,
    receive: 0,
    balance: totals.issueWeight,
    status: "Issued"
  }));
  state.audit.unshift(audit(`Saved refinery issue ${refineryIssueDraft.entryNo}`));
  saveState();
  render();
  toast("Refinery issue saved.");
}

function saveRefineryReturn() {
  refineryReturnDraft = normalizeRefineryReturn(refineryReturnDraft || defaultRefineryReturn());
  const totals = refineryReturnFinancials(refineryReturnDraft);
  const issue = selectedRefineryIssue(refineryReturnDraft.pendingIssueId);
  state.refineryReturns ||= [];
  const index = state.refineryReturns.findIndex((item) => item.id === refineryReturnDraft.id || item.entryNo === refineryReturnDraft.entryNo);
  if (index >= 0) state.refineryReturns[index] = refineryReturnDraft;
  else state.refineryReturns.unshift(refineryReturnDraft);
  state.workLogs ||= [];
  state.workLogs.unshift(normalizeWorkLog({
    refNo: refineryReturnDraft.entryNo,
    date: refineryReturnDraft.date,
    workflow: "Refiner",
    action: "Refinery Return",
    party: issue?.refinerName || "",
    item: `${refineryReturnDraft.lines.length} item(s)`,
    qty: refineryReturnDraft.lines.length,
    gross: totals.issuedWeight,
    issue: totals.issuedWeight,
    receive: totals.receivedWeight,
    balance: Math.max(0, totals.issuedWeight - totals.receivedWeight - totals.bottleStockWeight - totals.reissueWeight),
    status: "Returned"
  }));
  state.audit.unshift(audit(`Saved refinery return ${refineryReturnDraft.entryNo}`));
  saveState();
  render();
  toast("Refinery return saved.");
}

function saveRefineryFinalReturn() {
  refineryFinalDraft = normalizeRefineryFinalReturn(refineryFinalDraft || defaultRefineryFinalReturn());
  const totals = refineryFinalFinancials(refineryFinalDraft);
  const issue = selectedRefineryIssue(refineryFinalDraft.pendingIssueId);
  state.refineryFinalReturns ||= [];
  const index = state.refineryFinalReturns.findIndex((item) => item.id === refineryFinalDraft.id || item.entryNo === refineryFinalDraft.entryNo);
  if (index >= 0) state.refineryFinalReturns[index] = refineryFinalDraft;
  else state.refineryFinalReturns.unshift(refineryFinalDraft);
  state.workLogs ||= [];
  state.workLogs.unshift(normalizeWorkLog({
    refNo: refineryFinalDraft.entryNo,
    date: refineryFinalDraft.date,
    workflow: "Refiner",
    action: "Refinery Final Return",
    party: issue?.refinerName || "",
    item: `${refineryFinalDraft.lines.length} item(s)`,
    qty: refineryFinalDraft.lines.length,
    gross: totals.receivedWeight,
    issue: totals.receivedWeight,
    receive: totals.testWeight,
    balance: totals.balance,
    status: "Final returned"
  }));
  state.audit.unshift(audit(`Saved refinery final return ${refineryFinalDraft.entryNo}`));
  saveState();
  render();
  toast("Refinery final return saved.");
}

function saveMeltingIssue() {
  meltingIssueDraft = normalizeMeltingIssue(meltingIssueDraft || defaultMeltingIssue());
  const totals = meltingIssueFinancials(meltingIssueDraft);
  state.meltingIssues ||= [];
  const index = state.meltingIssues.findIndex((item) => item.id === meltingIssueDraft.id || item.entryNo === meltingIssueDraft.entryNo);
  if (index >= 0) state.meltingIssues[index] = meltingIssueDraft;
  else state.meltingIssues.unshift(meltingIssueDraft);
  state.workLogs ||= [];
  state.workLogs.unshift(normalizeWorkLog({
    refNo: meltingIssueDraft.entryNo,
    date: meltingIssueDraft.date,
    workflow: "Refiner",
    action: "Melting Issue",
    party: meltingIssueDraft.refinerName,
    item: `${meltingIssueDraft.lines.length} item(s)`,
    qty: totals.qty,
    gross: totals.gross,
    issue: totals.issueWeight,
    receive: 0,
    balance: totals.issueWeight,
    status: "Issued"
  }));
  state.audit.unshift(audit(`Saved melting issue ${meltingIssueDraft.entryNo}`));
  saveState();
  render();
  toast("Melting issue saved.");
}

function saveMeltingReturn() {
  meltingReturnDraft = normalizeMeltingReturn(meltingReturnDraft || defaultMeltingReturn());
  const totals = meltingReturnFinancials(meltingReturnDraft);
  const issue = selectedMeltingIssue(meltingReturnDraft.pendingIssueId);
  state.meltingReturns ||= [];
  const index = state.meltingReturns.findIndex((item) => item.id === meltingReturnDraft.id || item.entryNo === meltingReturnDraft.entryNo);
  if (index >= 0) state.meltingReturns[index] = meltingReturnDraft;
  else state.meltingReturns.unshift(meltingReturnDraft);
  state.workLogs ||= [];
  state.workLogs.unshift(normalizeWorkLog({
    refNo: meltingReturnDraft.entryNo,
    date: meltingReturnDraft.date,
    workflow: "Refiner",
    action: "Melting Return",
    party: issue?.refinerName || "",
    item: `${meltingReturnDraft.lines.length} item(s)`,
    qty: meltingReturnDraft.lines.length,
    gross: totals.issuedWeight,
    issue: totals.issuedWeight,
    receive: totals.receivedWeight,
    balance: Math.max(0, totals.issuedWeight - totals.receivedWeight - totals.bottleStockWeight),
    status: "Returned"
  }));
  state.audit.unshift(audit(`Saved melting return ${meltingReturnDraft.entryNo}`));
  saveState();
  render();
  toast("Melting return saved.");
}

function applyStockAdjustmentLineToStock(line) {
  const key = `${line.itemName || ""}`.trim().toLowerCase();
  const barcode = `${line.barcode || ""}`.trim().toLowerCase();
  let item = state.stock.find((stockItem) => `${stockItem.item || ""}`.trim().toLowerCase() === key || `${stockItem.huid || ""}`.trim().toLowerCase() === barcode);
  if (!item) {
    item = normalizeStock({
      item: line.itemName || line.barcode || "Adjusted Item",
      purity: "",
      huid: line.barcode,
      qty: 0,
      opening: 0,
      addition: 0,
      deduction: 0,
      closing: 0,
      gross: 0,
      status: "Adjusted"
    });
    state.stock.unshift(item);
  }
  item.qty = Number(line.closingNos || 0);
  item.addition = Number(item.addition || 0) + Number(line.grossAdd || 0);
  item.deduction = Number(item.deduction || 0) + Number(line.grossLess || 0);
  item.closing = Number(line.closingGross || 0);
  item.gross = Number(line.closingGross || 0);
  item.stone = Number(line.closingStone || 0);
  item.net = Number(line.closingNet || 0);
  item.status = "Adjusted";
}

function applyGoldDepositLineToStock(line, type = "Deposit") {
  state.stock ||= [];
  const key = `${line.itemName || ""}`.trim().toLowerCase();
  const itemId = `${line.itemId || ""}`.trim().toLowerCase();
  let item = state.stock.find((stockItem) => {
    const itemName = `${stockItem.item || ""}`.trim().toLowerCase();
    const huid = `${stockItem.huid || ""}`.trim().toLowerCase();
    const id = `${stockItem.id || ""}`.trim().toLowerCase();
    return itemName === key || huid === itemId || id === itemId;
  });
  if (!item) {
    item = normalizeStock({
      item: line.itemName || "OLD GOLD",
      purity: "Old Gold",
      huid: line.itemId || "OG",
      qty: 0,
      opening: 0,
      addition: 0,
      deduction: 0,
      closing: 0,
      gross: 0,
      stone: 0,
      net: 0,
      status: "Deposit"
    });
    state.stock.unshift(item);
  }
  const weight = Number(line.partyWeight || line.net || 0);
  const gross = Number(line.gross || 0);
  const stone = Number(line.stone || 0);
  const net = Number(line.net || 0);
  if (type === "Withdrawal") {
    item.deduction = Number(item.deduction || 0) + weight;
    item.closing = Math.max(0, Number(item.closing || 0) - weight);
    item.gross = Math.max(0, Number(item.gross || 0) - gross);
    item.stone = Math.max(0, Number(item.stone || 0) - stone);
    item.net = Math.max(0, Number(item.net || 0) - net);
    item.status = "Withdrawn";
  } else {
    item.addition = Number(item.addition || 0) + weight;
    item.closing = Number(item.closing || 0) + weight;
    item.gross = Number(item.gross || 0) + gross;
    item.stone = Number(item.stone || 0) + stone;
    item.net = Number(item.net || 0) + net;
    item.status = "Deposited";
  }
}

function applySampleLineToStock(line, type = "Issue") {
  state.stock ||= [];
  const key = `${line.itemName || ""}`.trim().toLowerCase();
  const barcode = `${line.barcode || ""}`.trim().toLowerCase();
  const itemId = `${line.itemId || ""}`.trim().toLowerCase();
  let item = state.stock.find((stockItem) => {
    const itemName = `${stockItem.item || ""}`.trim().toLowerCase();
    const huid = `${stockItem.huid || ""}`.trim().toLowerCase();
    const id = `${stockItem.id || ""}`.trim().toLowerCase();
    return itemName === key || huid === barcode || huid === itemId || id === itemId;
  });
  if (!item) {
    item = normalizeStock({
      item: line.itemName || line.barcode || line.itemId || "Sample Item",
      purity: "Sample",
      huid: line.barcode || line.itemId || "",
      qty: 0,
      opening: 0,
      addition: 0,
      deduction: 0,
      closing: 0,
      gross: 0,
      stone: 0,
      net: 0,
      status: "Sample"
    });
    state.stock.unshift(item);
  }
  const qty = Number(line.qty || 0);
  const gross = Number(line.gross || 0);
  const stone = Number(line.stone || 0);
  const net = Number(line.net || 0);
  if (type === "Return") {
    item.qty = Number(item.qty || 0) + qty;
    item.addition = Number(item.addition || 0) + net;
    item.closing = Number(item.closing || 0) + net;
    item.gross = Number(item.gross || 0) + gross;
    item.stone = Number(item.stone || 0) + stone;
    item.net = Number(item.net || 0) + net;
    item.status = "Sample returned";
  } else {
    item.qty = Math.max(0, Number(item.qty || 0) - qty);
    item.deduction = Number(item.deduction || 0) + net;
    item.closing = Math.max(0, Number(item.closing || 0) - net);
    item.gross = Math.max(0, Number(item.gross || 0) - gross);
    item.stone = Math.max(0, Number(item.stone || 0) - stone);
    item.net = Math.max(0, Number(item.net || 0) - net);
    item.status = "Sample issued";
  }
}

function resetSmithWork() {
  smithWorkDraft = defaultSmithWorkOrder();
  render();
}

function resetCashWeightSmith() {
  cashWeightSmithDraft = defaultCashWeightSmith();
  render();
}

function resetJewellerWork() {
  jewellerWorkDraft = defaultJewellerWorkOrder();
  render();
}

function resetCashWeightJeweller() {
  cashWeightJewellerDraft = defaultCashWeightJeweller();
  render();
}

function appendDirectPurchaseLine(row) {
  const line = readDirectPurchaseEntryLine(row);
  if (!line.itemId && !line.itemName && line.gross <= 0 && line.itemTotal <= 0) {
    toast("Enter direct purchase item details before adding.");
    return;
  }
  state.directPurchases ||= [normalizeDirectPurchaseBill()];
  const bill = normalizeDirectPurchaseBill(state.directPurchases[0]);
  bill.lines.push(line);
  state.directPurchases[0] = bill;
  state.audit.unshift(audit(`Added ${line.itemName} to direct purchase`));
  saveState();
  render();
  toast("Direct purchase item added.");
}

function appendDirectPurchaseReturnLine(row) {
  const line = readDirectPurchaseEntryLine(row);
  if (!line.itemId && !line.itemName && line.gross <= 0 && line.itemTotal <= 0) {
    toast("Enter direct purchase return item details before adding.");
    return;
  }
  state.directPurchaseReturns ||= [normalizeDirectPurchaseReturnBill()];
  const bill = normalizeDirectPurchaseReturnBill(state.directPurchaseReturns[0]);
  bill.lines.push(line);
  state.directPurchaseReturns[0] = bill;
  state.audit.unshift(audit(`Added ${line.itemName} to direct purchase return`));
  saveState();
  render();
  toast("Direct purchase return item added.");
}

function appendDmdReturnLine(row) {
  const line = readDmdReturnEntryLine(row);
  if (!line.itemDescription && !line.barcode && line.gross <= 0 && line.amount <= 0) {
    toast("Enter DMD return item details before adding.");
    return;
  }
  state.dmdReturns ||= [normalizeDmdReturnBill()];
  state.dmdReturns[0].lines.push(line);
  state.audit.unshift(audit(`Added ${line.itemName} to DMD return`));
  saveState();
  render();
  toast("DMD return item added.");
}

function appendDmdReturnOrnamentLine(row) {
  const line = readDmdWholesaleEntryLine(row);
  if (!line.itemId && !line.itemDescription && line.gross <= 0 && line.salesAmt <= 0) {
    toast("Enter DMD return item details before adding.");
    return;
  }
  state.dmdReturns ||= [normalizeDmdReturnBill()];
  const bill = normalizeDmdReturnBill(state.dmdReturns[0]);
  bill.ornamentLines.push(line);
  state.dmdReturns[0] = bill;
  state.audit.unshift(audit(`Added ${line.itemName} to DMD return`));
  saveState();
  render();
  toast("DMD return item added.");
}

function appendDmdReturnStoneLine(row) {
  const line = readDmdStoneEntryLine(row);
  if (!line.colorType && !line.shape && line.caratCent <= 0 && line.pcs <= 0) {
    toast("Enter DMD return stone details before adding.");
    return;
  }
  state.dmdReturns ||= [normalizeDmdReturnBill()];
  const bill = normalizeDmdReturnBill(state.dmdReturns[0]);
  bill.diamondLines.push(line);
  state.dmdReturns[0] = bill;
  state.audit.unshift(audit("Added diamond stone to DMD return"));
  saveState();
  render();
  toast("DMD return stone added.");
}

function appendDmdWholesaleLine(row) {
  const line = readDmdWholesaleEntryLine(row);
  if (!line.itemId && !line.itemDescription && line.gross <= 0 && line.salesAmt <= 0) {
    toast("Enter DMD wholesale item details before adding.");
    return;
  }
  state.dmdWholesales ||= [normalizeDmdWholesaleBill()];
  state.dmdWholesales[0].ornamentLines.push(line);
  state.audit.unshift(audit(`Added ${line.itemName} to DMD wholesale`));
  saveState();
  render();
  toast("DMD wholesale item added.");
}

function appendDmdWholesaleClassicLine(row) {
  const line = readDmdReturnEntryLine(row);
  if (!line.itemDescription && !line.barcode && line.gross <= 0 && line.amount <= 0) {
    toast("Enter DMD wholesale item details before adding.");
    return;
  }
  state.dmdWholesales ||= [normalizeDmdWholesaleBill()];
  const bill = normalizeDmdWholesaleBill(state.dmdWholesales[0]);
  bill.lines.push(line);
  state.dmdWholesales[0] = bill;
  state.audit.unshift(audit(`Added ${line.itemName} to DMD wholesale`));
  saveState();
  render();
  toast("DMD wholesale item added.");
}

function appendDmdStoneLine(row) {
  const line = readDmdStoneEntryLine(row);
  if (!line.colorType && !line.shape && line.caratCent <= 0 && line.pcs <= 0) {
    toast("Enter diamond stone details before adding.");
    return;
  }
  state.dmdWholesales ||= [normalizeDmdWholesaleBill()];
  state.dmdWholesales[0].diamondLines.push(line);
  state.audit.unshift(audit("Added diamond stone to DMD wholesale"));
  saveState();
  render();
  toast("Diamond stone added.");
}

function appendDiamondPurchaseOrnamentLine(row) {
  const line = readDmdWholesaleEntryLine(row);
  if (!line.itemId && !line.itemDescription && line.gross <= 0 && line.salesAmt <= 0) {
    toast("Enter diamond purchase item details before adding.");
    return;
  }
  state.diamondPurchases ||= [normalizeDiamondPurchaseBill()];
  const bill = normalizeDiamondPurchaseBill(state.diamondPurchases[0]);
  bill.ornamentLines.push(line);
  state.diamondPurchases[0] = bill;
  state.audit.unshift(audit(`Added ${line.itemName} to diamond purchase`));
  saveState();
  render();
  toast("Diamond purchase item added.");
}

function appendDiamondPurchaseStoneLine(row) {
  const line = readDmdStoneEntryLine(row);
  if (!line.colorType && !line.shape && line.caratCent <= 0 && line.pcs <= 0) {
    toast("Enter diamond stone details before adding.");
    return;
  }
  state.diamondPurchases ||= [normalizeDiamondPurchaseBill()];
  const bill = normalizeDiamondPurchaseBill(state.diamondPurchases[0]);
  bill.diamondLines.push(line);
  state.diamondPurchases[0] = bill;
  state.audit.unshift(audit("Added stone to diamond purchase"));
  saveState();
  render();
  toast("Diamond purchase stone added.");
}

function appendDiamondPurchaseReturnOrnamentLine(row) {
  const line = readDiamondPurchaseReturnEntryLine(row);
  if (!line.itemId && !line.itemName && !line.barcode && line.gross <= 0 && line.total <= 0) {
    toast("Enter diamond purchase return item details before adding.");
    return;
  }
  state.diamondPurchaseReturns ||= [normalizeDiamondPurchaseReturnBill()];
  const bill = normalizeDiamondPurchaseReturnBill(state.diamondPurchaseReturns[0]);
  bill.ornamentLines.push(line);
  state.diamondPurchaseReturns[0] = bill;
  state.audit.unshift(audit(`Added ${line.itemName} to diamond purchase return`));
  saveState();
  render();
  toast("Diamond purchase return item added.");
}

function appendDiamondPurchaseReturnStoneLine(row) {
  const line = readDmdPurchaseStoneEntryLine(row);
  if (!line.colorType && !line.shape && line.caratCent <= 0 && line.pcs <= 0) {
    toast("Enter diamond return stone details before adding.");
    return;
  }
  state.diamondPurchaseReturns ||= [normalizeDiamondPurchaseReturnBill()];
  const bill = normalizeDiamondPurchaseReturnBill(state.diamondPurchaseReturns[0]);
  bill.diamondLines.push(line);
  state.diamondPurchaseReturns[0] = bill;
  state.audit.unshift(audit("Added stone to diamond purchase return"));
  saveState();
  render();
  toast("Diamond purchase return stone added.");
}

function appendDmdStonePurchaseLine(row) {
  const line = readDmdStonePurchaseEntryLine(row);
  if (!line.itemName && !line.colorType && !line.shape && line.caratCent <= 0 && line.pcs <= 0) {
    toast("Enter DMD stone purchase details before adding.");
    return;
  }
  state.dmdStonePurchases ||= [normalizeDmdStonePurchaseBill()];
  const bill = normalizeDmdStonePurchaseBill(state.dmdStonePurchases[0]);
  bill.lines.push(line);
  state.dmdStonePurchases[0] = bill;
  state.audit.unshift(audit("Added stone to DMD stone purchase"));
  saveState();
  render();
  toast("DMD stone purchase item added.");
}

function deleteLine(button) {
  if (button.dataset.lineScope === "dmd-stone-purchase") {
    const bill = normalizeDmdStonePurchaseBill(state.dmdStonePurchases?.[0]);
    bill.lines = bill.lines.filter((line) => line.id !== button.dataset.lineId);
    state.dmdStonePurchases = [bill];
    saveState();
    render();
    return;
  }
  if (button.dataset.lineScope === "direct-purchase-return") {
    const bill = normalizeDirectPurchaseReturnBill(state.directPurchaseReturns?.[0]);
    bill.lines = bill.lines.filter((line) => line.id !== button.dataset.lineId);
    state.directPurchaseReturns = [bill];
    saveState();
    render();
    return;
  }
  if (button.dataset.lineScope === "direct-purchase") {
    const bill = normalizeDirectPurchaseBill(state.directPurchases?.[0]);
    bill.lines = bill.lines.filter((line) => line.id !== button.dataset.lineId);
    state.directPurchases = [bill];
    saveState();
    render();
    return;
  }
  if (button.dataset.lineScope === "diamond-purchase-return") {
    const bill = normalizeDiamondPurchaseReturnBill(state.diamondPurchaseReturns?.[0]);
    if (button.dataset.lineSection === "diamondPurchaseReturnStone") {
      bill.diamondLines = bill.diamondLines.filter((line) => line.id !== button.dataset.lineId);
    } else {
      bill.ornamentLines = bill.ornamentLines.filter((line) => line.id !== button.dataset.lineId);
    }
    state.diamondPurchaseReturns = [bill];
    saveState();
    render();
    return;
  }
  if (button.dataset.lineScope === "diamond-purchase") {
    const bill = normalizeDiamondPurchaseBill(state.diamondPurchases?.[0]);
    if (button.dataset.lineSection === "diamondPurchaseStone") {
      bill.diamondLines = bill.diamondLines.filter((line) => line.id !== button.dataset.lineId);
    } else {
      bill.ornamentLines = bill.ornamentLines.filter((line) => line.id !== button.dataset.lineId);
    }
    state.diamondPurchases[0] = bill;
    saveState();
    render();
    return;
  }
  if (button.dataset.lineScope === "dmd-return") {
    const bill = normalizeDmdReturnBill(state.dmdReturns[0]);
    if (button.dataset.lineSection === "dmdReturnStone") {
      bill.diamondLines = bill.diamondLines.filter((line) => line.id !== button.dataset.lineId);
    } else if (button.dataset.lineSection === "dmdReturnOrnament") {
      bill.ornamentLines = bill.ornamentLines.filter((line) => line.id !== button.dataset.lineId);
    } else {
      bill.lines = bill.lines.filter((line) => line.id !== button.dataset.lineId);
    }
    state.dmdReturns[0] = bill;
    saveState();
    render();
    return;
  }
  if (button.dataset.lineScope === "dmd-wholesale") {
    const bill = normalizeDmdWholesaleBill(state.dmdWholesales[0]);
    if (button.dataset.lineSection === "dmdStone") {
      bill.diamondLines = bill.diamondLines.filter((line) => line.id !== button.dataset.lineId);
    } else if (button.dataset.lineSection === "dmdWholeSales") {
      bill.lines = bill.lines.filter((line) => line.id !== button.dataset.lineId);
    } else {
      bill.ornamentLines = bill.ornamentLines.filter((line) => line.id !== button.dataset.lineId);
    }
    state.dmdWholesales[0] = bill;
    saveState();
    render();
    return;
  }
  const bill = button.dataset.lineScope === "purchase" ? purchaseBill() : button.dataset.lineScope === "order" ? salesOrderBill() : state.bills[0];
  const section = button.dataset.lineSection;
  if (!bill?.sections?.[section]) return;
  bill.sections[section] = bill.sections[section].filter((line) => line.id !== button.dataset.lineId);
  applyBillFinancials(bill);
  state.audit.unshift(audit(`Deleted item from ${section} bill`));
  saveState();
  render();
}

function removeDiscount(button) {
  const bill = state.bills[0];
  if (!bill) return;
  const field = button.dataset.discountField;
  if (field === "coupon") {
    bill.adjustments = { ...bill.adjustments, coupon: 0 };
  }
  if (field === "flatDiscount") {
    bill.totals = { ...bill.totals, flatDiscount: 0 };
    bill.discount = 0;
  }
  applyBillFinancials(bill);
  state.audit.unshift(audit(`Removed ${field} from bill calculation`));
  saveState();
  render();
  toast("Discount removed from calculation.");
}

function handleAction(action, source) {
  if (action === "logout") {
    authenticated = false;
    sessionStorage.removeItem("goldland-authenticated");
    render();
    return;
  }
  if (action === "close-modal") return closeModal();
  if (action === "open-rate") return openRateModal();
  if (action === "delete-line") return deleteLine(source);
  if (action === "remove-discount") return removeDiscount(source);
  if (action === "save-card-transactions") return saveCardTransactions();
  if (action === "open-bill") return openBillModal();
  if (action === "open-stock") return openStockModal();
  if (action === "open-opening-stock") {
    openOpeningStockEntry();
    return;
  }
  if (action === "open-stock-adjustment") {
    active = "Stock";
    expandedNavGroups.add("Stock");
    stockView = "Stock Adjustments";
    render();
    return;
  }
  if (action === "show-opening-stock") {
    showOpeningStock();
    return;
  }
  if (action === "open-transaction-gold-deposit") {
    active = "Stock";
    expandedNavGroups.add("Stock");
    stockView = "Gold Deposit";
    render();
    return;
  }
  if (action === "open-transaction-gold-withdrawal") {
    active = "Stock";
    expandedNavGroups.add("Stock");
    stockView = "Gold Withdrawal";
    render();
    return;
  }
  if (action === "open-party" || action === "open-customer") openPartyModal("Customer");
  if (action === "quick-add-customer") return openQuickCustomerModal(source);
  if (action === "open-supplier") openPartyModal("Supplier");
  if (action === "open-smith") openPartyModal("Smith");
  if (action === "open-refiner") openPartyModal("Refiner");
  if (action === "open-staff" || action === "open-employee") openEmployeeModal();
  if (action === "open-item-master") openItemMasterModal();
  if (action === "open-account-master") openAccountMasterModal();
  if (action.startsWith("edit-party-")) openExistingPartyModal(action.replace("edit-party-", ""));
  if (action.startsWith("delete-party-")) deleteManagementRecord("party", action.replace("delete-party-", ""));
  if (action.startsWith("edit-employee-")) openEmployeeModal(action.replace("edit-employee-", ""));
  if (action.startsWith("delete-employee-")) deleteManagementRecord("employee", action.replace("delete-employee-", ""));
  if (action.startsWith("edit-item-master-")) openItemMasterModal(action.replace("edit-item-master-", ""));
  if (action.startsWith("delete-item-master-")) deleteManagementRecord("itemMaster", action.replace("delete-item-master-", ""));
  if (action.startsWith("edit-account-master-")) openAccountMasterModal(action.replace("edit-account-master-", ""));
  if (action.startsWith("delete-account-master-")) deleteManagementRecord("accountMaster", action.replace("delete-account-master-", ""));
  if (action.startsWith("open-category-")) openCategoryModal(action.replace("open-category-", ""));
  if (action.startsWith("edit-category-")) {
    const { key, id } = parseCategoryAction(action.replace("edit-category-", ""));
    openCategoryModal(key, id);
  }
  if (action.startsWith("delete-category-")) {
    const { key, id } = parseCategoryAction(action.replace("delete-category-", ""));
    deleteCategoryRecord(key, id);
  }
  if (action.startsWith("open-misc-")) openMiscModal(action.replace("open-misc-", ""));
  if (action.startsWith("delete-misc-")) {
    const { key, id } = parseMiscAction(action.replace("delete-misc-", ""));
    deleteMiscRecord(key, id);
  }
  if (action === "open-scheme") openSchemeModal();
  if (action.startsWith("open-billwise-")) openBillwiseAction(action.replace("open-billwise-", ""));
  if (action === "open-transaction-complimentary-purchase") {
    openComplimentaryPurchase();
    return;
  }
  if (action === "open-transaction-complimentary-sales") {
    openComplimentaryIssue();
    return;
  }
  if (action === "close-complimentary") {
    workOrderView = "Smith";
    complimentaryView = "Complimentary Item Purchase";
    complimentaryPurchaseDraft = null;
    complimentaryIssueDraft = null;
    render();
    return;
  }
  if (action === "load-complimentary-purchase") {
    loadComplimentaryPurchase(source?.dataset.recordId);
    return;
  }
  if (action === "load-complimentary-issue") {
    loadComplimentaryIssue(source?.dataset.recordId);
    return;
  }
  if (action === "refresh-complimentary-purchase") {
    complimentaryPurchaseDraft = defaultComplimentaryPurchase();
    render();
    return;
  }
  if (action === "refresh-complimentary-issue") {
    complimentaryIssueDraft = defaultComplimentaryIssue();
    render();
    return;
  }
  if (action === "save-complimentary-purchase") {
    saveComplimentaryPurchase();
    return;
  }
  if (action === "save-complimentary-issue") {
    saveComplimentaryIssue();
    return;
  }
  if (action === "delete-complimentary-purchase") {
    deleteComplimentaryPurchase();
    return;
  }
  if (action === "delete-complimentary-issue") {
    deleteComplimentaryIssue();
    return;
  }
  if (action === "edit-complimentary-purchase" || action === "edit-complimentary-issue") {
    openExistingRecordPicker();
    return;
  }
  if (action === "print-complimentary-purchase" || action === "print-complimentary-issue") {
    state.audit.unshift(audit(`Printed ${complimentaryView || "complimentary entry"}`));
    saveState();
    window.print();
    return;
  }
  if (action === "add-complimentary-purchase-row") {
    addComplimentaryPurchaseRow();
    return;
  }
  if (action === "insert-complimentary-purchase-row") {
    addComplimentaryPurchaseRow(0);
    return;
  }
  if (action === "delete-complimentary-purchase-row" || action === "delete-selected-complimentary-purchase-row") {
    deleteComplimentaryPurchaseRow(source?.dataset.index);
    return;
  }
  if (action === "delete-all-complimentary-purchase-rows") {
    complimentaryPurchaseDraft = normalizeComplimentaryPurchase({ ...(complimentaryPurchaseDraft || defaultComplimentaryPurchase()), lines: [defaultComplimentaryPurchaseLine()] });
    render();
    return;
  }
  if (action === "add-complimentary-issue-row") {
    addComplimentaryIssueRow();
    return;
  }
  if (action === "insert-complimentary-issue-row") {
    addComplimentaryIssueRow(0);
    return;
  }
  if (action === "delete-complimentary-issue-row" || action === "delete-selected-complimentary-issue-row") {
    deleteComplimentaryIssueRow(source?.dataset.index);
    return;
  }
  if (action === "delete-all-complimentary-issue-rows") {
    complimentaryIssueDraft = normalizeComplimentaryIssue({ ...(complimentaryIssueDraft || defaultComplimentaryIssue()), lines: [defaultComplimentaryIssueLine()] });
    render();
    return;
  }
  if (action.startsWith("new-billwise-")) resetBillwiseAction(action.replace("new-billwise-", ""));
  if (action.startsWith("refresh-billwise-")) refreshBillwiseAction(action.replace("refresh-billwise-", ""));
  if (action.startsWith("save-billwise-")) saveBillwiseAction(action.replace("save-billwise-", ""));
  if (action.startsWith("delete-billwise-")) deleteBillwiseAction(action.replace("delete-billwise-", ""));
  if (action.startsWith("print-billwise-")) printBillwiseAction(action.replace("print-billwise-", ""));
  if (action.startsWith("ledger-billwise-")) toast("Ledger view will open with this party's bill history.");
  if (action.startsWith("edit-billwise-")) toast("Editable fields are active. Change values directly in the table.");
  if (action.startsWith("add-billwise-row-")) addBillwiseRow(action.replace("add-billwise-row-", ""));
  if (action.startsWith("delete-billwise-row-")) deleteBillwiseRow(action.replace("delete-billwise-row-", ""), source.dataset.index);
  if (action.startsWith("auto-allocate-billwise-")) autoAllocateBillwise(action.replace("auto-allocate-billwise-", ""));
  if (action.startsWith("new-bank-transaction-")) resetBankTransactionAction(action.replace("new-bank-transaction-", ""));
  if (action.startsWith("refresh-bank-transaction-")) refreshBankTransactionAction(action.replace("refresh-bank-transaction-", ""));
  if (action.startsWith("save-bank-transaction-")) saveBankTransactionAction(action.replace("save-bank-transaction-", ""));
  if (action.startsWith("delete-bank-transaction-line-")) deleteBankTransactionLine(action.replace("delete-bank-transaction-line-", ""), source.dataset.index);
  if (action.startsWith("delete-bank-transaction-")) deleteBankTransactionAction(action.replace("delete-bank-transaction-", ""));
  if (action.startsWith("print-bank-transaction-")) printBankTransactionAction(action.replace("print-bank-transaction-", ""));
  if (action.startsWith("edit-bank-transaction-")) toast("Fields are editable. Change values directly in the bank entry screen.");
  if (action.startsWith("add-bank-transaction-line-")) addBankTransactionLine(action.replace("add-bank-transaction-line-", ""));
  if (action.startsWith("new-pdc-")) return resetPdcAction(action.replace("new-pdc-", ""));
  if (action.startsWith("refresh-pdc-")) return refreshPdcAction(action.replace("refresh-pdc-", ""));
  if (action.startsWith("save-pdc-")) return savePdcAction(action.replace("save-pdc-", ""));
  if (action.startsWith("delete-pdc-line-")) return deletePdcLine(action.replace("delete-pdc-line-", ""), source?.dataset.index);
  if (action.startsWith("delete-pdc-")) return deletePdcAction(action.replace("delete-pdc-", ""));
  if (action.startsWith("print-pdc-")) return printPdcAction(action.replace("print-pdc-", ""));
  if (action.startsWith("add-pdc-line-")) return addPdcLine(action.replace("add-pdc-line-", ""));
  if (action === "load-pdc-receipt") return loadPdcReceipt(source?.dataset.recordId);
  if (action === "search-pdc-receipt") return searchPdcReceiptAction();
  if (action === "refresh-journal-voucher") return refreshJournalVoucherAction();
  if (action === "save-journal-voucher") return saveJournalVoucherAction();
  if (action === "delete-journal-voucher-line") return deleteJournalVoucherLine(source?.dataset.index);
  if (action === "delete-journal-voucher") return deleteJournalVoucherAction();
  if (action === "print-journal-voucher") return printJournalVoucherAction();
  if (action === "edit-journal-voucher") {
    toast("Fields are editable. Change values directly in the journal voucher screen.");
    return;
  }
  if (action === "add-journal-voucher-line") return addJournalVoucherLine();
  if (action.startsWith("new-cash-voucher-")) return resetCashVoucherAction(action.replace("new-cash-voucher-", ""));
  if (action.startsWith("refresh-cash-voucher-")) return refreshCashVoucherAction(action.replace("refresh-cash-voucher-", ""));
  if (action.startsWith("save-cash-voucher-")) return saveCashVoucherAction(action.replace("save-cash-voucher-", ""));
  if (action.startsWith("delete-cash-voucher-line-")) return deleteCashVoucherLine(action.replace("delete-cash-voucher-line-", ""), source.dataset.index);
  if (action.startsWith("delete-cash-voucher-")) return deleteCashVoucherAction(action.replace("delete-cash-voucher-", ""));
  if (action.startsWith("print-cash-voucher-")) return printCashVoucherAction(action.replace("print-cash-voucher-", ""));
  if (action.startsWith("edit-cash-voucher-")) {
    toast("Fields are editable. Change values directly in the cash voucher screen.");
    return;
  }
  if (action.startsWith("add-cash-voucher-line-")) return addCashVoucherLine(action.replace("add-cash-voucher-line-", ""));
  if (action === "new-direct-entry") return resetDirectEntryAction();
  if (action === "refresh-direct-entry") return refreshDirectEntryAction();
  if (action === "save-direct-entry") return saveDirectEntryAction();
  if (action === "add-direct-entry-line") return addDirectEntryLine();
  if (action === "delete-direct-entry-line") return deleteDirectEntryLine(source?.dataset.index);
  if (action === "print-direct-entry") {
    state.audit.unshift(audit("Printed Direct Entry"));
    saveState();
    window.print();
    return;
  }
  if (action === "refresh-expense-entry") return refreshExpenseEntryAction();
  if (action === "save-expense-entry") return saveExpenseEntryAction();
  if (action === "edit-expense-entry") {
    toast("Fields are editable. Change values directly in the expense entry screen.");
    return;
  }
  if (action === "delete-expense-entry-line") return deleteExpenseEntryLine(source?.dataset.index);
  if (action === "delete-expense-entry") return deleteExpenseEntryAction();
  if (action === "add-expense-entry-line") return addExpenseEntryLine();
  if (action === "close-account-action") {
    accountView = "Account Ledger";
    render();
  }
  if (action === "open-custom-voucher") {
    openCustomVoucher();
    return;
  }
  if (action === "new-custom-voucher") {
    newCustomVoucher();
    return;
  }
  if (action === "save-custom-voucher") {
    saveCustomVoucher();
    return;
  }
  if (action === "refresh-custom-voucher") {
    refreshCustomVoucher();
    return;
  }
  if (action === "search-custom-voucher") {
    searchCustomVoucher();
    return;
  }
  if (action === "delete-custom-voucher") {
    deleteCustomVoucher();
    return;
  }
  if (action === "add-custom-voucher-line") {
    addCustomVoucherLine();
    return;
  }
  if (action === "load-custom-voucher") {
    loadCustomVoucher(source?.dataset.recordId);
    closeModal();
    return;
  }
  if (action === "open-account") openAccountModal();
  if (action === "open-work-smith") {
    active = "Work Orders";
    workOrderView = "Smith";
    smithWorkView = "Smith";
    render();
  } else if (action === "open-work-cash-smith") {
    active = "Work Orders";
    workOrderView = "Smith";
    smithWorkView = "Cash for Weight Smith";
    render();
  } else if (action === "open-work-jeweller") {
    active = "Work Orders";
    workOrderView = "Jeweller";
    smithWorkView = "Jeweller";
    render();
  } else if (action === "open-work-cash-jeweller") {
    active = "Work Orders";
    workOrderView = "Jeweller";
    smithWorkView = "Cash for Weight Jeweller";
    render();
  } else if (action === "open-work-refiner") {
    active = "Work Orders";
    workOrderView = "Refining";
    refineryView = "Refinery Issue";
    render();
  } else if (action === "open-work-sample") {
    active = "Work Orders";
    workOrderView = "Sample";
    sampleWorkView = "Sample Issue";
    render();
  } else if (action === "open-work-polishing") {
    active = "Work Orders";
    workOrderView = "Polishing";
    render();
  } else if (action === "open-service-new") {
    active = "Work Orders";
    workOrderView = "Service / Job";
    serviceWorkView = "New Service / Job";
    render();
  } else if (action === "open-service-close") {
    active = "Work Orders";
    workOrderView = "Service / Job";
    serviceWorkView = "Close Service / Job";
    render();
  } else if (action.startsWith("open-work-")) {
    openWorkModal(action.replace("open-work-", ""));
  }
  if (action === "add-smith-work-line") appendEntryLine(source.closest("tr"));
  if (action === "add-cash-smith-line") appendEntryLine(source.closest("tr"));
  if (action === "add-jeweller-work-line") appendEntryLine(source.closest("tr"));
  if (action === "add-cash-jeweller-line") appendEntryLine(source.closest("tr"));
  if (action === "add-stock-adjustment-line") appendEntryLine(source.closest("tr"));
  if (action === "add-gold-deposit-line") appendEntryLine(source.closest("tr"));
  if (action === "add-refinery-issue-line") appendEntryLine(source.closest("tr"));
  if (action === "add-melting-issue-line") appendEntryLine(source.closest("tr"));
  if (action === "add-sample-line") appendEntryLine(source.closest("tr"));
  if (action === "add-service-line") appendEntryLine(source.closest("tr"));
  if (action === "add-polishing-line") appendEntryLine(source.closest("tr"));
  if (action === "add-polishing-stone") appendEntryLine(source.closest("tr"));
  if (action === "delete-smith-work-line") deleteSmithWorkLine(source.dataset.index);
  if (action === "delete-cash-smith-line") deleteCashWeightSmithLine(source.dataset.index);
  if (action === "delete-jeweller-work-line") deleteJewellerWorkLine(source.dataset.index);
  if (action === "delete-cash-jeweller-line") deleteCashWeightJewellerLine(source.dataset.index);
  if (action === "delete-stock-adjustment-line") deleteStockAdjustmentLine(source.dataset.index);
  if (action === "delete-gold-deposit-line") deleteGoldDepositLine(source.dataset.index);
  if (action === "delete-refinery-issue-line") deleteRefineryIssueLine(source.dataset.index);
  if (action === "delete-melting-issue-line") deleteMeltingIssueLine(source.dataset.index);
  if (action === "delete-sample-issue-line") deleteSampleLine("Issue", source.dataset.index);
  if (action === "delete-sample-return-line") deleteSampleLine("Return", source.dataset.index);
  if (action === "delete-service-line") deleteServiceLine(currentServiceType(), source.dataset.index);
  if (action === "delete-polishing-line") deletePolishingLine(source.dataset.index);
  if (action === "delete-polishing-stone") deletePolishingStone(source.dataset.index);
  if (action === "save-smith-work") saveSmithWork();
  if (action === "save-cash-smith") saveCashWeightSmith();
  if (action === "save-jeweller-work") saveJewellerWork();
  if (action === "save-cash-jeweller") saveCashWeightJeweller();
  if (action === "save-stock-adjustment") saveStockAdjustment();
  if (action === "save-opening-stock") saveOpeningStock();
  if (action === "save-gold-deposit") saveGoldDeposit("Deposit");
  if (action === "save-gold-withdrawal") saveGoldDeposit("Withdrawal");
  if (action === "save-refinery-issue") saveRefineryIssue();
  if (action === "save-refinery-return") saveRefineryReturn();
  if (action === "save-refinery-final") saveRefineryFinalReturn();
  if (action === "save-melting-issue") saveMeltingIssue();
  if (action === "save-melting-return") saveMeltingReturn();
  if (action === "save-sample-issue") saveSample("Issue");
  if (action === "save-sample-return") saveSample("Return");
  if (action === "save-service-new") saveServiceJob("New");
  if (action === "save-service-close") saveServiceJob("Close");
  if (action === "save-polishing") savePolishing();
  if (action === "refresh-smith-work") resetSmithWork();
  if (action === "refresh-cash-smith") resetCashWeightSmith();
  if (action === "refresh-jeweller-work") resetJewellerWork();
  if (action === "refresh-cash-jeweller") resetCashWeightJeweller();
  if (action === "refresh-stock-adjustment") {
    stockAdjustmentDraft = defaultStockAdjustment();
    render();
  }
  if (action === "refresh-opening-stock") {
    openingStockDraft = defaultOpeningStockEntry();
    render();
  }
  if (action === "refresh-gold-deposit") {
    goldDepositDraft = defaultGoldDeposit("Deposit");
    render();
  }
  if (action === "refresh-gold-withdrawal") {
    goldWithdrawalDraft = defaultGoldDeposit("Withdrawal");
    render();
  }
  if (action === "refresh-refinery-issue") {
    refineryIssueDraft = defaultRefineryIssue();
    render();
  }
  if (action === "refresh-refinery-return") {
    refineryReturnDraft = defaultRefineryReturn();
    render();
  }
  if (action === "refresh-refinery-final") {
    refineryFinalDraft = defaultRefineryFinalReturn();
    render();
  }
  if (action === "refresh-melting-issue") {
    meltingIssueDraft = defaultMeltingIssue();
    render();
  }
  if (action === "refresh-melting-return") {
    meltingReturnDraft = defaultMeltingReturn();
    render();
  }
  if (action === "refresh-sample-issue") {
    sampleIssueDraft = defaultSample("Issue");
    render();
  }
  if (action === "refresh-sample-return") {
    sampleReturnDraft = defaultSample("Return");
    render();
  }
  if (action === "refresh-service-new") {
    resetServiceJob("New");
  }
  if (action === "refresh-service-close") {
    resetServiceJob("Close");
  }
  if (action === "refresh-polishing") {
    polishingDraft = defaultPolishingEntry();
    render();
  }
  if (action === "delete-smith-work") {
    smithWorkDraft = defaultSmithWorkOrder();
    render();
  }
  if (action === "delete-cash-smith") {
    cashWeightSmithDraft = defaultCashWeightSmith();
    render();
  }
  if (action === "delete-jeweller-work") {
    jewellerWorkDraft = defaultJewellerWorkOrder();
    render();
  }
  if (action === "delete-cash-jeweller") {
    cashWeightJewellerDraft = defaultCashWeightJeweller();
    render();
  }
  if (action === "delete-stock-adjustment") {
    stockAdjustmentDraft = defaultStockAdjustment();
    render();
  }
  if (action === "delete-opening-stock") {
    openingStockDraft = defaultOpeningStockEntry(openingStockDraft?.openingDate || financialYearOpeningDate());
    render();
  }
  if (action === "delete-gold-deposit") {
    goldDepositDraft = defaultGoldDeposit("Deposit");
    render();
  }
  if (action === "delete-gold-withdrawal") {
    goldWithdrawalDraft = defaultGoldDeposit("Withdrawal");
    render();
  }
  if (action === "delete-refinery-issue") {
    refineryIssueDraft = defaultRefineryIssue();
    render();
  }
  if (action === "delete-refinery-return") {
    refineryReturnDraft = defaultRefineryReturn();
    render();
  }
  if (action === "delete-refinery-final") {
    refineryFinalDraft = defaultRefineryFinalReturn();
    render();
  }
  if (action === "delete-melting-issue") {
    meltingIssueDraft = defaultMeltingIssue();
    render();
  }
  if (action === "delete-melting-return") {
    meltingReturnDraft = defaultMeltingReturn();
    render();
  }
  if (action === "delete-sample-issue") {
    sampleIssueDraft = defaultSample("Issue");
    render();
  }
  if (action === "delete-sample-return") {
    sampleReturnDraft = defaultSample("Return");
    render();
  }
  if (action === "delete-service-new") {
    deleteServiceJob("New");
  }
  if (action === "delete-service-close") {
    deleteServiceJob("Close");
  }
  if (action === "delete-polishing") {
    polishingDraft = defaultPolishingEntry();
    render();
  }
  if (action === "find-service-job") {
    toast("Saved service jobs are available in the Service / Job register.");
  }
  if (action === "find-refinery-final") {
    toast("Select a pending refinery issue to load final return details.");
  }
  if (action === "find-melting-return") {
    toast("Select a pending melting issue to load return details.");
  }
  if (action === "print-smith-work" || action === "print-cash-smith" || action === "print-jeweller-work" || action === "print-cash-jeweller" || action === "print-stock-adjustment" || action === "print-opening-stock" || action === "print-gold-deposit" || action === "print-sample" || action === "print-service-job" || action === "print-polishing") {
    window.print();
    const printLabel = action === "print-sample" ? sampleWorkView : action === "print-service-job" ? serviceWorkView : action === "print-polishing" ? "Polishing" : (stockView === "Gold Deposit" || stockView === "Gold Withdrawal" ? stockView : smithWorkView);
    state.audit.unshift(audit(`Printed ${printLabel}`));
    saveState();
  }
  if (action === "close-stock-adjustment" || action === "close-opening-stock" || action === "close-gold-deposit") {
    stockView = "Stock Register";
    render();
  }
  if (action === "close-work-orders") {
    active = "Dashboard";
    render();
  }
  if (action === "print-last-bill") openPrintModal();
  if (action === "set-billing-return") {
    active = "Sales";
    salesView = "Sales Invoice";
    billingView = "Return";
    render();
  }
  if (action === "set-billing-exchange") {
    active = "Sales";
    salesView = "Sales Invoice";
    billingView = "Exchange";
    render();
  }
  if (action === "new-order-advance") {
    orderAdvanceDraft = defaultOrderAdvanceDraft("advance");
    render();
  }
  if (action === "new-order-refund") {
    orderAdvanceRefundDraft = defaultOrderAdvanceDraft("refund");
    render();
  }
  if (action === "retrieve-order-advance") {
    retrieveOrderAdvance("advance");
  }
  if (action === "retrieve-order-refund") {
    retrieveOrderAdvance("refund");
  }
  if (action === "save-order-advance") {
    saveOrderAdvance("advance");
  }
  if (action === "save-order-refund") {
    saveOrderAdvance("refund");
  }
  if (action === "delete-order-advance") {
    deleteLatestOrderAdvance("advance");
  }
  if (action === "delete-order-refund") {
    deleteLatestOrderAdvance("refund");
  }
  if (action === "print-order-advance") {
    window.print();
    state.audit.unshift(audit(`Printed ${salesView}`));
    saveState();
  }
  if (action === "close-order-advance") {
    salesView = "Sales Order";
    render();
  }
  if (action.startsWith("open-transaction-") && !["open-transaction-gold-deposit", "open-transaction-gold-withdrawal", "open-transaction-complimentary-purchase", "open-transaction-complimentary-sales"].includes(action)) {
    toast("Transaction window ready. Detailed entry screen can be expanded from this action.");
  }
  if (action === "save-current-bill") {
    saveState();
    toast("Bill saved. Press Enter in the entry row to add products.");
  }
  if (action === "edit-current-bill") {
    openExistingRecordPicker();
    return;
  }
  if (action === "pick-from-sales") {
    openExistingRecordPicker("sales-only");
    return;
  }
  if (["void-bill", "repost-bill", "previous-bill", "next-bill", "billing-settings", "billing-notes", "refresh", "close-billing"].includes(action)) {
    toast("Billing action ready for detailed workflow.");
  }
  if (action === "print-now") {
    window.print();
    state.audit.unshift(audit(`Printed customer copy for ${state.bills[0]?.id || "bill"}`));
    saveState();
  }
  if (action === "export-report") {
    toast("Report export queued and recorded in audit trail.");
    state.audit.unshift(audit("Exported report"));
    saveState();
  }
}

function retrieveOrderAdvance(type) {
  const draft = type === "refund" ? orderAdvanceRefundDraft : orderAdvanceDraft;
  const order = findSalesOrderForAdvance(draft.pickOrder);
  if (!order) {
    toast("Sales order not found.");
    return;
  }
  draft.pickOrder = order.entryNo || order.refNo || "";
  toast(`Loaded sales order ${draft.pickOrder}.`);
  render();
}

function saveOrderAdvance(type) {
  const isRefund = type === "refund";
  const draft = isRefund ? orderAdvanceRefundDraft : orderAdvanceDraft;
  const order = findSalesOrderForAdvance(draft.pickOrder);
  if (!order) {
    toast("Select a sales order before saving.");
    return;
  }
  const record = normalizeOrderAdvanceRecord({
    ...draft,
    type,
    orderId: order.id,
    orderEntryNo: order.entryNo,
    orderRefNo: order.refNo,
    totalAmount: Number(draft.advanceAmount || 0),
    totalWeight: 0
  }, type);
  const availableBeforeRefund = orderAdvanceSummary(order, {}, "advance").netAdvance;
  if (isRefund && record.refundAmount <= 0) {
    toast("Enter refund amount before saving.");
    return;
  }
  if (isRefund && record.refundAmount > availableBeforeRefund) {
    toast(`Refund cannot exceed available advance ${money(availableBeforeRefund)}.`);
    return;
  }
  if (!isRefund && record.totalAmount <= 0) {
    toast("Enter additional advance amount before saving.");
    return;
  }
  if (isRefund) {
    state.orderAdvanceRefunds.unshift(record);
  } else {
    state.orderAdvances.unshift(record);
  }
  state.audit.unshift(audit(`${isRefund ? "Saved advance refund" : "Saved additional advance"} for sales order ${order.entryNo}`));
  saveState();
  if (isRefund) orderAdvanceRefundDraft = { ...defaultOrderAdvanceDraft("refund"), pickOrder: order.entryNo || order.refNo || "" };
  else orderAdvanceDraft = { ...defaultOrderAdvanceDraft("advance"), pickOrder: order.entryNo || order.refNo || "" };
  render();
  toast(isRefund ? "Order advance refund saved." : "Additional order advance saved.");
}

function deleteLatestOrderAdvance(type) {
  const isRefund = type === "refund";
  const draft = isRefund ? orderAdvanceRefundDraft : orderAdvanceDraft;
  const order = findSalesOrderForAdvance(draft.pickOrder);
  if (!order) return;
  const collection = isRefund ? state.orderAdvanceRefunds : state.orderAdvances;
  const index = collection.findIndex((item) => orderAdvanceRecordMatchesOrder(item, order));
  if (index < 0) {
    toast("No saved record found for this order.");
    return;
  }
  if (!window.confirm(`Delete latest ${isRefund ? "advance refund" : "additional advance"} for order ${order.entryNo}?`)) return;
  collection.splice(index, 1);
  state.audit.unshift(audit(`Deleted ${isRefund ? "advance refund" : "additional advance"} for sales order ${order.entryNo}`));
  saveState();
  render();
  toast("Record deleted.");
}

function parseCategoryAction(value) {
  const keys = ["subGroups", "products", "brands", "models", "prefixes", "units"];
  const key = keys.find((candidate) => value.startsWith(`${candidate}-`)) || "products";
  return { key, id: value.slice(key.length + 1) };
}

function parseMiscAction(value) {
  const keys = Object.keys(state.miscellaneous || seed.miscellaneous);
  const key = keys.find((candidate) => value.startsWith(`${candidate}-`)) || "agents";
  return { key, id: value.slice(key.length + 1) };
}

function openExistingPartyModal(recordId) {
  const party = state.parties.find((item) => item.id === recordId || item.customerCode === recordId);
  if (!party) {
    toast("Record not found.");
    return;
  }
  openPartyModal(party.type, party.id);
}

function deleteManagementRecord(kind, recordId) {
  const names = {
    party: "master party",
    employee: "employee",
    itemMaster: "item master",
    accountMaster: "account master"
  };
  if (!window.confirm(`Delete this ${names[kind]} record?`)) return;
  if (kind === "party") state.parties = state.parties.filter((party) => party.id !== recordId && party.customerCode !== recordId);
  if (kind === "employee") state.staffs = state.staffs.filter((staff) => staff.staffId !== recordId && staff.employeeId !== recordId);
  if (kind === "itemMaster") state.itemMasters = state.itemMasters.filter((item) => item.itemId !== recordId);
  if (kind === "accountMaster") state.accountMasters = state.accountMasters.filter((account) => account.accountId !== recordId);
  state.audit.unshift(audit(`Deleted ${names[kind]} ${recordId}`));
  saveState();
  render();
  toast("Record deleted.");
}

function deleteCategoryRecord(key, recordId) {
  if (!window.confirm("Delete this item category record?")) return;
  state.itemCategories[key] = (state.itemCategories[key] || []).filter((item) => item.id !== recordId);
  state.audit.unshift(audit(`Deleted ${key} category ${recordId}`));
  saveState();
  render();
  toast("Category record deleted.");
}

function openMiscModal(key) {
  openModal(
    `Add New ${miscellaneousTitle(key)}`,
    "Create a miscellaneous master value used in connected dropdowns.",
    `<input type="hidden" name="key" value="${key}" /><input type="hidden" name="recordId" value="" />${miscFormBody(key, {})}`,
    `Save ${miscellaneousTitle(key)}`,
    "miscellaneous"
  );
}

function deleteMiscRecord(key, recordId) {
  if (!window.confirm("Delete this miscellaneous record?")) return;
  state.miscellaneous[key] = (state.miscellaneous[key] || []).filter((item) => miscRecordId(item) !== recordId);
  state.audit.unshift(audit(`Deleted ${miscellaneousTitle(key)} ${recordId}`));
  saveState();
  render();
  toast("Miscellaneous record deleted.");
}

function workConfig(key) {
  const configs = {
    smith: { workflow: "Smith", actions: ["Issue", "Return", "Cash for Weight Smith", "Ledger", "Reconciliation"] },
    jeweller: { workflow: "Jeweller", actions: ["Jeweller Transfer", "Cash for Weight Jeweller", "Ledger", "Ledger Detailed", "Reconciliation"] },
    refiner: { workflow: "Refiner", actions: ["Issue", "Return", "Final Return", "Melting Issue", "Melting Return"] },
    polishing: { workflow: "Polishing", actions: ["Issue", "Return"] },
    sample: { workflow: "Sample", actions: ["Issue", "Return"] },
    service: { workflow: "Service / Job", actions: ["New Service / Job", "Close Service / Job"] },
    transfer: { workflow: "Transfers", actions: ["Smith Transfer", "Jeweller Transfer", "Item Transfer"] },
    adjustment: { workflow: "Stock Adjustment", actions: ["Addition", "Deduction", "Reconciliation"] }
  };
  return configs[key] || configs.adjustment;
}

function openExistingRecordPicker(filter = "current") {
  existingRecordPickerItems = existingRecordsForCurrentScreen(filter);
  if (!existingRecordPickerItems.length) {
    toast("No existing records found for this screen.");
    return;
  }
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop record-picker-backdrop">
      <section class="modal record-picker-modal">
        <div class="modal-titlebar">
          <div>
            <p class="eyebrow">Existing records</p>
            <h2>Select Record To Edit</h2>
            <p>Search customer, phone, bill number, entry number, or party name.</p>
          </div>
          <button type="button" class="icon-close" data-action="close-modal">x</button>
        </div>
        <div class="form-grid">
          <section class="form-section wide">
            <label class="search-field"><span>Search</span><input data-record-picker-search placeholder="Customer / phone / bill no" autofocus /></label>
            <div data-record-picker-results>${existingRecordPickerTable(existingRecordPickerItems)}</div>
          </section>
        </div>
        <footer>
          <button type="button" class="secondary" data-action="close-modal">Cancel</button>
        </footer>
      </section>
    </div>
  `);
  const modal = document.querySelector(".record-picker-modal");
  modal.querySelectorAll("[data-action='close-modal']").forEach((button) => button.addEventListener("click", closeModal));
  modal.querySelector("[data-record-picker-search]")?.addEventListener("input", (event) => {
    const query = String(event.target.value || "").trim().toLowerCase();
    const filtered = existingRecordPickerItems.filter((item) => item.searchText.includes(query));
    modal.querySelector("[data-record-picker-results]").innerHTML = existingRecordPickerTable(filtered);
    bindRecordPickerRows(modal);
  });
  bindRecordPickerRows(modal);
}

function bindRecordPickerRows(scope = document) {
  scope.querySelectorAll("[data-load-existing-record]").forEach((button) => {
    button.addEventListener("click", () => loadExistingRecord(button.dataset.loadExistingRecord));
  });
}

function existingRecordPickerTable(items) {
  const rows = items.map((item) => [
    `<button type="button" class="text-button" data-load-existing-record="${item.key}">Load</button>`,
    item.type,
    item.entryNo || "-",
    item.billNo || item.invoiceNo || "-",
    item.date || "-",
    item.party || "-",
    item.phone || "-",
    money(item.total || 0)
  ]);
  return rows.length
    ? table(["", "Screen", "Entry No", "Bill / Invoice", "Date", "Customer / Party", "Phone", "Total"], rows)
    : `<p class="soft-note">No matching records.</p>`;
}

function existingRecordsForCurrentScreen(filter = "current") {
  const records = [];
  const add = (type, storage, record, options = {}) => {
    if (!record) return;
    const key = `${storage}:${record.id || record.entryNo || records.length}`;
    const party = record.customer || record.partyName || record.supplierSmith || record.staffName || "";
    const phone = record.phone || record.customerMobile || "";
    const entryNo = record.entryNo || record.returnEntryNo || record.refNo || "";
    const billNo = record.billNo || record.invoiceNo || record.refNo || "";
    const total = record.invoiceTotal || record.amount || record.total || record.totals?.invoiceTotal || sumLines(record.sections?.sales || record.lines || record.ornamentLines || []);
    records.push({
      key,
      storage,
      id: record.id,
      type,
      entryNo,
      billNo,
      invoiceNo: record.invoiceNo || "",
      date: record.date || record.invoiceDate || "",
      party,
      phone,
      total,
      view: options.view,
      searchText: [type, entryNo, billNo, record.invoiceNo, record.date, party, phone, record.customerId, record.customerCode].filter(Boolean).join(" ").toLowerCase()
    });
  };

  if (filter === "sales-only") {
    (state.bills || []).filter((bill) => !String(bill.type || "").toLowerCase().includes("purchase")).forEach((bill) => add("Sales Invoice", "bills", bill, { view: "Sales Invoice" }));
    return records;
  }

  if (active === "Sales") {
    if (salesView === "Sales Order") (state.salesOrders || []).forEach((order) => add("Sales Order", "salesOrders", order, { view: "Sales Order" }));
    else (state.bills || []).filter((bill) => salesView === "Sales Return" ? bill.sections?.return?.length : !String(bill.type || "").toLowerCase().includes("purchase")).forEach((bill) => add(salesView, "bills", bill, { view: salesView }));
  } else if (active === "Purchase") {
    if (purchaseView === "Direct Purchase") (state.directPurchases || []).forEach((bill) => add("Direct Purchase", "directPurchases", bill, { view: purchaseView }));
    else if (purchaseView === "Direct Purchase Return") (state.directPurchaseReturns || []).forEach((bill) => add("Direct Purchase Return", "directPurchaseReturns", bill, { view: purchaseView }));
    else if (purchaseView === "Diamond Purchase") (state.diamondPurchases || []).forEach((bill) => add("Diamond Purchase", "diamondPurchases", bill, { view: purchaseView }));
    else if (purchaseView === "Diamond Purchase Return") (state.diamondPurchaseReturns || []).forEach((bill) => add("Diamond Purchase Return", "diamondPurchaseReturns", bill, { view: purchaseView }));
    else if (purchaseView === "DMD Stone Purchase") (state.dmdStonePurchases || []).forEach((bill) => add("DMD Stone Purchase", "dmdStonePurchases", bill, { view: purchaseView }));
    else (state.bills || []).filter((bill) => String(bill.type || "").toLowerCase().includes("purchase")).forEach((bill) => add(purchaseView, "bills", bill, { view: purchaseView }));
  } else if (active === "Work Orders" && workOrderView === "Complimentary Item") {
    if (complimentaryView === "Complimentary Item Issue") {
      (state.complimentaryIssues || []).forEach((record) => add("Complimentary Issue", "complimentaryIssues", record, { view: complimentaryView }));
    } else {
      (state.complimentaryPurchases || []).forEach((record) => add("Complimentary Purchase", "complimentaryPurchases", record, { view: complimentaryView }));
    }
  }
  return records;
}

function loadExistingRecord(key) {
  const item = existingRecordPickerItems.find((record) => record.key === key);
  if (!item) return;
  const list = state[item.storage];
  const index = (list || []).findIndex((record) => record.id === item.id || record.entryNo === item.entryNo || record.billNo === item.billNo);
  if (index < 0) {
    toast("Record not found.");
    return;
  }
  const [record] = list.splice(index, 1);
  list.unshift(record);
  if (item.storage === "salesOrders") {
    active = "Sales";
    expandedNavGroups.add("Sales");
    salesView = "Sales Order";
  } else if (item.storage === "complimentaryPurchases") {
    complimentaryPurchaseDraft = normalizeComplimentaryPurchase(structuredClone(record));
    complimentaryPurchaseSelectedRow = 0;
    active = "Work Orders";
    workOrderView = "Complimentary Item";
    complimentaryView = "Complimentary Item Purchase";
  } else if (item.storage === "complimentaryIssues") {
    complimentaryIssueDraft = normalizeComplimentaryIssue(structuredClone(record));
    complimentaryIssueSelectedRow = 0;
    active = "Work Orders";
    workOrderView = "Complimentary Item";
    complimentaryView = "Complimentary Item Issue";
  } else if (item.storage === "bills") {
    if (String(record.type || "").toLowerCase().includes("purchase")) {
      active = "Purchase";
      expandedNavGroups.add("Purchase");
      purchaseView = item.view || "Purchase Invoice";
    } else {
      active = "Sales";
      expandedNavGroups.add("Sales");
      salesView = item.view || "Sales Invoice";
    }
  } else {
    active = "Purchase";
    expandedNavGroups.add("Purchase");
    purchaseView = item.view || purchaseView;
  }
  closeModal();
  render();
  toast(`Loaded ${item.entryNo || item.billNo || item.type} for editing.`);
}

function openPrintModal() {
  const bill = state.bills[0];
  if (!bill) {
    toast("No bill available to print.");
    return;
  }
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop print-modal-backdrop">
      <section class="modal print-modal">
        <div class="panel-head">
          <div>
            <h2>Print Customer Copy</h2>
            <p>This is the bill format the customer can take after purchase.</p>
          </div>
          <div class="button-row no-print">
            <button type="button" class="secondary" data-action="close-modal">Cancel</button>
            <button type="button" class="primary" data-action="print-now">Print</button>
          </div>
        </div>
        ${invoicePreview(bill)}
      </section>
    </div>
  `);
  document.querySelector("[data-action='close-modal']").addEventListener("click", closeModal);
  document.querySelector("[data-action='print-now']").addEventListener("click", () => handleAction("print-now"));
}

function openCardTransactionsModal(source) {
  const scope = source?.dataset?.cardScope || "sales";
  const bill = scope === "order" ? salesOrderBill() : state.bills[0] || {};
  const breakup = normalizePaymentBreakup(bill.paymentBreakup);
  const cardMasters = state.miscellaneous?.cards?.length ? state.miscellaneous.cards : normalizeMiscellaneous(seed.miscellaneous).cards;
  const rows = cardMasters.map((card, index) => [
    String(index + 1),
    card.name,
    editCell(index === 0 ? "cardUpi" : index === 1 ? "cardDebit" : index === 2 ? "cardCredit" : "cardOther", moneyValue(index === 0 ? breakup.gpay : index === 1 ? breakup.card : index === 2 ? 0 : breakup.other), "decimal"),
    editCell(index === 0 ? "upiRef" : index === 1 ? "debitCardNo" : index === 2 ? "creditCardNo" : "otherCardNo", index === 0 ? breakup.reference || "" : ""),
    editCell(index === 0 ? "upiHolder" : index === 1 ? "debitHolder" : index === 2 ? "creditHolder" : "otherHolder", bill.customer || "")
  ]);
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop card-modal-backdrop">
      <section class="modal card-modal" data-card-scope="${scope}">
        <div class="card-modal-title">
          <h2>Card Transactions</h2>
          <button type="button" class="icon-close" data-action="close-modal">x</button>
        </div>
        ${table(["#", "Card Name", "Amount", "Card Number", "Card Holder Name"], rows)}
        <div class="card-modal-footer">
          <output class="card-total">${money(breakup.gpay + breakup.card + breakup.other)}</output>
          <button type="button" class="primary dark-action" data-action="save-card-transactions">OK</button>
          <button type="button" class="secondary dark-action" data-action="close-modal">Close</button>
        </div>
      </section>
    </div>
  `);
  document.querySelectorAll(".card-modal [data-line-field]").forEach((input) => {
    input.addEventListener("input", updateCardModalTotal);
  });
  document.querySelectorAll(".card-modal [data-action]").forEach((button) => {
    button.addEventListener("click", () => handleAction(button.dataset.action, button));
  });
  updateCardModalTotal();
}

function updateCardModalTotal() {
  const modal = document.querySelector(".card-modal");
  if (!modal) return;
  const total = ["cardUpi", "cardDebit", "cardCredit", "cardOther"].reduce((sum, field) => {
    const value = modal.querySelector(`[data-line-field="${field}"]`)?.value || "0";
    return sum + parseEntryNumber(value);
  }, 0);
  modal.querySelector(".card-total").textContent = money(total);
}

function saveCardTransactions() {
  const modal = document.querySelector(".card-modal");
  if (!modal) return;
  const bill = modal.dataset.cardScope === "order" ? salesOrderBill() : state.bills[0];
  if (!bill) return;
  const read = (field) => parseEntryNumber(modal.querySelector(`[data-line-field="${field}"]`)?.value);
  const readText = (field) => modal.querySelector(`[data-line-field="${field}"]`)?.value || "";
  const card = read("cardDebit") + read("cardCredit");
  const gpay = read("cardUpi");
  const other = read("cardOther");
  bill.paymentBreakup = {
    ...bill.paymentBreakup,
    gpay,
    card,
    other,
    reference: readText("upiRef") || readText("debitCardNo") || readText("creditCardNo")
  };
  bill.adjustments = {
    ...bill.adjustments,
    card: card + gpay + other
  };
  applyBillFinancials(bill);
  state.audit.unshift(audit("Updated card transaction split"));
  saveState();
  closeModal();
  render();
  toast("Card transactions updated.");
}

function openRateModal() {
  const workflowLabel = "Update Shop Rate";
  const gold22 = latestRateValue("Gold", "22K", 14450);
  const gold24 = latestRateValue("Gold", "24K", Math.round((gold22 / 22) * 24));
  const gold21 = latestRateValue("Gold", "21K", Number(((gold22 / 22) * 21).toFixed(3)));
  const gold18 = latestRateValue("Gold", "18K", Number(((gold22 / 22) * 18).toFixed(3)));
  const oldGold = latestRateValue("Gold", "Old Gold", gold22);
  const silverNew = latestRateValue("Silver", "New", latestRateValue("Silver", "999", 200));
  const silverOld = latestRateValue("Silver", "Old", 60);
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop rate-modal-backdrop">
      <form class="rate-update-window" data-form="rate">
        <header class="rate-window-title">
          <span>Rate Update</span>
          <button type="button" data-action="close-modal">x</button>
        </header>
        <div class="rate-date-row">
          <label><span>Date</span><input name="date" value="${new Date().toLocaleDateString("en-GB")}" /></label>
          <label><span>Time</span><input name="time" value="${new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })}" /></label>
        </div>
        <section class="rate-grid-section">
          <h3>Gold Rate</h3>
          <div class="rate-grid rate-grid-head"><span></span><span>1 Gram</span><span>8 Gram</span></div>
          ${rateInputRow("24 Ct", "gold24", gold24, 8)}
          ${rateInputRow("22 Ct", "gold22", gold22, 8)}
          ${rateInputRow("21 Ct", "gold21", gold21, 8)}
          ${rateInputRow("18 Ct", "gold18", gold18, 8)}
          ${rateInputRow("Old Gold", "oldGold", oldGold, 8)}
        </section>
        <section class="rate-grid-section silver-section">
          <h3>Silver Rate</h3>
          <div class="rate-grid rate-grid-head"><span></span><span>1 Gram</span><span>10 Gram</span></div>
          ${rateInputRow("New", "silverNew", silverNew, 10, "silver")}
          ${rateInputRow("Old", "silverOld", silverOld, 10, "silver")}
        </section>
        <div class="rate-window-rule"></div>
        <footer class="rate-window-actions">
          <button class="classic-blue-button">Update</button>
          <button type="button" class="classic-blue-button" data-action="show-rate-history">Show History</button>
          <button type="button" class="classic-next-button" data-action="close-modal">&gt;&gt;</button>
        </footer>
      </form>
    </div>
  `);
  const modal = document.querySelector(".rate-update-window");
  modal.addEventListener("submit", formHandlers.rate);
  modal.querySelectorAll("[data-action='close-modal']").forEach((button) => button.addEventListener("click", closeModal));
  modal.querySelector("[data-action='show-rate-history']").addEventListener("click", openRateHistoryModal);
  setupRateUpdateGrid(modal);
}

function rateInputRow(label, name, value, multiplier, variant = "gold") {
  return `<div class="rate-grid rate-input-row ${variant}">
    <strong>${label}</strong>
    <input name="${name}" data-rate-source="${name}" data-rate-multiplier="${multiplier}" type="number" min="0" step="0.001" value="${moneyValue(value)}" />
    <input data-rate-total="${name}" value="${moneyValue(Number(value || 0) * multiplier)}" readonly />
  </div>`;
}

function setupRateUpdateGrid(modal) {
  modal.querySelectorAll("[data-rate-source]").forEach((inputItem) => {
    const updateTotal = () => {
      const multiplier = Number(inputItem.dataset.rateMultiplier || 1);
      const total = modal.querySelector(`[data-rate-total="${inputItem.dataset.rateSource}"]`);
      if (total) total.value = moneyValue(Number(inputItem.value || 0) * multiplier);
    };
    inputItem.addEventListener("input", updateTotal);
    updateTotal();
  });
}

function openRateHistoryModal() {
  closeModal();
  openModal(
    "Rate History",
    "Every owner-approved intraday rate change is listed here.",
    `<section class="form-section wide">${rateTimeline()}</section>`,
    "Close",
    "noop"
  );
}

function openBillModal() {
  const active22k = latestRates().find((r) => r.type === "Gold" && r.grade === "22K")?.price || 0;
  const itemOptions = ["OLD GOLD", ...state.stock.map((item) => item.item)];
  openModal(
    "Bill Entry Details",
    "Enter only the fields used in the Sales, Exchange and Return bill tables.",
    `<section class="form-section wide">
       <h3>Bill Details</h3>
       <div class="form-section-grid compact">
         ${input("entryNo", "Entry No, Ref No", `C${String(state.bills.length + 2034).padStart(5, "0")}`)}
         ${input("billNo", "Bill No", "20260521_1")}
         ${select("staffId", "Staff ID", state.staffs.map((staff) => staff.staffId))}
         ${select("staffName", "Staff, Agent", staffNameOptions())}
         ${select("category", "Item Category", ["B2C", "B2B"])}
         ${select("prepareEinvoice", "Prepare eINVOICE", ["No", "Yes"])}
       </div>
     </section>
     <section class="form-section">
       <h3>Customer Balance</h3>
       <div class="form-section-grid two">
         ${input("customerId", "Cust ID", "")}
         ${input("customer", "Customer Name", "Walk-in customer", "text", "required")}
         ${input("openingBalance", "Opening Balance", "0", "number", "min='0' step='0.01'")}
         ${select("balanceType", "Balance Type", ["Dr", "Cr"])}
         ${input("openingWeight", "Opening Weight", "0", "number", "min='0' step='0.001'")}
         ${select("weightType", "Weight Type", ["Give", "Receive"])}
       </div>
     </section>
     <section class="form-section">
       <h3>Customer Contact</h3>
       <div class="form-section-grid two">
         ${input("address", "Address", "")}
         ${input("city", "City", "")}
         ${input("place", "Place", "")}
         ${select("state", "State/Province", ["KERALA", "TAMIL NADU", "KARNATAKA", "OTHER"])}
         ${select("country", "Country", ["INDIA", "UAE", "OTHER"])}
         ${input("phone", "Phone", "")}
         ${input("mobile", "Mobile", "")}
       </div>
     </section>
     <section class="form-section">
       <h3>Customer Identity</h3>
       <div class="form-section-grid two">
         ${input("panGst", "PAN/GST", "")}
         ${input("pinCode", "PIN Code", "")}
         ${input("email", "Email Address", "", "email")}
         ${input("aadhaar", "Aadhar", "")}
         ${select("agent", "Agent", agentNameOptions())}
         ${select("customerStatus", "Status", ["Active", "Inactive"])}
         ${input("birthDate", "D-O-Birth", "26/12/2000")}
         ${input("joinDate", "Join", new Date().toLocaleDateString("en-GB"))}
       </div>
     </section>
     <section class="form-section wide compact-section">
       <h3>Section & Rate</h3>
       <div class="form-section-grid tight">
         ${select("billSection", "Billing section", ["Sales", "Exchange", "Return"])}
         ${input("rate", "Approved 22K rate", active22k, "number", "min='0' step='0.01' required")}
       </div>
     </section>
     <section class="form-section wide">
       <h3>Table Row</h3>
       <div class="form-section-grid">
         ${input("barcode", "Barcode", "GL22-NEW")}
         ${select("item", "Item / Name", itemOptions)}
         ${input("description", "Description", "22K gold chain")}
         ${input("qty", "Qty", "1", "number", "min='0' step='0.001' required")}
         ${input("gross", "Gross weight", "8.240", "number", "min='0' step='0.001' required")}
         ${input("stone", "Stone weight", "0", "number", "min='0' step='0.001'")}
         ${input("wastage", "Wastage", "0", "number", "min='0' step='0.001'")}
         ${input("mudLess", "MudLess", "0", "number", "min='0' step='0.001'")}
         ${input("lessPct", "Less%", "0", "number", "min='0' step='0.01'")}
         ${input("lessWeight", "Less Weight", "0", "number", "min='0' step='0.001'")}
         ${input("touchPct", "Touch%", "0", "number", "min='0' step='0.01'")}
         ${input("touchLess", "Touch Less", "0", "number", "min='0' step='0.001'")}
         ${input("stoneCharge", "Stone charge", "0", "number", "min='0' step='0.01'")}
         ${input("va", "VA%", "4.5", "number", "min='0' step='0.01'")}
         ${input("making", "MC auto value", "0", "number", "readonly title='Auto: Net weight * VA% * Rate'")}
         ${input("taxPct", "Tax%", "3", "number", "min='0' step='0.01'")}
         ${input("cessPct", "CessPerc", "0", "number", "min='0' step='0.01'")}
       </div>
       <div class="bill-row-previews">
         <div data-section-preview="Sales">${table(salesEntryColumns(), [salesEntryRow(normalizeBillLine({ itemName: "22K Chain", barcode: "GL22-NEW", description: "22K gold chain", qty: 1, gross: 8.24, stone: 0, wastage: 0, rate: active22k, va: 4.5, makingCharge: 6200, totalMc: 6200, taxPct: 3 }, 0, {}, "sales"))])}</div>
         <div data-section-preview="Exchange">${table(exchangeEntryColumns(), [exchangeEntryRow(normalizeBillLine({ item: "OG", itemName: "OLD GOLD", qty: 1, gross: 8.24, stone: 0, mudLess: 0, lessPct: 0, lessWeight: 0, touchPct: 0, touchLess: 0, stoneCharge: 0, rate: active22k }, 0, {}, "exchange"))])}</div>
         <div data-section-preview="Return">${table(returnEntryColumns(), [returnEntryRow(normalizeBillLine({ itemName: "22K Chain", qty: 1, gross: 8.24, stone: 0, wastage: 0, stoneCharge: 0, va: 4.5, makingCharge: 6200, rate: active22k, taxPct: 3 }, 0, {}, "return"))])}</div>
       </div>
       <div class="bill-calc-note" data-bill-calc>Net and final amount will be calculated automatically.</div>
     </section>
     <section class="form-section wide payment-section">
       <h3>Payment</h3>
       <p class="soft-note">For Mixed payment, enter the exact split below. Example: Cash notes plus GPay transfer.</p>
       <div class="form-section-grid tight">
         ${select("payment", "Payment mode", ["Cash", "GPay", "UPI", "Card", "Bank", "Mixed"])}
         ${input("paid", "Amount paid", "0", "number", "min='0' step='0.01'")}
         ${input("cashPaid", "Notes / cash", "0", "number", "min='0' step='0.01'")}
         ${input("gpayPaid", "GPay / UPI", "0", "number", "min='0' step='0.01'")}
         ${input("cardPaid", "Card", "0", "number", "min='0' step='0.01'")}
         ${input("bankPaid", "Bank transfer", "0", "number", "min='0' step='0.01'")}
         ${input("otherPaid", "Other transaction", "0", "number", "min='0' step='0.01'")}
         ${input("transactionRef", "Transaction reference", "")}
       </div>
     </section>`,
    "Save Entry",
    "bill"
  );
}

function setupBillModal() {
  const form = document.querySelector('[data-form="bill"]');
  const sectionSelect = form?.querySelector('[name="billSection"]');
  if (!form || !sectionSelect) return;

  const visibleBySection = {
    Sales: ["barcode", "item", "description", "qty", "gross", "stone", "wastage", "stoneCharge", "making", "va", "taxPct", "cessPct"],
    Exchange: ["item", "qty", "gross", "stone", "mudLess", "lessPct", "lessWeight", "touchPct", "touchLess", "stoneCharge"],
    Return: ["item", "qty", "gross", "stone", "wastage", "stoneCharge", "making", "va", "taxPct", "cessPct"]
  };
  const rowFields = ["barcode", "item", "description", "qty", "gross", "stone", "wastage", "mudLess", "lessPct", "lessWeight", "touchPct", "touchLess", "stoneCharge", "making", "va", "taxPct", "cessPct"];

  function syncSection() {
    const section = sectionSelect.value;
    form.querySelectorAll("[data-section-preview]").forEach((preview) => {
      preview.hidden = preview.dataset.sectionPreview !== section;
    });
    rowFields.forEach((name) => {
      const field = form.querySelector(`[name="${name}"]`)?.closest("label");
      if (field) field.hidden = !visibleBySection[section].includes(name);
    });
    syncCalc();
  }

  function formNumber(name) {
    return Number(form.querySelector(`[name="${name}"]`)?.value || 0);
  }

  function syncCalc() {
    const section = sectionSelect.value.toLowerCase();
    const line = calculateBillLine({
      itemName: form.querySelector('[name="item"]')?.value || "Ornament",
      qty: formNumber("qty"),
      gross: formNumber("gross"),
      stone: formNumber("stone"),
      wastage: formNumber("wastage"),
      stoneCharge: formNumber("stoneCharge"),
      rate: formNumber("rate"),
      va: formNumber("va"),
      taxPct: formNumber("taxPct"),
      cessPct: formNumber("cessPct"),
      rateLessPct: formNumber("rateLessPct")
    }, section);
    const target = form.querySelector("[data-bill-calc]");
    const makingField = form.querySelector('[name="making"]');
    if (makingField) makingField.value = moneyValue(line.makingCharge);
    if (target) {
      target.textContent = `Auto calculation: Net ${grams(line.net)} | MC weight ${grams(line.makingChargeWeight)} | MC ${money(line.makingCharge)} | Stone charge ${money(line.stoneCharge)} | Tax ${money(line.tax)} | Final ${money(line.amount)}`;
    }
  }

  sectionSelect.addEventListener("change", syncSection);
  form.querySelectorAll("input, select").forEach((field) => field.addEventListener("input", syncCalc));
  syncSection();
}

function upsertCustomerFromBill(bill) {
  const code = bill.customerId || nextCustomerId();
  const customer = {
    id: code,
    customerCode: code,
    type: "Customer",
    name: bill.customer,
    phone: bill.phone,
    mobile: bill.customerMobile || bill.phone,
    email: bill.customerEmail,
    place: bill.customerPlace,
    city: bill.customerCity,
    state: bill.customerState,
    country: bill.customerCountry,
    address: bill.address,
    panGst: bill.customerPanGst,
    pinCode: bill.customerPinCode,
    aadhaar: bill.customerAadhaar,
    agent: bill.customerAgent,
    status: "Active",
    openingBalance: bill.customerOpeningBalance,
    balanceType: bill.customerBalanceType,
    openingWeight: bill.customerOpeningWeight,
    weightType: bill.customerWeightType,
    birthDate: bill.customerBirthDate || "26/12/2000",
    joinDate: bill.customerJoinDate || new Date().toLocaleDateString("en-GB")
  };
  const existingIndex = state.parties.findIndex((party) => party.type === "Customer" && (party.customerCode === code || party.id === code || party.name === bill.customer));
  if (existingIndex >= 0) {
    state.parties[existingIndex] = normalizeParty({ ...state.parties[existingIndex], ...customer });
    return;
  }
  state.parties.unshift(normalizeParty(customer));
}

function openQuickCustomerModal(source) {
  const scope = source?.closest?.(".classic-billing-shell, .transaction-entry-header");
  const bill = currentCustomerBill(scope) || {};
  openModal(
    "Add Customer",
    "Create the customer record and fill it back into the current bill.",
    `<section class="form-section wide">
       <h3>Customer Details</h3>
       <div class="form-section-grid compact">
         ${input("customerCode", "Cust ID", bill.customerId || nextCustomerId())}
         ${input("name", "Customer Name", bill.customer || bill.partyName || "", "text", "required")}
         ${input("phone", "Phone", bill.phone || bill.customerMobile || "", "tel", "required")}
         ${input("address", "Address", bill.address || "")}
         ${input("place", "Place", bill.customerPlace || "")}
         ${input("city", "City", bill.customerCity || "")}
         ${select("state", "State", ["KERALA", "TAMIL NADU", "KARNATAKA", "OTHER"], bill.customerState || "KERALA")}
         ${input("panGst", "PAN/GST", bill.customerPanGst || "")}
       </div>
     </section>`,
    "Save Customer",
    "quickCustomer"
  );
}

function openStockModal() {
  openModal(
    "Add New Item",
    "Add manual stock with the fields needed for jewellery accounting and future barcode/HUID tracking.",
    `<section class="form-section wide">
       <h3>Item Identity</h3>
       <div class="form-section-grid compact">
         ${input("item", "Item name", "New Ornament", "text", "required")}
         ${select("purity", "Purity", ["22K", "24K", "18K", "Silver", "Diamond"])}
         ${input("huid", "HUID / BIS / barcode", "Pending HUID")}
         ${select("location", "StockPlace / Location", miscOptions("stockLocations", ["Main shop"]))}
         ${select("status", "Status", ["Ready", "Draft", "Low review", "Job work"])}
       </div>
     </section>
     <section class="form-section wide">
       <h3>Stock Weight</h3>
       <div class="form-section-grid compact">
         ${input("qty", "Qty", "1", "number", "min='0' step='0.001' required")}
         ${input("gross", "Gross weight", "8.200", "number", "min='0' step='0.001' required")}
         ${input("opening", "Opening weight", "8.200", "number", "min='0' step='0.001'")}
         ${input("addition", "Addition", "0", "number", "min='0' step='0.001'")}
         ${input("deduction", "Deduction", "0", "number", "min='0' step='0.001'")}
       </div>
     </section>`,
    "Save Item",
    "stock"
  );
}

function openPartyModal(type = "Customer", recordId = "") {
  const existing = state.parties.find((party) => party.id === recordId || party.customerCode === recordId);
  const partyCode = existing?.customerCode || (type === "Customer" ? nextCustomerId() : nextPartyCode(type));
  const isCustomer = type === "Customer";
  const isSupplier = type === "Supplier";
  const isSmith = type === "Smith";
  const isRefiner = type === "Refiner";
  const title = `${type} Master`;
  const nameLabel = `${type} Name`;
  const idLabel = isRefiner ? "Refiner ID" : `${type} ID`;
  const identityLabel = isCustomer ? "PAN/GST" : "GSTIN";
  const extraSupplierFields = (isSupplier || isSmith || isRefiner) ? `
         ${input("fax", "Fax", existing?.fax || "")}
         ${input("website", "Website", existing?.website || "")}` : "";
  const smithFields = isSmith ? `
     <section class="form-section wide">
       <h3>Smith Rates</h3>
       <div class="form-section-grid compact">
         ${input("touch", "Touch", existing?.touch ?? "100.00", "number", "min='0' step='0.01'")}
         ${input("convTouch", "Conv. Touch", existing?.convTouch ?? "100", "number", "min='0' step='0.01'")}
         ${input("wastage", "Wastage", existing?.wastage ?? "0.000", "number", "min='0' step='0.001'")}
       </div>
     </section>` : "";
  openModal(
    `${existing ? "Edit" : "Add New"} ${type}`,
    `Maintain a clean ${title.toLowerCase()} record with the fields used in the shop software.`,
    `<section class="form-section wide">
       <h3>Basic Details</h3>
       <div class="form-section-grid compact">
         <input type="hidden" name="type" value="${type}" />
         <input type="hidden" name="recordId" value="${existing?.id || ""}" />
         ${input("customerCode", idLabel, partyCode)}
         ${input("name", nameLabel, existing?.name || "", "text", "required")}
         ${select("status", "Status", ["Active", "Inactive"], existing?.status || "Active")}
       </div>
     </section>
     <section class="form-section">
       <h3>Opening Balance</h3>
       <div class="form-section-grid two">
         ${input("openingBalance", "Opening Balance", existing?.openingBalance ?? "0", "number", "min='0' step='0.01'")}
         ${select("balanceType", "Balance Type", ["Dr", "Cr"], existing?.balanceType || "Dr")}
         ${input("opDate", "Opening Date", existing?.opDate || new Date().toLocaleDateString("en-GB"))}
         ${input("openingWeight", "Opening Weight", existing?.openingWeight ?? "0", "number", "min='0' step='0.001'")}
         ${select("weightType", "Weight Type", ["Give", "Receive"], existing?.weightType || "Give")}
       </div>
     </section>
     <section class="form-section">
       <h3>Address</h3>
       <div class="form-section-grid two">
         ${input("address", "Address", existing?.address || "")}
         ${input("city", "City", existing?.city || "")}
         ${input("place", "Place", existing?.place || "")}
         ${select("state", "State/Province", ["KERALA", "TAMIL NADU", "KARNATAKA", "OTHER"], existing?.state || "KERALA")}
         ${select("country", "Country", ["INDIA", "UAE", "OTHER"], existing?.country || "INDIA")}
       </div>
     </section>
     <section class="form-section">
       <h3>Contact & Identity</h3>
       <div class="form-section-grid two">
         ${input(isCustomer ? "panGst" : "gstin", identityLabel, isCustomer ? existing?.panGst || "" : existing?.gstin || "")}
         ${isCustomer ? input("pinCode", "PIN Code", existing?.pinCode || "") : ""}
         ${input("phone", "Phone", existing?.phone || "")}
         ${input("mobile", "Mobile", existing?.mobile || "")}
         ${input("email", "Email Address", existing?.email || "", "email")}
         ${isCustomer ? input("aadhaar", "Aadhar", existing?.aadhaar || "") : ""}
         ${isCustomer ? select("agent", "Agent", agentNameOptions(), existing?.agent || "") : ""}
         ${extraSupplierFields}
         ${(isCustomer || isSupplier) ? input("birthDate", "D-O-Birth", existing?.birthDate || "26/12/2000") : ""}
         ${(isCustomer || isSupplier) ? input("joinDate", "Join", existing?.joinDate || new Date().toLocaleDateString("en-GB")) : ""}
       </div>
     </section>
     ${smithFields}`,
    existing ? `Update ${type}` : `Save ${type}`,
    "party"
  );
}

function openEmployeeModal(recordId = "") {
  const existing = state.staffs.find((staff) => staff.staffId === recordId || staff.employeeId === recordId);
  openModal(
    `${existing ? "Edit" : "Add New"} Employee`,
    "Maintain employee master details and make the employee available in billing staff selection.",
    `<section class="form-section wide">
       <h3>Employee Identity</h3>
       <div class="form-section-grid compact">
         <input type="hidden" name="recordId" value="${existing?.staffId || ""}" />
         ${input("staffId", "AccID", existing?.staffId || nextEmployeeId(), "text", "required")}
         ${input("employeeId", "Employee ID", existing?.employeeId || existing?.staffId || nextEmployeeId(), "text", "required")}
         ${input("name", "Employee Name", existing?.name || "", "text", "required")}
         ${select("designation", "Designation", ["Sales Staff", "Billing Staff", "Stock Staff", "Accountant", "Manager"], existing?.designation || "Sales Staff")}
         ${select("status", "Status", ["Active", "Inactive"], existing?.status || "Active")}
       </div>
     </section>
     <section class="form-section">
       <h3>Opening Balance</h3>
       <div class="form-section-grid two">
         ${input("openingBalance", "Opening Balance", existing?.openingBalance ?? "0", "number", "min='0' step='0.01'")}
         ${select("balanceType", "Balance Type", ["Dr", "Cr"], existing?.balanceType || "Dr")}
         ${input("opDate", "Op Date", existing?.opDate || new Date().toLocaleDateString("en-GB"))}
       </div>
     </section>
     <section class="form-section">
       <h3>Address</h3>
       <div class="form-section-grid two">
         ${input("address", "Address", existing?.address || "")}
         ${input("city", "City", existing?.city || "")}
         ${input("place", "Place", existing?.place || "")}
         ${select("state", "State/Province", ["KERALA", "TAMIL NADU", "KARNATAKA", "OTHER"], existing?.state || "KERALA")}
         ${select("country", "Country", ["INDIA", "UAE", "OTHER"], existing?.country || "INDIA")}
         ${input("mobile", "Mobile", existing?.mobile || "")}
       </div>
     </section>
     <section class="form-section wide">
       <h3>Salary & Dates</h3>
       <div class="form-section-grid compact">
         ${input("pointCardNo", "Point Card No", existing?.pointCardNo || "")}
         ${input("basicSalary", "Basic Salary", existing?.basicSalary ?? "0", "number", "min='0' step='0.01'")}
         ${input("ta", "TA", existing?.ta ?? "0", "number", "min='0' step='0.01'")}
         ${input("da", "DA", existing?.da ?? "0", "number", "min='0' step='0.01'")}
         ${input("hra", "HRA", existing?.hra ?? "0", "number", "min='0' step='0.01'")}
         ${input("birthDate", "D-O-Birth", existing?.birthDate || "26/12/2000")}
         ${input("joinDate", "D-O-Join", existing?.joinDate || new Date().toLocaleDateString("en-GB"))}
       </div>
     </section>`,
    existing ? "Update Employee" : "Save Employee",
    "staff"
  );
}

function checkbox(name, label, checked = false) {
  return `<label class="check-field"><input name="${name}" type="checkbox" ${checked ? "checked" : ""} /><span>${label}</span></label>`;
}

function openItemMasterModal(recordId = "") {
  const existing = state.itemMasters.find((item) => item.itemId === recordId);
  openModal(
    existing ? "Edit Item Creation" : "Item Creation",
    "Create item master details used by billing, stock and reports.",
    `<section class="form-section wide">
       <h3>Master Details</h3>
       <div class="form-section-grid compact">
         <input type="hidden" name="recordId" value="${existing?.itemId || ""}" />
         ${input("itemId", "Item ID", existing?.itemId || nextItemMasterId(), "text", "required")}
         ${select("itemGroup", "Item Group", ["Gold", "Diamond", "Silver", "Stone", "Other"], existing?.product || "Gold")}
         ${input("itemName", "Item Name", existing?.itemName || "", "text", "required")}
         ${input("regionalName", "Regional Name", existing?.regionalName || "")}
         ${input("subGroupCode", "Sub Group Code", "")}
         ${select("subGroup", "Sub Group", categoryOptions("subGroups", ["", "ANKLET", "BABY RING", "BANGLE", "BRACELET", "CHAIN", "CUTPIECE", "DIAMOND BRACELET", "DIAMOND CHAIN", "DIAMOND RING", "DROPS", "LOCKET", "RING", "SILVER ORNAMENTS"]), existing?.subGroup || "")}
         ${select("product", "Product", categoryOptions("products", ["Gold", "Diamond", "Silver", "Stone", "Platinum", "Other"]), existing?.product || "Gold")}
         ${select("brand", "Brand", categoryOptions("brands", ["", "Goldland", "BIS", "Local", "Supplier"]), existing?.brand || "")}
         ${select("model", "Model", categoryOptions("models", ["", "Regular", "Antique", "Light Weight", "Designer", "Kids"]), existing?.model || "")}
         ${select("hsnTax", "HSN / TAX", miscOptions("taxSchedules", ["7113 / 3%", "7108 / 3%", "7117 / 3%", "GST exempt", "Custom"]), existing?.hsnTax || "7113 / 3%")}
         ${select("typeWastage", "Type, Wastage", ["22ct", "24ct", "18ct", "Silver", "Diamond"], existing?.typeWastage || "22ct")}
         ${input("wastage", "Wastage", existing?.wastage ?? "0.000", "number", "min='0' step='0.001'")}
         ${input("va", "VA%", existing?.va ?? "0.00", "number", "min='0' step='0.01'")}
         ${input("mcGram", "MC/Gram", existing?.mcGram ?? "0.000", "number", "min='0' step='0.001'")}
       </div>
     </section>
     <section class="form-section wide">
       <h3>Item Descriptions</h3>
       <div class="form-section-grid two">
         ${input("description1", "Description 1", existing?.description1 || "")}
         ${input("description2", "Description 2", existing?.description2 || "")}
       </div>
     </section>
     <section class="form-section wide item-weight-section">
       <h3>Weight Details</h3>
       <div class="weight-matrix">
         <span></span><strong>Opening</strong><strong>Closing</strong>
         <span>Nos</span>${input("openingNos", "", existing?.openingNos ?? "0", "number", "min='0' step='1'")}${input("closingNos", "", existing?.closingNos ?? "0", "number", "min='0' step='1'")}
         <span>Gross Weight</span>${input("openingGross", "", existing?.openingGross ?? "0.000", "number", "min='0' step='0.001'")}${input("closingGross", "", existing?.closingGross ?? "0.000", "number", "min='0' step='0.001'")}
         <span>Stone Weight</span>${input("openingStone", "", existing?.openingStone ?? "0.000", "number", "min='0' step='0.001'")}${input("closingStone", "", existing?.closingStone ?? "0.000", "number", "min='0' step='0.001'")}
         <span>Net Weight</span>${input("openingNet", "", existing?.openingNet ?? "0.000", "number", "readonly")}${input("closingNet", "", existing?.closingNet ?? "0.000", "number", "readonly")}
         <span>Opening Date</span>${input("openingDate", "", existing?.openingDate || new Date().toLocaleDateString("en-GB"))}${input("closingDate", "", existing?.closingDate || new Date().toLocaleDateString("en-GB"))}
         <span>Item, Stock Touch</span>${input("itemStockTouch", "", existing?.itemStockTouch ?? "0.000", "number", "min='0' step='0.001'")}${input("closingStockTouch", "", existing?.closingStockTouch ?? "0.000", "number", "min='0' step='0.001'")}
       </div>
       <div class="check-grid">
         ${checkbox("ornament", "Ornament", existing?.ornament !== false)}
         ${checkbox("barcodeCompulsory", "Barcode Compulsory", existing?.barcodeCompulsory)}
         ${checkbox("reservedItem", "Reserved Item", existing?.reservedItem)}
         ${checkbox("hideInStockReports", "Hide in Stock Reports", existing?.hideInStockReports)}
       </div>
     </section>`,
    existing ? "Update Item" : "Save Item",
    "itemMaster"
  );
  setupItemMasterModal();
}

function setupItemMasterModal() {
  const form = document.querySelector('[data-form="itemMaster"]');
  if (!form) return;
  const recalc = () => {
    const openingGross = Number(form.querySelector('[name="openingGross"]')?.value || 0);
    const openingStone = Number(form.querySelector('[name="openingStone"]')?.value || 0);
    const closingGross = Number(form.querySelector('[name="closingGross"]')?.value || 0);
    const closingStone = Number(form.querySelector('[name="closingStone"]')?.value || 0);
    const openingNet = form.querySelector('[name="openingNet"]');
    const closingNet = form.querySelector('[name="closingNet"]');
    if (openingNet) openingNet.value = numericValue(Math.max(0, openingGross - openingStone));
    if (closingNet) closingNet.value = numericValue(Math.max(0, closingGross - closingStone));
  };
  form.querySelectorAll('[name="openingGross"], [name="openingStone"], [name="closingGross"], [name="closingStone"]').forEach((inputItem) => {
    inputItem.addEventListener("input", recalc);
  });
  recalc();
}

function openAccountMasterModal(recordId = "") {
  const existing = state.accountMasters.find((account) => account.accountId === recordId);
  openModal(
    existing ? "Edit Account Creation" : "Account Creation",
    "Create a ledger account master used by accounts, vouchers and reports.",
    `<section class="form-section wide">
       <h3>Account Identity</h3>
       <div class="form-section-grid compact">
         <input type="hidden" name="recordId" value="${existing?.accountId || ""}" />
         ${input("accountId", "ID", existing?.accountId || nextAccountMasterId(), "text", "required")}
         ${input("accountName", "Account Name", existing?.accountName || "", "text", "required")}
         ${input("aliasName", "Alias Name", existing?.aliasName || "")}
         ${select("subSchedule", "Sub Schedule", ["Agents", "Cash", "Bank", "Supplier", "Customer", "Expense", "Income"], existing?.subSchedule || "Agents")}
       </div>
     </section>
     <section class="form-section">
       <h3>Opening</h3>
       <div class="form-section-grid two">
         ${input("openingBalance", "Opening Balance", existing?.openingBalance ?? "0", "number", "min='0' step='0.01'")}
         ${select("balanceType", "Balance Type", ["Dr", "Cr"], existing?.balanceType || "Dr")}
         ${input("opDate", "Op Date, Rate", existing?.opDate || new Date().toLocaleDateString("en-GB"))}
       </div>
     </section>
     <section class="form-section">
       <h3>Status & Contact</h3>
       <div class="form-section-grid two">
         ${select("status", "Status", ["ACTIVE", "INACTIVE"], existing?.status || "ACTIVE")}
         ${select("costCenter", "Cost Center", miscOptions("costCenters", ["Main shop"]), existing?.costCenter || "Main shop")}
         ${input("mobile", "Mobile No.", existing?.mobile || "")}
         ${select("adminOnly", "Admin ONLY", ["No", "Yes"], existing?.adminOnly ? "Yes" : "No")}
       </div>
     </section>`,
    existing ? "Update Account" : "Save Account",
    "accountMaster"
  );
}

function openCategoryModal(key, recordId = "") {
  const record = (state.itemCategories[key] || []).find((item) => item.id === recordId);
  const title = categoryTitle(key);
  openModal(
    `${record ? "Edit" : "Add New"} ${title}`,
    `Maintain ${title.toLowerCase()} records used as dropdown values in Item Creation.`,
    categoryModalBody(key, record),
    record ? `Update ${title}` : `Save ${title}`,
    "itemCategory"
  );
}

function categoryTitle(key) {
  return {
    products: "Product Master",
    brands: "Brand Master",
    models: "Model Master",
    units: "Unit Creation",
    subGroups: "Sub Group Master",
    prefixes: "Entry Prefixes"
  }[key] || "Product Master";
}

function nextCategoryId(key) {
  const count = (state.itemCategories[key] || []).length + 1;
  if (key === "products") return `P${String(count).padStart(2, "0")}`;
  if (key === "brands") return `B${String(count).padStart(2, "0")}`;
  if (key === "models") return `M${String(count).padStart(2, "0")}`;
  if (key === "units") return String(count);
  if (key === "subGroups") return `SG${String(count).padStart(2, "0")}`;
  return String(count);
}

function categoryModalBody(key, record = {}) {
  const hidden = `<input type="hidden" name="key" value="${key}" /><input type="hidden" name="recordId" value="${record?.id || ""}" />`;
  if (key === "units") {
    return `${hidden}<section class="form-section wide"><h3>Unit Details</h3><div class="form-section-grid compact">
      ${input("id", "Item ID", record?.id || nextCategoryId(key), "text", "required")}
      ${input("name", "Item Name", record?.name || "", "text", "required")}
    </div></section>`;
  }
  if (key === "subGroups") {
    return `${hidden}<section class="form-section wide"><h3>Sub Group Details</h3><div class="form-section-grid compact">
      ${input("id", "ID", record?.id || nextCategoryId(key), "text", "required maxlength='5'")}
      ${input("name", "Name", record?.name || "", "text", "required")}
      ${input("remarks", "Remarks", record?.remarks || "")}
    </div><div class="master-help-lines"><p>ID - Minimum 1 Character</p><p>ID - Maximum 5 Character</p></div></section>`;
  }
  if (key === "prefixes") {
    return `${hidden}<section class="form-section wide"><h3>Prefix Details</h3><div class="form-section-grid compact">
      ${input("number", "#", record?.number || nextCategoryId(key), "number", "min='1' step='1' required")}
      ${input("description", "Description", record?.description || "", "text", "required")}
      ${input("prefix", "Prefix", record?.prefix || "")}
    </div></section>`;
  }
  return `${hidden}<section class="form-section wide"><h3>${categoryTitle(key)}</h3><div class="form-section-grid compact">
    ${input("id", "ID", record?.id || nextCategoryId(key), "text", "required")}
    ${input("name", "Name", record?.name || "", "text", "required")}
    ${select("status", "Status", ["Active", "Inactive"], record?.status || "Active")}
    ${input("description", "Description", record?.description || "")}
  </div></section>`;
}

function openWorkModal(key) {
  const config = workConfig(key);
  openModal(
    `${config.workflow} Entry`,
    "Collect the issue, return, transfer or reconciliation details used in the stock workflow reports.",
    `<section class="form-section wide">
       <h3>Workflow Details</h3>
       <div class="form-section-grid compact">
         ${input("refNo", "Ref No", `${config.workflow.slice(0, 2).toUpperCase()}-${String(state.workLogs.length + 1).padStart(3, "0")}`, "text", "required")}
         ${input("date", "Date", new Date().toLocaleDateString("en-GB"), "text", "required")}
         ${select("action", "Action", config.actions)}
         ${select("status", "Status", ["Issued", "Pending", "Received", "Closed", "Reconciled"])}
       </div>
     </section>
     <section class="form-section">
       <h3>Party & Item</h3>
       <div class="form-section-grid two">
         ${input("party", "Smith / Jeweller / Refiner / Party", config.workflow)}
         ${input("item", "Item name", "Bangle", "text", "required")}
         ${input("qty", "Qty", "1", "number", "min='0' step='0.001' required")}
         ${input("gross", "Gross weight", "0", "number", "min='0' step='0.001' required")}
       </div>
     </section>
     <section class="form-section">
       <h3>Weight Movement</h3>
       <div class="form-section-grid two">
         ${input("issue", "Issue weight", "0", "number", "min='0' step='0.001'")}
         ${input("receive", "Receive weight", "0", "number", "min='0' step='0.001'")}
       </div>
     </section>`,
    "Save Workflow Entry",
    "work"
  );
  document.querySelector('[data-form="work"]').dataset.workflow = config.workflow;
}

function openSchemeModal() {
  openModal(
    "Add New Collection",
    "Post a scheme/chitty collection and update the member balance.",
    `<section class="form-section wide">
       <h3>Member</h3>
       <div class="form-section-grid compact">
         ${select("member", "Member", state.schemes.map((scheme) => scheme.member))}
         ${input("memberId", "Member ID", state.schemes[0]?.memberId || "")}
         ${input("book", "Book no.", state.schemes[0]?.book || "")}
       </div>
     </section>
     <section class="form-section wide">
       <h3>Collection</h3>
       <div class="form-section-grid compact">
         ${input("amount", "Collection amount", "500", "number", "min='0' step='0.01' required")}
         ${input("opWeight", "Opening weight", state.schemes[0]?.opWeight || "0", "number", "min='0' step='0.001'")}
         ${select("mode", "Payment mode", ["Cash", "UPI", "Bank", "Card"])}
       </div>
     </section>`,
    "Post Collection",
    "scheme"
  );
}

function openAccountModal() {
  openModal(
    "Add New Account Entry",
    "Record a receipt, payment, bank entry, expense, or journal-style adjustment.",
    `<section class="form-section wide">
       <h3>Voucher</h3>
       <div class="form-section-grid compact">
         ${input("date", "Date", new Date().toLocaleDateString("en-GB"), "text", "required")}
         ${input("vouNo", "Voucher no.", "VOU-NEW")}
         ${select("entryType", "Entry type", ["Receipt", "Payment", "Bank deposit", "Bank withdrawal", "Expense", "Journal"])}
       </div>
     </section>
     <section class="form-section wide">
       <h3>Ledger Amount</h3>
       <div class="form-section-grid compact">
         ${input("ledger", "Ledger", "Cash in Hand", "text", "required")}
         ${input("debit", "Debit", "0", "number", "min='0' step='0.01'")}
         ${input("credit", "Credit", "0", "number", "min='0' step='0.01'")}
         ${input("narration", "Narration", "Manual account entry")}
       </div>
     </section>`,
    "Save Entry",
    "account"
  );
}

const formHandlers = {
  noop(event) {
    event.preventDefault();
    closeModal();
  },
  rate(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const date = form.get("date") || new Date().toLocaleDateString("en-GB");
    const time = form.get("time") || nowTime();
    const updates = [
      ["Gold", "24K", form.get("gold24")],
      ["Gold", "22K", form.get("gold22")],
      ["Gold", "21K", form.get("gold21")],
      ["Gold", "18K", form.get("gold18")],
      ["Gold", "Old Gold", form.get("oldGold")],
      ["Silver", "New", form.get("silverNew")],
      ["Silver", "Old", form.get("silverOld")]
    ].filter(([, , value]) => value !== null && value !== "" && !Number.isNaN(Number(value)));
    updates.forEach(([type, grade, value]) => {
      const next = {
        id: crypto.randomUUID(),
        type,
        grade,
        price: Number(value),
        reason: "Manual shop rate update",
        user: "Goldland",
        time,
        date
      };
      state.rates.push(next);
    });
    state.audit.unshift(audit(`Updated ${updates.length} shop rate rows`, time));
    saveAndClose("Shop rates updated.");
  },
  bill(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const rateValue = Number(form.get("rate"));
    const gross = Number(form.get("gross"));
    const stone = Number(form.get("stone"));
    const wastage = Number(form.get("wastage"));
    const net = Math.max(0, gross - stone);
    const making = Number(form.get("making"));
    const stoneCharge = Number(form.get("stoneCharge"));
    const discount = 0;
    const sectionKey = form.get("billSection").toLowerCase();
    const calculatedLine = calculateBillLine({
      barcode: form.get("barcode"),
      item: form.get("item") === "OLD GOLD" ? "OG" : form.get("item"),
      itemName: form.get("item"),
      description: form.get("description"),
      qty: Number(form.get("qty")),
      gross,
      stone,
      mudLess: Number(form.get("mudLess")),
      lessPct: Number(form.get("lessPct")),
      lessWeight: Number(form.get("lessWeight")),
      touchPct: Number(form.get("touchPct")),
      touchLess: Number(form.get("touchLess")),
      wastage,
      net,
      stoneCharge,
      rateLessPct: Number(form.get("rateLessPct") || 0),
      ratePct: 0,
      rate: rateValue,
      va: Number(form.get("va")),
      totalMc: making,
      makingCharge: making,
      taxPct: Number(form.get("taxPct")),
      cessPct: Number(form.get("cessPct")),
      huid: "",
      itemDescription: form.get("description")
    }, sectionKey);
    const taxAmount = Math.round(calculatedLine.tax);
    const total = calculatedLine.amount;
    const paymentMode = form.get("payment");
    const paymentBreakup = {
      cash: Number(form.get("cashPaid") || 0),
      gpay: Number(form.get("gpayPaid") || 0),
      card: Number(form.get("cardPaid") || 0),
      bank: Number(form.get("bankPaid") || 0),
      other: Number(form.get("otherPaid") || 0),
      reference: form.get("transactionRef") || ""
    };
    const mixedPaid = paymentBreakup.cash + paymentBreakup.gpay + paymentBreakup.card + paymentBreakup.bank + paymentBreakup.other;
    const paid = paymentMode === "Mixed" ? mixedPaid : Number(form.get("paid"));
    const customerCode = form.get("customerId") || nextCustomerId();
    const bill = {
      id: `GL-S-2026-${String(state.bills.length + 20).padStart(4, "0")}`,
      entryNo: form.get("entryNo"),
      refNo: form.get("entryNo"),
      billNo: form.get("billNo"),
      prepareEinvoice: form.get("prepareEinvoice") === "Yes",
      date: new Date().toLocaleDateString("en-GB"),
      time: nowTime(),
      customer: form.get("customer"),
      customerId: customerCode,
      customerCode,
      customerCity: form.get("city"),
      customerPlace: form.get("place"),
      customerState: form.get("state"),
      customerCountry: form.get("country"),
      customerPanGst: form.get("panGst"),
      customerPinCode: form.get("pinCode"),
      customerMobile: form.get("mobile"),
      customerEmail: form.get("email"),
      customerAadhaar: form.get("aadhaar"),
      customerAgent: form.get("agent"),
      customerOpeningBalance: Number(form.get("openingBalance") || 0),
      customerBalanceType: form.get("balanceType"),
      customerOpeningWeight: Number(form.get("openingWeight") || 0),
      customerWeightType: form.get("weightType"),
      customerBirthDate: form.get("birthDate"),
      customerJoinDate: form.get("joinDate"),
      staffId: form.get("staffId"),
      staffName: form.get("staffName"),
      address: form.get("address"),
      phone: form.get("phone"),
      type: form.get("billSection"),
      itemCategory: form.get("category"),
      amount: total,
      paid,
      paymentMode,
      paymentBreakup,
      discount,
      taxAmount,
      balance: total - paid,
      rateSnapshot: `22K ${money(rateValue)}/g`,
      sections: { sales: [], exchange: [], return: [] },
      line: calculatedLine
    };
    bill.sections[sectionKey].push(bill.line);
    bill.adjustments = {
      salesReturn: sectionKey === "return" ? total : 0,
      exchange: sectionKey === "exchange" ? total : 0,
      salesOrder: 0,
      coupon: 0,
      card: 0,
      totalAdjustments: sectionKey === "sales" ? 0 : total
    };
    bill.totals = {
      salesTotal: sectionKey === "sales" ? total : 0,
      dmdAmount: 0,
      kfcGstAmount: 0,
      addition: 0,
      flatDiscount: discount,
      rateDifference: 0,
      invoiceTotal: sectionKey === "sales" ? total : 0,
      ledgerBalance: 0,
      billAmountRoundOff: 0,
      cashReceived: paid,
      balance: (sectionKey === "sales" ? total : 0) - paid
    };
    upsertCustomerFromBill(bill);
    state.bills.unshift(bill);
    const staff = state.staffs.find((item) => item.staffId === bill.staffId || item.name === bill.staffName);
    if (staff) {
      staff.handled += 1;
      staff.sales += total;
    }
    state.audit.unshift(audit(`Created invoice ${bill.id} with frozen rate ${bill.rateSnapshot}`));
    saveAndClose("Bill saved with frozen rate snapshot.");
  },
  stock(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    state.stock.unshift({
      item: form.get("item"),
      purity: form.get("purity"),
      huid: form.get("huid") || "Pending HUID",
      qty: Number(form.get("qty")),
      gross: Number(form.get("gross")),
      opening: Number(form.get("opening") || form.get("gross")),
      addition: Number(form.get("addition")),
      deduction: Number(form.get("deduction")),
      closing: Number(form.get("opening") || form.get("gross")) + Number(form.get("addition")) - Number(form.get("deduction")),
      location: form.get("location"),
      status: form.get("status")
    });
    state.audit.unshift(audit(`Added stock item ${form.get("item")}`));
    saveAndClose("Stock item saved.");
  },
  itemMaster(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const recordId = form.get("recordId");
    const openingGross = Number(form.get("openingGross") || 0);
    const openingStone = Number(form.get("openingStone") || 0);
    const closingGross = Number(form.get("closingGross") || openingGross);
    const closingStone = Number(form.get("closingStone") || openingStone);
    const item = normalizeItemMaster({
      itemId: form.get("itemId"),
      itemName: form.get("itemName"),
      regionalName: form.get("regionalName"),
      subGroup: form.get("subGroup") || form.get("subGroupCode"),
      product: form.get("product") || form.get("itemGroup"),
      brand: form.get("brand"),
      model: form.get("model"),
      description1: form.get("description1"),
      description2: form.get("description2"),
      hsnTax: form.get("hsnTax"),
      typeWastage: form.get("typeWastage"),
      wastage: Number(form.get("wastage") || 0),
      va: Number(form.get("va") || 0),
      mcGram: Number(form.get("mcGram") || 0),
      openingNos: Number(form.get("openingNos") || 0),
      openingGross,
      openingStone,
      openingNet: Math.max(0, openingGross - openingStone),
      openingDate: form.get("openingDate"),
      itemStockTouch: Number(form.get("itemStockTouch") || 0),
      closingNos: Number(form.get("closingNos") || 0),
      closingGross,
      closingStone,
      closingNet: Math.max(0, closingGross - closingStone),
      closingStockTouch: Number(form.get("closingStockTouch") || 0),
      ornament: form.get("ornament") === "on",
      barcodeCompulsory: form.get("barcodeCompulsory") === "on",
      reservedItem: form.get("reservedItem") === "on",
      hideInStockReports: form.get("hideInStockReports") === "on"
    });
    const existingIndex = state.itemMasters.findIndex((master) => master.itemId === recordId || master.itemId === item.itemId);
    if (existingIndex >= 0) {
      state.itemMasters[existingIndex] = item;
      state.audit.unshift(audit(`Updated item master ${item.itemId} - ${item.itemName}`));
    } else {
      state.itemMasters.unshift(item);
      state.audit.unshift(audit(`Created item master ${item.itemId} - ${item.itemName}`));
    }
    managementSelection.itemMaster = item.itemId;
    saveAndClose(existingIndex >= 0 ? "Item master updated." : "Item master saved.");
  },
  quickCustomer(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const customer = normalizeParty({
      id: form.get("customerCode") || nextCustomerId(),
      customerCode: form.get("customerCode") || nextCustomerId(),
      type: "Customer",
      name: form.get("name"),
      phone: form.get("phone"),
      mobile: form.get("phone"),
      address: form.get("address"),
      place: form.get("place"),
      city: form.get("city"),
      state: form.get("state") || "KERALA",
      country: "INDIA",
      panGst: form.get("panGst"),
      status: "Active"
    });
    const existingIndex = state.parties.findIndex((party) => party.type === "Customer" && (
      party.customerCode === customer.customerCode ||
      party.id === customer.id ||
      (customer.phone && (party.phone === customer.phone || party.mobile === customer.phone)) ||
      party.name === customer.name
    ));
    if (existingIndex >= 0) state.parties[existingIndex] = normalizeParty({ ...state.parties[existingIndex], ...customer });
    else state.parties.unshift(customer);
    applyCustomerToCurrentBill(customer, document.querySelector(".classic-billing-shell, .transaction-entry-header"));
    closeModal();
    saveState();
    render();
    toast(existingIndex >= 0 ? "Customer updated and loaded." : "Customer added and loaded.");
  },
  party(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const recordId = form.get("recordId");
    const party = normalizeParty({
      customerCode: form.get("customerCode"),
      name: form.get("name"),
      type: form.get("type"),
      openingBalance: form.get("openingBalance"),
      balanceType: form.get("balanceType"),
      openingWeight: form.get("openingWeight"),
      weightType: form.get("weightType"),
      opDate: form.get("opDate"),
      address: form.get("address"),
      city: form.get("city"),
      place: form.get("place"),
      state: form.get("state"),
      country: form.get("country"),
      panGst: form.get("panGst"),
      gstin: form.get("gstin"),
      fax: form.get("fax"),
      website: form.get("website"),
      pinCode: form.get("pinCode"),
      phone: form.get("phone"),
      mobile: form.get("mobile"),
      email: form.get("email"),
      aadhaar: form.get("aadhaar"),
      agent: form.get("agent"),
      status: form.get("status") || "Active",
      birthDate: form.get("birthDate"),
      joinDate: form.get("joinDate"),
      touch: form.get("touch"),
      convTouch: form.get("convTouch"),
      wastage: form.get("wastage")
    });
    const existingIndex = state.parties.findIndex((item) => item.id === recordId || item.customerCode === recordId || item.customerCode === party.customerCode);
    if (existingIndex >= 0) {
      state.parties[existingIndex] = normalizeParty({ ...state.parties[existingIndex], ...party, id: state.parties[existingIndex].id });
      state.audit.unshift(audit(`Updated ${form.get("type")} ${form.get("name")}`));
      managementSelection.parties[form.get("type")] = state.parties[existingIndex].id;
    } else {
      state.parties.unshift(party);
      state.audit.unshift(audit(`Added ${form.get("type")} ${form.get("name")}`));
      managementSelection.parties[form.get("type")] = party.id;
    }
    saveAndClose(existingIndex >= 0 ? "Master record updated." : "Party saved.");
  },
  staff(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const recordId = form.get("recordId");
    const staff = normalizeStaff({
      staffId: form.get("staffId"),
      employeeId: form.get("employeeId"),
      name: form.get("name"),
      designation: form.get("designation"),
      openingBalance: form.get("openingBalance"),
      balanceType: form.get("balanceType"),
      opDate: form.get("opDate"),
      address: form.get("address"),
      city: form.get("city"),
      place: form.get("place"),
      state: form.get("state"),
      country: form.get("country"),
      phone: form.get("mobile"),
      mobile: form.get("mobile"),
      pointCardNo: form.get("pointCardNo"),
      basicSalary: form.get("basicSalary"),
      ta: form.get("ta"),
      da: form.get("da"),
      hra: form.get("hra"),
      status: form.get("status"),
      birthDate: form.get("birthDate"),
      joinDate: form.get("joinDate"),
      handled: 0,
      sales: 0
    });
    const existingIndex = state.staffs.findIndex((item) => item.staffId === recordId || item.employeeId === recordId || item.staffId === staff.staffId);
    if (existingIndex >= 0) {
      state.staffs[existingIndex] = normalizeStaff({ ...state.staffs[existingIndex], ...staff, handled: state.staffs[existingIndex].handled, sales: state.staffs[existingIndex].sales });
      state.audit.unshift(audit(`Updated employee ${form.get("name")}`));
    } else {
      state.staffs.unshift(staff);
      state.audit.unshift(audit(`Added employee ${form.get("name")}`));
    }
    managementSelection.employee = staff.staffId;
    saveAndClose(existingIndex >= 0 ? "Employee updated." : "Employee saved.");
  },
  work(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const issue = Number(form.get("issue"));
    const receive = Number(form.get("receive"));
    state.workLogs.unshift({
      refNo: form.get("refNo"),
      date: form.get("date"),
      workflow: event.currentTarget.dataset.workflow,
      action: form.get("action"),
      party: form.get("party"),
      item: form.get("item"),
      qty: Number(form.get("qty")),
      gross: Number(form.get("gross")),
      issue,
      receive,
      balance: issue - receive,
      status: form.get("status")
    });
    state.audit.unshift(audit(`Added ${event.currentTarget.dataset.workflow} ${form.get("action")} entry`));
    saveAndClose("Stock workflow entry saved.");
  },
  scheme(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const member = form.get("member");
    const amount = Number(form.get("amount"));
    const record = state.schemes.find((scheme) => scheme.member === member);
    if (record) {
      record.due = Math.max(0, Number(record.due) - amount);
      record.balance = Number(record.balance) + amount;
      record.book = form.get("book") || record.book;
      record.memberId = form.get("memberId") || record.memberId;
      record.opWeight = Number(form.get("opWeight") || record.opWeight);
      record.collection = Number(record.collection || 0) + amount;
      state.audit.unshift(audit(`Collected ${money(amount)} from ${member}`));
    }
    saveAndClose("Scheme collection posted.");
  },
  account(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const debit = Number(form.get("debit"));
    const credit = Number(form.get("credit"));
    state.accounts.unshift({
      date: form.get("date"),
      vouNo: form.get("vouNo"),
      ledger: form.get("ledger"),
      particular: form.get("narration"),
      debit,
      credit,
      balance: debit - credit,
      crdr: debit >= credit ? "Dr" : "Cr"
    });
    state.audit.unshift(audit(`Added account entry for ${form.get("ledger")}`));
    saveAndClose("Account entry saved.");
  },
  accountMaster(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const recordId = form.get("recordId");
    const account = normalizeAccountMaster({
      accountId: form.get("accountId"),
      accountName: form.get("accountName"),
      aliasName: form.get("aliasName"),
      subSchedule: form.get("subSchedule"),
      openingBalance: form.get("openingBalance"),
      balanceType: form.get("balanceType"),
      opDate: form.get("opDate"),
      status: form.get("status"),
      costCenter: form.get("costCenter"),
      mobile: form.get("mobile"),
      adminOnly: form.get("adminOnly") === "Yes"
    });
    const existingIndex = state.accountMasters.findIndex((item) => item.accountId === recordId || item.accountId === account.accountId);
    if (existingIndex >= 0) {
      state.accountMasters[existingIndex] = account;
      state.audit.unshift(audit(`Updated account master ${form.get("accountName")}`));
    } else {
      state.accountMasters.unshift(account);
      state.audit.unshift(audit(`Created account master ${form.get("accountName")}`));
    }
    managementSelection.accountMaster = account.accountId;
    saveAndClose(existingIndex >= 0 ? "Account master updated." : "Account master saved.");
  },
  itemCategory(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const key = form.get("key");
    const recordId = form.get("recordId");
    const record = normalizeCategoryForm(key, form);
    const list = state.itemCategories[key] || [];
    const existingIndex = list.findIndex((item) => item.id === recordId || item.id === record.id);
    if (existingIndex >= 0) {
      list[existingIndex] = record;
      state.audit.unshift(audit(`Updated ${categoryTitle(key)} ${record.id}`));
    } else {
      list.unshift(record);
      state.audit.unshift(audit(`Created ${categoryTitle(key)} ${record.id}`));
    }
    state.itemCategories[key] = list;
    managementSelection.categories[key] = record.id;
    saveAndClose(existingIndex >= 0 ? "Category record updated." : "Category record saved.");
  },
  miscellaneous(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const key = form.get("key");
    const recordId = form.get("recordId");
    const record = normalizeMiscForm(key, form);
    const list = state.miscellaneous[key] || [];
    const existingIndex = list.findIndex((item) => miscRecordId(item) === recordId || miscRecordId(item) === miscRecordId(record));
    if (existingIndex >= 0) {
      list[existingIndex] = record;
      state.audit.unshift(audit(`Updated ${miscellaneousTitle(key)} ${miscRecordId(record)}`));
    } else {
      list.unshift(record);
      state.audit.unshift(audit(`Created ${miscellaneousTitle(key)} ${miscRecordId(record)}`));
    }
    state.miscellaneous[key] = list;
    managementSelection.miscellaneous[key] = miscRecordId(record);
    saveAndClose(existingIndex >= 0 ? "Miscellaneous record updated." : "Miscellaneous record saved.");
  }
};

function normalizeMiscForm(key, form) {
  if (key === "agents" || key === "nonTradeSuppliers") {
    return normalizeMiscParty({
      id: form.get("id"),
      name: form.get("name"),
      subSchedule: form.get("subSchedule"),
      openingBalance: form.get("openingBalance"),
      balanceType: form.get("balanceType"),
      opDate: form.get("opDate"),
      openingWeight: form.get("openingWeight"),
      weightType: form.get("weightType"),
      address: form.get("address"),
      city: form.get("city"),
      place: form.get("place"),
      state: form.get("state"),
      country: form.get("country"),
      gstin: form.get("gstin"),
      fax: form.get("fax"),
      phone: form.get("phone"),
      mobile: form.get("mobile"),
      email: form.get("email"),
      website: form.get("website"),
      status: form.get("status"),
      birthDate: form.get("birthDate"),
      joinDate: form.get("joinDate")
    }, key === "agents" ? "A" : "N");
  }
  if (key === "areas" || key === "counters") return normalizeSimpleMisc({ id: form.get("id"), name: form.get("name"), description: form.get("description") });
  if (key === "costCenters") return { id: form.get("id"), name: form.get("name"), controlAccount: form.get("controlAccount"), isDefault: form.get("isDefault") === "Yes" };
  if (key === "discountCoupons") return { id: form.get("couponNo"), couponNo: form.get("couponNo"), value: Number(form.get("value") || 0), active: form.get("active") !== "No" };
  if (key === "stockLocations") return { id: form.get("id"), name: form.get("name"), isDefault: form.get("isDefault") === "Yes" };
  if (key === "cards") return { id: form.get("id"), code: form.get("code"), name: form.get("name"), bank: form.get("bank"), bankChargeId: form.get("bankChargeId"), commissionPct: Number(form.get("commissionPct") || 0) };
  if (key === "taxSchedules") return { id: form.get("id"), value: Number(form.get("value") || 0), description: form.get("description"), purchaseTax: Number(form.get("purchaseTax") || 0), salesTax: Number(form.get("salesTax") || 0), cess: Number(form.get("cess") || 0), inputVat: form.get("inputVat") };
  return normalizeSimpleMisc({ id: form.get("id"), name: form.get("name"), description: form.get("description") });
}

function normalizeCategoryForm(key, form) {
  if (key === "units") {
    return { id: form.get("id"), name: form.get("name") };
  }
  if (key === "subGroups") {
    return { id: form.get("id"), name: form.get("name"), remarks: form.get("remarks") };
  }
  if (key === "prefixes") {
    const number = Number(form.get("number") || 0);
    return { id: String(number), number, description: form.get("description"), prefix: form.get("prefix") };
  }
  return {
    id: form.get("id"),
    name: form.get("name"),
    status: form.get("status"),
    description: form.get("description")
  };
}

function saveAndClose(message) {
  saveState();
  closeModal();
  render();
  toast(message);
}

function closeModal() {
  document.querySelector(".modal-backdrop")?.remove();
}

function toast(message) {
  document.querySelector(".toast")?.remove();
  document.body.insertAdjacentHTML("beforeend", `<div class="toast">${message}</div>`);
  setTimeout(() => document.querySelector(".toast")?.remove(), 2800);
}

function icon(name) {
  const icons = {
    Dashboard: "M3 13h8V3H3v10Zm10 8h8V3h-8v18ZM3 21h8v-6H3v6Z",
    Billing: "M5 3h14v18l-2-1-2 1-2-1-2 1-2-1-2 1V3Zm4 5h6M9 12h6M9 16h4",
    Transactions: "M4 5h11M4 12h16M4 19h11M16 3l3 2-3 2M16 17l3 2-3 2",
    Stock: "M4 7 12 3l8 4-8 4-8-4Zm0 5 8 4 8-4M4 17l8 4 8-4",
    "Work Orders": "M4 6h10M4 12h16M4 18h10M17 4l3 2-3 2M17 16l3 2-3 2",
    Management: "M4 6h16M4 12h16M4 18h16M7 6v12M17 6v12",
    Customers: "M16 11a4 4 0 1 0-8 0M4 21a8 8 0 0 1 16 0",
    Staffs: "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 21a5 5 0 0 1 10 0M11 21a5 5 0 0 1 10 0",
    Schemes: "M12 3v18M5 8h14M7 16h10",
    Accounts: "M4 4h16v16H4V4Zm4 4h8M8 12h8M8 16h5",
    Reports: "M5 3h10l4 4v14H5V3Zm9 0v5h5",
    "Complimentary Item": "M4 7h16v10H4V7Zm2 3h5v2H6v-2Zm7 0h5v2h-5v-2ZM6 14h12"
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[name]}" /></svg>`;
}

render();
