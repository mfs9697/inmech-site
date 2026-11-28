import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';
import { activeVacancyAnnouncements } from '../src/data/vacancies.ts';
import { countOpenVacancies, openVacancyLabel, vacancyWindows } from '../src/utils/openVacancies.ts';

const order = activeVacancyAnnouncements.find(({ orderNumber }) => orderNumber === '141/к');
const orderPdf = order?.documents[0].href;
const windows = vacancyWindows(activeVacancyAnnouncements);
const previewDate = order ? new Date(order.publicationDate + 'T12:00:00Z') : new Date();
const afterAllDeadlines = new Date(windows.reduce((latest, window) =>
  latest > window.deadlineDate ? latest : window.deadlineDate, '2000-01-01') + 'T23:00:00Z');

// In-CI Chromium viewport emulation, not a claim of tests on physical hardware.
const origin = 'http://127.0.0.1:4321';
const cases = [
  { name: 'iphone-se', width: 375, height: 667, scale: 2, mobile: true },
  { name: 'pixel-7', width: 412, height: 915, scale: 2.625, mobile: true },
  { name: 'ipad-mini', width: 768, height: 1024, scale: 2, mobile: true },
  { name: 'desktop-1280', width: 1280, height: 800, scale: 1, mobile: false },
];
const urls = [
  { path: '/', label: 'uk-home', locale: 'uk', vacancies: '/vacancies/' },
  { path: '/en/', label: 'en-home', locale: 'en', vacancies: '/en/vacancies/' },
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
  browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox'],
    ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : existsSync('/usr/bin/google-chrome') || existsSync('/usr/bin/google-chrome-stable') ? { channel: 'chrome' } : {})
  });
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
      console.log('Checking', size.name, target.path);
      await page.clock.setFixedTime(previewDate);
      const response = await page.goto(origin + target.path, { waitUntil: 'domcontentloaded', timeout: 15000 });
      assert.equal(response.status(), 200, target.path);
      if (target.locale) {
        const button = page.locator(`.hero-image-actions a[href="${target.vacancies}"]`);
        const badge = button.locator('.vacancy-badge');
        const expected = openVacancyLabel(countOpenVacancies(windows, previewDate), target.locale);
        if (expected) {
          await badge.waitFor({ state: 'visible' });
          assert.equal(await badge.innerText(), expected);
          await button.focus();
          assert.ok(await button.evaluate((el) => el === document.activeElement), 'vacancies link must be focusable');
          await button.screenshot({ path: `${outDir}/${size.name}-${target.label}-indicator.png` });
          await button.evaluate((el) => el.blur());
        } else {
          assert.equal(await badge.isVisible(), false);
        }
      }
      await page.screenshot({ timeout: 15000, path:`${outDir}/${size.name}-${target.label}-top.png`, fullPage:false });
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
      if (target.locale) {
        // Keep the same built page open and simulate returning to it after expiration.
        await page.clock.setFixedTime(afterAllDeadlines);
        await page.evaluate(() => window.dispatchEvent(new Event('pageshow')));
        const button = page.locator(`.hero-image-actions a[href="${target.vacancies}"]`);
        assert.equal(await button.locator('.vacancy-badge').isVisible(), false);
        assert.equal((await button.innerText()).trim(), target.locale === 'uk' ? 'Вакансії' : 'Vacancies');
      } else if (target.label.includes('vacancies')) {
        if (orderPdf) {
          const card = page.locator('.active-vacancy-card').filter({
            has: page.locator(`a[href="${orderPdf}"]`)
          });
          assert.equal(await card.count(), 1, 'signed order must be linked from the active competition card');
          assert.equal(await card.locator('.position-list > li').count(), order.positions.length);
          const pdfResponse = await page.request.get(origin + orderPdf);
          assert.equal(pdfResponse.status(), 200, 'signed order must be downloadable');
          assert.deepEqual(await pdfResponse.body(), await fs.readFile('public' + orderPdf));
          await card.screenshot({ path: `${outDir}/${size.name}-${target.label}-competition.png` });
        }
        const postdoc = page.locator('.competition-track').filter({ has:page.locator('a[href="#postdoc-documents"]') });
        const supervisorHref = target.label.startsWith('en-') ? '/en/people/martynyak/' : '/people/martynyak/';
        const activeCount = await postdoc.count();
        if (activeCount === 1) {
          assert.equal(await postdoc.locator(`a[href="${supervisorHref}"]`).count(), 1, 'missing clickable supervisor');
          await postdoc.scrollIntoViewIfNeeded();
        } else {
          assert.equal(activeCount, 0, 'more than one active postdoc section');
          const archived = page.locator('.vacancy-card').filter({
            has: page.locator('a[href$="/2026-10-01-competition-19/order-results.pdf"]')
          });
          assert.equal(await archived.count(), 1, 'archived postdoctoral competition is missing');
          assert.equal(await archived.locator('.document-list a').count(), 3, 'archive must link three signed competition orders');
          await archived.scrollIntoViewIfNeeded();
        }
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
