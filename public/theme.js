/* Run in the head so a saved theme is applied before the first paint. */
(() => {
  'use strict';
  const storageKey = 'felexia-theme';
  const root = document.documentElement;
  const translations = {
    fr: { dark: 'Mode sombre', light: 'Mode clair', activateDark: 'Activer le mode sombre', activateLight: 'Activer le mode clair' },
    en: { dark: 'Dark mode', light: 'Light mode', activateDark: 'Switch to dark mode', activateLight: 'Switch to light mode' },
    ar: { dark: 'الوضع الداكن', light: 'الوضع الفاتح', activateDark: 'تفعيل الوضع الداكن', activateLight: 'تفعيل الوضع الفاتح' }
  };
  const labels = translations[root.lang.split('-')[0]] || translations.fr;

  function savedTheme() {
    try { return localStorage.getItem(storageKey) === 'dark' ? 'dark' : 'light'; }
    catch { return 'light'; }
  }

  function apply(theme) {
    const dark = theme === 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    // The locally hosted reference stylesheet already provides dark variants.
    root.classList.toggle('dark', dark);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#09152b' : '#ffffff');
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      const label = dark ? labels.activateLight : labels.activateDark;
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
      const text = button.querySelector('[data-theme-label]');
      if (text) text.textContent = dark ? labels.light : labels.dark;
      button.querySelectorAll('[data-theme-icon]').forEach(icon => {
        icon.toggleAttribute('hidden', icon.dataset.themeIcon === (dark ? 'moon' : 'sun'));
      });
    });
  }

  apply(savedTheme());

  function ready() {
    apply(root.dataset.theme);
    document.addEventListener('click', event => {
      const button = event.target.closest?.('[data-theme-toggle]');
      if (!button) return;
      const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(theme);
      try { localStorage.setItem(storageKey, theme); } catch { /* Theme still works without browser storage. */ }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
  else ready();

  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) apply(event.newValue === 'dark' ? 'dark' : 'light');
  });
})();
