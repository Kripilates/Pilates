# CODEX STATE

## Projekt

- Projekt: Pilates Body 40+
- Repozitář: Pilates
- Branch: main
- Git root: `C:\Users\Tomáš Machánek\Documents\GitHub\Pilates`
- `origin/main` je zdroj pravdy pro synchronizaci mezi počítači.

## Poslední dokončený commit

- Hash: `f2e66d1`
- Message: `a`
- Stav vůči `origin/main`: lokální `main` byl při poslední kontrole shodný s `origin/main`.
- Push posledního commitu už je na `origin/main`.

## Aktuálně rozpracováno

Aktuální rozpracované změny bez commitu:

- Child's Pose má uložený a schválený START jako reuse source z Cat-Cow START.
- Child's Pose má uložený a schválený HERO: `Pilates Assets/02_Exercise_Cards/Child's Pose/childs_pose_hero_v01.png`.
- Child's Pose workflow je `START → HERO → START`; END se nevytváří jako samostatný PNG.
- `Pilates Assets/02_Exercise_Cards/Child's Pose/STATUS.md` označuje Child's Pose jako HOTOVO.
- Guide Card a Step by Step pro Child's Pose jsou schválené a cvik je nasazený do aplikace jako `childs_pose`.
- Cat-Cow / KOČKA-KRÁVA je nasazený do aplikace jako HOTOVO.
- `data.js` používá schválený HERO source: `Pilates%20Assets/02_Exercise_Cards/Cat-Cow/cat_cow_hero_v01.png`.
- `app.js` obsahuje `referenceExerciseAssets.catcow` se START/HERO/END/Guide Card/Step by Step.
- `index.html` má cache pro `data.js` a `app.js` nastavenou na `v=5936catcow`.
- Verze aplikace: `v59.37-dev`.
- `00_CHATGPT_START/MASTER/01_DOCUMENTS/EXERCISE_PROGRESS.md` označuje Child's Pose jako HOTOVO. Souhrn: 50 celkem / 14 HOTOVO / 1 ROZPRACOVÁNO / 35 ČEKÁ.
- `Pilates Assets/02_Exercise_Cards/Cat-Cow/STATUS.md` označuje Cat-Cow jako HOTOVO.

## Další krok

Pokračovat podle:

- `00_CHATGPT_START/MASTER/01_DOCUMENTS/EXERCISE_PROGRESS.md`
- sekce `NEXT TASKS`

Aktuálně první položka v `NEXT TASKS`:

1. `Rainbow Leg Raise START`

Pokud uživatel neurčí jinak, další práce má začít touto položkou.

## Relevantní soubory

- `00_CHATGPT_START/00_READ_FIRST.md`
- `00_CHATGPT_START/MASTER/01_DOCUMENTS/EXERCISE_PROGRESS.md`
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
- `Pilates Assets/02_Exercise_Cards/Child's Pose/childs_pose_guide_card_v01.png`
- `Pilates Assets/02_Exercise_Cards/Child's Pose/childs_pose_step_by_step_v01.png`

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
- Lokální `main` byl při poslední kontrole shodný s `origin/main`.
- Pracovní strom obsahuje aktuální necommitnuté změny pro Cat-Cow nasazení a Child's Pose START/HERO/Guide Card/Step by Step/nasazení do aplikace/dokumentaci.

## Commit / Push

- Commit pro aktuální Cat-Cow nasazení a Child's Pose START/HERO/Guide Card/Step by Step/App: NE
- Push proveden: NE