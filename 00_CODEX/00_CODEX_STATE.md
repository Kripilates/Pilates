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
- Progress souhrn: 51 aktivních cviků, 51 HOTOVO, 0 ROZPRACOVÁNO, 0 ČEKÁ. Wall Sit je ODSTRANĚNO a nezapočítává se.
- Aplikace je nyní `v59.112-dev`; cache `app.js` a `data.js` je `v=59112program` a cache `style.css` zůstává beze změny.
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

1. Žádné — aktivní asset knihovna je dokončená; Wall Sit je odstraněný z aktivního programu.

Pokud uživatel neurčí jinak, další práce má začít touto položkou.

## Thread the Needle completion — v59.106-dev

- Thread the Needle / Protažení s rotací v kleku je dokončený pod kanonickým ID `thread`.
- START a END přímo používají schválený `Bird Dog/bird_dog_start_v01.png` bez vytvoření duplicitního source assetu.
- HERO je manuálně schválený `Thread the Needle/thread_the_needle_hero_v01.png`.
- Guide Card `thread_the_needle_guide_card_v01.png` (780 × 1688) a Step by Step `thread_the_needle_step_by_step_v01.png` (780 × 2280) byly vytvořené ze schválených source assetů.
- Aplikace používá schválený HERO jako hlavní obrázek a `referenceExerciseAssets.thread` zpřístupňuje START/HERO/END, Guide Card a Step by Step bez fallbacku.
- Bird Dog source i app mapping zůstaly beze změny.
- Program, pořadí a dávky ve dnech 17 a 18 zůstaly beze změny.
- Progress: 52 celkem, 48 HOTOVO, 0 ROZPRACOVÁNO, 4 ČEKÁ.
- NEXT TASK: dokončeno v pozdějším milníku.

## Swimming completion — v59.107-dev

- Swimming je dokončený pod kanonickým ID `swimming` se sekvencí START → HERO → střídání protilehlých končetin → START.
- Schválené START a HERO v01 byly použity beze změny; END používá přesně START bez samostatného souboru.
- Guide Card a Step by Step v01 byly vytvořené ze schválených source fotek. Step by Step používá stejný HERO i pro krok střídání, bez zrcadlení a bez druhého HERO.
- Aplikace používá schválený HERO jako hlavní obrázek a `referenceExerciseAssets.swimming` zpřístupňuje START/HERO/END, Guide Card a Step by Step bez fallbacku.
- Program, pořadí a dávky ve dnech 10, 18 a 25 zůstaly beze změny.
- Progress: 52 celkem, 49 HOTOVO, 0 ROZPRACOVÁNO, 3 ČEKÁ.
- NEXT TASK: dokončeno v pozdějším milníku.
- Verze/cache: `v59.107-dev`; `app.js?v=59107swimming`; `data.js?v=59107swimming`; `style.css` cache beze změny.
- Commit: NE
- Push: NE

## Triceps Kickback completion — v59.109-dev

- Triceps Kickback je dokončený pod kanonickým ID `triceps_kickback`.
- Schválené START a HERO v01 byly použity beze změny; END používá přesně START bez samostatného souboru.
- Guide Card a Step by Step v01 byly vytvořené ze schválených source fotek. Step by Step používá sekvenci START → HERO → HERO → START, protože krok kontroly pohybu používá stejný HERO.
- Aplikace používá schválený HERO jako hlavní obrázek a `referenceExerciseAssets.triceps_kickback` zpřístupňuje START/HERO/END, Guide Card a Step by Step bez fallbacku.
- Program, pořadí a dávky ve dnech 3, 10, 17 a 24 zůstaly beze změny.
- Progress: 51 aktivních cviků, 51 HOTOVO, 0 ROZPRACOVÁNO, 0 ČEKÁ. Wall Sit je ODSTRANĚNO a nezapočítává se.
- NEXT TASK: žádné čekající aktivní assety.
- Verze/cache: `v59.109-dev`; `app.js?v=59109triceps`; `data.js?v=59109triceps`; `style.css` cache beze změny.
- Commit: NE
- Push: NE

## Program active exercise cleanup — v59.112-dev

- Den 18 `Kontrola & mobilita`: `sideleg` nahrazeno cvikem `sidekick` s dávkami Lehká `8/8`, Střední `9/9`, Náročná `12/12`.
- Den 20 `Celé tělo`: závěrečný stretch `supine_twist` nahrazen `childs_pose` s dávkou `40 s`.
- Den 25 `Kontrola & mobilita`: `clam` nahrazeno cvikem `sidekick` s dávkami Lehká `10/10`, Střední `11/11`, Náročná `14/14`.
- `wall` nebyl aktivně referencovaný v žádném dni ani stretch fázi; osiřelá definice Wall Sit byla odstraněna z `data.js`.
- Program má 30 dní, volné dny zůstávají 7, 14, 21 a 28.
- Progress: 51 aktivních cviků, 51 HOTOVO, 0 ROZPRACOVÁNO, 0 ČEKÁ.
- Verze/cache: `v59.112-dev`; `app.js?v=59112program`; `data.js?v=59112program`; `style.css` cache beze změny.
- Commit: NE
- Push: NE

## The Hundred completion — v59.108-dev

- The Hundred je dokončený pod kanonickým ID `hundred`; zobrazovaný název v aplikaci zůstává `Kmity pažemi vleže`.
- Schválené START a HERO v01 byly použity beze změny; END používá přesně START bez samostatného souboru.
- Guide Card a Step by Step v01 byly vytvořené ze schválených source fotek. Step by Step používá sekvenci START → HERO → HERO → START, protože HERO představuje pracovní pozici s malými pulzy paží.
- Aplikace používá schválený HERO jako hlavní obrázek a `referenceExerciseAssets.hundred` zpřístupňuje START/HERO/END, Guide Card a Step by Step bez fallbacku.
- Program, pořadí a dávky ve dnech 11, 23 a 25 zůstaly beze změny.
- Progress: 52 celkem, 50 HOTOVO, 0 ROZPRACOVÁNO, 2 ČEKÁ.
- NEXT TASK: dokončeno v pozdějším milníku.
- Verze/cache: `v59.108-dev`; `app.js?v=59108hundred`; `data.js?v=59108hundred`; `style.css` cache beze změny.
- Commit: NE
- Push: NE
- Verze/cache: `v59.106-dev`; `app.js?v=59106threadneedle`; `data.js?v=59106threadneedle`; `style.css?v=59117programcleanup`.
- Commit: NE
- Push: NE

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


## Moovka branding v59.78-dev

- Aktivni znacka aplikace je `Moovka`.
- Hlavicka pouziva finalni `Pilates Assets/01_Master_Reference/MooVka_logo_FINAL.svg`.
- Manifest, titulky a viditelne texty aplikace byly sjednoceny na `Moovka`.
- Historicke dokumenty a existujici Guide Card / Step by Step PNG nebyly hromadne prepisovany.
- Verze: `v59.78-dev`; cache: `style.css?v=5978moovka`, `app.js?v=5978moovka`.

## Moovka onboarding v59.79-dev

- Prvni skutecny vstup nove uzivatelky do 30denniho programu otevre trikrokovy uvodni pruvodce.
- Persistentni marker: `moovka-onboarding-completed-v1`.
- Existujici profil je rozpoznan podle realnych `pb40-*` dat pokroku, logu, oblibenych, mereni nebo poznamek; onboarding se mu automaticky nevnucuje.
- Rucni spusteni je dostupne pres `Program -> O programu -> Zobrazit uvodni pruvodce` a nemeni data, dokud uzivatelka pruvodce nedokonci.
- Vybrana obtiznost se pri dokonceni uklada do existujiciho `pb40-program-difficulty-v1`.
- Android Back pouziva stavajici globalni `popstate`; rucni pruvodce se vraci na puvodni obrazovku a povinny prvni pruchod nelze Backem obejit.
- Verze/cache: `v59.79-dev`, `style.css?v=5979onboarding`, `app.js?v=5979onboarding`.


## Standing Oblique Crunch v59.80-dev

- Schválená sekvence START v01 → HERO v01 → HERO opposite v01 → START je nasazená pod ID standing_oblique.
- Guide Card a Step by Step v01 jsou schválené a nasazené.
- Dávky ve dnech 9, 16 a 23 zůstaly beze změny.
- Progress: 50 celkem, 42 HOTOVO, 0 ROZPRACOVÁNO, 8 ČEKÁ.
- NEXT TASK: Standing Side Bend START.
- Verze/cache: v59.80-dev; data.js?v=5980standingoblique; app.js?v=5980standingoblique.


## Moovka onboarding polish v59.81-dev

- Tříkrokový onboarding používá finální logo Moovka, kompaktnější rozestupy a nové finální texty.
- Volby obtížnosti nepoužívají formulace „menší objem“ ani „vyšší objem“; Střední zůstává doporučená.
- Závěrečný krok dynamicky zobrazuje zvolenou obtížnost a počet sérií; nový profil používá CTA „Začít program“, ručně otevřený onboarding existující uživatelky „Pokračovat v programu“.
- Stránka O programu používá skutečný SVG logo asset bez textové kapsle.
- Ukládání obtížnosti, progress, history, Android Back a workout flow zůstaly beze změny.
- Verze/cache: v59.81-dev; style.css?v=5981onboardingpolish; app.js?v=5981onboardingpolish.

## Plán ve 4 etapách — v59.82-dev

- Zobrazení Plánu seskupuje dny do etap: 1–7, 8–14, 15–21 a 22–30.
- Nadpisy: Rozjezd, Budujeme sílu, Posouváme se dál a Finále.
- Progress badge počítá pouze aktivní tréninkové dny; etapy mají 6, 6, 6 a 8 aktivních dní.
- Programová data, pořadí dnů, dávky, obtížnosti, dokončené dny a workout flow zůstaly beze změny.
- Cache: style.css?v=5982planstages, app.js?v=5982planstages; data.js beze změny.

## Program a samostatná knihovna cviků — v59.83-dev

- Výchozí stav této etapy je commit `2b9146b`, shodný s `origin/main`.
- Program byl oddělen od katalogu cviků a používá samostatný dashboard.
- Knihovna obsahuje šest kategorií, Oblíbené a Všechny cviky.
- Kategorie, detail, history návraty, favorite flow, fallback obrázků a dark mode byly následně ověřeny v reálném browseru.
- Mobilní QA 360 / 390 / 430 px: bez horizontálního overflow, pageerror a console.error.
- Cache: `style.css?v=5983programlibrary`, `app.js?v=5983programlibrary`.

## Program, copy, asset mapping a „VÝMĚNA STRANY“ — v59.84-dev

- Počet unikátních exercise IDs se změnil z 50 na 52.
- Přidány byly `chest_fly` a `knee_pushup`, oba v kategorii Horní část + prsa.
- Program byl doplněn ve dnech 3, 4, 6, 10, 13, 17, 18, 20, 24, 25 a 27; core dny 2, 9, 16, 23 a 30 zůstaly beze změny.
- Lehká = 2 série, Střední = 3 série, Náročná = 3 série. Volno zůstává ve dnech 7, 14, 21 a 28. Závěrečný stretch zůstává jednou po hlavních sériích.
- Side-switch používá stávajících 5 sekund a zobrazuje „VÝMĚNA STRANY“, aktuální odpočet a „Připrav druhou stranu“ bez exercise obrázku.
- Browser QA na Side Plank potvrdila první stranu, výměnu, druhou stranu, Pauzu, Přeskočit i návrat z detailu bez auto-advance.
- Standing Side Bend používá nalezený HERO. Swan Prep, Supine Twist, Swimming a Triceps Kickback používají bezpečný fallback.
- Spine Stretch START/HERO jsou nasazené; Guide a Step zůstávají PENDING.
- QA syntax, data, program, mappingy a browser 360/390/430: PASS.
- Verze/cache: `v59.84-dev`; `style.css?v=5984programcopy`, `data.js?v=5984programcopy`, `app.js?v=5984programcopy`.
- Commit: NE
- Push: NE

## O programu + Jak cvičit správně — v59.85-dev

- Hero a finální logo Moovka zůstaly beze změny.
- „Co tě čeká“ používá tři kompaktní programové oblasti s kratšími texty.
- „Jak cvičit správně“ používá čtyři stručné principy s existujícím line-icon stylem a samostatné klidné bezpečnostní doporučení.
- Mobilní browser QA 360 / 390 / 430 px, dark mode, history návrat, overflow a application console/page errors: PASS.
- Verze/cache: v59.85-dev; style.css?v=5985aboutprinciples, app.js?v=5985aboutprinciples; data.js beze změny.
- Commit: NE
- Push: NE
## Standing Side Bend — v59.91-dev

- Schválené START, HERO pro jednu stranu, HERO pro opačnou stranu, Guide Card a Step by Step v01 jsou nasazené pod ID `standing_side_bend`.
- Referenční detail používá sekvenci START → úklon na jednu stranu → START → úklon na opačnou stranu bez zrcadlení source obrázků.
- Technické texty výslovně rozlišují cvik od Standing Oblique Crunch: bez přitahování lokte ke koleni, bez rotace a bez předklonu.
- Programové dávky a dny 4, 11, 20 a 25 zůstaly beze změny.
- Progress: 52 celkem, 42 HOTOVO, 2 ROZPRACOVÁNO, 8 ČEKÁ.
- NEXT TASK: Supine Twist START.
- Verze/cache: `v59.91-dev`; `data.js?v=5991standingsidebend`, `app.js?v=5991standingsidebend`; `style.css` beze změny.
- Commit: NE
- Push: NE

## Spine Stretch asset completion — 2026-08-24

- Schválené source zůstávají `spine_stretch_start_v01.png` a `spine_stretch_hero_v01.png`; END používá START bez samostatného PNG.
- Guide Card `spine_stretch_guide_card_v01.png` (780 × 1688) a Step by Step `spine_stretch_step_by_step_v01.png` (780 × 2280) prošly reprodukčním buildem a vizuálním QA bez změny source hashů.
- App již používá schválené START/HERO pod ID `spine`; aplikace ani program nebyly v tomto asset tasku změněny.
- Progress: 52 celkem, 43 HOTOVO, 1 ROZPRACOVÁNO, 8 ČEKÁ.
- NEXT TASK: Supine Twist START.
- Commit: NE
- Push: NE
## Chest Fly / Knee Push-Up asset structure — 2026-08-24

- Založeny anglické kanonické složky `Chest Fly` a `Knee Push-Up`.
- Chest Fly (`chest_fly`) zůstává ROZPRACOVÁNO; START reuse je zdokumentovaný relativní cestou k `Chest Press/chest_press_hero_v01.png`, bez vytvoření PNG kopie.
- Knee Push-Up (`knee_pushup`) zůstává ČEKÁ; SOURCE, Guide a Step jsou PENDING.
- Progress zůstává 52 celkem, 43 HOTOVO, 1 ROZPRACOVÁNO, 8 ČEKÁ.
- Aplikace, data a PNG zůstaly beze změny.

## Chest Press HERO replacement — 2026-08-24

- Nový uživatelsky schválený `chest_press_hero_v01.png` má SHA-256 `b5b10ef23365122aa54be46113728b2af547ddda8de0c2c1e46284b11e7d6e6c`.
- Chest Press Guide Card a Step by Step byly znovu exportovány se stejnými texty a layoutem, pouze s novým HERO.
- Chest Press START zůstal beze změny; Chest Fly reuse nadále odkazuje na `../Chest Press/chest_press_hero_v01.png` a eviduje nový hash.
- Aplikace, program a ostatní exercise PNG nebyly tímto krokem změněny.

## Chest Fly completion — v59.94-dev

- Chest Fly je dokončený pod kanonickým ID `chest_fly` se sekvencí START → HERO → START.
- START a END používají nový schválený `Chest Press/chest_press_hero_v01.png` bez fyzické kopie; vlastní HERO je `Chest Fly/chest_fly_hero_v01.png`.
- Guide Card a Step by Step v01 prošly rozměrovým, obsahovým a vizuálním QA a jsou evidované v `referenceExerciseAssets`.
- Aplikace používá schválené assety bez fallbacku; `data.js`, workout program, dávky a pořadí zůstaly beze změny.
- Progress: 52 celkem, 44 HOTOVO, 0 ROZPRACOVÁNO, 8 ČEKÁ.
- NEXT TASK: Supine Twist START.
- Verze/cache: `v59.94-dev`; `app.js?v=5994chestfly`; `data.js` a `style.css` beze změny.
- Commit: NE
- Push: NE

## Knee Push-Up completion — v59.98-dev

- Knee Push-Up / Kliky na kolenou je dokončený pod kanonickým ID `knee_pushup` se sekvencí START → HERO → START.
- Schválené START, HERO, Guide Card a Step by Step v01 byly nasazeny bez změny PNG; END používá START bez samostatného souboru.
- Aplikace používá schválený HERO jako hlavní obrázek a `referenceExerciseAssets.knee_pushup` zpřístupňuje START/HERO/END, Guide Card a Step by Step bez fallbacku.
- Program, pořadí a dávky ve dnech 10 a 24 zůstaly beze změny.
- Progress: 52 celkem, 45 HOTOVO, 0 ROZPRACOVÁNO, 7 ČEKÁ.
- NEXT TASK: Supine Twist START.
- Verze/cache: `v59.98-dev`; `app.js?v=5998kneepushup`; `data.js?v=5998kneepushup`; `style.css` beze změny.
- Commit: NE
- Push: NE

## Supine Twist completion — v59.101-dev

- Supine Twist / Rotace páteře vleže je dokončený pod kanonickým ID `supine_twist` se sekvencí START → HERO → START.
- Schválené START, HERO, Guide Card a Step by Step v01 byly nasazeny bez změny PNG; END používá přesně START bez samostatného souboru.
- `referenceExerciseAssets.supine_twist` zpřístupňuje hlavní HERO, mini sekvenci a dynamický Step by Step bez fallbacku.
- Program, pořadí a dávky ve dnech 2, 6, 11, 13, 20, 27 a 30 zůstaly beze změny.
- Progress: 52 celkem, 46 HOTOVO, 0 ROZPRACOVÁNO, 6 ČEKÁ.
- NEXT TASK: Swan Prep START.
- Verze/cache: `v59.101-dev`; `app.js?v=59101supinetwist`; `data.js` a `style.css` beze změny.
- Commit: NE
- Push: NE

## Finální dokončení 30denního programu — v59.104-dev

- Workout, který změní celý program z nedokončeného na dokončený, přeskakuje běžnou denní completion a otevírá rovnou samostatnou program completion obrazovku.
- Detekce používá existující přechod `!programWasCompleteAtWorkoutStart && isProgramComplete()` a není vázaná na Den 30.
- Obrazovka používá existující logo Moovka a schválený asset `Mermaid Stretch/mermaid_stretch_start_v01.png` s CSS cropem a fade do bílé.
- Statistiky vycházejí ze skutečných dat: 30 programových dní a 26 dokončených aktivních tréninků. Celkové minuty nejsou spolehlivě ukládané, proto se nezobrazují.
- CTA zachovává existující potvrzení a používá `startNewProgramCycle()`; reset maže pouze progress klíče a ponechává historii, kalendářní logy, poznámky, měření, oblíbené, obtížnost, onboarding a nastavení.
- `node --check app.js`, `node --check data.js`, parsování `index.html`, logická regresní QA a `git diff --check`: PASS.
- Browser runtime nebyl v této relaci dostupný; finální interaktivní kontrola 390 × 844 a console QA zůstává k ověření v reálném browseru.
- Verze/cache: `v59.104-dev`; `style.css?v=59104programfinale`, `app.js?v=59104programfinale`; `data.js` beze změny.
- Commit: NE
- Push: NE
## Swan Prep completion — v59.105-dev

- Swan Prep / Jemný záklon vleže je dokončený pod kanonickým ID `swan` se sekvencí START → HERO → START.
- Schválené START, HERO, Guide Card a Step by Step v01 byly nasazeny bez změny PNG; END používá přesně START bez samostatného souboru.
- `referenceExerciseAssets.swan` zpřístupňuje hlavní HERO, mini sekvenci a dynamický Step by Step bez fallbacku.
- Program, pořadí a dávky ve dnech 4, 11, 20 a 25 zůstaly beze změny.
- Progress: 52 celkem, 47 HOTOVO, 0 ROZPRACOVÁNO, 5 ČEKÁ.
- NEXT TASK: dokončeno v pozdějším milníku.
- Verze/cache: `v59.105-dev`; `app.js?v=59105swanprep`; `data.js` a `style.css` cache beze změny.
- Assetové URL a statická regresní QA prošly; mobilní browser re-check 390 px nebylo možné spustit kvůli lokální chybě Codex browser runtime (`setup refresh had errors`).
- Commit: NE
- Push: NE
