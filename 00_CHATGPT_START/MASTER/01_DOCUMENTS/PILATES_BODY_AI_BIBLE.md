# MOOVKA — PROJECT BIBLE

Status: **ACTIVE PRINCIPLES**
Aktualizováno: 2026-09-12

Tento dokument drží dlouhodobé principy projektu. Neduplikuje technické image
instrukce. Pro konkrétní práci platí:

- `MASTER_REFERENCE.md` — vizuální a fyzické autority;
- `IMAGE_WORKFLOW.md` — tvorba, opravy, QA, approval a deployment;
- `MASTER_IMAGE_CHECKLIST.md` — povinný checklist;
- `MASTER_ANATOMY.md` — Muscle Cards;
- `EXERCISE_PROGRESS.md` — aktuální stav 51 aktivních cviků;
- `DESIGN_STANDARD.md` — layout detailu aplikace;
- `CODEX_WORKFLOW.md` — repo práce.

## 1. Poslání

Moovka má nabídnout přehledné, bezpečné a realisticky proveditelné domácí
cvičení. Uživatelka má dostat klidné vedení a správnou techniku, nikoli vizuální
chaos nebo agresivní fitness estetiku.

## 2. Priority

1. anatomická správnost a bezpečnost;
2. konzistence celé série;
3. stabilita aplikace;
4. kvalita jednotlivého výstupu;
5. rychlost práce.

Krásný obrázek s chybnou anatomií je FAIL. Anatomicky správný obrázek, který
vypadá jako jiná modelka nebo jiné focení, je také FAIL.

## 3. Jedna fotografická série

Exercise SOURCE musí působit jako pokračování jednoho profesionálního focení:
stejná konkrétní modelka, identita, vlasy, postava, outfit, studio, podložka,
kamera, světlo a barevnost. Mění se pouze póza a výslovně potřebné vybavení.

Přesná pravidla se vždy čtou z `MASTER_REFERENCE.md`; tento odstavec je princip,
nikoli druhá specifikace.

## 4. Kritické QA

- QA probíhá automaticky po každém novém nebo upraveném obrázku.
- ChatGPT má aktivně hledat chyby, nikoli automaticky souhlasit.
- PASS vyžaduje současně anatomii, identitu, prostředí, kameru, scale, technickou
  kvalitu a konzistenci s paired SOURCE.
- Projektová hranice schválení je nejméně 9,5/10, ale skóre nenahrazuje věcný
  průchod všech kritických bodů.
- FAIL se nesmí uložit nebo nasadit jako approved.

Kompletní checklist a opravný cyklus jsou v `IMAGE_WORKFLOW.md`.

## 5. Konzistence před kreativitou

Pokud existuje schválený design, SOURCE, EXERCISE_REFERENCE nebo šablona,
nevytvářej novou variantu od nuly. Vycházej z ní a měň jen požadovanou část.
Přirozená drobná odchylka není důvod k plošné regeneraci celé knihovny.

## 6. Design aplikace

Glute Bridge je referenční DESIGN STANDARD detailu. Další cviky přidávají obsah,
nikoli svévolný layout. Změna assetu sama o sobě neopravňuje redesign, změnu
workoutu, programu, dávek nebo navigace.

## 7. Spolupráce

ChatGPT zajišťuje analýzu, vizuální QA a rozhodnutí. Codex zajišťuje repo audit,
bezpečné souborové operace, technické QA, mapping a dokumentaci. Související
práce se sdružuje do ohraničených balíků, ale scope se nerozšiřuje bez zadání.

Commit a push se provádějí pouze po výslovném pokynu uživatele.

## 8. Active versus historical

Aktuální stav se zjišťuje z runtime a `EXERCISE_PROGRESS.md`. Historický log,
archiv nebo starý Guide/Step může vysvětlovat minulost, ale nesmí přepsat
současný MASTER. Aktivní program má 51 canonical IDs; `swan` je inactive a
`dumbbell_pullover` active.
