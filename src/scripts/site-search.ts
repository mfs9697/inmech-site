interface SearchItem {
  title: string;
  url: string;
  type: string;
  description: string;
  keywords: string;
}

const page = document.querySelector<HTMLElement>('[data-site-search]');
const input = page?.querySelector<HTMLInputElement>('#site-search');
const clearButton = page?.querySelector<HTMLButtonElement>('[data-clear-search]');
const results = page?.querySelector<HTMLElement>('[data-search-results]');
const count = page?.querySelector<HTMLElement>('[data-results-count]');

if (page && input && clearButton && results && count) {
  const isEnglish = page.dataset.searchLang === 'en';
  const locale = isEnglish ? 'en' : 'uk';
  const messages = isEnglish
    ? { start: 'Start typing a query', loading: 'Loading search index…',
        failure: 'Search is temporarily unavailable. Use the sitemap to browse the site.',
        empty: 'No results found for this query.', singular: 'result', plural: 'results' }
    : { start: 'Почніть вводити запит', loading: 'Завантаження пошукового індексу…',
        failure: 'Пошук тимчасово недоступний. Скористайтеся картою сайту.',
        empty: 'За цим запитом нічого не знайдено.', singular: 'результат', plural: 'результатів' };

  const fold = (value: string) => value.toLocaleLowerCase(locale).normalize('NFC').trim();
  let indexPromise: Promise<SearchItem[]> | undefined;
  let requestId = 0;

  function loadIndex() {
    if (!indexPromise) {
      const url = page!.dataset.searchIndex;
      indexPromise = fetch(url ?? '', { cache: 'force-cache' }).then(async (response) => {
        if (!response.ok) throw new Error('Failed to fetch the search index');
        const content: unknown = await response.json();
        if (!Array.isArray(content) || !content.every((item) =>
          item && typeof item.title === 'string' && typeof item.type === 'string' &&
          typeof item.description === 'string' && typeof item.keywords === 'string' &&
          typeof item.url === 'string' && /^\/(?!\/)/.test(item.url))) {
          throw new Error('Unexpected search index format');
        }
        return content as SearchItem[];
      });
    }
    return indexPromise;
  }

  function render(items: SearchItem[], query: string) {
    const words = [...new Set(fold(query).split(/\s+/).filter(Boolean))];
    const matched = items.map((item) => {
      const title = fold(item.title);
      const description = fold(item.description);
      const keywords = fold(item.keywords);
      const category = fold(item.type);
      const hits = words.every((word) =>
        title.includes(word) || description.includes(word) || keywords.includes(word) || category.includes(word));
      const score = words.reduce((sum, word) =>
        sum + (title.includes(word) ? 9 : 0) + (category.includes(word) ? 4 : 0) +
        (description.includes(word) ? 3 : 0) + (keywords.includes(word) ? 1 : 0), 0);
      return { item, hits, score };
    }).filter((row) => row.hits)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, locale));

    count!.textContent = String(matched.length) + ' ' +
      (matched.length === 1 ? messages.singular : messages.plural);
    results!.replaceChildren();
    if (!matched.length) {
      const p = document.createElement('p');
      p.className = 'empty-results';
      p.textContent = messages.empty;
      results!.append(p);
      return;
    }
    for (const { item } of matched.slice(0, 50)) {
      const card = document.createElement('article');
      card.className = 'result-card';
      const category = document.createElement('span');
      category.textContent = item.type;
      const heading = document.createElement('h3');
      const link = document.createElement('a');
      link.href = item.url;
      link.textContent = item.title;
      heading.append(link);
      card.append(category, heading);
      if (item.description) {
        const description = document.createElement('p');
        description.textContent = item.description;
        card.append(description);
      }
      results!.append(card);
    }
  }

  async function handleInput() {
    const query = input!.value.trim();
    const current = ++requestId;
    if (!query) {
      results!.replaceChildren();
      count!.textContent = messages.start;
      return;
    }
    count!.textContent = messages.loading;
    try {
      const items = await loadIndex();
      if (requestId !== current) return;
      render(items, query);
    } catch {
      if (requestId !== current) return;
      // Permit a retry if the static index was temporarily unavailable.
      indexPromise = undefined;
      results!.replaceChildren();
      count!.textContent = messages.failure;
    }
  }

  input.addEventListener('input', () => { void handleInput(); });
  clearButton.addEventListener('click', () => {
    input.value = '';
    input.focus();
    void handleInput();
  });
  const initial = new URLSearchParams(window.location.search).get('q');
  if (initial) {
    input.value = initial;
    void handleInput();
  }
}
