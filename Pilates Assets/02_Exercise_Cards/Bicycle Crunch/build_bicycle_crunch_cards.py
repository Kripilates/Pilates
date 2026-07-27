# -*- coding: utf-8 -*-
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

BASE = Path(__file__).resolve().parent
START = BASE / "bicycle_crunch_start_v01.png"
HERO = BASE / "bicycle_crunch_hero_v01.png"
END = BASE / "bicycle_crunch_end_v01.png"
GUIDE = BASE / "bicycle_crunch_guide_card_v01.png"
STEP = BASE / "bicycle_crunch_step_by_step_v01.png"

FONT_REG = r"C:\Windows\Fonts\arial.ttf"
FONT_BOLD = r"C:\Windows\Fonts\arialbd.ttf"

BG = (244, 251, 250)
WHITE = (255, 255, 255)
INK = (36, 45, 48)
MUTED = (88, 103, 106)
TURQ = (28, 181, 176)
TURQ_DARK = (0, 124, 124)
BORDER = (202, 230, 228)
PILL_BG = (228, 247, 245)
WARN_BG = (255, 246, 244)
WARN_BORDER = (247, 203, 198)
WARN = (213, 86, 80)


def f(size, bold=False):
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REG, size)


def text_box(draw, text, font):
    box = draw.textbbox((0, 0), text, font=font)
    return box[2] - box[0], box[3] - box[1]


def wrap(draw, text, font, width):
    lines = []
    for paragraph in text.split("\n"):
        words = paragraph.split()
        line = ""
        for word in words:
            candidate = word if not line else f"{line} {word}"
            if text_box(draw, candidate, font)[0] <= width:
                line = candidate
            else:
                if line:
                    lines.append(line)
                line = word
        if line:
            lines.append(line)
    return lines


def draw_wrap(draw, xy, text, font, fill, width, gap=7):
    x, y = xy
    for line in wrap(draw, text, font, width):
        draw.text((x, y), line, font=font, fill=fill)
        y += text_box(draw, line, font)[1] + gap
    return y


def card(draw, box, radius=24, fill=WHITE, outline=BORDER, width=2):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def cover_crop(img, size, y_bias=0.0):
    w, h = img.size
    tw, th = size
    scale = max(tw / w, th / h)
    nw, nh = int(round(w * scale)), int(round(h * scale))
    resized = img.resize((nw, nh), Image.LANCZOS)
    left = (nw - tw) // 2
    center_top = (nh - th) / 2
    top = int(round(center_top + y_bias * max(0, nh - th)))
    top = max(0, min(top, nh - th))
    return resized.crop((left, top, left + tw, top + th))


def paste_photo(canvas, img, xy, size, radius=20, y_bias=0.12):
    crop = cover_crop(img, size, y_bias).convert("RGBA")
    mask = Image.new("L", size, 0)
    md = ImageDraw.Draw(mask)
    md.rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    canvas.paste(crop, xy, mask)


def pill(draw, x, y, text):
    font = f(19, True)
    tw, _ = text_box(draw, text, font)
    draw.rounded_rectangle((x, y, x + tw + 34, y + 32), radius=16, fill=PILL_BG, outline=BORDER, width=1)
    draw.text((x + 17, y + 6), text, font=font, fill=TURQ_DARK)
    return x + tw + 46


def number(draw, x, y, value, r=16, fill=TURQ):
    draw.ellipse((x, y, x + 2 * r, y + 2 * r), fill=fill)
    font = f(17, True)
    tw, th = text_box(draw, value, font)
    draw.text((x + r - tw / 2, y + r - th / 2 - 1), value, font=font, fill=WHITE)


def draw_warning_icon(draw, x, y, size=22):
    pts = [(x + size / 2, y), (x + size, y + size), (x, y + size)]
    draw.line([pts[0], pts[1], pts[2], pts[0]], fill=WARN, width=3)
    draw.line((x + size / 2, y + 7, x + size / 2, y + 14), fill=WARN, width=3)
    draw.ellipse((x + size / 2 - 1.5, y + 18, x + size / 2 + 1.5, y + 21), fill=WARN)


def draw_info_icon(draw, kind, x, y, size=22):
    if kind == "breath":
        draw.arc((x, y + 2, x + size, y + size), 40, 315, fill=TURQ_DARK, width=3)
        draw.line((x + size - 3, y + 7, x + size, y + 2), fill=TURQ_DARK, width=3)
        draw.line((x + size - 3, y + 7, x + size - 9, y + 6), fill=TURQ_DARK, width=3)
    elif kind == "focus":
        draw.ellipse((x + 2, y + 2, x + size - 2, y + size - 2), outline=TURQ_DARK, width=3)
        draw.ellipse((x + 8, y + 8, x + size - 8, y + size - 8), fill=TURQ_DARK)
    else:
        draw.arc((x + 1, y + 3, x + size - 1, y + size - 1), 200, 35, fill=TURQ_DARK, width=3)
        draw.line((x + size - 2, y + size / 2, x + size - 7, y + size / 2 - 5), fill=TURQ_DARK, width=3)
        draw.line((x + size - 2, y + size / 2, x + size - 8, y + size / 2 + 4), fill=TURQ_DARK, width=3)


def draw_guide():
    start = Image.open(START).convert("RGB")
    hero = Image.open(HERO).convert("RGB")
    end = Image.open(END).convert("RGB")
    im = Image.new("RGB", (780, 1688), BG)
    d = ImageDraw.Draw(im)

    card(d, (34, 36, 746, 132), radius=26)
    d.text((63, 62), "BICYCLE CRUNCH", font=f(40, True), fill=INK)
    d.text((64, 110), "Posiluje šikmé břišní svaly a učí kontrolovanou rotaci hrudníku.", font=f(15), fill=MUTED)
    x = pill(d, 63, 145, "Břicho a pas")
    pill(d, x, 145, "Střídání stran")

    card(d, (34, 198, 746, 653), radius=28)
    paste_photo(im, hero, (50, 218), (680, 393), radius=22, y_bias=0.12)

    mini = [
        ("1", "START", "Nohy v tabletop", start),
        ("2", "ROTACE", "Loket ke kolenu", hero),
        ("3", "VÝMĚNA", "Vystřídej strany", end),
    ]
    mini_y, mini_w, mini_h = 684, 220, 194
    for idx, (num, title, body, pic) in enumerate(mini):
        x = 34 + idx * 246
        card(d, (x, mini_y, x + mini_w, mini_y + mini_h), radius=20)
        paste_photo(im, pic, (x + 12, mini_y + 12), (mini_w - 24, 104), radius=14, y_bias=0.10)
        number(d, x + 14, mini_y + 14, num)
        tw, _ = text_box(d, title, f(18, True))
        d.text((x + (mini_w - tw) / 2, mini_y + 125), title, font=f(18, True), fill=INK)
        tw, _ = text_box(d, body, f(16))
        d.text((x + (mini_w - tw) / 2, mini_y + 153), body, font=f(16), fill=MUTED)

    infos = [
        ("breath", "DECH", "Výdech při rotaci.\nNádech při výměně."),
        ("focus", "ZAMĚŘ SE", "Pánev stabilní,\nrotace hrudníkem."),
        ("repeat", "OPAKOVÁNÍ", "Počet je celkem\nza obě strany."),
    ]
    info_y, info_w, info_h = 918, 220, 142
    for idx, (icon, title, body) in enumerate(infos):
        x = 34 + idx * 240
        card(d, (x, info_y, x + info_w, info_y + info_h), radius=20)
        draw_info_icon(d, icon, x + 18, info_y + 22, 20)
        d.text((x + 47, info_y + 21), title, font=f(18, True), fill=TURQ_DARK)
        draw_wrap(d, (x + 18, info_y + 62), body, f(18), INK, info_w - 36, gap=5)

    card(d, (34, 1092, 746, 1412), radius=24)
    d.text((63, 1125), "JAK PROVÉST", font=f(28, True), fill=INK)
    steps = [
        "Začni vleže na zádech, ruce lehce za hlavou a nohy zvedni do tabletop.",
        "S výdechem přibliž opačný loket k pokrčenému kolenu a druhou nohu natáhni.",
        "Plynule vystřídej strany. Pánev drž stabilní a pohyb veď rotací hrudníku.",
    ]
    y = 1170
    for idx, text in enumerate(steps, 1):
        number(d, 64, y + 4, str(idx), r=15, fill=(222, 247, 246))
        d.text((76, y + 11), str(idx), font=f(15, True), fill=TURQ_DARK)
        y = draw_wrap(d, (108, y), text, f(21), INK, 585, gap=7) + 17

    card(d, (34, 1442, 746, 1618), radius=24, fill=WARN_BG, outline=WARN_BORDER, width=2)
    draw_warning_icon(d, 56, 1466, 22)
    d.text((92, 1462), "HLÍDEJ SI", font=f(21, True), fill=INK)
    draw_wrap(
        d,
        (63, 1510),
        "Netahej rukama za krk. Lokty nezavírej silou, bedra neprohýbej a rotaci veď hrudníkem, ne jen loktem.",
        f(21),
        INK,
        635,
        gap=8,
    )
    d.text((54, 1644), "Pilates Body 40+", font=f(13), fill=MUTED)
    im.save(GUIDE)


def draw_step():
    start = Image.open(START).convert("RGB")
    hero = Image.open(HERO).convert("RGB")
    end = Image.open(END).convert("RGB")
    im = Image.new("RGB", (780, 2280), BG)
    d = ImageDraw.Draw(im)

    card(d, (32, 31, 736, 113), radius=25)
    d.text((56, 52), "Krok za krokem", font=f(39, True), fill=INK)
    d.text((56, 93), "BICYCLE CRUNCH", font=f(14, True), fill=TURQ_DARK)

    rows = [
        ("KROK 1", "START", "Lehni si na záda. Ruce polož lehce za hlavu a nohy zvedni do tabletop. Pánev drž stabilní.", start),
        ("KROK 2", "ROTACE", "S výdechem přibliž levý loket k pravému kolenu. Levou nohu natáhni jen tak nízko, jak udržíš bedra.", hero),
        ("KROK 3", "VÝMĚNA STRAN", "Plynule vystřídej strany. Pravý loket směřuje k levému kolenu a pravá noha se natahuje.", end),
    ]
    y = 145
    for label, title, body, pic in rows:
        card(d, (32, y, 736, y + 562), radius=24)
        d.rounded_rectangle((56, y + 28, 146, y + 58), radius=15, fill=PILL_BG, outline=BORDER, width=1)
        d.text((68, y + 35), label, font=f(15, True), fill=TURQ_DARK)
        d.text((56, y + 83), title, font=f(27, True), fill=INK)
        paste_photo(im, pic, (56, y + 132), (648, 300), radius=18, y_bias=0.10)
        draw_wrap(d, (56, y + 452), body, f(19), INK, 648, gap=7)
        y += 580

    card(d, (32, 1885, 736, 2200), radius=24, fill=WARN_BG, outline=WARN_BORDER, width=2)
    draw_info_icon(d, "breath", 56, 1917, 22)
    d.text((92, 1916), "DECH", font=f(22, True), fill=INK)
    draw_wrap(d, (56, 1963), "Výdech při přiblížení lokte ke kolenu. Nádech při plynulé výměně stran.", f(21), INK, 645, gap=8)
    draw_warning_icon(d, 56, 2035, 22)
    d.text((92, 2032), "HLÍDEJ SI", font=f(22, True), fill=INK)
    draw_wrap(
        d,
        (56, 2084),
        "Netlač bradu k hrudníku a netahej za krk. Lokty nezavírej silou, bedra drž klidná a pohyb veď rotací hrudníku.",
        f(21),
        INK,
        645,
        gap=8,
    )
    d.text((48, 2228), "Pilates Body 40+", font=f(13), fill=MUTED)
    im.save(STEP)


if __name__ == "__main__":
    draw_guide()
    draw_step()
