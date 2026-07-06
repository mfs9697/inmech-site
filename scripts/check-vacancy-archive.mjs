import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const vacancyDirectory = path.resolve('public/vacancies');
const requiredDocuments = [
  'order-competition.pdf',
  'order-participants.pdf',
  'order-results.pdf'
];

function matchBalanced(source, startIndex, openChar, closeChar) {
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = startIndex; index < source.length; index += 1) {
    const char = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }

    if (char === openChar) depth += 1;
    if (char === closeChar) {
      depth -= 1;
      if (depth === 0) return source.slice(startIndex, index + 1);
    }
  }

  throw new Error(`Could not find matching ${closeChar}.`);
}

function extractArray(source, marker) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) throw new Error(`Could not find ${marker}.`);

  const assignmentIndex = source.indexOf('=', markerIndex);
  if (assignmentIndex === -1) throw new Error(`Could not find assignment for ${marker}.`);

  const startIndex = source.indexOf('[', assignmentIndex);
  if (startIndex === -1) throw new Error(`Could not find array for ${marker}.`);

  return matchBalanced(source, startIndex, '[', ']');
}

function splitTopLevelObjects(arraySource) {
  const records = [];
  let depth = 0;
  let quote = null;
  let escaped = false;
  let startIndex = -1;

  for (let index = 0; index < arraySource.length; index += 1) {
    const char = arraySource[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }

    if (char === '{') {
      if (depth === 0) startIndex = index;
      depth += 1;
    }

    if (char === '}') {
      depth -= 1;
      if (depth === 0 && startIndex !== -1) {
        records.push(arraySource.slice(startIndex, index + 1));
        startIndex = -1;
      }
    }
  }

  return records;
}

function extractStringProperty(record, property) {
  const match = record.match(new RegExp(`\\b${property}:\\s*'([^']*)'`));
  if (!match) throw new Error(`Missing string property ${property}.`);
  return match[1];
}

function extractNumberProperty(record, property) {
  const match = record.match(new RegExp(`\\b${property}:\\s*(\\d+)`));
  if (!match) throw new Error(`Missing number property ${property}.`);
  return Number(match[1]);
}

function countPositionEntries(record) {
  const positionsIndex = record.indexOf('positions:');
  if (positionsIndex === -1) throw new Error('Missing positions array.');

  const startIndex = record.indexOf('[', positionsIndex);
  const positionsSource = matchBalanced(record, startIndex, '[', ']');
  return splitTopLevelObjects(positionsSource).length;
}

function extractVacancies(source) {
  const arraySource = extractArray(source, 'const competitions');
  return splitTopLevelObjects(arraySource).map((record) => ({
    id: extractStringProperty(record, 'id'),
    date: extractStringProperty(record, 'date'),
    year: extractNumberProperty(record, 'year'),
    positionCount: countPositionEntries(record)
  }));
}

async function readVacancies(filePath) {
  return extractVacancies(await readFile(filePath, 'utf8'));
}

async function listVacancyFolders() {
  const entries = await readdir(vacancyDirectory, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
}

function compareVacancyRecords(ukRecords, enRecords) {
  const failures = [];

  if (ukRecords.length !== enRecords.length) {
    failures.push(`Ukrainian archive has ${ukRecords.length} records, English archive has ${enRecords.length}.`);
  }

  const enById = new Map(enRecords.map((record) => [record.id, record]));

  for (const [index, ukRecord] of ukRecords.entries()) {
    const enRecord = enById.get(ukRecord.id);
    if (!enRecord) {
      failures.push(`Missing English vacancy record for ${ukRecord.id}.`);
      continue;
    }

    if (enRecords[index]?.id !== ukRecord.id) {
      failures.push(`Record order differs at index ${index + 1}: Ukrainian ${ukRecord.id}, English ${enRecords[index]?.id ?? 'missing'}.`);
    }
    if (enRecord.date !== ukRecord.date) {
      failures.push(`${ukRecord.id}: Ukrainian date ${ukRecord.date} differs from English date ${enRecord.date}.`);
    }
    if (enRecord.year !== ukRecord.year) {
      failures.push(`${ukRecord.id}: Ukrainian year ${ukRecord.year} differs from English year ${enRecord.year}.`);
    }
    if (enRecord.positionCount !== ukRecord.positionCount) {
      failures.push(`${ukRecord.id}: Ukrainian position count ${ukRecord.positionCount} differs from English count ${enRecord.positionCount}.`);
    }
    if (!ukRecord.id.startsWith(`${ukRecord.date}-`)) {
      failures.push(`${ukRecord.id}: ID must start with the display/source date ${ukRecord.date}.`);
    }
  }

  return failures;
}

function checkDocuments(records, folders) {
  const failures = [];
  const recordIds = new Set(records.map((record) => record.id));

  for (const record of records) {
    const folder = path.join(vacancyDirectory, record.id);
    if (!existsSync(folder)) {
      failures.push(`${record.id}: missing folder public/vacancies/${record.id}.`);
      continue;
    }

    for (const documentName of requiredDocuments) {
      const documentPath = path.join(folder, documentName);
      if (!existsSync(documentPath)) {
        failures.push(`${record.id}: missing ${documentName}.`);
      }
    }
  }

  for (const folder of folders) {
    if (!recordIds.has(folder)) {
      failures.push(`public/vacancies/${folder}: folder is not referenced by the vacancy data.`);
    }
  }

  return failures;
}

async function main() {
  const ukRecords = await readVacancies(path.resolve('src/data/vacancies.ts'));
  const enRecords = await readVacancies(path.resolve('src/data/vacanciesEn.ts'));
  const folders = await listVacancyFolders();
  const failures = [
    ...compareVacancyRecords(ukRecords, enRecords),
    ...checkDocuments(ukRecords, folders)
  ];

  if (failures.length > 0) {
    console.error('Vacancy archive data must stay synchronized across languages and documents.');
    failures.forEach((failure) => console.error(`  - ${failure}`));
    process.exit(1);
  }

  console.log(`Checked ${ukRecords.length} bilingual vacancy record(s) and ${requiredDocuments.length} PDF document(s) per record.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
