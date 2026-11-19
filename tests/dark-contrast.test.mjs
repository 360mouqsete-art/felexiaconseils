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
  const port = 4191;
  const server = spawn(process.execPath, ['server.mjs'], {env:{...process.env, PORT:String(port)}, stdio:'ignore'});
  const profile = `/tmp/chrome-contrast-${Date.now()}`;
  const chrome = spawn(chromeBin, ['--headless=new','--no-sandbox','--disable-gpu','--no-first-run',`--remote-debugging-port=9511`,`--user-data-dir=${profile}`,'about:blank'], {stdio:'ignore'});
  try {
    await wait(400);
    let wsUrl;
    for (let attempt = 0; attempt < 40 && !wsUrl; attempt++) {
      try { wsUrl = (await fetch('http://127.0.0.1:9511/json/version').then(response => response.json())).webSocketDebuggerUrl; } catch { await wait(100); }
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
    for (const [path, theme] of [['/fr/','light'],['/fr/','dark'],['/en/','light'],['/ar/','light'],['/fr/creation-entreprise/','light'],['/fr/domiciliation/','light'],['/fr/tarif/creation/','light']]) {
      const {targetId} = await send('Target.createTarget', {url:'about:blank'});
      const {sessionId} = await send('Target.attachToTarget', {targetId, flatten:true});
      const call = (method, params) => send(method, params, sessionId);
      await call('Page.enable');
      await call('Emulation.setDeviceMetricsOverride', {width:390, height:844, deviceScaleFactor:1, mobile:true});
      await call('Page.addScriptToEvaluateOnNewDocument', {source:`try{localStorage.setItem('felexia-theme','${theme}');}catch(e){}`});
      await call('Page.navigate', {url:`http://127.0.0.1:${port}${path}`});
      await wait(700);
      const result = await call('Runtime.evaluate', {returnByValue:true, expression:`(() => {
        const parse = value => (value.match(/\\d+(?:\\.\\d+)?/g) || []).slice(0,3).map(Number);
        const out = [];
        for (const surface of document.querySelectorAll('.bg-brand-midnight')) {
          const base = parse(getComputedStyle(surface).backgroundColor);
          if (base.length < 3) continue;
          for (const node of surface.querySelectorAll('h1,h2,h3,h4,p,a,button')) {
            const style = getComputedStyle(node);
            if (style.display === 'none' || style.visibility === 'hidden' || !node.textContent.trim()) continue;
            const size = parseFloat(style.fontSize);
            const bold = parseInt(style.fontWeight, 10) >= 600;
            out.push({text: node.textContent.trim().slice(0, 48), color: parse(style.color), background: parse(style.backgroundColor).length === 3 && style.backgroundColor !== 'rgba(0, 0, 0, 0)' ? parse(style.backgroundColor) : base, large: size >= 24 || (size >= 18.66 && bold)});
          }
        }
        return out;
      })()`});
      for (const item of result.result.value) {
        const [lighter, darker] = [luminance(item.color), luminance(item.background)].sort((a, b) => b - a);
        const ratio = (lighter + 0.05) / (darker + 0.05);
        if (ratio < (item.large ? 3 : 4.5)) failures.push(`${path} ${theme}: ${ratio.toFixed(2)} “${item.text}”`);
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
