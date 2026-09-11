from pathlib import Path
import re

idx=Path('index.html')
s=idx.read_text()
css='<link rel="stylesheet" href="data/rater-cinematic-v2.css?v=20260911-cinematic-v2">'
if css not in s:
    assert '</head>' in s, 'head close not found'
    s=s.replace('</head>',css+'\n</head>',1)
js='<script src="data/hcm-rater-content-v2.js?v=20260911-cinematic-v2"></script>'
if js not in s:
    marker='<script src="data/experience-copy-v2.js?v=20260911-vietnam-v3"></script>'
    assert marker in s, 'experience-copy tag not found'
    s=s.replace(marker,marker+'\n'+js,1)
idx.write_text(s)

p=Path('data/travel-companion-v1-shell.js')
s=p.read_text()
new=r'''function ratingFacts(it){
 const r=it?.raw||{};
 const facts=[['TIME','◷',it?.time||r.time||r.duration||'Flexible'],['INDICATIVE COST','◉',it?.cost||r.cost||'Check locally'],['BOOKING','▣',it?.booking||r.booking||'Usually flexible']];
 return `<div class="tc1RateFacts">${facts.map(([a,icon,b])=>`<div><span class="tc1RateFactIcon">${icon}</span><small>${a}</small><b>${esc(b)}</b></div>`).join('')}</div>`;
}
async function renderRatingDeck(id,i,pos=0){
 await readyCountry(id);const c=country(id),d=destinations(id)[i],its=getItems(id,i);if(!d||!its.length)return renderDestination(id,i,'experiences');V.last='rater';
 const counts={must:0,keen:0,maybe:0,pass:0,unrated:0};its.forEach((x,n)=>{const r=personalRating(id,i,x,x.index??n);if(r&&counts[r]!==undefined)counts[r]++;else counts.unrated++});
 if(pos>=its.length){
  setApp(`<section class="tc1Screen tc1RaterScreen">${topButtons(`data-back-rater="${id}:${i}"`)}<div class="tc1RaterSummary"><div class="tc1Scope">${esc(d.name)} · priorities</div><h1>Ratings complete.</h1><p>Your choices now drive the experience spotlights and proposed schedule. Nothing was deleted or marked Done/Skipped.</p><div class="tc1RatingSummaryGrid"><div><b>${counts.must}</b><small>CAN'T MISS</small></div><div><b>${counts.keen}</b><small>KEEN</small></div><div><b>${counts.maybe}</b><small>MAYBE</small></div><div><b>${counts.pass}</b><small>PASS</small></div></div><button class="tc1RatePrimary" data-rate-review>REVIEW AGAIN</button><button class="tc1RateSecondary" data-rate-back>BACK TO ${esc(d.name.toUpperCase())}</button></div>${drawer()}</section>`);
  document.querySelector('[data-back-rater]').onclick=()=>renderDestination(id,i,'overview');document.querySelector('[data-rate-review]').onclick=()=>renderRatingDeck(id,i,0);document.querySelector('[data-rate-back]').onclick=()=>renderDestination(id,i,'overview');return;
 }
 pos=Math.max(0,Math.min(pos,its.length-1));const it=its[pos],j=it.index??pos,r=personalRating(id,i,it,j),rated=its.length-counts.unrated;
 const directPhoto=typeof window.TC1RaterPhoto==='function'?window.TC1RaterPhoto(id,d,it):'';
 const showPhoto=!!directPhoto||!!window.TC1_EXPERIENCE_PHOTO_COMPLETE?.[id];
 const photo=showPhoto?`<div class="tc1RatePhoto ${id==='vietnam'?'vnFallback':''}" ${directPhoto?`style="background-image:url('${esc(directPhoto)}')"`:''} ${id==='vietnam'?`data-vnimg="${esc(it.title)}" data-label="${esc(it.title)}"`:''}></div>`:'';
 const area=it.area||d.name;
 setApp(`<section class="tc1Screen tc1RaterScreen">${topButtons(`data-back-rater="${id}:${i}"`)}<div class="tc1RaterHead"><div><div class="tc1Scope">RATE · ${esc(d.name)}</div><h1>How does this sound?</h1></div><small>${rated}/${its.length} rated</small></div><div class="tc1RateProgress"><i style="width:${Math.round((rated/its.length)*100)}%"></i></div><div class="tc1RateStage"><article class="tc1RateCard" data-rate-card>${photo}<div class="tc1RateCopy"><div class="tc1RateMeta"><div class="tc1Tags">${(it.tags||[]).slice(0,3).map(t=>`<i>${esc(t)}</i>`).join('')}</div><div class="tc1RateArea"><b>●</b>${esc(area)}</div></div><h2>${esc(it.title)}</h2><p>${esc(it.summary||'Open the full experience later for practical details.')}</p>${it.action?`<div class="tc1RateAction"><small>WHAT YOU'LL ACTUALLY DO</small><p>${esc(it.action)}</p></div>`:''}${ratingFacts(it)}${r?`<div class="tc1CurrentRating ${r}">${RATING_LABELS[r]}</div>`:'<div class="tc1CurrentRating unrated">Not rated yet</div>'}</div></article></div><div class="tc1RatingButtons"><button data-rate-value="must" class="${r==='must'?'on':''}"><b>🔥</b><span>CAN'T MISS</span></button><button data-rate-value="keen" class="${r==='keen'?'on':''}"><b>👍</b><span>KEEN</span></button><button data-rate-value="maybe" class="${r==='maybe'?'on':''}"><b>🤔</b><span>MAYBE</span></button><button data-rate-value="pass" class="${r==='pass'?'on':''}"><b>×</b><span>PASS</span></button></div><div class="tc1RateNav"><button data-rate-prev ${pos===0?'disabled':''}>← PREV</button><button data-rate-later>RATE LATER</button><button data-rate-next>NEXT →</button></div>${drawer()}</section>`);
 const back=document.querySelector('[data-back-rater]');if(back)back.onclick=()=>renderDestination(id,i,'overview');
 document.querySelectorAll('[data-rate-value]').forEach(b=>b.onclick=()=>{setPersonalRating(id,i,it,j,b.dataset.rateValue);renderRatingDeck(id,i,pos)});
 const prev=document.querySelector('[data-rate-prev]');if(prev)prev.onclick=()=>renderRatingDeck(id,i,Math.max(0,pos-1));
 const next=document.querySelector('[data-rate-next]');if(next)next.onclick=()=>renderRatingDeck(id,i,pos+1);
 const later=document.querySelector('[data-rate-later]');if(later)later.onclick=()=>renderRatingDeck(id,i,pos+1);
 const card=document.querySelector('[data-rate-card]');if(card){let x0=null;card.addEventListener('touchstart',e=>{x0=e.changedTouches?.[0]?.clientX??null},{passive:true});card.addEventListener('touchend',e=>{if(x0===null)return;const x1=e.changedTouches?.[0]?.clientX??x0,dx=x1-x0;x0=null;if(Math.abs(dx)<55)return;if(dx<0)renderRatingDeck(id,i,pos+1);else if(pos>0)renderRatingDeck(id,i,pos-1)},{passive:true})}
}
'''
pat=r'function ratingFacts\(it\)\{.*?\nasync function renderRatingDeck\(id,i,pos=0\)\{.*?\n\}\n(?=function countryEntries)'
s,n=re.subn(pat,new,s,flags=re.S)
assert n==1,f'rater replacement count {n}'
p.write_text(s)
