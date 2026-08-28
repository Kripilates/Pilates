# -*- coding: utf-8 -*-
from pathlib import Path
import hashlib

from PIL import Image, ImageDraw, ImageFont, ImageOps


BASE = Path(__file__).resolve().parent
START = BASE / "triceps_kickback_start_v01.png"
HERO = BASE / "triceps_kickback_hero_v01.png"
GUIDE = BASE / "triceps_kickback_guide_card_v01.png"
STEP = BASE / "triceps_kickback_step_by_step_v01.png"

BG = (244, 251, 250)
CARD = (255, 255, 255)
INK = (38, 44, 47)
MUTED = (92, 108, 112)
TEAL = (20, 154, 154)
TEAL_D = (14, 122, 123)
LINE = (210, 232, 230)
SOFT = (231, 247, 246)
WARN = (255, 247, 244)
FONT_DIR = Path(r"C:\Windows\Fonts")


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def font(name, size):
    for candidate in (FONT_DIR / name, FONT_DIR / "arial.ttf", FONT_DIR / "segoeui.ttf"):
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


F = {
    "title": font("arialbd.ttf", 44),
    "subtitle": font("arialbd.ttf", 21),
    "h2": font("arialbd.ttf", 25),
    "body": font("arial.ttf", 20),
    "small_b": font("arialbd.ttf", 17),
    "tiny": font("arial.ttf", 14),
    "step_title": font("arialbd.ttf", 38),
    "step_h": font("arialbd.ttf", 22),
    "step_body": font("arial.ttf", 18),
}


def rounded(draw, box, radius=28, fill=CARD, outline=LINE, width=2):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def wrap_text(draw, text, selected_font, max_width):
    lines, current = [], ""
    for word in text.split():
        candidate = (current + " " + word).strip()
        if draw.textbbox((0, 0), candidate, font=selected_font)[2] <= max_width or not current:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_wrapped(draw, xy, text, selected_font, fill, max_width, line_gap=7):
    x, y = xy
    for line in wrap_text(draw, text, selected_font, max_width):
        draw.text((x, y), line, font=selected_font, fill=fill)
        y += draw.textbbox((0, 0), line, font=selected_font)[3] + line_gap
    return y


def fit_image(path, size, crop=True):
    with Image.open(path) as source:
        source = source.convert("RGB")
        if crop:
            return ImageOps.fit(source, size, method=Image.Resampling.LANCZOS, centering=(0.52, 0.55))
        contained = ImageOps.contain(source, size, Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", size, CARD)
    canvas.paste(contained, ((size[0] - contained.width) // 2, (size[1] - contained.height) // 2))
    return canvas


def paste_round(base, image, box, radius=22):
    x1, y1, x2, y2 = box
    size = (x2 - x1, y2 - y1)
    if image.size != size:
        image = image.resize(size, Image.Resampling.LANCZOS)
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    base.paste(image, (x1, y1), mask)


def center_text(draw, box, text, selected_font, fill):
    x1, y1, x2, y2 = box
    bounds = draw.textbbox((0, 0), text, font=selected_font)
    draw.text(
        (x1 + (x2 - x1 - (bounds[2] - bounds[0])) / 2,
         y1 + (y2 - y1 - (bounds[3] - bounds[1])) / 2 - 2),
        text,
        font=selected_font,
        fill=fill,
    )


def pill(draw, xy, text, selected_font):
    x, y = xy
    bounds = draw.textbbox((0, 0), text, font=selected_font)
    box = (x, y, x + bounds[2] - bounds[0] + 32, y + bounds[3] - bounds[1] + 16)
    draw.rounded_rectangle(box, radius=16, fill=SOFT, outline=LINE, width=1)
    draw.text((x + 16, y + 7), text, font=selected_font, fill=TEAL_D)
    return box[2] + 8


def draw_icon(draw, center, kind, color=TEAL):
    x, y = center
    if kind == "breath":
        draw.arc((x - 8, y - 8, x + 8, y + 8), 25, 320, fill=color, width=3)
        draw.line((x + 7, y - 8, x + 12, y - 8, x + 12, y - 3), fill=color, width=3)
    elif kind == "focus":
        draw.ellipse((x - 8, y - 8, x + 8, y + 8), outline=color, width=3)
        draw.ellipse((x - 3, y - 3, x + 3, y + 3), fill=color)
    elif kind == "repeat":
        draw.arc((x - 9, y - 7, x + 9, y + 7), 200, 20, fill=color, width=3)
        draw.polygon([(x + 8, y - 8), (x + 14, y - 5), (x + 9, y - 1)], fill=color)


def verify_sources():
    for path in (START, HERO):
        if not path.exists():
            raise FileNotFoundError(path)
        with Image.open(path) as image:
            if image.mode != "RGB" or image.format != "PNG":
                raise RuntimeError(f"Unexpected source properties for {path.name}: {image.size} {image.mode}")


def build_guide():
    image = Image.new("RGB", (780, 1688), BG)
    draw = ImageDraw.Draw(image)

    rounded(draw, (34, 34, 746, 146))
    draw.text((62, 48), "TRICEPS KICKBACK", font=F["title"], fill=INK)
    draw.text((62, 98), "Zadní strana paží", font=F["subtitle"], fill=TEAL_D)
    x = pill(draw, (62, 154), "Triceps", F["small_b"])
    pill(draw, (x, 154), "Činky", F["small_b"])

    rounded(draw, (34, 206, 746, 670))
    paste_round(image, fit_image(HERO, (680, 402), crop=True), (50, 232, 730, 634), 22)

    mini_y, mini_w, mini_h = 698, 218, 146
    xs = [34, 274, 514]
    labels = [
        ("START", "Lokty u těla", START),
        ("HERO", "Propni paže", HERO),
        ("START", "Kontrolovaný návrat", START),
    ]
    for index, (x0, (label, caption, source)) in enumerate(zip(xs, labels), 1):
        rounded(draw, (x0, mini_y, x0 + mini_w, mini_y + mini_h + 74), 22)
        paste_round(image, fit_image(source, (mini_w - 22, mini_h), crop=True),
                    (x0 + 11, mini_y + 10, x0 + mini_w - 11, mini_y + 10 + mini_h), 16)
        draw.ellipse((x0 + 15, mini_y + 15, x0 + 43, mini_y + 43), fill=TEAL)
        center_text(draw, (x0 + 15, mini_y + 15, x0 + 43, mini_y + 43), str(index), F["tiny"], CARD)
        center_text(draw, (x0 + 5, mini_y + mini_h + 14, x0 + mini_w - 5, mini_y + mini_h + 40), label, F["small_b"], INK)
        center_text(draw, (x0 + 8, mini_y + mini_h + 38, x0 + mini_w - 8, mini_y + mini_h + 60), caption, F["tiny"], MUTED)

    info_y, box_w, box_h = 942, 218, 174
    info = [
        ("Dech", ["Výdech při propnutí.", "Nádech při návratu."], "breath"),
        ("Zaměř se", ["Lokty drž u těla.", "Nadloktí stabilní."], "focus"),
        ("Opakování", ["Lehká 10-12×", "Střední 11-13×", "Náročná 14-15×"], "repeat"),
    ]
    for x0, (title, lines, icon) in zip(xs, info):
        rounded(draw, (x0, info_y, x0 + box_w, info_y + box_h), 22, fill=CARD, outline=(222, 238, 236), width=1)
        draw_icon(draw, (x0 + 28, info_y + 31), icon)
        draw.text((x0 + 48, info_y + 19), title, font=F["small_b"], fill=INK)
        y = info_y + 58
        for line in lines:
            draw_wrapped(draw, (x0 + 18, y), line, F["tiny"], MUTED, box_w - 36, 4)
            y += 28

    rounded(draw, (34, 1152, 746, 1436))
    draw.text((62, 1184), "Krátký průběh", font=F["h2"], fill=INK)
    guide_lines = [
        "1. Zaujmi stabilní mírný předklon.",
        "2. Zpevni střed těla a drž záda neutrální.",
        "3. Lokty drž u těla a propni předloktí dozadu.",
        "4. Vrať činky kontrolovaně bez houpání trupem.",
    ]
    y = 1230
    for line in guide_lines:
        y = draw_wrapped(draw, (62, y), line, F["body"], MUTED, 650, 5) + 5

    rounded(draw, (34, 1466, 746, 1648), 28, fill=WARN, outline=(242, 220, 216), width=1)
    draw.text((62, 1498), "Na co si dát pozor", font=F["h2"], fill=INK)
    draw_wrapped(
        draw,
        (62, 1544),
        "Nezvedej ramena k uším, neprohýbej bedra a nešvihej činkami. Pohyb vychází hlavně z lokte.",
        F["body"],
        MUTED,
        650,
        7,
    )

    image.save(GUIDE, "PNG")


def build_step():
    image = Image.new("RGB", (780, 2280), BG)
    draw = ImageDraw.Draw(image)

    rounded(draw, (34, 34, 746, 136))
    draw.text((62, 48), "Krok za krokem", font=F["step_title"], fill=INK)
    draw.text((62, 94), "Triceps Kickback", font=F["small_b"], fill=TEAL_D)

    steps = [
        ("START", START, "Postav se stabilně a lehce se předkloň. Zpevni střed těla, drž záda neutrální a lokty přitáhni k trupu."),
        ("PROPNUTÍ PAŽÍ", HERO, "Bez pohybu nadloktí propni předloktí dozadu. Lokty zůstávají u těla."),
        ("KONTROLA POHYBU", HERO, "Krátce pohyb kontroluj v krajní poloze. Ramena drž dole a trup stabilní."),
        ("NÁVRAT", START, "Kontrolovaně pokrč lokty a vrať činky do výchozí polohy. Poté pokračuj dalším opakováním."),
    ]

    y = 174
    for index, (title, source, text) in enumerate(steps, 1):
        rounded(draw, (34, y, 746, y + 418))
        paste_round(image, fit_image(source, (680, 300), crop=True), (50, y + 24, 730, y + 324), 22)
        draw.ellipse((62, y + 38, 104, y + 80), fill=TEAL)
        center_text(draw, (62, y + 38, 104, y + 80), str(index), F["small_b"], CARD)
        draw.text((62, y + 340), title, font=F["step_h"], fill=INK)
        draw_wrapped(draw, (62, y + 372), text, F["step_body"], MUTED, 650, 5)
        y += 418
        if index < len(steps):
            center_text(draw, (0, y + 13, 780, y + 55), "↓", font("arialbd.ttf", 32), TEAL_D)
            y += 76

    rounded(draw, (34, 2114, 746, 2240), 28, fill=CARD, outline=LINE, width=1)
    draw.text((62, 2142), "Dech", font=F["h2"], fill=INK)
    draw_wrapped(
        draw,
        (62, 2186),
        "Vydechni při propnutí paží. Nadechni se při kontrolovaném návratu.",
        F["body"],
        MUTED,
        650,
        7,
    )

    image.save(STEP, "PNG")


if __name__ == "__main__":
    verify_sources()
    build_guide()
    build_step()
    for path in (START, HERO, GUIDE, STEP):
        with Image.open(path) as image:
            print(path.name, image.size, image.mode, sha256(path))
