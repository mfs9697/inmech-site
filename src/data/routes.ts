import { allowedNewsTags, allowedNewsTagsEn, newsTagTranslations } from '../utils/newsTags';

export interface SiteRoute {
  uk: string;
  en: string;
  titleUk: string;
  titleEn: string;
  sectionUk: string;
  sectionEn: string;
  includeInHtmlSitemap?: boolean;
}

export const siteRoutes: SiteRoute[] = [
  { uk: '/', en: '/en/', titleUk: 'Головна сторінка', titleEn: 'Home page', sectionUk: 'Головна', sectionEn: 'Home' },
  { uk: '/news/', en: '/en/news/', titleUk: 'Новини', titleEn: 'News', sectionUk: 'Головна', sectionEn: 'Home' },
  { uk: '/#contacts', en: '/en/#contacts', titleUk: 'Контакти', titleEn: 'Contacts', sectionUk: 'Головна', sectionEn: 'Home' },

  { uk: '/history/', en: '/en/history/', titleUk: 'Історія і сучасність', titleEn: 'History and present', sectionUk: 'Про інститут', sectionEn: 'About the Institute' },
  { uk: '/founder/', en: '/en/founder/', titleUk: 'Засновник інституту', titleEn: 'Founder of the Institute', sectionUk: 'Про інститут', sectionEn: 'About the Institute' },
  { uk: '/regulations/', en: '/en/regulations/', titleUk: 'Статут', titleEn: 'Statute', sectionUk: 'Про інститут', sectionEn: 'About the Institute' },
  { uk: '/strategy/', en: '/en/strategy/', titleUk: 'Стратегія розвитку', titleEn: 'Development strategy', sectionUk: 'Про інститут', sectionEn: 'About the Institute' },
  { uk: '/scientific-cooperation/', en: '/en/scientific-cooperation/', titleUk: 'Наукова співпраця', titleEn: 'Scientific cooperation', sectionUk: 'Про інститут', sectionEn: 'About the Institute' },
  { uk: '/tender/', en: '/en/tender/', titleUk: 'Закупівлі та тендери', titleEn: 'Procurement and tenders', sectionUk: 'Про інститут', sectionEn: 'About the Institute' },

  { uk: '/management/', en: '/en/management/', titleUk: 'Дирекція', titleEn: 'Management', sectionUk: 'Структура', sectionEn: 'Structure' },
  { uk: '/departments/', en: '/en/departments/', titleUk: 'Наукові відділи', titleEn: 'Research departments', sectionUk: 'Структура', sectionEn: 'Structure' },
  { uk: '/scientific-council/', en: '/en/scientific-council/', titleUk: 'Вчена рада', titleEn: 'Scientific Council', sectionUk: 'Структура', sectionEn: 'Structure' },
  { uk: '/specialized-councils/', en: '/en/specialized-councils/', titleUk: 'Спеціалізовані ради', titleEn: 'Specialized Academic Councils', sectionUk: 'Структура', sectionEn: 'Structure' },
  { uk: '/young-scientists/', en: '/en/young-scientists/', titleUk: 'Рада молодих вчених', titleEn: 'Council of Young Scientists', sectionUk: 'Структура', sectionEn: 'Structure' },
  { uk: '/services/', en: '/en/services/', titleUk: 'Служби інституту', titleEn: 'Institute services', sectionUk: 'Структура', sectionEn: 'Structure' },

  { uk: '/education/', en: '/en/education/', titleUk: 'Огляд розділу', titleEn: 'Section overview', sectionUk: 'Освітньо-наукова діяльність', sectionEn: 'Education and research training' },
  { uk: '/postgraduate/', en: '/en/postgraduate/', titleUk: 'Аспірантура', titleEn: 'Postgraduate studies', sectionUk: 'Освітньо-наукова діяльність', sectionEn: 'Education and research training' },
  { uk: '/doctoral/', en: '/en/doctoral/', titleUk: 'Докторантура', titleEn: 'Doctoral studies', sectionUk: 'Освітньо-наукова діяльність', sectionEn: 'Education and research training' },
  { uk: '/dissertations/', en: '/en/dissertations/', titleUk: 'Захист дисертацій', titleEn: 'Dissertation defences', sectionUk: 'Освітньо-наукова діяльність', sectionEn: 'Education and research training' },
  { uk: '/defended-dissertations/', en: '/en/defended-dissertations/', titleUk: 'Каталог захищених дисертацій', titleEn: 'Catalogue of defended dissertations', sectionUk: 'Освітньо-наукова діяльність', sectionEn: 'Education and research training' },
  { uk: '/license-and-regulations/', en: '/en/license-and-regulations/', titleUk: 'Ліцензії та Положення', titleEn: 'Licences and regulations', sectionUk: 'Освітньо-наукова діяльність', sectionEn: 'Education and research training' },
  { uk: '/trust-box/', en: '/en/trust-box/', titleUk: 'Скринька довіри', titleEn: 'Trust box', sectionUk: 'Освітньо-наукова діяльність', sectionEn: 'Education and research training' },
  { uk: '/nmr/', en: '/en/nmr/', titleUk: 'Науково-методична рада', titleEn: 'Scientific and Methodological Council', sectionUk: 'Освітньо-наукова діяльність', sectionEn: 'Education and research training' },

  { uk: '/postgraduate/admission/', en: '/en/postgraduate/admission/', titleUk: 'Вступникам до аспірантури', titleEn: 'Admission to postgraduate studies', sectionUk: 'Аспірантура', sectionEn: 'Postgraduate studies' },
  { uk: '/postgraduate/program/', en: '/en/postgraduate/program/', titleUk: 'Освітньо-наукова програма', titleEn: 'Educational and scientific programme', sectionUk: 'Аспірантура', sectionEn: 'Postgraduate studies' },
  { uk: '/postgraduate/accreditation/', en: '/en/postgraduate/accreditation/', titleUk: 'Акредитація', titleEn: 'Accreditation', sectionUk: 'Аспірантура', sectionEn: 'Postgraduate studies' },
  { uk: '/postgraduate/schedule/', en: '/en/postgraduate/schedule/', titleUk: 'Розклад занять аспірантів', titleEn: 'Postgraduate class schedule', sectionUk: 'Аспірантура', sectionEn: 'Postgraduate studies' },
  { uk: '/postgraduate/students/', en: '/en/postgraduate/students/', titleUk: 'Аспіранти', titleEn: 'Postgraduate students', sectionUk: 'Аспірантура', sectionEn: 'Postgraduate studies' },
  { uk: '/postgraduate/supervisors/', en: '/en/postgraduate/supervisors/', titleUk: 'Викладачі і наукові керівники', titleEn: 'Teachers and research supervisors', sectionUk: 'Аспірантура', sectionEn: 'Postgraduate studies' },
  { uk: '/postgraduate/research-topics/', en: '/en/postgraduate/research-topics/', titleUk: 'Відповідність тем аспірантів науковій діяльності керівників', titleEn: 'Alignment of postgraduate topics with supervisors’ research activities', sectionUk: 'Аспірантура', sectionEn: 'Postgraduate studies' },

  { uk: '/library/', en: '/en/library/', titleUk: 'Бібліотека', titleEn: 'Library', sectionUk: 'Бібліотека', sectionEn: 'Library' },
  { uk: '/library/monographs/', en: '/en/library/monographs/', titleUk: 'Монографії співробітників Інституту', titleEn: 'Monographs by Institute researchers', sectionUk: 'Бібліотека', sectionEn: 'Library' },
  { uk: '/library/multivolume-editions/', en: '/en/library/multivolume-editions/', titleUk: 'Фундаментальні багатотомні видання', titleEn: 'Fundamental multivolume editions', sectionUk: 'Бібліотека', sectionEn: 'Library' },
  { uk: '/library/textbooks/', en: '/en/library/textbooks/', titleUk: 'Підручники та навчальні посібники', titleEn: 'Textbooks and teaching aids', sectionUk: 'Бібліотека', sectionEn: 'Library' },
  { uk: '/library/history-publications/', en: '/en/library/history-publications/', titleUk: 'Історичні видання про Інститут', titleEn: 'Historical publications about the Institute', sectionUk: 'Бібліотека', sectionEn: 'Library' },
  { uk: '/library/scientific-books/', en: '/en/library/scientific-books/', titleUk: 'Наукові монографії та довідкові видання', titleEn: 'Scientific monographs and reference editions', sectionUk: 'Бібліотека', sectionEn: 'Library' },

  { uk: '/sitemap/', en: '/en/sitemap/', titleUk: 'Карта сайту', titleEn: 'Sitemap', sectionUk: 'Службові сторінки', sectionEn: 'Service pages' },
  { uk: '/search/', en: '/en/search/', titleUk: 'Пошук', titleEn: 'Search', sectionUk: 'Службові сторінки', sectionEn: 'Service pages' },
  { uk: '/accessibility/', en: '/en/accessibility/', titleUk: 'Політика доступності', titleEn: 'Accessibility policy', sectionUk: 'Службові сторінки', sectionEn: 'Service pages' },
  { uk: '/site-administration/', en: '/en/site-administration/', titleUk: 'Адміністрація сайту', titleEn: 'Site administration', sectionUk: 'Службові сторінки', sectionEn: 'Service pages' }
];

export const ukrainianStaticPaths = new Set(siteRoutes.map((route) => route.uk));
export const englishStaticPaths = new Set(siteRoutes.map((route) => route.en));

export function normalizeSitePath(pathname: string, base = '') {
  let path = pathname || '/';

  if (base && path === base) {
    path = '/';
  } else if (base && path.startsWith(`${base}/`)) {
    path = path.slice(base.length);
  }

  path = path.replace(/\/index\.html$/, '/');

  const [pathOnly, hash = ''] = path.split('#');
  const withLeadingSlash = pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`;
  const normalizedPath = withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;

  return hash ? `${normalizedPath}#${hash}` : normalizedPath;
}

function decodePathSegment(segment: string) {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

function getNewsTag(path: string, prefix: '/news/tags/' | '/en/news/tags/') {
  if (!path.startsWith(prefix)) {
    return undefined;
  }

  const tag = path.slice(prefix.length, -1);
  return tag ? decodePathSegment(tag) : undefined;
}

function getEnglishNewsTagPath(path: string) {
  const ukrainianTag = getNewsTag(path, '/news/tags/');

  if (!ukrainianTag || !allowedNewsTags.includes(ukrainianTag as (typeof allowedNewsTags)[number])) {
    return undefined;
  }

  return `/en/news/tags/${encodeURIComponent(newsTagTranslations[ukrainianTag as (typeof allowedNewsTags)[number]])}/`;
}

function getUkrainianNewsTagPath(path: string) {
  const englishTag = getNewsTag(path, '/en/news/tags/');

  if (!englishTag) {
    return undefined;
  }

  const tagIndex = allowedNewsTagsEn.indexOf(englishTag);
  const ukrainianTag = allowedNewsTags[tagIndex];

  return ukrainianTag ? `/news/tags/${encodeURIComponent(ukrainianTag)}/` : undefined;
}

export function getEnglishPath(pathname: string, base = '') {
  const path = normalizeSitePath(pathname, base);
  const route = siteRoutes.find((item) => item.uk === path);

  if (route) {
    return route.en;
  }

  if (/^\/departments\/[^/]+\/$/.test(path) || /^\/people\/[^/]+\/$/.test(path)) {
    return `/en${path}`;
  }

  const englishNewsTagPath = getEnglishNewsTagPath(path);

  if (englishNewsTagPath) {
    return englishNewsTagPath;
  }

  if (/^\/news\/tags\/[^/]+\/$/.test(path)) {
    return '/en/news/';
  }

  if (/^\/news\/(?!tags\/).+\/$/.test(path) && path !== '/news/') {
    return `/en${path}`;
  }

  return '/en/';
}

export function getUkrainianPath(pathname: string, base = '') {
  const path = normalizeSitePath(pathname, base);
  const route = siteRoutes.find((item) => item.en === path);

  if (route) {
    return route.uk;
  }

  if (/^\/en\/departments\/[^/]+\/$/.test(path) || /^\/en\/people\/[^/]+\/$/.test(path)) {
    return path.replace(/^\/en/, '');
  }

  const ukrainianNewsTagPath = getUkrainianNewsTagPath(path);

  if (ukrainianNewsTagPath) {
    return ukrainianNewsTagPath;
  }

  if (/^\/en\/news\/tags\/[^/]+\/$/.test(path)) {
    return '/news/';
  }

  if (/^\/en\/news\/(?!tags\/).+\/$/.test(path) && path !== '/en/news/') {
    return path.replace(/^\/en/, '');
  }

  return '/';
}

export function hasEnglishAlternative(pathname: string, base = '') {
  const path = normalizeSitePath(pathname, base);
  return (
    ukrainianStaticPaths.has(path) ||
    /^\/departments\/[^/]+\/$/.test(path) ||
    /^\/people\/[^/]+\/$/.test(path) ||
    Boolean(getEnglishNewsTagPath(path)) ||
    (/^\/news\/(?!tags\/).+\/$/.test(path) && path !== '/news/')
  );
}

export function hasUkrainianAlternative(pathname: string, base = '') {
  const path = normalizeSitePath(pathname, base);
  return (
    englishStaticPaths.has(path) ||
    /^\/en\/departments\/[^/]+\/$/.test(path) ||
    /^\/en\/people\/[^/]+\/$/.test(path) ||
    Boolean(getUkrainianNewsTagPath(path)) ||
    (/^\/en\/news\/(?!tags\/).+\/$/.test(path) && path !== '/en/news/')
  );
}

export function groupRoutesBySection(language: 'uk' | 'en') {
  const sections = new Map<string, Array<[string, string]>>();

  for (const route of siteRoutes.filter((item) => item.includeInHtmlSitemap !== false)) {
    const section = language === 'uk' ? route.sectionUk : route.sectionEn;
    const title = language === 'uk' ? route.titleUk : route.titleEn;
    const href = language === 'uk' ? route.uk : route.en;

    if (!sections.has(section)) {
      sections.set(section, []);
    }

    sections.get(section)?.push([title, href]);
  }

  return Array.from(sections, ([title, links]) => ({ title, links }));
}
