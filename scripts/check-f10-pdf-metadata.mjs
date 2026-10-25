import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const publicRoot = path.join(root, 'public/documents/dissertations');
const LIMIT = 10_000_000;

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : entry.isFile() && entry.name.toLowerCase().endsWith('.pdf') ? [full] : [];
  });
}

function assert(value, message) {
  if (!value) throw new Error('F10 PDF metadata: ' + message);
}

const large = walk(publicRoot)
  .map((file) => ({ file, bytes: statSync(file).size }))
  .filter(({ bytes }) => bytes > LIMIT)
  .sort((a, b) => b.bytes - a.bytes);

assert(large.length >= 8, 'expected at least eight existing original PDFs over 10 MB');

const checkedByLocale = { uk: 0, en: 0 };
for (const { file, bytes } of large) {
  const url = '/documents/dissertations/' + path.relative(publicRoot, file).split(path.sep).join('/');
  const isHistorical = url.includes('/archive/');
  const archivedYear = /\/archive\/(\d{4})\//.exec(url)?.[1];
  const size = (bytes / 1_000_000).toFixed(2);
  for (const [lang, dir, notice] of [
    ['uk', '', 'Великий файл'],
    ['en', 'en/', 'Large file']
  ]) {
    const target = isHistorical
      ? 'dist/' + dir + 'dissertations/archive/' + archivedYear + '/index.html'
      : 'dist/' + dir + 'dissertations/index.html';
    assert(existsSync(target), 'missing page ' + target);
    const html = readFileSync(target, 'utf8');
    const occurrence = html.indexOf(url);
    assert(occurrence >= 0, target + ' does not link the original ' + url);
    const relevant = html.slice(Math.max(0, occurrence - 600), occurrence + 600);
    assert(relevant.includes(size), target + ' does not display ' + size + ' MB for ' + url);
    assert(relevant.includes(notice), target + ' missing large-file notice for ' + url);
    checkedByLocale[lang] += 1;
  }
}

for (const [lang, count] of Object.entries(checkedByLocale)) {
  assert(count === large.length, lang + ' did not cover all large originals');
}
console.log('F10 PDF metadata PASS: ' + large.length + ' source PDFs over 10 MB, ' +
  'both languages show exact decimal-MB file sizes and large-file notices; originals unchanged by this check.');
