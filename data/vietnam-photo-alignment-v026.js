/* V0.26 — deterministic Vietnam photo alignment
 * Fixes route-card photo/title drift caused by index-based image lookup after
 * destinations were inserted into the live Vietnam bank. Also replaces the
 * loose Wikipedia image search used by city/experience cards with a strict,
 * context-aware resolver: exact landmark when confident, otherwise the correct
 * destination image. Wrong imagery is never preferred over a relevant fallback.
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
 'Tịnh Biên / Tri Tôn':'Tịnh Biên district',
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
 'Lắk Lake':'Lắk Lake',
 'Pleiku / Gia Lai':'Pleiku',
 'Pleiku':'Pleiku',
 'Kon Tum':'Kon Tum',
 'Măng Đen':'Măng Đen',
 'Khâm Đức / Phước Sơn':'Khâm Đức',
 'Khâm Đức':'Khâm Đức',
 'Prao / Đông Giang':'Đông Giang district',
 'Prao':'Đông Giang district',
 'A Lưới / A Shau Valley':'A Lưới district',
 'A Lưới':'A Lưới district',
 'Khe Sanh':'Khe Sanh',
 'Western Ho Chi Minh Road':'Ho Chi Minh Highway',
 'Quy Nhơn':'Quy Nhơn',
 'Phú Yên / Tuy Hòa':'Phú Yên province',
 'Phú Yên':'Phú Yên province',
 'Nha Trang':'Nha Trang',
 'Hội An':'Hội An',
 'Đà Nẵng':'Da Nang',
 'Hải Vân / Lăng Cô':'Hải Vân Pass',
 'Hải Vân Pass':'Hải Vân Pass',
 'Huế':'Huế',
 'Bạch Mã':'Bạch Mã National Park',
 'Bạch Mã National Park':'Bạch Mã National Park',
 'Phong Nha / Quảng Bình':'Phong Nha-Kẻ Bàng National Park',
 'Hang Én':'Hang Én',
 'Pygmy / Hung Thoong':'Phong Nha-Kẻ Bàng National Park',
 'Sơn Đoòng':'Sơn Đoòng Cave',
 'Ninh Bình':'Ninh Bình',
 'Pù Luông':'Pù Luông Nature Reserve',
 'Hà Nội':'Hanoi',
 'Hạ Long / Lan Hạ Bay':'Hạ Long Bay',
 'Hạ Long Bay':'Hạ Long Bay',
 'Cát Bà':'Cát Bà Island',
 'Cát Bà Island':'Cát Bà Island',
 'Ba Bể':'Ba Bể National Park',
 'Ba Bể National Park':'Ba Bể National Park',
 'Cao Bằng':'Cao Bằng province',
 'Hà Giang Loop':'Hà Giang province',
 'Hoàng Su Phì':'Hoàng Su Phì district',
 'Mù Cang Chải':'Mù Cang Chải district',
 'Y Tý':'Bát Xát district',
 'Bắc Hà':'Bắc Hà district',
 'Sa Pa':'Sa Pa',
 'Hà Nội Return':'Hanoi'
};

const REGION_FALLBACK={
 'Trà Sư':'An Giang province','Tịnh Biên / Tri Tôn':'An Giang province',
 'Kiên Lương':'Kiên Giang province','Nam Du Islands':'Kiên Giang province',
 'Măng Đen':'Kon Tum province','Khâm Đức / Phước Sơn':'Quảng Nam province',
 'Prao / Đông Giang':'Quảng Nam province','A Lưới / A Shau Valley':'Huế',
 'Pygmy / Hung Thoong':'Phong Nha-Kẻ Bàng National Park',
 'Pù Luông':'Thanh Hóa province','Y Tý':'Lào Cai province'
};

const LANDMARKS=[
 [/ghositaram/i,'Ghositaram Temple'],
 [/bình tây|cho lon|chợ lớn/i,'Cholon, Ho Chi Minh City'],
 [/central post office|bưu điện trung tâm/i,'Saigon Central Post Office'],
 [/notre.?dame/i,'Notre-Dame Cathedral Basilica of Saigon'],
 [/independence palace|reunification palace/i,'Independence Palace'],
 [/củ chi|cu chi/i,'Củ Chi tunnels'],
 [/bến thành|ben thanh/i,'Bến Thành Market'],
 [/cái răng/i,'Cái Răng Floating Market'],
 [/trà sư|tra su/i,'Trà Sư Cajuput Forest'],
 [/núi sam|sam mountain/i,'Sam Mountain'],
 [/liêng nung|lieng nung/i,'Đắk Nông province'],
 [/yok đôn|yok don/i,'Yok Đôn National Park'],
 [/lắk lake|lak lake/i,'Lắk Lake'],
 [/t.?nưng|bien ho lake/i,'Tơ Nưng Lake'],
 [/chư đăng ya|chu dang ya/i,'Chư Đăng Ya'],
 [/kỳ co|ky co/i,'Quy Nhơn'],
 [/eo gió|eo gio/i,'Quy Nhơn'],
 [/gành đá đĩa|ganh da dia/i,'Phú Yên province'],
 [/mũi điện|mui dien/i,'Phú Yên province'],
 [/pô nagar|po nagar/i,'Po Nagar'],
 [/mỹ sơn|my son/i,'Mỹ Sơn'],
 [/marble mountains|ngũ hành sơn/i,'Marble Mountains (Vietnam)'],
 [/sơn trà|son tra/i,'Sơn Trà Mountain'],
 [/hải vân|hai van/i,'Hải Vân Pass'],
 [/imperial city/i,'Imperial City of Huế'],
 [/thiên mụ|thien mu/i,'Thiên Mụ Temple'],
 [/bạch mã|bach ma/i,'Bạch Mã National Park'],
 [/phong nha/i,'Phong Nha-Kẻ Bàng National Park'],
 [/hang én|hang en/i,'Hang Én'],
 [/sơn đoòng|son doong/i,'Sơn Đoòng Cave'],
 [/tràng an|trang an/i,'Tràng An Scenic Landscape Complex'],
 [/tam cốc|tam coc/i,'Tam Cốc-Bích Động'],
 [/hoa lư|hoa lu/i,'Hoa Lư Ancient Capital'],
 [/cúc phương|cuc phuong/i,'Cúc Phương National Park'],
 [/pù luông|pu luong/i,'Pù Luông Nature Reserve'],
 [/old quarter/i,'Old Quarter, Hanoi'],
 [/west lake/i,'West Lake (Hanoi)'],
 [/hạ long|ha long|lan hạ|lan ha/i,'Hạ Long Bay'],
 [/cát bà|cat ba/i,'Cát Bà Island'],
 [/ba bể|ba be/i,'Ba Bể National Park'],
 [/bản giốc|ban gioc/i,'Ban Gioc–Detian Falls'],
 [/pác bó|pac bo/i,'Pác Bó'],
 [/mã pí lèng|ma pi leng/i,'Mã Pí Lèng Pass'],
 [/đồng văn|dong van/i,'Đồng Văn Karst Plateau Geopark'],
 [/hoàng su phì|hoang su phi/i,'Hoàng Su Phì district'],
 [/mù cang chải|mu cang chai/i,'Mù Cang Chải district'],
 [/bắc hà|bac ha/i,'Bắc Hà district'],
 [/fansipan/i,'Fansipan'],
 [/mường hoa|muong hoa/i,'Sa Pa']
];

const cache=new Map();
function norm(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase().replace(/[^a-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim()}
const GENERIC=new Set(['vietnam','local','market','food','coffee','cafe','street','streets','village','villages','river','road','roads','culture','history','view','views','viewpoint','landscape','landscapes','mountain','mountains','forest','forests','waterfall','waterfalls','beach','beaches','island','islands','cycling','hiking','trek','trekking','homestay','countryside','farm','farms','temple','pagoda','sunrise','sunset','seafood','experience','national','park','province','district','city','lake']);
function tokens(s){return norm(s).split(' ').filter(t=>t.length>=3&&!GENERIC.has(t))}
function destCanonical(name){return DEST[name]||name}

async function summaryPhoto(title){
 if(!title)return '';
 const key='sum:'+title;if(cache.has(key))return cache.get(key);
 try{
  const r=await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(title));
  if(!r.ok){cache.set(key,'');return ''}
  const j=await r.json();const u=j.originalimage?.source||j.thumbnail?.source||'';cache.set(key,u);return u;
 }catch(e){cache.set(key,'');return ''}
}

async function strictSearchPhoto(q,currentName){
 const key='search:'+q+'|'+currentName;if(cache.has(key))return cache.get(key);
 const need=tokens(q);
 if(!need.length){cache.set(key,'');return ''}
 try{
  const search=[q,currentName,'Vietnam'].filter(Boolean).join(' ');
  const u='https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch='+encodeURIComponent(search)+'&gsrlimit=4&prop=pageimages&piprop=original|thumbnail&pithumbsize=1000&format=json&origin=*';
  const j=await (await fetch(u)).json();
  const pages=Object.values(j.query?.pages||{}).sort((a,b)=>(a.index||99)-(b.index||99));
  for(const p of pages){
   const pt=tokens(p.title);const hits=need.filter(t=>pt.some(x=>x===t||x.includes(t)||t.includes(x)));
   if(hits.length){const img=p.original?.source||p.thumbnail?.source||'';if(img){cache.set(key,img);return img}}
  }
 }catch(e){}
 cache.set(key,'');return '';
}

async function destinationPhoto(name){
 const canonical=destCanonical(name);let u=await summaryPhoto(canonical);
 if(!u)u=await strictSearchPhoto(canonical,name);
 if(!u&&REGION_FALLBACK[name])u=await summaryPhoto(REGION_FALLBACK[name]);
 return u||'';
}

async function relevantPhoto(q,currentName){
 const qn=String(q||'').trim();
 if(DEST[qn])return destinationPhoto(qn);
 for(const [rx,title] of LANDMARKS){if(rx.test(qn)){const u=await summaryPhoto(title)||await strictSearchPhoto(title,currentName);if(u)return u}}
 const u=await strictSearchPhoto(qn,currentName);if(u)return u;
 return currentName?destinationPhoto(currentName):'';
}

function applyIndex(){
 if(!window.DATA?.destinations?.vietnam)return;
 window.DEST_WIKI=window.DEST_WIKI||{};
 window.DEST_WIKI.vietnam=DATA.destinations.vietnam.map(d=>destCanonical(d.name));
 window.VN_DEST_PHOTO_TITLE=DEST;
}

// Journey V0.24 calls window.wikiPhoto with the aligned canonical title array.
const legacyWiki=window.wikiPhoto;
window.wikiPhoto=async function(title){
 let u=await summaryPhoto(title);
 if(!u)u=await strictSearchPhoto(title,'');
 if(u)return u;
 return typeof legacyWiki==='function'?await legacyWiki(title):'';
};

// City hubs / Don't Miss / passport cards use this global hydrator.
window.vnImg=async function(q){
 let current='';try{const x=typeof vnStop==='function'?vnStop():null;current=x?.d?.name||''}catch(e){}
 return relevantPhoto(q,current);
};
window.hydrateVN=function(){
 let current='';try{const x=typeof vnStop==='function'?vnStop():null;current=x?.d?.name||''}catch(e){}
 document.querySelectorAll('[data-vnimg]').forEach(async el=>{
  const q=el.dataset.vnimg||'';const u=await relevantPhoto(q,current);
  if(u){el.style.backgroundImage=`url("${u}")`;el.classList.add('loaded')}
 });
};

applyIndex();
if(window.VN_LIVE_READY&&typeof window.VN_LIVE_READY.then==='function')window.VN_LIVE_READY.then(applyIndex).catch(()=>applyIndex());
})();