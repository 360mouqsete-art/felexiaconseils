// Public reference capture for the site owner's requested Felexia migration.
// Downloads documents/media only; never executes remote JavaScript.
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const origin = 'https://mylegal.ma';
const reference = 'reference/mylegal';
const pageDirectory = `${reference}/pages`;
await mkdir(pageDirectory, { recursive: true });
const existing = JSON.parse(await readFile(`${reference}/assets.json`, 'utf8'));
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>');
const textContent = value => decode(value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
const hash = value => createHash('sha256').update(value).digest('hex').slice(0, 12);
const filesExist = async value => { try { await access(value); return true; } catch { return false; } };
const get = async url => {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 FelexiaReferenceCapture/1.0' }, signal: AbortSignal.timeout(45000) });
      if (response.status >= 500 && attempt < 2) continue;
      return response;
    } catch (error) { if (attempt === 2) throw error; }
  }
};
const robots = await (await get(`${origin}/robots.txt`)).text();
const sitemap = await (await get(`${origin}/sitemap.xml`)).text();
await writeFile(`${reference}/robots.txt`, robots);
await writeFile(`${reference}/sitemap.xml`, sitemap);
const cleanRoute = value => {
  try {
    const url = new URL(decode(value), origin);
    if (url.origin !== origin || /^\/(?:admin|api|_next)(?:\/|$)/.test(url.pathname)) return null;
    if (/\.[a-z0-9]{2,6}$/i.test(url.pathname)) return null;
    if (url.pathname.startsWith('/apple-icon')) return null;
    return url.pathname.replace(/\/$/, '') || '/';
  } catch { return null; }
};
const queue = [...new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => cleanRoute(m[1])).filter(Boolean))];
const visited = new Set();
const pages = [];
const resourceRefs = new Map();
const externalLinks = new Set();
const recordResource = (raw, route, type) => {
  if (!raw || /^(?:data:|blob:|#)/.test(raw)) return;
  let url;
  try { url = new URL(decode(raw), origin); } catch { return; }
  if (!['http:', 'https:'].includes(url.protocol)) return;
  const resource = resourceRefs.get(url.href) || { source: url.href, references: [], types: [] };
  if (!resource.references.includes(route)) resource.references.push(route);
  if (!resource.types.includes(type)) resource.types.push(type);
  resourceRefs.set(url.href, resource);
};
const attr = (tag, key) => decode(new RegExp(`\\b${key}=["']([^"']+)["']`, 'i').exec(tag)?.[1] || '');

while (queue.length && visited.size < 100) {
  const batch = queue.splice(0, 4).filter(route => !visited.has(route));
  batch.forEach(route => visited.add(route));
  const outcomes = await Promise.all(batch.map(async route => {
    try {
      const response = await get(origin + route);
      const html = await response.text();
      const file = `${pageDirectory}/${route === '/' ? 'index' : route.slice(1).replaceAll('/', '__')}.html`;
      await writeFile(file, html);
      const links = [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)].map(match => ({ href: decode(match[1]), text: textContent(match[2]) }));
      for (const link of links) {
        const linkedRoute = cleanRoute(link.href);
        if (linkedRoute && !visited.has(linkedRoute) && !queue.includes(linkedRoute)) queue.push(linkedRoute);
        if (/^https?:/.test(link.href) && !link.href.startsWith(origin)) externalLinks.add(link.href);
      }
      for (const match of html.matchAll(/<(?:img|source|video|audio|link)\b[^>]*>/gi)) {
        const tag = match[0];
        if (/^<link/i.test(tag)) {
          if (/\brel="stylesheet"|\bas="font"|\brel="(?:icon|apple-touch-icon)"/i.test(tag)) recordResource(attr(tag, 'href'), route, /stylesheet/.test(tag) ? 'stylesheet' : /as="font"/.test(tag) ? 'font' : 'icon');
        } else {
          recordResource(attr(tag, 'src'), route, 'image');
          recordResource(attr(tag, 'poster'), route, 'image');
          for (const part of attr(tag, 'srcset').split(/,\s*/)) recordResource(part.trim().split(/\s+/)[0], route, 'image');
        }
      }
      for (const match of html.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) recordResource(match[1], route, 'image');
      const title = textContent(/<title>([\s\S]*?)<\/title>/i.exec(html)?.[1] || '');
      const buttons = [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)].map(match => ({ text: textContent(match[2]), attributes: match[1].trim() }));
      const headings = [...html.matchAll(/<(h[1-3])\b[^>]*>([\s\S]*?)<\/h[1-3]>/gi)].map(match => ({ level: match[1], text: textContent(match[2]) }));
      const forms = [...html.matchAll(/<form\b[^>]*>[\s\S]*?<\/form>/gi)].map(match => match[0]);
      return { route, file, status: response.status, title, bytes: Buffer.byteLength(html), links, headings, buttons, formCount: forms.length, formFields: forms.map(form => [...form.matchAll(/<(input|select|textarea)\b[^>]*>/gi)].map(m => m[0])) };
    } catch (error) { return { route, status: 0, error: String(error.message) }; }
  }));
  pages.push(...outcomes);
  await writeFile(`${reference}/pages-manifest.json`, JSON.stringify({ source: origin, capturedAt: new Date().toISOString(), pages, externalLinks: [...externalLinks] }, null, 2));
  console.log(`Pages ${pages.length}, queued ${queue.length}: ${outcomes.map(p => `${p.route} (${p.status})`).join(', ')}`);
}

const assets = [];
const urlMap = { ...existing.urlMap };
const oldBySource = new Map(existing.assets.map(item => [item.source, item]));
const oldByLocal = new Map(existing.assets.map(item => [item.local, item]));
const sourceToAsset = new Map();
const failures = [];
const registerMap = (source, local) => {
  urlMap[source] = local;
  if (source.startsWith(origin)) urlMap[source.slice(origin.length)] = local;
};
const captureAsset = async resource => {
  const input = new URL(resource.source);
  let source = input.href;
  if (input.origin === origin && input.pathname === '/_next/image' && input.searchParams.has('url')) source = new URL(input.searchParams.get('url'), origin).href;
  if (sourceToAsset.has(source)) {
    const pending = await sourceToAsset.get(source);
    if (pending) registerMap(resource.source, pending.local);
    return;
  }
  const work = (async () => {
    const url = new URL(source);
    let local = url.origin === origin ? `/mylegal${url.pathname}` : `/mylegal/images/remote/${hash(source)}${path.extname(url.pathname).slice(0, 8) || '.img'}`;
    const known = oldBySource.get(source) || oldByLocal.get(local);
    if (known && await filesExist(`public${known.local}`)) {
      registerMap(resource.source, known.local); registerMap(source, known.local);
      return known;
    }
    if (/\.(?:js|mjs)(?:$|\?)/i.test(source)) return null;
    try {
      const response = await get(source);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const type = response.headers.get('content-type') || '';
      if (type.includes('text/html')) throw new Error('Unexpected HTML instead of asset');
      if (!path.extname(local)) local += type.includes('svg') ? '.svg' : type.includes('png') ? '.png' : type.includes('icon') ? '.ico' : type.includes('css') ? '.css' : '.bin';
      const bytes = Buffer.from(await response.arrayBuffer());
      const filename = `public${local}`;
      if (!await filesExist(filename)) {
        await mkdir(path.dirname(filename), { recursive: true });
        await writeFile(filename, bytes);
      }
      const asset = { source, originalPath: url.origin === origin ? url.pathname : source, local, bytes: bytes.length, contentType: type, references: resource.references };
      assets.push(asset);
      registerMap(resource.source, local); registerMap(source, local);
      if (type.includes('text/css')) {
        for (const match of bytes.toString('utf8').matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) {
          const cssSource = new URL(match[1], source).href;
          recordResource(cssSource, resource.references[0], /\.(woff2?|ttf|otf)(?:\?|$)/.test(cssSource) ? 'font' : 'image');
        }
      }
      return asset;
    } catch (error) {
      failures.push({ source, references: resource.references, error: error.message });
      return null;
    }
  })();
  sourceToAsset.set(source, work);
  const asset = await work;
  if (asset) registerMap(resource.source, asset.local);
};
const assetVisited = new Set();
while ([...resourceRefs.keys()].some(key => !assetVisited.has(key))) {
  const batch = [...resourceRefs.values()].filter(resource => !assetVisited.has(resource.source)).slice(0, 6);
  batch.forEach(resource => assetVisited.add(resource.source));
  await Promise.all(batch.map(captureAsset));
}
await writeFile(`${reference}/pages-assets.json`, JSON.stringify({ source: origin, capturedAt: new Date().toISOString(), assets, urlMap, resources: [...resourceRefs.values()], failures }, null, 2));
console.log(JSON.stringify({ pages: pages.length, newAssets: assets.length, resources: resourceRefs.size, failures }, null, 2));
