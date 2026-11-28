import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readdirSync, readFileSync} from 'node:fs';
import {load} from 'cheerio';

function htmlFiles(dir, files = []) {
  for (const entry of readdirSync(dir, {withFileTypes:true})) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) htmlFiles(path, files);
    else if (entry.name.endsWith('.html')) files.push(path);
  }
  return files;
}

test('mobile calls, WhatsApp and the office line keep their own numbers', () => {
  const files = htmlFiles('dist');
  assert.ok(files.length > 10);
  const combined = files.map(file => readFileSync(file, 'utf8')).join('\n');
  assert.equal(/05\s*25\s*41\s*05\s*83|0525410583/.test(combined), false);
  for (const file of files) {
    const $ = load(readFileSync(file));
    $('a[href*="wa.me"]').each((_, element) => {
      const href = $(element).attr('href');
      assert.match(href, /^https:\/\/wa\.me\/212661400352(?:[/?].*)?$/, file + ' ' + href);
    });
    $('a[href^="tel:"]').each((_, element) => {
      const href = $(element).attr('href');
      const context = `${$(element).text()} ${$(element).parent().text()}`;
      if (href === 'tel:+212520825825') assert.match(context, /Bureau|Office|المكتب/, file);
      else assert.equal(href, 'tel:+212661080862', `${file} ${context}`);
    });
  }
});
