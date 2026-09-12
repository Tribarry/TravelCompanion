/* Exact-photo supplement for the curated Vietnam card set — 2026-09-12.
 * Only subject-specific Wikimedia Commons files are used. This runs after the
 * primary verification layer and fills known remaining high-value gaps.
 */
(()=>{
'use strict';
if(window.__VN_CURATED_PHOTO_SUPPLEMENT_V1__)return;window.__VN_CURATED_PHOTO_SUPPLEMENT_V1__=true;
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ').trim();
const C=(file,sourcePage,subject)=>({url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(file),sourcePage,subject});
const RULES=[
 {d:/vinh long|mang thit/,q:/brick kiln|kiln kingdom|kiln country|brick pottery|old kiln/,p:C('Lò gạch Mang Thít Vĩnh Long.jpg','https://commons.wikimedia.org/wiki/File:Lò_gạch_Mang_Thít_Vĩnh_Long.jpg','Brick kiln in Mang Thít, Vĩnh Long')},
 {d:/da lat/,q:/datanla|waterfall rappel|canyoning/,p:C('Datanla Waterfall.jpg','https://commons.wikimedia.org/wiki/File:Datanla_Waterfall.jpg','Datanla Falls, Đà Lạt')},
 {d:/khe sanh/,q:/combat base|ta con|airstrip|trenches|bunkers|c 119/,p:C('Khe Sanh.jpg','https://commons.wikimedia.org/wiki/File:Khe_Sanh.jpg','Museum at Khe Sanh Combat Base')},
 {d:/hai van|lang co/,q:/hai van gate|full pass|historic choke point/,p:C('The Hai Van Gate, Hải Vân Pass ("ocean cloud pass"), Vietnam (7090613449).jpg','https://commons.wikimedia.org/wiki/File:The_Hai_Van_Gate,_Hải_Vân_Pass_("ocean_cloud_pass"),_Vietnam_(7090613449).jpg','Hải Vân Gate')},
 {d:/binh phuoc|dong xoai/,q:/soc bom bo|bom bo/,p:C('Điểu Ong.jpg','https://commons.wikimedia.org/wiki/File:Điểu_Ong.jpg','Sóc Bom Bo cultural conservation site')}
];
function destination(){return document.querySelector('.vnHubHero h1,.tc1DestBody h1')?.textContent?.trim()||''}
function set(el,p){if(!el||!p)return;el.style.setProperty('background-image',`url("${p.url}")`,'important');el.style.setProperty('background-size','cover','important');el.style.setProperty('background-position','center','important');el.classList.add('loaded');el.classList.remove('vnFallback','vnPhotoVerify','tc1NoPhoto','tc1TextOnly');el.dataset.photoVerified='true';el.dataset.photoSource=p.sourcePage;el.dataset.photoSubject=p.subject}
function hydrate(){const d=norm(destination());if(!d)return;document.querySelectorAll('.vnResult,.tc1Exp,.tc1SpotlightCard,.tc1SpotlightHero').forEach(card=>{const label=card.querySelector('h3,b')?.textContent?.trim()||'',q=norm(label),r=RULES.find(x=>x.d.test(d)&&x.q.test(q));if(!r)return;const el=card.matches('.tc1SpotlightCard,.tc1SpotlightHero')?card:card.querySelector('.vnResultPhoto,.tc1ExpPhoto');if(el&&el.dataset.photoVerified!=='true')set(el,r.p)})}
let queued=false;function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;hydrate()})}new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
window.VN_CURATED_PHOTO_SUPPLEMENT={version:'2026-09-12-v1',rules:RULES};
})();