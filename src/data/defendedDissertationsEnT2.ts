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
  '01.02.04': { code: '01.02.04', en: 'Mechanics of Deformable Solids' },
  '05.23.17': { code: '05.23.17', en: 'Structural Mechanics' }
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
const instituteConstructionMechanicsAsUkrSsr =
  'Institute of Construction Mechanics, Academy of Sciences of the Ukrainian SSR';
const tarasShevchenkoKyivUniversity = 'Taras Shevchenko University of Kyiv';

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

export const defendedDissertationsEnT2: DefendedDissertationEntryEn[] = [
  entry({
    id: 'tkachenko-eduard-2008-three-dimensional-stability-layered-structural-elements-coatings',
    year: 2008,
    defenceDate: '2008-09-30',
    authorEn: 'Eduard A. Tkachenko',
    sourceLanguage: 'ru',
    titleEn: 'Three-Dimensional Stability Problems of Layered Structural Elements with Coatings',
    degree: doctorTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 30 September 2008. Doctoral dissertation in Technical Sciences. Kyiv, 2008.',
    pages: 356,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['three-dimensional stability', 'layered structures', 'coatings']
  }),
  entry({
    id: 'tkachenko-yaroslav-2003-optimal-motions-variable-mass-material-point-power-consumption-energy-accumulation',
    year: 2003,
    defenceDate: '2003-07-08',
    authorEn: 'Yaroslav V. Tkachenko',
    sourceLanguage: 'uk',
    titleEn:
      'Optimal Motions of a Variable-Mass Material Point with Limited Power Consumption and Energy Accumulation',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 8 July 2003. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2003.',
    pages: 155,
    placeEn: 'Kyiv',
    institutionEn: tarasShevchenkoKyivUniversity,
    tags: ['optimal motion', 'variable mass', 'energy accumulation']
  }),
  entry({
    id: 'tolbatov-yevhen-2000-vibrations-tubular-spirals-internal-flows-inhomogeneous-fluid',
    year: 2000,
    defenceDate: '2000-06-27',
    authorEn: 'Yevhen Yu. Tolbatov',
    sourceLanguage: 'uk',
    titleEn: 'Excitation of Vibrations of Tubular Spirals by Internal Flows of Inhomogeneous Fluid',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 June 2000. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2000.',
    pages: 230,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['tubular spirals', 'inhomogeneous fluid', 'flow-induced vibrations']
  }),
  entry({
    id: 'topekha-pk-1951-oxidative-thermal-wear-machine-parts',
    year: 1951,
    defenceDate: '1951-02-10',
    authorEn: 'P.K. Topekha',
    sourceLanguage: 'ru',
    titleEn: 'Experimental Investigation of Oxidative and Thermal Wear of Machine Parts',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 10 February 1951. Candidate dissertation in Technical Sciences. Kyiv, 1950.',
    pages: 190,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['wear', 'machine parts', 'oxidative wear', 'thermal wear']
  }),
  entry({
    id: 'tormakhov-nikolai-1988-elastoplastic-deformation-low-curvature-trajectories-large-deformations',
    year: 1988,
    defenceDate: '1988-12-27',
    authorEn: 'Nikolai N. Tormakhov',
    sourceLanguage: 'ru',
    titleEn:
      'Regularities of Elastoplastic Deformation of a Body Element along Low-Curvature Trajectories under Large Deformations',
    degree: candidateTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 December 1988. Candidate dissertation in Technical Sciences. Kyiv, 1988.',
    pages: 100,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['elastoplastic deformation', 'large deformations', 'loading trajectories']
  }),
  entry({
    id: 'trofimovich-vv-1954-load-bearing-capacity-trussed-beams',
    year: 1954,
    defenceDate: '1954-04-27',
    authorEn: 'V.V. Trofimovich',
    sourceLanguage: 'ru',
    titleEn: 'Load-Bearing Capacity of Trussed Beams: Theoretical and Experimental Study',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 27 April 1954. Candidate dissertation in Technical Sciences. Kyiv, 1954.',
    pages: 151,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsAsUkrSsr,
    tags: ['trussed beams', 'load-bearing capacity', 'experimental study']
  }),
  entry({
    id: 'trubitsina-olga-1994-vibrations-preloaded-ribbed-shells-revolution-stability',
    year: 1994,
    defenceDate: '1994-12-27',
    authorEn: 'Olga A. Trubitsina',
    sourceLanguage: 'ru',
    titleEn: 'Vibrations of Preloaded Ribbed Shells of Revolution and Their Stability',
    degree: candidateTechnical,
    specialtyCode: '05.23.17',
    bibliographyEn: 'Defended on 27 December 1994. Candidate dissertation in Technical Sciences. Kyiv, 1994.',
    pages: 137,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['ribbed shells of revolution', 'preloading', 'vibrations', 'stability']
  }),
  entry({
    id: 'tumashova-olga-1989-flexible-shallow-cylindrical-panels-variable-geometric-parameters',
    year: 1989,
    authorEn: 'Olga V. Tumashova',
    sourceLanguage: 'ru',
    titleEn:
      'Numerical Solution of Two-Dimensional Problems of Deformation of Flexible Shallow Cylindrical Panels with Variable Geometric Parameters',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1989. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1989.',
    pages: 134,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['shallow cylindrical panels', 'variable geometry', 'numerical solution']
  }),
  entry({
    id: 'turchaninov-vn-1979-nonlinear-contactless-vibration-protective-gyroscopic-systems',
    year: 1979,
    defenceDate: '1979-09-18',
    authorEn: 'V.N. Turchaninov',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of Dynamics of Nonlinear Contactless Vibration-Protective Gyroscopic Systems',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 18 September 1979. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1979.',
    pages: 187,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['gyroscopic systems', 'vibration protection', 'nonlinear dynamics']
  })
];
