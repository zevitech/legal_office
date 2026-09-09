// Import only the datasets used by the intake form. Importing the package root
// also bundles its multi-megabyte worldwide city dataset even though this form
// never requests cities.
import Country from "country-state-city/lib/country";
import State from "country-state-city/lib/state";

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
    const countries = Country.getAllCountries();
    result = countries.map((country) => ({
      value: country.isoCode,
      name: country.name,
    }));
  } else if (type === "state" && countryCode) {
    const states = State.getStatesOfCountry(countryCode);
    result = states.map((state) => ({
      value: state.isoCode,
      name: state.name,
    }));
  }
  geographicalCache.set(cacheKey, result);
  return result;
};
