import { defineConfig } from 'astro/config';

const isInmechDeploy = process.env.DEPLOY_TARGET === 'inmech';

export default defineConfig({
  site: isInmechDeploy ? 'https://new.inmech.kyiv.ua' : 'https://mfs9697.github.io',
  base: isInmechDeploy ? '/' : '/inmech-site',
  output: 'static'
});
