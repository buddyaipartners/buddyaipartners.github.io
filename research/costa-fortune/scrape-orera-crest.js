const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const url='https://rera.odisha.gov.in/projects/project-details/VTJGc2RHVmtYMTlsZFFJMGtKRDM2UStMdFUwek45Tk13aWs3NFN3OXVZbVBubE9OK1pHZ3lraVNLNHNlUUxKczlyQkl3cEpLNk1POTNFZlVwQjErTXhmZGt3bkYvVW50eDNVdnFtZkpISEU9';
  await page.goto(url,{waitUntil:'networkidle',timeout:60000}).catch(e=>console.log('goto',e.message));
  await page.waitForTimeout(4000);
  console.log((await page.evaluate(()=>document.body.innerText)).slice(0,12000));
  await browser.close();
})();
