const { chromium } = require('playwright');
const fs=require('fs');
const urls = {
 '99acres':'https://www.99acres.com/sai-costa-furtune-crestview-kantabada-bhubaneswar-npxid-r433299',
 'housing':'https://housing.com/buy-sai-costa-furtune-crestview-by-sai-harmony-pvt-ltd-in-kantabada-bhubaneswar-pid-347684',
 'magicbricks':'https://www.magicbricks.com/sai-costa-furtune-crestview-kantbada-bhubaneswar-pdpid-4d4235343335343939'
};
(async()=>{
 const browser=await chromium.launch({args:['--disable-blink-features=AutomationControlled']});
 for (const [name,url] of Object.entries(urls)) {
  const ctx=await browser.newContext({userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', locale:'en-IN', viewport:{width:1440,height:1000}});
  const page=await ctx.newPage();
  try{
   const resp=await page.goto(url,{waitUntil:'domcontentloaded',timeout:60000});
   await page.waitForTimeout(6000);
   const t=await page.evaluate(()=>document.body.innerText);
   fs.writeFileSync(name+'.txt',t);
   console.log('###',name,'status',resp&&resp.status(),'len',t.length);
   console.log(t.slice(0,1500).replace(/\n{2,}/g,'\n'));
  }catch(e){console.log('###',name,'ERR',e.message);}
  await ctx.close();
 }
 await browser.close();
})();
