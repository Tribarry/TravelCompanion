/* Remaining Vietnam exact-photo audit — pass 1.
 * Exact named destination/activity matches only. No generic filler.
 * Licence/attribution deliberately remain TO CHECK pending user audit.
 */
(()=>{
'use strict';
if(window.__VN_REMAINING_EXACT_PHOTO_AUDIT_V1__)return;window.__VN_REMAINING_EXACT_PHOTO_AUDIT_V1__=true;
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ').trim();
const S={
 phuQuocFishSauce:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Fish%20sauce%20factory%2C%20Phu%20Quoc.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:Fish_sauce_factory,_Phu_Quoc.jpg',subject:'Fish sauce factory, Phú Quốc',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'},
 conDaoPrison:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Con%20Dao%20prison%2C%20Vietnam.JPG?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:Con_Dao_prison,_Vietnam.JPG',subject:'Côn Đảo Prison',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'},
 vungTauChrist:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Vung%20Tau%20Thanh%20Gioc%201.JPG?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:Vung_Tau_Thanh_Gioc_1.JPG',subject:'Christ the King statue, Vũng Tàu',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'},
 vungTauHonBa:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Vung%20Tau%20Hon%20Ba.JPG?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:Vung_Tau_Hon_Ba.JPG',subject:'Hòn Bà, Vũng Tàu',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'},
 daLat:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Ph%C6%B0%E1%BB%9Dng%20Xu%C3%A2n%20H%C6%B0%C6%A1ng%20-%20%C4%90%C3%A0%20L%E1%BA%A1t.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:Ph%C6%B0%E1%BB%9Dng_Xu%C3%A2n_H%C6%B0%C6%A1ng_-_%C4%90%C3%A0_L%E1%BA%A1t.jpg',subject:'Hồ Xuân Hương, Đà Lạt',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'},
 buonMaThuot:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Bu%C3%B4n%20Ma%20Thu%E1%BB%99t%20city%20square.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:Bu%C3%B4n_Ma_Thu%E1%BB%99t_city_square.jpg',subject:'Buôn Ma Thuột city square',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'},
 buonMaThuotPrison:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Bu%C3%B4n%20Ma%20Thu%E1%BB%99t%20-%20buildings%20at%20Exile%20House%20former%20prison%20Apr%202024%2001.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:Bu%C3%B4n_Ma_Thu%E1%BB%99t_-_buildings_at_Exile_House_former_prison_Apr_2024_01.jpg',subject:'Buôn Ma Thuột Exile House',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'},
 pleikuBienHo:{url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Bi%E1%BB%83n%20H%E1%BB%93%20-%20Pleiku%2C%20Gia%20Lai%2C%20Vi%E1%BB%87t%20Nam%20%28cropped%29.jpg?width=1600',sourcePage:'https://commons.wikimedia.org/wiki/File:Bi%E1%BB%83n_H%E1%BB%93_-_Pleiku,_Gia_Lai,_Vi%E1%BB%87t_Nam_(cropped).jpg',subject:'Biển Hồ, Pleiku',licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'}
};
window.VN_REMAINING_AUDITED_PHOTO_SOURCES=Object.assign(window.VN_REMAINING_AUDITED_PHOTO_SOURCES||{},S);
const MATCHES=[
 [/fish sauce factory|fish sauce barrel|first press fish sauce/,S.phuQuocFishSauce],
 [/tiger cages|con dao prison|phu hai prison|cow shed/,S.conDaoPrison],
 [/christ the king|shoulder platforms/,S.vungTauChrist],
 [/hon ba/,S.vungTauHonBa],
 [/buon ma thuot exile|exile house|former prison/,S.buonMaThuotPrison],
 [/bien ho|sea lake/,S.pleikuBienHo]
];
const HERO=[
 ['phu quoc',null],
 ['con dao',null],
 ['vung tau',S.vungTauChrist],
 ['da lat',S.daLat],
 ['buon ma thuot dak lak',S.buonMaThuot],
 ['pleiku gia lai',S.pleikuBienHo]
];
function setBg(el,src,spot=false){if(!el||!src)return;el.dataset.vnExactAudit='remaining-v1';el.style.setProperty('background-image',spot?`linear-gradient(180deg,rgba(0,0,0,.04) 18%,rgba(0,0,0,.16) 48%,rgba(0,0,0,.88) 100%),url("${src.url}")`:`url("${src.url}")`,'important');el.style.setProperty('background-size','cover','important');el.style.setProperty('background-position','center','important');el.classList.remove('vnFallback','tc1NoPhoto','tc1TextOnly')}
function sourceFor(t){const q=norm(t);return MATCHES.find(([r])=>r.test(q))?.[1]||null}
function run(){
 const here=norm(document.querySelector('.tc1DestBody h1')?.textContent||'');
 const hero=HERO.find(([n])=>here===n)?.[1];if(hero)setBg(document.querySelector('.tc1DestHero'),hero,true);
 document.querySelectorAll('.tc1Exp').forEach(c=>{const src=sourceFor(c.querySelector('h3')?.textContent);if(src)setBg(c.querySelector('.tc1ExpPhoto'),src)});
 document.querySelectorAll('.tc1SpotlightHero,.tc1SpotlightCard').forEach(c=>{const src=sourceFor(c.querySelector('b,h3')?.textContent);if(src)setBg(c,src,true)});
}
let q=false;function schedule(){if(q)return;q=true;requestAnimationFrame(()=>{q=false;run();setTimeout(run,180)})}
new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
})();
