"""Проверка «как на телефоне Шарофа» (П-072, П-073, П-077): запускать перед словами «у меня работает».
1) Холодное открытие на медленном интернете (400 кбит/с, задержка 400 мс): экран входа виден за 6 с, не пустой.
2) Старый профиль: открыли, закрыли, открыли снова — на экране та же версия, что в sw.js (не застряла старая).
Использование: python3 tests/phone.py [адрес]   (по умолчанию живая ссылка)   Выход 0 = PASS.
"""
import asyncio, re, sys, tempfile, pathlib
from playwright.async_api import async_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else "https://qwertyspacon.github.io/linko-demo/"
SW = pathlib.Path(__file__).resolve().parent.parent / "sw.js"
want = re.search(r"vicon-demo-v(\d+)", SW.read_text()).group(1)
UA = "Mozilla/5.0 (Linux; Android 12; SM-A125F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36 Telegram-Android/11.0"
fails = []

def ok(name, cond, extra=""):
    print(("PASS " if cond else "FAIL ") + name + (f" :: {extra}" if extra else ""))
    if not cond: fails.append(name)

async def slow(ctx, pg):
    cdp = await ctx.new_cdp_session(pg)
    await cdp.send("Network.enable")
    await cdp.send("Network.emulateNetworkConditions", {"offline": False, "latency": 400,
                   "downloadThroughput": 400e3 / 8, "uploadThroughput": 400e3 / 8})

async def main():
    async with async_playwright() as p:
        prof = tempfile.mkdtemp(prefix="phone-", dir="/home/sharof/workspace/tmp")
        ctx = await p.chromium.launch_persistent_context(prof, viewport={"width": 390, "height": 844},
                                                          is_mobile=True, user_agent=UA)
        pg = ctx.pages[0] if ctx.pages else await ctx.new_page()
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        await slow(ctx, pg)
        await pg.goto(URL, wait_until="commit")
        try:
            await pg.wait_for_selector("#enter", state="visible", timeout=6000)
            ok("медленный интернет: вход виден за 6 с", True)
        except Exception:
            await pg.screenshot(path="/home/sharof/workspace/tmp/phone-slow.png")
            ok("медленный интернет: вход виден за 6 с", False, "снимок tmp/phone-slow.png")
        await pg.wait_for_timeout(4000)  # дать sw установиться
        await pg.close()
        pg = await ctx.new_page()
        await pg.goto(URL, wait_until="load")
        await pg.wait_for_timeout(3000)
        ver = await pg.text_content("#ver") or ""
        ok(f"старый профиль: версия {want}", f"версия {want}" in ver, ver.strip()[:40])
        ok("нет ошибок страницы", not errs, errs[:2])
        await ctx.close()
        import shutil; shutil.rmtree(prof, ignore_errors=True)
    print("PHONE:", "PASS" if not fails else "FAIL")
    sys.exit(1 if fails else 0)

asyncio.run(main())
