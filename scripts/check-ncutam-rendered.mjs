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

if (errors.length > 0) {
  console.error('NCUTAM rendered-output validation failed:');
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`NCUTAM rendered-output validation passed (${htmlFiles.length} HTML files checked).`);
