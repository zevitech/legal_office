// No network, real tags, customer data, or payment calls. Run with node --test.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../utils/tracking.js'), 'utf8')
  .replace(/export /g, '');
const PREFIX = 'lto_google_purchase_attempts_v1:';
const START = Date.parse('2026-09-28T16:00:00Z');

function harness({ storage = new Map(), now = START, env = 'production',
  brokenStorage = false, queueOnly = false, throwingTag = false } = {}) {
  const timers = new Map();
  const google = [];
  let sequence = 0;
  let clock = now;
  const localStorage = {
    getItem(key) { if (brokenStorage) throw Error('blocked'); return storage.get(key) ?? null; },
    setItem(key, value) { if (brokenStorage) throw Error('blocked'); storage.set(key, value); },
  };
  const window = { dataLayer: [], navigator: {}, setTimeout(fn, delay) {
    timers.set(++sequence, { fn, time: clock + delay }); return sequence;
  } };
  if (!queueOnly) window.gtag = (...args) => {
    google.push(args);
    if (throwingTag) throw Error('simulated tag failure');
  };
  class Clock extends Date { static now() { return clock; } }
  const context = vm.createContext({ window, localStorage,
    sessionStorage: { getItem: () => null, setItem: () => {} },
    process: { env: { NODE_ENV: env } }, Date: Clock, crypto: { randomUUID: () => 'test-only' },
  });
  vm.runInContext(source, context);
  function advance(ms) {
    const end = clock + ms;
    while (true) {
      const next = [...timers].sort((a, b) => a[1].time - b[1].time)[0];
      if (!next || next[1].time > end) break;
      clock = next[1].time; timers.delete(next[0]); next[1].fn();
    }
    clock = end;
  }
  return { storage, google, window, advance, timers, track: context.trackPurchase,
    order: (id = 'TEST-ORDER-1', value = 149) => ({ transactionId: id, value,
      paidAt: new Date(START).toISOString(), packageName: 'Test', addons: [] }) };
}

test('one shared event, exactly two Google-only retries, unchanged ID/value/destination', () => {
  const h = harness();
  h.track(h.order()); h.track(h.order());
  assert.equal(h.window.dataLayer.length, 1);
  h.advance(1999); assert.equal(h.google.length, 0);
  h.advance(1); assert.equal(h.google.length, 1);
  h.advance(3000); assert.equal(h.google.length, 2);
  h.track(h.order()); h.advance(60000);
  assert.equal(h.google.length, 2);
  assert.equal(h.window.dataLayer.filter(e => e.event === 'lto_purchase').length, 1);
  for (const [command, event, fields] of h.google) {
    assert.equal(command, 'event'); assert.equal(event, 'conversion');
    assert.equal(fields.send_to, 'AW-16565473053/RmqECOrQ97sbEJ2ehNs9');
    assert.equal(fields.transaction_id, 'TEST-ORDER-1');
    assert.equal(fields.value, 149); assert.equal(fields.currency, 'USD');
    assert.deepEqual(Object.keys(fields).sort(), ['currency', 'send_to', 'transaction_id', 'value']);
  }
});

test('refresh resumes remaining attempts without repeating shared event or changing value', () => {
  const first = harness(); first.track(first.order()); first.advance(2000);
  const refresh = harness({ storage: first.storage, now: START + 2500 });
  refresh.track(refresh.order('TEST-ORDER-1', 649)); refresh.advance(6000);
  assert.equal(refresh.window.dataLayer.length, 0);
  assert.equal(refresh.google.length, 1);
  assert.equal(refresh.google[0][2].value, 149);
  assert.equal(JSON.parse(first.storage.get(PREFIX + 'TEST-ORDER-1')).attempts, 3);
});

test('historical flagged purchase is not replayed at deployment', () => {
  const h = harness({ storage: new Map([['lto_fired_purchases',
    JSON.stringify({ 'lto_purchase_TEST-ORDER-1': START - 1000 })]]) });
  h.track(h.order()); h.advance(60000);
  assert.equal(h.window.dataLayer.length, 0); assert.equal(h.google.length, 0);
});

test('invalid and demo purchases and development previews send nothing', () => {
  const h = harness();
  for (const order of [h.order(''), h.order('DEMO-123'), h.order('bad', NaN),
    h.order('bad', Infinity), h.order('bad', 0), h.order('bad', -1)]) h.track(order);
  h.advance(60000); assert.equal(h.window.dataLayer.length, 0); assert.equal(h.google.length, 0);
  const dev = harness({ env: 'development' }); dev.track(dev.order()); dev.advance(60000);
  assert.equal(dev.window.dataLayer.length, 0); assert.equal(dev.storage.size, 0);
});

test('storage denial fails closed for retries and does not break original event', () => {
  const h = harness({ brokenStorage: true });
  assert.doesNotThrow(() => { h.track(h.order()); h.track(h.order()); h.advance(60000); });
  assert.equal(h.window.dataLayer.length, 1); assert.equal(h.google.length, 0);
});

test('blocked/unloaded gtag queues only two Google commands without consent changes', () => {
  const h = harness({ queueOnly: true }); h.track(h.order()); h.advance(60000);
  assert.equal(h.window.dataLayer.length, 3);
  assert.equal(h.window.dataLayer[1][0], 'event');
  assert.equal(h.window.dataLayer[1][1], 'conversion');
  assert.equal(h.window.dataLayer[2][2].transaction_id, 'TEST-ORDER-1');
});

test('tag exception does not break checkout or stop the final bounded attempt', () => {
  const h = harness({ throwingTag: true });
  assert.doesNotThrow(() => { h.track(h.order()); h.advance(60000); });
  assert.equal(h.google.length, 2); assert.equal(h.timers.size, 0);
});

test('expired retry ledger does not restart and a new order has independent budget', () => {
  const first = harness(); first.track(first.order());
  const later = harness({ storage: first.storage, now: START + 11 * 60000 });
  later.track(later.order()); later.advance(6000);
  assert.equal(later.google.length, 0);
  later.track(later.order('TEST-ORDER-2', 249)); later.advance(6000);
  assert.equal(later.google.length, 2); assert.equal(later.google[0][2].value, 249);
});

test('missing or old payment time preserves original event but does not start retries', () => {
  const h = harness();
  h.track({ ...h.order(), paidAt: undefined });
  h.track({ ...h.order('TEST-OLD'), paidAt: '2026-09-25T12:00:00Z' });
  h.advance(60000); assert.equal(h.google.length, 0); assert.equal(h.window.dataLayer.length, 2);
});

test('existing ledger prevents reset if old shared-event storage is missing', () => {
  const h = harness(); h.track(h.order()); h.advance(6000);
  h.storage.delete('lto_fired_purchases');
  const refresh = harness({ storage: h.storage, now: START + 7000 });
  refresh.track(refresh.order()); refresh.advance(6000);
  assert.equal(refresh.google.length, 0); assert.equal(refresh.window.dataLayer.length, 0);
});
