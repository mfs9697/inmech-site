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

export const defendedDissertationsEnM3: DefendedDissertationEntryEn[] = [
  entry({
    id: 'melnikov-valery-1981-thermomechanical-behavior-viscoelastic-hollow-cylinder',
    year: 1981,
    authorEn: 'Valery P. Melnikov',
    sourceLanguage: 'ru',
    titleEn:
      'Thermomechanical Behaviour of a Viscoelastic Hollow Cylinder of Finite Length under Mechanical and Thermal Loading',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended in 1981. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1981.',
    pages: 164,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['thermomechanics', 'viscoelasticity', 'hollow cylinders', 'thermal loading']
  }),
  entry({
    id: 'menshikov-alexander-2003-axisymmetric-dynamic-circular-crack-contact-interaction',
    year: 2003,
    defenceDate: '2003-01-28',
    authorEn: 'Alexander V. Menshikov',
    sourceLanguage: 'ru',
    titleEn:
      'Spatial Axisymmetric Dynamic Problem for a Material with a Circular Crack with Account of Contact Interaction',
    degree: candidatePhysical,
    bibliographyEn: 'Defended on 28 January 2003. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2002.',
    pages: 124,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['dynamic fracture mechanics', 'circular cracks', 'contact interaction', 'axisymmetric problems']
  }),
  entry({
    id: 'menshikov-alexander-2008-spatial-dynamic-fracture-crack-face-contact',
    year: 2008,
    defenceDate: '2008-04-22',
    authorEn: 'Alexander V. Menshikov',
    sourceLanguage: 'ru',
    titleEn:
      'Spatial Dynamic Problems of Fracture Mechanics with Account of Contact Interaction of Crack Faces',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 22 April 2008. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 2007.',
    pages: 291,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['dynamic fracture mechanics', 'crack-face contact', 'spatial problems']
  }),
  entry({
    id: 'menshikova-marina-2003-asymmetric-dynamic-plane-crack-contact-interaction',
    year: 2003,
    defenceDate: '2003-09-30',
    authorEn: 'Marina V. Menshikova',
    sourceLanguage: 'uk',
    titleEn:
      'Asymmetric Dynamic Problem for a Plane with a Crack with Account of Contact Interaction of Its Faces',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 30 September 2003. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 2003.',
    pages: 124,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['dynamic fracture mechanics', 'asymmetric problems', 'crack-face contact']
  }),
  entry({
    id: 'menshikov-vasily-2009-dynamic-spatial-fracture-interface-cracks',
    year: 2009,
    defenceDate: '2009-10-27',
    authorEn: 'Vasily A. Menshikov',
    sourceLanguage: 'ru',
    titleEn:
      'Dynamic Spatial Problems of Fracture Mechanics for Materials with Interface Cracks',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 27 October 2009. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 2009.',
    pages: 324,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['dynamic fracture mechanics', 'interface cracks', 'spatial problems']
  }),
  entry({
    id: 'merzlyakov-vladimir-1993-elastoplastic-shells-variable-thickness-nonaxisymmetric-noniso-thermal',
    year: 1993,
    defenceDate: '1993-10-26',
    authorEn: 'Vladimir A. Merzlyakov',
    sourceLanguage: 'ru',
    titleEn:
      'Elastoplastic State of Shells of Revolution of Variable Thickness under Non-Axisymmetric Nonisothermal Loading',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 26 October 1993. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1993.',
    pages: 286,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkraine,
    tags: ['elastoplasticity', 'shells of revolution', 'variable thickness', 'nonisothermal loading']
  }),
  entry({
    id: 'mekhtiev-mahir-1988-local-buckling-fracture-thin-plates-holes-cracks',
    year: 1988,
    defenceDate: '1988-10-11',
    authorEn: 'Mahir Alikulu ogly Mekhtiev',
    sourceLanguage: 'ru',
    titleEn: 'Local Buckling and Fracture of Thin Plates with Circular Holes and Cracks',
    degree: candidateTechnical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 11 October 1988. Candidate dissertation in Technical Sciences. Kyiv, 1988.',
    pages: 114,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['local buckling', 'thin plates', 'holes', 'cracks', 'fracture']
  }),
  entry({
    id: 'miroshnik-oleg-1991-plane-transverse-waves-cylindrical-cavity-initial-stresses',
    year: 1991,
    defenceDate: '1991-12-17',
    authorEn: 'Oleg G. Miroshnik',
    sourceLanguage: 'ru',
    titleEn:
      'Propagation of Small-Amplitude Plane Transverse Waves along a Cylindrical Cavity in a Medium with Inhomogeneous Initial Stresses',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 17 December 1991. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1991.',
    pages: 116,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkraine,
    tags: ['transverse waves', 'cylindrical cavities', 'initial stresses', 'wave propagation']
  }),
  entry({
    id: 'mikhailenko-vasily-1988-axisymmetric-vibrations-dissipative-heating-electroviscoelastic-bodies',
    year: 1988,
    defenceDate: '1988-11-01',
    authorEn: 'Vasily V. Mikhailenko',
    sourceLanguage: 'ru',
    titleEn:
      'Axisymmetric Vibrations and Dissipative Heating of Electroviscoelastic Bodies of Revolution',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 1 November 1988. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1988.',
    pages: 168,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['electroviscoelasticity', 'axisymmetric vibrations', 'dissipative heating']
  }),
  entry({
    id: 'mikhailenko-vasily-1998-resonant-vibrations-dissipative-heating-piezoelectric-bodies',
    year: 1998,
    defenceDate: '1998-06-30',
    authorEn: 'Vasily V. Mikhailenko',
    sourceLanguage: 'ru',
    titleEn:
      'Resonant Vibrations and Dissipative Heating of Inhomogeneous Viscoelastic Piezoelectric Bodies',
    degree: doctorPhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 30 June 1998. Doctoral dissertation in Physical and Mathematical Sciences. Kyiv, 1998.',
    pages: 288,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsNasUkraine,
    tags: ['resonant vibrations', 'dissipative heating', 'piezoelectric bodies', 'viscoelasticity']
  }),
  entry({
    id: 'mozniker-ra-1960-vibration-test-installations-electromagnetic-exciters',
    year: 1960,
    defenceDate: '1960-05-10',
    authorEn: 'R.A. Mozniker',
    sourceLanguage: 'ru',
    titleEn: 'Vibration Test Installations with Electromagnetic Exciters',
    degree: candidateTechnical,
    bibliographyEn: 'Defended on 10 May 1960. Candidate dissertation in Technical Sciences. Kyiv, 1959.',
    pages: 195,
    placeEn: 'Kyiv',
    institutionEn: instituteConstructionMechanicsUkrSsr,
    tags: ['vibration testing', 'electromagnetic exciters', 'test installations']
  }),
  entry({
    id: 'moseenkov-yuri-1985-nonstationary-hydroelasticity-bodies-flat-rectilinear-boundaries',
    year: 1985,
    defenceDate: '1985-09-24',
    authorEn: 'Yuri B. Moseenkov',
    sourceLanguage: 'ru',
    titleEn: 'A Problem of Nonstationary Hydroelasticity for Bodies with Flat and Rectilinear Boundaries',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 24 September 1985. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1985.',
    pages: 157,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['nonstationary hydroelasticity', 'flat boundaries', 'rectilinear boundaries']
  }),
  entry({
    id: 'motovilovets-ia-1973-effective-methods-heat-conduction-thermoelasticity',
    year: 1973,
    defenceDate: '1973-01-16',
    authorEn: 'I.A. Motovilovets',
    sourceLanguage: 'ru',
    titleEn: 'Some Effective Methods for Solving Problems of Heat Conduction and Thermoelasticity',
    degree: doctorTechnical,
    bibliographyEn: 'Defended on 16 January 1973. Doctoral dissertation in Technical Sciences. Kyiv, 1972.',
    pages: 369,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsAsUkrSsr,
    tags: ['heat conduction', 'thermoelasticity', 'effective methods']
  }),
  entry({
    id: 'mukoed-alexander-1996-stress-state-inhomogeneous-orthotropic-plates-spatial-formulation',
    year: 1996,
    defenceDate: '1996-06-11',
    authorEn: 'Alexander A. Mukoed',
    sourceLanguage: 'ru',
    titleEn:
      'Solving Problems on the Stress State of Inhomogeneous Orthotropic Plates in a Spatial Formulation',
    degree: candidatePhysical,
    specialtyCode: '01.02.04',
    bibliographyEn: 'Defended on 11 June 1996. Candidate dissertation in Physical and Mathematical Sciences. Kyiv, 1996.',
    pages: 129,
    placeEn: 'Kyiv',
    institutionEn: instituteMechanicsTimoshenkoNasUkraine,
    tags: ['orthotropic plates', 'inhomogeneous materials', 'spatial formulation', 'stress state']
  })
];
