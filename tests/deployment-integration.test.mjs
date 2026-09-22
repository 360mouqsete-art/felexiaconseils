import {test} from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {createServer} from '../server.mjs';

const valid=()=>({name:'Test Felexia',email:'qa@example.test',message:'Test local de validation uniquement.',kind:'contact',locale:'fr',language:'fr',consent:'yes',service:'creation-entreprise',requestId:crypto.randomUUID()});
async function fixture(options,fn){const server=createServer(options);server.listen(0,'127.0.0.1');await once(server,'listening');try{await fn('http://127.0.0.1:'+server.address().port);}finally{server.closeAllConnections();await new Promise(r=>server.close(r));}}
const post=(base,data,headers={})=>fetch(base+'/api/contact',{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(data)});

test('production accepts only configured site and trusted Vercel origins',async()=>fixture({env:{NODE_ENV:'production',SITE_URL:'https://felexiaconseils.com',VERCEL:'1',VERCEL_URL:'felexia-test-360mouqsete-art.vercel.app',CONTACT_WEBHOOK_URL:'https://crm.example.test/inquiry'},fetcher:async()=>new Response('{}',{status:200})},async base=>{
  assert.equal((await post(base,valid(),{Origin:'https://felexiaconseils.com'})).status,200);
  assert.equal((await post(base,valid(),{Origin:'https://www.felexiaconseils.com'})).status,200);
  assert.equal((await post(base,valid(),{Origin:'https://felexia-test-360mouqsete-art.vercel.app'})).status,200);
  assert.equal((await post(base,valid(),{Origin:'https://unrelated.vercel.app'})).status,403);
  assert.equal((await post(base,valid(),{Origin:base})).status,403);
}));

test('contact handler stores a Supabase lead and preserves conflicts across cache keys',async()=>{
  let saved;let calls=0;
  await fixture({env:{SUPABASE_URL:'https://example.supabase.co',SUPABASE_SECRET_KEY:'sb_secret_test_only'},fetcher:async(url,options)=>{
    calls++;
    if(options.method==='GET')return Response.json([{request_id:saved.request_id,reference:saved.reference,payload_hash:saved.payload_hash}]);
    if(saved)return Response.json([]);
    saved=JSON.parse(options.body);return Response.json([{request_id:saved.request_id,reference:saved.reference,payload_hash:saved.payload_hash}]);
  }},async base=>{
    const data=valid();assert.equal((await post(base,data)).status,200);assert.equal(saved.payload.email,data.email);
    assert.equal((await post(base,data)).status,200);assert.equal(calls,1);
    const changed=await post(base,{...data,message:'Un contenu différent ne doit pas remplacer le dossier initial.'});assert.equal(changed.status,409);assert.equal((await changed.json()).code,'idempotency_conflict');assert.equal(saved.payload.message,data.message);
  });
});
