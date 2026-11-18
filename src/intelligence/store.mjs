import {mkdir, readFile, writeFile, rename, rm, stat, open} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';
import {hostname} from 'node:os';
import {randomUUID} from 'node:crypto';
import {AsyncLocalStorage} from 'node:async_hooks';

export const MAX_STATE_BYTES = 16 * 1024 * 1024;
const ARRAY_FIELDS = ['topics', 'sources', 'jobs', 'events', 'reports', 'metrics'];
const pause = ms => new Promise(done => setTimeout(done, ms));
const error = (code, message = code) => Object.assign(new Error(message), {code});

export function createState() {
  return {version:1, topics:[], sources:[], jobs:[], events:[], reports:[], metrics:[], settings:{}};
}

function serialize(state) {
  if (!state || state.version !== 1 || ARRAY_FIELDS.some(key => !Array.isArray(state[key])) ||
      !state.settings || typeof state.settings !== 'object' || Array.isArray(state.settings)) {
    throw error('INVALID_STATE', 'Invalid editorial state');
  }
  let json;
  try { json = JSON.stringify(state); } catch { throw error('INVALID_STATE'); }
  if (Buffer.byteLength(json, 'utf8') > MAX_STATE_BYTES) throw error('STATE_TOO_LARGE');
  return json;
}

function applyTransaction(state, fn) {
  if (typeof fn !== 'function') throw error('INVALID_TRANSACTION');
  const result = fn(state);
  if (result && typeof result.then === 'function') {
    // A rejected async callback must not become an unhandled rejection.
    Promise.resolve(result).catch(() => {});
    throw error('ASYNC_TRANSACTION', 'Transactions require a synchronous callback; perform network calls outside it');
  }
  serialize(state);
  return result;
}

function withLeases(base) {
  const context = new AsyncLocalStorage();
  const transaction = fn => base.transaction(state => {
    const active = context.getStore();
    if (active) {
      const current = state.settings._leases?.[active.name];
      if (active.lost || !current || current.token !== active.token || current.expiresAt <= Date.now()) {
        throw error('LEASE_LOST');
      }
    }
    return applyTransaction(state, fn);
  });
  return {
    ...base,
    transaction,
    async lease(name, fn, {ttlMs = 60_000} = {}) {
      if (!/^[a-zA-Z0-9:_-]{1,160}$/.test(name) || typeof fn !== 'function' || !Number.isFinite(ttlMs) || ttlMs < 1000) {
        throw error('INVALID_LEASE');
      }
      const active = {name, token:randomUUID(), lost:false};
      await transaction(state => {
        const leases = state.settings._leases ||= {};
        if (leases[name]?.expiresAt > Date.now()) throw error('LEASE_BUSY');
        leases[name] = {token:active.token, expiresAt:Date.now() + ttlMs};
      });
      let heartbeat = Promise.resolve();
      const timer = setInterval(() => {
        heartbeat = heartbeat.then(() => base.transaction(state => {
          const lease = state.settings._leases?.[name];
          if (lease?.token !== active.token || lease.expiresAt <= Date.now()) throw error('LEASE_LOST');
          lease.expiresAt = Date.now() + ttlMs;
        })).catch(() => { active.lost = true; });
      }, Math.floor(ttlMs / 3));
      timer.unref();
      try {
        const value = await context.run(active, () => fn({token:active.token}));
        await heartbeat;
        if (active.lost) throw error('LEASE_LOST');
        await base.transaction(state => {
          const current = state.settings._leases?.[name];
          if (current?.token !== active.token || current.expiresAt <= Date.now()) throw error('LEASE_LOST');
        });
        return value;
      } finally {
        clearInterval(timer);
        await heartbeat;
        await base.transaction(state => {
          if (state.settings._leases?.[name]?.token === active.token) delete state.settings._leases[name];
        }).catch(() => {});
      }
    },
  };
}

function processAlive(pid) {
  try { process.kill(pid, 0); return true; } catch (cause) { return cause.code !== 'ESRCH'; }
}

export function createFileStore({path, lockTimeoutMs = 30_000, staleLockMs = 120_000} = {}) {
  if (!path || typeof path !== 'string') throw error('INVALID_STORE_PATH');
  const target = resolve(path);
  const lock = target + '.lock';

  async function load() {
    try {
      const bytes = await readFile(target);
      if (bytes.length > MAX_STATE_BYTES + 256) throw error('STATE_TOO_LARGE');
      const saved = JSON.parse(bytes.toString('utf8'));
      if (!Number.isSafeInteger(saved.revision) || saved.revision < 0) throw error('INVALID_STATE');
      serialize(saved.state);
      return saved;
    } catch (cause) {
      if (cause.code === 'ENOENT') return {revision:0, state:createState()};
      if (cause.code === 'STATE_TOO_LARGE' || cause.code === 'INVALID_STATE') throw cause;
      throw error('STORE_CORRUPT', 'Cannot read the editorial store');
    }
  }

  async function reclaim() {
    let info;
    try { info = await stat(lock); } catch (cause) { if (cause.code === 'ENOENT') return; throw cause; }
    if (Date.now() - info.mtimeMs < staleLockMs) return;
    let owner;
    try { owner = JSON.parse(await readFile(resolve(lock, 'owner.json'), 'utf8')); } catch {}
    if (owner?.host !== hostname() || !Number.isInteger(owner.pid) || processAlive(owner.pid) ||
        !/^[A-Za-z0-9-]{1,100}$/.test(owner.token || '')) return;
    // Keep a small ownership tombstone. All contenders for this dead owner use
    // the SAME nonempty destination; after one wins, a delayed contender cannot
    // rename a newly acquired live lock into that destination. No cleanup lock
    // can itself be stranded by a process crash.
    const tombstone = lock + '.reaped-' + owner.token;
    try { await rename(lock, tombstone); }
    catch (cause) { if (!['ENOENT', 'EEXIST', 'ENOTEMPTY', 'EPERM', 'EACCES'].includes(cause.code)) throw cause; }
  }

  async function acquire() {
    await mkdir(dirname(target), {recursive:true});
    const started = Date.now();
    for (;;) {
      const token = randomUUID();
      let acquired = false;
      const candidate = lock + '.candidate-' + token;
      try {
        // Prepare the ownership metadata before the atomic directory rename.
        // A process crash can leave a candidate, never an ownerless live lock.
        await mkdir(candidate);
        await writeFile(resolve(candidate, 'owner.json'), JSON.stringify({token, pid:process.pid, host:hostname()}), {mode:0o600});
        await rename(candidate, lock);
        acquired = true;
        return token;
      } catch (cause) {
        if (acquired) { await rm(lock, {recursive:true, force:true}); throw error('STORE_UNAVAILABLE'); }
        await rm(candidate, {recursive:true, force:true}).catch(() => {});
        // Windows returns EPERM/EACCES for an existing destination directory.
        // The winner can release between rename failure and our retry. Treat
        // these collision errors as contention even if the lock disappeared.
        if (!['EEXIST', 'ENOTEMPTY', 'EPERM', 'EACCES'].includes(cause.code)) throw error('STORE_UNAVAILABLE');
        await reclaim();
        if (Date.now() - started >= lockTimeoutMs) throw error('STORE_LOCK_TIMEOUT');
        await pause(10 + Math.floor(Math.random() * 20));
      }
    }
  }

  async function owns(token) {
    try { return JSON.parse(await readFile(resolve(lock, 'owner.json'), 'utf8')).token === token; } catch { return false; }
  }

  const base = {
    kind:'file',
    async read() { return structuredClone((await load()).state); },
    async transaction(fn) {
      const token = await acquire();
      let temporary;
      try {
        const current = await load();
        if (current.revision >= Number.MAX_SAFE_INTEGER) throw error('STORE_REVISION_LIMIT');
        const result = applyTransaction(current.state, fn);
        temporary = target + '.' + token + '.tmp';
        const handle = await open(temporary, 'wx', 0o600);
        try {
          await handle.writeFile(JSON.stringify({revision:current.revision + 1, state:current.state}), 'utf8');
          await handle.sync();
        } finally { await handle.close(); }
        if (!await owns(token)) throw error('STORE_LOCK_LOST');
        // Same-directory rename is the publication point: readers see the
        // complete old state or the complete new trilingual state.
        await rename(temporary, target);
        temporary = null;
        return result;
      } finally {
        if (temporary) await rm(temporary, {force:true}).catch(() => {});
        if (await owns(token)) await rm(lock, {recursive:true, force:true});
      }
    },
  };
  return withLeases(base);
}

function serverConfiguration(env) {
  const key = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
  let url;
  try { url = new URL(env.SUPABASE_URL); } catch { throw error('STORE_NOT_CONFIGURED'); }
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || !['', '/'].includes(url.pathname) ||
      typeof key !== 'string' || /\s/.test(key)) throw error('STORE_NOT_CONFIGURED');
  const headers = {'Content-Type':'application/json', apikey:key};
  if (!/^sb_secret_[A-Za-z0-9_-]+$/.test(key)) {
    try {
      if (key.split('.').length !== 3 || JSON.parse(Buffer.from(key.split('.')[1], 'base64url')).role !== 'service_role') throw new Error();
    } catch { throw error('STORE_NOT_CONFIGURED'); }
    headers.Authorization = `Bearer ${key}`;
  }
  return {url, headers};
}

export function createSupabaseStore({env = process.env, fetcher = fetch, maxRetries = 20} = {}) {
  const config = serverConfiguration(env);
  const endpoint = path => new URL(path, config.url);
  async function request(url, options = {}) {
    try {
      const response = await fetcher(url, {...options, headers:{...config.headers, ...options.headers}, redirect:'error', signal:AbortSignal.timeout(15_000)});
      if (!response.ok) throw error('STORE_UNAVAILABLE');
      return await response.json();
    } catch { throw error('STORE_UNAVAILABLE', 'Persistent editorial database unavailable'); }
  }
  async function load() {
    const url = endpoint('/rest/v1/felexia_intelligence_state');
    url.searchParams.set('id', 'eq.1');
    url.searchParams.set('select', 'revision,state');
    const rows = await request(url, {method:'GET'});
    if (!Array.isArray(rows) || rows.length !== 1 || !Number.isSafeInteger(rows[0].revision) || rows[0].revision < 0) {
      throw error('STORE_NOT_INITIALIZED');
    }
    serialize(rows[0].state);
    return rows[0];
  }
  const base = {
    kind:'supabase',
    async read() { return structuredClone((await load()).state); },
    async transaction(fn) {
      for (let attempt = 0; attempt < maxRetries; attempt++) {
        const current = await load();
        const result = applyTransaction(current.state, fn);
        const saved = await request(endpoint('/rest/v1/rpc/felexia_intelligence_cas'), {
          method:'POST', body:JSON.stringify({expected_revision:current.revision, next_state:current.state}),
        });
        if (saved?.committed === true && saved.revision === current.revision + 1) return result;
        if (saved?.committed !== false) throw error('STORE_UNAVAILABLE');
        await pause(Math.min(100, 5 * (attempt + 1)) + Math.floor(Math.random() * 15));
      }
      throw error('STORE_CONFLICT', 'Concurrent editorial updates exceeded retry limit');
    },
  };
  return withLeases(base);
}
