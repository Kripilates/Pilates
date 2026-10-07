# The Hundred — STATUS

Status: HOTOVO

## Identity

- Kanonické ID aplikace: `hundred`
- Zobrazovaný název v aplikaci: Kmity pažemi vleže

## Assets

- START: ✅ `hundred_start.png` (1536 × 1024 px, RGB, SHA-256 `18d1b5210a94236f9e630a64b48e3cc92d5c722e9eaa11123d82f4fb443a9f9c`)
- HERO: ✅ `hundred_hero.png` (1536 × 1024 px, RGB, SHA-256 `3c4b65792fe339ab0e84f1f555bee490b3b581e359511d220d77f907508f5e62`)
- END: ✅ používá START reuse bez samostatného PNG
- GUIDE CARD: ✅ `the_hundred_guide_card_v01.png` (780 × 1688 px, RGB, SHA-256 `5f4a17dda5f2248c53a77b47dc910ad546b178914c22f320a52dbbe9f78e291f`)
- STEP BY STEP: ✅ `the_hundred_step_by_step_v01.png` (780 × 2280 px, RGB, SHA-256 `8115230768d7affaa09163bbb67762576d6d93069ebc988ac4169d241f748b79`)
- MUSCLE CARD: ✅ schválený core reuse `../Muscle_Cards/core_muscles_v01.png`
- EXPORT: ✅
- QA: ✅ source reuse, rozměry, RGB, SHA-256, HERO reuse pro pulzy a app URL
- APP: ✅ nasazeno pod kanonickým ID `hundred` ve verzi `v59.108-dev`

## Workflow

START → HERO → START

Step by Step používá obrazovou sekvenci START → HERO → HERO → START.

## Program Dose

- Den 11: Lehká 20 s, Střední 20 s, Náročná 35 s
- Den 23: Lehká 25 s, Střední 25 s, Náročná 35 s
- Den 25: Lehká 25 s, Střední 25 s, Náročná 35 s

## Notes

END přímo používá finální bezverzový START bez vytvoření duplicitního source assetu. Krok malých pulzů používá stejný HERO bez nového source; pracovní pohyb paží je vysvětlený textem. Programové zařazení a dávkování The Hundred zůstaly beze změny.
