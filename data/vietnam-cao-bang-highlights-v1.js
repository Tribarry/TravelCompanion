/* Cao Bang highlight pass — Ban Gioc brief list as Must Do experiences.
 * Presentation-only: does not change route order, Saved/Done/Skip, or IDs of existing items.
 */
(()=>{
'use strict';
if (window.__VN_CAO_BANG_HIGHLIGHTS_V1__) return;
window.__VN_CAO_BANG_HIGHLIGHTS_V1__ = true;

const DEST = /cao bang|cao bằng/i;
const norm = s => String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ').trim();

const HIGHLIGHTS = [
  {
    match: /ban gioc|ban gioc|thac ban/, 
    name: 'Bản Giốc Waterfall',
    tier: 'S+',
    type: 'nature',
    tags: ['Must Do','Outdoors'],
    flags: ['BORDER AREA','WEATHER CHECK'],
    summary: 'One of Vietnam’s most spectacular waterfalls: a wide karst curtain dropping into the Quây Sơn valley on the China border. Go early, stay for the river and rice fields around it, and treat border rules as real.'
  },
  {
    match: /quay son|quay sơn|emerald water/,
    name: 'Quây Sơn River',
    tier: 'S',
    type: 'nature',
    tags: ['Must Do','Outdoors'],
    flags: ['BORDER AREA'],
    summary: 'Emerald water moving under limestone walls between Vietnam and China. The river is the reason Bản Giốc looks the way it does — boat time here is part of the waterfall day, not an extra.'
  },
  {
    match: /limestone mountain|karst landscape|dramatic limestone/,
    name: 'Limestone mountain landscape',
    tier: 'S',
    type: 'nature',
    tags: ['Must Do','Outdoors'],
    flags: ['WEATHER CHECK'],
    summary: 'The Cao Bằng loop is the landscape: towers, passes and farmed valleys stretching for hours. Give the road itself time instead of treating the province as a single waterfall stop.'
  },
  {
    match: /nguom ngao|nguom nga|nguom/,
    name: 'Ngườm Ngao Cave',
    tier: 'S+',
    type: 'nature',
    tags: ['Must Do','Outdoors'],
    flags: ['ACCESS CHECK'],
    summary: 'A vast, well-lit cave system a short hop from Bản Giốc. Walk the full circuit rather than a photo at the mouth — the chambers are the point.'
  },
  {
    match: /thang hen|thang hèn|peaceful lake/,
    name: 'Thang Hen lakes',
    tier: 'S',
    type: 'nature',
    tags: ['Must Do','Outdoors','Local Life'],
    flags: [],
    summary: 'Connected mountain lakes ringed by forest, rice and Tày villages. Quieter than the border falls and better as a slow boat-and-walk half day than a drive-by viewpoint.'
  },
  {
    match: /angel eye|mat than|mắt thần|god.?s eye/,
    name: 'Angel Eye — Mắt Thần Mountain',
    tier: 'S+',
    type: 'viewpoint',
    tags: ['Must Do','Outdoors','Unique'],
    flags: ['WEATHER CHECK'],
    summary: 'The hole in Mắt Thần Mountain that reads as an eye in the cliff. Best in clear light from the designated viewpoints — weather can erase it completely.'
  },
  {
    match: /hidden valley|rice field|ethnic village|phong nam|phong nạm/,
    name: 'Hidden valleys and ethnic villages',
    tier: 'S',
    type: 'culture',
    tags: ['Must Do','Culture','Local Life','Outdoors'],
    flags: [],
    summary: 'Rice, limestone and Tày / Nùng villages off the main Ban Gioc coach circuit. Stop for short walks and invited visits, not field-edge photos.'
  },
  {
    match: /authentic local|far from the crowd|local life/,
    name: 'Quiet local life',
    tier: 'A',
    type: 'local',
    tags: ['Must Do','Local Life','Culture'],
    flags: [],
    summary: 'Cao Bằng still works as a lived-in border province. Markets, stilt houses and evening town life are the counterweight to the famous waterfall.'
  }
];

function upsert(d){
  if(!d || !DEST.test(d.name||'')) return;
  d.experiences = Array.isArray(d.experiences) ? d.experiences : [];
  HIGHLIGHTS.forEach((h, idx) => {
    const existing = d.experiences.find(e => h.match.test(norm(e.name)+' '+norm(e.summary)));
    if(existing){
      existing.tier = existing.tier === 'S+' ? 'S+' : h.tier;
      existing.tags = [...new Set([...(existing.tags||[]), ...h.tags])];
      existing.flags = [...new Set([...(existing.flags||[]), ...(h.flags||[])])];
      if(!existing.summary || existing.summary.length < 40) existing.summary = h.summary;
      return;
    }
    d.experiences.push({
      id: 'cao-bang-hl-'+idx,
      name: h.name,
      tier: h.tier,
      type: h.type,
      summary: h.summary,
      time: 'Half day',
      cost: 'Low–mid',
      booking: (h.flags||[]).includes('BORDER AREA') ? 'Check border-zone access' : 'No',
      tags: h.tags,
      flags: h.flags||[]
    });
  });
  d.summary = d.summary || 'Cao Bằng is a mountainous border province of karst valleys, Tày and Nùng communities, Bản Giốc, Ngườm Ngao and quieter farming valleys.';
  d.orientation = Object.assign({
    comeFor: 'Bản Giốc + Ngườm Ngao + Angel Eye',
    doDifferently: 'Hidden valleys and ethnic villages',
    eat: 'Use the Food Passport',
    pace: d.stay || '4–5'
  }, d.orientation||{});
}

function run(){
  const list = window.DATA && DATA.destinations && DATA.destinations.vietnam;
  if(!Array.isArray(list)) return false;
  const dest = list.find(d => DEST.test(d.name||''));
  if(!dest) return false;
  upsert(dest);
  return true;
}

function wait(tries){
  if(run() || tries >= 80) return;
  setTimeout(() => wait(tries+1), 50);
}
wait(0);
})();
