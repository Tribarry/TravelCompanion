const CACHE='sea2027-v20-country-route-map-a15';
const ASSETS=['./','./index.html','./styles.css','./app.js','./data/itinerary.json','./manifest.webmanifest','./vietnam-map.png','./data/vietnam-photo-manifest-v1.js','./data/laos-photo-manifest-v1.js','./data/global-data-bridge-v1.js','./data/vietnam-quality-curation-v1.js','./data/vietnam-curated-photo-supplement-v1.js','./data/laos-audited-structure-v1.js','./data/remaining-countries-photo-audit-v1.js','./data/remaining-countries-photo-bridge-v1.js','./data/adhd-focus-mode-v1.js','./data/country-route-map-v1.js'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))]))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  const isLocalImage=url.origin===self.location.origin&&/\/assets\/images\/generated\/.*\.webp$/i.test(url.pathname);
  if(isLocalImage){
    e.respondWith(caches.open(CACHE).then(async c=>{
      const hit=await c.match(e.request);
      if(hit)return hit;
      const response=await fetch(e.request);
      if(response.ok)c.put(e.request,response.clone());
      return response;
    }));
    return;
  }
  if(e.request.mode==='navigate'||e.request.url.endsWith('/app.js')||e.request.url.endsWith('/itinerary.json')){
    e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request)));
  }else{
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
  }
});
