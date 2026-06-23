const englishBlockPattern = /<!--\s*en:start\s*-->([\s\S]*?)<!--\s*en:end\s*-->/i;
const englishBlockRemovePattern = /<!--\s*en:start\s*-->[\s\S]*?<!--\s*en:end\s*-->/gi;
const ukrainianBlockPattern = /<!--\s*uk:start\s*-->([\s\S]*?)<!--\s*uk:end\s*-->/i;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function withBase(path: string, base: string) {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('mailto:') || path.startsWith('#')) {
    return path;
  }

  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

function renderInlineMarkdown(value: string, base: string) {
  const placeholders: string[] = [];
  let text = value;

  text = text.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)/g, (_, alt, src, title) => {
    const safeAlt = escapeHtml(alt ?? '');
    const safeSrc = escapeHtml(withBase(src, base));
    const safeTitle = title ? ` title="${escapeHtml(title)}"` : '';
    const html = `<img src="${safeSrc}" alt="${safeAlt}" loading="lazy" decoding="async"${safeTitle}>`;
    placeholders.push(html);
    return `@@NEWS_INLINE_${placeholders.length - 1}@@`;
  });

  text = text.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)/g, (_, label, href, title) => {
    const safeLabel = escapeHtml(label ?? '');
    const safeHref = escapeHtml(withBase(href, base));
    const safeTitle = title ? ` title="${escapeHtml(title)}"` : '';
    const html = `<a href="${safeHref}"${safeTitle}>${safeLabel}</a>`;
    placeholders.push(html);
    return `@@NEWS_INLINE_${placeholders.length - 1}@@`;
  });

  text = escapeHtml(text);

  text = text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/__([^_]+)__/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/_([^_]+)_/g, '<em>$1</em>');

  placeholders.forEach((html, index) => {
    text = text.replace(`@@NEWS_INLINE_${index}@@`, html);
  });

  return text;
}

export function getEnglishNewsBody(body = '') {
  return body.match(englishBlockPattern)?.[1]?.trim() ?? '';
}

export function getUkrainianNewsBody(body = '') {
  const explicitUkrainianBody = body.match(ukrainianBlockPattern)?.[1]?.trim();

  if (explicitUkrainianBody) {
    return explicitUkrainianBody;
  }

  return body.replace(englishBlockRemovePattern, '').trim();
}

export function hasNewsLanguageBlocks(body = '') {
  return englishBlockPattern.test(body) || ukrainianBlockPattern.test(body);
}

export function renderNewsMarkdown(markdown: string, base = '') {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];
  let paragraph: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushParagraph = () => {
    if (paragraph.length === 0) {
      return;
    }

    html.push(`<p>${renderInlineMarkdown(paragraph.join(' '), base)}</p>`);
    paragraph = [];
  };

  const closeList = () => {
    if (!listType) {
      return;
    }

    html.push(`</${listType}>`);
    listType = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      closeList();
      continue;
    }

    if (/^<!--.*-->$/.test(line)) {
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const level = Math.min(heading[1].length, 6);
      html.push(`<h${level}>${renderInlineMarkdown(heading[2], base)}</h${level}>`);
      continue;
    }

    const unorderedItem = line.match(/^[-*+]\s+(.+)$/);
    if (unorderedItem) {
      flushParagraph();
      if (listType !== 'ul') {
        closeList();
        html.push('<ul>');
        listType = 'ul';
      }
      html.push(`<li>${renderInlineMarkdown(unorderedItem[1], base)}</li>`);
      continue;
    }

    const orderedItem = line.match(/^\d+[.)]\s+(.+)$/);
    if (orderedItem) {
      flushParagraph();
      if (listType !== 'ol') {
        closeList();
        html.push('<ol>');
        listType = 'ol';
      }
      html.push(`<li>${renderInlineMarkdown(orderedItem[1], base)}</li>`);
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  closeList();

  return html.join('\n');
}
