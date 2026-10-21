import { z } from 'astro/zod';

const text = z.string().trim().min(1);
const sha256 = z.string().regex(/^[a-f0-9]{64}$/);
const bytes = z.number().int().positive();
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
  const parsed = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}, 'Expected a real calendar date');
const sourceUrl = z.string().url().refine((value) => {
  const url = new URL(value);
  return ['https:', 'http:'].includes(url.protocol)
    && ['election.inmech.kyiv.ua', 'old.inmech.kyiv.ua', 'inmech.kyiv.ua'].includes(url.hostname)
    && !url.username && !url.password && !url.port && !url.hash && !url.search;
}, 'Expected an original Institute source URL');
const observation = {
  url: sourceUrl,
  originalFilename: text,
  checkedAt: z.iso.datetime()
};
const source = z.discriminatedUnion('sourceStatus', [
  z.object({
    ...observation,
    sourceStatus: z.literal('available'),
    httpStatus: z.literal(200),
    finalUrl: sourceUrl,
    mimeType: text,
    bytes,
    sha256
  }).strict(),
  z.object({
    ...observation,
    sourceStatus: z.literal('missing'),
    httpStatus: z.literal(404)
  }).strict()
]);
const common = {
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  electionYear: z.literal(2026),
  title: text,
  titleEn: text,
  kind: z.enum(['meeting-material', 'order', 'regulation', 'meeting-protocol', 'commission-protocol', 'form', 'strategy', 'extract']),
  language: z.enum(['uk', 'und']),
  format: z.enum(['pdf', 'docx']),
  mimeType: z.enum(['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
  originalFilename: text,
  dates: z.array(z.object({
    type: z.enum(['issued', 'published', 'event', 'document', 'approved', 'agreed', 'considered', 'referenced-meeting']),
    date,
    evidence: text
  }).strict()),
  note: text,
  noteEn: text,
  sources: z.array(source).min(1)
};

// Shared by Astro's file loader and the offline integrity checker. Missing
// sources cannot acquire a download path, file size or invented checksum.
export const electionDocumentSchema = z.discriminatedUnion('sourceStatus', [
  z.object({
    ...common,
    sourceStatus: z.literal('preserved'),
    storage: z.enum(['existing', 'added']),
    path: z.string().regex(/^\/documents\/(?:[a-z0-9-]+\/)+[a-z0-9-]+\.(?:pdf|docx)$/),
    bytes,
    sha256,
    variantOf: z.string().optional()
  }).strict(),
  z.object({
    ...common,
    sourceStatus: z.literal('missing'),
    referenceUrl: sourceUrl
  }).strict()
]);
