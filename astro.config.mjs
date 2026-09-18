import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const siteUrl = process.env.INMECH_SITE_URL ?? 'https://inmech.kyiv.ua';

export default defineConfig({
  site: siteUrl,
  base: '/',
  output: 'static',
  redirects: {
    '/ncutam/members/in-memoriam': '/ncutam/members/former/',
    '/en/ncutam/members/in-memoriam': '/en/ncutam/members/former/'
  },
  integrations: [sitemap()]
});
