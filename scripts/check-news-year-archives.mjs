import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { getInstituteNews, getInstituteNewsYears, getInstituteNewsByYear } from '../src/utils/newsArchive.ts';

function assert(ok, message) {
  if (!ok) throw new Error('F09: ' + message);
}

const fake = (id, year, scopes) => ({
  id, data: { year, scopes, date: new Date(year + '-05-12T00:00:00Z') }
});
const fixtures = [
  fake('committee-2024', 2024, ['ncutam']),
  fake('old-2025', 2025, ['institute']),
  fake('current-2026', 2026, ['institute']),
  fake('shared-2027', 2027, ['institute', 'ncutam'])
];
assert(JSON.stringify(getInstituteNewsYears(fixtures)) === '[2027,2026,2025]',
  'year list must come from actual Institute records, not the build year or Committee-only records');
assert(getInstituteNewsByYear(fixtures, 2027).map((x) => x.id).join() === 'shared-2027',
  'a future-year Institute record must generate a separate archive');
assert(getInstituteNewsByYear(fixtures, 2025).map((x) => x.id).join() === 'old-2025',
  'historic records must remain retrievable after a later year arrives');
assert(getInstituteNewsByYear(fixtures, 2024).length === 0,
  'Committee-only year must not create an Institute archive');
assert(getInstituteNews(fixtures).length === 3, 'all-years archive must exclude Committee-only records');

function visitNewsSource(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? visitNewsSource(full) : entry.isFile() && entry.name.endsWith('.md') ? [full] : [];
  });
}
const records = visitNewsSource('src/content/news').map((file) => {
  const source = readFileSync(file, 'utf8').split('---', 3)[1] ?? '';
  const year = Number(/^year:\s*(\d{4})\s*$/m.exec(source)?.[1]);
  const dateYear = Number(/^date:\s*(\d{4})-/m.exec(source)?.[1]);
  const explicitScopes = /^scopes:\s*\[([^\]]+)\]/m.exec(source)?.[1];
  const institute = !explicitScopes || explicitScopes.split(',').some((x) =>
    x.trim().replaceAll(/["']/g, '') === 'institute');
  assert(Number.isInteger(year) && year >= 2000 && year <= 2100,
    'news source must declare a valid year: ' + file);
  assert(year === dateYear, 'news year/date mismatch in ' + file);
  return { year, institute, file };
});
const years = [...new Set(records.filter((x) => x.institute).map((x) => x.year))]
  .sort((a, b) => b - a);
assert(years.length > 0, 'no Institute years found');

function page(p) {
  const file = path.join('dist', p);
  assert(existsSync(file), 'missing generated page ' + p);
  return readFileSync(file, 'utf8');
}
const noteUA = 'НКУТПМ підготував аналітичну записку про стан і перспективи досліджень у галузі механіки';
const noteEN = 'NCUTAM analytical note on the current state and future of mechanics research';

for (const { prefix, language, allLabel, note } of [
  { prefix: '', language: 'uk', allLabel: 'Усі роки', note: noteUA },
  { prefix: 'en/', language: 'en', allLabel: 'All years', note: noteEN }
]) {
  const base = '/' + prefix + 'news/';
  const all = page(prefix + 'news/index.html');
  assert(all.includes(allLabel), language + ': all-years control missing');
  assert(!all.includes(note), language + ': Committee-only item leaked into all-years index');
  for (const year of years) {
    const url = base + year + '/';
    const archive = page(prefix + 'news/' + year + '/index.html');
    assert(all.includes(url), language + ': missing year link ' + url);
    assert(archive.includes(allLabel), language + ': annual archive has no all-years backlink');
    assert(archive.includes('aria-current="page"'), language + ': annual archive has no active year marker');
    assert(!archive.includes(note), language + ': Committee-only item leaked into year ' + year);
    assert(archive.includes(String(year)), language + ': archive year not displayed');
  }
  // The separate NCUTAM news page must retain its own editorial feed.
  assert(page(prefix + 'ncutam/news/index.html').includes(note),
    language + ': NCUTAM-only article missing from the Committee feed');
  // F08 protects the current lists; tag pages must now be independent of build year.
  const yearTags = readFileSync(path.join('src/pages', prefix, 'news/tags/[tag].astro'), 'utf8');
  assert(!yearTags.includes('new Date().getFullYear()'), language + ': tags still depend on build year');
  assert(!yearTags.includes("getNewsByYear("), language + ': tags unexpectedly tied to a single year');
  console.log('F09 ' + language + ': ' + years.join(', ') +
    ' (all-years and annual routes, historical tag preservation, scope isolation).');
}
