/* Vietnam exact-photo audit + remaining-destination stencil — 2026-09-13.
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
const S=(url,sourcePage,subject)=>({url,sourcePage,subject,licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'});
const SOURCES={
 caiRang:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/CanThoFloatingMarket.jpg?width=1600','https://commons.wikimedia.org/wiki/File:CanThoFloatingMarket.jpg','Cái Răng floating market, Cần Thơ'),
 saDec:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/S%C3%B4ng%20Sa%20%C4%90%C3%A9c.jpg?width=1600','https://commons.wikimedia.org/wiki/File:S%C3%B4ng_Sa_%C4%90%C3%A9c.jpg','Sa Đéc River, Sa Đéc'),
 chauDoc:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/Mountain%20Nui%20Sam%2C%20Chau%20Doc.jpg?width=1600','https://commons.wikimedia.org/wiki/File:Mountain_Nui_Sam,_Chau_Doc.jpg','Núi Sam, Châu Đốc'),
 baChuaXu:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/Mi%E1%BA%BFu%20b%C3%A0%20Ch%C3%BAa%20x%E1%BB%A9%20N%C3%BAi%20Sam%2C%20ng%C3%A0y%2001%20th%C3%A1ng%204%20n%C4%83m%202014%20%281%29.jpg?width=1600','https://commons.wikimedia.org/wiki/File:Mi%E1%BA%BFu_b%C3%A0_Ch%C3%BAa_x%E1%BB%A9_N%C3%BAi_Sam,_ng%C3%A0y_01_th%C3%A1ng_4_n%C4%83m_2014_(1).jpg','Miếu Bà Chúa Xứ, Núi Sam'),
 hangPagoda:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/Ch%C3%B9a%20Hang.jpg?width=1600','https://commons.wikimedia.org/wiki/File:Ch%C3%B9a_Hang.jpg','Hang Pagoda (Phước Điền Tự), Núi Sam'),
 tayAn:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/Ch%C3%B9a%20T%C3%A2y%20An%20n%C3%BAi%20Sam.jpg?width=1600','https://commons.wikimedia.org/wiki/File:Ch%C3%B9a_T%C3%A2y_An_n%C3%BAi_Sam.jpg','Tây An Pagoda, Núi Sam'),
 traSu:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/Tra%20Su%20Cajuput%20Forest%2C%20An%20Giang%2C%20Viet%20Nam.jpg?width=1600','https://commons.wikimedia.org/wiki/File:Tra_Su_Cajuput_Forest,_An_Giang,_Viet_Nam.jpg','Trà Sư Cajuput Forest'),
 bayNui:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/N%C3%BAi%20%E1%BB%9F%20An%20Giang.jpg?width=1600','https://commons.wikimedia.org/wiki/File:N%C3%BAi_%E1%BB%9F_An_Giang.jpg','Bảy Núi / Núi Cấm landscape, An Giang'),
 taPa:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/N%C3%BAi%20T%C3%A0%20p%E1%BA%A1%2C%20tri%20ton%20-An%20giang%2C%20Vietnam%20-%20panoramio.jpg?width=1600','https://commons.wikimedia.org/wiki/File:N%C3%BAi_T%C3%A0_p%E1%BA%A1,_tri_ton_-An_giang,_Vietnam_-_panoramio.jpg','Tà Pạ, Tri Tôn'),
 thachDong:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/Thachdong.jpg?width=1600','https://commons.wikimedia.org/wiki/File:Thachdong.jpg','Thạch Động, Hà Tiên'),
 daDung:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/Trong%20hang%20n%C3%BAi%20%C4%90%C3%A1%20D%E1%BB%B1ng.jpg?width=1600','https://commons.wikimedia.org/wiki/File:Trong_hang_n%C3%BAi_%C4%90%C3%A1_D%E1%BB%B1ng.jpg','Đá Dựng cave, Hà Tiên'),
 ghositaram:S('https://thamhiemmekong.com/wp-content/uploads/2020/04/chuaGhositaram01.jpg','https://thamhiemmekong.com/thong-tin-du-lich-mien-tay/van-canh-chua-ghositaram-bac-lieu.html','Ghositaram Pagoda, Bạc Liêu'),
 vinhLong:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/V%C4%A9nh%20Long%20b%C3%AAn%20s%C3%B4ng%20C%E1%BB%95%20Chi%C3%AAn.jpg?width=1600','https://commons.wikimedia.org/wiki/File:V%C4%A9nh_Long_b%C3%AAn_s%C3%B4ng_C%E1%BB%95_Chi%C3%AAn.jpg','Vĩnh Long beside the Cổ Chiên River'),
 khamDuc:S('https://bqn.1cdn.vn/2024/02/11/tnb-62411.jpg','https://baodanang.vn/quy-hoach-do-thi-mien-nui-3129831.html','Khâm Đức mountain town, Phước Sơn'),
 prao:S('https://bqn.1cdn.vn/2024/05/06/z5288162023590_a3991b3406e32cee5b81b61d81f057fe.jpg','https://baodanang.vn/quang-nam-phe-duyet-dieu-chinh-cuc-bo-quy-hoach-chung-do-thi-prao-dong-giang-3134138.html','Prao town, Đông Giang'),
 haiVan:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/The%20H%E1%BA%A3i%20V%C3%A2n%20Pass%2C%20Vietnam%20%287090608927%29.jpg?width=1600','https://commons.wikimedia.org/wiki/File:The_H%E1%BA%A3i_V%C3%A2n_Pass,_Vietnam_(7090608927).jpg','Hải Vân Pass roadway'),
 muCangChai:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/Mu%20Cang%20Chai.jpg?width=1600','https://commons.wikimedia.org/wiki/File:Mu_Cang_Chai.jpg','Mù Cang Chải rice terraces'),
 yTy:S('https://cdn.baophapluat.vn/w1280/uploaded/nguyenvanhai/2024_12_24/z6131918901057-005a512adb26baefcd5e349456253b36-6010.jpg','https://baophapluat.vn/bien-may-huyen-ao-tren-vung-cao-y-ty-bat-xat-lao-cai-post535950.html','Y Tý highland village, Lào Cai')
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
 /* A source is deliberately assigned once only. Similar nearby activities
    remain PHOTO TO VERIFY until there is a distinct, exact photograph. */
 [/cay beo trading poles/,SOURCES.caiRang],
 [/ba chua xu/,SOURCES.baChuaXu],[/^hang pagoda$/i,SOURCES.hangPagoda],[/^tay an/i,SOURCES.tayAn],
 [/ta pa/,SOURCES.taPa],[/thach dong/,SOURCES.thachDong],[/da dung/,SOURCES.daDung],[/ghositaram/,SOURCES.ghositaram]
];
const DESTINATION_GAPS={
 'sa dec':SOURCES.saDec,
 'tinh bien tri ton':SOURCES.bayNui,
 'bac lieu':SOURCES.ghositaram,
 'vinh long mang thit':SOURCES.vinhLong,
 'vinh long ben tre':SOURCES.vinhLong,
 'kham duc phuoc son':SOURCES.khamDuc,
 'prao dong giang':SOURCES.prao,
 'hai van lang co':SOURCES.haiVan,
 'hai van pass':SOURCES.haiVan,
 'mu cang chai':SOURCES.muCangChai,
 'y ty':SOURCES.yTy
};
function sourceFor(title){const q=norm(title);return MATCHES.find(([rx])=>rx.test(q))?.[1]||null}
function hydrateExactNextTen(){
 const here=norm(document.querySelector('.tc1DestBody h1')?.textContent);
 if(here==='chau doc nui sam')setBg(document.querySelector('.tc1DestHero'),SOURCES.chauDoc.url,true);
 /* The old manifest entry was the Trà Sư tourism logo, not a photograph. */
 if(here==='tra su')setBg(document.querySelector('.tc1DestHero'),SOURCES.traSu.url,true);
 const gap=DESTINATION_GAPS[here];if(gap)setBg(document.querySelector('.tc1DestHero'),gap.url,true);
 document.querySelectorAll('.tc1Exp').forEach(card=>{const src=sourceFor(card.querySelector('h3')?.textContent);if(src)setBg(card.querySelector('.tc1ExpPhoto'),src.url)});
 document.querySelectorAll('.tc1SpotlightHero,.tc1SpotlightCard').forEach(card=>{const src=sourceFor(card.querySelector('b')?.textContent);if(src)setBg(card,src.url,true)});
 document.querySelectorAll('.tc1Place').forEach(card=>{
  const title=norm(card.querySelector('h3')?.textContent);
  const src=title==='chau doc nui sam'?SOURCES.chauDoc:title==='tra su'?SOURCES.traSu:DESTINATION_GAPS[title];
  if(src)setBg(card.querySelector('.tc1PlacePhoto'),src.url);
 });
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
