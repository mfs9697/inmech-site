import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(readFileSync(path.join(root, 'src/data/elections/2026/documents.json'), 'utf8'));
const routes = [
  ['director-election/index.html', 'uk', false, '/director-election/', '/en/director-election/'],
  ['en/director-election/index.html', 'en', false, '/en/director-election/', '/director-election/'],
  ['director-election/2026/index.html', 'uk', true, '/director-election/2026/', '/en/director-election/2026/'],
  ['en/director-election/2026/index.html', 'en', true, '/en/director-election/2026/', '/director-election/2026/']
];

function check() {
  for (const [relative, lang, year, canonical, alternate] of routes) {
    const filePath = path.join(root, 'dist', relative);
    assert(existsSync(filePath), 'Missing generated election page: ' + relative);
    const html = readFileSync(filePath, 'utf8');
    assert(html.includes('<html lang="' + lang + '"'), 'Wrong page language: ' + relative);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, 'Exactly one H1 required: ' + relative);
    assert(html.includes('rel="canonical" href="https://inmech.kyiv.ua' + canonical + '"'), 'Missing canonical: ' + relative);
    assert(html.includes('hreflang="uk"') && html.includes('hreflang="en"'), 'Missing bilingual alternates: ' + relative);
    assert(html.includes('https://inmech.kyiv.ua' + alternate), 'Missing counterpart: ' + relative);
    if (year) {
      assert(html.includes('id="election-documents"') && html.includes('id="election-results"'), 'Missing records/results: ' + relative);
      for (const doc of manifest) {
        if (doc.sourceStatus === 'preserved') {
          assert(html.includes('href="' + doc.path + '"'), 'Missing original: ' + doc.id + ' in ' + relative);
        } else {
          assert(!('path' in doc), 'Missing source gained a fabricated local path');
          assert(html.includes(lang === 'en' ? 'Document unavailable' : 'Документ недоступний'), 'Missing extract notice: ' + relative);
          assert(!html.includes('href="' + doc.sources[0].url + '"'), 'Broken extract offered as download: ' + relative);
        }
      }
      assert(html.includes('92') && html.includes('79'), 'Missing recorded vote numbers: ' + relative);
      assert(html.includes('staff-meeting-protocol-legacy-main.pdf'), 'Legacy protocol variant absent: ' + relative);
    } else {
      assert(html.includes('href="' + canonical + '2026/"'), 'Missing year navigation: ' + relative);
    }
  }
  console.log('Four bilingual election archive pages passed route, alternate, document and source-gap checks.');
}

try {
  check();
} catch (error) {
  console.error('Election archive rendered check failed: ' + error.message);
  process.exitCode = 1;
}
