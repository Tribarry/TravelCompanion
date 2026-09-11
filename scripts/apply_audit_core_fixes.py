from pathlib import Path
import re

# Browser metadata / legacy visible title.
p=Path('index.html'); s=p.read_text(); s=s.replace('<title>Southeast Asia 2027 - Travel Companion</title>','<title>Asia 2027 - Travel Companion</title>',1); p.write_text(s)

p=Path('data/travel-companion-v1-shell.js'); s=p.read_text()

s=s.replace("const COUNTRY_DATES={vietnam:'28 JAN → APRIL 2027',laos:'APRIL → MAY 2027',cambodia:'AUGUST 2027 →',thailand:'JUNE → JULY 2027',kazakhstan:'JULY 2027',kyrgyzstan:'30 JUL → 12 AUG 2027'};",
"const COUNTRY_DATES={vietnam:'28 JAN → APRIL 2027',laos:'APRIL → MAY 2027',cambodia:'MAY → JUNE / FROM 14 AUG 2027',thailand:'JUNE → 21 JUL 2027',kazakhstan:'22 → 29 JUL 2027',kyrgyzstan:'30 JUL → 12 AUG 2027'};\nconst JOURNEY_ORDER=['vietnam','laos','thailand','kazakhstan','kyrgyzstan','cambodia'];",1)

# Stable current-location identity with legacy state.here compatibility.
old="function current(){if(!state.here||state.here==='pre')return null;const [id,n]=String(state.here).split(':');const i=Number(n);if(!country(id)||!destinations(id)[i])return null;return {id,i,c:country(id),d:destinations(id)[i]}}\nfunction isCurrent(id,i){const x=current();return !!x&&x.id===id&&x.i===Number(i)}"
new="""function destinationStableId(id,i){return slug(destinations(id)[i]?.name||'')}\nfunction current(){\n const loc=state.currentLocation;if(loc?.country&&loc?.destination){const id=loc.country,i=destinations(id).findIndex(d=>slug(d.name)===loc.destination);if(i>=0&&country(id))return {id,i,c:country(id),d:destinations(id)[i]}}\n if(!state.here||state.here==='pre')return null;const [id,n]=String(state.here).split(':');const i=Number(n);if(!country(id)||!destinations(id)[i])return null;state.currentLocation={country:id,destination:destinationStableId(id,i)};save();return {id,i,c:country(id),d:destinations(id)[i]}\n}\nfunction setCurrentLocation(id,i){const d=destinations(id)[i];if(!d)return;state.currentLocation={country:id,destination:slug(d.name)};state.here=id+':'+i;save()}\nfunction isCurrent(id,i){const x=current();return !!x&&x.id===id&&x.i===Number(i)}"""
assert old in s, 'current marker missing'; s=s.replace(old,new,1)

# Stable experience state keys added ahead of all legacy keys.
old="function allKeys(id,i,it,j){const a=[canonicalKey(id,i,it,j),id+'-'+i+'-'+j];if(id==='vietnam'&&i===0)a.push('hcm-'+j);return [...new Set(a)]}"
new="function stableExperienceKey(id,i,it){return 'exp:'+id+':'+slug(destinations(id)[i]?.name||String(i))+':'+slug(it?.id||it?.title||'experience')}\nfunction allKeys(id,i,it,j){const a=[stableExperienceKey(id,i,it),canonicalKey(id,i,it,j),id+'-'+i+'-'+j];if(id==='vietnam'&&i===0)a.push('hcm-'+j);return [...new Set(a)]}"
assert old in s, 'allKeys marker missing'; s=s.replace(old,new,1)

# Main page and Journey use chronological country order rather than DATA storage order.
s=s.replace("<h1>Asia<br>2027.</h1><p>Vietnam → Laos → Cambodia → Thailand → Kazakhstan → Kyrgyzstan.</p>","<h1>Asia<br>2027.</h1><p>Vietnam → Laos → Thailand → Kazakhstan → Kyrgyzstan → Cambodia.</p>",1)
s=s.replace("${DATA.countries.map((c,n)=>{const cc=countryCounts(c.id);return `<button class=\"tc1CountryCard\"", "${JOURNEY_ORDER.map((cid,n)=>{const c=country(cid),cc=countryCounts(c.id);return `<button class=\"tc1CountryCard\"",1)
s=s.replace("${DATA.countries.map(c=>`<article class=\"tc1GlobalCard\">", "${JOURNEY_ORDER.map(cid=>{const c=country(cid);return `<article class=\"tc1GlobalCard\">",1)
# Close the added Journey block-map function.
s=s.replace("${destinations(c.id).map((d,i)=>`${isCurrent(c.id,i)?'●':'○'} ${d.name}`).join(' · ')}</p></article>`).join('')}</div>${drawer()}</section>`);", "${destinations(c.id).map((d,i)=>`${isCurrent(c.id,i)?'●':'○'} ${d.name}`).join(' · ')}</p></article>`}).join('')}</div>${drawer()}</section>`);",1)

# Browsing still cannot relocate the traveller; explicit action uses stable setter.
s=s.replace("const sh=document.querySelector('[data-set-here]');if(sh)sh.onclick=()=>{state.here=id+':'+i;save();renderDestination(id,i,tab,filter,passType)};","const sh=document.querySelector('[data-set-here]');if(sh)sh.onclick=()=>{setCurrentLocation(id,i);renderDestination(id,i,tab,filter,passType)};",1)

# Country route chapters for every country.
old="function groupedPlaces(id){const ds=destinations(id);const m=new Map();ds.forEach((d,i)=>{const r=id==='vietnam'?vietnamRegion(ds,i):'Your route';if(!m.has(r))m.set(r,[]);m.get(r).push({d,i})});return [...m.entries()]}"
new=r'''function countryRegion(id,name){const q=slug(name);if(id==='laos'){if(/huay-xai|luang-prabang|nong-khiaw|muang-ngoi|nam-et/.test(q))return'Northern Laos';if(/phonsavan|vang-vieng|vientiane/.test(q))return'Heritage & Central Corridor';if(/thakhek|savannakhet/.test(q))return'Central Laos';return'Southern Laos'}if(id==='cambodia'){if(/siem-reap|battambang/.test(q))return'Angkor & Northwest';if(/phnom-penh|cardamom/.test(q))return'Capital & Forest';return'South Coast & Islands'}if(id==='thailand'){if(/bangkok/.test(q))return'Bangkok';if(/chiang-mai|chiang-rai|pai/.test(q))return'Northern Thailand';if(/mae-hong-son/.test(q))return'Mae Hong Son Mountains';if(/southern-islands/.test(q))return'Southern Islands';return'Training Block'}if(id==='kazakhstan'){if(q==='almaty')return'Almaty';if(/charyn|altyn-emel/.test(q))return'Canyon & Desert';return'Alpine Lakes'}if(id==='kyrgyzstan'){if(/bishkek/.test(q))return'Bishkek';if(/tian-shan|song-kol/.test(q))return'Horse Trek & Jailoo';return'Issyk-Kul & Karakol'}return'Your route'}
function groupedPlaces(id){const ds=destinations(id);const m=new Map();ds.forEach((d,i)=>{const r=id==='vietnam'?vietnamRegion(ds,i):countryRegion(id,d.name);if(!m.has(r))m.set(r,[]);m.get(r).push({d,i})});return [...m.entries()]}
'''
assert old in s, 'groupedPlaces marker missing'; s=s.replace(old,new,1)

# Book Ahead becomes an actual status workflow using stable experience identity.
book_helpers=r'''const BOOK_STATES=['Not started','Enquired','Booked','Paid','Confirmed'];
function bookStatus(x){const k=stableExperienceKey(x.country,x.i,x.it);return state.bookStatus?.[k]||'Not started'}
function cycleBookStatus(x){state.bookStatus=state.bookStatus||{};const k=stableExperienceKey(x.country,x.i,x.it),now=bookStatus(x),n=(BOOK_STATES.indexOf(now)+1)%BOOK_STATES.length;state.bookStatus[k]=BOOK_STATES[n];save()}
function bookCard(x){const st=bookStatus(x);return `<article class="tc1GlobalCard"><small>${FLAGS2[x.country]||''} ${esc(x.c.name)} · ${esc(x.d.name)}</small><h3>${esc(x.it.title)}</h3><p>${esc(x.it.summary||'')}</p><button class="tc1BookStatus" data-book-key="${esc(stableExperienceKey(x.country,x.i,x.it))}"><small>STATUS</small><b>${esc(st)} →</b></button></article>`}
'''
marker="function isBookAhead(it){const s=[...(it.flags||[]),it.raw?.booking||''].join(' ');return /BOOK AHEAD|advance booking|seasonal booking|fixed|pass\\/guide|vet operator|book weather|plan transport|verify border/i.test(s)}\n"
assert marker in s, 'book marker missing'; s=s.replace(marker,marker+book_helpers,1)
new_book=r'''async function renderBookAhead(){await readyCountry('vietnam');const a=allEntries().filter(x=>x.book&&!x.done&&!x.skip);setApp(`<section class="tc1Screen"><div class="tc1GlobalHead"><button class="tc1Round" data-global-back>←</button><div class="tc1Scope" style="color:#fff;margin-top:18px">Lead-time workflow</div><h1>Book Ahead</h1><p>Track each booking from first enquiry through confirmation.</p></div><div class="tc1GlobalList">${a.length?a.map(bookCard).join(''):'<div class="tc1Empty" style="margin:0">No outstanding Book Ahead items in the current content bank.</div>'}</div>${drawer()}</section>`);document.querySelector('[data-global-back]').onclick=restoreContext;document.querySelectorAll('[data-book-key]').forEach(b=>b.onclick=()=>{const x=a.find(v=>stableExperienceKey(v.country,v.i,v.it)===b.dataset.bookKey);if(x){cycleBookStatus(x);renderBookAhead()}});}
'''
s,n=re.subn(r'async function renderBookAhead\(\)\{.*?\nasync function renderJourney',new_book+'async function renderJourney',s,flags=re.S); assert n==1, f'book replace {n}'

p.write_text(s)

# Improve dark-theme functional contrast; green/black progress states were too subtle.
p=Path('data/travel-companion-v1-shell.css'); css=p.read_text(); marker='/* Core audit contrast repair */'
if marker not in css:
    css += '''\n\n/* Core audit contrast repair */\n.tc1Bar i,.tc1RateProgress i{background:var(--tc-orange)!important}.tc1Tab.on,.tc1Actions button.on,.tc1PassSwitcher button.on,.tc1PassBtns button.on{background:#d66a45!important;border-color:#d66a45!important;color:#fff!important}.tc1BookStatus{margin-top:10px;width:100%;border:1px solid #414147;background:#171719;color:#f4f2ee;border-radius:12px;padding:10px 12px;text-align:left}.tc1BookStatus small{display:block;color:#96969e;font-size:7px;letter-spacing:.1em}.tc1BookStatus b{display:block;margin-top:3px;font-size:11px}\n'''
p.write_text(css)

Path('docs/CORE_AUDIT_FIXES.md').write_text('''# Core Audit Fixes\n\n- Browser title corrected to **Asia 2027**.\n- Main Journey and global Journey now use chronological country order: Vietnam → Laos → Thailand → Kazakhstan → Kyrgyzstan → Cambodia.\n- Country date labels reflect the June/July training and Central Asia sequence, with Cambodia resuming from 14 August.\n- Current location gains a stable destination slug while preserving legacy `state.here` compatibility.\n- Experience Saved/Done/Skip/ratings now write a stable destination + experience key while still reading/writing legacy keys for migration safety.\n- All countries now have meaningful route chapters instead of one generic `Your route` bucket.\n- Book Ahead now has persistent Not started → Enquired → Booked → Paid → Confirmed states.\n- Experience qualitative costs are normalised to labelled AUD estimates where possible.\n- Dark-theme active/progress states have stronger terracotta contrast.\n''')
