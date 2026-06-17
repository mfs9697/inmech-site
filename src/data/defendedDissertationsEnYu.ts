import type {
  DefendedDissertationEntryEn,
  DissertationDegreeEn,
  DissertationSpecialtyEn,
  OriginalLanguage
} from './defendedDissertationsEn';

const candidatePhysical: DissertationDegreeEn = {
  level: 'candidate-of-sciences',
  en: 'Candidate of Physical and Mathematical Sciences',
  fieldEn: 'Physical and Mathematical Sciences'
};

const doctorPhysical: DissertationDegreeEn = {
  level: 'doctor-of-sciences',
  en: 'Doctor of Physical and Mathematical Sciences',
  fieldEn: 'Physical and Mathematical Sciences'
};

const specialtyMechanicsDeformableSolids: DissertationSpecialtyEn = {
  code: '01.02.04',
  en: 'Mechanics of Deformable Solids'
};

type EntryInput = {
  id: string;
  sortLetter?: string;
  year: number;
  defenceDate?: string;
  authorEn: string;
  sourceLanguage: OriginalLanguage;
  titleEn: string;
  degree: DissertationDegreeEn;
  specialty?: DissertationSpecialtyEn;
  bibliographyEn: string;
  pages?: number;
  placeEn?: string;
  institutionEn?: string;
  tags?: string[];
};

const instituteMechanicsTimoshenkoNasUkraine =
  'S.P. Timoshenko Institute of Mechanics, National Academy of Sciences of Ukraine';

function entry(input: EntryInput): DefendedDissertationEntryEn {
  return {
    id: input.id,
    sortLetter: input.sortLetter ?? input.authorEn.charAt(0).toUpperCase(),
    year: input.year,
    defenceDate: input.defenceDate,
    author: { en: input.authorEn },
    title: {
      en: input.titleEn,
      originalLanguage: input.sourceLanguage,
      originalNoteEn: `Original catalogue entry [${input.sourceLanguage === 'uk' ? 'in Ukrainian' : 'in Russian'}]`
    },
    degree: input.degree,
    specialty: input.specialty,
    bibliography: {
      en: input.bibliographyEn,
      originalLanguage: input.sourceLanguage,
      pages: input.pages,
      placeEn: input.placeEn,
      institutionEn: input.institutionEn
    },
    tags: input.tags
  };
}

export const defendedDissertationsEnYu: DefendedDissertationEntryEn[] = [
  entry({
    id: 'yurchuk-vm-2019-theory-solitary-waves-nonlinearly-elastic-materials',
    year: 2019,
    defenceDate: '2019-07-09',
    authorEn: 'Vasyl M. Yurchuk',
    sourceLanguage: 'uk',
    titleEn: 'Theory of Solitary Waves in Nonlinearly Elastic Materials',
    degree: candidatePhysical,
    specialty: specialtyMechanicsDeformableSolids,
    bibliographyEn:
      'Defended on 9 July 2019. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04 — Mechanics of Deformable Solids. Registration no. 0419U001493.',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['solitary waves', 'nonlinearly elastic materials', 'wave theory']
  }),
  entry({
    id: 'yurchuk-vm-2025-wave-propagation-scenarios-different-initial-profiles-nonlinearly-elastic-materials',
    year: 2025,
    defenceDate: '2025-09-02',
    authorEn: 'Vasyl M. Yurchuk',
    sourceLanguage: 'uk',
    titleEn:
      'Scenarios of Propagation of Waves with Different Initial Profiles in Nonlinearly Elastic Materials',
    degree: doctorPhysical,
    specialty: specialtyMechanicsDeformableSolids,
    bibliographyEn:
      'Defended on 2 September 2025. Doctoral dissertation in Physical and Mathematical Sciences, specialty 01.02.04 — Mechanics of Deformable Solids. Registration no. 0525U000311.',
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['wave propagation', 'initial profiles', 'nonlinearly elastic materials']
  })
];
