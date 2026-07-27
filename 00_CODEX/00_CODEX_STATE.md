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
- Stav vůči `origin/main`: lokální `main` je shodný s `origin/main`.
- Push posledního commitu už je na `origin/main`.

## Aktuálně rozpracováno

Aktuální rozpracované změny bez commitu:

- Rainbow Leg Raise je HOTOVO: START/HERO/END, Guide Card, Step by Step, QA i App jsou schválené.
- Child's Pose je HOTOVO: START/HERO, END = START, Guide Card, Step by Step, QA i App jsou schválené.
- Bent Over Row je HOTOVO: START/HERO v02, END = START v02, Guide Card v02, Step by Step v02, QA i App jsou schválené a nasazené jako ID `row`.
- Bicycle Crunch je HOTOVO: START/HERO/END v01, Guide Card v01, Step by Step v01, QA i App jsou schválené a nasazené jako ID `bicycle`.
- Progress souhrn po Bicycle Crunch nasazení: 50 celkem, 17 HOTOVO, 0 ROZPRACOVÁNO, 33 ČEKÁ.
- Aplikace byla navýšena na `v59.40-dev`; `data.js`, `app.js` a cache parametry v `index.html` byly aktualizovány pro Bicycle Crunch v01.

## Další krok

Pokračovat podle:

- `00_CHATGPT_START/MASTER/01_DOCUMENTS/EXERCISE_PROGRESS.md`
- sekce `NEXT TASKS`

Aktuálně první položka v `NEXT TASKS`:

1. `Bridge Abduction START`

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
- `Pilates Assets/02_Exercise_Cards/Bicycle Crunch/STATUS.md`
- `Pilates Assets/02_Exercise_Cards/Bicycle Crunch/bicycle_crunch_start_v01.png`
- `Pilates Assets/02_Exercise_Cards/Bicycle Crunch/bicycle_crunch_hero_v01.png`
- `Pilates Assets/02_Exercise_Cards/Bicycle Crunch/bicycle_crunch_end_v01.png`
- `Pilates Assets/02_Exercise_Cards/Bicycle Crunch/bicycle_crunch_guide_card_v01.png`
- `Pilates Assets/02_Exercise_Cards/Bicycle Crunch/bicycle_crunch_step_by_step_v01.png`
- `Pilates Assets/02_Exercise_Cards/Bicycle Crunch/build_bicycle_crunch_cards.py`

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
- Pracovní strom obsahuje aktuální necommitnuté změny z předchozích schválených kroků a nový Bicycle Crunch assetový/dokumentační krok.

## Commit / Push

- Commit pro aktuální Bicycle Crunch finální nasazení: NE
- Push proveden: NE
