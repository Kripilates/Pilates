# -*- coding: utf-8 -*-
from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path
import sys


BASE = Path(__file__).resolve().parent
sys.dont_write_bytecode = True
TEMPLATE_PATH = BASE.parent / "Heel Taps" / "build_heel_taps_cards.py"
SPEC = spec_from_file_location("approved_card_builder", TEMPLATE_PATH)
builder = module_from_spec(SPEC)
SPEC.loader.exec_module(builder)

builder.START = BASE / "dead_bug_start_v01_approved.png"
builder.HERO = BASE / "dead_bug_hero_v01_approved.png"
builder.GUIDE = BASE / "dead_bug_guide_card_v01.png"
builder.STEP = BASE / "dead_bug_step_by_step_v01.png"
builder.EXPECTED_HASHES = {
    builder.START: "122b08493b0321626c73b0677c7ed2ea0fcbeeabd94912f79eb980d160fe308f",
    builder.HERO: "9738d54ff401bdcd800abc29b23bfe38e72d1b9fd685d3186ad71087fe6f01fb",
}
builder.TITLE = "DEAD BUG"
builder.SUBTITLE = "Střídavé natažení paže a nohy"
builder.DESCRIPTION = "Posiluje hluboký střed těla při stabilních bedrech."
builder.PILLS = ("Střed těla", "Bez pomůcky")
builder.GUIDE_HOW = [
    ("1", "Lehni si na záda. Zvedni nohy do tabletop a paže namiř ke stropu."),
    ("2", "S výdechem natáhni jednu paži za hlavu a opačnou nohu dopředu."),
    ("3", "Vrať se kontrolovaně do START a vystřídej stranu. Bedra drž stabilní."),
]
builder.GUIDE_WATCH = (
    "Nenech bedra odlepit od podložky, neprohýbej se a nepoužívej švih. Rozsah zmenši, pokud ztrácíš kontrolu."
)
builder.GUIDE_MINI = [
    ("START", "Nohy v tabletop", builder.START),
    ("NATAŽENÍ", "Opačná paže a noha", builder.HERO),
    ("NÁVRAT", "Zpět do tabletop", builder.START),
]
builder.GUIDE_INFO = [
    ("breath", "DECH", "Výdech při natažení. Nádech při návratu."),
    ("focus", "ZAMĚŘ SE", "Bedra drž stabilní a žebra stažená."),
    ("repeat", "OPAKOVÁNÍ", "Střídej strany. Počet je celkem za obě."),
]
builder.STEP_TEXTS = [
    ("KROK 1", "VÝCHOZÍ POZICE", "Lehni si na záda, zvedni nohy do tabletop a paže namiř ke stropu. Bedra drž stabilní.", builder.START),
    ("KROK 2", "OPAČNÁ PAŽE A NOHA", "S výdechem natáhni jednu paži za hlavu a opačnou nohu dopředu bez odlepení beder.", builder.HERO),
    ("KROK 3", "KONTROLOVANÝ NÁVRAT", "Vrať paži a nohu do výchozí pozice. Potom proveď stejný pohyb na opačnou stranu.", builder.START),
]
builder.STEP_BREATH = "Vydechuj při natažení paže a nohy. Nadechuj se při kontrolovaném návratu."
builder.STEP_WATCH = builder.GUIDE_WATCH
builder.STEP_SUBTITLE = "DEAD BUG / Střídavé natažení paže a nohy"


if __name__ == "__main__":
    builder.main()
