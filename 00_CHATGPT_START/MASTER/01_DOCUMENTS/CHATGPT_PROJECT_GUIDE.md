# MOOVKA — PROJECT GUIDE

Status: **ACTIVE PROJECT CONTEXT**
Aktualizováno: 2026-09-12

Tento dokument vysvětluje projekt a způsob spolupráce. Není paralelní autoritou
pro image workflow. Vizuální konstanty určuje `MASTER_REFERENCE.md`, proces
`IMAGE_WORKFLOW.md` a aktuální asset stav `EXERCISE_PROGRESS.md`.

## Projekt

Moovka je mobilní aplikace pro srozumitelné domácí cvičení s důrazem na bezpečnou
techniku, konzistentní vizuály a dlouhodobě použitelný 30denní program.

Priority:

1. správná technika a bezpečnost;
2. konzistence;
3. stabilita aplikace;
4. kvalita;
5. rychlost práce.

## Aktuální stav

- Aktivní program obsahuje přesně **51 canonical exercise IDs** z `data.js`.
- `swan` je historický/inaktivní a do aktivního součtu nepatří.
- `dumbbell_pullover` je aktivní.
- Detailní stav SOURCE, Guide, Step, Muscle Card a mappingu je pouze v
  `EXERCISE_PROGRESS.md`.
- Stručný rozcestník je v
  `Pilates Assets/00_Project_Status/EXERCISE_STATUS.md`.
- Aktuální runtime/Codex kontext je v `00_CODEX/00_CODEX_STATE.md`; vše pod
  nadpisem **Historický log** může popisovat překonané stavy.
- Globální SOURCE contact sheets jsou v `Pilates Assets/03_Exports/Visual_QA/`.

Staré priority typu „Toe Tap čeká na HERO“, počty 50/52 aktivních cviků nebo
`swan` jako aktivní jsou historické a nesmí řídit další práci.

## Design aplikace

- Glute Bridge zůstává DESIGN STANDARD detailu.
- Všechny cviky používají společný renderer; nevytvářej individuální layout bez
  výslovného zadání.
- Při asset práci se nemění layout, workout logika, dávky ani program, pokud to
  úkol výslovně nevyžaduje.
- Autorita detailu: `DESIGN_STANDARD.md`.

## Exercise image práce

- Aktivní SOURCE jsou unversioned.
- Nejdřív SOURCE, potom Guide Card a Step by Step.
- Guide/Step struktura je nezávislá na runtime sekvenci.
- Po každém vytvořeném nebo upraveném obrázku probíhá automatické QA.
- Muscle Cards mají oddělený anatomy workflow.

Veškeré podrobnosti jsou pouze v `IMAGE_WORKFLOW.md`; zde se neduplikují.

## Role ChatGPT

ChatGPT zajišťuje zejména:

- analýzu a plánování;
- vizuální a anatomické QA;
- vyhodnocení PASS/FAIL;
- ochranu schválených MASTER pravidel;
- přípravu přesně ohraničeného zadání.

Nemá automaticky schvalovat průměrný nebo anatomicky chybný výsledek.

## Role Codexu

Codex zajišťuje zejména:

- audit repozitáře a skutečného runtime stavu;
- bezpečné souborové operace;
- technické QA, mapping a dokumentaci;
- Guide/Step exporty podle existující schválené šablony;
- cílené implementační balíky bez unrelated refactoru.

Codex nevymýšlí anatomii, neoznačuje nedoložený asset jako approved a neprovádí
commit ani push bez výslovného pokynu.

## Pracovní principy

- Jeden úkol = jedna logická změna nebo výslovně definovaný balík.
- Nejdřív ověř skutečný stav, potom jednej.
- Existující approved podklad se při malé opravě mění chirurgicky.
- Historické soubory se nemažou bez pokynu; při konsolidaci se archivují.
- Git konflikt se neřeší svévolně.
- Po změně se reportuje rozsah, QA, commit a push stav.
- Související drobné úlohy lze seskupit, aby se neplýtvalo Codex/Work běhy.

## Kde pokračovat

1. Načti `EXERCISE_PROGRESS.md`.
2. Ověř aktuální `data.js`, `app.js` a fyzické soubory dotčeného cviku.
3. Použij `IMAGE_WORKFLOW.md`.
4. Pokud jde o anatomy, načti `MASTER_ANATOMY.md` a
   `MUSCLE_CARD_PROFILE_AUDIT.md`.
5. Neodvozuj současný stav ze starého changelogu nebo historie chatu.
