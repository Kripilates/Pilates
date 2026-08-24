# Chest Fly — STATUS

Status: HOTOVO

## Identity

- Kanonické ID aplikace: `chest_fly`
- Zobrazovaný název: Rozpažování s činkami vleže

## Assets

- START: schválený reuse `../Chest Press/chest_press_hero_v01.png`; SHA-256 `b5b10ef23365122aa54be46113728b2af547ddda8de0c2c1e46284b11e7d6e6c`
- HERO: `chest_fly_hero_v01.png` — SCHVÁLENO; SHA-256 `a574519daa04d2a8b42f011f9d05951f2e5d820d8e0d4320ac5304c04ba8cd84`
- END: používá START / bez samostatného END PNG — SCHVÁLENO
- GUIDE CARD: `chest_fly_guide_card_v01.png` — SCHVÁLENO; SHA-256 `8e029b1d3cbe97b84c5686ef3fffd96810c6f97ddec8c72ca7aab88ac02ccac0`
- STEP BY STEP: `chest_fly_step_by_step_v01.png` — SCHVÁLENO; SHA-256 `051adafee486e8c2ca816c3e2a3b9d2f425eb01aa67bb303293d38fcf62c9fc7`
- EXPORT: HOTOVO
- QA: SCHVÁLENO
- APP: NASAZENO pod kanonickým ID `chest_fly`

## Workflow

START → HERO → START

## Notes

Reuse START odkazuje relativní cestou na nový schválený Chest Press HERO s opravenými proporcemi paží. Nebyla vytvořena fyzická kopie START ani samostatný END PNG. Vlastní HERO, Guide Card a Step by Step v01 prošly rozměrovým, obsahovým a vizuálním QA. Aplikace používá sekvenci START → HERO → START bez fallbacku.
