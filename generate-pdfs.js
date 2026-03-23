const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');
const http = require('http');
const fs = require('fs');
const path = require('path');

const tabs = [
  { index: 0, name: '01-product-showcase' },
  { index: 1, name: '02-technical-architecture' },
  { index: 2, name: '03-revenue-pricing' },
  { index: 3, name: '04-market-growth' },
  { index: 4, name: '05-operations-transfer' },
];

const STATIC_DIR = path.resolve(__dirname, 'public');
const OUT_DIR = path.resolve(__dirname, 'public/docs');
const PORT = 9222;
const PAGE_WIDTH_PX = 1280;

// A4 dimensions in points (72 dpi)
const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const filePath = path.join(STATIC_DIR, req.url === '/' ? 'docs/index.html' : req.url);
      const ext = path.extname(filePath);
      const types = {
        '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
        '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
      };
      fs.readFile(filePath, (err, data) => {
        if (err) { res.writeHead(404); res.end(); return; }
        res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
        res.end(data);
      });
    });
    server.listen(PORT, () => resolve(server));
  });
}

(async () => {
  const server = await startServer();
  console.log(`Static server on http://localhost:${PORT}`);

  const browser = await puppeteer.launch({ headless: true });

  for (const tab of tabs) {
    console.log(`\nGenerating ${tab.name}.pdf ...`);
    const page = await browser.newPage();
    await page.setViewport({ width: PAGE_WIDTH_PX, height: 900, deviceScaleFactor: 2 });

    await page.goto(`http://localhost:${PORT}/`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait for marked.js rendering
    await page.waitForFunction(() => {
      const doc0 = document.getElementById('doc-0');
      return doc0 && doc0.innerHTML.length > 100;
    }, { timeout: 10000 });

    // Switch tab
    await page.evaluate((i) => showTab(i), tab.index);
    await new Promise(r => setTimeout(r, 500));

    // Wait for images in this tab
    await page.evaluate(async (tabIndex) => {
      const container = document.getElementById('tab-' + tabIndex);
      const images = container.querySelectorAll('img');
      await Promise.all(
        Array.from(images).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise(resolve => { img.onload = resolve; img.onerror = resolve; });
        })
      );
    }, tab.index);

    // Wait for fonts
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 500));

    // Clean up UI for screenshot: hide nav/footer/scroll, show only this tab
    await page.evaluate((tabIndex) => {
      document.querySelector('.tab-nav').style.display = 'none';
      const st = document.querySelector('.scroll-top');
      if (st) st.style.display = 'none';
      const footer = document.querySelector('.footer');
      if (footer) footer.style.display = 'none';
      const heroLinks = document.querySelector('.hero .links');
      if (heroLinks) heroLinks.style.display = 'none';

      document.querySelectorAll('.tab-content').forEach((el, i) => {
        el.style.display = i === tabIndex ? 'block' : 'none';
      });
    }, tab.index);

    // Take full-page screenshot as PNG
    const screenshotBuffer = await page.screenshot({
      fullPage: true,
      type: 'png',
    });

    console.log(`  Screenshot: ${(screenshotBuffer.length / 1024 / 1024).toFixed(1)} MB`);

    // Convert screenshot to multi-page A4 PDF
    const pdfDoc = await PDFDocument.create();
    const pngImage = await pdfDoc.embedPng(screenshotBuffer);

    const imgWidth = pngImage.width;
    const imgHeight = pngImage.height;

    // Scale image width to fit A4 width with margins
    const margin = 20; // points
    const usableWidth = A4_WIDTH - margin * 2;
    const scale = usableWidth / imgWidth;
    const scaledHeight = imgHeight * scale;

    // Split into pages
    const usableHeight = A4_HEIGHT - margin * 2;
    const totalPages = Math.ceil(scaledHeight / usableHeight);

    for (let p = 0; p < totalPages; p++) {
      const pdfPage = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);

      // Calculate which slice of the image to show on this page
      // We draw the full image offset upward for each page
      const yOffset = p * usableHeight;

      pdfPage.drawImage(pngImage, {
        x: margin,
        y: A4_HEIGHT - margin - scaledHeight + yOffset,
        width: usableWidth,
        height: scaledHeight,
      });

      // White rectangles to mask overflow at top and bottom margins
      const { rgb } = require('pdf-lib');
      // Top mask
      pdfPage.drawRectangle({
        x: 0, y: A4_HEIGHT - margin, width: A4_WIDTH, height: margin,
        color: rgb(246 / 255, 247 / 255, 250 / 255), // match --bg color
      });
      // Bottom mask
      pdfPage.drawRectangle({
        x: 0, y: 0, width: A4_WIDTH, height: margin,
        color: rgb(246 / 255, 247 / 255, 250 / 255),
      });
    }

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(path.join(OUT_DIR, `${tab.name}.pdf`), pdfBytes);

    await page.close();
    console.log(`  ✓ ${tab.name}.pdf (${totalPages} pages)`);
  }

  await browser.close();
  server.close();
  console.log('\nDone!');
})();
