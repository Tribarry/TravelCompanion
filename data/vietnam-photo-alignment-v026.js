/* V0.28 — verification-first Vietnam graphics
 * Product rule: an image must depict the actual destination, landmark, dish or
 * activity. If we cannot resolve a verified visual, show PHOTO TO VERIFY rather
 * than a loosely related destination/stock image. This deliberately removes the
 * old broad-search and destination-fallback behaviour that caused mismatches.
 */
(()=>{
'use strict';

const DEST={
 'Ho Chi Minh City':'Ho Chi Minh City',
 'Cái Bè / Tân Phong':'Cái Bè',
 'Sa Đéc':'Sa Đéc',
 'Cần Thơ':'Cần Thơ',
 'Long Xuyên':'Long Xuyên',
 'Châu Đốc / Núi Sam':'Châu Đốc',
 'Trà Sư':'Trà Sư Cajuput Forest',
 'Tịnh Biên / Tri Tôn':'Bảy Núi',
 'Bạc Liêu':'Bạc Liêu',
 'Hà Tiên':'Hà Tiên',
 'Kiên Lương':'Kiên Lương district',
 'Rạch Giá':'Rạch Giá',
 'Nam Du Islands':'Nam Du Islands',
 'Bến Tre':'Bến Tre',
 'Trà Vinh':'Trà Vinh',
 'Vĩnh Long / Mang Thít':'Vĩnh Long province',
 'Vĩnh Long / Bến Tre':'Vĩnh Long province',
 'Phú Quốc':'Phú Quốc',
 'Côn Đảo':'Côn Đảo',
 'Vũng Tàu':'Vũng Tàu',
 'Đồng Xoài / Bình Phước':'Đồng Xoài',
 'Đồng Xoài':'Đồng Xoài',
 'Gia Nghĩa / Đắk Nông':'Gia Nghĩa',
 'Đà Lạt':'Da Lat',
 'Buôn Ma Thuột / Đắk Lắk':'Buôn Ma Thuột',
 'Đắk Lắk':'Buôn Ma Thuột',
 'Yok Đôn / Buôn Đôn':'Yok Đôn National Park',
 'Lắk Lake':'Lak Lake',
 'Pleiku / Gia Lai':'Pleiku',
 'Pleiku':'Pleiku',
 'Kon Tum':'Kon Tum',
 'Măng Đen':'Măng Đen',
 'Khâm Đức / Phước Sơn':'Khâm Đức',
 'Khâm Đức':'Khâm Đức',
 'Prao / Đông Giang':'Prao',
 'Prao':'Prao',
 'A Lưới / A Shau Valley':'A Shau Valley',
 'A Lưới':'A Lưới',
 'Khe Sanh':'Khe Sanh',
 'Western Ho Chi Minh Road':'Ho Chi Minh Highway',
 'Quy Nhơn':'Quy Nhơn',
 'Phú Yên / Tuy Hòa':'Ganh Da Dia',
 'Phú Yên':'Ganh Da Dia',
 'Nha Trang':'Nha Trang',
 'Hội An':'Hội An (city)',
 'Đà Nẵng':'Da Nang',
 'Hải Vân / Lăng Cô':'Hải Vân Pass',
 'Hải Vân Pass':'Hải Vân Pass',
 'Huế':'Huế',
 'Bạch Mã':'Bạch Mã National Park',
 'Bạch Mã National Park':'Bạch Mã National Park',
 'Phong Nha / Quảng Bình':'Phong Nha-Kẻ Bàng National Park',
 'Hang Én':'Hang Én',
 'Pygmy / Hung Thoong':'Hang Pygmy',
 'Sơn Đoòng':'Sơn Đoòng Cave',
 'Ninh Bình':'Tràng An Scenic Landscape Complex',
 'Pù Luông':'Pu Luong',
 'Hà Nội':'Hanoi',
 'Hạ Long / Lan Hạ Bay':'Hạ Long Bay',
 'Hạ Long Bay':'Hạ Long Bay',
 'Cát Bà':'Cát Bà Island',
 'Cát Bà Island':'Cát Bà Island',
 'Ba Bể':'Ba Bể National Park',
 'Ba Bể National Park':'Ba Bể National Park',
 'Cao Bằng':'Ban Gioc–Detian Falls',
 'Hà Giang Loop':'Mã Pí Lèng Pass',
 'Hoàng Su Phì':'Hoàng Su Phì district',
 'Mù Cang Chải':'Mù Cang Chải district',
 'Y Tý':'Y Tý',
 'Bắc Hà':'Bắc Hà district',
 'Sa Pa':'Sa Pa',
 'Hà Nội Return':'Hanoi'
};

/* Only explicit, semantically verified matches belong here. A missing mapping is
 * safer than a beautiful but wrong photo. */
const LANDMARKS=[
 [/nguyễn văn bình|book street/i,'Nguyễn Văn Bình Book Street'],
 [/central post office|bưu điện trung tâm/i,'Saigon Central Post Office'],
 [/notre.?dame/i,'Notre-Dame Cathedral Basilica of Saigon'],
 [/war remnants/i,'War Remnants Museum'],
 [/independence palace|reunification palace/i,'Independence Palace'],
 [/củ chi|cu chi/i,'Củ Chi tunnels'],
 [/bến thành|ben thanh/i,'Bến Thành Market'],
 [/landmark 81/i,'Landmark 81'],
 [/tân định|tan dinh/i,'Tân Định Church'],
 [/jade emperor/i,'Jade Emperor Pagoda'],
 [/cần giờ|can gio|rừng sác|rung sac/i,'Cần Giờ Mangrove Forest'],
 [/bình tây|cho lon|chợ lớn/i,'Cholon, Ho Chi Minh City'],
 /* Cái Răng is only shown where the photograph is specifically assigned. */
 [/bình thủy|binh thuy/i,'Bình Thủy Ancient House'],
 /* Do not fall back to the former Trà Sư logo or reuse a single swamp shot. */
 [/núi sam|sam mountain/i,'Sam Mountain'],
 [/núi cấm|nui cam|cấm mountain/i,'Bảy Núi'],
 [/phú quốc prison|cây dừa prison|cay dua prison/i,'Phú Quốc Prison'],
 [/hòn thơm|hon thom/i,'Hòn Thơm'],
 [/christ the king|christ of vũng tàu|christ of vung tau/i,'Christ of Vũng Tàu'],
 [/liêng nung|lieng nung/i,'Liêng Nung Waterfall'],
 [/tà đùng|ta dung/i,'Tà Đùng National Park'],
 [/datanla/i,'Datanla Falls'],
 [/langbiang/i,'Langbiang Mountain'],
 [/linh phước|linh phuoc/i,'Linh Phước Pagoda'],
 [/pongour/i,'Pongour Falls'],
 [/yok đôn|yok don/i,'Yok Đôn National Park'],
 [/lắk lake|lak lake/i,'Lak Lake'],
 [/dray nur/i,'Dray Nur Waterfall'],
 [/dray sáp|dray sap/i,'Dray Sap Waterfall'],
 [/t.?nưng|bien ho lake/i,'Tơ Nưng Lake'],
 [/chư đăng ya|chu dang ya/i,'Chư Đăng Ya'],
 [/kon tum wooden church|wooden church/i,'Kon Tum Cathedral'],
 [/khe sanh combat|tà cơn|ta con/i,'Khe Sanh Combat Base'],
 [/bánh ít towers|banh it towers/i,'Bánh Ít Towers'],
 [/kỳ co|ky co/i,'Kỳ Co Beach'],
 [/eo gió|eo gio/i,'Eo Gió'],
 [/gành đá đĩa|ganh da dia/i,'Ganh Da Dia'],
 [/mũi điện|mui dien/i,'Mũi Điện'],
 [/vũng rô|vung ro/i,'Vũng Rô Bay'],
 [/pô nagar|po nagar/i,'Po Nagar'],
 [/mỹ sơn|my son/i,'Mỹ Sơn'],
 [/marble mountains|ngũ hành sơn/i,'Marble Mountains (Vietnam)'],
 [/sơn trà|son tra/i,'Sơn Trà Mountain'],
 [/dragon bridge/i,'Dragon Bridge (Da Nang)'],
 [/hải vân|hai van/i,'Hải Vân Pass'],
 [/imperial city|forbidden purple city/i,'Imperial City of Huế'],
 [/thiên mụ|thien mu/i,'Thiên Mụ Temple'],
 [/tự đức|tu duc/i,'Tomb of Tự Đức'],
 [/minh mạng|minh mang/i,'Tomb of Minh Mạng'],
 [/khải định|khai dinh/i,'Tomb of Khải Định'],
 [/perfume river/i,'Perfume River'],
 [/bạch mã|bach ma/i,'Bạch Mã National Park'],
 [/phong nha/i,'Phong Nha-Kẻ Bàng National Park'],
 [/paradise cave|thiên đường cave|thien duong cave/i,'Paradise Cave'],
 [/hang én|hang en/i,'Hang Én'],
 [/sơn đoòng|son doong/i,'Sơn Đoòng Cave'],
 [/tràng an|trang an/i,'Tràng An Scenic Landscape Complex'],
 [/tam cốc|tam coc/i,'Tam Cốc-Bích Động'],
 [/hoa lư|hoa lu/i,'Hoa Lư Ancient Capital'],
 [/cúc phương|cuc phuong/i,'Cúc Phương National Park'],
 [/bích động|bich dong/i,'Bích Động Pagoda'],
 [/pù luông|pu luong/i,'Pu Luong'],
 [/temple of literature|văn miếu|van mieu/i,'Temple of Literature, Hanoi'],
 [/hỏa lò|hoa lo/i,'Hỏa Lò Prison'],
 [/long biên|long bien/i,'Long Biên Bridge'],
 [/hoàn kiếm|hoan kiem/i,'Hoàn Kiếm Lake'],
 [/imperial citadel|thăng long|thang long/i,'Imperial Citadel of Thăng Long'],
 [/hồ chí minh mausoleum|ho chi minh mausoleum/i,'Ho Chi Minh Mausoleum'],
 [/trấn quốc|tran quoc/i,'Trấn Quốc Pagoda'],
 [/old quarter/i,'Old Quarter, Hanoi'],
 [/west lake/i,'West Lake (Hanoi)'],
 [/hạ long|ha long|lan hạ|lan ha/i,'Hạ Long Bay'],
 [/cát bà|cat ba/i,'Cát Bà Island'],
 [/ba bể|ba be/i,'Ba Bể National Park'],
 [/bản giốc|ban gioc/i,'Ban Gioc–Detian Falls'],
 [/pác bó|pac bo/i,'Pác Bó'],
 [/mã pí lèng|ma pi leng/i,'Mã Pí Lèng Pass'],
 [/đồng văn|dong van/i,'Đồng Văn Karst Plateau Geopark'],
 [/lũng cú|lung cu/i,'Lũng Cú Flag Tower'],
 [/nho quế|nho que/i,'Nho Quế River'],
 [/hoàng su phì|hoang su phi/i,'Hoàng Su Phì district'],
 [/mù cang chải|mu cang chai/i,'Mù Cang Chải district'],
 [/khau phạ|khau pha/i,'Khau Phạ Pass'],
 [/bắc hà|bac ha/i,'Bắc Hà district'],
 [/hoàng a tưởng|hoang a tuong/i,'Hoàng A Tưởng Palace'],
 [/fansipan/i,'Fansipan'],
 [/mường hoa|muong hoa/i,'Sa Pa']
];

const DISHES=[
 [/\bcơm tấm\b|\bcom tam\b/i,'Cơm tấm'],
 [/\bbánh mì\b|\bbanh mi\b/i,'Bánh mì'],
 /* The current Hủ tiếu source carries a watermark; retain PHOTO TO VERIFY. */
 [/\bbún riêu\b|\bbun rieu\b/i,'Bún riêu'],
 [/\bbánh xèo\b|\bbanh xeo\b/i,'Bánh xèo'],
 [/\bbò kho\b|\bbo kho\b/i,'Bò kho'],
 [/\bchè\b|\bche\b/i,'Chè'],
 [/\bphở\b|\bpho\b/i,'Phở'],
 [/\bbún chả\b|\bbun cha\b/i,'Bún chả'],
 [/\bcao lầu\b|\bcao lau\b/i,'Cao lầu'],
 [/\bmì quảng\b|\bmi quang\b/i,'Mì Quảng'],
 [/\bbún bò huế\b|\bbun bo hue\b/i,'Bún bò Huế'],
 [/\bcơm hến\b|\bcom hen\b/i,'Cơm hến'],
 [/\bbánh khọt\b|\bbanh khot\b/i,'Bánh khọt'],
 [/\bnem nướng\b|\bnem nuong\b/i,'Nem nướng'],
 [/\bbánh căn\b|\bbanh can\b/i,'Bánh căn'],
 [/egg coffee|cà phê trứng|ca phe trung/i,'Egg coffee'],
 [/thắng cố|thang co/i,'Thắng cố'],
 [/cơm lam|com lam/i,'Cơm lam']
];

const cache=new Map();
let manifestReady=null;
function ensurePhotoManifest(){
 if(window.VN_PHOTO_MANIFEST)return Promise.resolve(window.VN_PHOTO_MANIFEST);
 if(manifestReady)return manifestReady;
 manifestReady=new Promise(resolve=>{
  const s=document.createElement('script');
  s.src='data/vietnam-photo-manifest-v1.js?v=20260912-local-v1';
  s.async=true;
  s.onload=()=>resolve(window.VN_PHOTO_MANIFEST||{});
  s.onerror=()=>resolve({});
  document.head.appendChild(s);
 });
 return manifestReady;
}
async function summaryPhoto(title){
 if(!title)return '';
 const key='sum:'+title;
 if(cache.has(key))return cache.get(key);
 const manifest=await ensurePhotoManifest();
 const u=manifest?.[title]?.local||'';
 cache.set(key,u);
 return u;
}
function destCanonical(name){return DEST[name]||''}
async function destinationPhoto(name){
 const canonical=destCanonical(name);
 return canonical?await summaryPhoto(canonical):'';
}
async function mappedPhoto(q,maps){
 for(const [rx,title] of maps){if(rx.test(q)){const u=await summaryPhoto(title);if(u)return u}}
 return '';
}

const CAIBE_LOCAL=[
 [/dawn floating/i,'assets/images/cai-be/01-floating-market.jpg'],
 [/sampan through|nipa canals/i,'assets/images/cai-be/02-sampan.jpg'],
 [/tân phong orchard|tan phong orchard|tân phong cycling|tan phong cycling/i,'assets/images/cai-be/03-tan-phong-cycle.jpg'],
 [/đông hòa hiệp|dong hoa hiep/i,'assets/images/cai-be/04-dong-hoa-hiep.jpg'],
 [/ba đức|ba duc/i,'assets/images/cai-be/05-ba-duc.jpg'],
 [/ông xoát|ong xoat|ông xoat|ong xoát/i,'assets/images/cai-be/06-ong-xoat.jpg'],
 [/coconut candy|popped rice/i,'assets/images/cai-be/07-coconut-candy.jpg'],
 [/home cooking class/i,'assets/images/cai-be/08-cooking.jpg'],
 [/bánh tráng|banh trang/i,'assets/images/cai-be/09-banh-trang.jpg'],
 [/cái bè church|cai be church|church on the tiền|church on the tien/i,'assets/images/cai-be/10-church.jpg'],
 [/islet ferry|local islet ferry/i,'assets/images/cai-be/13-ferry.jpg'],
 [/tát mương|tat muong/i,'assets/images/cai-be/14-tat-muong.jpg']
];

const SADEC_LOCAL=[
 [/elevated flower|flower nurseries/i,'assets/images/sa-dec/01-nurseries.jpg'],
 [/sampan between/i,'assets/images/sa-dec/02-sampan-beds.jpg'],
 [/flower road|sa nhiên|sa nhien|cái dao|cai dao/i,'assets/images/sa-dec/03-flower-road.jpg'],
 [/wade the beds|with a farmer/i,'assets/images/sa-dec/04-farmer.jpg'],
 [/huỳnh thủy lê|huynh thuy le|the lover/i,'assets/images/sa-dec/05-huynh-thuy-le.jpg'],
 [/kiến an cung|kien an cung|ông quách|ong quach/i,'assets/images/sa-dec/06-kien-an-cung.jpg'],
 [/hủ tiếu sa đéc|hu tieu sa dec/i,'assets/images/sa-dec/07-hu-tieu.jpg'],
 [/sa đéc wet market|sa dec wet market|wet market/i,'assets/images/sa-dec/08-wet-market.jpg']
];
const CANTHO_LOCAL=[
 [/cái răng|cai rang|before dawn/i,'assets/images/can-tho/01-cai-rang.jpg'],
 [/hủ tiếu on a boat|hu tieu on a boat/i,'assets/images/can-tho/02-boat-breakfast.jpg'],
 [/cây bẹo|cay beo/i,'assets/images/can-tho/03-cay-beo.jpg'],
 [/phong điền|phong dien/i,'assets/images/can-tho/04-phong-dien.jpg'],
 [/bình thủy|binh thuy/i,'assets/images/can-tho/05-binh-thuy.jpg'],
 [/ông pagoda|ong pagoda|quảng đông|quang dong/i,'assets/images/can-tho/06-ong-pagoda.jpg'],
 [/ninh kiều after dark|ninh kieu after dark/i,'assets/images/can-tho/07-ninh-kieu.jpg'],
 [/bánh xèo|banh xeo/i,'assets/images/can-tho/08-banh-xeo.jpg'],
 [/cồn sơn|con son/i,'assets/images/can-tho/09-con-son.jpg'],
 [/bằng lăng|bang lang|stork garden/i,'assets/images/can-tho/10-bang-lang.jpg']
];
function destLocalPhoto(q,currentName){
 const dest=String(currentName||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d');
 const title=String(q||'');
 const t=title.trim();
 if(/cái bè \/ tân phong|^cái bè$|^cai be$/i.test(t)) return 'assets/images/cai-be/01-floating-market.jpg';
 if(/^sa đéc$|^sa dec$/i.test(t)) return 'assets/images/sa-dec/01-nurseries.jpg';
 if(/^cần thơ$|^can tho$/i.test(t)) return 'assets/images/can-tho/01-cai-rang.jpg';
 const maps=[];
 if(/cai be|tan phong/.test(dest)) maps.push(CAIBE_LOCAL);
 if(/sa dec/.test(dest)) maps.push(SADEC_LOCAL);
 if(/can tho/.test(dest)) maps.push(CANTHO_LOCAL);
 if(!maps.length){
   if(/cái bè|cai be|tân phong|tan phong|đông hòa|dong hoa|ba đức|ba duc|ông xoát|ong xoat|tát mương|tat muong/i.test(title)) maps.push(CAIBE_LOCAL);
   if(/sa đéc|sa dec|huỳnh thủy|huynh thuy|tân quy|tan quy/i.test(title)) maps.push(SADEC_LOCAL);
   if(/cần thơ|can tho|cái răng|cai rang|ninh kiều|ninh kieu|cồn sơn|con son/i.test(title)) maps.push(CANTHO_LOCAL);
 }
 for(const rules of maps){for(const [rx,u] of rules){if(rx.test(title))return u}}
 return '';
}
function caiBePhoto(q,currentName){return destLocalPhoto(q,currentName);}


async function relevantPhoto(q,currentName){
 const qn=String(q||'').trim();
 if(!qn)return '';
 const cai=destLocalPhoto(qn,currentName); if(cai)return cai;
 /* Place identity outranks dish matching: Phong Nha must never resolve through\n    the similarly spelled Phở manifest entry. */
 if(/phong\\s+nha/i.test(qn))return summaryPhoto('Phong Nha-Kẻ Bàng National Park');
 if(Object.prototype.hasOwnProperty.call(DEST,qn))return destinationPhoto(qn);
 let u=await mappedPhoto(qn,LANDMARKS);if(u)return u;
 u=await mappedPhoto(qn,DISHES);if(u)return u;
 /* Do not fall back to a generic search or the current destination here.
  * That behaviour was the source of unrelated imagery on experience/passport cards. */
 return '';
}
function applyIndex(){
 if(!window.DATA?.destinations?.vietnam)return;
 window.DEST_WIKI=window.DEST_WIKI||{};
 window.DEST_WIKI.vietnam=DATA.destinations.vietnam.map(d=>destCanonical(d.name)||'');
 window.VN_DEST_PHOTO_TITLE=DEST;
}

window.wikiPhoto=async function(title){return summaryPhoto(title)};
window.vnImg=async function(q){
 let current='';try{const x=typeof vnStop==='function'?vnStop():null;current=x?.d?.name||''}catch(e){}
 return relevantPhoto(q,current);
};
window.hydrateVN=function(){
 let current='';try{const x=typeof vnStop==='function'?vnStop():null;current=x?.d?.name||''}catch(e){}
 document.querySelectorAll('[data-vnimg]').forEach(async el=>{
  const q=el.dataset.vnimg||'';const u=await relevantPhoto(q,current);
  if(u){el.style.backgroundImage=`url("${u}")`;el.classList.add('loaded');el.dataset.photoVerified='true'}
  else{el.classList.remove('loaded');el.dataset.photoVerified='false';el.dataset.label='PHOTO TO VERIFY'}
 });
};

applyIndex();
if(window.VN_LIVE_READY&&typeof window.VN_LIVE_READY.then==='function')window.VN_LIVE_READY.then(applyIndex).catch(()=>applyIndex());
})();