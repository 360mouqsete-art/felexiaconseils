import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createDossierHandler} from '../src/dossier-api.mjs';
import {dossierMain} from '../src/dossier-page.mjs';
import {canReadDossier, issueSession, readSession, stepsFor, validateUpload, visibleDossiers} from '../src/dossier-model.mjs';

const secret = 'sb_secret_test_fixture_not_a_real_key';

test('a client sees only their own file and staff see every file', () => {
  const client = {uid:'11111111-1111-4111-8111-111111111111', email:'client@example.com', staff:false};
  const other = {uid:'22222222-2222-4222-8222-222222222222', email:'other@example.com', staff:false};
  const staff = {uid:'33333333-3333-4333-8333-333333333333', email:'staff@example.com', staff:true};
  const own = {id:'a', clientEmail:'client@example.com', clientUserId:client.uid};
  const foreign = {id:'b', clientEmail:'other@example.com', clientUserId:other.uid};
  assert.deepEqual(visibleDossiers(client, [own, foreign]).map(item => item.id), ['a']);
  assert.equal(canReadDossier(other, own), false);
  assert.equal(visibleDossiers(staff, [own, foreign]).length, 2);
  assert.equal(canReadDossier({uid:client.uid, email:'client@example.com'}, {clientEmail:'Client@Example.com', clientUserId:null}), true);
});

test('session cookies stay signed and uploads stay within the allowed files', () => {
  const token = issueSession({uid:'user-1', email:'Client@Example.com'}, secret, 1_000);
  assert.equal(readSession(token, secret, 1_000).email, 'client@example.com');
  assert.equal(readSession(token, 'sb_secret_other_test_key', 1_000), null);
  assert.equal(readSession(token, secret, 1_000 + 15 * 24 * 60 * 60 * 1000), null);
  assert.equal(validateUpload({mime:'application/pdf', size:10 * 1024 * 1024}), '');
  assert.equal(validateUpload({mime:'image/gif', size:1000}), 'type');
  assert.equal(validateUpload({mime:'image/png', size:10 * 1024 * 1024 + 1}), 'size');
  assert.equal(stepsFor('creation').length, 7);
  assert.equal(token.includes(secret), false);
});

test('the client page offers sign-in, an example and contact without any secret', () => {
  for (const lang of ['fr','en','ar']) {
    const html = dossierMain(lang, 'client') + dossierMain(lang, 'admin');
    assert.match(html, /data-dossier-login/);
    assert.match(html, /data-dossier-example/);
    assert.match(html, /wa\.me\/212661400352/);
    assert.match(html, new RegExp(`/${lang}/contact/`));
    assert.equal(html.includes('sb_secret'), false);
    assert.equal(html.includes('service_role'), false);
    assert.equal(html.includes('SUPABASE'), false);
    assert.match(html, /EXEMPLE/);
  }
});

test('the migration keeps row level security and gives visitors no table rights', () => {
  const sql = readFileSync(new URL('../supabase/migrations/20261119123000_felexia_client_dossiers.sql', import.meta.url), 'utf8');
  for (const table of ['felexia_dossier_staff','felexia_dossiers','felexia_dossier_steps','felexia_dossier_documents','felexia_dossier_notes']) {
    assert.match(sql, new RegExp(`alter table public\\.${table} enable row level security`));
    assert.match(sql, new RegExp(`alter table public\\.${table} force row level security`));
  }
  assert.match(sql, /revoke all on table public\.felexia_dossiers from public, anon, authenticated, service_role/);
  assert.equal(/grant [^;]+ to anon/.test(sql), false);
  assert.match(sql, /felexia-dossiers/);
  assert.match(sql, /10485760/);
});

test('without Supabase configuration the dossier API stays quiet and usable', async () => {
  const handler = createDossierHandler({env:{}, fetcher:async () => { throw new Error('network'); }});
  const captured = [];
  const res = {writeHead(status, headers){ captured.push({status, headers}); }, end(body){ captured.push({body}); }};
  await handler({method:'GET', headers:{}, socket:{}}, res);
  assert.equal(captured[0].status, 200);
  assert.deepEqual(JSON.parse(captured[1].body), {ok:true, configured:false, session:null, dossiers:[]});
  assert.equal(JSON.stringify(captured).includes('sb_secret'), false);
});
