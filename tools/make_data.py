#!/usr/bin/env python3
"""Собирает demo/data/*.json и уменьшенные фото из projects/linko (только чтение)."""
import json, os, random, subprocess
from pathlib import Path
SRC = Path('/home/sharof/workspace/projects/linko')
OUT = Path(__file__).resolve().parent.parent
random.seed(7)
prods = {p['id']: p for p in json.load(open(SRC/'products.json'))}
price = {}
for p in json.load(open(SRC/'prices.json')):
    if p['price_list']['id'] == 4:
        v = float(p.get('cash_price') or 0)
        if v > 0: price[p['product']['id']] = v
bal = {}
for b in json.load(open(SRC/'balances.json')):
    v = float(b.get('available') or b.get('balance') or 0)
    if v > 0: bal[b['id']] = int(v)
cand = [i for i in prods if i in price and i in bal and (SRC/'img2'/f'{i}.jpg').exists()]
random.shuffle(cand)
cand = sorted(cand[:300])
from PIL import Image
(OUT/'img').mkdir(exist_ok=True)
items = []
for i in cand:
    im = Image.open(SRC/'img2'/f'{i}.jpg').convert('RGB'); im.thumbnail((400, 400))
    im.save(OUT/'img'/f'{i}.jpg', 'JPEG', quality=70)
    p = prods[i]
    items.append({'id': i, 'name': p['name'], 'cat': (p.get('type') or {}).get('name') or 'Прочее',
                  'price': int(price[i]), 'stock': min(bal[i], 500), 'img': f'img/{i}.jpg'})
# убрать лишние фото от прошлых запусков
keep = {f'{i}.jpg' for i in cand}
for f in os.listdir(OUT/'img'):
    if f not in keep: os.remove(OUT/'img'/f)
json.dump(items, open(OUT/'data'/'products.json', 'w'), ensure_ascii=False)
users = [
 {'login':'agent1','name':'Рустам Алиев','role':'agent','super':'super'},
 {'login':'agent2','name':'Дилшод Каримов','role':'agent','super':'super'},
 {'login':'agent3','name':'Азиз Юсупов','role':'agent','super':'super'},
 {'login':'super','name':'Надира Рахимова','role':'super'},
 {'login':'admin','name':'Администратор','role':'admin'},
 {'login':'boss','name':'Начальник','role':'boss'}]
for u in users: u['password'] = '1234'
names = ['Магазин «Заря»','Минимаркет «Орзу»','Хозтовары «Мастер»','Магазин «Дўстлик»','Базар «Чорсу» ряд 4','Мини-маркет «Нур»',
 'Товары для дома «Уют»','Магазин «Саодат»','Универсам «Юнус»','Хозмаг «Барака»','Магазин «Лола»','Лавка «Сардор»',
 'Магазин «Чинор»','Минимаркет «Ситора»','Хозтовары «Олтин»','Магазин «Бахор»','Универмаг «Тошкент»','Магазин «Камола»']
streets = ['ул. Навои','ул. Амира Темура','ул. Бунёдкор','ул. Мирзо Улугбека','ул. Шота Руставели','ул. Фаргона йули']
stores = []
for k, n in enumerate(names):
    lat = 41.2995 + random.uniform(-.06, .06); lon = 69.2401 + random.uniform(-.07, .07)
    stores.append({'id': k+1, 'name': n, 'address': f'{random.choice(streets)}, {random.randint(1,120)}',
        'lat': round(lat,5), 'lon': round(lon,5), 'agent': f'agent{k%3+1}',
        'debt': random.choice([0,0,350000,820000,1500000,2400000]), 'limit': random.choice([2000000,3000000,5000000])})
stores[0].update(debt=0, limit=3000000); stores[1].update(debt=2900000, limit=3000000)   # для тестов
json.dump(stores, open(OUT/'data'/'stores.json','w'), ensure_ascii=False)
json.dump(users, open(OUT/'data'/'users.json','w'), ensure_ascii=False)
# выдуманная история заказов (по 2 на точку)
orders = []; n = 1000
for s in stores:
    for d in (3, 10):
        its = random.sample(items, random.randint(2, 4)); lines = []
        for it in its:
            lines.append({'id': it['id'], 'name': it['name'], 'price': it['price'], 'qty': random.randint(1, 5)})
        orders.append({'uuid': f'hist-{n}', 'no': n, 'store': s['id'], 'agent': s['agent'], 'lines': lines,
            'total': sum(l['price']*l['qty'] for l in lines), 'status': 'delivered',
            'created': f'2026-11-{18-d:02d}T11:00:00', 'sent': True}); n += 1
json.dump(orders, open(OUT/'data'/'orders.json','w'), ensure_ascii=False)
print(len(items), 'товаров,', len(stores), 'точек,', len(orders), 'заказов')
