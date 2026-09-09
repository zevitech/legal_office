// Compact projection of country-state-city 3.2.1: preserve every option while
// excluding unused coordinates, phone codes and currencies from the browser.
import geographicalOptions from "@/constant/form2.0/geographical-options.json";

// Static reference data: avoid filtering thousands of states on every keystroke.
const geographicalCache = new Map();

/**
 * Fetch geographical data based on the type and specific country/state.
 * @param {string} type - Type of data to fetch ('country', 'state', or 'city').
 * @param {string} [countryCode] - Optional country code for fetching states/cities.
 * @param {string} [stateCode] - Optional state code for fetching cities.
 * @returns {Array} - Returns an array of objects with value and name properties.
 */
export const GetGeographicalData = (type, countryCode = "", stateCode = "") => {
  const cacheKey = `${type}:${countryCode}`;
  if (geographicalCache.has(cacheKey)) return geographicalCache.get(cacheKey);
  let result = [];
  if (type === "country") {
    result = geographicalOptions.countries.map(([value, name]) => ({ value, name }));
  } else if (type === "state" && countryCode) {
    result = geographicalOptions.states
      .filter(([country]) => country === countryCode)
      .map(([, value, name]) => ({ value, name }))
      .sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
  }
  geographicalCache.set(cacheKey, result);
  return result;
};
