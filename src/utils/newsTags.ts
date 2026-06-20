import type { CollectionEntry } from 'astro:content';

export const allowedNewsTags = [
  'аспірантура',
  'конкурс',
  'ювілей',
  'вчена рада',
  'співпраця',
  'освітньо-наукова діяльність'
] as const;

export type NewsTag = (typeof allowedNewsTags)[number];

export const newsTagTranslations: Record<NewsTag, string> = {
  'аспірантура': 'Postgraduate studies',
  'конкурс': 'Competition',
  'ювілей': 'Anniversary',
  'вчена рада': 'Academic Council',
  'співпраця': 'Cooperation',
  'освітньо-наукова діяльність': 'Education and research training'
};

export const allowedNewsTagsEn = allowedNewsTags.map((tag) => newsTagTranslations[tag]);

const includesAny = (source: string, patterns: string[]) => patterns.some((pattern) => source.includes(pattern));

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

  if (includesAny(source, ['аспірант', 'аспірантур', 'postgraduate'])) {
    visibleTags.push('аспірантура');
  }

  if (includesAny(source, ['конкурс', 'ваканс', 'заміщення вакантних посад', 'competition', 'vacancy', 'vacancies'])) {
    visibleTags.push('конкурс');
  }

  if (includesAny(source, ['ювілей', '70-річ', '70 річ', '70-рiч', 'anniversary', '70th'])) {
    visibleTags.push('ювілей');
  }

  if (includesAny(source, ['вчена рада', 'вченої ради', 'вченою радою', 'academic council', 'scientific council'])) {
    visibleTags.push('вчена рада');
  }

  if (includesAny(source, ['співпрац', 'візит', 'делегац', 'міжнародна співпраця', 'cooperation', 'visit', 'delegation'])) {
    visibleTags.push('співпраця');
  }

  if (
    includesAny(source, [
      'освіт',
      'науков',
      'акредитац',
      'онп',
      'iutam',
      'журнал',
      'прикладна механіка',
      'видання',
      'нан україни',
      'міжнародна співпраця',
      'бібліотека',
      'education',
      'research',
      'accreditation',
      'journal',
      'applied mechanics',
      'publication',
      'nas of ukraine',
      'library'
    ])
  ) {
    visibleTags.push('освітньо-наукова діяльність');
  }

  return allowedNewsTags.filter((tag) => visibleTags.includes(tag));
}

export function getVisibleNewsTagsEn(entry: CollectionEntry<'news'>): string[] {
  return getVisibleNewsTags(entry).map((tag) => newsTagTranslations[tag]);
}
