# CODEX STATE

## Projekt

- Projekt: Pilates Body 40+
- Repozitář: Pilates
- Branch: main
- Git root: `C:\Users\Tomáš Machánek\Documents\GitHub\Pilates`
- `origin/main` je zdroj pravdy pro synchronizaci mezi počítači.

## Poslední dokončený commit

- Hash: `c588f7f`
- Message: `e`
- Stav vůči `origin/main`: lokální `main` je shodný s `origin/main`.
- Push posledního commitu už je na `origin/main`.

## Aktuálně rozpracováno

Aktuální rozpracované změny bez commitu:

- Figure Four Stretch používá schválenou sestavu START v01 → MID v02 → HERO v02 → START v01; Guide Card a Step by Step v02 jsou manuálně schválené a cvik je nasazený v aplikaci pod ID `figure_four`.
- Forearm Plank používá jeden schválený statický source pro START, HERO i END; Guide Card a Step by Step v01 jsou manuálně schválené a cvik je nasazený v aplikaci pod ID `plank`.
- Frog Pumps používá schválenou sekvenci START v01 → HERO v01 → START v01; Guide Card a Step by Step v01 jsou manuálně schválené a cvik je nasazený v aplikaci pod ID `frog`.
- Dynamická sekce Krok za krokem globálně zobrazuje source fotografie v přirozeném poměru stran bez pevné výšky a ořezu `cover`; hlavní HERO, miniatury a PNG karty zůstávají beze změny.
- Progress souhrn: 50 celkem, 23 HOTOVO, 0 ROZPRACOVÁNO, 27 ČEKÁ.
- Aplikace je nyní `v59.49-dev`; cache `app.js` a `style.css` v `index.html` je `v=5949stepnatural`, cache `data.js` zůstává `v=5947frogpumps`.
- Aktivní workout používá Screen Wake Lock s bezpečným fallbackem a zesílené dvoutónové Web Audio signály přes jeden sdílený AudioContext a master GainNode.

## Další krok

Pokračovat podle:

- `00_CHATGPT_START/MASTER/01_DOCUMENTS/EXERCISE_PROGRESS.md`
- sekce `NEXT TASKS`

Aktuálně první položka v `NEXT TASKS`:

1. `Hamstring Stretch START`

Pokud uživatel neurčí jinak, další práce má začít touto položkou.

## Relevantní soubory

- `00_CHATGPT_START/00_READ_FIRST.md`
- `00_CHATGPT_START/MASTER/01_DOCUMENTS/EXERCISE_PROGRESS.md`
- `Pilates Assets/02_Exercise_Cards/Figure Four Stretch/STATUS.md`
- `Pilates Assets/02_Exercise_Cards/Figure Four Stretch/figure_four_stretch_start_v01.png`
- `Pilates Assets/02_Exercise_Cards/Figure Four Stretch/figure_four_stretch_mid_v02.png`
- `Pilates Assets/02_Exercise_Cards/Figure Four Stretch/figure_four_stretch_hero_v02.png`
- `Pilates Assets/02_Exercise_Cards/Figure Four Stretch/build_figure_four_stretch_cards.py`
- `Pilates Assets/02_Exercise_Cards/Figure Four Stretch/figure_four_stretch_guide_card_v02.png`
- `Pilates Assets/02_Exercise_Cards/Figure Four Stretch/figure_four_stretch_step_by_step_v02.png`
- `Pilates Assets/02_Exercise_Cards/Forearm Plank/STATUS.md`
- `Pilates Assets/02_Exercise_Cards/Forearm Plank/forearm_plank_start_v01.png`
- `Pilates Assets/02_Exercise_Cards/Forearm Plank/build_forearm_plank_cards.py`
- `Pilates Assets/02_Exercise_Cards/Forearm Plank/forearm_plank_guide_card_v01.png`
- `Pilates Assets/02_Exercise_Cards/Forearm Plank/forearm_plank_step_by_step_v01.png`
- `Pilates Assets/02_Exercise_Cards/Frog Pumps/STATUS.md`
- `Pilates Assets/02_Exercise_Cards/Frog Pumps/frog_pumps_start_v01.png`
- `Pilates Assets/02_Exercise_Cards/Frog Pumps/frog_pumps_hero_v01.png`
- `Pilates Assets/02_Exercise_Cards/Frog Pumps/build_frog_pumps_cards.py`
- `Pilates Assets/02_Exercise_Cards/Frog Pumps/frog_pumps_guide_card_v01.png`
- `Pilates Assets/02_Exercise_Cards/Frog Pumps/frog_pumps_step_by_step_v01.png`
- `Pilates Assets/02_Exercise_Cards/Cat-Cow/STATUS.md`
- `Pilates Assets/02_Exercise_Cards/Cat-Cow/cat_cow_start_v01.png`
- `Pilates Assets/02_Exercise_Cards/Cat-Cow/cat_cow_hero_v01.png`
- `Pilates Assets/02_Exercise_Cards/Cat-Cow/cat_cow_end_v01.png`
- `Pilates Assets/02_Exercise_Cards/Cat-Cow/build_cat_cow_cards.py`
- `Pilates Assets/02_Exercise_Cards/Cat-Cow/cat_cow_guide_card_v01.png`
- `Pilates Assets/02_Exercise_Cards/Cat-Cow/cat_cow_step_by_step_v01.png`
- `Pilates Assets/02_Exercise_Cards/Child's Pose/STATUS.md`
- `Pilates Assets/02_Exercise_Cards/Child's Pose/childs_pose_start_v01.png`
- `Pilates Assets/02_Exercise_Cards/Child's Pose/childs_pose_hero_v01.png`
- `Pilates Assets/02_Exercise_Cards/Bicycle Crunch/STATUS.md`
- `Pilates Assets/02_Exercise_Cards/Bicycle Crunch/bicycle_crunch_start_v01.png`
- `Pilates Assets/02_Exercise_Cards/Bicycle Crunch/bicycle_crunch_hero_v01.png`
- `Pilates Assets/02_Exercise_Cards/Bicycle Crunch/bicycle_crunch_end_v01.png`
- `Pilates Assets/02_Exercise_Cards/Bicycle Crunch/bicycle_crunch_guide_card_v01.png`
- `Pilates Assets/02_Exercise_Cards/Bicycle Crunch/bicycle_crunch_step_by_step_v01.png`
- `Pilates Assets/02_Exercise_Cards/Bicycle Crunch/build_bicycle_crunch_cards.py`
- `Pilates Assets/02_Exercise_Cards/Bridge Abduction/STATUS.md`
- `Pilates Assets/02_Exercise_Cards/Bridge Abduction/bridge_abduction_start_v01.png`
- `Pilates Assets/02_Exercise_Cards/Bridge Abduction/bridge_abduction_hero_v01.png`
- `Pilates Assets/02_Exercise_Cards/Bridge Abduction/build_bridge_abduction_cards.py`
- `Pilates Assets/02_Exercise_Cards/Bridge Abduction/bridge_abduction_guide_card_v01.png`
- `Pilates Assets/02_Exercise_Cards/Bridge Abduction/bridge_abduction_step_by_step_v01.png`
- `Pilates Assets/02_Exercise_Cards/Chest Opener/STATUS.md`
- `Pilates Assets/02_Exercise_Cards/Chest Opener/chest_opener_start_v01.png`
- `Pilates Assets/02_Exercise_Cards/Chest Opener/chest_opener_hero_v04.png`
- `Pilates Assets/02_Exercise_Cards/Chest Opener/chest_opener_guide_card_v04.png`
- `Pilates Assets/02_Exercise_Cards/Chest Opener/chest_opener_step_by_step_v04.png`

## Trvalá pravidla pro Codex

- Nikdy nedělej commit ani push bez výslovného pokynu uživatele.
- Před commitem vždy proveď `git diff --check`.
- Pokud se mění JavaScript, proveď syntax kontrolu příslušného JS souboru.
- Nesahej do `assets/exercises`, pokud to úkol výslovně nepožaduje.
- Nesahej do aplikace, dat, obrázků ani workflow mimo přesný rozsah zadání.
- Po schválení nebo dokončení cviku aktualizuj:
  - `STATUS.md` daného cviku,
  - `00_CHATGPT_START/MASTER/01_DOCUMENTS/EXERCISE_PROGRESS.md`,
  - `NEXT TASKS`, pokud se změnilo pořadí práce.
- Po každém Codex úkolu aktualizuj tento soubor, pokud se změnil stav projektu, další krok nebo důležitý kontext pro předání mezi PC.

## Stav synchronizace

- Poslední ověřený stav vůči origin/main před tímto úkolem: `HEAD...origin/main = 0 0`.
- Lokální `main` je shodný s `origin/main`.
- Před tímto úkolem byl pracovní strom čistý; dříve předané změny jsou součástí commitu `c588f7f`.
- Pracovní strom nyní obsahuje necommitnuté source, build, exportní, aplikační a dokumentační změny Frog Pumps.

## Commit / Push

- Commit pro aktuální Frog Pumps změny: NE
- Push proveden: NE
