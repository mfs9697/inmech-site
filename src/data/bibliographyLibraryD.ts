import type { BibliographyEntry } from './bibliography';

// Technical alphabetic batch for entries extracted from the old Бібліотека.html file.
// Public display remains unified; this file is only an internal data chunk.
// Source section: “Окремі наукові монографії, довідники та словники з механіки”.
// Letter Д.
export const bibliographyLibraryD = [
  {
    id: 'library-d-167-davidenkov-1949-ustalost-metallov',
    authors: 'Давиденков Н.Н.',
    title: 'Усталость металлов',
    year: 1949,
    publisher: 'К.: Изд-во АН УССР',
    pages: '61 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['materials-mechanics', 'fracture-mechanics', 'monograph']
  },
  {
    id: 'library-d-168-dlugach-1964-metod-setok-v-smeshannoi-ploskoi-zadache-teorii-uprugosti',
    authors: 'Длугач М.И.',
    title: 'Метод сеток в смешанной плоской задаче теории упругости',
    year: 1964,
    publisher: 'К.: Наук. думка',
    pages: '260 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['solid-mechanics', 'numerical-methods', 'monograph']
  },
  {
    id: 'library-d-169-dondik-1962-mekhanicheskie-ispytaniia-metallov',
    authors: 'Дондик И.Г.',
    title: 'Механические испытания металлов',
    year: 1962,
    publisher: 'К.: Изд. АН УССР',
    pages: '227 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['materials-mechanics', 'experimental-mechanics', 'monograph']
  },
  {
    id: 'library-d-170-draigor-1948-iznos-detalei-mashin',
    authors: 'Драйгор Д.А.',
    title: 'Износ деталей машин',
    year: 1948,
    publisher: 'К.: Гостехиздат',
    pages: '41 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['materials-mechanics', 'experimental-mechanics', 'monograph']
  },
  {
    id: 'library-d-171-draigor-1952-spravochnik-po-remontu-gruzovykh-avtomobilei',
    authors: 'Драйгор Д.А.',
    title: 'Справочник по ремонту грузовых автомобилей',
    year: 1952,
    publisher: 'К.: Гостехиздат',
    pages: '604 с.',
    language: 'ru',
    type: 'handbook',
    tags: ['materials-mechanics', 'reference-edition']
  },
  {
    id: 'library-d-172-draigor-1959-iznosostoikost-i-ustalostnaia-prochnost-stali',
    authors: 'Драйгор Д.А.',
    title: 'Износостойкость и усталостная прочность стали в зависимости от условий обработки и процесса трения',
    year: 1959,
    publisher: 'К.: Изд. АН УССР',
    pages: '142 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['materials-mechanics', 'fracture-mechanics', 'experimental-mechanics', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-d-173-draigor-valchuk-1962-vliianie-iznosa-na-ustalostnuiu-prochnost-stali',
    authors: 'Драйгор Д.А., Вальчук Г.И.',
    title: 'Влияние износа на усталостную прочность стали с учетом масштабного фактора',
    year: 1962,
    publisher: 'К.: Изд. АН УССР',
    pages: '112 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['materials-mechanics', 'fracture-mechanics', 'experimental-mechanics', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-d-174-draigor-venzhega-belkin-valchuk-1964-stoikost-valkov-kholodnogo-prokata',
    authors: 'Драйгор Д.А., Венжега А.С., Белкин М.Е., Вальчук Г.И.',
    title: 'Стойкость валков чистового холодного проката',
    year: 1964,
    publisher: 'М.: Машиностроение',
    pages: '128 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['materials-mechanics', 'experimental-mechanics', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-d-175-dyshlis-plakhtienko-2014-modeli-nanokristallov-i-neklassicheskie-periodicheskie-funktsii',
    authors: 'Дышлис А., Плахтиенко Н.',
    title: 'Модели нанокристаллов и неклассические периодические функции',
    year: 2014,
    publisher: 'Lambert Academic Publishing',
    pages: '303 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['materials-mechanics', 'theoretical-mechanics', 'interdisciplinary-modeling', 'monograph']
  }
] as const satisfies readonly BibliographyEntry[];
