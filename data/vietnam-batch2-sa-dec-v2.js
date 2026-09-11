/* Vietnam Batch 2.1 — Sa Đéc defect, copy and photo repair.
 * Keeps the canonical 20-experience Sa Đéc bank, removes parser artefacts,
 * improves titles/summaries, fills exact/defensible photo slots, and corrects
 * the Sa Đéc food passport. Licence/attribution remain TO CHECK for audit.
 */
(()=>{
'use strict';
if(window.__VN_SA_DEC_V2__)return;window.__VN_SA_DEC_V2__=true;
const DEST='Sa Đéc';
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ').trim();
const isSaDec=d=>norm(d?.name||d)===norm(DEST);
const commons=file=>`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=1400`;
const S=(url,note)=>({url,note,licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'});

const SRC={
 flowerVillage:S(commons('Làng hoa Tân Quy Đông.jpg'),'Tân Quy Đông flower village, Sa Đéc'),
 flowerBeds:S(commons('Vườn hoa ở Tân Quy Đông.jpg'),'Flower garden in Tân Quy Đông, Sa Đéc'),
 orchids:S(commons('Một vườn hoa lan ở Sa Đéc.jpg'),'Orchid garden in Sa Đéc'),
 street:S(commons('Sadec.JPG'),'Hùng Vương Street, Sa Đéc'),
 market:S(commons('Sa Dec City Agricultural Market.jpg'),'Sa Đéc City Agricultural Market'),
 marketHeritage:S(commons('Le marché central de Sa Dec (Vietnam) (6662965877).jpg'),'Historic central market, Sa Đéc'),
 river:S(commons('Les rives du Mékong (Sa Dec, Vietnam) (6662964201).jpg'),'Sa Đéc riverbank and transport boats'),
 huynh:S(commons('Nhà cổ Huỳnh Thủy Lê.jpg'),'Huỳnh Thủy Lê Ancient House, Sa Đéc'),
 kienAn:S(commons('Kiến An Cung 1.jpg'),'Kiến An Cung, Sa Đéc'),
 ironBridge:S(commons('Chỗ cầu sắt Sa Đéc.jpg'),'Iron bridge site, Sa Đéc'),
 nightMarket:S(commons('Sa Dec Night Market in the night 02.jpg'),'Sa Đéc night market'),
 brickKilns:S(commons('Briqueteries (région de Sa Dec, Vietnam) (6662960297).jpg'),'Brick kilns in the Sa Đéc region'),
 farmer:S('https://cdn.insidevina.com/news/photo/202001/12343_13025_5616.jpg','Flower grower tending plants in Sa Đéc before Tết'),
 preTet:S('https://kampatour.com/pic/blog/images/Sa%20Dec%208%282%29.jpg','Sa Đéc growers wrapping flowers for transport before Tết'),
 flowerRoad:S('https://cdn2.tuoitre.vn/thumb_w/730/tto/i/s626//2015/01/13/CHKalqMD.jpg','Grower beside Sa Nhiên–Cái Dao Flower Road, Sa Đéc'),
 vegetarian:S('https://thanhnien.mediacdn.vn/uploaded/thanhthuy/2018_10_28/hutieuchay8_KTQC.jpg?width=500','Vegetarian Sa Đéc-style hủ tiếu'),
 coffee:S('https://gcs.tripi.vn/public-tripi/tripi-feed/img/474257tkO/p-coffee-1139203.jpg','Coffee shop in Sa Đéc'),
 huTieu:S('https://mekongsen.vn/datafiles/1989319905715032064/2025-11/1763202012-28617054-hu-tieu-sa-dec-3.png','Hủ tiếu Sa Đéc'),
 banhTamBi:S('https://timtour.vn/files/images/AnGiNgon/banh-tam-bi-2.jpg','Bánh tằm bì')
};
window.VN_SA_DEC_PHOTO_SOURCES=SRC;

const COPY=[
 {re:/^flower village$|sa dec flower village/,title:'Sa Đéc Flower Village',summary:'Walk through the working flower district where nurseries grow ornamentals year-round. Go early, move respectfully through active farms, and ask before photographing people.',photo:SRC.flowerVillage.url},
 {re:/cycling|bicycle/,title:'Cycle the flower village',summary:'Ride the quieter lanes around Tân Quy Đông and Sa Nhiên–Cái Dao to see nurseries, canals and everyday neighbourhood life at a slower pace.',photo:SRC.street.url},
 {re:/colonial|old streets|heritage street/,title:'Explore Sa Đéc’s old streets',summary:'Walk the colonial-era core and old merchant streets around the riverfront to see how Sa Đéc’s trading history survives in its urban fabric.',photo:SRC.street.url},
 {re:/wet market/,title:'Sa Đéc wet market',summary:'Visit the local wet market early for produce, fish, breakfast stalls and the everyday rhythms of a working Mekong town.',photo:SRC.market.url},
 {re:/^riverfront$|sa dec riverfront/,title:'Walk the Sa Đéc riverfront',summary:'Walk beside the Sa Đéc River and watch ferries, cargo boats and local traffic moving through the town.',photo:SRC.river.url},
 {re:/huynh thuy le/,title:'Huỳnh Thủy Lê Ancient House',summary:'Visit the preserved merchant house associated with Huỳnh Thủy Lê, then place the story in context with the surrounding riverfront and old streets.',photo:SRC.huynh.url},
 {re:/the lover/,title:'The Lover story in Sa Đéc',summary:'Use the town and Huỳnh Thủy Lê house to understand the real Sa Đéc setting behind Marguerite Duras’s The Lover without turning the visit into a single romance anecdote.',photo:SRC.huynh.url},
 {re:/kien an cung|chua ong quach/,title:'Kiến An Cung',summary:'Visit this ornate Chinese-Vietnamese temple built by Sa Đéc’s Fujian community and look closely at the carved roof, ceramic decoration and devotional spaces.',photo:SRC.kienAn.url},
 {re:/elevated flower|flower nurser/,title:'Elevated flower nurseries',summary:'See Sa Đéc’s distinctive flower pots raised on timber or bamboo platforms above wet ground and irrigation channels—a practical adaptation that became a visual signature of the flower village.',photo:SRC.flowerBeds.url},
 {re:/farmer hands on|farmer.*flower|hands on.*farmer/,title:'Hands-on with a flower farmer',summary:'Join a nursery only where the grower offers it: help with potting, trimming or another simple task and learn how flowers are managed for the Tết market.',photo:SRC.farmer.url},
 {re:/pre tet flower|flower loading/,title:'Pre-Tết flower loading',summary:'In the weeks before Tết, watch growers wrap, move and load flower pots for transport to markets around southern Vietnam. Timing is seasonal.',photo:SRC.preTet.url},
 {re:/sa nhien.*cai dao|flower road/,title:'Sa Nhiên–Cái Dao Flower Road',summary:'Walk or cycle the flower road through the heart of Sa Đéc’s nursery district, especially before Tết when roadside gardens and flower traffic intensify.',photo:SRC.flowerRoad.url},
 {re:/brick kiln|brick.*waterway/,title:'Brick-kiln waterways',summary:'Explore the brick-kiln waterways around the wider Sa Đéc region only where access is permitted; the kilns reflect an older river-based industrial landscape.',photo:SRC.brickKilns.url},
 {re:/nguyen hue.*heritage|heritage house walk/,title:'Nguyễn Huệ heritage-house walk',summary:'Walk Nguyễn Huệ and nearby heritage streets for older houses, shops and river-town architecture beyond the best-known landmarks.',photo:SRC.street.url},
 {re:/market.*riverside|riverside.*lane|market.*lane/,title:'Market and riverside lanes',summary:'Wander the lanes linking the market and riverfront, stopping for small shops, food stalls and everyday street life.',photo:SRC.marketHeritage.url},
 {re:/iron bridge|cau sat/,title:'Sa Đéc Iron Bridge',summary:'Stop at the old iron-bridge area for a different view of the river and the city’s transport landscape.',photo:SRC.ironBridge.url},
 {re:/canal.*bridge|bridge.*wandering|canal.*wandering/,title:'Canal and bridge wandering',summary:'Follow smaller canals and bridges away from the headline sights to see residential Sa Đéc at a slower pace.',photo:SRC.river.url},
 {re:/night market/,title:'Sa Đéc night market',summary:'Return after dark for an easy local evening of snacks, people-watching and river-town atmosphere.',photo:SRC.nightMarket.url},
 {re:/vegetarian temple|temple food hunt/,title:'Vegetarian temple food hunt',summary:'Look for a vegetarian meal near a temple or local vegetarian eatery. Availability varies, so treat the search as part of the experience rather than a fixed restaurant stop.',photo:SRC.vegetarian.url},
 {re:/provincial coffee|coffee slow|slow coffee/,title:'Slow coffee stop',summary:'Take a slow coffee break in Sa Đéc and use it as downtime between the flower village, markets and old-town sights rather than another task to tick off.',photo:SRC.coffee.url}
];
const matchCopy=title=>{const q=norm(title);return COPY.find(x=>x.re.test(q))||null};
const parserArtefact=title=>{
 const q=norm(title);
 return q==='hu tieu sa dec'||q==='banh tam bi'||q==='never scheduled transport'||q.startsWith('temple side vegetarian food')||q.includes('cargo working boat hitch toward can tho')||(q.includes('working boat')&&q.includes('can tho')&&q.includes('wildcard'));
};

function installExperienceOverrides(){
 if(typeof window.vnBaseItems==='function'&&!window.vnBaseItems.__saDecV2){
  const prior=window.vnBaseItems;
  const wrapped=function(x){
   const items=prior(x);
   if(!isSaDec(x?.d))return items;
   return items.filter(it=>!parserArtefact(it?.title)).map(it=>{
    const c=matchCopy(it?.title);
    if(!c)return it;
    return {...it,title:c.title,summary:c.summary,photo:c.photo};
   });
  };
  wrapped.__saDecV2=true;window.vnBaseItems=wrapped;
 }
 if(window.TC1ExperienceCopy?.enrich&&!window.TC1ExperienceCopy.enrich.__saDecV2){
  const prior=window.TC1ExperienceCopy.enrich;
  const wrapped=function(countryId,destination,item){
   const base=prior(countryId,destination,item);
   if(countryId!=='vietnam'||!isSaDec(destination))return base;
   const flags=(base?.flags||[]).filter(f=>norm(f)!=='no advance booking noted');
   const c=matchCopy(base?.title||item?.title||item?.name||'');
   if(!c)return {...base,flags};
   return {...base,title:c.title,summary:c.summary,photo:c.photo,photoReady:true,flags,contentSource:'sa-dec-v2'};
  };
  wrapped.__saDecV2=true;window.TC1ExperienceCopy.enrich=wrapped;
 }
 if(!window.TC1RaterPhoto?.__saDecV2){
  const prior=window.TC1RaterPhoto;
  const wrapped=function(countryId,destination,item){
   if(countryId==='vietnam'&&isSaDec(destination)){
    const c=matchCopy(item?.title||item?.name||'');if(c?.photo)return c.photo;
   }
   return typeof prior==='function'?prior(countryId,destination,item):'';
  };
  wrapped.__saDecV2=true;window.TC1RaterPhoto=wrapped;
 }
}

const FOOD_ITEMS=[
 {id:'vn-hu-tieu-sa-dec',dishId:'vn-hu-tieu-sa-dec',name:'Hủ tiếu Sa Đéc',en:'Sa Đéc noodle soup',desc:'Sa Đéc’s local rice-noodle speciality, usually served with a clear pork-based broth and available in wet or dry styles.',price:'Est. A$2–5',when:'Breakfast / lunch',estimate:true,scope:'saDec'},
 {id:'vn-banh-tam-bi',dishId:'vn-banh-tam-bi',name:'Bánh tằm bì',en:'Thick rice noodles with pork and coconut',desc:'Soft rice noodles with shredded pork skin, herbs and a coconut-rich sauce—a southern dish worth comparing across the Delta.',price:'Est. A$2–5',when:'Breakfast / lunch',estimate:true,scope:'saDec'},
 {id:'vn-mon-chay-sa-dec',dishId:'vn-mon-chay-sa-dec',name:'Món chay Sa Đéc',en:'Sa Đéc vegetarian food',desc:'Look for a local vegetarian meal, especially around temple areas; hủ tiếu chay is one suitable Sa Đéc example.',price:'Est. A$2–5',when:'Lunch / dinner',estimate:true,scope:'saDec'}
];
const FOOD_PHOTOS={
 'hu tieu sa dec':SRC.huTieu.url,
 'banh tam bi':SRC.banhTamBi.url,
 'mon chay sa dec':SRC.vegetarian.url
};
function installFoodOverride(){
 const api=window.TC1FoodPassport;if(!api?.get||api.get.__saDecV2)return;
 const prior=api.get.bind(api);
 const wrapped=function(countryId,destinationName){
  if(countryId==='vietnam'&&isSaDec(destinationName))return FOOD_ITEMS.map(x=>({...x}));
  return prior(countryId,destinationName);
 };
 wrapped.__saDecV2=true;api.get=wrapped;
}

function setBg(el,url,gradient=false){
 if(!el||!url)return;if(el.dataset.saDecV2Photo===url)return;el.dataset.saDecV2Photo=url;
 const bg=gradient?`linear-gradient(180deg,rgba(0,0,0,.04) 18%,rgba(0,0,0,.16) 48%,rgba(0,0,0,.88) 100%),url("${url}")`:`url("${url}")`;
 el.style.setProperty('background-image',bg,'important');el.style.setProperty('background-size','cover','important');el.style.setProperty('background-position','center','important');
 el.classList.remove('vnFallback','tc1NoPhoto','tc1TextOnly');
}
function onSaDecPage(){return norm(document.querySelector('.tc1DestBody h1')?.textContent||'')===norm(DEST)}
function hydratePage(){
 if(!onSaDecPage())return;
 document.querySelectorAll('[data-vnimg]').forEach(el=>{
  const label=(el.dataset.vnimg||el.dataset.label||'').trim();
  if(norm(label)===norm(DEST)){setBg(el,SRC.flowerVillage.url,/tc1DestHero/.test(el.className));return;}
  const c=matchCopy(label);if(c?.photo)setBg(el,c.photo,/tc1SpotlightHero|tc1SpotlightCard/.test(el.className));
 });
 document.querySelectorAll('.tc1Exp').forEach(card=>{
  const title=card.querySelector('h3')?.textContent||'';const c=matchCopy(title);if(!c?.photo)return;
  const photo=card.querySelector('.tc1ExpPhoto');if(photo)setBg(photo,c.photo,false);
 });
 document.querySelectorAll('.tc1SpotlightHero,.tc1SpotlightCard').forEach(card=>{
  const c=matchCopy(card.querySelector('b')?.textContent||'');if(c?.photo)setBg(card,c.photo,true);
 });
 document.querySelectorAll('.tc1FoodPass').forEach(card=>{
  const title=norm(card.querySelector('h3')?.textContent||'');const url=FOOD_PHOTOS[title];if(!url)return;
  let photo=card.querySelector('.tc1PassPhoto');if(!photo){photo=document.createElement('div');photo.className='tc1PassPhoto';card.prepend(photo)}
  setBg(photo,url,false);
 });
 document.querySelectorAll('.tc1Exp').forEach(card=>{
  const booking=norm(card.querySelector('.tc1ExpMeta span:last-child')?.textContent||'');
  card.querySelectorAll('.tc1Flags span').forEach(flag=>{const q=norm(flag.textContent);if(q&&((booking&&q===booking)||q==='no advance booking noted'))flag.remove()});
  const flags=card.querySelector('.tc1Flags');if(flags&&!flags.children.length)flags.remove();
 });
}
function installHydrateOverride(){
 const prior=window.hydrateVN;if(typeof prior!=='function'||prior.__saDecV2)return;
 const wrapped=function(){prior();hydratePage()};wrapped.__saDecV2=true;window.hydrateVN=wrapped;
}
let queued=false;
function run(){queued=false;installExperienceOverrides();installFoodOverride();installHydrateOverride();hydratePage()}
function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{run();setTimeout(run,120);setTimeout(run,450)})}
new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
})();
