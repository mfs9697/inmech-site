import type { BibliographyEntry } from './bibliography';

// Technical alphabetic batch for entries extracted from the old Бібліотека.html file.
// Public display remains unified; this file is only an internal data chunk.
// Source section: “Окремі наукові монографії, довідники та словники з механіки”.
// Letter Н.
export const bibliographyLibraryN = [
  {
    id: 'library-n-331-nemysh-1989-elementy-mekhaniki-kusochno-odnorodnykh-tel',
    authors: 'Немиш Ю.Н.',
    title: 'Элементы механики кусочно-однородных тел с неканоническими поверхностями раздела',
    year: 1989,
    publisher: 'К.: Наук. думка',
    pages: '312 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['solid-mechanics', 'contact-mechanics', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-n-332-nemysh-bloshko-1987-napriazhennoe-sostoianie-uprugikh-tsilindrov-s-vytochkami',
    authors: 'Немиш Ю.Н., Блошко Н.М.',
    title: 'Напряженное состояние упругих цилиндров с выточками',
    year: 1987,
    publisher: 'К.: Наук. думка',
    pages: '176 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['solid-mechanics', 'shells-plates', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-n-333-nemysh-chernopisskii-1983-uprugoe-ravnovesie-gofrirovannykh-tel',
    authors: 'Немиш Ю.Н., Чернопиский Д.И.',
    title: 'Упругое равновесие гофрированных тел',
    year: 1983,
    publisher: 'К.: Наук. думка',
    pages: '188 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['solid-mechanics', 'shells-plates', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-n-334-nikitina-2012-nelineinye-sistemy-so-slozhnym-i-khaoticheskim-povedeniem',
    authors: 'Никитина Н.В.',
    title: 'Нелинейные системы со сложным и хаотическим поведением траекторий',
    year: 2012,
    publisher: 'К.: «Феникс»',
    pages: '240 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['stability-control', 'dynamics-waves', 'monograph']
  }
] as const satisfies readonly BibliographyEntry[];
