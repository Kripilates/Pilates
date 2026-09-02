# Standing Side Bend - STATUS

Status: HOTOVO / ASSETY v03 + ANATOMIE v01 NASAZENE

## Assets

- EXERCISE_REFERENCE: neni ulozena v MASTER balicku
- START: `standing_side_bend_start_v03.png` - SCHVALENO
- HERO: `standing_side_bend_hero_v03.png` - SCHVALENO
- HERO OPACNA STRANA: `standing_side_bend_hero_opposite_v02.png` - SCHVALENO
- END: presny navrat do START v03 bez samostatneho END PNG
- GUIDE CARD: `standing_side_bend_guide_card_v01.png` - VYTVORENO A OVERENO
- STEP BY STEP: `standing_side_bend_step_by_step_v01.png` - VYTVORENO A OVERENO
- ZAPOJENE SVALY: `standing_side_bend_muscles_v01.png` - SCHVALENO A NASAZENO
- EXPORT: HOTOVO
- QA: HOTOVO - vizualni kontrola exportu
- APP: NASAZENO POD ID `standing_side_bend` VCETNE ANATOMIE

## Workflow

START -> HERO 1 -> START -> HERO 2 -> START

## Source verification

- START v03: 1536 x 1024 px, RGB, SHA-256 `0ff503edaf87b8b121917f6698829d684a2ee778616c23acdf423fd39c19c99d`
- HERO v03: 1536 x 1024 px, RGB, SHA-256 `33cff0cf288d10f05ed1d2940de461cbafc04e2ebc628e4324e75f424a813d4d`
- HERO opposite v02: 1536 x 1024 px, RGB, SHA-256 `e89c8d1d83fcf4f52001266c5576ac07a4f2a7595d6619801837d379f93b2162`
- Anatomy v01: 1536 x 1024 px, RGB, SHA-256 `0ecc4539d0b41e024359e6bfc56f96e0b61a9b1658d18fbba0d9779ef8167d02`

## Export verification

- Guide Card: `standing_side_bend_guide_card_v01.png`, 780 x 1688 px, RGB, SHA-256 `700bbd7cbfdc13ce0cee6796c3993925f5e4a8f920e5dfe0fc4ec42106e3f8ed`
- Step by Step: `standing_side_bend_step_by_step_v01.png`, 780 x 2280 px, RGB, SHA-256 `b6b4fcb32c348c92d23de60a7d6a2d66c50348ee19e7db9b6d026fc19bca07f1`

## Notes

- Schvalene SOURCE fotografie ani anatomy PNG nebyly upravovany.
- HERO 1 a HERO 2 jsou skutecne opacne strany cisteho bocniho uklonu, bez zrcadleni.
- Builder pouziva pouze presne zadane START v03, HERO v03 a HERO opposite v02.
- Ikony DECH, ZAMER SE, OPAKOVANI a HLIDEJ SI pouzivaji shodnou implementaci jako oficialni Glute Bridge Guide Card v3 a Step by Step v2.
- Guide i Step pouzivaji navrat do START mezi obema uklony; END je presne START a samostatny END soubor nevznikl.
- Anatomy je napojena pouze na `standing_side_bend` a v aplikaci zobrazuje popisek `Sikme brisni svaly`; programove davky a poradi zustaly beze zmeny.
