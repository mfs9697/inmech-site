import type { APIRoute } from 'astro';

export const prerender = true;

const pages = [
  '/',
  '/news/',
  '/history/',
  '/regulations/',
  '/strategy/',
  '/scientific-cooperation/',
  '/tender/',
  '/management/',
  '/departments/',
  '/scientific-council/',
  '/specialized-councils/',
  '/young-scientists/',
  '/services/',
  '/education/',
  '/postgraduate/',
  '/doctoral/',
  '/dissertations/',
  '/license-and-regulations/',
  '/trust-box/',
  '/nmr/',
  '/postgraduate/admission/',
  '/postgraduate/program/',
  '/postgraduate/accreditation/',
  '/postgraduate/schedule/',
  '/postgraduate/students/',
  '/postgraduate/supervisors/',
  '/postgraduate/research-topics/',
  '/sitemap/',
  '/accessibility/',
  '/site-administration/',
  '/en/',
  '/en/news/',
  '/en/history/',
  '/en/regulations/',
  '/en/strategy/',
  '/en/scientific-cooperation/',
  '/en/tender/',
  '/en/management/',
  '/en/departments/',
  '/en/scientific-council/',
  '/en/specialized-councils/',
  '/en/young-scientists/',
  '/en/services/',
  '/en/education/',
  '/en/postgraduate/',
  '/en/doctoral/',
  '/en/dissertations/',
  '/en/license-and-regulations/',
  '/en/trust-box/',
  '/en/nmr/',
  '/en/postgraduate/admission/',
  '/en/postgraduate/program/',
  '/en/postgraduate/accreditation/',
  '/en/postgraduate/schedule/',
  '/en/postgraduate/students/',
  '/en/postgraduate/supervisors/',
  '/en/postgraduate/research-topics/',
  '/en/sitemap/',
  '/en/search/',
  '/en/accessibility/',
  '/en/site-administration/'
];

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? 'https://new.inmech.kyiv.ua';
  const base = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');

  const urls = pages
    .map((path) => {
      const loc = new URL(`${base}${path}`, origin).href;
      return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n  </url>`;
    })
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8'
      }
    }
  );
};
