# -*- coding: utf-8 -*-
from pathlib import Path
import hashlib

from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageStat


BASE = Path(__file__).resolve().parent
START = BASE / "standing_side_bend_start_v03.png"
HERO = BASE / "standing_side_bend_hero_v03.png"
OPPOSITE = BASE / "standing_side_bend_hero_opposite_v02.png"
GUIDE = BASE / "standing_side_bend_guide_card_v01.png"
STEP = BASE / "standing_side_bend_step_by_step_v01.png"
EXPECTED_HASHES = {
    START: "0ff503edaf87b8b121917f6698829d684a2ee778616c23acdf423fd39c19c99d",
    HERO: "33cff0cf288d10f05ed1d2940de461cbafc04e2ebc628e4324e75f424a813d4d",
    OPPOSITE: "e89c8d1d83fcf4f52001266c5576ac07a4f2a7595d6619801837d379f93b2162",
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

def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def font(name, size):
    for candidate in (FONT_DIR / name, FONT_DIR / "arial.ttf", FONT_DIR / "segoeui.ttf"):
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


F = {
    "title": font("arialbd.ttf", 34),
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
        bbox = draw.textbbox((x, y), line, font=selected_font)
        last_bottom = bbox[3]
        y += draw.textbbox((0, 0), line, font=selected_font)[3] + line_gap
    return y, last_bottom


def fit_image(path, size, centering=(0.5, 0.58)):
    with Image.open(path) as source:
        return ImageOps.fit(
            source.convert("RGB"), size, method=Image.Resampling.LANCZOS, centering=centering
        )


def contain_image(path, size, margin=6):
    with Image.open(path) as source:
        rgb = source.convert("RGB")
        inner_size = (size[0] - 2 * margin, size[1] - 2 * margin)
        contained = ImageOps.contain(rgb, inner_size, method=Image.Resampling.LANCZOS)
        width, height = rgb.size
        wall_sample = rgb.crop((width // 3, 0, 2 * width // 3, max(1, height // 6)))
        background = tuple(round(value) for value in ImageStat.Stat(wall_sample).mean)
        canvas = Image.new("RGB", size, background)
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
    bbox = draw.textbbox((0, 0), text, font=selected_font)
    x = x1 + (x2 - x1 - (bbox[2] - bbox[0])) / 2
    y = y1 + (y2 - y1 - (bbox[3] - bbox[1])) / 2 - 2
    draw.text((x, y), text, font=selected_font, fill=fill)


def pill(draw, xy, text, selected_font):
    x, y = xy
    bbox = draw.textbbox((0, 0), text, font=selected_font)
    box = (x, y, x + bbox[2] - bbox[0] + 32, y + bbox[3] - bbox[1] + 16)
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


def ensure_bottom_margin(name, bottom, card_bottom, minimum=20):
    margin = card_bottom - bottom
    if margin < minimum:
        raise RuntimeError(f"{name} bottom margin {margin}px is below {minimum}px")
    return margin


def verify_sources():
    for path, expected_hash in EXPECTED_HASHES.items():
        if not path.exists():
            raise FileNotFoundError(path)
        with Image.open(path) as image:
            if image.size != (1536, 1024) or image.mode != "RGB":
                raise RuntimeError(f"Unexpected source properties for {path.name}: {image.size} {image.mode}")
        if sha256(path) != expected_hash:
            raise RuntimeError(f"SHA mismatch for {path.name}")


def build_guide():
    image = Image.new("RGB", (780, 1688), BG)
    draw = ImageDraw.Draw(image)
    margins = {}

    rounded(draw, (34, 34, 746, 140))
    draw.text((62, 49), "ÚKLONY DO STRAN VE STOJE", font=font("arialbd.ttf", 32), fill=INK)
    draw.text((62, 94), "Kontrolovaný pohyb pro pevnější pas", font=F["small_b"], fill=TEAL_D)
    _, desc_bottom = draw_wrapped(
        draw, (62, 115), "Čistý boční úklon ve stoje pro pas a střed těla.",
        F["tiny"], MUTED, 650, 2
    )
    margins["GUIDE DESCRIPTION"] = 140 - desc_bottom
    x = pill(draw, (62, 148), "Pas a střed těla", F["small_b"])
    pill(draw, (x, 148), "Bez pomůcky", F["small_b"])

    rounded(draw, (34, 196, 746, 653))
    paste_round(image, contain_image(HERO, (680, 393), 8), (50, 218, 730, 611))

    mini_w, mini_h = 338, 164
    mini_positions = [(34, 675), (398, 675), (34, 854), (398, 854)]
    phases = [
        ("VÝCHOZÍ POLOHA", START),
        ("ÚKLON NA JEDNU STRANU", HERO),
        ("NÁVRAT DO STŘEDU", START),
        ("ÚKLON NA DRUHOU STRANU", OPPOSITE),
    ]
    for index, ((x0, y0), (label, source)) in enumerate(zip(mini_positions, phases), 1):
        card_bottom = y0 + mini_h
        rounded(draw, (x0, y0, x0 + mini_w, card_bottom), 22)
        paste_round(image, contain_image(source, (136, mini_h - 20), 4),
                    (x0 + 10, y0 + 10, x0 + 146, card_bottom - 10), 16)
        draw.ellipse((x0 + 16, y0 + 16, x0 + 44, y0 + 44), fill=TEAL)
        center_text(draw, (x0 + 16, y0 + 16, x0 + 44, y0 + 44), str(index), F["tiny"], CARD)
        _, label_bottom = draw_wrapped(
            draw, (x0 + 160, y0 + 48), label, F["small_b"], INK, mini_w - 176, 4
        )
        margins[f"GUIDE MINI {index}"] = ensure_bottom_margin(
            f"Guide mini {index}", label_bottom, card_bottom
        )

    info_y, box_w, box_h = 1036, 218, 148
    info = [
        ("breath", "DECH", "Vydechni při úklonu. Nadechni se při návratu do středu."),
        ("focus", "ZAMĚŘ SE", "Pánev drž stabilní a trup ukláněj čistě do strany."),
        ("repeat", "OPAKOVÁNÍ", "Střídej pravou a levou stranu podle dávky v tréninku."),
    ]
    for index, (x0, (kind, heading, body)) in enumerate(zip([34, 274, 514], info), 1):
        card_bottom = info_y + box_h
        rounded(draw, (x0, info_y, x0 + box_w, card_bottom), 22)
        draw_icon(draw, (x0 + 28, info_y + 30), kind)
        draw.text((x0 + 48, info_y + 18), heading, font=F["small_b"], fill=TEAL_D)
        _, body_bottom = draw_wrapped(draw, (x0 + 18, info_y + 56), body, F["small"], INK, box_w - 36, 4)
        margins[f"GUIDE INFO {index}"] = ensure_bottom_margin(f"Guide info {index}", body_bottom, card_bottom)

    rounded(draw, (34, 1200, 746, 1430), 26)
    draw.text((62, 1222), "JAK PROVÉST", font=F["h2"], fill=INK)
    how = [
        ("1", "Postav se vzpřímeně, chodidla dej na šířku boků a ruce polož lehce za hlavu."),
        ("2", "S výdechem se kontrolovaně ukloň na jednu stranu. Pánev drž stabilní."),
        ("3", "S nádechem se vrať do vzpřímeného postoje bez prohnutí v bedrech."),
        ("4", "Stejným kontrolovaným pohybem se ukloň na opačnou stranu."),
    ]
    y = 1248
    for number_value, body in how:
        draw.ellipse((62, y + 2, 92, y + 32), fill=SOFT, outline=LINE, width=1)
        center_text(draw, (62, y + 2, 92, y + 32), number_value, F["small_b"], TEAL_D)
        y, body_bottom = draw_wrapped(draw, (102, y), body, F["small"], INK, 610, 2)
        margins[f"GUIDE STEP {number_value}"] = 1430 - body_bottom
        y += 1
    margins["GUIDE HOW"] = ensure_bottom_margin("Guide how", body_bottom, 1430)

    rounded(draw, (34, 1446, 746, 1618), 26, WARN, WARN_LINE, 2)
    draw_icon(draw, (64, 1479), "warn", WARN_ICON)
    draw.text((92, 1463), "HLÍDEJ SI", font=F["h3"], fill=INK)
    _, watch_bottom = draw_wrapped(
        draw, (62, 1506),
        "Netahej rukama za hlavu, nezvedej ramena a neotáčej trup. Nepředkláněj se a nevystrkuj pánev do strany.",
        F["body"], INK, 640, 5
    )
    margins["GUIDE WATCH"] = ensure_bottom_margin("Guide watch", watch_bottom, 1618)
    draw.text((54, 1640), "Pilates Body 40+", font=F["tiny"], fill=MUTED)

    image.save(GUIDE)
    return margins
def build_step():
    image = Image.new("RGB", (780, 2280), BG)
    draw = ImageDraw.Draw(image)
    rounded(draw, (34, 34, 746, 126))
    draw.text((62, 56), "Krok za krokem", font=F["step_title"], fill=INK)
    draw.text((62, 98), "ÚKLONY DO STRAN VE STOJE", font=F["small_b"], fill=TEAL_D)

    steps = [
        ("KROK 1", "VÝCHOZÍ POLOHA",
         "Postav se vzpřímeně, chodidla dej přibližně na šířku boků. Ruce polož lehce za hlavu, lokty nech otevřené a ramena spusť od uší.", START),
        ("KROK 2", "ÚKLON DO STRANY",
         "S výdechem se kontrolovaně ukloň do strany. Pánev drž stabilní, hrudník směřuje stále dopředu a hlava přirozeně navazuje na páteř.", HERO),
        ("KROK 3", "NÁVRAT DO STŘEDU",
         "S nádechem se vrať do vzpřímeného postoje. Neprohýbej bedra a lokty nech otevřené.", START),
        ("KROK 4", "OPAČNÁ STRANA",
         "Stejným kontrolovaným pohybem se ukloň na opačnou stranu. Pohyb veď pouze do strany, bez rotace a předklonu.", OPPOSITE),
    ]
    y, margins = 145, {}
    for step_label, heading, body, source in steps:
        card_height = 456
        card_bottom = y + card_height
        rounded(draw, (34, y, 746, card_bottom))
        draw.rounded_rectangle((58, y + 20, 148, y + 50), radius=15, fill=SOFT, outline=LINE, width=1)
        center_text(draw, (58, y + 20, 148, y + 50), step_label, F["small_b"], TEAL_D)
        draw.text((62, y + 66), heading, font=F["step_h"], fill=INK)
        image_bottom = y + 350
        paste_round(image, contain_image(source, (656, 240), 6), (62, y + 110, 718, image_bottom), 20)
        _, body_bottom = draw_wrapped(draw, (62, image_bottom + 14), body, F["step_body"], INK, 650, 5)
        margins[step_label] = ensure_bottom_margin(step_label, body_bottom, card_bottom)
        y += card_height + 5

    rounded(draw, (34, 1994, 746, 2218), 28, WARN, WARN_LINE, 2)
    draw_icon(draw, (66, 2030), "breath")
    draw.text((98, 2013), "DECH", font=F["step_h"], fill=INK)
    next_y, breath_bottom = draw_wrapped(
        draw, (62, 2055),
        "Vydechni při úklonu. Nadechni se při návratu do vzpřímené polohy.",
        F["step_body"], INK, 650, 5
    )
    margins["STEP BREATH"] = 2218 - breath_bottom
    draw_icon(draw, (66, next_y + 22), "warn", WARN_ICON)
    draw.text((98, next_y + 5), "HLÍDEJ SI", font=F["step_h"], fill=INK)
    _, watch_bottom = draw_wrapped(
        draw, (62, next_y + 43),
        "Netahej rukama za hlavu, nezvedej ramena a neotáčej trup. Ukláněj se čistě do strany, nepředkláněj se a nevystrkuj pánev.",
        F["step_body"], INK, 650, 5
    )
    margins["STEP WATCH"] = ensure_bottom_margin("Step watch", watch_bottom, 2218)
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
            if image.size != expected_size or image.mode != "RGB":
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
