/* Vietnam photo/UI defect repair — 2026-09-12.
 * Scope is deliberately narrow: restore approved Sài Gòn food photos, fill the
 * Cái Bè experience/food photo slots, and make the Cái Bè Food Passport use the
 * same list-card geometry as its already-approved Drink Passport.
 * New remote sources remain LICENCE / ATTRIBUTION TO CHECK.
 */
(()=>{
'use strict';
if(window.__VN_PHOTO_UI_FIXES_V1__)return;window.__VN_PHOTO_UI_FIXES_V1__=true;
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ').trim();
const S=(url,note)=>({url,note,licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'});

const SOURCES={
 ongXoat:S('https://cdn.tienphong.vn/images/b475a32f866f7ecc2f73fa6d54bae9a3126ff708335ad5fdc9523418cf1810577141fbaf90c21c5fa544c5a265f088c9d8da29cae154bfe3a0ddeeba01cb488d0f63c5d097a9c02b2a634bbc1daeabfcf55f4d4cf291e10c38303c5c973ba32b/z7308696837209-fb1338b257e7d428c6ea1105895f2394.jpg','Nhà cổ Ông Xoát, Cái Bè'),
 comWorkshop:S('https://hd1.hotdeal.vn/images/uploads/2015/11/25/206095/206095-tour-cai-be-cho-noi-body-%20%289%29.jpg','Cái Bè rice-snack / pop-rice workshop'),
 banhPhongSua:S('https://mia.vn/media/uploads/blog-du-lich/banh-phong-sua-ben-tre-vi-ngot-ngao-tu-san-vat-thien-nhien-3-1664889359.jpg','Bánh phồng sữa drying process'),
 tatMuong:S('https://thanhnienmoi.com/upload/images/vuon-trai-cay-ba-hiep-can-tho-07.jpg','Mekong tát mương bắt cá activity'),
 hammock:S('https://www.exoticvoyages.com/uploads/images/userfiles/2023/09/13/mekong_destination_Exotic_Voyages_%287%29.jpg','Mekong hammock café'),
 familyDinner:S('https://izitour.com/media/ckeditor/dormir-chez-habitant-delta-du-mekong_2026-04-22_413.webp','Mekong homestay family dinner'),
 caLoc:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/C%C3%A1%20l%C3%B3c%20n%C6%B0%E1%BB%9Bng%20trui.JPG?width=1400','Cá lóc nướng trui'),
 banhTamBi:S('https://timtour.vn/files/images/AnGiNgon/banh-tam-bi-2.jpg','Bánh tằm bì'),
 lauMam:S('https://kenh14cdn.com/203336854389633024/2023/1/4/photo-3-16727997043171480871231.jpg','Lẩu mắm'),
 tanPhong:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/T%C3%A2n%20Phong%2C%20Cai%20L%E1%BA%ADy%2C%20Ti%E1%BB%81n%20Giang%2C%20Vietnam%20-%20panoramio%20%2821%29.jpg?width=1400','Tân Phong Island'),
 water:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/Vietnam%2008%20-%20118%20-%20Cai%20Be%20on%20the%20water%20%283185052919%29.jpg?width=1400','Cái Bè waterways'),
 ferry:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/Bateaux%20de%20transport%20%28Cai%20Be%2C%20Vietnam%29%20%286654160317%29.jpg?width=1400','Cái Bè local river transport'),
 dongHoaHiep:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/%C4%90%C3%B4ng%20H%C3%B2a%20Hi%E1%BB%87p%2C%20C%C3%A1i%20B%C3%A8%2C%20Ti%E1%BB%81n%20Giang%2C%20Vietnam%20-%20panoramio%20%2815%29.jpg?width=1400','Đông Hòa Hiệp'),
 baDuc:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/Ba%20Duc%20%28Dong%20Hoa%20Hiep%2C%20Vietnam%29%20%286654194639%29.jpg?width=1400','Ba Đức house'),
 gardenHouse:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/Nha%20vuon%20at%20Tan%20Phong%20island%2C%20Cai%20Lay%20district%2C%20Tien%20Giang%2C%20Vietnam%20-%20panoramio.jpg?width=1400','Tân Phong garden house'),
 ricePaper:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/Fabrication%20des%20galettes%20de%20riz%20%28Cai%20Be%2C%20Vietnam%29%20%286653086945%29.jpg?width=1400','Cái Bè rice-paper making'),
 orchard:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/A%20Spondias%20dulcis%20farm%2C%20H%C3%B2a%20Kh%C3%A1nh%20commune%2C%20C%C3%A1i%20B%C3%A8%20district%2C%20Ti%E1%BB%81n%20Giang%2C%20Vietnam%2C%20February%202022.jpg?width=1400','Cái Bè orchard'),
 music:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/M%C3%B4%20h%C3%ACnh%20%C4%91%E1%BB%9Dn%20ca%20t%C3%A0i%20t%E1%BB%AD.jpg?width=1400','Đờn ca tài tử'),
 sunrise:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/March%C3%A9%20flottant%20%28Cai%20Be%2C%20Vietnam%29%20%286654161659%29.jpg?width=1400','Cái Bè river morning'),
 market:S('https://commons.wikimedia.org/wiki/Special:Redirect/file/A%20small%20market%2C%20H%E1%BA%ADu%20M%E1%BB%B9%20B%E1%BA%AFc%20A%20commune%2C%20C%C3%A1i%20B%C3%A8%20district%2C%20Ti%E1%BB%81n%20Giang%2C%20Vietnam%2C%20February-2022.jpg?width=1400','Cái Bè district market')
};
window.VN_PHOTO_DEFECT_SOURCES=SOURCES;

const EXP={
 'tan phong island by bicycle':SOURCES.tanPhong,
 'sampan through the orchard canals':SOURCES.water,
 'cross the river on a local ferry':SOURCES.ferry,
 'dong hoa hiep ancient village':SOURCES.dongHoaHiep,
 'ba duc ancient house':SOURCES.baDuc,
 'ong xoat heritage house':SOURCES.ongXoat,
 'sleep in a mekong garden house':SOURCES.gardenHouse,
 'make com at a family workshop':SOURCES.comWorkshop,
 'make banh trang':SOURCES.ricePaper,
 'see banh phong sua being made':SOURCES.banhPhongSua,
 'tat muong bat ca drain the ditch catch fish':SOURCES.tatMuong,
 'work an orchard with a local family':SOURCES.orchard,
 'don ca tai tu evening':SOURCES.music,
 'sunrise on the tien river':SOURCES.sunrise,
 'cai be morning market':SOURCES.market,
 'hammock coffee in the gardens':SOURCES.hammock,
 'family dinner at the homestay':SOURCES.familyDinner
};
const FOOD={
 'hu tieu':'assets/images/generated/vietnam-resolved/hu-tie-u-3705b715-1200.webp',
 'banh xeo':'assets/images/generated/vietnam-resolved/ba-nh-xe-o-183280ce-480.webp',
 'ca loc nuong trui':SOURCES.caLoc.url,
 'banh tam bi':SOURCES.banhTamBi.url,
 'lau mam':SOURCES.lauMam.url
};

function currentDestination(){return norm(document.querySelector('.tc1DestBody h1')?.textContent||'')}
function setBg(el,url){
 if(!el||!url)return;
 if(el.dataset.vnPhotoFix===url)return;
 el.dataset.vnPhotoFix=url;
 el.style.setProperty('background-image',`url("${url}")`,'important');
 el.style.setProperty('background-size','cover','important');
 el.style.setProperty('background-position','center','important');
 el.classList.remove('vnFallback','tc1NoPhoto','tc1TextOnly');
}
function setSpotlightBg(el,url){
 if(!el||!url)return;
 if(el.dataset.vnPhotoFix===url)return;
 el.dataset.vnPhotoFix=url;
 el.style.setProperty('background-image',`linear-gradient(180deg,rgba(0,0,0,.04) 18%,rgba(0,0,0,.16) 48%,rgba(0,0,0,.88) 100%),url("${url}")`,'important');
 el.style.setProperty('background-size','cover','important');
 el.style.setProperty('background-position','center','important');
 el.classList.remove('vnFallback','tc1NoPhoto','tc1TextOnly');
}
function sourceForExperience(title){return EXP[norm(title)]?.url||''}
function sourceForFood(title){return FOOD[norm(title)]||''}

function saigonFoodPhotos(){
 const map={};
 try{
  if(typeof SAIGON_FOOD_PASSPORT!=='undefined')SAIGON_FOOD_PASSPORT.forEach(x=>{if(x?.name&&x?.img)map[norm(x.name)]=x.img});
 }catch(e){}
 return map;
}
function hydrateSaigonFood(){
 const h=norm(document.querySelector('.tc1PassHead h2')?.textContent||'');
 if(h!=='saigon food passport')return;
 const map=saigonFoodPhotos();
 document.querySelectorAll('.tc1PassGrid .tc1Pass').forEach(card=>{
  const title=card.querySelector('h3')?.textContent||'';const url=map[norm(title)];if(!url)return;
  const photo=card.querySelector('.tc1PassPhoto');if(photo)setBg(photo,url);
 });
}
function ensureFoodPhoto(card,url,title){
 if(!card||!url)return;
 let photo=card.querySelector('.tc1PassPhoto');
 if(!photo){photo=document.createElement('div');photo.className='tc1PassPhoto tc1FoodPhoto tc1ExpPhoto';photo.dataset.label=title||'';card.prepend(photo)}
 else photo.classList.add('tc1ExpPhoto');
 setBg(photo,url);
}
function hydrateCaiBeFood(){
 if(currentDestination()!=='cai be tan phong')return;
 const grid=document.querySelector('.tc1FoodPassGrid');if(!grid)return;
 grid.classList.add('tc1ReferenceFoodHydrated');
 grid.querySelectorAll('.tc1FoodPass').forEach(card=>{
  const title=card.querySelector('h3')?.textContent||'';const url=sourceForFood(title);if(url)ensureFoodPhoto(card,url,title);
 });
}
function hydrateCaiBeExperiences(){
 if(currentDestination()!=='cai be tan phong')return;
 document.querySelectorAll('.tc1Exp').forEach(card=>{
  const title=card.querySelector('h3')?.textContent||'';const url=sourceForExperience(title);if(!url)return;
  const photo=card.querySelector('.tc1ExpPhoto');if(photo)setBg(photo,url);
 });
 document.querySelectorAll('.tc1SpotlightHero,.tc1SpotlightCard').forEach(card=>{
  const title=card.querySelector('b')?.textContent||'';const url=sourceForExperience(title);if(url)setSpotlightBg(card,url);
 });
}
function injectStyle(){
 if(document.getElementById('vn-photo-ui-fixes-style'))return;
 const s=document.createElement('style');s.id='vn-photo-ui-fixes-style';s.textContent=`
  .tc1FoodPassGrid.vnPhotoFixFoodList{display:block!important;grid-template-columns:none!important;padding:8px 18px 28px!important}
  .tc1FoodPassGrid.vnPhotoFixFoodList .tc1FoodPass{display:grid!important;grid-template-columns:112px minmax(0,1fr)!important;gap:11px!important;padding:9px!important;margin:0 0 10px!important;border-radius:17px!important;overflow:hidden!important}
  .tc1FoodPassGrid.vnPhotoFixFoodList .tc1FoodPass .tc1PassPhoto{height:auto!important;min-height:132px!important;border-radius:13px!important;align-self:stretch!important}
  .tc1FoodPassGrid.vnPhotoFixFoodList .tc1FoodPass .tc1PassBody{padding:3px 2px 3px 0!important;min-width:0!important}
  .tc1FoodPassGrid.vnPhotoFixFoodList .tc1FoodPass h3{font-size:18px!important;margin:5px 0 6px!important}
  .tc1FoodPassGrid.vnPhotoFixFoodList .tc1FoodPass p{font-size:10px!important;line-height:1.38!important;margin:4px 0 7px!important}
  .tc1FoodPassGrid.vnPhotoFixFoodList .tc1FoodStatus{margin-bottom:5px!important}
  @media(max-width:360px){.tc1FoodPassGrid.vnPhotoFixFoodList .tc1FoodPass{grid-template-columns:100px minmax(0,1fr)!important}}
 `;document.head.appendChild(s);
}
let scheduled=false;
function run(){scheduled=false;injectStyle();hydrateSaigonFood();hydrateCaiBeFood();hydrateCaiBeExperiences()}
function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{run();setTimeout(run,160);setTimeout(run,650)})}
const mo=new MutationObserver(schedule);mo.observe(document.documentElement,{childList:true,subtree:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
})();
