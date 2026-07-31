"use client";

// GTM dataLayer helpers for the trademark funnel.
// Never put names, emails, phone numbers, addresses or card data in here.

const FUNNEL_ID_KEY = "lto_funnel_id";
const CLICK_IDS_KEY = "lto_click_ids";
// Separate keys per storage so the two guards can never collide, and so any
// stale pre-fix data under the old key is ignored.
const SESSION_FIRED_KEY = "lto_fired_events_session";
const PURCHASES_FIRED_KEY = "lto_fired_purchases";

const CLICK_ID_PARAMS = ["gclid", "wbraid", "gbraid"];

const isBrowser = () => typeof window !== "undefined";

function push(payload) {
  if (!isBrowser()) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/**
 * Stable per-visitor funnel id, persisted for the whole session so every
 * event in the funnel shares one value.
 */
export function getFunnelId() {
  if (!isBrowser()) return "";
  try {
    let id = sessionStorage.getItem(FUNNEL_ID_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `lto-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem(FUNNEL_ID_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

/**
 * Capture gclid / wbraid / gbraid from the landing URL and keep them for the
 * whole session so a purchase can be attributed back to the ad click.
 * Existing values are never overwritten by a later param-less page load.
 */
export function captureClickIds() {
  if (!isBrowser()) return {};
  try {
    const params = new URLSearchParams(window.location.search);
    const stored = getClickIds();
    let changed = false;

    CLICK_ID_PARAMS.forEach((key) => {
      const value = params.get(key);
      if (value && !stored[key]) {
        stored[key] = value;
        changed = true;
      }
    });

    if (changed) {
      localStorage.setItem(CLICK_IDS_KEY, JSON.stringify(stored));
    }
    return stored;
  } catch {
    return {};
  }
}

export function getClickIds() {
  if (!isBrowser()) return {};
  try {
    return JSON.parse(localStorage.getItem(CLICK_IDS_KEY) || "{}");
  } catch {
    return {};
  }
}

/**
 * Guards against duplicate pushes within a single funnel session (a page
 * refresh, or React effects running twice). Uses sessionStorage so a NEW
 * visit — or a repeat test in the same browser — can fire these events again.
 * Do NOT use this for purchases; see markFiredForever.
 */
function markFiredThisSession(key) {
  if (!isBrowser()) return false;
  try {
    const fired = JSON.parse(sessionStorage.getItem(SESSION_FIRED_KEY) || "{}");
    if (fired[key]) return false;
    fired[key] = Date.now();
    sessionStorage.setItem(SESSION_FIRED_KEY, JSON.stringify(fired));
    return true;
  } catch {
    return true;
  }
}

/**
 * Permanent, per-order guard for purchases. Keyed by transaction id, so a
 * genuine second order still fires while the SAME order can never be counted
 * twice — including after closing and reopening the thank-you page.
 */
function markFiredForever(key) {
  if (!isBrowser()) return false;
  try {
    const fired = JSON.parse(localStorage.getItem(PURCHASES_FIRED_KEY) || "{}");
    if (fired[key]) return false;
    fired[key] = Date.now();
    localStorage.setItem(PURCHASES_FIRED_KEY, JSON.stringify(fired));
    return true;
  } catch {
    return true;
  }
}

// 2. First meaningful interaction with the registration form.
export function trackFormStart() {
  if (!markFiredThisSession("lto_form_start")) return;
  push({
    event: "lto_form_start",
    funnel_id: getFunnelId(),
    service_type: "trademark_registration",
  });
}

// 3. Lead validated AND successfully created by the backend.
export function trackQualifiedLead(leadId) {
  if (!markFiredThisSession("lto_qualified_lead")) return;
  push({
    event: "lto_qualified_lead",
    funnel_id: getFunnelId(),
    lead_id: leadId,
  });
}

// 4. Checkout/payment session started.
export function trackBeginCheckout(value) {
  if (!markFiredThisSession("lto_begin_checkout")) return;
  push({
    event: "lto_begin_checkout",
    funnel_id: getFunnelId(),
    value: Number(value),
    currency: "USD",
  });
}

// 5. Payment confirmed by the provider. Keyed on transaction_id so a
// thank-you page refresh can never count a second purchase.
export function trackPurchase({ transactionId, value }) {
  if (!transactionId) return;
  if (!markFiredForever(`lto_purchase_${transactionId}`)) return;
  push({
    event: "lto_purchase",
    funnel_id: getFunnelId(),
    transaction_id: transactionId,
    value: Number(value),
    currency: "USD",
  });
}
