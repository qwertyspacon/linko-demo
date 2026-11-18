const V='vicon-demo-v4';
const CORE=['./','index.html','app.js','api.js','show.js','style.css','manifest.json','icon.svg','data/products.json','data/stores.json','data/users.json','data/orders.json'];
self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil((async()=>{
    const c=await caches.open(V);
    await Promise.allSettled(CORE.map(u=>fetch(u,{cache:'no-store'}).then(r=>r.ok&&c.put(u,r))));
  })());
});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{
  for(const k of await caches.keys()) if(k!==V) await caches.delete(k);
  await self.clients.claim();
})());});
// фото кэшируются сами при просмотре; заранее не качаем, чтобы не держать открытие
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin) return;
  const isImg=/\.(jpg|jpeg|png|webp|svg)$/i.test(u.pathname);
  e.respondWith((async()=>{
    const c=await caches.open(V);
    if(isImg){ // картинки: сначала из памяти
      const hit=await c.match(e.request,{ignoreSearch:true}); if(hit) return hit;
      try{const r=await fetch(e.request); if(r.ok) c.put(e.request,r.clone()); return r;}catch(_){return Response.error();}
    }
    // код и данные: сначала свежие из сети, без сети — из памяти
    const cached=await c.match(e.request,{ignoreSearch:true});
    const net=fetch(e.request,{cache:'no-store'}).then(r=>{if(r.ok) c.put(e.request,r.clone()); return r;});
    if(!cached){ try{return await net;}catch(_){return (await c.match('index.html'))||Response.error();} }
    // есть копия: ждём сеть не дольше 4 секунд, иначе отдаём копию
    try{ return await Promise.race([net,new Promise((_,rej)=>setTimeout(rej,4000))]); }catch(_){ return cached; }
  })());});
