const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const nav = document.querySelector<HTMLElement>('.primary-nav');
const languageScrollKey = 'inmech-language-switch-scroll';

try {
  const savedLanguageScroll = window.sessionStorage.getItem(languageScrollKey);

  if (savedLanguageScroll) {
    window.sessionStorage.removeItem(languageScrollKey);

    const scrollY = Number(savedLanguageScroll);

    if (Number.isFinite(scrollY) && scrollY > 0) {
      window.requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
      });
    }
  }
} catch {
  // Browsers can block sessionStorage; the language links still work normally.
}

document.querySelectorAll<HTMLAnchorElement>('.nav-lang-switch a[data-language-switch]').forEach((link) => {
  link.addEventListener('click', () => {
    try {
      window.sessionStorage.setItem(languageScrollKey, String(window.scrollY));
    } catch {
      // Ignore storage errors and let the browser navigate normally.
    }
  });
});

if (nav) {
  const primaryNav = nav;
  const submenuButtons = Array.from(
    primaryNav.querySelectorAll<HTMLButtonElement>('.nav-label[aria-controls]')
  );
  const desktopMedia = window.matchMedia('(min-width: 1121px)');

  function submenuFor(button: HTMLButtonElement) {
    const submenuId = button.getAttribute('aria-controls');
    return submenuId ? document.getElementById(submenuId) : null;
  }

  function setSubmenuState(button: HTMLButtonElement, expanded: boolean) {
    button.setAttribute('aria-expanded', String(expanded));
    button.closest('li')?.classList.toggle('submenu-open', expanded);
  }

  function closeSubmenus(except?: HTMLButtonElement) {
    submenuButtons.forEach((button) => {
      if (button !== except) {
        setSubmenuState(button, false);
      }
    });
  }

  function openSubmenu(button: HTMLButtonElement, focusFirstLink = false) {
    closeSubmenus(button);
    setSubmenuState(button, true);

    if (focusFirstLink) {
      submenuFor(button)?.querySelector<HTMLAnchorElement>('a')?.focus();
    }
  }

  function setMenuState(open: boolean) {
    primaryNav.classList.toggle('open', open);
    menuToggle?.setAttribute('aria-expanded', String(open));

    if (!desktopMedia.matches) {
      submenuButtons.forEach((button) => setSubmenuState(button, open));
    } else if (!open) {
      closeSubmenus();
    }
  }

  submenuButtons.forEach((button) => {
    const item = button.closest('li');
    const submenu = submenuFor(button);

    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';

      if (expanded) {
        setSubmenuState(button, false);
      } else {
        openSubmenu(button);
      }
    });

    button.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setSubmenuState(button, false);
        button.focus();
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        openSubmenu(button, true);
      }
    });

    submenu?.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        setSubmenuState(button, false);
        button.focus();
      }
    });

    item?.addEventListener('focusout', () => {
      window.requestAnimationFrame(() => {
        if (!item.contains(document.activeElement)) {
          setSubmenuState(button, false);
        }
      });
    });
  });

  menuToggle?.addEventListener('click', () => {
    setMenuState(!primaryNav.classList.contains('open'));
  });

  document.addEventListener('click', (event) => {
    const target = event.target;

    if (!(target instanceof Node)) {
      return;
    }

    if (!primaryNav.contains(target) && !menuToggle?.contains(target)) {
      closeSubmenus();

      if (!desktopMedia.matches) {
        setMenuState(false);
      }
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return;
    }

    const expandedButton = submenuButtons.find(
      (button) => button.getAttribute('aria-expanded') === 'true'
    );

    if (expandedButton) {
      setSubmenuState(expandedButton, false);
      expandedButton.focus();
      return;
    }

    if (primaryNav.classList.contains('open')) {
      setMenuState(false);
      menuToggle?.focus();
    }
  });

  desktopMedia.addEventListener('change', () => {
    primaryNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    closeSubmenus();
  });
}

const englishHistoryDirectorsSection = document.querySelector<HTMLElement>(
  '.history-directors-section'
);

if (document.documentElement.lang === 'en' && englishHistoryDirectorsSection) {
  if (!englishHistoryDirectorsSection.id) {
    englishHistoryDirectorsSection.id = 'directors';
  }

  const directorLinks = new Map([
    ['S.P. Timoshenko', '/en/founder/'],
    ['O.M. Guz', '/en/history/directors/guz/']
  ]);

  englishHistoryDirectorsSection
    .querySelectorAll<HTMLElement>('.history-director-card')
    .forEach((card) => {
      const caption = card.querySelector<HTMLElement>('figcaption');
      const name = caption?.querySelector<HTMLElement>('strong')?.textContent?.trim();
      const href = name ? directorLinks.get(name) : undefined;

      if (!caption || !name || !href || caption.querySelector('.director-more')) {
        return;
      }

      card.classList.add('is-linked');

      const link = document.createElement('a');
      link.className = 'director-more';
      link.href = href;
      link.textContent = 'Learn more →';
      link.setAttribute('aria-label', `${name}: learn more`);
      caption.append(link);
    });
}
