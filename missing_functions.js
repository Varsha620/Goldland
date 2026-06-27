// --- MISSING FUNCTION: normalizeServiceLine ---
function normalizeServiceLine(line = {}

// --- MISSING FUNCTION: defaultServiceJob ---
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

// --- MISSING FUNCTION: normalizeServiceJob ---
function normalizeServiceJob(record = {}

// --- MISSING FUNCTION: serviceFinancials ---
function serviceFinancials(record = {}

// --- MISSING FUNCTION: refinerOptions ---
function refinerOptions() {
  const options = (state?.parties || seed.parties || [])
    .filter((party) => party.type === "Refiner")
    .map((party) => party.name)
    .filter(Boolean);
  return options.length ? options : ["Metro Refiner", "SPJN ACID"];
}

// --- MISSING FUNCTION: defaultRefineryIssueLine ---
function defaultRefineryIssueLine() {
  return normalizeRefineryIssueLine({
    qty: 0,
    gross: 0,
    stone: 0,
    rate: activeGoldRate()
  });
}

// --- MISSING FUNCTION: normalizeRefineryIssueLine ---
function normalizeRefineryIssueLine(line = {}

// --- MISSING FUNCTION: defaultRefineryIssue ---
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

// --- MISSING FUNCTION: normalizeRefineryIssue ---
function normalizeRefineryIssue(record = {}

// --- MISSING FUNCTION: refineryIssueFinancials ---
function refineryIssueFinancials(record = {}

// --- MISSING FUNCTION: refineryPendingOptions ---
function refineryPendingOptions() {
  const issues = state?.refineryIssues || [];
  return issues.map((issue) => ({
    id: issue.id,
    label: `${issue.entryNo}${issue.refinerName ? ` - ${issue.refinerName}` : ""}`
  }));
}

// --- MISSING FUNCTION: selectedRefineryIssue ---
function selectedRefineryIssue(issueId) {
  return (state?.refineryIssues || []).find((issue) => issue.id === issueId || issue.entryNo === issueId) || null;
}

// --- MISSING FUNCTION: defaultRefineryReturnLine ---
function defaultRefineryReturnLine(source = {}

// --- MISSING FUNCTION: normalizeRefineryReturnLine ---
function normalizeRefineryReturnLine(line = {}

// --- MISSING FUNCTION: defaultRefineryReturn ---
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

// --- MISSING FUNCTION: normalizeRefineryReturn ---
function normalizeRefineryReturn(record = {}

// --- MISSING FUNCTION: refineryReturnFinancials ---
function refineryReturnFinancials(record = {}

// --- MISSING FUNCTION: defaultRefineryFinalLine ---
function defaultRefineryFinalLine(source = {}

// --- MISSING FUNCTION: normalizeRefineryFinalLine ---
function normalizeRefineryFinalLine(line = {}

// --- MISSING FUNCTION: defaultRefineryFinalReturn ---
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

// --- MISSING FUNCTION: normalizeRefineryFinalReturn ---
function normalizeRefineryFinalReturn(record = {}

// --- MISSING FUNCTION: refineryFinalFinancials ---
function refineryFinalFinancials(record = {}

// --- MISSING FUNCTION: defaultMeltingIssueLine ---
function defaultMeltingIssueLine() {
  return normalizeMeltingIssueLine({
    qty: 0,
    gross: 0,
    stone: 0,
    rate: activeGoldRate()
  });
}

// --- MISSING FUNCTION: normalizeMeltingIssueLine ---
function normalizeMeltingIssueLine(line = {}

// --- MISSING FUNCTION: defaultMeltingIssue ---
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

// --- MISSING FUNCTION: normalizeMeltingIssue ---
function normalizeMeltingIssue(record = {}

// --- MISSING FUNCTION: meltingIssueFinancials ---
function meltingIssueFinancials(record = {}

// --- MISSING FUNCTION: meltingPendingOptions ---
function meltingPendingOptions() {
  return (state?.meltingIssues || []).map((issue) => ({
    id: issue.id,
    label: `${issue.entryNo}${issue.refinerName ? ` - ${issue.refinerName}` : ""}`
  }));
}

// --- MISSING FUNCTION: selectedMeltingIssue ---
function selectedMeltingIssue(issueId) {
  return (state?.meltingIssues || []).find((issue) => issue.id === issueId || issue.entryNo === issueId) || null;
}

// --- MISSING FUNCTION: defaultMeltingReturnLine ---
function defaultMeltingReturnLine(source = {}

// --- MISSING FUNCTION: normalizeMeltingReturnLine ---
function normalizeMeltingReturnLine(line = {}

// --- MISSING FUNCTION: defaultMeltingReturn ---
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

// --- MISSING FUNCTION: normalizeMeltingReturn ---
function normalizeMeltingReturn(record = {}

// --- MISSING FUNCTION: meltingReturnFinancials ---
function meltingReturnFinancials(record = {}

// --- MISSING FUNCTION: normalizeComplimentaryStock ---
function normalizeComplimentaryStock(record = {}

// --- MISSING FUNCTION: complimentaryItemCatalog ---
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

// --- MISSING FUNCTION: complimentaryUnitOptions ---
function complimentaryUnitOptions() {
  const units = (state?.itemCategories?.units || seed.itemCategories.units || []).map((unit) => unit.name).filter(Boolean);
  return [...new Set(["Nos", ...units])];
}

// --- MISSING FUNCTION: complimentaryItemDropdown ---
function complimentaryItemDropdown(index, value, type) {
  const options = complimentaryItemCatalog().map((item) => item.itemName);
  const list = [...new Set(["", ...options, value].filter((item) => item !== undefined))];
  return `<select class="grid-input" data-complimentary-${type}-line-field="itemName" data-index="${index}">${list.map((option) => `<option ${option === value ? "selected" : ""}>${option}</option>`).join("")}</select>`;
}

// --- MISSING FUNCTION: complimentaryLineSelect ---
function complimentaryLineSelect(field, value, options, type, index) {
  const list = [...new Set(["", ...(options || []), value].filter((item) => item !== undefined))];
  return `<select class="grid-input" data-complimentary-${type}-line-field="${field}" data-index="${index}">${list.map((option) => `<option ${option === value ? "selected" : ""}>${option}</option>`).join("")}</select>`;
}

// --- MISSING FUNCTION: complimentaryPartyDropdown ---
function complimentaryPartyDropdown(field, value, attr, type = "Supplier") {
  const options = (state?.parties || []).filter((party) => party.type === type).map((party) => party.name).filter(Boolean);
  const list = [...new Set(["", ...options, value].filter((item) => item !== undefined))];
  return `<select class="classic-input" ${attr}="${field}">${list.map((option) => `<option ${option === value ? "selected" : ""}>${option}</option>`).join("")}</select>`;
}

// --- MISSING FUNCTION: defaultComplimentaryPurchaseLine ---
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

// --- MISSING FUNCTION: normalizeComplimentaryPurchaseLine ---
function normalizeComplimentaryPurchaseLine(line = {}

// --- MISSING FUNCTION: defaultComplimentaryIssueLine ---
function defaultComplimentaryIssueLine() {
  return {
    id: crypto.randomUUID(),
    itemId: "",
    itemName: "",
    quantity: 0,
    unit: "Nos"
  };
}

// --- MISSING FUNCTION: normalizeComplimentaryIssueLine ---
function normalizeComplimentaryIssueLine(line = {}

// --- MISSING FUNCTION: defaultComplimentaryPurchase ---
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

// --- MISSING FUNCTION: complimentaryPurchaseFinancials ---
function complimentaryPurchaseFinancials(record = {}

// --- MISSING FUNCTION: normalizeComplimentaryPurchase ---
function normalizeComplimentaryPurchase(record = {}

// --- MISSING FUNCTION: defaultComplimentaryIssue ---
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

// --- MISSING FUNCTION: normalizeComplimentaryIssue ---
function normalizeComplimentaryIssue(record = {}

// --- MISSING FUNCTION: rebuildComplimentaryStock ---
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

// --- MISSING FUNCTION: complimentaryStockAvailable ---
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

// --- MISSING FUNCTION: validateComplimentaryIssueStock ---
function validateComplimentaryIssueStock(record = {}

// --- MISSING FUNCTION: supplierPartyByCode ---
function supplierPartyByCode(code = "") {
  const normalized = String(code || "").trim().toUpperCase();
  if (!normalized) return null;
  return (state.parties || []).find((party) => party.type === "Supplier" && String(party.customerCode || "").toUpperCase() === normalized) || null;
}

// --- MISSING FUNCTION: supplierPartyByName ---
function supplierPartyByName(name = "") {
  return (state.parties || []).find((party) => party.type === "Supplier" && party.name === name) || null;
}

// --- MISSING FUNCTION: normalizeScheme ---
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

// --- MISSING FUNCTION: normalizeAccount ---
function normalizeAccount(item) {
  return {
    date: item.date || "16-05-2026",
    vouNo: item.vouNo || "",
    particular: item.particular || item.ledger,
    crdr: item.crdr || (Number(item.balance || 0) < 0 ? "Cr" : "Dr"),
    ...item
  };
}

// --- MISSING FUNCTION: normalizeAccountMaster ---
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

// --- MISSING FUNCTION: saveState ---
function saveState() {
  localStorage.setItem("goldland-state", JSON.stringify(state));
}

// --- MISSING FUNCTION: money ---
function money(value) {
  return `Rs.${Number(value).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}
