// Server-authoritative pricing. The browser sends a package NAME only; the
// charge route recalculates the amount from this table so the total can never
// be tampered with client-side. Keep in sync with
// constant/form2.0/system-step-three-data.js
export const PACKAGE_PRICES = {
  Basic: 49,
  Individual: 49,
  "Small Business": 149,
  "Business Plus": 249,
  Corporate: 649,
  Individuals: 49,
  Standard: 149,
  "Small Businesses": 149,
  Advanced: 249,
  Premium: 649,
  Corporates: 249,
};

// Canonical package choices used by staff tools. Keep this list aligned with
// the public application form while leaving legacy package aliases available
// in PACKAGE_PRICES for older orders.
export const PORTAL_PACKAGE_OPTIONS = ["Basic", "Standard", "Advanced", "Premium"];

export const RUSH_PROCESSING_FEE = 29;
export const ADD_ON_PRICES = {
  rush: 29,
  monitoring: 79,
  specimenReview: 49,
};

// Avoid charging again for an included service. Monitoring upgrades require
// a separately defined scope; do not sell the same monitoring add-on twice.
export function getIncludedAddons(packageName) {
  if (["Corporate", "Premium"].includes(packageName)) return ["rush", "monitoring", "specimenReview"];
  if (["Small Business", "Standard", "Small Businesses", "Business Plus", "Advanced", "Corporates"].includes(packageName)) return ["monitoring"];
  return [];
}

export function getChargeableAddons(packageName, addons = [], isRushProcessing = false) {
  const included = getIncludedAddons(packageName);
  const requested = new Set(Array.isArray(addons) ? addons : []);
  if (isRushProcessing) requested.add("rush");
  return [...requested].filter(key => Object.hasOwn(ADD_ON_PRICES, key) && !included.includes(key));
}

// Recalculates the order total from the selected package + add-ons.
// Returns null when the package name is not recognised.
export function calculateOrderTotal({ packageName, isRushProcessing, addons = [] }) {
  const base = PACKAGE_PRICES[packageName];
  if (typeof base !== "number") return null;
  const normalizedAddons = getChargeableAddons(packageName, addons, isRushProcessing);
  const addOnTotal = [...normalizedAddons].reduce(
    (total, key) => total + (ADD_ON_PRICES[key] || 0),
    0,
  );
  return base + addOnTotal;
}
