/**
 * Mobile navigation regression without a browser dependency.
 * Uses the actual navigation.ts script (compiled by the installed esbuild)
 * against a deliberately small DOM event/attribute simulator. Also checks
 * responsive CSS and both rendered language headers.
 *
 * For geometry, touch and zoom, see the manual browser acceptance matrix in
 * docs/audits/2026-10-22/MOBILE_NAVIGATION_F03.md.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { transform } from 'esbuild';

const source = fs.readFileSync('src/scripts/navigation.ts', 'utf8');
const css = fs.readFileSync('src/styles/global.css', 'utf8');

class FakeNode {
  constructor() {
    this.listeners = new Map();
  }
  addEventListener(name, handler) {
    const list = this.listeners.get(name) ?? [];
    list.push(handler);
    this.listeners.set(name, list);
  }
  dispatch(name, overrides = {}) {
    const event = {
      target: overrides.target ?? this,
      key: overrides.key,
      stopped: false,
      defaultPrevented: false,
      stopPropagation() { this.stopped = true; },
      preventDefault() { this.defaultPrevented = true; }
    };
    for (const callback of this.listeners.get(name) ?? []) callback(event);
    return event;
  }
}

class FakeElement extends FakeNode {
  constructor(tag, doc) {
    super();
    this.tag = tag;
    this.document = doc;
    this.attributes = new Map();
    this.classes = new Set();
    this.classList = {
      add: (name) => this.classes.add(name),
      remove: (name) => this.classes.delete(name),
      contains: (name) => this.classes.has(name),
      toggle: (name, enabled) => {
        if (enabled === undefined ? !this.classes.has(name) : enabled) this.classes.add(name);
        else this.classes.delete(name);
      }
    };
    this.styleValues = new Map();
    this.style = {
      setProperty: (name, value) => this.styleValues.set(name, value),
      removeProperty: (name) => this.styleValues.delete(name)
    };
    this.parentLi = null;
    this.children = [];
    this.scrollTop = 0;
  }
  setAttribute(name, value) { this.attributes.set(name, value); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  closest(selector) {
    if (selector === 'li') return this.parentLi;
    if (selector === 'a') return this.tag === 'a' ? this : null;
    return null;
  }
  contains(node) {
    if (node === this) return true;
    return this.children.some((child) => child.contains(node));
  }
  focus() { this.document.activeElement = this; }
  querySelector(selector) {
    if (selector === 'a') return this.children.find((x) => x.tag === 'a') ?? null;
    return null;
  }
  querySelectorAll(selector) { return this.items ?? []; }
  getBoundingClientRect() { return { top: 62 }; }
}

async function exerciseInteractions() {
  const doc = new FakeNode();
  doc.activeElement = null;
  doc.documentElement = { lang: 'uk' };
  const elt = (tag) => new FakeElement(tag, doc);
  const nav = elt('nav');
  const toggle = elt('button');
  const outside = elt('button');
  const buttons = [];
  const submenuById = new Map();

  for (const id of ['about', 'education']) {
    const li = elt('li');
    const button = elt('button');
    button.parentLi = li;
    button.setAttribute('aria-controls', 'submenu-' + id);
    button.setAttribute('aria-expanded', 'false');
    const submenu = elt('ul');
    const link = elt('a');
    link.parentLi = li;
    submenu.children.push(link);
    submenuById.set('submenu-' + id, submenu);
    li.children.push(button, submenu);
    nav.children.push(li);
    buttons.push(button);
  }
  nav.items = buttons;
  toggle.setAttribute('aria-expanded', 'false');
  const mobileMedia = new FakeNode();
  mobileMedia.matches = false;
  const visualViewport = new FakeNode();
  visualViewport.offsetTop = 0;
  visualViewport.height = 360;
  const windowEvents = new FakeNode();
  const fakeWindow = {
    innerHeight: 360,
    visualViewport,
    matchMedia: () => mobileMedia,
    addEventListener: (name, callback) => windowEvents.addEventListener(name, callback),
    sessionStorage: { getItem: () => null },
    requestAnimationFrame: (callback) => callback()
  };
  doc.querySelector = (selector) => {
    if (selector === '.menu-toggle') return toggle;
    if (selector === '.primary-nav') return nav;
    return null;
  };
  doc.querySelectorAll = () => [];
  doc.getElementById = (id) => submenuById.get(id) ?? null;

  const compiled = await transform(source, { loader: 'ts', format: 'iife', target: 'es2022' });
  vm.runInNewContext(compiled.code, {
    document: doc,
    window: fakeWindow,
    Node: FakeNode,
    Element: FakeElement
  }, { filename: 'navigation.ts', timeout: 2000 });

  const opened = toggle.dispatch('click');
  assert(nav.classList.contains('open'), 'Mobile menu must open');
  assert.equal(toggle.getAttribute('aria-expanded'), 'true');
  assert.equal(nav.styleValues.get('--mobile-nav-available-height'), '286px', 'Height must match viewport minus panel top and inset');
  assert(buttons.every((b) => b.getAttribute('aria-expanded') === 'false'), 'All mobile submenus must start collapsed');
  assert.equal(opened.defaultPrevented, false);

  buttons[0].dispatch('click');
  assert.equal(buttons[0].getAttribute('aria-expanded'), 'true', 'Chosen submenu should open');
  buttons[1].dispatch('click');
  assert.equal(buttons[0].getAttribute('aria-expanded'), 'false', 'Previous submenu should close');
  assert.equal(buttons[1].getAttribute('aria-expanded'), 'true', 'New submenu should open');

  const down = buttons[1].dispatch('keydown', { key: 'ArrowDown' });
  assert(down.defaultPrevented, 'ArrowDown should move keyboard focus to first submenu link');
  assert.equal(doc.activeElement, submenuById.get('submenu-education').children[0]);

  const escapeSub = submenuById.get('submenu-education').dispatch('keydown', { key: 'Escape' });
  assert(escapeSub.stopped && escapeSub.defaultPrevented, 'Submenu Escape should not close whole panel');
  assert.equal(buttons[1].getAttribute('aria-expanded'), 'false');
  assert(nav.classList.contains('open'), 'Submenu Escape must preserve mobile menu');
  assert.equal(doc.activeElement, buttons[1], 'Submenu Escape must return focus to heading');

  visualViewport.height = 240;
  visualViewport.dispatch('resize');
  assert.equal(nav.styleValues.get('--mobile-nav-available-height'), '166px', 'Mobile viewport resize must recalculate scroll space');
  buttons[0].dispatch('click');
  const buttonEscape = buttons[0].dispatch('keydown', { key: 'Escape' });
  assert(buttonEscape.stopped, 'Header Escape must not bubble to global close listener');
  assert(nav.classList.contains('open'), 'Header Escape must preserve mobile panel');
  assert.equal(buttons[0].getAttribute('aria-expanded'), 'false');

  const secondEscape = buttons[0].dispatch('keydown', { key: 'Escape' });
  assert(!secondEscape.stopped, 'Escape on a collapsed heading must bubble to close mobile panel');
  // Fake DOM has no native event bubbling: dispatch the unstopped event to the document.
  doc.dispatch('keydown', { key: 'Escape' });
  assert(!nav.classList.contains('open'), 'Global Escape must close the mobile panel');
  assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  assert.equal(doc.activeElement, toggle, 'Global Escape returns focus to menu toggle');
  assert(!nav.styleValues.has('--mobile-nav-available-height'), 'Closing menu clears computed mobile height');

  toggle.dispatch('click');
  nav.dispatch('click', { target: submenuById.get('submenu-about').children[0] });
  assert(!nav.classList.contains('open'), 'Following link (including hash) must close mobile panel');

  toggle.dispatch('click');
  doc.dispatch('click', { target: outside });
  assert(!nav.classList.contains('open'), 'Clicking outside must close mobile menu');

  mobileMedia.matches = true;
  mobileMedia.dispatch('change');
  buttons[0].dispatch('click');
  assert.equal(buttons[0].getAttribute('aria-expanded'), 'true', 'Desktop submenu must continue to open');
  assert(!nav.classList.contains('open'), 'Desktop dropdown must not require mobile panel');
  buttons[0].dispatch('keydown', { key: 'Escape' });
  assert.equal(buttons[0].getAttribute('aria-expanded'), 'false', 'Desktop Escape must close dropdown');
}

function checkLayoutContracts() {
  assert(/@media \(max-width: 1120px\)/.test(css), 'Mobile breakpoint missing');
  assert(/max-height:\s*var\(--mobile-nav-available-height,\s*calc\(100dvh - 80px\)\)/.test(css), 'Viewport-bounded menu rule missing');
  assert(/overflow-y:\s*auto/.test(css), 'Independent vertical scrolling missing');
  assert(/overscroll-behavior-y:\s*contain/.test(css), 'Scroll containment missing');

  for (const page of ['dist/index.html', 'dist/en/index.html']) {
    const html = fs.readFileSync(page, 'utf8');
    assert(/class="menu-toggle"[^>]*aria-expanded="false"[^>]*aria-controls="primary-nav"/.test(html), page + ': menu toggle not wired');
    assert(/class="primary-nav"[^>]*id="primary-nav"/.test(html), page + ': navigation panel missing');
    assert(/aria-controls="submenu-about"/.test(html), page + ': expandable submenu missing');
    assert(/aria-controls="submenu-education"/.test(html), page + ': expandable education submenu missing');
    assert(/search-nav-link/.test(html), page + ': final search link missing');
  }
}

try {
  checkLayoutContracts();
  await exerciseInteractions();
  console.log('Mobile navigation regression passed: bilingual HTML, scroll-height/resize, collapsed submenus, single-section expansion, ArrowDown, Escape/focus, outside/link close and desktop behavior.');
} catch (error) {
  console.error('Mobile navigation regression failed:', error);
  process.exitCode = 1;
}
