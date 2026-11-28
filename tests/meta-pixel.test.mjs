import {test} from 'node:test';
import assert from 'node:assert/strict';
import {META_PIXEL_ID} from '../public/conversion-config.js';
import {loadMetaPixel, trackLead} from '../public/meta-pixel.js';

const pixelScript = /^https:\/\/connect\.facebook\.net\/en_US\/fbevents\.js$/;

function installBrowser({path = '/fr/', choice = null} = {}) {
  const scripts = [];
  const buttons = [
    {dataset:{audienceChoice:'denied'}, addEventListener(type, fn) { if (type === 'click') this.click = fn; }, focus() {}},
    {dataset:{audienceChoice:'granted'}, addEventListener(type, fn) { if (type === 'click') this.click = fn; }, focus() {}}
  ];
  const root = {
    hidden: true,
    querySelectorAll(selector) { return selector === '[data-audience-choice]' ? buttons : []; },
    querySelector() { return buttons[0]; }
  };
  const storage = choice ? {'felexia-audience-choice-v1': JSON.stringify({value: choice, at: Date.now()})} : {};
  globalThis.localStorage = {getItem(key) { return storage[key] ?? null; }, setItem(key, value) { storage[key] = String(value); }};
  globalThis.location = {hostname:'127.0.0.1', href:`http://127.0.0.1${path}`, pathname:path, reload() {}};
  globalThis.window = {addEventListener() {}, gtag() {}};
  globalThis.document = {
    cookie: '',
    documentElement: {lang: path.startsWith('/en/') ? 'en' : path.startsWith('/ar/') ? 'ar' : 'fr'},
    head: {append(node) { scripts.push(node); }},
    createElement() { return {}; },
    querySelector(selector) { return selector === '[data-analytics-consent]' ? root : null; },
    querySelectorAll() { return []; },
    addEventListener() {}
  };
  return {scripts, buttons};
}

function tracked(name) {
  return (window.fbq?.queue || []).filter(entry => entry?.[0] === 'track' && entry?.[1] === name);
}

async function loadConsent(path) {
  const url = new URL('../public/analytics.js', import.meta.url);
  url.searchParams.set('path', path);
  await import(url.href);
}

test('the configured pixel id is the Felexia Conseils dataset', () => {
  assert.equal(META_PIXEL_ID, '1290425633278453');
});

test('refusing cookies never requests Facebook, and accepting sends one PageView', async () => {
  const home = installBrowser({path:'/fr/'});
  await loadConsent('/fr/');
  assert.equal(home.scripts.length, 0);
  assert.equal(window.fbq, undefined);
  home.buttons[1].click();
  assert.equal(home.scripts.length, 1);
  assert.match(home.scripts[0].src, pixelScript);
  assert.equal(tracked('PageView').length, 1);
  assert.equal(tracked('Lead').length, 0);

  const refused = installBrowser({path:'/fr/creation-entreprise/', choice:'denied'});
  await loadConsent('/fr/creation-entreprise/');
  refused.buttons[0].click();
  assert.equal(refused.scripts.length, 0);
  assert.equal(window.fbq, undefined);
});

test('each thank-you page sends one Lead after consent and none before it', async () => {
  for (const path of ['/fr/merci/', '/en/merci/', '/ar/merci/']) {
    const waiting = installBrowser({path});
    await loadConsent(`${path}waiting`);
    const thanksWaiting = new URL('../public/thanks.js', import.meta.url);
    thanksWaiting.searchParams.set('path', `${path}waiting`);
    await import(thanksWaiting.href);
    assert.equal(waiting.scripts.length, 0, path);
    assert.equal(window.fbq, undefined, path);

    const accepted = installBrowser({path, choice:'granted'});
    const thanksAccepted = new URL('../public/thanks.js', import.meta.url);
    thanksAccepted.searchParams.set('path', path);
    await import(thanksAccepted.href);
    await loadConsent(path);
    assert.equal(accepted.scripts.length, 1, path);
    assert.match(accepted.scripts[0].src, pixelScript);
    assert.equal(accepted.scripts.some(script => /facebook\.com/.test(script.src) && !pixelScript.test(script.src)), false);
    assert.equal(tracked('PageView').length, 1, path);
    assert.equal(tracked('Lead').length, 1, path);
  }
});

test('an empty pixel id never injects a Facebook script', () => {
  installBrowser();
  assert.equal(loadMetaPixel(''), false);
  assert.equal(window.fbq, undefined);
  trackLead('');
  assert.equal(window.fbq, undefined);
});
