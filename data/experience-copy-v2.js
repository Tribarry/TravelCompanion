/* Travel Companion — experience copy normaliser.
 * Purpose: every experience must have enough written context to rate it.
 * Photography is all-or-nothing at experience level: disabled until a country
 * has a complete, approved exact-photo manifest. Destination/country hero art
 * is unaffected.
 */
(()=>{
'use strict';

window.TC1_EXPERIENCE_PHOTO_COMPLETE={
  vietnam:false,
  laos:false,
  cambodia:false,
  thailand:false,
  kazakhstan:false,
  kyrgyzstan:false
};

const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const sentence=s=>{s=String(s||'').trim().replace(/\s+/g,' ');if(!s)return'';return /[.!?]$/.test(s)?s:s+'.'};
const weak=(summary,title)=>{
  const s=norm(summary),t=norm(title);
  return !s || s===t || s===t+' ' || /locked during the destination deep research pass/.test(s) || /part of the locked (food|drink) passport/.test(s) || s.length<24;
};

function findHcm(title){
  if(!Array.isArray(window.HCM_V21_EXPERIENCES))return null;
  const n=norm(title);
  let best=null,score=0;
  for(const x of window.HCM_V21_EXPERIENCES){
    const q=norm(x.title);if(!q)continue;
    let v=0;if(n===q)v=100;else if(n.includes(q)||q.includes(n))v=70;else{
      const a=new Set(n.split(' ')),b=new Set(q.split(' '));let hit=0;b.forEach(w=>{if(w.length>3&&a.has(w))hit++});v=hit;
    }
    if(v>score){score=v;best=x}
  }
  return score>=2?best:null;
}

function category(title,tags,raw){
  const q=norm([title,...(tags||[]),raw?.type||''].join(' '));
  if(/cave|caving|hang en|son doong|pygmy|hung thoong/.test(q))return'cave';
  if(/waterfall|falls|cascade/.test(q))return'waterfall';
  if(/market|bazaar|cho |floating market/.test(q))return'market';
  if(/temple|pagoda|church|cathedral|mosque|shrine|spiritual|monastery/.test(q))return'spiritual';
  if(/museum|palace|citadel|tomb|heritage|history|war|dmz|prison|tunnel|commando|colonial|ancient|ruin/.test(q))return'history';
  if(/coffee|cafe|phin|roast/.test(q))return'coffee';
  if(/food|seafood|meal|cooking|dish|street food|night market|snail|sauce|eat/.test(q))return'food';
  if(/homestay|yurt|family stay|village stay/.test(q))return'homestay';
  if(/cycle|cycling|bicycle|bike ride/.test(q))return'cycling';
  if(/boat|sampan|kayak|cruise|river|canal|ferry|floating/.test(q))return'water';
  if(/snorkel|diving|marine|coral|beach|island hop|swim/.test(q))return'marine';
  if(/hike|trek|walking|walk|viewpoint|mountain|pass|peak|summit|terrace|volcano/.test(q))return'active';
  if(/wildlife|bird|elephant|bat|crocodile|forest|mangrove|national park/.test(q))return'nature';
  if(/village|minority|ethnic|khmer|bahnar|mnong|m nong|co tu|dao|hmong|tay|nung|local life|craft|weaving|workshop/.test(q))return'culture';
  if(/road|route|loop|backroad|back road|journey|scenery|landscape/.test(q))return'journey';
  return'local';
}

function generatedSummary(title,destination,tags,raw){
  const c=category(title,tags,raw),name=String(title||'this experience').trim(),place=String(destination?.name||'this stop').trim();
  const by={
    cave:`Go beyond the entrance and experience ${name} as a cave journey, allowing enough time for the underground landscape, access conditions and the route in and out rather than treating it as a quick photo stop.`,
    waterfall:`Spend time at ${name} for the surrounding landscape as well as the falls themselves. Conditions can change with rainfall, so keep the timing flexible and check local access before setting out.`,
    market:`Walk through ${name} while it is functioning as a real local market. Focus on produce, food, trade and everyday routines instead of treating it as a souvenir stop.`,
    spiritual:`Visit ${name} for its religious, architectural and local cultural context. Dress and behave respectfully, and allow time to observe the site rather than only photographing it.`,
    history:`Use ${name} to understand the history behind ${place}. Give the visit enough time for interpretation and context instead of reducing it to a landmark photo.`,
    coffee:`Use ${name} to understand the local coffee culture: how coffee is grown, prepared or served here, and why it matters to the destination rather than simply stopping for a drink.`,
    food:`Make ${name} an eating experience rather than a checklist item. Try the local version, notice how and where it is served, and use it to understand the food culture of ${place}.`,
    homestay:`Stay long enough for ${name} to change the pace of the trip: eat locally, spend time with the host community and experience the area outside day-trip hours.`,
    cycling:`Explore ${name} at bicycle pace, using smaller roads and neighbourhoods that are easy to miss from a bus or car. Stop when something is interesting rather than riding it as a race.`,
    water:`Experience ${name} from the water, paying attention to the communities, landscapes and working river or coastal life around you rather than treating the boat simply as transport.`,
    marine:`Use ${name} for time in the coastal environment itself—water, shoreline and marine landscape—with plans adjusted for weather and sea conditions when necessary.`,
    active:`Do ${name} as the active part of the stop, allowing enough time for the approach, views and changing conditions instead of squeezing it between other attractions.`,
    nature:`Treat ${name} as a nature experience first. Slow down, look for the ecology and landscape around you, and keep expectations realistic where wildlife sightings or conditions are involved.`,
    culture:`Spend time with ${name} for the living cultural context around ${place}. Prioritise respectful local interaction, everyday life and explanation over staged or purely photographic encounters.`,
    journey:`Make ${name} part of the travel experience rather than dead transit time. The road, landscape and communities between stops are the reason it is worth doing slowly.`,
    local:`Spend time with ${name} as part of ${place}, focusing on what makes it distinct from the surrounding route and giving yourself enough time to notice the local setting rather than rushing through.`
  };
  return by[c];
}

function estimateTime(title,tags,raw){
  if(raw?.time)return raw.time;if(raw?.duration)return raw.duration;
  const c=category(title,tags,raw),q=norm(title);
  if(/son doong/.test(q))return'4+ days';
  if(/pygmy|hung thoong|hang en/.test(q))return'2–3 days';
  if(/loop|remote road journey/.test(q))return'1–4 days';
  return ({cave:'2–4 hr',waterfall:'1–3 hr',market:'1–2 hr',spiritual:'45–90 min',history:'1–3 hr',coffee:'1–2 hr',food:'1–3 hr',homestay:'Overnight',cycling:'2–5 hr',water:'1–4 hr',marine:'Half/full day',active:'2–5 hr',nature:'2–5 hr',culture:'1–4 hr',journey:'Half/full day',local:'1–3 hr'})[c]||'Flexible';
}

function estimateCost(title,tags,raw){
  if(raw?.cost)return raw.cost;
  const c=category(title,tags,raw),q=norm(title);
  if(/son doong|pygmy|hung thoong|hang en/.test(q))return'High · advance-booked expedition';
  if(/canyoning|diving|easy rider|food tour|guided trek/.test(q))return'Est. A$40–150';
  return ({cave:'Est. A$5–30',waterfall:'Est. A$0–15',market:'Est. A$0–15',spiritual:'Free–A$10',history:'Est. A$0–15',coffee:'Est. A$2–15',food:'Est. A$3–20',homestay:'Est. A$20–60',cycling:'Est. A$5–30',water:'Est. A$5–40',marine:'Est. A$20–80',active:'Est. A$0–30',nature:'Est. A$0–30',culture:'Est. A$0–30',journey:'Varies with transport',local:'Est. A$0–20'})[c]||'Check locally';
}

function bookingText(raw,flags){
  if(raw?.booking && raw.booking!=='Check locally')return raw.booking;
  const f=(flags||[]).join(' ');
  if(/BOOK AHEAD/i.test(f))return'Book ahead';
  if(/TIDE|WEATHER|SEA CONDITIONS|TRAIL|SEASON|ACCESS|ROAD|WATER LEVEL/i.test(f))return'Check conditions before going';
  if(/BORDER|UXO|REMOTE/i.test(f))return'Check access locally';
  return raw?.booking||'Usually flexible';
}

function actionLine(title,destination,tags,raw){
  const c=category(title,tags,raw),name=String(title||'the experience');
  const lines={
    cave:`Plan the access, allow proper time underground and follow the operator or local safety requirements for ${name}.`,
    market:`Go while the market is active, walk slowly, try something local and watch how the space actually functions.`,
    spiritual:`Walk the site quietly, notice the architecture and rituals, and follow local dress and photography etiquette.`,
    history:`Read or listen to the interpretation, connect the site to the wider destination story and avoid rushing the difficult material.`,
    coffee:`Taste the local style, ask how it is prepared and compare it with the coffee you have tried elsewhere in Vietnam.`,
    food:`Order the local speciality, eat where it is normally served and note it in the food passport if it is a new dish.`,
    homestay:`Arrive early enough to settle in, share a meal and leave room for unscheduled time with the hosts or village.`,
    cycling:`Ride the quieter roads, stop often and use the bicycle to reach places that would otherwise be bypassed.`,
    water:`Take the boat or paddle route slowly, using the journey to see river or coastal life from a different perspective.`,
    active:`Start with enough daylight, carry water and adjust the plan if heat, rain or visibility make the activity less worthwhile.`,
    nature:`Move slowly, keep noise down and treat any wildlife sighting as a bonus rather than a guarantee.`,
    culture:`Use a local guide or host where it adds real explanation, and avoid encounters that feel staged or intrusive.`,
    journey:`Build the travel time into the day rather than stacking major activities before and after it.`,
    local:`Walk it slowly, stop when something catches your attention and use the experience to understand ${destination?.name||'the destination'} beyond its headline sights.`
  };
  return lines[c]||lines.local;
}

function enrich(countryId,destination,item){
  const raw=item?.raw||{};
  const tags=item?.tags||[];
  const hcm=countryId==='vietnam'&&destination?.name==='Ho Chi Minh City'?findHcm(item?.title):null;
  const summary=hcm?.summary||(!weak(item?.summary,item?.title)?sentence(item.summary):generatedSummary(item?.title,destination,tags,raw));
  return {
    ...item,
    summary:sentence(summary),
    why:sentence(hcm?.summary||summary),
    action:sentence(actionLine(item?.title,destination,tags,raw)),
    area:hcm?.area||raw.area||'',
    time:hcm?.time||estimateTime(item?.title,tags,raw),
    cost:hcm?.cost||estimateCost(item?.title,tags,raw),
    booking:hcm?.booking||bookingText(raw,item?.flags),
    photoReady:!!window.TC1_EXPERIENCE_PHOTO_COMPLETE?.[countryId]
  };
}

window.TC1ExperienceCopy={enrich,weak,category};
})();
