type BookSummary = {
  total: number;
  groups: Array<{ code: string; letter: string; count: number; tags: Record<string, number> }>;
};

const root = document.querySelector<HTMLElement>('[data-scientific-books]');

if (root) {
  const lang = root.dataset.language === 'en' ? 'en' : 'uk';
  const words = lang === 'en'
    ? { all: 'All records', found: 'of', entries: 'records', error: 'Preview unavailable. Open the complete letter page.' }
    : { all: 'Усі записи', found: 'із', entries: 'записів', error: 'Попередній перегляд недоступний. Відкрийте сторінку літери.' };
  const sections = [...root.querySelectorAll<HTMLElement>('[data-alphabet-group]')];
  const summaryLabel = root.querySelector<HTMLElement>('[data-filter-summary]');
  const noResults = root.querySelector<HTMLElement>('[data-no-results]');
  const buttons = [...root.querySelectorAll<HTMLElement>('.tag-cloud [data-tag-filter]')];
  const total = Number(root.dataset.total);
  const cache = new Map<string, Promise<void>>();
  let currentTag = 'all';
  let filterRun = 0;
  let indexPromise: Promise<BookSummary> | undefined;

  function loadIndex() {
    if (!indexPromise) {
      indexPromise = fetch(root!.dataset.indexUrl!, { cache: 'force-cache' })
        .then(async (response) => {
          if (!response.ok) throw new Error('Cannot fetch book summary');
          const data = await response.json() as BookSummary;
          if (!data || data.total !== total || !Array.isArray(data.groups)) {
            throw new Error('Invalid book summary');
          }
          return data;
        }).catch((error: unknown) => {
          indexPromise = undefined;
          throw error;
        });
    }
    return indexPromise;
  }

  function updateCardVisibility(section: HTMLElement) {
    section.querySelectorAll<HTMLElement>('[data-book-card]').forEach((card) => {
      let tags: string[] = [];
      try { tags = JSON.parse(card.dataset.tags ?? '[]') as string[]; } catch { /* invalid metadata: leave hidden */ }
      card.classList.toggle('is-filter-hidden', currentTag !== 'all' && !tags.includes(currentTag));
    });
  }

  async function showGroup(section: HTMLElement) {
    const code = section.dataset.letterCode!;
    if (cache.has(code)) return cache.get(code);
    const action = section.querySelector<HTMLAnchorElement>('[data-book-letter-link]');
    const grid = section.querySelector<HTMLElement>('[data-book-grid]');
    if (!action || !grid) return;
    const promise = fetch(action.href, { cache: 'force-cache' }).then(async (response) => {
      if (!response.ok) throw new Error('Cannot fetch letter page');
      const html = await response.text();
      const source = new DOMParser().parseFromString(html, 'text/html')
        .querySelector<HTMLElement>('[data-books-letter-list]');
      if (!source || source.dataset.letter !== section.dataset.letter) {
        throw new Error('Letter page mismatch');
      }
      // Preserve server-rendered, fully linked records while avoiding HTML injection.
      const cards = [...source.querySelectorAll<HTMLElement>('[data-book-card]')];
      const expected = Number(section.dataset.count);
      if (cards.length !== expected) throw new Error('Letter card count mismatch');
      grid.replaceChildren(...cards.map((card) => document.importNode(card, true)));
      section.dataset.loaded = 'true';
      updateCardVisibility(section);
    }).catch(() => {
      cache.delete(code);
      const status = section.querySelector<HTMLElement>('[data-book-load-status]');
      if (status) status.textContent = words.error;
    });
    cache.set(code, promise);
    return promise;
  }

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !entry.target.hasAttribute('hidden')) {
          void showGroup(entry.target as HTMLElement);
          observer?.unobserve(entry.target);
        }
      }
    }, { rootMargin: '260px' }) : null;
  for (const section of sections) {
    if (observer) observer.observe(section);
    else if (!section.hidden) void showGroup(section);
  }

  async function chooseTag(tag: string, updateHash: boolean) {
    const seq = ++filterRun;
    try {
      const data = await loadIndex();
      if (seq !== filterRun) return;
      currentTag = tag;
      let visibleTotal = 0;
      const counts = new Map(data.groups.map((row) => [row.code, row]));
      for (const section of sections) {
        const entry = counts.get(section.dataset.letterCode!);
        const count = tag === 'all' ? (entry?.count ?? 0) : (entry?.tags[tag] ?? 0);
        section.hidden = count === 0;
        if (count > 0) visibleTotal += count;
        const label = section.querySelector<HTMLElement>('[data-group-count]');
        if (label) label.textContent = String(count) + ' ' + words.entries;
        if (section.dataset.loaded === 'true') updateCardVisibility(section);
      }
      buttons.forEach((button) => button.classList.toggle('is-active', button.dataset.tagFilter === tag));
      const active = buttons.find((button) => button.dataset.tagFilter === tag);
      const label = active?.textContent?.trim() || tag;
      if (summaryLabel) summaryLabel.textContent = tag === 'all'
        ? words.all + ' · ' + total + ' ' + words.entries
        : label + ' · ' + visibleTotal + ' ' + words.found + ' ' + total;
      if (noResults) noResults.classList.toggle('is-filter-hidden', visibleTotal > 0);
      if (updateHash) {
        history.replaceState(null, '', window.location.pathname +
          window.location.search + (tag === 'all' ? '' : '#tag-' + tag));
      }
      for (const section of sections) {
        if (!section.hidden && section.dataset.loaded !== 'true') {
          // Re-observe sections unobserved while hidden by another filter.
          observer?.observe(section);
        }
      }
    } catch {
      if (summaryLabel) summaryLabel.textContent = words.error;
    }
  }

  root.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest<HTMLElement>('[data-tag-filter]');
    if (!button || !root.contains(button)) return;
    event.preventDefault();
    void chooseTag(button.dataset.tagFilter ?? 'all', true);
  });

  const selected = window.location.hash.startsWith('#tag-')
    ? window.location.hash.slice(5)
    : 'all';
  if (selected !== 'all') void chooseTag(selected, false);
}
