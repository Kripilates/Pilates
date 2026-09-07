> MASTER_SYSTEM_V2_ACTIVE
>
> Tento workflow je podřízen `00_CHATGPT_START/MASTER/01_DOCUMENTS/MASTER_REFERENCE.md`.
> Platný zdroj pravdy pro prostředí je MASTER prostředí. Platný zdroj pravdy pro modelku je MASTER model a MASTER tvář. EXERCISE_REFERENCE určuje anatomii konkrétního cviku.

# Pilates Body 40+ – IMAGE WORKFLOW v2.0

## Účel

Tento dokument definuje jednotný způsob tvorby všech obrázků v projektu Pilates Body 40+.

Je závazný pro všechny budoucí AI modely pracující na projektu.

Pokud je jakýkoliv MASTER pokyn v rozporu s MASTER, přednost má MASTER. Tento dokument zůstává podpůrný workflow dokument.

---

# Hlavní filozofie

Cílem projektu není vytvářet jednotlivé hezké obrázky.

Cílem je vytvořit jednu jednotnou profesionální fotografickou sérii.

Uživatel musí mít pocit, že všechny fotografie vznikly během jednoho profesionálního focení.

Ne jako různé AI rendery.

Ne jako různé modelky.

Ne jako různé místnosti.

Ale jako jedno jediné focení.

---

# MASTER SYSTEM

Platný MASTER systém je MASTER.

Používej:

- MASTER prostředí pro prázdné studio, světlo, stěnu, podlahu, sokl, závěs a barevnost
- odpovídající MASTER CAMERA LYING / QUADRUPED / STANDING pro kameru, perspektivu, pozici a měřítko
- MASTER MAT 183 × 68 cm jako primární fyzickou autoritu měřítka 180cm modelky, kamery a místnosti
- MASTER model pro postavu, oblečení, vlasy a identitu
- MASTER tvář pro obličej, oči, nos, ústa, čelist, výraz a odstín pleti
- EXERCISE_REFERENCE pro anatomii konkrétního cviku


---

# Co se NESMÍ změnit

## Modelka

Musí být stále stejná osoba.

Nesmí se měnit:

- obličej
- oči
- nos
- rty
- čelist
- vlasy
- účes
- barva vlasů
- tón pleti
- postava
- proporce
- výraz

Nesmí vzniknout dojem jiné ženy.

---

## Oblečení

Musí být stále stejné.

- TOP přesně `#F36F6A`
- LEGÍNY přesně `#252528`
- barefoot, pokud cvik výslovně nevyžaduje jinak

Bez jakékoliv změny.

---

## Prostředí

MASTER prostředí je jediná schválená autorita prázdného moderního Moovka studia.

Aktivní MASTER environment source of truth je `Pilates Assets/01_Master_Reference/MOOVKA_MASTER_ENVIRONMENT_v02.png` společně s `MOOVKA_MASTER_ENVIRONMENT_v02_SPEC.md`.

MASTER environment updated 2026-08-30. Existing approved exercise assets are grandfathered; regeneration is required only when an asset is newly created or otherwise being regenerated/reworked.

MASTER prostředí je uzamčeno:

- téměř bílá neutrální stěna, která nesmí působit šedě
- světlá přírodní light-oak / warm-neutral podlaha
- čistý bílý sokl
- průsvitný bílý závěs pouze vlevo
- měkké denní světlo zleva
- pouze velmi jemný plynulý světelný gradient na stěně
- žádné police, rostliny, knihy, vázy, dekorace, nábytek, obrazy, zrcadla, zásuvky/panely, logo ani text
- žádný viditelný strop, ceiling light strip, recessed cove ani světelná architektonická lišta
- žádné diagonální pruhy, stíny žaluzií, okenních rámů nebo závěsů ani tvrdé fleky světla
- žádný CGI/waxy vzhled, fleky, špína nebo deformace
- **NO VISIBLE SHADOW PATTERN ON WALL.**

## Podložka — primary scale authority

- Podložka má pevný reálný rozměr 183 × 68 cm a modelka měří 180 cm.
- Určuje velikost modelky, vzdálenost kamery, měřítko místnosti a konzistenci mezi cviky.
- Když póza, modelka nebo kamera vůči podložce nesedí, opravuje se modelka nebo kamera; podložka se nikdy nezkracuje, neprodlužuje ani nerescaluje.
- LYING sanity check: neutrální plně natažená modelka se musí head-to-toe vejít na podložku pouze s malou reálnou rezervou.

---

## Kamera

Existují tři pevné kamerové třídy a každá používá odpovídající schválený MASTER CAMERA reference image:

- LYING: low true side view; maximum envelope = plně natažené nohy + paže plně za hlavou; QA tolerance 88–92 % šířky.
- QUADRUPED: true side view; maximum envelope = Bird Dog; QA tolerance 80–85 % šířky.
- STANDING: maximum envelope = stoj + ruce plně nad hlavou + dvě malé 1kg činky; QA tolerance 88–92 % dostupné výšky.

Schválený camera reference image má vždy přednost před procenty. Kompaktnější póza nesmí změnit zoom, velikost modelky ani vzdálenost kamery. START, HERO a END jednoho cviku zachovávají stejnou camera class, perspektivu, měřítko a podložku bez zoomu mezi fázemi.

Fotografie musí působit jako pokračování stejného focení.

---

## Světlo

Musí zůstat stejné.

Stejný směr světla.

Stejná intenzita.

Žádný viditelný stínový vzor na stěně.

Stejná barevná teplota.

Žádné večerní světlo.

Žádné jiné počasí.

---

## Barevnost

Stejná jako MASTER model.

Čistá neutrální až lehce warm-neutral.

Přirozená.

Bez oranžového nádechu.

Bez žlutého světla.

Bez dramatických kontrastů.

---

# Co se mění

Pouze samotný cvik.

Smí se změnit pouze:

- poloha těla
- poloha rukou
- poloha nohou
- cvičební pomůcky

Nic dalšího.

## Povinné pose reuse

Pokud existuje schválený nebo původní SOURCE obrázek cviku, použije se jako závazná anatomická a pózová reference. Zachovat joint angles, směr končetin, rotaci trupu, polohu rukou, polohu chodidel, gaze a fázi cviku. Nevymýšlet novou pózu podle textu, pokud obrazová reference existuje.

Při sjednocení se mění pouze poloha těla podle původní reference. Modelka, obličej, vlasy, outfit, prostředí, podložka, camera class, perspektiva, světlo, white balance a barvy zůstávají zamčené.

---

# Pravidlo jednoho focení

Při tvorbě každého obrázku si AI musí představit následující situaci:

Fotograf nefotí nový projekt.

Pouze pokračuje ve stejném focení.

Modelka se přesune do nové pozice.

V rámci jednoho cviku a jeho zvolené camera class zůstává fotoaparát beze změny.

Světlo zůstává stejné.

Místnost zůstává stejná.

Fotograf pouze zmáčkne spoušť znovu.

---

# Workflow

Každý cvik vzniká pouze tímto způsobem:

START

↓

HERO

↓

END (pouze pokud se liší od START)

↓

Schválení

↓

Guide Card

↓

Schválení

↓

Step by Step

↓

Schválení

↓

Master Card

Nikdy negenerovat Guide Card nebo Step by Step přímo.

Vždy musí vzniknout ze schválených zdrojových fotografií.

---

# Zdrojové fotografie

Zdrojové fotografie nesmí obsahovat:

- text
- rámečky
- čísla
- grafiku
- šipky
- ikony
- UI

Pouze čistou fotografii cviku.

---

# Anatomie

Každý cvik musí být:

- anatomicky správný
- odpovídat Pilates
- odpovídat skutečné biomechanice

Pokud je cvik proveden špatně, fotografie se považuje za chybnou bez ohledu na její vzhled.

---

# Kontrola konzistence

Před schválením každého nového obrázku musí AI porovnat nový obrázek s MASTER.

Musí zkontrolovat v pořadí:

1. MASTER model
2. MASTER tvář
3. MASTER prostředí
4. EXERCISE_REFERENCE
5. Anatomická správnost
6. AI artefakty
7. Celkový dojem jedné fotografické série

Dále povinně kontrolovat:

- správnost pózy proti původní obrazové referenci
- vlasy bez copper/orange/red castu
- TOP přesně `#F36F6A`
- LEGÍNY přesně `#252528`
- zákaz viditelného shadow patternu na stěně
- pevnou podložku 183 × 68 cm a měřítko 180cm modelky
- správnou camera class, scale a perspektivu
- konzistenci START/HERO/END bez zoomu mezi fázemi

POST-GENERATION QA probíhá automaticky bez čekání na uživatele. Pokud kterýkoli bod neprojde, výsledek není APPROVED a musí se opravit.

Pokud je rozdíl viditelný na první pohled, obrázek není správný.

---

# Kontrolní otázka

Před dokončením každého obrázku si AI položí otázku:

"Kdyby někdo viděl MASTER model, MASTER tvář, MASTER prostředí a tento nový obrázek vedle sebe, uvěřil by, že jde o stejnou modelku ve stejné sérii?"

Pokud odpověď není jednoznačně ANO,

obrázek není hotový.

---

# Hodnocení kvality obrázků

Při hodnocení nových obrázků ChatGPT nesmí automaticky schvalovat návrhy.

Každý obrázek musí být kriticky zhodnocen jako celek.

Hodnotí se zejména:

- anatomická správnost cviku,
- konzistence s MASTER model,
- konzistence s MASTER tvář,
- shoda modelky,
- prostředí,
- kamera,
- světlo,
- barevnost,
- kompozice,
- profesionální dojem.

## Hodnoticí stupnice

10,0
Referenční kvalita podle MASTER

9,8–9,9
Výjimečná kvalita

9,5–9,7
Produkční kvalita.
Lze schválit.

9,0–9,4
Dobrý návrh.
Neschvaluje se.
Navrhují se další úpravy.

Pod 9,0
Obrázek se přepracuje.

## Pravidlo projektu

Žádný obrázek nesmí být označen jako SCHVÁLENO, pokud nedosáhne minimálně hodnocení 9,5/10.

ChatGPT má aktivně hledat nedostatky a navrhovat jejich odstranění.

Pokud existují objektivní důvody pro zlepšení, ChatGPT nesmí obrázek schválit jen proto, aby se práce urychlila.

Konzistence celé série má přednost před rychlostí dokončení projektu.

---

# Nejvyšší pravidlo projektu

Konzistence celé série je důležitější než kvalita jednotlivého obrázku.

Je lepší mít o něco méně efektní fotografii, která dokonale zapadne do série, než technicky krásný obrázek, který působí jako z jiného focení.
