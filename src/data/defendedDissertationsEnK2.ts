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
  '01.02.03': { code: '01.02.03', en: 'Specialty 01.02.03' },
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
const instituteMechanicsAsUkraine = 'Institute of Mechanics, Academy of Sciences of Ukraine';
const instituteMechanicsNasUkraine = 'Institute of Mechanics, NAS of Ukraine';
const instituteMechanicsTimoshenkoNasUkraine = 'S.P. Timoshenko Institute of Mechanics, NAS of Ukraine';
const instituteConstructionMechanicsUkrSsr = 'Institute of Construction Mechanics, Academy of Sciences of the Ukrainian SSR';

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

export const defendedDissertationsEnK2: DefendedDissertationEntryEn[] = [
  entry({
    id: 'kyryliuk-vitalii-2012-three-dimensional-mixed-thermoelectroelastic-half-space',
    year: 2012,
    defenceDate: '2012-12-24',
    authorEn: 'Vitalii S. Kyryliuk',
    sourceLanguage: 'uk',
    titleEn: 'Three-Dimensional Mixed Static Problems of Thermoelectroelasticity for a Half-Space',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 24 December 2012. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 2011.',
    pages: 331,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['thermoelectroelasticity', 'half-space', 'three-dimensional problems']
  }),
  entry({
    id: 'kirichok-if-1994-thin-elastic-shells-plates-initial-deformations',
    year: 1994,
    defenceDate: '1994-11-30',
    authorEn: 'I.F. Kirichok',
    sourceLanguage: 'ru',
    titleEn: 'Dynamics of Thin Elastic Shells and Plates with Initial Deformations',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 30 November 1994. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1971.',
    pages: 181,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['shell dynamics', 'plates', 'initial deformations']
  }),
  entry({
    id: 'kisel-im-1946-oblique-longitudinal-bending-beyond-elasticity',
    year: 1946,
    defenceDate: '1946-06-27',
    authorEn: 'I.M. Kisel',
    sourceLanguage: 'ru',
    titleEn: 'Oblique Longitudinal Bending beyond the Elastic Range',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 27 June 1946. Candidate dissertation in Technical Sciences. Kyiv, 1946.',
    pages: 287,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['longitudinal bending', 'plasticity', 'beyond elasticity']
  }),
  entry({
    id: 'klimenko-natalia-2001-stress-state-inhomogeneous-anisotropic-cylinders-centrifugal-loads',
    year: 2001,
    defenceDate: '2001-02-27',
    authorEn: 'Natalia I. Klimenko',
    sourceLanguage: 'ru',
    titleEn: 'Stress State of Inhomogeneous Anisotropic Cylinders under Centrifugal Loads',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 27 February 2001. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2000.',
    pages: 152,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['anisotropic cylinders', 'inhomogeneous materials', 'centrifugal loads']
  }),
  entry({
    id: 'klyuchnikova-vg-1967-vibrations-thick-plates-nonclassical-formulation',
    year: 1967,
    defenceDate: '1967-06-13',
    authorEn: 'V.G. Klyuchnikova',
    sourceLanguage: 'ru',
    titleEn: 'Study of Vibrations of Thick Plates in a Nonclassical Formulation',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 13 June 1967. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1966.',
    pages: 143,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['thick plates', 'vibrations', 'nonclassical theory']
  }),
  entry({
    id: 'klyuchnikov-yuri-1985-brittle-fracture-materials-initial-stresses',
    year: 1985,
    defenceDate: '1985-10-29',
    authorEn: 'Yuri V. Klyuchnikov',
    sourceLanguage: 'ru',
    titleEn: 'Spatial Statistical Problems of Brittle Fracture Mechanics of Materials with Initial Stresses',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 29 October 1985. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1985.',
    pages: 132,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['brittle fracture', 'initial stresses', 'statistical mechanics']
  }),
  entry({
    id: 'klyavlin-vv-1970-macroscopic-characteristics-stress-field-microstructure-reinforced-materials',
    year: 1970,
    authorEn: 'V.V. Klyavlin',
    sourceLanguage: 'ru',
    titleEn:
      'Dependence of Macroscopic Characteristics and the Internal Stress Field on the Microstructure of Reinforced Materials',
    degree: candidateTechnical,
    bibliographyEn: 'Defended in 1970. Candidate dissertation in Technical Sciences. Kyiv, 1969.',
    pages: 230,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['reinforced materials', 'microstructure', 'internal stress field']
  }),
  entry({
    id: 'knyukh-viktor-1985-fracture-problems-compression-two-parallel-cracks',
    year: 1985,
    defenceDate: '1985-11-26',
    authorEn: 'Viktor I. Knyukh',
    sourceLanguage: 'ru',
    titleEn: 'Problems of Material Fracture Mechanics under Compression along Two Parallel Cracks',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 26 November 1985. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1985.',
    pages: 122,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['fracture mechanics', 'parallel cracks', 'compression']
  }),
  entry({
    id: 'kobzar-yuri-1991-thermostress-transversely-isotropic-bodies-hyperboloidal-notches',
    year: 1991,
    defenceDate: '1991-09-24',
    authorEn: 'Yuri M. Kobzar',
    sourceLanguage: 'ru',
    titleEn:
      'Stress and Thermally Stressed State of Elastic Transversely Isotropic Bodies with Hyperboloidal Notches',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 24 September 1991. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1991.',
    pages: 148,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['thermal stresses', 'transversely isotropic bodies', 'hyperboloidal notches']
  }),
  entry({
    id: 'kovalenko-anatoliy-1982-shell-of-revolution-fluid-transient-processes',
    year: 1982,
    defenceDate: '1982-04-25',
    authorEn: 'Anatoliy P. Kovalenko',
    sourceLanguage: 'ru',
    titleEn: 'Dynamics of “Shell of Revolution–Fluid” Systems during Transient Motion Processes',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 25 April 1982. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1982.',
    pages: 135,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['shells of revolution', 'fluid interaction', 'transient dynamics']
  }),
  entry({
    id: 'kovalchuk-viktoria-1995-divergent-flutter-bifurcations-rolling-systems',
    year: 1995,
    defenceDate: '1995-12-25',
    authorEn: 'Viktoria V. Kovalchuk',
    sourceLanguage: 'ru',
    titleEn: 'Divergence and Flutter Bifurcations in Phase Spaces of Systems with Rolling',
    degree: candidatePhysical,
    specialtyCode: '01.02.01',
    bibliographyEn: 'Defended on 25 December 1995. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1995.',
    pages: 160,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['bifurcation', 'flutter', 'rolling systems', 'theoretical mechanics']
  }),
  entry({
    id: 'kovalchuk-nv-1979-stress-strain-state-stability-cylindrical-shells-large-rectangular-openings',
    year: 1979,
    defenceDate: '1979-05-08',
    authorEn: 'N.V. Kovalchuk',
    sourceLanguage: 'ru',
    titleEn: 'Stress-Strain State and Stability of Cylindrical Shells with Large Rectangular Openings',
    degree: candidatePhysical,
    specialtyCode: '01.02.03',
    bibliographyEn: 'Defended on 8 May 1979. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1979.',
    pages: 160,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['cylindrical shells', 'rectangular openings', 'stability']
  }),
  entry({
    id: 'kovalchuk-ps-1972-interaction-oscillation-generation-mechanisms-one-system',
    year: 1972,
    defenceDate: '1972-02-29',
    authorEn: 'P.S. Kovalchuk',
    sourceLanguage: 'ru',
    titleEn: 'Interaction of Oscillation-Generation Mechanisms in a Single Oscillatory System',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 29 February 1972. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1971.',
    pages: 175,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['oscillations', 'self-excitation', 'mechanical systems']
  }),
  entry({
    id: 'kovtun-av-1972-cylindrical-shells-fluid-random-forces',
    year: 1972,
    defenceDate: '1972-03-28',
    authorEn: 'A.V. Kovtun',
    sourceLanguage: 'ru',
    titleEn: 'Vibrations of Cylindrical Shells with Fluid in a Field of Random Forces',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 28 March 1972. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1971.',
    pages: 136,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['cylindrical shells', 'fluid', 'random forces', 'vibrations']
  }),
  entry({
    id: 'kozhukhovsky-nikolai-1984-lyapunov-functions-nonlocal-analysis-nonlinear-systems-first-integrals',
    year: 1984,
    defenceDate: '1984-04-24',
    authorEn: 'Nikolai N. Kozhukhovsky',
    sourceLanguage: 'ru',
    titleEn: 'Lyapunov Function Method in Nonlocal Analysis of Nonlinear Systems with First Integrals',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 24 April 1984. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1984.',
    pages: 120,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['Lyapunov functions', 'nonlocal analysis', 'nonlinear systems']
  }),
  entry({
    id: 'kozlov-vi-1973-thermal-shock-elastic-viscoelastic-structural-elements',
    year: 1973,
    defenceDate: '1973-01-16',
    authorEn: 'V.I. Kozlov',
    sourceLanguage: 'ru',
    titleEn: 'Thermal Shock on Surfaces of Elastic and Viscoelastic Structural Elements',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 16 January 1973. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1972.',
    pages: 162,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['thermal shock', 'viscoelasticity', 'structural elements']
  }),
  entry({
    id: 'kozlov-vladimir-1994-two-dimensional-coupled-dynamic-thermoelectroviscoelasticity-harmonic-deformation',
    year: 1994,
    authorEn: 'Vladimir I. Kozlov',
    sourceLanguage: 'ru',
    titleEn:
      'Two-Dimensional Coupled Dynamic Problems of Thermoelectroviscoelasticity under Harmonic Deformation',
    degree: doctorTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1994. Doctoral dissertation in Technical Sciences. Kyiv, 1994.',
    pages: 374,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['thermoelectroviscoelasticity', 'coupled dynamics', 'harmonic deformation']
  }),
  entry({
    id: 'kozlov-sergey-1982-layered-cylindrical-shell-attached-masses',
    year: 1982,
    authorEn: 'Sergey V. Kozlov',
    sourceLanguage: 'ru',
    titleEn: 'Vibrations of a Layered Cylindrical Shell with Attached Masses',
    degree: candidatePhysical,
    bibliographyEn: 'Defended in 1982. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1982.',
    pages: 161,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['layered cylindrical shells', 'attached masses', 'vibrations']
  }),
  entry({
    id: 'kokoshin-stanislav-1982-stress-state-layered-anisotropic-shells-modified-fem-schemes',
    year: 1982,
    authorEn: 'Stanislav S. Kokoshin',
    sourceLanguage: 'ru',
    titleEn: 'Stress-State Analysis of Layered Anisotropic Shells Based on Modified FEM Schemes',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1982. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1982.',
    pages: 151,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['layered anisotropic shells', 'finite element method', 'stress analysis']
  }),
  entry({
    id: 'kolgadin-va-1964-elastoplastic-deformations-thin-walled-structures-complex-resistance',
    year: 1964,
    defenceDate: '1964-08-07',
    authorEn: 'V.A. Kolgadin',
    sourceLanguage: 'ru',
    titleEn: 'Elastoplastic Deformations of Thin-Walled Structural Elements under Complex Resistance',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 7 August 1964. Candidate dissertation in Technical Sciences. Kyiv, 1964.',
    pages: 180,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['elastoplastic deformation', 'thin-walled structures', 'complex resistance']
  }),
  entry({
    id: 'kolenchuk-ki-1948-moisture-changes-strength-structural-elements',
    year: 1948,
    defenceDate: '1948-11-20',
    authorEn: 'K.I. Kolenchuk',
    sourceLanguage: 'ru',
    titleEn: 'Influence of Moisture Changes on the Strength of Structural Elements',
    degree: doctorTechnical,
    bibliographyEn: 'Defended on 20 November 1948. Doctoral dissertation in Technical Sciences. Kyiv, 1948.',
    pages: 278,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['moisture effects', 'structural elements', 'strength']
  })
];
