const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const url='https://rera.odisha.gov.in/projects/project-details/VTJGc2RHVmtYMTlsZFFJMGtKRDM2UStMdFUwek45Tk13aWs3NFN3OXVZbVBubE9OK1pHZ3lraVNLNHNlUUxKczlyQkl3cEpLNk1POTNFZlVwQjErTXhmZGt3bkYvVW50eDNVdnFtZkpISEU9';
  await page.goto(url,{waitUntil:'networkidle',timeout:60000}).catch(e=>console.log('goto',e.message));
  await page.waitForTimeout(3000);
  for (const tab of ['Promoter Details','Booking Status','Project Milestone','Documents','QPR Details','AAC Details']) {
    try {
      const el = page.getByText(tab, { exact: true }).first();
      if (await el.count()) { await el.click(); await page.waitForTimeout(2500);
        const t = await page.evaluate(()=>document.body.innerText);
        console.log('\n\n########## '+tab+' ##########\n'+t.slice(0,5000));
      } else console.log('NOT FOUND '+tab);
    } catch(e){ console.log('ERR '+tab+' '+e.message); }
  }
  await browser.close();
})();
