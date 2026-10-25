import fs from 'node:fs';
import path from 'node:path';
import {
  readNormalizedText,
  topLevelYamlRecords as parseYamlRecords,
  yamlField,
  hasResponsibilityList,
  activityFrontmatter,
  activityGalleryItems,
  activityDocumentIds
} from './lib/ncutam-text.mjs';

const root = process.cwd();
const errors = [];
const fail = (message) => errors.push(message);
const exists = (relative) => fs.existsSync(path.join(root, relative));
const read = (relative) => readNormalizedText(path.join(root, relative));
const topLevelYamlRecords = (relative) => parseYamlRecords(read(relative));

function assertUniqueIds(records, label) {
  const seen = new Set();
  for (const record of records) {
    if (seen.has(record.id)) fail(`${label}: duplicate id '${record.id}'`);
    seen.add(record.id);
  }
}

function readMemberRecords(relativeDir) {
  const directory = path.join(root, relativeDir);
  if (!fs.existsSync(directory)) {
    fail(`Missing NCUTAM member directory: ${relativeDir}`);
    return [];
  }

  const files = fs.readdirSync(directory).filter((name) => name.endsWith('.json')).sort();
  if (files.length === 0) fail(`NCUTAM member directory is empty: ${relativeDir}`);

  const records = [];
  for (const file of files) {
    const relative = path.join(relativeDir, file).replaceAll(path.sep, '/');
    try {
      const batch = JSON.parse(read(relative));
      if (!Array.isArray(batch)) {
        fail(`${relative}: expected a JSON array`);
        continue;
      }
      records.push(...batch.map((record) => ({ ...record, sourceFile: relative })));
    } catch (error) {
      fail(`${relative}: invalid JSON (${error.message})`);
    }
  }
  return records;
}

const memberDir = 'src/data/ncutam/members';
const institutionFile = 'src/data/ncutam/institutions.yaml';
const governanceFile = 'src/data/ncutam/governance.yaml';
const documentFile = 'src/data/ncutam/documents.yaml';
const mediaFile = 'src/data/ncutam/media.yaml';

for (const file of [institutionFile, governanceFile, documentFile, mediaFile]) {
  if (!exists(file)) fail(`Missing NCUTAM data file: ${file}`);
}

const members = readMemberRecords(memberDir);
const institutions = topLevelYamlRecords(institutionFile);
const governance = topLevelYamlRecords(governanceFile);
const documents = topLevelYamlRecords(documentFile);
const media = topLevelYamlRecords(mediaFile);

assertUniqueIds(members, 'members');
assertUniqueIds(institutions, 'institutions');
assertUniqueIds(governance, 'governance');
assertUniqueIds(documents, 'documents');
assertUniqueIds(media, 'media');

const memberIds = new Set(members.map((record) => record.id));
const institutionIds = new Set(institutions.map((record) => record.id));
const documentIds = new Set(documents.map((record) => record.id));
const activeMembers = members.filter((record) => record.status === 'active');
const formerMembers = members.filter((record) => record.status === 'former');
const activeMemberIds = new Set(activeMembers.map((record) => record.id));
const chernyshenko = members.find((record) => record.id === 'chernyshenko-ivan');
if (!chernyshenko || chernyshenko.status !== 'former' || chernyshenko.joinedYear !== 1993 || chernyshenko.endedYear !== 2026) {
  fail('members/chernyshenko-ivan: preserved historical membership must be former (1993–2026)');
}
const currentYear = new Date().getFullYear();

// The migration snapshot is no longer a permanent count invariant: membership
// must be able to change after cutover. Preserve only historical cohort facts
// that should remain true when a member later changes status.
const historicalJoinedYearCounts = new Map([[2025, 35]]);
const activeMembersWithUnverifiedJoinedYear = new Set();
// One name conflicts with the official 2023 former-member list, so its
// admission year remains intentionally unresolved pending a primary-source match.
const formerMembersWithUnverifiedJoinedYear = new Set([
  'prykhodko-oleksandr-anatoliiovych'
]);

for (const [year, expectedCount] of historicalJoinedYearCounts) {
  const cohort = members.filter((record) => record.joinedYear === year);
  if (cohort.length !== expectedCount) {
    fail(`members: expected historical ${year} admission cohort of ${expectedCount}, found ${cohort.length}`);
  }
}

const seenNames = new Set();
for (const member of members) {
  const where = `members/${member.id}`;
  if (!member.id || typeof member.id !== 'string') fail(`${member.sourceFile}: member missing id`);
  if (!member.name) fail(`${where}: missing Ukrainian name`);
  if (!member.nameEn) fail(`${where}: missing English name`);
  if (member.nameEn && /[А-Яа-яІіЇїЄєҐґ]/.test(member.nameEn)) fail(`${where}: English name contains Cyrillic characters`);
  if (!['active', 'former'].includes(member.status)) fail(`${where}: invalid status '${member.status}'`);

  if (member.name) {
    if (seenNames.has(member.name)) fail(`members: duplicate person name '${member.name}' across statuses/records`);
    seenNames.add(member.name);
  }

  if (member.joinedYear !== undefined && (!Number.isInteger(member.joinedYear) || member.joinedYear < 1992 || member.joinedYear > currentYear)) {
    fail(`${where}: invalid joinedYear ${member.joinedYear}`);
  }

  if (member.status === 'active') {
    if (!Number.isInteger(member.joinedYear) && !activeMembersWithUnverifiedJoinedYear.has(member.id)) {
      fail(`${where}: active member missing joinedYear`);
    }
    if (!member.city) fail(`${where}: active member missing city`);
  }

  if (member.status === 'former' && !Number.isInteger(member.joinedYear) && !formerMembersWithUnverifiedJoinedYear.has(member.id)) {
    fail(`${where}: former member missing joinedYear`);
  }

  if (member.institution && !institutionIds.has(member.institution)) {
    fail(`${where}: unknown institution '${member.institution}'`);
  }

  const additionalInstitutions = member.additionalInstitutions ?? [];
  if (!Array.isArray(additionalInstitutions)) {
    fail(`${where}: additionalInstitutions must be an array`);
  } else {
    if (new Set(additionalInstitutions).size !== additionalInstitutions.length) {
      fail(`${where}: duplicate additional institution reference`);
    }
    for (const institution of additionalInstitutions) {
      if (!institutionIds.has(institution)) fail(`${where}: unknown additional institution '${institution}'`);
      if (institution === member.institution) fail(`${where}: primary institution repeated in additionalInstitutions`);
    }
    if (additionalInstitutions.length > 0 && !(member.affiliationSources ?? []).some((source) => source.kind === 'publication')) {
      fail(`${where}: multiple current affiliations require publication evidence`);
    }
  }

  if (member.inmechPersonId && !exists(`src/content/people/${member.inmechPersonId}.md`)) {
    fail(`${where}: inmechPersonId '${member.inmechPersonId}' has no people record`);
  }
}

const missingJoinYears = activeMembers.filter((member) => !Number.isInteger(member.joinedYear)).map((member) => member.id).sort();
const expectedMissingJoinYears = [...activeMembersWithUnverifiedJoinedYear].sort();
if (JSON.stringify(missingJoinYears) !== JSON.stringify(expectedMissingJoinYears)) {
  fail(`members: unverified active joinedYear set changed (${missingJoinYears.join(', ') || 'none'})`);
}

const formerMissingJoinYears = formerMembers.filter((member) => !Number.isInteger(member.joinedYear)).map((member) => member.id).sort();
const expectedFormerMissingJoinYears = [...formerMembersWithUnverifiedJoinedYear].sort();
if (JSON.stringify(formerMissingJoinYears) !== JSON.stringify(expectedFormerMissingJoinYears)) {
  fail(`members: unverified former joinedYear set changed (${formerMissingJoinYears.join(', ') || 'none'})`);
}

const currentGovernance = governance.filter((record) => !yamlField(record, 'effectiveTo'));
const currentRoleCount = (role) => currentGovernance.filter((record) => yamlField(record, 'role') === role).length;
if (governance.length > 0) {
  if (currentRoleCount('chair') !== 1) fail(`governance: expected exactly one current chair, found ${currentRoleCount('chair')}`);
  if (currentRoleCount('scientific-secretary') !== 1) {
    fail(`governance: expected exactly one current scientific secretary, found ${currentRoleCount('scientific-secretary')}`);
  }
}

for (const assignment of governance) {
  const member = yamlField(assignment, 'member');
  const role = yamlField(assignment, 'role');
  const effectiveFrom = yamlField(assignment, 'effectiveFrom');
  if (!member) fail(`governance/${assignment.id}: missing member reference`);
  else if (!memberIds.has(member)) fail(`governance/${assignment.id}: unknown member '${member}'`);
  if (!role) fail(`governance/${assignment.id}: missing role`);
  if (!effectiveFrom) fail(`governance/${assignment.id}: missing effectiveFrom`);
  if (!yamlField(assignment, 'effectiveTo') && member && !activeMemberIds.has(member)) {
    fail(`governance/${assignment.id}: current assignment references non-active member '${member}'`);
  }
  if (!hasResponsibilityList(assignment, 'uk')) fail(`governance/${assignment.id}: missing Ukrainian responsibilities`);
  if (!hasResponsibilityList(assignment, 'en')) fail(`governance/${assignment.id}: missing English responsibilities`);
}

for (const document of documents) {
  const publicPath = yamlField(document, 'path');
  if (!publicPath?.startsWith('/documents/ncutam/')) fail(`documents/${document.id}: path must begin with /documents/ncutam/`);
  if (!yamlField(document, 'title') || !yamlField(document, 'titleEn')) fail(`documents/${document.id}: missing bilingual title`);
  if (!yamlField(document, 'kind')) fail(`documents/${document.id}: missing kind`);
  if (!yamlField(document, 'language')) fail(`documents/${document.id}: missing language`);
}
const documentPaths = documents.map((record) => yamlField(record, 'path')).filter(Boolean);
if (new Set(documentPaths).size !== documentPaths.length) fail('documents: duplicate public path');

for (const mention of media) {
  const url = yamlField(mention, 'url');
  if (!url || !/^https?:\/\//.test(url)) fail(`media/${mention.id}: missing or invalid url`);
  if (!yamlField(mention, 'title') || !yamlField(mention, 'titleEn')) fail(`media/${mention.id}: missing bilingual title`);
  if (!yamlField(mention, 'description') || !yamlField(mention, 'descriptionEn')) fail(`media/${mention.id}: missing bilingual description`);
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
  if (!/<!--\s*en:start\s*-->[\s\S]+<!--\s*en:end\s*-->/.test(body)) fail(`${relative}: missing substantive English body block`);
}

const activityRoot = path.join(root, 'src/content/ncutam-activity');
const allowedActivityTypes = new Map([
  ['meetings', 'meeting'],
  ['conferences', 'conference'],
  ['initiatives', 'initiative'],
  ['international', 'international']
]);
const expectedGalleryCounts = new Map([
  ['conferences/current-problems-mechanics-2023', 10],
  ['conferences/mechanics-present-and-prospects-2024', 4],
  ['meetings/2025-11-11', 5]
]);
const expectedMeetingDocumentCounts = new Map([
  ['meetings/2023-09-12', 10],
  ['meetings/2025-11-11', 2]
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
  const activityId = path.relative(activityRoot, full).replaceAll(path.sep, '/').replace(/\.md$/, '');
  const text = readNormalizedText(full);
  const frontmatter = activityFrontmatter(text);
  const category = path.relative(activityRoot, full).split(path.sep)[0];
  const expectedType = allowedActivityTypes.get(category);
  const actualType = text.match(/^type:\s*([^\n]+)$/m)?.[1]?.trim();
  if (!expectedType) fail(`${relative}: unknown activity directory '${category}'`);
  else if (actualType !== expectedType) fail(`${relative}: type '${actualType}' does not match directory '${category}'`);
  for (const required of ['title', 'titleEn', 'summary', 'summaryEn', 'date']) {
    if (!new RegExp(`^${required}:\\s*.+$`, 'm').test(text)) fail(`${relative}: missing ${required}`);
  }
  if (!/<!--\s*en:start\s*-->[\s\S]+<!--\s*en:end\s*-->/.test(text)) fail(`${relative}: missing English body block`);
  if (category === 'meetings') {
    const fileDate = path.basename(full, '.md');
    const frontmatterDate = text.match(/^date:\s*(\d{4}-\d{2}-\d{2})/m)?.[1];
    if (frontmatterDate && fileDate !== frontmatterDate) fail(`${relative}: meeting filename '${fileDate}' must match date '${frontmatterDate}'`);
  }

  const image = frontmatter.match(/^image:\s*["']?([^"'\n]+)["']?\s*$/m)?.[1];
  if (image) {
    if (!image.startsWith('/images/ncutam/')) fail(`${relative}: NCUTAM activity image must use /images/ncutam/`);
    else if (!exists(`public${image}`)) fail(`${relative}: missing activity image public${image}`);
  }

  const galleryItems = activityGalleryItems(frontmatter);
  const galleryPaths = [];
  for (const item of galleryItems) {
    const { src, fields } = item;
    galleryPaths.push(src);
    if (!src.startsWith('/images/ncutam/')) fail(`${relative}: gallery src '${src}' must use /images/ncutam/`);
    else if (!exists(`public${src}`)) fail(`${relative}: missing gallery asset public${src}`);
    if (!/^    alt:\s*.+$/m.test(fields)) fail(`${relative}: gallery item '${src}' missing Ukrainian alt text`);
    if (!/^    altEn:\s*.+$/m.test(fields)) fail(`${relative}: gallery item '${src}' missing English alt text`);
  }
  if (new Set(galleryPaths).size !== galleryPaths.length) fail(`${relative}: duplicate gallery src`);
  if (expectedGalleryCounts.has(activityId) && galleryItems.length !== expectedGalleryCounts.get(activityId)) {
    fail(`${relative}: expected ${expectedGalleryCounts.get(activityId)} gallery images, found ${galleryItems.length}`);
  }

  const activityDocuments = activityDocumentIds(frontmatter);
  for (const documentId of activityDocuments) {
    if (!documentIds.has(documentId)) fail(`${relative}: unknown document reference '${documentId}'`);
  }
  if (new Set(activityDocuments).size !== activityDocuments.length) fail(`${relative}: duplicate document reference`);
  if (expectedMeetingDocumentCounts.has(activityId) && activityDocuments.length !== expectedMeetingDocumentCounts.get(activityId)) {
    fail(`${relative}: expected ${expectedMeetingDocumentCounts.get(activityId)} meeting document references, found ${activityDocuments.length}`);
  }
}

if (errors.length > 0) {
  console.error('NCUTAM semantic validation failed:');
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

const cohort2025 = members.filter((record) => record.joinedYear === 2025).length;
console.log(`NCUTAM semantic validation passed (${members.length} members: ${activeMembers.length} active, ${formerMembers.length} former; historical 2025 admission cohort ${cohort2025}; ${governance.length} governance assignments, ${documents.length} documents, ${media.length} media records).`);
