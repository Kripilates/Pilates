# SOURCE PROPAGATION AUDIT

Updated: 2026-07-14T12:01:21

Scope: audit mapping from approved/current SOURCE START/HERO images into derived runtime assets, Guide Cards and Step by Step cards. No new color correction, hair correction, image generation or layout redesign.

## Audit Table

| EXERCISE | CURRENT SOURCE START | CURRENT SOURCE HERO | ASSETS/EXERCISES TARGET | GUIDE CARD TARGET | STEP BY STEP TARGET | CURRENT DERIVED IMAGE MATCHES SOURCE | REBUILD METHOD | SAFE TO PROPAGATE |
|---|---|---|---|---|---|---|---|---|
| Bird Dog | `Pilates Assets\02_Exercise_Cards\Bird Dog\bird_dog_start_v01.png` (YES) | `Pilates Assets\02_Exercise_Cards\Bird Dog\bird_dog_hero_v01.png` (YES) | assets/exercises/bird.jpg; assets/exercises/bird_hold.jpg | `Pilates Assets\02_Exercise_Cards\Bird Dog\bird_dog_guide_card_v01.png` (YES) | `Pilates Assets\02_Exercise_Cards\Bird Dog\bird_dog_step_by_step_v01.png` (YES) | NO - target aspect ratio is 1536x1024 while source is 1448x1086; safe crop mapping is not documented. | UNKNOWN | NO |
| Dead Bug | `Pilates Assets\02_Exercise_Cards\Dead Bug\dead_bug_start_v01.png` (YES) | `Pilates Assets\02_Exercise_Cards\Dead Bug\dead_bug_hero_v01.png` (YES) | assets/exercises/deadbug.jpg; assets/exercises/deadbug_hold.jpg | `Pilates Assets\02_Exercise_Cards\Dead Bug\dead_bug_guide_card_v01.png` (YES) | `Pilates Assets\02_Exercise_Cards\Dead Bug\dead_bug_step_by_step_v01.png` (YES) | NO - runtime JPGs still differ from updated source color; source HERO and targets share exact 1536x1024 dimensions. | SCRIPT - direct source HERO to same-size JPG runtime asset only; Guide/Step rebuild UNKNOWN. | YES for assets/exercises/deadbug.jpg and deadbug_hold.jpg only |
| Fire Hydrant | `Pilates Assets\02_Exercise_Cards\Fire Hydrant\fire_hydrant_start_v01.png` (YES) | `Pilates Assets\02_Exercise_Cards\Fire Hydrant\fire_hydrant_hero_v01.png` (YES) | assets/exercises/hydrant.jpg; assets/exercises/hydrant_main.jpg | `Pilates Assets\02_Exercise_Cards\Fire Hydrant\fire_hydrant_guide_card_v01.png` (YES) | `Pilates Assets\02_Exercise_Cards\Fire Hydrant\fire_hydrant_step_by_step_v01.png` (YES) | UNKNOWN | DO NOT PROPAGATE | NO |
| Side Leg Raise | `Pilates Assets\02_Exercise_Cards\Side Leg Raise\side_leg_start_v01.png` (YES) | `Pilates Assets\02_Exercise_Cards\Side Leg Raise\side_leg_raise_hero_v01.png` (YES) | assets/exercises/sideleg.jpg; assets/exercises/sideleg_main.jpg | `Pilates Assets\02_Exercise_Cards\Side Leg Raise\side_leg_raise_guide_card_v01.png` (YES) | `Pilates Assets\02_Exercise_Cards\Side Leg Raise\side_leg_raise_step_by_step_v01.png` (YES) | NO/UNKNOWN - runtime targets have different dimensions/crops from source; safe crop mapping is not documented. | UNKNOWN | NO |

## Decisions
- Bird Dog: Bird Dog HERO has approved Hair Fix V1 in source, but runtime target requires crop/resize. Guide/Step rebuild workflow not found; manual rebuild required.
- Dead Bug: Guide/Step cards are composite layouts and are marked MANUAL_REBUILD_REQUIRED.
- Fire Hydrant: MODEL_QA_DECISION marks Fire Hydrant START/HERO as REGENERATE_SOURCE_MODEL_MISMATCH.
- Side Leg Raise: No deterministic rebuild workflow found for preserving crop/layout 1:1. Manual rebuild required.

## Manual Rebuild Required
- Bird Dog Guide Card and Step by Step: source changed, but composite card rebuild workflow is unknown.
- Dead Bug Guide Card and Step by Step: source changed, but composite card rebuild workflow is unknown.
- Side Leg Raise assets/exercises crop targets, Guide Card and Step by Step: source changed, but safe crop/layout rebuild workflow is unknown.
- Fire Hydrant all derived assets: skipped because source model mismatch requires regeneration first.

## Propagation Plan
- Propagate Dead Bug HERO source to `assets/exercises/deadbug.jpg` and `assets/exercises/deadbug_hold.jpg` only.
- Preserve target filenames and dimensions. No Guide Card or Step by Step overwrite.


## Propagation Result

Completed: 2026-07-14T12:02:03

Propagated:
- Dead Bug HERO source -> `assets/exercises/deadbug.jpg`
- Dead Bug HERO source -> `assets/exercises/deadbug_hold.jpg`

Skipped:
- Bird Dog runtime assets: MANUAL_REBUILD_REQUIRED because target crop/aspect ratio differs from source and safe crop mapping is undocumented.
- Bird Dog Guide Card / Step by Step: MANUAL_REBUILD_REQUIRED because deterministic composite rebuild workflow was not found.
- Dead Bug Guide Card / Step by Step: MANUAL_REBUILD_REQUIRED because deterministic composite rebuild workflow was not found.
- Side Leg Raise runtime assets / Guide Card / Step by Step: MANUAL_REBUILD_REQUIRED because safe crop/layout rebuild workflow was not found.
- Fire Hydrant: NOT PROPAGATED because source is marked REGENERATE_SOURCE_MODEL_MISMATCH.

Backup:
- `Pilates Assets/03_Exports/Source_Propagation_Backup_20260714_120146/`
