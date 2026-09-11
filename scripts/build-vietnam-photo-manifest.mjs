import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT=process.cwd();
const SOURCE=path.join(ROOT,'data/vietnam-photo-alignment-v026.js');
const OUT=path.join(ROOT,'assets/images/originals/vietnam-resolved');
const MANIFEST=path.join(ROOT,'data/vietnam-photo-manifest-v1.js');
const text=await fs.readFile(SOURCE,'utf8');
const titles=new Set();

// Extract only the explicit Wikipedia-title mappings used by the runtime.
// DEST is key:value; LANDMARKS/DISHES are [RegExp,'title'] tuples.
const destBlock=text.match(/const DEST=\{([\s\S]*?)\n\};/);
if(!destBlock) throw new Error('Could not locate DEST mapping');
for(const m of destBlock[1].matchAll(/'[^']+'\s*:\s*'([^']+)'/g)) titles.add(m[1]);

for(const blockName of ['LANDMARKS','DISHES']){
 const block=text.match(new RegExp(`const ${blockName}=\\[([\\s\\S]*?)\\n\\];`));
 if(!block) throw new Error(`Could not locate ${blockName} mapping`);
 for(const m of block[1].matchAll(/\]\s*,?\s*$|\[\s*\/[^\n]+?\/[^,]*,\s*'([^']+)'\s*\]/gm)){
  if(m[1]) titles.add(m[1]);
 }
 for(const m of block[1].matchAll(/,\s*'([^']+)'\s*\]/g)) titles.add(m[1]);
}

if(titles.size < 50) throw new Error(`Only extracted ${titles.size} titles; refusing incomplete build`);
console.log(`Extracted ${titles.size} explicit Vietnam photo titles.`);

await fs.mkdir(OUT,{recursive:true});
let existing={};
try{
 const old=await fs.readFile(MANIFEST,'utf8');
 const start=old.indexOf('{'),end=old.lastIndexOf('}');
 if(start>=0&&end>start) existing=JSON.parse(old.slice(start,end+1));
}catch{}
const result={...existing};

const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const USER_AGENT='TravelCompanionBuild/1.1 (GitHub Actions; image localisation)';
const REQUEST_GAP_MS=900;
let lastRequestAt=0;

async function politeFetch(url,options={},attempts=6){
 for(let attempt=0;attempt<attempts;attempt++){
  const wait=Math.max(0,REQUEST_GAP_MS-(Date.now()-lastRequestAt));
  if(wait) await sleep(wait);
  lastRequestAt=Date.now();
  let response;
  try{
   response=await fetch(url,{...options,headers:{'User-Agent':USER_AGENT,...(options.headers||{})}});
  }catch(err){
   if(attempt===attempts-1) throw err;
   await sleep(Math.min(30000,1500*(2**attempt)));
   continue;
  }
  if(response.status!==429&&response.status<500) return response;
  if(attempt===attempts-1) return response;
  const retryAfter=Number(response.headers.get('retry-after'));
  const backoff=Number.isFinite(retryAfter)&&retryAfter>0
   ? retryAfter*1000
   : Math.min(60000,2000*(2**attempt));
  console.warn(`Rate/server limited ${response.status}; retrying in ${Math.round(backoff/1000)}s`);
  await sleep(backoff);
 }
}

function slug(s){return s.normalize('NFKD').replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-|-$/g,'').toLowerCase().slice(0,70)||'photo'}
function ext(type,url){if(type.includes('png'))return'.png';if(type.includes('webp'))return'.webp';const m=new URL(url).pathname.match(/\.(jpe?g|png|webp)$/i);return m?'.'+m[1].toLowerCase().replace('jpeg','jpg'):'.jpg'}

let newlyResolved=0;
for(const title of [...titles].sort()){
 if(result[title]?.original){
  try{await fs.access(path.join(ROOT,result[title].original));console.log('Already resolved',title);continue}catch{}
 }
 try{
  const s=await politeFetch('https://en.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(title));
  if(!s.ok){console.warn('No summary',title,s.status);continue}
  const j=await s.json();
  if(j.type==='disambiguation'){console.warn('Disambiguation',title);continue}
  const remote=j.originalimage?.source||j.thumbnail?.source||'';
  if(!remote){console.warn('No image',title);continue}
  const r=await politeFetch(remote,{redirect:'follow'});
  if(!r.ok){console.warn('Image download failed',title,r.status);continue}
  const type=r.headers.get('content-type')||'';
  if(!type.startsWith('image/')){console.warn('Not image',title,type);continue}
  const hash=crypto.createHash('sha1').update(title+'|'+remote).digest('hex').slice(0,8);
  const name=`${slug(title)}-${hash}${ext(type,r.url)}`;
  await fs.writeFile(path.join(OUT,name),Buffer.from(await r.arrayBuffer()));
  result[title]={source:remote,original:`assets/images/originals/vietnam-resolved/${name}`,licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'};
  newlyResolved++;
  console.log('Resolved',title);
 }catch(e){console.warn('Unresolved',title,String(e))}
}
const js=`/* Generated at build time. Do not hand-edit. Licence/attribution remain TO CHECK. */\nwindow.VN_PHOTO_MANIFEST=${JSON.stringify(result,null,2)};\n`;
await fs.writeFile(MANIFEST,js);
console.log(`Manifest now contains ${Object.keys(result).length} of ${titles.size} Vietnam photo titles (${newlyResolved} newly resolved).`);
