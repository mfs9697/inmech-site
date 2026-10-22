import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(readFileSync(path.join(root, 'src/data/elections/2026/documents.json'), 'utf8'));
const current = manifest.find(d => d.id === 'development-strategy-2026-2030');
const previous = '/documents/institute/strategy/development-strategy-2021-2025.pdf';

try {
  assert(current?.sourceStatus === 'preserved', 'Approved 2026–2030 strategy not registered');
  const file = path.join(root, 'public', current.path.slice(1));
  assert(existsSync(file), 'Approved strategy original is missing');
  const bytes = readFileSync(file);
  assert.equal(bytes.length, current.bytes);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), current.sha256, 'Approved original was modified');
  assert(existsSync(path.join(root, 'public', previous.slice(1))), 'Previous strategy original must remain archived');

  for (const [relative, lang] of [['strategy/index.html', 'uk'], ['en/strategy/index.html', 'en']]) {
    const html = readFileSync(path.join(root, 'dist', relative), 'utf8');
    assert(html.includes('<html lang="' + lang + '"'), 'Wrong language: ' + relative);
    assert(html.includes('href="' + current.path + '"'), 'Current original PDF not linked: ' + relative);
    assert(html.includes('href="' + previous + '"'), '2021–2025 archive not linked: ' + relative);
    assert(html.includes('id="previous-strategy"'), 'Missing explicit historical context: ' + relative);
    assert(html.indexOf('href="' + current.path + '"') < html.indexOf('href="' + previous + '"'), 'Old document presented before current: ' + relative);
    assert(html.includes('2026–2030') && html.includes('2021–2025'), 'Missing period label: ' + relative);
    assert(html.includes('25 ' + (lang === 'en' ? 'December' : 'грудня') + ' 2025') || (lang === 'uk' && html.includes('25 грудня 2025')), 'Council date missing: ' + relative);
    assert(!html.includes('після їх затвердження'), 'Outdated approval-pending statement: ' + relative);
    assert(!html.includes('is the currently approved 2021–2025 strategy'), 'Wrong historical status: ' + relative);
  }
  console.log('Bilingual strategy pages passed: 2026–2030 approved original (pinned SHA-256), explicitly archived 2021–2025 file, and historical-overview separation.');
} catch (error) {
  console.error('Strategy page validation failed: ' + error.message);
  process.exitCode = 1;
}
