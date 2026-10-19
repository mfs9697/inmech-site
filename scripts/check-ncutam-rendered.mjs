import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');

if (!fs.existsSync(dist)) {
  console.log('NCUTAM rendered-output check skipped (dist/ is absent).');
  process.exit(0);
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const targets = [path.join(dist, 'ncutam'), path.join(dist, 'en', 'ncutam')];
const htmlFiles = targets.flatMap((dir) => walk(dir)).filter((file) => file.endsWith('.html'));
const errors = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  if (/@@BILINGUAL|BILINGUALINLINE/.test(html)) {
    errors.push(`${path.relative(root, file).replaceAll(path.sep, '/')}: unresolved bilingual inline placeholder`);
  }
}

const memberPages = [
  path.join(dist, 'ncutam', 'members', 'index.html'),
  path.join(dist, 'ncutam', 'members', 'former', 'index.html'),
  path.join(dist, 'en', 'ncutam', 'members', 'index.html'),
  path.join(dist, 'en', 'ncutam', 'members', 'former', 'index.html')
];

for (const file of memberPages) {
  const relative = path.relative(root, file).replaceAll(path.sep, '/');
  if (!fs.existsSync(file)) {
    errors.push(`${relative}: expected member-register page is missing`);
    continue;
  }

  const html = fs.readFileSync(file, 'utf8');
  for (const marker of ['data-members-root', 'data-members-search', 'data-members-letter', 'data-member-row']) {
    if (!html.includes(marker)) {
      errors.push(`${relative}: missing ${marker}`);
    }
  }
}

const redirectPages = [
  {
    file: path.join(dist, 'ncutam', 'members', 'in-memoriam', 'index.html'),
    target: '/ncutam/members/former/'
  },
  {
    file: path.join(dist, 'en', 'ncutam', 'members', 'in-memoriam', 'index.html'),
    target: '/en/ncutam/members/former/'
  }
];

for (const { file, target } of redirectPages) {
  const relative = path.relative(root, file).replaceAll(path.sep, '/');
  if (!fs.existsSync(file)) {
    errors.push(`${relative}: expected continuity redirect is missing`);
    continue;
  }

  const html = fs.readFileSync(file, 'utf8');
  if (!/http-equiv=["']refresh["']/i.test(html)) {
    errors.push(`${relative}: expected meta refresh redirect`);
  }
  if (!html.includes(target)) {
    errors.push(`${relative}: redirect target should be ${target}`);
  }
}

// Regression: the two seven-point numbered sections in the 2026 analytical
// note must remain one ordered list each, even with blank lines between items.
const notePage = path.join(dist, 'ncutam', 'activity', 'initiatives', '2026-10-19-mechanics-analytical-note', 'index.html');
if (!fs.existsSync(notePage)) {
  errors.push('NCUTAM analytical note page is missing from dist/');
} else {
  const html = fs.readFileSync(notePage, 'utf8');
  for (const { first, next, count } of [
    { first: 'ncutam-4', next: 'ncutam-5', count: 7 },
    { first: 'ncutam-5', next: 'ncutam-sources', count: 7 }
  ]) {
    const start = html.indexOf(`<h2 id="${first}">`);
    const end = html.indexOf(`<h2 id="${next}">`, start);
    if (start < 0 || end < 0) {
      errors.push(`NCUTAM analytical note: missing section boundary ${first} / ${next}`);
      continue;
    }
    const section = html.slice(start, end);
    const lists = [...section.matchAll(/<ol(?:\\s[^>]*)?>([\\s\\S]*?)<\\/ol>/g)];
    const items = lists.length === 1 ? [...lists[0][1].matchAll(/<li(?:\\s[^>]*)?>/g)].length : 0;
    if (lists.length !== 1 || items !== count) {
      errors.push(`NCUTAM analytical note ${first}: expected one <ol> with ${count} items; got ${lists.length} lists, ${items} items`);
    }
  }
}

if (errors.length > 0) {
  console.error('NCUTAM rendered-output validation failed:');
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`NCUTAM rendered-output validation passed (${htmlFiles.length} HTML files checked).`);
