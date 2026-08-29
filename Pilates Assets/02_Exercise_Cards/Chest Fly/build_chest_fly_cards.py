from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import hashlib

ROOT = Path(__file__).resolve().parents[3]
FOLDER = ROOT / 'Pilates Assets' / '02_Exercise_Cards' / 'Chest Fly'
START = FOLDER / 'chest_fly_start_v02.png'
HERO = FOLDER / 'chest_fly_hero_v02.png'
GUIDE = FOLDER / 'chest_fly_guide_card_v01.png'
STEP = FOLDER / 'chest_fly_step_by_step_v01.png'

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
FONT_DIR = Path(r'C:\Windows\Fonts')

GUIDE_HOW = [
    ('1', 'Lehni si na záda, pokrč kolena a chodidla polož na podložku. Činky drž nad hrudníkem a lokty nech lehce pokrčené.'),
    ('2', 'S nádechem otevírej paže kontrolovaně do stran po oblouku. Ramena drž daleko od uší a zápěstí rovně.'),
    ('3', 'S výdechem vrať činky stejným obloukem nad hrudník. Pohyb veď plynule a bez švihu.'),
]
GUIDE_WATCH = 'Lokty nepropínej, činky nespouštěj příliš hluboko a nezvedej ramena k uším. Bedra, pánev i chodidla drž stabilní.'
STEP_TEXTS = [
    ('KROK 1', 'VÝCHOZÍ POLOHA', START, 'Lehni si na záda, pokrč kolena a chodidla polož na podložku. Činky drž nad hrudníkem a lokty nech po celou dobu lehce pokrčené.'),
    ('KROK 2', 'OTEVŘENÍ PAŽÍ', HERO, 'S nádechem otevírej paže kontrolovaně do stran po oblouku. Lokty nech mírně pokrčené a ramena drž daleko od uší.'),
    ('KROK 3', 'KONTROLOVANÝ NÁVRAT', START, 'S výdechem vrať činky stejným obloukem zpět nad hrudník. Zápěstí drž rovně a pohyb veď plynule bez švihu.'),
]
STEP_WATCH = 'Lokty nepropínej, činky nespouštěj příliš hluboko a nezvedej ramena k uším. Bedra, pánev i chodidla drž stabilní.'


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def font(name, size):
    for candidate in (FONT_DIR / name, FONT_DIR / 'arial.ttf', FONT_DIR / 'segoeui.ttf'):
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


F = {
    'title': font('arialbd.ttf', 38),
    'h2': font('arialbd.ttf', 25),
    'h3': font('arialbd.ttf', 20),
    'body': font('arial.ttf', 22),
    'small': font('arial.ttf', 17),
    'small_b': font('arialbd.ttf', 17),
    'tiny': font('arial.ttf', 14),
    'step_title': font('arialbd.ttf', 38),
    'step_h': font('arialbd.ttf', 24),
    'step_body': font('arial.ttf', 23),
}


def rounded(draw, box, radius=28, fill=CARD, outline=LINE, width=2):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def wrap_text(draw, text, text_font, max_width):
    words = text.split()
    lines = []
    current = ''
    for word in words:
        test = (current + ' ' + word).strip()
        if draw.textbbox((0, 0), test, font=text_font)[2] <= max_width or not current:
            current = test
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_wrapped(draw, xy, text, text_font, fill, max_width, line_gap=7):
    x, y = xy
    for line in wrap_text(draw, text, text_font, max_width):
        draw.text((x, y), line, font=text_font, fill=fill)
        y += draw.textbbox((0, 0), line, font=text_font)[3] + line_gap
    return y


def fit_image(path, size):
    return ImageOps.fit(
        Image.open(path).convert('RGB'),
        size,
        method=Image.Resampling.LANCZOS,
        centering=(0.5, 0.5),
    )


def paste_round(base, image, box, radius=22):
    x1, y1, x2, y2 = box
    size = (x2 - x1, y2 - y1)
    if image.size != size:
        image = image.resize(size, Image.Resampling.LANCZOS)
    mask = Image.new('L', size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    base.paste(image, (x1, y1), mask)


def center_text(draw, box, text, text_font, fill):
    x1, y1, x2, y2 = box
    bounds = draw.textbbox((0, 0), text, font=text_font)
    draw.text(
        (x1 + (x2 - x1 - (bounds[2] - bounds[0])) / 2, y1 + (y2 - y1 - (bounds[3] - bounds[1])) / 2 - 2),
        text,
        font=text_font,
        fill=fill,
    )


def pill(draw, xy, text, text_font, fill=SOFT, outline=LINE, txt=TEAL_D):
    x, y = xy
    bounds = draw.textbbox((0, 0), text, font=text_font)
    pad_x, pad_y = 16, 8
    box = (x, y, x + bounds[2] - bounds[0] + pad_x * 2, y + bounds[3] - bounds[1] + pad_y * 2)
    draw.rounded_rectangle(box, radius=16, fill=fill, outline=outline, width=1)
    draw.text((x + pad_x, y + pad_y - 1), text, font=text_font, fill=txt)
    return box[2] + 8


def draw_icon(draw, center, kind, color=TEAL):
    x, y = center
    if kind == 'breath':
        draw.arc((x - 8, y - 8, x + 8, y + 8), 25, 320, fill=color, width=3)
        draw.line((x + 7, y - 8, x + 12, y - 8, x + 12, y - 3), fill=color, width=3)
    elif kind == 'focus':
        draw.ellipse((x - 8, y - 8, x + 8, y + 8), outline=color, width=3)
        draw.ellipse((x - 3, y - 3, x + 3, y + 3), fill=color)
    elif kind == 'repeat':
        draw.arc((x - 9, y - 7, x + 9, y + 7), 200, 20, fill=color, width=3)
        draw.polygon([(x + 8, y - 8), (x + 14, y - 5), (x + 9, y - 1)], fill=color)
    elif kind == 'warn':
        draw.polygon([(x, y - 10), (x - 10, y + 9), (x + 10, y + 9)], outline=color, width=3)
        draw.line((x, y - 3, x, y + 3), fill=color, width=2)
        draw.ellipse((x - 1, y + 6, x + 1, y + 8), fill=color)


def build_guide():
    image = Image.new('RGB', (780, 1688), BG)
    draw = ImageDraw.Draw(image)
    rounded(draw, (34, 34, 746, 132), 28, CARD, LINE, 2)
    draw.text((62, 59), 'ROZPAŽOVÁNÍ S ČINKAMI VLEŽE', font=F['title'], fill=INK)
    draw_wrapped(draw, (62, 107), 'Posiluje hrudník a ramena. Učí kontrolované otevření paží s činkami vleže.', F['tiny'], MUTED, 650, 2)
    x = pill(draw, (62, 142), 'Činky', F['small_b'])
    pill(draw, (x, 142), 'Hrudník a ramena', F['small_b'])

    rounded(draw, (34, 196, 746, 653), 28, CARD, LINE, 2)
    paste_round(image, fit_image(HERO, (680, 393)), (50, 218, 730, 611), 22)

    mini_y, mini_w, mini_h, gap = 675, 218, 146, 22
    xs = [34, 34 + mini_w + gap, 34 + 2 * (mini_w + gap)]
    labels = [('START', 'Činky nad hrudníkem'), ('OTEVŘENÍ', 'Paže kontrolovaně do stran'), ('NÁVRAT', 'Stejným obloukem vzhůru')]
    for index, (x0, (label, caption), path) in enumerate(zip(xs, labels, [START, HERO, START]), 1):
        rounded(draw, (x0, mini_y, x0 + mini_w, mini_y + mini_h + 58), 22, CARD, LINE, 2)
        paste_round(image, fit_image(path, (mini_w - 22, mini_h)), (x0 + 11, mini_y + 10, x0 + mini_w - 11, mini_y + 10 + mini_h), 16)
        draw.ellipse((x0 + 15, mini_y + 15, x0 + 43, mini_y + 43), fill=TEAL)
        center_text(draw, (x0 + 15, mini_y + 15, x0 + 43, mini_y + 43), str(index), F['tiny'], (255, 255, 255))
        center_text(draw, (x0 + 8, mini_y + mini_h + 14, x0 + mini_w - 8, mini_y + mini_h + 40), label, F['small_b'], INK)
        center_text(draw, (x0 + 8, mini_y + mini_h + 38, x0 + mini_w - 8, mini_y + mini_h + 57), caption, F['tiny'], MUTED)

    info_y, box_w, box_h = 915, 218, 142
    info = [
        ('breath', 'DECH', 'Nádech při otevření. Výdech při návratu.'),
        ('focus', 'ZAMĚŘ SE', 'Mírně pokrčené lokty a stabilní pánev.'),
        ('repeat', 'OPAKOVÁNÍ', 'Plynule podle dávky v tréninku.'),
    ]
    for x0, (kind, heading, body) in zip(xs, info):
        rounded(draw, (x0, info_y, x0 + box_w, info_y + box_h), 22, CARD, LINE, 2)
        draw_icon(draw, (x0 + 28, info_y + 30), kind)
        draw.text((x0 + 48, info_y + 18), heading, font=F['small_b'], fill=TEAL_D)
        draw_wrapped(draw, (x0 + 18, info_y + 56), body, F['small'], INK, box_w - 36, 4)

    rounded(draw, (34, 1090, 746, 1412), 26, CARD, LINE, 2)
    draw.text((62, 1120), 'JAK PROVÉST', font=F['h2'], fill=INK)
    y = 1165
    for number, text in GUIDE_HOW:
        draw.ellipse((62, y + 2, 92, y + 32), fill=SOFT, outline=LINE, width=1)
        center_text(draw, (62, y + 2, 92, y + 32), number, F['small_b'], TEAL_D)
        y = draw_wrapped(draw, (106, y), text, F['body'], INK, 590, 7) + 12

    rounded(draw, (34, 1440, 746, 1618), 26, WARN, WARN_LINE, 2)
    draw_icon(draw, (64, 1473), 'warn', WARN_ICON)
    draw.text((92, 1457), 'HLÍDEJ SI', font=F['h3'], fill=INK)
    draw_wrapped(draw, (62, 1500), GUIDE_WATCH, F['body'], INK, 640, 7)
    draw.text((54, 1640), 'Pilates Body 40+', font=F['tiny'], fill=MUTED)
    image.save(GUIDE)


def build_step():
    image = Image.new('RGB', (780, 2280), BG)
    draw = ImageDraw.Draw(image)
    rounded(draw, (34, 34, 746, 126), 28, CARD, LINE, 2)
    draw.text((62, 56), 'Krok za krokem', font=F['step_title'], fill=INK)
    draw.text((62, 98), 'ROZPAŽOVÁNÍ S ČINKAMI VLEŽE', font=F['small_b'], fill=TEAL_D)
    y = 160
    for step_label, heading, photo, body in STEP_TEXTS:
        card_h = 560
        rounded(draw, (34, y, 746, y + card_h), 28, CARD, LINE, 2)
        draw.rounded_rectangle((58, y + 24, 148, y + 54), radius=15, fill=SOFT, outline=LINE, width=1)
        center_text(draw, (58, y + 24, 148, y + 54), step_label, F['small_b'], TEAL_D)
        draw.text((62, y + 72), heading, font=F['step_h'], fill=INK)
        paste_round(image, fit_image(photo, (656, 352)), (62, y + 114, 718, y + 466), 22)
        body_y = y + 464 if step_label == 'KROK 1' else y + 484
        draw_wrapped(draw, (62, body_y), body, F['step_body'], INK, 650, 7)
        y += card_h + 23

    rounded(draw, (34, y, 746, y + 300), 28, WARN, WARN_LINE, 2)
    draw_icon(draw, (66, y + 45), 'warn', WARN_ICON)
    draw.text((98, y + 28), 'HLÍDEJ SI', font=F['step_h'], fill=INK)
    draw_wrapped(draw, (62, y + 82), STEP_WATCH, F['step_body'], INK, 650, 8)
    draw.text((54, 2240), 'Pilates Body 40+', font=F['tiny'], fill=MUTED)
    image.save(STEP)


def main():
    start_hash = sha256(START)
    hero_hash = sha256(HERO)
    build_guide()
    build_step()
    if sha256(START) != start_hash or sha256(HERO) != hero_hash:
        raise RuntimeError('Source START/HERO changed')
    for path, expected in ((GUIDE, (780, 1688)), (STEP, (780, 2280))):
        with Image.open(path) as image:
            if image.size != expected:
                raise RuntimeError(f'Unexpected export size for {path.name}: {image.size}')
    print(f'Exported {GUIDE.name} 780x1688')
    print(f'Exported {STEP.name} 780x2280')
    print('Source START/HERO unchanged')


if __name__ == '__main__':
    main()
