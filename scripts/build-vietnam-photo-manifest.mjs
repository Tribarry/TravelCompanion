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
 // Fallback tuple parser, deliberately scoped to this mapping block only.
 for(const m of block[1].matchAll(/,\s*'([^']+)'\s*\]/g)) titles.add(m[1]);
}

if(titles.size < 50) throw new Error(`Only extracted ${titles.size} titles; refusing incomplete build`);
console.log(`Extracted ${titles.size} explicit Vietnam photo titles.`);

await fs.mkdir(OUT,{recursive:true});
const result={};
function slug(s){return s.normalize('NFKD').replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-|-$/g,'').toLowerCase().slice(0,70)||'photo'}
function ext(type,url){if(type.includes('png'))return'.png';if(type.includes('webp'))return'.webp';const m=new URL(url).pathname.match(/\.(jpe?g|png|webp)$/i);return m?'.'+m[1].toLowerCase().replace('jpeg','jpg'):'.jpg'}
for(const title of [...titles].sort()){
 try{
  const s=await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(title),{headers:{'User-Agent':'TravelCompanionBuild/1.0'}});
  if(!s.ok){console.warn('No summary',title,s.status);continue}
  const j=await s.json();if(j.type==='disambiguation'){console.warn('Disambiguation',title);continue}
  const remote=j.originalimage?.source||j.thumbnail?.source||'';if(!remote){console.warn('No image',title);continue}
  const r=await fetch(remote,{redirect:'follow',headers:{'User-Agent':'TravelCompanionBuild/1.0'}});if(!r.ok){console.warn('Image download failed',title,r.status);continue}
  const type=r.headers.get('content-type')||'';if(!type.startsWith('image/')){console.warn('Not image',title,type);continue}
  const hash=crypto.createHash('sha1').update(title+'|'+remote).digest('hex').slice(0,8);
  const name=`${slug(title)}-${hash}${ext(type,r.url)}`;
  await fs.writeFile(path.join(OUT,name),Buffer.from(await r.arrayBuffer()));
  result[title]={source:remote,original:`assets/images/originals/vietnam-resolved/${name}`,licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'};
  console.log('Resolved',title);
 }catch(e){console.warn('Unresolved',title,String(e))}
}
const js=`/* Generated at build time. Do not hand-edit. Licence/attribution remain TO CHECK. */\nwindow.VN_PHOTO_MANIFEST=${JSON.stringify(result,null,2)};\n`;
await fs.writeFile(MANIFEST,js);
console.log(`Resolved ${Object.keys(result).length} of ${titles.size} Vietnam photo titles.`);
