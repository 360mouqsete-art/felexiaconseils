import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { load } from 'cheerio';

const root = new URL('../', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('reference/mylegal/pages-manifest.json', root), 'utf8'));
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory()
    ? walk(new URL(`${entry.name}/`, directory))
    : new URL(entry.name, directory)))).flat();
}
const files = (await walk(new URL('dist/', root))).filter(file => file.pathname.endsWith('.html'));
const documents = new Map();
for (const file of files) {
  const relative = file.pathname.slice(new URL('dist/', root).pathname.length);
  const html = await readFile(file, 'utf8');
  documents.set(`/${relative}`, { file, relative, html, $: load(html) });
}
const french = [...documents.values()].filter(document => document.relative.startsWith('fr/'));
const localPath = route => `/fr${route === '/' ? '/' : `${route.replace(/\/$/, '')}/`}`;
const sourceHost = /\b(?:[a-z0-9-]+\.)*mylegal\.ma\b/i;
function decoded(value) {
  let result = String(value);
  for (let pass = 0; pass < 4; pass++) {
    try { const next = decodeURIComponent(result); if (next === result) break; result = next; }
    catch {
      const next = result.replace(/(?:%[0-9a-f]{2})+/gi, sequence => {
        try { return decodeURIComponent(sequence); } catch { return sequence; }
      });
      if (next === result) break;
      result = next;
    }
  }
  return result;
}

test('every imported page exists locally with its own canonical URL', () => {
  for (const { route } of manifest.pages) {
    const path = localPath(route);
    const document = documents.get(`${path}index.html`);
    assert.ok(document, `Missing imported page: ${path}`);
    const { $ } = document;
    assert.equal($('main h1').length, 1, `${path}: one page heading`);
    assert.equal(new URL($('link[rel="canonical"]').attr('href')).pathname, path);
  }
});

test('published URLs and executable assets never send visitors to MyLegal', async () => {
  const assets = new Set();
  for (const { relative, $ } of documents.values()) {
    $('*').each((_, element) => {
      for (const name of ['href', 'src', 'action', 'formaction', 'poster', 'data-src', 'style']) {
        const value = $(element).attr(name);
        if (value) assert.equal(sourceHost.test(decoded(value)), false, `${relative}: ${name}=${value}`);
      }
    });
    $('script[src],link[rel="stylesheet"]').each((_, element) => {
      const value = $(element).attr('src') || $(element).attr('href');
      if (value.startsWith('/')) assets.add(value.split(/[?#]/)[0]);
    });
    $('script:not([src])').each((_, element) => {
      assert.equal(sourceHost.test(decoded($(element).html())), false, `${relative}: inline script URL`);
    });
    assert.equal($('iframe').length, 0, `${relative}: source iframe must not be embedded`);
  }
  for (const path of assets) {
    const script = await readFile(new URL(`dist${path}`, root), 'utf8');
    assert.equal(sourceHost.test(decoded(script)), false, `Executable/style asset: ${path}`);
  }
});

test('every language displays the simplified Felexia header and footer logo', () => {
  for (const { relative, $ } of documents.values()) {
    if(!/^(fr|en|ar)\//.test(relative))continue;
    for (const position of ['header', 'footer']) {
      const logo = $(`${position} img`).first();
      assert.equal(logo.attr('src'), '/assets/logo-simple-mark.svg', `${relative}: ${position} logo`);
      assert.match(logo.attr('alt'), /Felexia Conseils/);
      assert.equal($(`${position} .felexia-logo-wordmark strong`).text(),'FELEXIA',`${relative}: readable ${position} wordmark`);
    }
    assert.equal($('img').filter((_, image) => /mylegal-logo/.test($(image).attr('src'))).length, 0);
  }
});

test('header language controls retain the exact page in every language', () => {
  for(const {relative,$} of documents.values()) {
    if(!/^(fr|en|ar)\//.test(relative))continue;
    const language=$('html').attr('lang');
    const controls=$('header [data-language-switch]');
    assert.equal(controls.length,1,`${relative}: one visible language group`);
    assert.equal(controls.closest('#mobile-menu,#navigation').length,0,`${relative}: language choice outside collapsed menus`);
    assert.equal(controls.find('a').length,3,`${relative}: FR, EN and AR`);
    assert.equal(controls.find('[aria-current="true"]').attr('lang'),language);
    controls.find('a').each((_,anchor)=>{
      const path=$(anchor).attr('href'), target=documents.get(`${path}index.html`);
      assert.ok(target,`${relative}: real target ${path}`);
      assert.equal(target.$('html').attr('lang'),$(anchor).attr('lang'));
      if($(anchor).attr('lang')==='ar')assert.equal(target.$('html').attr('dir'),'rtl');
      assert.equal($(anchor).attr('data-language-target'),'equivalent',`${relative}: all pages have a translated equivalent`);
      if($(anchor).attr('data-language-target')==='equivalent')assert.equal(path.slice(4),`/${relative}`.slice(4).replace(/index\.html$/,''),`${relative}: equivalent page retained`);
    });
    assert.equal($('header [data-theme-toggle]').length,1,`${relative}: theme toggle`);
    assert.ok($('script[src^="/theme.js"]:not([defer])').length,`${relative}: theme restored before rendering`);
  }
  const guide=documents.get('/fr/guides/page/2/index.html');
  assert.equal(guide.$('header a[lang="en"]').attr('href'),'/en/guides/page/2/');
  assert.equal(guide.$('header a[lang="en"]').attr('data-language-target'),'equivalent');
});

test('domiciliation has real English and Arabic content and keeps the selected page across languages', () => {
  for(const language of ['fr','en','ar']) {
    const document=documents.get(`/${language}/domiciliation/index.html`);
    assert.ok(document,`${language}: domiciliation page exists`);
    const {$}=document;
    for(const targetLanguage of ['fr','en','ar']) {
      const choice=$(`header [data-language-switch] a[lang="${targetLanguage}"]`);
      assert.equal(choice.attr('href'),`/${targetLanguage}/domiciliation/`);
      assert.equal(choice.attr('data-language-target'),'equivalent');
    }
    if(language==='fr')continue;
    assert.match($('main h1').text(),language==='en'?/domiciliation|registered office/i:/توطين|مقر/);
    assert.equal($('main details').length,5,`${language}: same questions and answers as French`);
    assert.equal($('main .felexia-office-photo,main .felexia-combo-photo').length,4,`${language}: same uncropped illustrations as French`);
    assert.ok($(`main a[href="/${language}/create/"]`).length);
    assert.ok($('link[href^="/mylegal/site.css"]').length);
  }
});

test('all French pages share their template, photographs and navigation with EN and AR', () => {
  for(const source of french) {
    for(const language of ['en','ar']) {
      const target=documents.get('/'+source.relative.replace(/^fr\//,language+'/'));
      assert.ok(target,`${source.relative}: ${language} equivalent`);
      assert.deepEqual(target.$('header a[href]').map((_,e)=>target.$(e).attr('href').replace(/^\/(fr|en|ar)\//,'/locale/')).get(),source.$('header a[href]').map((_,e)=>source.$(e).attr('href').replace(/^\/(fr|en|ar)\//,'/locale/')).get(),`${source.relative}: identical header navigation`);
      assert.deepEqual(target.$('main img[src]').map((_,e)=>target.$(e).attr('src')).get(),source.$('main img[src]').map((_,e)=>source.$(e).attr('src')).get(),`${source.relative}: identical photographs`);
      const mainStructure=document=>document.$('main').find('section,article,aside,h1,h2,h3,details,form').map((_,e)=>e.tagName+':'+(document.$(e).attr('class')||'')).get();
      assert.deepEqual(mainStructure(target),mainStructure(source),`${source.relative}: identical page sections and components`);
      assert.ok(target.$('[data-primary-navigation]').length,`${source.relative}: uses the current French navigation system`);
      assert.equal(target.$('header.header').length,0,`${source.relative}: no old navigation shell`);
    }
  }
});

test('rendered pages and active scripts use the new Felexia office illustrations', async () => {
  // These files were visually inspected: some show MyLegal signage or the
  // former Oasis building; others are the neutral replacements being retired.
  const formerOffices = /(?:2026-01-photo-bureau-ext-3|fe7006bc400d|office-neutral|10f7722574f2|3d66811e79df|2026-02-Artboar(?:d-1-coxpy-6|xd-1(?:-copy-5)?)-scaled)\.(?:jpe?g|webp)|\/mylegal\/images\/static\/felexia-office\.jpg/i;
  const activeScripts = new Set();
  const published = [];
  for (const { relative, $, html } of documents.values()) {
    assert.equal(formerOffices.test(decoded(html)), false, `${relative}: retired office image`);
    published.push(html);
    $('script[src]').each((_, script) => {
      const src = $(script).attr('src');
      if (src.startsWith('/')) activeScripts.add(src.split(/[?#]/)[0]);
    });
  }
  for (const src of activeScripts) {
    const script = await readFile(new URL(`dist${src}`, root), 'utf8');
    assert.equal(formerOffices.test(decoded(script)), false, `${src}: retired image restored by an interaction`);
    published.push(script);
  }
  const content = published.join('\n');
  for (const src of ['/mylegal/images/brand/felexia-exterior-sans-enseigne.webp', '/mylegal/images/brand/felexia-office.webp']) {
    assert.ok(content.includes(src), `New office illustration is actually used: ${src}`);
    assert.ok((await readFile(new URL(`dist${src}`, root))).byteLength > 0, `Published illustration exists: ${src}`);
  }
});

test('internal section links resolve to real targets, including guide FAQ entries', () => {
  const failures = [];
  for (const { relative, $ } of documents.values()) {
    const canonical = $('link[rel="canonical"]').attr('href') || 'https://felexiaconseils.com/';
    const origin = new URL(canonical).origin;
    $('a[href]').each((_, anchor) => {
      const href = $(anchor).attr('href');
      let target;
      try { target = new URL(href, canonical); } catch { return; }
      if (target.origin !== origin || !target.hash || target.hash === '#') return;
      const key = target.pathname.endsWith('/') ? `${target.pathname}index.html` : target.pathname;
      const destination = documents.get(key);
      if (!destination) { failures.push(`${relative}: missing page ${href}`); return; }
      const id = decoded(target.hash.slice(1));
      const found = destination.$('[id],a[name]').toArray().some(element =>
        destination.$(element).attr('id') === id || destination.$(element).attr('name') === id);
      if (!found) failures.push(`${relative}: missing section ${href}`);
    });
  }
  assert.deepEqual(failures, []);
});

test('guide pagination opens a distinct second page with a working return link', () => {
  const first = documents.get('/fr/guides/index.html');
  const second = documents.get('/fr/guides/page/2/index.html');
  assert.ok(first && second);
  const guideLinks = ({ $ }) => new Set($('main a[href]').map((_, element) => $(element).attr('href')).get()
    .filter(href => /^\/fr\/guides\/(?!page\/)[^/?#]+\/$/.test(href)));
  const firstLinks = guideLinks(first), secondLinks = guideLinks(second);
  assert.ok(firstLinks.size > 0 && secondLinks.size > 0, 'Both pages contain guide cards');
  assert.equal([...firstLinks].some(href => secondLinks.has(href)), false, 'Second page must contain different guides');
  assert.ok(first.$('main a[href="/fr/guides/page/2/"]').length > 0);
  assert.ok(second.$('main a[href="/fr/guides/"]').length > 0);
  assert.notEqual(first.$('link[rel="canonical"]').attr('href'), second.$('link[rel="canonical"]').attr('href'));
  for (const document of [first, second]) assert.equal(document.$('main a[href*="?page="]').length, 0);
});

test('contact, creation, meeting and recruitment forms use the implemented local endpoint', () => {
  for (const slug of ['contact', 'create', 'rendez-vous', 'rejoignez-nous']) {
    const document = documents.get(`/fr/${slug}/index.html`);
    const { $ } = document;
    const forms = $('main form');
    assert.equal(forms.length, 1, `${slug}: one usable form`);
    assert.equal(forms.attr('action'), '/api/contact');
    assert.equal(forms.attr('method'), 'post');
    assert.ok(forms.attr('data-form-copy'));
    for (const field of ['kind', 'locale', 'name', 'email', 'message', 'consent']) {
      assert.ok(forms.find(`[name="${field}"]`).length, `${slug}: ${field}`);
    }
    assert.equal(forms.find('[type="submit"]').length, 1);
    assert.equal(forms.find('[name^="$ACTION_"]').length, 0, `${slug}: no source server action`);
    assert.equal(forms.find('[formaction]').length, 0, `${slug}: no secondary remote form action`);
    assert.ok($('script[src^="/app.js"]').length, `${slug}: actual form interaction script`);
  }
});

test('French service and account sharing metadata describe their own pages', () => {
  for (const { relative, $ } of french) {
    if (relative === 'fr/404/index.html') continue;
    assert.equal($('meta[property="og:title"]').attr('content'), $('title').text(), relative);
    assert.equal($('meta[property="og:description"]').attr('content'), $('meta[name="description"]').attr('content'), relative);
  }
});
