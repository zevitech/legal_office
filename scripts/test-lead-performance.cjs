const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');
const root = require('node:path').resolve(__dirname, '..');
const source = fs.readFileSync(`${root}/app/api/save-data/route.js`, 'utf8');
const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function handler(code, {saved = true, fail = false, delay = 0, captcha = false} = {}) {
  const callbacks = [], deliveries = [], messages = [], posts = [];
  const context = {
    console: {log(){}, error(){}}, URLSearchParams,
    Date: class extends Date { constructor(){ super('2026-09-09T02:00:00Z'); } },
    process: {env: {MAILER_EMAIL: 'test@example.com', CRM_INGEST_URL: 'https://crm.invalid', CRM_INGEST_API_KEY: 'stub', DISABLE_ZOHO: 'true', ...(captcha ? {RECAPTCHA_SECRET_KEY:'stub'} : {})}},
    saveLead: async () => { await pause(20); return {saved, id:'lead-test', step:1, attempt:'test'}; },
    recordLeadDelivery: async (...args) => deliveries.push(args),
    after: callback => callbacks.push(callback),
    NextResponse: {json: (body, options) => ({body, status:options.status})},
    createTransport: () => ({sendMail: async data => { await pause(delay); if (fail) throw Error('SMTP unavailable'); messages.push(data); }}),
    axios: {post: async (...args) => { await pause(delay); if (fail) throw Error('CRM unavailable'); posts.push(args); return {data:{}}; }},
    fetch: async () => ({json: async () => ({success:false})}),
  };
  vm.createContext(context);
  vm.runInContext(code.replace(/^import .*;\n/gm,'').replace(/export /g,'')+'\nthis.POST = POST;', context);
  return {...context, callbacks, deliveries, messages, posts};
}

(async () => {
  const data = {customer_ID:'test', zoho_step:1, firstName:'Test', emailAddress:'test@example.com'};
  const req = {json: async () => data};
  const baseline = handler(execFileSync('git',['show',`${process.env.BASELINE_REF || 'b9870d8'}:app/api/save-data/route.js`],{cwd:root,encoding:'utf8'}), {delay:250});
  let start = performance.now(); await baseline.POST(req); const oldMs = performance.now()-start;
  const updated = handler(source, {delay:250});
  start = performance.now(); const response = await updated.POST(req); const newMs = performance.now()-start;
  assert.equal(response.status,200); assert.equal(response.body.success,true);
  assert.equal(updated.callbacks.length,1); assert.equal(updated.messages.length,0);
  assert.ok(newMs < oldMs / 2);
  await updated.callbacks[0]();
  assert.equal(updated.messages.length,1); assert.equal(updated.posts.length,1);
  assert.equal(updated.deliveries[0][1].emailSent,true);
  assert.equal(updated.messages[0].html,baseline.messages[0].html);
  assert.equal(JSON.stringify(updated.posts[0]),JSON.stringify(baseline.posts[0]));
  const unavailable = handler(source,{saved:false, fail:true});
  assert.equal((await unavailable.POST(req)).status,503); assert.equal(unavailable.callbacks.length,0);
  const fallback = handler(source,{saved:false});
  assert.equal((await fallback.POST(req)).status,200); assert.equal(fallback.messages.length,1);
  const partial = handler(source,{fail:true}); await partial.POST(req); await partial.callbacks[0]();
  assert.equal(partial.deliveries[0][1].emailSent,false);
  const captcha = handler(source,{captcha:true});
  assert.equal((await captcha.POST(req)).status,400); assert.equal(captcha.callbacks.length,0);
  console.log(`PASS: mocked handler ${oldMs.toFixed(0)}ms -> ${newMs.toFixed(0)}ms; background delivery, unchanged email/CRM payload, failure fallback and captcha`);

  let record = {};
  const db = {collection:()=>({doc:()=>({})}), runTransaction: async fn => fn({
    get: async()=>({exists:!!record.createdAt,data:()=>record}),
    set: (_ref,data)=>{record={...record,...data};},
  })};
  const ctx = {getAdminFirestore:()=>db, FieldValue:{serverTimestamp:()=>1}, randomUUID:require('node:crypto').randomUUID, console};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(`${root}/lib/leadStore.js`,'utf8').replace(/^import .*;\n/gm,'').replace(/export /g,'')+'\nthis.saveLead=saveLead;this.recordLeadDelivery=recordLeadDelivery;',ctx);
  const first=await ctx.saveLead(data); assert.equal(record.needsRetry,true);
  const second=await ctx.saveLead({...data,zoho_step:2});
  await ctx.recordLeadDelivery(first.id,{...first,emailSent:true,crmSent:true});
  assert.equal(record.needsRetry,true); // Step 2 still pending.
  await ctx.recordLeadDelivery(second.id,{...second,emailSent:true,crmSent:true});
  assert.equal(record.needsRetry,false);
  const newer=await ctx.saveLead({...data,zoho_step:2});
  await ctx.recordLeadDelivery(second.id,{...second,emailSent:true,crmSent:true});
  assert.equal(record.needsRetry,true); assert.equal(record.deliveryByStep[2].attempt,newer.attempt);
  console.log('PASS: pending delivery durability, cross-step completion and stale callback protection');

  const chatSource=fs.readFileSync(`${root}/components/LiveChatLoader.jsx`,'utf8').split('__html: `')[1].split('`,')[0];
  const chat={window:{},document:{createElement:()=>({}),head:{appendChild(){}}}};
  vm.createContext(chat);vm.runInContext(chatSource,chat);
  chat.window.LiveChatWidget.call('hide');assert.equal(chat.window.LiveChatWidget._q.length,1);
  let handled;chat.window.LiveChatWidget._h=(...args)=>{handled=args;};chat.window.LiveChatWidget.call('minimize');
  assert.equal(handled[0],'call'); assert.equal(handled[1][0],'minimize');
  console.log('PASS: LiveChat commands queue before load and dispatch after load');
})().catch(error=>{console.error(error);process.exitCode=1;});
