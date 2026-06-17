import { defendedDissertationsEnA } from './defendedDissertationsEnA';
import { defendedDissertationsEnB } from './defendedDissertationsEnB';
import { defendedDissertationsEnD } from './defendedDissertationsEnD';
import { defendedDissertationsEnD2 } from './defendedDissertationsEnD2';
import { defendedDissertationsEnE } from './defendedDissertationsEnE';
import { defendedDissertationsEnEe } from './defendedDissertationsEnEe';
import { defendedDissertationsEnG } from './defendedDissertationsEnG';
import { defendedDissertationsEnG2 } from './defendedDissertationsEnG2';
import { defendedDissertationsEnI } from './defendedDissertationsEnI';
import { defendedDissertationsEnK } from './defendedDissertationsEnK';
import { defendedDissertationsEnK2 } from './defendedDissertationsEnK2';
import { defendedDissertationsEnK3 } from './defendedDissertationsEnK3';
import { defendedDissertationsEnK4 } from './defendedDissertationsEnK4';
import { defendedDissertationsEnL } from './defendedDissertationsEnL';
import { defendedDissertationsEnM } from './defendedDissertationsEnM';
import { defendedDissertationsEnM2 } from './defendedDissertationsEnM2';
import { defendedDissertationsEnN } from './defendedDissertationsEnN';
import { defendedDissertationsEnO } from './defendedDissertationsEnO';
import { defendedDissertationsEnP } from './defendedDissertationsEnP';
import { defendedDissertationsEnP2 } from './defendedDissertationsEnP2';
import { defendedDissertationsEnP3 } from './defendedDissertationsEnP3';
import { defendedDissertationsEnR } from './defendedDissertationsEnR';
import { defendedDissertationsEnS } from './defendedDissertationsEnS';
import { defendedDissertationsEnT } from './defendedDissertationsEnT';
import { defendedDissertationsEnV } from './defendedDissertationsEnV';
import { defendedDissertationsEnZ } from './defendedDissertationsEnZ';
import { defendedDissertationsEnZh } from './defendedDissertationsEnZh';

export type OriginalLanguage = 'uk' | 'ru';

export type DegreeLevel =
  | 'phd'
  | 'candidate-of-sciences'
  | 'doctor-of-sciences'
  | 'unknown';

export type DissertationDocumentType =
  | 'dissertation'
  | 'abstract'
  | 'review'
  | 'decision'
  | 'announcement'
  | 'video'
  | 'other';

export type PersonNameEn = {
  /** Latin-script form displayed on English pages. */
  en: string;
  /** Original Cyrillic form, kept for verification and Ukrainian/Russian source matching; normally not rendered on English pages. */
  original?: string;
  originalLanguage?: OriginalLanguage;
};

export type DissertationTitleEn = {
  /** English translation displayed on English pages. */
  en: string;
  /** Original Cyrillic title, kept as archival metadata; normally not rendered on English pages. */
  original?: string;
  originalLanguage?: OriginalLanguage;
  /** Short public note for the English page, e.g. "Original title [in Ukrainian]". */
  originalNoteEn?: string;
};

export type DissertationDegreeEn = {
  level: DegreeLevel;
  /** Stable English academic rendering, e.g. "Candidate of Physical and Mathematical Sciences". */
  en: string;
  fieldEn?: string;
};

export type DissertationSpecialtyEn = {
  code?: string;
  en: string;
};

export type DissertationCouncilEn = {
  code?: string;
  en?: string;
};

export type DissertationDocumentEn = {
  type: DissertationDocumentType;
  titleEn: string;
  href: string;
  language?: OriginalLanguage;
  /** Public note shown after the link, e.g. "[in Ukrainian]" or "official PDF [in Russian]". */
  noteEn?: string;
  reviewer?: PersonNameEn;
};

export type DissertationBibliographicSourceEn = {
  /** Translated/normalised form of the bibliographic note. */
  en?: string;
  /** Original flat catalogue details string retained for auditability and migration checks. */
  originalDetails?: string;
  originalLanguage?: OriginalLanguage;
  /** Number of pages if available in the source entry. */
  pages?: number;
  /** City/place of publication or defence if stated in the source entry. */
  placeEn?: string;
  /** Institution name normalised in English if stated in the source entry. */
  institutionEn?: string;
};

export type DefendedDissertationEntryEn = {
  /** Stable id for URLs, search, and future filtering. */
  id: string;
  /** Latin alphabet grouping key used by the English catalogue. */
  sortLetter: string;
  year: number;
  defenceDate?: string;

  author: PersonNameEn;
  title: DissertationTitleEn;
  degree: DissertationDegreeEn;
  specialty?: DissertationSpecialtyEn;
  council?: DissertationCouncilEn;
  supervisor?: PersonNameEn[];
  scientificConsultant?: PersonNameEn[];
  bibliography?: DissertationBibliographicSourceEn;
  documents?: DissertationDocumentEn[];
  tags?: string[];
};

export type DefendedDissertationGroupEn = {
  letter: string;
  items: DefendedDissertationEntryEn[];
};

export const defendedDissertationEnglishCatalogNotes = {
  languagePolicy:
    'English catalogue entries use transliterated personal names and translated dissertation titles. Original Cyrillic metadata is retained in the data file for verification, but the English page should normally show only Latin-script text with notes such as [in Ukrainian] or [in Russian].',
  sourcePolicy:
    'Official dissertation documents, abstracts, reviews and archival PDFs may remain in their source language. English pages should label those links clearly instead of translating the documents themselves.'
} as const;

export const defendedDissertationDegreeLabels: Record<DegreeLevel, string> = {
  phd: 'Doctor of Philosophy / PhD',
  'candidate-of-sciences': 'Candidate of Sciences',
  'doctor-of-sciences': 'Doctor of Sciences',
  unknown: 'Degree not specified'
};

export const defendedDissertationLanguageLabels: Record<OriginalLanguage, string> = {
  uk: 'in Ukrainian',
  ru: 'in Russian'
};

/**
 * English catalogue entries are added gradually during migration.
 * The existing Ukrainian/Russian catalogue data in src/data/defendedDissertations*.ts remains untouched.
 */
export const defendedDissertationsEn: DefendedDissertationEntryEn[] = [
  ...defendedDissertationsEnA,
  ...defendedDissertationsEnB,
  ...defendedDissertationsEnD,
  ...defendedDissertationsEnD2,
  ...defendedDissertationsEnE,
  ...defendedDissertationsEnEe,
  ...defendedDissertationsEnG,
  ...defendedDissertationsEnG2,
  ...defendedDissertationsEnI,
  ...defendedDissertationsEnK,
  ...defendedDissertationsEnK2,
  ...defendedDissertationsEnK3,
  ...defendedDissertationsEnK4,
  ...defendedDissertationsEnL,
  ...defendedDissertationsEnM,
  ...defendedDissertationsEnM2,
  ...defendedDissertationsEnN,
  ...defendedDissertationsEnO,
  ...defendedDissertationsEnP,
  ...defendedDissertationsEnP2,
  ...defendedDissertationsEnP3,
  ...defendedDissertationsEnR,
  ...defendedDissertationsEnS,
  ...defendedDissertationsEnT,
  ...defendedDissertationsEnV,
  ...defendedDissertationsEnZ,
  ...defendedDissertationsEnZh
];

export function groupDefendedDissertationsEn(
  entries: readonly DefendedDissertationEntryEn[]
): DefendedDissertationGroupEn[] {
  const grouped = new Map<string, DefendedDissertationEntryEn[]>();

  entries.forEach((entry) => {
    const letter = entry.sortLetter.toUpperCase();
    const items = grouped.get(letter) ?? [];
    items.push(entry);
    grouped.set(letter, items);
  });

  return Array.from(grouped.entries())
    .sort(([a], [b]) => a.localeCompare(b, 'en'))
    .map(([letter, items]) => ({
      letter,
      items: [...items].sort((a, b) => a.author.en.localeCompare(b.author.en, 'en'))
    }));
}
