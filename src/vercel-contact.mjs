import { Readable } from 'node:stream';
import { createContactHandler } from './contact-api.mjs';

const BODY_LIMIT = 16_384;

function reject(res, status, code) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify({ ok: false, code }));
}

// Vercel's Node helpers may have consumed the IncomingMessage and populated a
// lazy `body` getter. Keep one validation/delivery implementation for both hosts.
export function createVercelContactHandler(options = {}) {
  const contact = createContactHandler(options);
  return async function vercelContact(req, res) {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Frame-Options', 'DENY');

    if (req.method !== 'POST' || !String(req.headers['content-type'] || '').startsWith('application/json')) {
      return contact(req, res);
    }

    // The original length also catches a large body compacted by JSON parsing.
    const originalLength = Number(req.headers['content-length']);
    if (Number.isFinite(originalLength) && originalLength > BODY_LIMIT) {
      return reject(res, 413, 'too_large');
    }

    let parsed;
    try {
      parsed = req.body;
    } catch {
      return reject(res, 400, 'json');
    }
    if (parsed === undefined) return contact(req, res);

    let bytes;
    try {
      bytes = Buffer.isBuffer(parsed) ? parsed : Buffer.from(
        typeof parsed === 'string' ? parsed : JSON.stringify(parsed), 'utf8',
      );
    } catch {
      return reject(res, 400, 'json');
    }
    if (bytes.length > BODY_LIMIT) return reject(res, 413, 'too_large');

    const stream = Readable.from([bytes]);
    stream.method = req.method;
    stream.headers = req.headers;
    stream.socket = req.socket;
    stream.url = req.url;
    return contact(stream, res);
  };
}
