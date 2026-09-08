# Changelog

## 2026-09-08

- The Hundred, Thread the Needle a Bird Dog byly přepojeny na finální bezverzové SOURCE se sekvencí START → HERO → START; jejich Guide/Step zachovaly stávající strukturu a dostaly pouze nové fotografie.
- The Hundred a Bird Dog používají schválený core anatomy reuse z Heel Taps. Pro Thread the Needle není dostupná schválená mapa horních zad/hrudní páteře, proto nebyla použita nepřesná náhrada.
- Knihovní náhledy těchto tří cviků byly přepojeny na finální HERO. Verze aplikace `v59.170-dev`; cache `app.js?v=59181sourcebatch2`, `data.js?v=59181sourcebatch2`; commit ani push nebyl proveden.
- Hamstring Stretch, Hip March, Reverse Crunch a Scissors byly přepojeny na finální bezverzové SOURCE a jejich existující Guide/Step exporty byly aktualizovány pouze výměnou fotografií.
- Hip March, Reverse Crunch a Scissors používají schválený core anatomy reuse; pro Hamstring Stretch nebyla nalezena schválená anatomická mapa hamstringů, proto nebyla vytvořena ani dosazena náhrada.
- Guide Card Glute Bridge March byla obnovena na tři panely START → MID → HERO; pětičástá runtime sekvence a Step by Step zůstaly beze změny.
- Společný detailový renderer byl sjednocen do pořadí HERO → miniatury → název → dech → svaly/pozor vedle sebe → Krok za krokem.
- Knihovní náhledy těchto čtyř cviků v `data.js` byly přepojeny na stejné finální HERO bez verzovaných nebo fallback cest.
- Verze aplikace `v59.169-dev`; cache `app.js?v=59180sourcebatch`, `data.js?v=59180sourcebatch`, `style.css?v=59179masterdetailfinal`; commit ani push nebyl proveden.

## 2026-08-31

- Balíčky Glute Bridge, Hip March, Dead Bug, Toe Tap, Glute Bridge March a Heel Taps byly nasazeny do aplikace pod stávajícími kanonickými ID bez změny workoutu nebo programu.
- Aktivní HERO náhledy, START/HERO/END sekvence a odkazy na Guide Card / Step by Step nyní používají nové schválené soubory; Glute Bridge March zachovává reuse START/MID a vlastní HERO.
- Verze aplikace: `v59.113-dev`; cache: `app.js?v=59142sixcards`; `data.js`, `style.css` a PWA beze změny.
- Dokončeny assetové balíčky Glute Bridge, Hip March, Dead Bug, Toe Tap, Glute Bridge March a Heel Taps.
- Schválené SOURCE byly pouze přejmenovány, přesunuty nebo bitově znovu použity podle zadaných SHA-256; nebyly upravovány ani generovány.
- Pro všech šest cviků byly reprodukovány Guide Card 780 × 1688 RGB a Step by Step 780 × 2280 RGB podle schváleného Glute Bridge layoutu.
- Provedena kontrola rozměrů, RGB, SHA-256, zachování SOURCE hashů a vizuální QA.
- Při samotné tvorbě assetů aplikace, data, PWA a cache zůstaly beze změny; commit ani push nebyl proveden.

## 2026-07-09

- Glute Bridge schválen jako DESIGN STANDARD v1.0
- Reference Detail Engine zobecněn pro další cviky
- sjednocena struktura Pilates Assets
- duplicitní složka PiIates Assets archivována
- vytvořena složka 06_Project_Status
