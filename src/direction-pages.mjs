const version = 'd-pages-3';

function motif(slug) {
  if (/domicil/.test(slug)) return 'home';
  if (/modif|gerance|capital|denomination|statut/.test(slug)) return 'gears';
  if (/tarif|offre|prix/.test(slug)) return 'quote';
  if (/contact|rendez|espace-client|rejoignez|faq|about|support/.test(slug)) return 'chat';
  if (/mre|invest|etranger|international|filiale|succursale/.test(slug)) return 'globe';
  return 'create';
}

function kindOf(slug) {
  if (!slug) return 'home';
  if (slug === 'guides' || slug.startsWith('guides/page/') || slug.startsWith('guides/theme/')) return 'hub';
  if (slug.startsWith('guides/')) return 'article';
  if (/^(mentions-legales|politique-confidentialite|cgu|legal|privacy|terms)$/.test(slug)) return 'legal';
  return 'service';
}

function scene(kind) {
  const head = `<svg class="d-page-art d-page-art-${kind}" viewBox="0 0 200 150" aria-hidden="true"><defs><linearGradient id="dp-${kind}-a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d7e6ff"/><stop offset="1" stop-color="#2446d8"/></linearGradient><linearGradient id="dp-${kind}-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#c9d8ff"/></linearGradient></defs>`;
  const scenes = {
    create: `<ellipse cx="100" cy="132" rx="58" ry="9" fill="#2446d8" opacity=".1"/><polygon points="42,42 100,22 158,42 100,62" fill="url(#dp-${kind}-b)"/><polygon points="42,42 100,62 100,108 42,88" fill="#b9ccff"/><polygon points="100,62 158,42 158,88 100,108" fill="url(#dp-${kind}-a)"/><polygon points="58,34 108,18 150,34 100,50" fill="#fff" opacity=".92"/><circle cx="142" cy="78" r="16" fill="#fff" stroke="#2446d8" stroke-width="3"/><path d="M134 78l5 5 10-11" fill="none" stroke="#2446d8" stroke-width="2.6" stroke-linecap="round"/>`,
    home: `<ellipse cx="100" cy="134" rx="54" ry="8" fill="#2446d8" opacity=".1"/><polygon points="100,18 162,50 100,82 38,50" fill="url(#dp-${kind}-b)"/><polygon points="38,50 100,82 100,122 38,90" fill="#c5d4ff"/><polygon points="100,82 162,50 162,90 100,122" fill="url(#dp-${kind}-a)"/><rect x="88" y="92" width="20" height="26" rx="2" fill="#fff"/><path class="d-key" d="M52 96h24v8H52zM44 90h14v18H44z" fill="#2446d8"/>`,
    gears: `<circle class="d-gear" cx="78" cy="70" r="36" fill="none" stroke="url(#dp-${kind}-a)" stroke-width="12" stroke-dasharray="10 8"/><circle cx="78" cy="70" r="10" fill="#2446d8"/><circle class="d-gear d-gear-b" cx="132" cy="98" r="24" fill="none" stroke="#39c3ff" stroke-width="10" stroke-dasharray="8 7"/><circle cx="132" cy="98" r="6" fill="#0e1730"/>`,
    globe: `<circle class="d-spin" cx="100" cy="72" r="48" fill="url(#dp-${kind}-a)"/><ellipse cx="100" cy="72" rx="20" ry="48" fill="none" stroke="#fff" opacity=".75"/><ellipse cx="100" cy="72" rx="48" ry="16" fill="none" stroke="#fff" opacity=".75"/><path d="M70 58c14 6 22 6 36-2 8 14 6 24-4 32-16-6-26-2-36 6-6-14-4-24 4-36z" fill="#e7f6ff" opacity=".4"/>`,
    quote: `<polygon points="40,28 140,28 156,44 156,124 40,124" fill="url(#dp-${kind}-b)"/><polygon points="140,28 156,44 140,44" fill="#2446d8"/><path d="M60 58h64M60 76h48M60 94h32" stroke="#2446d8" stroke-width="4" stroke-linecap="round"/>`,
    chat: `<rect x="32" y="28" width="136" height="82" rx="20" fill="url(#dp-${kind}-b)"/><path d="M70 110l12-16h24" fill="#d5e2ff"/><circle cx="78" cy="68" r="7" fill="#2446d8"/><circle cx="100" cy="68" r="7" fill="#39c3ff"/><circle cx="122" cy="68" r="7" fill="#2446d8"/>`
  };
  return `<div class="d-illu">${head}${scenes[kind]}</svg></div>`;
}

function placeIllustration($, hero, html) {
  const image = hero.find('img').first();
  if (!image.length) {
    hero.addClass('d-hero-solo');
    $('main h1').first().before(html);
    return;
  }
  image.attr('loading', 'lazy').removeAttr('fetchpriority');
  const frame = image.parents('div').filter((_, el) => /rounded-3xl|page-hero-photo|aspect-\[|corporate-photo/.test($(el).attr('class') || '') && !$(el).find('h1').length).last();
  if (frame.length) {
    frame.before(html);
    frame.addClass('d-stock-hidden');
  } else {
    image.before(html);
    image.addClass('d-stock-hidden');
  }
}

export function applyDirection($, _lang, file) {
  if (!/^(fr|en|ar)\/.*index\.html$/.test(file)) return;
  const slug = file.replace(/^(fr|en|ar)\//, '').replace(/index\.html$/, '').replace(/\/$/, '');
  const kind = kindOf(slug);
  $('body').addClass(`fx-d fx-d-${kind}`);
  if (kind === 'service') {
    const hero = $('main h1').first().closest('section');
    if (hero.length) {
      hero.addClass('d-service-hero');
      placeIllustration($, hero, scene(motif(slug)));
    }
    $('main > section').not('.d-service-hero').addClass('d-reveal');
  } else if (kind === 'hub') {
    const hero = $('main h1').first().closest('section');
    hero.addClass('d-hub-hero');
    $('main h1').first().before(scene('create'));
    $('main > section').not('.d-hub-hero').addClass('d-reveal');
  } else if (kind === 'article') {
    $('main article').first().addClass('d-article');
    $('main h1').first().before(scene(motif(slug)));
    $('main img.guide-cover-image').attr({loading:'lazy', decoding:'async'}).removeAttr('fetchpriority');
  }
  $('head').append(`<link rel="preload" href="/assets/fonts/font-14.woff2" as="font" type="font/woff2" crossorigin="anonymous"><link rel="stylesheet" href="/direction-d.css?v=${version}"><script src="/direction-d.js?v=${version}" defer></script>`);
}
