/* Public guide interactions. All copied links stay on the current Felexia site. */
(() => {
  'use strict';
  const language = document.documentElement.lang || 'fr';
  const copy = window.FelexiaInteractionCopy?.[language] || window.FelexiaInteractionCopy.fr;
  const pageUrl = new URL(window.location.pathname, window.location.origin).href;
  function revealSection() {
    let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
    if(!id)return;
    const target=document.getElementById(id);
    const details=target?.closest('details');
    if(details)details.open=true;
  }
  revealSection();
  window.addEventListener('hashchange',revealSection);
  const shares = [
    ['linkedin', 'https://www.linkedin.com/sharing/share-offsite/', 'url'],
    ['x', 'https://x.com/intent/tweet', 'url'],
    ['facebook', 'https://www.facebook.com/sharer/sharer.php', 'u']
  ];
  for (const [label, endpoint, parameter] of shares) {
    for (const anchor of document.querySelectorAll(`main a[data-share-guide="${label}"]`)) {
      const share = new URL(endpoint);
      share.searchParams.set(parameter, pageUrl);
      if (label === 'x') share.searchParams.set('text', document.querySelector('main h1')?.textContent.trim() || document.title);
      anchor.href = share.href;
    }
  }
  const copyButtons = document.querySelectorAll('main button[data-copy-guide]');
  if (!copyButtons.length) return;
  const status = document.createElement('p');
  status.className = 'sr-only';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  document.body.append(status);

  for (const button of copyButtons) {
    let restoreTimer;
    let manualCopy;
    const originalLabel = button.getAttribute('aria-label');
    const originalContents = Array.from(button.childNodes, node => node.cloneNode(true));
    button.addEventListener('click', async () => {
      const url = pageUrl;
      clearTimeout(restoreTimer);
      manualCopy?.remove();
      manualCopy = undefined;
      try {
        if (!navigator.clipboard?.writeText) throw new Error('clipboard_unavailable');
        await navigator.clipboard.writeText(url);
        const check = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        for (const [key, value] of Object.entries({ width: '16', height: '16', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'aria-hidden': 'true' })) check.setAttribute(key, value);
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'm5 12 4 4L19 6');
        check.append(path);
        button.replaceChildren(check);
        button.setAttribute('aria-label', copy.copied);
        button.setAttribute('title', copy.copied);
        status.textContent = copy.copySuccess;
        restoreTimer = setTimeout(() => {
          button.replaceChildren(...originalContents.map(node => node.cloneNode(true)));
          button.setAttribute('aria-label', originalLabel);
          button.removeAttribute('title');
        }, 3500);
      } catch {
        manualCopy = document.createElement('input');
        manualCopy.type = 'text';
        manualCopy.readOnly = true;
        manualCopy.value = url;
        manualCopy.setAttribute('aria-label', copy.copyField);
        manualCopy.className = 'block w-full rounded-lg border border-brand-pale bg-white px-3 py-2 text-sm text-brand-midnight';
        button.parentElement.after(manualCopy);
        manualCopy.focus();
        manualCopy.select();
        status.textContent = copy.copyFallback;
      }
    });
  }
})();
