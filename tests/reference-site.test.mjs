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

test('every French page displays the authentic Felexia header and footer logo', () => {
  for (const { relative, $ } of french) {
    for (const position of ['header', 'footer']) {
      const logo = $(`${position} img`).first();
      assert.equal(logo.attr('src'), '/assets/logo-original.png', `${relative}: ${position} logo`);
      assert.match(logo.attr('alt'), /Felexia Conseils/);
    }
    assert.equal($('img').filter((_, image) => /mylegal-logo/.test($(image).attr('src'))).length, 0);
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
