from pathlib import Path
import hashlib

from PIL import Image, ImageDraw, ImageOps


BASE = Path(__file__).resolve().parent / "Pilates Assets" / "02_Exercise_Cards" / "Clamshell"
START = BASE / "clamshell_start.png"
HERO = BASE / "clamshell_hero.png"
GUIDE = BASE / "clamshell_guide_card_v01.png"
STEP = BASE / "clamshell_step_by_step_v01.png"
EXPECTED = {
    START: "bd91b4209e11ca79c3ed0f1d4d1d9e66fe6717bef558807199cfe37a005d3a99",
    HERO: "c9e15ac3e821165de1f7addba44822983e93aa2bd6ded497b2188a15fbe995b4",
}


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def fitted(path, size, centering=(0.5, 0.57)):
    with Image.open(path) as source:
        return ImageOps.fit(source.convert("RGB"), size, Image.Resampling.LANCZOS, centering=centering)


def paste_rounded(card, source, box, radius):
    x1, y1, x2, y2 = box
    size = (x2 - x1, y2 - y1)
    layer = fitted(source, size)
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0] - 1, size[1] - 1), radius=radius, fill=255)
    card.paste(layer, (x1, y1), mask)


def restore_badge(card, original, box):
    x1, y1, x2, y2 = box
    size = (x2 - x1, y2 - y1)
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size[0] - 1, size[1] - 1), fill=255)
    card.paste(original.crop(box), (x1, y1), mask)


def teal_bbox(image, region):
    x1, y1, x2, y2 = region
    points = []
    for y in range(y1, y2):
        for x in range(x1, x2):
            r, g, b = image.getpixel((x, y))
            if r < 80 and g > 130 and b > 100:
                points.append((x, y))
    if not points:
        raise RuntimeError(f"Badge not found in {region}")
    xs, ys = zip(*points)
    return min(xs), min(ys), max(xs) + 1, max(ys) + 1


def refresh_guide():
    with Image.open(GUIDE) as image:
        original = image.convert("RGB")
    card = original.copy()
    paste_rounded(card, HERO, (68, 180, 712, 785), 20)
    for source, box, badge_region in (
        (START, (68, 859, 278, 983), (60, 850, 130, 930)),
        (HERO, (288, 859, 498, 983), (280, 850, 350, 930)),
        (START, (508, 859, 718, 983), (500, 850, 570, 930)),
    ):
        paste_rounded(card, source, box, 10)
        restore_badge(card, original, teal_bbox(original, badge_region))
    card.save(GUIDE)


def refresh_step():
    with Image.open(STEP) as image:
        original = image.convert("RGB")
    card = original.copy()
    for source, box, badge_region in (
        (START, (61, 190, 719, 550), (65, 195, 130, 265)),
        (HERO, (61, 844, 719, 1204), (65, 849, 130, 919)),
        (START, (61, 1498, 719, 1858), (65, 1503, 130, 1573)),
    ):
        paste_rounded(card, source, box, 14)
        restore_badge(card, original, teal_bbox(original, badge_region))
    card.save(STEP)


for path, expected in EXPECTED.items():
    if digest(path) != expected:
        raise RuntimeError(f"Unexpected SOURCE hash: {path.name}")
    with Image.open(path) as image:
        if image.size != (1536, 1024) or image.mode != "RGB" or image.format != "PNG":
            raise RuntimeError(f"Unexpected SOURCE format: {path.name}")

refresh_guide()
refresh_step()

for path, size in ((GUIDE, (780, 1688)), (STEP, (780, 2280))):
    with Image.open(path) as image:
        if image.size != size or image.mode != "RGB" or image.format != "PNG":
            raise RuntimeError(f"Unexpected card format: {path.name}")
    print(path.name, digest(path))

for path, expected in EXPECTED.items():
    if digest(path) != expected:
        raise RuntimeError(f"SOURCE changed: {path.name}")
