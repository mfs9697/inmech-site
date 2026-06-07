import type { BibliographyEntry } from './bibliography';

// Technical alphabetic batch for entries extracted from the old Бібліотека.html file.
// Public display remains unified; this file is only an internal data chunk.
// Source section: “Окремі наукові монографії, довідники та словники з механіки”.
// Letter Р.
export const bibliographyLibraryR = [
  {
    id: 'library-r-347-rasskazov-sokolovskaia-shulga-1986-sloistye-ortotropnye-plastiny-i-obolochki',
    authors: 'Рассказов А.О., Соколовская И.И., Шульга Н.А.',
    title: 'Теория и расчет слоистых ортотропных пластин и оболочек',
    year: 1986,
    publisher: 'К.: Вища школа',
    pages: '191 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['shells-plates', 'composites', 'solid-mechanics', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-r-348-repman-1935-zahalnyi-metod-rozrakhunku-tonkykh-plyt',
    authors: 'Репман Ю.',
    title: 'Загальний метод розрахунку тонких плит',
    year: 1935,
    publisher: 'К.: Вид-во ВУАН',
    pages: '44 с.',
    language: 'uk',
    type: 'monograph',
    tags: ['shells-plates', 'solid-mechanics', 'monograph']
  },
  {
    id: 'library-r-349-rosiisko-ukrainskyi-slovnyk-z-mekhaniky-1995',
    authors: 'Ред. Григоренко Я.М., Биховець Н.М., Биховець О.М.',
    title: 'Російсько-український словник з механіки',
    year: 1995,
    publisher: 'К.: Либідь',
    pages: '216 с.',
    language: 'uk',
    type: 'dictionary',
    tags: ['reference-edition', 'theoretical-mechanics']
  },
  {
    id: 'library-r-350-rushchitskii-1991-elementy-teorii-smesi',
    authors: 'Рущицкий Я.Я.',
    title: 'Элементы теории смеси',
    year: 1991,
    publisher: 'К.: Наук. думка',
    pages: '160 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['solid-mechanics', 'materials-mechanics', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-r-351-rushchytskyi-tsurpal-1998-khvyli-v-materialakh-z-mikrostrukturoiu',
    authors: 'Рущицький Я.Я., Цурпал С.І.',
    title: 'Хвилі в матеріалах з мікроструктурою',
    year: 1998,
    publisher: 'Київ: Інститут механіки ім. С.П. Тимошенка',
    pages: '377 с.',
    language: 'uk',
    type: 'monograph',
    tags: ['dynamics-waves', 'materials-mechanics', 'monograph']
  },
  {
    id: 'library-r-352-rushchitsky-2011-theory-of-waves-in-materials',
    authors: 'Rushchitsky J.J.',
    title: 'Theory of Waves in Materials',
    year: 2011,
    publisher: 'Copenhagen: Ventus Publishing ApS',
    pages: '270 p.',
    language: 'en',
    type: 'monograph',
    tags: ['dynamics-waves', 'materials-mechanics', 'monograph']
  },
  {
    id: 'library-r-353-rushchitsky-2014-nonlinear-elastic-waves-in-materials',
    authors: 'Rushchitsky J.J.',
    title: 'Nonlinear Elastic Waves in Materials',
    year: 2014,
    publisher: 'Heidelberg: Springer',
    pages: '454 p.',
    language: 'en',
    type: 'monograph',
    tags: ['dynamics-waves', 'materials-mechanics', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-r-354-rushchitsky-2017-nonlinear-elastic-waves-in-materials-chinese-translation',
    authors: 'Rushchitsky J.J.',
    title: 'Nonlinear Elastic Waves in Materials',
    year: 2017,
    publisher: 'Beijing: Beijing Institute of Technology Press',
    pages: '454 p.',
    language: 'other',
    type: 'monograph',
    tags: ['dynamics-waves', 'materials-mechanics', 'monograph'],
    note: 'Переклад книги з англійської мови на китайську мову.',
    inLibraryOfCongress: true
  },
  {
    id: 'library-r-355-riabtsev-senchenkov-turyk-2015-naplavka-materialy-tekhnologii-modelirovanie',
    authors: 'Рябцев И.А., Сенченков И.К., Турык Э.В.',
    title: 'Наплавка. Материалы, технологии, математическое моделирование',
    year: 2015,
    publisher: 'Гливице: Изд-во Силезского политехнического института',
    pages: '590 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['materials-mechanics', 'thermoelasticity-creep', 'numerical-methods', 'monograph']
  }
] as const satisfies readonly BibliographyEntry[];
