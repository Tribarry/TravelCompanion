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
 coconutCandy:S('https://www.asiatica-travel.com/ckfinder/userfiles/images/Ben-Tre-coconut-candy-factory.jpg','https://www.asiatica-travel.com/trip-vietnam/ben-tre.html','Bến Tre coconut-candy workshop'),
 aoBaOm:S('https://image.ngaynay.vn/1200x630/Uploaded/2026/xqeiodvsxr/2025_06_17/ad-4nxeb-pxiab6fu-1jlrccwiuoomboq7vzzloj3ocx6jbk8pchbfr8eeadesolqwamrqpfehhtt1u6x8pu73f-mjkmxz4zdnklx49ehnhzc9s2-tdqjpaz6nxq7s6btdgxbwbl9khceztb6td9qcpknq-742.png','https://ngaynay.vn/ao-ba-om-di-tich-van-hoa-va-giai-thoai-dac-biet-tren-dat-tra-vinh-post161214.html','Ao Bà Om, Trà Vinh'),
 phuQuocFishSauce:S('https://asiapioneertravel.com/wp-content/uploads/2023/07/phu-quoc-travel-guide-fish-sauce-barrel-house.jpg','https://asiapioneertravel.com/blog/the-ultimate-phu-quoc-travel-guide/','Phú Quốc fish-sauce barrel house'),
 conDaoTigerCages:S('https://lp-cms-production.imgix.net/2023-07/shutterstockeditorial573062677.jpg?auto=format%2Ccompress&crop=faces%2Cedges&fit=crop&q=72&w=1920','https://www.lonelyplanet.com/points-of-interest/tiger-cages/1391605','Côn Đảo Tiger Cages'),
 honBaVungTau:S('https://bna.1cdn.vn/2024/09/11/static-images.vnncdn.net-vps_images_publish-000001-000003-2024-9-10-_anh-xuan-4-4521.jpg','https://baonghean.vn/hon-dao-co-duong-di-luc-an-luc-hien-o-vung-tau-10280456.html','Hòn Bà low-tide path, Vũng Tàu'),
 dakNongLava:S('https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2024/12/29/hang-dong-2-1735437454526790351912.jpg','https://suckhoedoisong.vn/phat-hien-hang-dong-dung-nham-hoan-toan-moi-o-dak-nong-169241229085854179.htm','Đắk Nông lava-tube cave'),
 yokDonElephant:S('https://nhatrangtour.vip/master_images/Review/Yok-Don-National-Park-Vietnam-5.jpg','https://nhatrangtour.vip/yok-don-national-park-vietnam/','Elephants in Yok Đôn National Park'),
 chuDangYa:S('https://ktmt.vnmediacdn.com/images/2021/11/27/35-1638001441-h1.jpg','https://kinhtemoitruong.vn/chu-dang-ya-ve-dep-cua-ngon-nui-cu-gung-dai-huyen-thoai-61424.html','Chư Đăng Ya volcanic landscape'),
 kheSanhCoffee:S('https://images.baodantoc.vn/uploads/2025/Thang-3/Ngay-5/Anh/3/3.jpg','https://dantocphattrien.vietnamnet.vn/nu-giam-doc-tien-phong-dua-ca-phe-khe-sanh-ra-the-gioi-1741162589296.htm','Khe Sanh coffee farm'),
 eoGio:S('https://benthanhtourist.com/resize/1060x0/tour/trong-nuoc/quy-nhon/eo-gio-2.webp','https://benthanhtourist.com/tour/du-lich-quy-nhon-tet-am-lich-2026-ky-co-eo-gio-khu-da-ngoai-trung-luong-ghenh-rang','Eo Gió coastal walkway, Quy Nhơn'),
 muiDien:S('https://cdn-media.sforum.vn/storage/app/media/ctvseo_16/danh%20lam%20th%E1%BA%AFng%20c%E1%BA%A3nh%20Ph%C3%BA%20Y%C3%AAn/danh-lam-thang-canh-phu-yen-3.jpg','https://cellphones.com.vn/sforum/danh-lam-thang-canh-phu-yen','Mũi Điện lighthouse, Phú Yên'),
 japaneseBridge:S('https://image.phunuonline.com.vn/fckeditor/upload/2022/20220116/images/nhung-cay-cau-dep-rung-_241642331684.jpg','https://www.phunuonline.com.vn/nhung-cay-cau-dep-rung-tim-tuong-chi-xuat-hien-trong-truyen-co-tich-a1455432.html','Japanese Covered Bridge, Hội An'),
 nuocMot:S('https://www.hoianworldheritage.org.vn/uploads/news/2024_09/25d473dx211-56ozr8l6q32-35tuo31dij3.jpg','https://www.hoianworldheritage.org.vn/vi/news/Du-lich-Hoi-An/5-dac-san-hoi-an-khien-du-khach-ngat-ngay-khi-nem-thu-2756.hwh','Nước Mót herbal drink, Hội An'),
 hospitalCave:S('https://catbaexpedition.com/upload_images/images/2024/02/18/hang-quan-y-cat-ba-thumb_1642868802.jpg','https://catbaexpedition.com/hospital-cave-a-tapestry-of-nature-and-human-endeavor/','Hospital Cave, Cát Bà'),
 huaMa:S('https://authentiktravel.com/media/ckeditor/ba%20be%20lake%20hua%20ma%20cave.jpg','https://authentiktravel.com/ba-be-lake-a-green-jewel-in-north-vietnam','Hua Mạ Cave, Ba Bể'),
 khuoiKy:S('https://cdn.vietreader.com/uploads/posts/2021-04/visit-the-stone-village-of-khuoi-ky-where-there-are-enchanting-stone-stilt-houses-in-cao-bang-4.jpg','https://vietreader.com/travel/38633-visit-the-stone-village-of-khuoi-ky-where-there-are-enchanting-stone-stilt-houses-in-cao-bang.html','Khuổi Ky stone village, Cao Bằng'),
 phongNam:S('https://thanhnien.mediacdn.vn/Uploaded/trantam/2022_10_01/img-20221001-085459-668.jpg','https://thanhnien.vn/mua-vang-phong-nam-va-nhung-diem-den-dep-quen-loi-ve-1851505677.htm','Phong Nậm Valley, Cao Bằng'),
 lungCu:S('https://cekoolgroup.com/Data/images/cot-co-lung-cu-ha-giang.webp','https://cekoolgroup.com/phan-phoi-ong-nhua-binh-minh-tai-tinh-ha-giang-cd1156','Lũng Cú Flag Tower, Hà Giang'),
 vuongPalace:S('https://vietnamexplorationbooking.com/images2/du-lich-ha-giang-5-814x542%282%29.jpg','https://vietnamexplorationbooking.com/vuong-palace-vua-meo-a-symbol-of-the-past-glory.html','Vương family / H’Mông King’s Palace, Hà Giang'),
 lungTam:S('https://i.ex-cdn.com/vntravellive.com/files/news/2023/10/09/ruc-ro-sac-mau-van-hoa-nguoi-hmong-tai-lang-det-lanh-lung-tam-164815.jpg','https://vntravellive.com/ruc-ro-sac-mau-van-hoa-nguoi-hmong-tai-lang-det-lanh-lung-tam-d35979.html','Lùng Tám H’Mông hemp weaving'),
 skyPath:S('https://cms.vietnamcoracle.com/wp-content/uploads/2024/02/IMG_8288-scaled.jpg','https://www.vietnamcoracle.com/sky-path-hike-ha-giang/','Mã Pí Lèng Sky Path'),
 shanTuyet:S('https://pystravel.vn/_next/image?q=75&url=https%3A%2F%2Fbooking.pystravel.vn%2Fuploads%2Fposts%2Favatar%2F1755059265.jpg&w=3840','https://pystravel.vn/tin/18117-che-hoang-su-phi.html','Shan Tuyết tea harvest, Hoàng Su Phì'),
 mamXoi:S('https://kampatour.com/pic/blog/images/mam-xoi-rice-field-mu-cang-chai%20%281%29.jpg','https://kampatour.com/mu-cang-chai-yen-bai','Mâm Xôi / Raspberry Hill terraces, Mù Cang Chải'),
 banPhoWine:S('https://cdn.nhandan.vn/images/1ea1ae7a315d88fc6fbf436960826115e40a6de47202e635ceb5893a2eab512c74fe216e63a26e40083e9235167597a5961a8231f51a825b3e49c22a7756e8e84b1338d794d32a04bb50efc8cdb06ff5/01-dvl-2587a-do-ngo-731-5227.jpg','https://doingoailaocai.vn/zh/bai-viet/23460','Bản Phố corn-wine production, Bắc Hà'),
 taPhinBath:S('https://simg.zalopay.com.vn/zlp-website/assets/ta_phin_tam_la_thuoc_cua_nguoi_dao_do_b275af85d0.jpg','https://zalopay.vn/ta-phin-5292','Red Dao herbal bath, Tả Phìn')
};
window.VN_REMAINING_REMOTE_PHOTO_SOURCES=REMOTE;

/* Every remote rule is destination-scoped when its wording could recur elsewhere. */
const REMOTE_RULES=[
 {d:/ben tre/,q:/coconut candy|make candy|coconut processing/,s:REMOTE.coconutCandy},
 {d:/tra vinh/,q:/ao ba om/,s:REMOTE.aoBaOm},
 {d:/phu quoc/,q:/fish sauce.*barrel|barrel house|different grade tasting|first press fish sauce/,s:REMOTE.phuQuocFishSauce},
 {d:/con dao/,q:/tiger cage/,s:REMOTE.conDaoTigerCages},
 {d:/vung tau/,q:/hon ba.*low tide|low tide.*hon ba/,s:REMOTE.honBaVungTau},
 {d:/gia nghia|dak nong/,q:/lava tube|volcanic cave|c7 cave|krong no cave|chu bluk/,s:REMOTE.dakNongLava},
 {d:/yok don|buon don/,q:/elephant|mahout/,s:REMOTE.yokDonElephant},
 {d:/pleiku|gia lai/,q:/chu dang ya/,s:REMOTE.chuDangYa},
 {d:/khe sanh/,q:/coffee|arabica|cupping|producer/,s:REMOTE.kheSanhCoffee},
 {d:/quy nhon/,q:/eo gio/,s:REMOTE.eoGio},
 {d:/phu yen|tuy hoa/,q:/mui dien|dai lanh lighthouse/,s:REMOTE.muiDien},
 {d:/hoi an/,q:/japanese covered bridge|chua cau/,s:REMOTE.japaneseBridge},
 {d:/hoi an/,q:/nuoc mot|herbal drink/,s:REMOTE.nuocMot},
 {d:/cat ba/,q:/hospital cave/,s:REMOTE.hospitalCave},
 {d:/ba be/,q:/hua ma cave/,s:REMOTE.huaMa},
 {d:/cao bang/,q:/khuoi ky/,s:REMOTE.khuoiKy},
 {d:/cao bang/,q:/phong nam valley|phong nam/,s:REMOTE.phongNam},
 {d:/ha giang/,q:/lung cu/,s:REMOTE.lungCu},
 {d:/ha giang/,q:/hmong king|vuong family|vuong palace/,s:REMOTE.vuongPalace},
 {d:/ha giang/,q:/lung tam|hemp weaving/,s:REMOTE.lungTam},
 {d:/ha giang/,q:/sky path/,s:REMOTE.skyPath},
 {d:/hoang su phi/,q:/shan tuyet/,s:REMOTE.shanTuyet},
 {d:/mu cang chai/,q:/mam xoi|raspberry hill/,s:REMOTE.mamXoi},
 {d:/bac ha/,q:/ban pho.*corn wine|corn wine.*ban pho/,s:REMOTE.banPhoWine},
 {d:/sa pa/,q:/ta phin.*herbal|herbal bath/,s:REMOTE.taPhinBath}
];

/* Safe aliases into the local manifest. The label must name the depicted subject. */
const MANIFEST_RULES=[
 [/bai sao|phu quoc island|phu quoc coast/,'Phú Quốc'],[/phu quoc prison|cay dua prison/,'Phú Quốc Prison'],
 [/christ.*vung tau|christ the king/,'Christ of Vũng Tàu'],[/yok don national park/,'Yok Đôn National Park'],[/lak lake/,'Lak Lake'],[/kon tum wooden church|kon tum cathedral/,'Kon Tum'],
 [/ganh da dia/,'Ganh Da Dia'],[/vung ro/,'Vũng Rô Bay'],[/po nagar/,'Po Nagar'],[/my son sanctuary|my son/,'Mỹ Sơn'],[/marble mountains|ngu hanh son/,'Marble Mountains (Vietnam)'],[/son tra/,'Sơn Trà Mountain'],[/dragon bridge/,'Dragon Bridge (Da Nang)'],
 [/imperial city|forbidden purple city/,'Imperial City of Huế'],[/thien mu/,'Thiên Mụ Temple'],[/tu duc/,'Tomb of Tự Đức'],[/khai dinh/,'Tomb of Khải Định'],[/perfume river/,'Perfume River'],[/bach ma|do quyen/,'Bạch Mã National Park'],
 [/phong nha/,'Phong Nha-Kẻ Bàng National Park'],[/paradise cave/,'Paradise Cave'],[/hang en/,'Hang Én'],[/hang pygmy|pygmy cave/,'Hang Pygmy'],[/son doong/,'Sơn Đoòng Cave'],
 [/trang an/,'Tràng An Scenic Landscape Complex'],[/tam coc/,'Tam Cốc-Bích Động'],[/hoa lu/,'Hoa Lư Ancient Capital'],[/cuc phuong/,'Cúc Phương National Park'],
 [/temple of literature/,'Temple of Literature, Hanoi'],[/hoa lo/,'Hỏa Lò Prison'],[/long bien bridge/,'Long Biên Bridge'],[/hoan kiem/,'Hoàn Kiếm Lake'],[/imperial citadel.*thang long|thang long citadel/,'Imperial Citadel of Thăng Long'],[/ho chi minh mausoleum/,'Ho Chi Minh Mausoleum'],[/tran quoc/,'Trấn Quốc Pagoda'],[/old quarter/,'Old Quarter, Hanoi'],[/west lake/,'West Lake (Hanoi)'],
 [/ha long bay|lan ha bay/,'Hạ Long Bay'],[/cat ba island/,'Cát Bà Island'],[/ba be national park|ba be lake/,'Ba Bể National Park'],[/ban gioc/,'Ban Gioc–Detian Falls'],[/pac bo/,'Pác Bó'],
 [/ma pi leng/,'Mã Pí Lèng Pass'],[/nho que/,'Nho Quế River'],[/hoang su phi/,'Hoàng Su Phì district'],[/mu cang chai/,'Mù Cang Chải district'],[/khau pha/,'Khau Phạ Pass'],[/hoang a tuong/,'Bắc Hà district'],[/fansipan/,'Fansipan']
];

let manifestPromise=null;
function manifest(){
 if(window.VN_PHOTO_MANIFEST)return Promise.resolve(window.VN_PHOTO_MANIFEST);
 if(manifestPromise)return manifestPromise;
 manifestPromise=new Promise(resolve=>{
  const old=document.querySelector('script[data-vn-remaining-photo-manifest]');
  if(old){old.addEventListener('load',()=>resolve(window.VN_PHOTO_MANIFEST||{}),{once:true});setTimeout(()=>resolve(window.VN_PHOTO_MANIFEST||{}),1200);return}
  const s=document.createElement('script');s.src='data/vietnam-photo-manifest-v1.js?v=20260912-local-v1';s.async=true;s.dataset.vnRemainingPhotoManifest='1';
  s.onload=()=>resolve(window.VN_PHOTO_MANIFEST||{});s.onerror=()=>resolve({});document.head.appendChild(s);
 });
 return manifestPromise;
}
function destinationName(){return document.querySelector('.tc1DestBody h1,.vnHubHero h1')?.textContent?.trim()||''}
function remoteFor(label,destination=destinationName()){
 const q=norm(label),d=norm(destination);return REMOTE_RULES.find(r=>r.d.test(d)&&r.q.test(q))?.s||null;
}
async function localFor(label){
 const q=norm(label);if(!q)return'';const m=await manifest();
 for(const [rx,key] of MANIFEST_RULES){if(rx.test(q)&&m?.[key]?.local)return m[key].local}
 /* Titles often append an action/directive to an exact subject. Longest-key
  * containment is allowed only for non-generic multiword manifest keys. */
 const candidates=Object.entries(m||{}).filter(([key,v])=>v?.local).map(([key,v])=>({n:norm(key),url:v.local})).filter(x=>x.n.split(' ').length>=2&&x.n.length>=8&&q.includes(x.n)).sort((a,b)=>b.n.length-a.n.length);
 return candidates[0]?.url||'';
}
function currentIndex(){const h=norm(destinationName());if(!h)return-1;return (window.DATA?.destinations?.vietnam||[]).findIndex(d=>norm(d.name)===h)}
function inRemainingScope(){const i=currentIndex();return i>12||!!document.querySelector('.tc1Place,.vnCard')}
function setBg(el,url){
 if(!el||!url)return;el.style.setProperty('background-image',`url("${url}")`,'important');el.style.setProperty('background-size','cover','important');el.style.setProperty('background-position','center','important');
 el.classList.add('loaded');el.classList.remove('vnFallback','vnPhotoVerify','tc1NoPhoto','tc1TextOnly');el.dataset.photoVerified='true';delete el.dataset.vnimg;
}
async function resolveElement(el){
 if(!el||el.dataset.photoVerified==='true')return;
 const card=el.closest('.tc1Exp,.tc1Pass,.vnResult,.tc1Place,.tc1SpotlightCard,.tc1SpotlightHero'),label=el.dataset.vnimg||el.dataset.label||card?.querySelector('h3,b')?.textContent||'';
 if(!label)return;
 let d=destinationName();if(card?.classList.contains('tc1Place'))d=card.querySelector('h3')?.textContent||d;
 const remote=remoteFor(label,d);if(remote){setBg(el,remote.url);return}
 const local=await localFor(label);if(local){setBg(el,local);return}
 el.dataset.photoVerified='false';el.dataset.label='PHOTO TO VERIFY';
}
async function hydrate(){
 if(!inRemainingScope())return;
 const nodes=[...document.querySelectorAll('[data-vnimg],.vnPhotoVerify,.tc1ExpPhoto.vnFallback,.tc1PassPhoto.vnFallback,.tc1PlacePhoto.vnFallback,.tc1SpotlightHero.vnFallback,.tc1SpotlightCard.vnFallback')];
 for(const el of nodes)await resolveElement(el);
}
async function report(){
 await (window.VN_LIVE_READY||Promise.resolve());const m=await manifest(),list=window.DATA?.destinations?.vietnam||[],rows=[];
 for(let i=13;i<list.length;i++){
  const d=list[i],items=(typeof window.vnBaseItems==='function'?window.vnBaseItems({c:{id:'vietnam'},d,i,id:'vietnam-'+i}):(d.experiences||[]).map((e,j)=>({title:e.name||e.title,id:e.id||j})));
  let verified=0;const unresolved=[];
  for(const it of items){const title=it.title||it.name||'',r=remoteFor(title,d.name),l=r?'':await localFor(title);if(r||l)verified++;else unresolved.push(title)}
  rows.push({index:i,destination:d.name,total:items.length,verified,unresolved:unresolved.length,unresolvedTitles:unresolved});
 }
 return {scope:'Vietnam destinations after Nam Du',manifestEntries:Object.keys(m||{}).length,total:rows.reduce((n,r)=>n+r.total,0),verified:rows.reduce((n,r)=>n+r.verified,0),unresolved:rows.reduce((n,r)=>n+r.unresolved,0),rows};
}
window.VN_REMAINING_PHOTO_AUDIT={report,remoteSources:REMOTE,version:'2026-09-12-v2'};
let queued=false;function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;hydrate().catch(()=>{})})}
new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
})();
