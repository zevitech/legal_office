const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = await chromium.launch({headless:true, executablePath:process.env.CHROME_PATH});
  try {
    for (const width of [390, 1440]) {
      const results = [];
      for (const port of [3008, 3009]) {
        const origin = `http://127.0.0.1:${port}`;
        const page = await browser.newPage({viewport:{width,height:900}});
        const errors = [];
        page.on('pageerror', e => errors.push(e.message));
        await page.route('**/*', r => {
          const url = new URL(r.request().url());
          return url.origin !== origin || url.pathname.startsWith('/api/') ? r.abort() : r.continue();
        });
        await page.goto(origin + '/trademark-register');
        await page.getByRole('button', {name:/Not yet/}).waitFor();
        await page.waitForTimeout(500);
        const initial = await page.evaluate(() => ({
          jsBytes:performance.getEntriesByType('resource').filter(x=>x.name.includes('.js')).reduce((n,x)=>n+x.encodedBodySize,0),
          headings:[...document.querySelectorAll('h1,h2')].map(x=>x.textContent),
          overflow:document.documentElement.scrollWidth > innerWidth
        }));
        assert.equal(initial.overflow, false);
        await page.getByRole('button',{name:/Not yet/}).click();
        await page.getByLabel('Business or product name',{exact:true}).fill('Retained Test Name');
        await page.getByRole('button',{name:'Continue to owner details',exact:true}).click();
        await page.getByLabel('First Name',{exact:true}).fill('Test');
        await page.getByLabel('Last Name',{exact:true}).fill('Owner');
        const options = await page.locator('select option').allTextContents();
        assert.ok(options.includes('California'));
        await page.reload();
        // Compare refresh behavior against baseline; do not mistake an existing
        // missing draft restore for a regression introduced by this optimization.
        const restored = await page.getByLabel('Business or product name',{exact:true}).inputValue();
        await page.goto(origin + '/trademark-registration');
        await page.locator('h1:visible').first().waitFor();
        if (port === 3009) assert.equal(await page.getByRole('main').count(),1);
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
        assert.deepEqual(errors, []);
        results.push({...initial,options,restored});
        await page.close();
      }
      assert.deepEqual(results[0].headings,results[1].headings);
      assert.deepEqual(results[0].options,results[1].options);
      assert.equal(results[0].restored,results[1].restored);
      assert.ok(results[1].jsBytes < results[0].jsBytes, 'Initial JS must decrease');
      console.log(JSON.stringify({width,beforeBytes:results[0].jsBytes,afterBytes:results[1].jsBytes,navigation:'passed',draftRestore:results[1].restored ? 'retained' : 'pre-existing gap: unsubmitted draft is lost on refresh'}));
    }
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1});
