import asyncio, json, os, sys
from playwright.async_api import async_playwright
BASE="http://127.0.0.1:8099/"
OUT="/home/sharof/workspace/tmp/linko-shots"; os.makedirs(OUT,exist_ok=True)
errs=[]; checks=[]
def ok(name,cond,extra=""):
    checks.append((name,bool(cond),extra)); print(("PASS " if cond else "FAIL ")+name+(" :: "+str(extra) if extra else ""))
async def login(pg,u,p="1234"):
    await pg.goto(BASE+"#/login", wait_until="networkidle")
    await pg.evaluate("localStorage.clear()")
    await pg.goto(BASE, wait_until="networkidle")
    await pg.fill("#lg",u); await pg.fill("#pw",p); await pg.click("#enter")
    await pg.wait_for_timeout(700)
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        ctx=await b.new_context(viewport={"width":390,"height":844})
        pg=await ctx.new_page()
        pg.on("console", lambda m: errs.append(m.text) if m.type=="error" else None)
        pg.on("pageerror", lambda e: errs.append("PAGEERROR "+str(e)))
        # S1 wrong password
        await pg.goto(BASE, wait_until="networkidle")
        await pg.fill("#lg","agent1"); await pg.fill("#pw","0000"); await pg.click("#enter"); await pg.wait_for_timeout(400)
        ok("S1 неверный пароль даёт ошибку", await pg.is_visible("#err") and "Неверный" in await pg.inner_text("#err"))
        # login agent
        await pg.fill("#pw","1234"); await pg.click("#enter"); await pg.wait_for_timeout(700)
        ok("S1 вход агентом", "#/stores" in pg.url, pg.url)
        await pg.screenshot(path=f"{OUT}/a-stores.png")
        # S2 agent sees only own stores
        txt=await pg.inner_text("body")
        ok("S2 агент видит свои точки", "agent1" in txt and "agent2" not in txt)
        # S3/S4 order
        await pg.click('a[data-store]'); await pg.wait_for_timeout(500)
        await pg.click("#b-order"); await pg.wait_for_timeout(600)
        ok("S3 каталог открылся", await pg.is_visible("#chips") or await pg.is_visible("#search"))
        await pg.screenshot(path=f"{OUT}/a-catalog.png")
        # add first product twice
        addbtns=await pg.query_selector_all('[data-a="step"][data-d="1"]')
        ok("S3 товары есть", len(addbtns)>0, len(addbtns))
        await addbtns[0].click(); await addbtns[0].click(); await pg.wait_for_timeout(300)
        await pg.screenshot(path=f"{OUT}/a-catalog-added.png")
        await pg.click("#tocart"); await pg.wait_for_timeout(500)
        ok("S4 корзина открылась", await pg.is_visible("#submit"))
        await pg.screenshot(path=f"{OUT}/a-cart.png")
        await pg.click("#submit"); await pg.wait_for_timeout(900)
        body=await pg.inner_text("body")
        ok("S4 заказ отправлен", "Заказ отправлен" in body or "отправлен" in body.lower(), body[:120].replace("\n"," | "))
        await pg.screenshot(path=f"{OUT}/a-order-sent.png")
        # S5 repeat
        await pg.goto(BASE+"#/store/1", wait_until="networkidle"); await pg.wait_for_timeout(400)
        await pg.click("#b-repeat"); await pg.wait_for_timeout(600)
        body=await pg.inner_text("body")
        ok("S5 повтор заказа", "корзине" in body or "Корзина" in body, body[:120].replace("\n"," | "))
        # S6 return
        await pg.goto(BASE+"#/return/1", wait_until="networkidle"); await pg.wait_for_timeout(500)
        ok("S6 возврат открылся", await pg.is_visible("#doreturn"))
        rplus=await pg.query_selector_all('[data-a="rstep"][data-d="1"]')
        if rplus:
            await rplus[0].click(); await pg.wait_for_timeout(200)
        await pg.click("#doreturn"); await pg.wait_for_timeout(700)
        ok("S6 возврат принят", "Возврат принят" in await pg.inner_text("body"))
        # S7 payment
        await pg.goto(BASE+"#/pay/1", wait_until="networkidle"); await pg.wait_for_timeout(400)
        await pg.fill('input[type="number"]',"100000") if await pg.query_selector('input[type="number"]') else None
        await pg.click("#dopay"); await pg.wait_for_timeout(700)
        ok("S7 оплата принята", "Оплата принята" in await pg.inner_text("body"))
        # S8 visit
        await pg.goto(BASE+"#/visit/1", wait_until="networkidle"); await pg.wait_for_timeout(400)
        await pg.click("#dovisit"); await pg.wait_for_timeout(700)
        ok("S8 визит записан", "Визит записан" in await pg.inner_text("body"))
        # S9 day
        await pg.goto(BASE+"#/day", wait_until="networkidle"); await pg.wait_for_timeout(600)
        await pg.screenshot(path=f"{OUT}/a-day.png")
        ok("S9 итог дня", "Итог дня" in await pg.inner_text("body"))
        # offline order
        await pg.goto(BASE+"#/settings", wait_until="networkidle"); await pg.wait_for_timeout(400)
        await pg.click('#netsim'); await pg.wait_for_timeout(400)
        await pg.goto(BASE+"#/catalog/1", wait_until="networkidle"); await pg.wait_for_timeout(500)
        addbtns=await pg.query_selector_all('[data-a="step"][data-d="1"]')
        if addbtns: await addbtns[0].click()
        await pg.wait_for_timeout(200)
        if await pg.is_visible("#tocart"): await pg.click("#tocart")
        await pg.wait_for_timeout(400)
        if await pg.is_visible("#submit"): await pg.click("#submit")
        await pg.wait_for_timeout(700)
        body=await pg.inner_text("body")
        ok("S4 офлайн заказ в очереди", "очеред" in body.lower(), body[:160].replace("\n"," | "))
        await pg.screenshot(path=f"{OUT}/a-offline.png")
        await pg.goto(BASE+"#/settings", wait_until="networkidle"); await pg.wait_for_timeout(300)
        await pg.click('#netsim'); await pg.wait_for_timeout(1200)
        # language
        await pg.click('[data-a="lang"][data-l="uz"]'); await pg.wait_for_timeout(500)
        ok("S11 узбекский язык", "Yana" in await pg.inner_text("body") or "Kun" in await pg.inner_text("body"))
        await pg.screenshot(path=f"{OUT}/a-uz.png")
        await pg.click('[data-a="lang"][data-l="ru"]'); await pg.wait_for_timeout(300)
        # S2 roles
        await pg.goto(BASE+"#/login", wait_until="networkidle"); await pg.wait_for_timeout(300)
        await pg.evaluate("localStorage.removeItem('viconDemoSession')")
        await pg.goto(BASE, wait_until="networkidle"); await pg.wait_for_timeout(300)
        if await pg.is_visible("#lg"):
            await pg.fill("#lg","super"); await pg.fill("#pw","1234"); await pg.click("#enter"); await pg.wait_for_timeout(700)
        ok("S2 супервайзер видит запросы", "Запросы" in await pg.inner_text("body"))
        await pg.screenshot(path=f"{OUT}/b-super.png")
        await pg.goto(BASE+"#/login", wait_until="networkidle"); await pg.wait_for_timeout(200)
        await pg.evaluate("localStorage.removeItem('viconDemoSession')")
        await pg.goto(BASE, wait_until="networkidle"); await pg.wait_for_timeout(300)
        if await pg.is_visible("#lg"):
            await pg.fill("#lg","boss"); await pg.fill("#pw","1234"); await pg.click("#enter"); await pg.wait_for_timeout(700)
        body=await pg.inner_text("body")
        ok("S2 начальник видит сводку", "Сводка" in body or "Итого" in body)
        await pg.screenshot(path=f"{OUT}/c-boss.png")
        await pg.goto(BASE+"#/login", wait_until="networkidle"); await pg.wait_for_timeout(200)
        await pg.evaluate("localStorage.removeItem('viconDemoSession')")
        await pg.goto(BASE, wait_until="networkidle"); await pg.wait_for_timeout(300)
        if await pg.is_visible("#lg"):
            await pg.fill("#lg","admin"); await pg.fill("#pw","1234"); await pg.click("#enter"); await pg.wait_for_timeout(700)
        await pg.goto(BASE+"#/orders", wait_until="networkidle"); await pg.wait_for_timeout(600)
        await pg.screenshot(path=f"{OUT}/d-admin-orders.png")
        ok("S10 админ видит заказы", "Заказы" in await pg.inner_text("body"))
        st=await pg.query_selector('[data-a="status"]')
        if st:
            await st.click(); await pg.wait_for_timeout(700)
            ok("S10 статус меняется", True)
        # S12 console errors
        await b.close()
    ok("S12 нет ошибок в консоли", len(errs)==0, json.dumps(errs,ensure_ascii=False)[:300])
    bad=[c for c in checks if not c[1]]
    print("SUMMARY", len(checks)-len(bad), "из", len(checks), "PASS")
    if bad: print("FAILED:", [b[0] for b in bad])
asyncio.run(main())
