/* Verification-first photo audit for Cambodia, Thailand, Kazakhstan and Kyrgyzstan — 2026-09-12.
 * Exact subjects only. If there is no verified mapping, the UI says PHOTO TO VERIFY.
 * Never substitutes a generic destination image for an unrelated experience or dish.
 */
(()=>{
'use strict';
if(window.__REMAINING_COUNTRIES_PHOTO_AUDIT_V1__)return;window.__REMAINING_COUNTRIES_PHOTO_AUDIT_V1__=true;
const slug=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const C=(file,subject)=>({url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(file),sourcePage:'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file).replace(/%20/g,'_'),subject,licenseStatus:'COMMONS — CHECK FILE PAGE',attributionStatus:'SOURCE PAGE SAVED'});
const COUNTRY={
 cambodia:C('Angkor wat sunrise.jpg','Angkor Wat at sunrise, Cambodia'),
 thailand:C('ThaiBangkokWatArun.jpg','Wat Arun, Bangkok, Thailand'),
 kazakhstan:C('Charyn Canyon.jpg','Charyn Canyon, Kazakhstan'),
 kyrgyzstan:C('Song-Kul, Kyrgyzstan (43670021735).jpg','Song-Köl yurt camp, Kyrgyzstan')
};
const DEST={
 cambodia:{
  'Siem Reap':C('Angkor wat sunrise.jpg','Angkor Wat, Siem Reap'),
  'Battambang':C('Sangker River in Battambang.jpg','Sangker River in Battambang'),
  'Phnom Penh':C('Throne Hall, Royal Palace, Phnom Penh, Cambodia.jpg','Royal Palace, Phnom Penh'),
  'Cardamom Mountains':C('Cardamom Mountains Cambodia.jpg','Cardamom Mountains, Cambodia'),
  'Kampot':C('River in Kampot.jpg','Kampot River, Cambodia'),
  'Kep':C('06-Kep Crab Market Cambodia-nX-17.jpg','Crab Market, Kep'),
  'Koh Rong':C('Koh Rong Cambodia.jpg','Koh Rong, Cambodia')
 },
 thailand:{
  'Bangkok':C('ThaiBangkokWatArun.jpg','Wat Arun, Bangkok'),
  'Chiang Mai':C('Wat Phra Singh, Chiang Mai.jpg','Wat Phra Singh, Chiang Mai'),
  'Chiang Rai':C('ChianRaiWhiteTemple.jpg','Wat Rong Khun, Chiang Rai'),
  'Pai':C('Pai Canyon.jpg','Pai Canyon, Pai'),
  'Mae Hong Son Loop':C('Mae Hong Son, Thailand.jpg','Mae Hong Son, Thailand'),
  'Southern Islands':null,
  'TESOL Training':null
 },
 kazakhstan:{
  'Almaty':C('Zenkov Cathedral, Almaty.jpg','Zenkov Cathedral, Almaty'),
  'Charyn Canyon':C('Charyn Canyon.jpg','Charyn Canyon, Kazakhstan'),
  'Saty / Kolsai Lakes':C('KZ Kolsay Lake.jpg','Kolsai Lake, Kazakhstan'),
  'Kaindy Lake':C('Lake Kaindy, Kazakhstan.jpg','Lake Kaindy, Kazakhstan'),
  'Altyn-Emel National Park':C('Altynemel dune.jpg','Singing Dune, Altyn-Emel National Park')
 },
 kyrgyzstan:{
  'Bishkek':C('Ala-Too Square in Bishkek.jpg','Ala-Too Square, Bishkek'),
  'Tian Shan horse trek':null,
  'Song-Köl':C('Song-Kul, Kyrgyzstan (43670021735).jpg','Song-Köl yurt camp'),
  'Issyk-Kul / Bokonbaevo':C('Issyk-Kul, Kyrgyzstan (44573339822).jpg','Southern shore of Issyk-Kul and Skazka Canyon'),
  'Karakol':C('Dungan mosque in Karakol.jpg','Dungan Mosque, Karakol'),
  'Altyn Arashan':C('Altyn Arashan resort, Kyrgyzstan.jpg','Altyn Arashan valley, Kyrgyzstan')
 }
};
const EXP={
 cambodia:{
  'Angkor Wat at first light':C('Angkor wat sunrise.jpg','Angkor Wat at sunrise'),
  'Tuol Sleng Genocide Museum':C('Tuol Sleng Genocide Museum (11958002025).jpg','Tuol Sleng Genocide Museum'),
  'Royal Palace and Silver Pagoda':C('Throne Hall, Royal Palace, Phnom Penh, Cambodia.jpg','Royal Palace, Phnom Penh'),
  'Community conservation jungle stay':C('Cardamom Mountains Cambodia.jpg','Cardamom Mountains forest landscape'),
  'Kampot pepper farm':C('Kampot Pepper.jpg','Kampot pepper plantation produce'),
  'Kep Crab Market':C('06-Kep Crab Market Cambodia-nX-17.jpg','Kep Crab Market'),
  'Long beach day':C('Koh Rong Cambodia.jpg','Koh Rong beach')
 },
 thailand:{
  'Wat Rong Khun early':C('ChianRaiWhiteTemple.jpg','Wat Rong Khun, Chiang Rai'),
  'Pai Canyon at golden hour':C('Pai Canyon.jpg','Pai Canyon'),
  'Mae Hong Son town and lake':C('Mae Hong Son, Thailand.jpg','Mae Hong Son'),
  'Old city temple walk at dawn':C('Wat Phra Singh, Chiang Mai.jpg','Wat Phra Singh in Chiang Mai old city')
 },
 kazakhstan:{
  'Panfilov Park and Zenkov Cathedral':C('Zenkov Cathedral, Almaty.jpg','Zenkov Cathedral, Almaty'),
  'Valley of Castles walk':C('Charyn Canyon.jpg','Charyn Canyon'),
  'Charyn viewpoint stops':C('Charyn Canyon.jpg','Charyn Canyon'),
  'Kolsai Lake 1':C('KZ Kolsay Lake.jpg','Kolsai Lake 1'),
  'Kolsai hike toward Lake 2':C('Kolsai lake.jpg','Kolsai Lakes'),
  'Kaindy submerged forest':C('Lake Kaindy, Kazakhstan.jpg','Lake Kaindy submerged spruce forest'),
  'Forest approach trail':C('Kaindy lake.jpg','Kaindy Lake forest landscape'),
  'Singing Dune':C('Altynemel dune.jpg','Singing Dune, Altyn-Emel')
 },
 kyrgyzstan:{
  'Soviet city walk':C('Ala-Too Square in Bishkek.jpg','Ala-Too Square, Bishkek'),
  'Song-Köl yurt stay':C('Kyrgyzstan yurts at Song Kul (48221119097).jpg','Yurts at Song-Köl'),
  'Skazka / Fairytale Canyon':C('Issyk-Kul, Kyrgyzstan (44573339822).jpg','Skazka Canyon on the southern Issyk-Kul shore'),
  'Dungan Mosque and Russian Orthodox Cathedral':C('Dungan mosque in Karakol.jpg','Dungan Mosque, Karakol'),
  'Altyn Arashan valley hike/4WD access':C('Altyn Arashan resort, Kyrgyzstan.jpg','Altyn Arashan valley')
 }
};
const FOOD={
 thailand:{'Khao soi':C('Khao soi Chiang Mai.jpg','Khao soi in Chiang Mai'),'Khao Soi':C('Khao soi Chiang Mai.jpg','Khao soi in Chiang Mai')},
 cambodia:{'Kampot pepper':C('Kampot Pepper.jpg','Kampot pepper')},
 kazakhstan:{'Beshbarmak':C('Kazakh beshbarmak.jpg','Kazakh beshbarmak')},
 kyrgyzstan:{}
};
const countries=()=>{try{return typeof DATA!=='undefined'?DATA.countries||[]:window.DATA?.countries||[]}catch(e){return window.DATA?.countries||[]}};
const destinations=id=>{try{return typeof DATA!=='undefined'?DATA.destinations?.[id]||[]:window.DATA?.destinations?.[id]||[]}catch(e){return window.DATA?.destinations?.[id]||[]}};
function countryFromHeading(){const h=document.querySelector('.tc1CountryHero h1')?.textContent||'';return countries().find(c=>slug(c.name)===slug(h))?.id||null}
function destinationFromHeading(){const h=document.querySelector('.tc1DestBody h1,.tc1DestHero h1')?.textContent||'';if(!h)return null;for(const c of countries()){if(!DEST[c.id])continue;const i=destinations(c.id).findIndex(d=>slug(d.name)===slug(h));if(i>=0)return{id:c.id,i,d:destinations(c.id)[i]}}return null}
function exact(map,label){if(!map)return null;const q=slug(label);for(const[k,v]of Object.entries(map))if(slug(k)===q)return v;return null}
function setPhoto(el,p,overlay=false){if(!el||!p?.url)return;const img=`url("${p.url}")`;el.style.setProperty('background-image',overlay?`linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.82)),${img}`:img,'important');el.style.setProperty('background-size','cover','important');el.style.setProperty('background-position','center','important');el.classList.remove('tc1NoPhoto','tc1TextOnly','remainingPhotoVerify');el.classList.add('remainingVerifiedPhoto');el.dataset.photoVerified='true';el.dataset.photoSource=p.sourcePage;el.dataset.photoSubject=p.subject;el.dataset.photoLicense=p.licenseStatus}
function markVerify(el,label,card=false){if(!el||el.dataset.photoVerified==='true')return;el.style.setProperty('background-image','none','important');el.classList.add('remainingPhotoVerify');el.classList.remove('remainingVerifiedPhoto');el.dataset.photoVerified='false';el.dataset.label='PHOTO TO VERIFY';el.dataset.photoSubject=label||'';if(card)el.classList.add('remainingVerifyCard')}
function ensure(card,cls){let el=card.querySelector('.'+cls);if(!el){el=document.createElement('div');el.className=cls;card.insertBefore(el,card.firstChild)}return el}
function title(card){return card.querySelector('h3,b,.tc1PassTitle,.tc1ExpTitle')?.textContent?.trim()||''}
function hydrateMainCountryHeroes(){document.querySelectorAll('[data-open-country]').forEach(card=>{const id=card.dataset.openCountry,p=COUNTRY[id];if(id&&p)setPhoto(card,p,true)})}
function hydrateCountry(){const id=countryFromHeading();if(!id||!DEST[id])return;const hero=document.querySelector('.tc1CountryHero');if(hero&&COUNTRY[id])setPhoto(hero,COUNTRY[id],true);document.querySelectorAll('.tc1Place[data-open-dest]').forEach(card=>{const i=Number(card.dataset.openDest),d=destinations(id)[i],el=ensure(card,'tc1PlacePhoto'),p=d?exact(DEST[id],d.name):null;p?setPhoto(el,p):markVerify(el,d?.name||'Destination')})}
function hydrateDestination(){const ctx=destinationFromHeading();if(!ctx)return;const {id,d}=ctx,hero=document.querySelector('.tc1DestHero'),dp=exact(DEST[id],d.name);if(hero){dp?setPhoto(hero,dp,true):markVerify(hero,d.name,true)}
 document.querySelectorAll('.tc1Exp').forEach(card=>{const label=title(card),el=ensure(card,'tc1ExpPhoto'),p=exact(EXP[id],label);p?setPhoto(el,p):markVerify(el,label)});
 document.querySelectorAll('.tc1Feature.tc1SpotlightHero,.tc1SpotlightCard').forEach(card=>{const label=title(card),p=exact(EXP[id],label);p?setPhoto(card,p,true):markVerify(card,label,true)});
 document.querySelectorAll('.tc1RateCard').forEach(card=>{const label=title(card),el=ensure(card,'tc1RatePhoto'),p=exact(EXP[id],label);p?setPhoto(el,p):markVerify(el,label)});
 document.querySelectorAll('.tc1Pass').forEach(card=>{const label=title(card),el=ensure(card,'tc1PassPhoto'),p=exact(FOOD[id],label);p?setPhoto(el,p):markVerify(el,label)});
}
function style(){if(document.getElementById('remainingPhotoAuditStyle'))return;const s=document.createElement('style');s.id='remainingPhotoAuditStyle';s.textContent='.remainingPhotoVerify{position:relative!important;background:#173d34!important}.remainingPhotoVerify:before{content:attr(data-label);position:absolute;inset:0;z-index:2;display:grid;place-items:center;padding:10px;text-align:center;color:#fff;background:linear-gradient(135deg,#173d34,#315d52);font:800 10px/1.2 Manrope,Inter,sans-serif;letter-spacing:.08em}.remainingVerifyCard{min-height:130px}.remainingVerifyCard>span,.remainingVerifyCard>.tc1FeatureCopy{position:relative;z-index:3}.remainingVerifiedPhoto:before{display:none!important}';document.head.appendChild(s)}
function hydrate(){style();hydrateMainCountryHeroes();hydrateCountry();hydrateDestination()}
let queued=false;function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;hydrate()})}new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
window.REMAINING_COUNTRIES_PHOTO_AUDIT={version:'2026-09-12-v1',country:COUNTRY,destinations:DEST,experiences:EXP,food:FOOD,hydrate};
})();
