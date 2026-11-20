import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile, readdir} from 'node:fs/promises';
import {unpublishedAccountingSlugs} from '../src/unpublished-accounting-guides.mjs';

const forbidden = /comptab|expert-compt|accounting|accountant|bookkeep|محاسب/i;

async function walk(directory) {
  const entries = await readdir(directory, {withFileTypes:true});
  return (await Promise.all(entries.map(entry => entry.isDirectory()
    ? walk(new URL(`${entry.name}/`, directory))
    : [new URL(entry.name, directory)]))).flat();
}

test('withdrawn accounting guides are listed once and redirected away from the public site', () => {
  assert.equal(new Set(unpublishedAccountingSlugs).size, unpublishedAccountingSlugs.length);
  assert.ok(unpublishedAccountingSlugs.includes('comptabilite-au-maroc'));
  assert.ok(unpublishedAccountingSlugs.includes('commissaire-aux-comptes-a-casablanca'));
  assert.ok(unpublishedAccountingSlugs.includes('expert-comptable-casablanca'));
  assert.equal(unpublishedAccountingSlugs.includes('declaration-is-maroc'), false);
});

test('the generated site no longer names the withdrawn accounting activity', async () => {
  const root = new URL('../dist/', import.meta.url);
  const files = await walk(root);
  const hits = [];
  for (const file of files) {
    const relative = decodeURIComponent(file.pathname.slice(root.pathname.length));
    if (forbidden.test(relative)) hits.push(relative);
    if (!/\.(html|css|js|json|xml|txt|svg)$/i.test(relative)) continue;
    const text = await readFile(file, 'utf8');
    if (!forbidden.test(text)) continue;
    const line = text.split(/\n/).findIndex(item => forbidden.test(item)) + 1;
    hits.push(`${relative}:${line}`);
    if (hits.length > 25) break;
  }
  assert.deepEqual(hits, []);
});
