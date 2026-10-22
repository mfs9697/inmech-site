// Reviewed descriptive summaries of the 2026 historical election web pages.
// This is NOT a transcription of official documents or present-day legal guidance.
// Original legacy URLs and observation dates are tracked in legacy-routes.json.
export interface ElectionHistoryRecord {
  slug: string;
  group: 'regulations' | 'documents';
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  paragraphs: string[];
  paragraphsEn: string[];
  documents: string[];
  reviewState: 'historical-summary' | 'source-gap';
  note?: string;
  noteEn?: string;
}

export const electionHistoryPages: ElectionHistoryRecord[] = [
  {
    slug: 'regulations',
    group: 'regulations',
    title: 'Нормативна база та офіційні оголошення',
    titleEn: 'Regulations and official announcements',
    summary: 'Історичні нормативні посилання та повідомлення, які супроводжували вибори директора Інституту в 2026 році.',
    summaryEn: 'Historical legal references and announcements associated with the Institute director election in 2026.',
    paragraphs: [
      'Цей розділ систематизує матеріали, оприлюднені на окремому сайті виборів директора. Посилання на нормативні акти наведено у контексті процедури 2026 року.',
      'Пояснення на історичному вебсайті не є автентичними текстами законів. Для перевірки чинних вимог слід звертатися до офіційних джерел та відповідної редакції нормативного акта.'
    ],
    paragraphsEn: [
      'This section organizes materials published on the separate historical director-election website. The legal references concern the 2026 procedure.',
      'Historical website explanations are not authenticated legal texts. For currently applicable requirements, consult official sources and the relevant version of each instrument.'
    ],
    documents: [],
    reviewState: 'historical-summary'
  },
  {
    slug: 'regulations/announcement',
    group: 'regulations',
    title: 'Оголошення Президії НАН України про проведення конкурсу',
    titleEn: 'NAS of Ukraine Presidium competition announcement',
    summary: 'Оголошення конкурсу на заміщення посади директора, на яке посилалися матеріали виборів 2026 року.',
    summaryEn: 'The director-position competition announcement referenced by the 2026 election materials.',
    paragraphs: [
      'За матеріалами виборчого сайту та доповіді для Вченої ради конкурс було оголошено 9 квітня 2026 року. В історичних матеріалах зазначений строк подання документів — до 18:00 9 червня 2026 року.',
      'Оголошення належить до завершеної процедури 2026 року. Ці дати наведено для архівного ознайомлення, а не як чинний конкурс або запрошення подавати документи.'
    ],
    paragraphsEn: [
      'The election site and Scientific Council presentation refer to a competition announced on 9 April 2026. Historical materials give the application deadline as 18:00 on 9 June 2026.',
      'This notice relates to the concluded 2026 procedure. These dates are archival information and not an active call for applications.'
    ],
    documents: [],
    reviewState: 'historical-summary',
    note: 'Первісну вебсторінку зберігаємо як посилання на джерело; скан офіційного оголошення у перевіреному реєстрі документів відсутній.',
    noteEn: 'The original webpage remains referenced as the historical source; no authenticated scan of the announcement is registered among the preserved originals.'
  },
  {
    slug: 'regulations/nas-statute',
    group: 'regulations',
    title: 'Вибори керівника у Статуті НАН України',
    titleEn: 'Director elections and the NAS of Ukraine Statute',
    summary: 'Огляд положень Статуту НАН України, наведений на історичному виборчому сайті.',
    summaryEn: 'Overview of NAS of Ukraine Statute provisions as presented on the historical election website.',
    paragraphs: [
      'Історична сторінка пояснювала таємне голосування колективу наукових працівників і подальший розгляд питання про призначення директора Президією НАН України.',
      'Питання складу виборців та окремі формулювання умов голосування в історичних матеріалах мають розбіжності. Не усуваємо їх припущеннями та не подаємо переказ сайту як завірений витяг зі Статуту.'
    ],
    paragraphsEn: [
      'The historical page described a secret ballot by the research staff and a separate subsequent appointment consideration by the NAS of Ukraine Presidium.',
      'The historical materials differ on voter eligibility and some voting formulations. These differences are not reconciled by inference, and the website summary is not presented as a certified extract from the Statute.'
    ],
    documents: [],
    reviewState: 'historical-summary'
  },
  {
    slug: 'regulations/resolution-998',
    group: 'regulations',
    title: 'Постанова Кабінету Міністрів України № 998',
    titleEn: 'Cabinet of Ministers Resolution No. 998',
    summary: 'Історичний опис методичних рекомендацій щодо обрання керівника державної наукової установи.',
    summaryEn: 'Historical discussion of methodological guidance for electing the head of a state research institution.',
    paragraphs: [
      'У матеріалах 2026 року наведено посилання на постанову Кабінету Міністрів України від 14 грудня 2016 року № 998. На старому сайті викладено організаційні етапи роботи комісій, підготовки виборців, проведення голосування та оформлення результатів.',
      'Ця сторінка зберігає бібліографічний та історичний контекст, а не відтворює повний нормативний текст чи тлумачить актуальну редакцію постанови.'
    ],
    paragraphsEn: [
      'The 2026 materials refer to Cabinet of Ministers Resolution No. 998 of 14 December 2016. The legacy site discussed the work of election bodies, preparation of voter lists, voting and recording of results.',
      'This page preserves a bibliographic and historical reference. It does not reproduce the legal instrument or interpret its current amended text.'
    ],
    documents: [],
    reviewState: 'historical-summary'
  },
  {
    slug: 'regulations/language-requirements',
    group: 'regulations',
    title: 'Підтвердження володіння державною мовою',
    titleEn: 'Proof of Ukrainian-language proficiency',
    summary: 'Архівне посилання на роз’яснення для претендентів на посаду директора.',
    summaryEn: 'Archived reference to guidance for director-position applicants concerning Ukrainian-language proficiency.',
    paragraphs: [
      'У меню історичного виборчого сайту було окреме роз’яснення щодо підтвердження володіння державною мовою претендентами.',
      'Оскільки повного автентифікованого тексту роз’яснення в архіві документів немає, тут не наводимо неперевірений перелік довідок або сертифікатів та не стверджуємо, які вимоги діють зараз.'
    ],
    paragraphsEn: [
      'The historical election website included a dedicated explanation of language-proficiency evidence required of applicants.',
      'No authenticated copy of the complete explanation is in the verified document archive. Accordingly, this page does not invent a list of accepted certificates or claim that any historical requirements remain current.'
    ],
    documents: [],
    reviewState: 'historical-summary',
    note: 'Детальний текст сторінки потребує подальшої архівної звірки.',
    noteEn: 'The detailed text of the historical page remains subject to source reconciliation.'
  },
  {
    slug: 'documents',
    group: 'documents',
    title: 'Документи Інституту та робочі органи виборів',
    titleEn: 'Institute documents and election bodies',
    summary: 'Наказ, затверджені положення та відомості про організаційні органи виборів директора 2026 року.',
    summaryEn: 'The original order, approved regulations and records of the bodies organizing the 2026 election.',
    paragraphs: [
      'Основні підтверджені документи цього розділу збережено у форматі первісних PDF-файлів без перезапису чи редагування.',
      'Дата видання наказу № 124 — 15 квітня 2026 року; дата публікації відповідної новини на сайті Інституту — 16 квітня. Це різні події.'
    ],
    paragraphsEn: [
      'The key verified documents in this section are preserved as unaltered original PDF files.',
      'Order No. 124 was issued on 15 April 2026. The corresponding Institute website news item was published on 16 April; these dates describe different events.'
    ],
    documents: ['order-124','organizing-committee-regulations','election-commission-regulations'],
    reviewState: 'historical-summary'
  },
  {
    slug: 'documents/order-124',
    group: 'documents',
    title: 'Наказ № 124 від 15 квітня 2026 року',
    titleEn: 'Order No. 124 of 15 April 2026',
    summary: 'Наказ про забезпечення проведення виборів директора та затвердження складу робочих органів.',
    summaryEn: 'Order on preparations for the director election and the composition of the election bodies.',
    paragraphs: [
      'Наказом № 124 від 15 квітня 2026 року визначено організаційні заходи та персональний склад організаційного комітету й виборчої (лічильної) комісії.',
      'Нижче доступна незмінена сканована копія наказу з історичного джерела; її повторно не дублювали в архіві виборів.'
    ],
    paragraphsEn: [
      'Order No. 124, issued on 15 April 2026, established organizational measures and named members of the organizing committee and election (counting) commission.',
      'The original scanned order is linked below and reused without duplication or modification.'
    ],
    documents: ['order-124'],
    reviewState: 'historical-summary'
  },
  {
    slug: 'documents/organizing-committee',
    group: 'documents',
    title: 'Положення про організаційний комітет',
    titleEn: 'Regulations of the organizing committee',
    summary: 'Затверджене положення, яке регламентує підготовку та супровід виборів директора.',
    summaryEn: 'Approved regulations governing the preparation and administration of the director election.',
    paragraphs: [
      'Збережене Положення визначає завдання організаційного комітету. Історичний сайт називає серед них підготовку списків виборців, роботу зі спостерігачами та передання результатів до НАН України.',
      'На оригінальному документі зазначено розгляд і затвердження Вченою радою 28 квітня 2026 року (протокол № 5) та погодження профспілковим органом 26 травня 2026 року.',
      'Історичне посилання на витяг із протоколу Вченої ради № 5 не працює, а сам витяг поки не віднайдено. Відсутність цього файла не слід плутати з Положенням, яке доступне.'
    ],
    paragraphsEn: [
      'The preserved regulations set out the organizing committee’s functions. The historical site describes voter-list preparation, observer accreditation and transmission of election records to the Academy.',
      'The original identifies Scientific Council approval on 28 April 2026 (protocol No. 5) and trade-union agreement on 26 May 2026.',
      'The legacy link to an extract from Scientific Council protocol No. 5 is broken, and that extract has not been recovered. It is distinct from the available regulations.'
    ],
    documents: ['organizing-committee-regulations','committee-protocol-5-extract'],
    reviewState: 'historical-summary'
  },
  {
    slug: 'documents/election-commission',
    group: 'documents',
    title: 'Положення про виборчу (лічильну) комісію',
    titleEn: 'Regulations of the election (counting) commission',
    summary: 'Затверджені правила організації голосування і підрахунку голосів.',
    summaryEn: 'Approved rules for the administration of voting and the counting of votes.',
    paragraphs: [
      'Положення визначає порядок роботи виборчої (лічильної) комісії. Історичні матеріали пов’язують її діяльність із підготовкою бюлетенів, організацією таємного голосування, підрахунком голосів і оформленням протоколу.',
      'Згідно з даними на збереженому оригіналі, Положення затверджено Вченою радою 28 квітня 2026 року та погоджено профспілковим органом 26 травня 2026 року.'
    ],
    paragraphsEn: [
      'The regulations govern the election (counting) commission. Historical materials describe ballot preparation, secret voting, vote counting and the preparation of the results protocol.',
      'The preserved original records Scientific Council approval on 28 April 2026 and trade-union agreement on 26 May 2026.'
    ],
    documents: ['election-commission-regulations'],
    reviewState: 'historical-summary'
  },
  {
    slug: 'documents/committee-minutes',
    group: 'documents',
    title: 'Протоколи засідань організаційного комітету',
    titleEn: 'Organizing committee meeting minutes',
    summary: 'Історична рубрика без оприлюдненого тексту або перевіреного оригіналу протоколів.',
    summaryEn: 'Historical section with no published body text or verified original committee minutes.',
    paragraphs: [
      'На перевіреному історичному сайті існувала сторінка з цією назвою, але її основний вміст був порожнім.',
      'Оригінали протоколів засідань організаційного комітету поки не знайдено в перевіреному реєстрі. Не створюємо вигаданих протоколів, дат засідань, рішень чи файлів.',
      'Окремо від цих протоколів обліковується втрачений витяг із протоколу Вченої ради № 5 від 28 квітня 2026 року; це інший орган і інше джерело.'
    ],
    paragraphsEn: [
      'The historical website included a page with this title, but its main content was empty.',
      'No authentic organizing committee meeting minutes have been recovered in the verified archive. We do not fabricate minutes, meeting dates, decisions or downloads.',
      'A separately referenced extract from Scientific Council protocol No. 5 of 28 April 2026 is also missing; it concerns a different body and must not be substituted for organizing committee minutes.'
    ],
    documents: [],
    reviewState: 'source-gap',
    note: 'Джерело не встановлено. Якщо підписані оригінали будуть знайдені, їх слід додати окремим перевіреним оновленням.',
    noteEn: 'Original minutes are not verified. If authenticated copies are recovered, add them through a separately reviewed change.'
  }
];
