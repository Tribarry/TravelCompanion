import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'assets/images/originals/remote');
const MANIFEST=path.join(ROOT,'assets/images/image-sources.json');
const TEXT_EXT=new Set(['.html','.css','.js','.json']);
const SKIP=new Set(['node_modules','.git','assets']);
const URL_RE=/https:\/\/[^\s'"`)\\]+/g;

async function walk(dir){
 const files=[];
 for(const e of await fs.readdir(dir,{withFileTypes:true})){
  if(SKIP.has(e.name))continue;
  const p=path.join(dir,e.name);
  if(e.isDirectory())files.push(...await walk(p));
  else if(TEXT_EXT.has(path.extname(e.name).toLowerCase()))files.push(p);
 }
 return files;
}
function clean(raw){return raw.replace(/[;,}\]]+$/,'')}
function candidate(u){
 try{const x=new URL(u);return /(^|\.)wikimedia\.org$|(^|\.)wikipedia\.org$|(^|\.)unsplash\.com$/.test(x.hostname)}catch{return false}
}
function ext(type,url){
 if(type?.includes('png'))return '.png';
 if(type?.includes('webp'))return '.webp';
 if(type?.includes('gif'))return '.gif';
 const m=new URL(url).pathname.match(/\.(jpe?g|png|webp|gif)$/i);return m?'.'+m[1].toLowerCase().replace('jpeg','jpg'):'.jpg';
}
function slug(u){
 let s='image';try{s=decodeURIComponent(new URL(u).pathname.split('/').pop()||'image')}catch{}
 s=s.replace(/\.[a-z0-9]+$/i,'').normalize('NFKD').replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-|-$/g,'').toLowerCase().slice(0,70)||'image';
 return `${s}-${crypto.createHash('sha1').update(u).digest('hex').slice(0,8)}`;
}
await fs.mkdir(OUT,{recursive:true});
const files=await walk(ROOT);const refs=new Map();
for(const file of files){
 const text=await fs.readFile(file,'utf8');
 for(const m of text.matchAll(URL_RE)){const u=clean(m[0]);if(candidate(u)){if(!refs.has(u))refs.set(u,new Set());refs.get(u).add(path.relative(ROOT,file))}}
}
const manifest=[];
for(const [source,usedBy] of refs){
 try{
  const r=await fetch(source,{redirect:'follow',headers:{'User-Agent':'TravelCompanionImageMigration/1.0 (GitHub Actions)'}});
  if(!r.ok)throw new Error(`HTTP ${r.status}`);
  const type=r.headers.get('content-type')||'';if(!type.startsWith('image/'))throw new Error(`Not an image: ${type}`);
  const name=slug(source)+ext(type,r.url);const target=path.join(OUT,name);
  await fs.writeFile(target,Buffer.from(await r.arrayBuffer()));
  manifest.push({source,resolvedSource:r.url,localOriginal:`assets/images/originals/remote/${name}`,usedBy:[...usedBy],licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'});
  console.log('Downloaded',source,'->',path.relative(ROOT,target));
 }catch(error){manifest.push({source,usedBy:[...usedBy],downloadError:String(error),licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'});console.warn('Skipped',source,String(error))}
}
await fs.writeFile(MANIFEST,JSON.stringify({generatedAt:new Date().toISOString(),note:'Source URLs were already referenced by the app. Licence and attribution must be checked before relying on local copies.',images:manifest},null,2)+'\n');
console.log(`Recorded ${manifest.length} remote image source(s).`);
