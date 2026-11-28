import {readFileSync} from 'node:fs';

// A sitemap must not advertise an address that Vercel already redirects.
const redirects = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8')).redirects;

function compileSource(source) {
  let pattern = '^';
  for (let index = 0; index < source.length; index++) {
    if (source[index] === ':' && /[A-Za-z0-9_]/.test(source[index + 1] || '')) {
      let end = index + 1;
      while (/[A-Za-z0-9_]/.test(source[end] || '')) end++;
      if (source[end] === '(') {
        let depth = 1;
        let cursor = end + 1;
        while (cursor < source.length && depth) {
          if (source[cursor] === '\\') { cursor += 2; continue; }
          if (source[cursor] === '(') depth++;
          else if (source[cursor] === ')') depth--;
          cursor++;
        }
        pattern += `(?:${source.slice(end + 1, cursor - 1)})`;
        index = cursor - 1;
        continue;
      }
      pattern += '[^/]+';
      index = end - 1;
      continue;
    }
    pattern += /[\\^$.*+?()[\]{}|]/.test(source[index]) ? `\\${source[index]}` : source[index];
  }
  return new RegExp(`${pattern}$`);
}

const sources = redirects.map(rule => compileSource(rule.source));

export function isRedirectedPath(value) {
  const path = String(value || '');
  const pathname = path.startsWith('http://') || path.startsWith('https://') ? decodeURIComponent(new URL(path).pathname) : decodeURIComponent(path);
  return sources.some(source => source.test(pathname));
}
