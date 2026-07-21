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

MASTER prostředí je jediná schválená referenční fotografie místnosti.

Obsahuje pouze:

- místnost
- kameru
- perspektivu
- světlo
- podlahu
- polici
- dekorace
- barevnost

MASTER prostředí je uzamčeno.

Nesmí se měnit:

- kamera
- perspektiva
- ohnisko
- světlo
- rozmístění objektů
- velikost objektů

Podložka není součást MASTER prostředí.

Podložka je rekvizita stejně jako:

- činky
- odporová guma
- míč
- další cvičební pomůcky

Podložka se přidává až při generování konkrétního cviku.

MASTER model určuje:

- postavu
- oblečení
- vlasy
- identitu

Mění se pouze poloha těla.

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
- podložka jako rekvizita konkrétního cviku
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

Tento dokument má vyšší prioritu než:

- DESIGN_STANDARD.md
- CHATGPT_PROJECT_GUIDE.md
- IMAGE_WORKFLOW.md
- EXERCISE_PROMPT_TEMPLATE.md
- QA_Checklist.md
- CODEX_WORKFLOW.md
- REFERENCE_DETAIL_IMPLEMENTATION_PLAN.md

V případě rozporu platí:

PILATES_BODY_AI_BIBLE.md

# 13. Zásadní pravidlo projektu

Pokud existuje schválený referenční design nebo schválený referenční obrázek,

nikdy jej znovu negenerovat od nuly.

Vždy z něj vycházet.

Měnit pouze požadovanou část.

Konzistence má vždy vyšší prioritu než kreativita.
