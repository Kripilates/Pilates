# MOOVKA — EXERCISE IMAGE CREATION + QA WORKFLOW

Status: **ACTIVE WORKFLOW AUTHORITY**
Verze: 3.0
Aktualizováno: 2026-09-12

Toto je jediná hlavní autorita pro tvorbu, opravy, QA, schvalování a nasazování
exercise image assetů Moovka. Vizuální konstanty určuje `MASTER_REFERENCE.md`,
rychlou kontrolu `MASTER_IMAGE_CHECKLIST.md` a aktuální stav jednotlivých cviků
`EXERCISE_PROGRESS.md`.

## 1. Pořadí zdrojů pravdy

Před prací načti:

1. `MASTER_REFERENCE.md` a odpovídající obrazové MASTER reference;
2. tento workflow;
3. `MASTER_IMAGE_CHECKLIST.md`;
4. `EXERCISE_PROGRESS.md`;
5. aktuální exercise složku, `data.js` a `referenceExerciseAssets` v `app.js`;
6. při Muscle Card práci také `MASTER_ANATOMY.md` a
   `MUSCLE_CARD_PROFILE_AUDIT.md`.

Historický chat, archiv, starý Guide/Step ani jednotlivý `STATUS.md` nejsou
autorita proti těmto souborům.

## 2. Lifecycle assetu

```text
REFERENCE + reuse/mapping audit
↓
SOURCE candidate
↓
automatic QA
↓
user/final approval
↓
approved SOURCE
↓
Guide Card → Step by Step → Muscle Card podle potřeby
↓
asset QA
↓
runtime mapping
↓
browser/app QA
↓
documentation update
```

Neschválený candidate se nesmí mapovat do runtime ani označit jako approved.

## 3. Preflight: nejdřív reuse a mapping

Před generováním nebo editací:

1. potvrď canonical exercise ID z aktuálního `data.js`;
2. ověř, zda je ID aktivní v programu nebo jde o historical/inactive asset;
3. zkontroluj `referenceExerciseAssets` a knihovní image mapping;
4. prohlédni všechny fyzické soubory ve složce cviku;
5. hledej aktuální unversioned SOURCE a případný schválený exact reuse;
6. ověř case-sensitive cestu, příponu a URL encoding;
7. rozliš skutečně chybějící SOURCE od rozbitého runtime mappingu;
8. načti schválený paired SOURCE nebo EXERCISE_REFERENCE pro anatomii.

Centralizovaná aktivní sada EXERCISE_REFERENCE nyní v repozitáři není. Použij
jen referenci výslovně schválenou pro konkrétní úkol nebo schválený paired SOURCE.
Pokud podklad nestačí k přesnému určení pózy, negeneruj odhadovanou variantu.

HTTP 404 nebo neexistující versioned cesta neznamená automaticky chybějící
fotografii. Nejdřív ověř unversioned variantu. Aktuální známý příklad:
`sideplank_reach` má v runtime podezřelé odkazy na
`side_plank_reach_*_v01.png`, zatímco ve složce existují unversioned soubory.
Tento dokument pouze eviduje mapping bug; neopravuje jej.

## 4. SOURCE naming a technický standard

Aktivní SOURCE je **unversioned**. Výchozí pattern:

- `<exercise_slug>_start.png`
- `<exercise_slug>_hero.png`
- `<exercise_slug>_mid.png` pouze pokud je skutečně potřebný
- `<exercise_slug>_end.png` pouze pokud je obrazově/anatomicky odlišný

Jde o výchozí pattern pro nové SOURCE, ne o oprávnění hromadně přejmenovat již
schválené aktivní soubory. Pokud inventura eviduje existující unversioned
kanonický název odlišného tvaru, zachovej jej až do výslovného rename/migration
úkolu a ověř přesný case i runtime cestu.

Nevytvářej pro nové SOURCE suffixy `_v01`, `_v02` atd., pokud uživatel výslovně
neschválí nový důvod. Verzování Guide, Step nebo Muscle Card souborů je oddělené
a tímto pravidlem se neruší.

SOURCE standard:

- 1536 × 1024 px;
- landscape 3:2;
- RGB PNG;
- čistá fotografie bez textu, loga, ikon, rámečků, čísel, šipek a UI.

## 5. Význam fází a reuse

- **START** — výchozí pozice.
- **HERO** — hlavní anatomicky a vizuálně významná pracovní fáze.
- **MID** — pouze další skutečně odlišná fáze nutná k pochopení pohybu.
- **END** — pouze odlišná konečná fáze.

Pravidla:

- `END = START` → runtime použije přesný START; nový END soubor nevzniká.
- `HERO = START` → použije se přesný START; identická fyzická kopie nevzniká.
- Reuse je povolen pouze při exact anatomical identity, ne proto, že je póza
  pouze podobná.
- Dynamická, rotační nebo stranově odlišná fáze musí mít odlišný SOURCE, pokud
  je rozdíl pro techniku skutečně důležitý.
- Runtime sekvence, Guide panely a Step kroky jsou tři oddělené struktury.
  Počet panelů Guide ani Step se nikdy automaticky neodvozuje z runtime sekvence.

## 6. Příprava a generování SOURCE

Pracuj vždy s jedním konkrétním assetem. Prompt nebo edit musí výslovně určit:

- canonical ID a fázi;
- MASTER model + MASTER face;
- MASTER environment;
- správnou camera class: LYING, QUADRUPED, STANDING nebo SIDE FLOOR;
- pevnou podložku 183 × 68 cm jako měřítko přibližně 180cm modelky;
- schválený SOURCE/EXERCISE_REFERENCE pro přesnou pózu;
- zamčený outfit a případné vybavení;
- co jediného se smí změnit.

Při opravě jedné chyby použij co nejvíce surgical edit. Neregeneruj zbytečně
obličej, tělo, pozadí, podložku ani vybavení. Pokud izolovaná oprava bez
generativního dopočítávání není spolehlivá a uživatel zakázal generativní zásah,
zastav se a chybu popiš.

## 7. Pair/sequence consistency

START/HERO/MID/END jednoho cviku musí působit jako snímky jedné série. Mezi
fázemi zůstávají stejné:

- identita, obličej, věk a odstín pleti;
- vlasy, head/body ratio, tělesné proporce a svalnatost;
- outfit;
- podložka, místnost, kamera, framing a model scale;
- světlo, stíny, white balance a vybavení.

Mění se pouze tělesná pozice vyžadovaná pohybem.

## 8. Exercise a anatomické QA

Každý SOURCE musí správně zobrazovat konkrétní fázi cviku. Kontroluj:

- klouby, úhly a návaznost končetin;
- směr pohybu a stabilní části těla;
- pravou/levou stranu a diagonal/alternating pairing;
- počet a tvar rukou, prstů, nohou a chodidel;
- fyzicky možné spojení těla;
- bezpečnou Pilates techniku;
- správné držení vybavení.

U Bird Dog, Dead Bug a dalších střídavých cviků ověřuj explicitně správnou
protilehlou nebo stejnostrannou dvojici podle definice cviku. Vizuálně hezký
obrázek s chybnou anatomií je **FAIL**.

## 9. Equipment consistency

- Používej schválené black hex dumbbells stejné rodiny a proporcí.
- Dvě činky = přesně dvě samostatné činky, jedna v každé ruce.
- Dumbbell Pullover = přesně jedna činka, obě ruce na center handle, nikoli na
  koncových kotoučích.
- Pomůcka se mezi fázemi nesmí generativně zvětšit, zmenšit ani změnit tvar.
- U jiného vybavení platí schválený paired SOURCE/REFERENCE; nedoložené přesné
  rozměry se nevymýšlejí.

## 10. Automatické QA po každém obrázku

Po **každém** nově vygenerovaném nebo upraveném exercise obrázku proběhne QA
okamžitě, bez čekání na žádost uživatele.

Povinně zkontroluj:

- A. exercise/anatomy
- B. identity/face
- C. age
- D. hair
- E. body proportions
- F. muscularity
- G. head size
- H. outfit
- I. equipment
- J. camera/framing
- K. model scale
- L. mat
- M. environment
- N. wall/floor tone
- O. light/white balance
- P. artifacts/flecks
- Q. photographic realism
- R. consistency against paired SOURCE
- S. consistency against corresponding MASTER/camera class

Generative quality musí být bez wax/CGI vzhledu, plastické pleti, fleků na kůži,
obličeji, stěně, podlaze nebo podložce, deformovaných rukou/prstů/nohou,
deformovaného vybavení, nesmyslných stínů, náhodných předmětů, změny architektury
a perspektivních deformací.

Výsledek:

- **PASS / SCHVÁLENO** — splňuje celý checklist a může pokračovat k finálnímu
  uživatelskému schválení;
- **FAIL / NESCHVÁLENO** — nesmí být uložen/mapován jako approved.

Při FAIL:

1. pojmenuj konkrétní chybu;
2. proveď nejmenší bezpečnou opravu nebo regeneraci;
3. zopakuj celé automatické QA;
4. opakuj do PASS nebo technického limitu nástroje;
5. při limitu se zastav a přesně reportuj blocker.

Projektová hranice schválení zůstává minimálně 9,5/10; číselné skóre nikdy
nenahrazuje věcný PASS všech kritických bodů.

## 11. Approval a integrita souboru

- Candidate není approved bez výslovného user/final approval.
- Po schválení se používá přesný schválený soubor bez nevyžádaných pixelových
  úprav, resize, cropu nebo přebarvení.
- Pokud workflow nebo zadání poskytuje SHA-256, ověř hash před i po přesunu či
  přejmenování.
- Neodpovídající hash je blocker; nevytvářej přibližnou náhradu.

## 12. Guide Card a Step by Step

Nejdřív musí být schválené všechny potřebné SOURCE fáze. Teprve potom vzniká:

1. Guide Card;
2. Step by Step.

Standardní rozměry ověřené proti aktuálním schváleným Glute Bridge exportům:

- Guide Card: 780 × 1688 px, RGB PNG;
- Step by Step: 780 × 2280 px, RGB PNG.

Při pouhé výměně SOURCE zachovej existující schválený počet panelů/kroků,
pořadí, texty, layout, typografii, ikony, rozměry a kompozici. Nahrazují se jen
fotografie v existujících plochách. Guide/Step struktura se nesmí odvozovat z
runtime sekvence.

Historický Guide/Step smí být pose/movement reference, nikoli MASTER identity,
modelky, prostředí, barvy nebo kamery.

## 13. Muscle Cards — oddělený workflow

Muscle Card není SOURCE fotografie ani součást Guide/Step PNG. Řídí se pouze:

- `MASTER_ANATOMY.md`;
- `MUSCLE_CARD_PROFILE_AUDIT.md`;
- zamčenými `MOOVKA_MASTER_BODY_v02.png` a `MASTER_BODY_MAP_v02.png`.

Anatomie se nesmí odvozovat podle podobného názvu cviku. Reuse je povolen jen
pro přesně shodný schválený PRIMARY/SECONDARY profil. Pokud mapa neexistuje,
stav je OPEN; nevyrábí se přibližná náhrada.

Po každé vytvořené nebo upravené Muscle Card proběhne automatické QA anatomie,
PRIMARY/SECONDARY, MASTER BODY, proporcí, svalnatosti, kompozice, barvy a
technického formátu. Menší generativní odchylka je přijatelná pouze tehdy, když
není při běžném pohledu patrná a nemění identitu, proporce, svalnatost,
kompozici ani anatomii.

## 14. Runtime deployment QA

Při nasazení ověř:

- canonical ID;
- fyzický filename, příponu a přesný case;
- knihovní HERO mapping;
- `referenceExerciseAssets` mapping;
- START/HERO/MID/END pořadí a exact reuse;
- Guide, Step a Muscle Card reference;
- že žádný active mapping neukazuje na historical/archived asset;
- HTTP 200 všech nových aktivních URL a žádné 404;
- žádný placeholder nebo broken image;
- detail cviku a přepínání miniatur;
- workout zobrazení a zachování workout logiky;
- cache/version query pouze standardním způsobem projektu;
- browser console bez nových chyb.

Fyzický END se nevytváří jen proto, že runtime obsahuje návratovou fázi.

## 15. Global library QA

Aktivní program má 51 canonical IDs. `swan` je mimo aktivní program a do hlavní
galerie nepatří. Pro globální vizuální audit používej pouze aktuální SOURCE,
nikoli Guide/Step/Muscle/archiv:

- `Pilates Assets/03_Exports/Visual_QA/MOOVKA_SOURCE_GALLERY_ALL_01.png`
- `Pilates Assets/03_Exports/Visual_QA/MOOVKA_SOURCE_GALLERY_ALL_02.png`
- `Pilates Assets/03_Exports/Visual_QA/MOOVKA_SOURCE_GALLERY_ALL_03.png`
- `Pilates Assets/03_Exports/Visual_QA/MOOVKA_SOURCE_GALLERY_LYING.png`
- `Pilates Assets/03_Exports/Visual_QA/MOOVKA_SOURCE_GALLERY_QUADRUPED.png`
- `Pilates Assets/03_Exports/Visual_QA/MOOVKA_SOURCE_GALLERY_STANDING.png`
- `Pilates Assets/03_Exports/Visual_QA/MOOVKA_SOURCE_GALLERY_SIDE_FLOOR.png`

Galerie jsou QA exporty, nemění SOURCE a nejsou runtime assets. Hledej skutečné
outliers identity, věku, svalnatosti, head size, vlasů, outfitu, camera/scale,
podložky, prostředí, barevnosti a renderingu. Drobné přirozené rozdíly neopravuj
jen kvůli pixelové uniformitě.

## 16. Dokumentace po změně

Po dokončení relevantně aktualizuj:

- exercise `STATUS.md`, pokud je součástí workflow dané složky;
- `EXERCISE_PROGRESS.md` jako canonical inventory;
- stručný `Pilates Assets/00_Project_Status/EXERCISE_STATUS.md`, pokud se změnil
  souhrn;
- `00_CODEX/00_CODEX_STATE.md`, pokud se změnil runtime stav nebo další krok.

`Pilates Assets/03_Exports/EXERCISE_IMAGE_INDEX.md` je pouze rozcestník a nesmí
duplikovat celou inventuru.

## 17. ChatGPT a Codex

ChatGPT zajišťuje analýzu, vizuální QA, image workflow, plánování a rozhodnutí o
PASS/FAIL. Codex zajišťuje repo audit, bezpečné souborové operace, technické QA,
runtime mapping, dokumentaci a Guide/Step exporty podle schváleného workflow.

Kvůli úspoře běhů se související práce sdružuje do dobře ohraničených balíků.
Commit ani push se nedělá bez výslovného pokynu uživatele.

## 18. Active versus historical

- Active set se vždy odvozuje z aktuálního `data.js`, nikoli ze starého seznamu.
- Historický asset se nestává runtime assetem jen proto, že fyzicky existuje.
- `EXERCISE_PROGRESS.md` je canonical stavová inventura.
- Historické logy se nemažou; musí být jasně označené jako historical a nesmí
  přepisovat aktuální pravidla.
