// Server-authoritative pricing. The browser sends a package NAME only; the
// charge route recalculates the amount from this table so the total can never
// be tampered with client-side. Keep in sync with
// constant/form2.0/system-step-three-data.js
export const PACKAGE_PRICES = {
  Basic: 49,
  Individuals: 49,
  Standard: 149,
  "Small Businesses": 149,
  Advanced: 249,
  Premium: 649,
  Corporates: 249,
};

export const RUSH_PROCESSING_FEE = 29;
export const ADD_ON_PRICES = {
  rush: 29,
  monitoring: 79,
  specimenReview: 49,
};

// Recalculates the order total from the selected package + add-ons.
// Returns null when the package name is not recognised.
export function calculateOrderTotal({ packageName, isRushProcessing, addons = [] }) {
  const base = PACKAGE_PRICES[packageName];
  if (typeof base !== "number") return null;
  const normalizedAddons = new Set(Array.isArray(addons) ? addons : []);
  if (isRushProcessing) normalizedAddons.add("rush");
  const addOnTotal = [...normalizedAddons].reduce(
    (total, key) => total + (ADD_ON_PRICES[key] || 0),
    0,
  );
  return base + addOnTotal;
}
