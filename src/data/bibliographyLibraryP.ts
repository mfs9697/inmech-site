import type { BibliographyEntry } from './bibliography';

// Technical alphabetic batch for entries extracted from the old Бібліотека.html file.
// Public display remains unified; this file is only an internal data chunk.
// Source section: “Окремі наукові монографії, довідники та словники з механіки”.
// Letter П.
export const bibliographyLibraryP = [
  {
    id: 'library-p-337-palchevskyi-1940-plastychni-deformatsii-v-stalnykh-konstruktsiiakh',
    authors: 'Пальчевський С.А.',
    title: 'Пластичні деформації в стальних конструкціях. Приклади розрахунку',
    year: 1940,
    publisher: 'К.: Вид-во АН УРСР',
    pages: '178 с.',
    language: 'uk',
    type: 'monograph',
    tags: ['materials-mechanics', 'solid-mechanics', 'monograph']
  },
  {
    id: 'library-p-338-patalakha-gonchar-senchenkov-chervinka-2003-indentornyi-mekhanizm-v-geodinamike',
    authors: 'Паталаха Е.И., Гончар В.В., Сенченков И.К., Червинка О.П.',
    title: 'Инденторный механизм в геодинамике крымско-черноморского региона. Прогноз УВ и сейсмоопасности',
    year: 2003,
    publisher: 'К.: НАНУ, СНБОУ',
    pages: '226 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['solid-mechanics', 'interdisciplinary-modeling', 'monograph']
  },
  {
    id: 'library-p-339-patalakha-gonchar-senchenkov-chervinka-2003-elementy-geodinamiki-karpat',
    authors: 'Паталаха Е.И., Гончар В.В., Сенченков И.К., Червинка О.П.',
    title: 'Элементы геодинамики Карпат. Прогноз углеводорода и сейсмоопасности',
    year: 2003,
    publisher: 'К.: НАНУ, СНБОУ',
    pages: '152 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['solid-mechanics', 'interdisciplinary-modeling', 'monograph']
  },
  {
    id: 'library-p-340-pisarenko-1953-mekhanicheskie-kolebaniia',
    authors: 'Писаренко Г.С.',
    title: 'Механические колебания',
    year: 1953,
    publisher: 'К.: Изд. АН УССР',
    pages: '104 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['dynamics-waves', 'theoretical-mechanics', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-p-341-pisarenko-1955-kolebaniia-uprugikh-sistem-s-uchetom-dissipatsii-energii',
    authors: 'Писаренко Г.С.',
    title: 'Колебания упругих систем с учетом диссипации энергии в материале',
    year: 1955,
    publisher: 'К.: Изд. АН УССР',
    pages: '238 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['dynamics-waves', 'solid-mechanics', 'monograph']
  },
  {
    id: 'library-p-342-podilchuk-1979-trekhmernye-zadachi-teorii-uprugosti',
    authors: 'Подильчук Ю.Н.',
    title: 'Трехмерные задачи теории упругости',
    year: 1979,
    publisher: 'К.: Наук. думка',
    pages: '240 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['solid-mechanics', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-p-343-podilchuk-1983-prostranstvennye-zadachi-mekhaniki-gornykh-porod',
    authors: 'Подильчук Ю.Н.',
    title: 'Пространственные задачи механики горных пород',
    year: 1983,
    publisher: 'К.: Наук. думка',
    pages: '160 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['solid-mechanics', 'interdisciplinary-modeling', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-p-344-podilchuk-rubtsov-1988-luchevye-metody-v-teorii-rasprostraneniia-i-rasseianiia-voln',
    authors: 'Подильчук Ю.Н., Рубцов Ю.К.',
    title: 'Лучевые методы в теории распространения и рассеяния волн',
    year: 1988,
    publisher: 'К.: Наук. думка',
    pages: '220 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['dynamics-waves', 'solid-mechanics', 'numerical-methods', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-p-345-polosukhin-1952-struktura-i-prochnost-gazopressovykh-svarnykh-soedinenii',
    authors: 'Полосухин Н.А.',
    title: 'Структура и прочность газопрессовых сварных соединений',
    year: 1952,
    publisher: 'Киев-Москва: Машгиз',
    pages: '108 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['materials-mechanics', 'experimental-mechanics', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-p-346-poturaev-dyrda-karnaukhov-senchenkov-kozlov-maznetsova-1987-termomekhanika-elastomernykh-elementov',
    authors: 'Потураев В.Н., Дырда В.И., Карнаухов В.Г., Сенченков И.К., Козлов В.И., Мазнецова А.В.',
    title: 'Термомеханика эластомерных элементов конструкций при циклическом нагружении',
    year: 1987,
    publisher: 'К.: Наук. думка',
    pages: '288 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['thermoelasticity-creep', 'materials-mechanics', 'dynamics-waves', 'monograph'],
    inLibraryOfCongress: true
  }
] as const satisfies readonly BibliographyEntry[];
