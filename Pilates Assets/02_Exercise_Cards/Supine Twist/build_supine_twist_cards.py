# -*- coding: utf-8 -*-
from pathlib import Path
import hashlib

from PIL import Image, ImageDraw, ImageFont, ImageOps


BASE = Path(__file__).resolve().parent
START = BASE / "supine_twist_start_v01.png"
HERO = BASE / "supine_twist_hero_v01.png"
GUIDE = BASE / "supine_twist_guide_card_v01.png"
STEP = BASE / "supine_twist_step_by_step_v01.png"
EXPECTED_HASHES = {
    START: "824e0ca1a70241b7630577efa449b5c01f477e0e0f5f7885423238a3cb5bd9db",
    HERO: "24d54ff5a8318efc4824fbad4a2f11ea2c05694f95e2d3074f210f1c8aa24006",
}

BG = (244, 251, 250)
CARD = (255, 255, 255)
INK = (38, 44, 47)
MUTED = (101, 115, 119)
TEAL = (20, 154, 154)
TEAL_D = (14, 122, 123)
LINE = (210, 232, 230)
SOFT = (231, 247, 246)
WARN = (255, 247, 244)
WARN_LINE = (242, 220, 216)
WARN_ICON = (199, 92, 84)
FONT_DIR = Path(r"C:\Windows\Fonts")

GUIDE_HOW = [
    ("1", "Lehni si na záda, pokrč kolena a chodidla polož na podložku. Paže otevři do stran."),
    ("2", "S výdechem spouštěj obě kolena společně do strany a nech pánev přirozeně rotovat."),
    ("3", "Obě ramena drž na podložce, hrudník otevřený vzhůru a kolena stále u sebe."),
    ("4", "S nádechem vrať kolena do středu a poté cvik zopakuj na opačnou stranu."),
]
GUIDE_WATCH = (
    "Kolena nerozděluj a rameno na opačné straně nezvedej. Pohyb veď pomalu, bez švihu a jen do "
    "rozsahu, ve kterém zůstává hrudník otevřený."
)
STEP_TEXTS = [
    ("KROK 1", "VÝCHOZÍ POLOHA", START,
     "Lehni si na záda, pokrč kolena a chodidla polož na podložku. Paže otevři do stran a ramena uvolni."),
    ("KROK 2", "KOLENA DO STRANY", HERO,
     "S výdechem spouštěj obě kolena společně do strany. Pánev nech přirozeně následovat pohyb."),
    ("KROK 3", "OTEVŘENÝ HRUDNÍK", HERO,
     "Kolena drž u sebe a obě ramena nech na podložce. Hrudník zůstává otevřený vzhůru."),
    ("KROK 4", "NÁVRAT A VYSTŘÍDÁNÍ", START,
     "S nádechem vrať kolena do středu. Poté stejný pohyb proveď kontrolovaně na opačnou stranu."),
]
STEP_BREATH = (
    "Nadechni se ve středu. Vydechni při spouštění kolen do strany a dýchej plynule ve výdrži."
)
STEP_WATCH = (
    "Pohyb neprováděj švihem. Kolena nerozděluj, nezvedej opačné rameno a nechoď do rozsahu, "
    "který vyvolává bolest v zádech."
)


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def font(name, size):
    for candidate in (FONT_DIR / name, FONT_DIR / "arial.ttf", FONT_DIR / "segoeui.ttf"):
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


F = {
    "title": font("arialbd.ttf", 38),
    "h2": font("arialbd.ttf", 25),
    "h3": font("arialbd.ttf", 20),
    "body": font("arial.ttf", 20),
    "small": font("arial.ttf", 17),
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
    last_bottom = y
    for line in wrap_text(draw, text, selected_font, max_width):
        draw.text((x, y), line, font=selected_font, fill=fill)
        bounds = draw.textbbox((x, y), line, font=selected_font)
        last_bottom = bounds[3]
        y += draw.textbbox((0, 0), line, font=selected_font)[3] + line_gap
    return y, last_bottom


def contain_image(path, size):
    with Image.open(path) as source:
        contained = ImageOps.contain(source.convert("RGB"), size, Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", size, CARD)
    x = (size[0] - contained.width) // 2
    y = (size[1] - contained.height) // 2
    canvas.paste(contained, (x, y))
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
    draw.text((x1 + (x2 - x1 - (bounds[2] - bounds[0])) / 2,
               y1 + (y2 - y1 - (bounds[3] - bounds[1])) / 2 - 2),
              text, font=selected_font, fill=fill)


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
    elif kind == "warn":
        draw.polygon([(x, y - 10), (x - 10, y + 9), (x + 10, y + 9)], outline=color, width=3)
        draw.line((x, y - 3, x, y + 3), fill=color, width=2)
        draw.ellipse((x - 1, y + 6, x + 1, y + 8), fill=color)


def ensure_margin(label, bottom, card_bottom, minimum=20):
    margin = card_bottom - bottom
    if margin < minimum:
        raise RuntimeError(f"{label} bottom margin {margin}px is below {minimum}px")
    return margin


def verify_sources():
    for path, expected_hash in EXPECTED_HASHES.items():
        if not path.exists():
            raise FileNotFoundError(path)
        with Image.open(path) as image:
            if image.size != (1536, 1024) or image.mode != "RGB" or image.format != "PNG":
                raise RuntimeError(f"Unexpected source properties for {path.name}: {image.size} {image.mode}")
        if sha256(path) != expected_hash:
            raise RuntimeError(f"SHA mismatch for {path.name}")


def build_guide():
    image = Image.new("RGB", (780, 1688), BG)
    draw = ImageDraw.Draw(image)
    margins = {}

    rounded(draw, (34, 34, 746, 140))
    draw.text((62, 47), "SUPINE TWIST", font=F["title"], fill=INK)
    draw.text((62, 91), "Rotace páteře vleže", font=F["small_b"], fill=TEAL_D)
    _, bottom = draw_wrapped(draw, (62, 114), "Uvolnění zad, páteře a oblasti boků.", F["tiny"], MUTED, 650, 2)
    margins["GUIDE DESCRIPTION"] = 140 - bottom
    x = pill(draw, (62, 148), "Mobilita a celé tělo", F["small_b"])
    pill(draw, (x, 148), "Bez pomůcky", F["small_b"])

    rounded(draw, (34, 196, 746, 653))
    paste_round(image, contain_image(HERO, (680, 393)), (50, 218, 730, 611))

    mini_y, mini_w, mini_h = 675, 218, 146
    xs = [34, 274, 514]
    labels = [
        ("START", "Kolena uprostřed", START),
        ("ROTACE", "Kolena do strany", HERO),
        ("ZPĚT", "Návrat do středu", START),
    ]
    for index, (x0, (label, caption, source)) in enumerate(zip(xs, labels), 1):
        card_bottom = mini_y + mini_h + 74
        rounded(draw, (x0, mini_y, x0 + mini_w, card_bottom), 22)
        paste_round(image, contain_image(source, (mini_w - 22, mini_h)),
                    (x0 + 11, mini_y + 10, x0 + mini_w - 11, mini_y + 10 + mini_h), 16)
        draw.ellipse((x0 + 15, mini_y + 15, x0 + 43, mini_y + 43), fill=TEAL)
        center_text(draw, (x0 + 15, mini_y + 15, x0 + 43, mini_y + 43), str(index), F["tiny"], CARD)
        center_text(draw, (x0 + 5, mini_y + mini_h + 14, x0 + mini_w - 5, mini_y + mini_h + 40), label, F["small_b"], INK)
        center_text(draw, (x0 + 5, mini_y + mini_h + 38, x0 + mini_w - 5, mini_y + mini_h + 59), caption, F["tiny"], MUTED)

    info_y, box_w, box_h = 915, 218, 164
    info = [
        ("breath", "DECH", "Nádech ve středu, výdech při spouštění kolen do strany."),
        ("focus", "ZAMĚŘ SE", "Obě ramena na podložce a kolena stále u sebe."),
        ("repeat", "OPAKOVÁNÍ", "Vydrž podle dávky a poté vystřídej stranu."),
    ]
    for index, (x0, (kind, heading, body)) in enumerate(zip(xs, info), 1):
        card_bottom = info_y + box_h
        rounded(draw, (x0, info_y, x0 + box_w, card_bottom), 22)
        draw_icon(draw, (x0 + 28, info_y + 30), kind)
        draw.text((x0 + 48, info_y + 18), heading, font=F["small_b"], fill=TEAL_D)
        _, body_bottom = draw_wrapped(draw, (x0 + 18, info_y + 56), body, F["small"], INK, box_w - 36, 4)
        margins[f"GUIDE INFO {index}"] = ensure_margin(f"Guide info {index}", body_bottom, card_bottom)

    rounded(draw, (34, 1090, 746, 1412), 26)
    draw.text((62, 1115), "JAK PROVÉST", font=F["h2"], fill=INK)
    y = 1153
    for number, text in GUIDE_HOW:
        draw.ellipse((62, y + 2, 92, y + 32), fill=SOFT, outline=LINE, width=1)
        center_text(draw, (62, y + 2, 92, y + 32), number, F["small_b"], TEAL_D)
        y, body_bottom = draw_wrapped(draw, (106, y), text, F["body"], INK, 590, 6)
        y += 7
    margins["GUIDE HOW"] = ensure_margin("Guide how", body_bottom, 1412)

    rounded(draw, (34, 1440, 746, 1618), 26, WARN, WARN_LINE, 2)
    draw_icon(draw, (64, 1473), "warn", WARN_ICON)
    draw.text((92, 1457), "HLÍDEJ SI", font=F["h3"], fill=INK)
    _, watch_bottom = draw_wrapped(draw, (62, 1500), GUIDE_WATCH, F["body"], INK, 640, 7)
    margins["GUIDE WATCH"] = ensure_margin("Guide watch", watch_bottom, 1618)
    draw.text((54, 1640), "Pilates Body 40+", font=F["tiny"], fill=MUTED)
    image.save(GUIDE)
    return margins


def build_step():
    image = Image.new("RGB", (780, 2280), BG)
    draw = ImageDraw.Draw(image)
    margins = {}

    rounded(draw, (34, 34, 746, 126))
    draw.text((62, 50), "Krok za krokem", font=F["step_title"], fill=INK)
    draw.text((62, 96), "SUPINE TWIST • ROTACE PÁTEŘE VLEŽE", font=F["small_b"], fill=TEAL_D)

    y = 145
    for step_label, heading, source, body in STEP_TEXTS:
        card_height = 456
        card_bottom = y + card_height
        rounded(draw, (34, y, 746, card_bottom))
        draw.rounded_rectangle((58, y + 20, 148, y + 50), radius=15, fill=SOFT, outline=LINE, width=1)
        center_text(draw, (58, y + 20, 148, y + 50), step_label, F["small_b"], TEAL_D)
        draw.text((62, y + 66), heading, font=F["step_h"], fill=INK)
        image_bottom = y + 350
        paste_round(image, contain_image(source, (656, 240)), (62, y + 110, 718, image_bottom), 20)
        _, body_bottom = draw_wrapped(draw, (62, image_bottom + 14), body, F["step_body"], INK, 650, 5)
        margins[step_label] = ensure_margin(step_label, body_bottom, card_bottom)
        y += card_height + 5

    rounded(draw, (34, 1994, 746, 2218), 28, WARN, WARN_LINE, 2)
    draw_icon(draw, (66, 2030), "breath")
    draw.text((98, 2013), "DECH", font=F["step_h"], fill=INK)
    next_y, breath_bottom = draw_wrapped(draw, (62, 2055), STEP_BREATH, F["step_body"], INK, 650, 5)
    margins["STEP BREATH"] = 2218 - breath_bottom
    draw_icon(draw, (66, next_y + 22), "warn", WARN_ICON)
    draw.text((98, next_y + 5), "HLÍDEJ SI", font=F["step_h"], fill=INK)
    _, watch_bottom = draw_wrapped(draw, (62, next_y + 43), STEP_WATCH, F["step_body"], INK, 650, 5)
    margins["STEP WATCH"] = ensure_margin("Step watch", watch_bottom, 2218)
    draw.text((54, 2240), "Pilates Body 40+", font=F["tiny"], fill=MUTED)
    image.save(STEP)
    return margins


def main():
    verify_sources()
    before = {path: sha256(path) for path in EXPECTED_HASHES}
    guide_margins = build_guide()
    step_margins = build_step()
    after = {path: sha256(path) for path in EXPECTED_HASHES}
    if before != after:
        raise RuntimeError("Source image hash changed during export")
    for path, expected_size in ((GUIDE, (780, 1688)), (STEP, (780, 2280))):
        with Image.open(path) as image:
            if image.size != expected_size or image.mode != "RGB" or image.format != "PNG":
                raise RuntimeError(f"Unexpected export properties for {path.name}: {image.size} {image.mode}")
    print(f"Exported {GUIDE.name} 780x1688 RGB SHA-256 {sha256(GUIDE)}")
    print(f"Exported {STEP.name} 780x2280 RGB SHA-256 {sha256(STEP)}")
    for label, margin in guide_margins.items():
        print(f"{label} bottom reserve: {margin}px")
    for label, margin in step_margins.items():
        print(f"{label} bottom reserve: {margin}px")
    for path, digest in after.items():
        print(f"Source unchanged {path.name}: {digest}")


if __name__ == "__main__":
    main()
