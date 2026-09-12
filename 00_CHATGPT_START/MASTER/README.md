# MOOVKA MASTER

Status: **ACTIVE**
Aktualizováno: 2026-09-12

Tato složka je jediný canonical kořen aktivní MASTER dokumentace a referencí.
Historické podklady mohou být užitečné jako provenance, ale nejsou autoritou.

## Hierarchie autorit

| Oblast | Autorita |
|---|---|
| Vizuální identita, outfit, studio, podložka, camera classes | `01_DOCUMENTS/MASTER_REFERENCE.md` |
| Tvorba, opravy, QA, schvalování a nasazení exercise image assetů | `01_DOCUMENTS/IMAGE_WORKFLOW.md` |
| Povinný kontrolní seznam jednoho obrázku | `01_DOCUMENTS/MASTER_IMAGE_CHECKLIST.md` |
| Aktuální stav 51 aktivních cviků a jejich assetů | `01_DOCUMENTS/EXERCISE_PROGRESS.md` |
| Muscle Card systém a tvorba | `01_DOCUMENTS/MASTER_ANATOMY.md` |
| PRIMARY/SECONDARY profil každého aktivního cviku | `01_DOCUMENTS/MUSCLE_CARD_PROFILE_AUDIT.md` |
| Detail aplikace | `01_DOCUMENTS/DESIGN_STANDARD.md` |
| Repo práce Codexu | `01_DOCUMENTS/CODEX_WORKFLOW.md` |
| Projektový kontext | `01_DOCUMENTS/CHATGPT_PROJECT_GUIDE.md` |
| Dlouhodobé projektové principy | `01_DOCUMENTS/PILATES_BODY_AI_BIBLE.md` |

Při rozporu specializovaný dokument rozhoduje pouze ve své oblasti. Historický
log, jednotlivé `STATUS.md`, staré Guide/Step ani archiv nemohou přepsat MASTER.

## Doporučené pořadí čtení

1. `01_DOCUMENTS/MASTER_REFERENCE.md`
2. `01_DOCUMENTS/IMAGE_WORKFLOW.md`
3. `01_DOCUMENTS/MASTER_IMAGE_CHECKLIST.md`
4. `01_DOCUMENTS/EXERCISE_PROGRESS.md`
5. podle úkolu `MASTER_ANATOMY.md`, `MUSCLE_CARD_PROFILE_AUDIT.md`,
   `DESIGN_STANDARD.md` nebo `CODEX_WORKFLOW.md`

## Aktivní vizuální reference

- Model: `02_REFERENCES/MODEL/MASTER_MODEL.png`
- Tvář: `02_REFERENCES/MODEL/MASTER_FACE.png`
- Prostředí: `02_REFERENCES/ENVIRONMENT/MOOVKA_MASTER_ENVIRONMENT_v02.png`
- Specifikace prostředí: `02_REFERENCES/ENVIRONMENT/MOOVKA_MASTER_ENVIRONMENT_v02_SPEC.md`
- LYING kamera: `02_REFERENCES/CAMERA/MOOVKA_MASTER_CAMERA_LYING_SCALE_POSITION_v01_REFERENCE_ONLY.png` + stejnojmenné `.md`
- QUADRUPED kamera: `02_REFERENCES/CAMERA/MOOVKA_MASTER_CAMERA_QUADRUPED_SCALE_POSITION_v01_REFERENCE_ONLY.png` + stejnojmenné `.md`
- STANDING kamera: `02_REFERENCES/CAMERA/MOOVKA_MASTER_CAMERA_STANDING_SCALE_POSITION_v01_REFERENCE_ONLY.png` + stejnojmenné `.md`
- SIDE FLOOR: používá LYING camera reference pro fyzické měřítko a výšku/distance kamery; přesnou boční pózu a framing určuje schválený paired SOURCE nebo EXERCISE_REFERENCE
- Exercise/pose reference: projekt nyní nemá centralizovanou aktivní sadu
  `EXERCISE_REFERENCE` souborů. Autoritou je výslovně schválená reference dodaná
  pro konkrétní úkol nebo již schválený paired SOURCE. Starý prázdný/reference
  README je archivovaný a není zdrojem pózy.
- Anatomy master: `02_REFERENCES/ANATOMY/MOOVKA_MASTER_BODY_v02.png`
- Anatomy mapa: `02_REFERENCES/ANATOMY/MASTER_BODY_MAP_v02.png`
- Podložka: `02_REFERENCES/MAT/MASTER_MAT_183x68.jpg`
- Brand mark: `02_REFERENCES/BRAND/MooVka_M_FINAL.svg`

## Aktivní versus historické

- Aktivní program: 51 canonical IDs z aktuálního `data.js`.
- `swan`: historický/inaktivní.
- `dumbbell_pullover`: aktivní.
- Canonical detailní inventura: `01_DOCUMENTS/EXERCISE_PROGRESS.md`.
- QA contact sheets: `Pilates Assets/03_Exports/Visual_QA/`; nejsou runtime assety.
- Archiv konsolidace: `05_Archive/Master_Reference_Consolidation_2026-09-12/`.

V aktivním workflow nikdy nepoužívej archiv jako zdroj pravdy.
