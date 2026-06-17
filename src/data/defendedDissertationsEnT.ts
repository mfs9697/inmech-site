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
const instituteMechanicsTimoshenkoNasUkraine = 'S.P. Timoshenko Institute of Mechanics, NAS of Ukraine';
const zaporizhzhiaIndustrialInstitute = 'Zaporizhzhia Industrial Institute';

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

export const defendedDissertationsEnT: DefendedDissertationEntryEn[] = [
  entry({
    id: 'tamurov-yuri-1994-nonlinear-dynamics-three-layer-shells-plates-generalized-physico-kinematic-models',
    year: 1994,
    defenceDate: '1994-01-25',
    authorEn: 'Yuri N. Tamurov',
    sourceLanguage: 'ru',
    titleEn:
      'Nonlinear Dynamics of Three-Layer Shells and Plates with Generalizations of Physico-Kinematic Models',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 25 January 1994. Doctoral dissertation in Physical and Mathematical Sciences. Zaporizhzhia, 1993.',
    pages: 253,
    placeEn: 'Zaporizhzhia',
    institutionEn: zaporizhzhiaIndustrialInstitute,
    tags: ['nonlinear dynamics', 'three-layer shells', 'plates']
  }),
  entry({
    id: 'telalov-ai-1975-vibrations-fiberglass-shells',
    year: 1975,
    defenceDate: '1975-12-23',
    authorEn: 'A.I. Telalov',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of Vibrations of Fiberglass Shells',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 23 December 1975. Candidate dissertation in Technical Sciences. Kyiv, 1975.',
    pages: 154,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['fiberglass shells', 'vibrations']
  }),
  entry({
    id: 'terekhova-elena-1986-optimal-control-material-point-central-newtonian-field-limited-time',
    year: 1986,
    defenceDate: '1986-12-02',
    authorEn: 'Elena O. Terekhova',
    sourceLanguage: 'ru',
    titleEn: 'Optimal Control of Motion of a Material Point in a Central Newtonian Field under Limited Time',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 2 December 1986. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1986.',
    pages: 196,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['optimal control', 'material point dynamics']
  }),
  entry({
    id: 'terekhov-rem-1968-elastoplastic-deformation-rotating-nonuniformly-heated-disks',
    year: 1968,
    defenceDate: '1968-03-05',
    authorEn: 'Rem G. Terekhov',
    sourceLanguage: 'ru',
    titleEn: 'Experimental Investigation of Elastoplastic Deformation of Rotating Nonuniformly Heated Disks',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 5 March 1968. Candidate dissertation in Technical Sciences. Kyiv, 1989.',
    pages: 406,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['elastoplastic deformation', 'rotating disks']
  }),
  entry({
    id: 'terekhov-rem-1989-elastoviscoplastic-deformation-metals-nonisothermal-complex-loading',
    year: 1989,
    defenceDate: '1989-10-31',
    authorEn: 'Rem G. Terekhov',
    sourceLanguage: 'ru',
    titleEn: 'Patterns of Elastoviscoplastic Deformation of Metals in Nonisothermal Complex Loading Processes',
    degree: doctorTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 31 October 1989. Doctoral dissertation in Technical Sciences. Kyiv, 1967.',
    pages: 148,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['elastoviscoplasticity', 'metals', 'nonisothermal loading']
  }),
  entry({
    id: 'tereshchenko-lidiia-2005-static-magnetoelasticity-ferromagnetic-bodies-inclusions-cavities',
    year: 2005,
    defenceDate: '2005-09-27',
    authorEn: 'Lidiia M. Tereshchenko',
    sourceLanguage: 'uk',
    titleEn:
      'Static Magnetoelasticity Problems for Magnetically Soft Ferromagnetic Bodies with Spherical Inclusions and Cavities',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 September 2005. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2005.',
    pages: 133,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['magnetoelasticity', 'ferromagnetic materials', 'spherical inclusions']
  }),
  entry({
    id: 'timonin-alexander-1982-stress-state-multilayer-orthotropic-shells-geometric-nonlinearity-shear-deformations',
    year: 1982,
    authorEn: 'Alexander M. Timonin',
    sourceLanguage: 'ru',
    titleEn:
      'Stress State of Multilayer Orthotropic Shells of Revolution Considering Geometric Nonlinearity and Shear Deformations',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1982. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1982.',
    pages: 129,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['multilayer shells', 'orthotropic shells', 'geometric nonlinearity']
  }),
  entry({
    id: 'tereletska-kateryna-2005-microstructure-influence-solitary-elastic-waves-special-profiles-composites',
    year: 2005,
    defenceDate: '2005-02-22',
    authorEn: 'Kateryna V. Tereletska',
    sourceLanguage: 'uk',
    titleEn: 'Influence of Microstructure on Solitary Elastic Waves with Special Profiles in Composite Materials',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 22 February 2005. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2005.',
    pages: 153,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['microstructure', 'solitary elastic waves', 'composite materials']
  }),
  entry({
    id: 'tkachenko-valentina-1985-stress-strain-state-rock-mass-outburst-prone-zone',
    year: 1985,
    authorEn: 'Valentina F. Tkachenko',
    sourceLanguage: 'ru',
    titleEn: 'Stress-Strain State of a Rock Mass in an Outburst-Prone Zone',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1985. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1985.',
    pages: 178,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['rock mass', 'outburst-prone zone', 'stress-strain state']
  })
];
