/* Standalone interactions for the MyLegal homepage supplied by its owner. */
(() => {
  'use strict';
  const tabContent = [
  {
    "id": "creation",
    "tabLabel": "Création d'entreprise",
    "tabIcon": "Rocket",
    "heading": "Créez votre société sans déplacement, sans paperasse.",
    "bullets": [
      {
        "icon": "Zap",
        "title": "Création 100% en ligne",
        "description": "Échangez avec le cabinet à distance pour préparer votre dossier et organiser les formalités."
      },
      {
        "icon": "HeartHandshake",
        "title": "Un accompagnement personnalisé",
        "description": "Un juriste Felexia Conseils vous accompagne du début à la fin tout au long de votre procédure de création."
      },
      {
        "icon": "Briefcase",
        "title": "Une prise en charge complète",
        "description": "Dossier pris en charge de A à Z : Certificat négatif, statuts, RC, IF, ICE, CNSS… nous gérons l'ensemble des démarches administratives pour vous."
      },
      {
        "icon": "ShieldCheck",
        "title": "Suivi des formalités",
        "description": "Nous vous accompagnons dans le suivi du dossier et la préparation des éventuelles pièces complémentaires."
      }
    ],
    "cta": {
      "label": "Créer mon entreprise",
      "href": "/fr/create/"
    },
    "image": {
      "src": "/mylegal/images/static/2024-07-Why-you-should-get-help-if-you-need-it.jpeg",
      "alt": "Entrepreneurs signant les documents de création de leur société"
    }
  },
  {
    "id": "domiciliation",
    "tabLabel": "Domiciliation",
    "tabIcon": "Building2",
    "heading": "Une adresse professionnelle pour votre société au Maroc.",
    "bullets": [
      {
        "icon": "Wallet",
        "title": "Sans louer de bureau ni magasin",
        "description": "Créez votre société sans louer de bureau ou de magasin."
      },
      {
        "icon": "MailOpen",
        "title": "Gestion de votre courrier",
        "description": "Définissez avec le cabinet les modalités de réception et de gestion de votre courrier professionnel."
      },
      {
        "icon": "FileSignature",
        "title": "Contrat conforme",
        "description": "Contrat de domiciliation respectant la réglementation marocaine"
      },
      {
        "icon": "ScanLine",
        "title": "Documents sécurisés",
        "description": "Les modalités de gestion et de remise de vos documents sont définies avec le cabinet."
      }
    ],
    "cta": {
      "label": "Domicilier ma société",
      "href": "/fr/domiciliation/"
    },
    "image": {
      "src": "/mylegal/images/static/2026-01-photo-bureau-ext-3.jpg",
      "alt": "Façade d’un centre d’affaires — photographie d’illustration"
    }
  },
  {
    "id": "modification",
    "tabLabel": "Modification",
    "tabIcon": "Settings",
    "heading": "Modifier votre société, sans relancer toute la procédure.",
    "bullets": [
      {
        "icon": "Building2",
        "title": "Transfert de siège social",
        "description": "Changement d'adresse, formalités auprès du tribunal de commerce et publication légale."
      },
      {
        "icon": "UserCheck",
        "title": "Changement de gérant",
        "description": "Nomination, révocation ou remplacement du gérant statutaire de votre société."
      },
      {
        "icon": "FileSignature",
        "title": "Modification des statuts",
        "description": "Objet social, dénomination, durée — toute mise à jour de vos statuts est gérée pour vous."
      },
      {
        "icon": "TrendingUp",
        "title": "Augmentation de capital",
        "description": "Apports en numéraire ou en nature, rédaction des PV et formalités d'enregistrement."
      }
    ],
    "cta": {
      "label": "Démarrer une modification",
      "href": "/fr/contact/"
    },
    "image": {
      "src": "/mylegal/images/static/2024-09-business-professionals-checking-project-data-1-scaled.jpg",
      "alt": "Professionnels préparant des documents — photographie d’illustration"
    }
  }
];
  const header = document.querySelector('body > header');
  const headerShell = header?.firstElementChild;
  const mobileMenu = document.getElementById('mobile-menu');
  const menuButton = header?.querySelector('button[aria-controls="mobile-menu"]');
  const desktopQuery = window.matchMedia('(min-width: 1024px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const initialHeaderClass = headerShell?.className || '';
  const floatingHeaderClass = 'relative transition-[margin,max-width,border-radius,background-color,box-shadow,backdrop-filter,border-color] duration-500 ease-out motion-reduce:transition-none mx-3 mt-3 max-w-7xl rounded-2xl border border-white/40 bg-white/55 shadow-2xl shadow-brand-midnight/10 backdrop-blur-2xl backdrop-saturate-150 dark:border-white/15 dark:bg-brand-midnight/55 dark:shadow-black/40 sm:mx-auto';
  const menuIcon = menuButton?.querySelector('svg')?.cloneNode(true);
  let menuOpen = false;
  let headerScrolled = false;

  function updateHeader() {
    if (!headerShell) return;
    headerScrolled = headerScrolled ? window.scrollY > 8 : window.scrollY > 48;
    const floating = headerScrolled && !menuOpen;
    headerShell.className = floating ? floatingHeaderClass : initialHeaderClass;
    for (const decoration of headerShell.querySelectorAll(':scope > [aria-hidden="true"]')) {
      decoration.classList.toggle('opacity-0', !floating);
      decoration.classList.toggle('opacity-100', floating);
    }
  }

  function setMenu(open, restoreFocus = false) {
    if (!mobileMenu || !menuButton) return;
    menuOpen = open && !desktopQuery.matches;
    menuButton.setAttribute('aria-expanded', String(menuOpen));
    menuButton.setAttribute('aria-label', menuOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    mobileMenu.classList.toggle('hidden', !menuOpen);
    mobileMenu.classList.toggle('block', menuOpen);
    document.documentElement.classList.toggle('mylegal-menu-open', menuOpen);
    const svg = menuButton.querySelector('svg');
    if (svg && menuIcon) {
      if (menuOpen) {
        const cross = menuIcon.cloneNode(false);
        cross.setAttribute('class', 'lucide lucide-x size-5');
        for (const d of ['M18 6 6 18', 'm6 6 12 12']) {
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', d);
          cross.append(path);
        }
        svg.replaceWith(cross);
      } else svg.replaceWith(menuIcon.cloneNode(true));
    }
    updateHeader();
    if (restoreFocus) menuButton.focus();
  }

  menuButton?.addEventListener('click', () => setMenu(!menuOpen));
  mobileMenu?.addEventListener('click', event => {
    if (event.target.closest('a[href]')) setMenu(false);
  });
  desktopQuery.addEventListener('change', () => {
    if (desktopQuery.matches) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuOpen) setMenu(false, true);
  });
  document.addEventListener('click', event => {
    // The menu toggle replaces its SVG during this click. The original event
    // path still identifies that detached SVG as a click within the header.
    if (menuOpen && !event.composedPath().includes(header)) setMenu(false);
  });

  // The reference has one desktop dropdown, separate from the mobile links.
  const dropdownButton = header?.querySelector('nav[aria-label="Navigation principale"] button[aria-haspopup="true"]');
  if (dropdownButton) {
    const group = dropdownButton.parentElement;
    const dropdown = dropdownButton.nextElementSibling;
    const chevron = dropdownButton.querySelector('svg');
    let dropdownOpen = false;
    let leaveTimer;
    function setDropdown(open) {
      clearTimeout(leaveTimer);
      dropdownOpen = open;
      dropdownButton.setAttribute('aria-expanded', String(open));
      dropdown.setAttribute('aria-hidden', String(!open));
      dropdown.inert = !open;
      for (const cls of ['pointer-events-none', '-translate-y-1', 'opacity-0']) dropdown.classList.toggle(cls, !open);
      for (const cls of ['translate-y-0', 'opacity-100']) dropdown.classList.toggle(cls, open);
      chevron?.classList.toggle('rotate-180', open);
    }
    setDropdown(false);
    group.addEventListener('mouseenter', () => setDropdown(true));
    group.addEventListener('mouseleave', () => {
      leaveTimer = setTimeout(() => {
        if (!group.contains(document.activeElement)) setDropdown(false);
      }, 120);
    });
    // Pointer entry may already have opened the panel immediately before the
    // click. Keep that first click open; keyboard activation remains a toggle.
    dropdownButton.addEventListener('click', event => setDropdown(event.detail > 0 ? true : !dropdownOpen));
    dropdownButton.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setDropdown(true);
        dropdown.querySelector('a')?.focus();
      }
    });
    group.addEventListener('focusout', event => {
      if (!group.contains(event.relatedTarget)) setDropdown(false);
    });
    document.addEventListener('mousedown', event => {
      if (!event.composedPath().includes(group)) setDropdown(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && dropdownOpen) {
        setDropdown(false);
        dropdownButton.focus();
      }
    });
  }

  const iconPaths = {
    MailOpen: ['M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z', 'm22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10'],
    FileSignature: ['M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z', 'M14.487 7.858A1 1 0 0 1 14 7V2', 'M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516', 'M8 18h1'],
    ScanLine: ['M3 7V5a2 2 0 0 1 2-2h2', 'M17 3h2a2 2 0 0 1 2 2v2', 'M21 17v2a2 2 0 0 1-2 2h-2', 'M7 21H5a2 2 0 0 1-2-2v-2', 'M7 12h10'],
    UserCheck: ['m16 11 2 2 4-4', 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'],
    TrendingUp: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17']
  };
  function makeIcon(name) {
    const kebab = name.replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase();
    const existing = document.querySelector(`svg.lucide-${kebab}`);
    if (existing) {
      const icon = existing.cloneNode(true);
      icon.setAttribute('class', `lucide lucide-${kebab} size-5`);
      icon.setAttribute('stroke-width', '1.75');
      return icon;
    }
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    for (const [name, value] of Object.entries({width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.75', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', class: `lucide lucide-${kebab} size-5`, 'aria-hidden': 'true'})) icon.setAttribute(name, value);
    for (const d of iconPaths[name] || []) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      icon.append(path);
    }
    if (name === 'UserCheck') {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      for (const [name, value] of Object.entries({cx: '9', cy: '7', r: '4'})) circle.setAttribute(name, value);
      icon.append(circle);
    }
    return icon;
  }

  // Clone the sanitized server-rendered panel, preserving all reference layout
  // classes and its extracted image positioning styles.
  const firstPanel = document.getElementById('tab-panel-creation');
  const tabList = document.getElementById('tab-creation')?.closest('[role="tablist"]');
  if (firstPanel && tabList) {
    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
    const activeClass = tabs[0].className;
    const inactiveClass = tabs[1].className;
    const panelTemplate = firstPanel.cloneNode(true);
    const panels = new Map([['creation', firstPanel]]);
    let previousPanel = firstPanel;
    for (const content of tabContent.slice(1)) {
      const panel = panelTemplate.cloneNode(true);
      panel.id = `tab-panel-${content.id}`;
      panel.setAttribute('aria-labelledby', `tab-${content.id}`);
      panel.hidden = true;
      panel.querySelector('h3').textContent = content.heading;
      const bullets = Array.from(panel.querySelectorAll('ul > li'));
      content.bullets.forEach((bullet, index) => {
        const item = bullets[index];
        item.querySelector('span').replaceChildren(makeIcon(bullet.icon));
        const paragraphs = item.querySelectorAll('p');
        paragraphs[0].textContent = bullet.title;
        paragraphs[1].textContent = bullet.description;
      });
      const cta = panel.querySelector('a');
      cta.href = content.cta.href;
      cta.removeAttribute('target');
      cta.removeAttribute('rel');
      const arrow = cta.querySelector('svg').cloneNode(true);
      cta.replaceChildren(document.createTextNode(content.cta.label), arrow);
      const photo = panel.querySelector('img');
      photo.removeAttribute('srcset');
      photo.removeAttribute('sizes');
      photo.src = content.image.src;
      photo.alt = content.image.alt;
      previousPanel.after(panel);
      previousPanel = panel;
      panels.set(content.id, panel);
    }
    function activateTab(tab, focus = false) {
      for (const button of tabs) {
        const active = button === tab;
        button.className = active ? activeClass : inactiveClass;
        button.setAttribute('aria-selected', String(active));
        button.tabIndex = active ? 0 : -1;
        const panel = panels.get(button.id.replace(/^tab-/, ''));
        if (panel) panel.hidden = !active;
      }
      if (focus) tab.focus();
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          activateTab(tabs[next], true);
        }
      });
    });
    activateTab(tabs[0]);
  }

  const backToTop = document.querySelector('button[aria-label="Retour en haut"]');
  function updateScrollControls() {
    updateHeader();
    if (!backToTop) return;
    const visible = window.scrollY > 400;
    for (const cls of ['pointer-events-none', 'translate-y-2', 'opacity-0']) backToTop.classList.toggle(cls, !visible);
    for (const cls of ['translate-y-0', 'opacity-100']) backToTop.classList.toggle(cls, visible);
    backToTop.tabIndex = visible ? 0 : -1;
    backToTop.setAttribute('aria-hidden', String(!visible));
  }
  backToTop?.addEventListener('click', () => window.scrollTo({top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth'}));
  let scrollFrame;
  window.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = undefined;
      updateScrollControls();
    });
  }, {passive: true});
  updateScrollControls();
})();
