/* Vietnam visible-experience curation — 2026-09-12.
 * Keeps the full locked research bank intact in researchExperiences, but surfaces
 * a destination-by-destination set of strong traveller-facing cards.
 * Goal: fewer parser micro-fragments, better category balance, no loss of MUST DO,
 * Unique or Book Ahead items, and less duplication with Food/Drink Passports.
 */
(()=>{
'use strict';
if(window.__VN_QUALITY_CURATION_V1__)return;window.__VN_QUALITY_CURATION_V1__=true;
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ').trim();
const has=(e,t)=>(e.tags||[]).includes(t), flag=(e,t)=>(e.flags||[]).includes(t);
const HARD_DROP=[
 /^try gong$/,/^gong sets?$/,/^dance$/,/^weaving$/,/^carving$/,/^processing$/,/^cupping$/,/^farm visit$/,/^market$/,/^sunrise road$/,/^empty pine morning$/,/^forest plants$/,/^bridge road stops$/,/^trail network explainer$/,/^household meal$/,/^family meal$/,/^local producer$/,/^roadside villages markets$/,/^road as experience$/,/^optional sleep$/,/^possible island stay$/,/^stay in .*$/
];
function weakMicro(e){const q=norm(e.name);return HARD_DROP.some(r=>r.test(q))||q.length<5}
function specificity(e){const q=norm(e.name),words=q.split(' ').filter(Boolean);let s=Math.min(words.length,8)*2;if(/[’'/-]/.test(String(e.name)))s+=2;if(/festival|palace|prison|cave|waterfall|temple|pagoda|village|valley|river|lake|pass|museum|market|farm|weav|coffee|scuba|trek|hike|boat|cycling|martial|battle|citadel|tomb|island|snork|dive|lava|volcano|terrace|homestay/i.test(e.name))s+=8;return s}
function score(e){let s=specificity(e);if(e.tier==='S+')s+=100;else if(e.tier==='S')s+=65;else if(e.tier==='A')s+=20;if(has(e,'Must Do'))s+=90;if(has(e,'Unique'))s+=45;if(has(e,'Book Ahead')||flag(e,'BOOK AHEAD'))s+=38;if(has(e,'History'))s+=28;if(has(e,'Culture'))s+=25;if(has(e,'Outdoors'))s+=24;if(has(e,'Local Life'))s+=16;if(has(e,'Date Watch'))s+=12;if(has(e,'Food'))s+=5;if(has(e,'Drink'))s+=2;if(has(e,'Check'))s+=3;if(weakMicro(e))s-=45;if(/^optional\b|^secondary\b/i.test(String(e.name)))s-=20;if(/investigate locally|verify locally|watch only/i.test(String(e.name)))s-=10;return s}
function family(e){if(has(e,'Must Do'))return'must';if(has(e,'Unique'))return'unique';if(has(e,'History'))return'history';if(has(e,'Culture'))return'culture';if(has(e,'Outdoors'))return'outdoors';if(has(e,'Food'))return'food';if(has(e,'Drink'))return'drink';if(has(e,'Local Life'))return'local';return'other'}
function capFor(name){const q=norm(name);if(/hanoi|hue|hoi an|da nang|da lat|phu yen|quy nhon|cao bang|ha giang|phu quoc|con dao|buon ma thuot|pleiku|kon tum/.test(q))return14;if(/phong nha|ninh binh|sa pa|mu cang chai|hai van|khe sanh|a luoi|mang den|dak nong/.test(q))return12;if(/hang en|pygmy|son doong/.test(q))return8;return10}
function curate(d){const src=(d.experiences||[]).slice();if(!d.researchExperiences)d.researchExperiences=src.slice();const required=src.filter(e=>has(e,'Must Do')||has(e,'Unique')||has(e,'Book Ahead')||flag(e,'BOOK AHEAD')||e.tier==='S+');const chosen=new Set(required);const ranked=src.map((e,i)=>({e,i,s:score(e),f:family(e)})).sort((a,b)=>b.s-a.s||a.i-b.i);
 const targets={history:2,culture:2,outdoors:2,local:1,food:2,drink:1,unique:2,other:1};
 for(const [f,n] of Object.entries(targets)){let count=[...chosen].filter(e=>family(e)===f).length;for(const r of ranked){if(count>=n)break;if(r.f===f&&!chosen.has(r.e)&&r.s>0){chosen.add(r.e);count++}}}
 let cap=Math.max(capFor(d.name),chosen.size);for(const r of ranked){if(chosen.size>=cap)break;if(chosen.has(r.e)||r.s<18)continue;chosen.add(r.e)}
 let out=src.filter(e=>chosen.has(e));
 // Food/drink are fully retained in passports; keep only the strongest visible tasting experiences.
 let food=0,drink=0;out=out.filter(e=>{if(has(e,'Food')&&!has(e,'Must Do')&&!has(e,'Unique')){food++;return food<=2}if(has(e,'Drink')&&!has(e,'Must Do')&&!has(e,'Unique')){drink++;return drink<=1}return true});
 // Do not let the passport trim remove a required item.
 required.forEach(e=>{if(!out.includes(e))out.push(e)});out.sort((a,b)=>src.indexOf(a)-src.indexOf(b));d.experiences=out;
 const foods=out.filter(e=>has(e,'Food')).map(e=>e.name),unique=out.find(e=>has(e,'Unique')),local=out.find(e=>has(e,'Local Life')||has(e,'Culture'));
 d.orientation={...(d.orientation||{}),comeFor:out.slice(0,2).map(e=>e.name).join(' + ')||'The strongest local experiences',doDifferently:local?.name||out[2]?.name||out[0]?.name||'Slow down and go local',eat:foods.slice(0,2).join(' · ')||'Use the Food Passport',wtf:unique?.name||'Find the distinctly local experience',pace:d.stay||'Flexible'};
 return {destination:d.name,before:src.length,after:out.length,removed:src.length-out.length,required:required.length};}
async function run(){await (window.VN_LIVE_READY||Promise.resolve());if(window.VN_REMAINING_CONTENT_AUDIT?.run)await window.VN_REMAINING_CONTENT_AUDIT.run();const list=window.DATA?.destinations?.vietnam||[],rows=[];for(let i=13;i<list.length;i++)rows.push(curate(list[i]));const report={scope:'Vietnam after Nam Du',destinations:rows.length,before:rows.reduce((n,r)=>n+r.before,0),after:rows.reduce((n,r)=>n+r.after,0),removed:rows.reduce((n,r)=>n+r.removed,0),rows};window.VN_QUALITY_CURATION.lastReport=report;return report}
window.VN_QUALITY_CURATION={run,lastReport:null,version:'2026-09-12-v1'};run().catch(err=>console.error('Vietnam quality curation:',err));
})();