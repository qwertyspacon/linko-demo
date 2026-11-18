const V='vicon-demo-v1';
const CORE=['./','index.html','app.js','api.js','style.css','manifest.json','icon.svg','data/products.json','data/stores.json','data/users.json','data/orders.json'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{
  const c=await caches.open(V); await c.addAll(CORE);
  try{const p=await (await fetch('data/products.json')).json();
    await Promise.allSettled(p.map(x=>c.add(x.img)));}catch(_){}
  self.skipWaiting();})());});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{
  for(const k of await caches.keys()) if(k!==V) await caches.delete(k);
  await self.clients.claim();})());});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin) return;
  e.respondWith((async()=>{
    const c=await caches.open(V);
    const hit=await c.match(e.request,{ignoreSearch:true}); if(hit) return hit;
    try{const r=await fetch(e.request); if(r.ok) c.put(e.request,r.clone()); return r;}
    catch(_){ return (await c.match('index.html'))||Response.error(); }
  })());});
