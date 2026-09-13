/* Vietnam duration optimisation — Mekong cluster v1.
 * Fits locked experiences into the stay you actually have.
 * Does not delete the bank. Does not change itinerary.json dates.
 */
(()=>{
'use strict';
if(window.__VN_DURATION_MEKONG_V1__)return;window.__VN_DURATION_MEKONG_V1__=true;

const esc=s=>String(s??'').replace(/&/g,'&').replace(/</g,'<').replace(/>/g,'>').replace(/"/g,'"');
const slug=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
const norm=s=>slug(s).replace(/-/g,' ');

const CLUSTER=[
  'ho chi minh city','cai be','sa dec','can tho','long xuyen','chau doc','tra su',
  'tinh bien','bac lieu','ha tien','kien luong','rach gia','nam du','ben tre','tra vinh','vinh long'
];
const DEFAULT_DAYS={
  'ho chi minh city':5,'cai be':2,'sa dec':2,'can tho':2,'long xuyen':1,'chau doc':2,'tra su':1,
  'tinh bien':2,'bac lieu':1,'ha tien':2,'kien luong':1,'rach gia':1,'nam du':2,'ben tre':2,'tra vinh':2,'vinh long':2
};
const MAX_DAYS={'ho chi minh city':7};
const PILLS={'ho chi minh city':[3,5,7]};
const LABELS={
  'ho chi minh city':['Arrive & orient','War & temples','Chợ Lớn','Eat after dark','Out of town','More Saigon','Reset / extra']
};

/* Hand-ranked day patterns. First match wins; leftover goes to Later. */
const HAND={
  'ho chi minh city':[
    [/book street/,/post office/,/notre-dame|notre dame/],
    [/war remnants/,/jade emperor/,/commando/],
    [/chợ lớn|cho lon|binh tay|bình tây/,/fito/,/tân định|tan dinh/],
    [/motorbike food/,/district 4/,/hồ thị kỷ|ho thi ky/],
    [/củ chi|cu chi/,/night sightseeing|open-top/,/42 nguyễn huệ|nguyen hue café|cafe apartment/],
    [/cần giờ|can gio/,/fish-sauce/,/landmark 81/],
    [/bùi viện|bui vien/,/river night/,/traditional medicine/]
  ],
  'cai be':[
    [/tân phong cycling|tan phong cycling/,/sampan/,/garden-house overnight|heritage\/garden|family dinner/],
    [/sunrise river/,/morning market/,/đông hòa|dong hoa|tát mương|tat muong/]
  ],
  'sa dec':[
    [/flower village/,/huỳnh thủy lê|huynh thuy le/,/cycling/],
    [/nurseries|farmer hands/,/the lover|kiến an cung|kien an cung/,/night market/]
  ],
  'can tho':[
    [/cái răng|cai rang|before dawn/,/cây bẹo|cay beo/,/ninh kiều|ninh kieu/],
    [/cồn sơn|con son/,/bình thủy|binh thuy/,/cycling or motorbike|islet\/canal/]
  ],
  'long xuyen':[
    [/cù lao ông hổ|ong ho|cycle island/,/floating market|sunrise breakfast/,/mỹ hòa hưng|my hoa hung|riverfront at night/]
  ],
  'chau doc':[
    [/bà chúa xứ|ba chua xu/,/núi sam|nui sam pilgrimage/,/hang pagoda/],
    [/cham village|châu phong|chau phong/,/floating fish-farm|fish raft/,/mắm tasting|mam tasting/]
  ],
  'tra su':[
    [/boat journey/,/birds and observation|observation tower/,/biodiversity walk|bamboo bridge/]
  ]
};

function clusterKey(name){
  const q=norm(name);
  return CLUSTER.find(k=>q.includes(k))||'';
}
function inCluster(name){return !!clusterKey(name)}
function defaultDays(name){return DEFAULT_DAYS[clusterKey(name)]||2}
function maxDays(name){return MAX_DAYS[clusterKey(name)]||3}
function pills(name){return PILLS[clusterKey(name)]||[1,2,3].filter(n=>n<=Math.max(2,maxDays(name)))}
function dayLabel(name,i){return (LABELS[clusterKey(name)]||[])[i]||('Day '+(i+1))}

function weak(it){
  const t=norm(it.title||it.name||'');
  if(!t||t.length<4)return true;
  if(/^(preserve generic|preferred overnight|food drink|keep small)/.test(t))return true;
  if(/not retained as experiences/.test(t))return true;
  const tags=it.tags||[];
  if(tags.includes('Food')&&!tags.includes('Must Do')&&t.split(' ').length<=3)return true;
  return false;
}
function hours(it){
  const t=String(it.time||it.raw?.time||it.summary||'').toLowerCase();
  if(/overnight|full day/.test(t))return 6;
  if(/half/.test(t))return 4;
  if(/3–4|3-4/.test(t))return 3.5;
  if(/2–3|2-3/.test(t))return 2.5;
  if(/1–2|1-2/.test(t))return 1.5;
  return 2;
}
function score(it){
  const tags=(it.tags||[]).join(' '), flags=(it.flags||[]).join(' ');
  let s=20;
  if(/must do/i.test(tags)||it.tier==='S+')s+=90;
  else if(it.tier==='S')s+=55;
  if(/book ahead/i.test(tags+' '+flags))s+=35;
  if(/unique/i.test(tags))s+=30;
  if(/history/i.test(tags))s+=18;
  if(/outdoors|culture/i.test(tags))s+=14;
  if(/local life/i.test(tags))s+=10;
  if(weak(it))s-=80;
  return s;
}

function store(){
  const s=window.state||(window.state={});
  s.vnDays=s.vnDays||{};
  return s.vnDays;
}
function destState(name){
  const all=store();
  const k=slug(name);
  if(!all[k])all[k]={days:defaultDays(name),later:{}};
  return all[k];
}
function persist(){try{if(typeof save==='function')save()}catch(e){}}

function itemsOf(x){
  if(typeof vnBaseItems==='function')return vnBaseItems(x);
  return (x.d.experiences||[]).map((e,i)=>({id:e.id||'live-'+i,title:e.name||e.title,summary:e.summary||'',tags:e.tags||[],flags:e.flags||[],tier:e.tier||'A'}));
}

function pickByPattern(pool,rx){
  const i=pool.findIndex(it=>{
    const title=String(it.title||it.name||'');
    return rx.test(title)||rx.test(title.toLowerCase())||rx.test(norm(title));
  });
  if(i<0)return null;
  return pool.splice(i,1)[0];
}

function pack(x,days){
  const name=x.d.name;
  const all=itemsOf(x).filter(it=>!weak(it));
  const st=destState(name);
  const later=st.later||{};
  const usable=all.filter(it=>!later[it.id]);
  const overflowIds=all.filter(it=>later[it.id]);
  const hand=HAND[clusterKey(name)];
  const daySlots=Array.from({length:days},()=>[]);
  const used=new Set();

  if(hand){
    for(let d=0;d<Math.min(days,hand.length);d++){
      const pool=usable.filter(it=>!used.has(it.id));
      for(const rx of hand[d]){
        if(daySlots[d].length>=3)break;
        const hit=pickByPattern(pool,rx);
        if(hit){daySlots[d].push(hit);used.add(hit.id)}
      }
    }
  }

  const ranked=usable.filter(it=>!used.has(it.id)).slice().sort((a,b)=>score(b)-score(a)||String(a.title).localeCompare(String(b.title)));
  for(const it of ranked){
    let placed=false;
    for(let d=0;d<days;d++){
      if(daySlots[d].length>=3)continue;
      const h=daySlots[d].reduce((n,z)=>n+hours(z),0);
      if(h+hours(it)>7 && daySlots[d].length)continue;
      daySlots[d].push(it);used.add(it.id);placed=true;break;
    }
    if(!placed)overflowIds.push(it);
  }
  overflowIds.push(...usable.filter(it=>!used.has(it.id)&&!overflowIds.includes(it)));
  overflowIds.push(...all.filter(it=>later[it.id]));
  const seen=new Set();
  const overflow=overflowIds.filter(it=>{if(seen.has(it.id))return false;seen.add(it.id);return !used.has(it.id)});
  return {days:daySlots,overflow,total:all.length};
}

function openItem(id){
  if(typeof vnExperienceDetail==='function')return vnExperienceDetail(id);
  if(typeof vnExperiences==='function')return vnExperiences('All');
}

window.vnDuration=async function(){
  if(window.VN_LIVE_READY)await window.VN_LIVE_READY;
  const x=typeof vnStop==='function'?vnStop():null;
  if(!x)return typeof home==='function'?home():null;
  nav.hidden=true;nav.style.display='none';
  const name=x.d.name;
  const st=destState(name);
  const options=pills(name);
  if(!options.includes(st.days))st.days=defaultDays(name);
  const plan=pack(x,st.days);
  const planned=plan.days.reduce((n,d)=>n+d.length,0);

  app.innerHTML=`<div class="vnDays">
    <button class="back" id="vdBack">← ${esc(name)}</button>
    <p class="vnDaysKicker">THESE DAYS · MEKONG</p>
    <h1>What fits</h1>
    <p class="vnDaysLead">The bank stays saved. This is the realistic plan for ${st.days} day${st.days>1?'s':''} — three things a day, food on the passport.</p>
    <div class="vnDaysPills">${options.map(n=>`<button class="${n===st.days?'on':''}" data-vddays="${n}">${n} DAY${n>1?'S':''}</button>`).join('')}</div>
    ${plan.days.map((slots,i)=>`<section class="vnDay">
      <header><b>Day ${i+1}</b><small>${esc(dayLabel(name,i))}</small></header>
      ${slots.length?slots.map(it=>`<article>
        <button class="vnDayOpen" data-vdopen="${esc(it.id)}"><b>${esc(it.title)}</b><small>${esc((it.tags||[]).slice(0,2).join(' · ')||'Saved experience')}</small></button>
        <button class="vnDayLater" data-vdlater="${esc(it.id)}">Later</button>
      </article>`).join('') : `<p class="vnDayEmpty">Nothing parked on this day yet.</p>`}
    </section>`).join('')}
    <section class="vnDay later">
      <header><b>Later / extra</b><small>${plan.overflow.length} saved if you linger</small></header>
      ${plan.overflow.slice(0,12).map(it=>`<article>
        <button class="vnDayOpen" data-vdopen="${esc(it.id)}"><b>${esc(it.title)}</b><small>Optional</small></button>
        <button class="vnDayKeep" data-vdkeep="${esc(it.id)}">Keep</button>
      </article>`).join('')||'<p class="vnDayEmpty">Everything important already fits.</p>'}
      ${plan.overflow.length>12?`<p class="vnDayMore">+ ${plan.overflow.length-12} more in the full bank</p>`:''}
    </section>
    <p class="vnDaysFoot">${planned} in the plan · ${plan.overflow.length} later · ${plan.total} still in the bank</p>
  </div>`;

  document.getElementById('vdBack').onclick=()=>vnHub();
  document.querySelectorAll('[data-vddays]').forEach(b=>b.onclick=()=>{st.days=Number(b.dataset.vddays);persist();vnDuration()});
  document.querySelectorAll('[data-vdopen]').forEach(b=>b.onclick=()=>openItem(b.dataset.vdopen));
  document.querySelectorAll('[data-vdlater]').forEach(b=>b.onclick=()=>{st.later=st.later||{};st.later[b.dataset.vdlater]=true;persist();vnDuration()});
  document.querySelectorAll('[data-vdkeep]').forEach(b=>b.onclick=()=>{if(st.later)delete st.later[b.dataset.vdkeep];persist();vnDuration()});
};

const css=`
.vnDays{padding:8px 16px calc(28px + env(safe-area-inset-bottom));color:#123b32}
.vnDaysKicker{margin:8px 0 0;font:800 10px/1.3 Inter,sans-serif;letter-spacing:.22em;color:#c45c32}
.vnDays h1{margin:6px 0 8px;font:800 42px/1 Georgia,serif}
.vnDaysLead{margin:0 0 16px;color:#3d4f4a;line-height:1.45;font-size:15px}
.vnDaysPills{display:flex;gap:8px;margin:0 0 18px;flex-wrap:wrap}
.vnDaysPills button{border:1px solid #e5dccc;background:#fff;border-radius:999px;padding:10px 16px;font:800 12px Inter,sans-serif;color:#155241;min-height:44px}
.vnDaysPills button.on{background:#155241;color:#fff;border-color:#155241}
.vnDay{background:#fffaf2;border:1px solid #eadfcf;border-radius:18px;padding:14px;margin:0 0 12px}
.vnDay.later{background:#f4eee4}
.vnDay header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px}
.vnDay header b{font:800 22px/1 Georgia,serif}
.vnDay header small{color:#7c817e;font:700 11px Inter,sans-serif}
.vnDay article{display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;padding:8px 0;border-top:1px solid #eadfcf}
.vnDayOpen{border:0;background:none;text-align:left;color:#17342d;padding:4px 0;min-height:44px}
.vnDayOpen b{display:block;font:800 15px/1.2 Inter,sans-serif}
.vnDayOpen small{display:block;margin-top:3px;color:#7c817e;font:700 10px Inter,sans-serif;letter-spacing:.04em;text-transform:uppercase}
.vnDayLater,.vnDayKeep{border:0;border-radius:999px;padding:8px 12px;font:800 11px Inter,sans-serif;min-height:40px}
.vnDayLater{background:#f2ddc7;color:#7a3b1d}
.vnDayKeep{background:#155241;color:#fff}
.vnDayEmpty,.vnDayMore,.vnDaysFoot{color:#7c817e;font-size:13px}
.vnDaysFoot{margin:8px 2px 0}
`;
if(!document.getElementById('vnDaysStyle')){
  const st=document.createElement('style');st.id='vnDaysStyle';st.textContent=css;document.head.appendChild(st);
}

function inject(){
  const x=typeof vnStop==='function'?vnStop():null;
  if(!x||!inCluster(x.d.name))return;
  const tiles=document.querySelector('.cityTiles25');
  if(!tiles||document.getElementById('c25Days'))return;
  const days=destState(x.d.name).days;
  const b=document.createElement('button');
  b.className='cityTile25';
  b.id='c25Days';
  b.innerHTML=`<span class="ico">📅</span><b>These days</b><strong>${days}</strong>`;
  tiles.insertBefore(b,tiles.firstChild);
  b.onclick=()=>vnDuration();
}

async function boot(){
  try{if(window.VN_LIVE_READY)await window.VN_LIVE_READY}catch(e){}
  const prev=window.vnHub;
  window.vnHub=async function(){
    if(typeof prev==='function')await prev.apply(this,arguments);
    inject();
  };
}
boot();
window.VN_DURATION_MEKONG={version:'2026-09-13-v1',inCluster,pack};
})();
