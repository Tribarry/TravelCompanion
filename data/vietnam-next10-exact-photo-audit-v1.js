/* Vietnam next-10 exact-photo audit — 2026-09-12.
 * Explicit subject matches only. No destination-generic fallback.
 * Remote source licence/attribution remains TO CHECK pending user audit.
 */
(()=>{
'use strict';
if(window.__VN_NEXT10_EXACT_PHOTO_AUDIT_V1__)return;window.__VN_NEXT10_EXACT_PHOTO_AUDIT_V1__=true;
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ').trim();
const SOURCES={
 ghositaram:{
  url:'https://thamhiemmekong.com/wp-content/uploads/2020/04/chuaGhositaram01.jpg',
  sourcePage:'https://thamhiemmekong.com/thong-tin-du-lich-mien-tay/van-canh-chua-ghositaram-bac-lieu.html',
  subject:'Ghositaram Pagoda, Bạc Liêu',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'
 }
};
window.VN_NEXT10_AUDITED_PHOTO_SOURCES=SOURCES;
function setBg(el,url,spotlight=false){if(!el||!url)return;el.dataset.vnExactAudit='1';el.style.setProperty('background-image',spotlight?`linear-gradient(180deg,rgba(0,0,0,.04) 18%,rgba(0,0,0,.16) 48%,rgba(0,0,0,.88) 100%),url("${url}")`:`url("${url}")`,'important');el.style.setProperty('background-size','cover','important');el.style.setProperty('background-position','center','important');el.classList.remove('vnFallback','tc1NoPhoto','tc1TextOnly')}
function hydrateGhositaram(){
 if(norm(document.querySelector('.tc1DestBody h1')?.textContent)!=='bac lieu')return;
 document.querySelectorAll('.tc1Exp').forEach(card=>{const title=norm(card.querySelector('h3')?.textContent);if(!title.includes('ghositaram'))return;setBg(card.querySelector('.tc1ExpPhoto'),SOURCES.ghositaram.url)});
 document.querySelectorAll('.tc1SpotlightHero,.tc1SpotlightCard').forEach(card=>{const title=norm(card.querySelector('b')?.textContent);if(title.includes('ghositaram'))setBg(card,SOURCES.ghositaram.url,true)});
}
let queued=false;function run(){queued=false;hydrateGhositaram()}function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{run();setTimeout(run,180)})}
new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
})();
