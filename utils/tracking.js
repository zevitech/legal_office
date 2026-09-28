"use client";

// GTM dataLayer helpers for the trademark funnel.
// Never put raw names, emails, phone numbers, addresses or card data in here.

const FUNNEL_ID_KEY = "lto_funnel_id";
const CLICK_IDS_KEY = "lto_click_ids";
const FIRED_EVENTS_KEY = "lto_fired_events";
const PURCHASES_FIRED_KEY = "lto_fired_purchases";
const ENHANCED_DATA_KEY = "lto_enhanced_conversion_data";
// Same existing Website Purchase action as the GTM tag. Never create a second
// action for retries: Google deduplicates by action + transaction_id.
const GOOGLE_PURCHASE_DESTINATION = "AW-16565473053/RmqECOrQ97sbEJ2ehNs9";
const PURCHASE_ATTEMPTS_PREFIX = "lto_google_purchase_attempts_v1:";
const PURCHASE_RETRY_OFFSETS = [0, 2000, 5000];
const PURCHASE_RETRY_TTL = 10 * 60 * 1000;
const purchasesSeen = new Set();
const purchaseRetryTimers = new Map();

const CLICK_ID_PARAMS = ["gclid", "wbraid", "gbraid"];

const isBrowser = () => typeof window !== "undefined";

function push(payload) {
  // Local previews must never pollute live Google Ads or Analytics data.
  if (!isBrowser() || process.env.NODE_ENV !== "production") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

const funnelFields = (step) => ({
  funnel_id: getFunnelId(),
  funnel_step: step,
  service_type: "trademark_registration",
});

function getEnhancedConversionData() {
  if (!isBrowser()) return {};
  try {
    return JSON.parse(sessionStorage.getItem(ENHANCED_DATA_KEY) || "{}");
  } catch {
    return {};
  }
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Prepare privacy-safe matching signals for Google Ads enhanced conversions.
 * Raw contact data is normalized, SHA-256 hashed in the browser, and discarded.
 */
export async function prepareEnhancedConversionData({ email, phone }) {
  if (!isBrowser() || process.env.NODE_ENV !== "production" || !crypto?.subtle) return;

  let normalizedEmail = String(email || "").trim().toLowerCase();
  const emailParts = normalizedEmail.split("@");
  if (emailParts.length === 2 && ["gmail.com", "googlemail.com"].includes(emailParts[1])) {
    normalizedEmail = `${emailParts[0].replace(/\./g, "")}@${emailParts[1]}`;
  }
  let normalizedPhone = String(phone || "").replace(/[^\d+]/g, "");
  if (/^\d{10}$/.test(normalizedPhone)) normalizedPhone = `+1${normalizedPhone}`;
  if (normalizedPhone && !normalizedPhone.startsWith("+")) normalizedPhone = `+${normalizedPhone}`;

  const userData = {};
  if (normalizedEmail) userData.sha256_email_address = await sha256(normalizedEmail);
  if (/^\+\d{8,15}$/.test(normalizedPhone)) {
    userData.sha256_phone_number = await sha256(normalizedPhone);
  }

  if (Object.keys(userData).length) {
    sessionStorage.setItem(ENHANCED_DATA_KEY, JSON.stringify(userData));
  }
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
 * Guards against duplicate pushes within the current checkout session (e.g. a
 * route re-render, thank-you refresh, or React effects running twice in dev).
 *
 * Do not persist these flags in localStorage: doing so would suppress a valid
 * conversion when the same visitor starts another application in the future.
 * Returns true only the first time per key in this browser session.
 */
function markFired(key) {
  if (!isBrowser()) return false;
  try {
    const fired = JSON.parse(sessionStorage.getItem(FIRED_EVENTS_KEY) || "{}");
    if (fired[key]) return false;
    fired[key] = Date.now();
    sessionStorage.setItem(FIRED_EVENTS_KEY, JSON.stringify(fired));
    return true;
  } catch {
    return true;
  }
}

/**
 * Guard for the shared GTM/Reddit event only, NOT a delivery receipt. Google-only
 * retries have a separate bounded attempt ledger below. Keep legacy flags so
 * deployment does not replay historical purchases or duplicate Reddit events.
 */
function markPurchaseFired(key) {
  if (!isBrowser()) return false;
  if (purchasesSeen.has(key)) return false;
  purchasesSeen.add(key);
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

function withPurchaseLock(key, callback) {
  // Serialize tabs where supported. Storage failures must never break checkout.
  if (window.navigator?.locks?.request) {
    void window.navigator.locks.request(key, callback).catch(() => {});
  } else {
    try { callback(); } catch { /* Tracking is non-blocking. */ }
  }
}

function readPurchaseAttempts(key) {
  try {
    const state = JSON.parse(localStorage.getItem(key) || "null");
    if (!state || !Number.isInteger(state.attempts) || state.attempts < 1 ||
        state.attempts > 3 || !Number.isFinite(state.startedAt) ||
        !Number.isFinite(state.lastAttemptAt) || !Number.isFinite(state.value) ||
        state.value <= 0 || state.currency !== "USD") return null;
    return state;
  } catch { return null; }
}

function savePurchaseAttempts(key, state) {
  try {
    localStorage.setItem(key, JSON.stringify(state));
    return true;
  } catch { return false; }
}

function scheduleGooglePurchaseRetry(transactionId) {
  const key = PURCHASE_ATTEMPTS_PREFIX + transactionId;
  const state = readPurchaseAttempts(key);
  if (!state || state.attempts >= 3 || purchaseRetryTimers.has(key) ||
      Date.now() - state.startedAt > PURCHASE_RETRY_TTL) return;
  const dueAt = Math.max(state.startedAt + PURCHASE_RETRY_OFFSETS[state.attempts],
    state.lastAttemptAt + 2000);
  purchaseRetryTimers.set(key, window.setTimeout(() => {
    purchaseRetryTimers.delete(key);
    withPurchaseLock(key, () => {
      const current = readPurchaseAttempts(key);
      if (!current || current.attempts >= 3 ||
          Date.now() - current.startedAt > PURCHASE_RETRY_TTL) return;
      // Reserve before dispatch to bound attempts across refreshes. This counts
      // attempts, not success. A gtag callback cannot confirm Ads attribution.
      if (!savePurchaseAttempts(key, { ...current,
        attempts: current.attempts + 1, lastAttemptAt: Date.now() })) return;
      try {
        // Use the existing Google tag and its consent state; do not inject a new
        // script, grant consent, or replay lto_purchase (which also fires Reddit).
        const gtag = window.gtag || function () {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push(arguments);
        };
        gtag("event", "conversion", {
          send_to: GOOGLE_PURCHASE_DESTINATION,
          transaction_id: transactionId,
          value: current.value,
          currency: current.currency,
        });
      } catch { /* The remaining bounded attempt may still work. */ }
      scheduleGooglePurchaseRetry(transactionId);
    });
  }, Math.max(0, dueAt - Date.now())));
}

// 2. First meaningful interaction with the registration form.
export function trackFormStart() {
  if (!markFired("lto_form_start")) return;
  push({
    event: "lto_form_start",
    ...funnelFields(1),
  });
}

// 3. Lead validated AND successfully created by the backend.
export function trackQualifiedLead(leadId, details = {}) {
  if (!markFired("lto_qualified_lead")) return;
  push({
    event: "lto_qualified_lead",
    ...funnelFields(1),
    lead_id: leadId,
    protection_count: Number(details.protectionCount || 0),
    protection_types: Array.isArray(details.protectionTypes)
      ? details.protectionTypes.join(",")
      : "",
    user_data: getEnhancedConversionData(),
  });
}

export function trackClassificationComplete({ activityCount, classCount, reviewPreference }) {
  if (!markFired("lto_classification_complete")) return;
  push({
    event: "lto_classification_complete",
    ...funnelFields(2),
    activity_count: Number(activityCount || 0),
    potential_class_count: Number(classCount || 0),
    review_preference: reviewPreference || "",
  });
}

export function trackPackageSelected({ packageName, value, classCount }) {
  if (!markFired("lto_package_selected")) return;
  push({
    event: "lto_package_selected",
    ...funnelFields(3),
    package_name: packageName || "",
    value: Number(value || 0),
    currency: "USD",
    potential_class_count: Number(classCount || 0),
  });
}

export function trackAddonChange({ addonKey, addonValue, selected }) {
  push({
    event: "lto_addon_change",
    ...funnelFields(4),
    addon_key: addonKey,
    addon_value: Number(addonValue || 0),
    selected: Boolean(selected),
  });
}

// Checkout/payment session started.
export function trackBeginCheckout(details) {
  if (!markFired("lto_begin_checkout")) return;
  const input = typeof details === "object" ? details : { value: details };
  push({
    event: "lto_begin_checkout",
    ...funnelFields(4),
    value: Number(input.value || 0),
    currency: "USD",
    package_name: input.packageName || "",
    potential_class_count: Number(input.classCount || 0),
    addon_count: Number(input.addonCount || 0),
  });
}

// 5. Called only after provider-confirmed payment, from the thank-you page.
// One shared event + at most two Google-only retries. These are timed retries,
// not proof of failure/success; Sheet recovery remains necessary for lost hits.
export function trackPurchase({ transactionId, value, paidAt, packageName, classCount, addons = [] }) {
  if (!isBrowser() || process.env.NODE_ENV !== "production") return;
  const id = String(transactionId || "").trim();
  const amount = Number(value);
  if (!id || id.startsWith("DEMO-") || !Number.isFinite(amount) || amount <= 0) return;
  const key = PURCHASE_ATTEMPTS_PREFIX + id;
  withPurchaseLock(key, () => {
    const previous = readPurchaseAttempts(key);
    const firstAttempt = !previous && markPurchaseFired(`lto_purchase_${id}`);
    if (firstAttempt) {
      // Only fresh orders start a retry ledger. Never replay legacy/recovered
      // orders just because a customer revisits an old receipt after deployment.
      const age = Date.now() - Date.parse(paidAt);
      if (Number.isFinite(age) && age >= 0 && age <= 24 * 60 * 60 * 1000) {
        savePurchaseAttempts(key, { attempts: 1, startedAt: Date.now(),
          lastAttemptAt: Date.now(), value: amount, currency: "USD" });
      }
      try { push({
        event: "lto_purchase",
        ...funnelFields(5),
        transaction_id: id,
        value: amount,
        currency: "USD",
        package_name: packageName || "",
        potential_class_count: Number(classCount || 0),
        addon_count: Array.isArray(addons) ? addons.length : 0,
        user_data: getEnhancedConversionData(),
      }); } catch { /* Google-only retries can still run if the push throws. */ }
    }
    scheduleGooglePurchaseRetry(id);
  });
}
