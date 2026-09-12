/* ADHD Focus Mode v1 — 2026-09-12
 * One-tap "Today / Focus" view: shows only 1–3 priority items for the current place.
 * Designed for low cognitive load, immediate dopamine, and zero decision paralysis.
 * Hooks into the existing Travel Companion V1 shell without rewriting core navigation.
 */
(()=>{
'use strict';
if(window.__ADHD_FOCUS_MODE_V1__)return;window.__ADHD_FOCUS_MODE_V1__=true;

const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');

function getCurrent(){
  try{
    if(typeof current==='function')return current();
  }catch(e){}
  return null;
}

function getItemsSafe(id,i){
  try{
    if(typeof getItems==='function')return getItems(id,i)||[];
  }catch(e){}
  return [];
}

function isDoneSafe(id,i,it,j){
  try{
    if(typeof hasState==='function')return hasState('done',id,i,it,j);
  }catch(e){}
  return false;
}

function ratingSafe(id,i,it,j){
  try{
    if(typeof personalRating==='function')return personalRating(id,i,it,j)||'';
  }catch(e){}
  return '';
}

function priorityScore(it,id,i,j){
  const r=ratingSafe(id,i,it,j);
  if(r==='must')return 100;
  if(r==='keen')return 80;
  if((it.tags||[]).some(t=>/must do|must-do/i.test(t))||it.tier==='S+'||it.tier==='S')return 70;
  if((it.tags||[]).some(t=>/food|drink|coffee/i.test(t)))return 40;
  return 20;
}

function pickFocusItems(id,i){
  const items=getItemsSafe(id,i).map((it,j)=>({it,j,score:priorityScore(it,id,i,j),done:isDoneSafe(id,i,it,j)}));
  const open=items.filter(x=>!x.done).sort((a,b)=>b.score-a.score);
  return open.slice(0,3);
}

function renderFocus(){
  const cur=getCurrent();
  const app=document.querySelector('#app');
  if(!app)return;

  if(!cur){
    app.innerHTML=`
      <section class="tc1Screen adhdFocus">
        <div class="tc1Top">
          <button class="tc1Round" data-focus-back>←</button>
          <button class="tc1Round" data-drawer-open>☰</button>
        </div>
        <div class="adhdFocusEmpty">
          <div class="adhdFocusKicker">FOCUS MODE</div>
          <h1>No place set yet</h1>
          <p>Tap “I’m here now” on any destination first. Then Focus will show only the 1–3 things that matter most right now.</p>
          <button class="tc1Primary" data-focus-main>Back to journey</button>
        </div>
      </section>`;
    wireFocus();
    return;
  }

  const {id,i,c,d}=cur;
  const picks=pickFocusItems(id,i);
  const doneCount=getItemsSafe(id,i).filter((it,j)=>isDoneSafe(id,i,it,j)).length;
  const total=getItemsSafe(id,i).length||1;
  const pct=Math.round(doneCount/total*100);

  const cards=picks.length?picks.map(({it,j,score},idx)=>`
    <article class="adhdFocusCard" data-focus-item="${j}">
      <div class="adhdFocusRank">${idx+1}</div>
      <div class="adhdFocusCardBody">
        <div class="adhdFocusTags">${(it.tags||[]).slice(0,2).map(t=>`<span>${esc(t)}</span>`).join('')}</div>
        <h3>${esc(it.title||'Experience')}</h3>
        <p>${esc((it.summary||'').slice(0,140))}${(it.summary||'').length>140?'…':''}</p>
        <div class="adhdFocusActions">
          <button class="adhdFocusDone" data-focus-done="${j}">✓ Mark done</button>
          <button class="adhdFocusOpen" data-focus-open="${j}">Open →</button>
        </div>
      </div>
    </article>`).join(''):`
    <div class="adhdFocusAllDone">
      <div class="adhdFocusKicker">NICE</div>
      <h2>Everything priority is done here</h2>
      <p>You cleared the must-dos for ${esc(d.name)}. Open the full list or move to the next place when you’re ready.</p>
      <button class="tc1Primary" data-focus-open-dest>See all experiences</button>
    </div>`;

  app.innerHTML=`
    <section class="tc1Screen adhdFocus">
      <div class="adhdFocusHero">
        <div class="tc1Top">
          <button class="tc1Round" data-focus-back>←</button>
          <button class="tc1Round" data-drawer-open>☰</button>
        </div>
        <div class="adhdFocusHeroCopy">
          <div class="adhdFocusKicker">FOCUS · RIGHT NOW</div>
          <h1>${esc(d.name)}</h1>
          <p>${esc(c.name)} · ${doneCount}/${total} done · ${pct}%</p>
          <div class="adhdFocusBar"><i style="width:${pct}%"></i></div>
        </div>
      </div>
      <div class="adhdFocusBody">
        <div class="adhdFocusLead">${picks.length?`Do these ${picks.length} first`:'You’re clear here'}</div>
        ${cards}
        <button class="adhdFocusSpark" data-focus-spark>✨ Spark me something beautiful</button>
      </div>
    </section>`;
  wireFocus();
}

function wireFocus(){
  document.querySelectorAll('[data-focus-back]').forEach(b=>b.onclick=()=>{
    try{if(typeof renderMain==='function')renderMain();else location.reload();}catch(e){location.reload();}
  });
  document.querySelectorAll('[data-focus-main]').forEach(b=>b.onclick=()=>{
    try{if(typeof renderMain==='function')renderMain();}catch(e){}
  });
  document.querySelectorAll('[data-focus-open-dest]').forEach(b=>b.onclick=()=>{
    const cur=getCurrent();
    if(cur&&typeof renderDestination==='function')renderDestination(cur.id,cur.i,'experiences');
  });
  document.querySelectorAll('[data-focus-done]').forEach(b=>b.onclick=()=>{
    const j=Number(b.dataset.focusDone);
    const cur=getCurrent();
    if(!cur)return;
    const items=getItemsSafe(cur.id,cur.i);
    const it=items[j];
    if(!it)return;
    try{
      if(typeof toggleDone==='function')toggleDone(cur.id,cur.i,it,j);
      b.textContent='✓ Done!';
      b.style.background='#10372f';
      b.style.color='#fff';
      setTimeout(()=>renderFocus(),450);
    }catch(e){console.warn(e);}
  });
  document.querySelectorAll('[data-focus-open]').forEach(b=>b.onclick=()=>{
    const j=Number(b.dataset.focusOpen);
    const cur=getCurrent();
    if(cur&&typeof renderDestination==='function')renderDestination(cur.id,cur.i,'experiences');
  });
  document.querySelectorAll('[data-focus-spark]').forEach(b=>b.onclick=()=>{
    const cur=getCurrent();
    if(!cur)return;
    const items=getItemsSafe(cur.id,cur.i).filter((it,j)=>!isDoneSafe(cur.id,cur.i,it,j));
    if(!items.length){alert('Nothing left to spark here — you finished the list!');return;}
    const pick=items[Math.floor(Math.random()*items.length)];
    alert(`✨ ${pick.title}\n\n${(pick.summary||'').slice(0,180)}`);
  });
  try{if(typeof wireCommon==='function')wireCommon();}catch(e){}
}

function injectFocusButton(){
  if(document.getElementById('adhdFocusFab'))return;
  const fab=document.createElement('button');
  fab.id='adhdFocusFab';
  fab.className='adhdFocusFab';
  fab.innerHTML='◉ Focus';
  fab.title='Focus Mode — only what matters right now';
  fab.onclick=()=>renderFocus();
  document.body.appendChild(fab);
}

function injectStyles(){
  if(document.getElementById('adhdFocusStyles'))return;
  const s=document.createElement('style');
  s.id='adhdFocusStyles';
  s.textContent=`
  .adhdFocusFab{position:fixed;right:16px;bottom:calc(24px + env(safe-area-inset-bottom));z-index:40;
    border:0;border-radius:999px;padding:14px 18px;font-weight:800;font-size:14px;
    background:#10372f;color:#fff;box-shadow:0 8px 28px #0005;letter-spacing:.02em}
  .adhdFocusFab:active{transform:scale(.97)}
  .adhdFocus{background:#0a1f1c;color:#f7f1e7;min-height:100vh;padding-bottom:100px}
  .adhdFocusHero{background:linear-gradient(180deg,#0f2f2a,#0a1f1c);padding:0 0 20px}
  .adhdFocusHeroCopy{padding:8px 18px 0}
  .adhdFocusKicker{font-size:11px;letter-spacing:.16em;text-transform:uppercase;opacity:.7;font-weight:800}
  .adhdFocusHero h1{font:800 34px/1.05 Manrope,Inter,sans-serif;margin:8px 0 6px}
  .adhdFocusHero p{opacity:.8;margin:0 0 12px;font-size:14px}
  .adhdFocusBar{height:8px;background:#1e3a35;border-radius:99px;overflow:hidden}
  .adhdFocusBar i{display:block;height:100%;background:#efd39c;border-radius:99px}
  .adhdFocusBody{padding:8px 16px 40px}
  .adhdFocusLead{font-size:13px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;opacity:.65;margin:12px 0 14px}
  .adhdFocusCard{display:grid;grid-template-columns:42px 1fr;gap:12px;background:#122926;border:1px solid #2a4a43;
    border-radius:18px;padding:14px;margin:0 0 12px}
  .adhdFocusRank{width:36px;height:36px;border-radius:50%;background:#efd39c;color:#0a1f1c;
    display:grid;place-items:center;font-weight:900;font-size:16px}
  .adhdFocusTags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px}
  .adhdFocusTags span{font-size:10px;font-weight:800;background:#1e3a35;padding:3px 7px;border-radius:999px}
  .adhdFocusCard h3{margin:0 0 6px;font:700 18px/1.2 Manrope,Inter,sans-serif}
  .adhdFocusCard p{margin:0 0 12px;font-size:14px;opacity:.85;line-height:1.4}
  .adhdFocusActions{display:flex;gap:8px}
  .adhdFocusDone,.adhdFocusOpen{border:0;border-radius:12px;padding:10px 14px;font-weight:800;font-size:13px}
  .adhdFocusDone{background:#efd39c;color:#0a1f1c}
  .adhdFocusOpen{background:#1e3a35;color:#fff}
  .adhdFocusSpark{width:100%;margin-top:18px;border:1px solid #2a4a43;background:#122926;color:#efd39c;
    border-radius:14px;padding:14px;font-weight:800}
  .adhdFocusEmpty,.adhdFocusAllDone{padding:40px 20px;text-align:center}
  .adhdFocusEmpty h1,.adhdFocusAllDone h2{font:800 28px/1.1 Manrope,Inter,sans-serif;margin:10px 0}
  .tc1Primary{border:0;background:#efd39c;color:#0a1f1c;border-radius:14px;padding:14px 18px;font-weight:900;margin-top:16px}
  `;
  document.head.appendChild(s);
}

function boot(){
  injectStyles();
  setTimeout(injectFocusButton,800);
  const obs=new MutationObserver(()=>{
    if(!document.getElementById('adhdFocusFab'))injectFocusButton();
  });
  obs.observe(document.documentElement,{childList:true,subtree:true});
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);
else boot();

window.ADHDFocus={render:renderFocus,version:'2026-09-12-v1'};
})();
