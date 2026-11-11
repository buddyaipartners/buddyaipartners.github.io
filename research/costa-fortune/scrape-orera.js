const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const apiCalls = [];
  page.on('response', async (res) => {
    const u = res.url();
    if (u.includes('/api/')) apiCalls.push(u);
  });
  const url = 'https://rera.odisha.gov.in/projects/project-details/VTJGc2RHVmtYMS9GYjZWV00vdU5GYVk1RlhyWXB0QS9NdngxMFE5d0VQRXBBdEwxTzVFYXhDTStyQXlFM09jaTlvZlBoeHlackxqN3hkZ3RnSnlERjJ6ZE45eVc1WWFxdmRnL0toZzJOOE09';
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(e => console.log('goto', e.message));
  await page.waitForTimeout(4000);
  const text = await page.evaluate(() => document.body.innerText);
  console.log('=== TEXT ===');
  console.log(text.slice(0, 8000));
  console.log('=== API ===');
  console.log([...new Set(apiCalls)].join('\n'));
  await browser.close();
})();
