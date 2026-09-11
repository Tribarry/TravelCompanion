import fs from 'node:fs/promises';
import path from 'node:path';

const root=process.cwd();
const manifestPath=path.join(root,'assets/images/image-sources.json');
const manifest=JSON.parse(await fs.readFile(manifestPath,'utf8'));
const exts=new Set(['.html','.css','.js','.json']);
const skip=new Set(['.git','node_modules','assets']);

async function exists(p){try{await fs.access(p);return true}catch{return false}}
async function walk(dir,out=[]){for(const e of await fs.readdir(dir,{withFileTypes:true})){if(skip.has(e.name))continue;const p=path.join(dir,e.name);if(e.isDirectory())await walk(p,out);else if(exts.has(path.extname(e.name)))out.push(p)}return out}

const replacements=[];
for(const img of manifest.images||[]){
  if(!img.source||!img.localOriginal||img.downloadError)continue;
  const rel=img.localOriginal.replace(/^assets\/images\/originals\//,'').replace(/\.[^.]+$/,'');
  const candidates=[1600,1200,800,480].map(w=>`assets/images/generated/${rel}-${w}.webp`);
  let local='';
  for(const c of candidates){if(await exists(path.join(root,c))){local=c;break}}
  if(local)replacements.push([img.source,local]);
}

let filesChanged=0,refsChanged=0;
for(const file of await walk(root)){
  let text=await fs.readFile(file,'utf8'),next=text;
  for(const [remote,local] of replacements){
    if(!next.includes(remote))continue;
    const count=next.split(remote).length-1;
    next=next.split(remote).join(local);
    refsChanged+=count;
  }
  if(next!==text){await fs.writeFile(file,next);filesChanged++}
}
console.log(`Rewrote ${refsChanged} remote image references across ${filesChanged} files.`);
