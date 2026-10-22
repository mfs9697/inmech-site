import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { transform } from 'esbuild';

const script = fs.readFileSync('src/scripts/trust-box.ts', 'utf8');
const scriptOutput = await transform(script, { loader: 'ts', format: 'iife', target: 'es2022' });

const pages = [
  { locale: 'uk', file: 'dist/trust-box/index.html', source: 'src/pages/trust-box.astro', subject: 'Скринька довіри' },
  { locale: 'en', file: 'dist/en/trust-box/index.html', source: 'src/pages/en/trust-box.astro', subject: 'Trust box' }
];

function testRenderedNoJsFallback(page) {
  const html = fs.readFileSync(page.file, 'utf8');
  const source = fs.readFileSync(page.source, 'utf8');
  const panel = html.match(/<article\b[^>]*\btrust-form-panel\b[^>]*>([\s\S]*?)<\/article>/i)?.[1];
  assert(panel, page.locale + ': Trust Box panel is missing');

  // A native form has an unsafe default GET fallback if its JS submit handler
  // fails. There must be no form transport or serializable message field.
  assert(!/<form\b|<\/form\s*>/i.test(panel), page.locale + ': native form could GET-submit the appeal');
  assert(!/\bname=["']message["']/i.test(panel), page.locale + ': appeal text must not become a URL field');
  assert(/<textarea\b[^>]*id="trustMessage"/i.test(panel), page.locale + ': labeled textarea is missing');
  assert(/<label\b[^>]*for="trustMessage"/i.test(panel), page.locale + ': textarea label is missing');
  assert(/aria-describedby="trustComposerNote"/i.test(panel), page.locale + ': composer explanation is missing');
  assert(/id="trustComposer"[^>]*data-email="[^"]+@[^"]+"/i.test(panel), page.locale + ': email data is missing');
  assert(/id="trustComposer"[^>]*data-subject="/i.test(panel), page.locale + ': subject data is missing');

  const button = panel.match(/<button\b[^>]*id="trustPrepareButton"[^>]*>/i)?.[0];
  assert(button, page.locale + ': composer button missing');
  assert(/\btype="button"/i.test(button), page.locale + ': must not create a submit button');
  assert(/\bhidden(?:\s|=|>)/i.test(button), page.locale + ': JS-dependent button must start hidden');
  assert(/<noscript\b/i.test(panel), page.locale + ': explicit no-JavaScript guidance missing');
  assert(/<a\b[^>]*href="mailto:[^"]+"/i.test(panel), page.locale + ': direct email fallback missing');
  assert(/href="mailto:[^"]*subject=/.test(panel), page.locale + ': fallback needs a subject');
  assert(!/\?message=|[?&]message=/i.test(panel), page.locale + ': message appears in an HTTP query');

  assert(/\.trust-form-actions button\[hidden\]\s*\{[^}]*display:\s*none\s*!important/s.test(source),
    page.locale + ': CSS must keep the composer button hidden when JS is disabled');
  assert(/import\s+['"][^'"]*scripts\/trust-box\.ts['"]/.test(source),
    page.locale + ': shared composer script not included');
}

class FakeElement {
  constructor(dataset = {}) {
    this.dataset = dataset;
    this.hidden = true;
    this.listeners = new Map();
  }
  addEventListener(type, listener) { this.listeners.set(type, listener); }
  click() { this.listeners.get('click')?.(); }
}
class FakeTextarea extends FakeElement {
  constructor(value) { super(); this.value = value; }
}
class FakeButton extends FakeElement {}

function testComposer(page, configuration = {}) {
  const composer = new FakeElement(configuration.noMetadata ? {} : {
    email: 'inst_mech@inmech.kyiv.ua',
    subject: page.subject
  });
  const textarea = new FakeTextarea('  Synthetic test: line 1 &?= #\nSecond line  ');
  const button = new FakeButton();
  const controls = new Map([
    ['trustComposer', composer],
    ['trustMessage', textarea],
    ['trustPrepareButton', button]
  ]);
  if (configuration.noTextarea) controls.delete('trustMessage');
  const document = { getElementById(id) { return controls.get(id) ?? null; } };
  const window = { location: { href: page.locale === 'uk' ? 'https://inmech.kyiv.ua/trust-box/' : 'https://inmech.kyiv.ua/en/trust-box/' } };
  const before = window.location.href;

  // With JS unavailable, this script does not execute. The hidden button
  // remains inert and the link in the static HTML is the only email action.
  assert.equal(button.hidden, true);
  assert.equal(window.location.href, before);

  if (!configuration.noJs) {
    vm.runInNewContext(scriptOutput.code, {
      document,
      window,
      HTMLElement: FakeElement,
      HTMLTextAreaElement: FakeTextarea,
      HTMLButtonElement: FakeButton
    }, { timeout: 1000, filename: 'src/scripts/trust-box.ts' });
  }
  if (configuration.noJs || configuration.noTextarea || configuration.noMetadata) {
    assert.equal(button.hidden, true, 'Unsafe/unavailable script must not expose button');
    assert.equal(window.location.href, before, 'No website navigation is allowed without a working click handler');
    return;
  }

  assert.equal(button.hidden, false, 'Working handler must enable the composer button');
  button.click();
  assert(window.location.href.startsWith('mailto:inst_mech@inmech.kyiv.ua?'), 'Click should open only a mailto URI');
  const uri = new URL(window.location.href);
  assert.equal(uri.searchParams.get('subject'), page.subject);
  assert.equal(uri.searchParams.get('body'), 'Synthetic test: line 1 &?= #\nSecond line');
  assert(!window.location.href.includes('https://') && !window.location.href.includes('?message='),
    'Sensitive body must never be attached to the website URL');
}

try {
  for (const page of pages) {
    testRenderedNoJsFallback(page);
    testComposer(page);
    testComposer(page, { noJs: true });
    testComposer(page, { noTextarea: true });
    testComposer(page, { noMetadata: true });
  }
  console.log('Trust Box no-GET regression passed: both languages, no native form submission, noscript mailto fallback, hidden JS-only control, encoded mail draft, safe failure states.');
} catch (error) {
  console.error('Trust Box no-GET regression failed:', error);
  process.exitCode = 1;
}
