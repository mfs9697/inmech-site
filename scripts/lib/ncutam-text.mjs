import fs from 'node:fs';

// Git's checkout settings may produce LF, CRLF or (in older sources) bare CR.
// Normalize in memory for validators only; never rewrite institutional records.
export const normalizeNewlines = (text) => text.replace(/\r\n?/g, '\n');
export const readNormalizedText = (absolutePath) =>
  normalizeNewlines(fs.readFileSync(absolutePath, 'utf8'));

export function topLevelYamlRecords(source) {
  const text = normalizeNewlines(source);
  if (text.trim() === '[]') return [];
  const starts = [...text.matchAll(/^- id:\s*([^\n]+)$/gm)];
  return starts.map((match, index) => ({
    id: match[1].trim().replace(/^['"]|['"]$/g, ''),
    text: text.slice(match.index, starts[index + 1]?.index ?? text.length)
  }));
}

export function yamlField(record, name) {
  const match = record.text.match(new RegExp('^  ' + name + ':\\s*(.+)$', 'm'));
  return match?.[1]?.trim().replace(/^['"]|['"]$/g, '');
}

export function hasResponsibilityList(record, language = 'uk') {
  const key = language === 'en' ? 'responsibilitiesEn' : 'responsibilities';
  return new RegExp('\\n  ' + key + ':\\n(?:    - .+\\n?)+', 'm')
    .test(normalizeNewlines(record.text));
}

export function activityFrontmatter(source) {
  const text = normalizeNewlines(source);
  return text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
}

export function activityGalleryItems(frontmatter) {
  const text = normalizeNewlines(frontmatter);
  return [...text.matchAll(/^  - src:\s*["']?([^"'\n]+)["']?\s*\n((?:    .+\n?)*)/gm)]
    .map((match) => ({ src: match[1], fields: match[2] }));
}

export function activityDocumentIds(frontmatter) {
  const text = normalizeNewlines(frontmatter);
  const block = text.match(/^documents:\n((?:  - .+\n?)*)/m)?.[1] ?? '';
  return [...block.matchAll(/^  -\s*["']?([^"'\n]+)["']?\s*$/gm)].map((match) => match[1]);
}

export function documentManifestPaths(source) {
  const text = normalizeNewlines(source);
  return [...text.matchAll(/^  path:\s*["']?([^"'\n]+)["']?\s*$/gm)].map((match) => match[1]);
}
