import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile, readdir, glob} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const workspace = fileURLToPath(new URL('../', import.meta.url));
const fullOutput = new URL('../dist/', import.meta.url);
const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
const publicOutput = new URL(`../${config.outputDirectory}/`, import.meta.url);

async function files(root, prefix = '') {
  const entries = await readdir(new URL(prefix, root), {withFileTypes:true});
  const results = [];
  for (const entry of entries) {
    const path = prefix + entry.name;
    if (entry.isDirectory()) results.push(...await files(root, path + '/'));
    else if (entry.isFile()) results.push(path);
  }
  return results.sort();
}

const isDynamic = path => /^(?:fr|ar|en)\/guides\//.test(path) || /^sitemap\.xml(?:\.(?:gz|br))?$/.test(path);

test('the Vercel static output cannot shadow dynamic Guides or sitemap rewrites', async () => {
  assert.equal(config.outputDirectory, 'dist-site');
  const all = await files(fullOutput);
  const publishedStatic = await files(publicOutput);
  assert.ok(all.includes('sitemap.xml'), 'The full historical sitemap remains available to its function');
  for (const language of ['fr', 'ar', 'en']) {
    assert.ok(all.includes(`${language}/guides/index.html`));
    assert.ok(all.includes(`${language}/guides/creation-entreprise-rabat/index.html`));
  }
  assert.equal(publishedStatic.some(isDynamic), false, 'Neither base files nor compressed siblings may win the filesystem routing phase');
  assert.deepEqual(publishedStatic, all.filter(path => !isDynamic(path)), 'Every other generated path must be retained');
  assert.ok(config.rewrites.some(rule => rule.source === '/sitemap.xml' && rule.destination === '/api/intelligence-sitemap'));
  assert.ok(config.rewrites.some(rule => rule.destination?.startsWith('/api/intelligence-public')));
});

test('the separated static output preserves public pages, assets and all reserve media bytes', async () => {
  const reserveFiles = ['reserve.json', 'reserve-supplement.json'];
  const media = new Set();
  for (const filename of reserveFiles) {
    const reserve = JSON.parse(await readFile(new URL(`../src/intelligence/${filename}`, import.meta.url), 'utf8'));
    for (const topic of reserve.topics) {
      for (const image of [topic.image?.src, topic.image?.smallSrc]) if (image) media.add(image.replace(/^\//, ''));
    }
  }
  assert.ok(media.size >= 28);
  const paths = [
    'fr/index.html', 'en/contact/index.html', 'ar/conseil-gestion/index.html',
    'intelligence/index.html', 'robots.txt', 'styles.css', 'app.js',
    'intelligence-admin.js', 'intelligence.css', ...media,
  ];
  for (const path of paths) {
    const [original, publicCopy] = await Promise.all([readFile(new URL(path, fullOutput)), readFile(new URL(path, publicOutput))]);
    assert.ok(original.equals(publicCopy), `Public bytes changed while separating output: ${path}`);
  }
});

test('function inclusion patterns retain all historical Guides and seed inputs outside the static output', async () => {
  const matches = async entrypoint => {
    const pattern = config.functions[entrypoint].includeFiles;
    assert.ok(pattern.includes('dist/'), `${entrypoint} must use the complete historical output`);
    assert.equal(pattern.includes('dist-site/'), false);
    const result = new Set();
    for await (const path of glob(pattern, {cwd:workspace})) result.add(path.replaceAll('\\', '/'));
    return result;
  };
  const complete = await files(fullOutput);
  const guideHtml = complete.filter(path => /^(?:fr|ar|en)\/guides\/.*\.html$/.test(path));
  assert.ok(guideHtml.length >= 354);
  const publicFiles = await matches('api/intelligence-public.js');
  assert.ok(publicFiles.has('dist/route-manifest.json'));
  for (const path of guideHtml) assert.ok(publicFiles.has('dist/' + path), `Missing historical page from function bundle: ${path}`);
  const adminFiles = await matches('api/intelligence.js');
  for (const path of guideHtml.filter(path => path.startsWith('fr/'))) assert.ok(adminFiles.has('dist/' + path), `Backfill cannot read its original: ${path}`);
  assert.ok(adminFiles.has('src/intelligence/reserve.json'));
  assert.ok(adminFiles.has('src/intelligence/reserve-supplement.json'));
  assert.ok(adminFiles.has('docs/INTELLIGENCE-INVENTAIRE-GUIDES.json'));
  const sitemapFiles = await matches('api/intelligence-sitemap.js');
  assert.ok(sitemapFiles.has('dist/sitemap.xml'));
});
