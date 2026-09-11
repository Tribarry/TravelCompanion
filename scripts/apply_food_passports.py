from pathlib import Path
import re

idx=Path('index.html')
s=idx.read_text()
shell_tag='<script src="data/travel-companion-v1-shell.js?v=20260911-content-finish"></script>'
food_tag='<script src="data/destination-food-passports-v1.js?v=20260911-food-passports"></script>'
if food_tag not in s:
    assert shell_tag in s, 'shell tag missing'
    s=s.replace(shell_tag,food_tag+'\n'+shell_tag,1)
s=s.replace('data/travel-companion-v1-shell.js?v=20260911-content-finish','data/travel-companion-v1-shell.js?v=20260911-food-passports')
s=s.replace('data/travel-companion-v1-shell.css?v=20260911-content-finish','data/travel-companion-v1-shell.css?v=20260911-food-passports')
idx.write_text(s)

p=Path('data/travel-companion-v1-shell.js')
s=p.read_text()

needle="function destinationFood(id,i){const its=getItems(id,i);return its.filter(x=>(x.tags||[]).some(t=>/food/i.test(t))||/food/i.test(x.raw?.type||''))}\nfunction destinationDrinks(id,i){const its=getItems(id,i);return its.filter(x=>(x.tags||[]).some(t=>/drink|coffee/i.test(t))||/drink|coffee/i.test(x.raw?.type||''))}\n"
insert=r'''function destinationFood(id,i){const its=getItems(id,i);return its.filter(x=>(x.tags||[]).some(t=>/food/i.test(t))||/food/i.test(x.raw?.type||''))}
function destinationDrinks(id,i){const its=getItems(id,i);return its.filter(x=>(x.tags||[]).some(t=>/drink|coffee/i.test(t))||/drink|coffee/i.test(x.raw?.type||''))}
function foodPassportItems(id,i){
 const d=destinations(id)[i];if(!d)return[];
 if(id==='vietnam'&&i===0&&typeof SAIGON_FOOD_PASSPORT!=='undefined')return SAIGON_FOOD_PASSPORT;
 try{return window.TC1FoodPassport?.get(id,d.name)||[]}catch(e){return[]}
}
function foodOccurrenceKey(id,i,it){const d=destinations(id)[i];return 'foodpass:'+id+':'+slug(d?.name||String(i))+':'+(it.dishId||it.id)}
function foodTryKey(id,i,it){const d=destinations(id)[i];return 'foodtry:'+id+':'+slug(d?.name||String(i))+':'+(it.dishId||it.id)}
function foodSaved(id,i,it){return !!state.saved?.[foodOccurrenceKey(id,i,it)]}
function foodTriedHere(id,i,it){return !!state.foodTried?.[foodTryKey(id,i,it)]}
function foodTriedAnywhere(it){const suffix=':'+(it.dishId||it.id);return Object.entries(state.foodTried||{}).some(([k,v])=>v&&k.endsWith(suffix))}
function foodSeenEarlier(id,i,it){for(let n=0;n<i;n++)if(foodPassportItems(id,n).some(x=>(x.dishId||x.id)===(it.dishId||it.id)))return true;return false}
function foodPassportStatus(id,i,it){if(foodTriedHere(id,i,it))return['TRIED HERE','tried'];if(foodTriedAnywhere(it))return['ALREADY TRIED','already'];if(foodSeenEarlier(id,i,it))return['STILL MISSING','missing'];return['NEW HERE','new']}
function toggleFoodSaved(id,i,it){state.saved=state.saved||{};const k=foodOccurrenceKey(id,i,it);state.saved[k]=!state.saved[k];save()}
function toggleFoodTried(id,i,it){state.foodTried=state.foodTried||{};const k=foodTryKey(id,i,it);state.foodTried[k]=!state.foodTried[k];save()}
function foodPassportCard(id,i,it){const st=foodPassportStatus(id,i,it),saved=foodSaved(id,i,it),tried=foodTriedHere(id,i,it);return `<article class="tc1Pass tc1FoodPass"><div class="tc1PassBody"><div class="tc1FoodStatus ${st[1]}">${st[0]}</div><div class="en">${esc(it.en||'Local / regional dish')}</div><h3>${esc(it.name)}</h3><p>${esc(it.desc)}</p><div class="tc1PassMeta">${esc(it.price)} · ${esc(it.when||'Any time')} · ESTIMATE</div><div class="tc1PassBtns"><button class="${saved?'on':''}" data-food-save="${esc(it.dishId||it.id)}">${saved?'♥ SAVED':'♡ SAVE'}</button><button class="${tried?'on':''}" data-food-tried="${esc(it.dishId||it.id)}">${tried?'✓ TRIED HERE':'I TRIED THIS'}</button></div></div></article>`}
function foodSavedEntries(countryId=null){const out=[];for(const c of DATA.countries){if(countryId&&c.id!==countryId)continue;destinations(c.id).forEach((d,i)=>{if(c.id==='vietnam'&&i===0)return;foodPassportItems(c.id,i).forEach(it=>{if(foodSaved(c.id,i,it))out.push({country:c.id,c,d,i,it})})})}return out}
function foodGlobalCard(x){return `<article class="tc1GlobalCard"><small>${FLAGS2[x.country]||''} ${esc(x.c.name)} · ${esc(x.d.name)} · FOOD PASSPORT</small><h3>${esc(x.it.name)}</h3><p>${esc(x.it.desc)} · ${esc(x.it.price)}</p></article>`}
'''
if 'function foodPassportItems(' not in s:
    assert needle in s, 'destination food marker missing'
    s=s.replace(needle,insert,1)

s=s.replace("foods=id==='vietnam'&&i===0&&typeof SAIGON_FOOD_PASSPORT!=='undefined'?SAIGON_FOOD_PASSPORT:destinationFood(id,i)","foods=foodPassportItems(id,i)",1)

# Country Saved includes passport items as well as experiences.
s=s.replace("const saved=countryEntries(id).filter(x=>x.saved);body=saved.length?`<div class=\"tc1GlobalList\">${saved.map(globalCard).join('')}</div>`:`<div class=\"tc1Empty\">Nothing saved in ${esc(c.name)} yet. Saving an experience or passport item will place it here without removing it from its destination.</div>`;",
            "const saved=countryEntries(id).filter(x=>x.saved),savedFood=foodSavedEntries(id);body=(saved.length||savedFood.length)?`<div class=\"tc1GlobalList\">${saved.map(globalCard).join('')}${savedFood.map(foodGlobalCard).join('')}</div>`:`<div class=\"tc1Empty\">Nothing saved in ${esc(c.name)} yet. Saving an experience or passport item will place it here without removing it from its destination.</div>`;",1)

new_passport=r'''function passportView(id,i,type){
 if(id==='vietnam'&&i===0&&typeof SAIGON_FOOD_PASSPORT!=='undefined'&&typeof SAIGON_DRINK_PASSPORT!=='undefined'){
  const arr=type==='drink'?SAIGON_DRINK_PASSPORT:SAIGON_FOOD_PASSPORT;const done=arr.filter(x=>typeof passTried==='function'&&passTried(type,x.id)).length;return `<div class="tc1PassHead"><h2>${type==='drink'?'Coffee & Drink':'Saigon Food'} Passport</h2><p>${done} / ${arr.length} tried · your original curated ${arr.length}-item collection is preserved.</p></div><div class="tc1PassSwitcher"><button class="${type==='food'?'on':''}" data-pass-type="food">FOOD · ${SAIGON_FOOD_PASSPORT.length}</button><button class="${type==='drink'?'on':''}" data-pass-type="drink">DRINKS · ${SAIGON_DRINK_PASSPORT.length}</button></div><div class="tc1PassGrid">${arr.map(x=>{const tried=typeof passTried==='function'&&passTried(type,x.id),saved=!!(state.saved&&state.saved['passport-'+type+'-'+x.id]);return `<article class="tc1Pass"><div class="tc1PassPhoto vnFallback" data-vnimg="${esc(x.name)}" data-label="${esc(x.name)}"></div><div class="tc1PassBody"><div class="en">${esc(x.en)}</div><h3>${esc(x.name)}</h3><p>${esc(x.desc)}</p><div class="tc1PassMeta">${esc(x.price)} · ${esc(x.when)}</div>${tried?'<div class="tc1Stamp">✓ TRIED IN SAIGON</div>':''}<div class="tc1PassBtns"><button class="${saved?'on':''}" data-pass-save="${esc(x.id)}">${saved?'♥ SAVED':'♡ SAVE'}</button><button class="${tried?'on':''}" data-pass-tried="${esc(x.id)}">${tried?'✓ TRIED':'I TRIED THIS'}</button></div></div></article>`}).join('')}</div>`;
 }
 const food=foodPassportItems(id,i),drink=destinationDrinks(id,i);
 if(type==='food')return `<div class="tc1PassHead"><h2>Food Passport</h2><p>${food.length} local or regional dishes selected for ${esc(destinations(id)[i]?.name||'this stop')}. Costs are planning estimates in AUD.</p></div><div class="tc1PassSwitcher"><button class="on" data-pass-type="food">FOOD · ${food.length}</button><button data-pass-type="drink">DRINKS · ${drink.length}</button></div><div class="tc1PassGrid tc1FoodPassGrid">${food.map(it=>foodPassportCard(id,i,it)).join('')}</div>`;
 const arr=drink;return `<div class="tc1PassHead"><h2>Drink Passport</h2><p>${arr.length?arr.length+' destination-specific drink or coffee experiences from the experience bank.':'No separate drink passport has been curated here yet. The food passport remains complete.'}</p></div><div class="tc1PassSwitcher"><button data-pass-type="food">FOOD · ${food.length}</button><button class="on" data-pass-type="drink">DRINKS · ${drink.length}</button></div>${arr.length?`<div class="tc1ExpList">${arr.map(it=>{const j=it.index;return `<article class="tc1Exp"><div class="tc1ExpCopy"><h3>${esc(it.title)}</h3><p>${esc(it.summary)}</p><div class="tc1Actions"><button class="${hasState('saved',id,i,it,j)?'on':''}" data-save-exp="${j}">${hasState('saved',id,i,it,j)?'♥ SAVED':'♡ SAVE'}</button><button class="${hasState('done',id,i,it,j)?'on':''}" data-done-exp="${j}">${hasState('done',id,i,it,j)?'✓ TRIED':'MARK TRIED'}</button><button class="detail" data-open-exp="${j}">DETAILS →</button></div></div></article>`}).join('')}</div>`:'<div class="tc1Empty">No separate drink items here yet. This does not affect the destination food passport.</div>'}`;
}
function wirePassport(id,i,type){
 document.querySelectorAll('[data-pass-type]').forEach(b=>b.onclick=()=>renderDestination(id,i,'food','All',b.dataset.passType));
 document.querySelectorAll('[data-pass-tried]').forEach(b=>b.onclick=()=>{if(typeof togglePass==='function'){togglePass(type,b.dataset.passTried);renderDestination(id,i,'food','All',type)}});
 document.querySelectorAll('[data-pass-save]').forEach(b=>b.onclick=()=>{state.saved=state.saved||{};const k='passport-'+type+'-'+b.dataset.passSave;state.saved[k]=!state.saved[k];save();renderDestination(id,i,'food','All',type)});
 document.querySelectorAll('[data-food-tried]').forEach(b=>b.onclick=()=>{const it=foodPassportItems(id,i).find(x=>(x.dishId||x.id)===b.dataset.foodTried);if(it){toggleFoodTried(id,i,it);renderDestination(id,i,'food','All','food')}});
 document.querySelectorAll('[data-food-save]').forEach(b=>b.onclick=()=>{const it=foodPassportItems(id,i).find(x=>(x.dishId||x.id)===b.dataset.foodSave);if(it){toggleFoodSaved(id,i,it);renderDestination(id,i,'food','All','food')}});
}
'''
s,n=re.subn(r'function passportView\(id,i,type\)\{.*?\n\}\nfunction wirePassport\(id,i,type\)\{.*?\n\}\nfunction mapView',new_passport+'function mapView',s,flags=re.S)
assert n==1, f'passport replacement count {n}'

# Global Saved now includes all destination food-passport saves.
new_global=r'''async function renderGlobalSaved(){await readyCountry('vietnam');const a=allEntries().filter(x=>x.saved),foods=foodSavedEntries();let pass=[];try{if(typeof SAIGON_FOOD_PASSPORT!=='undefined')SAIGON_FOOD_PASSPORT.forEach(x=>{if(state.saved?.['passport-food-'+x.id])pass.push({type:'Food Passport',x})});if(typeof SAIGON_DRINK_PASSPORT!=='undefined')SAIGON_DRINK_PASSPORT.forEach(x=>{if(state.saved?.['passport-drink-'+x.id])pass.push({type:'Drink Passport',x})})}catch(e){}setApp(`<section class="tc1Screen"><div class="tc1GlobalHead"><button class="tc1Round" data-global-back>←</button><div class="tc1Scope" style="color:#fff;margin-top:18px">Global collection</div><h1>Saved</h1><p>Everything you saved across the whole journey.</p></div><div class="tc1GlobalList">${a.map(globalCard).join('')}${foods.map(foodGlobalCard).join('')}${pass.map(p=>`<article class="tc1GlobalCard"><small>🇻🇳 Saigon · ${esc(p.type)}</small><h3>${esc(p.x.name)}</h3><p>${esc(p.x.en)} · ${esc(p.x.desc)}</p></article>`).join('')}${!a.length&&!foods.length&&!pass.length?'<div class="tc1Empty" style="margin:0">Nothing saved yet.</div>':''}</div>${drawer()}</section>`);document.querySelector('[data-global-back]').onclick=restoreContext;}
'''
s,n=re.subn(r'async function renderGlobalSaved\(\)\{.*?\nasync function renderBookAhead',new_global+'async function renderBookAhead',s,flags=re.S)
assert n==1, f'global saved replacement count {n}'

p.write_text(s)

cssp=Path('data/travel-companion-v1-shell.css')
css=cssp.read_text()
marker='/* Destination food passports — complete coverage */'
if marker not in css:
    css += r'''

/* Destination food passports — complete coverage */
.tc1FoodPassGrid{grid-template-columns:1fr!important}.tc1FoodPass{min-height:0}.tc1FoodPass .tc1PassBody{padding:15px}.tc1FoodStatus{display:inline-flex;border:1px solid #3a3a3f;border-radius:999px;padding:5px 8px;margin-bottom:8px;font-size:7px;font-weight:900;letter-spacing:.09em}.tc1FoodStatus.new{color:#f1bd64;border-color:#6f5428}.tc1FoodStatus.already,.tc1FoodStatus.tried{color:#7bd3a7;border-color:#315d48}.tc1FoodStatus.missing{color:#d99076;border-color:#714030}.tc1FoodPass .en{color:#9a9691;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.06em}.tc1FoodPass h3{font:700 23px/1.05 Georgia,serif;margin:5px 0 7px}.tc1FoodPass p{font-size:11px;line-height:1.48;color:#c7c3bf;margin:0 0 10px}.tc1FoodPass .tc1PassMeta{font-size:9px;line-height:1.4;color:#9d9995}.tc1FoodPass .tc1PassBtns{margin-top:12px}
'''
cssp.write_text(css)

# Audit document
Path('docs/FOOD_PASSPORT_AUDIT.md').write_text('''# Food Passport Audit\n\n- Every destination in every country now resolves to a Food Passport.\n- Ho Chi Minh City retains the existing 15-item Saigon Food Passport and 12-item Drink Passport.\n- All other destinations use the destination/regional food bank in `data/destination-food-passports-v1.js`.\n- Food passport items have stable dish IDs, AUD planning estimates, Save and Tried state.\n- Cumulative labels are NEW HERE, ALREADY TRIED and STILL MISSING; an item tried at the current stop shows TRIED HERE.\n- Saved food passport items feed both the country Saved page and global Saved page.\n- Food imagery is intentionally not invented or partially filled; this change is content/state only.\n''')
