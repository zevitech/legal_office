// Server-authoritative pricing. The browser sends a package NAME only; the
// charge route recalculates the amount from this table so the total can never
// be tampered with client-side. Keep in sync with
// constant/form2.0/system-step-three-data.js
export const PACKAGE_PRICES = {
  Basic: 49,
  Individuals: 49,
  Standard: 149,
  "Small Businesses": 149,
  Premium: 249,
  Corporates: 249,
};

export const RUSH_PROCESSING_FEE = 29;

// Recalculates the order total from the selected package + add-ons.
// Returns null when the package name is not recognised.
export function calculateOrderTotal({ packageName, isRushProcessing }) {
  const base = PACKAGE_PRICES[packageName];
  if (typeof base !== "number") return null;

  return base + (isRushProcessing ? RUSH_PROCESSING_FEE : 0);
}
