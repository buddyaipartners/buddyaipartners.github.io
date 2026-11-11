const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const apiCalls = [];
  page.on('response', (res) => { const u=res.url(); if(u.includes('/api/')) apiCalls.push(res.request().method()+' '+u); });
  await page.goto('https://rera.odisha.gov.in/search-result?search=MP%2F19%2F2024%2F01244', { waitUntil:'networkidle', timeout:60000 }).catch(e=>console.log('goto',e.message));
  await page.waitForTimeout(5000);
  console.log('=== TEXT ===');
  console.log((await page.evaluate(()=>document.body.innerText)).slice(0,5000));
  console.log('=== LINKS ===');
  const links = await page.evaluate(()=>[...document.querySelectorAll('a')].map(a=>a.href).filter(h=>h.includes('project')));
  console.log([...new Set(links)].join('\n'));
  console.log('=== API ===');
  console.log([...new Set(apiCalls)].join('\n'));
  await browser.close();
})();
