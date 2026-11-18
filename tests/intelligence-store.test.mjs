import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, readFile, rm, utimes} from 'node:fs/promises';
import {tmpdir, hostname} from 'node:os';
import {join} from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {createState, createFileStore, createSupabaseStore, MAX_STATE_BYTES} from '../src/intelligence/store.mjs';

const run = promisify(execFile);
const env = {SUPABASE_URL:'https://editorial-test.supabase.co', SUPABASE_SECRET_KEY:'sb_secret_TEST_ONLY'};

async function temporary(t) {
  const directory = await mkdtemp(join(tmpdir(), 'felexia-store-'));
  t.after(() => rm(directory, {recursive:true, force:true}));
  return join(directory, 'state.json');
}

function mockedDatabase() {
  let row = {revision:0, state:createState()};
  let conflicts = 0;
  const requests = [];
  return {
    requests,
    get conflicts() { return conflicts; },
    async fetcher(url, options) {
      requests.push({url:String(url), options});
      if (options.method === 'GET') {
        const snapshot = structuredClone(row);
        await new Promise(done => setImmediate(done));
        return Response.json([snapshot]);
      }
      const update = JSON.parse(options.body);
      if (update.expected_revision !== row.revision) {
        conflicts++;
        return Response.json({committed:false, revision:null});
      }
      row = {revision:row.revision + 1, state:structuredClone(update.next_state)};
      return Response.json({committed:true, revision:row.revision});
    },
  };
}

test('file transactions preserve all updates from independent Node processes', async t => {
  const path = await temporary(t);
  const moduleUrl = new URL('../src/intelligence/store.mjs', import.meta.url).href;
  const script = `import {createFileStore} from ${JSON.stringify(moduleUrl)};
    const store=createFileStore({path:process.argv[1]});
    for(let i=0;i<12;i++) await store.transaction(state=>{state.events.push({worker:process.argv[2],i});});`;
  await Promise.all(Array.from({length:4}, (_, worker) => run(process.execPath, ['--input-type=module', '-e', script, path, String(worker)], {timeout:30_000})));
  const store = createFileStore({path});
  const state = await store.read();
  assert.equal(state.events.length, 48);
  assert.equal(new Set(state.events.map(event => `${event.worker}:${event.i}`)).size, 48);
  assert.equal(JSON.parse(await readFile(path, 'utf8')).revision, 48);
});

test('failed and asynchronous transactions never commit partially edited state', async t => {
  const path = await temporary(t);
  const store = createFileStore({path});
  await assert.rejects(store.transaction(state => {state.topics.push({id:'partial'}); throw new Error('blocked');}), /blocked/);
  await assert.rejects(store.transaction(async state => {state.topics.push({id:'async'});}), {code:'ASYNC_TRANSACTION'});
  assert.deepEqual(await store.read(), createState());
  await store.transaction(state => {state.topics.push({id:'complete', translations:{fr:{}, ar:{}, en:{}}}); state.reports.push({day:'2026-10-12'});});
  const saved = await store.read();
  assert.equal(saved.topics.length, 1);
  assert.equal(saved.reports.length, 1);
});

test('corrupted state and oversized state are rejected without erasing the old file', async t => {
  const path = await temporary(t);
  const store = createFileStore({path});
  await store.transaction(state => {state.settings.marker = 'preserved';});
  await assert.rejects(store.transaction(state => {state.settings.huge = 'x'.repeat(MAX_STATE_BYTES);}), {code:'STATE_TOO_LARGE'});
  assert.equal((await store.read()).settings.marker, 'preserved');
  await writeFile(path, '{broken');
  await assert.rejects(store.read(), {code:'STORE_CORRUPT'});
  assert.equal(await readFile(path, 'utf8'), '{broken');
});

test('a stale crashed-process lock is recovered; a live owner is never evicted', async t => {
  const path = await temporary(t);
  const lock = path + '.lock';
  await mkdir(lock);
  await writeFile(join(lock, 'owner.json'), JSON.stringify({token:'crashed', host:hostname(), pid:2147483647}));
  const old = new Date(Date.now() - 10_000);
  await utimes(lock, old, old);
  const store = createFileStore({path, staleLockMs:10, lockTimeoutMs:100});
  await store.transaction(state => {state.events.push({recovered:true});});
  assert.equal((await store.read()).events.length, 1);
  await mkdir(lock);
  await writeFile(join(lock, 'owner.json'), JSON.stringify({token:'alive', host:hostname(), pid:process.pid}));
  await utimes(lock, old, old);
  await assert.rejects(store.transaction(() => {}), {code:'STORE_LOCK_TIMEOUT'});
  assert.equal(JSON.parse(await readFile(join(lock, 'owner.json'), 'utf8')).token, 'alive');
});

test('Supabase CAS retries concurrent snapshots without losing any update', async () => {
  const database = mockedDatabase();
  const left = createSupabaseStore({env, fetcher:database.fetcher});
  const right = createSupabaseStore({env, fetcher:database.fetcher});
  await Promise.all(Array.from({length:12}, (_, id) => (id % 2 ? left : right).transaction(state => {
    state.jobs.push({id:String(id)});
  })));
  const state = await left.read();
  assert.equal(state.jobs.length, 12);
  assert.equal(new Set(state.jobs.map(job => job.id)).size, 12);
  assert.ok(database.conflicts > 0);
  assert.ok(database.requests.every(({options}) => options.headers.apikey === env.SUPABASE_SECRET_KEY && !options.headers.Authorization));
});

test('unavailable Supabase errors do not include provider secrets or return empty success', async () => {
  const store = createSupabaseStore({env, fetcher:async () => {throw new Error('provider leaked sb_secret_PRIVATE_TOKEN');}});
  await assert.rejects(store.read(), cause => cause.code === 'STORE_UNAVAILABLE' && !cause.message.includes('PRIVATE_TOKEN'));
  assert.throws(() => createSupabaseStore({env:{SUPABASE_URL:env.SUPABASE_URL, SUPABASE_SECRET_KEY:'sb_publishable_PUBLIC'}}), {code:'STORE_NOT_CONFIGURED'});
});

test('persistent lease rejects a second worker and fences a superseded worker', async t => {
  const path = await temporary(t);
  const owner = createFileStore({path});
  const rival = createFileStore({path});
  await assert.rejects(owner.lease('daily:2026-10-12', async () => {
    await assert.rejects(rival.lease('daily:2026-10-12', async () => {}), {code:'LEASE_BUSY'});
    await rival.transaction(state => {state.settings._leases['daily:2026-10-12'] = {token:'replacement', expiresAt:Date.now() + 5000};});
    await assert.rejects(owner.transaction(state => {state.topics.push({id:'stale-worker'});}), {code:'LEASE_LOST'});
  }), {code:'LEASE_LOST'});
  assert.equal((await owner.read()).topics.length, 0);
  assert.equal((await owner.read()).settings._leases['daily:2026-10-12'].token, 'replacement');
});

test('lease heartbeat survives its original expiry then releases ownership', async t => {
  const path = await temporary(t);
  const owner = createFileStore({path});
  await owner.lease('daily', async () => {
    await new Promise(done => setTimeout(done, 1200));
    await owner.transaction(state => {state.events.push({heartbeat:true});});
  }, {ttlMs:1000});
  const state = await owner.read();
  assert.equal(state.events.length, 1);
  assert.equal(state.settings._leases.daily, undefined);
});
