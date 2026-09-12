/* Vietnam next-10 exact-photo audit — 2026-09-12.
 * Explicit subject matches only. No destination-generic fallback.
 * Remote source licence/attribution remains TO CHECK pending user audit.
 */
(()=>{
'use strict';
if(window.__VN_NEXT10_EXACT_PHOTO_AUDIT_V1__)return;window.__VN_NEXT10_EXACT_PHOTO_AUDIT_V1__=true;
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ').trim();
const SOURCES={
 caiRang:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/CanThoFloatingMarket.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:CanThoFloatingMarket.jpg',subject:'Cái Răng floating market, Cần Thơ',licenseStatus:'CC BY-SA 3.0',attributionStatus:'REQUIRED'},
 chauDoc:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Chau%20Doc%20Floating%20Village.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:Chau_Doc_Floating_Village.jpg',subject:'Châu Đốc floating village',licenseStatus:'COMMONS · CHECK FILE PAGE',attributionStatus:'REQUIRED'},
 baChuaXu:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Mi%E1%BA%BFu%20b%C3%A0%20Ch%C3%BAa%20x%E1%BB%A9%20N%C3%BAi%20Sam%2C%20ng%C3%A0y%2001%20th%C3%A1ng%204%20n%C4%83m%202014%20%281%29.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:Mi%E1%BA%BFu_b%C3%A0_Ch%C3%BAa_x%E1%BB%A9_N%C3%BAi_Sam,_ng%C3%A0y_01_th%C3%A1ng_4_n%C4%83m_2014_(1).jpg',subject:'Miếu Bà Chúa Xứ, Núi Sam',licenseStatus:'COMMONS · CHECK FILE PAGE',attributionStatus:'REQUIRED'},
 hangPagoda:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Ch%C3%B9a%20Hang.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:Ch%C3%B9a_Hang.jpg',subject:'Hang Pagoda (Phước Điền Tự), Núi Sam',licenseStatus:'CC BY-SA 3.0',attributionStatus:'REQUIRED'},
 tayAn:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Ch%C3%B9a%20T%C3%A2y%20An%20n%C3%BAi%20Sam.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:Ch%C3%B9a_T%C3%A2y_An_n%C3%BAi_Sam.jpg',subject:'Tây An Pagoda, Núi Sam',licenseStatus:'COMMONS · CHECK FILE PAGE',attributionStatus:'REQUIRED'},
 traSu:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Tra%20Su%20Cajuput%20Forest%2C%20An%20Giang%2C%20Viet%20Nam.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:Tra_Su_Cajuput_Forest,_An_Giang,_Viet_Nam.jpg',subject:'Trà Sư Cajuput Forest',licenseStatus:'COMMONS · CHECK FILE PAGE',attributionStatus:'REQUIRED'},
 taPa:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/N%C3%BAi%20T%C3%A0%20p%E1%BA%A1%2C%20tri%20ton%20-An%20giang%2C%20Vietnam%20-%20panoramio.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:N%C3%BAi_T%C3%A0_p%E1%BA%A1,_tri_ton_-An_giang,_Vietnam_-_panoramio.jpg',subject:'Tà Pạ, Tri Tôn',licenseStatus:'COMMONS · CHECK FILE PAGE',attributionStatus:'REQUIRED'},
 thachDong:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Thachdong.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:Thachdong.jpg',subject:'Thạch Động, Hà Tiên',licenseStatus:'CC BY-SA 3.0',attributionStatus:'REQUIRED'},
 daDung:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Trong%20hang%20n%C3%BAi%20%C4%90%C3%A1%20D%E1%BB%B1ng.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:Trong_hang_n%C3%BAi_%C4%90%C3%A1_D%E1%BB%B1ng.jpg',subject:'Đá Dựng cave, Hà Tiên',licenseStatus:'CC BY-SA 3.0',attributionStatus:'REQUIRED'},
 ghositaram:{
  url:'https://thamhiemmekong.com/wp-content/uploads/2020/04/chuaGhositaram01.jpg',
  sourcePage:'https://thamhiemmekong.com/thong-tin-du-lich-mien-tay/van-canh-chua-ghositaram-bac-lieu.html',
  subject:'Ghositaram Pagoda, Bạc Liêu',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'
 }
};
window.VN_NEXT10_AUDITED_PHOTO_SOURCES=SOURCES;
function setBg(el,url,spotlight=false){if(!el||!url)return;el.dataset.vnExactAudit='1';el.style.setProperty('background-image',spotlight?`linear-gradient(180deg,rgba(0,0,0,.04) 18%,rgba(0,0,0,.16) 48%,rgba(0,0,0,.88) 100%),url("${url}")`:`url("${url}")`,'important');el.style.setProperty('background-size','cover','important');el.style.setProperty('background-position','center','important');el.classList.remove('vnFallback','tc1NoPhoto','tc1TextOnly')}
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
let queued=false;function run(){queued=false;hydrateExactNextTen()}function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{run();setTimeout(run,180)})}
new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
})();
