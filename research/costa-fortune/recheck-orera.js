const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const url='https://rera.odisha.gov.in/projects/project-details/VTJGc2RHVmtYMTlsZFFJMGtKRDM2UStMdFUwek45Tk13aWs3NFN3OXVZbVBubE9OK1pHZ3lraVNLNHNlUUxKczlyQkl3cEpLNk1POTNFZlVwQjErTXhmZGt3bkYvVW50eDNVdnFtZkpISEU9';
  await page.goto(url,{waitUntil:'networkidle',timeout:60000});
  await page.waitForTimeout(3000);
  for (const tab of ['Booking Status','Project Milestone']) {
    const el = page.getByText(tab,{exact:true}).first();
    if(await el.count()){ await el.click(); await page.waitForTimeout(3000);
      const t = await page.evaluate(()=>document.body.innerText);
      fs.writeFileSync('knr-reaudit/orera-'+tab.toLowerCase().replace(/ /g,'-')+'-2026-11-04.txt', t);
      console.log('saved',tab, t.length);
    }
  }
  await browser.close();
})();
