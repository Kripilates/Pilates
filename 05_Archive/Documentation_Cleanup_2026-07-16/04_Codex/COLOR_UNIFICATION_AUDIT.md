# Color Unification Audit

Purpose: audit active program images and create conservative non-destructive color preview copies where useful.

## Master references used

- `Pilates Assets/01_Master_Reference/MODEL_MASTER.png.png` (1086x1448, SHA256 `dc92fba0a4aa8c29...`)
- `Pilates Assets/02_Exercise_Cards/Glute Bridge/glute_bridge_start_v1.png` (1672x941, SHA256 `c23614b9f2dbe9de...`)
- `Pilates Assets/02_Exercise_Cards/Glute Bridge/glute_bridge_hero_v1.png` (1536x1024, SHA256 `c47b771727392b58...`)
- `assets/exercises/hip.jpg` (1536x1024, SHA256 `24a6607cac36f536...`)

## Summary

- COLOR_FIX_POSSIBLE: 19
- CROP_OR_CANVAS_FIX: 3
- MINOR_FIX: 10
- REGENERATE: 9
- Audited active exercise images: 41
- Preview files created: 32

## Audit table

| Exercise | Original path | Preview path | Model match | Scene match | Light match | Color match | Crop | Action | Status | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| Bridge Abduction (`abduction`) | `assets/exercises/abduction.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/abduction_abduction_preview.jpg` | 🟢 | 🟡 | 🟡 | 🟡 | 🟡 | COLOR PREVIEW | MANUAL REVIEW | Slightly brighter than master; conservative color adjustment. |
| Bird Dog (`bird`) | `assets/exercises/bird.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/bird_bird_preview.jpg` | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 | COLOR PREVIEW | MANUAL REVIEW | Close enough model/scene; minor color variation. |
| Bird Dog s výdrží (`bird_hold`) | `assets/exercises/bird_hold.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/bird_hold_bird_hold_preview.jpg` | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 | COLOR PREVIEW | MANUAL REVIEW | Same source family as Bird Dog; color preview possible. |
| Cat-Cow (`catcow`) | `assets/exercises/catcow.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/catcow_catcow_preview.jpg` | 🟢 | 🟡 | 🟡 | 🟡 | 🟡 | COLOR PREVIEW | MANUAL REVIEW | Crop/scene less anchored; color preview possible. |
| Clamshell (`clam`) | `assets/exercises/clam.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/clam_clam_preview.jpg` | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 | COLOR PREVIEW | MANUAL REVIEW | Close enough model/scene; minor light and color alignment. |
| Clamshell pulsy (`clam_pulse`) | `assets/exercises/clam_pulse.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/clam_pulse_clam_pulse_preview.jpg` | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 | COLOR PREVIEW | MANUAL REVIEW | Same source family as Clamshell; color preview possible. |
| Dead Bug (`deadbug`) | `assets/exercises/deadbug.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/deadbug_deadbug_preview.jpg` | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 | COLOR PREVIEW | MANUAL REVIEW | Close enough model/scene; color alignment possible. |
| Dead Bug s výdrží (`deadbug_hold`) | `assets/exercises/deadbug_hold.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/deadbug_hold_deadbug_hold_preview.jpg` | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 | COLOR PREVIEW | MANUAL REVIEW | Same source family as Dead Bug; color preview possible. |
| Donkey Kick (`donkey`) | `assets/exercises/donkey.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/donkey_donkey_preview.jpg` | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 | COLOR PREVIEW | MANUAL REVIEW | Close enough model/scene; color alignment possible. |
| Frog Pumps (`frog`) | `assets/exercises/frog.jpg` | `not created` | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | REGENERATE | REGENERATE | White studio look, not master scene. |
| Frog Pumps s výdrží (`frog_hold`) | `assets/exercises/frog_hold.jpg` | `not created` | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | REGENERATE | REGENERATE | White studio look, not master scene. |
| Glute Bridge (`hip`) | `assets/exercises/hip.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/hip_hip_preview.jpg` | 🟢 | 🟡 | 🟡 | 🟡 | 🟡 | COLOR PREVIEW | MANUAL REVIEW | Cooler/desaturated than master; conservative balance preview. |
| Glute Bridge March (`hip_march`) | `assets/exercises/hip_march.jpg` | `not created` | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | REGENERATE | REGENERATE | White studio look, not master scene. |
| Hollow Hold (`hollow`) | `assets/exercises/hollow.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/hollow_hollow_preview.jpg` | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 | COLOR PREVIEW | MANUAL REVIEW | Close enough model/scene; minor light variation. |
| Fire Hydrant (`hydrant`) | `assets/exercises/hydrant.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/hydrant_hydrant_preview.jpg` | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 | COLOR PREVIEW | MANUAL REVIEW | Close enough model/scene; minor light and color alignment. |
| Mermaid Stretch (`mermaid`) | `assets/exercises/mermaid.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/mermaid_mermaid_preview.jpg` | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 | COLOR PREVIEW | MANUAL REVIEW | Close enough model/scene; color alignment possible. |
| Forearm Plank (`plank`) | `assets/exercises/plank.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/plank_plank_preview.jpg` | 🟢 | 🟡 | 🟡 | 🟡 | 🟡 | COLOR PREVIEW | MANUAL REVIEW | Background less visible; conservative color adjustment. |
| Forearm Plank + dech (`plank_breath`) | `assets/exercises/plank_breath.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/plank_breath_plank_breath_preview.jpg` | 🟢 | 🟡 | 🟡 | 🟡 | 🟡 | COLOR PREVIEW | MANUAL REVIEW | Same source family as Plank; conservative color preview possible. |
| Plié Squat (`plie`) | `assets/exercises/plie.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/plie_plie_preview.jpg` | 🟢 | 🟡 | 🟡 | 🟡 | 🟡 | COLOR PREVIEW | MANUAL REVIEW | Camera/crop differs but color can be improved. |
| Shoulder Press (`press`) | `assets/exercises/press.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/press_press_preview.jpg` | 🟡 | 🟡 | 🟡 | 🟡 | 🔴 | CROP_REVIEW + PREVIEW | MANUAL REVIEW | Portrait source; color acceptable but canvas/crop should be reviewed. |
| Shoulder Press – kontrolovaně (`press_slow`) | `assets/exercises/press_slow.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/press_slow_press_slow_preview.jpg` | 🟡 | 🟡 | 🟡 | 🟡 | 🔴 | CROP_REVIEW + PREVIEW | MANUAL REVIEW | Portrait source; color acceptable but canvas/crop should be reviewed. |
| Rainbow Leg Raise (`rainbow`) | `assets/exercises/rainbow.jpg` | `not created` | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | REGENERATE | REGENERATE | Color tone and scene differ strongly. |
| Lateral Raise (`raise`) | `assets/exercises/raise.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/raise_raise_preview.jpg` | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 | COLOR PREVIEW | MANUAL REVIEW | Close color/scene; conservative preview only. |
| Rumunský mrtvý tah (`rdl`) | `assets/exercises/rdl.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/rdl_rdl_preview.jpg` | 🟢 | 🟡 | 🟡 | 🟡 | 🟡 | COLOR PREVIEW | MANUAL REVIEW | Different room feeling; color can be gently unified. |
| Rumunský mrtvý tah – pomalu (`rdl_slow`) | `assets/exercises/rdl_slow.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/rdl_slow_rdl_slow_preview.jpg` | 🟢 | 🟡 | 🟡 | 🟡 | 🟡 | COLOR PREVIEW | MANUAL REVIEW | Same source family as RDL; color preview possible. |
| Reverse Crunch (`revcrunch`) | `assets/exercises/revcrunch.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/revcrunch_revcrunch_preview.jpg` | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 | COLOR PREVIEW | MANUAL REVIEW | Close enough model/scene; minor light and color alignment. |
| Roll Up (`rollup`) | `assets/exercises/rollup.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/rollup_rollup_preview.jpg` | 🟢 | 🟡 | 🟡 | 🟡 | 🟡 | COLOR PREVIEW | MANUAL REVIEW | Crop differs; color preview possible. |
| Bent Over Row (`row`) | `assets/exercises/row.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/row_row_preview.jpg` | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 | COLOR PREVIEW | MANUAL REVIEW | Close enough model/scene; color alignment possible. |
| Bent Over Row s pauzou (`row_pause`) | `assets/exercises/row_pause.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/row_pause_row_pause_preview.jpg` | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 | COLOR PREVIEW | MANUAL REVIEW | Same source family as Row; color preview possible. |
| Side Kick Series (`sidekick`) | `assets/exercises/sidekick.jpg` | `not created` | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | REGENERATE | REGENERATE | Different room feeling and color tone. |
| Side Kick pulsy (`sidekick_pulse`) | `assets/exercises/sidekick_pulse.jpg` | `not created` | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | REGENERATE | REGENERATE | Different room feeling and color tone. |
| Side Leg Lift (`sideleg`) | `assets/exercises/sideleg_main.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/sideleg_sideleg_main_preview.jpg` | 🟡 | 🟡 | 🟡 | 🟡 | 🔴 | CROP_REVIEW + PREVIEW | MANUAL REVIEW | Current active image is wide low-height crop; color preview only, crop review needed. |
| Side Plank (`sideplank`) | `assets/exercises/sideplank.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/sideplank_sideplank_preview.jpg` | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 | COLOR PREVIEW | MANUAL REVIEW | Close enough model/scene; color alignment possible. |
| Side Plank Reach (`sideplank_reach`) | `assets/exercises/sideplank_reach.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/sideplank_reach_sideplank_reach_preview.jpg` | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 | COLOR PREVIEW | MANUAL REVIEW | Same source family as Side Plank; color preview possible. |
| Spine Stretch (`spine`) | `assets/exercises/spine.jpg` | `not created` | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | REGENERATE | REGENERATE | Different room feeling and color tone. |
| Swan Prep (`swan`) | `assets/exercises/swan.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/swan_swan_preview.jpg` | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 | COLOR PREVIEW | MANUAL REVIEW | Close enough model/scene; minor light variation. |
| Swan Prep s výdrží (`swan_hold`) | `assets/exercises/swan_hold.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/swan_hold_swan_hold_preview.jpg` | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 | COLOR PREVIEW | MANUAL REVIEW | Same source family as Swan; color preview possible. |
| Plank Shoulder Taps (`tap`) | `assets/exercises/tap.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/tap_tap_preview.jpg` | 🟢 | 🟡 | 🟡 | 🟡 | 🟡 | COLOR PREVIEW | MANUAL REVIEW | Color tone differs; conservative color preview possible. |
| Thread the Needle (`thread`) | `assets/exercises/thread.jpg` | `Pilates Assets/03_Exports/Color_Unification_Preview/previews/thread_thread_preview.jpg` | 🟢 | 🟢 | 🟡 | 🟡 | 🟢 | COLOR PREVIEW | MANUAL REVIEW | Close enough model/scene; color alignment possible. |
| Toe Taps (`toetap`) | `assets/exercises/toetap.jpg` | `not created` | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | REGENERATE | REGENERATE | Different room feeling and color tone; do not mask as fixed. |
| Toe Taps – pomalu (`toetap_slow`) | `assets/exercises/toetap_slow.jpg` | `not created` | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | REGENERATE | REGENERATE | Different room feeling and color tone. |

## Active image inventory

| Exercise ID | Exercise name | Current image path | Image dimensions | Aspect ratio | File format | Used in days |
|---|---|---|---|---|---|---|
| `abduction` | Bridge Abduction | `assets/exercises/abduction.jpg` | 1536x1229 | 1.25 | JPEG | 5,12,19,26,29 |
| `bird` | Bird Dog | `assets/exercises/bird.jpg` | 1536x1024 | 1.5 | JPEG | 3,17,24 |
| `bird_hold` | Bird Dog s výdrží | `assets/exercises/bird_hold.jpg` | 1536x1024 | 1.5 | JPEG | 10 |
| `catcow` | Cat-Cow | `assets/exercises/catcow.jpg` | 1536x1024 | 1.5 | JPEG | 4,8,11,15,18,22,25,29 |
| `clam` | Clamshell | `assets/exercises/clam.jpg` | 1536x1024 | 1.5 | JPEG | 1,15,22 |
| `clam_pulse` | Clamshell pulsy | `assets/exercises/clam_pulse.jpg` | 1536x1024 | 1.5 | JPEG | 8 |
| `deadbug` | Dead Bug | `assets/exercises/deadbug.jpg` | 1536x1024 | 1.5 | JPEG | 1,2,16,23,30 |
| `deadbug_hold` | Dead Bug s výdrží | `assets/exercises/deadbug_hold.jpg` | 1536x1024 | 1.5 | JPEG | 9 |
| `donkey` | Donkey Kick | `assets/exercises/donkey.jpg` | 1536x1024 | 1.5 | JPEG | 5,12,19,26,29 |
| `frog` | Frog Pumps | `assets/exercises/frog.jpg` | 900x620 | 1.452 | JPEG | 5,19,26 |
| `frog_hold` | Frog Pumps s výdrží | `assets/exercises/frog_hold.jpg` | 900x620 | 1.452 | JPEG | 12 |
| `hip` | Glute Bridge | `assets/exercises/hip.jpg` | 1536x1024 | 1.5 | JPEG | 1,6,15,20,22,27,29 |
| `hip_march` | Glute Bridge March | `assets/exercises/hip_march.jpg` | 900x620 | 1.452 | JPEG | 8,13 |
| `hollow` | Hollow Hold | `assets/exercises/hollow.jpg` | 1536x1024 | 1.5 | JPEG | 2,9,16,23,30 |
| `hydrant` | Fire Hydrant | `assets/exercises/hydrant.jpg` | 1536x1024 | 1.5 | JPEG | 1,5,8,12,15,19,22,26 |
| `mermaid` | Mermaid Stretch | `assets/exercises/mermaid.jpg` | 1536x1024 | 1.5 | JPEG | 3,4,10,11,17,18,24,25 |
| `plank` | Forearm Plank | `assets/exercises/plank.jpg` | 1536x1024 | 1.5 | JPEG | 3,6,17,20,24,27 |
| `plank_breath` | Forearm Plank + dech | `assets/exercises/plank_breath.jpg` | 1536x1024 | 1.5 | JPEG | 10,13 |
| `plie` | Plié Squat | `assets/exercises/plie.jpg` | 1536x1229 | 1.25 | JPEG | 5,12,19,26 |
| `press` | Shoulder Press | `assets/exercises/press.jpg` | 1229x1536 | 0.8 | JPEG | 3,17,24 |
| `press_slow` | Shoulder Press – kontrolovaně | `assets/exercises/press_slow.jpg` | 1229x1536 | 0.8 | JPEG | 10 |
| `rainbow` | Rainbow Leg Raise | `assets/exercises/rainbow.jpg` | 1536x1024 | 1.5 | JPEG | 5,12,19,26 |
| `raise` | Lateral Raise | `assets/exercises/raise.jpg` | 1536x1229 | 1.25 | JPEG | 3,10,17,24 |
| `rdl` | Rumunský mrtvý tah | `assets/exercises/rdl.jpg` | 1536x1024 | 1.5 | JPEG | 1,6,15,20,22,27,29 |
| `rdl_slow` | Rumunský mrtvý tah – pomalu | `assets/exercises/rdl_slow.jpg` | 1536x1024 | 1.5 | JPEG | 8,13 |
| `revcrunch` | Reverse Crunch | `assets/exercises/revcrunch.jpg` | 1536x1024 | 1.5 | JPEG | 2,9,16,23,30 |
| `rollup` | Roll Up | `assets/exercises/rollup.jpg` | 1536x1229 | 1.25 | JPEG | 4,11,18,25 |
| `row` | Bent Over Row | `assets/exercises/row.jpg` | 1536x1024 | 1.5 | JPEG | 3,6,17,20,24,27 |
| `row_pause` | Bent Over Row s pauzou | `assets/exercises/row_pause.jpg` | 1536x1024 | 1.5 | JPEG | 10,13 |
| `sidekick` | Side Kick Series | `assets/exercises/sidekick.jpg` | 1536x1024 | 1.5 | JPEG | 4,18,25 |
| `sidekick_pulse` | Side Kick pulsy | `assets/exercises/sidekick_pulse.jpg` | 1536x1024 | 1.5 | JPEG | 11 |
| `sideleg` | Side Leg Lift | `assets/exercises/sideleg_main.jpg` | 900x430 | 2.093 | JPEG | 1,8,15,22,29 |
| `sideplank` | Side Plank | `assets/exercises/sideplank.jpg` | 1536x1024 | 1.5 | JPEG | 2,16,23,30 |
| `sideplank_reach` | Side Plank Reach | `assets/exercises/sideplank_reach.jpg` | 1536x1024 | 1.5 | JPEG | 9 |
| `spine` | Spine Stretch | `assets/exercises/spine.jpg` | 1402x1122 | 1.25 | JPEG | 4,6,11,13,18,20,25,27,30 |
| `swan` | Swan Prep | `assets/exercises/swan.jpg` | 1536x1024 | 1.5 | JPEG | 4,18,25 |
| `swan_hold` | Swan Prep s výdrží | `assets/exercises/swan_hold.jpg` | 1536x1024 | 1.5 | JPEG | 11 |
| `tap` | Plank Shoulder Taps | `assets/exercises/tap.jpg` | 1536x1229 | 1.25 | JPEG | 6,13,20,27 |
| `thread` | Thread the Needle | `assets/exercises/thread.jpg` | 1536x1024 | 1.5 | JPEG | 2,9,16,23 |
| `toetap` | Toe Taps | `assets/exercises/toetap.jpg` | 1492x1054 | 1.416 | JPEG | 2,16,23,30 |
| `toetap_slow` | Toe Taps – pomalu | `assets/exercises/toetap_slow.jpg` | 1492x1054 | 1.416 | JPEG | 9 |

## Preview method

- Non-destructive preview copies only.
- Conservative RGB cool-neutral balance, slight saturation reduction and contrast normalization.
- No AI regeneration, no crop, no anatomy edits, no object removal/addition.
- REGENERATE items intentionally have no preview copy.

## Before / after overview

- HTML contact sheet: `Pilates Assets/03_Exports/Color_Unification_Preview/index.html`

## Original hash verification

- `assets/exercises` hashes were captured before preview generation and verified unchanged after generation.
- Master reference hashes were captured before preview generation and verified unchanged after generation.
