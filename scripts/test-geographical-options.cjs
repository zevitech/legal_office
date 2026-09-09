const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const assets = path.join(process.env.GEO_PACKAGE_ROOT || path.dirname(require.resolve('country-state-city/package.json')), 'lib/assets');
const countries = JSON.parse(fs.readFileSync(path.join(assets, 'country.json')));
const states = JSON.parse(fs.readFileSync(path.join(assets, 'state.json')));
const compact = require('../constant/form2.0/geographical-options.json');
// This snapshot deliberately retains every option and its original spelling/code.
assert.deepEqual(compact.countries, countries.map(x => [x.isoCode, x.name]));
assert.deepEqual(compact.states, states.map(x => [x.countryCode, x.isoCode, x.name]));
let source = fs.readFileSync(path.join(root, 'utils/get-geographical-data.jsx'), 'utf8')
  .replace(/^import .*;$/m, 'const geographicalOptions = compact;')
  .replace('export const GetGeographicalData', 'const GetGeographicalData');
const getData = new Function('compact', source + '\nreturn GetGeographicalData;')(compact);
for (const country of countries) {
  const expected = states.filter(x => x.countryCode === country.isoCode)
    .sort((a,b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    .map(x => ({ value: x.isoCode, name: x.name }));
  assert.deepEqual(getData('state', country.isoCode), expected);
}
assert.deepEqual(getData('country'), countries.map(x => ({ value: x.isoCode, name: x.name })));
console.log(`PASS: all ${countries.length} countries and ${states.length} states, including ordering and values`);
