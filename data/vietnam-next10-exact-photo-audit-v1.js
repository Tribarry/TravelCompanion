/* Vietnam exact-photo audit + remaining-destination stencil — 2026-09-12.
 * Keeps the audited next-10 exact matches and extends the approved Sài Gòn /
 * Cái Bè / Sa Đéc food-card stencil through every remaining Vietnam stop.
 * Exact/verified visuals only: unresolved slots stay PHOTO TO VERIFY rather
 * than receiving a destination-generic or loosely related image.
 * Remote source licence/attribution remains TO CHECK pending user audit.
 */
(()=>{
'use strict';
if(window.__VN_NEXT10_EXACT_PHOTO_AUDIT_V1__)return;window.__VN_NEXT10_EXACT_PHOTO_AUDIT_V1__=true;
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ').trim();
const APPROVED_THROUGH_INDEX=12;
const SOURCES={
 caiRang:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/CanThoFloatingMarket.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:CanThoFloatingMarket.jpg',subject:'Cái Răng floating market, Cần Thơ',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'},
 chauDoc:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Chau%20Doc%20Floating%20Village.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:Chau_Doc_Floating_Village.jpg',subject:'Châu Đốc floating village',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'},
 baChuaXu:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Mi%E1%BA%BFu%20b%C3%A0%20Ch%C3%BAa%20x%E1%BB%A9%20N%C3%BAi%20Sam%2C%20ng%C3%A0y%2001%20th%C3%A1ng%204%20n%C4%83m%202014%20%281%29.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:Mi%E1%BA%BFu_b%C3%A0_Ch%C3%BAa_x%E1%BB%A9_N%C3%BAi_Sam,_ng%C3%A0y_01_th%C3%A1ng_4_n%C4%83m_2014_(1).jpg',subject:'Miếu Bà Chúa Xứ, Núi Sam',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'},
 hangPagoda:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Ch%C3%B9a%20Hang.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:Ch%C3%B9a_Hang.jpg',subject:'Hang Pagoda (Phước Điền Tự), Núi Sam',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'},
 tayAn:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Ch%C3%B9a%20T%C3%A2y%20An%20n%C3%BAi%20Sam.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:Ch%C3%B9a_T%C3%A2y_An_n%C3%BAi_Sam.jpg',subject:'Tây An Pagoda, Núi Sam',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'},
 traSu:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Tra%20Su%20Cajuput%20Forest%2C%20An%20Giang%2C%20Viet%20Nam.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:Tra_Su_Cajuput_Forest,_An_Giang,_Viet_Nam.jpg',subject:'Trà Sư Cajuput Forest',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'},
 taPa:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/N%C3%BAi%20T%C3%A0%20p%E1%BA%A1%2C%20tri%20ton%20-An%20giang%2C%20Vietnam%20-%20panoramio.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:N%C3%BAi_T%C3%A0_p%E1%BA%A1,_tri_ton_-An_giang,_Vietnam_-_panoramio.jpg',subject:'Tà Pạ, Tri Tôn',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'},
 thachDong:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Thachdong.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:Thachdong.jpg',subject:'Thạch Động, Hà Tiên',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'},
 daDung:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Trong%20hang%20n%C3%BAi%20%C4%90%C3%A1%20D%E1%BB%B1ng.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:Trong_hang_n%C3%BAi_%C4%90%C3%A1_D%E1%BB%B1ng.jpg',subject:'Đá Dựng cave, Hà Tiên',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'},
 ghositaram:{url:'https://thamhiemmekong.com/wp-content/uploads/2020/04/chuaGhositaram01.jpg',sourcePage:'https://thamhiemmekong.com/thong-tin-du-lich-mien-tay/van-canh-chua-ghositaram-bac-lieu.html',subject:'Ghositaram Pagoda, Bạc Liêu',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'}
};
window.VN_NEXT10_AUDITED_PHOTO_SOURCES=SOURCES;
function setBg(el,url,spotlight=false){
 if(!el||!url)return;
 el.dataset.vnExactAudit='1';el.dataset.photoVerified='true';
 el.style.setProperty('background-image',spotlight?`linear-gradient(180deg,rgba(0,0,0,.04) 18%,rgba(0,0,0,.16) 48%,rgba(0,0,0,.88) 100%),url("${url}")`:`url("${url}")`,'important');
 el.style.setProperty('background-size','cover','important');el.style.setProperty('background-position','center','important');
 el.classList.remove('vnFallback','tc1NoPhoto','tc1TextOnly');
}
const MATCHES=[
 [/cai rang before dawn|cai rang floating market|cay beo trading poles|hu tieu from vendor boat/,SOURCES.caiRang],
 [/ba chua xu/,SOURCES.baChuaXu],[/hang pagoda|caves around hang pagoda/,SOURCES.hangPagoda],[/tay an/,SOURCES.tayAn],
 [/tra su|sampan|tac rang|both boats in one journey|duckweed ecology|flood ecology/,SOURCES.traSu],
 [/ta pa/,SOURCES.taPa],[/thach dong/,SOURCES.thachDong],[/da dung/,SOURCES.daDung],[/ghositaram/,SOURCES.ghositaram]
];
function sourceFor(title){const q=norm(title);return MATCHES.find(([rx])=>rx.test(q))?.[1]||null}
function hydrateExactNextTen(){
 const here=norm(document.querySelector('.tc1DestBody h1')?.textContent);
 if(here==='chau doc nui sam')setBg(document.querySelector('.tc1DestHero'),SOURCES.chauDoc.url,true);
 document.querySelectorAll('.tc1Exp').forEach(card=>{const src=sourceFor(card.querySelector('h3')?.textContent);if(src)setBg(card.querySelector('.tc1ExpPhoto'),src.url)});
 document.querySelectorAll('.tc1SpotlightHero,.tc1SpotlightCard').forEach(card=>{const src=sourceFor(card.querySelector('b')?.textContent);if(src)setBg(card,src.url,true)});
}
let manifestPromise=null;
function ensureManifest(){
 if(window.VN_PHOTO_MANIFEST)return Promise.resolve(window.VN_PHOTO_MANIFEST);
 if(manifestPromise)return manifestPromise;
 manifestPromise=new Promise(resolve=>{
  const existing=document.querySelector('script[data-vn-remaining-manifest]');
  if(existing){existing.addEventListener('load',()=>resolve(window.VN_PHOTO_MANIFEST||{}),{once:true});setTimeout(()=>resolve(window.VN_PHOTO_MANIFEST||{}),1200);return}
  const s=document.createElement('script');s.src='data/vietnam-photo-manifest-v1.js?v=20260912-local-v1';s.dataset.vnRemainingManifest='1';s.async=true;
  s.onload=()=>resolve(window.VN_PHOTO_MANIFEST||{});s.onerror=()=>resolve({});document.head.appendChild(s);
 });
 return manifestPromise;
}
async function exactManifestUrl(label){
 const q=norm(label);if(!q)return'';
 const manifest=await ensureManifest();
 for(const [key,value] of Object.entries(manifest||{}))if(norm(key)===q&&value?.local)return value.local;
 return'';
}
function currentVietnamIndex(){
 const title=norm(document.querySelector('.tc1DestBody h1')?.textContent);if(!title)return-1;
 const list=window.DATA?.destinations?.vietnam||[];
 return list.findIndex(d=>norm(d?.name)===title);
}
function ensurePhotoElement(card,title){
 let photo=card?.querySelector('.tc1PassPhoto');if(photo)return photo;
 photo=document.createElement('div');photo.className='tc1PassPhoto vnFallback';photo.dataset.vnimg=title;photo.dataset.label=title;card.prepend(photo);return photo;
}
async function hydrateCardExact(card,title,spotlight=false){
 if(!card||!title)return;
 const target=spotlight?card:card.querySelector('.tc1ExpPhoto');
 if(target?.dataset?.vnExactAudit==='1'||target?.dataset?.photoVerified==='true')return;
 const exact=await exactManifestUrl(title);if(exact)setBg(target,exact,spotlight);
}
async function hydrateRemainingStencil(){
 const idx=currentVietnamIndex();if(idx<=APPROVED_THROUGH_INDEX)return;
 const grid=document.querySelector('.tc1FoodPassGrid');
 if(grid){
  grid.classList.add('tc1ReferenceFoodGrid');
  const cards=[...grid.querySelectorAll('.tc1FoodPass')];
  for(const card of cards){
   const title=card.querySelector('h3')?.textContent?.trim()||'';if(!title)continue;
   const photo=ensurePhotoElement(card,title);const exact=await exactManifestUrl(title);
   if(exact)setBg(photo,exact);else{photo.dataset.vnimg=title;photo.dataset.label='PHOTO TO VERIFY';photo.dataset.photoVerified='false'}
  }
 }
 const expCards=[...document.querySelectorAll('.tc1Exp')];
 for(const card of expCards){const title=card.querySelector('h3')?.textContent?.trim()||'';if(title)await hydrateCardExact(card,title,false)}
 const spotlights=[...document.querySelectorAll('.tc1SpotlightHero,.tc1SpotlightCard')];
 for(const card of spotlights){const title=card.querySelector('b')?.textContent?.trim()||'';if(title)await hydrateCardExact(card,title,true)}
 if(typeof window.hydrateVN==='function')window.hydrateVN();
}
let queued=false;
function run(){
 queued=false;hydrateExactNextTen();
 hydrateRemainingStencil().catch(()=>{});
}
function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{run();setTimeout(run,180)})}
new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
})();
