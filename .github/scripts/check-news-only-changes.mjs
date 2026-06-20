import { execFileSync } from 'node:child_process';

const newsOnlyActors = (process.env.NEWS_ONLY_ACTORS || '')
  .split(/[\s,]+/)
  .map((actor) => actor.trim().toLowerCase())
  .filter(Boolean);

const actor = (process.env.GITHUB_ACTOR || '').toLowerCase();
const before = process.env.GITHUB_EVENT_BEFORE || '';
const head = process.env.GITHUB_SHA || 'HEAD';
const zeroSha = /^0{40}$/;

if (newsOnlyActors.length === 0) {
  console.log('NEWS_ONLY_ACTORS is empty; news-only guard is not active.');
  process.exit(0);
}

if (!newsOnlyActors.includes(actor)) {
  console.log(`Actor "${process.env.GITHUB_ACTOR}" is not listed in NEWS_ONLY_ACTORS; skipping news-only guard.`);
  process.exit(0);
}

if (!before || zeroSha.test(before)) {
  console.log('No previous commit SHA is available for this event; skipping news-only guard.');
  process.exit(0);
}

const output = execFileSync('git', ['diff', '--name-only', before, head], {
  encoding: 'utf8'
});

const changedFiles = output
  .split('\n')
  .map((file) => file.trim())
  .filter(Boolean);

const allowedPrefixes = [
  'src/content/news/',
  'public/images/news/'
];

const disallowedFiles = changedFiles.filter(
  (file) => !allowedPrefixes.some((prefix) => file.startsWith(prefix))
);

if (disallowedFiles.length > 0) {
  console.error(`Actor "${process.env.GITHUB_ACTOR}" is configured as a news-only contributor.`);
  console.error('Only these paths are allowed for this contributor:');
  allowedPrefixes.forEach((prefix) => console.error(`  - ${prefix}`));
  console.error('Disallowed changed files:');
  disallowedFiles.forEach((file) => console.error(`  - ${file}`));
  console.error('Please move these changes to a reviewed pull request or ask an administrator to commit them.');
  process.exit(1);
}

console.log(`News-only guard passed for actor "${process.env.GITHUB_ACTOR}".`);
