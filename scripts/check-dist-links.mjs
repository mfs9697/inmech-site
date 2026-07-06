import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const outputDirectory = path.resolve(process.argv[2] || 'dist');
const siteOrigin = 'https://new.inmech.kyiv.ua';

const ignoredSchemes = /^(?:mailto|tel|javascript|data|blob):/i;
const hrefPattern = /\shref=["']([^"']+)["']/gi;
const scriptPattern = /<script\b[\s\S]*?<\/script>/gi;

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectHtmlFiles(entryPath));
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(entryPath);
  }

  return files;
}

async function pathExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function normalizeReference(reference) {
  const trimmed = reference.trim();
  if (!trimmed || trimmed.startsWith('#') || ignoredSchemes.test(trimmed)) return null;

  try {
    const parsed = new URL(trimmed, siteOrigin);
    if (parsed.origin !== siteOrigin) return null;
    return parsed.pathname;
  } catch {
    return null;
  }
}

function candidatePaths(pathname) {
  const cleanPath = pathname.replace(/\/+/g, '/');
  const variants = new Set([cleanPath]);

  try {
    variants.add(decodeURIComponent(cleanPath));
  } catch {
    // Keep the original path if it is not valid percent-encoding.
  }

  return [...variants].flatMap((variant) => {
    const withoutLeadingSlash = variant.replace(/^\/+/, '');
    const basePath = path.join(outputDirectory, withoutLeadingSlash);

    if (variant.endsWith('/')) return [path.join(basePath, 'index.html')];
    if (path.extname(variant)) return [basePath];

    return [basePath, `${basePath}.html`, path.join(basePath, 'index.html')];
  });
}

function referencesFromHtml(html) {
  const references = [];
  const documentHtml = html.replace(scriptPattern, '');

  for (const match of documentHtml.matchAll(hrefPattern)) {
    references.push(match[1]);
  }

  return references;
}

const htmlFiles = await collectHtmlFiles(outputDirectory);
if (htmlFiles.length === 0) throw new Error(`No HTML files found in ${outputDirectory}`);

const failures = [];
let checkedReferences = 0;

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  if (!/<html(?:\s|>)/i.test(html)) continue;

  const relativeFile = path.relative(outputDirectory, file);

  for (const reference of referencesFromHtml(html)) {
    const pathname = normalizeReference(reference);
    if (!pathname) continue;

    checkedReferences += 1;
    const exists = await Promise.any(
      candidatePaths(pathname).map(async (candidate) => {
        if (await pathExists(candidate)) return true;
        throw new Error(candidate);
      })
    ).catch(() => false);

    if (!exists) failures.push(`${relativeFile}: ${reference}`);
  }
}

if (failures.length) {
  console.error('Generated HTML contains broken local links.');
  failures.forEach((failure) => console.error(`  - ${failure}`));
  process.exit(1);
}

console.log(`Checked ${checkedReferences} generated local link reference(s).`);
