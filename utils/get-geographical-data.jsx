import { Country, State, City } from "country-state-city";

/**
 * Fetch geographical data based on the type and specific country/state.
 * @param {string} type - Type of data to fetch ('country', 'state', or 'city').
 * @param {string} [countryCode] - Optional country code for fetching states/cities.
 * @param {string} [stateCode] - Optional state code for fetching cities.
 * @returns {Array} - Returns an array of objects with value and name properties.
 */
export const GetGeographicalData = (type, countryCode = "", stateCode = "") => {
  if (type === "country") {
    const countries = Country.getAllCountries();
    return countries.map((country) => ({
      value: country.isoCode,
      name: country.name,
    }));
  } else if (type === "state" && countryCode) {
    const states = State.getStatesOfCountry(countryCode);
    return states.map((state) => ({
      value: state.isoCode,
      name: state.name,
    }));
  } else if (type === "city" && countryCode && stateCode) {
    const cities = City.getCitiesOfState(countryCode, stateCode);
    return cities.map((city) => ({
      value: city.name,
      name: city.name,
    }));
  } else {
    return [];
  }
};
