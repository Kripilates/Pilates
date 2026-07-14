# MODEL CONSISTENCY AUDIT

Updated: 2026-07-14T11:35:32

MODEL_MASTER: `Pilates Assets/01_Master_Reference/MODEL_MASTER.png.png`

Scope: model consistency only. This document tracks hair, body/muscularity and overall model identity decisions. It does not evaluate anatomy, room color, floor, mat or outfit color.

## Manual QA Policy

- MODEL_OK: keep original unchanged.
- HAIR_MINOR_DIFFERENCE: keep original unchanged for this phase.
- MUSCULARITY_MINOR_DIFFERENCE: keep original unchanged for this phase.
- Bird Dog major hair issue: local hair fix candidate only, no regeneration decision now.
- Fire Hydrant major hair + muscularity issue: regenerate source due to model mismatch.

## Status Table

| Exercise | Image | Audit Finding | Decision | Reason |
|---|---|---|---|---|
| Bird Dog | HERO | HAIR_MAJOR_DIFFERENCE + MUSCULARITY_MINOR_DIFFERENCE | HAIR_LOCAL_FIX_CANDIDATE | Hair is too dark with dark brunette / copper-orange impression compared with MODEL_MASTER. Body is not a regeneration reason. |
| Bird Dog | START | HAIR_MAJOR_DIFFERENCE + MUSCULARITY_MINOR_DIFFERENCE | HAIR_LOCAL_FIX_CANDIDATE | Hair is too dark with dark brunette / copper-orange impression compared with MODEL_MASTER. Body is not a regeneration reason. |
| Clamshell | HERO | MODEL_OK | KEEP_ORIGINAL | Manual QA accepts the source as-is. |
| Clamshell | START | MODEL_OK | KEEP_ORIGINAL | Manual QA accepts the source as-is. |
| Dead Bug | HERO | HAIR_MINOR_DIFFERENCE + MUSCULARITY_MINOR_DIFFERENCE | KEEP_ORIGINAL | Minor differences are accepted for this project phase. |
| Dead Bug | START | HAIR_MINOR_DIFFERENCE + MUSCULARITY_MINOR_DIFFERENCE | KEEP_ORIGINAL | Minor differences are accepted for this project phase. |
| Fire Hydrant | HERO | HAIR_MAJOR_DIFFERENCE + MUSCULARITY_MAJOR_DIFFERENCE | REGENERATE_SOURCE_MODEL_MISMATCH | Model differs from MODEL_MASTER in hair lightness/color plus shoulders, deltoids, upper arms, upper back and overall muscular physique. |
| Fire Hydrant | START | HAIR_MAJOR_DIFFERENCE + MUSCULARITY_MAJOR_DIFFERENCE | REGENERATE_SOURCE_MODEL_MISMATCH | Model differs from MODEL_MASTER in hair lightness/color plus shoulders, deltoids, upper arms, upper back and overall muscular physique. |
| Glute Bridge | HERO | MODEL_OK | KEEP_ORIGINAL | Manual QA accepts the source as-is. |
| Glute Bridge | START | MODEL_OK | KEEP_ORIGINAL | Manual QA explicitly keeps original unchanged. |
| Hip March | HERO | MODEL_OK | KEEP_ORIGINAL | Manual QA accepts the source as-is. |
| Side Leg Raise | HERO | HAIR_MINOR_DIFFERENCE + MUSCULARITY_MINOR_DIFFERENCE | KEEP_ORIGINAL | Minor differences are accepted for this project phase. |
| Side Leg Raise | START | HAIR_MINOR_DIFFERENCE + MUSCULARITY_MINOR_DIFFERENCE | KEEP_ORIGINAL | Minor differences are accepted for this project phase. |
| Toe Tap | HERO | HAIR_MINOR_DIFFERENCE | KEEP_ORIGINAL | Minor hair difference is accepted for this project phase. |
| Toe Tap | START | MODEL_OK | KEEP_ORIGINAL | Manual QA accepts the source as-is. |

## Regeneration Required

- Fire Hydrant HERO: `REGENERATE_SOURCE_MODEL_MISMATCH`
- Fire Hydrant START: `REGENERATE_SOURCE_MODEL_MISMATCH`

## Local Fix Candidate

- Bird Dog HERO: `HAIR_LOCAL_FIX_CANDIDATE`
- Bird Dog START: `HAIR_LOCAL_FIX_CANDIDATE`

## No Image Changes

This documentation update does not overwrite source images, create previews, change assets/exercises, or modify the application.
