'use strict';
/* Карточка товара (крупное фото с увеличением, описание) и витрина для нового клиента. */
let PMAP=null, SHOWCAT='', NC={lat:null,lon:null,store:null};
async function pmap(){const ps=await api.listProducts();PMAP=Object.fromEntries(ps.map(p=>[p.id,p]));return PMAP;}
const pName=p=>esc(p.name);

/* ---------- карточка товара ---------- */
function ensureOverlays(){
  if(document.getElementById('ov'))return;
  document.body.insertAdjacentHTML('beforeend',`<div id="ov" class="ov"><div class="sheet" id="sheet"></div></div>
  <div id="viewer" class="viewer"><img id="vimg" alt=""><button class="x" data-a="vclose" aria-label="✕">✕</button></div>`);
  $('#ov').addEventListener('click',e=>{if(e.target.id==='ov')closeSheet();});
  initViewer();
}
let CUR=null;
async function openProduct(id){
  ensureOverlays(); const m=await pmap(); const p=m[id]; if(!p)return; CUR=+id;
  const inf=p.info&&(p.info[LANG]||p.info.ru); const q=CART.lines[p.id]||0;
  const facts=[[t('code'),p.code],[t('barcode'),p.barcode],[t('unit'),p.unit],[t('inbox'),p.box?p.box+' '+t('pcs'):'']].filter(x=>x[1]);
  const idx=LIST.indexOf(+id);
  $('#sheet').innerHTML=`<div class="sh-top"><span class="sp"></span><button class="sm sec" data-a="sclose" id="sclose">✕ ${t('close')}</button></div>
  <div class="bigimg" data-a="zoom" id="bigimg"><img src="${p.big||p.img}" alt="">${p.hit?`<span class="tag hot">🔥 ${t('hit')}</span>`:''}${p.isnew?`<span class="tag nw">🆕 ${t('isnew')}</span>`:''}<span class="zm">🔍</span></div>
  <p class="mut" style="text-align:center;margin:4px 0 8px">${t('zoom')}</p>
  <h2 class="pn" id="pname">${pName(p)}</h2><div class="mut">${esc(p.cat)}</div>
  <div class="row" style="margin:10px 0"><b class="price sp">${money(p.price)}</b><span class="mut">${t('stock')}: <b data-stock="${p.id}">${p.stock-q}</b></span></div>
  ${ME&&ME.role==='agent'?`<div class="row">${stepper(p.id,q)}</div>`:''}
  ${facts.length?`<table class="facts">${facts.map(f=>`<tr><td>${f[0]}</td><td>${esc(f[1])}</td></tr>`).join('')}</table>`:''}
  ${inf?`<h3>${t('about')}</h3><p id="pdesc">${esc(inf.t)}</p>${inf.f&&inf.f.length?`<ul class="feat">${inf.f.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}`:''}
  ${LIST.length>1&&idx>=0?`<div class="grid2" style="margin-top:12px"><button class="sec" data-a="pstep" data-d="-1">← ${t('prev')}</button><button class="sec" data-a="pstep" data-d="1" id="pnext">${t('nextp')} →</button></div>`:''}`;
  $('#ov').classList.add('on'); document.body.style.overflow='hidden'; $('#sheet').scrollTop=0;
  swipe($('#bigimg'),d=>A.pstep({dataset:{d}}));
}
function closeSheet(){const o=$('#ov');if(o)o.classList.remove('on');document.body.style.overflow='';CUR=null;}
function swipe(el,cb){let x0=null,y0=null;el.addEventListener('touchstart',e=>{x0=e.touches[0].clientX;y0=e.touches[0].clientY;},{passive:true});
  el.addEventListener('touchend',e=>{if(x0==null)return;const dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;
    if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5){el.dataset.sw='1';setTimeout(()=>delete el.dataset.sw,350);cb(dx<0?1:-1);}},{passive:true});}

/* ---------- просмотр фото с увеличением: два пальца, двойное нажатие, перетаскивание ---------- */
let V={s:1,x:0,y:0},PTS=new Map(),PD=0,BASE=null,LASTTAP=0;
function vt(){$('#vimg').style.transform=`translate(${V.x}px,${V.y}px) translate(-50%,-50%) scale(${V.s})`;}
function zoomAt(cx,cy,k){const ns=Math.min(6,Math.max(1,V.s*k));k=ns/V.s;V.x=cx-(cx-V.x)*k;V.y=cy-(cy-V.y)*k;V.s=ns;if(V.s===1){V.x=innerWidth/2;V.y=innerHeight/2;}vt();}
function openViewer(src){ensureOverlays();const i=$('#vimg');V={s:1,x:innerWidth/2,y:innerHeight/2};vt();i.src=src;$('#viewer').classList.add('on');}
function initViewer(){const vw=$('#viewer');
  vw.addEventListener('pointerdown',e=>{if(e.target.closest('.x'))return;vw.setPointerCapture(e.pointerId);PTS.set(e.pointerId,[e.clientX,e.clientY]);
    if(PTS.size===2){const a=[...PTS.values()];PD=Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]);BASE=V.s;}
    const now=Date.now();if(PTS.size===1&&now-LASTTAP<300)zoomAt(e.clientX,e.clientY,V.s>1.2?1/V.s:2.5);LASTTAP=now;});
  vw.addEventListener('pointermove',e=>{if(!PTS.has(e.pointerId))return;const o=PTS.get(e.pointerId);PTS.set(e.pointerId,[e.clientX,e.clientY]);
    if(PTS.size===2){const a=[...PTS.values()];const d=Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]);zoomAt((a[0][0]+a[1][0])/2,(a[0][1]+a[1][1])/2,(BASE*d/PD)/V.s);}
    else if(V.s>1){V.x+=e.clientX-o[0];V.y+=e.clientY-o[1];vt();}});
  const up=e=>{PTS.delete(e.pointerId);};vw.addEventListener('pointerup',up);vw.addEventListener('pointercancel',up);
  vw.addEventListener('wheel',e=>{e.preventDefault();zoomAt(e.clientX,e.clientY,e.deltaY<0?1.2:1/1.2);},{passive:false});}

/* ---------- витрина для нового клиента ---------- */
function bigCard(p){const q=CART.lines[p.id]||0;return `<div class="scard"><div class="simg" data-a="pinfo" data-id="${p.id}"><img src="${p.big||p.img}" loading="lazy" alt="">
  ${p.hit?`<span class="tag hot">🔥 ${t('hit')}</span>`:p.isnew?`<span class="tag nw">🆕 ${t('isnew')}</span>`:''}</div>
  <div class="sbody"><div class="snm" data-a="pinfo" data-id="${p.id}">${pName(p)}</div><b class="price">${money(p.price)}</b>${stepper(p.id,q)}</div></div>`;}
R.show=async function(){pickCart();
  const ps=await api.listProducts(); const cats=await api.listCategories();
  const hits=ps.filter(p=>p.hit), news=ps.filter(p=>p.isnew);
  const grid=SHOWCAT?ps.filter(p=>p.cat===SHOWCAT):ps;
  LIST=[...hits,...news,...grid].map(p=>p.id).filter((v,i,a)=>a.indexOf(v)===i);
  const tiles=cats.map(c=>{const f=ps.filter(p=>p.cat===c);return `<button class="tile ${SHOWCAT===c?'on':''}" data-a="showcat" data-c="${esc(c)}"><img src="${f[0].img}" loading="lazy" alt=""><span>${esc(c)}<small>${f.length}</small></span></button>`;}).join('');
  shell(t('show_t'),`<section class="hero"><div class="hl">Vicon Toshkent</div><h2>${t('hero1')}</h2><p>${t('hero2')}</p>
    <div class="stats"><div><b>${ps.filter(p=>p.stock>0).length}</b>${t('in_stock')}</div><div><b>${cats.length}</b>${t('n_cats')}</div></div></section>
  ${hits.length?`<h3>🔥 ${t('hits')}</h3><div class="carousel" id="hits">${hits.map(bigCard).join('')}</div>`:''}
  ${news.length?`<h3>🆕 ${t('news')}</h3><div class="carousel" id="news">${news.map(bigCard).join('')}</div>`:''}
  <h3>${t('cats_t')}</h3><div class="tiles">${tiles}</div>
  <h3 id="gridh">${SHOWCAT?esc(SHOWCAT):t('all_goods')}${SHOWCAT?` <button class="chip" data-a="showcat" data-c="">✕ ${t('all')}</button>`:''}</h3>
  <div class="sgrid" id="sgrid">${grid.map(bigCard).join('')}</div><div style="height:80px"></div>
  <div class="cartbar" id="showbar"></div>`,{tab:'show'});
  drawShowBar();
};
async function drawShowBar(){const b=$('#showbar');if(!b)return;const n=cartCount();if(!n){b.innerHTML='';return;}
  const m=await pmap();const sum=Object.entries(CART.lines).reduce((s,[i,q])=>s+(m[i]?m[i].price*q:0),0);
  b.innerHTML=`<button class="ok" data-a="checkout" id="checkout">✅ ${t('checkout')}: ${n} ${t('pcs')} · ${money(sum)}</button>`;}
R.newclient=async function(){pickCart();
  const m=await pmap(); const ids=Object.keys(CART.lines).filter(i=>CART.lines[i]>0&&m[i]);
  const total=ids.reduce((s,i)=>s+m[i].price*CART.lines[i],0);
  shell(t('nc_title'),`<label for="ncn">${t('nc_name')} *</label><input id="ncn" autocomplete="off">
  <label for="nco">${t('nc_owner')}</label><input id="nco" autocomplete="off">
  <label for="ncp">${t('nc_phone')} *</label><input id="ncp" type="tel" inputmode="tel" placeholder="+998 __ ___ __ __">
  <label for="nca">${t('nc_addr')}</label><input id="nca" autocomplete="off">
  <div style="height:10px"></div><button class="sec" data-a="ncgps" id="ncgps">📍 ${t('nc_gps')}</button><div id="ncgpsres"></div>
  <p class="mut">${t('nc_hint')}</p>
  <h3>${t('items_t')}</h3>${ids.map(i=>`<div class="card row"><img src="${m[i].img}" class="mini" alt=""><span class="sp">${pName(m[i])}<br><span class="mut">${money(m[i].price)} × ${CART.lines[i]}</span></span></div>`).join('')||`<p class="mut">${t('empty_cart')}</p>`}
  <div class="card row"><b class="sp">${t('total')}</b><b>${money(total)}</b></div>
  <button class="ok" data-a="ncgo" id="ncgo" ${ids.length?'':'disabled'}>${t('nc_go')}</button>`,{back:'#/show',tab:'show'});
};

Object.assign(A,{
  async pinfo(el){const s=el.closest('.simg');if(s&&s.dataset.sw)return;await openProduct(+el.dataset.id);},
  sclose(){closeSheet();},
  async pstep(el){if(CUR==null||!LIST.length)return;const i=LIST.indexOf(CUR);if(i<0)return;await openProduct(LIST[(i+(+el.dataset.d)+LIST.length)%LIST.length]);},
  zoom(){const b=$('#bigimg');if(b&&b.dataset.sw)return;const m=PMAP[CUR];openViewer(m.big||m.img);},
  vclose(){$('#viewer').classList.remove('on');},
  async showcat(el){SHOWCAT=el.dataset.c;await R.show();const h=$('#gridh');if(h)h.scrollIntoView({block:'start'});},
  checkout(){location.hash='#/newclient';},
  ncgps(){const r=$('#ncgpsres');r.innerHTML=`<p class="mut">${t('gps_wait')}</p>`;
    if(!navigator.geolocation){r.innerHTML=`<div class="warnbox">${t('gps_fail')}</div>`;return;}
    navigator.geolocation.getCurrentPosition(p=>{NC.lat=p.coords.latitude;NC.lon=p.coords.longitude;r.innerHTML=`<div class="card good" id="ncgpsok">✅ ${t('nc_gps_ok')}</div>`;},
      ()=>{r.innerHTML=`<div class="warnbox">${t('gps_fail')}</div>`;},{enableHighAccuracy:true,timeout:8000});},
  async ncgo(){
    const v=id=>$(id).value.trim();
    if(!v('#ncn')||!v('#ncp')){toast(t('nc_need'));return;}
    const s=NC.store?await api.getStore(NC.store):await api.createStore({name:v('#ncn'),owner:v('#nco'),phone:v('#ncp'),address:v('#nca'),lat:NC.lat,lon:NC.lon});NC.store=s.id;
    CART.store=s.id; if(!CART.uuid)CART.uuid=api.uuid(); saveCart();
    const lines=Object.entries(CART.lines).map(([id,q])=>({id:+id,qty:q}));
    try{const o=await api.createOrder({uuid:CART.uuid,store:s.id,lines});
      toast(o.sent?t('nc_ok'):t('queued'));CART={store:null,lines:{},nw:true};saveCart();CART={store:null,lines:{}};saveCart();NC={lat:null,lon:null,store:null};PMAP=null;location.hash='#/store/'+s.id;}
    catch(e){toast(e.code==='LIMIT'?t('over_limit')+' '+t('nc_hint'):e.message);}}
});
/* после +/− обновить нижнюю кнопку витрины и цифры в карточке */
const _step=A.step;A.step=async function(el){await _step(el);PMAP=null;drawShowBar();};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const v=$('#viewer');if(v&&v.classList.contains('on'))v.classList.remove('on');else closeSheet();}});
window.addEventListener('hashchange',()=>{closeSheet();const v=$('#viewer');if(v)v.classList.remove('on');});
/* у витрины своя корзина, чтобы не смешивать с заказом для старой точки */
function pickCart(){const nw=/^#\/(show|newclient)/.test(location.hash);if(!!CART.nw===nw)return;
  saveCart();CART=JSON.parse(localStorage.getItem(nw?'viconCartNew':'viconCart')||'{"store":null,"lines":{}}');if(nw)CART.nw=true;else delete CART.nw;PMAP=null;}
window.addEventListener('hashchange',pickCart);pickCart();
