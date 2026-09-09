const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
  try {
    for (const width of [390,1440]) {
      const page=await browser.newPage({viewport:{width,height:900}});
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      await page.route('**/*',route=>{
        const url=new URL(route.request().url());
        if(url.hostname!=='127.0.0.1')return route.abort();
        if(url.pathname==='/api/save-data')return route.fulfill({json:{success:true}});
        if(url.pathname.startsWith('/api/'))return route.abort();
        return route.continue();
      });
      await page.goto((process.env.FORM_TEST_BASE || 'http://127.0.0.1:3006')+'/trademark-register');
      await page.getByRole('button',{name:/Not yet/}).click();
      await page.getByLabel('Business or product name',{exact:true}).fill('Performance Test');
      await page.getByRole('button',{name:'Continue to owner details',exact:true}).click();
      await page.getByLabel('First Name',{exact:true}).fill('Test');
      await page.getByLabel('Last Name',{exact:true}).fill('Owner');
      await page.getByPlaceholder('Start typing your address').fill('123 Test Street');
      await page.getByLabel('City',{exact:true}).fill('Los Angeles');
      await page.locator('select').selectOption({label:'California'});
      await page.getByLabel('Phone Number',{exact:true}).fill('2025550123');
      await page.getByLabel('Zip Code',{exact:true}).fill('90001');
      await page.getByLabel('Email Address',{exact:true}).fill('test@example.com');
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
      const start=Date.now();
      await page.getByRole('button',{name:'Continue to classification',exact:true}).click();
      await page.waitForURL('**/step-2');
      const elapsed=Date.now()-start;
      const leadEvents=await page.evaluate(()=>(window.dataLayer||[]).filter(x=>x.event==='lto_qualified_lead').length);
      assert.equal(leadEvents,1);
      await page.getByLabel('Describe your products or services').fill('We sell clothing');
      await page.getByRole('button',{name:'Continue to packages',exact:true}).click();
      await page.waitForURL('**/step-3');
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
      await page.getByRole('button',{name:/^Continue/}).click();
      await page.waitForURL('**/payment');
      const paymentUrl=page.url();
      await page.locator('input[name="first_name"]').fill('Navigation');
      await page.locator('header').getByText('Legal Trademark Office',{exact:false}).click();
      assert.equal(page.url(),paymentUrl);
      const policyLinks=page.locator('a[href^="/legal/"]');
      assert.equal(await policyLinks.count(),6);
      for(let i=0;i<6;i++){
        const link=policyLinks.nth(i);
        assert.equal(await link.getAttribute('target'),'_blank');
        const popupPromise=page.waitForEvent('popup');
        await link.click();
        const popup=await popupPromise;
        await popup.waitForLoadState('domcontentloaded');
        assert.match(popup.url(),/\/legal\//);
        await popup.close();
        assert.equal(page.url(),paymentUrl);
        assert.equal(await page.locator('input[name="first_name"]').inputValue(),'Navigation');
      }
      assert.equal(await page.evaluate(()=>(window.dataLayer||[]).filter(x=>x.event==='lto_purchase').length),0);
      assert.deepEqual(errors,[]);
      console.log(JSON.stringify({width,ownerNavigationMs:elapsed,leadEvents,overflow:false,errors}));
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
