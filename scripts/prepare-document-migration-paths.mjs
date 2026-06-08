import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const defaultCsv = path.join(root, 'documents-migration.csv');

const args = new Set(process.argv.slice(2));
const writeMode = args.has('--write');
const csvArg = process.argv.find((arg) => arg.startsWith('--csv='));
const csvPath = csvArg ? path.resolve(root, csvArg.slice('--csv='.length)) : defaultCsv;

function parseCsvLine(line) {
  const cells = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      cells.push(current);
      current = '';
      continue;
    }

    current += char;
  }

  cells.push(current);
  return cells;
}

function csvEscape(value) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`;
}

function readCsv(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`CSV file not found: ${filePath}`);
  }

  const lines = fs.readFileSync(filePath, 'utf8')
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0);

  const header = parseCsvLine(lines[0]);
  return {
    header,
    rows: lines.slice(1).map((line) => {
      const cells = parseCsvLine(line);
      return Object.fromEntries(header.map((name, i) => [name, cells[i] ?? '']));
    })
  };
}

function writeCsv(filePath, header, rows) {
  const text = [
    header.map(csvEscape).join(','),
    ...rows.map((row) => header.map((name) => csvEscape(row[name])).join(','))
  ].join('\n');

  fs.writeFileSync(filePath, `${text}\n`, 'utf8');
}

function cleanFilename(value) {
  const decoded = decodeURIComponent(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '');

  const ext = path.extname(decoded).toLowerCase();
  const stem = path.basename(decoded, ext)
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

  return `${stem}${ext}`;
}

function yearFromText(value, fallback = 'undated') {
  return value.match(/20\d{2}/)?.[0] ?? fallback;
}

function defenseDocumentName(filename) {
  const clean = cleanFilename(filename);
  const ext = path.extname(clean);
  const stem = path.basename(clean, ext);

  if (/^(refer|referat|abstract|\d+ref|\d+refer|\d+refer1)$/i.test(stem)) return `abstract${ext}`;
  if (/^(dis|dissertation|\d+dis|\d+dis-last|dis2)$/i.test(stem)) return `dissertation${ext}`;
  if (/^(v|v-1)$/i.test(stem)) return `conclusion${ext}`;
  if (/^oblic$/i.test(stem)) return `record-card${ext}`;

  const opponent = stem.match(/^vid(\d)(?:-\d)?$/i);
  if (opponent) return `opponent-review-${opponent[1]}${ext}`;

  return clean;
}

function mapPostgraduateRegulation(filename) {
  const mapping = {
    '2018_asp.pdf': 'license/license-order-2018.pdf',
    'postgraduate38.pdf': 'license/edebo-extract.pdf',
    'postgraduate33.pdf': 'regulations/educational-process/educational-process-regulation.pdf',
    'postgraduate34.pdf': 'regulations/educational-process/pedagogical-practice-regulation.pdf',
    'postgraduate17.pdf': 'regulations/educational-process/distance-learning-regulation.pdf',
    'postgraduate21.pdf': 'regulations/educational-process/inclusive-education-regulation.pdf',
    '2023_asp1.pdf': 'regulations/admission/admissions-committee-regulation.pdf',
    'postgraduate35.pdf': 'regulations/admission/appeal-committee-regulation.pdf',
    'postgraduate37.pdf': 'regulations/admission/elective-courses-regulation.pdf',
    'postgraduate11.pdf': 'regulations/admission/academic-mobility-regulation.pdf',
    'postgraduate36.pdf': 'regulations/admission/informal-learning-recognition-regulation.pdf',
    'postgraduate31.pdf': 'regulations/quality-and-integrity/academic-integrity-regulation.pdf',
    'postgraduate32.pdf': 'regulations/quality-and-integrity/conflict-prevention-regulation.pdf',
    'postgraduate15.pdf': 'regulations/quality-and-integrity/program-guarantor-regulation.pdf',
    'postgraduate16.pdf': 'regulations/quality-and-integrity/project-group-regulation.pdf',
    'polozhennya_pro_konkurs_2021.pdf': 'regulations/staff-and-methodology/staff-competition-regulation-2021.pdf',
    'postgraduate18.pdf': 'regulations/staff-and-methodology/nmr-regulation.pdf',
    'nmr_members.docx': 'nmr/nmr-members.docx',
    'reting_rules.pdf': 'nmr/teacher-rating-rules.pdf',
    'rating_2024_2025.pdf': 'nmr/teacher-rating-2024-2025.pdf',
    'selection_procedure.pdf': 'nmr/teacher-selection-procedure.pdf',
    '2023_doct.docx': '../doctoral/admission/doctoral-admission-rules.docx',
    'program.pdf': 'accreditation/2026/expert-group-program-2026.pdf',
    'self-assessment.pdf': 'accreditation/2026/self-assessment-2026.pdf'
  };

  return mapping[filename] ?? null;
}

function proposePath(oldUrl) {
  const url = new URL(oldUrl);
  const pathname = decodeURIComponent(url.pathname);
  const filename = path.basename(pathname);
  const clean = cleanFilename(filename);

  if (pathname === '/doc/Order12.pdf') return 'public/documents/news/2026/orders/order-12-vacancy-competition.pdf';
  if (pathname === '/doc/Order24.pdf') return 'public/documents/news/2026/orders/order-24-competition-results.pdf';
  if (pathname === '/doc/Order29.pdf') return 'public/documents/news/2026/orders/order-29-competition-results.pdf';
  if (pathname === '/doc/Order44.pdf') return 'public/documents/news/2026/orders/order-44-vacancy-competition.pdf';
  if (pathname === '/doc/Document_2026-04-16_114124.pdf') return 'public/documents/news/2026/orders/director-election-order-2026-04-16.pdf';
  if (pathname === '/doc/Dynnik.pdf') return 'public/documents/library/history-publications/dynnik.pdf';

  if (pathname.startsWith('/doc/doc/stat_')) {
    const year = yearFromText(pathname);
    return `public/documents/institute/statute/statute-${year}.pdf`;
  }

  if (pathname === '/doc/doc/strategy.pdf') {
    return 'public/documents/institute/strategy/development-strategy-2021-2025.pdf';
  }

  if (pathname.startsWith('/l/ua/ns/doc/')) {
    return `public/documents/scientific-cooperation/${clean}`;
  }

  if (pathname.startsWith('/doc/young_scientists/')) {
    const names = {
      'doc1.pdf': 'nasu-young-scientists-council-regulation.pdf',
      'doc2.pdf': 'institute-young-scientists-council-regulation.pdf',
      'doc3.pdf': 'scientific-and-technical-activity-law.pdf'
    };
    return `public/documents/young-scientists/regulations/${names[filename] ?? clean}`;
  }

  const currentDefense = pathname.match(/^\/doc\/postgraduate\/dis\/(2025|2026)\/(\d+)\/(.+)$/);
  if (currentDefense) {
    const [, year, number, file] = currentDefense;
    return `public/documents/dissertations/${year}/${number}/${defenseDocumentName(file)}`;
  }

  const archiveDefense = pathname.match(/^\/(?:doc|3doc)\/postgraduate\/dis\/(20\d{2})\/(.+)$/);
  if (archiveDefense) {
    const [, year, file] = archiveDefense;
    return `public/documents/dissertations/archive/${year}/${cleanFilename(file)}`;
  }

  if (pathname.startsWith('/doc/postgraduate/2026/')) {
    const admission = {
      'pravyla_pryjomu_2026.pdf': 'admission-rules-2026.pdf',
      'vymogy_do_dd_2026.pdf': 'research-proposal-requirements-2026.pdf',
      'exame_program.pdf': 'entrance-exam-program-2026.pdf',
      'poryadok_ocinyuvannya_2026.pdf': 'assessment-procedure-2026.pdf'
    };
    return `public/documents/postgraduate/admission/2026/${admission[filename] ?? clean}`;
  }

  const onp = pathname.match(/^\/doc\/postgraduate\/onp\/(20\d{2})\.pdf$/);
  if (onp) return `public/documents/postgraduate/program/onp/educational-program-${onp[1]}.pdf`;

  const curriculum = pathname.match(/^\/doc\/postgraduate\/np\/np_(20\d{2})\.pdf$/);
  if (curriculum) return `public/documents/postgraduate/program/curricula/curriculum-${curriculum[1]}.pdf`;

  const syllabus = pathname.match(/^\/doc\/postgraduate\/program\/(20\d{2})\/(.+)$/);
  if (syllabus) {
    const [, year, file] = syllabus;
    return `public/documents/postgraduate/program/syllabi/${year}/${cleanFilename(file)}`;
  }

  const review = pathname.match(/^\/doc\/postgraduate\/vidguk\/(.+)$/);
  if (review) {
    const file = cleanFilename(review[1]).replace(/^vidguk/, 'review');
    return `public/documents/postgraduate/program/reviews/${yearFromText(file)}/${file}`;
  }

  const survey = pathname.match(/^\/doc\/postgraduate\/opit\/(.+)$/);
  if (survey) {
    const file = cleanFilename(survey[1]).replace(/^ro-/, 'survey-');
    return `public/documents/postgraduate/program/surveys/${yearFromText(file)}/${file}`;
  }

  const schedule = pathname.match(/^\/doc\/postgraduate\/shedule\/2025_2026\/shedule_2025_2026_(\d)\.pdf$/);
  if (schedule) return `public/documents/postgraduate/schedule/2025-2026/year-${schedule[1]}.pdf`;

  if (pathname.startsWith('/doc/postgraduate/')) {
    const mapped = mapPostgraduateRegulation(filename);
    if (mapped) {
      if (mapped.startsWith('../doctoral/')) return `public/documents/${mapped.slice('../'.length)}`;
      return `public/documents/postgraduate/${mapped}`;
    }
  }

  return `public/documents/_incoming/${clean}`;
}

const { header, rows } = readCsv(csvPath);
let changed = 0;
const unresolved = [];

for (const row of rows) {
  const oldPath = row.suggested_new_path;
  const proposed = proposePath(row.old_url);

  if (oldPath !== proposed) {
    row.suggested_new_path = proposed;
    changed += 1;
  }

  if (proposed.includes('/_incoming/')) {
    unresolved.push(row.old_url);
  }
}

const duplicates = new Map();
for (const row of rows) {
  const target = row.suggested_new_path;
  if (!duplicates.has(target)) duplicates.set(target, []);
  duplicates.get(target).push(row.old_url);
}
const duplicateTargets = [...duplicates.entries()].filter(([, urls]) => urls.length > 1);

console.log(writeMode ? 'Path preparation mode: WRITE' : 'Path preparation mode: DRY RUN');
console.log(`CSV: ${path.relative(root, csvPath)}`);
console.log(`Rows: ${rows.length}`);
console.log(`Rows to update: ${changed}`);
console.log(`Unresolved _incoming paths after mapping: ${unresolved.length}`);
console.log(`Duplicate target paths: ${duplicateTargets.length}`);

if (unresolved.length > 0) {
  console.log('\nUnresolved examples:');
  for (const url of unresolved.slice(0, 20)) console.log(`- ${url}`);
}

if (duplicateTargets.length > 0) {
  console.log('\nDuplicate targets:');
  for (const [target, urls] of duplicateTargets.slice(0, 20)) {
    console.log(`- ${target}`);
    for (const url of urls) console.log(`  · ${url}`);
  }
}

if (writeMode) {
  const backupPath = `${csvPath}.bak`;
  fs.copyFileSync(csvPath, backupPath);
  writeCsv(csvPath, header, rows);
  console.log(`\nBackup created: ${path.relative(root, backupPath)}`);
  console.log(`Updated: ${path.relative(root, csvPath)}`);
} else {
  console.log('\nDry run only. To update suggested_new_path values, run:');
  console.log('node ./scripts/prepare-document-migration-paths.mjs --write');
}
