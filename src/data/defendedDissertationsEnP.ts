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

const specialties: Record<string, DissertationSpecialtyEn> = {
  '01.02.01': { code: '01.02.01', en: 'Theoretical Mechanics' },
  '01.02.03': { code: '01.02.03', en: 'Specialty 01.02.03' },
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
const instituteMechanicsNasUkraine = 'Institute of Mechanics, NAS of Ukraine';
const instituteMechanicsTimoshenkoNasUkraine = 'S.P. Timoshenko Institute of Mechanics, NAS of Ukraine';
const instituteConstructionMechanicsAsUkrSsr =
  'Institute of Construction Mechanics, Academy of Sciences of the Ukrainian SSR';
const kirovohradNationalTechnicalUniversity =
  'Kirovohrad National Technical University, Ministry of Education and Science of Ukraine';

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

export const defendedDissertationsEnP: DefendedDissertationEntryEn[] = [
  entry({
    id: 'pavlovsky-vs-1969-vibrations-dynamic-stability-cylindrical-shells-carrying-fluid',
    year: 1969,
    defenceDate: '1969-01-28',
    authorEn: 'V.S. Pavlovsky',
    sourceLanguage: 'ru',
    titleEn: 'Vibrations and Dynamic Stability of Cylindrical Shells Carrying Fluid',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 28 January 1969. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1968.',
    pages: 212,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['cylindrical shells', 'fluid-structure interaction', 'dynamic stability']
  }),
  entry({
    id: 'pavlovsky-ve-1968-damage-accumulation-steel-stress-spectrum-level',
    year: 1968,
    defenceDate: '1968-05-07',
    authorEn: 'V.E. Pavlovsky',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of Damage Accumulation in Steel in Relation to the Stress-Spectrum Level',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 7 May 1968. Candidate dissertation in Technical Sciences. Kyiv, 1967.',
    pages: 184,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['damage accumulation', 'steel', 'stress spectrum']
  }),
  entry({
    id: 'pavlychko-vladimir-1988-three-dimensional-thermoelastoplastic-stress-strain-complex-bodies-loading',
    year: 1988,
    defenceDate: '1988-12-27',
    authorEn: 'Vladimir M. Pavlychko',
    sourceLanguage: 'ru',
    titleEn:
      'Three-Dimensional Thermoelastoplastic Stress-Strain State of Complex-Shaped Bodies during Loading Processes',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 December 1988. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1988.',
    pages: 106,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['thermoelastoplasticity', 'three-dimensional problems', 'complex-shaped bodies']
  }),
  entry({
    id: 'pavliuk-yaroslav-2011-nonlinear-creep-relaxation-viscoelastic-materials-nonstationary-uniaxial-loading',
    year: 2011,
    defenceDate: '2011-12-27',
    authorEn: 'Yaroslav V. Pavliuk',
    sourceLanguage: 'uk',
    titleEn:
      'Nonlinear Creep and Relaxation of Viscoelastic Materials under Nonstationary Uniaxial Loading',
    degree: candidateTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 December 2011. Candidate dissertation in Technical Sciences. Kyiv, 2011.',
    pages: 150,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['nonlinear creep', 'relaxation', 'viscoelastic materials', 'nonstationary loading']
  }),
  entry({
    id: 'padun-lukyanova-ln-1952-stability-single-tier-multipanel-spatial-frame-structures',
    year: 1952,
    defenceDate: '1952-10-01',
    authorEn: 'L.N. Padun-Lukyanova',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of Stability of Single-Tier Multipanel Spatial Frame Structures',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 1 October 1952. Candidate dissertation in Technical Sciences. Kyiv, 1952.',
    pages: 92,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsAsUkrSsr,
    tags: ['spatial frames', 'multipanel structures', 'stability']
  }),
  entry({
    id: 'palamarchuk-vg-1972-stability-cylindrical-shells-axial-compression-real-shape-imperfections',
    year: 1972,
    defenceDate: '1972-02-29',
    authorEn: 'V.G. Palamarchuk',
    sourceLanguage: 'ru',
    titleEn:
      'Investigation of Stability of Cylindrical Shells under Axial Compression Considering Real Deviations from the Ideal Shape',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 29 February 1972. Candidate dissertation in Technical Sciences. Kyiv, 1971.',
    pages: 148,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['cylindrical shells', 'axial compression', 'shape imperfections', 'stability']
  }),
  entry({
    id: 'palchevsky-as-1967-minimum-weight-ribbed-cylindrical-shells-axial-compression',
    year: 1967,
    defenceDate: '1967-06-13',
    authorEn: 'A.S. Palchevsky',
    sourceLanguage: 'ru',
    titleEn: 'Calculation of Minimum-Weight Ribbed Cylindrical Shells under Axial Compression',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 13 June 1967. Candidate dissertation in Technical Sciences. Kyiv, 1967.',
    pages: 149,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['ribbed cylindrical shells', 'minimum weight', 'axial compression']
  }),
  entry({
    id: 'panasiuk-oleh-2012-plane-elastic-waves-layered-composites-initial-stresses-sliding-layers',
    year: 2012,
    defenceDate: '2012-05-29',
    authorEn: 'Oleh M. Panasiuk',
    sourceLanguage: 'uk',
    titleEn:
      'Propagation of Plane Elastic Waves in Layered Composite Materials with Initial Stresses under Layer Sliding',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 29 May 2012. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2012.',
    pages: 119,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['elastic waves', 'layered composites', 'initial stresses', 'layer sliding']
  }),
  entry({
    id: 'pankratova-natalia-1972-statics-layered-orthotropic-shells-variable-parameters',
    year: 1972,
    defenceDate: '1972-05-23',
    authorEn: 'Natalia D. Pankratova',
    sourceLanguage: 'ru',
    titleEn: 'Solution of Certain Classes of Static Problems for Layered Orthotropic Shells with Variable Parameters',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 23 May 1972. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1972.',
    pages: 175,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['layered shells', 'orthotropic shells', 'static problems']
  }),
  entry({
    id: 'pankratova-natalia-1985-numerical-analytical-stress-state-inhomogeneous-anisotropic-shells-spatial-formulation',
    year: 1985,
    defenceDate: '1985-04-23',
    authorEn: 'Natalia D. Pankratova',
    sourceLanguage: 'ru',
    titleEn:
      'Numerical-Analytical Solution of Problems on the Stress State of Inhomogeneous Anisotropic Shells in a Spatial Formulation',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 23 April 1985. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1984.',
    pages: 446,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['anisotropic shells', 'inhomogeneous shells', 'stress state', 'spatial formulation']
  }),
  entry({
    id: 'pankratiev-serhii-2018-stress-strain-quadrilateral-plates-orthotropic-materials',
    year: 2018,
    defenceDate: '2018-12-18',
    authorEn: 'Serhii A. Pankratiev',
    sourceLanguage: 'uk',
    titleEn: 'Stress-Strain State of Quadrilateral Plates Made of Orthotropic Materials',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn:
      'Defended on 18 December 2018. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04 — Mechanics of Deformable Solids. Registration no. 0418U004290.',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['orthotropic materials', 'quadrilateral plates', 'stress-strain state']
  }),
  entry({
    id: 'panteleev-evgeny-1994-damage-long-term-fracture-thin-isotropic-plates-concentrators-cyclic-loading',
    year: 1994,
    authorEn: 'Evgeny A. Panteleev',
    sourceLanguage: 'ru',
    titleEn:
      'Damage and Long-Term Fracture of Thin Isotropic Plates with Stress Concentrators under Uniaxial Cyclic Loading',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1994. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1994.',
    pages: 147,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['damage', 'long-term fracture', 'thin plates', 'cyclic loading']
  }),
  entry({
    id: 'panteleev-alexander-1977-bending-weight-optimization-variable-thickness-plates',
    year: 1977,
    defenceDate: '1977-01-25',
    authorEn: 'Alexander D. Panteleev',
    sourceLanguage: 'ru',
    titleEn: 'Some Problems of Bending and Weight Optimization of Plates of Variable Thickness',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 25 January 1977. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1976.',
    pages: 145,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['plate bending', 'weight optimization', 'variable thickness']
  }),
  entry({
    id: 'panfilov-yua-1974-fatigue-resistance-structural-steel-biaxial-stress-state',
    year: 1974,
    defenceDate: '1974-11-05',
    authorEn: 'Yu.A. Panfilov',
    sourceLanguage: 'ru',
    titleEn: 'Investigation of Fatigue Resistance of Structural Steel under a Biaxial Stress State',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 5 November 1974. Candidate dissertation in Technical Sciences. Kyiv, 1974.',
    pages: 161,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['fatigue resistance', 'structural steel', 'biaxial stress']
  }),
  entry({
    id: 'papusha-an-1979-dynamic-phenomena-vibratory-systems-nonideal-energy-source',
    year: 1979,
    authorEn: 'A.N. Papusha',
    sourceLanguage: 'ru',
    titleEn: 'Dynamic Phenomena in Vibratory Systems of Rigid Bodies with a Nonideal Energy Source',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended in 1979. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1979.',
    pages: 111,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['rigid body systems', 'nonideal energy source', 'vibratory systems']
  }),
  entry({
    id: 'parkhomenko-oleksandr-2011-free-vibrations-shallow-shells-variable-thickness-spline-approximation',
    year: 2011,
    defenceDate: '2011-01-25',
    authorEn: 'Oleksandr Yu. Parkhomenko',
    sourceLanguage: 'uk',
    titleEn:
      'Solution of Free-Vibration Problems for Shallow Shells of Variable Thickness in a Refined Formulation Based on Spline Approximation',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 25 January 2011. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2010.',
    pages: 144,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['shallow shells', 'variable thickness', 'free vibrations', 'spline approximation']
  }),
  entry({
    id: 'patlashenko-igor-1988-numerical-statics-thermosensitive-shells-revolution',
    year: 1988,
    authorEn: 'Igor Yu. Patlashenko',
    sourceLanguage: 'ru',
    titleEn: 'Numerical Solution of Static Problems for Thermosensitive Shells of Revolution',
    degree: candidateTechnical,
    specialtyCode: '01.02.03',
    bibliographyEn: 'Defended in 1988. Candidate dissertation in Technical Sciences. Kyiv, 1988.',
    pages: 168,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['thermosensitive shells', 'shells of revolution', 'numerical statics']
  }),
  entry({
    id: 'pelagenko-andrey-1992-bearing-capacity-design-pressure-vessels-layered-materials',
    year: 1992,
    defenceDate: '1992-03-31',
    authorEn: 'Andrey P. Pelagenko',
    sourceLanguage: 'ru',
    titleEn: 'Bearing Capacity and Design of Pressure Vessels Made of Layered Materials',
    degree: candidateTechnical,
    specialtyCode: '05.23.17',
    bibliographyEn: 'Defended on 31 March 1992. Candidate dissertation in Technical Sciences. Kyiv, 1992.',
    pages: 183,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['pressure vessels', 'layered materials', 'bearing capacity', 'design']
  }),
  entry({
    id: 'pelepelin-vm-1964-plastic-deformation-metal-ceramic-hard-alloys-nonuniform-volumetric-compression',
    year: 1964,
    defenceDate: '1964-10-13',
    authorEn: 'V.M. Pelepelin',
    sourceLanguage: 'ru',
    titleEn:
      'Investigation of Plastic Deformation of Metal-Ceramic Hard Alloys under Nonuniform Volumetric Compression',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 13 October 1964. Candidate dissertation in Technical Sciences. Kyiv, 1964.',
    pages: 214,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['metal-ceramic hard alloys', 'plastic deformation', 'volumetric compression']
  }),
  entry({
    id: 'pelykh-nikolai-1982-vibrational-motion-gas-bubbles-vessel-liquid-variable-density',
    year: 1982,
    defenceDate: '1982-06-01',
    authorEn: 'Nikolai A. Pelykh',
    sourceLanguage: 'ru',
    titleEn: 'Vibrational Motion of Gas Bubbles in a Vessel with a Liquid of Variable Density',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 1 June 1982. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1982.',
    pages: 178,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['gas bubbles', 'vibrational motion', 'variable-density liquid']
  })
];
