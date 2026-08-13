# CODEX STATE

## Projekt

- Projekt: Pilates Body 40+
- Repozitář: Pilates
- Branch: main
- Git root: `C:\Users\Kristy\Documents\GitHub\Pilates`
- `origin/main` je zdroj pravdy pro synchronizaci mezi počítači.

## Poslední dokončený commit

- Hash: `c588f7f`
- Message: `e`
- Stav vůči `origin/main`: lokální `main` je shodný s `origin/main`.
- Push posledního commitu už je na `origin/main`.

## Aktuálně rozpracováno

Aktuální rozpracované změny bez commitu:

- Side Plank Reach používá schválenou sekvenci START v01 → HERO v01 → END v01; Guide Card a Step by Step v01 jsou vytvořené, ověřené a cvik je nasazený v aplikaci pod kanonickým ID `sideplank_reach` bez změny programových dávek.

- Three-level program difficulty is implemented in `v59.74-dev` from the manually approved `00_CODEX/30_DAY_3_LEVEL_FINAL_SPEC.md`: `easy` uses 2 series, `medium` 3, and `hard` 3. The preference is stored in `pb40-program-difficulty-v1`; legacy progress migrates to `medium`, new users receive a first-entry chooser, and Plan/day detail expose the selector.
- Active workouts use an immutable in-memory difficulty snapshot, so same-session detail/resume and a global change from another tab do not alter the running workout. Completed-day difficulty metadata and true cross-reload workout resume remain Phase 2.
- The five approved order changes are protected by `pb40-program-layout-v2`, which remaps existing per-index progress by exercise ID. Program data validation covers 26 active days, 78 day-level combinations, all 9 HIGH corrections, and all existing dose formats.
- Difficulty QA passed at 360/390/430 px and desktop without horizontal overflow; Easy/Medium/Hard doses, 2/3/3 series, Android Back, progress preservation, same-session resume, and multi-tab behavior were checked.

- Mermaid Stretch používá schválenou sekvenci START v01 → HERO v01 → START v01; Guide Card a Step by Step v01 jsou vytvořené, ověřené a cvik je nasazený v aplikaci pod kanonickým ID `mermaid`.

- Plank Shoulder Taps používá schválenou sekvenci START v02 → HERO v01 → START v02; Guide Card a Step by Step v01 jsou vytvořené, ověřené a cvik je nasazený v aplikaci pod kanonickým ID `tap` jako `20× střídavě`.

- Plie Squat používá schválenou sekvenci START v01 → HERO v01 → START v01; Guide Card a Step by Step v01 jsou vytvořené, ověřené a cvik je nasazený v aplikaci pod kanonickým ID `plie` bez změny programu nebo dávkování.

- Roll Up používá schválenou sekvenci START v01 → HERO v01 → END v01; Guide Card a Step by Step v01 jsou vytvořené, ověřené a cvik je nasazený v aplikaci pod kanonickým ID `rollup` bez změny programu nebo dávkování.

- Russian Twist používá manuálně schválenou sekvenci START v01 → HERO v01 → START v01; Guide Card a Step by Step v01 jsou schválené a cvik je nasazený v aplikaci pod kanonickým ID `russian`.

- Scissors používá schválené START v01 a HERO v01; END používá START, zatímco třetí instruktážní krok Guide Card, Step by Step a dynamického detailu používá stejný nezrcadlený HERO pro vysvětlení pokračujícího střídání nohou. Cvik je nasazený pod kanonickým ID `scissors`.

- Leg Raises používá schválenou sekvenci START v02 → HERO v01 → START v02; Guide Card a Step by Step v01 jsou manuálně schválené a cvik je nasazený v aplikaci pod kanonickým ID `legraises`.

- Lateral Raise používá schválenou sekvenci START v01 → HERO v01 → START v01; Guide Card a Step by Step v01 jsou manuálně schválené a cvik je nasazený v aplikaci pod kanonickým ID `raise`.


- Shoulder Press používá schválenou sekvenci START v01 → HERO v01 → START v01; Guide Card a Step by Step v01 jsou vytvořené a ověřené a cvik je nasazený v aplikaci pod kanonickým ID `press` s pomůckou „Činky“.

- Side Kick používá schválenou sekvenci START v01 → HERO v01 → END v01; Guide Card a Step by Step v01 jsou manuálně schválené a cvik je nasazený v aplikaci pod kanonickým ID sidekick bez pomůcky.

- Side Plank používá schválenou sekvenci START v01 → HERO v01 → START v01; END používá START bez samostatného PNG. Guide Card a Step by Step v01 jsou vytvořené, ověřené a cvik je nasazený v aplikaci pod kanonickým ID `sideplank` bez změny programových dávek.

- Inner Thigh Lift používá schválenou sekvenci START v01 → HERO v01 → START v01; Guide Card a Step by Step v01 jsou manuálně schválené a cvik je nasazený v aplikaci pod ID `inner_thigh`. Textový audit proběhne později hromadně.
- Hollow Hold používá schválenou sekvenci START v01 → HERO v02 → START v01; Guide Card a Step by Step v01 jsou manuálně schválené a cvik je nasazený v aplikaci pod ID `hollow`.
- Heel Taps používá schválenou sekvenci START v01 → HERO v01 → START v01; Guide Card a Step by Step v01 jsou manuálně schválené a cvik je nasazený v aplikaci pod ID `heeltaps` jako střídavý stejnostranný dosah ruky k patě.

- Figure Four Stretch používá schválenou sestavu START v01 → MID v02 → HERO v02 → START v01; Guide Card a Step by Step v02 jsou manuálně schválené a cvik je nasazený v aplikaci pod ID `figure_four`.
- Forearm Plank používá jeden schválený statický source pro START, HERO i END; Guide Card a Step by Step v01 jsou manuálně schválené a cvik je nasazený v aplikaci pod ID `plank`.
- Frog Pumps používá schválenou sekvenci START v01 → HERO v01 → START v01; Guide Card a Step by Step v01 jsou manuálně schválené a cvik je nasazený v aplikaci pod ID `frog`.
- Hamstring Stretch používá schválenou sekvenci START v01 → HERO v01 → START v01; Guide Card a Step by Step v01 jsou manuálně schválené a cvik je nasazený v aplikaci pod ID `hamstring_supine`.
- Dynamická sekce Krok za krokem globálně zobrazuje source fotografie v přirozeném poměru stran bez pevné výšky a ořezu `cover`; hlavní HERO, miniatury a PNG karty zůstávají beze změny.
- Sphinx Stretch používá jeden schválený statický source START v01 pro START, HERO i END; Guide Card a Step by Step v01 jsou manuálně schválené a cvik je nasazený v aplikaci pod ID `sphinx` bez změny programových dávek.
- Spine Stretch používá schválenou sekvenci START v01 → HERO v01 → START v01; Guide Card a Step by Step v01 jsou manuálně schválené a cvik je nasazený v aplikaci pod ID `spine` bez změny programové dávky.
- Progress souhrn: 50 celkem, 41 HOTOVO, 0 ROZPRACOVÁNO, 9 ČEKÁ.
- Aplikace je nyní `v59.77-dev`; cache `app.js` a `data.js` je `v=5977spine` a cache `style.css` zůstává `v=5974difficulty`.
- Aktivní workout zobrazuje dávku dominantně a domovská obrazovka vybírá text první, druhé nebo třetí fáze podle dne programu (dny 1-10, 11-20 a 21-30).
- Aktivní workout má kompaktní horní navigaci bez tlačítka Ukončit a bez textu Připrav se; Ukončit je součástí spodního ovládacího panelu, pravý badge hlavičky zobrazuje aktuální `Cvik X z Y` a uvolněný prostor využívá větší fotografie cviku.
- Workout typografie zvýrazňuje název vůči dávce; spodní ovládání rozlišuje primární Pauzu, sekundární Přeskočit a tlumeně destruktivní Ukončit, zatímco Detail cviku má kompaktní informační ikonu.
- Systémové Android Back i spodní tlačítko Ukončit používají stejný potvrzovací dialog; pokračování i pozdější návrat zachovávají aktuální cvik, sérii, fázi a zbývající čas.
- Workout history guard ve v59.58 používá jednoznačný marker konkrétního workoutu; po každém Pokračovat se jeho přítomnost obnoví bez vrstvení history záznamů a skutečné ukončení marker odstraní.
- Interní navigace ve v59.72 používá koordinované `history.state` markery pro Home, Plán, den, detail cviku, Kalendář, Program, knihovnu, oblíbené, měření a statistiky. Systémový Back vrací skutečný původ detailu, workout guard má prioritu a první Back na kořenovém Home zobrazí potvrzení ukončení aplikace.
- Aktivní workout má finálně vyváženou hierarchii názvu a dávky; Ukončit je jemně odlišené červeným tónem a Detail cviku funguje jako zřetelné tyrkysové sekundární tlačítko bez podtržení.
- Aktivní workout používá Screen Wake Lock s bezpečným fallbackem a zesílené dvoutónové Web Audio signály přes jeden sdílený AudioContext a master GainNode.

## Další krok

Pokračovat podle:

- `00_CHATGPT_START/MASTER/01_DOCUMENTS/EXERCISE_PROGRESS.md`
- sekce `NEXT TASKS`

Aktuálně první položka v `NEXT TASKS`:

1. `Standing Oblique Crunch START`

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

- `Pilates Assets/02_Exercise_Cards/Heel Taps/STATUS.md`
- `Pilates Assets/02_Exercise_Cards/Heel Taps/heel_taps_start_v01.png`
- `Pilates Assets/02_Exercise_Cards/Heel Taps/heel_taps_hero_v01.png`
- `Pilates Assets/02_Exercise_Cards/Heel Taps/build_heel_taps_cards.py`
- `Pilates Assets/02_Exercise_Cards/Heel Taps/heel_taps_guide_card_v01.png`
- `Pilates Assets/02_Exercise_Cards/Heel Taps/heel_taps_step_by_step_v01.png`
- `Pilates Assets/02_Exercise_Cards/Hollow Hold/STATUS.md`
- `Pilates Assets/02_Exercise_Cards/Hollow Hold/hollow_hold_start_v01.png`
- `Pilates Assets/02_Exercise_Cards/Hollow Hold/hollow_hold_hero_v02.png`
- `Pilates Assets/02_Exercise_Cards/Hollow Hold/build_hollow_hold_cards.py`
- `Pilates Assets/02_Exercise_Cards/Hollow Hold/hollow_hold_guide_card_v01.png`
- `Pilates Assets/02_Exercise_Cards/Hollow Hold/hollow_hold_step_by_step_v01.png`
- `Pilates Assets/02_Exercise_Cards/Inner Thigh Lift/STATUS.md`
- `Pilates Assets/02_Exercise_Cards/Inner Thigh Lift/inner_thigh_lift_start_v01.png`
- `Pilates Assets/02_Exercise_Cards/Inner Thigh Lift/inner_thigh_lift_hero_v01.png`
- `Pilates Assets/02_Exercise_Cards/Inner Thigh Lift/build_inner_thigh_lift_cards.py`
- `Pilates Assets/02_Exercise_Cards/Inner Thigh Lift/inner_thigh_lift_guide_card_v01.png`
- `Pilates Assets/02_Exercise_Cards/Inner Thigh Lift/inner_thigh_lift_step_by_step_v01.png`
- `Pilates Assets/02_Exercise_Cards/Shoulder Press/STATUS.md`
- `Pilates Assets/02_Exercise_Cards/Shoulder Press/shoulder_press_start_v01.png`
- `Pilates Assets/02_Exercise_Cards/Shoulder Press/shoulder_press_hero_v01.png`
- `Pilates Assets/02_Exercise_Cards/Shoulder Press/build_shoulder_press_cards.py`
- `Pilates Assets/02_Exercise_Cards/Shoulder Press/shoulder_press_guide_card_v01.png`
- `Pilates Assets/02_Exercise_Cards/Shoulder Press/shoulder_press_step_by_step_v01.png`
- `Pilates Assets/02_Exercise_Cards/Lateral Raise/STATUS.md`
- `Pilates Assets/02_Exercise_Cards/Lateral Raise/lateral_raise_start_v01.png`
- `Pilates Assets/02_Exercise_Cards/Lateral Raise/lateral_raise_hero_v01.png`
- `Pilates Assets/02_Exercise_Cards/Lateral Raise/build_lateral_raise_cards.py`
- `Pilates Assets/02_Exercise_Cards/Lateral Raise/lateral_raise_guide_card_v01.png`
- `Pilates Assets/02_Exercise_Cards/Lateral Raise/lateral_raise_step_by_step_v01.png`
- `Pilates Assets/02_Exercise_Cards/Leg Raises/STATUS.md`
- `Pilates Assets/02_Exercise_Cards/Leg Raises/leg_raises_start_v02.png`
- `Pilates Assets/02_Exercise_Cards/Leg Raises/leg_raises_hero_v01.png`
- `Pilates Assets/02_Exercise_Cards/Leg Raises/build_leg_raises_cards.py`
- `Pilates Assets/02_Exercise_Cards/Leg Raises/leg_raises_guide_card_v01.png`
- `Pilates Assets/02_Exercise_Cards/Leg Raises/leg_raises_step_by_step_v01.png`
- `Pilates Assets/02_Exercise_Cards/Mermaid Stretch/STATUS.md`
- `Pilates Assets/02_Exercise_Cards/Mermaid Stretch/mermaid_stretch_start_v01.png`
- `Pilates Assets/02_Exercise_Cards/Mermaid Stretch/mermaid_stretch_hero_v01.png`
- `Pilates Assets/02_Exercise_Cards/Mermaid Stretch/build_mermaid_stretch_cards.py`
- `Pilates Assets/02_Exercise_Cards/Mermaid Stretch/mermaid_stretch_guide_card_v01.png`
- `Pilates Assets/02_Exercise_Cards/Mermaid Stretch/mermaid_stretch_step_by_step_v01.png`
- `Pilates Assets/02_Exercise_Cards/Plank Shoulder Taps/STATUS.md`
- `Pilates Assets/02_Exercise_Cards/Plank Shoulder Taps/plank_shoulder_taps_start_v02.png`
- `Pilates Assets/02_Exercise_Cards/Plank Shoulder Taps/plank_shoulder_taps_hero_v01.png`
- `Pilates Assets/02_Exercise_Cards/Plank Shoulder Taps/build_plank_shoulder_taps_cards.py`
- `Pilates Assets/02_Exercise_Cards/Plank Shoulder Taps/plank_shoulder_taps_guide_card_v01.png`
- `Pilates Assets/02_Exercise_Cards/Plank Shoulder Taps/plank_shoulder_taps_step_by_step_v01.png`
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
- Verze `v59.52-dev` odstraňuje Wall Sit ze všech programových dnů: den 8 = Plié Squat 12×, den 12 = Plié Squat 14×, den 20 = Pochod v mostu 12× střídavě a den 22 = Plié Squat 16×.

## Commit / Push

- Commit pro aktuální programové změny: NE
- Push proveden: NE
