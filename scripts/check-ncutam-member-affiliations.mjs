import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const directory = path.join(root, 'src/data/ncutam/members');
const expectedMissing = new Set(['korsunskyi-serhii']);

const members = fs.readdirSync(directory, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
  .sort((a, b) => a.name.localeCompare(b.name))
  .flatMap((entry) => JSON.parse(fs.readFileSync(path.join(directory, entry.name), 'utf8')));

const activeMembers = members.filter((member) => member.status === 'active');
const missing = activeMembers
  .filter((member) => !member.institution)
  .map((member) => member.id)
  .sort();
const expected = [...expectedMissing].sort();

if (JSON.stringify(missing) !== JSON.stringify(expected)) {
  console.error('NCUTAM member affiliation coverage check failed.');
  console.error(`Expected unresolved affiliation set: ${expected.join(', ') || 'none'}`);
  console.error(`Actual unresolved affiliation set: ${missing.join(', ') || 'none'}`);
  process.exit(1);
}

console.log(`NCUTAM member affiliation coverage passed (${activeMembers.length - missing.length}/${activeMembers.length} active members have institutions; unresolved: ${missing.join(', ')}).`);
