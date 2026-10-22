// Reviewed descriptive summaries of the 2026 historical election web pages.
// This is NOT a transcription of official documents or present-day legal guidance.
// Original legacy URLs and observation dates are tracked in legacy-routes.json.
export interface ElectionHistoryRecord {
  slug: string;
  group: 'regulations' | 'documents' | 'candidates' | 'voting' | 'results';
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  paragraphs: string[];
  paragraphsEn: string[];
  documents: string[];
  reviewState: 'historical-summary' | 'source-gap' | 'publication-review';
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
,
  {
    slug: 'candidates',
    group: 'candidates',
    title: 'Кандидати на посаду директора',
    titleEn: 'Candidates for Institute director',
    summary: 'Архів матеріалів про висунення кандидатури на виборах директора Інституту 2026 року.',
    summaryEn: 'Archive of the 2026 nomination materials for the Institute director election.',
    paragraphs: [
      'Історична сторінка повідомляла про висунення кандидатури академіка НАН України Володимира Михайловича Назаренка на посаду директора Інституту механіки ім. С. П. Тимошенка НАН України.',
      'Засідання Вченої ради, на якому розглядалося висунення, відбулося 28 квітня 2026 року. Збереглися матеріали доповіді до цього засідання у форматі PDF.',
      'Передвиборча програма кандидата була окремо оприлюднена на історичному сайті. У цьому архіві вона описана як позиція кандидата, а не як затверджена програма Інституту.'
    ],
    paragraphsEn: [
      'The historical election site records the nomination of NAS of Ukraine Academician Volodymyr Mykhailovych Nazarenko for the post of director of the S.P. Timoshenko Institute of Mechanics.',
      'The Scientific Council meeting considering the nomination took place on 28 April 2026. The presentation slides for that meeting are preserved as an original PDF.',
      'The candidate’s election programme was published separately on the legacy site. It is identified here as the candidate’s own proposals, not an Institute-approved policy document.'
    ],
    documents: ['candidate-nomination-slides'],
    reviewState: 'historical-summary'
  },
  {
    slug: 'candidates/programme',
    group: 'candidates',
    title: 'Передвиборча програма В. М. Назаренка',
    titleEn: 'Election programme of V. M. Nazarenko',
    summary: 'Передвиборча програма кандидата, оприлюднена на історичному сайті виборів.',
    summaryEn: 'The candidate’s election programme as published on the historical election website.',
    paragraphs: [
      'На історичному сайті оприлюднено передвиборчу програму кандидата на посаду директора академіка НАН України Володимира Михайловича Назаренка. Її положення відображають особисті пропозиції кандидата станом на виборчу кампанію 2026 року.',
      'Серед пріоритетів програми — підвищення результатів атестації, залучення міжнародних грантів, оновлення кадрового складу, розвиток аспірантури, видавничої діяльності та міжнародних наукових журналів, ремонт і утримання інфраструктури, відновлення експериментальних досліджень та робота у сфері оборони й безпеки.',
      'Програма посилається на окремо затверджену Стратегію розвитку Інституту на 2026–2030 роки. Збережений оригінальний PDF цієї стратегії доступний нижче.',
      'Повний первісно оприлюднений текст передвиборчої програми доступний за посиланням на історичну сторінку. Додатковий PDF-файл програми з робочого Google Drive ще проходить окреме рішення щодо оприлюднення і не додається тут як новий публічний документ.'
    ],
    paragraphsEn: [
      'The historical website published the election programme of NAS of Ukraine Academician Volodymyr Mykhailovych Nazarenko, a candidate for Institute director. Its proposals reflect the candidate’s position during the 2026 campaign.',
      'Themes include research evaluation, international grants, recruitment and renewal of research staff, postgraduate training, academic publishing and journals, infrastructure maintenance, experimental research, and defence- and security-related work.',
      'The programme refers to the Institute’s separately approved Development Strategy for 2026–2030. The preserved original strategy PDF is linked below.',
      'The complete originally published programme remains accessible through the historical source-page link. A further programme PDF found in the working Google Drive folder is undergoing a separate publication decision and is not introduced as a new public file here.'
    ],
    documents: ['development-strategy-2026-2030'],
    reviewState: 'historical-summary',
    note: 'Авторський текст програми не слід змішувати з офіційним рішенням Вченої ради чи з результатами голосування.',
    noteEn: 'The candidate-authored programme must not be confused with a Scientific Council decision or the vote results.'
  },
  {
    slug: 'voting',
    group: 'voting',
    title: 'Організація голосування та виборці',
    titleEn: 'Voting arrangements and electorate',
    summary: 'Історичні повідомлення щодо голосування, списку виборців, делегатів та спостерігачів.',
    summaryEn: 'Historical notices on voting, the electorate, delegates and observers.',
    paragraphs: [
      'Вибори директора відбулися 16 червня 2026 року. Організаційні повідомлення і списки виборців на старому сайті описували порядок участі в голосуванні.',
      'За збереженим протоколом виборчої комісії на дату виборів до складу штатних наукових працівників належали 92 особи, а для голосування зареєструвалися 79 учасників.',
      'Історичні повідомлення розходяться щодо місця проведення виборів і окремих формулювань права участі. Їх наведено як різні історичні джерела, а не виправлено припущенням.'
    ],
    paragraphsEn: [
      'The director election took place on 16 June 2026. The old site published election arrangements and an electorate roll explaining how participation was organized.',
      'The preserved election commission protocol records 92 staff researchers on the day of the election and 79 participants registered for voting.',
      'Historical notices differ on the voting venue and certain voter-eligibility descriptions. These are treated as distinct historical sources rather than silently reconciled.'
    ],
    documents: ['election-commission-protocol', 'observer-application'],
    reviewState: 'historical-summary'
  },
  {
    slug: 'voting/notice',
    group: 'voting',
    title: 'Офіційне оголошення про дату, час та місце голосування',
    titleEn: 'Official notice of voting date, time and venue',
    summary: 'Архівний запис про проведення голосування 16 червня 2026 року та розбіжність щодо місця проведення.',
    summaryEn: 'Historical voting notice for 16 June 2026, including the unresolved venue discrepancy.',
    paragraphs: [
      'Історичний виборчий сайт повідомляв про голосування 16 червня 2026 року і називав місцем проведення велику конференц-залу на третьому поверсі.',
      'Інше історичне оголошення на старому основному сайті Інституту зазначало аудиторію 211. Обидва формулювання збережено як свідчення різних джерел; місце проведення в цьому архіві не оголошується остаточно підтвердженим.',
      'Дата належить до завершених виборів 2026 року. Ця сторінка не є актуальним запрошенням на голосування.'
    ],
    paragraphsEn: [
      'The dedicated election website gave 16 June 2026 as the voting date and described the location as the large conference hall on the third floor.',
      'A different historical announcement on the old primary Institute website identified room 211. Both descriptions are retained as source-specific evidence; the venue is not presented here as finally verified.',
      'This record refers to the concluded 2026 election and is not a current voting notice.'
    ],
    documents: [],
    reviewState: 'historical-summary',
    note: 'Розбіжність «велика конференц-зала / аудиторія 211» потребує перевірки відповідальним працівником Інституту.',
    noteEn: 'The “large conference hall / room 211” discrepancy requires confirmation by the responsible Institute records officer.'
  },
  {
    slug: 'voting/delegates',
    group: 'voting',
    title: 'Порядок обрання делегатів',
    titleEn: 'Election of delegates',
    summary: 'Історична рубрика без змістовного тексту про порядок обрання делегатів.',
    summaryEn: 'An empty historical page on the process for electing delegates.',
    paragraphs: [
      'На сайті виборів існувала сторінка з назвою «Порядок обрання делегатів», однак під час аудиту вона не містила основного тексту.',
      'У перевіреному наборі документів немає автентифікованого окремого порядку обрання делегатів. Тому не реконструюємо процедуру та не подаємо вигаданих рішень чи списків.'
    ],
    paragraphsEn: [
      'The historical election site contained a page titled “Election of delegates”, but the audited page had no substantive body text.',
      'The verified document set does not contain an authenticated separate delegate-election procedure. We therefore do not reconstruct the process or invent decisions or delegate lists.'
    ],
    documents: [],
    reviewState: 'source-gap',
    note: 'Оригінальний матеріал відсутній у перевіреній публікації; можливі внутрішні документи потребують окремої архівної перевірки.',
    noteEn: 'The audited public page lacked source material; any internal records require a separate archival check.'
  },
  {
    slug: 'voting/voters',
    group: 'voting',
    title: 'Загальний список виборців (архів 2026 року)',
    titleEn: 'Historical voter roll (2026)',
    summary: 'Історична виборча відомість зі 92 записами; повторне оприлюднення поіменного списку потребує окремого підтвердження.',
    summaryEn: 'Historical electorate roll with 92 entries; republication of the name-by-name list requires separate review.',
    paragraphs: [
      'На історичному сайті виборів було оприлюднено загальний список із 92 записами. Це список станом на виборчу кампанію 2026 року, а не актуальний перелік працівників Інституту.',
      'Кількість 92 також наведена в збереженому протоколі виборчої комісії від 16 червня 2026 року. Історичні джерела містять різні формулювання щодо участі працівників за сумісництвом; їхню відповідність не встановлено автоматично.',
      'Поіменний перелік не дублюється на новій сторінці до підтвердження відповідальним зберігачем документів можливості подальшого оприлюднення, точності порядку записів і належності даних до дати виборів. Історичне посилання зберігається окремо.'
    ],
    paragraphsEn: [
      'The historical election website published a roll comprising 92 entries. It is an electorate list from the 2026 campaign, not the Institute’s current staff directory.',
      'The figure of 92 is also recorded by the preserved election commission protocol of 16 June 2026. The historical materials differ on the participation of part-time employees, and those differences have not been resolved by inference.',
      'The name-by-name roll is not copied to this new page until the responsible records owner confirms continued publication, source ordering and the historical as-of context. A link to the original historical page remains distinct.'
    ],
    documents: ['election-commission-protocol'],
    reviewState: 'publication-review',
    note: 'Поіменний склад виборців залишається предметом редакційної перевірки; нові персональні дані не додаються.',
    noteEn: 'The named voter roll remains subject to records-owner review; no new personal details are added.'
  },
  {
    slug: 'voting/observers',
    group: 'voting',
    title: 'Правила акредитації спостерігачів',
    titleEn: 'Observer accreditation rules',
    summary: 'Архівний опис участі спостерігачів і збережений шаблон заяви у форматі DOCX.',
    summaryEn: 'Historical overview of observer accreditation and the preserved DOCX application template.',
    paragraphs: [
      'Історичний виборчий сайт містив повідомлення про акредитацію спостерігачів на виборах директора. Збережено початковий редагований файл заяви спостерігача у форматі DOCX.',
      'Файл подано як зразок із завершеної виборчої кампанії 2026 року. Він не є чинною формою для нових конкурсів, а порядок акредитації не реконструюється поза межами перевірених джерел.'
    ],
    paragraphsEn: [
      'The historical election website described observer accreditation for the director election. Its original editable observer application form has been preserved as a DOCX.',
      'The file is presented as a historical 2026 form, not as a currently valid application. No unverified accreditation rules have been added.'
    ],
    documents: ['observer-application'],
    reviewState: 'historical-summary'
  },
  {
    slug: 'results',
    group: 'results',
    title: 'Результати виборів директора 2026 року',
    titleEn: '2026 director-election results',
    summary: 'Документально підтверджені підсумки голосування та подальше направлення матеріалів до НАН України.',
    summaryEn: 'Documented voting figures and the subsequent transmission of election records to the NAS of Ukraine.',
    paragraphs: [
      '16 червня 2026 року відбулися збори колективу наукових працівників, на яких проведено голосування щодо кандидата на посаду директора. Збережені протоколи фіксують 92 особи в історичному складі наукових працівників, 79 зареєстрованих учасників і 79 голосів за В. М. Назаренка.',
      'У текстовому підсумку виборчого сайту голоси «проти» й недійсні бюлетені записано як нуль; у частині сканованої таблиці використано прочерки. Оригінальне оформлення не змінюємо, а підсумок зазначає джерело.',
      'Історичне повідомлення фіксує направлення документів до НАН України листом від 18 червня 2026 року № 50-02-07-173. Документального підтвердження окремого подальшого призначення Президією НАН України серед перевірених матеріалів не знайдено.'
    ],
    paragraphsEn: [
      'A meeting of Institute research staff on 16 June 2026 held the director-election vote. The preserved protocols report 92 research staff on the historical roll, 79 registered participants and 79 votes in favour of V. M. Nazarenko.',
      'The election website’s summary reports zero votes against and zero invalid ballots, while parts of the scanned original table use dashes. The original notation is preserved and the summary remains source-attributed.',
      'A historical notice records the forwarding of materials to the NAS of Ukraine under a letter dated 18 June 2026, No. 50-02-07-173. No separate subsequent appointment resolution has been verified among the inspected records.'
    ],
    documents: ['staff-meeting-protocol','staff-meeting-protocol-legacy-main','election-commission-protocol'],
    reviewState: 'historical-summary'
  },
  {
    slug: 'results/commission-protocol',
    group: 'results',
    title: 'Протокол виборчої комісії від 16 червня 2026 року',
    titleEn: 'Election commission protocol of 16 June 2026',
    summary: 'Збережений підписаний протокол та зафіксована статистика таємного голосування.',
    summaryEn: 'Preserved signed commission protocol and the recorded secret-ballot figures.',
    paragraphs: [
      'Збережений протокол виборчої комісії датований 16 червня 2026 року. Згідно з опублікованим підсумком, зі складу 92 наукових працівників зареєструвалися 79 осіб; видано й виявлено в урні 79 бюлетенів.',
      'За кандидатуру академіка НАН України В. М. Назаренка віддано 79 голосів. Історичний вебпідсумок зазначає нуль голосів проти та нуль недійсних бюлетенів; у сканованій таблиці окремі значення позначено прочерками.',
      'Рішення виборчої комісії щодо результатів виборів зафіксовано у протоколі. Це не замінює окремого акта Президії НАН України про подальше призначення.'
    ],
    paragraphsEn: [
      'The preserved election commission protocol is dated 16 June 2026. Its published summary records 92 research staff, 79 registered participants, and 79 ballots issued and recovered from the ballot box.',
      'Seventy-nine votes were cast for NAS of Ukraine Academician V. M. Nazarenko. The legacy web summary gives zero votes against and zero invalid ballots; the scanned table uses dashes in some corresponding fields.',
      'The commission’s decision is recorded in the signed original. It does not substitute for a separate subsequent appointment act of the NAS of Ukraine Presidium.'
    ],
    documents: ['election-commission-protocol'],
    reviewState: 'historical-summary'
  },
  {
    slug: 'results/staff-meeting',
    group: 'results',
    title: 'Рішення зборів наукових працівників',
    titleEn: 'Decision of the research staff meeting',
    summary: 'Матеріали зборів 16 червня 2026 року; збережено два окремі скановані варіанти протоколу.',
    summaryEn: 'Records of the 16 June 2026 staff meeting; two distinct scanned protocol variants are preserved.',
    paragraphs: [
      'Історична вебсторінка з заголовком «Офіційне рішення Організаційного комітету» містила відомості про рішення зборів наукових працівників. У новому архіві ці різні назви не ототожнюються автоматично.',
      'Протокол зборів наукових працівників від 16 червня 2026 року зберігся у двох варіантах PDF: з виборчого сайту і зі старого основного сайту Інституту. Їхні розміри та SHA-256 відрізняються; обидва варіанти подано без редагування чи безпідставного вилучення.',
      'У протоколах містяться дані про проведення голосування. Текст цієї сторінки є історичним оглядом і не становить нового рішення організаційного комітету.'
    ],
    paragraphsEn: [
      'The historical page titled “Official decision of the Organizing Committee” discussed the decision of the staff meeting. The new archive does not silently treat these differently titled acts as interchangeable.',
      'The staff meeting protocol of 16 June 2026 survives in two PDF variants, one from the election website and one from the Institute’s former primary website. Their sizes and SHA-256 hashes differ; both originals are presented unmodified.',
      'The protocols document the election meeting. This summary does not create or attribute a new decision to the organizing committee.'
    ],
    documents: ['staff-meeting-protocol','staff-meeting-protocol-legacy-main'],
    reviewState: 'historical-summary'
  },
  {
    slug: 'results/document-submission',
    group: 'results',
    title: 'Повідомлення про направлення документів до НАН України',
    titleEn: 'Notice of forwarding documents to the NAS of Ukraine',
    summary: 'Повідомлення про подання виборчих матеріалів листом від 18 червня 2026 року.',
    summaryEn: 'Notice concerning the transmission of election materials by letter dated 18 June 2026.',
    paragraphs: [
      'Історична сторінка виборів повідомляла про направлення матеріалів до Національної академії наук України за листом від 18 червня 2026 року № 50-02-07-173.',
      'Текст повідомлення є свідченням етапу подання документів після голосування. Скан листа не входить до перевіреного набору дев’яти оригіналів. Без окремого підтвердження не зазначаємо дату призначення директора Президією НАН України.',
      'Посилання на історичну сторінку збережено як джерело повідомлення; не створюємо замінника відсутнього листа.'
    ],
    paragraphsEn: [
      'The historical election page reports that documents were forwarded to the National Academy of Sciences of Ukraine under letter No. 50-02-07-173 dated 18 June 2026.',
      'This notice documents a post-vote submission stage. A scanned copy of the letter is not among the nine verified originals. No appointment date by the NAS of Ukraine Presidium is asserted without separate evidence.',
      'A reference to the historical webpage is retained as the source; no substitute letter has been fabricated.'
    ],
    documents: [],
    reviewState: 'historical-summary',
    note: 'Оригінал листа № 50-02-07-173 окремо не перевірено.',
    noteEn: 'The original of letter No. 50-02-07-173 has not been independently verified.'
  }

];
