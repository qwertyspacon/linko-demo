'use strict';
const I18N={
ru:{app:'Vicon Агент',login:'Логин',password:'Пароль',enter:'Войти',bad_login:'Неверный логин или пароль',logout:'Выйти',hint:'Демо: agent1, agent2, agent3, super, admin, boss · пароль 1234',
stores:'Точки',catalog:'Каталог',orders:'Заказы',day:'День',settings:'Ещё',requests:'Запросы',refs:'Справочники',summary:'Сводка',agents:'Агенты',
search:'Поиск товара',all:'Все',stock:'Остаток',pcs:'шт',sum:'сум',cart:'Корзина',total:'Итого',send:'Отправить заказ',empty_cart:'Корзина пуста',
no_more:'Больше остатка нет',store:'Точка',pick_store:'Выберите точку',debt:'Долг',limit:'Лимит',order:'Заказ',repeat:'Повторить заказ',ret:'Возврат',pay:'Оплата',visit:'Визит',
history:'История',sent:'Заказ отправлен',queued:'Нет сети: заказ в очереди «ждёт отправки»',wait_send:'ждёт отправки',delivered_q:'Очередь отправлена',
over_limit:'Превышен лимит долга. Заказ заблокирован.',ask:'Запросить разрешение',asked:'Запрос отправлен супервайзеру',ask_wait:'Запрос ждёт решения супервайзера',
approve:'Одобрить',reject:'Отклонить',pending:'ждёт',approved:'одобрено',rejected:'отклонено',no_req:'Запросов нет',
new:'Новый',packed:'Собран',shipped:'Отгружен',delivered:'Доставлен',next:'Дальше',
reason:'Причина',r_def:'Брак',r_exp:'Просрочка',r_wrong:'Ошибка заказа',r_other:'Другое',save_ret:'Оформить возврат',ret_ok:'Возврат принят',
amount:'Сумма',cash:'Наличные',transfer:'Перечисление',click:'Click',take_pay:'Принять оплату',pay_ok:'Оплата принята',
gps:'Определить место',gps_wait:'Определяю…',gps_ok:'Вы у точки',gps_far:'Вы далеко от точки',gps_fail:'GPS недоступен',m:'м',photo:'Фото (камера)',
no_order:'Без заказа',visit_save:'Сохранить визит',visit_ok:'Визит записан',r_none:'Заказ будет',r_closed:'Магазин закрыт',r_nomoney:'Нет денег',r_noneed:'Не нужно',
visits:'Визиты',ret_sum:'Возвраты',payments:'Оплаты',pieces:'шт.',agent:'Агент',totals:'Итого',day_title:'Итог дня',
language:'Язык',netsim:'Имитировать отсутствие сети',reset:'Сбросить демо-данные',online:'Сеть есть',offline:'Нет сети',queue:'в очереди',
products:'Товары',users:'Пользователи',role:'Роль',price:'Цена',qty:'Кол-во',no_orders:'Заказов нет',nothing:'Ничего нет',
agent_r:'Агент',super_r:'Супервайзер',admin_r:'Администратор',boss_r:'Начальник',all_debt:'Общий долг точек',n_stores:'Точек',n_orders:'Заказов',pend:'Запросов ждут',
stock_err:'Больше остатка',back:'Назад',choose:'Выберите',lines:'позиций',address:'Адрес',repeat_ok:'Прошлый заказ в корзине',nolast:'Прошлых заказов нет',
ro_hint:'Заказы делает агент. Здесь — просмотр.',install:'Можно установить на экран телефона (меню браузера → «Добавить на главный экран»).',
show:'Новый клиент',show_tab:'Новый',show_t:'Витрина для нового клиента',hero1:'Товары для дома и магазина',hero2:'Оптом, с фото и ценами. Заказ прямо с витрины.',
in_stock:'товаров в наличии',n_cats:'категорий',hits:'Хиты продаж',news:'Новинки',cats_t:'Категории',all_goods:'Все товары',
about:'О товаре',code:'Артикул',barcode:'Штрихкод',unit:'Единица',inbox:'В коробке',hit:'Хит',isnew:'Новинка',zoom:'Нажмите на фото, чтобы увеличить',
checkout:'Оформить заказ',nc_title:'Новый клиент',nc_name:'Название магазина',nc_owner:'Имя владельца',nc_phone:'Телефон',nc_addr:'Адрес',nc_gps:'Отметить место магазина',
nc_gps_ok:'Место отмечено',nc_need:'Заполните название и телефон',nc_go:'Создать клиента и отправить заказ',nc_ok:'Новый клиент создан, заказ отправлен',
nc_hint:'Новому клиенту лимит долга — 2 000 000 сум. Больше — по разрешению супервайзера.',items_t:'Товары в заказе',prev:'Назад',nextp:'Дальше',close:'Закрыть',newbadge:'новый'},
uz:{app:'Vicon Agent',login:'Login',password:'Parol',enter:'Kirish',bad_login:'Login yoki parol noto‘g‘ri',logout:'Chiqish',hint:'Demo: agent1, agent2, agent3, super, admin, boss · parol 1234',
stores:'Nuqtalar',catalog:'Katalog',orders:'Buyurtmalar',day:'Kun',settings:'Yana',requests:'So‘rovlar',refs:'Ma’lumotnoma',summary:'Hisobot',agents:'Agentlar',
search:'Tovar qidirish',all:'Hammasi',stock:'Qoldiq',pcs:'dona',sum:'so‘m',cart:'Savat',total:'Jami',send:'Buyurtmani yuborish',empty_cart:'Savat bo‘sh',
no_more:'Qoldiqdan ortiq yo‘q',store:'Nuqta',pick_store:'Nuqtani tanlang',debt:'Qarz',limit:'Limit',order:'Buyurtma',repeat:'Buyurtmani takrorlash',ret:'Qaytarish',pay:'To‘lov',visit:'Tashrif',
history:'Tarix',sent:'Buyurtma yuborildi',queued:'Tarmoq yo‘q: buyurtma navbatda «yuborish kutilmoqda»',wait_send:'yuborish kutilmoqda',delivered_q:'Navbat yuborildi',
over_limit:'Qarz limiti oshdi. Buyurtma bloklandi.',ask:'Ruxsat so‘rash',asked:'So‘rov supervayzerga yuborildi',ask_wait:'So‘rov supervayzer qaroriga kutmoqda',
approve:'Ma’qullash',reject:'Rad etish',pending:'kutilmoqda',approved:'ma’qullandi',rejected:'rad etildi',no_req:'So‘rovlar yo‘q',
new:'Yangi',packed:'Yig‘ildi',shipped:'Jo‘natildi',delivered:'Yetkazildi',next:'Keyingisi',
reason:'Sabab',r_def:'Nuqson',r_exp:'Muddati o‘tgan',r_wrong:'Buyurtma xatosi',r_other:'Boshqa',save_ret:'Qaytarishni rasmiylashtirish',ret_ok:'Qaytarish qabul qilindi',
amount:'Summa',cash:'Naqd',transfer:'O‘tkazma',click:'Click',take_pay:'To‘lovni qabul qilish',pay_ok:'To‘lov qabul qilindi',
gps:'Joylashuvni aniqlash',gps_wait:'Aniqlanmoqda…',gps_ok:'Siz nuqtadasiz',gps_far:'Nuqtadan uzoqdasiz',gps_fail:'GPS mavjud emas',m:'m',photo:'Surat (kamera)',
no_order:'Buyurtmasiz',visit_save:'Tashrifni saqlash',visit_ok:'Tashrif yozildi',r_none:'Buyurtma bo‘ladi',r_closed:'Do‘kon yopiq',r_nomoney:'Pul yo‘q',r_noneed:'Kerak emas',
visits:'Tashriflar',ret_sum:'Qaytarishlar',payments:'To‘lovlar',pieces:'dona',agent:'Agent',totals:'Jami',day_title:'Kun yakuni',
language:'Til',netsim:'Tarmoq yo‘qligini taqlid qilish',reset:'Demo ma’lumotlarni tiklash',online:'Tarmoq bor',offline:'Tarmoq yo‘q',queue:'navbatda',
products:'Tovarlar',users:'Foydalanuvchilar',role:'Rol',price:'Narx',qty:'Soni',no_orders:'Buyurtmalar yo‘q',nothing:'Hech narsa yo‘q',
agent_r:'Agent',super_r:'Supervayzer',admin_r:'Administrator',boss_r:'Boshliq',all_debt:'Nuqtalar umumiy qarzi',n_stores:'Nuqtalar',n_orders:'Buyurtmalar',pend:'Kutayotgan so‘rovlar',
stock_err:'Qoldiqdan ortiq',back:'Orqaga',choose:'Tanlang',lines:'pozitsiya',address:'Manzil',repeat_ok:'Oldingi buyurtma savatda',nolast:'Oldingi buyurtma yo‘q',
ro_hint:'Buyurtmani agent beradi. Bu yerda — ko‘rish.',install:'Telefon ekraniga o‘rnatish mumkin (brauzer menyusi → «Bosh ekranga qo‘shish»).',
show:'Yangi mijoz',show_tab:'Yangi',show_t:'Yangi mijoz uchun vitrina',hero1:'Uy va do‘kon uchun tovarlar',hero2:'Ulgurji, rasm va narxlar bilan. Buyurtma to‘g‘ridan-to‘g‘ri vitrinadan.',
in_stock:'tovar mavjud',n_cats:'kategoriya',hits:'Ko‘p sotiladigan',news:'Yangi tovarlar',cats_t:'Kategoriyalar',all_goods:'Barcha tovarlar',
about:'Tovar haqida',code:'Artikul',barcode:'Shtrixkod',unit:'O‘lchov',inbox:'Qutida',hit:'Xit',isnew:'Yangi',zoom:'Kattalashtirish uchun rasmni bosing',
checkout:'Buyurtma berish',nc_title:'Yangi mijoz',nc_name:'Do‘kon nomi',nc_owner:'Egasining ismi',nc_phone:'Telefon',nc_addr:'Manzil',nc_gps:'Do‘kon joyini belgilash',
nc_gps_ok:'Joy belgilandi',nc_need:'Nomi va telefonni kiriting',nc_go:'Mijozni yaratish va buyurtma yuborish',nc_ok:'Yangi mijoz yaratildi, buyurtma yuborildi',
nc_hint:'Yangi mijozga qarz limiti — 2 000 000 so‘m. Ko‘prog‘i — supervayzer ruxsati bilan.',items_t:'Buyurtmadagi tovarlar',prev:'Orqaga',nextp:'Keyingi',close:'Yopish',newbadge:'yangi'}};
let LANG=localStorage.getItem('viconLang')||'ru';
const t=k=>(I18N[LANG][k]??I18N.ru[k]??k);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>new Intl.NumberFormat('ru-RU').format(Math.round(n))+' '+t('sum');
const $=s=>document.querySelector(s);
let ME=null, CART=JSON.parse(localStorage.getItem('viconCart')||'{"store":null,"lines":{}}');
let CAT={q:'',cat:'',cats:[],list:[]};
const saveCart=()=>localStorage.setItem(CART.nw?'viconCartNew':'viconCart',JSON.stringify(CART));
const cartCount=()=>Object.values(CART.lines).reduce((a,b)=>a+b,0);
let toastT;
function toast(m){const e=$('#toast');e.textContent=m;e.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>e.classList.remove('show'),2600);}

const TABS={agent:[['stores','🏪','stores'],['show','✨','show_tab'],['catalog','📦','catalog'],['orders','🧾','orders'],['day','📊','day'],['settings','⚙️','settings']],
 super:[['requests','✋','requests'],['stores','🏪','stores'],['orders','🧾','orders'],['day','📊','agents'],['settings','⚙️','settings']],
 admin:[['orders','🧾','orders'],['refs','📚','refs'],['day','📊','day'],['settings','⚙️','settings']],
 boss:[['summary','📈','summary'],['orders','🧾','orders'],['settings','⚙️','settings']]};
const ST=['new','packed','shipped','delivered'];

function shell(title,body,{back=null,tab=null}={}){
  const online=api.isOnline();
  $('#app').innerHTML=`<header class="top">${back?`<button class="back" data-a="go" data-to="${back}" aria-label="${t('back')}">‹</button>`:''}<h1>${esc(title)}</h1></header>
  <div class="net ${online?'':'off'}" id="net">${online?'● '+t('online'):'○ '+t('offline')}<span id="qn"></span></div>
  <main>${body}</main>
  ${ME?`<nav class="tabs">${TABS[ME.role].map(x=>`<a href="#/${x[0]}" class="${tab===x[0]?'on':''}" data-tab="${x[0]}"><b>${x[1]}</b>${t(x[2])}</a>`).join('')}</nav>`:''}`;
  updateQueue();
}
async function updateQueue(){const n=await api.queueSize();const e=$('#qn');if(e)e.textContent=n?` · ${t('queue')}: ${n}`:'';}
const roleName=r=>t(r+'_r');
const stBadge=o=>`<span class="badge ${o.status}">${t(o.status)}</span>`+(o.sent===false?` <span class="badge queue" data-q="1">${t('wait_send')}</span>`:'');

/* ---------- экраны ---------- */
const R={
async login(){
  $('#app').innerHTML=`<div class="login"><img class="logo" src="icon.svg" alt=""><h1 style="text-align:center;margin:0 0 18px">${t('app')}</h1>
  <label for="lg">${t('login')}</label><input id="lg" autocapitalize="none" autocomplete="username">
  <label for="pw">${t('password')}</label><input id="pw" type="password" autocomplete="current-password">
  <div id="err" class="alert" hidden></div><div style="height:14px"></div>
  <button data-a="login" id="enter">${t('enter')}</button><div class="mut" id="ver" style="text-align:center;margin-top:10px">версия 3 · карточка товара · новый клиент</div>
  <p class="mut" style="text-align:center">${t('hint')}</p>
  <div class="grid2"><button class="sec sm" data-a="lang" data-l="ru">Русский</button><button class="sec sm" data-a="lang" data-l="uz">O‘zbekcha</button></div></div>`;
},
async stores(){
  const list=await api.listStores();
  shell(t('stores'),list.map(s=>{const over=s.debt>s.limit*0.9;return `<a class="card" style="display:block;text-decoration:none;color:inherit" href="#/store/${s.id}" data-store="${s.id}">
    <div class="row"><b class="sp">${esc(s.name)}${s.isNew?` <span class="badge new">${t('newbadge')}</span>`:''}</b><span class="mut">${esc(s.agent)}</span></div><div class="mut">${esc(s.address)}</div>
    <div class="row" style="margin-top:6px"><span>${t('debt')}: <b class="${over?'bad':''}">${money(s.debt)}</b></span><span class="sp"></span><span class="mut">${t('limit')}: ${money(s.limit)}</span></div></a>`;}).join('')||`<p class="mut">${t('nothing')}</p>`,{tab:'stores'});
},
async store(id){
  const s=await api.getStore(id); const os=(await api.listOrders()).filter(o=>o.store==id).slice(0,5);
  const act=ME.role==='agent';
  shell(s.name,`<div class="card"><div class="mut">${esc(s.address)}</div><div class="row" style="margin-top:6px"><span>${t('debt')}: <b>${money(s.debt)}</b></span><span class="sp"></span><span class="mut">${t('limit')}: ${money(s.limit)}</span></div></div>
  ${act?`<div class="grid2"><button data-a="go" data-to="#/catalog/${s.id}" id="b-order">🛒 ${t('order')}</button><button class="sec" data-a="repeat" data-id="${s.id}" id="b-repeat">🔁 ${t('repeat')}</button>
  <button class="sec" data-a="go" data-to="#/return/${s.id}" id="b-ret">↩️ ${t('ret')}</button><button class="sec" data-a="go" data-to="#/pay/${s.id}" id="b-pay">💵 ${t('pay')}</button></div>
  <div style="height:8px"></div><button class="sec" data-a="go" data-to="#/visit/${s.id}" id="b-visit">📍 ${t('visit')}</button>`:`<p class="mut">${t('ro_hint')}</p>`}
  <h3>${t('history')}</h3>${os.map(orderCard).join('')||`<p class="mut">${t('no_orders')}</p>`}`,{back:'#/stores',tab:'stores'});
},
async catalog(sid){
  if(sid&&CART.store!=sid){ if(CART.store&&cartCount()===0||!CART.store||true) {CART.store=+sid;saveCart();} }
  CAT.cats=await api.listCategories(); CAT.q=''; CAT.cat='';
  const stores=await api.listStores();
  shell(t('catalog'),`${CART.store?'':''}<label for="stsel">${t('store')}</label><select id="stsel" data-a="pickstore"><option value="">${t('pick_store')}</option>${stores.map(s=>`<option value="${s.id}" ${CART.store==s.id?'selected':''}>${esc(s.name)}</option>`).join('')}</select>
  <div style="height:8px"></div><input id="q" type="search" placeholder="🔍 ${t('search')}" data-a-input="search">
  <div class="chips" id="chips"></div><div id="plist"></div><div style="height:70px"></div>
  <div class="cartbar" id="cartbar"></div>`,{tab:'catalog'});
  drawChips(); await drawProducts(); drawCartBar();
},
async cart(){
  const prods=await api.listProducts(); const map=Object.fromEntries(prods.map(p=>[p.id,p]));
  const ids=Object.keys(CART.lines).filter(i=>CART.lines[i]>0&&map[i]);
  const total=ids.reduce((s,i)=>s+map[i].price*CART.lines[i],0);
  const store=CART.store?await api.getStore(CART.store):null;
  shell(t('cart'),`${store?`<div class="card"><b>${esc(store.name)}</b><div class="mut">${t('debt')}: ${money(store.debt)} · ${t('limit')}: ${money(store.limit)}</div></div>`:`<div class="warnbox">${t('pick_store')}</div>`}
  ${ids.map(i=>`<div class="card"><div class="nm">${esc(map[i].name)}</div><div class="row"><span class="mut sp">${money(map[i].price)} × ${CART.lines[i]}</span>${stepper(i,CART.lines[i])}</div></div>`).join('')||`<p class="mut" id="emptycart">${t('empty_cart')}</p>`}
  <div class="card row"><b class="sp">${t('total')}</b><b id="carttotal">${money(total)}</b></div>
  <div id="limitbox"></div>
  <button data-a="submit" id="submit" ${ids.length&&store?'':'disabled'}>${t('send')}</button>`,{back:'#/catalog/'+(CART.store||''),tab:'catalog'});
},
async orders(){
  const os=await api.listOrders();
  shell(t('orders'),os.slice(0,60).map(o=>orderCard(o,ME.role==='admin')).join('')||`<p class="mut">${t('no_orders')}</p>`,{tab:'orders'});
},
async 'return'(id){
  const s=await api.getStore(id); const prods=await api.listProducts();
  const hist=(await api.listOrders()).filter(o=>o.store==id).flatMap(o=>o.lines); const seen={}; hist.forEach(l=>{seen[l.id]=l;});
  const items=Object.values(seen).filter(l=>prods.find(p=>p.id===l.id));
  RET={store:+id,lines:{}};
  shell(t('ret'),`<div class="card"><b>${esc(s.name)}</b></div>${items.map(l=>`<div class="card"><div class="nm">${esc(l.name)}</div><div class="row"><span class="mut sp">${money(l.price)}</span>
   <div class="step"><button data-a="rstep" data-id="${l.id}" data-d="-1">−</button><span id="rq${l.id}">0</span><button data-a="rstep" data-id="${l.id}" data-d="1" data-rp="${l.id}">+</button></div></div></div>`).join('')}
  <label for="rsn">${t('reason')}</label><select id="rsn"><option>${t('r_def')}</option><option>${t('r_exp')}</option><option>${t('r_wrong')}</option><option>${t('r_other')}</option></select>
  <div style="height:12px"></div><button data-a="doreturn" id="doreturn">${t('save_ret')}</button>`,{back:'#/store/'+id,tab:'stores'});
},
async pay(id){
  const s=await api.getStore(id); PAY='cash';
  shell(t('pay'),`<div class="card"><b>${esc(s.name)}</b><div>${t('debt')}: <b id="paydebt">${money(s.debt)}</b></div></div>
  <label for="amt">${t('amount')}</label><input id="amt" type="number" inputmode="numeric" min="1">
  <div class="grid2" style="margin:10px 0"><button class="chip on" data-a="method" data-m="cash">${t('cash')}</button><button class="chip" data-a="method" data-m="transfer">${t('transfer')}</button><button class="chip" data-a="method" data-m="click">${t('click')}</button></div>
  <button class="ok" data-a="dopay" id="dopay">${t('take_pay')}</button>`,{back:'#/store/'+id,tab:'stores'});
},
async visit(id){
  const s=await api.getStore(id); VIS={lat:null,lon:null,photo:null,dist:null};
  shell(t('visit'),`<div class="card"><b>${esc(s.name)}</b><div class="mut">${esc(s.address)}</div></div>
  <button class="sec" data-a="gps" id="gps">📍 ${t('gps')}</button><div id="gpsres"></div>
  <label for="ph">${t('photo')}</label><input id="ph" type="file" accept="image/*" capture="environment" data-a-change="photo"><div id="phprev"></div>
  <label for="vr">${t('no_order')}</label><select id="vr"><option value="">—</option><option>${t('r_none')}</option><option>${t('r_closed')}</option><option>${t('r_nomoney')}</option><option>${t('r_noneed')}</option></select>
  <div style="height:14px"></div><button data-a="dovisit" id="dovisit">${t('visit_save')}</button>`,{back:'#/store/'+id,tab:'stores'});
},
async day(){
  const d=await api.daySummary(); const one=ME.role==='agent';
  const row=r=>`<tr><td>${esc(r.name||t('totals'))}</td><td>${r.visits}</td><td>${r.orders}</td><td>${r.pieces}</td><td>${fmtN(r.sum)}</td><td>${fmtN(r.returns)}</td><td>${fmtN(r.payments)}</td></tr>`;
  shell(one?t('day_title'):t('agents'),one?dayCards(d.total):`<div class="card"><table id="daytbl"><thead><tr><th>${t('agent')}</th><th>${t('visits')}</th><th>${t('orders')}</th><th>${t('pieces')}</th><th>${t('sum')}</th><th>${t('ret_sum')}</th><th>${t('payments')}</th></tr></thead><tbody>${d.rows.map(row).join('')}</tbody><tfoot>${row({...d.total,name:''})}</tfoot></table></div>`,{tab:'day'});
},
async requests(){
  const rs=await api.listRequests();
  shell(t('requests'),rs.map(r=>`<div class="card"><div class="row"><b class="sp">${esc(r.storeName)}</b><span class="badge ${r.status}">${t(r.status)}</span></div>
   <div class="mut">${esc(r.agent)} · ${money(r.amount)}</div>${r.status==='pending'?`<div class="grid2" style="margin-top:8px"><button class="ok" data-a="decide" data-id="${r.id}" data-v="1">${t('approve')}</button><button class="red" data-a="decide" data-id="${r.id}" data-v="0">${t('reject')}</button></div>`:''}</div>`).join('')||`<p class="mut">${t('no_req')}</p>`,{tab:'requests'});
},
async refs(){
  const sub=REFSUB; const prods=await api.listProducts(); const stores=await api.listStores(); const users=await api.listUsers();
  const body={products:`<div class="card"><table><thead><tr><th>${t('products')}</th><th>${t('price')}</th><th>${t('stock')}</th></tr></thead><tbody>${prods.slice(0,120).map(p=>`<tr><td>${esc(p.name)}</td><td>${fmtN(p.price)}</td><td>${p.stock}</td></tr>`).join('')}</tbody></table></div>`,
   stores:`<div class="card"><table><thead><tr><th>${t('stores')}</th><th>${t('agent')}</th><th>${t('debt')}</th><th>${t('limit')}</th></tr></thead><tbody>${stores.map(s=>`<tr><td>${esc(s.name)}</td><td>${esc(s.agent)}</td><td>${fmtN(s.debt)}</td><td>${fmtN(s.limit)}</td></tr>`).join('')}</tbody></table></div>`,
   users:`<div class="card"><table><thead><tr><th>${t('login')}</th><th>${t('agent')}</th><th>${t('role')}</th></tr></thead><tbody>${users.map(u=>`<tr><td>${esc(u.login)}</td><td>${esc(u.name)}</td><td>${roleName(u.role)}</td></tr>`).join('')}</tbody></table></div>`}[sub];
  shell(t('refs'),`<div class="chips">${['products','stores','users'].map(k=>`<button class="chip ${sub===k?'on':''}" data-a="refsub" data-k="${k}">${t(k)}</button>`).join('')}</div>${body}`,{tab:'refs'});
},
async summary(){
  const o=await api.overview(); const d=await api.daySummary();
  shell(t('summary'),`<div class="grid2"><div class="card"><div class="mut">${t('all_debt')}</div><b>${money(o.debt)}</b></div><div class="card"><div class="mut">${t('n_stores')}</div><b>${o.stores}</b></div>
  <div class="card"><div class="mut">${t('n_orders')}</div><b>${o.orders}</b></div><div class="card"><div class="mut">${t('pend')}</div><b>${o.pending}</b></div></div>
  <h3>${t('day_title')}</h3><div class="card"><table id="daytbl"><thead><tr><th>${t('agent')}</th><th>${t('visits')}</th><th>${t('orders')}</th><th>${t('pieces')}</th><th>${t('sum')}</th><th>${t('ret_sum')}</th><th>${t('payments')}</th></tr></thead><tbody>${d.rows.map(r=>`<tr><td>${esc(r.name)}</td><td>${r.visits}</td><td>${r.orders}</td><td>${r.pieces}</td><td>${fmtN(r.sum)}</td><td>${fmtN(r.returns)}</td><td>${fmtN(r.payments)}</td></tr>`).join('')}</tbody>
  <tfoot><tr><td>${t('totals')}</td><td>${d.total.visits}</td><td>${d.total.orders}</td><td>${d.total.pieces}</td><td>${fmtN(d.total.sum)}</td><td>${fmtN(d.total.returns)}</td><td>${fmtN(d.total.payments)}</td></tr></tfoot></table></div>`,{tab:'summary'});
},
async settings(){
  shell(t('settings'),`<div class="card"><b>${esc(ME.name)}</b><div class="mut">${roleName(ME.role)} · ${esc(ME.login)}</div></div>
  <label>${t('language')}</label><div class="grid2"><button class="${LANG==='ru'?'':'sec'}" data-a="lang" data-l="ru">Русский</button><button class="${LANG==='uz'?'':'sec'}" data-a="lang" data-l="uz">O‘zbekcha</button></div>
  <div class="card sw" style="margin-top:12px"><input type="checkbox" id="netsim" data-a-change="netsim" ${api.netSim()?'checked':''}><label for="netsim" style="margin:0">${t('netsim')}</label></div>
  <p class="mut">${t('install')}</p>
  <button class="sec" data-a="reset" id="reset">${t('reset')}</button><div style="height:8px"></div><button class="red" data-a="logout" id="logout">${t('logout')}</button>`,{tab:'settings'});
}};
let RET=null,PAY='cash',VIS=null,REFSUB='products',LIST=[];
const fmtN=n=>new Intl.NumberFormat('ru-RU').format(Math.round(n));
function dayCards(x){return `<div class="grid2" id="daycards"><div class="card"><div class="mut">${t('visits')}</div><b>${x.visits}</b></div><div class="card"><div class="mut">${t('orders')}</div><b>${x.orders} · ${x.pieces} ${t('pcs')}</b></div>
 <div class="card"><div class="mut">${t('sum')}</div><b>${money(x.sum)}</b></div><div class="card"><div class="mut">${t('ret_sum')}</div><b>${money(x.returns)}</b></div><div class="card"><div class="mut">${t('payments')}</div><b>${money(x.payments)}</b></div></div>`;}
function orderCard(o,admin){
  const d=new Date(o.created).toLocaleDateString('ru-RU');
  return `<div class="card" data-order="${o.uuid}"><div class="row"><b class="sp">№${o.no}</b><span class="mut">${d}</span></div>
  <div class="mut">${o.lines.length} ${t('lines')} · ${o.lines.reduce((s,l)=>s+l.qty,0)} ${t('pcs')}</div><div class="row" style="margin-top:4px"><b class="sp">${money(o.total)}</b>${stBadge(o)}</div>
  ${admin&&o.status!=='delivered'?`<div style="margin-top:8px"><button class="sm" data-a="status" data-id="${o.uuid}" data-to="${ST[ST.indexOf(o.status)+1]}">${t('next')} → ${t(ST[ST.indexOf(o.status)+1])}</button></div>`:''}</div>`;
}
function stepper(id,q){return `<div class="step"><button data-a="step" data-id="${id}" data-d="-1" aria-label="−">−</button><span data-q="${id}">${q}</span><button data-a="step" data-id="${id}" data-d="1" aria-label="+">+</button></div>`;}
function drawChips(){const c=$('#chips');if(!c)return;c.innerHTML=`<button class="chip ${CAT.cat?'':'on'}" data-a="cat" data-c="">${t('all')}</button>`+CAT.cats.map(x=>`<button class="chip ${CAT.cat===x?'on':''}" data-a="cat" data-c="${esc(x)}">${esc(x)}</button>`).join('');}
async function drawProducts(){
  const list=await api.listProducts({q:CAT.q,cat:CAT.cat}); const el=$('#plist'); if(!el)return;
  LIST=list.map(p=>p.id);
  el.innerHTML=list.map(p=>`<div class="card prod" data-p="${p.id}"><img src="${p.img}" loading="lazy" alt="" data-a="pinfo" data-id="${p.id}"><div class="sp"><div class="nm" data-a="pinfo" data-id="${p.id}">${esc(p.name)} <span class="more">ℹ️</span></div>
   <div class="mut">${esc(p.cat)}</div><div><b>${money(p.price)}</b> · <span class="mut">${t('stock')}: <span data-stock="${p.id}">${p.stock-(CART.lines[p.id]||0)}</span></span></div>
   <div style="margin-top:6px">${stepper(p.id,CART.lines[p.id]||0)}</div></div></div>`).join('')||`<p class="mut">${t('nothing')}</p>`;
}
async function drawCartBar(){const b=$('#cartbar');if(!b)return;const n=cartCount();if(!n){b.innerHTML='';return;}
  const prods=await api.listProducts();const map=Object.fromEntries(prods.map(p=>[p.id,p]));
  const sum=Object.entries(CART.lines).reduce((s,[i,q])=>s+(map[i]?map[i].price*q:0),0);
  b.innerHTML=`<button data-a="go" data-to="#/cart" id="tocart">🛒 ${t('cart')}: ${n} ${t('pcs')} · ${money(sum)}</button>`;}

/* ---------- действия ---------- */
const A={
go:el=>{location.hash=el.dataset.to;},
async lang(el){LANG=el.dataset.l;localStorage.setItem('viconLang',LANG);document.documentElement.lang=LANG==='uz'?'uz':'ru';await route();},
async login(){const l=$('#lg').value,p=$('#pw').value;
  try{ME=await api.login(l,p);location.hash='#/'+TABS[ME.role][0][0];await route();}
  catch(e){const b=$('#err');b.hidden=false;b.textContent=t('bad_login');}},
async logout(){await api.logout();ME=null;CART={store:null,lines:{}};saveCart();location.hash='#/login';await route();},
async reset(){await api.resetDemo();CART={store:null,lines:{}};saveCart();toast('OK');await route();},
async pickstore(el){CART.store=el.value?+el.value:null;saveCart();},
async cat(el){CAT.cat=el.dataset.c;drawChips();await drawProducts();},
async step(el){
  const id=el.dataset.id,d=+el.dataset.d; const prods=await api.listProducts(); const p=prods.find(x=>x.id==id); const cur=CART.lines[id]||0; const nq=cur+d;
  if(nq<0)return; if(nq>p.stock){toast(t('no_more'));return;}
  if(nq===0)delete CART.lines[id]; else CART.lines[id]=nq; saveCart();
  document.querySelectorAll(`[data-q="${id}"]`).forEach(e=>e.textContent=nq);
  const st=document.querySelector(`[data-stock="${id}"]`);if(st)st.textContent=p.stock-nq;
  if($('#cartbar'))drawCartBar(); else if($('#carttotal')) await route();
},
async repeat(el){
  try{const ls=await api.lastOrderLines(el.dataset.id);const prods=await api.listProducts();CART={store:+el.dataset.id,lines:{}};
    ls.forEach(l=>{const p=prods.find(x=>x.id===l.id);if(p&&p.stock>0)CART.lines[l.id]=Math.min(l.qty,p.stock);});saveCart();toast(t('repeat_ok'));location.hash='#/cart';}
  catch(e){toast(t('nolast'));}},
async submit(el){
  if(!CART.uuid)CART.uuid=api.uuid(); saveCart();
  const lines=Object.entries(CART.lines).map(([id,q])=>({id:+id,qty:q}));
  try{const o=await api.createOrder({uuid:CART.uuid,store:CART.store,lines});
    toast(o.sent?t('sent'):t('queued'));CART={store:null,lines:{}};saveCart();location.hash='#/orders';}
  catch(e){
    if(e.code==='LIMIT'){const b=$('#limitbox');b.innerHTML=`<div class="alert" id="limitmsg">⛔ ${t('over_limit')}<br>${t('debt')}: ${money(e.debt)} + ${money(e.total)} > ${t('limit')}: ${money(e.limit)}</div>
      ${e.pending?`<div class="warnbox" id="askwait">${t('ask_wait')}</div>`:`<button class="warn" data-a="ask" id="ask">✋ ${t('ask')}</button><div style="height:10px"></div>`}`;}
    else toast(e.message);}},
async ask(){const prods=await api.listProducts();const total=Object.entries(CART.lines).reduce((s,[i,q])=>s+prods.find(p=>p.id==i).price*q,0);
  await api.requestApproval({store:CART.store,amount:total});toast(t('asked'));$('#limitbox').innerHTML=`<div class="warnbox" id="askwait">${t('ask_wait')}</div>`;},
async decide(el){await api.decideRequest(el.dataset.id,el.dataset.v==='1');await route();},
async status(el){await api.setStatus(el.dataset.id,el.dataset.to);await route();},
async rstep(el){const id=el.dataset.id,d=+el.dataset.d;const n=Math.max(0,(RET.lines[id]||0)+d);RET.lines[id]=n;$('#rq'+id).textContent=n;},
async doreturn(){const lines=Object.entries(RET.lines).filter(([,q])=>q>0).map(([id,qty])=>({id:+id,qty}));
  try{await api.createReturn({store:RET.store,lines,reason:$('#rsn').value});toast(t('ret_ok'));location.hash='#/store/'+RET.store;}catch(e){toast(e.message);}},
async method(el){PAY=el.dataset.m;document.querySelectorAll('[data-a=method]').forEach(b=>b.classList.toggle('on',b===el));},
async dopay(){const id=location.hash.split('/')[2];try{const p=await api.createPayment({store:id,amount:$('#amt').value,method:PAY});toast(t('pay_ok')+': '+money(p.amount));location.hash='#/store/'+id;}catch(e){toast(e.message);}},
async gps(){const r=$('#gpsres');r.innerHTML=`<p class="mut">${t('gps_wait')}</p>`;const id=location.hash.split('/')[2];const s=await api.getStore(id);
  if(!navigator.geolocation){r.innerHTML=`<div class="warnbox">${t('gps_fail')}</div>`;return;}
  navigator.geolocation.getCurrentPosition(pos=>{VIS.lat=pos.coords.latitude;VIS.lon=pos.coords.longitude;VIS.dist=Math.round(api.distance(VIS.lat,VIS.lon,s.lat,s.lon));
    r.innerHTML=VIS.dist<=150?`<div class="card good" id="gpsok">✅ ${t('gps_ok')} (${VIS.dist} ${t('m')})</div>`:`<div class="warnbox" id="gpswarn">⚠️ ${t('gps_far')}: ${VIS.dist} ${t('m')} (&gt; 150)</div>`;},
    ()=>{r.innerHTML=`<div class="warnbox" id="gpsfail">${t('gps_fail')}</div>`;},{enableHighAccuracy:true,timeout:8000});},
async photo(el){const f=el.files[0];if(!f)return;
  const url=await new Promise(res=>{const fr=new FileReader();fr.onload=()=>res(fr.result);fr.readAsDataURL(f);});
  VIS.photo=await new Promise(res=>{const im=new Image();im.onload=()=>{const k=Math.min(1,240/Math.max(im.width,im.height));const c=document.createElement('canvas');c.width=Math.max(1,im.width*k);c.height=Math.max(1,im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.6));};im.onerror=()=>res(null);im.src=url;});
  $('#phprev').innerHTML=VIS.photo?`<img class="shot" id="phimg" src="${VIS.photo}" alt="">`:'';},
async dovisit(){const id=location.hash.split('/')[2];const v=await api.createVisit({store:id,lat:VIS.lat,lon:VIS.lon,photo:VIS.photo,reason:$('#vr').value});
  toast(t('visit_ok')+(v.dist!=null&&!v.near?' ⚠️':''));location.hash='#/store/'+id;},
async refsub(el){REFSUB=el.dataset.k;await route();},
async netsim(el){api.setNetSim(el.checked);await netChanged();}};

document.addEventListener('click',async e=>{const el=e.target.closest('[data-a]');if(!el||el.tagName==='SELECT'||el.tagName==='INPUT')return;
  const f=A[el.dataset.a];if(f){try{await f(el);}catch(err){console.warn(err);toast(err.message||'error');}}});
document.addEventListener('change',async e=>{const el=e.target;const k=el.dataset.a||el.dataset.aChange;if(!k)return;if(el.dataset.aChange||el.tagName==='SELECT'){await A[k](el);}});
let sT;document.addEventListener('input',e=>{if(e.target.dataset.aInput==='search'){clearTimeout(sT);sT=setTimeout(async()=>{CAT.q=e.target.value;await drawProducts();},120);}});

async function netChanged(){
  if(api.isOnline()){const n=await api.syncQueue();if(n){toast(t('delivered_q')+': '+n);}}
  const e=$('#net');if(e){const on=api.isOnline();e.className='net '+(on?'':'off');e.firstChild.textContent=on?'● '+t('online'):'○ '+t('offline');}
  updateQueue(); if(location.hash==='#/orders')route();
}
window.addEventListener('online',netChanged);window.addEventListener('offline',netChanged);
setInterval(()=>{if(api.isOnline())api.queueSize().then(n=>{if(n)netChanged();});},3000);

async function route(){
  ME=await api.me();
  let h=location.hash.replace(/^#\//,'');const [name,arg]=h.split('/');
  if(!ME){if(name!=='login'){location.hash='#/login';return;}return R.login();}
  if(!name||name==='login'){location.hash='#/'+TABS[ME.role][0][0];return;}
  if(!TABS[ME.role].some(x=>x[0]===name)&&!['store','cart','return','pay','visit','catalog','newclient'].includes(name)){location.hash='#/'+TABS[ME.role][0][0];return;}
  try{await (R[name]||R.stores)(arg);}catch(e){
    if(e.code==='AUTH'){location.hash='#/login';return;}
    shell(t('app'),`<div class="alert" id="screenerr">${esc(e.message)}</div>`,{back:'#/'+TABS[ME.role][0][0]});}
  window.scrollTo(0,0);
}
window.addEventListener('hashchange',route);
if('serviceWorker' in navigator){const hadSW=!!navigator.serviceWorker.controller;navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).then(r=>r.update()).catch(()=>{});let rl=false;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(hadSW&&!rl){rl=true;location.reload();}});}
document.documentElement.lang=LANG==='uz'?'uz':'ru';
route().then(()=>api.syncQueue());
