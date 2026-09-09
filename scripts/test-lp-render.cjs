const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const bases = [process.env.LP_BASE || 'http://127.0.0.1:3010', process.env.LP_UPDATED || 'http://127.0.0.1:3011'];

(async () => {
  const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH});
  try {
    // The hero must be present in the initial visible HTML, not depend on
    // execution of a streamed-content reveal script during main-thread work.
    const shell = await browser.newContext({javaScriptEnabled:false, viewport:{width:390,height:900}});
    const shellPage = await shell.newPage();
    await shellPage.route('**/*', r => new URL(r.request().url()).origin === bases[1] ? r.continue() : r.abort());
    await shellPage.goto(bases[1] + '/trademark-registration');
    assert.equal(await shellPage.locator('h1').isVisible(), true);
    await shell.close();
    console.log('PASS hero visible without client JavaScript');
    for (const width of [390, 1440]) {
      const results = [];
      for (const base of bases) {
        const context = await browser.newContext({viewport: {width, height: 900}});
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', e => errors.push(e.message));
        // Identical first-party isolation on both builds; no live lead/ad events.
        await page.route('**/*', r => {
          const u = new URL(r.request().url());
          return u.origin !== base || u.pathname.startsWith('/api/') ? r.abort() : r.continue();
        });
        const cdp = await context.newCDPSession(page);
        await cdp.send('Network.enable');
        await cdp.send('Network.emulateNetworkConditions', {offline:false, latency:150, downloadThroughput:200000, uploadThroughput:75000});
        await cdp.send('Emulation.setCPUThrottlingRate', {rate:4});
        await page.addInitScript(() => {
          window.__lcp = 0;
          new PerformanceObserver(l => l.getEntries().forEach(e => window.__lcp = e.startTime)).observe({type:'largest-contentful-paint',buffered:true});
        });
        await page.goto(base + '/trademark-registration');
        await page.waitForTimeout(4000);
        const state = await page.evaluate(() => ({
          lcp: window.__lcp,
          fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
          bytes: performance.getEntriesByType('resource').filter(e => e.name.includes('/_next/') && e.name.includes('.js')).reduce((s,e) => s + e.encodedBodySize, 0),
          text: document.querySelector('main').innerText,
          hero: [...document.querySelectorAll('[data-customizer-old-section="hero"] h1,[data-customizer-old-section="hero"] p')].map(e => {
            const s = getComputedStyle(e), r = e.getBoundingClientRect();
            return {text:e.textContent,font:s.fontFamily,size:s.fontSize,color:s.color,width:r.width,height:r.height};
          }),
          overflow: document.documentElement.scrollWidth > innerWidth,
        }));
        assert.equal(state.overflow, false);
        await page.screenshot({path:`/private/tmp/lp-render-${width}-${base.endsWith('3011')?'after':'before'}.png`,animations:'disabled'});
        await cdp.send('Network.emulateNetworkConditions', {offline:false, latency:0, downloadThroughput:-1, uploadThroughput:-1});
        await cdp.send('Emulation.setCPUThrottlingRate', {rate:1});
        await page.getByRole('button', {name:'Definitions',exact:true}).click();
        await page.getByRole('button', {name:'Definitions',exact:true}).getAttribute('aria-expanded').then(v => assert.equal(v,'true'));
        await page.locator('[data-customizer-old-section="testimonials"]').scrollIntoViewIfNeeded();
        await page.locator('.swiper-initialized').waitFor();
        const before = await page.locator('.swiper').evaluate(e => e.swiper.activeIndex);
        await page.getByRole('button', {name:'Next review',exact:true}).click();
        await page.waitForTimeout(400);
        assert.notEqual(await page.locator('.swiper').evaluate(e => e.swiper.activeIndex), before);
        await page.getByRole('link', {name:'Choose Business Plus',exact:true}).filter({visible:true}).click();
        await page.waitForURL('**/trademark-register');
        assert.equal(await page.evaluate(() => sessionStorage.getItem('lto_preselected_plan')), '2');
        assert.deepEqual(errors, []);
        results.push(state);
        await context.close();
      }
      assert.deepEqual(results[0].hero,results[1].hero);
      assert.equal(results[0].text,results[1].text);
      console.log(JSON.stringify({width,results:results.map(({text,hero,...r})=>r),checks:'same content and hero styles; FAQ, reviews, package navigation pass'}));
    }
  } finally { await browser.close(); }
})().catch(e => {console.error(e);process.exitCode=1;});
