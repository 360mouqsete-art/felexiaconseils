import {readdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';

async function files(directory) {
  const result=[];
  for(const entry of await readdir(directory,{withFileTypes:true})) {
    const path=`${directory}/${entry.name}`;
    if(entry.isDirectory())result.push(...await files(path));
    else if(/\.(?:mjs|js)$/.test(path))result.push(path);
  }
  return result;
}
const paths=['server.mjs',...(await Promise.all(['src','scripts','tests','api','public'].map(files))).flat()];
let failed=0;
for(const path of paths) {
  const result=spawnSync(process.execPath,['--check',path],{encoding:'utf8'});
  if(result.status!==0){failed++;console.error(`${path}\n${result.stderr||result.error}`);}
}
console.log(`${paths.length} JavaScript files checked; ${failed} syntax errors.`);
if(failed)process.exitCode=1;
