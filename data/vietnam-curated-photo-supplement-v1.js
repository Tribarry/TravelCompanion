/* Exact-photo supplement for the curated Vietnam card set — 2026-09-12.
 * Subject-specific sources only. Wikimedia Commons is preferred; exact web sources
 * are allowed where needed and remain marked TO CHECK for final licensing review.
 */
(()=>{
'use strict';
if(window.__VN_CURATED_PHOTO_SUPPLEMENT_V1__)return;window.__VN_CURATED_PHOTO_SUPPLEMENT_V1__=true;
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ').trim();
const C=(file,sourcePage,subject)=>{const url='https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(file);return {url:window.TC_LOCAL_IMAGE_URLS?.[url]||url,sourcePage,subject,licenseStatus:'COMMONS — CHECK FILE PAGE',attributionStatus:'SOURCE PAGE SAVED'}};
const R=(url,sourcePage,subject)=>({url,sourcePage,subject,licenseStatus:'TO CHECK',attributionStatus:'SOURCE PAGE SAVED'});
const RULES=[
 {d:/vinh long|mang thit/,q:/brick kiln|kiln kingdom|kiln country|brick pottery|old kiln/,p:C('Lò gạch Mang Thít Vĩnh Long.jpg','https://commons.wikimedia.org/wiki/File:Lò_gạch_Mang_Thít_Vĩnh_Long.jpg','Brick kiln in Mang Thít, Vĩnh Long')},
 {d:/da lat/,q:/datanla|waterfall rappel|canyoning/,p:C('Datanla Waterfall.jpg','https://commons.wikimedia.org/wiki/File:Datanla_Waterfall.jpg','Datanla Falls, Đà Lạt')},
 {d:/khe sanh/,q:/combat base|ta con|airstrip|trenches|bunkers|c 119/,p:C('Khe Sanh.jpg','https://commons.wikimedia.org/wiki/File:Khe_Sanh.jpg','Museum at Khe Sanh Combat Base')},
 {d:/hai van|lang co/,q:/hai van gate|full pass|historic choke point/,p:C('The Hai Van Gate, Hải Vân Pass ("ocean cloud pass"), Vietnam (7090613449).jpg','https://commons.wikimedia.org/wiki/File:The_Hai_Van_Gate,_Hải_Vân_Pass_("ocean_cloud_pass"),_Vietnam_(7090613449).jpg','Hải Vân Gate')},
 {d:/binh phuoc|dong xoai/,q:/soc bom bo|bom bo/,p:C('Điểu Ong.jpg','https://commons.wikimedia.org/wiki/File:Điểu_Ong.jpg','Sóc Bom Bo cultural conservation site')},
 {d:/mang den/,q:/pa sy|seven lakes|three waterfalls/,p:R('assets/images/generated/remote/thac-pa-sy-71bb5587-480.webp','https://quangngai.gov.vn/en/news/people-s-committee-news/provincial-people-s-committee-s-chairman-nguyen-hoang-giang-inspects-restoration-of-pa-sy-waterfall-tourist-site.html','Pa Sỹ Waterfall, Măng Đen')},
 {d:/mang den/,q:/our lady|duc me|pilgrimage|mang den shrine/,p:R('assets/images/generated/remote/1-c40649e5-800.webp','https://ducmemangden.net/cac-thay-pho-te-kon-tum-hanh-huong-ben-me-mang-den.html','Our Lady of Măng Đen shrine')},
 {d:/prao|dong giang|co tu/,q:/guol|communal house|bho hoong|co tu village/,p:R('assets/images/generated/remote/nha-guol-3-10fbeee0-1600.webp','https://vov.gov.vn/guol-ngoi-nha-sinh-hoat-cong-dong-net-van-hoa-dac-sac-cua-dong-bao-co-tu-dtnew-490248?keyDevice=true','Cơ Tu Gươl communal house')},
 {d:/a luoi|a shau/,q:/a bia|hamburger hill/,p:R('assets/images/generated/remote/anh-doi-a-bia-a-luoi-8-17465297555462093704545-9de6d8c9-1600.webp','https://thanhnien.vn/nha-di-tich-doi-a-bia-o-do-cao-937-met-co-gi-ma-thu-hut-185250506220208161.htm','A Bia / Hamburger Hill memorial pavilion')},
 {d:/quy nhon|binh dinh/,q:/martial arts|staff technique|traditional martial/,p:R('assets/images/generated/remote/binh-dinh-martial-arts-407c93a8-480.webp','https://www.vietvisiontravel.com/post/schools-of-vietnamese-martial-arts/','Bình Định traditional martial arts')},
 {d:/quy nhon|binh dinh/,q:/quang trung|tay son museum/,p:R('assets/images/generated/remote/bao-tang-quang-trung-tham-quan-1703524313-d46728de-800.webp','https://mia.vn/cam-nang-du-lich/bao-tang-quang-trung-quy-nhon-14148','Quang Trung Museum, Bình Định')},
 {d:/nha trang/,q:/scuba|open water|qualifying dive|post certification dive/,p:R('assets/images/generated/remote/image-ed354398-800.webp','https://pystravel.vn/tin/17705-tour-4-dao-nha-trang.html','Scuba diving in Nha Trang waters')},
 {d:/western ho chi minh road|phong nha/,q:/hang tam co|eight ladies cave/,p:R('assets/images/generated/remote/17351127-1243898112390987-522920200-n-1-bcbed7bd-480.webp','https://hiddenlandtravel.com/fact-amazing-about-eight-ladies-cave/','Hang Tám Cô / Eight Ladies Cave entrance')},
 {d:/western ho chi minh road|phong nha/,q:/khe gat|secret airfield|airstrip/,p:R('assets/images/generated/remote/a1-165716391318310923119-a2608ddd-1600.webp','https://suckhoedoisong.vn/san-bay-da-chien-trong-long-di-san-tren-day-truong-son-va-tran-danh-duy-nhat-169220707103817444.htm','Khe Gát wartime airstrip')},
 {d:/pu luong/,q:/water wheel|bamboo channel|bamboo rafting/,p:R('assets/images/generated/remote/pu-luong-nature-reserve-f858ff4d-1200.webp','https://www.jetsetteralerts.com/14-day-vietnam-travel-itinerary/','Traditional bamboo water wheels in Pù Luông')},
 {d:/kon tum/,q:/kon k tu|bahnar village|nha rong|communal house/,p:R('assets/images/generated/remote/700-kon-ktu-village-90b687c8-480.webp','https://www.autourasia.com/4-days-in-pleiku-kon-tum-travel-itinerary-by-mr-julien-b1540.html','Kon K’Tu Bahnar village communal house')},
 {d:/buon ma thuot|dak lak|yok don|lak lake/,q:/dray nur|dray sap|gia long waterfall/,p:R('assets/images/generated/remote/dray-nur-3-1762142713-043f634b-1200.webp','https://hanoitimes.vn/dray-nur-a-symphony-of-majestic-central-highlands.895521.html','Dray Nur Waterfall, Đắk Lắk')}
];
function destination(){return document.querySelector('.vnHubHero h1,.tc1DestBody h1')?.textContent?.trim()||''}
function set(el,p){if(!el||!p)return;el.style.setProperty('background-image',`url("${p.url}")`,'important');el.style.setProperty('background-size','cover','important');el.style.setProperty('background-position','center','important');el.classList.add('loaded');el.classList.remove('vnFallback','vnPhotoVerify','tc1NoPhoto','tc1TextOnly');el.dataset.photoVerified='true';el.dataset.photoSource=p.sourcePage||'';el.dataset.photoSubject=p.subject||'';el.dataset.photoLicense=p.licenseStatus||''}
function hydrate(){const d=norm(destination());if(!d)return;document.querySelectorAll('.vnResult,.tc1Exp,.tc1SpotlightCard,.tc1SpotlightHero').forEach(card=>{const label=card.querySelector('h3,b')?.textContent?.trim()||'',q=norm(label),r=RULES.find(x=>x.d.test(d)&&x.q.test(q));if(!r)return;const el=card.matches('.tc1SpotlightCard,.tc1SpotlightHero')?card:card.querySelector('.vnResultPhoto,.tc1ExpPhoto');if(el&&el.dataset.photoVerified!=='true')set(el,r.p)})}
let queued=false;function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;hydrate()})}new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
window.VN_CURATED_PHOTO_SUPPLEMENT={version:'2026-09-12-v2',rules:RULES};
})();
