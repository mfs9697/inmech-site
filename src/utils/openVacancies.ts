import type { ActiveVacancyAnnouncement } from '../data/vacancies.ts';

interface VacancyWindow {
  publicationDate: string;
  deadlineDate: string;
  count: number;
}

const kyivDate = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Europe/Kyiv', year: 'numeric', month: '2-digit', day: '2-digit'
});

// Only pass the active collection. Postdoctoral programme places are not staff positions.
export function vacancyWindows(active: ActiveVacancyAnnouncement[]): VacancyWindow[] {
  return active.flatMap(({ publicationDate, tracks = [] }) =>
    tracks.flatMap(({ id, deadlineDate, positions }) => publicationDate && deadlineDate && id !== 'postdoc'
      ? [{ publicationDate, deadlineDate, count: positions.reduce((sum, position) => sum + (position.count ?? 1), 0) }]
      : [])
  );
}

export function countOpenVacancies(windows: VacancyWindow[], now = new Date()): number {
  const today = kyivDate.format(now);
  return windows.reduce((sum, { publicationDate, deadlineDate, count }) =>
    publicationDate <= today && today <= deadlineDate ? sum + count : sum, 0);
}

const ukrainianPlural = new Intl.PluralRules('uk');

export function openVacancyLabel(count: number, locale: 'uk' | 'en'): string {
  if (count === 0) return '';
  if (locale === 'en') return `${count} open position${count === 1 ? '' : 's'}`;
  const forms = { one: 'відкрита посада', few: 'відкриті посади', many: 'відкритих посад', other: 'відкритих посад' };
  const category = ukrainianPlural.select(count);
  return `${count} ${forms[category as keyof typeof forms] ?? forms.other}`;
}
