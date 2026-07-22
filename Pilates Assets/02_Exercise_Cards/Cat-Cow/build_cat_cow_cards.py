from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import hashlib

ROOT = Path(__file__).resolve().parents[3]
FOLDER = ROOT / "Pilates Assets" / "02_Exercise_Cards" / "Cat-Cow"

START = FOLDER / "cat_cow_start_v01.png"
HERO = FOLDER / "cat_cow_hero_v01.png"
END = FOLDER / "cat_cow_end_v01.png"
GUIDE = FOLDER / "cat_cow_guide_card_v01.png"
STEP = FOLDER / "cat_cow_step_by_step_v01.png"

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
    ("1", "Začni na všech čtyřech, ruce pod rameny a kolena pod kyčlemi."),
    ("2", "S výdechem podsadíš pánev, vyhrbíš záda a necháš hlavu klesnout."),
    ("3", "S nádechem jemně otevři hrudník, prodluž páteř a vrať se přes neutrální pozici."),
]

GUIDE_WATCH = "Nepropadej se mezi lopatkami, nezvedej ramena k uším a neprohýbej bedra silou."

STEP_TEXTS = [
    ("KROK 1", "VÝCHOZÍ POZICE", START, "Začni na všech čtyřech. Dlaně dej pod ramena, kolena pod kyčle a záda drž neutrálně."),
    ("KROK 2", "KOČKA", HERO, "S výdechem podsadíš pánev, vyhrbíš záda a necháš hlavu přirozeně klesnout."),
    ("KROK 3", "KRÁVA", END, "S nádechem jemně otevři hrudník, prodluž páteř a pohyb veď bez propadnutí do beder."),
]

STEP_WATCH = "Pohyb veď plynule a bez švihu. Ramena drž daleko od uší a bedra neprohýbej silou."
STEP_BREATH = "Výdech do kočky. Nádech do krávy."


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def font(name, size):
    for candidate in (FONT_DIR / name, FONT_DIR / "arial.ttf", FONT_DIR / "segoeui.ttf"):
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


F = {
    "title": font("arialbd.ttf", 46),
    "h2": font("arialbd.ttf", 25),
    "h3": font("arialbd.ttf", 20),
    "body": font("arial.ttf", 22),
    "small": font("arial.ttf", 17),
    "small_b": font("arialbd.ttf", 17),
    "tiny": font("arial.ttf", 14),
    "step_title": font("arialbd.ttf", 38),
    "step_h": font("arialbd.ttf", 24),
    "step_body": font("arial.ttf", 23),
}


def rounded(d, box, radius=28, fill=CARD, outline=LINE, width=2):
    d.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def wrap_text(d, text, fnt, maxw):
    words = text.split()
    lines = []
    cur = ""
    for word in words:
        test = (cur + " " + word).strip()
        if d.textbbox((0, 0), test, font=fnt)[2] <= maxw or not cur:
            cur = test
        else:
            lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def draw_wrapped(d, xy, text, fnt, fill, maxw, line_gap=7):
    x, y = xy
    last_bottom = y
    for line in wrap_text(d, text, fnt, maxw):
        d.text((x, y), line, font=fnt, fill=fill)
        bbox = d.textbbox((x, y), line, font=fnt)
        last_bottom = bbox[3]
        y += d.textbbox((0, 0), line, font=fnt)[3] + line_gap
    return y, last_bottom


def fit_image(path, size):
    return ImageOps.fit(Image.open(path).convert("RGB"), size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))


def paste_round(base, im, box, radius=22):
    x1, y1, x2, y2 = box
    size = (x2 - x1, y2 - y1)
    if im.size != size:
        im = im.resize(size, Image.Resampling.LANCZOS)
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    base.paste(im, (x1, y1), mask)


def center_text(d, box, text, fnt, fill):
    x1, y1, x2, y2 = box
    b = d.textbbox((0, 0), text, font=fnt)
    d.text((x1 + (x2 - x1 - (b[2] - b[0])) / 2, y1 + (y2 - y1 - (b[3] - b[1])) / 2 - 2), text, font=fnt, fill=fill)


def pill(d, xy, text, fnt, fill=SOFT, outline=LINE, txt=TEAL_D):
    x, y = xy
    b = d.textbbox((0, 0), text, font=fnt)
    px, py = 16, 8
    box = (x, y, x + b[2] - b[0] + px * 2, y + b[3] - b[1] + py * 2)
    d.rounded_rectangle(box, radius=16, fill=fill, outline=outline, width=1)
    d.text((x + px, y + py - 1), text, font=fnt, fill=txt)
    return box[2] + 8


def draw_icon(d, center, kind, color=TEAL):
    x, y = center
    if kind == "breath":
        d.arc((x - 8, y - 8, x + 8, y + 8), 25, 320, fill=color, width=3)
        d.line((x + 7, y - 8, x + 12, y - 8, x + 12, y - 3), fill=color, width=3)
    elif kind == "focus":
        d.ellipse((x - 8, y - 8, x + 8, y + 8), outline=color, width=3)
        d.ellipse((x - 3, y - 3, x + 3, y + 3), fill=color)
    elif kind == "repeat":
        d.arc((x - 9, y - 7, x + 9, y + 7), 200, 20, fill=color, width=3)
        d.polygon([(x + 8, y - 8), (x + 14, y - 5), (x + 9, y - 1)], fill=color)
    elif kind == "warn":
        d.polygon([(x, y - 10), (x - 10, y + 9), (x + 10, y + 9)], outline=color, width=3)
        d.line((x, y - 3, x, y + 3), fill=color, width=2)
        d.ellipse((x - 1, y + 6, x + 1, y + 8), fill=color)


def verify_sources():
    for path in (START, HERO, END):
        if not path.exists():
            raise FileNotFoundError(path)
        with Image.open(path) as im:
            if im.size != (1536, 1024):
                raise RuntimeError(f"Unexpected source size for {path.name}: {im.size}")


def ensure_bottom_margin(name, bottom, card_bottom, minimum=20):
    margin = card_bottom - bottom
    if margin < minimum:
        raise RuntimeError(f"{name} bottom margin {margin}px is below {minimum}px")
    return margin


def build_guide():
    img = Image.new("RGB", (780, 1688), BG)
    d = ImageDraw.Draw(img)

    rounded(d, (34, 34, 746, 132), 28, CARD, LINE, 2)
    d.text((62, 52), "KOČKA-KRÁVA", font=F["title"], fill=INK)
    d.text((62, 98), "Cat-Cow", font=F["small_b"], fill=TEAL_D)
    draw_wrapped(d, (62, 118), "Uvolňuje páteř, ramena a kyčle. Učí plynulý pohyb s dechem.", F["tiny"], MUTED, 650, 2)
    x = 62
    x = pill(d, (x, 142), "Mobilita páteře", F["small_b"])
    pill(d, (x, 142), "Uvolnění zad", F["small_b"])

    rounded(d, (34, 196, 746, 653), 28, CARD, LINE, 2)
    paste_round(img, fit_image(HERO, (680, 393)), (50, 218, 730, 611), 22)

    mini_y, mini_w, mini_h, gap = 675, 218, 146, 22
    xs = [34, 34 + mini_w + gap, 34 + 2 * (mini_w + gap)]
    labels = [("START", "Neutrální záda"), ("KOČKA", "Vyhrb záda"), ("KRÁVA", "Otevři hrudník")]
    paths = [START, HERO, END]
    for i, (x0, (label, caption), path) in enumerate(zip(xs, labels, paths), 1):
        rounded(d, (x0, mini_y, x0 + mini_w, mini_y + mini_h + 58), 22, CARD, LINE, 2)
        paste_round(img, fit_image(path, (mini_w - 22, mini_h)), (x0 + 11, mini_y + 10, x0 + mini_w - 11, mini_y + 10 + mini_h), 16)
        d.ellipse((x0 + 15, mini_y + 15, x0 + 43, mini_y + 43), fill=TEAL)
        center_text(d, (x0 + 15, mini_y + 15, x0 + 43, mini_y + 43), str(i), F["tiny"], (255, 255, 255))
        center_text(d, (x0 + 8, mini_y + mini_h + 14, x0 + mini_w - 8, mini_y + mini_h + 40), label, F["small_b"], INK)
        center_text(d, (x0 + 8, mini_y + mini_h + 38, x0 + mini_w - 8, mini_y + mini_h + 57), caption, F["tiny"], MUTED)

    info_y, box_w, box_h = 915, 218, 142
    info = [
        ("breath", "DECH", "Výdech do kočky. Nádech do krávy."),
        ("focus", "ZAMĚŘ SE", "Pohyb veď obratel po obratli, bez tlačení do beder."),
        ("repeat", "OPAKOVÁNÍ", "Plynule podle dávky v tréninku."),
    ]
    for x0, (kind, head, body) in zip(xs, info):
        rounded(d, (x0, info_y, x0 + box_w, info_y + box_h), 22, CARD, LINE, 2)
        draw_icon(d, (x0 + 28, info_y + 30), kind)
        d.text((x0 + 48, info_y + 18), head, font=F["small_b"], fill=TEAL_D)
        draw_wrapped(d, (x0 + 18, info_y + 56), body, F["small"], INK, box_w - 36, 4)

    rounded(d, (34, 1090, 746, 1412), 26, CARD, LINE, 2)
    d.text((62, 1120), "JAK PROVÉST", font=F["h2"], fill=INK)
    y = 1165
    for number, text in GUIDE_HOW:
        d.ellipse((62, y + 2, 92, y + 32), fill=SOFT, outline=LINE, width=1)
        center_text(d, (62, y + 2, 92, y + 32), number, F["small_b"], TEAL_D)
        y, _ = draw_wrapped(d, (106, y), text, F["body"], INK, 590, 7)
        y += 12

    rounded(d, (34, 1440, 746, 1618), 26, WARN, WARN_LINE, 2)
    draw_icon(d, (64, 1473), "warn", WARN_ICON)
    d.text((92, 1457), "HLÍDEJ SI", font=F["h3"], fill=INK)
    _, watch_bottom = draw_wrapped(d, (62, 1500), GUIDE_WATCH, F["body"], INK, 640, 7)
    ensure_bottom_margin("Guide watch", watch_bottom, 1618)
    d.text((54, 1640), "Pilates Body 40+", font=F["tiny"], fill=MUTED)
    img.save(GUIDE)


def build_step():
    img = Image.new("RGB", (780, 2280), BG)
    d = ImageDraw.Draw(img)
    rounded(d, (34, 34, 746, 126), 28, CARD, LINE, 2)
    d.text((62, 56), "Krok za krokem", font=F["step_title"], fill=INK)
    d.text((62, 98), "KOČKA-KRÁVA / Cat-Cow", font=F["small_b"], fill=TEAL_D)

    y = 160
    margins = {}
    for step_label, heading, photo, body in STEP_TEXTS:
        card_h = 575
        card_bottom = y + card_h
        rounded(d, (34, y, 746, card_bottom), 28, CARD, LINE, 2)
        d.rounded_rectangle((58, y + 24, 148, y + 54), radius=15, fill=SOFT, outline=LINE, width=1)
        center_text(d, (58, y + 24, 148, y + 54), step_label, F["small_b"], TEAL_D)
        d.text((62, y + 72), heading, font=F["step_h"], fill=INK)
        image_bottom = y + 466
        paste_round(img, fit_image(photo, (656, 352)), (62, y + 114, 718, image_bottom), 22)
        text_y = image_bottom + 20
        _, body_bottom = draw_wrapped(d, (62, text_y), body, F["step_body"], INK, 650, 7)
        margins[step_label] = ensure_bottom_margin(step_label, body_bottom, card_bottom)
        y += card_h + 18

    rounded(d, (34, y, 746, y + 300), 28, WARN, WARN_LINE, 2)
    draw_icon(d, (66, y + 45), "breath", TEAL)
    d.text((98, y + 28), "DECH", font=F["step_h"], fill=INK)
    y2, _ = draw_wrapped(d, (62, y + 78), STEP_BREATH, F["step_body"], INK, 650, 8)
    draw_icon(d, (66, y2 + 31), "warn", WARN_ICON)
    d.text((98, y2 + 14), "HLÍDEJ SI", font=F["step_h"], fill=INK)
    _, watch_bottom = draw_wrapped(d, (62, y2 + 64), STEP_WATCH, F["step_body"], INK, 650, 8)
    margins["STEP WATCH"] = ensure_bottom_margin("Step watch", watch_bottom, y + 300)
    d.text((54, 2240), "Pilates Body 40+", font=F["tiny"], fill=MUTED)
    img.save(STEP)
    return margins


def main():
    verify_sources()
    before = {path: sha256(path) for path in (START, HERO, END)}
    build_guide()
    margins = build_step()
    after = {path: sha256(path) for path in (START, HERO, END)}
    if before != after:
        raise RuntimeError("Source image hash changed during export")
    for path, expected_size in ((GUIDE, (780, 1688)), (STEP, (780, 2280))):
        with Image.open(path) as im:
            if im.size != expected_size:
                raise RuntimeError(f"Unexpected export size for {path.name}: {im.size}")
    print(f"Exported {GUIDE.name} 780x1688")
    print(f"Exported {STEP.name} 780x2280")
    print("Source START/HERO/END unchanged")
    for label, margin in margins.items():
        print(f"{label} bottom margin: {margin}px")


if __name__ == "__main__":
    main()
