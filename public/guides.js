/* All guide links exist in the HTML. This progressively enhances filtering. */
(() => {
  'use strict';
  const search = document.querySelector('[data-guide-search]');
  const category = document.querySelector('[data-guide-category]');
  if (!search || !category) return;
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase().replace(/[’']/g,' ').trim();
  const cards = Array.from(document.querySelectorAll('[data-guide-card]'),element => ({element,text:normalize(element.textContent),category:element.dataset.category}));
  const count = document.querySelector('[data-guide-count]');
  const empty = document.querySelector('[data-guide-empty]');
  function filter() {
    const terms = normalize(search.value).split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const card of cards) {
      const match = (!category.value || card.category === category.value) && terms.every(term => card.text.includes(term));
      card.element.hidden = !match;
      if (match) visible++;
    }
    const label = visible === 1 && document.documentElement.lang !== 'ar' ? 'guide' : count.dataset.countLabel;
    count.textContent = `${visible} ${label}`;
    empty.hidden = visible > 0;
  }
  search.addEventListener('input',filter);
  category.addEventListener('change',filter);
})();
