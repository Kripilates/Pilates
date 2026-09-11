> MASTER_SYSTEM_V2_ACTIVE
>
> Jediný platný MASTER systém projektu je `00_CHATGPT_START/MASTER/01_DOCUMENTS/MASTER_REFERENCE.md`.
> Tento dokument zůstává projektová Bible pro aplikaci, spolupráci a obecná pravidla, ale všechna pravidla pro MASTER model, MASTER tvář, MASTER prostředí, EXERCISE_REFERENCE, promptování obrázků a QA se řídí MASTER.
> Starší formulace typu „Glute Bridge HERO je jediný MASTER model“ jsou zastaralé. Platné MASTER reference jsou MASTER model, MASTER tvář, MASTER prostředí a EXERCISE_REFERENCE.
> Nejvyšší prioritou je zpětná kompatibilita: žádné sjednocení pravidel nesmí rozbít existující workflow aplikace ani schválené obrazové podklady.

# PILATES_BODY_AI_BIBLE

# Approved Reference Exercises

1. Glute Bridge
2. Toe Tap
3. Dead Bug

Tyto cviky představují závazný vizuální standard projektu.

Veškeré nové obrázky musí odpovídat:

- modelce
- prostředí
- světlu
- barevnosti
- objektivu
- kompozici
- kvalitě

# PRE-GENERATION QA (Mandatory)

Před každým generováním musí ChatGPT provést kontrolu.

Žádné generování nesmí začít bez této kontroly.

Workflow:

1. Urči aktivní cvik.

Například:

- Dead Bug
- Clamshell
- Toe Tap
- Glute Bridge

2. Urči přesně jeden asset.

Možnosti:

- START
- HERO
- END

Nikdy více assetů najednou.

3. Zakázané výstupy:

- Guide Card
- Step by Step
- Master Card
- Infografika
- Poster
- Instrukční karta
- Koláž
- UI
- Grafické prvky

Pokud by měl vzniknout některý z těchto výstupů, generování se okamžitě zastaví.

4. Kontrola source image

Musí být:

- fotografie
- bez textu
- bez ikon
- bez šipek
- bez rámečků
- bez grafiky
- bez loga
- bez popisků
- bez čísel
- bez UI

Pokud některý bod neplatí, obrázek se nesmí vytvořit.

5. Kontrola zamčených MASTER pravidel

- existující schválený/původní SOURCE je povinná pose reference, pokud existuje
- správná camera class LYING / QUADRUPED / STANDING
- podložka 183 × 68 cm jako PRIMARY SCALE AUTHORITY pro 180cm modelku
- TOP přesně `#F36F6A`, LEGÍNY přesně `#252528`
- prázdné MASTER prostředí bez viditelného shadow patternu na stěně

# 1. Účel projektu

- Pilates Body 40+ je dlouhodobě vyvíjená aplikace.
- Priorita projektu:
  1. konzistence
  2. kvalita
  3. stabilita
  4. rychlost vývoje

# 2. Role ChatGPT

ChatGPT je:

- UX designer
- Art Director
- Code Reviewer
- QA Tester
- Konzultant

Nejen generátor textu.

Má kriticky hodnotit návrhy.

Nemá automaticky souhlasit.

Má aktivně hledat lepší řešení.

# 3. Role Codexu

Codex pouze implementuje.

Postup práce je vždy:

Analýza

↓

Vysvětlení

↓

Návrh

↓

Implementace

↓

Kontrola

↓

Commit

Nikdy opačně.

# 4. DESIGN STANDARD

Referenční detail:

Glute Bridge

je DESIGN STANDARD v1.0.

Design se již dále neupravuje.

Další cviky se přizpůsobují jemu.

# 5. MASTER reference obrázků

Platné MASTER reference jsou pouze:

- MASTER prostředí
- MASTER model
- MASTER tvář
- EXERCISE_REFERENCE

Kameru, perspektivu, pozici a měřítko určují tři pevné MASTER CAMERA reference LYING / QUADRUPED / STANDING. Podložka 183 × 68 cm je primární fyzická autorita měřítka pro 180cm modelku, vzdálenost kamery a měřítko místnosti.

Pro anatomické obrázky "Zapojené svaly" platí navíc `MASTER_ANATOMY.md` a zamčený `MOOVKA_MASTER_BODY_v02`.

Před jakoukoli tvorbou, úpravou nebo nasazením anatomických obrázků musí být načten `MASTER_ANATOMY.md` a `MOOVKA_MASTER_BODY_v02`. Anatomický MASTER je zamčený a nesmí být nahrazován nově generovanou podobnou postavou.

MASTER prostředí je jediná schválená autorita prázdného moderního Moovka studia.

Obsahuje pouze:

- místnost
- světlo
- podlahu
- téměř bílou neutrální stěnu
- bílý sokl
- průsvitný bílý závěs pouze vlevo
- barevnost

MASTER prostředí je uzamčeno.

Nesmí se měnit:

- světlo
- prázdné prostředí bez nábytku a dekorací
- white balance a barvy

Přísně zakázány jsou police, rostliny, knihy, vázy, dekorace, nábytek, obrazy, zrcadla, zásuvky/panely, logo/text, viditelný strop, ceiling light strip, recessed cove, světelná architektonická lišta, diagonální pruhy, stíny žaluzií, okenních rámů nebo závěsů a tvrdé fleky světla. **NO VISIBLE SHADOW PATTERN ON WALL.**

Podložka má pevný rozměr 183 × 68 cm a nikdy se podle pózy nerescaluje. Pokud nesedí modelka nebo kamera vůči podložce, opravuje se modelka nebo kamera.

MASTER model určuje:

- postavu
- oblečení
- vlasy
- identitu

Mění se pouze poloha těla.

Modelka je vždy stejná konkrétní žena cca 40 let, štíhlá a přirozeně zpevněná, ne kulturistická. Vlasy jsou dark blonde / light brown s jemnými světlejšími prameny, bez dark brunette, black, copper, orange nebo red castu. TOP je přesně `#F36F6A`, LEGÍNY přesně `#252528`, barefoot pokud cvik výslovně nevyžaduje jinak.

MASTER tvář určuje:

- obličej
- oči
- nos
- ústa
- čelist
- výraz
- odstín pleti

Nikdy se nesmí změnit identita.

EXERCISE_REFERENCE určuje anatomii konkrétního cviku.

Pokud existuje původní nebo schválený SOURCE obrázek cviku, je povinnou pózovou referencí. Zachovávají se joint angles, směr končetin, rotace trupu, poloha rukou a chodidel, gaze a fáze cviku. Nová póza se nevymýšlí podle textu.

Nové obrázky musí působit jako fotografie ze stejného focení.

Nikdy jako nové AI prostředí.
# 6. Workflow obrázků

Pořadí je vždy:

START IMAGE

↓

HERO IMAGE

↓

END IMAGE (pokud je odlišný)

↓

Schválení

↓

Guide Card

↓

Step by Step

↓

Master Card

Nikdy nevytvářet všechny karty najednou.

Každý START, HERO a END musí být před schválením porovnán:

1. s MASTER model
2. s MASTER tvář
3. s MASTER prostředí
4. s EXERCISE_REFERENCE konkrétního cviku

Schválení vyžaduje současně:

- vizuální shodu s MASTER modelem, MASTER tváří a MASTER prostředím
- anatomickou shodu s EXERCISE_REFERENCE
- správnou Pilates techniku
- čistý zdrojový obrázek bez textu a grafiky

# 7. Schvalování obrázků

POST-GENERATION QA probíhá vždy v tomto pořadí:

1. MASTER model
2. MASTER tvář
3. MASTER prostředí
4. EXERCISE_REFERENCE
5. ANATOMICKÁ SPRÁVNOST
6. AI ARTEFAKTY
7. CELKOVÝ DOJEM JEDNÉ FOTOGRAFICKÉ SÉRIE

Pokud neprojde MASTER model, MASTER tvář nebo MASTER prostředí, obrázek se automaticky neschvaluje, i kdyby byla anatomie správná.

Kontrolní otázka:

„Kdyby uživatel viděl MASTER model, MASTER tvář, MASTER prostředí a nový obrázek vedle sebe, uvěřil by, že vznikly během stejného focení se stejnou modelkou?“

Pokud odpověď není jednoznačné ANO, obrázek se neschvaluje.

Hranice pro schválení:

- 9,5-10,0 = lze schválit
- 9,0-9,4 = pokračuje další iterace
- pod 9,0 = přepracovat

Samotná anatomická správnost nestačí.

Schválený obrázek musí současně splnit:

- stejná modelka
- stejný obličej
- stejné vlasy
- stejné oblečení
- stejná místnost
- stejná kamera
- stejné světlo
- stejná barevnost
- stejná fyzická podložka 183 × 68 cm bez rescalingu
- správná MASTER CAMERA class a scale bez zoomu mezi START/HERO/END
- žádný viditelný shadow pattern na stěně
- TOP `#F36F6A` a LEGÍNY `#252528`
- anatomická shoda s EXERCISE_REFERENCE
- žádné rušivé AI artefakty

Výsledek, který je „hezký“, ale vypadá jako jiné focení, je chybný.

Žádný obrázek není schválen pod 9,5.

ChatGPT nesmí označit obrázek jako schválený bez provedení a zapsání QA kontroly.

Obrázek, který vypadá dobře, ale anatomicky neodpovídá referenci, je chybný.

Obrázek, který anatomicky odpovídá, ale vypadá jako jiné focení, je také chybný.

Schválený je pouze obrázek, který splňuje obě podmínky současně:

- vizuální shodu s MASTER modelem, MASTER tváří a MASTER prostředím
- anatomickou shodu s EXERCISE_REFERENCE

# 8. Kritický přístup

ChatGPT má aktivně hledat nedostatky.

Nemá schvalovat průměrné výsledky.

Schválení znamená:

„Tento výsledek bych bez výhrad použil jako šablonu pro dalších 50 cviků.“

# 9. Kód

Priorita:

- funkčnost
- UX
- stabilita
- vzhled

Žádné zbytečné refaktory.

Neopravovat fungující části.

# 10. UX

Používat:

- minimalistický design
- čisté rozhraní
- hodně bílého prostoru
- tyrkysovou pouze jako akcent

Nepoužívat:

- velké barevné bloky
- těžké stíny
- přeplácané ikony
- vizuální šum

# 11. Design filozofie

Inspirace:

- Apple
- Notion
- Nike Training Club
- Calm

# 12. Dokumentace

Nejvyšší prioritu pro obrazový MASTER systém má `MASTER_REFERENCE.md`. Tento dokument je podpůrná projektová Bible. Dále podporuje:

- DESIGN_STANDARD.md
- CHATGPT_PROJECT_GUIDE.md
- IMAGE_WORKFLOW.md
- EXERCISE_PROMPT_TEMPLATE.md
- QA_Checklist.md
- CODEX_WORKFLOW.md
- REFERENCE_DETAIL_IMPLEMENTATION_PLAN.md

V případě rozporu platí `MASTER_REFERENCE.md` a jeho aktivní environment, camera a mat pravidla.

# 13. Zásadní pravidlo projektu

Pokud existuje schválený referenční design nebo schválený referenční obrázek,

nikdy jej znovu negenerovat od nuly.

Vždy z něj vycházet.

Měnit pouze požadovanou část.

Konzistence má vždy vyšší prioritu než kreativita.
