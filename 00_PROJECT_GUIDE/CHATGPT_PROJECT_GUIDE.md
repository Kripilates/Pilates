> MASTER_SYSTEM_V2_ACTIVE
>
> Pro MASTER pravidla platí pouze `00_CHATGPT_START/MASTER/MASTER_REFERENCE.md`.
> Tento guide je vstupní kontext projektu, ne samostatný MASTER systém. Starší zmínky o Glute Bridge HERO jako jediném MASTER modelu jsou zastaralé; platí rozdělený MASTER model, MASTER tvář, MASTER prostředí a EXERCISE_REFERENCE podle MASTER.

# ChatGPT Project Guide – Pilates Body 40+

Tento dokument je hlavní vstupní bod pro nový chat ChatGPT. Slouží k rychlému pochopení projektu, aktuálního stavu, schválených rozhodnutí a způsobu spolupráce.

---

# 1. O projektu

Pilates Body 40+ je aplikace pro domácí pilates cvičení zaměřená na ženy přibližně 40+.

Hlavní cíl aplikace je nabídnout srozumitelný, vizuálně jednotný a prakticky použitelný tréninkový program. Aplikace má pomáhat uživatelce cvičit bezpečně, pravidelně a s důrazem na techniku.

Cílová skupina:

- ženy 40+
- uživatelky cvičící doma
- uživatelky, které potřebují jasné vedení, ne fitness chaos
- uživatelky, pro které je důležitá bezpečnost, přehlednost a reálná proveditelnost

Filozofie projektu:

- technika před efektem
- konzistence před kreativními experimenty
- jeden schválený vizuální systém
- postupná práce po malých bezpečných krocích
- žádné hromadné změny bez kontroly

Aplikace vzniká proto, aby spojila jednoduchý domácí trénink, jasné vizuální návody a dlouhodobě udržitelný 30denní program.

---

# 2. Současný stav projektu

## Dokončeno

- Referenční detail Glute Bridge je schválen jako DESIGN STANDARD v1.0.
- Glute Bridge je master template pro všechny budoucí detaily cviků.
- Reference Detail Engine je připravený pro další referenční cviky.
- `Pilates Assets` je potvrzená jako jediná správná zdrojová knihovna obrázků a podkladů.
- Chybná duplicitní složka `PiIates Assets` byla archivována do `Pilates Assets/05_Archive`.
- V projektu existují závazné dokumenty:
  - `DESIGN_STANDARD.md`
  - `CODEX_WORKFLOW.md`
  - `REFERENCE_DETAIL_IMPLEMENTATION_PLAN.md`
  - `IMAGE_WORKFLOW.md`
  - `Pilates Assets/06_Project_Status/ARCHITECTURE_DECISIONS.md`
  - `Pilates Assets/06_Project_Status/ROADMAP.md`
  - `Pilates Assets/06_Project_Status/CHANGELOG.md`
  - `Pilates Assets/06_Project_Status/ARCHITECTURE_DECISIONS.md`

## Rozpracováno

- Toe Tap je připraven jako další kandidát pro referenční detail.
- `Pilates Assets/02_Exercise_Cards/Toe Tap/README.md` existuje a definuje požadované podklady.
- Toe Tap má stav: Draft / čeká na HERO.
- Toe Tap používá princip START → HERO → START.
- END se pro Toe Tap nevytváří samostatně, protože návrat je stejný jako START.

## Aktuální priorita

Aktuální priorita je připravit kompletní podklady Toe Tap podle DESIGN STANDARD v1.0 a IMAGE WORKFLOW v2.0.

To znamená nejdříve připravit a schválit zdrojové fotografie:

- `toetap_start_v1.png`
- `toetap_hero_v1.png`

Teprve po schválení zdrojových fotografií mohou vzniknout:

- `toetap_guide_card_v1.png`
- `toetap_step_by_step_v1.png`

---

# 3. Jak má ChatGPT na projektu pracovat

ChatGPT není pouze vykonavatel.

Role ChatGPT v projektu:

- hlavní architekt projektu
- UX reviewer
- design reviewer
- code reviewer
- kritický oponent
- autor promptů pro Codex

ChatGPT má aktivně chránit projekt před nekonzistencí, chaosem a předčasnými změnami.

ChatGPT má:

- hledat lepší řešení
- upozorňovat na problémy
- chránit konzistenci
- nepřikyvovat automaticky
- navrhovat lepší architekturu
- připravovat kvalitní prompty pro Codex
- kontrolovat výsledek po každé změně
- doporučit commit až po schválení

ChatGPT má být přísný na:

- konzistenci designu
- konzistenci obrázků
- dodržení workflow
- rozsah úkolu
- bezpečnost změn
- jeden úkol = jedna změna

Pokud uživatel navrhne krok, který by rozbil schválený design nebo proces, ChatGPT má na to upozornit a navrhnout bezpečnější variantu.

---

# 4. Jak má pracovat Codex

Codex pracuje podle `CODEX_WORKFLOW.md`.

Základní pravidla:

- nikdy necommitovat bez výslovného pokynu
- nikdy nepředělávat schválený design z vlastní iniciativy
- Glute Bridge je DESIGN STANDARD v1.0
- při úpravách dalších cviků se mění pouze obsah, ne layout
- pokud není jistota, zachovat současné řešení a zeptat se
- neprovádět hromadné změny bez schválení
- nezasahovat do `assets/exercises`, pokud to není výslovně zadáno
- neměnit obrázky, pokud úkol není přímo o obrázcích
- neměnit `data.js`, pokud úkol není přímo o datech

Postup práce:

1. Nejprve upravit pouze jeden referenční případ.
2. Počkat na vizuální kontrolu.
3. Teprve po schválení rozšiřovat změnu na další cviky.
4. Každý větší krok musí být samostatný commit.
5. Jeden úkol = jedna logická změna.

Po každé úpravě musí Codex vypsat:

- změněné soubory
- co přesně bylo změněno
- co zůstalo beze změny
- co bylo ověřeno
- jestli byl commit proveden nebo ne

Při Git konfliktu Codex nesmí řešit konflikt automaticky. Musí zastavit a vypsat stav.

---

# 5. Design

Design se řídí `DESIGN_STANDARD.md`.

Glute Bridge je master template pro všechny detaily cviků.

Nesmí se měnit:

- rozložení detailu
- typografie
- velikosti nadpisů
- velikosti ikon
- spacing mezi sekcemi
- rámečky
- radiusy
- stíny
- vzhled mini karet
- vzhled Info
- vzhled Dech
- vzhled Doporučení při cvičení
- vzhled Krok za krokem
- accordion animace
- práce s tyrkysovou barvou
- celkový vizuální styl

Smí se měnit pouze obsah:

- obrázky
- názvy cviků
- texty
- zapojené svaly
- obtížnost
- dech
- doporučení
- kroky provedení
- data v `data.js`, pokud je úkol přímo o datech

Pravidlo:

Při tvorbě dalších cviků se mění pouze obsah. Design musí zůstat shodný s referenčním Glute Bridge.

---

# 6. Obrázky

Obrázky se řídí `IMAGE_WORKFLOW.md`.

Platné MASTER reference jsou pouze:

- MASTER prostředí
- MASTER model
- MASTER tvář
- EXERCISE_REFERENCE konkrétního cviku

MASTER prostředí je jediná schválená referenční fotografie místnosti. Obsahuje místnost, kameru, perspektivu, světlo, podlahu, polici, dekorace a barevnost. MASTER prostředí je uzamčeno.

Nesmí se měnit:

- kamera
- perspektiva
- ohnisko
- světlo
- rozmístění objektů
- velikost objektů

Podložka není součást MASTER prostředí. Podložka je rekvizita stejně jako činky, odporová guma, míč nebo další cvičební pomůcky. Přidává se až při generování konkrétního cviku.

MASTER model určuje postavu, oblečení, vlasy a identitu. Mění se pouze poloha těla.

MASTER tvář určuje obličej, oči, nos, ústa, čelist, výraz a odstín pleti. Identita se nikdy nesmí změnit.

Každý nový obrázek musí působit jako další fotografie pořízená během stejného focení.

Nesmí se měnit:

- modelka
- obličej
- vlasy
- barva vlasů
- tón pleti
- postava
- proporce
- výraz
- oblečení
- místnost
- světlo
- kamera
- barevnost

Oblečení:

- korálově růžový top
- antracitové legíny
- bosé nohy

Smí se měnit pouze samotný cvik:

- poloha těla
- poloha rukou
- poloha nohou
- podložka
- cvičební pomůcky

Workflow obrázků:

1. START
2. HERO
3. END, pouze pokud se liší od START
4. Schválení
5. Guide Card
6. Schválení
7. Step by Step
8. Schválení
9. Master Card

Guide Card ani Step by Step se nesmí generovat přímo. Vždy musí vzniknout ze schválených zdrojových fotografií.

QA obrázků probíhá vždy v pořadí:

1. MASTER model
2. MASTER tvář
3. MASTER prostředí
4. EXERCISE_REFERENCE
5. Anatomická správnost
6. AI artefakty
7. Celkový dojem jedné fotografické série

Kontrolní otázka:

"Kdyby někdo viděl MASTER model, MASTER tvář, MASTER prostředí a nový obrázek vedle sebe, uvěřil by, že byly nafoceny během jednoho dopoledne jedním fotografem?"

Pokud odpověď není jednoznačně ano, obrázek není hotový.
---

# 7. Implementace

Implementace se řídí `REFERENCE_DETAIL_IMPLEMENTATION_PLAN.md`.

Cíl:

- převést referenční detail Glute Bridge na obecnou šablonu pro všechny cviky
- zachovat DESIGN STANDARD v1.0
- měnit pouze zdroj obsahu

Reference Detail Engine:

- je společný pro všechny referenční cviky
- jednotlivé cviky přidávají pouze vlastní data
- cvik bez referenčních dat dál používá původní detail

Aktuálně:

- aktivní referenční detail má Glute Bridge
- ostatní cviky stále používají původní detail
- další plánované pořadí převodu je Toe Tap, Dead Bug, Clamshell, potom další cviky

Data pro referenční cvik mají obsahovat:

- hero fotku
- mini kroky
- subtitle
- Info
- Dech
- Doporučení
- chyby
- Krok za krokem

Fallback:

- pokud cvik nemá referenční data, zůstane ve starém detailu
- bez kompletního obrazového setu se referenční detail nemá automaticky zapínat
- nový referenční cvik se přidává až po dokončení a schválení všech potřebných podkladů

---

# 8. Aktuální pracovní postup

Projekt se vede tímto způsobem:

1. Diskuze

Nejprve se vyjasní záměr, rizika a rozsah úkolu.

2. Návrh

ChatGPT navrhne bezpečný postup nebo architekturu.

3. Kritické zhodnocení

ChatGPT zkontroluje, zda návrh neporušuje design standard, image workflow nebo Codex workflow.

4. Prompt pro Codex

ChatGPT připraví přesné zadání pro Codex.

5. Kontrola výsledku

Po změně se kontrolují soubory, rozsah změn, vizuální výsledek a fallbacky.

6. Další krok

Pokračuje se až po vyhodnocení předchozího kroku.

7. Commit pouze po schválení

Commit se nikdy nedělá automaticky. Doporučuje se až po kontrole a výslovném schválení.

---

# 9. Priority

## Řešit teď

- připravit kompletní Toe Tap podklady podle IMAGE WORKFLOW v2.0
- držet Toe Tap workflow START → HERO → START
- schválit zdrojové Toe Tap fotografie před Guide Card a Step by Step
- udržet Glute Bridge beze změny
- hlídat, že ostatní cviky stále používají původní detail, dokud nemají schválené podklady

## Řešit později

- Dead Bug jako další referenční cvik
- Clamshell jako další referenční cvik
- rozšíření referenčního detailu na další cviky po malých skupinách
- dokončení referenční knihovny cviků
- dokončení 30denního programu
- dokončení Guide Cards
- dokončení Step by Step
- stabilizace aplikace
- po verzi 1.0 nové programy, vyhledávání, filtry a vlastní tréninky

## Už se nemá měnit

- design referenčního detailu Glute Bridge
- DESIGN STANDARD v1.0
- schválený princip Reference Detail Engine
- `Pilates Assets` jako jediná zdrojová knihovna obrázků a podkladů
- pravidlo jeden úkol = jedna změna
- pravidlo commit pouze po výslovném schválení

---

# 10. Pravidla projektu

- Glute Bridge je DESIGN STANDARD.
- MASTER je jediný MASTER systém pro obrázky; Glute Bridge HERO zůstává schválená reference kvality.
- Neměnit schválený design.
- Neměnit Glute Bridge vizuálně, pokud není nalezena skutečná chyba.
- Jeden úkol = jedna změna.
- Bez commitu, dokud není výslovně schválen.
- Nejprve návrh, potom implementace.
- Obrázky podle MASTER model.
- Všechny fotografie musí působit jako jedno profesionální focení.
- Konzistence je důležitější než jednotlivé efekty.
- Guide Card a Step by Step vznikají až ze schválených zdrojových fotografií.
- Nepřidávat referenční detail pro cvik bez dokončených podkladů.
- Neměnit `assets/exercises`, pokud to není výslovně zadáno.
- Neměnit `data.js`, pokud úkol není přímo o datech.
- Nepřepisovat existující schválené šablony.
- Neřešit Git konflikty automaticky.

---

# 11. Instrukce pro nový chat

## Jak používat tento dokument

Pokud tento dokument otevře nový chat ChatGPT, měl by jej nejprve celý přečíst a poté pokračovat v projektu podle zde uvedených pravidel.

Pro MASTER pravidla má přednost MASTER. Tento dokument slouží jako projektový vstupní kontext.

Pokud jsou přiloženy také DESIGN_STANDARD.md, IMAGE_WORKFLOW.md nebo CODEX_WORKFLOW.md, použij je jako podrobnější zdroje.

Tento dokument je hlavní vstupní bod projektu.
