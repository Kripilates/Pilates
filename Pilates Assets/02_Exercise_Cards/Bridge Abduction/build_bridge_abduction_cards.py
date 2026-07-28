from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import hashlib


ROOT = Path(__file__).resolve().parents[3]
FOLDER = ROOT / "Pilates Assets" / "02_Exercise_Cards" / "Bridge Abduction"

START = FOLDER / "bridge_abduction_start_v01.png"
HERO = FOLDER / "bridge_abduction_hero_v01.png"
GUIDE = FOLDER / "bridge_abduction_guide_card_v01.png"
STEP = FOLDER / "bridge_abduction_step_by_step_v01.png"

EXPECTED = {
    START: "06c457d35bcdc8dbb4aa5686e72b2c281d83f35f62ba6757da8c995d2c8d8b3b",
    HERO: "72fd56bdc8122fc09b96be70bc66dfebe8f892d2cb73dfe7e27b19dd95a90b0e",
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
    ("1", "Lehni si na záda, chodidla polož na podložku a zvedni pánev do stabilního mostu."),
    ("2", "S výdechem otevři obě kolena do stran. Pánev drž vodorovnou a stále nahoře."),
    ("3", "S nádechem vrať kolena kontrolovaně vpřed. Chodidla nech bez pohybu."),
]

GUIDE_WATCH = (
    "Pánev drž vodorovnou a stále nahoře. Neprohýbej bedra, "
    "nevytáčej chodidla a neotvírej kolena švihem."
)

STEP_TEXTS = [
    (
        "KROK 1",
        "VÝCHOZÍ MOST",
        START,
        "Lehni si na záda, chodidla polož na podložku a zvedni pánev. Kolena směřují vpřed.",
    ),
    (
        "KROK 2",
        "OTEVŘENÍ KOLEN",
        HERO,
        "S výdechem otevři obě kolena do stran. Pánev drž stabilní, vodorovnou a stále nahoře.",
    ),
    (
        "KROK 3",
        "KONTROLOVANÝ NÁVRAT",
        START,
        "S nádechem vrať kolena do výchozí polohy. Chodidla se neposouvají a pánev neklesá.",
    ),
]

STEP_WATCH = (
    "Pánev drž vodorovnou a stále nahoře. Neprohýbej bedra, "
    "nevytáčej chodidla a neotvírej kolena švihem."
)


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def font(name, size):
    for candidate in (FONT_DIR / name, FONT_DIR / "arial.ttf", FONT_DIR / "segoeui.ttf"):
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


F = {
    "title": font("arialbd.ttf", 44),
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


def rounded(draw, box, radius=28, fill=CARD, outline=LINE, width=2):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def wrap_text(draw, text, selected_font, max_width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
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
        bbox = draw.textbbox((x, y), line, font=selected_font)
        last_bottom = bbox[3]
        y += draw.textbbox((0, 0), line, font=selected_font)[3] + line_gap
    return y, last_bottom


def fit_image(path, size):
    with Image.open(path) as source:
        return ImageOps.fit(
            source.convert("RGB"),
            size,
            method=Image.Resampling.LANCZOS,
            centering=(0.5, 0.5),
        )


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
    bbox = draw.textbbox((0, 0), text, font=selected_font)
    x = x1 + (x2 - x1 - (bbox[2] - bbox[0])) / 2
    y = y1 + (y2 - y1 - (bbox[3] - bbox[1])) / 2 - 2
    draw.text((x, y), text, font=selected_font, fill=fill)


def pill(draw, xy, text, selected_font, fill=SOFT, outline=LINE, text_fill=TEAL_D):
    x, y = xy
    bbox = draw.textbbox((0, 0), text, font=selected_font)
    pad_x, pad_y = 16, 8
    box = (x, y, x + bbox[2] - bbox[0] + pad_x * 2, y + bbox[3] - bbox[1] + pad_y * 2)
    draw.rounded_rectangle(box, radius=16, fill=fill, outline=outline, width=1)
    draw.text((x + pad_x, y + pad_y - 1), text, font=selected_font, fill=text_fill)
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


def ensure_bottom_margin(name, bottom, card_bottom, minimum=20):
    margin = card_bottom - bottom
    if margin < minimum:
        raise RuntimeError(f"{name} bottom margin {margin}px is below {minimum}px")
    return margin


def verify_sources():
    for path, expected_hash in EXPECTED.items():
        if not path.exists():
            raise FileNotFoundError(path)
        with Image.open(path) as image:
            if image.size != (1536, 1024):
                raise RuntimeError(f"Unexpected source size for {path.name}: {image.size}")
        actual_hash = sha256(path)
        if actual_hash != expected_hash:
            raise RuntimeError(f"SHA mismatch for {path.name}: {actual_hash} != {expected_hash}")


def build_guide():
    image = Image.new("RGB", (780, 1688), BG)
    draw = ImageDraw.Draw(image)

    rounded(draw, (34, 34, 746, 132), 28, CARD, LINE, 2)
    draw.text((62, 52), "OTEVÍRÁNÍ KOLEN V MOSTU", font=F["title"], fill=INK)
    draw.text((62, 98), "Bridge Abduction", font=F["small_b"], fill=TEAL_D)
    draw_wrapped(
        draw,
        (62, 118),
        "Posiluje hýždě a stabilitu pánve. Učí otevírat kolena bez poklesu mostu.",
        F["tiny"],
        MUTED,
        650,
        2,
    )
    x = pill(draw, (62, 142), "Bez pomůcky", F["small_b"])
    pill(draw, (x, 142), "Hýždě a boky", F["small_b"])

    rounded(draw, (34, 196, 746, 653), 28, CARD, LINE, 2)
    paste_round(image, fit_image(HERO, (680, 393)), (50, 218, 730, 611), 22)

    mini_y, mini_w, mini_h, gap = 675, 218, 146, 22
    xs = [34, 34 + mini_w + gap, 34 + 2 * (mini_w + gap)]
    labels = [
        ("START", "Stabilní most"),
        ("OTEVŘENÍ", "Kolena do stran"),
        ("NÁVRAT", "Kolena zpět"),
    ]
    for index, (x0, (label, caption), path) in enumerate(zip(xs, labels, (START, HERO, START)), 1):
        rounded(draw, (x0, mini_y, x0 + mini_w, mini_y + mini_h + 58), 22, CARD, LINE, 2)
        paste_round(
            image,
            fit_image(path, (mini_w - 22, mini_h)),
            (x0 + 11, mini_y + 10, x0 + mini_w - 11, mini_y + 10 + mini_h),
            16,
        )
        draw.ellipse((x0 + 15, mini_y + 15, x0 + 43, mini_y + 43), fill=TEAL)
        center_text(draw, (x0 + 15, mini_y + 15, x0 + 43, mini_y + 43), str(index), F["tiny"], (255, 255, 255))
        center_text(draw, (x0 + 8, mini_y + mini_h + 14, x0 + mini_w - 8, mini_y + mini_h + 40), label, F["small_b"], INK)
        center_text(draw, (x0 + 8, mini_y + mini_h + 38, x0 + mini_w - 8, mini_y + mini_h + 57), caption, F["tiny"], MUTED)

    info_y, box_w, box_h = 915, 218, 142
    info = [
        ("breath", "DECH", "Výdech při otevření kolen. Nádech při návratu."),
        ("focus", "ZAMĚŘ SE", "Pánev drž vodorovnou a chodidla pevně na podložce."),
        ("repeat", "OPAKOVÁNÍ", "Plynule podle dávky v tréninku."),
    ]
    for x0, (kind, heading, body) in zip(xs, info):
        rounded(draw, (x0, info_y, x0 + box_w, info_y + box_h), 22, CARD, LINE, 2)
        draw_icon(draw, (x0 + 28, info_y + 30), kind)
        draw.text((x0 + 48, info_y + 18), heading, font=F["small_b"], fill=TEAL_D)
        draw_wrapped(draw, (x0 + 18, info_y + 56), body, F["small"], INK, box_w - 36, 4)

    rounded(draw, (34, 1090, 746, 1412), 26, CARD, LINE, 2)
    draw.text((62, 1120), "JAK PROVÉST", font=F["h2"], fill=INK)
    y = 1165
    for number, text in GUIDE_HOW:
        draw.ellipse((62, y + 2, 92, y + 32), fill=SOFT, outline=LINE, width=1)
        center_text(draw, (62, y + 2, 92, y + 32), number, F["small_b"], TEAL_D)
        y, _ = draw_wrapped(draw, (106, y), text, F["body"], INK, 590, 7)
        y += 12

    rounded(draw, (34, 1440, 746, 1618), 26, WARN, WARN_LINE, 2)
    draw_icon(draw, (64, 1473), "warn", WARN_ICON)
    draw.text((92, 1457), "HLÍDEJ SI", font=F["h3"], fill=INK)
    _, watch_bottom = draw_wrapped(draw, (62, 1500), GUIDE_WATCH, F["body"], INK, 640, 7)
    guide_margin = ensure_bottom_margin("Guide watch", watch_bottom, 1618)
    draw.text((54, 1640), "Pilates Body 40+", font=F["tiny"], fill=MUTED)
    image.save(GUIDE)
    return guide_margin


def build_step():
    image = Image.new("RGB", (780, 2280), BG)
    draw = ImageDraw.Draw(image)
    rounded(draw, (34, 34, 746, 126), 28, CARD, LINE, 2)
    draw.text((62, 56), "Krok za krokem", font=F["step_title"], fill=INK)
    draw.text((62, 98), "OTEVÍRÁNÍ KOLEN V MOSTU / Bridge Abduction", font=F["small_b"], fill=TEAL_D)

    y = 160
    margins = {}
    for step_label, heading, photo, body in STEP_TEXTS:
        card_height = 575
        card_bottom = y + card_height
        rounded(draw, (34, y, 746, card_bottom), 28, CARD, LINE, 2)
        draw.rounded_rectangle((58, y + 24, 148, y + 54), radius=15, fill=SOFT, outline=LINE, width=1)
        center_text(draw, (58, y + 24, 148, y + 54), step_label, F["small_b"], TEAL_D)
        draw.text((62, y + 72), heading, font=F["step_h"], fill=INK)
        image_bottom = y + 466
        paste_round(image, fit_image(photo, (656, 352)), (62, y + 114, 718, image_bottom), 22)
        text_y = image_bottom + 20
        _, body_bottom = draw_wrapped(draw, (62, text_y), body, F["step_body"], INK, 650, 7)
        margins[step_label] = ensure_bottom_margin(step_label, body_bottom, card_bottom)
        y += card_height + 18

    rounded(draw, (34, y, 746, y + 300), 28, WARN, WARN_LINE, 2)
    draw_icon(draw, (66, y + 45), "breath", TEAL)
    draw.text((98, y + 28), "DECH", font=F["step_h"], fill=INK)
    next_y, _ = draw_wrapped(
        draw,
        (62, y + 78),
        "Výdech při otevření kolen. Nádech při návratu.",
        F["step_body"],
        INK,
        650,
        8,
    )
    draw_icon(draw, (66, next_y + 31), "warn", WARN_ICON)
    draw.text((98, next_y + 14), "HLÍDEJ SI", font=F["step_h"], fill=INK)
    _, watch_bottom = draw_wrapped(draw, (62, next_y + 64), STEP_WATCH, F["step_body"], INK, 650, 8)
    margins["STEP WATCH"] = ensure_bottom_margin("Step watch", watch_bottom, y + 300)
    draw.text((54, 2240), "Pilates Body 40+", font=F["tiny"], fill=MUTED)
    image.save(STEP)
    return margins


def main():
    verify_sources()
    before = {path: sha256(path) for path in EXPECTED}
    guide_margin = build_guide()
    step_margins = build_step()
    after = {path: sha256(path) for path in EXPECTED}
    if before != after:
        raise RuntimeError("Source image hash changed during export")
    for path, expected_size in ((GUIDE, (780, 1688)), (STEP, (780, 2280))):
        with Image.open(path) as image:
            if image.size != expected_size:
                raise RuntimeError(f"Unexpected export size for {path.name}: {image.size}")
    print(f"Exported {GUIDE.name} 780x1688")
    print(f"Exported {STEP.name} 780x2280")
    print(f"Guide watch bottom margin: {guide_margin}px")
    for label, margin in step_margins.items():
        print(f"{label} bottom margin: {margin}px")
    print("Source START/HERO unchanged")


if __name__ == "__main__":
    main()
