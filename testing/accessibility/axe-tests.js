const { AxeBuilder } = require('@axe-core/playwright');
const playwright = require('playwright');
const fs = require('fs/promises');
const path = require('path');

const STICKERSHEETS_URL = 'http://localhost:5173/stickersheets';

(async () => {
  const stickersheetsDir = path.resolve(__dirname, '..', '..', 'stickersheets');
  const resultsDir = path.join(__dirname, 'results');
  const outputFile = path.join(resultsDir, 'axe-results.json');
  const directoryEntries = await fs.readdir(stickersheetsDir, { withFileTypes: true });
  const stickerSheets = directoryEntries
    .filter((entry) => entry.isFile() && entry.name !== 'index.html')
    .map((entry) => entry.name);
  const results = [];

  if (stickerSheets.length === 0) {
    console.log('No stickersheets found to analyze.');
    return;
  }

  await fs.mkdir(resultsDir, { recursive: true });

  const browser = await playwright.chromium.launch({ headless: true });

  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    for (const stickerSheet of stickerSheets) {
      const pageUrl = `${STICKERSHEETS_URL}/${stickerSheet}`;

      try {
        await page.goto(pageUrl, { waitUntil: 'networkidle' });
        await page.addStyleTag({
          content: 'html, body { background: #ffffff  !important; }'
        });
        const axeResults = await new AxeBuilder({ page }).analyze();
        let component = stickerSheet.replace('.html', '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
        results.push({
          stickerSheet,
          component,
          pageUrl,
          results: axeResults,
        });

        console.log(`Collected axe results for ${stickerSheet}`);
      } catch (error) {
        results.push({
          stickerSheet,
          pageUrl,
          error: error.message,
        });
        console.error(`Error analyzing accessibility for ${stickerSheet}`, error);
      }
    }

    await fs.writeFile(outputFile, JSON.stringify(results, null, 2), 'utf8');
    console.log(`Saved combined axe results to ${outputFile}`);

    await context.close();
  } finally {
    await browser.close();
  }
})();