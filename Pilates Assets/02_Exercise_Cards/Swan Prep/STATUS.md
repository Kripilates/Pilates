# Swan Prep — STATUS

Status: HOTOVO

## Identity

- Kanonické ID aplikace: `swan`
- Zobrazovaný název: Jemný záklon vleže

## Assets

- START: ✅ `swan_prep_start_v01.png` (1536 × 1024 px, RGB, SHA-256 `0dd3b7fb807b0db36ba582a3d609e93e97a2ccce74e229894c1bbd3e956f5eba`)
- HERO: ✅ `swan_prep_hero_v01.png` (1536 × 1024 px, RGB, SHA-256 `b6fbc0e957b561d140f043e4e3774e1e46820336d09109b52741f95522fb4b44`)
- END: ✅ používá START bez samostatného PNG
- GUIDE CARD: ✅ `swan_prep_guide_card_v01.png` (780 × 1688 px, RGB, SHA-256 `2e5f5acbe03e70dd28b9ffb220ec431c2a37162f226e5491353850eb19e09ffe`)
- STEP BY STEP: ✅ `swan_prep_step_by_step_v01.png` (780 × 2280 px, RGB, SHA-256 `9a36cd98f82bbe7f026f63886ee70609ed7ff453a7e4e5d62b6b808ed48316e8`)
- EXPORT: ✅
- QA: ✅ assetové a technické; opakované mobilní browser QA nasazení blokuje lokální chyba Codex browser runtime (`setup refresh had errors`)
- APP: ✅ nasazeno pod kanonickým ID `swan` ve verzi `v59.105-dev`

## Notes

Schválená sekvence je START → HERO → START. Aplikace používá schválený HERO jako hlavní snímek, END odkazuje přesně na START a dynamický detail zpřístupňuje Guide Card i Step by Step podle stejné konvence jako ostatní dokončené cviky. Programové zařazení a dávkování zůstaly beze změny.