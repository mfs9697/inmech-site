/**
 * Post-deployment election archive smoke test.
 *
 * --self-test: offline validation of the generated HTML and preserved originals.
 * (default): read-only production HTTP verification after the deployment marker
 * has been checked by the GitHub Actions workflow. No legacy hosts are changed.
 */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const docs = JSON.parse(readFileSync(path.join(root, 'src/data/elections/2026/documents.json'), 'utf8'));
const legacy = JSON.parse(readFileSync(path.join(root, 'src/data/elections/2026/legacy-routes.json'), 'utf8'));
const pages = [
  '/director-election/',
  '/director-election/2026/',
  '/director-election/2026/regulations/',
  '/director-election/2026/documents/organizing-committee/',
  '/director-election/2026/candidates/programme/',
  '/director-election/2026/voting/voters/',
  '/director-election/2026/results/commission-protocol/'
];
const localePages = pages.flatMap(p => [p, '/en' + p]);
const byId = new Map(docs.map(d => [d.id, d]));

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}
function validateHtml(html, p) {
  const english = p.startsWith('/en/');
  const canonical = 'https://inmech.kyiv.ua' + p;
  const ua = p.replace(/^\/en(?=\/)/, '');
  const en = '/en' + ua;
  assert(html.includes('<html lang="' + (english ? 'en' : 'uk') + '"'), 'Wrong language at ' + p);
  assert(html.includes('rel="canonical" href="' + canonical + '"'), 'Wrong canonical at ' + p);
  assert(html.includes('hreflang="uk" href="https://inmech.kyiv.ua' + ua + '"'), 'Wrong Ukrainian alternate at ' + p);
  assert(html.includes('hreflang="en" href="https://inmech.kyiv.ua' + en + '"'), 'Wrong English alternate at ' + p);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, 'Expected one H1 at ' + p);
  if (p.endsWith('/2026/')) {
    assert(html.includes('id="election-documents"'), 'Document index missing: ' + p);
    assert(html.includes('id="election-results"'), 'Results section missing: ' + p);
  }
  if (p.endsWith('/voting/voters/')) {
    assert(html.includes(english ? 'Voter-roll publication review' : 'Перевірка оприлюднення списку'), 'Voter-roll review disclosure missing: ' + p);
  }
  if (p.endsWith('/results/commission-protocol/')) {
    assert(html.includes('href="' + byId.get('election-commission-protocol').path + '"'), 'Signed original not linked: ' + p);
  }
}

function offlineCheck() {
  assert.equal(legacy.htmlRoutes.length, 25, 'Expected historical HTML inventory');
  assert.equal(new Set(legacy.htmlRoutes.map(r => r.targetPath)).size, 22);
  assert(legacy.htmlRoutes.every(r => r.targetState === 'built'), 'Unbuilt history destination');
  assert.equal(docs.length, 10, 'Nine original documents + one missing extract');
  const found = docs.filter(d => d.sourceStatus === 'preserved');
  assert.equal(found.length, 9);
  const missing = docs.filter(d => d.sourceStatus === 'missing');
  assert.equal(missing.length, 1);
  assert.equal(missing[0].id, 'committee-protocol-5-extract');
  assert(!('path' in missing[0]) && !('sha256' in missing[0]), 'Missing extract must not have a fake download');
  for (const doc of found) {
    assert(/^\/documents\/[a-z0-9/_-]+\.(pdf|docx)$/.test(doc.path), 'Unrecognized approved file path');
    const file = path.join(root, 'public', doc.path.slice(1));
    assert(existsSync(file), 'Approved source file not present: ' + doc.id);
    const bytes = readFileSync(file);
    assert.equal(bytes.length, doc.bytes, 'Source file size differs: ' + doc.id);
    assert.equal(sha256(bytes), doc.sha256, 'Source file hash differs: ' + doc.id);
  }
  for (const p of localePages) {
    const file = path.join(root, 'dist', p.slice(1), 'index.html');
    assert(existsSync(file), 'Rendered page missing: ' + p);
    validateHtml(readFileSync(file, 'utf8'), p);
  }
  console.log('Offline election-production plan passed: 14 representative UA/EN pages; nine pinned originals; 25-to-22 legacy map; missing extract remains missing.');
}
async function get(base, p) {
  const url = new URL(base + p);
  const response = await fetch(url, {
    redirect: 'manual',
    headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
    signal: AbortSignal.timeout(40000)
  });
  assert.equal(response.status, 200, p + ' returned HTTP ' + response.status + ' (redirects are not accepted for canonical resources)');
  const bytes = Buffer.from(await response.arrayBuffer());
  return { mime: (response.headers.get('content-type') || '').split(';')[0].trim().toLowerCase(), bytes };
}
async function productionCheck() {
  const base = (process.env.INMECH_SITE_URL || 'https://inmech.kyiv.ua').replace(/\/+$/, '');
  const expectedSha = process.env.GITHUB_SHA;
  assert.equal(new URL(base).protocol, 'https:', 'Production checks require HTTPS');
  assert(/^[0-9a-f]{40}$/.test(expectedSha || ''), 'GITHUB_SHA must be the deployed 40-character commit SHA');
  const marker = await get(base, '/deploy-version.txt');
  assert.equal(marker.bytes.toString('utf8').trim(), expectedSha, 'The public deployment marker does not match this commit');
  for (const p of localePages) {
    const response = await get(base, p);
    assert.equal(response.mime, 'text/html', 'Wrong HTML Content-Type at ' + p);
    validateHtml(response.bytes.toString('utf8'), p);
    console.log('Public election page OK: ' + p);
  }
  for (const doc of docs.filter(d => d.sourceStatus === 'preserved')) {
    const response = await get(base, doc.path);
    assert.equal(response.mime, doc.mimeType.toLowerCase(), 'Incorrect original Content-Type: ' + doc.id);
    assert.equal(response.bytes.length, doc.bytes, 'Incorrect original bytes: ' + doc.id);
    assert.equal(sha256(response.bytes), doc.sha256, 'Original SHA-256 differs: ' + doc.id);
    if (doc.format === 'pdf') assert(response.bytes.subarray(0, 5).equals(Buffer.from('%PDF-')), 'Invalid PDF header: ' + doc.id);
    if (doc.format === 'docx') assert(response.bytes.subarray(0, 2).equals(Buffer.from('PK')), 'Invalid DOCX header: ' + doc.id);
    console.log('Public approved original OK: ' + doc.id + ' (' + response.bytes.length + ' bytes)');
  }
  console.log('Production election archive smoke checks passed: matching SHA, 14 HTML pages, nine exact-byte downloads, original MIME types.');
}

try {
  offlineCheck();
  if (!process.argv.includes('--self-test')) await productionCheck();
} catch (error) {
  console.error('Election production verification failed: ' + error.message);
  process.exitCode = 1;
}
