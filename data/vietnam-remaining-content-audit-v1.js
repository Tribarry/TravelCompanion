/* Remaining Vietnam grammar/content audit — 2026-09-12.
 * Scope: destinations after Nam Du Islands (Bến Tre → Hà Nội Return).
 * Converts research-note fragments into traveller-facing experience titles,
 * removes planning-only notes that were accidentally parsed as experiences,
 * refreshes weak legacy summaries through the Vietnam V3 copy engine, and
 * rebuilds orientation fields after cleanup. It does not change route order,
 * Saved/Done/Skip/rating keys, stay lengths or the locked source document.
 */
(()=>{
'use strict';
if(window.__VN_REMAINING_CONTENT_AUDIT_V1__)return;window.__VN_REMAINING_CONTENT_AUDIT_V1__=true;
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ').trim();
const weak=s=>!String(s||'').trim()||/locked during the destination deep.research pass/i.test(String(s))||/^part of the locked (food|drink) passport/i.test(String(s));

const DROP=[
 /^ho may not required$/,
 /^commercial cong troi dong giang not required$/,
 /^historic trail exploration only with legitimate guide and uxo warning$/,
 /^northern vietnam on 50cc remains off the plan$/,
 /^border access check 2027$/,
 /^border area recheck 2027$/,
 /^guide homestay book ahead$/,
 /^avoid mass party cruise$/,
 /^weather trail status flags$/,
 /^food passport focuses on /,
 /^remote road fuel plan weather uxo$/,
 /^joke you drank fish sauce badge$/
];

const FIXES=[
 [/^fishing boat experience investigate$/i,'Fishing-boat experience — investigate locally'],
 [/^pearl cultivation investigate$/i,'Pearl cultivation — investigate locally'],
 [/^dugong luck only$/i,'Dugong sighting — luck only'],
 [/^bay canh turtle conservation experience seasonal$/i,'Bảy Cạnh turtle-conservation experience'],
 [/^optional bu gia map national park$/i,'Bù Gia Mập National Park — optional'],
 [/^cashew wine investigate$/i,'Cashew wine — investigate locally'],
 [/^cascara style drink verify$/i,'Cascara-style coffee drink — verify locally'],
 [/^camping options verify$/i,'Camping options — verify locally'],
 [/^ngoc linh ginseng tourism.*$/i,'Ngọc Linh ginseng tourism'],
 [/^village homestay find$/i,'Bh’noong village homestay — find locally'],
 [/^co tu festival.*$/i,'Cơ Tu festival'],
 [/^a da koonh new rice culture.*$/i,'A Da Koonh / New Rice culture'],
 [/^a luoi mountain festival.*$/i,'A Lưới Mountain Festival'],
 [/^khe sanh coffee festival 2027.*$/i,'Khe Sanh Coffee Festival 2027'],
 [/^cau ngu whale festival.*$/i,'Cầu Ngư / whale festival'],
 [/^get open water scuba licence in vietnam.*$/i,'Open Water scuba certification in Nha Trang'],
 [/^keep qualifying dives and first post cert dive$/i,'Qualifying dives + first post-certification dive'],
 [/^po nagar festival.*$/i,'Po Nagar Festival'],
 [/^optional golden bridge ba na as commercial wtf only$/i,'Golden Bridge / Bà Nà Hills — optional commercial WTF stop'],
 [/^avocado coffee if a good local example exists$/i,'Avocado coffee — only if a good local example exists'],
 [/^hue lang co scuba.*$/i,'Huế / Lăng Cô scuba — watch only'],
 [/^optional gia long tombs$/i,'Gia Long Tomb — optional'],
 [/^legal access watch for abandoned waterpark$/i,'Abandoned waterpark — access watch only'],
 [/^festival hue 2027.*$/i,'Festival Huế 2027'],
 [/^overnight verify$/i,'Overnight in Bạch Mã — verify availability'],
 [/^longer trek.*$/i,'Longer Bạch Mã trek'],
 [/^hang tam co if not already visited$/i,'Hang Tám Cô / Eight Ladies Cave — if not already visited'],
 [/^nguom puc cave save access check$/i,'Ngườm Pục Cave — access check'],
 [/^easy rider.*$/i,'Hà Giang Easy Rider'],
 [/^paragliding date season watch$/i,'Khau Phạ paragliding — date / season watch'],
 [/^bamboo forest secondary$/i,'Bamboo forest — secondary'],
 [/^train street only if legitimate access$/i,'Train Street — only with legitimate access']
];

function stripDirectives(name){
 let t=String(name||'').replace(/\*\*/g,'').replace(/`/g,'').replace(/\s+/g,' ').trim();
 t=t.replace(/\s*=\s*(?:must do|date watch|watch 2027|book ahead|must do\s*\/\s*date watch.*|must do\s*\/\s*book ahead.*).*$/i,'');
 t=t.replace(/\s+—\s+(?:must do|book ahead|date watch|life-list|long-lead booking)(?:\s*\/\s*[^—]+)?$/i,'');
 t=t.replace(/\s+\+\s+(?:date watch|book ahead)$/i,'');
 t=t.replace(/\s+date watch$/i,'');
 t=t.replace(/\s+watch 2027$/i,'');
 t=t.replace(/\s+verify operating$/i,' — verify operating');
 t=t.replace(/\s+verify$/i,' — verify locally');
 t=t.replace(/\s*\/\s*/g,' / ');
 t=t.replace(/\s+([,.;:])/g,'$1').trim();
 return t;
}
function fixedTitle(name){
 const stripped=stripDirectives(name),q=norm(stripped);
 for(const [rx,to] of FIXES)if(rx.test(q))return to;
 if(/night squid fishing remains a book ahead option/i.test(stripped))return'Night squid fishing';
 if(/buon ma thuot coffee festival 2027/i.test(norm(name)))return'Buôn Ma Thuột Coffee Festival 2027';
 if(/bo y indochina tri border marker/i.test(q))return'Bờ Y Indochina tri-border marker — optional access check';
 if(/starfish beach wildlife rule/i.test(q))return'Starfish Beach — wildlife-safe visit';
 if(/bai nhat disappearing beach/i.test(q))return'Bãi Nhát disappearing beach';
 if(/dam trau planes/i.test(q))return'Đầm Trầu Beach + low-flying planes';
 if(/hue lang co scuba/i.test(q))return'Huế / Lăng Cô scuba — watch only';
 return stripped;
}
function shouldDrop(name){const q=norm(name);return DROP.some(rx=>rx.test(q))}
function sentence(s){const t=String(s||'').trim().replace(/\s+/g,' ');return t&&!/[.!?]$/.test(t)?t+'.':t}
function enrichSummary(d,e){
 try{
  if(window.TC1VietnamExperienceContent?.enrich){const x=window.TC1VietnamExperienceContent.enrich(d,{title:e.name,name:e.name,raw:e,tags:e.tags||[]});if(x?.summary)return sentence(x.summary)}
 }catch(_e){}
 return sentence(e.summary)||`Explore ${e.name} in ${d.name} with enough time to understand why it belongs in this stop.`;
}
function addTag(e,tag){e.tags=e.tags||[];if(!e.tags.includes(tag))e.tags.push(tag)}
function addFlag(e,flag){e.flags=e.flags||[];if(!e.flags.includes(flag))e.flags.push(flag)}
function inferAfterFix(e,oldName){
 const q=norm(oldName+' '+e.name);
 if(/date watch|watch 2027|festival hue|co tu festival|a luoi mountain festival|khe sanh coffee festival|cau ngu whale festival|po nagar festival|paragliding/.test(q)){addTag(e,'Date Watch');addFlag(e,'DATE WATCH')}
 if(/book ahead|open water scuba|qualifying dives|night squid fishing|longer bach ma trek|easy rider/.test(q)){addTag(e,'Book Ahead');addFlag(e,'BOOK AHEAD');if(e.booking==='No advance booking noted')e.booking='Book ahead'}
 if(/access|uxo|border/.test(q))addTag(e,'Check');
 if(/open water scuba|qualifying dives/.test(q))addTag(e,'Outdoors');
}
function auditDestination(d){
 const before=(d.experiences||[]).length,out=[],seen=new Set();let dropped=0,renamed=0,summaryFixed=0;
 for(const original of (d.experiences||[])){
  const e={...original,tags:[...(original.tags||[])],flags:[...(original.flags||[])]};const old=e.name||e.title||'';
  if(shouldDrop(old)){dropped++;continue}
  e.name=fixedTitle(old);if(e.name!==old)renamed++;
  if(!e.name||shouldDrop(e.name)){dropped++;continue}
  const key=norm(e.name);if(seen.has(key)){dropped++;continue}seen.add(key);
  inferAfterFix(e,old);
  if(weak(e.summary)){e.summary=enrichSummary(d,e);summaryFixed++}else e.summary=sentence(e.summary);
  out.push(e);
 }
 d.experiences=out;
 const food=out.filter(e=>(e.tags||[]).includes('Food')).map(e=>e.name),unique=out.find(e=>(e.tags||[]).includes('Unique')),local=out.find(e=>(e.tags||[]).includes('Local Life')||(e.tags||[]).includes('Culture'));
 d.orientation={...(d.orientation||{}),comeFor:out.slice(0,2).map(e=>e.name).join(' + ')||'The strongest local experiences',doDifferently:local?.name||out[2]?.name||out[0]?.name||'Slow down and go local',eat:food.slice(0,2).join(' · ')||'Local food passport',wtf:unique?.name||'Find the distinctly local experience',pace:d.stay||'Flexible'};
 d.context=sentence(d.context||d.summary||'');d.summary=d.context;
 return {destination:d.name,before,after:out.length,dropped,renamed,summaryFixed};
}
async function run(){
 await (window.VN_LIVE_READY||Promise.resolve());const list=window.DATA?.destinations?.vietnam||[],rows=[];
 for(let i=13;i<list.length;i++)rows.push(auditDestination(list[i]));
 window.VN_REMAINING_CONTENT_AUDIT.lastReport={scope:'Vietnam destinations after Nam Du',destinations:rows.length,before:rows.reduce((n,r)=>n+r.before,0),after:rows.reduce((n,r)=>n+r.after,0),dropped:rows.reduce((n,r)=>n+r.dropped,0),renamed:rows.reduce((n,r)=>n+r.renamed,0),summaryFixed:rows.reduce((n,r)=>n+r.summaryFixed,0),rows};
 return window.VN_REMAINING_CONTENT_AUDIT.lastReport;
}
window.VN_REMAINING_CONTENT_AUDIT={run,lastReport:null,version:'2026-09-12-v1'};
run().catch(err=>console.error('Vietnam remaining content audit:',err));
})();
