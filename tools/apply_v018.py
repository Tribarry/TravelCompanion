from pathlib import Path

p=Path('index.html')
s=p.read_text(encoding='utf-8')
marker='document.querySelectorAll("nav button").forEach'
if '/* V0.18 destination hub + image relevance */' in s:
    print('V0.18 already applied')
    raise SystemExit(0)

css=r'''
/* V0.18 destination hub + image relevance */
.hubSections{background:#f6f1e7;color:var(--ink);padding:18px 14px 110px}.hubSections h2{font:800 27px/1.05 "Manrope",sans-serif;margin:24px 0 8px}.hubSections p{color:var(--muted)}
.hubProgress{background:var(--card);border:1px solid var(--line);border-radius:17px;padding:15px}.hubProgressTop{display:flex;justify-content:space-between;gap:12px;font-weight:800}.hubProgress .progress{margin-top:10px}
.hubMiss{display:flex;gap:9px;overflow-x:auto;scroll-snap-type:x mandatory;padding:2px 0 8px}.hubMissCard{position:relative;flex:0 0 72%;min-height:190px;border:0;border-radius:17px;overflow:hidden;background:#173d34 center/cover no-repeat;color:#fff;text-align:left;scroll-snap-align:start}.hubMissCard:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,#062a24f2,#062a2410 72%)}.hubMissCard span{position:absolute;z-index:2;left:13px;right:12px;bottom:12px}.hubMissCard b{display:block;font-size:18px;margin-bottom:4px}.hubMissCard small{opacity:.9}
.hubJourney{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}.hubJourney button{border:1px solid var(--line);background:var(--card);border-radius:14px;padding:13px 7px;font-weight:800;min-height:76px}.hubNext{position:relative;overflow:hidden;min-height:190px;border:0;border-radius:18px;background:#173d34 center/cover no-repeat;color:#fff;text-align:left;width:100%;padding:0}.hubNext:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,#062a24f4,#062a2412 72%)}.hubNext span{position:absolute;z-index:2;left:15px;right:15px;bottom:14px}.hubNext b{display:block;font-size:22px}.hubNext small{display:block;margin-top:5px;line-height:1.35}.imageFallback{background:#173d34!important;position:relative}.imageFallback:before{content:attr(data-image-label);position:absolute;inset:0;display:grid;place-items:center;padding:16px;text-align:center;color:#fff;font:800 15px/1.2 "Manrope",sans-serif;background:linear-gradient(135deg,#173d34,#315d52)}
.resultPhoto.imageFallback:before{font-size:11px}.discoveryCard.imageFallback .dc,.hubMissCard.imageFallback span{z-index:3}.imageFallback.loaded:before{display:none}
'''
s=s.replace('</style>',css+'\n</style>',1)

js=r'''
/* V0.18: destination-first navigation and contextual imagery */
DATA.version="0.18";
const HCMC_IMAGE_QUERIES={
0:"Nguyen Hue Flower Street Ho Chi Minh City Tet",1:"Binh Tay Market Cho Lon",2:"War Remnants Museum",3:"Independence Palace Ho Chi Minh City",4:"Ho Thi Ky flower market",5:"Ho Chi Minh City street food motorbike",6:"Saigon Waterbus",7:"42 Nguyen Hue",8:"Saigon Ranger bunker",9:"District 4 Ho Chi Minh City street food",10:"Thanh Da peninsula Ho Chi Minh City",11:"Vietnamese phin coffee",12:"Vietnamese lion dance",13:"Vietnamese fish sauce",14:"Ho Chi Minh City heritage architecture",15:"Ho Chi Minh City contemporary art",16:"Ho Chi Minh City fashion",17:"Phu Chau floating temple",18:"FITO Museum Ho Chi Minh City",19:"Vietnam karaoke",20:"Com tam",21:"Bun rieu",22:"Cua rang me",23:"Jade Emperor Pagoda Ho Chi Minh City",24:"Nghia An Hoi Quan",25:"Saigon Central Post Office",26:"Cu Chi tunnels",27:"Mekong Delta Vietnam",28:"Saigon Opera House",29:"Ho Chi Minh City skyline night"};
const hcmImageCache={};
async function specificHcmImage(id){
 if(hcmImageCache[id]!==undefined)return hcmImageCache[id];
 const q=HCMC_IMAGE_QUERIES[id]||HCMC30.find(x=>x.id===id)?.title||"";
 try{
  const u='https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch='+encodeURIComponent(q)+'&gsrlimit=1&prop=pageimages&piprop=original|thumbnail&pithumbsize=900&format=json&origin=*';
  const r=await fetch(u); if(!r.ok)throw 0; const j=await r.json(); const pg=Object.values(j.query?.pages||{})[0];
  const img=pg?.original?.source||pg?.thumbnail?.source||''; hcmImageCache[id]=img; return img;
 }catch(e){hcmImageCache[id]='';return ''}
}
function hydrateHcmImages(){document.querySelectorAll('[data-hcm-image]').forEach(async el=>{const id=+el.dataset.hcmImage;const u=await specificHcmImage(id);if(u){el.style.backgroundImage=`url("${u}")`;el.classList.add('loaded');el.classList.remove('imageFallback')}})}
function v16Discovery(x){return `<div class="discoveryCard imageFallback" data-hcm-image="${x.id}" data-image-label="${x.title}"><button class="saveHeart" data-save="${x.id}">${isHcmSaved(x.id)?"♥":"♡"}</button><div class="dc"><b>${x.title}</b><small>${x.time} · ${x.cost} · ${x.tags.slice(0,2).join(" · ")}</small></div></div>`}
function v16Result(x){return `<div class="resultCard"><div class="resultPhoto imageFallback" data-hcm-image="${x.id}" data-image-label="${x.title}"></div><div class="resultInfo"><div class="resultTags">${x.tags.slice(0,4).map(t=>`<span>${t}</span>`).join("")}</div><h3>${x.title}</h3><p>${x.summary}</p><div class="resultActions"><button data-save="${x.id}" class="${isHcmSaved(x.id)?"saved":""}">${isHcmSaved(x.id)?"♥ Saved":"♡ Save"}</button><button data-open="${x.id}">View →</button></div></div></div>`}
const _hcmExperiencesV18=hcmExperiencesV15;
hcmExperiencesV15=function(filter="All"){
 _hcmExperiencesV18(filter); hydrateHcmImages();
};
function hcmOverviewV15(){
 nav.hidden=true;nav.style.display="none";
 const completed=HCMC30.filter(x=>state.done['hcm30-'+x.id]||state.done['hcm-detail-'+x.id]).length;
 const saved=HCMC30.filter(x=>isHcmSaved(x.id)).length;
 const pct=Math.round(completed/HCMC30.length*100);
 const miss=HCMC30.filter(x=>!state.done['hcm30-'+x.id]&&!state.done['hcm-detail-'+x.id]&&(x.tags.includes('Must Do')||x.kind==='must')).slice(0,3);
 app.innerHTML=`<div class="hcm3"><section class="hcmHeroPage" style="background-image:url('${HCMC_V15_IMAGES.hero}')">
 <div class="heroTop"><button class="circleBtn" id="v15Back">‹</button><div class="heroCountry">Vietnam</div><button class="heartBtn">♡</button></div>
 <div class="heroBottom"><div class="eyebrow">CURRENT POSITION</div><h1>Ho Chi<br>Minh City</h1><p>Energy, food, history and endless things to explore.</p>
 <div class="heroFacts"><div class="heroFact"><i>◉</i><div><b>30</b>Experiences</div></div><div class="heroFact"><i>▣</i><div><b>5–7</b>Days</div></div><div class="heroFact"><i>★</i><div><b>My Style</b>Food · Culture<br>Daily Life</div></div></div>
 <button class="heroExplore" id="v15Explore">Explore Experiences →</button>
 <div class="heroQuick"><button data-filtergo="Must Do"><strong>★</strong>Must Do</button><button id="foodHub"><strong>♨</strong>Food & Drink</button><button data-filtergo="Day Trip"><strong>▰</strong>Day Trips</button><button data-filtergo="Unique"><strong>◇</strong>Hidden Gems</button></div></div></section>
 <section class="hubSections"><h2>Trip Progress</h2><div class="hubProgress"><div class="hubProgressTop"><span>${completed} / ${HCMC30.length} experiences completed</span><span>${pct}%</span></div><div class="progress"><i style="width:${pct}%"></i></div></div>
 <h2>Don't Miss</h2><p>Highest-priority experiences still waiting for you.</p><div class="hubMiss">${miss.map(x=>`<button class="hubMissCard imageFallback" data-hcm-image="${x.id}" data-image-label="${x.title}" data-missopen="${x.id}"><span><b>${x.title}</b><small>${x.summary}</small></span></button>`).join('')}</div>
 <h2>My Journey</h2><div class="hubJourney"><button id="hubSaved">♡<br>${saved} Saved</button><button id="hubCompleted">✓<br>${completed} Done</button><button id="hubPassport">⌘<br>Food Passport</button></div>
 <h2>Go Next</h2><button class="hubNext" id="hubNext"><span><small>NEXT DESTINATION</small><b>Cái Bè / Tân Phong →</b><small>About 2–3 hours from Saigon by road. Slow down for island cycling, canals and a family homestay.</small></span></button></section>${hcmBottom("overview")}</div>`;
 document.getElementById('v15Back').onclick=()=>destinationSelector('vietnam');document.getElementById('v15Explore').onclick=()=>hcmExperiencesV15('All');document.getElementById('foodHub').onclick=foodDrinkHubV17;document.getElementById('hubSaved').onclick=hcmMyListV16;document.getElementById('hubPassport').onclick=foodDrinkHubV17;document.getElementById('hubCompleted').onclick=()=>hcmExperiencesV15('All');document.getElementById('hubNext').onclick=goNext;
 document.querySelectorAll('[data-filtergo]').forEach(b=>b.onclick=()=>hcmExperiencesV15(b.dataset.filtergo));document.querySelectorAll('[data-missopen]').forEach(b=>b.onclick=()=>hcmDetail(Math.min(+b.dataset.missopen,6)));wireV15();hydrateHcmImages();
}
function home(){
 nav.hidden=false;nav.style.display="grid";const x=cur();
 if(x&&x.c.id==='vietnam'&&/ho chi minh|hcmc|sai gon|saigon/i.test(x.d.name||'')){hcmOverviewV15();return}
 const ex=allExp(),done=ex.filter(r=>state.done[r.id]).length,n=nextDest(),pct=Math.round(done/ex.length*100),place=x?(x.c.name+' / '+x.d.name):'Melbourne / pre-departure',remain=x?x.d.experiences.filter((e,j)=>!state.done[x.id+'-'+j]&&!state.skip[x.id+'-'+j]).length+' experiences remain here.':'Your experience-first master journey is loaded.';
 app.innerHTML=head('YOU ARE HERE','backToCountry')+`<section class="hero"><div class="kicker">CURRENT POSITION</div><h1>${place}</h1><p>${remain}</p></section><div class="grid"><button class="action" id="aDo"><b>ENTER / VISIT</b><small>Experiences at this destination</small></button><button class="action" id="aNext"><b>GO NEXT</b><small>${n?n.d.name:'Complete'}</small></button><button class="action" id="aMiss"><b>DON'T MISS</b><small>S+ and S experiences</small></button><button class="action" id="aJourney"><b>MY JOURNEY</b><small>${done} / ${ex.length} experiences complete</small></button></div><h3>Progress</h3><div class="card"><b>${pct}% complete</b><div class="progress" style="margin-top:10px"><i style="width:${pct}%"></i></div></div><button class="btn wide" id="loc">Change current location</button>`;
 aDo.onclick=doHere;aNext.onclick=goNext;aMiss.onclick=dontMiss;aJourney.onclick=journey;loc.onclick=setLocation;
}
'''
s=s.replace(marker,js+'\n'+marker,1)
p.write_text(s,encoding='utf-8')
print('Applied V0.18')
