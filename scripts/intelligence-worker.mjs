import {loadEnvFile} from 'node:process';
import {setTimeout} from 'node:timers/promises';
import {runtimeEngine} from '../src/intelligence/runtime.mjs';
try{loadEnvFile();}catch(error){if(error.code!=='ENOENT')throw error;}
const once=process.argv.includes('--once');
const engine=await runtimeEngine();
if(!engine.config.enabled)throw new Error('FELEXIA_INTELLIGENCE_ENABLED must be true');
let stopping=false;
process.on('SIGTERM',()=>{stopping=true;});process.on('SIGINT',()=>{stopping=true;});
do {
  try{const result=await engine.tick();console.log(JSON.stringify({at:new Date().toISOString(),...result}));}
  catch(error){console.error(JSON.stringify({at:new Date().toISOString(),code:error.code||error.name}));if(once)process.exitCode=1;}
  if(once||stopping)break;
  await setTimeout(60000);
}while(!stopping);
