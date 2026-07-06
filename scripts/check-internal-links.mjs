import { mkdtemp, rm, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const defaultSiteUrl = 'https://new.inmech.kyiv.ua';
const ignoredSchemes = /^(?:mailto:|tel:|javascript:|data:|blob:|sms:|viber:|tg:|skype:)/i;
const staticAssetExtensions = new Set([
  '.avif',
  '.css',
  '.doc',
  '.docx',
  '.gif',
  '.ico',
  '.jpeg',
  '.jpg',
  '.js',
  '.json',
  '.map',
  '.pdf',
  '.png',
  '.rar',
  '.rtf',
  '.svg',
  '.txt',
  '.webp',
  '.xml',
  '.zip'
]);

async function collectHtmlFiles(directory) {
  const entries = await import('node:fs/promises').then(({ readdir }) => readdir(directory, { withFileTypes: true }));
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectHtmlFiles(entryPath));
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(entryPath);
  }

  return files;
}

function normalizeSiteUrl(rawUrl) {
  const site = new URL(rawUrl || defaultSiteUrl);
  site.hash = '';
  site.search = '';
  site.pathname = site.pathname.endsWith('/') ? site.pathname : `${site.pathname}/`;
  return site;
}

function pagePathForFile(outputDirectory, filePath) {
  const relativePath = path.relative(outputDirectory, filePath).split(path.sep).join('/');

  if (relativePath === 'index.html') return '/';
  if (relativePath.endsWith('/index.html')) return `/${relativePath.slice(0, -'index.html'.length)}`;
  return `/${relativePath}`;
}

function isTemplatedHref(href) {
  return href.includes('${') || href.includes('{{') || href.includes('<%');
}

function extractNavigationHrefs(html) {
  const hrefs = [];
  const linkPattern = /<(?:a|area)\b[^>]*\bhref=(["'])(.*?)\1/gi;

  for (const match of html.matchAll(linkPattern)) {
    hrefs.push(match[2]);
  }

  return hrefs;
}

function isIgnoredHref(href) {
  const value = href.trim();
  return (
    value === '' ||
    value.startsWith('#') ||
    ignoredSchemes.test(value) ||
    isTemplatedHref(value)
  );
}

function stripBasePath(pathname, basePath) {
  if (basePath === '/') return pathname;
  if (pathname === basePath.slice(0, -1)) return '/';
  if (pathname.startsWith(basePath)) return `/${pathname.slice(basePath.length)}`;
  return pathname;
}

function decodePathname(pathname) {
  try {
    return decodeURIComponent(pathname);
  } catch {
    return pathname;
  }
}

function resolveOutputPath(outputDirectory, pathname) {
  const relativePath = pathname.replace(/^\/+/, '');
  const candidate = path.resolve(outputDirectory, relativePath);

  if (candidate !== outputDirectory && !candidate.startsWith(`${outputDirectory}${path.sep}`)) {
    throw new Error(`Resolved path escapes output directory: ${pathname}`);
  }

  return candidate;
}

function candidateFilesFor(outputDirectory, pathname) {
  const outputPath = resolveOutputPath(outputDirectory, pathname);
  const extension = path.extname(pathname);

  if (pathname.endsWith('/')) return [path.join(outputPath, 'index.html')];
  if (extension === '.html') return [outputPath];
  if (extension) return [];

  return [
    path.join(outputPath, 'index.html'),
    `${outputPath}.html`
  ];
}

function classifyHref({ href, pagePath, outputDirectory, siteUrl }) {
  const trimmedHref = href.trim();
  if (isIgnoredHref(trimmedHref)) return { kind: 'ignored' };

  let url;
  try {
    url = new URL(trimmedHref, new URL(pagePath, siteUrl));
  } catch {
    return { kind: 'invalid', message: `invalid URL syntax: ${trimmedHref}` };
  }

  if (url.origin !== siteUrl.origin) return { kind: 'external' };

  const basePath = siteUrl.pathname;
  const pathname = decodePathname(stripBasePath(url.pathname, basePath));
  const extension = path.extname(pathname).toLowerCase();
  if (extension && extension !== '.html') {
    return staticAssetExtensions.has(extension) ? { kind: 'asset' } : { kind: 'external' };
  }

  try {
    const candidates = candidateFilesFor(outputDirectory, pathname);
    return { kind: 'internal', pathname, candidates };
  } catch (error) {
    return { kind: 'escape', message: error.message };
  }
}

async function checkInternalLinks(outputDirectory, siteUrl) {
  const htmlFiles = await collectHtmlFiles(outputDirectory);
  if (htmlFiles.length === 0) throw new Error(`No HTML files found in ${outputDirectory}`);

  const failures = [];
  const counts = {
    pages: 0,
    checked: 0,
    ignored: 0,
    external: 0,
    assets: 0
  };

  for (const filePath of htmlFiles) {
    const html = await import('node:fs/promises').then(({ readFile }) => readFile(filePath, 'utf8'));
    if (!/<html(?:\s|>)/i.test(html)) continue;

    counts.pages += 1;
    const pagePath = pagePathForFile(outputDirectory, filePath);

    for (const href of extractNavigationHrefs(html)) {
      const result = classifyHref({ href, pagePath, outputDirectory, siteUrl });

      if (result.kind === 'ignored') counts.ignored += 1;
      if (result.kind === 'external') counts.external += 1;
      if (result.kind === 'asset') counts.assets += 1;
      if (result.kind === 'invalid' || result.kind === 'escape') {
        failures.push(`${pagePath}: ${href} (${result.message})`);
      }
      if (result.kind === 'internal') {
        counts.checked += 1;
        if (!result.candidates.some((candidate) => existsSync(candidate))) {
          const relativeCandidates = result.candidates.map((candidate) => path.relative(outputDirectory, candidate).split(path.sep).join('/'));
          failures.push(`${pagePath}: ${href} -> missing ${relativeCandidates.join(' or ')}`);
        }
      }
    }
  }

  if (counts.pages === 0) throw new Error(`No HTML documents found in ${outputDirectory}`);
  return { failures, counts };
}

async function writeFixture(root, relativePath, html) {
  const filePath = path.join(root, relativePath);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, html);
}

async function runSelfTest() {
  const siteUrl = normalizeSiteUrl(process.env.INMECH_SITE_URL);
  const sameSiteOrigin = siteUrl.origin;
  const sameSiteHost = siteUrl.host;
  const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'inmech-link-check-'));

  try {
    await writeFixture(temporaryDirectory, 'index.html', `<!doctype html><html><body>
      <a href="/about/">root relative</a>
      <a href="${sameSiteOrigin}/about/">same-site absolute</a>
      <a href="//${sameSiteHost}/about/">same-site protocol-relative</a>
      <a href="docs/page.html?view=full#top">query hash</a>
      <a href="/encoded/%D1%82%D0%B5%D1%81%D1%82/">encoded</a>
      <a href="https://example.com/">external</a>
      <a href="mailto:inst_mech@inmech.kyiv.ua">mail</a>
      <a href="/documents/example.pdf">asset</a>
    </body></html>`);
    await writeFixture(temporaryDirectory, 'about/index.html', '<!doctype html><html><body><a href="../nested/relative/">document relative</a></body></html>');
    await writeFixture(temporaryDirectory, 'docs/page.html', '<!doctype html><html><body>ok</body></html>');
    await writeFixture(temporaryDirectory, 'encoded/тест/index.html', '<!doctype html><html><body>ok</body></html>');
    await writeFixture(temporaryDirectory, 'nested/relative/index.html', '<!doctype html><html><body>ok</body></html>');

    const passing = await checkInternalLinks(temporaryDirectory, siteUrl);
    if (passing.failures.length > 0) {
      throw new Error(`Expected passing fixture, got failures:\n${passing.failures.join('\n')}`);
    }
    if (passing.counts.external === 0) {
      throw new Error('Expected absolute external URL to be counted as external.');
    }

    await writeFixture(temporaryDirectory, 'broken/index.html', `<!doctype html><html><body>
      <a href="/missing/">missing</a>
      <a href="${sameSiteOrigin}/missing-absolute/">missing absolute</a>
      <a href="//${sameSiteHost}/missing-protocol-relative/">missing protocol-relative</a>
      <a href="/..%2fescaped/">escape</a>
    </body></html>`);
    const failing = await checkInternalLinks(temporaryDirectory, siteUrl);
    const hasMissing = failing.failures.some((failure) => failure.includes('/missing/'));
    const hasMissingAbsolute = failing.failures.some((failure) => failure.includes('/missing-absolute/'));
    const hasMissingProtocolRelative = failing.failures.some((failure) => failure.includes('/missing-protocol-relative/'));
    const hasEscape = failing.failures.some((failure) => failure.includes('escapes output directory'));

    if (!hasMissing || !hasMissingAbsolute || !hasMissingProtocolRelative || !hasEscape) {
      throw new Error(`Expected missing, same-site absolute, protocol-relative, and escape failures, got:\n${failing.failures.join('\n')}`);
    }

    console.log('Internal link checker self-test passed.');
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
}

async function main() {
  if (process.argv.includes('--self-test')) {
    await runSelfTest();
    return;
  }

  const outputDirectory = path.resolve(process.argv[2] || 'dist');
  const siteUrl = normalizeSiteUrl(process.env.INMECH_SITE_URL);
  const { failures, counts } = await checkInternalLinks(outputDirectory, siteUrl);

  if (failures.length > 0) {
    console.error('Generated internal page links must resolve within the built site.');
    failures.forEach((failure) => console.error(`  - ${failure}`));
    process.exit(1);
  }

  console.log(`Checked ${counts.checked} generated internal page link(s) across ${counts.pages} page(s).`);
  console.log(`Ignored ${counts.external} external, ${counts.assets} asset/download, and ${counts.ignored} non-navigation/template link(s).`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
