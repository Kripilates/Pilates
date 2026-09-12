# Moovka — Codex Workflow

Aktualizováno: 2026-09-12

## Zakladni pravidla

- Nikdy necommituj bez vyslovneho pokynu.
- Nikdy nepredelavej schvaleny design z vlastni iniciativy.
- Referencni detail Glute Bridge je DESIGN STANDARD v1.0.
- Pri upravach dalsich cviku se meni pouze obsah, ne layout.
- Pokud si nejsi jisty, zachovej soucasne reseni a zeptej se.
- Neprovadej hromadne zmeny bez schvaleni.
- Nezasahuj do `assets/exercises`, pokud k tomu neni vyslovny pokyn.
- Nemen obrazky, pokud ukol neni primo o obrazcich.
- Nemen `data.js`, pokud ukol neni primo o datech.
- Před image úkolem načti `MASTER_REFERENCE.md`, `IMAGE_WORKFLOW.md`,
  `MASTER_IMAGE_CHECKLIST.md` a `EXERCISE_PROGRESS.md`.
- Než označíš SOURCE jako chybějící, ověř unversioned soubory, runtime mapping,
  přesný case, cestu a reuse.

## Postup prace

1. Ověř skutečný stav repozitáře a přesný scope.
2. U vizuálů proveď reuse/mapping audit před generováním.
3. Implementuj jeden referenční případ nebo výslovně zadaný ohraničený balík.
4. Proveď technické QA a požadované vizuální QA.
5. Commituj pouze po výslovném pokynu.

Související drobné změny lze seskupit do jednoho jasného balíku, aby se
neplýtvalo Codex/Work běhy. To nesmí rozšířit uživatelem určený scope.

## Povinne overeni po kazde zmene

Po kazde uprave napis:

- zmenene soubory,
- co presne bylo zmeneno,
- co zustalo beze zmeny,
- co bylo overeno,
- jestli byl commit proveden nebo ne.

## Zakazane chovani

- Nevytvaret nove sablony, pokud existuje schvalena.
- Nepridavat nove efekty bez zadani.
- Neprepisovat schvalene styly.
- Nemazat soubory bez vyslovneho pokynu.
- Nepresouvat slozky bez vyslovneho pokynu.
- Neresit konflikty Gitu automaticky.
- Pri konfliktu Gitu zastavit a vypsat stav.
- Nevymýšlet anatomii Muscle Card; použít pouze schválený přesný profil z
  `MASTER_ANATOMY.md` a `MUSCLE_CARD_PROFILE_AUDIT.md`.

## Git pravidla

- Pred praci na jinem PC musi byt proveden Fetch/Pull.
- Pred commitem musi byt aplikace vizualne zkontrolovana.
- Pri praci na dvou PC nikdy neupravovat stejne soubory soucasne.
- Pri merge konfliktu neprovadet automaticke reseni.
