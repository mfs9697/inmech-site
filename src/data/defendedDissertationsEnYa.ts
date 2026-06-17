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

const specialtyMechanicsDeformableSolids: DissertationSpecialtyEn = {
  code: '01.02.04',
  en: 'Mechanics of Deformable Solids'
};

const specialtyTheoreticalMechanics: DissertationSpecialtyEn = {
  code: '01.02.01',
  en: 'Theoretical Mechanics'
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
const instituteMechanicsNasUkraine = 'Institute of Mechanics, National Academy of Sciences of Ukraine';
const instituteMechanicsAsUkrSsr = 'Institute of Mechanics, Academy of Sciences of the Ukrainian SSR';
const instituteConstructionMechanicsAsUkrSsr =
  'Institute of Structural Mechanics, Academy of Sciences of the Ukrainian SSR';
const khmelnytskyiNationalUniversity = 'Khmelnytskyi National University, Ministry of Education and Science of Ukraine';

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

export const defendedDissertationsEnYa: DefendedDissertationEntryEn[] = [
  entry({
    id: 'yakimenko-nn-2005-coupled-thermoviscoelasticity-plane-bodies-stress-concentrators-harmonic-loading',
    year: 2005,
    defenceDate: '2005-06-21',
    authorEn: 'Natalia N. Yakimenko',
    sourceLanguage: 'ru',
    titleEn:
      'Coupled Problems of Thermoviscoelasticity for Plane Bodies with Stress Concentrators under Harmonic Loading',
    degree: candidatePhysical,
    specialty: specialtyMechanicsDeformableSolids,
    bibliographyEn:
      'Defended on 21 June 2005. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Kyiv, 2005.',
    pages: 108,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['thermoviscoelasticity', 'stress concentrators', 'harmonic loading']
  }),
  entry({
    id: 'yakimenko-sn-1989-thermal-stress-state-viscoelastic-bodies-revolution-cyclic-loading',
    year: 1989,
    authorEn: 'Sergey N. Yakimenko',
    sourceLanguage: 'ru',
    titleEn: 'Thermal Stress State of Viscoelastic Bodies of Revolution under Time-Cyclic Loading',
    degree: candidatePhysical,
    specialty: specialtyMechanicsDeformableSolids,
    bibliographyEn:
      'Defended in 1989. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Kyiv, 1989.',
    pages: 163,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['thermal stresses', 'viscoelastic bodies of revolution', 'cyclic loading']
  }),
  entry({
    id: 'yakovenko-nd-2018-dynamic-problems-cylindrical-bodies-inelastic-materials-microstructural-transformations',
    year: 2018,
    defenceDate: '2018-10-30',
    authorEn: 'Nina D. Yakovenko',
    sourceLanguage: 'uk',
    titleEn:
      'Dynamic Problems for Cylindrical Bodies Made of Inelastic Materials with Microstructural Transformations under Impulse Thermomechanical Loading',
    degree: candidatePhysical,
    specialty: specialtyMechanicsDeformableSolids,
    bibliographyEn:
      'Defended on 30 October 2018. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04 — Mechanics of Deformable Solids. Registration no. 0418U003589.',
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['cylindrical bodies', 'inelastic materials', 'microstructural transformations', 'impulse loading']
  }),
  entry({
    id: 'yakovenko-ov-2000-dynamic-interaction-shock-waves-interface-transversely-isotropic-elastic-media',
    year: 2000,
    defenceDate: '2000-10-31',
    authorEn: 'Olena V. Yakovenko',
    sourceLanguage: 'uk',
    titleEn:
      'Dynamic Interaction of Shock Waves with the Interface of Transversely Isotropic Elastic Media',
    degree: candidatePhysical,
    specialty: specialtyMechanicsDeformableSolids,
    bibliographyEn:
      'Defended on 31 October 2000. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Kyiv, 2000.',
    pages: 266,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['shock waves', 'transversely isotropic media', 'dynamic interaction']
  }),
  entry({
    id: 'yakovleva-os-1993-edge-effects-layered-composites-discontinuous-reinforcement',
    year: 1993,
    authorEn: 'Olena S. Yakovleva',
    sourceLanguage: 'uk',
    titleEn: 'Edge Effects in Layered Composites with Discontinuous Reinforcement',
    degree: candidatePhysical,
    specialty: specialtyMechanicsDeformableSolids,
    bibliographyEn:
      'Defended in 1993. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Kyiv, 1993.',
    pages: 116,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['edge effects', 'layered composites', 'discontinuous reinforcement']
  }),
  entry({
    id: 'yampolsky-ls-1945-continuous-multi-throw-crankshafts-support-compliance',
    year: 1945,
    defenceDate: '1945-12-26',
    authorEn: 'L.S. Yampolsky',
    sourceLanguage: 'ru',
    titleEn: 'Calculation of Continuous Multi-Throw Crankshafts Considering Support Compliance',
    degree: candidateTechnical,
    bibliographyEn:
      'Defended on 26 December 1945. Candidate dissertation in Technical Sciences. Kyiv, 1945.',
    pages: 138,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsAsUkrSsr,
    tags: ['crankshafts', 'support compliance', 'machine elements']
  }),
  entry({
    id: 'yankevich-vf-1960-structural-changes-metal-high-temperature-compressed-gases',
    year: 1960,
    defenceDate: '1960-04-26',
    authorEn: 'V.F. Yankevich',
    sourceLanguage: 'ru',
    titleEn: 'Structural Changes in Metal under the Action of a Flow of High-Temperature Compressed Gases',
    degree: candidateTechnical,
    bibliographyEn:
      'Defended on 26 April 1960. Candidate dissertation in Technical Sciences. Kyiv, 1959.',
    pages: 200,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsAsUkrSsr,
    tags: ['metal structure', 'compressed gases', 'high temperature']
  }),
  entry({
    id: 'yaremchenko-np-2009-stress-state-rectangular-shallow-orthotropic-shells-variable-thickness',
    year: 2009,
    defenceDate: '2009-03-17',
    authorEn: 'Nataliia P. Yaremchenko',
    sourceLanguage: 'uk',
    titleEn:
      'Determination of the Stress State of Rectangular Shallow Orthotropic Shells of Variable Thickness in a Refined Formulation',
    degree: candidatePhysical,
    specialty: specialtyMechanicsDeformableSolids,
    bibliographyEn:
      'Defended on 17 March 2009. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Kyiv, 2008.',
    pages: 129,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['shallow orthotropic shells', 'variable thickness', 'stress state']
  }),
  entry({
    id: 'yaremchenko-sm-2006-stress-state-orthotropic-noncircular-cylindrical-shells-variable-thickness',
    year: 2006,
    defenceDate: '2006-01-31',
    authorEn: 'Serhii M. Yaremchenko',
    sourceLanguage: 'uk',
    titleEn:
      'Stress State of Orthotropic Noncircular Cylindrical Shells of Variable Thickness in a Refined Formulation',
    degree: candidatePhysical,
    specialty: specialtyMechanicsDeformableSolids,
    bibliographyEn:
      'Defended on 31 January 2006. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Kyiv, 2005.',
    pages: 147,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['orthotropic shells', 'noncircular cylindrical shells', 'variable thickness']
  }),
  entry({
    id: 'yaremchenko-sm-2021-numerical-analysis-stationary-deformation-cylinders-spheres-heterogeneous-structure',
    year: 2021,
    defenceDate: '2021-09-28',
    authorEn: 'Serhii M. Yaremchenko',
    sourceLanguage: 'uk',
    titleEn:
      'Numerical Analysis of Stationary Deformation of Cylinders and Spheres with Heterogeneous Structure Based on Various Models',
    degree: doctorPhysical,
    specialty: specialtyMechanicsDeformableSolids,
    bibliographyEn:
      'Defended on 28 September 2021. Doctoral dissertation in Physical and Mathematical Sciences, specialty 01.02.04 — Mechanics of Deformable Solids. Registration no. 0521U101952.',
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['stationary deformation', 'heterogeneous structure', 'cylinders', 'spheres']
  }),
  entry({
    id: 'yaretska-no-2015-elastic-cylindrical-punch-elastic-layer-initial-residual-stresses',
    year: 2015,
    defenceDate: '2015-02-10',
    authorEn: 'Nataliia O. Yaretska',
    sourceLanguage: 'uk',
    titleEn:
      'Pressure of an Elastic Cylindrical Punch on an Elastic Layer with Initial (Residual) Stresses',
    degree: candidatePhysical,
    specialty: specialtyMechanicsDeformableSolids,
    bibliographyEn:
      'Defended on 10 February 2015. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Khmelnytskyi, 2014.',
    pages: 141,
    placeEn: 'Khmelnytskyi',
    institutionEn: khmelnytskyiNationalUniversity,
    tags: ['contact mechanics', 'initial stresses', 'residual stresses', 'elastic layer']
  }),
  entry({
    id: 'yaryhina-no-1993-acoustoelectric-waves-layered-cylinders-acoustic-medium',
    year: 1993,
    defenceDate: '1993-10-26',
    authorEn: 'Nataliia O. Yaryhina',
    sourceLanguage: 'uk',
    titleEn: 'Acoustoelectric Waves in Layered Cylinders in an Acoustic Medium',
    degree: candidatePhysical,
    specialty: specialtyMechanicsDeformableSolids,
    bibliographyEn:
      'Defended on 26 October 1993. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.04. Kyiv, 1993.',
    pages: 141,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['acoustoelectric waves', 'layered cylinders', 'acoustic medium']
  }),
  entry({
    id: 'yaroshek-ad-1962-nondestructive-study-outer-layers-machine-parts-eddy-current-method',
    year: 1962,
    defenceDate: '1962-02-28',
    authorEn: 'A.D. Yaroshek',
    sourceLanguage: 'ru',
    titleEn: 'Nondestructive Study of the Outer Layers of Machine Parts by the Eddy Current Method',
    degree: candidateTechnical,
    bibliographyEn:
      'Defended on 28 February 1962. Candidate dissertation in Technical Sciences. Kyiv, 1960.',
    pages: 177,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['nondestructive testing', 'eddy current method', 'machine parts']
  }),
  entry({
    id: 'yasinsky-sa-1994-balanced-transformation-method-reduction-dynamic-models-machines',
    year: 1994,
    authorEn: 'Sergey A. Yasinsky',
    sourceLanguage: 'ru',
    titleEn: 'Balanced Transformation Method in Problems of Reducing Dynamic Models of Machines',
    degree: candidatePhysical,
    specialty: specialtyTheoreticalMechanics,
    bibliographyEn:
      'Defended in 1994. Candidate dissertation in Physical and Mathematical Sciences, specialty 01.02.01. Kyiv, 1994.',
    pages: 140,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['balanced transformation', 'model reduction', 'machine dynamics']
  }),
  entry({
    id: 'yatsenko-vf-1953-limit-bearing-capacity-deformability-wooden-beams-bending',
    year: 1953,
    defenceDate: '1953-10-27',
    authorEn: 'V.F. Yatsenko',
    sourceLanguage: 'ru',
    titleEn: 'Limit Bearing Capacity and Deformability of Wooden Beams under Bending',
    degree: candidateTechnical,
    bibliographyEn:
      'Defended on 27 October 1953. Candidate dissertation in Technical Sciences. Kyiv, 1953.',
    pages: 192,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsAsUkrSsr,
    tags: ['wooden beams', 'bearing capacity', 'deformability', 'bending']
  }),
  entry({
    id: 'yatsenko-vf-1963-strength-creep-laminated-plastics-compression-tension-bending',
    year: 1963,
    defenceDate: '1963-03-05',
    authorEn: 'V.F. Yatsenko',
    sourceLanguage: 'ru',
    titleEn: 'Strength and Creep of Laminated Plastics (Compression, Tension, Bending)',
    degree: doctorTechnical,
    bibliographyEn:
      'Defended on 5 March 1963. Doctoral dissertation in Technical Sciences. Kyiv, 1962.',
    pages: 484,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['laminated plastics', 'strength', 'creep', 'compression', 'tension', 'bending']
  })
];
