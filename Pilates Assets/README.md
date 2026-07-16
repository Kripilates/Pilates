> MASTER_SYSTEM_V2_ACTIVE
>
> Pro obrázky a asset QA platí `00_CHATGPT_START/MASTER_PACK_V2/MASTER_REFERENCE.md`.
> Platná environment reference je `Pilates Assets/01_Master_Reference/ENVIRONMENT_MASTER.png`. Starší formulace o `MODEL_MASTER.png` zůstávají historické, pokud odporují MASTER_PACK_V2.

# Pilates Assets

Sem ukladej vsechny nove podklady projektu. Stare obrazky v `assets/exercises` se zatim nemeni.

## 00_Project_Standards
Design Bible, pravidla a checklisty.

## 01_Master_Reference
`MODEL_MASTER.png` nebo aktualni master reference: jedina schvalena modelka a prostredi.

## 02_Exercise_Cards
Kazdy cvik ma vlastni slozku.

README.md kazdeho cviku slouzi jako kontrolni seznam stavu cviku.

Guide Card se navrhuje primarne pro telefon podle pravidel v `00_Project_Standards/GUIDE_CARD_STANDARD.md`.

## 03_Final_Exports
Hotove obrazky pro aplikaci az po schvaleni cele nove knihovny.

## 04_Codex
Prompty, ukoly a technicke poznamky.

## 05_Archive
Starsi verze.

## _INBOX
Docasne uloziste schvalenych obrazku z ChatGPT.

Workflow pro `SCHVÁLENO – <cvik> <typ>`:
- vezmi jediny soubor z `_INBOX`
- prejmenuj jej podle standardu projektu
- presun jej do spravne slozky cviku
- aktualizuj `README.md` daneho cviku
- aktualizuj manifest, pokud existuje
- vyprazdni `_INBOX`
- zastav praci

Workflow pro `SCHVÁLENO – CVIK`:
- zkontroluj slozku cviku
- pokud obsahuje vsechny povinne soubory, zmen v `README.md` status na `Status: 🟢 Complete`
- pokud neco chybi, vypis chybejici polozky, nic nemen a zastav praci

Pravidla:
- nikdy nemazat nic z `assets/exercises`
- nikdy neupravovat aplikaci
- pracovat pouze uvnitr `Pilates Assets`
- pokud je v `_INBOX` vice souboru nebo neni jasne, ktery pouzit, zastavit a zeptat se
- pokud existuje soubor se stejnym nazvem, neprepisovat bez upozorneni
