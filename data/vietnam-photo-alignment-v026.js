/* V0.29 — verification-first Vietnam graphics + South/Mekong local banks
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
 [/wade the beds|with a farmer|flower farmer/i,'assets/images/sa-dec/04-farmer.jpg'],
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
const LONGXUYEN_LOCAL=[
 [/dawn floating|floating market/i,'assets/images/long-xuyen/01-floating-market.jpg'],
 [/sunrise breakfast|breakfast on the river|breakfast on river/i,'assets/images/long-xuyen/02-sunrise.jpg'],
 [/ô môi|o moi|ferry to cù lao|ferry to cu lao|local boat/i,'assets/images/long-xuyen/03-ferry-o-moi.jpg'],
 [/cycle cù lao|cycle cu lao|cycle island|ông hổ|ong ho island/i,'assets/images/long-xuyen/04-ong-ho-island.jpg'],
 [/mỹ hòa hưng|my hoa hung|community stay/i,'assets/images/long-xuyen/05-homestay.jpg'],
 [/fish-farming|fish farming raft/i,'assets/images/long-xuyen/06-fish-rafts.jpg'],
 [/cồn phó ba|con pho ba/i,'assets/images/long-xuyen/07-con-pho-ba.jpg'],
 [/orchard farm|farm household/i,'assets/images/long-xuyen/08-orchard.jpg'],
 [/tôn đức thắng|ton duc thang|childhood memorial/i,'assets/images/long-xuyen/09-childhood-house.jpg'],
 [/long xuyên central|long xuyen central|central market/i,'assets/images/long-xuyen/10-central-market.jpg'],
 [/riverfront after dark|riverfront at night/i,'assets/images/long-xuyen/11-riverfront.jpg'],
 [/agricultural backroads|get lost/i,'assets/images/long-xuyen/12-rice.jpg']
];
const CHAUDOC_LOCAL=[
 [/bà chúa xứ|ba chua xu/i,'assets/images/chau-doc/01-ba-chua-xu.jpg'],
 [/núi sam pilgrimage|nui sam pilgrimage/i,'assets/images/chau-doc/02-nui-sam.jpg'],
 [/caves around hang|hang pagoda.*caves/i,'assets/images/chau-doc/04-hang-cave.jpg'],
 [/hang pagoda/i,'assets/images/chau-doc/03-hang-pagoda.jpg'],
 [/^tây an$|tay an pagoda|chùa tây an/i,'assets/images/chau-doc/05-tay-an.jpg'],
 [/thoại ngọc hầu|thoai ngoc hau/i,'assets/images/chau-doc/06-thoai-ngoc-hau.jpg'],
 [/rice plains|sunrise\/sunset rice/i,'assets/images/chau-doc/07-rice-plains.jpg'],
 [/sleep on núi sam|sleep on nui sam/i,'assets/images/chau-doc/08-sleep-nui-sam.jpg'],
 [/wet market/i,'assets/images/chau-doc/09-wet-market.jpg'],
 [/mắm tasting|mam tasting/i,'assets/images/chau-doc/10-mam.jpg'],
 [/floating fish-farm|fish-farm village/i,'assets/images/chau-doc/11-floating-village.jpg'],
 [/working fish raft|fish raft/i,'assets/images/chau-doc/12-fish-raft.jpg'],
 [/boat to cham/i,'assets/images/chau-doc/13-boat-cham.jpg'],
 [/^châu phong$|^chau phong$/i,'assets/images/chau-doc/14-chau-phong.jpg'],
 [/mubarak mosque/i,'assets/images/chau-doc/15-mubarak.jpg'],
 [/cham brocade|brocade weaving/i,'assets/images/chau-doc/16-cham-brocade.jpg'],
 [/rapana|qur.?an recitation/i,'assets/images/chau-doc/17-quran.jpg']
];
const TRASU_LOCAL=[
 [/boat journey|sampan|flooded-forest boat|flooded forest boat/i,'assets/images/tra-su/01-boat.jpg'],
 [/observation tower/i,'assets/images/tra-su/02-tower.jpg'],
 [/bamboo walkway|bamboo bridge/i,'assets/images/tra-su/03-bamboo.jpg'],
 [/birds of the cajuput|birds and observation/i,'assets/images/tra-su/04-birds.jpg'],
 [/dry-season forest|dry season forest/i,'assets/images/tra-su/05-dry-season.jpg'],
 [/forest boardwalk/i,'assets/images/tra-su/06-boardwalk.jpg'],
 [/lotus wetlands/i,'assets/images/tra-su/07-wetlands.jpg'],
 [/cá lóc nướng trui|ca loc nuong trui/i,'assets/images/tra-su/08-ca-loc.jpg'],
 [/thốt nốt|thot not/i,'assets/images/tra-su/09-thot-not.jpg'],
 [/duckweed/i,'assets/images/tra-su/10-duckweed.jpg']
];
const TINHBIEN_LOCAL=[
 [/ta pa rice|tà pạ rice/i,'assets/images/tinh-bien/01-ta-pa-rice.jpg'],
 [/nui cam above|above the clouds/i,'assets/images/tinh-bien/02-nui-cam-clouds.jpg'],
 [/giant maitreya|maitreya/i,'assets/images/tinh-bien/03-maitreya.jpg'],
 [/van linh|vạn linh/i,'assets/images/tinh-bien/04-van-linh.jpg'],
 [/thuy liem|thủy liêm/i,'assets/images/tinh-bien/05-thuy-liem.jpg'],
 [/chua ta pa|chùa tà pạ/i,'assets/images/tinh-bien/06-chua-ta-pa.jpg'],
 [/quarry lake|tuyệt tình/i,'assets/images/tinh-bien/07-quarry-lake.jpg'],
 [/dua bo|đua bò|bull racing/i,'assets/images/tinh-bien/08-bull-racing.jpg'],
 [/khmer village pagoda/i,'assets/images/tinh-bien/09-khmer-pagoda.jpg'],
 [/banh xeo rau rung|bánh xèo rau rừng/i,'assets/images/tinh-bien/10-banh-xeo.jpg'],
 [/sugar.?palm country|sugar-palm/i,'assets/images/tinh-bien/11-sugar-palm.jpg'],
 [/du du dam|đu đủ đâm/i,'assets/images/tinh-bien/12-du-du-dam.jpg'],
 [/ba chuc|ba chúc memorial/i,'assets/images/tinh-bien/13-ba-chuc.jpg']
];
const BACLIEU_LOCAL=[
 [/ghositaram/i,'assets/images/bac-lieu/01-ghositaram.jpg'],
 [/xiem can|xiêm cán/i,'assets/images/bac-lieu/04-xiem-can.jpg'],
 [/salt field/i,'assets/images/bac-lieu/06-salt.jpg'],
 [/me nam hai|mẹ nam hải|quan am phat dai|quán âm/i,'assets/images/bac-lieu/09-me-nam-hai.jpg'],
 [/vinh hung|vĩnh hưng|oc eo|óc eo/i,'assets/images/bac-lieu/10-vinh-hung.jpg'],
 [/wind farm|dien gio|điện gió/i,'assets/images/bac-lieu/02-wind-farm.jpg'],
 [/cong tu|công tử/i,'assets/images/bac-lieu/03-cong-tu.jpg'],
 [/vuon chim|vườn chim/i,'assets/images/bac-lieu/05-vuon-chim.jpg'],
 [/cao van lau|cao văn lầu|da co hoai lang|dạ cổ/i,'assets/images/bac-lieu/07-cao-van-lau.jpg'],
 [/non la|nón lá/i,'assets/images/bac-lieu/08-non-la.jpg'],
 [/ba khia|ba khía/i,'assets/images/bac-lieu/12-ba-khia.jpg'],
 [/banh tam bi|bánh tằm bì/i,'assets/images/bac-lieu/13-banh-tam-bi.jpg']
];



const BENTRE_LOCAL=[
 [/market|chợ|cho ben tre/i,'assets/images/ben-tre/01-market.jpg'],
 [/river|sông|song/i,'assets/images/ben-tre/02-river.jpg'],
 [/bến tre|ben tre/i,'assets/images/ben-tre/01-market.jpg']
];

const HATIEN_LOCAL=[
 [/phù dung|phu dung|cổ tự|co tu/i,'assets/images/ha-tien/01-phu-dung.jpg'],
 [/hà tiên|ha tien/i,'assets/images/ha-tien/01-phu-dung.jpg']
];
const PHUQUOC_LOCAL=[
 [/beach|bãi|bai sao|long beach|trường/i,'assets/images/phu-quoc/01-beach.jpg'],
 [/phú quốc|phu quoc/i,'assets/images/phu-quoc/01-beach.jpg']
];
const CONDAO_LOCAL=[
 [/beach|bãi|côn sơn|con son/i,'assets/images/con-dao/01-beach.jpg'],
 [/côn đảo|con dao|pulo condore/i,'assets/images/con-dao/01-beach.jpg']
];


const NAMDU_LOCAL=[
 [/nam du|island/i,'assets/images/nam-du/01-road.jpg']
];
const RACHGIA_LOCAL=[
 [/city|rach gia/i,'assets/images/rach-gia/01-city.jpg']
];
const KIENLUONG_LOCAL=[
 [/hon chong|kien luong/i,'assets/images/kien-luong/01-hon-chong.jpg']
];
const VINHLONG_LOCAL=[
 [/mang thit|brick.?kiln|kiln country|boat kiln|enter old kiln|golden.?hour kiln/i,'assets/images/vinh-long/03-kiln.jpg'],
 [/cu lao may|rice.?paper|banh trang/i,'assets/images/vinh-long/04-rice-paper.jpg'],
 [/canal boat|ferry hop|homestay|river.?island|an binh|get lost|cycling/i,'assets/images/vinh-long/01-canal.jpg'],
 [/tra on|floating/i,'assets/images/vinh-long/02-tra-on-floating.jpg'],
 [/canal|vinh long|pottery|tofu|weaving|hyacinth|farmer|cook dinner|don ca|oil.?lamp/i,'assets/images/vinh-long/01-canal.jpg']
];
const TRAVINH_LOCAL=[
 [/pagoda|tra vinh/i,'assets/images/tra-vinh/01-pagoda.jpg']
];

const HCMC_LOCAL=[
 [/bến thành|ben thanh/i,'assets/images/generated/vietnam-resolved/be-n-tha-nh-market-e0b32d92-1600.webp'],
 [/nguyễn huệ walking|nguyen hue walking/i,'assets/images/hcmc/nguyen-hue-walking.jpg'],
 [/water puppet|golden dragon/i,'assets/images/hcmc/water-puppet.jpg'],
 [/vinwonders|grand park/i,'assets/images/hcmc/vinwonders-grand-park.jpg'],
 [/reunification palace|independence palace/i,'assets/images/generated/vietnam-resolved/independence-palace-246fea41-1600.webp'],
 [/nguyễn văn bình|nguyen van binh|book street/i,'assets/images/generated/remote/nguyen-van-binh-street-52681309899-ffb45cb4-1600.webp'],
 [/central post office|bưu điện/i,'assets/images/generated/remote/20190923-saigon-central-post-office-interior-2-2673f662-1600.webp'],
 [/notre.?dame/i,'assets/images/generated/remote/saigon-notre-dame-basilica-b5318673-1600.webp'],
 [/war remnants/i,'assets/images/generated/remote/war-remnants-museum-db76beb8-1600.webp'],
 [/open.?top|sightseeing bus/i,'assets/images/generated/remote/css-thaco-sightseeing-120ss-le-lo-i-boulevard-ho-chi-minh-city-2023-01-b1a98778-1600.webp'],
 [/bùi viện|bui vien/i,'assets/images/generated/remote/bui-vien-street-4092a442-1600.webp'],
 [/motorbike food/i,'assets/images/generated/remote/administrator-power-joins-a-street-food-tour-in-ho-chi-minh-city-to-ap-8797084e-1600.webp'],
 [/landmark 81/i,'assets/images/generated/remote/landmark-81-5ee2daf5-1600.webp'],
 [/tân định|tan dinh|pink church/i,'assets/images/generated/remote/church-of-the-sacred-heart-of-jesus-ho-chi-minh-city-8a940a61-1600.webp'],
 [/42 nguyễn huệ|42 nguyen hue|cafe apartment/i,'assets/images/generated/remote/42-nguyen-hue-boulevard-saigon-53547606514-fa84f4dc-1600.webp'],
 [/củ chi|cu chi/i,'assets/images/generated/remote/20190925-cu-chi-tunnel-entrance-50f40797-1600.webp'],
 [/jade emperor/i,'assets/images/generated/remote/jade-emperor-pagoda-9981966414-b47a4894-1600.webp'],
 [/saigon river|night cruise/i,'assets/images/hcmc/saigon-river-cruise.jpg'],
 [/secret commando|individual bunker/i,'assets/images/generated/remote/2023-12-10-memorial-stele-for-special-forces-soldiers-who-died-at-the--fbd527e8-1600.webp'],
 [/chợ lớn|cho lon|chinatown/i,'assets/images/generated/vietnam-resolved/cholon-ho-chi-minh-city-48b6f8fd-1600.webp'],
 [/bình tây|binh tay/i,'assets/images/generated/remote/binh-tay-market-05865896-1600.webp'],
 [/hồ thị kỷ|ho thi ky/i,'assets/images/hcmc/ho-thi-ky.jpg'],
 [/district 4/i,'assets/images/generated/remote/dishes-in-saigon-9f9e0a27-1600.webp'],
 [/fish.?sauce/i,'assets/images/generated/remote/nuocmam1-572d28fd-1600.webp'],
 [/fito/i,'assets/images/generated/remote/traditional-vietnamese-medicine-store-in-pho-truc-2017-7d4f98c9-1600.webp'],
 [/herbal pharmacy|traditional medicine/i,'assets/images/generated/remote/hai-thuong-lang-ong-street-phu-o-ng-10-qua-n-5-tphcm-vie-t-nam-panoram-0806b9cd-1600.webp'],
 [/cần giờ|can gio|mangrove|monkey island|rừng sác|rung sac/i,'assets/images/hcmc/can-gio.jpg']
];
function destLocalPhoto(q,currentName){
 const dest=String(currentName||window.TC1BrowseDest||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d');
 const title=String(q||'');
 const t=title.trim();
 const n=t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ').trim();
 if(n==='ho chi minh city') return 'assets/images/destinations/ho-chi-minh-city.jpg';
 if(n==='cai be tan phong'||n==='cai be') return 'assets/images/destinations/cai-be.jpg';
 if(n==='sa dec') return 'assets/images/destinations/sa-dec.jpg';
 if(n==='can tho') return 'assets/images/can-tho/01-cai-rang.jpg';
 if(n==='long xuyen') return 'assets/images/long-xuyen/01-floating-market.jpg';
 if(n==='chau doc'||n==='chau doc nui sam') return 'assets/images/destinations/chau-doc.jpg';
 if(n==='tra su'||n==='tra su cajuput forest') return 'assets/images/destinations/tra-su.jpg';
 if(n==='tinh bien tri ton'||n==='tinh bien'||n==='bay nui'||n==='tinh bien tri ton seven mountains') return 'assets/images/destinations/tinh-bien-tri-ton.jpg';
 if(n==='bac lieu') return 'assets/images/destinations/bac-lieu-ghositaram.jpg';
 if(n==='nam du'||n==='nam du islands') return 'assets/images/destinations/nam-du.jpg';
 if(n==='rach gia') return 'assets/images/destinations/rach-gia.jpg';
 if(n==='kien luong') return 'assets/images/destinations/kien-luong.jpg';
 if(n==='vinh long') return 'assets/images/destinations/vinh-long.jpg';
 if(n==='tra vinh') return 'assets/images/destinations/tra-vinh.jpg';
 if(n==='ben tre') return 'assets/images/destinations/ben-tre.jpg';
 if(n==='ha tien') return 'assets/images/destinations/ha-tien.jpg';
 if(n==='phu quoc') return 'assets/images/destinations/phu-quoc.jpg';
 if(n==='con dao'||n==='con son') return 'assets/images/destinations/con-dao.jpg';
 /* Dest only orders the maps. Never gate a unique title on "I am here" —
  * browsing Sa Đéc while still marked at Cái Bè was dropping the farmer card. */
 const maps=[];
 const add=rules=>{if(rules&&rules.length!==undefined&&!maps.includes(rules))maps.push(rules)};
 if(/cai be|tan phong/.test(dest)) add(CAIBE_LOCAL);
 if(/sa dec/.test(dest)) add(SADEC_LOCAL);
 if(/can tho/.test(dest)) add(CANTHO_LOCAL);
 if(/long xuyen/.test(dest)) add(LONGXUYEN_LOCAL);
 if(/chau doc/.test(dest)) add(CHAUDOC_LOCAL);
 if(/tra su/.test(dest)) add(TRASU_LOCAL);
 if(/tinh bien|tri ton|bay nui/.test(dest)) add(TINHBIEN_LOCAL);
 if(/bac lieu/.test(dest)) add(BACLIEU_LOCAL);
 if(/nam du/.test(dest)) add(NAMDU_LOCAL);
 if(/rach gia/.test(dest)) add(RACHGIA_LOCAL);
 if(/kien luong/.test(dest)) add(KIENLUONG_LOCAL);
 if(/vinh long/.test(dest)) add(VINHLONG_LOCAL);
 if(/tra vinh/.test(dest)) add(TRAVINH_LOCAL);
 if(/ben tre/.test(dest)) add(BENTRE_LOCAL);
 if(/ha tien/.test(dest)) add(HATIEN_LOCAL);
 if(/phu quoc/.test(dest)) add(PHUQUOC_LOCAL);
 if(/con dao|con son/.test(dest)) add(CONDAO_LOCAL);
 if(/ho chi minh|saigon/.test(dest)) add(HCMC_LOCAL);
 add(HCMC_LOCAL);add(CAIBE_LOCAL);add(SADEC_LOCAL);add(TINHBIEN_LOCAL);add(BACLIEU_LOCAL);add(CANTHO_LOCAL);add(LONGXUYEN_LOCAL);add(CHAUDOC_LOCAL);add(TRASU_LOCAL);add(RACHGIA_LOCAL);add(KIENLUONG_LOCAL);add(VINHLONG_LOCAL);add(TRAVINH_LOCAL);add(BENTRE_LOCAL);add(HATIEN_LOCAL);add(PHUQUOC_LOCAL);add(CONDAO_LOCAL);
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
function browseDestName(){
 if(window.TC1BrowseDest)return String(window.TC1BrowseDest);
 try{const x=typeof vnStop==='function'?vnStop():null;if(x?.d?.name)return x.d.name}catch(e){}
 return '';
}
window.destLocalPhoto=destLocalPhoto;
window.vnImg=async function(q){
 return relevantPhoto(q,browseDestName());
};
function paintPlaceHero(el,url){
 if(!el||!url)return;
 el.style.setProperty('background-image',`url("${url}")`,'important');
 el.style.setProperty('background-size','cover','important');
 el.style.setProperty('background-position','center','important');
 el.classList.add('loaded');
 el.classList.remove('vnFallback','tc1NoPhoto');
}
function hydratePlaceHeroes(){
 document.querySelectorAll('.tc1PlacePhoto').forEach(el=>{
  const name=el.dataset.vnimg||el.dataset.label||el.closest('.tc1Place')?.querySelector('h3')?.textContent||'';
  const url=destLocalPhoto(name,name);
  if(url) paintPlaceHero(el,url);
 });
}
window.hydratePlaceHeroes=hydratePlaceHeroes;
function hydrateSpotlights(){
 document.querySelectorAll('.tc1SpotlightHero,.tc1SpotlightCard').forEach(el=>{
  const title=el.querySelector('b')?.textContent||el.dataset.vnimg||el.dataset.label||'';
  const current=browseDestName();
  const url=destLocalPhoto(title,current);
  if(url) paintPlaceHero(el,url);
 });
}
window.hydrateVN=function(){
 const current=browseDestName();
 document.querySelectorAll('[data-vnimg]').forEach(async el=>{
  const q=el.dataset.vnimg||'';const u=await relevantPhoto(q,current);
  if(u){
   el.style.setProperty('background-image',`url("${u}")`,'important');
   el.style.setProperty('background-size','cover','important');
   el.style.setProperty('background-position','center','important');
   el.classList.add('loaded');el.dataset.photoVerified='true';
  }
  else{el.classList.remove('loaded');el.dataset.photoVerified='false';el.dataset.label='PHOTO TO VERIFY'}
 });
 hydratePlaceHeroes();
 hydrateSpotlights();
 [80,250,700].forEach(ms=>setTimeout(()=>{hydratePlaceHeroes();hydrateSpotlights()},ms));
};
new MutationObserver(()=>{hydratePlaceHeroes();hydrateSpotlights()}).observe(document.documentElement,{childList:true,subtree:true});

applyIndex();
if(window.VN_LIVE_READY&&typeof window.VN_LIVE_READY.then==='function')window.VN_LIVE_READY.then(applyIndex).catch(()=>applyIndex());
})();