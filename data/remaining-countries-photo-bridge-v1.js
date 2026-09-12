/* Bridge verified Cambodia/Thailand/Central Asia experience photos into TC1RaterPhoto.
 * Preserves the existing resolver for Vietnam and any other country.
 */
(()=>{
'use strict';
if(window.__REMAINING_PHOTO_BRIDGE_V1__)return;window.__REMAINING_PHOTO_BRIDGE_V1__=true;
const previous=window.TC1RaterPhoto;
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
function exact(id,label){const map=window.REMAINING_COUNTRIES_PHOTO_AUDIT?.experiences?.[id];if(!map)return null;const q=norm(label);for(const[k,v]of Object.entries(map))if(norm(k)===q)return v;return null}
window.TC1RaterPhoto=(id,d,it)=>{const p=exact(id,it?.title||it?.name||'');if(p?.url)return p.url;try{return typeof previous==='function'?previous(id,d,it):''}catch(e){return''}};
})();
