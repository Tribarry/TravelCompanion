const fs=require('fs');
const vm=require('vm');
global.window=global;
vm.runInThisContext(fs.readFileSync('data/vietnam-experience-content-v3.js','utf8'),{filename:'vietnam-experience-content-v3.js'});
const V=global.TC1VietnamExperienceContent;
if(!V)throw new Error('Vietnam V3 content layer missing');
if(V.profileCount<59)throw new Error('Expected profiles for all runtime Vietnam destinations; got '+V.profileCount);
if(V.exactRuleCount<90)throw new Error('Exact-content rule bank unexpectedly small: '+V.exactRuleCount);

const md=fs.readFileSync('docs/VIETNAM_LOCKED_EXPERIENCE_BANK_2027.md','utf8');
const body=md.split('# MUST-DO ADDITIONS FOUND DURING RESEARCH')[0];
const sections=[];
const re=/^##\s+(.+?)\s+—\s+LOCKED[^\n]*\n([\s\S]*?)(?=\n##\s+|\n#\s+|$)/gm;
let m;
while((m=re.exec(body))){
  const name=m[1].trim();
  const raw=m[2].trim().replace(/\n+/g,' ');
  if(raw)sections.push({name,raw});
}
function clean(s){return String(s||'').replace(/\*\*/g,'').replace(/`/g,'').replace(/\s+/g,' ').trim()}
function titleSummary(raw){
  const text=clean(raw);let title=text;
  const dash=text.split(/\s+[—–]\s+/);if(dash.length>1)title=dash.shift();
  else if(text.includes(':')&&text.indexOf(':')<65)title=text.split(':').shift();
  else if(text.length>95){const cut=text.lastIndexOf(' ',78);title=text.slice(0,cut>30?cut:78)+'…'}
  return clean(title);
}
function explode(raw){
  const text=clean(raw).replace(/\.\s+(Drinks?|Food\/WTF|Food|Drink):/g,'; $1:').replace(/\.\s+(Keep|Avoid|Commercial|Current)/g,'; $1');
  const chunks=text.split(/\s*;\s*/).map(clean).filter(Boolean),out=[];
  for(const chunk of chunks){
    const fm=chunk.match(/^(Food\/WTF|Food|Drinks?|Drink):\s*(.+)$/i);
    if(fm){
      fm[2].split(/,\s+(?![^()]*\))/).map(clean).filter(Boolean).forEach(x=>out.push({title:x,raw:x}));
    }else out.push({title:titleSummary(chunk),raw:chunk});
  }
  return out;
}

const banned=[/locked during the destination deep-research pass/i,/part of the locked (food|drink) passport/i,/treat .* as a nature experience first/i,/spend time with .* as part of/i];
let records=0,exactHits=0;
const short=[];
for(const s of sections){
  for(const it of explode(s.raw)){
    records++;
    const dest={name:s.name,context:''};
    const raw={raw:it.raw,tags:[]};
    const x=V.enrich(dest,{title:it.title,raw});
    if(V.ruleFor(it.title,raw))exactHits++;
    if(!x.summary||x.summary.length<105)short.push(`${s.name} / ${it.title} / summary ${x.summary?.length||0}`);
    if(!x.action||x.action.length<55)short.push(`${s.name} / ${it.title} / action ${x.action?.length||0}`);
    for(const b of banned)if(b.test(x.summary)||b.test(x.action))throw new Error(`Banned generic copy: ${s.name} / ${it.title}`);
    if(x.source!=='vietnam-v3')throw new Error(`Wrong source for ${s.name} / ${it.title}: ${x.source}`);
  }
}
if(records<350)throw new Error('Parsed too few canonical Vietnam experience records: '+records);
if(exactHits<40)throw new Error('Too few exact high-value content matches: '+exactHits);
if(short.length)throw new Error('Content too short:\n'+short.slice(0,20).join('\n'));

const runtimeDestinations=[
'Ho Chi Minh City','Cái Bè / Tân Phong','Sa Đéc','Cần Thơ','Long Xuyên','Châu Đốc / Núi Sam','Trà Sư','Tịnh Biên / Tri Tôn','Bạc Liêu','Hà Tiên','Kiên Lương','Rạch Giá','Nam Du Islands','Bến Tre','Trà Vinh','Vĩnh Long / Mang Thít','Phú Quốc','Côn Đảo','Vũng Tàu','Đồng Xoài / Bình Phước','Gia Nghĩa / Đắk Nông','Đà Lạt','Buôn Ma Thuột / Đắk Lắk','Lắk Lake','Yok Đôn / Buôn Đôn','Pleiku / Gia Lai','Kon Tum','Măng Đen','Khâm Đức / Phước Sơn','Prao / Đông Giang','A Lưới / A Shau Valley','Khe Sanh','Western Ho Chi Minh Road','Quy Nhơn','Phú Yên / Tuy Hòa','Nha Trang','Hội An','Đà Nẵng','Hải Vân / Lăng Cô','Huế','Bạch Mã','Phong Nha / Quảng Bình','Hang Én','Pygmy / Hung Thoong','Sơn Đoòng','Ninh Bình','Pù Luông','Hà Nội','Hạ Long / Lan Hạ Bay','Cát Bà','Ba Bể','Cao Bằng','Hà Giang Loop','Hoàng Su Phì','Mù Cang Chải','Y Tý','Bắc Hà','Sa Pa','Hà Nội Return'];
for(const d of runtimeDestinations){
  const l=V.lens({name:d});
  if(!l||/^the local story of/i.test(l))throw new Error('No destination-specific profile for '+d);
  const sample=V.enrich({name:d},{title:'Local neighbourhood walk',raw:{raw:'Local neighbourhood walk',tags:[]}});
  if(sample.summary.length<105)throw new Error('Runtime destination fallback too short for '+d);
}

const exactMustDo=['War Remnants Museum','Cái Răng before dawn','Ghositaram Temple','Datanla canyoning','Yok Đôn ethical elephant experience — no riding/touching/tricks','A Bia/Hamburger Hill','Khe Gát secret airfield','GET OPEN WATER SCUBA LICENCE IN VIETNAM','Mỹ Sơn sanctuary at opening','Imperial City','Hang Én','Sơn Đoòng','Hang Múa','Temple of Literature','Hospital Cave','Bản Giốc','Nho Quế River','Mã Pí Lèng Sky Path','Lùng Tám hemp weaving','Tả Phìn Red Dao herbal bath'];
for(const t of exactMustDo)if(!V.ruleFor(t,{raw:t}))throw new Error('Missing exact must-do copy rule: '+t);

const report=`# Vietnam Experience Content V3 Audit\n\n- Runtime destination profiles: **${V.profileCount}** (required: all 59 Vietnam stops).\n- Canonical locked-bank records exercised through the V3 writer: **${records}**.\n- High-value exact-content matches in the canonical bank audit: **${exactHits}**.\n- Exact rule bank: **${V.exactRuleCount}** named/high-value patterns.\n- Every audited record returns a readable summary and a concrete “what you’ll actually do” action.\n- Previous placeholder/generic fallback phrases are rejected by the audit.\n- HCMC’s separately curated exact catalogue remains allowed to override V3 where it has a stronger exact match.\n- Route order, locked-bank membership, Saved/Done/Skip, ratings and current-location semantics are not changed by this content pass.\n- This is a copy-quality/coverage audit, **not** verification of 2027 opening hours, prices, transport, border access or weather. Those remain operational checks.\n`;
fs.writeFileSync('docs/VIETNAM_EXPERIENCE_CONTENT_V3_AUDIT.md',report);
console.log(`VIETNAM V3 CONTENT PASS: ${runtimeDestinations.length} destinations / ${records} canonical records / ${exactHits} exact hits`);
