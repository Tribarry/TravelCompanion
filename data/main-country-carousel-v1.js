(()=>{
'use strict';
if(!document.querySelector('script[data-global-data-bridge]')){
 const p=document.createElement('script');p.src='data/global-data-bridge-v1.js?v=20260912-g1';p.dataset.globalDataBridge='1';document.head.appendChild(p);
}
if(!document.querySelector('script[data-vn-b1-caibe]')){
 const s=document.createElement('script');s.src='data/vietnam-batch1-cai-be-v1.js?v=20260911-b2';s.dataset.vnB1Caibe='1';document.head.appendChild(s);
}
if(!document.querySelector('script[data-vn-photo-ui-fixes]')){
 const p=document.createElement('script');p.src='data/vietnam-photo-ui-fixes-v1.js?v=20260912-next10-qa';p.dataset.vnPhotoUiFixes='1';document.head.appendChild(p);
}
if(!document.querySelector('script[data-vn-next10-exact-audit]')){
 const p=document.createElement('script');p.src='data/vietnam-next10-exact-photo-audit-v1.js?v=20260912-a6';p.dataset.vnNext10ExactAudit='1';document.head.appendChild(p);
}
if(!document.querySelector('script[data-vn-remaining-content-audit]')){
 const p=document.createElement('script');p.src='data/vietnam-remaining-content-audit-v1.js?v=20260912-c3';p.dataset.vnRemainingContentAudit='1';document.head.appendChild(p);
}
if(!document.querySelector('script[data-vn-quality-curation]')){
 const p=document.createElement('script');p.src='data/vietnam-quality-curation-v1.js?v=20260912-q1';p.dataset.vnQualityCuration='1';document.head.appendChild(p);
}
if(!document.querySelector('script[data-vn-remaining-photo-audit]')){
 const p=document.createElement('script');p.src='data/vietnam-remaining-photo-audit-v1.js?v=20260912-p3';p.dataset.vnRemainingPhotoAudit='1';document.head.appendChild(p);
}
if(!document.querySelector('script[data-vn-curated-photo-supplement]')){
 const p=document.createElement('script');p.src='data/vietnam-curated-photo-supplement-v1.js?v=20260912-vp2';p.dataset.vnCuratedPhotoSupplement='1';document.head.appendChild(p);
}
if(!document.querySelector('script[data-laos-photo-manifest]')){
 const p=document.createElement('script');p.src='data/laos-photo-manifest-v1.js?v=20260912-lp2';p.dataset.laosPhotoManifest='1';document.head.appendChild(p);
}
if(!document.querySelector('script[data-laos-audited-structure]')){
 const p=document.createElement('script');p.src='data/laos-audited-structure-v1.js?v=20260912-la1';p.dataset.laosAuditedStructure='1';document.head.appendChild(p);
}
if(!document.querySelector('script[data-remaining-country-photo-audit]')){
 const p=document.createElement('script');p.src='data/remaining-countries-photo-audit-v1.js?v=20260912-rp1';p.dataset.remainingCountryPhotoAudit='1';document.head.appendChild(p);
}
if(!document.querySelector('script[data-remaining-photo-bridge]')){
 const p=document.createElement('script');p.src='data/remaining-countries-photo-bridge-v1.js?v=20260912-rpb1';p.dataset.remainingPhotoBridge='1';document.head.appendChild(p);
}
if(!document.querySelector('script[data-vn-b2-sadec]')){
 const s=document.createElement('script');s.src='data/vietnam-batch2-sa-dec-v2.js?v=20260912-s2';s.dataset.vnB2Sadec='1';document.head.appendChild(s);
}
if(!document.querySelector('script[data-vn-b2-sadec-render]')){
 const s=document.createElement('script');s.src='data/vietnam-batch2-sa-dec-v3.js?v=20260912-s3';s.dataset.vnB2SadecRender='1';document.head.appendChild(s);
}
/* ADHD Focus Mode */
if(!document.querySelector('script[data-adhd-focus]')){
 const p=document.createElement('script');p.src='data/adhd-focus-mode-v1.js?v=20260912-focus2';p.dataset.adhdFocus='1';document.head.appendChild(p);
}
const COPY={
 vietnam:'Food, local life, highlands, caves and the long journey north.',
 laos:'River towns, mountain country, conservation, caves and the southern plateau.',
 cambodia:'Khmer history, coast and islands before the Thailand training chapter.',
 thailand:'One month of training in Thailand before Central Asia.',
 kazakhstan:'Almaty, canyon country and alpine lakes before Kyrgyzstan.',
 kyrgyzstan:'Horse trekking, yurt country and high mountain landscapes.'
};
const ORDER=['vietnam','laos','cambodia','thailand','kazakhstan','kyrgyzstan'];
const CAROUSEL_PHOTOS={
 kazakhstan:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Charyn%20Canyon%2C%20Kazakhstan%2004.jpg',
 kyrgyzstan:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Ala-Kul%20lake.jpg',
 teaching:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Phnom%20Penh%20sunset.jpg'
};
const SAIGON_SPOTLIGHT_PHOTOS={
 'War Remnants Museum':'https://commons.wikimedia.org/wiki/Special:Redirect/file/War%20Remnants%20Museum.jpg',
 'Secret Saigon Commando Trail + Bunker':'https://commons.wikimedia.org/wiki/Special:Redirect/file/2023-12-10%20Memorial%20stele%20for%20Special%20Forces%20soldiers%20who%20died%20at%20the%20Independence%20Palace%2001.jpg',
 'Nguyễn Văn Bình Book Street + Slow Saigon Wander':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Nguyen%20Van%20Binh%20Street%20%2852681309899%29.jpg'
};
function setSpotlightPhoto(card,photo){
 if(!card||!photo)return;
 card.style.setProperty('background-image',`linear-gradient(180deg,rgba(0,0,0,.04) 18%,rgba(0,0,0,.16) 48%,rgba(0,0,0,.88) 100%),url("${photo}")`,'important');
 card.style.setProperty('background-size','cover','important');card.style.setProperty('background-position','center','important');
 card.classList.remove('vnFallback','tc1TextOnly');
}
function hydrateSaigonSpotlights(){
 document.querySelectorAll('.tc1SpotlightHero,.tc1SpotlightCard').forEach(card=>{const title=card.querySelector('b')?.textContent?.trim();const photo=SAIGON_SPOTLIGHT_PHOTOS[title];if(photo)setSpotlightPhoto(card,photo)});
}
function hydrateCaiBeSpotlights(){
 const heading=document.querySelector('.tc1DestBody h1')?.textContent?.trim().toUpperCase();if(heading!=='CÁI BÈ / TÂN PHONG'||typeof window.TC1RaterPhoto!=='function')return;
 const destination={name:'Cái Bè / Tân Phong'};document.querySelectorAll('.tc1SpotlightHero,.tc1SpotlightCard').forEach(card=>{const title=card.querySelector('b')?.textContent?.trim();if(!title)return;const photo=window.TC1RaterPhoto('vietnam',destination,{title});if(photo)setSpotlightPhoto(card,photo)});
}
function enhance(){
 const stack=document.querySelector('.tc1CountryStack');if(!stack||stack.dataset.carousel==='1')return;let cards=[...stack.querySelectorAll('.tc1CountryCard')];if(!cards.length)return;
 cards.sort((a,b)=>ORDER.indexOf(a.dataset.openCountry)-ORDER.indexOf(b.dataset.openCountry));cards.forEach(card=>stack.appendChild(card));
 const cambodia=cards.find(card=>card.dataset.openCountry==='cambodia'),teaching=cambodia?.cloneNode(true);
 if(teaching){teaching.dataset.openCountry='';teaching.dataset.teachingPlaceholder='1';teaching.removeAttribute('onclick');teaching.style.backgroundImage=`url('${CAROUSEL_PHOTOS.teaching}')`;const b=teaching.querySelector('b'),em=teaching.querySelector('em'),sm=teaching.querySelector('small');if(b)b.textContent='Cambodia · Teaching';if(em)em.textContent='Teaching chapter · coming soon';if(sm)sm.textContent='Chapter 7 · FROM 14 AUG 2027';stack.appendChild(teaching);cards.push(teaching)}
 stack.dataset.carousel='1';stack.className='tc1CountryCarousel';const parent=stack.parentElement;parent.className='tc1MainCarouselWrap';const oldHead=parent.querySelector(':scope > h2');if(oldHead)oldHead.outerHTML='<div class="tc1MainCarouselHead"><div><small>Your journey</small><h2>Choose a chapter</h2></div><small>Swipe →</small></div>';
 cards.forEach((card,index)=>{const id=card.dataset.openCountry||'';if(CAROUSEL_PHOTOS[id])card.style.backgroundImage=`url('${CAROUSEL_PHOTOS[id]}')`;card.classList.remove('tc1CountryCard');card.classList.add('tc1CountrySlide');const span=card.querySelector('span');if(span){span.className='tc1CountrySlideCopy';const b=span.querySelector('b'),em=span.querySelector('em'),sm=span.querySelector('small');const title=b?.textContent||'',meta=em?.textContent||'',date=sm?.textContent?.replace(/^Chapter\s+\d+\s+·\s*/i,'')||'',desc=card.dataset.teachingPlaceholder==='1'?'Placeholder for your Cambodia teaching/living chapter. We’ll build this separately from the Cambodia travel chapter.':COPY[id]||'';span.innerHTML=`<small>Chapter ${index+1} · ${date}</small><b>${title}</b><p>${desc}</p><div class="tc1CountrySlideMeta"><span>${date}</span><span>${card.dataset.teachingPlaceholder==='1'?'COMING SOON':meta+'   →'}</span></div>`}});
 const dots=document.createElement('div');dots.className='tc1CarouselDots';dots.innerHTML=cards.map(()=>'<i></i>').join('');parent.appendChild(dots);const ds=[...dots.children];stack.addEventListener('scroll',()=>{const idx=Math.round(stack.scrollLeft/(cards[0].offsetWidth+12));ds.forEach((d,i)=>{d.style.width=i===idx?'18px':'5px';d.style.background=i===idx?'#d66a45':'#555'})},{passive:true});
}
const mo=new MutationObserver(()=>{enhance();hydrateSaigonSpotlights();hydrateCaiBeSpotlights()});mo.observe(document.documentElement,{childList:true,subtree:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{enhance();hydrateSaigonSpotlights();hydrateCaiBeSpotlights()});else{enhance();hydrateSaigonSpotlights();hydrateCaiBeSpotlights()}
})();
