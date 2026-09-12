/* Country Route Map v1 — 2026-09-12
 * ADHD-first, semi-static country route orientation.
 * Vietnam is the first implementation. No Leaflet, pan/zoom or free-roaming map UI.
 */
(()=>{
'use strict';
if(window.__COUNTRY_ROUTE_MAP_V1__)return;window.__COUNTRY_ROUTE_MAP_V1__=true;

const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const slug=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
const norm=s=>slug(s).replace(/-/g,' ');
const data=()=>{try{return typeof DATA!=='undefined'?DATA:window.DATA}catch(e){return window.DATA}};
const store=()=>{try{return typeof state!=='undefined'?state:window.state||null}catch(e){return window.state||null}};
const countries=()=>data()?.countries||[];
const country=id=>countries().find(c=>c.id===id);
const destinations=id=>data()?.destinations?.[id]||[];

const CONFIG={
 vietnam:{
  asset:'vietnam-map.png',
  note:'Stylised route · stop order, not GPS scale',
  regions:['South & Mekong','Highlands & Ho Chi Minh Road','Central Coast & Imperial Vietnam','Caves & the North']
 }
};

function countryPage(){
 const hero=document.querySelector('.tc1CountryHero');if(!hero)return null;
 const title=hero.querySelector('h1')?.textContent||'';
 const c=countries().find(x=>norm(x.name)===norm(title));
 return c&&CONFIG[c.id]?{id:c.id,c,hero,screen:hero.closest('.tc1Screen')}:null;
}
function current(id){
 const s=store();if(!s)return null;const ds=destinations(id),loc=s.currentLocation;
 if(loc?.country===id&&loc?.destination){const i=ds.findIndex(d=>slug(d.name)===loc.destination);if(i>=0)return i}
 if(s.here&&s.here!=='pre'){const [cid,n]=String(s.here).split(':');const i=Number(n);if(cid===id&&ds[i])return i}
 return null;
}
function rawTags(e){const t=[];if(e?.tier)t.push(e.tier);if(e?.type)t.push(String(e.type).replace(/(^|\s)\S/g,m=>m.toUpperCase()));return t}
function items(id,i){
 const d=destinations(id)[i];if(!d)return[];
 if(id==='vietnam'&&typeof window.vnBaseItems==='function'){
  try{return window.vnBaseItems({c:country(id),d,i,id:id+'-'+i}).map((it,j)=>({id:it.id||'e'+j,title:it.title||it.name||d.experiences?.[j]?.name||'Experience',tags:it.tags||rawTags(d.experiences?.[j]),index:j}))}catch(e){}
 }
 return(d.experiences||[]).map((e,j)=>({id:e.id||'e'+j,title:e.name||e.title||'Experience',tags:e.tags||rawTags(e),index:j}));
}
function canonicalKey(id,i,it,j){
 if(id==='vietnam'&&typeof window.vnSavedKey==='function')try{return window.vnSavedKey({c:country(id),d:destinations(id)[i],i,id:id+'-'+i},it)}catch(e){}
 return id+'-'+i+'-'+j;
}
function stableKey(id,i,it){return'exp:'+id+':'+slug(destinations(id)[i]?.name||String(i))+':'+slug(it?.id||it?.title||'experience')}
function allKeys(id,i,it,j){const a=[stableKey(id,i,it),canonicalKey(id,i,it,j),id+'-'+i+'-'+j];if(id==='vietnam'&&i===0)a.push('hcm-'+j);return[...new Set(a)]}
function has(bucket,id,i,it,j){const obj=store()?.[bucket]||{};return allKeys(id,i,it,j).some(k=>!!obj[k])}
function finished(id,i){const a=items(id,i);return !!a.length&&a.every(it=>has('done',id,i,it,it.index)||has('skip',id,i,it,it.index))}
function stopProgress(id,i){
 const a=items(id,i),done=a.filter(it=>has('done',id,i,it,it.index)||has('skip',id,i,it,it.index)).length;
 return{done,total:a.length,pct:a.length?Math.round(done/a.length*100):0};
}
function countryProgress(id){const ds=destinations(id),complete=ds.filter((_,i)=>finished(id,i)).length;return{complete,total:ds.length,pct:ds.length?Math.round(complete/ds.length*100):0}}
function nextStop(id,cur){
 const ds=destinations(id);if(cur!==null)for(let i=cur+1;i<ds.length;i++)if(!finished(id,i))return i;
 for(let i=0;i<ds.length;i++)if(!finished(id,i)&&i!==cur)return i;
 return null;
}
function vietnamRegion(ds,i){
 const q=ds.findIndex(d=>d.name==='Quy Nhơn'),p=ds.findIndex(d=>d.name==='Phong Nha / Quảng Bình'),h=ds.findIndex(d=>d.name==='Đồng Xoài / Bình Phước');
 if(h<0||i<h)return'South & Mekong';if(q<0||i<q)return'Highlands & Ho Chi Minh Road';if(p<0||i<p)return'Central Coast & Imperial Vietnam';return'Caves & the North';
}
function regionFor(id,i){return id==='vietnam'?vietnamRegion(destinations(id),i):'Route'}
function regionGroups(id){
 const out=[];destinations(id).forEach((d,i)=>{const name=regionFor(id,i);let g=out.find(x=>x.name===name);if(!g){g={name,indices:[]};out.push(g)}g.indices.push(i)});return out;
}
function pointFor(i,total){
 const t=total<=1?0:i/(total-1),y=94-t*86;
 const wave=[48,58,66,55,43,51,62,57],x=wave[i%wave.length]+(t>.67?-4:t<.28?3:0);
 return{x:Math.max(29,Math.min(72,x)),y};
}
function pathD(points){return points.map((p,i)=>(i?'L':'M')+' '+p.x.toFixed(2)+' '+p.y.toFixed(2)).join(' ')}
function labelNeeded(i,cur,next,groups,total){return i===cur||i===next||i===0||i===total-1||groups.some(g=>g.indices[0]===i)}
function markerState(id,i,cur,next){if(i===cur)return'current';if(finished(id,i))return'done';if(i===next)return'next';return'upcoming'}
function statusText(st){return st==='current'?'YOU ARE HERE':st==='done'?'COMPLETE':st==='next'?'NEXT':'UPCOMING'}

function openDestination(id,i){
 const page=countryPage();if(!page||page.id!==id)return;
 const places=page.screen?.querySelector('.tc1Tab[data-local-tab="places"]');if(!places)return;
 let closed=false;
 const seek=()=>{if(closed)return;const card=document.querySelector(`.tc1Place[data-open-dest="${i}"]`);if(card){closed=true;obs.disconnect();card.click()}};
 const obs=new MutationObserver(seek);obs.observe(document.getElementById('app')||document.body,{childList:true,subtree:true});
 places.click();setTimeout(seek,50);setTimeout(()=>{closed=true;obs.disconnect()},1600);
}
function focusNow(){try{window.ADHDFocus?.render?.()}catch(e){}}

function render(id){
 const page=countryPage();if(!page||page.id!==id)return;const ds=destinations(id),cfg=CONFIG[id],tabs=page.screen.querySelector('.tc1Tabs');if(!tabs||!ds.length)return;
 let host=page.screen.querySelector('.countryRouteMapHost');if(!host){host=document.createElement('div');host.className='countryRouteMapHost';tabs.insertAdjacentElement('afterend',host)}
 for(let n=host.nextElementSibling;n&&!n.classList.contains('tc1Drawer');n=n.nextElementSibling)n.hidden=true;
 page.screen.querySelectorAll('.tc1Tab').forEach(b=>b.classList.toggle('on',b.hasAttribute('data-country-route-map')));
 const cur=current(id),next=nextStop(id,cur),cp=countryProgress(id),groups=regionGroups(id),points=ds.map((_,i)=>pointFor(i,ds.length)),curP=cur!==null?stopProgress(id,cur):null;
 const regionLabels=groups.map(g=>{const mid=g.indices[Math.floor(g.indices.length/2)],p=points[mid],done=g.indices.filter(i=>finished(id,i)).length;return`<div class="crmRegion" style="top:${p.y}%"><b>${esc(g.name)}</b><span>${done}/${g.indices.length}</span></div>`}).join('');
 const markers=ds.map((d,i)=>{const p=points[i],st=markerState(id,i,cur,next),show=labelNeeded(i,cur,next,groups,ds.length),side=p.x>55?'left':'right';return`<button class="crmMarker ${st}" style="left:${p.x}%;top:${p.y}%" data-crm-stop="${i}" aria-label="Stop ${i+1}: ${esc(d.name)} — ${statusText(st)}"><span class="crmDot">${st==='done'?'✓':i+1}</span>${show?`<span class="crmLabel ${side}"><small>${statusText(st)}</small><b>${esc(d.name)}</b></span>`:''}</button>`}).join('');
 const currentCopy=cur!==null?`<div><small>CURRENT PLACE</small><b>${esc(ds[cur].name)}</b><span>${curP.done}/${curP.total} experiences cleared</span></div>`:`<div><small>ORIENTATION</small><b>No current place set</b><span>Set “I’m here now” inside a destination.</span></div>`;
 const nextCopy=next!==null?`<div><small>NEXT ON ROUTE</small><b>${esc(ds[next].name)}</b><span>Stop ${next+1} of ${ds.length}</span></div>`:'';
 host.innerHTML=`<section class="crmWrap"><div class="crmHead"><div><div class="crmEyebrow">${esc(page.c.name)} · ROUTE MAP</div><h2>See the journey, not the noise.</h2><p>${esc(cfg.note)}</p></div><div class="crmProgress"><span><b>${cp.complete}/${cp.total}</b> places complete</span><strong>${cp.pct}%</strong><i><em style="width:${cp.pct}%"></em></i></div></div><div class="crmNow">${currentCopy}${nextCopy}</div>${cur!==null?`<button class="crmFocus" data-crm-focus>◉ Focus on ${esc(ds[cur].name)}</button>`:''}<div class="crmLegend"><span><i class="current"></i>Here</span><span><i class="done"></i>Complete</span><span><i class="next"></i>Next</span><span><i></i>Upcoming</span></div><div class="crmCanvas" style="--crm-map:url('${esc(cfg.asset)}')"><svg class="crmPath" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="${pathD(points)}"/></svg>${regionLabels}${markers}</div><div class="crmHint">Tap a numbered stop to open that destination.</div></section>`;
 host.querySelectorAll('[data-crm-stop]').forEach(b=>b.onclick=()=>openDestination(id,Number(b.dataset.crmStop)));
 host.querySelector('[data-crm-focus]')?.addEventListener('click',focusNow);
 const active=host.querySelector('.crmMarker.current')||host.querySelector('.crmMarker.next');
 if(active)setTimeout(()=>active.scrollIntoView({behavior:'smooth',block:'center'}),80);
}

function injectMapTab(){
 const page=countryPage();if(!page)return;const tabs=page.screen?.querySelector('.tc1Tabs');if(!tabs||tabs.querySelector('[data-country-route-map]'))return;
 const btn=document.createElement('button');btn.className='tc1Tab';btn.type='button';btn.dataset.countryRouteMap='1';btn.textContent='MAP';
 const route=tabs.querySelector('[data-local-tab="route"]');route?.insertAdjacentElement('afterend',btn);if(!route)tabs.appendChild(btn);
 btn.onclick=()=>render(page.id);
}
function injectStyles(){if(document.getElementById('countryRouteMapStyles'))return;const s=document.createElement('style');s.id='countryRouteMapStyles';s.textContent=`
.countryRouteMapHost{background:#0a1f1c;color:#f7f1e7;min-height:70vh;padding:0 0 calc(42px + env(safe-area-inset-bottom))}.crmWrap{padding:18px 14px 30px;max-width:760px;margin:auto}.crmHead{display:grid;gap:14px}.crmEyebrow{font-size:10px;font-weight:900;letter-spacing:.16em;color:#efd39c}.crmHead h2{font:800 27px/1.08 Manrope,Inter,sans-serif;margin:6px 0 4px}.crmHead p{margin:0;color:#c6cec9;font-size:12px}.crmProgress{background:#122926;border:1px solid #2a4a43;border-radius:16px;padding:13px}.crmProgress>span{font-size:12px}.crmProgress strong{float:right;font-size:14px;color:#efd39c}.crmProgress>i{display:block;clear:both;height:6px;background:#203b36;border-radius:99px;overflow:hidden;margin-top:9px}.crmProgress em{display:block;height:100%;background:#efd39c;border-radius:99px}.crmNow{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:12px 0}.crmNow>div{background:#102823;border:1px solid #294841;border-radius:14px;padding:11px;min-width:0}.crmNow small{display:block;font-size:9px;letter-spacing:.12em;color:#9eb1aa;margin-bottom:4px}.crmNow b{display:block;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.crmNow span{display:block;font-size:10px;color:#aab8b3;margin-top:3px}.crmFocus{width:100%;border:1px solid #6e7569;background:#efd39c;color:#0a1f1c;border-radius:13px;padding:11px 12px;font-weight:900;margin:0 0 12px}.crmLegend{display:flex;flex-wrap:wrap;gap:8px 12px;font-size:10px;color:#bdc8c3;margin:9px 2px 12px}.crmLegend span{display:flex;align-items:center;gap:5px}.crmLegend i{width:9px;height:9px;border:1px solid #8d9b95;border-radius:50%;display:block}.crmLegend i.current{background:#d66a45;border-color:#f3a789;box-shadow:0 0 0 3px #d66a4530}.crmLegend i.done{background:#78958a;border-color:#78958a}.crmLegend i.next{border:2px solid #efd39c}.crmCanvas{height:1320px;position:relative;border:1px solid #2b4942;border-radius:22px;overflow:hidden;background:#0d2723}.crmCanvas:before{content:"";position:absolute;inset:0;background-image:linear-gradient(180deg,rgba(10,31,28,.42),rgba(10,31,28,.66)),var(--crm-map);background-repeat:no-repeat;background-size:cover,contain;background-position:center;opacity:.48;filter:saturate(.72) contrast(.9)}.crmCanvas:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(10,31,28,.58),transparent 22%,transparent 78%,rgba(10,31,28,.58));pointer-events:none}.crmPath{position:absolute;inset:4% 5%;width:90%;height:92%;z-index:1;overflow:visible}.crmPath path{fill:none;stroke:#efd39c;stroke-width:.58;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1.6 1.1;vector-effect:non-scaling-stroke;opacity:.72}.crmMarker{position:absolute;z-index:4;width:44px;height:44px;transform:translate(-50%,-50%);border:0;background:transparent;padding:0;overflow:visible}.crmDot{width:25px;height:25px;border-radius:50%;display:grid;place-items:center;margin:auto;background:#102823;border:2px solid #71827c;color:#dce4df;font-size:9px;font-weight:900;box-shadow:0 2px 8px #0008}.crmMarker.done .crmDot{background:#607b72;border-color:#78958a;color:#fff}.crmMarker.next .crmDot{border-color:#efd39c;border-width:3px;color:#efd39c;background:#102823}.crmMarker.current{z-index:7}.crmMarker.current .crmDot{width:31px;height:31px;background:#d66a45;border:3px solid #ffd2bf;color:#fff;box-shadow:0 0 0 7px #d66a4530,0 4px 16px #0009}.crmLabel{position:absolute;top:50%;transform:translateY(-50%);width:124px;text-align:left;background:rgba(8,27,24,.9);border:1px solid #3b554f;border-radius:10px;padding:6px 7px;pointer-events:none;box-shadow:0 4px 14px #0005}.crmLabel.right{left:38px}.crmLabel.left{right:38px;text-align:right}.crmLabel small{display:block;color:#a9b9b3;font-size:7px;letter-spacing:.1em}.crmLabel b{display:block;color:#f7f1e7;font-size:10px;line-height:1.18;margin-top:2px}.crmMarker.current .crmLabel{border-color:#d66a45}.crmMarker.current .crmLabel small{color:#f3a789}.crmMarker.next .crmLabel{border-color:#8c805f}.crmRegion{position:absolute;left:8px;z-index:3;transform:translateY(-50%);max-width:116px;background:#efd39c;color:#0a1f1c;border-radius:9px;padding:6px 7px;box-shadow:0 3px 10px #0005;pointer-events:none}.crmRegion b{display:block;font-size:8px;line-height:1.15;text-transform:uppercase;letter-spacing:.04em}.crmRegion span{font-size:8px;opacity:.7}.crmHint{text-align:center;color:#97aaa3;font-size:11px;padding:12px 0 0}@media(max-width:430px){.crmWrap{padding-left:10px;padding-right:10px}.crmCanvas{height:1260px}.crmLabel{width:105px}.crmRegion{max-width:92px}.crmRegion b{font-size:7px}.crmNow{grid-template-columns:1fr}.crmMarker{width:40px;height:40px}}
`;document.head.appendChild(s)}
function boot(){injectStyles();let queued=false;const run=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;injectMapTab()})};new MutationObserver(run).observe(document.getElementById('app')||document.documentElement,{childList:true,subtree:true});run()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
window.CountryRouteMap={render,version:'2026-09-12-v1',countries:Object.keys(CONFIG)};
})();
