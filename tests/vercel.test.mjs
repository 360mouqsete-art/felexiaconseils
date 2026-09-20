import { test } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { readFile, access } from 'node:fs/promises';
import http from 'node:http';
import { createVercelContactHandler } from '../src/vercel-contact.mjs';

const valid = () => ({
  name: 'أحمد سليمان', email: 'qa@example.test', phone: '+212600000000',
  message: 'طلب اختبار محلي فقط لا يتم إرساله', kind: 'contact',
  locale: 'ar', language: 'ar', consent: 'yes', service: 'creation-entreprise',
  requestId: crypto.randomUUID(),
});

async function fixture(mode, options, check) {
  const handler = createVercelContactHandler(options);
  const server = http.createServer(async (req, res) => {
    try {
      if (mode !== 'raw') {
        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        const bytes = Buffer.concat(chunks);
        Object.defineProperty(req, 'body', { get() {
          if (mode === 'invalid') throw new SyntaxError('Invalid JSON');
          if (mode === 'buffer') return bytes;
          if (mode === 'string') return bytes.toString('utf8');
          return bytes.length ? JSON.parse(bytes.toString('utf8')) : null;
        } });
      }
      await handler(req, res);
    } catch {
      res.writeHead(500);
      res.end();
    }
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  try { await check(`http://127.0.0.1:${server.address().port}`); }
  finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
}

function post(base, payload, headers = {}) {
  return fetch(`${base}/api/contact`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', ...headers },
    body: typeof payload === 'string' ? payload : JSON.stringify(payload),
  });
}

for (const mode of ['raw', 'parsed', 'string', 'buffer']) {
  test(`Vercel ${mode} body reaches the shared handler with intact Arabic UTF-8`, async () => {
    const sent = [];
    await fixture(mode, {
      env: { CONTACT_WEBHOOK_URL: 'https://crm.example.test/contact' },
      fetcher: async (_url, options) => { sent.push(JSON.parse(options.body)); return new Response('{}'); },
    }, async base => {
      const data = valid();
      const first = await post(base, data);
      assert.equal(first.status, 200);
      const result = await first.json();
      assert.equal(result.ok, true);
      assert.equal(first.headers.get('cache-control'), 'no-store');
      assert.deepEqual(await (await post(base, data)).json(), result);
      assert.equal(sent.length, 1);
      assert.equal(sent[0].name, data.name);
      assert.equal(sent[0].message, data.message);
      assert.equal(sent[0].consent, true);
    });
  });
}

test('Vercel parsed requests retain origin, consent, method and size validation', async () => {
  await fixture('parsed', { env: {} }, async base => {
    assert.equal((await fetch(`${base}/api/contact`)).status, 405);
    assert.equal((await post(base, valid(), { Origin: 'https://untrusted.example' })).status, 403);
    assert.equal((await post(base, { ...valid(), consent: 'no' })).status, 400);
    assert.equal((await post(base, { ...valid(), message: 'x'.repeat(17000) })).status, 413);
    assert.equal((await post(base, ' '.repeat(17000) + JSON.stringify(valid()))).status, 413);
    const missing = await post(base, valid());
    assert.equal(missing.status, 503);
    assert.deepEqual(await missing.json(), { ok: false, code: 'not_configured' });
  });
});

test('Vercel malformed JSON getter and empty body return validation errors', async () => {
  await fixture('invalid', { env: {} }, async base => {
    const response = await post(base, '{');
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { ok: false, code: 'json' });
  });
  await fixture('parsed', { env: {} }, async base => {
    assert.equal((await post(base, 'null')).status, 400);
  });
});

test('Vercel preserves original routes and leaves contact POST URLs unredirected', async () => {
  const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
  assert.equal(config.framework, null);
  assert.equal(config.outputDirectory, 'dist');
  assert.equal(config.buildCommand, 'npm run build');
  assert.deepEqual(config.redirects.find(rule=>rule.source==='/'), { source: '/', destination: '/fr/', statusCode: 302 });
  assert.equal(config.trailingSlash, undefined);
  // Regex portions mirror Vercel's documented strict source matching. The root
  // and locale rules preserve the current 33 historical paths in every locale.
  const localeSource=config.redirects.find(rule=>rule.source==='/:locale(fr|en|ar)');
  const nestedSource=config.redirects.find(rule=>rule.source.includes('/:path('));
  const localeRule = new RegExp(`^/${localeSource.source.split('/:locale')[1]}$`);
  const nestedPattern = nestedSource.source.replace('/:locale', '/').replace('/:path', '/');
  const nestedRule = new RegExp(`^${nestedPattern}$`);
  for (const locale of ['fr', 'en', 'ar']) {
    for (const slug of ['', 'about', 'services', 'create', 'legal-advisory', 'modify-company', 'support', 'contact', 'legal', 'terms', 'privacy']) {
      const route = `/${locale}${slug ? `/${slug}` : ''}`;
      assert.equal((slug ? nestedRule : localeRule).test(route), true, route);
      assert.equal((slug ? nestedRule : localeRule).test(`${route}/`), false, `No loop: ${route}/`);
      await access(new URL(`../dist/${locale}/${slug ? `${slug}/` : ''}index.html`, import.meta.url));
    }
  }
  assert.equal(nestedRule.test('/fr/guides/creation-sarl'), true);
  assert.equal(nestedRule.test('/fr/guides/creation-sarl/'), false);
  assert.equal(nestedRule.test('/api/contact'), false);
  assert.equal(nestedRule.test('/fr/test.css'), false);
});

test('Vercel keeps every imported reference path inside the French site', async () => {
  const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
  const manifest = JSON.parse(await readFile(new URL('../reference/mylegal/pages-manifest.json', import.meta.url), 'utf8'));
  const redirects = config.redirects.slice(3).map(rule => ({
    ...rule,
    regex: new RegExp('^' + rule.source.replace(/:(page|plan|slug)(\([^)]*\))?/g, (_, _name, pattern) => pattern || '([^/]+)') + '$'),
  }));
  for (const { route } of manifest.pages) {
    const expected = route === '/' ? '/fr/' : `/fr${route}/`;
    if (route !== '/') for (const path of [route, `${route}/`]) {
      const rule = redirects.find(item => item.regex.test(path));
      assert.ok(rule, `Missing source route: ${path}`);
      const match = path.match(rule.regex);
      assert.equal(rule.destination.replace(/:(?:page|plan|slug)/g, match[1]), expected);
      assert.equal(rule.statusCode, 308);
    }
    await access(new URL(`../dist${expected}index.html`, import.meta.url));
    assert.equal(redirects.some(rule => rule.regex.test(expected)), false, `No redirect loop: ${expected}`);
  }
  assert.equal(redirects.some(rule => rule.regex.test('/api/contact')), false);
});
