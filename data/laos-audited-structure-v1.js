/* Laos audited destination structure — 2026-09-12.
 * Applies the approved destination/photo/passport treatment without changing
 * route order or Saved/Done state. Exact-photo only; unresolved cards remain
 * visibly marked for verification.
 */
(()=>{
'use strict';
if(window.__LAOS_AUDITED_STRUCTURE_V1__)return;window.__LAOS_AUDITED_STRUCTURE_V1__=true;
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const sentence=s=>{const t=String(s||'').trim().replace(/\s+/g,' ');return t&&!/[.!?]$/.test(t)?t+'.':t};
function dataReady(){return Array.isArray(window.DATA?.destinations?.laos)&&window.DATA.destinations.laos.length}
function auditCopy(){if(!dataReady())return false;for(const d of window.DATA.destinations.laos){d.summary=sentence(d.summary);for(const e of (d.experiences||[])){e.summary=sentence(e.summary);if(e.booking==='No')e.booking='Usually flexible';if(e.booking==='Advance booking')e.booking='Book ahead';if(e.booking==='Advance/weather-dependent')e.booking='Book ahead · weather dependent';}const food=(d.experiences||[]).filter(e=>/food|coffee|market/i.test(String(e.type||'')+' '+e.name)).slice(0,2).map(e=>e.name);d.orientation=d.orientation||{comeFor:(d.experiences||[]).slice(0,2).map(e=>e.name).join(' + '),doDifferently:(d.experiences||[])[2]?.name||'Slow down and go local',eat:food.join(' · ')||'Use the Food Passport',wtf:(d.experiences||[]).find(e=>e.tier==='S+')?.name||'Find the distinctly local experience',pace:d.stay||'Flexible'};}return true}
function currentDestination(){if(!dataReady())return null;const names=new Map(window.DATA.destinations.laos.map(d=>[norm(d.name),d]));for(const el of document.querySelectorAll('.tc1DestBody h1,.tc1DestHero h1,.tc1PlacePage h1,h1')){const d=names.get(norm(el.textContent));if(d)return d}return null}
function exact(label){const m=window.LAOS_PHOTO_MANIFEST||{},q=norm(label);for(const [k,v] of Object.entries(m)){if(norm(k)===q)return v}return null}
const ALIASES=[
 [/kuang si/, 'Kuang Si Waterfall'],[/phousi|phou si/,'Mount Phousi near sunset'],[/nong khiaw.*view|viewpoint.*nong khiaw/,'Nong Khiaw viewpoint hike'],[/nam ou.*muang ngoi|boat.*muang ngoi/,'Boat into Muang Ngoi'],[/plain of jars.*site 1/,'Plain of Jars Site 1'],[/plain of jars.*site 2|sites 2 and 3/,'Plain of Jars Sites 2 and 3'],[/vang vieng.*karst|karst viewpoint/,'Karst viewpoint hike'],[/nam song.*sunset|sunset.*nam song/,'Sunset by the Nam Song'],[/pha that luang/,'Pha That Luang and Patuxai'],[/kong lor/,'Kong Lor Cave underground river'],[/thakhek.*old|old town.*thakhek/,'Thakhek old town evening'],[/savannakhet.*walk|old savannakhet/,'Old Savannakhet walk'],[/tad fane/,'Tad Fane and selected waterfalls'],[/pakse.*mekong|mekong.*pakse/,'Pakse food and Mekong evening'],[/attapeu.*countryside|countryside.*attapeu/,'Local countryside outing']
];
function photoFor(label,dest){const direct=exact(label);if(direct)return direct;const q=norm(label);for(const [rx,key] of ALIASES)if(rx.test(q)&&exact(key))return exact(key);if(dest&&norm(label)===norm(dest.name))return exact(dest.name);return null}
function setPhoto(el,p){if(!el||!p?.url)return;el.style.setProperty('background-image',`url("${p.url}")`,'important');el.style.setProperty('background-size','cover','important');el.style.setProperty('background-position','center','important');el.classList.add('loaded','laosVerifiedPhoto');el.classList.remove('vnFallback','imageFallback','tc1NoPhoto','tc1TextOnly','laosPhotoVerify');el.dataset.photoSource=p.sourcePage||'';el.dataset.photoSubject=p.subject||'';el.dataset.photoVerified='true'}
function markVerify(el){if(!el||el.dataset.photoVerified==='true')return;el.classList.add('laosPhotoVerify');el.dataset.label='PHOTO TO VERIFY';el.dataset.photoVerified='false'}
function titleFrom(card){return card?.querySelector('h3,b,.tc1PassTitle,.tc1ExpTitle')?.textContent?.trim()||card?.dataset?.label||''}
function ensurePhoto(card,cls){let el=card.querySelector('.'+cls);if(!el){el=document.createElement('div');el.className=cls+' vnFallback';card.insertBefore(el,card.firstChild)}return el}
function hydrate(){const d=currentDestination();if(!d)return;const hero=document.querySelector('.tc1DestHero,.vnHubHero');const hp=photoFor(d.name,d);if(hero&&hp)setPhoto(hero,hp);
 document.querySelectorAll('.tc1FoodPassGrid').forEach(g=>g.classList.add('tc1ReferenceFoodGrid'));
 document.querySelectorAll('.tc1Pass').forEach(card=>{const el=ensurePhoto(card,'tc1PassPhoto'),label=titleFrom(card),p=photoFor(label,d);p?setPhoto(el,p):markVerify(el)});
 document.querySelectorAll('.tc1Exp').forEach(card=>{const el=ensurePhoto(card,'tc1ExpPhoto'),label=titleFrom(card),p=photoFor(label,d);p?setPhoto(el,p):markVerify(el)});
 document.querySelectorAll('.tc1SpotlightHero,.tc1SpotlightCard').forEach(card=>{const label=titleFrom(card),p=photoFor(label,d);if(p)setPhoto(card,p);else markVerify(card)});
}
function installStyle(){if(document.getElementById('laosAuditStyle'))return;const s=document.createElement('style');s.id='laosAuditStyle';s.textContent='.laosPhotoVerify{position:relative;background:#173d34!important}.laosPhotoVerify:before{content:attr(data-label);position:absolute;inset:0;display:grid;place-items:center;padding:12px;text-align:center;color:#fff;background:linear-gradient(135deg,#173d34,#315d52);font:800 11px/1.2 Manrope,sans-serif;z-index:2}.laosVerifiedPhoto:before{display:none!important}';document.head.appendChild(s)}
function boot(){if(!auditCopy())return setTimeout(boot,120);installStyle();hydrate();const mo=new MutationObserver(()=>requestAnimationFrame(hydrate));mo.observe(document.documentElement,{childList:true,subtree:true})}
window.LAOS_AUDIT={hydrate,auditCopy,version:'2026-09-12-v1'};boot();
})();