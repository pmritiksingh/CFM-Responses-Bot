import { chromium } from 'playwright';

export default async function handler(req, res) {
  const { url, count = 10 } = req.query;
  if (!url) return res.status(400).send('Missing URL parameter');

  const total = Number(count) || 1;
  const browser = await chromium.launch({ headless: true });

  let ok = 0, fail = 0;

  for (let i = 0; i < total; i++) {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    try {
      await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });

      // Fill common fields quickly
      const textInputs = page.locator('input[type="text"]');
      if (await textInputs.count()) await textInputs.fill('Test');

      const numberInputs = page.locator('input[type="number"]');
      if (await numberInputs.count()) await numberInputs.fill('1');

      const textareas = page.locator('textarea');
      if (await textareas.count()) await textareas.fill('Test');

      const radios = page.locator('input[type="radio"]');
      if (await radios.count()) await radios.first().check({ force: true });

      const checks = page.locator('input[type="checkbox"]');
      if (await checks.count()) await checks.first().check({ force: true });

      // Try common submit buttons
      const submit = page.locator('button[type="submit"], input[type="submit"], button:has-text("Submit"), button:has-text("Send"), button:has-text("Finish")');
      if (await submit.count()) {
        await submit.first().click({ force: true });
      } else {
        // Try pressing Enter as fallback
        await page.keyboard.press('Enter');
      }

      ok++;
    } catch (e) {
      console.log(`[${i+1}/${total}] Error:`, e.message);
      fail++;
    } finally {
      await ctx.close();
    }
  }

  await browser.close();
  res.send(`Completed. OK: ${ok}, Failed: ${fail}`);
}
