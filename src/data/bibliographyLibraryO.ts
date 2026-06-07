import type { BibliographyEntry } from './bibliography';

// Technical alphabetic batch for entries extracted from the old Бібліотека.html file.
// Public display remains unified; this file is only an internal data chunk.
// Source section: “Окремі наукові монографії, довідники та словники з механіки”.
// Letter О.
export const bibliographyLibraryO = [
  {
    id: 'library-o-335-obolenskii-2010-kriterii-ustoichivosti-dvizheniia-nelineinykh-sistem',
    authors: 'Оболенский А.Ю.',
    title: 'Критерии устойчивости движения некоторых нелинейных систем',
    year: 2010,
    publisher: 'К.: «Феникс»',
    pages: '228 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['stability-control', 'theoretical-mechanics', 'monograph']
  },
  {
    id: 'library-o-336-ovsiannikov-starikov-1989-metod-superpozitsii-singuliarnykh-reshenii',
    authors: 'Овсянников А.С., Стариков В.А.',
    title: 'Метод суперпозиции сингулярных решений в осесимметричных задачах теории упругости',
    year: 1989,
    publisher: 'К.: Наук. думка',
    pages: '100 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['solid-mechanics', 'numerical-methods', 'monograph']
  }
] as const satisfies readonly BibliographyEntry[];
