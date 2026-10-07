# Swimming — STATUS

Status: HOTOVO

## Identity

- Kanonické ID aplikace: `swimming`
- Zobrazovaný název: Swimming

## Assets

- START: ✅ `swimming_start.png` (1536 × 1024 px, RGB, SHA-256 `95f80f2f9ea512d904f4ac9e34d1c40f1ca26de78418776a3c681362100b95b9`)
- HERO: ✅ `swimming_hero.png` (1536 × 1024 px, RGB, SHA-256 `6ffa0c6d136f4573d8f20a82243ae8d21147cf647d94c9a5f4a6afd37f534990`)
- END: ✅ používá START reuse bez samostatného PNG
- GUIDE CARD: ✅ `swimming_guide_card_v01.png` (780 × 1688 px, RGB, SHA-256 `3a4cc49400debec3ab890309628b68b8251ad2f10cf00993ab320ee1dd958bc2`)
- STEP BY STEP: ✅ `swimming_step_by_step_v01.png` (780 × 2280 px, RGB, SHA-256 `39a2621ee57ae6bd3190dbaf6f5df0deb18dcb3a151e508a2d9879d30f428175`)
- EXPORT: ✅
- QA: ✅ source reuse, rozměry, RGB, SHA-256, nezrcadlený HERO a app URL
- APP: ✅ lokálně nasazeno pod kanonickým ID `swimming` ve verzi `v59.193-dev`

## Workflow

START → HERO → střídání protilehlých končetin → START

Step by Step používá instruktážní sekvenci START → HERO → HERO → START.

## Program Dose

- Den 10: Lehká 20 s, Střední 20 s, Náročná 30 s
- Den 18: Lehká 25 s, Střední 25 s, Náročná 35 s
- Den 25: Lehká 30 s, Střední 30 s, Náročná 35 s

## Notes

END přímo používá schválený bezverzový START bez vytvoření duplicitního source assetu. Guide/Step zachovaly stávající strukturu a byly aktualizovány pouze novými fotografiemi. Krok střídání používá stejný HERO bez zrcadlení; opačná ruka/noha je vysvětlená textem. Programové zařazení a dávkování Swimming zůstaly beze změny.
