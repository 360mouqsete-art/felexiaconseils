import {readFile} from 'node:fs/promises';
import {loadEnvFile} from 'node:process';
import {runtimeEngine} from '../src/intelligence/runtime.mjs';
try{loadEnvFile();}catch(error){if(error.code!=='ENOENT')throw error;}
const reserve=JSON.parse(await readFile(new URL('../src/intelligence/reserve.json',import.meta.url),'utf8'));
const supplement=JSON.parse(await readFile(new URL('../src/intelligence/reserve-supplement.json',import.meta.url),'utf8'));
reserve.topics.push(...supplement.topics);
const engine=await runtimeEngine();
console.log(JSON.stringify(await engine.importTopics(reserve.topics,reserve.sources)));
const published=new Set((await engine.summaries()).topics.filter(topic=>topic.status==='published').map(topic=>topic.id));
for(const topic of reserve.topics.filter(t=>t.translations&&!published.has(t.id))){
  const result=await engine.prepareTopic(topic.id);
  console.log(JSON.stringify({id:topic.id,ready:result.ok,blocked:result.checks.filter(c=>!c.ok)}));
}
