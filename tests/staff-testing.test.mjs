import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
import vm from "node:vm";
import { webcrypto } from "node:crypto";

const appSource = await readFile("src/app.js", "utf8");
const storage = new Map([["goldland-state", "MAIN-DATA-MUST-STAY-UNCHANGED"], ["goldland-authenticated", "true"]]);
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
  window: { print() {}, location: {origin:"http://localhost:4174",reload(){}}, addEventListener(){} },
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


assert(appElement.innerHTML.includes("Enter shop password"));
assert.equal(vm.runInContext('authenticated',context),false,'Main authentication must not unlock staff testing');
const clean=vm.runInContext(`({version:STAFF_TEST_VERSION,parties:state.parties.map(p=>p.type),stock:state.stock,rows:barcodeListData(),guide:STAFF_TEST_CHECKLIST,feedback:currentStaffTestScreen()})`,context);
assert.equal(clean.version,'STAFF-TEST 0.3');
for(const role of ['Smith','Jeweller','Refiner'])assert(clean.parties.includes(role),'Missing test master '+role);
assert.equal(clean.rows.length,3,'Only actual test stock should be offered, not fixture-only legacy tags');
for(const item of clean.stock){assert(item.id&&item.barcode);assert.equal(item.opening+item.addition-item.deduction,item.closing);assert.equal(item.net,Math.round((item.gross-item.stone)*1000)/1000);}
for(const menu of ['Work Orders','Barcode','Stock'])assert(clean.guide.some(([module])=>module===menu));
assert.equal(storage.get('goldland-state'),'MAIN-DATA-MUST-STAY-UNCHANGED');
const flow=vm.runInContext(`(()=>{
 const stock=findStockByBarcode('DEMO-RING-001'),line={barcode:stock.barcode,itemName:stock.item,itemId:stock.itemId,qty:stock.qty,gross:stock.gross,stone:stock.stone,rate:100};
 const out=commitOperationalRecord('smith',{id:'STAFF-SM-OUT',entryNo:'SM-OUT',date:'02/11/2026',smithName:'Demo Smith',smithCode:'M0001',lines:[{...line,mode:'OUT'}]});
 if(findStockByBarcode(line.barcode).qty!==0)throw Error('Staff Smith OUT not posted');
 commitOperationalRecord('smith',{id:'STAFF-SM-IN',entryNo:'SM-IN',date:'02/11/2026',smithName:'Demo Smith',smithCode:'M0001',lines:[{...line,mode:'IN'}]});
 const sample=commitOperationalRecord('sampleIssue',{id:'STAFF-SI',entryNo:'SI-TEST',date:'02/11/2026',jewellerName:'Demo Jeweller',jewellerCode:'J0001',lines:[line]});
 commitOperationalRecord('sampleReturn',{id:'STAFF-SR',entryNo:'SR-TEST',date:'02/11/2026',jewellerName:'Demo Jeweller',jewellerCode:'J0001',lines:[line]});
 const sale={id:'STAFF-TEST-SALE',sections:{sales:[saleDetailsFromStock(findStockByBarcode(line.barcode))]}};postBillStock(sale,{view:'Sales Invoice'});
 if(findStockByBarcode(line.barcode).qty!==0||findStockByBarcode(line.barcode).net!==0)throw Error('Staff sale did not deduct stock');
 saveState();const reloaded=loadState();if(!reloaded.operationalPostings['sampleIssue:STAFF-SI'])throw Error('Staff posting journal did not persist');
 active='Barcode';barcodeView='Barcode Printing';if(currentStaffTestScreen()!=='Barcode Printing')throw Error('Feedback lost barcode screen');
 active='Work Orders';workOrderView='Refining';refineryView='Melting Return';if(currentStaffTestScreen()!=='Melting Return')throw Error('Feedback lost refining sub-screen');
 return true;
})()`,context);
assert(flow);
assert.equal(storage.get('goldland-state'),'MAIN-DATA-MUST-STAY-UNCHANGED','Staff saves modified main data');
const persisted=storage.get('goldland-staff-testing-state');
vm.runInContext('prepareCleanStaffDemo(state)',context);
assert.equal(storage.get('goldland-staff-testing-state'),persisted,'Reload erased test progress');
const css=await readFile('src/styles.css','utf8');
for(const menu of ['Work Orders','Barcode'])assert(css.includes('[data-nav="'+menu+'"]'));
assert(appSource.includes('function postOperationalStock('));
assert(!appSource.includes('function deleteActiveSalesBill('),'Obsolete staff handlers must not bypass stock reversal');
console.log('Staff 0.3 tests passed: new menus, demo masters/tags, main-data isolation, work -> return -> sale, persistence and feedback context.');
