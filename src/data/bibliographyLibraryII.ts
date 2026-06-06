import type { BibliographyEntry } from './bibliography';

// Technical alphabetic batch for entries extracted from the old Бібліотека.html file.
// Public display remains unified; this file is only an internal data chunk.
// Source section: “Окремі наукові монографії, довідники та словники з механіки”.
// Letters І / И. The “Институт механики” historical publications from this range are already included in bibliographyLegacyCollections.ts.
export const bibliographyLibraryII = [
  {
    id: 'library-i-186-ishchenko-pogrebniak-sinaiskii-1979-vliianie-vysokikh-temperatur-na-ustalost',
    authors: 'Ищенко И.И., Погребняк А.Д., Синайский Б.Н.',
    title: 'Влияние высоких температур на сопротивление усталости жаропрочных сталей и сплавов',
    year: 1979,
    publisher: 'К.: Наук. думка',
    pages: '175 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['materials-mechanics', 'fracture-mechanics', 'thermoelasticity-creep', 'experimental-mechanics', 'monograph'],
    inLibraryOfCongress: true
  }
] as const satisfies readonly BibliographyEntry[];
