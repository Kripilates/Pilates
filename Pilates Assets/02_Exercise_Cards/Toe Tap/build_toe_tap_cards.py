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

builder.START = BASE / "toe_tap_start.png"
builder.HERO = BASE / "toe_taps_hero.png"
builder.GUIDE = BASE / "toe_tap_guide_card_v1.png"
builder.STEP = BASE / "toe_tap_step_by_step_v1.png"
builder.EXPECTED_HASHES = {
    builder.START: "18d1b5210a94236f9e630a64b48e3cc92d5c722e9eaa11123d82f4fb443a9f9c",
    builder.HERO: "9c7120aa490af2f0c94dd864e0d2de91d89533005af2af183b2475cfd43a585f",
}
builder.TITLE = "TOE TAP"
builder.SUBTITLE = "Střídavé spouštění špičky"
builder.DESCRIPTION = "Posiluje spodní břicho při stabilní pánvi a bedrech."
builder.PILLS = ("Spodní břicho", "Bez pomůcky")
builder.GUIDE_HOW = [
    ("1", "Lehni si na záda a zvedni obě nohy do tabletop. Paže nech podél těla."),
    ("2", "S výdechem spouštěj jednu špičku kontrolovaně směrem k podložce."),
    ("3", "Vrať nohu do tabletop a vystřídej stranu. Bedra a pánev drž klidné."),
]
builder.GUIDE_WATCH = (
    "Nenech bedra odlepit od podložky a nepřeklápěj pánev. Pokud ztrácíš kontrolu, zmenši rozsah pohybu."
)
builder.GUIDE_MINI = [
    ("START", "Nohy v 90/90", builder.START),
    ("SPOUŠTĚNÍ", "Špička k podložce", builder.HERO),
    ("NÁVRAT", "Zpět do tabletop", builder.START),
]
builder.GUIDE_INFO = [
    ("breath", "DECH", "Výdech při spouštění. Nádech při návratu."),
    ("focus", "ZAMĚŘ SE", "Pánev a bedra drž po celou dobu stabilní."),
    ("repeat", "OPAKOVÁNÍ", "Střídej nohy. Počet je celkem za obě."),
]
builder.STEP_TEXTS = [
    ("KROK 1", "VÝCHOZÍ POZICE", "Lehni si na záda, zvedni obě nohy do tabletop a paže nech podél těla. Bedra drž stabilní.", builder.START),
    ("KROK 2", "ŠPIČKA K PODLOŽCE", "S výdechem spouštěj jednu nohu z kyčle, dokud se špička lehce nepřiblíží k podložce.", builder.HERO),
    ("KROK 3", "KONTROLOVANÝ NÁVRAT", "Vrať nohu do tabletop bez pohybu pánve. Potom stejně pokračuj druhou nohou.", builder.START),
]
builder.STEP_BREATH = "Vydechuj při spouštění špičky. Nadechuj se při kontrolovaném návratu do tabletop."
builder.STEP_WATCH = (
    "Bedra a pánev drž klidné. Při ztrátě kontroly zmenši rozsah."
)
builder.STEP_SUBTITLE = "TOE TAP / Střídavé spouštění špičky"


if __name__ == "__main__":
    builder.main()
