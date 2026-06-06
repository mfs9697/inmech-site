export const bibliographyTagLabels = {
  'shells-plates': 'Механіка оболонок і пластин',
  composites: 'Механіка композитів',
  'fracture-mechanics': 'Механіка руйнування',
  'dynamics-waves': 'Динаміка, коливання та хвилі',
  'thermoelasticity-creep': 'Термопружність, повзучість і непружне деформування',
  'stability-control': 'Стійкість, керування та нелінійні системи',
  'contact-mechanics': 'Контактна механіка',
  'solid-mechanics': 'Механіка деформівного твердого тіла',
  'materials-mechanics': 'Механіка матеріалів',
  'numerical-methods': 'Чисельні та математичні методи',
  'fluid-gas-mechanics': 'Механіка рідини і газу',
  acoustics: 'Акустика',
  'initial-stresses': 'Початкові напруження',
  piezoelectricity: 'П’єзоелектричні матеріали',
  'reference-edition': 'Довідкове видання',
  'history-of-science': 'Історія науки',
  'institute-history': 'Історія Інституту',
  textbook: 'Підручник / навчальний посібник',
  monograph: 'Монографія',
  'edited-volume': 'Колективна праця',
  chapter: 'Розділ у виданні',
  multivolume: 'Багатотомне видання'
} as const;

export type BibliographyTag = keyof typeof bibliographyTagLabels;

export const bibliographyTagGroups = [
  {
    title: 'Наукові напрями',
    tags: [
      'shells-plates',
      'composites',
      'fracture-mechanics',
      'dynamics-waves',
      'thermoelasticity-creep',
      'stability-control',
      'contact-mechanics',
      'solid-mechanics',
      'materials-mechanics',
      'numerical-methods',
      'fluid-gas-mechanics',
      'acoustics',
      'initial-stresses',
      'piezoelectricity'
    ]
  },
  {
    title: 'Типи видань',
    tags: ['monograph', 'textbook', 'edited-volume', 'chapter', 'multivolume', 'reference-edition']
  },
  {
    title: 'Історико-довідкові позначки',
    tags: ['history-of-science', 'institute-history']
  }
] as const satisfies readonly { title: string; tags: readonly BibliographyTag[] }[];
