#!/usr/bin/env python3
"""Дополняет demo/data/products.json карточкой товара: код, штрихкод, единица, в коробке,
описание ru/uz (из vicon-pages/info/info.json), крупное фото img/big/<id>.jpg, метки «хит»/«новинка».
Источники только читаются. Запуск повторный безопасен."""
import json
from collections import Counter
from pathlib import Path
from PIL import Image

DEMO = Path(__file__).resolve().parent.parent
SRC = Path('/home/sharof/workspace/projects/linko')
INFO = Path('/home/sharof/workspace/projects/vicon-pages/info/info.json')

items = json.load(open(DEMO / 'data/products.json'))
# цена-заглушка в Linko (0–100 сум) — такие товары в образец не берём
bad = {x['id'] for x in items if x['price'] < 500}
items = [x for x in items if x['id'] not in bad]
orders = json.load(open(DEMO / 'data/orders.json'))
for o in orders:
    o['lines'] = [l for l in o['lines'] if l['id'] not in bad]
    o['total'] = sum(l['price'] * l['qty'] for l in o['lines'])
orders = [o for o in orders if o['lines']]
json.dump(orders, open(DEMO / 'data/orders.json', 'w'), ensure_ascii=False)
for i in bad:
    for f in (DEMO / 'img' / f'{i}.jpg', DEMO / 'img/big' / f'{i}.jpg'):
        if f.exists(): f.unlink()
prods = {p['id']: p for p in json.load(open(SRC / 'products.json'))}
info = json.load(open(INFO))
# популярность — только по id товара (без магазинов и сумм)
pop = Counter(x['pid'] for x in json.load(open(SRC / 'my_order_items.json')))

(DEMO / 'img/big').mkdir(parents=True, exist_ok=True)
for it in items:
    i = it['id']; p = prods.get(i, {})
    it['code'] = p.get('vendor_code') or p.get('code') or ''
    it['barcode'] = (p.get('barcodes') or [p.get('barcode')] or [''])[0] or ''
    it['unit'] = (p.get('measurement') or {}).get('name') or 'шт'
    box = (p.get('boxes') or [{}])[0].get('amount')
    it['box'] = int(box) if box else None
    it['created'] = (p.get('created_date') or '')[:10]
    inf = info.get(str(i))
    if inf:
        it['info'] = {l: {'t': inf[l].get('t', ''), 'f': inf[l].get('f', [])} for l in ('ru', 'uz') if l in inf}
    else:
        it.pop('info', None)
    src = SRC / 'img_big' / f'{i}.jpg'
    dst = DEMO / 'img/big' / f'{i}.jpg'
    if src.exists():
        if not dst.exists():
            im = Image.open(src).convert('RGB'); im.thumbnail((720, 900))
            im.save(dst, 'JPEG', quality=74, optimize=True)
        it['big'] = f'img/big/{i}.jpg'
    it['pop'] = pop.get(i, 0)

hits = sorted(items, key=lambda x: -x['pop'])[:12]
newest = sorted(items, key=lambda x: x['created'], reverse=True)[:12]
for it in items:
    it['hit'] = it in hits and it['pop'] > 0
    it['isnew'] = it in newest
    it.pop('pop')
json.dump(items, open(DEMO / 'data/products.json', 'w'), ensure_ascii=False)
print('items', len(items), 'info', sum('info' in x for x in items), 'big', sum('big' in x for x in items),
      'hits', sum(x['hit'] for x in items), 'new', sum(x['isnew'] for x in items))
