# CODEX STATE

## Projekt

- Projekt: Pilates Body 40+
- Repozitář: Pilates
- Branch: main
- Git root je jediný zdroj pravdy pro aktuální stav projektu.
- `origin/main` je zdroj pravdy pro synchronizaci mezi počítači.

## Cesty na počítačích

- Kristy PC: `C:\Users\Kristy\Documents\GitHub\Pilates`
- Tomáš PC: `C:\Users\Tomáš Machánek\Documents\GitHub\Pilates`

## Jak začít práci v novém vlákně

1. Ověř Git root: `git rev-parse --show-toplevel`.
2. Ověř branch: `git branch --show-current`.
3. Ověř stav: `git status --short --branch`.
4. Přečti tento soubor: `00_CODEX/00_CODEX_STATE.md`.
5. Otevři relevantní MASTER dokumenty podle seznamu níže.
6. Pokračuj podle sekce `Další krok`.
7. Nespoléhej pouze na historii Codex vlákna. Skutečný stav vždy ověř v souborech a Gitu.

## Poslední dokončený úkol

Poslední commit před aktuálními rozpracovanými změnami:

- Hash: `51d47d122825c86d1c5048be9a515e9643f05757`
- Short hash: `51d47d1`
- Message: `a`
- Datum: `2026-07-22 00:22:50 +0200`

Před aktuálním úkolem byl `HEAD` synchronizovaný s `origin/main`.

## Aktuálně rozpracováno

Aktuální rozpracované změny bez commitu:

- `Pilates Assets/02_Exercise_Cards/Glute Bridge March/build_glute_bridge_march_cards.py` - build skript pro Guide Card a Step by Step.
- `Pilates Assets/02_Exercise_Cards/Glute Bridge March/glute_bridge_march_guide_card_v02.png` - nově vytvořená Guide Card, čeká na manuální schválení.
- `Pilates Assets/02_Exercise_Cards/Glute Bridge March/glute_bridge_march_step_by_step_v02.png` - nově vytvořený Step by Step, čeká na manuální schválení.
- `Pilates Assets/02_Exercise_Cards/Glute Bridge March/STATUS.md` - aktualizovaný stav karet.
- `00_CHATGPT_START/MASTER/01_DOCUMENTS/EXERCISE_PROGRESS.md` - odstraněné položky Glute Bridge March Guide/Step z NEXT TASKS a aktualizovaný řádek cviku.
- `00_CODEX/00_CODEX_STATE.md` - tento aktualizovaný handoff.

Source obrázky Glute Bridge March v02 zůstaly beze změny:

- `glute_bridge_march_start_v02.png`
- `glute_bridge_march_mid_v02.png`
- `glute_bridge_march_hero_v02.png`

Aplikace zůstala beze změny.

## Další krok

Pokračovat podle:

- `00_CHATGPT_START/MASTER/01_DOCUMENTS/EXERCISE_PROGRESS.md`
- sekce `NEXT TASKS`

Aktuálně první položka v `NEXT TASKS`:

1. `Reverse Crunch START`

Pokud uživatel neurčí jinak, další práce má začít touto položkou.

## Relevantní soubory

- `00_CHATGPT_START/00_READ_FIRST.md`
- `00_CHATGPT_START/MASTER/01_DOCUMENTS/EXERCISE_PROGRESS.md`
- `00_CHATGPT_START/MASTER/01_DOCUMENTS/MASTER_REFERENCE.md`
- `00_CHATGPT_START/MASTER/01_DOCUMENTS/MASTER_IMAGE_CHECKLIST.md`
- `00_CHATGPT_START/MASTER/01_DOCUMENTS/IMAGE_WORKFLOW.md`
- `Pilates Assets/02_Exercise_Cards/Glute Bridge March/STATUS.md`

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
- Při práci mezi dvěma PC vždy ověř stav vůči `origin/main`.
- Pokud je pracovní strom nečistý, nejdřív popiš změny a nepřepisuj je naslepo.

## Stav synchronizace

- Kristy PC: aktuální kontrolovaný klon je `C:\Users\Kristy\Documents\GitHub\Pilates`.
- Tomáš PC: očekávaná cesta je `C:\Users\Tomáš Machánek\Documents\GitHub\Pilates`.
- Poslední ověřený stav vůči origin/main: `HEAD...origin/main = 0 0`.
- To znamená, že `HEAD` a `origin/main` jsou shodné; pracovní strom ale obsahuje výše uvedené necommitnuté změny.

## Předání na druhé PC

Na druhém PC začni těmito kroky:

1. Otevři správný Git root.
2. Spusť `git status --short --branch`.
3. Spusť `git rev-list --left-right --count HEAD...origin/main`.
4. Pokud není stav `0 0`, nejdřív vyřeš synchronizaci podle pokynu uživatele.
5. Přečti `00_CODEX/00_CODEX_STATE.md`.
6. Pokračuj od položky uvedené v sekci `Další krok`.

## Commit / Push

- Commit vytvořen: NE
- Push proveden: NE
