import { getCollection } from 'astro:content';
import { siteRoutes } from './routes';
import { electionHistoryPages } from './elections/2026/history-pages';
import { activeVacancyAnnouncements, vacancyArchive } from './vacancies';
import { activeVacancyAnnouncementsEn, vacancyArchiveEn } from './vacanciesEn';
import { ncutamSections } from './ncutam/site';
import programmeDocs from './postgraduate/program-documents.json';
import { getEnglishNewsBody } from '../utils/newsBody';
import { getVisibleNewsTagsEn } from '../utils/newsTags';

export type SearchLanguage = 'uk' | 'en';

export interface SearchItem {
  title: string;
  url: string;
  type: string;
  description: string;
  keywords: string;
}

const text = (value: unknown) => typeof value === 'string' ? value : '';
const compact = (value: unknown, length = 900) => text(value)
  .replace(/<[^>]*>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, length);

const labels = {
  pages: ['Сторінки', 'Pages'],
  news: ['Новини', 'News'],
  departments: ['Наукові відділи', 'Research departments'],
  people: ['Співробітники', 'People'],
  vacancies: ['Конкурси', 'Vacancies'],
  election: ['Вибори директора', 'Director election'],
  documents: ['Документи', 'Documents'],
  education: ['Освітні документи', 'Education documents'],
  committee: ['НКУТПМ', 'NCUTAM']
} as const;

const local = (path: string, en: boolean) => en ? '/en' + path : path;

export async function buildSearchIndex(language: SearchLanguage): Promise<SearchItem[]> {
  const en = language === 'en';
  const entries: SearchItem[] = [];

  function add(title: unknown, url: string, type: keyof typeof labels, description: unknown = '', terms: unknown[] = []) {
    if (!text(title).trim() || !url.startsWith('/') || !(url.endsWith('/') || url.endsWith('.pdf'))) {
      throw new Error('Invalid search entry: ' + JSON.stringify({ title, url }));
    }
    entries.push({
      title: compact(title, 180),
      url,
      type: labels[type][en ? 1 : 0],
      description: compact(description, 280),
      keywords: compact(terms.map((term) => compact(term, 600)).filter(Boolean).join(' '), 1100)
    });
  }

  // Stable, known bilingual website routes.
  for (const route of siteRoutes) {
    const href = en ? route.en : route.uk;
    if (href.includes('#')) continue;
    add(en ? route.titleEn : route.titleUk, href, 'pages',
      en ? route.sectionEn : route.sectionUk, [en ? route.titleUk : route.titleEn]);
  }

  for (const entry of await getCollection('news')) {
    const d = entry.data;
    if (d.externalUrl && !d.externalUrl.startsWith('/')) continue;
    add(en ? (d.titleEn ?? d.title) : d.title,
      d.externalUrl ?? local('/news/' + entry.id + '/', en),
      'news', en ? (d.descriptionEn ?? d.description) : d.description,
      [d.category, d.categoryEn, ...(en ? (d.tagsEn ?? []) : d.tags),
       ...(en ? getVisibleNewsTagsEn(entry) : []), String(d.year),
       en ? getEnglishNewsBody(entry.body ?? '') : entry.body]);
  }

  for (const entry of await getCollection('departments')) {
    const d = entry.data;
    add(en ? (d.titleEn ?? d.title) : d.title,
      local('/departments/' + entry.id + '/', en), 'departments',
      en ? (d.summaryEn ?? d.summary) : d.summary,
      [d.head, d.headEn, d.shortTitle, d.shortTitleEn, d.group, d.groupEn,
       ...d.staff.map((person) => [person.name, person.nameEn].filter(Boolean).join(' ')),
       en ? d.sectionsEn.map((section) => [section.title, ...section.paragraphs].join(' ')).join(' ') : entry.body]);
  }

  for (const entry of await getCollection('people')) {
    const d = entry.data;
    add(en ? (d.nameEn ?? d.name) : d.name,
      local('/people/' + entry.id + '/', en), 'people',
      [en ? (d.positionEn ?? d.position) : d.position, en ? (d.departmentEn ?? d.department) : d.department,
       en ? (d.degreeEn ?? d.degree) : d.degree].filter(Boolean).join(' · '),
      [d.name, d.nameEn, d.academicTitle, d.academicTitleEn,
       ...(en ? d.researchAreasEn : d.researchAreas),
       en ? d.professionalActivityEn : d.professionalActivity]);
  }

  const active = en ? activeVacancyAnnouncementsEn : activeVacancyAnnouncements;
  const archived = en ? vacancyArchiveEn : vacancyArchive;
  for (const item of [...active, ...archived]) {
    const tracks = 'tracks' in item ? (item.tracks ?? []) : [];
    const order = 'orderNumber' in item ? item.orderNumber : '';
    add(item.title + ' · ' + item.date, local('/vacancies/', en), 'vacancies', item.summary,
      [item.id, item.date, String(item.year), order,
       ...item.positions.flatMap((position) => [position.title, ...(position.departments ?? []).map((d) => d.title)]),
       ...tracks.flatMap((track) => [track.title, track.label, track.deadline, track.researchTopic,
         ...track.positions.map((position) => position.title)])]);
  }

  for (const record of electionHistoryPages) {
    add(en ? record.titleEn : record.title,
      local('/director-election/2026/' + record.slug + '/', en),
      'election', en ? record.summaryEn : record.summary,
      [record.title, record.titleEn, record.group,
       en ? record.paragraphsEn.join(' ') : record.paragraphs.join(' '), '2026']);
  }

  for (const entry of await getCollection('electionDocuments')) {
    const d = entry.data;
    // Missing originals remain documented in the election archive, never as PDF results.
    if (d.sourceStatus !== 'preserved' || !d.path) continue;
    add(en ? d.titleEn : d.title, d.path, 'documents',
      en ? d.noteEn : d.note, [d.kind, d.electionYear, 'вибори директора', 'director election']);
  }

  for (const item of programmeDocs.programYears) {
    add(en ? 'Educational and research programme ' + item.year : 'Освітньо-наукова програма ' + item.year,
      item.program, 'education', en ? 'Original Ukrainian programme · PDF' : 'Документ ОНП · PDF',
      [item.year, 'ОНП', 'program']);
    add(en ? 'Curriculum ' + item.year : 'Навчальний план ' + item.year,
      item.curriculum, 'education', en ? 'Original Ukrainian curriculum · PDF' : 'Навчальний план · PDF',
      [item.year, 'curriculum']);
  }

  for (const [code, versions] of Object.entries(programmeDocs.syllabi)) {
    for (const doc of versions) {
      add(en ? 'Syllabus ' + code + ' · ' + doc.year : 'Силабус ' + code + ' · ' + doc.year,
        doc.href, 'education', en ? 'Original in Ukrainian · PDF' : 'Оригінальний документ · PDF',
        [code, doc.year, 'силабус', 'syllabus', 'робоча програма']);
    }
  }
  for (const review of programmeDocs.reviews) {
    for (const doc of review.documents) {
      add(en ? 'Programme review ' + doc.id + ' · ' + review.year : 'Відгук на програму ' + doc.id + ' · ' + review.year,
        doc.href, 'education', en ? 'Stakeholder review (Ukrainian original) · PDF' : 'Відгук стейкхолдера · PDF',
        ['відгук', 'рецензія', 'review', review.year, doc.id]);
    }
  }

  for (const section of ncutamSections) {
    add(en ? section.titleEn : section.title, local('/ncutam/' + section.id + '/', en),
      'committee', en ? section.descriptionEn : section.description,
      [section.id, 'НКУТПМ', 'NCUTAM', en ? section.title : section.titleEn]);
  }
  for (const entry of await getCollection('ncutamActivities')) {
    const d = entry.data;
    add(en ? d.titleEn : d.title, local('/ncutam/activity/' + entry.id + '/', en),
      'committee', en ? d.summaryEn : d.summary,
      [d.type, d.location, d.locationEn, d.date.getFullYear(), 'НКУТПМ', 'NCUTAM']);
  }
  for (const entry of await getCollection('ncutamDocuments')) {
    const d = entry.data;
    add(en ? d.titleEn : d.title, d.path, 'documents',
      en ? (d.noteEn ?? d.issuedByEn) : (d.note ?? d.issuedBy),
      [d.kind, d.year, d.status, 'НКУТПМ', 'NCUTAM', d.issuedBy, d.issuedByEn]);
  }

  const seen = new Set<string>();
  return entries.filter((item) => {
    const key = item.url + '\0' + item.title;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
