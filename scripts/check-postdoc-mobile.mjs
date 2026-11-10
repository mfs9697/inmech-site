import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

// In-CI Chromium viewport emulation, not a claim of tests on physical hardware.
const origin = 'http://127.0.0.1:4321';
const cases = [
  { name: 'iphone-se', width: 375, height: 667, scale: 2, mobile: true },
  { name: 'pixel-7', width: 412, height: 915, scale: 2.625, mobile: true },
  { name: 'ipad-mini', width: 768, height: 1024, scale: 2, mobile: true },
  { name: 'desktop-1280', width: 1280, height: 800, scale: 1, mobile: false },
];
const urls = [
  { path: '/vacancies/', label: 'uk-vacancies' },
  { path: '/en/vacancies/', label: 'en-vacancies' },
  { path: '/documents/postdoc/regulations/', label: 'regulations' },
  { path: '/documents/postdoc/resolution-164/', label: 'resolution-164' }
];
const outDir = 'artifacts/postdoc-mobile';
await fs.mkdir(outDir, { recursive: true });

const server = spawn('node_modules/.bin/astro', ['preview', '--host', '127.0.0.1', '--port', '4321'], {
  stdio: ['ignore', 'pipe', 'pipe'],
});
server.stderr.on('data', d => process.stderr.write(d.toString()));
async function ready() {
  for (let i = 0; i < 70; i++) {
    try { const r = await fetch(origin + '/vacancies/'); if (r.ok) return; } catch {}
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  throw new Error('Astro preview did not become ready');
}
let browser;
const reports = [];
try {
  await ready();
  browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  for (const size of cases) {
    const context = await browser.newContext({
      viewport: { width:size.width, height:size.height },
      deviceScaleFactor:size.scale,
      isMobile:size.mobile,
      hasTouch:size.mobile
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const target of urls) {
      const response = await page.goto(origin + target.path, { waitUntil: 'domcontentloaded', timeout: 15000 });
      assert.equal(response.status(), 200, target.path);
      await page.screenshot({ path:`${outDir}/${size.name}-${target.label}-top.png`, fullPage:false });
      const measures = await page.evaluate(() => {
        const panels = [...document.querySelectorAll('.competition-track, .postdoc-submission-panel, .legal-document')];
        return {
          width: innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          panelOverflows: panels.map(el => {
            const r = el.getBoundingClientRect();
            return {width: Math.round(r.width), left: Math.round(r.left), right: Math.round(r.right)};
          }).filter(p => p.left < -2 || p.right > innerWidth + 2),
        };
      });
      assert.equal(measures.panelOverflows.length, 0, `${size.name} ${target.path}: component overflow ${JSON.stringify(measures.panelOverflows)}`);
      assert.ok(measures.scrollWidth <= size.width + 2, `${size.name} ${target.path}: horizontal overflow ${measures.scrollWidth} > ${size.width}`);
      if (target.label.includes('vacancies')) {
        const postdoc = page.locator('.competition-track').filter({ has:page.locator('a[href="#postdoc-documents"]') });
        assert.equal(await postdoc.count(), 1, 'one active postdoc section expected');
        const supervisorHref = target.label.startsWith('en-') ? '/en/people/martynyak/' : '/people/martynyak/';
        assert.equal(await postdoc.locator(`a[href="${supervisorHref}"]`).count(), 1, 'missing clickable supervisor');
        await postdoc.scrollIntoViewIfNeeded();
        await page.screenshot({ path:`${outDir}/${size.name}-${target.label}-postdoc.png`, fullPage:false });
        const docs = page.locator('#postdoc-documents');
        assert.equal(await docs.locator('ol > li').count(), 11, 'postdoc list must contain 11 items');
        await docs.scrollIntoViewIfNeeded();
        await page.screenshot({ path:`${outDir}/${size.name}-${target.label}-documents.png`, fullPage:false });
        const link = await page.request.get(origin + supervisorHref);
        assert.equal(link.status(), 200, 'supervisor page must exist');
      } else {
        assert.ok((await page.locator('.legal-document').innerText()).length > 800, 'legal text looks empty');
      }
      assert.deepEqual(errors, [], `${size.name} ${target.path}: browser script errors`);
      reports.push({ device:size.name, path:target.path, ...measures, pageErrors:errors.length, status:'pass' });
    }
    await context.close();
  }
} finally {
  if (browser) await browser.close();
  server.kill('SIGKILL');
}
await fs.writeFile(`${outDir}/REPORT.json`, JSON.stringify(reports, null, 2));
console.log(JSON.stringify({ viewports:cases.map(x => x.name), routes:urls.map(x => x.path), checks:reports.length, result:'PASS', screenshots:'artifacts/postdoc-mobile/*.png' }, null, 2));
