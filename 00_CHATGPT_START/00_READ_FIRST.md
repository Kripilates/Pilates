# MOOVKA — READ FIRST

Status: **ACTIVE ENTRY POINT**
Aktualizováno: 2026-10-06

Tento soubor je první zastávka pro nový ChatGPT/Codex kontext. Nezačínej tvorbu,
opravu ani nasazení exercise assetů pouze z historie chatu.

## CRITICAL: NEW CHAT / NEW THREAD CONTINUITY

Nová ChatGPT/Codex větev **není nový vizuální projekt**. Automaticky v ní
zůstávají platné všechny aktuální MASTER autority, `IMAGE_WORKFLOW.md`,
`MASTER_IMAGE_CHECKLIST.md`, camera classes, model↔mat scale, approval stav
existujících assetů, command semantics a povinný cyklus:

**GENERATE/EDIT → AUTOMATIC VISIBLE QA → PASS/FAIL → STOP**

Nová větev nesmí začít vytvářet exercise images pouze podle obecného popisu
projektu nebo historie chatu. Před první image operací musí načíst aktuální
MASTER dokumentaci v níže uvedeném pořadí a aktivní obrazové reference, které
určují daný typ obrázku.

## Povinné pořadí čtení

1. `MASTER/README.md` — mapa autorit a aktivních referencí.
2. `MASTER/01_DOCUMENTS/MASTER_REFERENCE.md` — zamčená modelka, tvář, outfit,
   prostředí, podložka a camera classes.
3. `MASTER/01_DOCUMENTS/IMAGE_WORKFLOW.md` — jediná hlavní autorita pro tvorbu,
   opravy, QA, schvalování a nasazování exercise image assetů.
4. `MASTER/01_DOCUMENTS/MASTER_IMAGE_CHECKLIST.md` — povinný kontrolní seznam
   před a po každém novém nebo upraveném obrázku.
5. `MASTER/01_DOCUMENTS/EXERCISE_PROGRESS.md` — canonical detailní inventura
   aktuálních 51 aktivních exercise IDs a jejich assetů.
6. Při práci s Muscle Cards navíc:
   - `MASTER/01_DOCUMENTS/MASTER_ANATOMY.md`
   - `MASTER/01_DOCUMENTS/MUSCLE_CARD_PROFILE_AUDIT.md`
   - `MASTER/02_REFERENCES/ANATOMY/MOOVKA_MASTER_BODY_v02.png`
   - `MASTER/02_REFERENCES/ANATOMY/MASTER_BODY_MAP_v02.png`
7. Při runtime integraci také `../00_CODEX/00_CODEX_STATE.md`; jeho sekce
   **Historický log** není autoritou proti aktuálnímu MASTERU a inventuře.
8. Při globálním vizuálním QA použij galerie v
   `../Pilates Assets/03_Exports/Visual_QA/`.

## Než vznikne nový obrázek

Vždy nejprve proveď reuse/mapping audit:

1. ověř canonical exercise ID v aktuálním `data.js`;
2. ověř aktivní mapping v `app.js`;
3. prohlédni fyzické soubory ve složce cviku, zejména unversioned SOURCE;
4. ověř přesný název, case, cestu a případný reuse;
5. zkontroluj, zda nejde pouze o rozbitý runtime mapping;
6. teprve potom rozhodni, zda SOURCE skutečně chybí.

`SOURCE NENALEZEN` nebo HTTP 404 automaticky neznamená, že se má generovat nový
obrázek. Nejdřív ověř fyzické unversioned SOURCE, aktuální `app.js` a skutečnou
URL. Starý versioned odkaz může být pouze mapping bug. Konkrétní příklady ve
starších stavech a chatech nejsou autoritou; rozhoduje aktuální runtime a
`EXERCISE_PROGRESS.md`.

## Základní pravidla

- Aktivní program má **51 canonical exercise IDs**.
- `swan` je historický/inaktivní a do aktivního součtu nepatří.
- `dumbbell_pullover` je aktivní.
- Aktivní SOURCE používají unversioned názvy; `_v01`, `_v02` apod. nejsou
  výchozí naming pro nové SOURCE.
- SOURCE vzniká a schvaluje se před Guide Card a Step by Step.
- Po každém vygenerovaném nebo upraveném obrázku probíhá automatické QA bez
  čekání na vyžádání uživatelem.
- Historické dokumenty a archiv nejsou autoritou proti souborům v `MASTER/`.
- Pokud se dokumenty rozcházejí, platí pořadí autorit uvedené v `MASTER/README.md`.

Nejdůležitější pravidlo: nový obrázek musí působit jako další fotografie stejné
modelky ve stejném Moovka studiu a současně musí anatomicky správně zobrazovat
požadovanou fázi cviku.
