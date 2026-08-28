# The Hundred — STATUS

Status: HOTOVO

## Identity

- Kanonické ID aplikace: `hundred`
- Zobrazovaný název v aplikaci: Kmity pažemi vleže

## Assets

- START: ✅ `hundred_start_v01.png` (1536 × 1024 px, RGB, SHA-256 `f5b3609e3740d39d1971d2324d301c0839a0d91665618ef2b7dcf8f9fc1e65c8`)
- HERO: ✅ `hundred_hero_v01.png` (1536 × 1024 px, RGB, SHA-256 `5cff0f379c471236ecc42f2eaf94b1977aefe275cfb13c58673b534cc6241080`)
- END: ✅ používá START reuse bez samostatného PNG
- GUIDE CARD: ✅ `the_hundred_guide_card_v01.png` (780 × 1688 px, RGB, SHA-256 `73abd71d9baab9838589921c9a9ef2aabf73023c4f598b8fca53039a1c25519a`)
- STEP BY STEP: ✅ `the_hundred_step_by_step_v01.png` (780 × 2280 px, RGB, SHA-256 `19e118def6e12d9d24c83f9a51d036dd3f03152b5b71ba6eb686ba9dcb631c15`)
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

END přímo používá schválený START bez vytvoření duplicitního source assetu. Krok malých pulzů používá stejný HERO bez nového source; pracovní pohyb paží je vysvětlený textem. Programové zařazení a dávkování The Hundred zůstaly beze změny.
