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

const candidateTechnical: DissertationDegreeEn = {
  level: 'candidate-of-sciences',
  en: 'Candidate of Technical Sciences',
  fieldEn: 'Technical Sciences'
};

const doctorTechnical: DissertationDegreeEn = {
  level: 'doctor-of-sciences',
  en: 'Doctor of Technical Sciences',
  fieldEn: 'Technical Sciences'
};

const specialties: Record<string, DissertationSpecialtyEn> = {
  '01.02.01': { code: '01.02.01', en: 'Theoretical Mechanics' },
  '01.02.04': { code: '01.02.04', en: 'Mechanics of Deformable Solids' }
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
  specialtyCode?: string;
  bibliographyEn: string;
  pages?: number;
  placeEn?: string;
  institutionEn?: string;
  tags?: string[];
};

const instituteMechanicsAsUkrSsr = 'Institute of Mechanics, Academy of Sciences of the Ukrainian SSR';
const instituteConstructionMechanicsAsUkrSsr =
  'Institute of Construction Mechanics, Academy of Sciences of the Ukrainian SSR';
const instituteMechanicsNasUkraine = 'Institute of Mechanics, NAS of Ukraine';
const instituteMechanicsTimoshenkoNasUkraine = 'S.P. Timoshenko Institute of Mechanics, NAS of Ukraine';

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
    specialty: input.specialtyCode ? specialties[input.specialtyCode] : undefined,
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

export const defendedDissertationsEnTs: DefendedDissertationEntryEn[] = [
  entry({
    id: 'tsapenko-as-1978-dynamics-bodies-cavities-liquid-gas-vibrational-actions',
    year: 1978,
    defenceDate: '1978-10-10',
    authorEn: 'A.S. Tsapenko',
    sourceLanguage: 'ru',
    titleEn: 'Dynamics of Bodies with Cavities Containing Liquid and Gas under Vibrational Actions',
    degree: doctorPhysical,
    bibliographyEn: 'Defended on 10 October 1978. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1978.',
    pages: 163,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['body dynamics', 'cavities', 'liquid and gas', 'vibrational actions']
  }),
  entry({
    id: 'tsydylo-ivan-1987-stability-flywheel-energy-storage-vehicle',
    year: 1987,
    defenceDate: '1987-12-22',
    authorEn: 'Ivan V. Tsydylo',
    sourceLanguage: 'ru',
    titleEn: 'Stability of a Flywheel Energy Storage System on a Vehicle',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 22 December 1987. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1987.',
    pages: 157,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['flywheel energy storage', 'vehicle dynamics', 'stability']
  }),
  entry({
    id: 'tsoi-ng-1956-free-vibrations-crossed-beam-systems-torsion',
    year: 1956,
    defenceDate: '1956-04-10',
    authorEn: 'N.G. Tsoi',
    sourceLanguage: 'ru',
    titleEn: 'Free Vibrations of Crossed-Beam Systems Considering Torsion',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 10 April 1956. Candidate dissertation in Technical Sciences. Kyiv, 1955.',
    pages: 214,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsAsUkrSsr,
    tags: ['crossed beams', 'free vibrations', 'torsion']
  }),
  entry({
    id: 'tsurpal-ia-1963-stress-concentration-holes-physically-nonlinear-elastic-plates',
    year: 1963,
    defenceDate: '1963-02-05',
    authorEn: 'I.A. Tsurpal',
    sourceLanguage: 'ru',
    titleEn: 'Stress Concentration around Holes in Physically Nonlinear Elastic Plates',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 5 February 1963. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1962.',
    pages: 135,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['stress concentration', 'holes', 'nonlinear elasticity', 'plates']
  }),
  entry({
    id: 'tsurpal-ia-1969-stress-concentration-holes-physical-nonlinearity-material',
    year: 1969,
    defenceDate: '1969-04-22',
    authorEn: 'I.A. Tsurpal',
    sourceLanguage: 'ru',
    titleEn: 'Some Problems of Stress Concentration around Holes Considering Physical Nonlinearity of the Material',
    degree: doctorTechnical,
    bibliographyEn: 'Defended on 22 April 1969. Doctoral dissertation in Technical Sciences. Kyiv, 1968.',
    pages: 338,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['stress concentration', 'holes', 'physical nonlinearity', 'material nonlinearity']
  }),
  entry({
    id: 'tsurpal-svitlana-1996-solitary-simple-plane-bell-shaped-waves-composite-materials',
    year: 1996,
    defenceDate: '1996-12-24',
    authorEn: 'Svitlana I. Tsurpal',
    sourceLanguage: 'uk',
    titleEn: 'Solitary Simple Plane Bell-Shaped Waves in Composite Materials',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 24 December 1996. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1996.',
    pages: 136,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['solitary waves', 'plane waves', 'composite materials']
  }),
  entry({
    id: 'tsybulnyk-vitaly-2007-two-dimensional-statics-conical-shells-variable-thickness-discrete-fourier-series',
    year: 2007,
    defenceDate: '2007-12-18',
    authorEn: 'Vitaly A. Tsybulnyk',
    sourceLanguage: 'ru',
    titleEn:
      'Solution of Two-Dimensional Static Problems for Conical Shells of Variable Thickness Based on Approximation of Functions by Discrete Fourier Series',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 18 December 2007. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2007.',
    pages: 149,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['conical shells', 'variable thickness', 'static problems', 'discrete Fourier series']
  })
];
