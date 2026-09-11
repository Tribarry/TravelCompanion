(()=>{
'use strict';
if(!document.querySelector('script[data-vn-b1-caibe]')){
 const s=document.createElement('script');s.src='data/vietnam-batch1-cai-be-v1.js?v=20260911-b2';s.dataset.vnB1Caibe='1';document.head.appendChild(s);
}
if(!document.querySelector('script[data-vn-photo-ui-fixes]')){
 const p=document.createElement('script');p.src='data/vietnam-photo-ui-fixes-v1.js?v=20260912-f1';p.dataset.vnPhotoUiFixes='1';document.head.appendChild(p);
}
if(!document.querySelector('script[data-vn-b2-sadec]')){
 const s=document.createElement('script');s.src='data/vietnam-batch2-sa-dec-v2.js?v=20260912-s2';s.dataset.vnB2Sadec='1';document.head.appendChild(s);
}
if(!document.querySelector('script[data-vn-b2-sadec-render]')){
 const s=document.createElement('script');s.src='data/vietnam-batch2-sa-dec-v3.js?v=20260912-s3';s.dataset.vnB2SadecRender='1';document.head.appendChild(s);
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
const CHAPTER={vietnam:'CHAPTER 01',laos:'CHAPTER 02',cambodia:'CHAPTER 03',thailand:'CHAPTER 04',kazakhstan:'CHAPTER 05',kyrgyzstan:'CHAPTER 06'};
const DATES={vietnam:'28 JAN → APRIL 2027',laos:'APRIL → MAY 2027',cambodia:'MAY → JUNE / FROM 14 AUG 2027',thailand:'JUNE → 21 JUL 2027',kazakhstan:'22 → 29 JUL 2027',kyrgyzstan:'30 JUL → 12 AUG 2027'};
const IMAGES={
 vietnam:'assets/images/generated/remote/photo-1583417319070-4a69db38a482-d27b8465-1600.webp',
 laos:'assets/images/generated/remote/photo-1500530855697-b586d89ba3ee-ba73f954-1600.webp',
 cambodia:'assets/images/generated/remote/photo-1562602833-0f4ab2fc46e3-b5305e41-1600.webp',
 thailand:'assets/images/generated/remote/photo-1598970605070-a38a6ccd3a2d-dca2b1ab-1600.webp',
 kazakhstan:'https://putidorogi-nn.ru/images/stories/aziya/kazahstan/kazahstan_2.jpg',
 kyrgyzstan:'assets/images/generated/remote/photo-1500534314209-a25ddb2bd429-94319b7a-1600.webp'
};
const FLAGS={vietnam:'🇻🇳',laos:'🇱🇦',cambodia:'🇰🇭',thailand:'🇹🇭',kazakhstan:'🇰🇿',kyrgyzstan:'🇰🇬'};
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
function country(id){return DATA.countries.find(c=>c.id===id)}
function destinations(id){return DATA.destinations[id]||[]}
function counts(id){const ds=destinations(id);return {places:ds.length,experiences:ds.reduce((n,d)=>n+(d.experiences||[]).length,0)}}
function render(){
 const root=document.querySelector('[data-main-country-carousel]');if(!root)return;
 root.innerHTML=ORDER.map(id=>{const c=country(id);if(!c)return'';const x=counts(id);return `<button class="mccCard" data-main-country="${id}" style="background-image:url('${esc(IMAGES[id]||'')}')"><span class="mccShade"></span><span class="mccCopy"><small>${esc(CHAPTER[id])} · ${esc(DATES[id])}</small><b>${FLAGS[id]||''} ${esc(c.name)}</b><em>${esc(COPY[id]||c.subtitle||'')}</em><i>${x.places} places · ${x.experiences}+ experiences</i></span></button>`}).join('');
 root.querySelectorAll('[data-main-country]').forEach(b=>b.onclick=()=>{if(typeof window.renderCountry==='function')window.renderCountry(b.dataset.mainCountry,'overview')});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
})();
