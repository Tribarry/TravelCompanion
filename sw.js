const CACHE='sea2027-v4-render';
const ASSETS=['./','./index.html','./styles.css','./app.js','./data/itinerary.json','./manifest.webmanifest'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))]))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  const isLocalImage=url.origin===self.location.origin&&/\/assets\/images\/generated\/.*\.webp$/i.test(url.pathname);
  const isWikiPhotoLookup=/^(?:en\.)?wikipedia\.org$/.test(url.hostname)&&(/\/api\/rest_v1\/page\/summary\//.test(url.pathname)||url.pathname==='/w/api.php');
  const isWikiImage=/\.wikimedia\.org$/.test(url.hostname)&&e.request.destination==='image';
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
  if(isWikiPhotoLookup||isWikiImage){
    e.respondWith(caches.open(CACHE).then(async c=>{
      const hit=await c.match(e.request);
      const refresh=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r}).catch(()=>hit);
      return hit||refresh;
    }));
    return;
  }
  if(e.request.mode==='navigate'||e.request.url.endsWith('/app.js')||e.request.url.endsWith('/itinerary.json')){
    e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request)));
  }else{
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
  }
});
