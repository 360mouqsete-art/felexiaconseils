// Optional maintenance command. Uses the existing developer Sharp runtime;
// production does not require Sharp and original brand/photos stay intact.
import {readFile,writeFile,mkdir,readdir} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {homedir} from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
const require=createRequire(import.meta.url);
const sharp=require(require.resolve('sharp',{paths:[process.cwd(),path.join(homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node')]}));
const map={},dimensions={};let saved=0;
await mkdir('public/assets/optimized',{recursive:true});
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const file=dir+'/'+entry.name;if(entry.isDirectory()){if(entry.name!=='optimized')await walk(file);continue;}if(!/\.(png|jpe?g|webp)$/.test(file))continue;const bytes=await readFile(file);const meta=await sharp(bytes).metadata();const url=file.replace(/^public/,'');dimensions[url]=[meta.width,meta.height];if(bytes.length<60000||file.endsWith('.webp'))continue;const logo=/logos\/|logo-original/.test(file);const output=await sharp(bytes).resize({width:logo?480:1280,height:logo?480:1280,fit:'inside',withoutEnlargement:true}).webp({quality:logo?95:84,effort:6}).toBuffer({resolveWithObject:true});if(output.data.length>=bytes.length)continue;const dest='/assets/optimized/'+createHash('sha256').update(output.data).digest('hex').slice(0,16)+'.webp';await writeFile('public'+dest,output.data);map[url]=dest;dimensions[dest]=[output.info.width,output.info.height];saved+=bytes.length-output.data.length;}}
await walk('public');
await writeFile('src/image-dimensions.json',JSON.stringify(dimensions,null,2)+'\n');
await writeFile('src/image-optimized.json',JSON.stringify(map,null,2)+'\n');
console.log(JSON.stringify({optimized:Object.keys(map).length,savedBytes:saved}));
