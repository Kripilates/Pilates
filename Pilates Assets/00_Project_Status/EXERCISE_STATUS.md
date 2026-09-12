# Exercise Status

Aktualizováno: 2026-09-12

## Aktuální stav aktivního programu

- Aktivní unikátní ID: **51**
- 🟢 HOTOVO – NOVÉ PROSTŘEDÍ: **49**
- 🟡 ROZPRACOVÁNO / MAPPING K OVĚŘENÍ: **1** (`sideplank_reach`)
- 🟠 K OPRAVĚ – STARÉ PROSTŘEDÍ: **1** (`swimming`)
- 🔴 CHYBÍ / NOVÝ CVIK: **0**
- Muscle Card k doladění: **9**
- Guide/Step k aktualizaci: **2 cviky / 4 karty**
- Kontrola: **49 + 1 + 1 + 0 = 51**
- `swan`: mimo aktivní program; nezapočítán.
- `dumbbell_pullover`: aktivní; SOURCE/runtime/Guide/Step jsou hotové, Muscle Card je OPEN.
- Schválená Muscle Card `glutes_primary_hamstrings_core_secondary_muscles_v01.png` přesně odpovídá profilům `hip`, `donkey` a `glute_bridge_march` (PRIMARY A11; SECONDARY A14 + A01). `frog` ji v runtime nyní používá chybně; jeho autoritativní profil je A11 + A01 a oprava patří do samostatného implementačního úkolu.
- Schválená `quadriceps_primary_hamstrings_secondary_muscles_v01.png` je evidována bez runtime přiřazení: žádný z aktuálních 51 schválených profilů nemá přesně PRIMARY A13 + SECONDARY A14.

Úplná inventura po ID, aktivních SOURCE, Guide, Step a Muscle Card je jedině v [EXERCISE_PROGRESS.md](../../00_CHATGPT_START/MASTER/01_DOCUMENTS/EXERCISE_PROGRESS.md). Tento dokument je záměrně jen rychlý stavový rozcestník, aby nevznikaly dvě rozdílné tabulky.

## Aktuální fronta

- SOURCE do nového prostředí: `swimming` (Swimming).
- Rozpracováno: `sideplank_reach` (Boční prkno s rotací) — unversioned
  START/HERO/END fyzicky existují, ale final approval a Guide/Step obsah je nutné
  potvrdit. Runtime stále odkazuje na staré neexistující `*_v01.png`; jde o
  mapping bug k samostatné opravě, nikoli důvod generovat nový SOURCE.
- Celý nový bundle: žádný chybějící SOURCE bundle.
- Dokončeno: `chest_opener` používá bezverzové SOURCE v novém prostředí; runtime, Guide a Step jsou opravené.
- Muscle Card k doladění: `chest_opener` (Chest Opener), `clam` (Clamshell), `dumbbell_pullover` (Dumbbell Pullover), `frog` (Frog Pumps), `hamstring_supine` (Jemné protažení zadní strany stehna), `sidekick` (Side Kick), `sideleg` (Unožování vleže na boku), `russian` (Rotace trupu v sedu), `thread` (Protažení s rotací v kleku).
- Guide/Step k aktualizaci po SOURCE: `sideplank_reach`, `swimming`.

Předchozí tabulka s technickým stavem COMPLETE byla nahrazena, protože nerozlišovala nové a staré MASTER prostředí a obsahovala zastaralé názvy souborů.
