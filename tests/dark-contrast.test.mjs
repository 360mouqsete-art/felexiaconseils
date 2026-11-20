import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {existsSync} from 'node:fs';
import {setTimeout as wait} from 'node:timers/promises';

const chromeBin = ['/usr/bin/google-chrome-stable', '/usr/bin/google-chrome'].find(path => existsSync(path));

function luminance([r, g, b]) {
  const channel = value => {
    const scaled = value / 255;
    return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

test('midnight surfaces keep WCAG AA text on the main pages', {skip: chromeBin ? false : 'Chrome is not installed'}, async () => {
  const port = 4217;
  const server = spawn(process.execPath, ['server.mjs'], {env:{...process.env, PORT:String(port)}, stdio:'ignore'});
  const profile = `/tmp/chrome-contrast-${Date.now()}`;
    const chrome = spawn(chromeBin, ['--headless=new','--no-sandbox','--disable-gpu','--no-first-run','--remote-debugging-port=9522',`--user-data-dir=${profile}`,'about:blank'], {stdio:'ignore'});
  try {
    await wait(400);
    let wsUrl;
    for (let attempt = 0; attempt < 40 && !wsUrl; attempt++) {
      try { wsUrl = (await fetch('http://127.0.0.1:9522/json/version').then(response => response.json())).webSocketDebuggerUrl; } catch { await wait(100); }
    }
    assert.ok(wsUrl, 'Chrome debugger did not start');
    const ws = new WebSocket(wsUrl);
    let seq = 0; const pending = new Map();
    await new Promise(resolve => ws.addEventListener('open', resolve));
    ws.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      if (message.id && pending.has(message.id)) {
        const {resolve, reject} = pending.get(message.id);
        pending.delete(message.id);
        message.error ? reject(new Error(JSON.stringify(message.error))) : resolve(message.result || {});
      }
    });
    const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
      const id = ++seq; pending.set(id, {resolve, reject});
      ws.send(JSON.stringify({id, method, params, sessionId}));
    });
    const failures = [];
    const pages = [
      ['/fr/','light',390],['/fr/','dark',390],['/fr/','dark',1280],
      ['/en/','dark',390],['/ar/','dark',390],
      ['/fr/creation-entreprise/','light',390],['/fr/creation-entreprise/','dark',390],['/fr/creation-entreprise/','dark',1280],
      ['/fr/domiciliation/','dark',390],['/fr/tarif/creation/','dark',390],
      ['/fr/guides/creer-une-sarl-maroc/','dark',390],['/fr/guides/creer-une-sarl-maroc/','dark',1280],
      ['/fr/guides/','dark',390],['/fr/contact/','dark',390],['/fr/espace-client/','dark',390]
    ];
    for (const [path, theme, width] of pages) {
      const {targetId} = await send('Target.createTarget', {url:'about:blank'});
      const {sessionId} = await send('Target.attachToTarget', {targetId, flatten:true});
      const call = (method, params) => send(method, params, sessionId);
      await call('Page.enable');
      await call('Emulation.setDeviceMetricsOverride', {width, height: width < 500 ? 844 : 900, deviceScaleFactor:1, mobile: width < 500});
      await call('Page.addScriptToEvaluateOnNewDocument', {source:`try{localStorage.setItem('felexia-theme','${theme}');}catch(e){}`});
      await call('Page.navigate', {url:`http://127.0.0.1:${port}${path}`});
      await wait(700);
      const result = await call('Runtime.evaluate', {returnByValue:true, expression:`(() => {
        const surface = document.createElement('canvas');
        surface.width = 1; surface.height = 1;
        const ctx = surface.getContext('2d', {willReadFrequently:true});
        const pixel = (value, base) => {
          ctx.clearRect(0, 0, 1, 1);
          ctx.fillStyle = 'rgb(' + base.join(',') + ')';
          ctx.fillRect(0, 0, 1, 1);
          ctx.fillStyle = value;
          ctx.fillRect(0, 0, 1, 1);
          return [...ctx.getImageData(0, 0, 1, 1).data];
        };
        const toRgb = value => {
          const overBlack = pixel(value, [0, 0, 0]);
          const overWhite = pixel(value, [255, 255, 255]);
          const alpha = 1 - (overWhite[0] - overBlack[0]) / 255;
          return {rgb: overBlack.slice(0, 3), alpha};
        };
        const painted = node => {
          let el = node;
          while (el) {
            const style = getComputedStyle(el);
            const stops = style.backgroundImage.includes('linear-gradient') ? [...style.backgroundImage.matchAll(/rgba?\\([^)]+\\)/g)].map(match => toRgb(match[0]).rgb) : [];
            if (stops.length) return stops;
            const paint = toRgb(style.backgroundColor);
            if (paint.alpha > 0.85) return [paint.rgb];
            el = el.parentElement;
          }
          return [[9, 21, 43]];
        };
        const out = [];
        const dark = document.documentElement.dataset.theme === 'dark';
        const nodes = dark
          ? document.querySelectorAll('main h1, main h2, main h3, main p, main a, main button, footer h2, footer h3, footer a, footer p, .d-grad, .d-kicker, .d-lead, .d-primary, .d-quiet')
          : document.querySelectorAll('.bg-brand-midnight h1, .bg-brand-midnight h2, .bg-brand-midnight h3, .bg-brand-midnight h4, .bg-brand-midnight p, .bg-brand-midnight a, .bg-brand-midnight button');
        for (const node of nodes) {
          const style = getComputedStyle(node);
          const text = node.textContent.trim().replace(/\\s+/g, ' ');
          if (!text || style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0 || !node.getClientRects().length) continue;
          if (node.closest('[hidden], .audience-consent')) continue;
          const size = parseFloat(style.fontSize);
          const bold = parseInt(style.fontWeight, 10) >= 600;
          for (const background of painted(node)) {
            const color = pixel(style.color, background).slice(0, 3);
            out.push({text: text.slice(0, 48), color, background, large: size >= 24 || (size >= 18.66 && bold)});
          }
        }
        return out;
      })()`});
      for (const item of result.result.value) {
        if (!item.color || item.color.length < 3 || !item.background || item.background.length < 3) continue;
        const [lighter, darker] = [luminance(item.color), luminance(item.background)].sort((a, b) => b - a);
        const ratio = (lighter + 0.05) / (darker + 0.05);
        if (ratio < (item.large ? 3 : 4.5)) failures.push(`${path} ${theme} ${width}: ${ratio.toFixed(2)} “${item.text}”`);
      }
      await send('Target.closeTarget', {targetId});
    }
    ws.close();
    assert.deepEqual(failures, []);
  } finally {
    chrome.kill();
    server.kill();
  }
});
