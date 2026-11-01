const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const path = require('path');
  const filePath = path.resolve(__dirname, '../dist/index.html');
  await page.goto(`file://${filePath}`);
  
  const results = await new AxeBuilder({ page }).analyze();
  console.log(`\n=== INITIAL AUDIT (Entry Portal) ===`);
  console.log(`Violations: ${results.violations.length}`);
  results.violations.forEach((v, i) => {
    console.log(`\n[${i+1}] ${v.id} (${v.impact}): ${v.help}`);
    v.nodes.slice(0, 3).forEach(n => {
      console.log(`    Target: ${n.target.join(' ')}`);
      console.log(`    Failure: ${n.failureSummary}`);
    });
  });

  // Also dismiss portal and test workspace
  const cta = page.locator('#digital-office-entry button');
  if (await cta.isVisible().catch(() => false)) {
    await cta.click();
    await page.waitForTimeout(500);
    const resultsAfter = await new AxeBuilder({ page }).analyze();
    console.log(`\n=== WORKSPACE AUDIT (Full Home Page) ===`);
    console.log(`Violations: ${resultsAfter.violations.length}`);
    resultsAfter.violations.forEach((v, i) => {
      console.log(`\n[${i+1}] ${v.id} (${v.impact}): ${v.help}`);
      v.nodes.slice(0, 3).forEach(n => {
        console.log(`    Target: ${n.target.join(' ')}`);
        console.log(`    Failure: ${n.failureSummary}`);
      });
    });
  }

  await browser.close();
})();
