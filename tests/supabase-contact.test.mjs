import {test} from 'node:test';
import assert from 'node:assert/strict';
import {persistContactToSupabase} from '../src/supabase-contact.mjs';

const env = {SUPABASE_URL:'https://yxdmkqdnesemaqzagatm.supabase.co', SUPABASE_SECRET_KEY:'sb_secret_test_fixture_not_a_real_key'};
const payload = () => ({requestId:'test-request-12345', kind:'contact', locale:'fr', language:'fr', consent:true, name:'Test technique', email:'fixture@example.test', message:'Test local, aucune demande réelle.', service:'creation-entreprise'});
const json = (value, status=200) => new Response(JSON.stringify(value), {status, headers:{'Content-Type':'application/json'}});

function database() {
  const records = new Map(), calls = [];
  let loseNextResponse = false;
  return {
    records, calls,
    loseResponse() { loseNextResponse = true; },
    async fetcher(url, options) {
      url = new URL(url);
      calls.push({url, options});
      assert.equal(url.origin, env.SUPABASE_URL);
      assert.equal(url.pathname, '/rest/v1/felexia_contact_requests');
      assert.equal(url.searchParams.get('select'), 'request_id,reference,payload_hash');
      assert.equal(options.redirect, 'error');
      const projected = ({request_id,reference,payload_hash}) => ({request_id,reference,payload_hash});
      if (options.method === 'POST') {
        assert.equal(url.searchParams.get('on_conflict'), 'request_id');
        assert.equal(options.headers.Prefer, 'resolution=ignore-duplicates,return=representation');
        const row = JSON.parse(options.body);
        if (records.has(row.request_id)) return json([]);
        records.set(row.request_id, row);
        if (loseNextResponse) { loseNextResponse = false; throw new Error('Simulated network failure after commit'); }
        return json([projected(row)], 201);
      }
      assert.equal(options.method, 'GET');
      const id = url.searchParams.get('request_id').slice(3);
      const row = records.get(id);
      return json(row ? [projected(row)] : []);
    }
  };
}

test('Supabase sink stores only approved fields, with secret key on apikey header', async () => {
  const db = database();
  const result = await persistContactToSupabase({...payload(), website:'', ip:'203.0.113.1', unrelatedSecret:'never store me'}, {env, fetcher:db.fetcher});
  assert.equal(result.status, 200);
  assert.equal(result.body.ok, true);
  assert.match(result.body.reference, /^FLX-[A-F0-9]{8}$/);
  assert.equal(db.records.size, 1);
  const row = [...db.records.values()][0];
  assert.equal(row.payload.email, 'fixture@example.test');
  assert.equal(row.payload.consent, true);
  assert.equal(row.payload.website, undefined);
  assert.equal(row.payload.ip, undefined);
  assert.equal(row.payload.unrelatedSecret, undefined);
  assert.equal(db.calls[0].options.headers.apikey, env.SUPABASE_SECRET_KEY);
  assert.equal(db.calls[0].options.headers.Authorization, undefined);
});

test('duplicate retries survive different process calls and ignore server timestamps', async () => {
  const db = database();
  const first = await persistContactToSupabase({...payload(), receivedAt:'2026-09-20T12:00:00Z'}, {env, fetcher:db.fetcher});
  const second = await persistContactToSupabase({...payload(), receivedAt:'2026-09-20T12:05:00Z'}, {env, fetcher:db.fetcher});
  assert.deepEqual(second, first);
  assert.equal(db.records.size, 1);
  assert.equal(db.calls.filter(call => call.options.method === 'GET').length, 1);
});

test('same request ID with different content is rejected without replacing the original', async () => {
  const db = database();
  await persistContactToSupabase(payload(), {env, fetcher:db.fetcher});
  const result = await persistContactToSupabase({...payload(), message:'A different message that must not overwrite the original.'}, {env, fetcher:db.fetcher});
  assert.deepEqual(result, {status:409, body:{ok:false, code:'idempotency_conflict'}});
  assert.equal(db.records.get(payload().requestId).payload.message, payload().message);
});

test('simultaneous requests create one durable row', async () => {
  const db = database();
  const results = await Promise.all(Array.from({length:4}, () => persistContactToSupabase(payload(), {env, fetcher:db.fetcher})));
  assert.ok(results.every(result => result.status === 200));
  assert.equal(new Set(results.map(result => result.body.reference)).size, 1);
  assert.equal(db.records.size, 1);
});

test('ambiguous network failure can be retried without creating duplicate leads', async () => {
  const db = database();
  db.loseResponse();
  assert.equal((await persistContactToSupabase(payload(), {env, fetcher:db.fetcher})).status, 502);
  assert.equal((await persistContactToSupabase(payload(), {env, fetcher:db.fetcher})).status, 200);
  assert.equal(db.records.size, 1);
});

test('missing, public, or insecure configuration makes no outbound request', async () => {
  let calls = 0;
  const fetcher = async () => { calls++; throw new Error('must not run'); };
  const anon = `eyJhbGciOiJIUzI1NiJ9.${Buffer.from(JSON.stringify({role:'anon'})).toString('base64url')}.fixture`;
  for (const bad of [{}, {SUPABASE_URL:env.SUPABASE_URL}, {...env,SUPABASE_SECRET_KEY:'sb_publishable_bad'}, {...env,SUPABASE_SECRET_KEY:anon}, {...env,SUPABASE_URL:'http://unsafe.example'}, {...env,SUPABASE_URL:'https://user:password@example.test'}, {...env,SUPABASE_URL:env.SUPABASE_URL+'/extra'}]) {
    const result = await persistContactToSupabase(payload(), {env:bad, fetcher});
    assert.equal(result.status, 503);
    assert.equal(result.body.ok, false);
  }
  assert.equal(calls, 0);
});

test('legacy service-role JWT remains server-only and receives Bearer header', async () => {
  const key = `eyJhbGciOiJIUzI1NiJ9.${Buffer.from(JSON.stringify({role:'service_role'})).toString('base64url')}.fixture`;
  const db = database();
  const result = await persistContactToSupabase(payload(), {env:{SUPABASE_URL:env.SUPABASE_URL,SUPABASE_SERVICE_ROLE_KEY:key}, fetcher:db.fetcher});
  assert.equal(result.status, 200);
  assert.equal(db.calls[0].options.headers.Authorization, `Bearer ${key}`);
});

test('provider configuration errors and malformed successes never claim delivery', async () => {
  for (const response of [json({message:'hidden provider data'},401), json({},403), json({},404), json({},500), json({ok:true}), json([{request_id:'other',reference:'FLX-12345678',payload_hash:'bad'}])]) {
    const result = await persistContactToSupabase(payload(), {env, fetcher:async () => response.clone()});
    assert.equal(result.body.ok, false);
    assert.ok([502,503].includes(result.status));
    assert.doesNotMatch(JSON.stringify(result), /hidden provider data/);
  }
});

test('invalid payload or consent is rejected before sending personal data', async () => {
  let calls = 0;
  for (const invalid of [null, {...payload(),consent:false}, {...payload(),requestId:'invalid'}, {...payload(),requestId:12345678}, {...payload(),message:42}, {...payload(),locale:'invalid'}]) {
    const result = await persistContactToSupabase(invalid, {env, fetcher:async () => { calls++; }});
    assert.equal(result.status, 400);
  }
  assert.equal(calls, 0);
});
