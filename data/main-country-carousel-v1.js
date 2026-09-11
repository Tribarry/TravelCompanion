(()=>{
'use strict';
const COPY={
 vietnam:'Food, local life, highlands, caves and the long journey north.',
 laos:'River towns, mountain country, conservation, caves and the southern plateau.',
 thailand:'Northern Thailand, Bangkok and the fixed TESOL chapter.',
 kazakhstan:'Almaty, canyon country and alpine lakes before Kyrgyzstan.',
 kyrgyzstan:'Horse trekking, yurt country and high mountain landscapes.',
 cambodia:'Khmer history, coast and islands, then the teaching chapter.'
};
function enhance(){
 const stack=document.querySelector('.tc1CountryStack');
 if(!stack||stack.dataset.carousel==='1')return;
 const cards=[...stack.querySelectorAll('.tc1CountryCard')];if(!cards.length)return;
 stack.dataset.carousel='1';stack.className='tc1CountryCarousel';
 const parent=stack.parentElement;parent.className='tc1MainCarouselWrap';
 const oldHead=parent.querySelector(':scope > h2');if(oldHead)oldHead.outerHTML='<div class="tc1MainCarouselHead"><div><small>Your journey</small><h2>Choose a chapter</h2></div><small>Swipe →</small></div>';
 cards.forEach(card=>{
   card.classList.remove('tc1CountryCard');card.classList.add('tc1CountrySlide');
   const id=card.dataset.openCountry||'';const span=card.querySelector('span');
   if(span){span.className='tc1CountrySlideCopy';const b=span.querySelector('b'),em=span.querySelector('em'),sm=span.querySelector('small');const title=b?.textContent||'';const meta=em?.textContent||'';const date=sm?.textContent?.replace(/^Chapter\s+\d+\s+·\s*/i,'')||'';span.innerHTML=`<small>${sm?.textContent||''}</small><b>${title}</b><p>${COPY[id]||''}</p><div class="tc1CountrySlideMeta"><span>${date}</span><span>${meta} &nbsp; →</span></div>`}
 });
 const dots=document.createElement('div');dots.className='tc1CarouselDots';dots.innerHTML=cards.map(()=>'<i></i>').join('');parent.appendChild(dots);
 const ds=[...dots.children];stack.addEventListener('scroll',()=>{const idx=Math.round(stack.scrollLeft/(cards[0].offsetWidth+12));ds.forEach((d,i)=>{d.style.width=i===idx?'18px':'5px';d.style.background=i===idx?'#d66a45':'#555'})},{passive:true});
}
const mo=new MutationObserver(enhance);mo.observe(document.documentElement,{childList:true,subtree:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhance);else enhance();
})();
