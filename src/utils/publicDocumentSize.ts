import { statSync } from 'node:fs';
import path from 'node:path';

/** Display real original sizes for large, unchanged dissertation PDFs. */
export function largeDissertationPdfSize(href: string): string | null {
  if (!/^\/documents\/dissertations\/\d{4}\/\d{2}\/[a-z0-9.-]+\.pdf$/.test(href)) return null;
  const file = path.join(process.cwd(), 'public', href.slice(1));
  try {
    const size = statSync(file).size;
    return size >= 10_000_000 ? (size / 1_000_000).toFixed(1) : null;
  } catch {
    return null;
  }
}
