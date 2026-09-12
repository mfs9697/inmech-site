import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];

const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const exists = (relative) => fs.existsSync(path.join(root, relative));
const fail = (message) => errors.push(message);

function topLevelYamlRecords(relative) {
  const text = read(relative);
  if (text.trim() === '[]') return [];

  const starts = [...text.matchAll(/^- id:\s*([^\n]+)$/gm)];
  return starts.map((match, index) => {
    const start = match.index;
    const end = starts[index + 1]?.index ?? text.length;
    return {
      id: match[1].trim().replace(/^['"]|['"]$/g, ''),
      text: text.slice(start, end)
    };
  });
}

function field(record, name) {
  const match = record.text.match(new RegExp(`^  ${name}:\\s*(.+)$`, 'm'));
  return match?.[1]?.trim().replace(/^['"]|['"]$/g, '');
}

function assertUniqueIds(records, label) {
  const seen = new Set();
  for (const record of records) {
    if (seen.has(record.id)) fail(`${label}: duplicate id '${record.id}'`);
    seen.add(record.id);
  }
}

const memberFile = 'src/data/ncutam/members.yaml';
const governanceFile = 'src/data/ncutam/governance.yaml';
const documentFile = 'src/data/ncutam/documents.yaml';
const mediaFile = 'src/data/ncutam/media.yaml';

for (const file of [memberFile, governanceFile, documentFile, mediaFile]) {
  if (!exists(file)) fail(`Missing NCUTAM data file: ${file}`);
}

const members = topLevelYamlRecords(memberFile);
const governance = topLevelYamlRecords(governanceFile);
const documents = topLevelYamlRecords(documentFile);
const media = topLevelYamlRecords(mediaFile);

assertUniqueIds(members, 'members');
assertUniqueIds(governance, 'governance');
assertUniqueIds(documents, 'documents');
assertUniqueIds(media, 'media');

const memberIds = new Set(members.map((record) => record.id));
const activeMemberIds = new Set(
  members.filter((record) => field(record, 'status') === 'active').map((record) => record.id)
);

for (const member of members) {
  if (!field(member, 'name')) fail(`members/${member.id}: missing Ukrainian name`);
  if (!field(member, 'nameEn')) fail(`members/${member.id}: missing English name`);

  const joinedYear = Number(field(member, 'joinedYear'));
  if (Number.isFinite(joinedYear) && (joinedYear < 1992 || joinedYear > new Date().getFullYear())) {
    fail(`members/${member.id}: invalid joinedYear ${joinedYear}`);
  }

  const inmechPersonId = field(member, 'inmechPersonId');
  if (inmechPersonId && !exists(`src/content/people/${inmechPersonId}.md`)) {
    fail(`members/${member.id}: inmechPersonId '${inmechPersonId}' has no people record`);
  }
}

const currentGovernance = governance.filter((record) => !field(record, 'effectiveTo'));
const currentRoleCount = (role) => currentGovernance.filter((record) => field(record, 'role') === role).length;

if (governance.length > 0) {
  if (currentRoleCount('chair') !== 1) fail(`governance: expected exactly one current chair, found ${currentRoleCount('chair')}`);
  if (currentRoleCount('scientific-secretary') !== 1) {
    fail(`governance: expected exactly one current scientific secretary, found ${currentRoleCount('scientific-secretary')}`);
  }
}

for (const assignment of governance) {
  const member = field(assignment, 'member');
  const role = field(assignment, 'role');
  const effectiveFrom = field(assignment, 'effectiveFrom');

  if (!member) fail(`governance/${assignment.id}: missing member reference`);
  else if (!memberIds.has(member)) fail(`governance/${assignment.id}: unknown member '${member}'`);

  if (!role) fail(`governance/${assignment.id}: missing role`);
  if (!effectiveFrom) fail(`governance/${assignment.id}: missing effectiveFrom`);

  if (!field(assignment, 'effectiveTo') && member && !activeMemberIds.has(member)) {
    fail(`governance/${assignment.id}: current assignment references non-active member '${member}'`);
  }

  if (!/\n  responsibilities:\n(?:    - .+\n?)+/m.test(assignment.text)) {
    fail(`governance/${assignment.id}: missing Ukrainian responsibilities`);
  }
  if (!/\n  responsibilitiesEn:\n(?:    - .+\n?)+/m.test(assignment.text)) {
    fail(`governance/${assignment.id}: missing English responsibilities`);
  }
}

for (const document of documents) {
  const publicPath = field(document, 'path');
  if (!publicPath?.startsWith('/documents/ncutam/')) {
    fail(`documents/${document.id}: path must begin with /documents/ncutam/`);
  }
}

const documentPaths = documents.map((record) => field(record, 'path')).filter(Boolean);
if (new Set(documentPaths).size !== documentPaths.length) fail('documents: duplicate public path');

for (const mention of media) {
  const externalUrl = field(mention, 'externalUrl');
  if (!externalUrl || !/^https?:\/\//.test(externalUrl)) {
    fail(`media/${mention.id}: missing or invalid externalUrl`);
  }
}

for (const page of ['home', 'about', 'iutam']) {
  const relative = `src/content/ncutam-pages/${page}.md`;
  if (!exists(relative)) {
    fail(`Missing evergreen page: ${relative}`);
    continue;
  }
  const body = read(relative);
  if (!/^titleEn:\s*.+$/m.test(body)) fail(`${relative}: missing titleEn`);
  if (!/^descriptionEn:\s*.+$/m.test(body)) fail(`${relative}: missing descriptionEn`);
  if (!/<!--\s*en:start\s*-->[\s\S]+<!--\s*en:end\s*-->/.test(body)) {
    fail(`${relative}: missing substantive English body block`);
  }
}

const activityRoot = path.join(root, 'src/content/ncutam-activity');
const allowedActivityTypes = new Map([
  ['meetings', 'meeting'],
  ['conferences', 'conference'],
  ['initiatives', 'initiative'],
  ['international', 'international']
]);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

for (const full of walk(activityRoot).filter((file) => file.endsWith('.md'))) {
  const relative = path.relative(root, full).replaceAll(path.sep, '/');
  const text = fs.readFileSync(full, 'utf8');
  const category = path.relative(activityRoot, full).split(path.sep)[0];
  const expectedType = allowedActivityTypes.get(category);
  const actualType = text.match(/^type:\s*([^\n]+)$/m)?.[1]?.trim();

  if (!expectedType) fail(`${relative}: unknown activity directory '${category}'`);
  else if (actualType !== expectedType) fail(`${relative}: type '${actualType}' does not match directory '${category}'`);

  for (const required of ['title', 'titleEn', 'summary', 'summaryEn', 'date']) {
    if (!new RegExp(`^${required}:\\s*.+$`, 'm').test(text)) fail(`${relative}: missing ${required}`);
  }

  if (!/<!--\s*en:start\s*-->[\s\S]+<!--\s*en:end\s*-->/.test(text)) {
    fail(`${relative}: missing English body block`);
  }

  if (category === 'meetings') {
    const fileDate = path.basename(full, '.md');
    const frontmatterDate = text.match(/^date:\s*(\d{4}-\d{2}-\d{2})/m)?.[1];
    if (frontmatterDate && fileDate !== frontmatterDate) {
      fail(`${relative}: meeting filename '${fileDate}' must match date '${frontmatterDate}'`);
    }
  }
}

if (errors.length > 0) {
  console.error('NCUTAM semantic validation failed:');
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`NCUTAM semantic validation passed (${members.length} member records, ${governance.length} governance assignments, ${documents.length} documents, ${media.length} media records).`);
