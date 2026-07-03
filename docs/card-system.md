# Global card system

The site uses one global structural card system in `src/styles/cards.css` and a separate semantic colour system in `src/styles/block-colors.css`.

## Principle

Card structure and card meaning are independent:

- classes beginning with `site-card` define layout, spacing and interaction;
- `data-block-tone` defines semantic colour: `neutral`, `information`, `heritage` or `emphasis`.

A card must not receive a different colour merely because of its position, odd/even order or department number. Global cards do not use decorative colour strips at their upper or lower edges; colour is provided only by the semantic tone.

## Base card

```astro
<article class="site-card" data-block-tone="neutral">
  ...
</article>
```

`site-card` provides the common border, radius, background, padding and shadow.

## Card grid

```astro
<div class="site-card-grid">
  ...
</div>
```

The grid uses three columns on large screens, two on medium screens and one on small screens.

## Structural modifiers

- `site-card--interactive` — hover and keyboard-focus movement for clickable cards;
- `site-card--navigation` — tall navigation card without decorative colour strips;
- `site-card--featured` — spans two grid columns without assigning a colour;
- `site-card--stat` — compact horizontal statistic card;
- `site-card--note` — spacious explanatory or concluding card.

## Card elements

- `site-card__icon` — icon container;
- `site-card__metric` — value in a statistic card;
- `site-card__label` — small pill-shaped category label;
- `site-card__title` — card heading;
- `site-card__text` — main descriptive text;
- `site-card__action` — bottom-aligned action text.

## Navigation-card example

```astro
<a
  class="site-card site-card--navigation site-card--interactive site-card--featured"
  data-block-tone="information"
  href="/postgraduate/"
>
  <span class="site-card__icon" aria-hidden="true">🎓</span>
  <span class="site-card__label">Вступникам і здобувачам</span>
  <h2 class="site-card__title">Аспірантура</h2>
  <p class="site-card__text">Опис розділу.</p>
  <span class="site-card__action">Перейти до розділу →</span>
</a>
```

## Featured does not mean gold

`site-card--featured` changes only size and hierarchy. Colour must still be assigned explicitly with `data-block-tone`. This prevents layout decisions from silently changing the semantic meaning of a card.

The Ukrainian and English Education pages are the reference implementation. Shared department cards also use the global base card.
