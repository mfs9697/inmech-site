import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { activeVacancyAnnouncements } from '../src/data/vacancies.ts';
import { activeVacancyAnnouncementsEn } from '../src/data/vacanciesEn.ts';

// Node >=22.23.4 can strip erasable TypeScript types when importing the data files.
// Completed competitions are checked separately by check-vacancy-archive.mjs.
const publicRoot = path.resolve('public');
const departmentsRoot = path.resolve('src/content/departments');

function isDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(value + 'T00:00:00Z');
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function normalizeDepartment(url, locale) {
  if (typeof url !== 'string') return null;
  const regex = locale === 'en'
    ? /^\/en\/departments\/([a-z0-9-]+)\/$/
    : /^\/departments\/([a-z0-9-]+)\/$/;
  return regex.exec(url)?.[1] ?? null;
}

function countPositions(positions) {
  return positions.reduce((sum, position) => sum + (position.count ?? 1), 0);
}

// Titles are translated; compare the invariant department targets and place counts.
function positionSignatures(positions, locale) {
  return positions.map((position) => {
    const departments = (position.departments ?? [])
      .map((department) => normalizeDepartment(department.href, locale) ?? '!invalid')
      .sort();
    return String(position.count ?? 1) + ':' + (departments.join('|') || 'no-department');
  }).sort();
}

function same(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function requireText(value, label, errors) {
  if (typeof value !== 'string' || !value.trim()) {
    errors.push(label + ': missing text');
  }
}

function validatePositions(positions, locale, label, errors) {
  if (!Array.isArray(positions) || positions.length === 0) {
    errors.push(label + ': empty positions');
    return;
  }
  for (const [index, position] of positions.entries()) {
    const id = label + '.positions[' + index + ']';
    requireText(position.title, id + '.title', errors);
    if (position.count !== undefined && (!Number.isInteger(position.count) || position.count < 1)) {
      errors.push(id + ': count must be a positive integer');
    }
    const departments = position.departments ?? [];
    if (!Array.isArray(departments)) {
      errors.push(id + ': invalid departments');
      continue;
    }
    const seen = new Set();
    for (const department of departments) {
      requireText(department.title, id + '.department.title', errors);
      const code = normalizeDepartment(department.href, locale);
      if (!code) {
        errors.push(id + ': invalid ' + locale + ' department URL');
      } else {
        if (seen.has(code)) errors.push(id + ': repeated department ' + code);
        seen.add(code);
        if (!existsSync(path.join(departmentsRoot, code + '.md'))) {
          errors.push(id + ': missing department source ' + code);
        }
      }
    }
  }
}

function validateAnnouncement(item, locale, errors, checkFiles) {
  const label = locale + '/' + item.id;
  if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/.test(item.id)) {
    errors.push(label + ': invalid ID');
  }
  if (!isDate(item.date) || !item.id.startsWith(item.date + '-')) {
    errors.push(label + ': ID/date mismatch');
  }
  if (!isDate(item.date) || item.year !== Number(item.date.slice(0, 4))) {
    errors.push(label + ': year/date mismatch');
  }
  if (!isDate(item.publicationDate) || (isDate(item.date) && item.publicationDate < item.date)) {
    errors.push(label + ': invalid publication date');
  }
  if (item.updatedDate !== undefined &&
      (!isDate(item.updatedDate) || item.updatedDate < item.publicationDate)) {
    errors.push(label + ': invalid update date');
  }
  requireText(item.title, label + '.title', errors);
  requireText(item.summary, label + '.summary', errors);
  requireText(item.deadline, label + '.deadline', errors);
  requireText(item.orderNumber, label + '.orderNumber', errors);
  validatePositions(item.positions, locale, label, errors);

  const tracks = item.tracks ?? [];
  if (!Array.isArray(tracks) || tracks.length === 0) {
    errors.push(label + ': at least one track is required');
  } else {
    const seen = new Set();
    for (const track of tracks) {
      const trackLabel = label + '/track/' + track.id;
      if (!/^[a-z0-9-]+$/.test(track.id ?? '')) errors.push(trackLabel + ': invalid track ID');
      if (seen.has(track.id)) errors.push(trackLabel + ': repeated track ID');
      seen.add(track.id);
      requireText(track.label, trackLabel + '.label', errors);
      requireText(track.title, trackLabel + '.title', errors);
      requireText(track.deadline, trackLabel + '.deadline', errors);
      if (!Array.isArray(track.requirements) || track.requirements.length === 0) {
        errors.push(trackLabel + ': missing requirements');
      }
      validatePositions(track.positions, locale, trackLabel, errors);
      if (track.deadlineDate !== undefined &&
          (!isDate(track.deadlineDate) || track.deadlineDate < item.publicationDate)) {
        errors.push(trackLabel + ': invalid deadlineDate');
      }
    }
    const flattened = tracks.flatMap((track) => track.positions ?? []);
    if (countPositions(flattened) !== countPositions(item.positions) ||
        !same(positionSignatures(flattened, locale), positionSignatures(item.positions, locale))) {
      errors.push(label + ': summary positions differ from track positions');
    }
  }

  if (!Array.isArray(item.documents) || item.documents.length === 0) {
    errors.push(label + ': no primary competition document');
  } else {
    const paths = new Set();
    for (const document of item.documents) {
      requireText(document.title, label + '.document.title', errors);
      if (typeof document.href !== 'string' ||
          !/^\/documents\/vacancies\/active\/[a-z0-9/-]+\.pdf$/.test(document.href)) {
        errors.push(label + ': unexpected document path ' + document.href);
        continue;
      }
      if (paths.has(document.href)) errors.push(label + ': repeated document ' + document.href);
      paths.add(document.href);
      if (checkFiles) {
        const filePath = path.join(publicRoot, document.href.slice(1));
        if (!existsSync(filePath)) {
          errors.push(label + ': missing local document ' + document.href);
        } else if (readFileSync(filePath).subarray(0, 5).toString('ascii') !== '%PDF-') {
          errors.push(label + ': file does not have a PDF header ' + document.href);
        }
      }
    }
  }
}

function validatePair(uk, en, errors) {
  if (uk.length !== en.length) {
    errors.push('UA/EN active announcement count differs');
  }
  const enById = new Map(en.map((record) => [record.id, record]));
  for (const [index, item] of uk.entries()) {
    const other = enById.get(item.id);
    if (!other) {
      errors.push(item.id + ': English announcement missing');
      continue;
    }
    if (en[index]?.id !== item.id) errors.push(item.id + ': announcement ordering differs');
    for (const field of ['date', 'year', 'publicationDate', 'updatedDate', 'orderNumber']) {
      if (item[field] !== other[field]) errors.push(item.id + ': differing ' + field);
    }
    if (!same(positionSignatures(item.positions, 'uk'), positionSignatures(other.positions, 'en'))) {
      errors.push(item.id + ': summary position count/departments differ by language');
    }
    const enTracks = new Map((other.tracks ?? []).map((track) => [track.id, track]));
    if (!same((item.tracks ?? []).map((track) => track.id),
              (other.tracks ?? []).map((track) => track.id))) {
      errors.push(item.id + ': track IDs or order differ by language');
    }
    for (const track of item.tracks ?? []) {
      const otherTrack = enTracks.get(track.id);
      if (!otherTrack) continue;
      if (track.deadlineDate !== otherTrack.deadlineDate) {
        errors.push(item.id + '/' + track.id + ': deadlineDate differs');
      }
      if (track.requirements.length !== otherTrack.requirements.length) {
        errors.push(item.id + '/' + track.id + ': requirement count differs');
      }
      if (!same(positionSignatures(track.positions, 'uk'),
                positionSignatures(otherTrack.positions, 'en'))) {
        errors.push(item.id + '/' + track.id + ': track places/departments differ');
      }
    }
    if (!same((item.documents ?? []).map((d) => d.href),
              (other.documents ?? []).map((d) => d.href))) {
      errors.push(item.id + ': document paths differ by language');
    }
  }
}

function check(uk, en, { checkFiles = true } = {}) {
  const errors = [];
  const ukIds = new Set();
  const enIds = new Set();
  for (const item of uk) {
    if (ukIds.has(item.id)) errors.push('UK: duplicate active announcement ID ' + item.id);
    ukIds.add(item.id);
    validateAnnouncement(item, 'uk', errors, checkFiles);
  }
  for (const item of en) {
    if (enIds.has(item.id)) errors.push('EN: duplicate active announcement ID ' + item.id);
    enIds.add(item.id);
    validateAnnouncement(item, 'en', errors, checkFiles);
  }
  validatePair(uk, en, errors);
  return errors;
}

function selfTest() {
  const clone = () => [structuredClone(activeVacancyAnnouncements), structuredClone(activeVacancyAnnouncementsEn)];
  if (check(...clone(), { checkFiles: false }).length > 0) {
    throw new Error('Self-test baseline does not pass.');
  }
  const mutations = [
    ([uk]) => { uk[0].tracks[0].id = 'postdoc'; },
    ([uk]) => { uk[0].tracks[0].positions.pop(); },
    ([uk]) => { uk[0].tracks[0].deadlineDate = '2026-01-01'; },
    ([uk, en]) => { en[0].positions[0].departments[0].href = '/en/departments/08-creep/'; },
    ([uk, en]) => { en[0].orderNumber = '118/k'; },
    ([uk, en]) => { en[0].publicationDate = '2026-10-22'; },
    ([uk]) => { uk[0].positions[0].count = 0; },
    ([uk, en]) => { en[0].documents[0].href = '/documents/vacancies/active/missing.pdf'; }
  ];
  for (const [index, mutation] of mutations.entries()) {
    const data = clone();
    mutation(data);
    if (check(...data, { checkFiles: false }).length === 0) {
      throw new Error('Self-test failed to catch regression ' + (index + 1));
    }
  }
  console.log('Active vacancies self-test: baseline and ' + mutations.length + ' regressions passed.');
}

if (process.argv.includes('--self-test')) selfTest();
const failures = check(activeVacancyAnnouncements, activeVacancyAnnouncementsEn);
if (failures.length) {
  console.error('Active vacancy invariants failed:');
  for (const failure of failures) console.error('  - ' + failure);
  process.exitCode = 1;
} else {
  const tracks = activeVacancyAnnouncements.reduce((sum, item) => sum + (item.tracks?.length ?? 0), 0);
  const places = activeVacancyAnnouncements.reduce((sum, item) => sum + countPositions(item.positions), 0);
  console.log('Active vacancies verified: ' + activeVacancyAnnouncements.length +
    ' bilingual announcement(s), ' + tracks + ' track(s), ' + places + ' place(s).');
}
