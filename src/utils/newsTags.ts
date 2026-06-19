import type { CollectionEntry } from 'astro:content';

export const allowedNewsTags = [
  'аспірантура',
  'конкурс',
  'ювілей',
  'вчена рада',
  'співпраця',
  'освітньо-наукова діяльність'
] as const;

const includesAny = (source: string, patterns: string[]) => patterns.some((pattern) => source.includes(pattern));

export function getVisibleNewsTags(entry: CollectionEntry<'news'>): string[] {
  const source = [
    entry.data.title,
    entry.data.description,
    entry.data.category,
    ...entry.data.tags
  ]
    .join(' ')
    .toLocaleLowerCase('uk-UA');

  const visibleTags: string[] = [];

  if (includesAny(source, ['аспірант', 'аспірантур'])) {
    visibleTags.push('аспірантура');
  }

  if (includesAny(source, ['конкурс', 'ваканс', 'заміщення вакантних посад'])) {
    visibleTags.push('конкурс');
  }

  if (includesAny(source, ['ювілей', '70-річ', '70 річ', '70-рiч', '70'])) {
    visibleTags.push('ювілей');
  }

  if (includesAny(source, ['вчена рада', 'вченої ради', 'вченою радою'])) {
    visibleTags.push('вчена рада');
  }

  if (includesAny(source, ['співпрац', 'візит', 'делегац', 'міжнародна співпраця'])) {
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
      'бібліотека'
    ])
  ) {
    visibleTags.push('освітньо-наукова діяльність');
  }

  return allowedNewsTags.filter((tag) => visibleTags.includes(tag));
}
