import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const isInmechDeploy = process.env.DEPLOY_TARGET === 'inmech';
const inmechSiteUrl = process.env.INMECH_SITE_URL ?? 'https://new.inmech.kyiv.ua';

export default defineConfig({
  site: isInmechDeploy ? inmechSiteUrl : 'https://mfs9697.github.io',
  base: isInmechDeploy ? '/' : '/inmech-site',
  output: 'static',
  integrations: [sitemap()]
});
