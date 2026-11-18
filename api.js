/* Слой «сервера» демо. Все методы асинхронные и возвращают данные/бросают Error с полем code.
   Позже заменяется настоящим бэкендом с теми же именами: login, listProducts, createOrder, ... */
(function(){
const KEY='viconDemoState', SES='viconDemoSession', NET='viconDemoNetSim';
let S=null;
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const err=(code,msg,extra)=>Object.assign(new Error(msg||code),{code},extra||{});
const uuid=()=> (crypto.randomUUID?crypto.randomUUID():'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{const r=Math.random()*16|0;return (c==='x'?r:(r&3|8)).toString(16);}));
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');};
const nowIso=()=>new Date().toISOString();
const localDay=(iso)=>{const d=new Date(iso);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');};

async function load(){
  if(S) return S;
  const raw=localStorage.getItem(KEY);
  if(raw){ S=JSON.parse(raw); return S; }
  const [products,stores,users,orders]=await Promise.all(['products','stores','users','orders'].map(n=>fetch('data/'+n+'.json').then(r=>r.json())));
  S={products,stores,users,orders,payments:[],returns:[],visits:[],requests:[],seq:2000};
  save(); return S;
}
function save(){ localStorage.setItem(KEY,JSON.stringify(S)); }
function sessionUser(){ const l=localStorage.getItem(SES); return l&&S?S.users.find(u=>u.login===l):null; }
async function need(){ await load(); const u=sessionUser(); if(!u) throw err('AUTH','Нужен вход'); return u; }
const pub=(u)=>({login:u.login,name:u.name,role:u.role,super:u.super||null});
function myAgents(u){ if(u.role==='agent') return [u.login]; if(u.role==='super') return S.users.filter(x=>x.super===u.login).map(x=>x.login); return S.users.filter(x=>x.role==='agent').map(x=>x.login); }
function canStore(u,s){ return myAgents(u).includes(s.agent); }
function storeOf(u,id){ const s=S.stores.find(x=>x.id==id); if(!s) throw err('NOTFOUND','Нет такой точки'); if(!canStore(u,s)) throw err('FORBIDDEN','Нет доступа к точке'); return s; }
const net={ get sim(){return localStorage.getItem(NET)==='1';}, get online(){return !this.sim && navigator.onLine;} };

const api={
  uuid, today,
  isOnline(){ return net.online; },
  netSim(){ return net.sim; },
  setNetSim(v){ localStorage.setItem(NET,v?'1':'0'); },
  async login(login,password){
    await load(); await sleep(60);
    const u=S.users.find(x=>x.login===String(login).trim()&&x.password===password);
    if(!u) throw err('BAD_LOGIN','Неверный логин или пароль');
    localStorage.setItem(SES,u.login); return pub(u);
  },
  async logout(){ localStorage.removeItem(SES); },
  async me(){ await load(); const u=sessionUser(); return u?pub(u):null; },
  async resetDemo(){ localStorage.removeItem(KEY); S=null; await load(); },
  async listProducts({q='',cat=''}={}){
    await need(); q=q.trim().toLowerCase();
    return S.products.filter(p=>(!cat||p.cat===cat)&&(!q||p.name.toLowerCase().includes(q)));
  },
  async listCategories(){ await need(); return [...new Set(S.products.map(p=>p.cat))].sort(); },
  async listStores(){ const u=await need(); return S.stores.filter(s=>canStore(u,s)).map(s=>({...s})); },
  async getStore(id){ const u=await need(); return {...storeOf(u,id)}; },
  async listUsers(){ const u=await need(); if(u.role!=='admin'&&u.role!=='boss') throw err('FORBIDDEN'); return S.users.map(pub); },
  async listOrders(){ const u=await need(); const ag=myAgents(u);
    return S.orders.filter(o=>ag.includes(o.agent)).sort((a,b)=>b.created.localeCompare(a.created)).map(o=>({...o})); },
  async lastOrderLines(storeId){ const u=await need(); storeOf(u,storeId);
    const o=S.orders.filter(o=>o.store==storeId).sort((a,b)=>b.created.localeCompare(a.created))[0];
    if(!o) throw err('NOTFOUND','Прошлых заказов нет');
    return o.lines.map(l=>({id:l.id,qty:l.qty})); },
  async createOrder({uuid:uid,store,lines}){
    const u=await need(); if(u.role!=='agent') throw err('FORBIDDEN','Заказ делает агент');
    const s=storeOf(u,store);
    const dup=S.orders.find(o=>o.uuid===uid); if(dup) return {...dup};   // идемпотентно: без дублей
    if(!lines||!lines.length) throw err('EMPTY','Корзина пуста');
    const full=[]; let total=0;
    for(const l of lines){ const p=S.products.find(x=>x.id===l.id);
      if(!p||l.qty<1) throw err('BAD_LINE','Плохая строка');
      if(l.qty>p.stock) throw err('STOCK','Больше остатка: '+p.name,{product:p.id,stock:p.stock});
      full.push({id:p.id,name:p.name,price:p.price,qty:l.qty}); total+=p.price*l.qty; }
    let appr=null;
    if(s.debt+total>s.limit){
      appr=S.requests.find(r=>r.store===s.id&&r.agent===u.login&&r.status==='approved'&&!r.used&&r.amount>=total);
      if(!appr){ const pend=S.requests.find(r=>r.store===s.id&&r.agent===u.login&&r.status==='pending');
        throw err('LIMIT','Превышен лимит долга',{debt:s.debt,limit:s.limit,total,pending:!!pend}); } }
    if(appr) appr.used=true;
    full.forEach(l=>{ S.products.find(x=>x.id===l.id).stock-=l.qty; });   // резерв
    s.debt+=total;
    const sent=net.online;
    const o={uuid:uid,no:++S.seq,store:s.id,agent:u.login,lines:full,total,status:'new',created:nowIso(),sent,sentAt:sent?nowIso():null};
    S.orders.push(o); save(); return {...o};
  },
  async queueSize(){ await load(); return S.orders.filter(o=>!o.sent).length; },
  async syncQueue(){            // «ушло на сервер»: вызывается при появлении сети
    await load(); if(!net.online) return 0; let n=0;
    S.orders.forEach(o=>{ if(!o.sent){ o.sent=true; o.sentAt=nowIso(); n++; } });
    if(n) save(); return n;
  },
  async setStatus(uid,status){ const u=await need(); if(u.role!=='admin') throw err('FORBIDDEN','Статус меняет админ/склад');
    const o=S.orders.find(x=>x.uuid===uid); if(!o) throw err('NOTFOUND'); o.status=status; save(); return {...o}; },
  async createReturn({store,lines,reason}){ const u=await need(); const s=storeOf(u,store);
    if(!lines||!lines.length) throw err('EMPTY','Выберите товары'); let sum=0; const full=[];
    for(const l of lines){ const p=S.products.find(x=>x.id===l.id); if(!p||l.qty<1) continue; p.stock+=l.qty; sum+=p.price*l.qty; full.push({id:p.id,name:p.name,price:p.price,qty:l.qty}); }
    s.debt=Math.max(0,s.debt-sum);
    const r={id:uuid(),store:s.id,agent:u.login,lines:full,sum,reason,ts:nowIso()}; S.returns.push(r); save(); return r; },
  async createPayment({store,amount,method}){ const u=await need(); const s=storeOf(u,store);
    amount=Math.round(Number(amount)); if(!(amount>0)) throw err('BAD_AMOUNT','Введите сумму');
    s.debt=Math.max(0,s.debt-amount);
    const p={id:uuid(),store:s.id,agent:u.login,amount,method,ts:nowIso()}; S.payments.push(p); save(); return {...p,debt:s.debt}; },
  async requestApproval({store,amount}){ const u=await need(); const s=storeOf(u,store);
    let r=S.requests.find(r=>r.store===s.id&&r.agent===u.login&&r.status==='pending');
    if(!r){ r={id:uuid(),store:s.id,storeName:s.name,agent:u.login,amount,status:'pending',used:false,ts:nowIso()}; S.requests.push(r); save(); }
    return {...r}; },
  async listRequests(){ const u=await need(); const ag=myAgents(u);
    return S.requests.filter(r=>ag.includes(r.agent)).sort((a,b)=>b.ts.localeCompare(a.ts)).map(r=>({...r})); },
  async decideRequest(id,approve){ const u=await need(); if(u.role!=='super'&&u.role!=='admin') throw err('FORBIDDEN');
    const r=S.requests.find(x=>x.id===id); if(!r||!myAgents(u).includes(r.agent)) throw err('FORBIDDEN');
    r.status=approve?'approved':'rejected'; r.by=u.login; save(); return {...r}; },
  async createVisit({store,lat,lon,photo,reason}){ const u=await need(); const s=storeOf(u,store);
    let dist=null; if(lat!=null&&lon!=null) dist=Math.round(api.distance(lat,lon,s.lat,s.lon));
    const v={id:uuid(),store:s.id,agent:u.login,lat,lon,dist,near:dist!=null&&dist<=150,photo:photo||null,reason:reason||'',ts:nowIso()};
    S.visits.push(v); save(); return {...v,photo:!!v.photo}; },
  async listVisits(){ const u=await need(); const ag=myAgents(u); return S.visits.filter(v=>ag.includes(v.agent)).map(v=>({...v})).reverse(); },
  distance(a,b,c,d){ const R=6371000,r=x=>x*Math.PI/180; const dl=r(c-a),dn=r(d-b);
    const h=Math.sin(dl/2)**2+Math.cos(r(a))*Math.cos(r(c))*Math.sin(dn/2)**2; return 2*R*Math.asin(Math.sqrt(h)); },
  async daySummary(){ const u=await need(); const day=today(); const rows=[];
    for(const a of myAgents(u)){ const usr=S.users.find(x=>x.login===a);
      const os=S.orders.filter(o=>o.agent===a&&localDay(o.created)===day);
      rows.push({agent:a,name:usr.name,
        visits:S.visits.filter(v=>v.agent===a&&localDay(v.ts)===day).length,
        orders:os.length, pieces:os.reduce((s,o)=>s+o.lines.reduce((x,l)=>x+l.qty,0),0), sum:os.reduce((s,o)=>s+o.total,0),
        returns:S.returns.filter(r=>r.agent===a&&localDay(r.ts)===day).reduce((s,r)=>s+r.sum,0),
        payments:S.payments.filter(p=>p.agent===a&&localDay(p.ts)===day).reduce((s,p)=>s+p.amount,0)}); }
    const total=rows.reduce((t,r)=>{for(const k of ['visits','orders','pieces','sum','returns','payments']) t[k]+=r[k]; return t;},{visits:0,orders:0,pieces:0,sum:0,returns:0,payments:0});
    return {rows,total}; },
  async overview(){ const u=await need(); if(u.role!=='boss'&&u.role!=='admin') throw err('FORBIDDEN');
    return {debt:S.stores.reduce((s,x)=>s+x.debt,0), stores:S.stores.length, orders:S.orders.length, pending:S.requests.filter(r=>r.status==='pending').length}; }
};
window.api=api;
})();
