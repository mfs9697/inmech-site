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
  const placeholder = (index: number) => `@@BILINGUALINLINE${index}@@`;

  text = text.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)/g, (_, alt, src, title) => {
    const safeAlt = escapeHtml(alt ?? '');
    const safeSrc = escapeHtml(withBase(src, base));
    const safeTitle = title ? ` title="${escapeHtml(title)}"` : '';
    const html = `<img src="${safeSrc}" alt="${safeAlt}" loading="lazy" decoding="async"${safeTitle}>`;
    placeholders.push(html);
    return placeholder(placeholders.length - 1);
  });

  text = text.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)/g, (_, label, href, title) => {
    const safeLabel = escapeHtml(label ?? '');
    const safeHref = escapeHtml(withBase(href, base));
    const safeTitle = title ? ` title="${escapeHtml(title)}"` : '';
    const html = `<a href="${safeHref}"${safeTitle}>${safeLabel}</a>`;
    placeholders.push(html);
    return placeholder(placeholders.length - 1);
  });

  text = escapeHtml(text)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/__([^_]+)__/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/_([^_]+)_/g, '<em>$1</em>');

  placeholders.forEach((html, index) => {
    text = text.replace(placeholder(index), html);
  });

  return text;
}

export function getEnglishBody(body = '') {
  return body.match(englishBlockPattern)?.[1]?.trim() ?? '';
}

export function getUkrainianBody(body = '') {
  const explicitUkrainianBody = body.match(ukrainianBlockPattern)?.[1]?.trim();
  return explicitUkrainianBody || body.replace(englishBlockRemovePattern, '').trim();
}

export function hasLanguageBlocks(body = '') {
  return englishBlockPattern.test(body) || ukrainianBlockPattern.test(body);
}

export function renderBilingualMarkdown(markdown: string, base = '') {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];
  let paragraph: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    html.push(`<p>${renderInlineMarkdown(paragraph.join(' '), base)}</p>`);
    paragraph = [];
  };

  const closeList = () => {
    if (!listType) return;
    html.push(`</${listType}>`);
    listType = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      // Blank lines between consecutive Markdown list items are allowed.
      // Close the list only when a heading, another list type, or prose follows.
      flushParagraph();
      continue;
    }

    if (/^<!--.*-->$/.test(line)) continue;

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const level = Math.min(heading[1].length, 6);
      // Support explicit, validated heading anchors for long NCUTAM documents.
      const explicitId = heading[2].match(/^(.*?)\s+\{#([A-Za-z0-9_-]+)\}$/);
      const headingText = explicitId ? explicitId[1] : heading[2];
      const anchorAttribute = explicitId ? ` id="${escapeHtml(explicitId[2])}"` : '';
      html.push(`<h${level}${anchorAttribute}>${renderInlineMarkdown(headingText, base)}</h${level}>`);
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

    closeList();
    paragraph.push(line);
  }

  flushParagraph();
  closeList();
  return html.join('\n');
}
