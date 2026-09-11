/* Vietnam Batch 1 — Cái Bè / Tân Phong production pass.
 * Presentation-only enrichment over the locked Vietnam bank.
 * Preserves route order, experience IDs, Saved/Done/Skip, ratings and current location.
 */
(()=>{
'use strict';

const DEST='Cái Bè / Tân Phong';
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ').trim();
const pendingSvg=()=>`data:image/svg+xml;charset=UTF-8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900"><rect width="1400" height="900" fill="#17191d"/><path d="M0 760L430 420l230 210 210-180 530 450H0z" fill="#22252b"/><text x="70" y="110" fill="#d96f49" font-family="Arial,sans-serif" font-size="25" font-weight="700" letter-spacing="4">PHOTO TO VERIFY</text><text x="70" y="158" fill="#a8a9ae" font-family="Arial,sans-serif" font-size="22">Exact reusable image not approved yet</text></svg>')}`;
const PENDING=pendingSvg();
const commons=file=>`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=1400`;

const HERO=commons('Sông Cái Bè.jpg');
const IMG={
 tanPhong:commons('Tân Phong, Cai Lậy, Tiền Giang, Vietnam - panoramio (21).jpg'),
 water:commons('Vietnam 08 - 118 - Cai Be on the water (3185052919).jpg'),
 ferry:commons('Bateaux de transport (Cai Be, Vietnam) (6654160317).jpg'),
 dongHoaHiep:commons('Đông Hòa Hiệp, Cái Bè, Tiền Giang, Vietnam - panoramio (15).jpg'),
 baDuc:commons('Ba Duc (Dong Hoa Hiep, Vietnam) (6654194639).jpg'),
 gardenHouse:commons('Nha vuon at Tan Phong island, Cai Lay district, Tien Giang, Vietnam - panoramio.jpg'),
 ricePaper:commons('Fabrication des galettes de riz (Cai Be, Vietnam) (6653086945).jpg'),
 orchard:commons('A Spondias dulcis farm, Hòa Khánh commune, Cái Bè district, Tiền Giang, Vietnam, February 2022.jpg'),
 music:commons('Mô hình đờn ca tài tử.jpg'),
 sunrise:commons('Marché flottant (Cai Be, Vietnam) (6654161659).jpg'),
 market:commons('A small market, Hậu Mỹ Bắc A commune, Cái Bè district, Tiền Giang, Vietnam, February-2022.jpg')
};

const R=(re,x)=>({re,...x});
const P=[
R(/tan phong cycling|tân phong cycling|cycling.*tan phong|cycling.*tân phong/,{title:'Tân Phong Island by Bicycle',area:'Tân Phong Island',summary:'Ride narrow orchard lanes, cross tiny bridges and move at the pace of island life rather than seeing the Mekong only from a tour boat. The bicycle is the point: it lets you stop for fruit, workshops and whatever is happening along the lane.',action:'Take a simple bike for a slow loop, stop at orchards or household workshops that are genuinely open, use local ferries where they fit and leave room for wrong turns.',time:'2–4 hr',cost:'Est. A$5–20',booking:'Usually flexible; arrange a bike locally',best:'Morning before the heat',photo:IMG.tanPhong,must:true}),
R(/sampan canal|sampan|canal boat/,{title:'Sampan Through the Orchard Canals',area:'Cái Bè / Tân Phong canals',summary:'Slip away from the wider Tiền River into the narrow, shaded canals that make this part of the Delta feel intimate. Small boats, low bridges, orchards and houses at the water’s edge are much more atmospheric than a rushed big-boat circuit.',action:'Choose a small sampan or rowboat, keep the ride unhurried and combine it with an island stop rather than treating the canal as a ten-minute transfer.',time:'1–2 hr',cost:'Est. A$5–20',booking:'Usually flexible; easiest through a homestay or local boat operator',best:'Early morning or late afternoon',photo:IMG.water,must:true}),
R(/local ferry|ferry/,{title:'Cross the River on a Local Ferry',area:'Tiền River crossings',summary:'Use an ordinary local ferry as part of the day rather than only paid sightseeing boats. Motorbikes, bicycles, produce and families crossing the river give a better sense of how the islands actually connect.',action:'Bring the bicycle if you have one, cross with local traffic and build the ferry into a cycling or village loop instead of riding it out and straight back.',time:'15–40 min per crossing',cost:'Est. under A$2 per crossing',booking:'No advance booking expected',best:'Daylight',photo:IMG.ferry}),
R(/dong hoa hiep|đông hòa hiệp/,{title:'Đông Hòa Hiệp Ancient Village',area:'Đông Hòa Hiệp',summary:'Walk or cycle through one of the Delta’s best-known garden-house areas, where old timber homes sit behind orchards and canals shaped by Cái Bè’s river-trading history. The village works best as a slow landscape, not one building to photograph.',action:'Link the old houses on foot or by bicycle, follow the small lanes between them and spend time in the gardens so the architecture stays connected to everyday rural life.',time:'2–3 hr',cost:'Est. A$0–10 plus any house entry',booking:'Usually flexible; individual houses may keep their own hours',best:'Morning',photo:IMG.dongHoaHiep}),
R(/ba duc/,{title:'Ba Đức Ancient House',area:'Đông Hòa Hiệp',summary:'Step inside a historic garden house that mixes southern Vietnamese domestic traditions with French colonial-era details. Its raised structure, timber interior and orchard setting make the house more interesting than a quick façade photo.',action:'Look through the main rooms, ancestral space and garden, then continue into Đông Hòa Hiệp so Ba Đức becomes part of the wider village story.',time:'45–75 min',cost:'Est. A$0–10',booking:'Check local access on the day',best:'Morning or early afternoon',photo:IMG.baDuc}),
R(/ong xoat|ông xoát|ong xoát|ông xoat/,{title:'Ông Xoát Heritage House',area:'Đông Hòa Hiệp',summary:'Add a second traditional house only if it is genuinely accessible when you visit. Seeing more than one home makes the differences in layout, timberwork, gardens and family history easier to notice.',action:'Confirm access locally, visit respectfully and compare the house with Ba Đức rather than repeating the same photo-stop routine.',time:'30–60 min',cost:'Est. A$0–10',booking:'ACCESS CHECK · confirm locally',best:'Daytime',photo:PENDING}),
R(/heritage.*overnight|garden house.*overnight|overnight.*garden|homestay/,{title:'Sleep in a Mekong Garden House',area:'Tân Phong / Đông Hòa Hiệp',summary:'Stay overnight among orchards and canals so Cái Bè changes from a day trip into a lived-in Delta stop. The best part is the quiet evening and early morning after excursion boats have gone.',action:'Choose a small garden-house or family homestay, arrive with time for a walk or cycle, eat dinner there and get up early for the river or market before moving on.',time:'Overnight',cost:'Est. A$25–60 including some meals',booking:'Book a few days ahead for a preferred small homestay',best:'One full evening + early morning',photo:IMG.gardenHouse,must:true}),
R(/make com|make cốm|com workshop|cốm/,{title:'Make Cốm at a Family Workshop',area:'Cái Bè countryside',summary:'See how a local rice-based snack is made instead of only buying a packet at the end of a tour. The worthwhile version is hands-on and small-scale, with the host explaining the process from raw ingredient to finished snack.',action:'Arrange it through a homestay or household workshop, watch the full process and try a step yourself only when invited.',time:'45–90 min',cost:'Est. A$3–15',booking:'Arrange locally; household availability varies',best:'Daytime',photo:PENDING}),
R(/banh trang|bánh tráng|rice paper/,{title:'Make Bánh Tráng',area:'Cái Bè',summary:'Watch rice batter become paper-thin bánh tráng over a steaming cloth, then see the sheets transferred to bamboo racks to dry. It is a simple process that becomes much more impressive when you try the timing yourself.',action:'Visit a working household or cooperative, watch the steaming and drying sequence and try spreading or lifting one sheet if the maker invites you.',time:'45–90 min',cost:'Est. A$3–15',booking:'Usually easiest through a local guide or homestay',best:'Morning while production is active',photo:IMG.ricePaper}),
R(/banh phong sua|bánh phồng sữa|phong sua|phồng sữa/,{title:'See Bánh Phồng Sữa Being Made',area:'Cái Bè',summary:'Track another Delta cottage-food process from mixing and shaping through drying or finishing. This belongs in the itinerary only when you can see real production rather than being walked through a souvenir shop.',action:'Ask where production is actually happening that day, watch the process before tasting and skip it if the stop has become purely retail.',time:'30–75 min',cost:'Est. A$3–15',booking:'VERIFY OPERATING · household production varies',best:'Morning',photo:PENDING}),
R(/tat muong|tát mương|bat ca|bắt cá|catch fish/,{title:'Tát Mương Bắt Cá — Drain the Ditch & Catch Fish',area:'Orchard / farm household',summary:'Get muddy in one of the Delta’s most hands-on rural activities: lowering water in a small orchard ditch and trying to catch fish by hand or with simple local tools. It is playful, physical and far more memorable than another passive demonstration.',action:'Do it only with a household that actually offers the activity responsibly, wear clothes you can destroy, help catch the fish and stay for the cooking or meal if that is part of the experience.',time:'1–2 hr',cost:'Est. A$5–20',booking:'Arrange ahead with a homestay or farm; seasonal/household dependent',best:'Warm daylight; conditions dependent',photo:PENDING}),
R(/orchard work|orchard|fruit farm/,{title:'Work an Orchard with a Local Family',area:'Cái Bè orchard country',summary:'Cái Bè makes more sense when you spend time among the fruit trees that support the islands’ economy. A useful visit means learning what is in season, how the orchard is managed and helping with a real task if the family is comfortable with it.',action:'Ask what work is actually happening that week, help pick, carry, prune or sort only where appropriate, then taste fruit in season rather than expecting a staged harvest.',time:'1–2 hr',cost:'Est. A$3–15',booking:'Arrange locally; activity depends on season and farm work',best:'Morning',photo:IMG.orchard}),
R(/don ca tai tu|đờn ca tài tử|tai tu/,{title:'Đờn Ca Tài Tử Evening',area:'Homestay / local household',summary:'Hear southern Vietnam’s chamber-music tradition in the region where it developed, ideally in a small social setting rather than a stage show built around tourists. The instruments, improvised feel and conversation around the music matter as much as the performance.',action:'Ask your host whether a genuine local performance is available, listen without treating it as background entertainment and let the musicians explain the instruments or songs if they want to.',time:'1–2 hr',cost:'Est. A$5–20 contribution',booking:'Availability varies; arrange through a local host',best:'Evening',photo:IMG.music}),
R(/sunrise river|sunrise.*tien|sunrise/,{title:'Sunrise on the Tiền River',area:'Cái Bè waterfront / river',summary:'Get onto the river before the day heats up, when boats, river traffic and low light make the Delta feel completely different from midday. This is about atmosphere and working river life, not promising a huge floating market.',action:'Start before or around sunrise, walk the waterfront or take a short local boat ride and watch the first river traffic without building the morning around an outdated floating-market expectation.',time:'45–90 min',cost:'Free on foot · boat extra',booking:'No booking on foot; arrange a boat the night before if wanted',best:'Sunrise',photo:IMG.sunrise}),
R(/cai be morning market|cái bè morning market|morning market/,{title:'Cái Bè Morning Market',area:'Cái Bè town',summary:'Use the morning market for the everyday version of Cái Bè: produce, breakfast, household shopping and local trade before the day becomes quieter. It is a better reality check than chasing the old image of an enormous floating market.',action:'Go early, walk the food and produce sections, eat breakfast nearby and photograph people only after reading the mood or asking.',time:'1–2 hr',cost:'Free to browse · Est. A$2–8 to eat',booking:'No advance booking',best:'Early morning',photo:IMG.market}),
R(/hammock coffee|hammock.*coffee|coffee.*hammock/,{title:'Hammock Coffee in the Gardens',area:'Tân Phong / orchard lanes',summary:'Do almost nothing for an hour: order a Vietnamese coffee, drop into a hammock and let the orchard-and-canal pace take over. This is deliberately included as slow-travel time rather than another attraction.',action:'Pick a simple roadside or garden café that locals are using, order coffee or fresh juice and stay long enough that the stop actually slows the day down.',time:'45–90 min',cost:'Est. A$1–5',booking:'No advance booking',best:'Hot part of the afternoon',photo:PENDING}),
R(/family dinner|dinner.*family/,{title:'Family Dinner at the Homestay',area:'Garden-house homestay',summary:'Finish the day around a home-cooked meal instead of travelling back to a city for dinner. The value is eating what the household normally cooks, sharing several dishes and having unstructured time with your hosts.',action:'Tell the host about dietary needs in advance, help with preparation if invited and keep the evening open rather than scheduling another organised activity afterwards.',time:'1.5–2.5 hr',cost:'Est. A$5–15 or included with stay',booking:'Arrange with the homestay earlier that day',best:'Evening',photo:PENDING})
];

function match(item,base){
 const q=norm([item?.title,item?.name,item?.raw?.raw,base?.title].filter(Boolean).join(' '));
 return P.find(x=>x.re.test(q))||null;
}

const priorEnrich=window.TC1ExperienceCopy?.enrich;
if(typeof priorEnrich==='function'){
 window.TC1ExperienceCopy.enrich=function(countryId,destination,item){
  const base=priorEnrich(countryId,destination,item);
  if(countryId!=='vietnam'||destination?.name!==DEST)return base;
  const x=match(item,base);if(!x)return base;
  const {re,must,...polish}=x;
  const tags=must?[...new Set([...(base.tags||[]),'Must Do'])]:(base.tags||[]);
  return {...base,...polish,tags,why:polish.summary,photoReady:polish.photo!==PENDING,contentSource:'cai-be-curated-v1'};
 };
}

const priorRaterPhoto=window.TC1RaterPhoto;
window.TC1RaterPhoto=function(countryId,destination,item){
 if(countryId==='vietnam'&&destination?.name===DEST){const x=match(item,item);return x?.photo||PENDING;}
 return typeof priorRaterPhoto==='function'?priorRaterPhoto(countryId,destination,item):'';
};

const priorHydrate=window.hydrateVN;
window.hydrateVN=function(){
 document.querySelectorAll('[data-vnimg]').forEach(el=>{
  const label=(el.dataset.vnimg||el.dataset.label||'').trim();
  let photo='';
  if(norm(label)===norm(DEST))photo=HERO;
  else{const x=match({title:label},{title:label});if(x)photo=x.photo||PENDING;}
  if(photo){el.style.setProperty('background-image',`url("${photo}")`,'important');el.style.setProperty('background-size','cover','important');el.style.setProperty('background-position','center','important');el.classList.add('loaded');el.removeAttribute('data-vnimg');}
 });
 if(typeof priorHydrate==='function')priorHydrate();
};

function hydrateDetail(){
 const hero=document.querySelector('.tc1DetailHero');if(!hero)return;
 const scope=hero.querySelector('.tc1Scope')?.textContent||'';if(!norm(scope).includes(norm(DEST)))return;
 const title=hero.querySelector('h1')?.textContent||'',x=match({title},{title});if(!x)return;
 const photo=x.photo||PENDING;
 hero.classList.add('tc1CaiBeDetailPhoto');
 hero.style.setProperty('background-image',`linear-gradient(180deg,rgba(0,0,0,.18),rgba(0,0,0,.34) 40%,rgba(0,0,0,.92) 100%),url("${photo}")`,'important');
 hero.style.setProperty('background-size','cover','important');hero.style.setProperty('background-position','center','important');
}

if(!document.getElementById('tc1CaiBePhotoCss')){
 const st=document.createElement('style');st.id='tc1CaiBePhotoCss';st.textContent='.tc1CaiBeDetailPhoto{min-height:390px!important;position:relative!important;overflow:hidden!important}.tc1CaiBeDetailPhoto .tc1Top,.tc1CaiBeDetailPhoto .tc1DetailTitle{position:relative!important;z-index:2!important}.tc1CaiBeDetailPhoto .tc1DetailTitle{margin-top:auto!important;padding-top:150px!important}';document.head.appendChild(st);
}
const mo=new MutationObserver(()=>{hydrateDetail();});mo.observe(document.documentElement,{childList:true,subtree:true});
setTimeout(()=>{try{window.hydrateVN();hydrateDetail()}catch(e){}},0);

window.TC1_CAI_BE_V1={destination:DEST,count:P.length,hero:HERO,match,version:'2026-09-11-b1'};
})();
