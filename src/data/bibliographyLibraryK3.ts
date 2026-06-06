import type { BibliographyEntry } from './bibliography';

// Technical alphabetic batch for entries extracted from the old Бібліотека.html file.
// Public display remains unified; this file is only an internal data chunk.
// Source section: “Окремі наукові монографії, довідники та словники з механіки”.
// Letter К, part 3: Костецкий — Кулик.
export const bibliographyLibraryK3 = [
  {
    id: 'library-k-238-kostetskii-1947-shlifovanie-zakalennoi-stali',
    authors: 'Костецкий Б.И.',
    title: 'Шлифование закаленной стали',
    year: 1947,
    publisher: 'Киев–Львов: Гостехиздат Украины',
    pages: '86 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['materials-mechanics', 'experimental-mechanics', 'monograph']
  },
  {
    id: 'library-k-239-kostetskii-1949-stoikost-rezhushchikh-instrumentov',
    authors: 'Костецкий Б.И.',
    title: 'Стойкость режущих инструментов',
    year: 1949,
    publisher: 'М.: Стройиздат',
    pages: '216 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['materials-mechanics', 'experimental-mechanics', 'monograph']
  },
  {
    id: 'library-k-240-kostetskii-1950-iznosostoikost-detalei-mashin',
    authors: 'Костецкий Б.И.',
    title: 'Износостойкость деталей машин',
    year: 1950,
    publisher: 'Киев–Москва: Машгиз',
    pages: '216 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['materials-mechanics', 'experimental-mechanics', 'monograph']
  },
  {
    id: 'library-k-241-kokhan-buhaiets-1934-pokryttia-na-dvosharnirnykh-derevianykh-arkakh',
    authors: 'Кохан М.Т., Бугаєць П.Г.',
    title: 'Покриття на двошарнірних дерев’яних арках',
    year: 1934,
    publisher: 'К.: Вид-во ВУАН',
    pages: '63 с.',
    language: 'uk',
    type: 'monograph',
    tags: ['solid-mechanics', 'materials-mechanics', 'monograph']
  },
  {
    id: 'library-k-242-kokhan-1936-dodatkovi-napruhy-u-derevianykh-fermakh',
    authors: 'Кохан М.Т.',
    title: 'Про розрахунок додаткових напруг у дерев’яних балочних фермах',
    year: 1936,
    publisher: 'К.: Вид-во АН УРСР',
    pages: '95 с.',
    language: 'uk',
    type: 'monograph',
    tags: ['solid-mechanics', 'materials-mechanics', 'monograph']
  },
  {
    id: 'library-k-243-cruz-hernandez-martynyuk-2010-advances-in-chaotic-dynamics',
    authors: 'Cruz-Hernandez C., Martynyuk A.A.',
    title: 'Advances in Chaotic Dynamics and Applications',
    year: 2010,
    publisher: 'Cambridge Scientific Publishers (CSP)',
    pages: '432 p.',
    language: 'en',
    type: 'monograph',
    tags: ['stability-control', 'dynamics-waves', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-k-244-krylov-bogoliubov-1932-osnovnye-problemy-nelineinoi-mekhaniki',
    authors: 'Крылов Н.М., Боголюбов Н.Н.',
    title: 'Основные проблемы нелинейной механики',
    year: 1932,
    publisher: 'М.–Л.: ГТТИ',
    pages: '98 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['theoretical-mechanics', 'dynamics-waves', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-k-245-krylov-bogoliubov-1932-kolebaniia-sinkhronnykh-mashin',
    authors: 'Крылов Н.М., Боголюбов Н.Н.',
    title: 'О колебаниях синхронных машин. 2. Об устойчивости параллельной работы n синхронных машин',
    year: 1932,
    publisher: 'Харків; Київ: Енерговидав',
    pages: '98 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['theoretical-mechanics', 'dynamics-waves', 'stability-control', 'monograph']
  },
  {
    id: 'library-k-246-krylov-bogoliubov-1932-prodolnaia-ustoichivost-aeroplana',
    authors: 'Крылов Н.М., Боголюбов Н.Н.',
    title: 'Исследование продольной устойчивости аэроплана',
    year: 1932,
    publisher: 'М.–Л.: Госавиаавтотрактиздат',
    pages: '60 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['stability-control', 'theoretical-mechanics', 'monograph']
  },
  {
    id: 'library-k-247-krylov-bogoliubov-1933-novye-metody-dlia-tekhnicheskikh-problem',
    authors: 'Крылов Н.М., Боголюбов Н.Н.',
    title: 'Новые методы для решения некоторых математических проблем, встречаемых в технике',
    year: 1933,
    publisher: 'Харьков; Киев: Будвидав',
    pages: '96 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['theoretical-mechanics', 'numerical-methods', 'monograph']
  },
  {
    id: 'library-k-248-krylov-bogoliubov-1934-novye-metody-nelineinoi-mekhaniki-generatorov',
    authors: 'Крылов Н.М., Боголюбов Н.Н.',
    title: 'Новые методы нелинейной механики в их применении к изучению работы электронных генераторов. Ч. 1',
    year: 1934,
    publisher: 'М.–Л.: ГТТИ',
    pages: '243 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['theoretical-mechanics', 'dynamics-waves', 'monograph']
  },
  {
    id: 'library-k-249-krylov-bogoliubov-1934-osnovni-problemy-neliniinoi-mekhaniky',
    authors: 'Крилов М.М., Боголюбов М.М.',
    title: 'Основні проблеми нелінійної механіки: теорія і застосування в різних технічних і фізичних науках',
    year: 1934,
    publisher: 'Київ: Вид-во ВУАН',
    pages: '24 с.',
    language: 'uk',
    type: 'monograph',
    tags: ['theoretical-mechanics', 'dynamics-waves', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-k-250-krylov-bogoliubov-1934-formalni-rozklady-neliniinoi-mekhaniky',
    authors: 'Крилов Н.М., Боголюбов Н.Н.',
    title: 'Про деякі формальні розклади нелінійної механіки',
    year: 1934,
    publisher: 'Київ: Вид-во ВУАН',
    pages: '92 с.',
    language: 'uk',
    type: 'monograph',
    tags: ['theoretical-mechanics', 'dynamics-waves', 'monograph'],
    note: 'Ін-т буд. мех. ВУАН. Кафедра мат. фізики; № 5.',
    inLibraryOfCongress: true
  },
  {
    id: 'library-k-251-krylov-bogoliubov-1934-statsionarnye-kolebaniia',
    authors: 'Крылов Н.М., Боголюбов Н.Н.',
    title: 'Приложение методов нелинейной механики к теории стационарных колебаний',
    year: 1934,
    publisher: 'Київ: Вид-во ВУАН',
    pages: '112 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['theoretical-mechanics', 'dynamics-waves', 'monograph'],
    note: 'Ін-т буд. мех. ВУАН. Кафедра мат. фізики; № 8.',
    inLibraryOfCongress: true
  },
  {
    id: 'library-k-252-kryloff-bogoliuboff-1934-methodes-non-lineaires-perturbations',
    authors: 'Kryloff N., Bogoliuboff N.',
    title: 'L’application des méthodes de la mécanique non linéaire à la théorie des perturbations des systèmes canoniques',
    year: 1934,
    publisher: 'Kiev: Publ. Acad. Sci. Ukr.',
    pages: '57 p.',
    language: 'other',
    type: 'monograph',
    tags: ['theoretical-mechanics', 'dynamics-waves', 'monograph']
  },
  {
    id: 'library-k-253-kryloff-bogoliuboff-1935-methodes-approchees-mecanique-non-lineaire',
    authors: 'Kryloff N., Bogoliuboff N.',
    title: 'Méthodes approchées de la mécanique non linéaire dans leur application à l’étude de la perturbation des mouvements périodiques et de divers phénomènes de résonance',
    year: 1935,
    publisher: 'K.: Publ. Acad. Sci. Ukraine',
    pages: '113 p.',
    language: 'other',
    type: 'monograph',
    tags: ['theoretical-mechanics', 'dynamics-waves', 'monograph']
  },
  {
    id: 'library-k-254-kubenko-1979-nestatsionarnoe-vzaimodeistvie-elementov-konstruktsii-so-sredoi',
    authors: 'Кубенко В.Д.',
    title: 'Нестационарное взаимодействие элементов конструкции со средой',
    year: 1979,
    publisher: 'К.: Наук. думка',
    pages: '184 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['dynamics-waves', 'fluid-gas-mechanics', 'solid-mechanics', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-k-255-kubenko-1981-pronikanie-uprugikh-obolochek-v-szhimaemuiu-zhidkost',
    authors: 'Кубенко В.Д.',
    title: 'Проникание упругих оболочек в сжимаемую жидкость',
    year: 1981,
    publisher: 'К.: Наук. думка',
    pages: '160 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['shells-plates', 'fluid-gas-mechanics', 'dynamics-waves', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-k-256-kubenko-kovalchuk-et-al-1992-nelineinaia-dinamika-osesimmetrichnykh-tel',
    authors: 'Кубенко В.Д., Ковальчук П.С., Бояршина Л.Г., Краснопольская Т.С., Подчасов Н.П., Пучка Г.Н., Холопова В.В., Швец А.Ю.',
    title: 'Нелинейная динамика осесимметричных тел, несущих жидкость',
    year: 1992,
    publisher: 'К.: Наук. думка',
    pages: '184 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['dynamics-waves', 'fluid-gas-mechanics', 'solid-mechanics', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-k-257-kubenko-kovalchuk-krasnopolskaya-1984-izgibnye-kolebaniia-tsilindricheskikh-obolochek',
    authors: 'Кубенко В.Д., Ковальчук П.С., Краснопольская Т.С.',
    title: 'Нелинейное взаимодействие форм изгибных колебаний цилиндрических оболочек',
    year: 1984,
    publisher: 'К.: Наук. думка',
    pages: '220 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['shells-plates', 'dynamics-waves', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-k-258-kubenko-kuzma-puchka-1989-dinamika-sfericheskikh-tel-v-zhidkosti',
    authors: 'Кубенко В.Д., Кузьма В.М., Пучка Г.Н.',
    title: 'Динамика сферических тел в жидкости при вибрации',
    year: 1989,
    publisher: 'К.: Наук. думка',
    pages: '156 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['dynamics-waves', 'fluid-gas-mechanics', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-k-259-kubenko-lakiza-pavlovskii-pelykh-1988-dinamika-uprugo-gazozhidkostnykh-sistem',
    authors: 'Кубенко В.Д., Лакиза В.Д., Павловский В.С., Пелых Н.А.',
    title: 'Динамика упруго-газожидкостных систем при вибрационном воздействии',
    year: 1988,
    publisher: 'К.: Наук. думка',
    pages: '256 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['dynamics-waves', 'fluid-gas-mechanics', 'solid-mechanics', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-k-260-kulik-1985-sintez-pretsizionnykh-mekhanizmov',
    authors: 'Кулик В.К.',
    title: 'Синтез прецизионных механизмов для воспроизведения фасонных поверхностей',
    year: 1985,
    publisher: 'К.: Наук. думка',
    pages: '120 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['theoretical-mechanics', 'numerical-methods', 'monograph'],
    inLibraryOfCongress: true
  },
  {
    id: 'library-k-261-kulik-petrakov-iotov-1987-progressivnye-protsessy-obrabotki-fasonnykh-poverkhnostei',
    authors: 'Кулик В.К., Петраков Ю.В., Иотов В.В.',
    title: 'Прогрессивные процессы обработки фасонных поверхностей',
    year: 1987,
    publisher: 'К.: Наук. думка',
    pages: '176 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['materials-mechanics', 'experimental-mechanics', 'monograph'],
    inLibraryOfCongress: true
  }
] as const satisfies readonly BibliographyEntry[];
