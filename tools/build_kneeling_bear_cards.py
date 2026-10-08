# -*- coding: utf-8 -*-
"""Build approved Guide and Step cards for selected kneeling exercise bundles."""

from __future__ import annotations

import argparse
import hashlib
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
CARDS = ROOT / "Pilates Assets" / "02_Exercise_Cards"
FONT_DIR = Path(r"C:\Windows\Fonts")

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


CONFIGS = (
    {
        "folder": "Half-Kneeling Oblique Crunch",
        "stem": "half_kneeling_oblique_crunch",
        "title": "ŠIKMÉ ZKRACOVAČKY V KLEČE",
        "subtitle": "Kontrolovaný úklon trupu do strany",
        "description": "Posiluje šikmé břišní svaly při stabilní pánvi v polokleku.",
        "pills": ("Šikmé břicho", "Bez pomůcky"),
        "source_hashes": {
            "start": "71aa1617b6d79178cf3969b1211f6aedd6b878c65cf20a4b8c52fab11b4dd8ea",
            "hero": "1c05a95ee67312313479c9ef4b18861a45fbad14b6798c4aa6a3210c4535b1ed",
        },
        "mini": (
            ("START", "Stabilní poloklek", "start"),
            ("ÚKLON", "Trup do strany", "hero"),
            ("NÁVRAT", "Kontrolovaně vzhůru", "start"),
        ),
        "info": (
            ("breath", "DECH", "Výdech při úklonu. Nádech při návratu."),
            ("focus", "ZAMĚŘ SE", "Pánev klidná, pracuje bok trupu."),
            ("repeat", "TEMPO", "Pomalu, kontrolovaně a bez švihu."),
        ),
        "how": (
            "Klekni si na jedno koleno a druhé chodidlo postav vpředu. Pánev drž rovně a trup vzpřímený.",
            "Jednu ruku polož za hlavu a druhou dej v bok. S výdechem proveď kontrolovaný úklon trupu do strany.",
            "S nádechem se vrať do vzpřímené polohy. Pánev a přední koleno drž po celou dobu stabilní.",
        ),
        "watch": "Nevytáčej ani neposouvej pánev, nepřitahuj hlavu rukou a neukláněj se dopředu ani dozadu.",
        "steps": (
            ("KROK 1", "STABILNÍ POLOKLEK", "Klekni si na jedno koleno, druhé chodidlo postav vpředu. Pánev drž rovně, trup vzpřímený a střed těla aktivní.", "start"),
            ("KROK 2", "KONTROLOVANÝ ÚKLON", "Jednu ruku dej za hlavu, druhou v bok. S výdechem ukloň trup do strany bez pohybu pánve.", "hero"),
            ("KROK 3", "NÁVRAT DO STŘEDU", "S nádechem se vrať do vzpřímené polohy. Přední koleno, pánev a ramena drž pod kontrolou.", "start"),
        ),
    },
    {
        "folder": "Kneeling Hip Extension",
        "stem": "kneeling_hip_extension",
        "title": "KNEELING HIP EXTENSION",
        "subtitle": "Zdvih pánve do vysokého kleku",
        "description": "Posiluje hýždě při stabilním středu těla a neutrálních bedrech.",
        "pills": ("Hýždě", "Bez pomůcky"),
        "source_hashes": {
            "start": "29ff60c09c9abf3091a4244b125206d2be7729b3fe658fdda49eaa011e49fb18",
            "hero": "2c943cb68e374d1bc47dc8fadb6cf907049f1b7e135f8ac2cf0f7ff298a3912a",
        },
        "mini": (
            ("START", "Sed na patách", "start"),
            ("ZDVIH", "Pánev vpřed a vzhůru", "hero"),
            ("NÁVRAT", "Kontrolovaně na paty", "start"),
        ),
        "info": (
            ("breath", "DECH", "Výdech při zdvihu. Nádech při návratu."),
            ("focus", "ZAMĚŘ SE", "Pohyb veď z kyčlí a aktivuj hýždě."),
            ("repeat", "TEMPO", "Plynule, bez švihu a zaklánění."),
        ),
        "how": (
            "Sedni si na paty, trup drž vzpřímeně a ruce polož na stehna.",
            "S výdechem aktivuj hýždě a veď pánev dopředu a vzhůru do vysokého kleku.",
            "S nádechem se kontrolovaně vrať na paty. Bedra i žebra drž stabilní.",
        ),
        "watch": "Neprohýbej bedra, nevytahuj žebra a nepoužívej švih. Pohyb musí vycházet z kyčlí.",
        "steps": (
            ("KROK 1", "VÝCHOZÍ POLOHA", "Sedni si na paty. Trup drž vzpřímeně, ruce polož na stehna a zpevni střed těla.", "start"),
            ("KROK 2", "VYSOKÝ KLEK", "S výdechem stáhni hýždě a veď pánev dopředu a vzhůru. Vysoký klek dokonči s pánví nad koleny.", "hero"),
            ("KROK 3", "KONTROLOVANÝ NÁVRAT", "S nádechem vrať pánev pomalu na paty. Žebra drž dole, bedra neutrální a trup bez švihu.", "start"),
        ),
    },
    {
        "folder": "Bear Hover",
        "stem": "bear_hover",
        "title": "BEAR HOVER",
        "subtitle": "Nízký vzpor s koleny nad podložkou",
        "description": "Zpevňuje břicho a stabilitu trupu v nízké pozici nad podložkou.",
        "pills": ("Břicho", "Bez pomůcky"),
        "source_hashes": {
            "start": "f695b201e5b47a4086637f53671f8ed5a89a8df0736e46010369bd8375816dd7",
            "hero": "4b78cb3ba8061e3fd2d65514df705d1373cb363cfee4085482a895bd8e827d83",
        },
        "mini": (
            ("START", "Tabletop", "start"),
            ("HOVER", "Kolena nízko nad zemí", "hero"),
            ("NÁVRAT", "Kontrolovaně dolů", "start"),
        ),
        "info": (
            ("breath", "DECH", "Plynule dýchej po celou dobu."),
            ("focus", "ZAMĚŘ SE", "Břicho pevné, záda neutrální."),
            ("repeat", "VÝDRŽ", "Kolena jen pár centimetrů nad zemí."),
        ),
        "how": (
            "Začni na všech čtyřech, dlaně pod rameny a kolena pod kyčlemi.",
            "Opři špičky, zpevni břicho a zvedni obě kolena jen několik centimetrů.",
            "Drž pánev nízko, záda neutrální a plynule dýchej. Potom kolena kontrolovaně polož.",
        ),
        "watch": "Nezvedej pánev do stříšky, neprohýbej bedra, nepřenášej všechnu váhu do ramen a nezadržuj dech.",
        "steps": (
            ("KROK 1", "TABLETOP", "Dlaně polož pod ramena, kolena pod kyčle a páteř drž neutrální.", "start"),
            ("KROK 2", "NÍZKÝ HOVER", "Opři špičky, zpevni břicho a zvedni obě kolena jen několik centimetrů nad podložku.", "hero"),
            ("KROK 3", "STABILNÍ VÝDRŽ A NÁVRAT", "Pánev drž nízko, záda neutrální a plynule dýchej. Potom obě kolena kontrolovaně vrať na podložku.", "start"),
        ),
    },
    {
        "folder": "Kneeling Side Plank + Leg Lift",
        "stem": "kneeling_side_plank_leg_lift",
        "title": "BOČNÍ PRKNO NA KOLENOU",
        "subtitle": "Se zvedáním natažené nohy",
        "description": "Posiluje střed těla, rameno a bok při stabilní boční opoře.",
        "pills": ("Střed těla", "Bez pomůcky"),
        "source_hashes": {
            "start": "9015796a3196043b59cc5726722a7d36c348015c02284911c0978d86bea6da3a",
            "hero": "771c1d76c8002011c4ba2b01411d161d09e9127b9e021343baf6bdfdbd688cdf",
        },
        "mini": (
            ("START", "Boční opora", "start"),
            ("ZDVIH", "Noha do výšky kyčle", "hero"),
            ("NÁVRAT", "Kontrolovaně dolů", "start"),
        ),
        "info": (
            ("breath", "DECH", "Výdech při zdvihu. Nádech při návratu."),
            ("focus", "ZAMĚŘ SE", "Střed těla a stabilní pánev."),
            ("repeat", "TEMPO", "Plynule, kontrolovaně a bez švihu."),
        ),
        "how": (
            "Opři se o jednu dlaň a spodní koleno. Druhou nohu natáhni šikmo dolů, chodidlo polož na podložku a volnou ruku dej na bok.",
            "S výdechem zpevni střed těla a zvedni nataženou nohu přibližně do výšky kyčle. Pánev i trup drž stabilní.",
            "S nádechem spusť nohu kontrolovaně zpět na podložku. Opěrné rameno zůstává pevné a daleko od ucha.",
        ),
        "watch": "Nepropadej se v opěrném rameni, neotáčej pánev, nezvedej nohu nad výšku kyčle a nepoužívej švih.",
        "steps": (
            ("KROK 1", "BOČNÍ OPORA", "Nastav dlaň pod rameno a opři se o spodní koleno. Druhou nohu natáhni šikmo dolů, chodidlo polož na podložku a volnou ruku dej na bok.", "start"),
            ("KROK 2", "ZDVIH NOHY", "S výdechem zpevni břicho a zvedni nataženou nohu přibližně do výšky kyčle. Trup a pánev drž bez rotace.", "hero"),
            ("KROK 3", "KONTROLOVANÝ NÁVRAT", "S nádechem spusť nohu pomalu zpět na podložku. Opěrné rameno drž pevné a pohyb veď bez švihu.", "start"),
        ),
    },
)


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def font(name: str, size: int):
    for candidate in (FONT_DIR / name, FONT_DIR / "arial.ttf", FONT_DIR / "segoeui.ttf"):
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


F = {
    "title": font("arialbd.ttf", 42), "h2": font("arialbd.ttf", 25),
    "h3": font("arialbd.ttf", 20), "body": font("arial.ttf", 22),
    "small": font("arial.ttf", 17), "small_b": font("arialbd.ttf", 17),
    "tiny": font("arial.ttf", 14), "step_title": font("arialbd.ttf", 38),
    "step_h": font("arialbd.ttf", 24), "step_body": font("arial.ttf", 23),
}


def rounded(draw, box, radius=28, fill=CARD, outline=LINE, width=2):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def wrap(draw, text, selected_font, width):
    lines, current = [], ""
    for word in text.split():
        candidate = f"{current} {word}".strip()
        if not current or draw.textbbox((0, 0), candidate, font=selected_font)[2] <= width:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def wrapped(draw, xy, text, selected_font, fill, width, gap=7):
    x, y = xy
    bottom = y
    for line in wrap(draw, text, selected_font, width):
        draw.text((x, y), line, font=selected_font, fill=fill)
        bottom = draw.textbbox((x, y), line, font=selected_font)[3]
        y = bottom + gap
    return bottom


def fit(path, size, centering=(0.5, 0.58)):
    with Image.open(path) as source:
        return ImageOps.fit(source.convert("RGB"), size, Image.Resampling.LANCZOS, centering=centering)


def paste_round(base, image, box, radius=20):
    x1, y1, x2, y2 = box
    size = (x2 - x1, y2 - y1)
    if image.size != size:
        image = image.resize(size, Image.Resampling.LANCZOS)
    mask = Image.new("L", size)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, *size), radius=radius, fill=255)
    base.paste(image, (x1, y1), mask)


def center(draw, box, text, selected_font, fill):
    x1, y1, x2, y2 = box
    b = draw.textbbox((0, 0), text, font=selected_font)
    draw.text((x1 + (x2 - x1 - b[2]) / 2, y1 + (y2 - y1 - b[3]) / 2 - 2), text, font=selected_font, fill=fill)


def pill(draw, x, y, text):
    b = draw.textbbox((0, 0), text, font=F["small_b"])
    box = (x, y, x + b[2] + 32, y + b[3] + 16)
    draw.rounded_rectangle(box, 16, fill=SOFT, outline=LINE)
    draw.text((x + 16, y + 7), text, font=F["small_b"], fill=TEAL_D)
    return box[2] + 8


def icon(draw, xy, kind, color=TEAL):
    x, y = xy
    if kind == "focus":
        draw.ellipse((x - 8, y - 8, x + 8, y + 8), outline=color, width=3)
        draw.ellipse((x - 3, y - 3, x + 3, y + 3), fill=color)
    elif kind == "repeat":
        draw.arc((x - 9, y - 7, x + 9, y + 7), 200, 20, fill=color, width=3)
        draw.polygon([(x + 8, y - 8), (x + 14, y - 5), (x + 9, y - 1)], fill=color)
    elif kind == "warn":
        draw.polygon([(x, y - 10), (x - 10, y + 9), (x + 10, y + 9)], outline=color, width=3)
        draw.line((x, y - 3, x, y + 3), fill=color, width=2)
    else:
        draw.arc((x - 8, y - 8, x + 8, y + 8), 25, 320, fill=color, width=3)
        draw.line((x + 7, y - 8, x + 12, y - 8, x + 12, y - 3), fill=color, width=3)


def verify_sources(cfg):
    folder = CARDS / cfg["folder"]
    sources = {frame: folder / f'{cfg["stem"]}_{frame}.png' for frame in ("start", "hero")}
    for frame, path in sources.items():
        with Image.open(path) as source:
            if source.size != (1536, 1024) or source.mode != "RGB":
                raise RuntimeError(f"{path.name}: expected 1536x1024 RGB, got {source.size} {source.mode}")
        if sha256(path) != cfg["source_hashes"][frame]:
            raise RuntimeError(f"Approved SOURCE changed: {path.name}")
    return folder, sources


def build_guide(cfg, folder, sources):
    out = folder / f'{cfg["stem"]}_guide_card_v01.png'
    image = Image.new("RGB", (780, 1688), BG)
    draw = ImageDraw.Draw(image)
    rounded(draw, (34, 34, 746, 140))
    draw.text((62, 49), cfg["title"], font=F["title"], fill=INK)
    draw.text((62, 94), cfg["subtitle"], font=F["small_b"], fill=TEAL_D)
    wrapped(draw, (62, 115), cfg["description"], F["tiny"], MUTED, 650, 2)
    x = pill(draw, 62, 148, cfg["pills"][0])
    pill(draw, x, 148, cfg["pills"][1])
    rounded(draw, (34, 196, 746, 653))
    paste_round(image, fit(sources["hero"], (680, 393)), (50, 218, 730, 611))
    xs, mini_y, mini_w, mini_h = (34, 274, 514), 675, 218, 146
    for number, (x0, item) in enumerate(zip(xs, cfg["mini"]), 1):
        label, caption, frame = item
        rounded(draw, (x0, mini_y, x0 + mini_w, mini_y + mini_h + 74), 22)
        paste_round(image, fit(sources[frame], (196, mini_h)), (x0 + 11, mini_y + 10, x0 + 207, mini_y + 156), 16)
        draw.ellipse((x0 + 15, mini_y + 15, x0 + 43, mini_y + 43), fill=TEAL)
        center(draw, (x0 + 15, mini_y + 15, x0 + 43, mini_y + 43), str(number), F["tiny"], CARD)
        center(draw, (x0 + 5, mini_y + 160, x0 + mini_w - 5, mini_y + 186), label, F["small_b"], INK)
        center(draw, (x0 + 5, mini_y + 186, x0 + mini_w - 5, mini_y + 211), caption, F["tiny"], MUTED)
    info_y = 915
    for x0, (kind, heading, body) in zip(xs, cfg["info"]):
        rounded(draw, (x0, info_y, x0 + 218, info_y + 164), 22)
        icon(draw, (x0 + 28, info_y + 30), kind)
        draw.text((x0 + 48, info_y + 18), heading, font=F["small_b"], fill=TEAL_D)
        wrapped(draw, (x0 + 18, info_y + 56), body, F["small"], INK, 182, 4)
    rounded(draw, (34, 1090, 746, 1412), 26)
    draw.text((62, 1120), "JAK PROVÉST", font=F["h2"], fill=INK)
    y = 1165
    for number, text in enumerate(cfg["how"], 1):
        draw.ellipse((62, y + 2, 92, y + 32), fill=SOFT, outline=LINE)
        center(draw, (62, y + 2, 92, y + 32), str(number), F["small_b"], TEAL_D)
        bottom = wrapped(draw, (106, y), text, F["body"], INK, 590)
        y = bottom + 18
    rounded(draw, (34, 1440, 746, 1618), 26, WARN, WARN_LINE, 2)
    icon(draw, (64, 1473), "warn", WARN_ICON)
    draw.text((92, 1457), "HLÍDEJ SI", font=F["h3"], fill=INK)
    wrapped(draw, (62, 1500), cfg["watch"], F["body"], INK, 640)
    draw.text((54, 1640), "Pilates Body 40+", font=F["tiny"], fill=MUTED)
    image.save(out)
    return out


def build_step(cfg, folder, sources):
    out = folder / f'{cfg["stem"]}_step_by_step_v01.png'
    image = Image.new("RGB", (780, 2280), BG)
    draw = ImageDraw.Draw(image)
    rounded(draw, (34, 34, 746, 126))
    draw.text((62, 56), "Krok za krokem", font=F["step_title"], fill=INK)
    draw.text((62, 98), f'{cfg["title"]} / {cfg["subtitle"]}', font=F["small_b"], fill=TEAL_D)
    y = 160
    for step_label, heading, body, frame in cfg["steps"]:
        rounded(draw, (34, y, 746, y + 595))
        draw.rounded_rectangle((58, y + 24, 148, y + 54), 15, fill=SOFT, outline=LINE)
        center(draw, (58, y + 24, 148, y + 54), step_label, F["small_b"], TEAL_D)
        draw.text((62, y + 72), heading, font=F["step_h"], fill=INK)
        paste_round(image, fit(sources[frame], (656, 352)), (62, y + 114, 718, y + 466))
        wrapped(draw, (62, y + 486), body, F["step_body"], INK, 650)
        y += 600
    rounded(draw, (34, y, 746, y + 275), 28, WARN, WARN_LINE, 2)
    icon(draw, (66, y + 45), "breath")
    draw.text((98, y + 28), "DECH", font=F["step_h"], fill=INK)
    breath = "Plynule vydechuj při záběru a nadechuj se při kontrolovaném návratu."
    bottom = wrapped(draw, (62, y + 78), breath, F["step_body"], INK, 650, 8)
    icon(draw, (66, bottom + 38), "warn", WARN_ICON)
    draw.text((98, bottom + 21), "HLÍDEJ SI", font=F["step_h"], fill=INK)
    wrapped(draw, (62, bottom + 61), cfg["watch"], F["step_body"], INK, 650, 8)
    draw.text((54, 2240), "Pilates Body 40+", font=F["tiny"], fill=MUTED)
    image.save(out)
    return out


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--exercise", choices=[cfg["stem"] for cfg in CONFIGS])
    args = parser.parse_args()
    configs = [cfg for cfg in CONFIGS if not args.exercise or cfg["stem"] == args.exercise]
    for cfg in configs:
        folder, sources = verify_sources(cfg)
        before = {frame: sha256(path) for frame, path in sources.items()}
        outputs = (build_guide(cfg, folder, sources), build_step(cfg, folder, sources))
        if before != {frame: sha256(path) for frame, path in sources.items()}:
            raise RuntimeError(f'{cfg["stem"]}: SOURCE was modified')
        for path, size in zip(outputs, ((780, 1688), (780, 2280))):
            with Image.open(path) as result:
                if result.size != size or result.mode != "RGB":
                    raise RuntimeError(f"Invalid export {path}: {result.size} {result.mode}")
            print(f"{path.relative_to(ROOT)} | {size[0]}x{size[1]} RGB | {sha256(path)}")
        for frame, digest in before.items():
            print(f'{cfg["stem"]} {frame.upper()} unchanged | {digest}')


if __name__ == "__main__":
    main()
