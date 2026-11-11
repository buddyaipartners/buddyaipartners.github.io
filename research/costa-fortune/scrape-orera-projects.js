const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const apiCalls = [];
  page.on('response', async (res) => {
    const u=res.url(); if(u.includes('/api/')) {
      apiCalls.push(res.request().method()+' '+u);
      if(res.request().method()==='POST') { try { const pd=res.request().postData(); if(pd) console.log('POSTDATA', u, pd.slice(0,300)); } catch(e){} }
    }
  });
  await page.goto('https://rera.odisha.gov.in/projects', { waitUntil:'networkidle', timeout:60000 }).catch(e=>console.log('goto',e.message));
  await page.waitForTimeout(4000);
  console.log((await page.evaluate(()=>document.body.innerText)).slice(0,3000));
  console.log('=== API ===');
  console.log([...new Set(apiCalls)].join('\n'));
  await browser.close();
})();
