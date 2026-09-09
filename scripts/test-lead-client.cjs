const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'lib/leadFirestore.js'), 'utf8');
function client(env) {
  const calls = [];
  const context = {process:{env},console:{error(){}},Firestore:class {
    constructor(settings) { calls.push(settings); }
  }};
  vm.createContext(context);
  vm.runInContext(source.replace(/^import .*;\n/gm,'').replace(/export /g,'')+'\nthis.getClient=getLeadFirestore;',context);
  return {get:context.getClient,calls};
}
const missing=client({}); assert.equal(missing.get(),null); assert.equal(missing.calls.length,0);
const complete=client({FIREBASE_ADMIN_PROJECT_ID:'test',FIREBASE_ADMIN_CLIENT_EMAIL:'test@example.invalid',FIREBASE_ADMIN_PRIVATE_KEY:'"line1\\nline2"'});
const first=complete.get(); assert.equal(complete.get(),first); assert.equal(complete.calls.length,1);
assert.equal(complete.calls[0].preferRest,true);
assert.equal(complete.calls[0].credentials.private_key,'line1\nline2');
assert.equal(complete.calls[0].projectId,'test');
assert.ok(!source.includes('firebase-admin/auth') && !source.includes('firebase-admin/storage'));
const route=fs.readFileSync(path.join(root,'app/api/save-data/route.js'),'utf8');
assert.ok(!route.includes('from "axios"') && !route.includes('from "nodemailer"'));
assert.ok(route.includes('after(deliverNotifications)'));
console.log('PASS: lead-only REST client, credential normalization, single reusable client, notification-only dependencies deferred');
