import fs from 'node:fs/promises';
import path from 'node:path';
const ROOT=process.cwd(), file=path.join(ROOT,'data/vietnam-photo-manifest-v1.js');
let text=await fs.readFile(file,'utf8');
const raw=JSON.parse(text.slice(text.indexOf('{'),text.lastIndexOf('}')+1));
for(const v of Object.values(raw)){
 const rel=v.original.replace('assets/images/originals/','');
 const dir=path.dirname(rel),base=path.basename(rel,path.extname(rel));
 const candidates=[1600,1200,800,480];
 let chosen='';
 for(const w of candidates){const p=`assets/images/generated/${dir}/${base}-${w}.webp`;try{await fs.access(path.join(ROOT,p));chosen=p;break}catch{}}
 v.local=chosen;
}
await fs.writeFile(file,`/* Generated at build time. Do not hand-edit. Licence/attribution remain TO CHECK. */\nwindow.VN_PHOTO_MANIFEST=${JSON.stringify(raw,null,2)};\n`);
