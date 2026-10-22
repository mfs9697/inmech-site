import assert from 'node:assert/strict';
import fs from 'node:fs';

const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021];

for (const language of ['uk', 'en']) {
  const sourcePath = language === 'uk'
    ? 'src/pages/dissertations.astro'
    : 'src/pages/en/dissertations.astro';
  const generatedPath = language === 'uk'
    ? 'dist/dissertations/index.html'
    : 'dist/en/dissertations/index.html';
  const prefix = language === 'uk' ? '' : '/en';
  const source = fs.readFileSync(sourcePath, 'utf8');
  const generated = fs.readFileSync(generatedPath, 'utf8');

  // The selector also appears in an earlier shared card-style group.
  // Check the dedicated layout rule, not the first generic background rule.
  const layout = [...source.matchAll(/\.catalog-cta-panel\s*\{([^}]+)\}/g)]
    .map((match) => match[1])
    .find((rule) => rule.includes('grid-template-columns:'));
  assert(layout, language + ': missing archive panel styles');
  assert(/grid-template-columns:\s*minmax\(0,\s*1fr\)\s*;/.test(layout),
    language + ': archive callout must have a single available-width column');
  assert(!/grid-template-columns:[^;]*\bauto\b/.test(layout),
    language + ': archive actions must not claim an auto-sized grid column');

  const copy = source.match(/\.catalog-cta-copy\s*\{([^}]+)\}/)?.[1];
  assert(copy && /min-width:\s*0/.test(copy), language + ': archive description may not shrink to min-content');
  const actions = source.match(/\.catalog-cta-actions\s*\{([^}]+)\}/)?.[1];
  assert(actions && /width:\s*100%/.test(actions), language + ': archive links need full line width');
  const button = source.match(/\.catalog-cta-actions \.button\s*\{([^}]+)\}/)?.[1];
  assert(button && /white-space:\s*normal/.test(button) &&
    /max-width:\s*100%/.test(button), language + ': long archive button labels must wrap');

  const mobile = source.match(/@media\s*\(max-width:\s*600px\)\s*\{([\s\S]*?)\n  \}/)?.[1];
  assert(mobile && /grid-template-columns:\s*minmax\(0,\s*1fr\)/.test(mobile),
    language + ': archive actions must stack on phones');

  const section = generated.match(/<section\b[^>]*class="[^"]*\bcatalog-cta-section\b[^"]*"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert(section, language + ': archive callout missing in built page');
  assert(section.includes('catalog-cta-copy') && section.includes('catalog-cta-actions'),
    language + ': archive copy/actions must be separate named containers');
  const hrefs = [...section.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  const expected = [
    prefix + '/defended-dissertations/',
    ...years.map((year) => prefix + '/dissertations/archive/' + year + '/')
  ];
  assert.equal(hrefs.length, 8, language + ': expected catalogue and seven archive links');
  assert.deepEqual([...hrefs].sort(), [...expected].sort(),
    language + ': archive links missing, duplicated or changed');

  console.log(language.toUpperCase() +
    ' dissertation callout: full-width copy; seven linked archive years; wrapped desktop/mobile actions.');
}
