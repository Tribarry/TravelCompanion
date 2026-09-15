/* Vietnam rendering performance layer — 2026-09-12.
 * Rendering-only: no itinerary/content/state/design changes.
 * Keeps hero work eager, defers below-fold sections, reserves image geometry,
 * and prefetches only the next local responsive image after idle.
 */
(()=>{
'use strict';
if(window.__VN_RENDER_PERF_V1__)return;window.__VN_RENDER_PERF_V1__=true;
const LOCAL_RE=/^assets\/images\/generated\/(?:vietnam-resolved|remote)\/.*-(480|800|1200|1600)\.webp(?:\?.*)?$/i;
const isVietnam=()=>/vietnam/i.test(document.body?.dataset?.country||'')||!!document.querySelector('.tc1DestBody,.tc1Vietnam,.vnJourney');
function addStyle(){if(document.getElementById('vn-render-perf-style'))return;const s=document.createElement('style');s.id='vn-render-perf-style';s.textContent=`
.tc1DestHero,.tc1PlacePhoto,.tc1ExpPhoto,.tc1PassPhoto,.tc1FoodPhoto,.tc1SpotlightHero,.tc1SpotlightCard{background-color:#17201d;contain:paint}
.tc1PlacePhoto,.tc1ExpPhoto,.tc1PassPhoto,.tc1FoodPhoto{aspect-ratio:4/3}
.tc1DestHero{aspect-ratio:16/9;min-height:240px}
@supports(content-visibility:auto){
 .tc1DestBody>section:not(:first-of-type),.tc1PassGrid,.tc1FoodPassGrid,.tc1ExpGrid{content-visibility:auto;contain-intrinsic-size:auto 720px}
}
`;document.head.appendChild(s)}
function variant(url,w){const m=String(url||'').match(LOCAL_RE);return m?url.replace(/-(480|800|1200|1600)\.webp/i,`-${w}.webp`):''}
function backgroundUrl(el){const bg=getComputedStyle(el).backgroundImage||'';const ms=[...bg.matchAll(/url\(["']?([^"')]+)["']?\)/g)];return ms.length?ms[ms.length-1][1]:''}
function tuneImgs(){document.querySelectorAll('.tc1DestBody img').forEach((img,i)=>{const hero=!!img.closest('.tc1DestHero');img.decoding='async';if(hero){img.loading='eager';img.fetchPriority='high'}else{img.loading='lazy';img.fetchPriority='low'}if(!img.width&&!img.height){img.style.aspectRatio=hero?'16 / 9':'4 / 3';img.style.objectFit='cover'}})}
function tuneBackgrounds(){document.querySelectorAll('.tc1PlacePhoto,.tc1ExpPhoto,.tc1PassPhoto,.tc1FoodPhoto,.tc1SpotlightHero,.tc1SpotlightCard').forEach(el=>{if(el.closest('.tc1DestHero'))return;const u=backgroundUrl(el);const small=variant(u,480);if(small&&u!==small)el.style.backgroundImage=(getComputedStyle(el).backgroundImage||'').replace(u,small)})}
function prefetchNext(){if(!isVietnam()||document.querySelector('link[data-vn-next-prefetch]'))return;const current=document.querySelector('.tc1DestBody h1')?.textContent?.trim();if(!current)return;const cards=[...document.querySelectorAll('.tc1Place')];const idx=cards.findIndex(c=>(c.querySelector('h3')?.textContent||'').trim()===current);const next=idx>=0?cards[idx+1]:null;if(!next)return;const u=backgroundUrl(next.querySelector('.tc1PlacePhoto'));const src=variant(u,800)||u;if(!src||!LOCAL_RE.test(src))return;const l=document.createElement('link');l.rel='prefetch';l.as='image';l.href=src;l.dataset.vnNextPrefetch='1';document.head.appendChild(l)}
let queued=false;function run(){queued=false;if(!isVietnam())return;addStyle();tuneImgs();tuneBackgrounds();const idle=window.requestIdleCallback||((fn)=>setTimeout(fn,700));idle(prefetchNext,{timeout:1800})}function queue(){if(queued)return;queued=true;requestAnimationFrame(run)}
new MutationObserver(queue).observe(document.documentElement,{childList:true,subtree:true});document.addEventListener('click',queue,true);queue();
})();
