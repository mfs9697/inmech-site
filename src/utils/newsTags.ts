import type { CollectionEntry } from 'astro:content';

export const allowedNewsTags = [
  'аспірантура',
  'акредитація',
  'освіта',
  'конкурс',
  'ювілей',
  'вчена рада',
  'співпраця',
  'конференції',
  'семінари',
  'публікації',
  'оголошення'
] as const;

export type NewsTag = (typeof allowedNewsTags)[number];

export const newsTagTranslations: Record<NewsTag, string> = {
  'аспірантура': 'Postgraduate studies',
  'акредитація': 'Accreditation',
  'освіта': 'Education',
  'конкурс': 'Competitions and vacancies',
  'ювілей': 'Anniversaries',
  'вчена рада': 'Academic Council',
  'співпраця': 'Cooperation',
  'конференції': 'Conferences',
  'семінари': 'Seminars',
  'публікації': 'Publications',
  'оголошення': 'Announcements'
};

export const allowedNewsTagsEn = allowedNewsTags.map((tag) => newsTagTranslations[tag]);

const includesAny = (source: string, patterns: string[]) => patterns.some((pattern) => source.includes(pattern));
const addTag = (tags: NewsTag[], tag: NewsTag) => {
  if (!tags.includes(tag)) {
    tags.push(tag);
  }
};

export function getVisibleNewsTags(entry: CollectionEntry<'news'>): NewsTag[] {
  const source = [
    entry.data.title,
    entry.data.description,
    entry.data.category,
    entry.data.titleEn,
    entry.data.descriptionEn,
    entry.data.categoryEn,
    ...entry.data.tags,
    ...(entry.data.tagsEn ?? [])
  ]
    .filter(Boolean)
    .join(' ')
    .toLocaleLowerCase('uk-UA');

  const visibleTags: NewsTag[] = [];

  if (includesAny(source, ['аспірант', 'аспірантур', 'postgraduate', 'phd'])) {
    addTag(visibleTags, 'аспірантура');
  }

  if (includesAny(source, ['акредитац', 'accreditation'])) {
    addTag(visibleTags, 'акредитація');
  }

  if (includesAny(source, ['освітньо-науков', 'освітня діяльність', 'освіта', 'навчан', 'онп', 'education and research', 'educational', 'education', 'training'])) {
    addTag(visibleTags, 'освіта');
  }

  if (includesAny(source, ['конкурс', 'ваканс', 'заміщення вакантних посад', 'competition', 'vacancy', 'vacancies'])) {
    addTag(visibleTags, 'конкурс');
  }

  if (includesAny(source, ['ювілей', 'річниц', 'anniversary', 'jubilee'])) {
    addTag(visibleTags, 'ювілей');
  }

  if (includesAny(source, ['вчена рада', 'вченої ради', 'вченою радою', 'academic council', 'scientific council'])) {
    addTag(visibleTags, 'вчена рада');
  }

  if (includesAny(source, ['співпрац', 'візит', 'делегац', 'міжнародна співпраця', 'cooperation', 'collaboration', 'visit', 'delegation'])) {
    addTag(visibleTags, 'співпраця');
  }

  if (includesAny(source, ['конференц', 'симпозі', 'форум', 'секц', 'apmme', 'iutam', 'conference', 'symposium', 'forum', 'section'])) {
    addTag(visibleTags, 'конференції');
  }

  if (includesAny(source, ['семінар', 'вебінар', 'доповідь на семінарі', 'seminar', 'webinar'])) {
    addTag(visibleTags, 'семінари');
  }

  if (includesAny(source, ['публікац', 'видання', 'журнал', 'статт', 'монограф', 'прикладна механіка', 'publication', 'journal', 'paper', 'article', 'book', 'monograph', 'applied mechanics'])) {
    addTag(visibleTags, 'публікації');
  }

  if (includesAny(source, ['оголош', 'повідомлен', 'анонс', 'announcement', 'notice', 'call for'])) {
    addTag(visibleTags, 'оголошення');
  }

  return allowedNewsTags.filter((tag) => visibleTags.includes(tag));
}

export function getVisibleNewsTagsEn(entry: CollectionEntry<'news'>): string[] {
  return getVisibleNewsTags(entry).map((tag) => newsTagTranslations[tag]);
}
