/* V0.28 — verified graphics on every live Vietnam surface.
 * This is presentation-only. It does not alter experience data, passport state,
 * navigation, completion state or itinerary order.
 */
(()=>{
'use strict';
if(window.__VN_GRAPHICS_V028__)return;window.__VN_GRAPHICS_V028__=true;
const esc=s=>String(s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function hydrate(){if(typeof window.hydrateVN==='function')window.hydrateVN()}
function tagPhoto(el,title){if(!el||!title)return;el.classList.add('vnFallback');el.dataset.vnimg=title;el.dataset.label=title}

/* The V0.21 locked-bank experience feed previously created blank photo boxes.
 * Attach the exact experience title and let the verification-first resolver
 * either show a mapped image or PHOTO TO VERIFY. */
if(typeof window.vnExperiences==='function'){
 const baseExperiences=window.vnExperiences;
 window.vnExperiences=async function(filter='All'){
  const result=await baseExperiences(filter);
  document.querySelectorAll('.vnResult').forEach(card=>{
   const title=card.querySelector('h3')?.textContent?.trim();
   tagPhoto(card.querySelector('.vnResultPhoto'),title);
  });
  hydrate();
  return result;
 };
}

/* Experience details now use the same verified title resolver. */
if(typeof window.vnExperienceDetail==='function'){
 const baseDetail=window.vnExperienceDetail;
 window.vnExperienceDetail=async function(id){
  const result=await baseDetail(id);
  const body=document.querySelector('.vnBody');
  const card=body?.querySelector('.card');
  const title=card?.querySelector('h1')?.textContent?.trim();
  if(card&&title&&!card.querySelector('.vnDetailPhoto28')){
   const photo=document.createElement('div');
   photo.className='vnDetailPhoto28 vnFallback';
   photo.dataset.vnimg=title;photo.dataset.label=title;
   photo.style.cssText='height:220px;border-radius:16px;margin:0 0 14px;background:#173d34 center/cover no-repeat;overflow:hidden';
   card.insertBefore(photo,card.firstChild);
  }
  hydrate();
  return result;
 };
}

/* The original Saigon 15-food / 12-drink passport used several hard-coded
 * generic or duplicated stock photos. Preserve every item and all Tried/Saved
 * state, but resolve each card by the actual food/drink name instead. */
if(typeof window.passportCardV17==='function'){
 window.passportCardV17=function(type,x){
  const tried=typeof passTried==='function'?passTried(type,x.id):false;
  const saved=!!(window.state?.saved&&state.saved['passport-'+type+'-'+x.id]);
  return `<article class="passportItem">${tried?'<div class="stamp">✓ TRIED IN SAIGON</div>':''}<div class="passportImg vnFallback" data-vnimg="${esc(x.name)}" data-label="${esc(x.name)}"></div><div class="passportBody"><div class="vn">${x.en||''}</div><h3>${x.name||''}</h3><p>${x.desc||''}</p><div class="passportMeta">${x.price||''} · ${x.when||''}</div><div class="passportBtns"><button data-savepass="${x.id}">${saved?'♥ SAVED':'♡ SAVE'}</button><button class="${tried?'tried':''}" data-trypass="${x.id}">${tried?'✓ TRIED':'I TRIED THIS'}</button></div></div></article>`;
 };
 if(typeof window.passportPageV17==='function'){
  const basePassportPage=window.passportPageV17;
  window.passportPageV17=function(type,filter='all'){
   const result=basePassportPage(type,filter);
   hydrate();
   return result;
  };
 }
}
})();