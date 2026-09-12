export type NcutamSectionId =
  | 'about'
  | 'governance'
  | 'members'
  | 'activity'
  | 'documents'
  | 'iutam'
  | 'news';

export const ncutamSite = {
  acronym: 'НКУТПМ',
  acronymEn: 'NCUTAM',
  name: 'Національний комітет України з теоретичної і прикладної механіки',
  nameEn: 'National Committee of Ukraine for Theoretical and Applied Mechanics',
  shortDescription:
    'Національний координаційний осередок української спільноти з теоретичної і прикладної механіки та представник України в IUTAM.',
  shortDescriptionEn:
    'The national coordinating body of the Ukrainian theoretical and applied mechanics community and Ukraine’s representative in IUTAM.'
} as const;

export const ncutamSections: Array<{
  id: NcutamSectionId;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
}> = [
  {
    id: 'about',
    title: 'Про Комітет',
    titleEn: 'About',
    description: 'Статус, мандат, історія, базова організація та сталі напрями діяльності Комітету.',
    descriptionEn: 'Status, mandate, history, base organization and the Committee’s enduring areas of activity.'
  },
  {
    id: 'governance',
    title: 'Керівництво і Президія',
    titleEn: 'Governance',
    description: 'Поточне керівництво, склад Президії та розподіл повноважень.',
    descriptionEn: 'Current leadership, Presidium membership and the distribution of responsibilities.'
  },
  {
    id: 'members',
    title: 'Члени',
    titleEn: 'Members',
    description: 'Структурований склад Комітету та архів пам’яті членів Комітету.',
    descriptionEn: 'Structured Committee membership and the in-memoriam archive.'
  },
  {
    id: 'activity',
    title: 'Діяльність',
    titleEn: 'Activities',
    description: 'Загальні збори, конференції, експертні ініціативи та міжнародна діяльність.',
    descriptionEn: 'General Meetings, conferences, expert initiatives and international activity.'
  },
  {
    id: 'documents',
    title: 'Документи',
    titleEn: 'Documents',
    description: 'Установчі та нормативні документи, рішення, матеріали засідань і щорічні звіти.',
    descriptionEn: 'Foundation and governing documents, decisions, meeting materials and annual reports.'
  },
  {
    id: 'iutam',
    title: 'IUTAM',
    titleEn: 'IUTAM',
    description: 'Представництво України та сталі інституційні зв’язки з IUTAM.',
    descriptionEn: 'Ukraine’s representation and the Committee’s enduring institutional relationship with IUTAM.'
  },
  {
    id: 'news',
    title: 'Новини',
    titleEn: 'News',
    description: 'Новини Комітету з єдиної новинної колекції сайту Інституту.',
    descriptionEn: 'Committee news from the Institute website’s shared news collection.'
  }
];
