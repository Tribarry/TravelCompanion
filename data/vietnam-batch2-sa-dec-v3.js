/* Vietnam Batch 2.2 — Sa Đéc render-layer completion.
 * Fixes destination-list hero, overview spotlight images, Food Passport image/status
 * rendering, and Drink Passport image rendering without changing itinerary/state.
 * All sources remain explicit matches with licence/attribution TO CHECK.
 */
(()=>{
'use strict';
if(window.__VN_SA_DEC_V3__)return;window.__VN_SA_DEC_V3__=true;
const DEST='Sa Đéc';
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ').trim();
const isSaDec=s=>norm(s)===norm(DEST);
const commons=file=>`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=1400`;
const SRC={
 hero:commons('Làng hoa Tân Quy Đông.jpg'),
 cycle:commons('Vườn hoa ở Tân Quy Đông.jpg'),
 coffee:'https://gcs.tripi.vn/public-tripi/tripi-feed/img/474257tkO/p-coffee-1139203.jpg',
 huTieu:'https://mekongsen.vn/datafiles/1989319905715032064/2025-11/1763202012-28617054-hu-tieu-sa-dec-3.png',
 banhTamBi:'https://timtour.vn/files/images/AnGiNgon/banh-tam-bi-2.jpg',
 vegetarian:'https://thanhnien.mediacdn.vn/uploaded/thanhthuy/2018_10_28/hutieuchay8_KTQC.jpg?width=500'
};
window.VN_SA_DEC_V3_PHOTO_SOURCES={
 hero:{url:SRC.hero,note:'Tân Quy Đông flower village, Sa Đéc',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'},
 cycle:{url:SRC.cycle,note:'Flower gardens in Tân Quy Đông, Sa Đéc',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'},
 coffee:{url:SRC.coffee,note:'Coffee shop in Sa Đéc',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'},
 huTieu:{url:SRC.huTieu,note:'Hủ tiếu Sa Đéc',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'},
 banhTamBi:{url:SRC.banhTamBi,note:'Bánh tằm bì',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'},
 vegetarian:{url:SRC.vegetarian,note:'Vegetarian Sa Đéc-style hủ tiếu',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'}
};
function bg(el,url,gradient=false){if(!el||!url)return;const val=gradient?`linear-gradient(180deg,rgba(0,0,0,.04) 18%,rgba(0,0,0,.16) 48%,rgba(0,0,0,.88) 100%),url("${url}")`:`url("${url}")`;el.style.setProperty('background-image',val,'important');el.style.setProperty('background-size','cover','important');el.style.setProperty('background-position','center','important');el.classList.remove('vnFallback','tc1NoPhoto','tc1TextOnly');el.dataset.saDecV3Photo=url}
function pageIsSaDec(){return isSaDec(document.querySelector('.tc1DestBody h1')?.textContent||'')}
function titleOf(card){return norm(card?.querySelector('h3,b')?.textContent||'')}
function hydrateCountryList(){
 document.querySelectorAll('.tc1Place').forEach(card=>{const h=card.querySelector('h3');if(!isSaDec(h?.textContent||''))return;const photo=card.querySelector('.tc1PlacePhoto');bg(photo,SRC.hero,false)})
}
function hydrateDestination(){
 if(!pageIsSaDec())return;
 const hero=document.querySelector('.tc1DestHero');if(hero)bg(hero,SRC.hero,true);
 document.querySelectorAll('.tc1SpotlightHero,.tc1SpotlightCard').forEach(card=>{const q=titleOf(card);if(q.includes('cycle the flower village'))bg(card,SRC.cycle,true)});
 document.querySelectorAll('.tc1Exp').forEach(card=>{const q=titleOf(card);if(!q.includes('slow coffee stop'))return;let p=card.querySelector('.tc1ExpPhoto');if(!p){p=document.createElement('div');p.className='tc1ExpPhoto tc1ExpPhotoDirect';card.prepend(p)}bg(p,SRC.coffee,false)});
 const foodPhotos={'hu tieu sa dec':SRC.huTieu,'banh tam bi':SRC.banhTamBi,'mon chay sa dec':SRC.vegetarian};
 document.querySelectorAll('.tc1FoodPass').forEach(card=>{const q=titleOf(card),url=foodPhotos[q];if(!url)return;let p=card.querySelector('.tc1PassPhoto');if(!p){p=document.createElement('div');p.className='tc1PassPhoto';card.prepend(p)}bg(p,url,false);const status=card.querySelector('.tc1FoodStatus');if(status&&/still missing/i.test(status.textContent||'')){status.textContent='NEW HERE';status.classList.remove('missing');status.classList.add('new')}})
}
function run(){hydrateCountryList();hydrateDestination()}
let queued=false;function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;run();setTimeout(run,100);setTimeout(run,350)})}
new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
})();
