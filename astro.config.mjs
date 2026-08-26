import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const siteUrl = process.env.INMECH_SITE_URL ?? 'https://inmech.kyiv.ua';

export default defineConfig({
  site: siteUrl,
  base: '/',
  output: 'static',
  integrations: [sitemap()]
});
