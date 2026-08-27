# Swimming — STATUS

Status: HOTOVO

## Identity

- Kanonické ID aplikace: `swimming`
- Zobrazovaný název: Swimming

## Assets

- START: ✅ `swimming_start_v01.png` (1536 × 1024 px, RGB, SHA-256 `393061229b79868a0b2a4b38a7f8d6ecdf8311d527172e4375631577cd82c777`)
- HERO: ✅ `swimming_hero_v01.png` (1536 × 1024 px, RGB, SHA-256 `8e529b91d2e98295f992e4d2d30f19d7f46a562ae5a184f0f727a9ac174c1e24`)
- END: ✅ používá START reuse bez samostatného PNG
- GUIDE CARD: ✅ `swimming_guide_card_v01.png` (780 × 1688 px, RGB, SHA-256 `83455ec098255fd21bffb751dc8d350421cb67a1c1f384300ad848c6f3907be1`)
- STEP BY STEP: ✅ `swimming_step_by_step_v01.png` (780 × 2280 px, RGB, SHA-256 `a5fa345752f8184bf156f826fc5c31d3e3778bbaeabb879a0cac81fad16df019`)
- EXPORT: ✅
- QA: ✅ source reuse, rozměry, RGB, SHA-256, nezrcadlený HERO a app URL
- APP: ✅ nasazeno pod kanonickým ID `swimming` ve verzi `v59.107-dev`

## Workflow

START → HERO → střídání protilehlých končetin → START

Step by Step používá instruktážní sekvenci START → HERO → HERO → START.

## Program Dose

- Den 10: Lehká 20 s, Střední 20 s, Náročná 30 s
- Den 18: Lehká 25 s, Střední 25 s, Náročná 35 s
- Den 25: Lehká 30 s, Střední 30 s, Náročná 35 s

## Notes

END přímo používá schválený START bez vytvoření duplicitního source assetu. Krok střídání používá stejný HERO bez zrcadlení; opačná ruka/noha je vysvětlená textem. Programové zařazení a dávkování Swimming zůstaly beze změny.
