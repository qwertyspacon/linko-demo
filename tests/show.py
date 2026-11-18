import asyncio, json
from playwright.async_api import async_playwright
BASE="http://127.0.0.1:8099/"; OUT="/home/sharof/workspace/tmp/linko-shots"
errs=[]
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(); ctx=await b.new_context(viewport={"width":390,"height":844},geolocation={"latitude":41.3,"longitude":69.24},permissions=["geolocation"])
    pg=await ctx.new_page()
    pg.on("console", lambda m: errs.append(m.text) if m.type=="error" else None)
    pg.on("pageerror", lambda e: errs.append("PAGEERROR "+str(e)))
    await pg.goto(BASE, wait_until="networkidle"); await pg.evaluate("localStorage.clear()"); await pg.goto(BASE, wait_until="networkidle")
    await pg.fill("#lg","agent1"); await pg.fill("#pw","1234"); await pg.click("#enter"); await pg.wait_for_timeout(700)
    await pg.screenshot(path=f"{OUT}/n-stores.png")
    # catalog -> product card
    await pg.click('a[data-store]'); await pg.wait_for_timeout(400); await pg.click("#b-order"); await pg.wait_for_timeout(600)
    await pg.click('.prod img[data-a="pinfo"]'); await pg.wait_for_timeout(700)
    print("sheet", await pg.is_visible("#sheet"), "desc", await pg.is_visible("#pdesc"))
    await pg.screenshot(path=f"{OUT}/n-card.png")
    await pg.click("#sheet .step [data-d='1']"); await pg.wait_for_timeout(300)
    await pg.evaluate("document.getElementById('sheet').scrollTop=2000"); await pg.screenshot(path=f"{OUT}/n-card2.png")
    await pg.click("#pnext"); await pg.wait_for_timeout(500); print("next", await pg.inner_text("#pname"))
    await pg.click("#bigimg"); await pg.wait_for_timeout(700); print("viewer", await pg.is_visible("#viewer"))
    await pg.mouse.dblclick(195,420); await pg.wait_for_timeout(300)
    await pg.screenshot(path=f"{OUT}/n-zoom.png")
    await pg.click(".viewer .x"); await pg.click("#sclose"); await pg.wait_for_timeout(300)
    print("cartbar", await pg.inner_text("#cartbar"))
    # showcase
    await pg.evaluate("localStorage.setItem('viconCart',JSON.stringify({store:null,lines:{}}))")
    await pg.goto(BASE+"#/show", wait_until="networkidle"); await pg.wait_for_timeout(1200)
    await pg.screenshot(path=f"{OUT}/n-show1.png")
    await pg.screenshot(path=f"{OUT}/n-showfull.png", full_page=True)
    btn=await pg.query_selector_all('#hits [data-a="step"][data-d="1"]'); await btn[0].click(); await btn[0].click(); await pg.wait_for_timeout(300)
    btn=await pg.query_selector_all('#sgrid [data-a="step"][data-d="1"]'); await btn[3].click(); await pg.wait_for_timeout(400)
    print("showbar", await pg.inner_text("#showbar"))
    await pg.click('.tile >> nth=2'); await pg.wait_for_timeout(600); await pg.screenshot(path=f"{OUT}/n-showcat.png")
    await pg.click("#checkout"); await pg.wait_for_timeout(700)
    await pg.click("#ncgo"); await pg.wait_for_timeout(300); print("need toast", await pg.inner_text("#toast"))
    await pg.fill("#ncn","Магазин «Тест»"); await pg.fill("#ncp","+998 90 000 00 00"); await pg.fill("#nca","ул. Навои, 1")
    await pg.click("#ncgps"); await pg.wait_for_timeout(800)
    await pg.screenshot(path=f"{OUT}/n-newclient.png", full_page=True)
    await pg.click("#ncgo"); await pg.wait_for_timeout(900); print("after", pg.url, await pg.inner_text("#toast"))
    await pg.screenshot(path=f"{OUT}/n-newstore.png")
    await pg.goto(BASE+"#/stores"); await pg.wait_for_timeout(600); print("stores has new", "Тест" in await pg.inner_text("body"))
    # uz
    await pg.goto(BASE+"#/settings"); await pg.wait_for_timeout(400); await pg.click('[data-l="uz"]'); await pg.goto(BASE+"#/show"); await pg.wait_for_timeout(800)
    await pg.screenshot(path=f"{OUT}/n-show-uz.png")
    await b.close()
asyncio.run(main()); print("ERRORS", json.dumps(errs,ensure_ascii=False)[:500])
