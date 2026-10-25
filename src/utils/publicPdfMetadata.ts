import { statSync } from 'node:fs';
import path from 'node:path';

export const LARGE_PDF_BYTES = 10_000_000;

export interface PublicPdfMetadata {
  bytes: number;
  megabytes: string;
  large: boolean;
}

/**
 * Read sizes from the committed original PDFs during Astro's static build.
 * Nothing is modified, recompressed or read into memory by this helper.
 */
export function publicDissertationPdfMetadata(url: string): PublicPdfMetadata | null {
  if (!/^\/documents\/dissertations\/[a-zA-Z0-9/_-]+\.pdf$/.test(url)) return null;
  const filepath = path.resolve(process.cwd(), 'public', url.slice(1));
  const { size } = statSync(filepath);
  if (size < 5) throw new Error('Unexpectedly small dissertation PDF: ' + url);
  return {
    bytes: size,
    megabytes: (size / 1_000_000).toFixed(2),
    large: size > LARGE_PDF_BYTES
  };
}
