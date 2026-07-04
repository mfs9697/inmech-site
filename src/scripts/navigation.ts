const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const nav = document.querySelector<HTMLElement>('.primary-nav');

if (nav) {
  const submenuButtons = Array.from(
    nav.querySelectorAll<HTMLButtonElement>('.nav-label[aria-controls]')
  );
  const desktopMedia = window.matchMedia('(min-width: 941px)');

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
    nav.classList.toggle('open', open);
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
    setMenuState(!nav.classList.contains('open'));
  });

  document.addEventListener('click', (event) => {
    const target = event.target;

    if (!(target instanceof Node)) {
      return;
    }

    if (!nav.contains(target) && !menuToggle?.contains(target)) {
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

    if (nav.classList.contains('open')) {
      setMenuState(false);
      menuToggle?.focus();
    }
  });

  desktopMedia.addEventListener('change', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    closeSubmenus();
  });
}
