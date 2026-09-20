// Optional import-time image compression. Requires Sharp in the developer runtime.
// The website and production build have no dependency on Sharp.
import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { homedir } from 'node:os';
import path from 'node:path';
const require = createRequire(import.meta.url);
const sharp = require(require.resolve('sharp', { paths: [process.cwd(), path.join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node')] }));
const filename = 'reference/mylegal/pages-assets.json';
const manifest = JSON.parse(await readFile(filename, 'utf8'));
const workspace = process.cwd();
const originalDirectory = path.resolve('reference/mylegal/original-assets');
if (!originalDirectory.startsWith(workspace + path.sep)) throw new Error('Original directory must remain inside the workspace');
await mkdir(originalDirectory, { recursive: true });
let savedBytes = 0;
let converted = 0;
for (const asset of manifest.assets) {
  const sourceFile = path.resolve(`public${asset.local}`);
  if (!sourceFile.startsWith(path.resolve('public') + path.sep)) throw new Error('Asset path must remain inside public');
  if (!asset.contentType.startsWith('image/') || asset.contentType.includes('icon')) continue;
  try {
    const metadata = await sharp(sourceFile).metadata();
    asset.width = metadata.width; asset.height = metadata.height;
    if (asset.bytes < 100000 || asset.optimized) continue;
    const oldLocal = asset.local;
    const newLocal = oldLocal.replace(/\.[^/.]+$/, '.webp');
    if (oldLocal === newLocal) continue;
    const newFile = path.resolve(`public${newLocal}`);
    if (!newFile.startsWith(path.resolve('public') + path.sep)) throw new Error('Output path must remain inside public');
    const { data, info } = await sharp(sourceFile).resize({ width: 1280, height: 1280, fit: 'inside', withoutEnlargement: true }).webp({ quality: 86, effort: 6 }).toBuffer({ resolveWithObject: true });
    await writeFile(newFile, data);
    const originalFile = path.join(originalDirectory, path.basename(sourceFile));
    if (!originalFile.startsWith(originalDirectory + path.sep)) throw new Error('Original path must remain inside reference');
    await rename(sourceFile, originalFile);
    savedBytes += asset.bytes - data.length;
    for (const key of Object.keys(manifest.urlMap)) if (manifest.urlMap[key] === oldLocal) manifest.urlMap[key] = newLocal;
    Object.assign(asset, { originalFile: path.relative(workspace, originalFile).replaceAll('\\', '/'), local: newLocal, originalBytes: asset.bytes, bytes: data.length, width: info.width, height: info.height, contentType: 'image/webp', optimized: true });
    converted++;
  } catch (error) { console.warn(`Image metadata/optimization skipped for ${asset.local}: ${error.message}`); }
}
manifest.optimization = { converted, savedBytes, maxDimension: 1280, format: 'webp', quality: 86 };
await writeFile(filename, JSON.stringify(manifest, null, 2));
console.log(JSON.stringify(manifest.optimization));
