/* Vietnam Batch 2 — Sa Đéc production photo pass.
 * Photo-first completion using exact Sa Đéc places/activities where reusable
 * source material is available. Anything without a defensible exact match stays
 * PHOTO TO VERIFY rather than receiving generic Mekong/Vietnam filler.
 * Licence and attribution status remain TO CHECK for the user's audit.
 */
(()=>{
'use strict';
const DEST='Sa Đéc';
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ').trim();
const pendingSvg=()=>`data:image/svg+xml;charset=UTF-8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900"><rect width="1400" height="900" fill="#17191d"/><path d="M0 760L430 420l230 210 210-180 530 450H0z" fill="#22252b"/><text x="70" y="110" fill="#d96f49" font-family="Arial,sans-serif" font-size="25" font-weight="700" letter-spacing="4">PHOTO TO VERIFY</text><text x="70" y="158" fill="#a8a9ae" font-family="Arial,sans-serif" font-size="22">Exact Sa Dec image not approved yet</text></svg>')}`;
const PENDING=pendingSvg();
const commons=file=>`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=1400`;
const S=(url,note)=>({url,note,licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'});

const SRC={
 flowerVillage:S(commons('Làng hoa Tân Quy Đông.jpg'),'Tân Quy Đông flower village, Sa Đéc'),
 flowerBeds:S(commons('Vườn hoa ở Tân Quy Đông.jpg'),'Flower garden in Tân Quy Đông, Sa Đéc'),
 flowerClose:S(commons('Hoa ở Tân Quy Đông.jpg'),'Flowers in Tân Quy Đông, Sa Đéc'),
 orchids:S(commons('Một vườn hoa lan ở Sa Đéc.jpg'),'Orchid garden in Sa Đéc'),
 hero:S(commons('Làng hoa Tân Quy Đông.jpg'),'Tân Quy Đông flower village, Sa Đéc'),
 street:S(commons('Sadec.JPG'),'Hùng Vương Street, Sa Đéc'),
 market:S(commons('Sa Dec City Agricultural Market.jpg'),'Sa Đéc City Agricultural Market'),
 marketHeritage:S(commons('Le marché central de Sa Dec (Vietnam) (6662965877).jpg'),'Historic central market, Sa Đéc'),
 river:S(commons('Les rives du Mékong (Sa Dec, Vietnam) (6662964201).jpg'),'Sa Đéc riverbank and transport boats'),
 huynh:S(commons('Nhà cổ Huỳnh Thủy Lê.jpg'),'Huỳnh Thủy Lê Ancient House, Sa Đéc'),
 kienAn:S(commons('Kiến An Cung 1.jpg'),'Kiến An Cung, Sa Đéc'),
 ironBridge:S(commons('Chỗ cầu sắt Sa Đéc.jpg'),'Iron bridge site, Sa Đéc'),
 nightMarket:S(commons('Sa Dec Night Market in the night 02.jpg'),'Sa Đéc night market'),
 workingBoat:S(commons('Sa Dec rice container on Mekong river.jpg'),'Working rice transport boat at Sa Đéc'),
 brickKilns:S(commons('Briqueteries (région de Sa Dec, Vietnam) (6662960297).jpg'),'Brick kilns in the Sa Đéc region'),
 temple:S(commons('Dai le vesak sa dec.JPG'),'Buddhist observance in Sa Đéc'),
 caLoc:S(commons('Cá lóc nướng trui.JPG'),'Cá lóc nướng trui'),
 banhTamBi:S('https://timtour.vn/files/images/AnGiNgon/banh-tam-bi-2.jpg','Bánh tằm bì'),
 lauMam:S('https://kenh14cdn.com/203336854389633024/2023/1/4/photo-3-16727997043171480871231.jpg','Lẩu mắm')
};
window.VN_SA_DEC_PHOTO_SOURCES=SRC;

const R=(re,photo)=>({re,photo});
const PHOTOS=[
 R(/flower village/,SRC.flowerVillage.url),
 R(/elevated flower|flower nurser/,SRC.flowerBeds.url),
 R(/flower garden|orchid/,SRC.orchids.url),
 R(/pre.?tet flower|flower loading|farmer.*flower|sa nhien|cai dao/,PENDING),
 R(/cycling|bicycle/,SRC.street.url),
 R(/colonial|old streets|heritage.*street/,SRC.street.url),
 R(/wet market/,SRC.market.url),
 R(/central market/,SRC.marketHeritage.url),
 R(/riverfront|river front/,SRC.river.url),
 R(/huynh thuy le|the lover/,SRC.huynh.url),
 R(/kien an cung|chua ong quach/,SRC.kienAn.url),
 R(/brick.?kiln/,SRC.brickKilns.url),
 R(/nguyen hue.*heritage|heritage.?house walk/,SRC.street.url),
 R(/market.*riverside|riverside.*lane|market.*lane/,SRC.marketHeritage.url),
 R(/iron bridge|cau sat/,SRC.ironBridge.url),
 R(/canal.*bridge|bridge.*wandering|canal.*wandering/,SRC.river.url),
 R(/night market/,SRC.nightMarket.url),
 R(/vegetarian|temple.?food/,PENDING),
 R(/coffee.*slow|provincial coffee|coffee stop/,PENDING),
 R(/cargo|working.?boat|boat hitch/,SRC.workingBoat.url)
];
function photoFor(title){const q=norm(title);for(const x of PHOTOS)if(x.re.test(q))return x.photo;return''}

const priorEnrich=window.TC1ExperienceCopy?.enrich;
if(typeof priorEnrich==='function'){
 window.TC1ExperienceCopy.enrich=function(countryId,destination,item){
  const base=priorEnrich(countryId,destination,item);
  if(countryId!=='vietnam'||norm(destination?.name)!==norm(DEST))return base;
  const photo=photoFor(base?.title||item?.title||item?.name||'');
  if(!photo)return base;
  return {...base,photo,photoReady:photo!==PENDING,contentSource:'sa-dec-photo-v1'};
 };
}

const priorRaterPhoto=window.TC1RaterPhoto;
window.TC1RaterPhoto=function(countryId,destination,item){
 if(countryId==='vietnam'&&norm(destination?.name)===norm(DEST)){
  const photo=photoFor(item?.title||item?.name||'');if(photo)return photo;
 }
 return typeof priorRaterPhoto==='function'?priorRaterPhoto(countryId,destination,item):'';
};

function setBg(el,url,gradient=false){
 if(!el||!url)return;if(el.dataset.saDecPhoto===url)return;el.dataset.saDecPhoto=url;
 const bg=gradient?`linear-gradient(180deg,rgba(0,0,0,.04) 18%,rgba(0,0,0,.16) 48%,rgba(0,0,0,.88) 100%),url("${url}")`:`url("${url}")`;
 el.style.setProperty('background-image',bg,'important');el.style.setProperty('background-size','cover','important');el.style.setProperty('background-position','center','important');
 if(url!==PENDING)el.classList.remove('vnFallback','tc1NoPhoto','tc1TextOnly');
}
const priorHydrate=window.hydrateVN;
window.hydrateVN=function(){
 if(typeof priorHydrate==='function')priorHydrate();
 document.querySelectorAll('[data-vnimg]').forEach(el=>{
  const label=(el.dataset.vnimg||el.dataset.label||'').trim();let photo='';
  if(norm(label)===norm(DEST))photo=SRC.hero.url;else photo=photoFor(label);
  if(photo)setBg(el,photo,/tc1SpotlightHero|tc1SpotlightCard/.test(el.className));
 });
};

const FOOD={
 'hu tieu':'assets/images/generated/vietnam-resolved/hu-tie-u-3705b715-1200.webp',
 'banh xeo':'assets/images/generated/vietnam-resolved/ba-nh-xe-o-183280ce-480.webp',
 'ca loc nuong trui':SRC.caLoc.url,
 'banh tam bi':SRC.banhTamBi.url,
 'lau mam':SRC.lauMam.url
};
function currentDestination(){return norm(document.querySelector('.tc1DestBody h1')?.textContent||'')}
function hydrateFood(){
 if(currentDestination()!==norm(DEST))return;
 const grid=document.querySelector('.tc1FoodPassGrid');if(!grid)return;
 grid.querySelectorAll('.tc1FoodPass').forEach(card=>{
  const title=norm(card.querySelector('h3')?.textContent||'');const url=FOOD[title];if(!url)return;
  let photo=card.querySelector('.tc1PassPhoto');if(!photo){photo=document.createElement('div');photo.className='tc1PassPhoto';photo.dataset.label=card.querySelector('h3')?.textContent||'';card.prepend(photo)}
  setBg(photo,url,false);
 });
}
function hydrateSpotlights(){
 if(currentDestination()!==norm(DEST))return;
 document.querySelectorAll('.tc1SpotlightHero,.tc1SpotlightCard').forEach(card=>{
  const title=card.querySelector('b')?.textContent||'';const photo=photoFor(title);if(photo)setBg(card,photo,true);
 });
}
let scheduled=false;
function run(){scheduled=false;window.hydrateVN?.();hydrateFood();hydrateSpotlights()}
function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{run();setTimeout(run,160);setTimeout(run,650)})}
const mo=new MutationObserver(schedule);mo.observe(document.documentElement,{childList:true,subtree:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
})();
