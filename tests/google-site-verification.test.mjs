import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const tag = '<meta name="google-site-verification" content="IZNI6MWa1PSAxjyeMkqqpaNubZJhIWRp7Ac-eogqKmM" />';

test('the site root keeps the Google Search Console verification tag', () => {
  const html = readFileSync(new URL('../dist-site/index.html', import.meta.url), 'utf8');
  const head = html.slice(html.indexOf('<head>'), html.indexOf('</head>'));
  assert.ok(head.includes(tag));
});
