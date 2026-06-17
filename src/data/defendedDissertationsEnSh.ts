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

const doctorPhysical: DissertationDegreeEn = {
  level: 'doctor-of-sciences',
  en: 'Doctor of Physical and Mathematical Sciences',
  fieldEn: 'Physical and Mathematical Sciences'
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
const donetskPhysTechnicalInstituteAsUkrSsr =
  'Donetsk Physico-Technical Institute, Academy of Sciences of the Ukrainian SSR';

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

export const defendedDissertationsEnSh: DefendedDissertationEntryEn[] = [
  entry({
    id: 'shaldyrvan-valeriy-1980-spatial-elasticity-multiply-connected-plates-complex-properties',
    year: 1980,
    authorEn: 'Valeriy A. Shaldyrvan',
    sourceLanguage: 'ru',
    titleEn: 'Spatial Problems of Elasticity Theory for Multiply Connected Plates with Complicated Properties',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn:
      'Defended in 1980. Doctoral dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Kyiv, 1980.',
    pages: 312,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['elasticity theory', 'multiply connected plates', 'complex material properties']
  }),
  entry({
    id: 'sharapov-ad-1968-axisymmetric-antisymmetric-deformation-axial-compressor-elements',
    year: 1968,
    defenceDate: '1968-06-25',
    authorEn: 'A.D. Sharapov',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of Axisymmetric and Antisymmetric Deformation of Axial Compressor Elements',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 25 June 1968. Candidate dissertation in Technical Sciences. Kyiv, 1967.',
    pages: 208,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['axial compressors', 'axisymmetric deformation', 'antisymmetric deformation']
  }),
  entry({
    id: 'shevchenko-alexander-1980-thermostressed-state-composite-cylinders-plates',
    year: 1980,
    defenceDate: '1980-09-30',
    authorEn: 'Alexander Yu. Shevchenko',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of the Thermally Stressed State of Composite Cylinders and Plates',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn:
      'Defended on 30 September 1980. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Kyiv, 1980.',
    pages: 130,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['thermal stresses', 'composite cylinders', 'plates']
  }),
  entry({
    id: 'shevchenko-svetlana-1989-stress-state-hollow-noncircular-cylinders',
    year: 1989,
    defenceDate: '1989-06-27',
    authorEn: 'Svetlana N. Shevchenko',
    sourceLanguage: 'ru',
    titleEn: 'Stress State of Hollow Non-Circular Cylinders',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn:
      'Defended on 27 June 1989. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Kyiv, 1989.',
    pages: 121,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['hollow cylinders', 'non-circular cylinders', 'stress state']
  }),
  entry({
    id: 'shevchenko-yun-1968-thermoplasticity-variable-loading',
    year: 1968,
    defenceDate: '1968-11-19',
    authorEn: 'Yu.N. Shevchenko',
    sourceLanguage: 'ru',
    titleEn: 'Thermoplasticity under Variable Loading',
    degree: doctorTechnical,
    bibliographyEn: 'Defended on 19 November 1968. Doctoral dissertation in Technical Sciences. Kyiv, 1968.',
    pages: 494,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['thermoplasticity', 'variable loading', 'inelastic deformation']
  }),
  entry({
    id: 'shevchuk-va-1953-wavy-surface-layer-mechanical-machining-physical-state',
    year: 1953,
    defenceDate: '1953-10-27',
    authorEn: 'V.A. Shevchuk',
    sourceLanguage: 'ru',
    titleEn: 'Experimental Investigation of the Physical State of a Wavy Surface Layer Produced by Mechanical Machining',
    degree: candidateTechnical,
    bibliographyEn:
      'Defended on 27 October 1953. Candidate dissertation in Technical Sciences. Kyiv, 1953. Includes appendices no. 1 and no. 2.',
    pages: 187,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsAsUkrSsr,
    tags: ['machining', 'surface layer', 'experimental mechanics']
  }),
  entry({
    id: 'shegai-vadim-1986-lyapunov-matrix-stability-motion',
    year: 1986,
    defenceDate: '1986-11-11',
    authorEn: 'Vadim V. Shegai',
    sourceLanguage: 'ru',
    titleEn: 'Application of the Lyapunov Matrix in the Theory of Stability of Motion',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn:
      'Defended on 11 November 1986. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.01. Kyiv, 1986.',
    pages: 141,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['Lyapunov matrix', 'stability of motion', 'theoretical mechanics']
  }),
  entry({
    id: 'shikula-elena-1985-stress-state-workings-gas-saturated-porous-mass-unsteady-gas-filtration',
    year: 1985,
    defenceDate: '1985-12-10',
    authorEn: 'Elena N. Shikula',
    sourceLanguage: 'ru',
    titleEn:
      'Investigation of the Stress State near Workings in a Gas-Saturated Porous Massif under Unsteady Gas Filtration',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn:
      'Defended on 10 December 1985. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Kyiv, 1985.',
    pages: 180,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['porous media', 'gas filtration', 'stress state', 'mine workings']
  }),
  entry({
    id: 'shikula-elena-1998-linear-nonlinear-effective-deformative-properties-porous-composites',
    year: 1998,
    defenceDate: '1998-09-29',
    authorEn: 'Elena N. Shikula',
    sourceLanguage: 'ru',
    titleEn: 'Linear and Nonlinear Effective Deformative Properties of Porous Composite Materials',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn:
      'Defended on 29 September 1998. Doctoral dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Kyiv, 1998.',
    pages: 358,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['porous composites', 'effective properties', 'nonlinear deformation']
  }),
  entry({
    id: 'shishkin-pg-1975-mechanical-properties-polymer-binder-initial-shrinkage-strains',
    year: 1975,
    defenceDate: '1975-06-24',
    authorEn: 'P.G. Shishkin',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of Mechanical Properties of a Polymer Binder with Initial Shrinkage Strains',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 24 June 1975. Candidate dissertation in Technical Sciences. Kyiv, 1974.',
    pages: 126,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['polymer binder', 'shrinkage strains', 'mechanical properties']
  }),
  entry({
    id: 'shnerenko-ki-1967-equilibrium-spherical-shell-openings',
    year: 1967,
    defenceDate: '1967-05-23',
    authorEn: 'K.I. Shnerenko',
    sourceLanguage: 'ru',
    titleEn: 'Some Problems of Equilibrium of a Spherical Shell with Openings',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 23 May 1967. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1966.',
    pages: 127,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['spherical shells', 'openings', 'equilibrium problems']
  }),
  entry({
    id: 'shnerenko-ki-1981-stress-state-shells-openings-composite-materials',
    year: 1981,
    defenceDate: '1981-09-17',
    authorEn: 'K.I. Shnerenko',
    sourceLanguage: 'ru',
    titleEn: 'Stress State of Shells with Openings Made of Composite Materials',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn:
      'Defended on 17 September 1981. Doctoral dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Kyiv, 1981.',
    pages: 299,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['shells with openings', 'composite materials', 'stress state']
  }),
  entry({
    id: 'shpak-vladimir-1990-normal-waves-anisotropic-elastic-layer',
    year: 1990,
    defenceDate: '1990-06-26',
    authorEn: 'Vladimir A. Shpak',
    sourceLanguage: 'ru',
    titleEn:
      'Regularities of Propagation and Limiting Properties of Normal Waves in an Anisotropic Elastic Layer',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn:
      'Defended on 26 June 1990. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Donetsk, 1990.',
    pages: 151,
    placeEn: 'Donetsk',
    institutionEn: donetskPhysTechnicalInstituteAsUkrSsr,
    tags: ['normal waves', 'anisotropic elastic layer', 'wave propagation']
  }),
  entry({
    id: 'shtantsel-sergiy-2003-dynamic-behavior-three-layer-shells-revolution-discrete-filler-nonstationary-loads',
    year: 2003,
    defenceDate: '2003-06-10',
    authorEn: 'Sergiy E. Shtantsel',
    sourceLanguage: 'uk',
    titleEn:
      'Numerical Modeling of Dynamic Behavior of Three-Layer Shells of Revolution Considering Filler Discreteness under Nonstationary Loads',
    degree: candidateTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn:
      'Defended on 10 June 2003. Candidate dissertation in Technical Sciences, specialty 01.02.04. Kyiv, 2003.',
    pages: 158,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['three-layer shells', 'shells of revolution', 'nonstationary loads', 'numerical modeling']
  }),
  entry({
    id: 'shugailo-oleksii-2019-stress-strain-state-tubular-elements-steam-generators-emergency-situations',
    year: 2019,
    defenceDate: '2019-09-24',
    authorEn: 'Oleksii P. Shugailo',
    sourceLanguage: 'uk',
    titleEn: 'Stress-Strain State of Tubular Elements of Steam Generators under Emergency Situations',
    degree: candidateTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn:
      'Defended on 24 September 2019. Candidate dissertation in Technical Sciences, specialty 01.02.04 — Mechanics of Deformable Solids. Registration no. 0419U001536.',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['steam generators', 'tubular elements', 'emergency situations', 'stress-strain state']
  }),
  entry({
    id: 'shulga-na-1966-stress-concentration-holes-bending-physically-nonlinear-thin-plates',
    year: 1966,
    defenceDate: '1966-11-15',
    authorEn: 'N.A. Shulga',
    sourceLanguage: 'ru',
    titleEn: 'Stress Concentration around Holes in Bending of Physically Nonlinear Thin Plates',
    degree: candidatePhysical,
    bibliographyEn:
      'Defended on 15 November 1966. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1966.',
    pages: 123,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['stress concentration', 'holes', 'nonlinear thin plates', 'bending']
  }),
  entry({
    id: 'shulga-na-1979-dynamic-processes-composite-materials-structural-elements',
    year: 1979,
    authorEn: 'N.A. Shulga',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of Dynamic Processes in Composite Materials and Structural Elements Made of Them',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn:
      'Defended in 1979. Doctoral dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Kyiv, 1979.',
    pages: 295,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['dynamic processes', 'composite materials', 'structural elements']
  }),
  entry({
    id: 'shulga-oleksandr-2000-vibrations-inhomogeneous-rods-periodic-structure',
    year: 2000,
    defenceDate: '2000-09-26',
    authorEn: 'Oleksandr M. Shulga',
    sourceLanguage: 'uk',
    titleEn: 'Vibrations of Inhomogeneous Rods of Periodic Structure',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn:
      'Defended on 26 September 2000. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Kyiv, 2000.',
    pages: 140,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['inhomogeneous rods', 'periodic structures', 'vibrations']
  }),
  entry({
    id: 'shuman-bm-1970-elastic-waves-random-inhomogeneities',
    year: 1970,
    defenceDate: '1970-02-17',
    authorEn: 'B.M. Shuman',
    sourceLanguage: 'ru',
    titleEn: 'Some Issues of Elastic Wave Propagation in a Medium with Random Inhomogeneities',
    degree: candidatePhysical,
    bibliographyEn:
      'Defended on 17 February 1970. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1969.',
    pages: 164,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['elastic waves', 'random inhomogeneities', 'wave propagation']
  })
];