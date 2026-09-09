const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 try{for(const width of [390,1440]){
  const results=[];
  for(const base of ['http://127.0.0.1:3007','http://127.0.0.1:3008']){
   const context=await browser.newContext({viewport:{width,height:900}});const page=await context.newPage();
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.route('**/*',r=>{const u=new URL(r.request().url());return u.origin!==base||u.pathname.startsWith('/api/')?r.abort():r.continue()});
   const cdp=await context.newCDPSession(page);await cdp.send('Network.enable');
   await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:75000});
   await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
   await page.addInitScript(()=>{window.lcp=0;new PerformanceObserver(l=>l.getEntries().forEach(e=>window.lcp=e.startTime)).observe({type:'largest-contentful-paint',buffered:true})});
   const res=await page.goto(base+'/trademark-registration');assert.equal(res.status(),200);await page.waitForTimeout(4500);
   const state=await page.evaluate(()=>({lcp:window.lcp,fcp:performance.getEntriesByName('first-contentful-paint')[0]?.startTime,cssRequests:performance.getEntriesByType('resource').filter(e=>e.name.includes('.css')).length,overflow:document.documentElement.scrollWidth>innerWidth,headings:[...document.querySelectorAll('h1,h2')].map(e=>e.textContent),hero:[...document.querySelectorAll('[data-customizer-old-section="hero"] h1,[data-customizer-old-section="hero"] p')].map(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return{text:e.textContent,font:s.fontFamily,size:s.fontSize,color:s.color,width:r.width,height:r.height}})}));
   state.fontPreloads=await page.locator('link[rel="preload"][as="font"]').count();
   state.fontBytes=await page.evaluate(()=>performance.getEntriesByType('resource').filter(e=>e.name.includes('.woff2')).reduce((sum,e)=>sum+e.encodedBodySize,0));
   if(base.endsWith('3008'))assert.equal(state.fontPreloads,4);
   await page.screenshot({path:`/private/tmp/mobile-render-${base.endsWith('3008')?'after':'before'}-${width}.png`,animations:'disabled'});
   assert.equal(state.overflow,false);assert.deepEqual(errors,[]);results.push(state);
   await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1});
   await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});
   await page.locator('[data-customizer-old-section="testimonials"]').scrollIntoViewIfNeeded();await page.locator('.swiper-initialized').waitFor();
   await page.getByRole('button',{name:'Next review',exact:true}).click();
   await page.getByRole('button',{name:'Start Registration',exact:true}).click();await page.waitForURL('**/trademark-register');
   await page.getByRole('button',{name:/Not yet/}).click();await page.getByLabel('Business or product name',{exact:true}).fill('Mobile Test');
   await page.getByRole('button',{name:'Continue to owner details',exact:true}).click();await page.getByLabel('First Name',{exact:true}).fill('Test');
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.deepEqual(errors,[]);
   await context.close();
  }
  assert.deepEqual(results[0].headings,results[1].headings);assert.deepEqual(results[0].hero,results[1].hero);
  assert.ok(results[1].cssRequests<=results[0].cssRequests);
  assert.ok(results[1].fontBytes<results[0].fontBytes);
  console.log(JSON.stringify({width,results:results.map(({headings,hero,...rest})=>rest),visualAndNavigation:'passed'}));
 }}finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
