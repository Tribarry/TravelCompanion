/* Remaining Vietnam photo audit — 2026-09-12.
 * Scope: destinations after Nam Du Islands (Bến Tre → Hà Nội Return).
 * Exact subject only. Existing local manifest assets are preferred; exact remote
 * gaps are destination-scoped. Unresolved cards remain PHOTO TO VERIFY.
 * Remote source licence/attribution remains TO CHECK pending the licensing pass.
 */
(()=>{
'use strict';
if(window.__VN_REMAINING_PHOTO_AUDIT_V1__)return;window.__VN_REMAINING_PHOTO_AUDIT_V1__=true;
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ').trim();
const S=(url,sourcePage,subject)=>({url,sourcePage,subject,licenseStatus:'TO CHECK',attributionStatus:'TO CHECK'});
const REMOTE={
 coconutCandy:S('assets/images/generated/remote/ben-tre-coconut-candy-factory-e293670a-480.webp','https://www.asiatica-travel.com/trip-vietnam/ben-tre.html','Bến Tre coconut-candy workshop'),
 aoBaOm:S('assets/images/generated/remote/ad-4nxeb-pxiab6fu-1jlrccwiuoomboq7vzzloj3ocx6jbk8pchbfr8eeadesolqwamrq-5a2d56fb-1200.webp','https://ngaynay.vn/ao-ba-om-di-tich-van-hoa-va-giai-thoai-dac-biet-tren-dat-tra-vinh-post161214.html','Ao Bà Om, Trà Vinh'),
 phuQuocFishSauce:S('assets/images/generated/remote/phu-quoc-travel-guide-fish-sauce-barrel-house-652ee50c-800.webp','https://asiapioneertravel.com/blog/the-ultimate-phu-quoc-travel-guide/','Phú Quốc fish-sauce barrel house'),
 conDaoTigerCages:S('assets/images/generated/remote/shutterstockeditorial573062677-0b7c3e20-1600.webp','https://www.lonelyplanet.com/points-of-interest/tiger-cages/1391605','Côn Đảo Tiger Cages'),
 honBaVungTau:S('assets/images/generated/remote/static-images-vnncdn-net-vps-images-publish-000001-000003-2024-9-10-an-109fb472-1600.webp','https://baonghean.vn/hon-dao-co-duong-di-luc-an-luc-hien-o-vung-tau-10280456.html','Hòn Bà low-tide path, Vũng Tàu'),
 dakNongLava:S('assets/images/generated/remote/hang-dong-2-1735437454526790351912-396155ad-480.webp','https://suckhoedoisong.vn/phat-hien-hang-dong-dung-nham-hoan-toan-moi-o-dak-nong-169241229085854179.htm','Đắk Nông lava-tube cave'),
 yokDonElephant:S('assets/images/generated/remote/yok-don-national-park-vietnam-5-f0383276-480.webp','https://nhatrangtour.vip/yok-don-national-park-vietnam/','Elephants in Yok Đôn National Park'),
 chuDangYa:S('assets/images/generated/remote/35-1638001441-h1-ded88214-800.webp','https://kinhtemoitruong.vn/chu-dang-ya-ve-dep-cua-ngon-nui-cu-gung-dai-huyen-thoai-61424.html','Chư Đăng Ya volcanic landscape'),
 kheSanhCoffee:S('assets/images/generated/remote/3-25151d79-480.webp','https://dantocphattrien.vietnamnet.vn/nu-giam-doc-tien-phong-dua-ca-phe-khe-sanh-ra-the-gioi-1741162589296.htm','Khe Sanh coffee farm'),
 eoGio:S('assets/images/generated/remote/eo-gio-2-0c4cc6b3-800.webp','https://benthanhtourist.com/tour/du-lich-quy-nhon-tet-am-lich-2026-ky-co-eo-gio-khu-da-ngoai-trung-luong-ghenh-rang','Eo Gió coastal walkway, Quy Nhơn'),
 muiDien:S('assets/images/generated/remote/danh-lam-thang-canh-phu-yen-3-ad2375ee-1200.webp','https://cellphones.com.vn/sforum/danh-lam-thang-canh-phu-yen','Mũi Điện lighthouse, Phú Yên'),
 japaneseBridge:S('https://image.phunuonline.com.vn/fckeditor/upload/2022/20220116/images/nhung-cay-cau-dep-rung-_241642331684.jpg','https://www.phunuonline.com.vn/nhung-cay-cau-dep-rung-tim-tuong-chi-xuat-hien-trong-truyen-co-tich-a1455432.html','Japanese Covered Bridge, Hội An'),
 nuocMot:S('https://www.hoianworldheritage.org.vn/uploads/news/2024_09/25d473dx211-56ozr8l6q32-35tuo31dij3.jpg','https://www.hoianworldheritage.org.vn/vi/news/Du-lich-Hoi-An/5-dac-san-hoi-an-khien-du-khach-ngat-ngay-khi-nem-thu-2756.hwh','Nước Mót herbal drink, Hội An'),
 hospitalCave:S('assets/images/generated/remote/hang-quan-y-cat-ba-thumb-1642868802-2298b506-480.webp','https://catbaexpedition.com/hospital-cave-a-tapestry-of-nature-and-human-endeavor/','Hospital Cave, Cát Bà'),
 huaMa:S('assets/images/generated/remote/ba-be-lake-hua-ma-cave-66d43614-480.webp','https://authentiktravel.com/ba-be-lake-a-green-jewel-in-north-vietnam','Hua Mạ Cave, Ba Bể'),
 khuoiKy:S('assets/images/generated/remote/visit-the-stone-village-of-khuoi-ky-where-there-are-enchanting-stone-s-f5e4c4b8-480.webp','https://vietreader.com/travel/38633-visit-the-stone-village-of-khuoi-ky-where-there-are-enchanting-stone-stilt-houses-in-cao-bang.html','Khuổi Ky stone village, Cao Bằng'),
 phongNam:S('assets/images/generated/remote/img-20221001-085459-668-1cb29753-1600.webp','https://thanhnien.vn/mua-vang-phong-nam-va-nhung-diem-den-dep-quen-loi-ve-1851505677.htm','Phong Nậm Valley, Cao Bằng'),
 lungCu:S('assets/images/generated/remote/cot-co-lung-cu-ha-giang-c8626305-800.webp','https://cekoolgroup.com/phan-phoi-ong-nhua-binh-minh-tai-tinh-ha-giang-cd1156','Lũng Cú Flag Tower, Hà Giang'),
 vuongPalace:S('https://vietnamexplorationbooking.com/images2/du-lich-ha-giang-5-814x542%282%29.jpg','https://vietnamexplorationbooking.com/vuong-palace-vua-meo-a-symbol-of-the-past-glory.html','Vương family / H’Mông King’s Palace, Hà Giang'),
 lungTam:S('assets/images/generated/remote/ruc-ro-sac-mau-van-hoa-nguoi-hmong-tai-lang-det-lanh-lung-tam-164815-8844046e-1600.webp','https://vntravellive.com/ruc-ro-sac-mau-van-hoa-nguoi-hmong-tai-lang-det-lanh-lung-tam-d35979.html','Lùng Tám H’Mông hemp weaving'),
 skyPath:S('assets/images/generated/remote/img-8288-scaled-b32790f6-1600.webp','https://www.vietnamcoracle.com/sky-path-hike-ha-giang/','Mã Pí Lèng Sky Path'),
 shanTuyet:S('assets/images/generated/remote/image-a8748902-800.webp','https://pystravel.vn/tin/18117-che-hoang-su-phi.html','Shan Tuyết tea harvest, Hoàng Su Phì'),
 mamXoi:S('assets/images/generated/remote/mam-xoi-rice-field-mu-cang-chai-1-0f80ee56-800.webp','https://kampatour.com/mu-cang-chai-yen-bai','Mâm Xôi / Raspberry Hill terraces, Mù Cang Chải'),
 banPhoWine:S('assets/images/generated/remote/01-dvl-2587a-do-ngo-731-5227-48230eae-1600.webp','https://doingoailaocai.vn/zh/bai-viet/23460','Bản Phố corn-wine production, Bắc Hà'),
 taPhinBath:S('assets/images/generated/remote/ta-phin-tam-la-thuoc-cua-nguoi-dao-do-b275af85d0-f9127939-480.webp','https://zalopay.vn/ta-phin-5292','Red Dao herbal bath, Tả Phìn')
};
window.VN_REMAINING_REMOTE_PHOTO_SOURCES=REMOTE;
const REMOTE_RULES=[
 {d:/ben tre/,q:/coconut candy|make candy|coconut processing/,s:REMOTE.coconutCandy},{d:/tra vinh/,q:/ao ba om/,s:REMOTE.aoBaOm},
 {d:/phu quoc/,q:/fish sauce.*barrel|barrel house|different grade tasting|first press fish sauce/,s:REMOTE.phuQuocFishSauce},{d:/con dao/,q:/tiger cage/,s:REMOTE.conDaoTigerCages},
 {d:/vung tau/,q:/hon ba.*low tide|low tide.*hon ba/,s:REMOTE.honBaVungTau},{d:/gia nghia|dak nong/,q:/lava tube|volcanic cave|c7 cave|krong no cave|chu bluk/,s:REMOTE.dakNongLava},
 {d:/yok don|buon don/,q:/elephant|mahout/,s:REMOTE.yokDonElephant},{d:/pleiku|gia lai/,q:/chu dang ya/,s:REMOTE.chuDangYa},
 {d:/khe sanh/,q:/coffee|arabica|cupping|producer/,s:REMOTE.kheSanhCoffee},{d:/quy nhon/,q:/eo gio/,s:REMOTE.eoGio},{d:/phu yen|tuy hoa/,q:/mui dien|dai lanh lighthouse/,s:REMOTE.muiDien},
 {d:/hoi an/,q:/japanese covered bridge|chua cau/,s:REMOTE.japaneseBridge},{d:/hoi an/,q:/nuoc mot|herbal drink/,s:REMOTE.nuocMot},{d:/cat ba/,q:/hospital cave/,s:REMOTE.hospitalCave},
 {d:/ba be/,q:/hua ma cave/,s:REMOTE.huaMa},{d:/cao bang/,q:/khuoi ky/,s:REMOTE.khuoiKy},{d:/cao bang/,q:/phong nam valley|phong nam/,s:REMOTE.phongNam},
 {d:/ha giang/,q:/lung cu/,s:REMOTE.lungCu},{d:/ha giang/,q:/hmong king|vuong family|vuong palace/,s:REMOTE.vuongPalace},{d:/ha giang/,q:/lung tam|hemp weaving/,s:REMOTE.lungTam},{d:/ha giang/,q:/sky path/,s:REMOTE.skyPath},
 {d:/hoang su phi/,q:/shan tuyet/,s:REMOTE.shanTuyet},{d:/mu cang chai/,q:/mam xoi|raspberry hill/,s:REMOTE.mamXoi},{d:/bac ha/,q:/ban pho.*corn wine|corn wine.*ban pho/,s:REMOTE.banPhoWine},{d:/sa pa/,q:/ta phin.*herbal|herbal bath/,s:REMOTE.taPhinBath}
];
const MANIFEST_RULES=[
 [/bai sao|phu quoc island|phu quoc coast/,'Phú Quốc'],[/phu quoc prison|cay dua prison/,'Phú Quốc Prison'],[/christ.*vung tau|christ the king/,'Christ of Vũng Tàu'],[/yok don national park/,'Yok Đôn National Park'],[/lak lake/,'Lak Lake'],[/kon tum wooden church|kon tum cathedral/,'Kon Tum'],
 [/ganh da dia/,'Ganh Da Dia'],[/vung ro/,'Vũng Rô Bay'],[/po nagar/,'Po Nagar'],[/my son sanctuary|my son/,'Mỹ Sơn'],[/marble mountains|ngu hanh son/,'Marble Mountains (Vietnam)'],[/son tra/,'Sơn Trà Mountain'],[/dragon bridge/,'Dragon Bridge (Da Nang)'],
 [/imperial city|forbidden purple city/,'Imperial City of Huế'],[/thien mu/,'Thiên Mụ Temple'],[/tu duc/,'Tomb of Tự Đức'],[/khai dinh/,'Tomb of Khải Định'],[/perfume river/,'Perfume River'],[/bach ma|do quyen/,'Bạch Mã National Park'],
 [/phong nha/,'Phong Nha-Kẻ Bàng National Park'],[/paradise cave/,'Paradise Cave'],[/hang en/,'Hang Én'],[/hang pygmy|pygmy cave/,'Hang Pygmy'],[/son doong/,'Sơn Đoòng Cave'],[/trang an/,'Tràng An Scenic Landscape Complex'],[/tam coc/,'Tam Cốc-Bích Động'],[/hoa lu/,'Hoa Lư Ancient Capital'],[/cuc phuong/,'Cúc Phương National Park'],
 [/temple of literature/,'Temple of Literature, Hanoi'],[/hoa lo/,'Hỏa Lò Prison'],[/long bien bridge/,'Long Biên Bridge'],[/hoan kiem/,'Hoàn Kiếm Lake'],[/imperial citadel.*thang long|thang long citadel/,'Imperial Citadel of Thăng Long'],[/ho chi minh mausoleum/,'Ho Chi Minh Mausoleum'],[/tran quoc/,'Trấn Quốc Pagoda'],[/old quarter/,'Old Quarter, Hanoi'],[/west lake/,'West Lake (Hanoi)'],
 [/ha long bay|lan ha bay/,'Hạ Long Bay'],[/cat ba island/,'Cát Bà Island'],[/ba be national park|ba be lake/,'Ba Bể National Park'],[/ban gioc/,'Ban Gioc–Detian Falls'],[/pac bo/,'Pác Bó'],[/ma pi leng/,'Mã Pí Lèng Pass'],[/nho que/,'Nho Quế River'],[/hoang su phi/,'Hoàng Su Phì district'],[/mu cang chai/,'Mù Cang Chải district'],[/khau pha/,'Khau Phạ Pass'],[/hoang a tuong/,'Bắc Hà district'],[/fansipan/,'Fansipan']
];
let manifestPromise=null;
function manifest(){
 if(window.VN_PHOTO_MANIFEST)return Promise.resolve(window.VN_PHOTO_MANIFEST);if(manifestPromise)return manifestPromise;
 manifestPromise=new Promise(resolve=>{const old=document.querySelector('script[data-vn-remaining-photo-manifest]');if(old){old.addEventListener('load',()=>resolve(window.VN_PHOTO_MANIFEST||{}),{once:true});setTimeout(()=>resolve(window.VN_PHOTO_MANIFEST||{}),1200);return}const s=document.createElement('script');s.src='data/vietnam-photo-manifest-v1.js?v=20260912-local-v1';s.async=true;s.dataset.vnRemainingPhotoManifest='1';s.onload=()=>resolve(window.VN_PHOTO_MANIFEST||{});s.onerror=()=>resolve({});document.head.appendChild(s)});return manifestPromise;
}
function destinationName(){return document.querySelector('.tc1DestBody h1,.vnHubHero h1')?.textContent?.trim()||''}
function remoteFor(label,destination=destinationName()){const q=norm(label),d=norm(destination);return REMOTE_RULES.find(r=>r.d.test(d)&&r.q.test(q))?.s||null}
async function localFor(label){
 const q=norm(label);if(!q)return'';const m=await manifest();for(const [rx,key] of MANIFEST_RULES){if(rx.test(q)&&m?.[key]?.local)return m[key].local}
 const candidates=Object.entries(m||{}).filter(([key,v])=>v?.local).map(([key,v])=>({n:norm(key),url:v.local})).filter(x=>x.n.split(' ').length>=2&&x.n.length>=8&&q.includes(x.n)).sort((a,b)=>b.n.length-a.n.length);return candidates[0]?.url||'';
}
function currentIndex(){const h=norm(destinationName());if(!h)return-1;return (window.DATA?.destinations?.vietnam||[]).findIndex(d=>norm(d.name)===h)}
function inRemainingScope(){
 const i=currentIndex();if(i>12)return true;
 if(document.querySelector('.vnHubHero,.vnResult'))return i>12;
 const country=norm(document.querySelector('.tc1CountryBody h1')?.textContent||'');return country==='vietnam'&&!!document.querySelector('.tc1Place');
}
function setBg(el,url){if(!el||!url)return;el.style.setProperty('background-image',`url("${url}")`,'important');el.style.setProperty('background-size','cover','important');el.style.setProperty('background-position','center','important');el.classList.add('loaded');el.classList.remove('vnFallback','vnPhotoVerify','tc1NoPhoto','tc1TextOnly');el.dataset.photoVerified='true';delete el.dataset.vnimg}
async function resolveElement(el){
 if(!el||el.dataset.photoVerified==='true')return;const card=el.closest('.tc1Exp,.tc1Pass,.vnResult,.tc1Place,.tc1SpotlightCard,.tc1SpotlightHero'),label=el.dataset.vnimg||el.dataset.label||card?.querySelector('h3,b')?.textContent||'';if(!label)return;
 let d=destinationName();if(card?.classList.contains('tc1Place'))d=card.querySelector('h3')?.textContent||d;const remote=remoteFor(label,d);if(remote){setBg(el,remote.url);return}const local=await localFor(label);if(local){setBg(el,local);return}el.dataset.photoVerified='false';el.dataset.label='PHOTO TO VERIFY';
}
function photoLockNodes(){return [...document.querySelectorAll('.tc1DestHero,.tc1ExpPhoto,.tc1PassPhoto,.tc1PlacePhoto,.tc1SpotlightHero,.tc1SpotlightCard')]}
function verifyLocked(el){
 if(!el)return;
 el.dataset.photoLocked='1';el.dataset.photoVerified='false';el.dataset.label='PHOTO TO VERIFY';
 el.style.setProperty('background-image','none','important');el.classList.remove('loaded');
}
function applyPhotoLock(){
 const d=norm(destinationName());
 const locked=['phu quoc','con dao','dong xoai binh phuoc','gia nghia dak nong','da lat','buon ma thuot dak lak','yok don buon don','lak lake','pleiku gia lai','kon tum','mang den','kham duc phuoc son'];
 if(!locked.includes(d))return;
 const nodes=photoLockNodes();
 /* Khâm Đức has no accepted exact imagery yet. */
 if(d==='kham duc phuoc son'){nodes.forEach(verifyLocked);return}
 const seen=new Set();
 nodes.forEach(el=>{
  const bg=getComputedStyle(el).backgroundImage||'';
  const hit=bg.match(/url\(["']?(.+?)["']?\)/)?.[1]||'';
  if(!hit)return;
  if(seen.has(hit))verifyLocked(el);else seen.add(hit);
 });
}
async function hydrate(){if(!inRemainingScope())return;const nodes=[...document.querySelectorAll('[data-vnimg],.vnPhotoVerify,.tc1ExpPhoto.vnFallback,.tc1PassPhoto.vnFallback,.tc1PlacePhoto.vnFallback,.tc1SpotlightHero.vnFallback,.tc1SpotlightCard.vnFallback')];for(const el of nodes)if(el.dataset.photoLocked!=='1')await resolveElement(el);applyPhotoLock()}
async function report(){
 await (window.VN_LIVE_READY||Promise.resolve());const m=await manifest(),list=window.DATA?.destinations?.vietnam||[],rows=[];for(let i=13;i<list.length;i++){const d=list[i],items=(typeof window.vnBaseItems==='function'?window.vnBaseItems({c:{id:'vietnam'},d,i,id:'vietnam-'+i}):(d.experiences||[]).map((e,j)=>({title:e.name||e.title,id:e.id||j})));let verified=0;const unresolved=[];for(const it of items){const title=it.title||it.name||'',r=remoteFor(title,d.name),l=r?'':await localFor(title);if(r||l)verified++;else unresolved.push(title)}rows.push({index:i,destination:d.name,total:items.length,verified,unresolved:unresolved.length,unresolvedTitles:unresolved})}
 return {scope:'Vietnam destinations after Nam Du',manifestEntries:Object.keys(m||{}).length,total:rows.reduce((n,r)=>n+r.total,0),verified:rows.reduce((n,r)=>n+r.verified,0),unresolved:rows.reduce((n,r)=>n+r.unresolved,0),rows};
}
window.VN_REMAINING_PHOTO_AUDIT={report,remoteSources:REMOTE,version:'2026-09-12-v3'};
let queued=false;function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;hydrate().catch(()=>{})})}new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
})();
