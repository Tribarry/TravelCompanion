/* ADHD Focus Mode v2 — 2026-09-12
 * Self-contained ADHD layer for the Travel Companion V1 shell.
 * Uses the same DATA/state/save storage contract as the shell without rewriting navigation.
 */
(()=>{
'use strict';
if(window.__ADHD_FOCUS_MODE_V2__)return;window.__ADHD_FOCUS_MODE_V2__=true;

const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const slug=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
const norm=s=>slug(s).replace(/-/g,' ');
const data=()=>{try{return typeof DATA!=='undefined'?DATA:window.DATA}catch(e){return window.DATA}};
const store=()=>{try{return typeof state!=='undefined'?state:null}catch(e){return null}};
const persist=()=>{try{if(typeof save==='function')save()}catch(e){console.warn('Focus save unavailable',e)}};
const countries=()=>data()?.countries||[];
const country=id=>countries().find(c=>c.id===id);
const destinations=id=>data()?.destinations?.[id]||[];

function current(){
 const s=store();if(!s)return null;
 const loc=s.currentLocation;
 if(loc?.country&&loc?.destination){const id=loc.country,i=destinations(id).findIndex(d=>slug(d.name)===loc.destination);if(i>=0&&country(id))return{id,i,c:country(id),d:destinations(id)[i]}}
 if(!s.here||s.here==='pre')return null;
 const [id,n]=String(s.here).split(':'),i=Number(n);if(!country(id)||!destinations(id)[i])return null;
 return{id,i,c:country(id),d:destinations(id)[i]};
}
function rawTags(e){const t=[];if(e?.tier)t.push(e.tier);if(e?.type)t.push(String(e.type).replace(/(^|\s)\S/g,m=>m.toUpperCase()));return t}
function flags(raw,it){return[...new Set(it?.flags||raw?.flags||[])]}
function enrich(id,d,it){try{return window.TC1ExperienceCopy?.enrich?window.TC1ExperienceCopy.enrich(id,d,it):it}catch(e){return it}}
function items(id,i){
 const d=destinations(id)[i];if(!d)return[];
 if(id==='vietnam'&&typeof window.vnBaseItems==='function'){
  try{return window.vnBaseItems({c:country(id),d,i,id:id+'-'+i}).map((it,j)=>enrich(id,d,{id:it.id||'e'+j,title:it.title||it.name||d.experiences?.[j]?.name||'Experience',summary:it.summary||d.experiences?.[j]?.summary||'',tags:it.tags||rawTags(d.experiences?.[j]),flags:flags(d.experiences?.[j],it),tier:it.tier||d.experiences?.[j]?.tier||'',raw:d.experiences?.[j]||{},index:j,photo:it.photo||''}))}catch(e){console.warn('Focus Vietnam items fallback',e)}
 }
 return(d.experiences||[]).map((e,j)=>enrich(id,d,{id:e.id||'e'+j,title:e.name||e.title||'Experience',summary:e.summary||'',tags:e.tags||rawTags(e),flags:flags(e,e),tier:e.tier||'',raw:e,index:j,photo:e.photo||''}));
}
function canonicalKey(id,i,it,j){
 if(id==='vietnam'&&typeof window.vnSavedKey==='function')try{return window.vnSavedKey({c:country(id),d:destinations(id)[i],i,id:id+'-'+i},it)}catch(e){}
 return id+'-'+i+'-'+j;
}
function stableKey(id,i,it){return'exp:'+id+':'+slug(destinations(id)[i]?.name||String(i))+':'+slug(it?.id||it?.title||'experience')}
function allKeys(id,i,it,j){const a=[stableKey(id,i,it),canonicalKey(id,i,it,j),id+'-'+i+'-'+j];if(id==='vietnam'&&i===0)a.push('hcm-'+j);return[...new Set(a)]}
function has(bucket,id,i,it,j){const obj=store()?.[bucket]||{};return allKeys(id,i,it,j).some(k=>!!obj[k])}
function setBucket(bucket,id,i,it,j,value){const s=store();if(!s)return false;s[bucket]=s[bucket]||{};allKeys(id,i,it,j).forEach(k=>s[bucket][k]=value);persist();return true}
function markDone(id,i,it,j){const next=!has('done',id,i,it,j);setBucket('done',id,i,it,j,next);if(next)setBucket('skip',id,i,it,j,false);return next}
function rating(id,i,it,j){const obj=store()?.ratings||{};for(const k of allKeys(id,i,it,j))if(obj[k])return obj[k];return''}
function saved(id,i,it,j){return has('saved',id,i,it,j)}
function skipped(id,i,it,j){return has('skip',id,i,it,j)}
function priority(it,id,i,j){
 const r=rating(id,i,it,j);if(r==='must')return 120;if(r==='keen')return 105;if(r==='pass')return-100;
 if(saved(id,i,it,j))return 95;
 const tags=(it.tags||[]).join(' ');if(/must do|must-do/i.test(tags)||it.tier==='S+')return90;if(it.tier==='S')return80;if(it.tier==='A')return55;
 if(/book ahead|unique|wildlife|adventure/i.test(tags+' '+(it.flags||[]).join(' ')))return50;return30;
}
function progress(id,i){const a=items(id,i),done=a.filter(it=>has('done',id,i,it,it.index)).length;return{done,total:a.length,pct:a.length?Math.round(done/a.length*100):0}}
function countryProgress(id){let done=0,total=0;destinations(id).forEach((d,i)=>{const p=progress(id,i);done+=p.done;total+=p.total});return{done,total,pct:total?Math.round(done/total*100):0}}
function focusItems(id,i){return items(id,i).filter(it=>!has('done',id,i,it,it.index)&&!skipped(id,i,it,it.index)&&rating(id,i,it,it.index)!=='pass').map(it=>({it,j:it.index,score:priority(it,id,i,it.index)})).sort((a,b)=>b.score-a.score||a.j-b.j).slice(0,3)}
function exactPhoto(id,d,it){
 if(it?.photo)return it.photo;
 try{const p=window.TC1RaterPhoto?.(id,d,it);if(p)return p}catch(e){}
 return'';
}
function emotionalHook(it){
 const tag=(it.tags||[]).join(' ').toLowerCase();if(/nature|outdoor|landscape|view/.test(tag))return'Go for the moment the place suddenly feels bigger than the plan.';
 if(/food|drink|coffee/.test(tag))return'Try one thing properly. No checklist required.';
 if(/history|culture/.test(tag))return'Give this one enough time to actually understand what you are looking at.';
 if(/local/.test(tag))return'This is the kind of stop that makes the trip feel lived-in, not collected.';
 return'You do not have to optimise this. Just go see what happens.';
}

function celebrate(anchor){
 if(anchor)anchor.classList.add('adhdDonePulse');
 const layer=document.createElement('div');layer.className='adhdConfetti';
 for(let n=0;n<22;n++){const s=document.createElement('i');s.style.setProperty('--x',`${Math.round(Math.random()*100)}vw`);s.style.setProperty('--r',`${Math.round(Math.random()*540-270)}deg`);s.style.setProperty('--d',`${(Math.random()*.45).toFixed(2)}s`);layer.appendChild(s)}
 document.body.appendChild(layer);setTimeout(()=>layer.remove(),1250);
}
function goHome(){document.body.classList.remove('adhdFocusOpen');if(typeof window.home==='function')window.home();else location.reload()}
function openCurrentExperience(j){document.body.classList.remove('adhdFocusOpen');if(typeof window.doHere==='function'){window.doHere();setTimeout(()=>document.querySelector(`[data-open-exp="${j}"]`)?.click(),90)}else goHome()}

function renderFocus(){
 const app=document.querySelector('#app');if(!app)return;document.body.classList.add('adhdFocusOpen');const cur=current();
 if(!cur){app.innerHTML=`<section class="tc1Screen adhdFocus"><div class="adhdFocusTop"><button class="tc1Round" data-focus-back>←</button></div><div class="adhdFocusEmpty"><div class="adhdFocusKicker">FOCUS MODE</div><h1>Set where you are first</h1><p>Open a destination and tap <b>I’m here now</b>. Focus will then reduce that place to the next 1–3 things worth doing.</p><button class="adhdPrimary" data-focus-main>Choose a place</button></div></section>`;wireFocus();return}
 const {id,i,c,d}=cur,p=progress(id,i),picks=focusItems(id,i);
 const cards=picks.length?picks.map(({it,j},idx)=>{const photo=exactPhoto(id,d,it);return`<article class="adhdFocusCard" data-focus-item="${j}">${photo?`<div class="adhdFocusPhoto" style="background-image:url('${esc(photo)}')"></div>`:''}<div class="adhdFocusCardInner"><div class="adhdFocusRank">${idx+1}</div><div class="adhdFocusCardBody"><div class="adhdFocusTags">${(it.tags||[]).slice(0,2).map(t=>`<span>${esc(t)}</span>`).join('')}</div><h3>${esc(it.title)}</h3><p>${esc((it.summary||'').replace(/\s+/g,' ').slice(0,125))}${(it.summary||'').length>125?'…':''}</p><div class="adhdFocusActions"><button class="adhdFocusDone" data-focus-done="${j}">✓ Mark done</button><button class="adhdFocusOpen" data-focus-open="${j}">Open →</button></div></div></div></article>`}).join(''):`<div class="adhdFocusAllDone"><div class="adhdCelebrateMark">✓</div><div class="adhdFocusKicker">YOU’RE CLEAR HERE</div><h2>Nothing important is waiting.</h2><p>You have finished, skipped or passed the remaining experiences in ${esc(d.name)}.</p><button class="adhdPrimary" data-focus-open-dest>See the full list</button></div>`;
 app.innerHTML=`<section class="tc1Screen adhdFocus"><div class="adhdFocusHero"><div class="adhdFocusTop"><button class="tc1Round" data-focus-back>←</button><span>◉ FOCUS</span></div><div class="adhdFocusHeroCopy"><div class="adhdFocusKicker">RIGHT NOW · ${esc(c.name)}</div><h1>${esc(d.name)}</h1><div class="adhdFocusProgressLine"><b>${p.done}/${p.total}</b><span>${p.pct}% complete</span></div><div class="adhdFocusBar"><i style="width:${p.pct}%"></i></div></div></div><div class="adhdFocusBody"><div class="adhdFocusLead">${picks.length?`Do ${picks.length===1?'this':'these '+picks.length} first`:'You’re clear here'}</div>${cards}<button class="adhdFocusSpark" data-focus-spark>✦ Spark me something</button><button class="adhdFocusAll" data-focus-open-dest>See everything in ${esc(d.name)}</button></div></section>`;
 wireFocus();
}
function renderSpark(){
 const cur=current();if(!cur)return renderFocus();const pool=items(cur.id,cur.i).filter(it=>!has('done',cur.id,cur.i,it,it.index)&&!skipped(cur.id,cur.i,it,it.index)&&rating(cur.id,cur.i,it,it.index)!=='pass').map(it=>({it,score:priority(it,cur.id,cur.i,it.index)})).sort((a,b)=>b.score-a.score).slice(0,Math.min(8,items(cur.id,cur.i).length));
 if(!pool.length){celebrate();return}
 const top=pool.filter(x=>x.score>=pool[0].score-25),pick=top[Math.floor(Math.random()*top.length)].it,photo=exactPhoto(cur.id,cur.d,pick);
 document.getElementById('adhdSparkModal')?.remove();const m=document.createElement('div');m.id='adhdSparkModal';m.className='adhdSparkModal';m.innerHTML=`<div class="adhdSparkSheet"><button class="adhdSparkClose" aria-label="Close">×</button>${photo?`<div class="adhdSparkPhoto" style="background-image:url('${esc(photo)}')"></div>`:`<div class="adhdSparkPhoto adhdPhotoVerify">PHOTO TO VERIFY</div>`}<div class="adhdFocusKicker">SPARK · ZERO OBLIGATION</div><h2>${esc(pick.title)}</h2><p class="adhdSparkHook">${esc(emotionalHook(pick))}</p><p>${esc((pick.summary||'').replace(/\s+/g,' ').slice(0,170))}${(pick.summary||'').length>170?'…':''}</p><button class="adhdPrimary" data-spark-open="${pick.index}">Open this</button><button class="adhdSparkAgain" data-spark-again>Another spark</button></div>`;document.body.appendChild(m);m.querySelector('.adhdSparkClose').onclick=()=>m.remove();m.onclick=e=>{if(e.target===m)m.remove()};m.querySelector('[data-spark-again]').onclick=()=>{m.remove();renderSpark()};m.querySelector('[data-spark-open]').onclick=()=>{const j=Number(m.querySelector('[data-spark-open]').dataset.sparkOpen);m.remove();openCurrentExperience(j)};
}
function wireFocus(){
 document.querySelectorAll('[data-focus-back],[data-focus-main]').forEach(b=>b.onclick=goHome);
 document.querySelectorAll('[data-focus-open-dest]').forEach(b=>b.onclick=()=>{document.body.classList.remove('adhdFocusOpen');if(typeof window.doHere==='function')window.doHere();else goHome()});
 document.querySelectorAll('[data-focus-open]').forEach(b=>b.onclick=()=>openCurrentExperience(Number(b.dataset.focusOpen)));
 document.querySelectorAll('[data-focus-done]').forEach(b=>b.onclick=()=>{const cur=current(),j=Number(b.dataset.focusDone),it=items(cur?.id,cur?.i).find(x=>x.index===j);if(!cur||!it)return;const card=b.closest('.adhdFocusCard');if(markDone(cur.id,cur.i,it,j)){b.textContent='✓ Done';card?.classList.add('adhdFocusCardDone');celebrate(card);setTimeout(renderFocus,650)}else renderFocus()});
 document.querySelectorAll('[data-focus-spark]').forEach(b=>b.onclick=renderSpark);
}

function inferCountryPage(){const h=document.querySelector('.tc1CountryHero h1')?.textContent||'';return countries().find(c=>norm(c.name)===norm(h))?.id||null}
function inferDestinationPage(){const h=document.querySelector('.tc1DestHero h1,.tc1DestBody h1,.vnHubHero h1')?.textContent||'';if(!h)return null;for(const c of countries()){const i=destinations(c.id).findIndex(d=>norm(d.name)===norm(h));if(i>=0)return{id:c.id,i,d:destinations(c.id)[i]}}return null}
function enhanceProgress(){
 document.querySelectorAll('[data-open-country]').forEach(card=>{const id=card.dataset.openCountry;if(!id||card.querySelector('.adhdCardProgress'))return;const p=countryProgress(id),el=document.createElement('div');el.className='adhdCardProgress';el.innerHTML=`<span><b>${p.pct}%</b> · ${p.done}/${p.total}</span><i><em style="width:${p.pct}%"></em></i>`;card.appendChild(el)});
 const cid=inferCountryPage();if(cid){const hero=document.querySelector('.tc1CountryHero');if(hero&&!hero.querySelector('.adhdCountryProgress')){const p=countryProgress(cid),el=document.createElement('div');el.className='adhdCountryProgress';el.innerHTML=`<span>Chapter progress <b>${p.done}/${p.total}</b></span><i><em style="width:${p.pct}%"></em></i>`;hero.appendChild(el)}document.querySelectorAll('.tc1Place[data-open-dest]').forEach(card=>{if(card.querySelector('.adhdPlaceProgress'))return;const i=Number(card.dataset.openDest),p=progress(cid,i),host=card.querySelector('.tc1Counts')||card.querySelector('.tc1PlaceCopy')||card,el=document.createElement('span');el.className='adhdPlaceProgress';el.innerHTML=`<b>${p.done}/${p.total}</b><i><em style="width:${p.pct}%"></em></i>`;host.appendChild(el)})}
}
function isPriorityCard(ctx,it){const j=it.index,r=rating(ctx.id,ctx.i,it,j);return r==='must'||r==='keen'||saved(ctx.id,ctx.i,it,j)||(it.tags||[]).some(t=>/must do/i.test(t))||it.tier==='S+'||it.tier==='S'}
function enhanceOverwhelm(){
 const list=document.querySelector('.tc1ExpList');if(!list)return;const active=document.querySelector('.tc1Filter.on')?.textContent?.trim().toUpperCase()||'ALL',ctx=inferDestinationPage();if(!ctx)return;
 if(active!=='ALL'){document.getElementById('adhdOverwhelm')?.remove();list.querySelectorAll('.tc1Exp').forEach(c=>c.hidden=false);return}
 let control=document.getElementById('adhdOverwhelm');if(!control){control=document.createElement('div');control.id='adhdOverwhelm';control.className='adhdOverwhelm';const anchor=document.querySelector('.tc1FilterLabel');anchor?.parentNode?.insertBefore(control,anchor)}
 const mode=sessionStorage.getItem('tc1-overwhelm-mode')||'priority',all=items(ctx.id,ctx.i);let shown=0,total=0;
 list.querySelectorAll('.tc1Exp').forEach(card=>{const j=Number(card.querySelector('[data-done-exp]')?.dataset.doneExp),it=all.find(x=>x.index===j);if(!it)return;total++;const keep=mode==='all'||isPriorityCard(ctx,it);card.hidden=!keep;if(keep)shown++});
 control.innerHTML=`<button class="${mode==='priority'?'on':''}" data-overwhelm="priority">Priority + saved</button><button class="${mode==='all'?'on':''}" data-overwhelm="all">All ${total}</button><small>${mode==='priority'?shown+' shown · less noise':'Full list'}</small>`;
 control.querySelectorAll('[data-overwhelm]').forEach(b=>b.onclick=()=>{sessionStorage.setItem('tc1-overwhelm-mode',b.dataset.overwhelm);enhanceOverwhelm()});
}
function enhance(){if(!document.body.classList.contains('adhdFocusOpen')){enhanceProgress();enhanceOverwhelm()}}

function injectFocusButton(){if(document.getElementById('adhdFocusFab'))return;const fab=document.createElement('button');fab.id='adhdFocusFab';fab.className='adhdFocusFab';fab.innerHTML='◉ Focus';fab.title='Focus — only what matters right now';fab.onclick=renderFocus;document.body.appendChild(fab)}
function injectStyles(){if(document.getElementById('adhdFocusStyles'))return;const s=document.createElement('style');s.id='adhdFocusStyles';s.textContent=`
.adhdFocusFab{position:fixed;right:16px;bottom:calc(22px + env(safe-area-inset-bottom));z-index:80;border:1px solid #ffffff2d;border-radius:999px;padding:13px 17px;font:800 14px Manrope,Inter,sans-serif;background:#10372f;color:#fff;box-shadow:0 8px 28px #0005}.adhdFocusFab:active{transform:scale(.97)}
.adhdFocus{background:#0a1f1c;color:#f7f1e7;min-height:100vh;padding-bottom:110px}.adhdFocusTop{display:flex;justify-content:space-between;align-items:center;padding:14px 16px}.adhdFocusTop>span{font:800 11px Manrope,sans-serif;letter-spacing:.12em}.adhdFocusHero{background:linear-gradient(180deg,#123a33,#0a1f1c);padding-bottom:22px}.adhdFocusHeroCopy{padding:8px 18px 0}.adhdFocusKicker{font:800 10px Manrope,sans-serif;letter-spacing:.16em;text-transform:uppercase;opacity:.68}.adhdFocusHero h1{font:800 36px/1.02 Manrope,Inter,sans-serif;margin:8px 0 12px}.adhdFocusProgressLine{display:flex;align-items:end;justify-content:space-between;margin-bottom:8px}.adhdFocusProgressLine b{font-size:18px}.adhdFocusProgressLine span{font-size:12px;opacity:.72}.adhdFocusBar{height:9px;background:#1e3a35;border-radius:99px;overflow:hidden}.adhdFocusBar i{display:block;height:100%;background:#efd39c;border-radius:99px}.adhdFocusBody{padding:12px 16px 40px}.adhdFocusLead{font:800 12px Manrope,sans-serif;text-transform:uppercase;letter-spacing:.1em;opacity:.68;margin:6px 0 14px}.adhdFocusCard{background:#122926;border:1px solid #2a4a43;border-radius:19px;overflow:hidden;margin-bottom:12px;transition:.25s}.adhdFocusPhoto{height:150px;background-size:cover;background-position:center}.adhdFocusCardInner{display:grid;grid-template-columns:38px 1fr;gap:11px;padding:14px}.adhdFocusRank{width:34px;height:34px;border-radius:50%;background:#efd39c;color:#0a1f1c;display:grid;place-items:center;font-weight:900}.adhdFocusTags{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:6px}.adhdFocusTags span{font-size:9px;font-weight:800;background:#1e3a35;padding:4px 7px;border-radius:999px}.adhdFocusCard h3{margin:0 0 5px;font:800 19px/1.15 Manrope,Inter,sans-serif;color:#fff}.adhdFocusCard p{margin:0 0 12px;font-size:13px;line-height:1.35;opacity:.84;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}.adhdFocusActions{display:flex;gap:7px}.adhdFocusActions button,.adhdPrimary,.adhdFocusSpark,.adhdFocusAll,.adhdSparkAgain{border:0;border-radius:12px;padding:11px 13px;font-weight:800}.adhdFocusDone,.adhdPrimary{background:#efd39c;color:#0a1f1c}.adhdFocusOpen{background:#1e3a35;color:#fff}.adhdFocusSpark{width:100%;margin-top:8px;background:#efd39c;color:#0a1f1c}.adhdFocusAll{width:100%;margin-top:8px;background:transparent;color:#f7f1e7;border:1px solid #2a4a43}.adhdFocusEmpty,.adhdFocusAllDone{padding:46px 20px;text-align:center}.adhdFocusEmpty h1,.adhdFocusAllDone h2{font:800 30px/1.08 Manrope,Inter,sans-serif;margin:10px 0}.adhdCelebrateMark{width:62px;height:62px;border-radius:50%;margin:0 auto 18px;background:#efd39c;color:#0a1f1c;display:grid;place-items:center;font-size:28px;font-weight:900}.adhdFocusCardDone{transform:scale(.98);background:#1e463d;border-color:#efd39c}.adhdDonePulse{animation:adhdPulse .55s ease}.adhdConfetti{position:fixed;inset:0;z-index:999;pointer-events:none;overflow:hidden}.adhdConfetti i{position:absolute;left:var(--x);top:-16px;width:8px;height:15px;border-radius:2px;background:#efd39c;animation:adhdFall .9s cubic-bezier(.2,.8,.2,1) var(--d) forwards}.adhdConfetti i:nth-child(3n){background:#fff}.adhdConfetti i:nth-child(4n){background:#72b7a3}@keyframes adhdFall{to{transform:translateY(105vh) rotate(var(--r));opacity:.15}}@keyframes adhdPulse{50%{transform:scale(1.018)}}
.adhdSparkModal{position:fixed;inset:0;z-index:500;background:#000b;display:flex;align-items:flex-end}.adhdSparkSheet{width:min(720px,100%);max-height:88vh;overflow:auto;margin:0 auto;background:#102824;color:#f7f1e7;border-radius:24px 24px 0 0;padding:16px 16px calc(24px + env(safe-area-inset-bottom));position:relative}.adhdSparkClose{position:absolute;right:14px;top:14px;z-index:2;width:38px;height:38px;border:0;border-radius:50%;background:#0a1f1cdd;color:#fff;font-size:24px}.adhdSparkPhoto{height:220px;border-radius:16px;margin-bottom:16px;background-size:cover;background-position:center;display:grid;place-items:center}.adhdPhotoVerify{background:#173d34;color:#fff;font:800 11px Manrope,sans-serif;letter-spacing:.08em}.adhdSparkSheet h2{font:800 28px/1.08 Manrope,Inter,sans-serif;margin:7px 0}.adhdSparkSheet p{line-height:1.45;opacity:.82}.adhdSparkHook{font-weight:800!important;opacity:1!important;color:#efd39c}.adhdSparkAgain{width:100%;margin-top:8px;background:#1e3a35;color:#fff}.adhdSparkSheet .adhdPrimary{width:100%}
.adhdCardProgress{position:absolute;left:12px;right:12px;bottom:10px;z-index:3;color:#fff;text-align:left;font-size:10px;text-shadow:0 1px 5px #000}.adhdCardProgress span{display:block;margin-bottom:4px}.adhdCardProgress>i,.adhdCountryProgress>i,.adhdPlaceProgress>i{display:block;height:4px;background:#ffffff45;border-radius:99px;overflow:hidden}.adhdCardProgress em,.adhdCountryProgress em,.adhdPlaceProgress em{display:block;height:100%;background:#efd39c;border-radius:99px}.tc1CountryCard,.tc1CountrySlide{position:relative}.adhdCountryProgress{position:absolute;left:16px;right:16px;bottom:10px;z-index:3;color:#fff;font-size:11px}.adhdCountryProgress span{display:flex;justify-content:space-between;margin-bottom:4px}.adhdPlaceProgress{display:grid!important;grid-template-columns:auto 62px;align-items:center;gap:6px}.adhdPlaceProgress>i{background:#d8cebd}.adhdPlaceProgress em{background:#10372f}
.adhdOverwhelm{display:grid;grid-template-columns:1fr 1fr;gap:7px;padding:8px 0 12px}.adhdOverwhelm button{border:1px solid #d8cebd;background:#fffaf1;border-radius:999px;padding:9px 10px;font-size:11px;font-weight:800}.adhdOverwhelm button.on{background:#10372f;color:#fff;border-color:#10372f}.adhdOverwhelm small{grid-column:1/-1;color:#68726e;font-size:10px;padding-left:4px}.tc1Exp[hidden]{display:none!important}
` ;document.head.appendChild(s)}
function boot(){injectStyles();injectFocusButton();let queued=false;const schedule=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;injectFocusButton();enhance()})};new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});schedule()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
window.ADHDFocus={render:renderFocus,spark:renderSpark,progress,version:'2026-09-12-v2'};
})();
