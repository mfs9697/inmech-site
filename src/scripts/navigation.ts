const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const nav = document.querySelector<HTMLElement>('.primary-nav');
const languageScrollKey = 'inmech-language-switch-scroll';
const legacyNcutamUrl = 'https://natcommmech.inmech.kyiv.ua/';
const canonicalNcutamPath = document.documentElement.lang === 'en' ? '/en/ncutam/' : '/ncutam/';

// Keep historical templates from sending visitors through the retired NCUTAM host.
document.querySelectorAll<HTMLAnchorElement>(`a[href="${legacyNcutamUrl}"]`).forEach((link) => {
  link.setAttribute('href', canonicalNcutamPath);
  link.removeAttribute('target');
  link.removeAttribute('rel');
});

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

  function updateMobileMenuHeight() {
    if (desktopMedia.matches || !primaryNav.classList.contains('open')) return;

    // The row is sticky, so its position can change with zoom and scrolling.
    // Measure the actual visible space below the panel instead of assuming a
    // fixed header height. visualViewport also accounts for mobile browser UI.
    const viewport = window.visualViewport;
    const visibleBottom = viewport ? viewport.offsetTop + viewport.height : window.innerHeight;
    const availableHeight = Math.max(0, Math.floor(visibleBottom - primaryNav.getBoundingClientRect().top - 12));
    primaryNav.style.setProperty('--mobile-nav-available-height', `${availableHeight}px`);
  }

  function setMenuState(open: boolean) {
    primaryNav.classList.toggle('open', open);
    menuToggle?.setAttribute('aria-expanded', String(open));

    // Starting with every mobile submenu expanded makes the menu prohibitively
    // long. Open only the section the visitor explicitly chooses.
    closeSubmenus();
    if (open && !desktopMedia.matches) {
      updateMobileMenuHeight();
      primaryNav.scrollTop = 0;
    } else {
      primaryNav.style.removeProperty('--mobile-nav-available-height');
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
      // Escape from an already-collapsed heading should bubble to the mobile
      // panel handler, so a second Escape closes the panel itself.
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        event.preventDefault();
        event.stopPropagation();
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

  // A same-page anchor may not reload the document; close the overlay when
  // following any menu link, just as with navigation to a different page.
  primaryNav.addEventListener('click', (event) => {
    if (!desktopMedia.matches && event.target instanceof Element && event.target.closest('a')) {
      setMenuState(false);
    }
  });

  window.addEventListener('resize', updateMobileMenuHeight);
  window.visualViewport?.addEventListener('resize', updateMobileMenuHeight);
  window.visualViewport?.addEventListener('scroll', updateMobileMenuHeight);

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

    // Escape from an open mobile panel closes it and returns keyboard focus
    // to its toggle. Submenu-local Escape handlers stop propagation and only
    // collapse that submenu, keeping the surrounding mobile menu available.
    if (!desktopMedia.matches && primaryNav.classList.contains('open')) {
      setMenuState(false);
      menuToggle?.focus();
      return;
    }

    const expandedButton = submenuButtons.find(
      (button) => button.getAttribute('aria-expanded') === 'true'
    );

    if (expandedButton) {
      setSubmenuState(expandedButton, false);
      expandedButton.focus();
    }
  });

  desktopMedia.addEventListener('change', () => {
    setMenuState(false);
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
    ['S.P. Timoshenko', '../founder/'],
    ['O.M. Guz', 'directors/guz/']
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

  if (window.location.hash === '#directors') {
    window.requestAnimationFrame(() => {
      englishHistoryDirectorsSection.scrollIntoView({ block: 'start' });
    });
  }
}
