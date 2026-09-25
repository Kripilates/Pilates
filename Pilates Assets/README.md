# Pilates Assets — pracovní rozcestník

Aktuální vstupní bod celého image workflow je
`00_CHATGPT_START/00_READ_FIRST.md`. Autoritou jsou dokumenty v
`00_CHATGPT_START/MASTER/`; pravidla v této složce jsou pouze pomocné šablony a
nesmí jim odporovat.

## Struktura

- `00_Project_Standards/` — kompatibilní šablony odkazující na MASTER pravidla.
- `00_Project_Status/` — stručný stav, changelog, roadmap a architektonická rozhodnutí.
- `02_Exercise_Cards/` — pracovní a schválené exercise SOURCE, Guide, Step a shared Muscle Cards.
- `03_Exports/` — reporty a QA exporty; `Visual_QA/` není runtime zdroj.
- `04_Home/` — schválené runtime obrazové assety určené pouze pro Home.
- `05_Archive/` — historické materiály; nejsou autoritou proti MASTERU.

Kanonická detailní inventura 51 aktivních cviků je v
`00_CHATGPT_START/MASTER/01_DOCUMENTS/EXERCISE_PROGRESS.md`.

## Základní pravidla

- Aktivní exercise SOURCE jsou unversioned; přesný formát určuje `IMAGE_WORKFLOW.md`.
- Před vytvořením obrázku se ověří reuse, fyzické soubory, mapping a case.
- END = START ani HERO = START nevytváří nový fyzický obrázek.
- Neschválený candidate se nenasazuje.
- Guide/Step vznikají až ze schválených SOURCE a při výměně SOURCE nemění strukturu.
- Muscle Cards se mapují jen podle přesného profilu z autoritativního anatomy auditu.
- Historické auditní exporty jsou důkaz tehdejšího stavu, nikoli aktuální instrukce.

## Home body-focus final assets

Status: **APPROVED / FINAL**

- Břicho + pas → `04_Home/Body_Focus/abdomen_waist.png`
- Hýždě → `04_Home/Body_Focus/glutes.png`
- Nohy → `04_Home/Body_Focus/legs.png`
- Horní část + paže → `04_Home/Body_Focus/upper_body_arms.png`

Tyto soubory jsou samostatné part-first kompozice pro sekci Home „Vyber si trénink“ a nejsou exercise SOURCE.
