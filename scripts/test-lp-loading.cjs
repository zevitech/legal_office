const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.LP_BASE || 'http://127.0.0.1:3006';
const updated = process.env.LP_UPDATED || 'http://127.0.0.1:3007';

(async () => {
  const browser = await chromium.launch({headless:true, executablePath:process.env.CHROME_PATH});
  try {
    for (const width of [390,1440]) {
      const results=[];
      for (const [label,url] of [['before',base],['after',updated]]) {
        const context=await browser.newContext({viewport:{width,height:900}});
        const page=await context.newPage();
        const errors=[];page.on('pageerror',e=>errors.push(e.message));
        await page.route('**/*',route=>{
          const u=new URL(route.request().url());
          // Isolate first-party work. No advertising events or real leads leave this test.
          if(u.origin!==url || u.pathname.startsWith('/api/')) return route.abort();
          return route.continue();
        });
        await page.addInitScript(()=>{
          window.__lpLcp=0;
          new PerformanceObserver(list=>{for(const e of list.getEntries())window.__lpLcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
        });
        await page.goto(`${url}/trademark-registration`);
        await page.waitForTimeout(3000);
        const initial=await page.evaluate(()=>({
          jsBytes:performance.getEntriesByType('resource').filter(e=>e.name.includes('/_next/')&&e.name.includes('.js')).reduce((s,e)=>s+e.encodedBodySize,0),
          jsRequests:performance.getEntriesByType('resource').filter(e=>e.name.includes('/_next/')&&e.name.includes('.js')).length,
          lcpMs:Math.round(window.__lpLcp),sliderMounted:!!document.querySelector('.swiper'),
          overflow:document.documentElement.scrollWidth>innerWidth,
          headings:[...document.querySelectorAll('h1,h2')].map(e=>e.textContent),
          sections:[...document.querySelectorAll('[data-customizer-old-section]')].map(e=>e.getAttribute('data-customizer-old-section')),
        }));
        await page.screenshot({path:`/private/tmp/lp-${label}-${width}.png`,animations:'disabled'});
        assert.equal(initial.overflow,false);
        if(label==='after')assert.equal(initial.sliderMounted,false);
        await page.locator('[data-customizer-old-section="testimonials"]').scrollIntoViewIfNeeded();
        await page.locator('.swiper-initialized').waitFor();
        await page.waitForTimeout(700);
        const sliderText=await page.locator('.swiper').innerText();
        const slider=page.locator('.swiper');
        const indexBefore=await slider.evaluate(e=>e.swiper.activeIndex);
        await slider.locator('..').locator('button').nth(1).click();
        await page.waitForTimeout(400);
        const indexAfter=await slider.evaluate(e=>e.swiper.activeIndex);
        console.log(JSON.stringify({label,width,indexBefore,indexAfter,sliderInfo:await slider.evaluate(e=>({count:e.swiper.slides.length,enabled:e.swiper.enabled,locked:e.swiper.isLocked}))}));
        if(label==='after')assert.notEqual(indexBefore,indexAfter);
        assert.deepEqual(errors,[]);
        results.push({label,width,...initial,sliderText});
        await context.close();
      }
      assert.deepEqual(results[0].headings,results[1].headings);
      assert.deepEqual(results[0].sections,results[1].sections);
      assert.equal(results[0].sliderText,results[1].sliderText);
      assert.ok(results[1].jsBytes < results[0].jsBytes);
      console.log(JSON.stringify(results.map(({headings,sections,sliderText,...r})=>r)));
      console.log(`PASS ${width}px: headings, sections, reviews preserved; slider loads on approach and navigation works`);
    }
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
