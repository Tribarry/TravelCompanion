import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT=process.cwd();
const SOURCE=path.join(ROOT,'data/vietnam-photo-alignment-v026.js');
const OUT=path.join(ROOT,'assets/images/originals/vietnam-resolved');
const MANIFEST=path.join(ROOT,'data/vietnam-photo-manifest-v1.js');
const text=await fs.readFile(SOURCE,'utf8');
const titles=new Set();
for(const m of text.matchAll(/'([^']+)'\s*[:,\]]/g)){
 const v=m[1];
 if(v && !/^(?:sum:|PHOTO TO VERIFY|true|false)$/i.test(v))titles.add(v);
}
await fs.mkdir(OUT,{recursive:true});
const result={};
function slug(s){return s.normalize('NFKD').replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-|-$/g,'').toLowerCase().slice(0,70)||'photo'}
function ext(type,url){if(type.includes('png'))return'.png';if(type.includes('webp'))return'.webp';const m=new URL(url).pathname.match(/\.(jpe?g|png|webp)$/i);return m?'.'+m[1].toLowerCase().replace('jpeg','jpg'):'.jpg'}
for(const title of [...titles].sort()){
 try{
  const s=await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(title),{headers:{'User-Agent':'TravelCompanionBuild/1.0'}});
  if(!s.ok)continue;
  const j=await s.json();if(j.type==='disambiguation')continue;
  const remote=j.originalimage?.source||j.thumbnail?.source||'';if(!remote)continue;
  const r=await fetch(remote,{redirect:'follow',headers:{'User-Agent':'TravelCompanionBuild/1.0'}});if(!r.ok)continue;
  const type=r.headers.get('content-type')||'';if(!type.startsWith('image/'))continue;
  const hash=crypto.createHash('sha1').update(title+'|'+remote).digest('hex').slice(0,8);
  const name=`${slug(title)}-${hash}${ext(type,r.url)}`;
  await fs.writeFile(path.join(OUT,name),Buffer.from(await r.arrayBuffer()));
  result[title]={source:remote,original:`assets/images/originals/vietnam-resolved/${name}`,licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'};
  console.log('Resolved',title);
 }catch(e){console.warn('Unresolved',title,String(e))}
}
const js=`/* Generated at build time. Do not hand-edit. Licence/attribution remain TO CHECK. */\nwindow.VN_PHOTO_MANIFEST=${JSON.stringify(result,null,2)};\n`;
await fs.writeFile(MANIFEST,js);
console.log(`Resolved ${Object.keys(result).length} Vietnam photo titles.`);
