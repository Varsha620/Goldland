const ACCESS_PASSWORD = "goldland2026";

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
      address: "Uppamoochikkal, Valikad",
      phone: "8281900323",
      type: "Sale",
      itemCategory: "B2C",
      amount: 128540,
      paid: 100000,
      discount: 0,
      taxAmount: 3744,
      balance: 28540,
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
      address: "Ooty Road",
      phone: "",
      type: "Old gold purchase",
      itemCategory: "B2C",
      amount: 55790,
      paid: 55790,
      discount: 0,
      taxAmount: 0,
      balance: 0,
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
  stock: [
    { item: "Baby Ring", purity: "22K", huid: "HUID-7K81", qty: 73, gross: 14.204, opening: 14.204, addition: 0, deduction: 0, closing: 14.204, status: "Ready" },
    { item: "Bangle", purity: "22K", huid: "HUID-1M22", qty: 464, gross: 3129.262, opening: 3129.262, addition: 0, deduction: 0, closing: 3129.262, status: "Ready" },
    { item: "Diamond Ring", purity: "18K", huid: "DIA-4431", qty: 84, gross: 92.77, opening: 92.77, addition: 0, deduction: 0, closing: 92.77, status: "Low review" },
    { item: "Chain", purity: "22K", huid: "HUID-9Q21", qty: 236, gross: 2327.178, opening: 2327.178, addition: 0, deduction: 0, closing: 2327.178, status: "Ready" }
  ],
  parties: [
    { name: "Rahul U M", type: "Customer", phone: "8281900323", status: "2 active bills" },
    { name: "Vinod Sat", type: "Supplier", phone: "", status: "Ledger balance pending" },
    { name: "Anaida", type: "Scheme member", phone: "", status: "Due follow-up" },
    { name: "Ravi Smith", type: "Smith", phone: "9447000101", status: "18.720 g pending" },
    { name: "Babu Jeweller", type: "Jeweller", phone: "9447000102", status: "42.500 g issued" },
    { name: "Metro Refiner", type: "Refiner", phone: "9447000103", status: "Melting issue pending" }
  ],
  staffs: [
    { staffId: "STF001", name: "Akhil", phone: "9447000001", status: "Active", handled: 18, sales: 642500 },
    { staffId: "STF002", name: "Sajitha", phone: "9447000002", status: "Active", handled: 12, sales: 388200 },
    { staffId: "STF003", name: "Nishad", phone: "9447000003", status: "Active", handled: 7, sales: 0 }
  ],
  workLogs: [
    { refNo: "JW-001", date: "01/09/2025", workflow: "Jeweller", action: "Transfer", party: "Babu Jeweller", item: "Bangle", qty: 4, gross: 42.5, issue: 42.5, receive: 0, balance: 42.5, status: "Issued" },
    { refNo: "SM-002", date: "01/09/2025", workflow: "Smith", action: "Issue", party: "Ravi Smith", item: "Chain", qty: 2, gross: 18.72, issue: 18.72, receive: 0, balance: 18.72, status: "Issued" },
    { refNo: "RF-003", date: "01/09/2025", workflow: "Refiner", action: "Melting Issue", party: "Refiner", item: "Old Gold", qty: 1, gross: 37.1, issue: 37.1, receive: 0, balance: 37.1, status: "Pending" }
  ],
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
  audit: [
    audit("Updated 22K gold rate to Rs.9075/g", "13:20"),
    audit("Approved old gold purchase GL-P-2026-0041", "12:20"),
    audit("Created invoice GL-S-2026-0019", "10:43")
  ]
};

let state = loadState();
let active = "Dashboard";
let authenticated = sessionStorage.getItem("goldland-authenticated") === "true";

function rate(type, grade, price, time, reason) {
  return { id: crypto.randomUUID(), type, grade, price, time, reason, user: "Goldland", date: "2026-05-16" };
}

function audit(action, time = nowTime()) {
  return { id: crypto.randomUUID(), user: "Goldland", action, time, date: "2026-05-16" };
}

function loadState() {
  const stored = localStorage.getItem("goldland-state");
  const parsed = stored ? JSON.parse(stored) : structuredClone(seed);
  return {
    ...structuredClone(seed),
    ...parsed,
    bills: (parsed.bills || seed.bills).map(normalizeBill),
    stock: (parsed.stock || seed.stock).map(normalizeStock),
    parties: (parsed.parties || seed.parties).map(normalizeParty),
    staffs: (parsed.staffs || seed.staffs).map(normalizeStaff),
    workLogs: (parsed.workLogs || seed.workLogs).map(normalizeWorkLog),
    schemes: (parsed.schemes || seed.schemes).map(normalizeScheme),
    accounts: (parsed.accounts || seed.accounts).map(normalizeAccount)
  };
}

function normalizeParty(item) {
  return {
    name: item.name || "",
    type: item.type || "Customer",
    phone: item.phone || "",
    place: item.place || "",
    address: item.address || "",
    status: item.status || "Active"
  };
}

function normalizeBill(bill) {
  const line = bill.line || {};
  const amount = Number(bill.amount || line.amount || 0);
  const paid = Number(bill.paid || 0);
  return {
    entryNo: bill.entryNo || bill.id,
    date: bill.date || "16-05-2026",
    customerId: bill.customerId || "",
    staffId: bill.staffId || "",
    staffName: bill.staffName || "",
    address: bill.address || "",
    phone: bill.phone || "",
    itemCategory: bill.itemCategory || "B2C",
    discount: Number(bill.discount || 0),
    taxAmount: Number(bill.taxAmount || line.tax || 0),
    balance: Number(bill.balance ?? amount - paid),
    ...bill,
    line: {
      barcode: line.barcode || "",
      itemName: line.itemName || line.item || "Ornament",
      description: line.description || bill.type || "",
      qty: Number(line.qty || 1),
      gross: Number(line.gross || 0),
      stone: Number(line.stone || 0),
      wastage: Number(line.wastage || 0),
      net: Number(line.net || line.gross || 0),
      stoneCharge: Number(line.stoneCharge || 0),
      rate: Number(line.rate || Number(String(bill.rateSnapshot || "").replace(/[^0-9.]/g, "")) || 0),
      va: Number(line.va || 0),
      mcPerGm: Number(line.mcPerGm || 0),
      totalMc: Number(line.totalMc || 0),
      taxPct: Number(line.taxPct || 3),
      tax: Number(line.tax || bill.taxAmount || 0),
      amount
    }
  };
}

function normalizeStaff(item) {
  return {
    staffId: item.staffId || `STF${String(Math.floor(Math.random() * 999)).padStart(3, "0")}`,
    name: item.name || "",
    phone: item.phone || "",
    status: item.status || "Active",
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

function saveState() {
  localStorage.setItem("goldland-state", JSON.stringify(state));
}

function money(value) {
  return `Rs.${Number(value).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

function grams(value) {
  return `${Number(value).toLocaleString("en-IN", { maximumFractionDigits: 3 })} g`;
}

function nowTime() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function latestRates() {
  const map = new Map();
  for (const item of state.rates) map.set(`${item.type}-${item.grade}`, item);
  return [...map.values()];
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
  const nav = ["Dashboard", "Billing", "Stock", "Customers", "Staffs", "Schemes", "Accounts", "Reports"];
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
        ${nav.map((item) => `<button class="nav ${active === item ? "active" : ""}" data-nav="${item}">${icon(item)}<span>${item}</span></button>`).join("")}
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

  return `
    <header class="topbar">
      <div>
        <p class="eyebrow">Local-first shop system</p>
        <h1>${active}</h1>
      </div>
      <label class="command">
        <span>Search</span>
        <input id="search" placeholder="customer, bill, HUID, ledger..." />
        <kbd>Ctrl K</kbd>
      </label>
      <div class="rate-strip">${rateText}</div>
    </header>
  `;
}

function route() {
  if (active === "Dashboard") return dashboard();
  if (active === "Billing") return billing();
  if (active === "Stock") return stock();
  if (active === "Customers") return customers();
  if (active === "Staffs") return staffs();
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

function billing() {
  const latestBill = state.bills[0];
  return `
    <section class="panel hero-panel">
      <div>
        <p class="eyebrow">Guided billing</p>
        <h2>New jewellery invoice</h2>
        <p>Create sale, return, old gold exchange, advance, or diamond billing with the current approved rate frozen into the invoice.</p>
      </div>
      <div class="button-row">
        <button class="primary" data-action="open-bill">Add New Bill</button>
        <button class="secondary" data-action="print-last-bill">Print Customer Copy</button>
      </div>
    </section>
    <section class="panel">
      <div class="panel-head">
        <h2>Sales Entry Columns</h2>
        <span class="soft-note">Matches the working fields from the current billing screenshots.</span>
      </div>
      ${table(["Entry No", "Date", "Staff ID", "Staff", "Customer ID", "Customer", "Address", "Phone", "Category", "Barcode", "Item", "Description", "Qty", "Gross", "Stone", "Wastage", "Net", "Stn Charge", "Rate", "VA%", "MC/Gm", "Total MC", "Tax%", "Tax", "Amount", "Balance"], state.bills.map(billRow))}
    </section>
    <section class="split">
      <div class="panel invoice-preview-panel">
        <div class="panel-head">
          <h2>Customer Bill Preview</h2>
          <button class="secondary" data-action="print-last-bill">Print</button>
        </div>
        ${invoicePreview(latestBill)}
      </div>
      <div class="panel">
        <div class="panel-head"><h2>Purchase Entry Columns</h2></div>
        ${table(["Entry No", "Date", "Mode", "Type", "Party", "Name", "Phone", "Item", "Qty", "Gross", "Stone", "Mud Less", "Less%", "Less Weight", "Touch%", "Touch Less", "Net Weight", "Rate", "Tax%", "Amount"], state.bills.filter((b) => b.type.toLowerCase().includes("purchase")).map(purchaseRow))}
      </div>
    </section>
  `;
}

function stock() {
  return `
    <section class="panel">
      <div class="panel-head">
        <h2>Manual Stock Register</h2>
        <button class="secondary" data-action="open-stock">Add New Item</button>
      </div>
      ${table(["Item Name", "Purity", "HUID/BIS", "Qty", "Opening", "Addition", "Deduction", "Closing", "Gross", "Status"], state.stock.map((s) => [s.item, s.purity, s.huid, s.qty, grams(s.opening), grams(s.addition), grams(s.deduction), grams(s.closing), grams(s.gross), s.status]))}
    </section>
    <section class="grid workflow-grid">
      ${workflow("Smith", "Issue, receive, ledger and reconciliation", "open-work-smith")}
      ${workflow("Jeweller", "Transfer, detailed ledger and stock balance", "open-work-jeweller")}
      ${workflow("Refiner", "Melting issue, return and wastage tracking", "open-work-refiner")}
      ${workflow("Polishing", "Issue, receive and polishing balance", "open-work-polishing")}
      ${workflow("Sample", "Sample issue and sample return", "open-work-sample")}
      ${workflow("Service / Job", "New service, close service and payment", "open-work-service")}
      ${workflow("Transfers", "Smith, jeweller, item and branch transfer", "open-work-transfer")}
      ${workflow("Stock Adjustment", "Addition, deduction and reconciliation", "open-work-adjustment")}
    </section>
    <section class="panel">
      <div class="panel-head"><h2>Stock Workflow Register</h2></div>
      ${table(["Ref No", "Date", "Workflow", "Action", "Party", "Item", "Qty", "Gross", "Issue", "Receive", "Balance", "Status"], state.workLogs.map((w) => [w.refNo, w.date, w.workflow, w.action, w.party, w.item, w.qty, grams(w.gross), grams(w.issue), grams(w.receive), grams(w.balance), w.status]))}
    </section>
  `;
}

function customers() {
  const groups = [
    ["Customers", "Customer"],
    ["Suppliers", "Supplier"],
    ["Scheme Members", "Scheme member"],
    ["Smiths", "Smith"],
    ["Jewellers", "Jeweller"],
    ["Refiners", "Refiner"]
  ];
  return `
    <section class="panel">
      <div class="panel-head">
        <h2>Party Directory</h2>
        <button class="secondary" data-action="open-party">Add New Party</button>
      </div>
      <p class="soft-note">Each party type is kept separately so staff can find the right list quickly.</p>
    </section>
    <section class="party-grid">
      ${groups.map(([title, type]) => partySection(title, type)).join("")}
    </section>
  `;
}

function partySection(title, type) {
  const rows = state.parties
    .filter((party) => party.type === type)
    .map((party) => [party.name, party.phone || "-", party.place || "-", party.address || "-", party.status]);
  return `
    <section class="panel">
      <div class="panel-head"><h2>${title}</h2></div>
      ${rows.length ? table(["Name", "Phone", "Place", "Address", "Status"], rows) : `<p class="soft-note">No ${title.toLowerCase()} added yet.</p>`}
    </section>
  `;
}

function staffs() {
  return `
    <section class="panel">
      <div class="panel-head">
        <h2>Staff Maintenance</h2>
        <button class="secondary" data-action="open-staff">Add New Staff</button>
      </div>
      ${table(["Staff ID", "Name", "Phone", "Status", "Bills Handled", "Sales"], state.staffs.map((s) => [s.staffId, s.name, s.phone || "-", s.status, s.handled, money(s.sales)]))}
    </section>
  `;
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
  return `
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
  `;
}

function reports() {
  return `
    <section class="grid report-grid">
      ${reportCard("Day Summary", "Sales, purchases, collections, payments and cash balance")}
      ${reportCard("Stock Ledger", "Opening, additions, deductions, closing and reconciliation")}
      ${reportCard("GST Invoice Export", "Accountant-ready Excel/PDF output")}
      ${reportCard("Rate History", "All intraday approved rate updates", "open-rate")}
      ${reportCard("Scheme Member Ledger", "Member collections, refunds and balances")}
      ${reportCard("Audit Trail", "Every sensitive action by time")}
    </section>
    <section class="panel"><div class="panel-head"><h2>Audit Trail</h2></div>${table(["Time", "User", "Action"], state.audit.map((a) => [a.time, a.user, a.action]))}</section>
  `;
}

function billRow(bill) {
  const line = bill.line;
  return [
    bill.entryNo,
    bill.date,
    bill.staffId || "-",
    bill.staffName || "-",
    bill.customerId,
    bill.customer,
    bill.address,
    bill.phone || "-",
    bill.itemCategory,
    line.barcode,
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
    money(line.mcPerGm),
    money(line.totalMc),
    line.taxPct,
    money(line.tax),
    money(line.amount),
    money(bill.balance)
  ];
}

function purchaseRow(bill) {
  const line = bill.line;
  return [
    bill.entryNo,
    bill.date,
    "Cash",
    bill.itemCategory,
    bill.customerId || "-",
    bill.customer,
    bill.phone || "-",
    line.itemName,
    line.qty,
    grams(line.gross),
    grams(line.stone),
    "0.000",
    "0.00",
    grams(Math.max(0, line.gross - line.net)),
    "0.00",
    "0.000",
    grams(line.net),
    money(line.rate),
    line.taxPct,
    money(line.amount)
  ];
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
      </section>
      ${table(["Item", "Qty", "Gross", "Stone", "Wastage", "Net", "Rate", "VA%", "MC/Gm", "Tax", "Amount"], [[line.itemName, line.qty, grams(line.gross), grams(line.stone), grams(line.wastage), grams(line.net), money(line.rate), line.va, money(line.mcPerGm), money(line.tax), money(line.amount)]])}
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

function rateTimeline() {
  return `<div class="timeline">${state.rates.slice().reverse().map((r) => `<article><time>${r.time}</time><div><strong>${r.type} ${r.grade} ${money(r.price)}</strong><span>${r.reason} by ${r.user}</span></div></article>`).join("")}</div>`;
}

function openModal(title, description, body, submitText, handlerName) {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop">
      <form class="modal" data-form="${handlerName}">
        <h2>${title}</h2>
        <p>${description}</p>
        <div class="form-grid">${body}</div>
        <footer>
          <button type="button" class="secondary" data-action="close-modal">Cancel</button>
          <button class="primary">${submitText}</button>
        </footer>
      </form>
    </div>
  `);
  document.querySelector(`[data-form="${handlerName}"]`).addEventListener("submit", formHandlers[handlerName]);
  document.querySelector("[data-action='close-modal']").addEventListener("click", closeModal);
}

function input(name, label, value = "", type = "text", extra = "") {
  return `<label><span>${label}</span><input name="${name}" type="${type}" value="${value}" ${extra} /></label>`;
}

function select(name, label, options) {
  return `<label><span>${label}</span><select name="${name}">${options.map((option) => `<option>${option}</option>`).join("")}</select></label>`;
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

  document.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      active = button.dataset.nav;
      render();
    });
  });

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleAction(button.dataset.action));
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      document.getElementById("search")?.focus();
    }
  }, { once: true });
}

function handleAction(action) {
  if (action === "logout") {
    authenticated = false;
    sessionStorage.removeItem("goldland-authenticated");
    render();
  }
  if (action === "open-rate") openRateModal();
  if (action === "open-bill") openBillModal();
  if (action === "open-stock") openStockModal();
  if (action === "open-party") openPartyModal();
  if (action === "open-staff") openStaffModal();
  if (action === "open-scheme") openSchemeModal();
  if (action === "open-account") openAccountModal();
  if (action.startsWith("open-work-")) openWorkModal(action.replace("open-work-", ""));
  if (action === "print-last-bill") openPrintModal();
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

function workConfig(key) {
  const configs = {
    smith: { workflow: "Smith", actions: ["Issue", "Return", "Cash for Weight Smith", "Ledger", "Reconciliation"] },
    jeweller: { workflow: "Jeweller", actions: ["Jeweller Transfer", "Cash for Weight Jeweller", "Ledger", "Ledger Detailed", "Reconciliation"] },
    refiner: { workflow: "Refiner", actions: ["Issue", "Return", "Final Return", "Melting Issue", "Melting Return"] },
    polishing: { workflow: "Polishing", actions: ["Issue", "Return"] },
    sample: { workflow: "Sample", actions: ["Issue", "Return"] },
    service: { workflow: "Service / Job", actions: ["New Service / Job", "Close Service / Job"] },
    transfer: { workflow: "Transfers", actions: ["Smith Transfer", "Jeweller Transfer", "Item Transfer", "Branch Transfer"] },
    adjustment: { workflow: "Stock Adjustment", actions: ["Addition", "Deduction", "Reconciliation"] }
  };
  return configs[key] || configs.adjustment;
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

function openRateModal() {
  openModal(
    "Update Shop Rate",
    "Rates can change many times in one day. New bills use the latest approved rate; old bills keep their frozen copy.",
    `${select("type", "Type", ["Gold", "Silver", "Diamond", "Stone"])}
     ${input("grade", "Purity / category", "22K", "text", "required")}
     ${input("price", "New rate in Rs.", "9100", "number", "min='0' step='0.01' required")}
     ${input("reason", "Reason", "Intraday owner update")}`,
    "Approve Rate",
    "rate"
  );
}

function openBillModal() {
  const active22k = latestRates().find((r) => r.type === "Gold" && r.grade === "22K")?.price || 0;
  openModal(
    "Add New Bill",
    "Enter the bill details. The current approved rate will be saved as a frozen snapshot on this bill.",
    `${input("customer", "Customer name", "Walk-in customer", "text", "required")}
     ${input("customerId", "Customer ID", "")}
     ${select("staffId", "Staff ID", state.staffs.map((staff) => staff.staffId))}
     ${select("staffName", "Staff name", state.staffs.map((staff) => staff.name))}
     ${input("phone", "Phone", "")}
     ${input("address", "Address", "")}
     ${select("type", "Bill type", ["Sale", "Sale Return", "Old gold purchase", "Diamond sale", "Advance"])}
     ${select("category", "Item category", ["B2C", "B2B", "DMD", "Old Gold"])}
     ${input("barcode", "Barcode", "GL22-NEW")}
     ${input("item", "Item name", "22K Chain", "text", "required")}
     ${input("description", "Description", "22K gold chain")}
     ${input("qty", "Qty", "1", "number", "min='0' step='0.001' required")}
     ${input("gross", "Gross weight", "8.240", "number", "min='0' step='0.001' required")}
     ${input("stone", "Stone weight", "0", "number", "min='0' step='0.001'")}
     ${input("wastage", "Wastage", "0", "number", "min='0' step='0.001'")}
     ${input("stoneCharge", "Stone charge", "0", "number", "min='0' step='0.01'")}
     ${input("making", "Making / extra charges", "6200", "number", "min='0' step='0.01' required")}
     ${input("mcPerGm", "MC/Gm", "850", "number", "min='0' step='0.01'")}
     ${input("va", "VA%", "4.5", "number", "min='0' step='0.01'")}
     ${input("taxPct", "Tax%", "3", "number", "min='0' step='0.01'")}
     ${input("discount", "Discount", "0", "number", "min='0' step='0.01'")}
     ${input("paid", "Amount paid", "0", "number", "min='0' step='0.01'")}
     ${input("rate", "Approved 22K rate", active22k, "number", "min='0' step='0.01' required")}
     ${select("payment", "Payment mode", ["Cash", "UPI", "Card", "Bank", "Mixed"])}`,
    "Save Bill",
    "bill"
  );
}

function openStockModal() {
  openModal(
    "Add New Item",
    "Add manual stock with the fields needed for jewellery accounting and future barcode/HUID tracking.",
    `${input("item", "Item name", "New Ornament", "text", "required")}
     ${select("purity", "Purity", ["22K", "24K", "18K", "Silver", "Diamond"])}
     ${input("huid", "HUID / BIS / barcode", "Pending HUID")}
     ${input("qty", "Qty", "1", "number", "min='0' step='0.001' required")}
     ${input("gross", "Gross weight", "8.200", "number", "min='0' step='0.001' required")}
     ${input("opening", "Opening weight", "8.200", "number", "min='0' step='0.001'")}
     ${input("addition", "Addition", "0", "number", "min='0' step='0.001'")}
     ${input("deduction", "Deduction", "0", "number", "min='0' step='0.001'")}
     ${select("status", "Status", ["Ready", "Draft", "Low review", "Job work"])}`,
    "Save Item",
    "stock"
  );
}

function openPartyModal() {
  openModal(
    "Add New Party",
    "Create a customer, supplier, scheme member, smith, jeweller, or refiner profile.",
    `${input("name", "Name", "", "text", "required")}
     ${select("type", "Type", ["Customer", "Supplier", "Scheme member", "Smith", "Jeweller", "Refiner"])}
     ${input("phone", "Phone", "")}
     ${input("place", "Place", "")}
     ${input("address", "Address", "")}
     ${input("status", "Notes / status", "New party")}`,
    "Save Party",
    "party"
  );
}

function openStaffModal() {
  openModal(
    "Add New Staff",
    "Maintain staff details used in billing and customer handling.",
    `${input("staffId", "Staff ID", `STF${String(state.staffs.length + 1).padStart(3, "0")}`, "text", "required")}
     ${input("name", "Staff name", "", "text", "required")}
     ${input("phone", "Phone", "")}
     ${select("status", "Status", ["Active", "Inactive"])}`,
    "Save Staff",
    "staff"
  );
}

function openWorkModal(key) {
  const config = workConfig(key);
  openModal(
    `${config.workflow} Entry`,
    "Collect the issue, return, transfer or reconciliation details used in the stock workflow reports.",
    `${input("refNo", "Ref No", `${config.workflow.slice(0, 2).toUpperCase()}-${String(state.workLogs.length + 1).padStart(3, "0")}`, "text", "required")}
     ${input("date", "Date", new Date().toLocaleDateString("en-GB"), "text", "required")}
     ${select("action", "Action", config.actions)}
     ${input("party", "Smith / Jeweller / Refiner / Party", config.workflow)}
     ${input("item", "Item name", "Bangle", "text", "required")}
     ${input("qty", "Qty", "1", "number", "min='0' step='0.001' required")}
     ${input("gross", "Gross weight", "0", "number", "min='0' step='0.001' required")}
     ${input("issue", "Issue weight", "0", "number", "min='0' step='0.001'")}
     ${input("receive", "Receive weight", "0", "number", "min='0' step='0.001'")}
     ${select("status", "Status", ["Issued", "Pending", "Received", "Closed", "Reconciled"])}`,
    "Save Workflow Entry",
    "work"
  );
  document.querySelector('[data-form="work"]').dataset.workflow = config.workflow;
}

function openSchemeModal() {
  openModal(
    "Add New Collection",
    "Post a scheme/chitty collection and update the member balance.",
    `${select("member", "Member", state.schemes.map((scheme) => scheme.member))}
     ${input("memberId", "Member ID", state.schemes[0]?.memberId || "")}
     ${input("amount", "Collection amount", "500", "number", "min='0' step='0.01' required")}
     ${input("book", "Book no.", state.schemes[0]?.book || "")}
     ${input("opWeight", "Opening weight", state.schemes[0]?.opWeight || "0", "number", "min='0' step='0.001'")}
     ${select("mode", "Payment mode", ["Cash", "UPI", "Bank", "Card"])}`,
    "Post Collection",
    "scheme"
  );
}

function openAccountModal() {
  openModal(
    "Add New Account Entry",
    "Record a receipt, payment, bank entry, expense, or journal-style adjustment.",
    `${input("date", "Date", new Date().toLocaleDateString("en-GB"), "text", "required")}
     ${input("vouNo", "Voucher no.", "VOU-NEW")}
     ${input("ledger", "Ledger", "Cash in Hand", "text", "required")}
     ${select("entryType", "Entry type", ["Receipt", "Payment", "Bank deposit", "Bank withdrawal", "Expense", "Journal"])}
     ${input("debit", "Debit", "0", "number", "min='0' step='0.01'")}
     ${input("credit", "Credit", "0", "number", "min='0' step='0.01'")}
     ${input("narration", "Narration", "Manual account entry")}`,
    "Save Entry",
    "account"
  );
}

const formHandlers = {
  rate(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next = {
      id: crypto.randomUUID(),
      type: form.get("type"),
      grade: form.get("grade"),
      price: Number(form.get("price")),
      reason: form.get("reason") || "Manual update",
      user: "Goldland",
      time: nowTime(),
      date: "2026-05-16"
    };
    const old = latestRates().find((r) => r.type === next.type && r.grade === next.grade);
    state.rates.push(next);
    state.audit.unshift(audit(`Changed ${next.type} ${next.grade} from ${old ? money(old.price) : "new"} to ${money(next.price)}`));
    saveAndClose("Rate approved and added to today's timeline.");
  },
  bill(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const rateValue = Number(form.get("rate"));
    const gross = Number(form.get("gross"));
    const stone = Number(form.get("stone"));
    const wastage = Number(form.get("wastage"));
    const net = gross - stone + wastage;
    const making = Number(form.get("making"));
    const stoneCharge = Number(form.get("stoneCharge"));
    const discount = Number(form.get("discount"));
    const taxable = rateValue * net + making + stoneCharge - discount;
    const taxAmount = Math.round(taxable * (Number(form.get("taxPct")) / 100));
    const total = Math.round(taxable + taxAmount);
    const paid = Number(form.get("paid"));
    const bill = {
      id: `GL-S-2026-${String(state.bills.length + 20).padStart(4, "0")}`,
      entryNo: `C${String(state.bills.length + 2034).padStart(5, "0")}`,
      date: new Date().toLocaleDateString("en-GB"),
      time: nowTime(),
      customer: form.get("customer"),
      customerId: form.get("customerId"),
      staffId: form.get("staffId"),
      staffName: form.get("staffName"),
      address: form.get("address"),
      phone: form.get("phone"),
      type: form.get("type"),
      itemCategory: form.get("category"),
      amount: total,
      paid,
      discount,
      taxAmount,
      balance: total - paid,
      rateSnapshot: `22K ${money(rateValue)}/g`,
      line: {
        barcode: form.get("barcode"),
        itemName: form.get("item"),
        description: form.get("description"),
        qty: Number(form.get("qty")),
        gross,
        stone,
        wastage,
        net,
        stoneCharge,
        rate: rateValue,
        va: Number(form.get("va")),
        mcPerGm: Number(form.get("mcPerGm")),
        totalMc: making,
        taxPct: Number(form.get("taxPct")),
        tax: taxAmount,
        amount: total
      }
    };
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
      status: form.get("status")
    });
    state.audit.unshift(audit(`Added stock item ${form.get("item")}`));
    saveAndClose("Stock item saved.");
  },
  party(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    state.parties.unshift({
      name: form.get("name"),
      type: form.get("type"),
      phone: form.get("phone"),
      place: form.get("place"),
      address: form.get("address"),
      status: form.get("status") || "New party"
    });
    state.audit.unshift(audit(`Added party ${form.get("name")}`));
    saveAndClose("Party saved.");
  },
  staff(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    state.staffs.unshift({
      staffId: form.get("staffId"),
      name: form.get("name"),
      phone: form.get("phone"),
      status: form.get("status"),
      handled: 0,
      sales: 0
    });
    state.audit.unshift(audit(`Added staff ${form.get("name")}`));
    saveAndClose("Staff saved.");
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
  }
};

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
    Stock: "M4 7 12 3l8 4-8 4-8-4Zm0 5 8 4 8-4M4 17l8 4 8-4",
    Customers: "M16 11a4 4 0 1 0-8 0M4 21a8 8 0 0 1 16 0",
    Staffs: "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 21a5 5 0 0 1 10 0M11 21a5 5 0 0 1 10 0",
    Schemes: "M12 3v18M5 8h14M7 16h10",
    Accounts: "M4 4h16v16H4V4Zm4 4h8M8 12h8M8 16h5",
    Reports: "M5 3h10l4 4v14H5V3Zm9 0v5h5"
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[name]}" /></svg>`;
}

render();
