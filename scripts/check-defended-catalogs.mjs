import * as esbuild from 'esbuild';

const expectedTotal = 599;

async function bundleEvaluate(source) {
  const result = await esbuild.build({
    stdin: {
      contents: source,
      resolveDir: process.cwd(),
      sourcefile: 'defended-catalog-check-entry.ts',
      loader: 'ts'
    },
    bundle: true,
    platform: 'node',
    format: 'esm',
    write: false,
    logLevel: 'silent'
  });

  const code = encodeURIComponent(result.outputFiles[0].text);
  return import(`data:text/javascript;charset=utf-8,${code}`);
}

const ukrainianEntry = `
  import { defendedDissertationsA } from './src/data/defendedDissertationsA';
  import { defendedDissertationsB } from './src/data/defendedDissertationsB';
  import { defendedDissertationsV } from './src/data/defendedDissertationsV';
  import { defendedDissertationsG } from './src/data/defendedDissertationsG';
  import { defendedDissertationsD } from './src/data/defendedDissertationsD';
  import { defendedDissertationsE } from './src/data/defendedDissertationsE';
  import { defendedDissertationsZh } from './src/data/defendedDissertationsZh';
  import { defendedDissertationsZ } from './src/data/defendedDissertationsZ';
  import { defendedDissertationsI } from './src/data/defendedDissertationsI';
  import { defendedDissertationsK } from './src/data/defendedDissertationsK';
  import { defendedDissertationsL } from './src/data/defendedDissertationsL';
  import { defendedDissertationsM } from './src/data/defendedDissertationsM';
  import { defendedDissertationsN } from './src/data/defendedDissertationsN';
  import { defendedDissertationsO } from './src/data/defendedDissertationsO';
  import { defendedDissertationsP } from './src/data/defendedDissertationsP';
  import { defendedDissertationsR } from './src/data/defendedDissertationsR';
  import { defendedDissertationsS1 } from './src/data/defendedDissertationsS1';
  import { defendedDissertationsS2 } from './src/data/defendedDissertationsS2';
  import { defendedDissertationsT } from './src/data/defendedDissertationsT';
  import { defendedDissertationsU } from './src/data/defendedDissertationsU';
  import { defendedDissertationsF } from './src/data/defendedDissertationsF';
  import { defendedDissertationsKh } from './src/data/defendedDissertationsKh';
  import { defendedDissertationsTs } from './src/data/defendedDissertationsTs';
  import { defendedDissertationsCh } from './src/data/defendedDissertationsCh';
  import { defendedDissertationsSh } from './src/data/defendedDissertationsSh';
  import { defendedDissertationsShch } from './src/data/defendedDissertationsShch';
  import { defendedDissertationsEe } from './src/data/defendedDissertationsEe';
  import { defendedDissertationsYu } from './src/data/defendedDissertationsYu';
  import { defendedDissertationsYa } from './src/data/defendedDissertationsYa';

  export const ukrainianCatalog = [
    ...defendedDissertationsA,
    ...defendedDissertationsB,
    ...defendedDissertationsV,
    ...defendedDissertationsG,
    ...defendedDissertationsD,
    ...defendedDissertationsE,
    ...defendedDissertationsZh,
    ...defendedDissertationsZ,
    ...defendedDissertationsI,
    ...defendedDissertationsK,
    ...defendedDissertationsL,
    ...defendedDissertationsM,
    ...defendedDissertationsN,
    ...defendedDissertationsO,
    ...defendedDissertationsP,
    ...defendedDissertationsR,
    ...defendedDissertationsS1,
    ...defendedDissertationsS2,
    ...defendedDissertationsT,
    ...defendedDissertationsU,
    ...defendedDissertationsF,
    ...defendedDissertationsKh,
    ...defendedDissertationsTs,
    ...defendedDissertationsCh,
    ...defendedDissertationsSh,
    ...defendedDissertationsShch,
    ...defendedDissertationsEe,
    ...defendedDissertationsYu,
    ...defendedDissertationsYa
  ];
`;

const [{ ukrainianCatalog }, { defendedDissertationsEn }] = await Promise.all([
  bundleEvaluate(ukrainianEntry),
  bundleEvaluate("export { defendedDissertationsEn } from './src/data/defendedDissertationsEn';")
]);

const failures = [];

if (ukrainianCatalog.length !== expectedTotal) {
  failures.push(`Ukrainian defended dissertation catalog has ${ukrainianCatalog.length} records; expected ${expectedTotal}.`);
}

if (defendedDissertationsEn.length !== expectedTotal) {
  failures.push(`English defended dissertation catalog has ${defendedDissertationsEn.length} records; expected ${expectedTotal}.`);
}

const duplicateEnglishIds = new Map();

for (const entry of defendedDissertationsEn) {
  duplicateEnglishIds.set(entry.id, (duplicateEnglishIds.get(entry.id) ?? 0) + 1);

  if (!entry.id || !entry.author?.en || !entry.title?.en || !entry.degree?.en || !entry.year) {
    failures.push(`English defended dissertation entry is missing a required display field: ${JSON.stringify(entry)}`);
  }
}

const duplicates = [...duplicateEnglishIds.entries()].filter(([, count]) => count > 1);

if (duplicates.length > 0) {
  failures.push(`Duplicate English defended dissertation ids: ${duplicates.map(([id]) => id).join(', ')}`);
}

if (ukrainianCatalog.length !== defendedDissertationsEn.length) {
  failures.push(
    `Ukrainian and English defended dissertation catalog totals differ: ${ukrainianCatalog.length} vs ${defendedDissertationsEn.length}.`
  );
}

if (failures.length > 0) {
  console.error('Defended dissertation catalog check failed:');
  failures.forEach((failure) => console.error(`  - ${failure}`));
  process.exit(1);
}

console.log(`Checked defended dissertation catalogs: ${ukrainianCatalog.length} Ukrainian records and ${defendedDissertationsEn.length} English records.`);
