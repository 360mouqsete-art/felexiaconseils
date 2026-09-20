const languageNames = {fr: 'Français', en: 'English', ar: 'العربية'};
const copy = {
  fr: {languages: 'Choisir la langue', section: 'rubrique disponible', dark: 'Mode sombre', toggle: 'Activer le mode sombre'},
  en: {languages: 'Choose your language', section: 'available section', dark: 'Dark mode', toggle: 'Enable dark mode'},
  ar: {languages: 'اختيار اللغة', section: 'القسم المتوفر', dark: 'الوضع الداكن', toggle: 'تفعيل الوضع الداكن'}
};
const pathFor = (language, slug) => `/${language}/${slug ? `${slug}/` : ''}`;
const sectionFor = slug => slug.startsWith('guides/') ? 'guides' : ({
  'mentions-legales': 'legal', 'politique-confidentialite': 'privacy', cgu: 'terms',
  'tarif/creation': 'offres', 'tarif/domiciliation': 'offres', domiciliation: 'services',
  'espace-client': 'support', 'rejoignez-nous': 'contact'
}[slug] || '');

export function languageSwitch(language, slug = '', knownPaths) {
  const t = copy[language];
  return `<nav class="felexia-language-switch language" aria-label="${t.languages}" data-language-switch>${Object.entries(languageNames).map(([targetLanguage, name]) => {
    const exact = pathFor(targetLanguage, slug);
    const equivalent = !knownPaths || knownPaths.has(exact);
    let href = equivalent ? exact : pathFor(targetLanguage, sectionFor(slug));
    if (knownPaths && !knownPaths.has(href)) href = pathFor(targetLanguage, '');
    return `<a href="${href}" lang="${targetLanguage}" hreflang="${targetLanguage}" data-language-target="${equivalent ? 'equivalent' : 'section'}" aria-label="${name}${equivalent ? '' : ` — ${t.section}`}" title="${name}${equivalent ? '' : ` — ${t.section}`}"${targetLanguage === language ? ' aria-current="true"' : ''}>${targetLanguage === 'ar' ? 'العربية' : targetLanguage.toUpperCase()}</a>`;
  }).join('')}</nav>`;
}

export function headerTools(language, slug = '', knownPaths) {
  const t = copy[language];
  return `<div class="felexia-header-tools">${languageSwitch(language, slug, knownPaths)}<button type="button" class="felexia-theme-toggle" data-theme-toggle aria-label="${t.toggle}" aria-pressed="false"><svg data-theme-icon="moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.9 13.2A9 9 0 0 1 10.8 3.1 9 9 0 1 0 20.9 13.2Z"/></svg><svg data-theme-icon="sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" hidden><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg><span data-theme-label>${t.dark}</span></button></div>`;
}

export function simplifiedLogo({footer = false} = {}) {
  return `<span class="felexia-logo"${footer ? ' data-logo-context="footer"' : ''}><img class="felexia-logo-mark" src="/assets/logo-simple-mark.svg" width="74" height="54" alt="Felexia Conseils"><span class="felexia-logo-wordmark" aria-hidden="true"><strong>FELEXIA</strong><span>CONSEILS</span></span></span>`;
}
