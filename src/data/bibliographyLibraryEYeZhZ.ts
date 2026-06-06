import type { BibliographyEntry } from './bibliography';

// Technical alphabetic batch for entries extracted from the old Бібліотека.html file.
// Public display remains unified; this file is only an internal data chunk.
// Source section: “Окремі наукові монографії, довідники та словники з механіки”.
// Letters Е / Є / Ж / З. No separate Е / Є entries were found in this extracted range.
export const bibliographyLibraryEYeZhZ = [
  {
    id: 'library-zh-176-zhudin-1934-porivniannia-dereviano-zaliznykh-sehmentnykh-ferm',
    authors: 'Жудін М.Д.',
    title: 'Порівняння дерев’яно-залізних сегментних ферм з арками',
    year: 1934,
    publisher: 'К.: Вид-во ВУАН',
    pages: '51 с.',
    language: 'uk',
    type: 'monograph',
    tags: ['solid-mechanics', 'materials-mechanics', 'monograph']
  },
  {
    id: 'library-zh-177-zhudin-1935-1936-plastychni-deformatsii-v-stalnykh-konstruktsiiakh',
    authors: 'Жудін Н.Д.',
    title: 'Пластичні деформації в стальних конструкціях. В 2-х ч.',
    year: 1935,
    publisher: 'К.: Вид-во ВУАН',
    pages: 'Ч. 1. Основи розрахунку — 218 с.; Ч. 2. Сталі без площадки текучості. Дослідження роботи перерізу — 160 с.',
    language: 'uk',
    type: 'series-volume',
    tags: ['solid-mechanics', 'materials-mechanics', 'multivolume']
  },
  {
    id: 'library-zh-178-zhudin-1941-ispytanie-modelei-kolonn-dvortsa-sovetov',
    authors: 'Жудин Н.Д.',
    title: 'Испытание моделей колонн Дворца Советов СССР',
    year: 1941,
    publisher: 'К.: Вид-во АН УРСР',
    pages: '84 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['experimental-mechanics', 'solid-mechanics', 'monograph']
  },
  {
    id: 'library-zh-179-zhudin-1957-stalnye-konstruktsii',
    authors: 'Жудин Н.Д.',
    title: 'Стальные конструкции',
    year: 1957,
    publisher: 'Москва: Госстройиздат',
    pages: '336 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['solid-mechanics', 'materials-mechanics', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-zh-180-zhudin-strelbitska-1939-plastychni-deformatsii-v-stalnykh-konstruktsiiakh',
    authors: 'Жудін М.Д., Стрельбицька О.І.',
    title: 'Пластичні деформації в стальних конструкціях. Експериментальне дослідження напруженого стану',
    year: 1939,
    publisher: 'К.: Вид-во АН УРСР',
    pages: '148 с.',
    language: 'uk',
    type: 'monograph',
    tags: ['experimental-mechanics', 'solid-mechanics', 'materials-mechanics', 'monograph']
  },
  {
    id: 'library-z-181-zarutskii-pochtman-skalozub-1990-optimizatsiia-podkreplennykh-tsilindricheskikh-obolochek',
    authors: 'Заруцкий В.А., Почтман Ю.М., Скалозуб В.В.',
    title: 'Оптимизация подкрепленных цилиндрических оболочек',
    year: 1990,
    publisher: 'К.: Вища шк.',
    pages: '138 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['shells-plates', 'stability-control', 'numerical-methods', 'monograph']
  }
] as const satisfies readonly BibliographyEntry[];
