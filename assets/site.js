/* No imports, packages, or network requests. Works on static hosting and file://. */
(() => {
  'use strict';
  const root = document.documentElement;
  root.classList.add('js');
  let saved;
  try { saved = localStorage.getItem('cm-html-theme'); } catch { /* Storage is optional. */ }
  const preferred = window.matchMedia('(prefers-color-scheme: light)');
  root.dataset.theme = saved === 'dark' || saved === 'light' ? saved : preferred.matches ? 'light' : 'dark';

  document.addEventListener('DOMContentLoaded', () => {
    const pt = root.lang === 'pt-BR';
    const theme = document.querySelector('.theme-toggle');
    function updateThemeButton() {
      const dark = root.dataset.theme === 'dark';
      theme?.setAttribute('aria-pressed', String(!dark));
      const label = pt ? `Ativar tema ${dark ? 'claro' : 'escuro'}` : `Switch to ${dark ? 'light' : 'dark'} theme`;
      theme?.setAttribute('aria-label', label);
      theme?.setAttribute('title', label);
    }
    updateThemeButton();
    theme?.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      saved = root.dataset.theme;
      try { localStorage.setItem('cm-html-theme', saved); } catch { /* Keep the current-page preference. */ }
      updateThemeButton();
    });
    preferred.addEventListener('change', event => {
      if (saved === 'light' || saved === 'dark') return;
      root.dataset.theme = event.matches ? 'light' : 'dark';
      updateThemeButton();
    });

    const menu = document.querySelector('.menu-toggle');
    const nav = document.querySelector('#primary-nav');
    function closeMenu() { menu?.setAttribute('aria-expanded', 'false'); nav?.classList.remove('is-open'); }
    menu?.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      nav?.classList.toggle('is-open', open);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
    });
    document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
    nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

    const search = document.querySelector('#credential-search');
    const cards = [...document.querySelectorAll('.credential-grid > li')];
    const count = document.querySelector('#credential-count');
    const empty = document.querySelector('.search-empty');
    const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    function filterCredentials() {
      const query = normalize(search?.value.trim() || '');
      let visible = 0;
      cards.forEach(card => {
        card.hidden = !normalize(card.textContent).includes(query);
        if (!card.hidden) visible++;
      });
      if (count) count.textContent = `${visible} ${visible === 1 ? (pt ? 'certificação' : 'certification') : count.dataset.label}`;
      if (empty) empty.hidden = visible !== 0;
    }
    if (search) { search.addEventListener('input', filterCredentials); filterCredentials(); }

    document.querySelectorAll('[data-copy-target]').forEach(button => {
      button.addEventListener('click', async () => {
        const target = document.getElementById(button.dataset.copyTarget);
        if (!target) return;
        const original = button.textContent;
        try {
          await navigator.clipboard.writeText(target.textContent);
          button.textContent = pt ? 'Copiado' : 'Copied';
        } catch { button.textContent = pt ? 'Selecione e copie' : 'Select and copy'; }
        window.setTimeout(() => { button.textContent = original; }, 1800);
      });
    });
  });
})();
