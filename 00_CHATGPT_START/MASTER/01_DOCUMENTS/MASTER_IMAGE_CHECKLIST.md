# MOOVKA — MASTER IMAGE CHECKLIST

Status: **ACTIVE CHECKLIST**
Aktualizováno: 2026-09-12

Použij před generováním a znovu bezprostředně po každém novém nebo upraveném
exercise obrázku. Podrobnosti jsou v `MASTER_REFERENCE.md` a `IMAGE_WORKFLOW.md`.

## Preflight

- [ ] Potvrzen canonical ID a active/historical stav z aktuálního `data.js`.
- [ ] Zkontrolován `app.js`, fyzické soubory, unversioned varianty, case a reuse.
- [ ] Skutečně chybějící SOURCE je odlišen od mapping bugu nebo 404 staré cesty.
- [ ] Určen přesně jeden asset: START / HERO / MID / END.
- [ ] Je jasné, zda END/HERO přesně reuse START; nevzniká identická kopie.
- [ ] Načten MASTER model, MASTER face, MASTER environment, camera class,
  MASTER mat a EXERCISE_REFERENCE nebo schválený paired SOURCE.
- [ ] Při Muscle Card práci načten `MASTER_ANATOMY.md` a
  `MUSCLE_CARD_PROFILE_AUDIT.md`.

## Modelka, tvář a vlasy

- [ ] Stejná konkrétní dospělá žena s věkovým dojmem 30s–40s.
- [ ] Obličej, hairline, oči, nos, ústa, čelist a odstín pleti odpovídají MASTER FACE.
- [ ] Fit/toned ženská postava; žádný bodybuilding nebo skok ve svalnatosti.
- [ ] Tělesné proporce a délka končetin odpovídají MASTER MODEL.
- [ ] Head-to-body ratio je přirozené; hlava není generativně zvětšená.
- [ ] Dark blonde/light brown vlasy se světlejšími prameny, přirozeným culíkem,
  konzistentní délkou, objemem a vlnitostí; bez copper/orange/red castu.

## Outfit a vybavení

- [ ] Stejný coral top podle MASTER (`#F36F6A`).
- [ ] Stejné velmi tmavé high-waisted leggings (`#252528`).
- [ ] Barefoot, bez bot, hodinek, šperků a náhodných doplňků.
- [ ] Outfit nemění střih, materiál ani barvu mezi fázemi.
- [ ] Vybavení má správný počet, velikost, tvar a držení.
- [ ] Dvě činky = jedna v každé ruce; Dumbbell Pullover = jedna činka držená
  oběma rukama na center handle.

## Studio, kamera a měřítko

- [ ] Stejné čisté Moovka studio: téměř bílá stěna, světlá warm-neutral oak
  podlaha, bílý sokl, případně bílé závěsy pouze vlevo.
- [ ] Žádná palma, rostlina, police, cubby, knihy, ručníky, vázy, dekorace,
  nábytek, logo ani text.
- [ ] Žádný viditelný strop, ceiling/light strip nebo recessed cove v exercise SOURCE.
- [ ] Žádné window-shadow pruhy, tvrdé fleky, špína nebo změna architektury.
- [ ] Měkké denní světlo zleva a konzistentní white balance.
- [ ] Správná class: LYING / QUADRUPED / STANDING / SIDE FLOOR.
- [ ] SIDE FLOOR používá LYING reference pro fyzickou kameru a scale; nebyla
  vymyšlena nová camera distance nebo výška.
- [ ] Podložka 183 × 68 cm nebyla zkrácena, prodloužena ani nerescalována.
- [ ] Modelka cca 180 cm má správné fyzické měřítko; pokrčená póza ji nezmenšila.
- [ ] Celé vlasy, ruce, prsty, chodidla a vybavení jsou v obraze bez ořezu.
- [ ] Pair zachovává stejnou kameru, perspektivu, framing a scale bez zoomu.

## Exercise/anatomy

- [ ] Fáze odpovídá definici START / HERO / MID / END.
- [ ] Klouby, končetiny, stabilní části těla a směr pohybu jsou správné.
- [ ] Pravá/levá strana a alternating/diagonal pairing jsou správné.
- [ ] Počet rukou, prstů, nohou a chodidel je správný.
- [ ] Poloha je fyzicky možná, bezpečná a technicky správná.
- [ ] Shoda s EXERCISE_REFERENCE nebo schváleným paired SOURCE je přesná.

## Generative quality

- [ ] Fotorealistická čistá fotografie; žádný wax/CGI nebo plastická pleť.
- [ ] Žádné fleky na těle, obličeji, stěně, podlaze ani podložce.
- [ ] Žádné deformované prsty, končetiny, vybavení, perspektiva nebo stíny.
- [ ] Žádné náhodné předměty, watermark, vignette nebo artefakty.
- [ ] SOURCE má 1536 × 1024, landscape 3:2, RGB PNG a neobsahuje text ani UI.

## Pair a finální rozhodnutí

- [ ] Identita, věk, vlasy, proporce, svalnatost, outfit, mat, room, camera,
  light, white balance a equipment jsou mezi fázemi konzistentní.
- [ ] Výsledek odpovídá příslušné camera class a celé Moovka sérii.
- [ ] Automatické post-generation QA proběhlo bez vyžádání uživatelem.
- [ ] Každý kritický bod prošel a skóre je alespoň 9,5/10.
- [ ] Výsledek je označen **PASS / SCHVÁLENO**, nebo **FAIL / NESCHVÁLENO** s
  konkrétním důvodem.
- [ ] FAIL nebyl uložen ani mapován jako approved; po opravě proběhlo nové celé QA.
