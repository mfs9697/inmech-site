import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const metadataFile = path.join(dist, 'library/scientific-books/filters.json');
const fail = (problem) => { throw new Error('F10 books: ' + problem); };
if (!existsSync(metadataFile)) fail('missing group/tag metadata');
const metadata = JSON.parse(readFileSync(metadataFile, 'utf8'));
if (!Array.isArray(metadata.groups) || metadata.groups.length < 10 ||
    !Number.isInteger(metadata.total) || metadata.total < 300) {
  fail('suspiciously small or invalid book partitions');
}

function countTags(html) {
  const tags = {};
  for (const match of html.matchAll(/\bdata-tags="([^"]*)"/g)) {
    const values = JSON.parse(match[1].replaceAll('&quot;', '"').replaceAll('&#34;', '"').replaceAll('&amp;', '&'));
    if (!Array.isArray(values)) fail('invalid book tags array');
    for (const tag of values) tags[tag] = (tags[tag] ?? 0) + 1;
  }
  return tags;
}

const localeRecordIds = [];
for (const language of ['uk', 'en']) {
  const prefix = language === 'en' ? 'en/' : '';
  const index = path.join(dist, prefix, 'library/scientific-books/index.html');
  if (!existsSync(index)) fail('missing index for ' + language);
  const html = readFileSync(index, 'utf8');
  const bytes = statSync(index).size;
  if (bytes > 85000) fail(language + ' main index is too large (' + bytes + ' bytes)');
  if (!html.includes('data-scientific-books') || !html.includes('data-index-url') ||
      !html.includes('/library/scientific-books/filters.json')) {
    fail(language + ' lost searchable partition metadata');
  }
  if (/data-book-id=/.test(html) || /data-book-card/.test(html)) {
    fail(language + ' still duplicates full book cards in overview HTML');
  }
  if (!html.includes('<noscript>')) fail(language + ' has no non-JavaScript fallback');

  let total = 0;
  let largestPartition = 0;
  const seen = new Set();
  for (const group of metadata.groups) {
    const code = group.code;
    const letter = group.letter;
    const url = '/' + prefix + 'library/scientific-books/letter/' + code + '/';
    const file = path.join(dist, prefix, 'library/scientific-books/letter', code, 'index.html');
    if (!existsSync(file)) fail('missing ' + url);
    if (!html.includes('id="books-' + letter + '"') || !html.includes(url)) {
      fail(language + ' missing stable anchor or crawlable letter link for ' + letter);
    }
    const part = readFileSync(file, 'utf8');
    const size = statSync(file).size;
    if (size > 400000) fail(language + ' partition ' + letter + ' exceeds 400KB');
    largestPartition = Math.max(largestPartition, size);
    const ids = [...part.matchAll(/data-book-id="([^"]+)"/g)].map((m) => m[1]);
    if (ids.length !== group.count) fail(language + ' count mismatch ' + letter + ': ' + ids.length + '/' + group.count);
    for (const id of ids) {
      if (seen.has(id)) fail(language + ' duplicate ID ' + id);
      seen.add(id);
    }
    const tagTotals = countTags(part);
    if (JSON.stringify(Object.keys(group.tags).sort().map((tag) => [tag, group.tags[tag]])) !==
        JSON.stringify(Object.keys(tagTotals).sort().map((tag) => [tag, tagTotals[tag]]))) {
      fail(language + ' topic counts disagree with rendered records for ' + letter);
    }
    total += ids.length;
  }
  if (total !== metadata.total) fail(language + ' entries missing: ' + total + '/' + metadata.total);
  localeRecordIds.push([...seen].sort());
  console.log('F10 books ' + language + ': main=' + bytes + ' B, ' +
    metadata.groups.length + ' crawlable letters, ' + total +
    ' unique records, largest letter=' + largestPartition + ' B');
}
if (JSON.stringify(localeRecordIds[0]) !== JSON.stringify(localeRecordIds[1])) {
  fail('Ukrainian and English book ID sets differ');
}
console.log('F10 books PASS: all records and topic counts identical across locales.');
