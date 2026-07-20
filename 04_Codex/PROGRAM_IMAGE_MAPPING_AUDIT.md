# Program Image Mapping Audit

Audit scope: current `data.js` program in `v59.27-dev`, days 1-30. This is a documentation-only audit; no app code, data, images, or assets were modified by this report generation.

## Method

- Parsed every exercise occurrence from `window.PB40_DATA.days`, including stretch entries.
- Compared each `exercise.image` path against visible/known image content in `assets/exercises`.
- Checked duplicate image paths and duplicate binary hashes in `assets/exercises`.
- Checked whether a corresponding folder/source/card exists in `Pilates Assets/02_Exercise_Cards`.
- Important: this report does not fix mappings; it only identifies risks.

## Summary

- Days checked: 30
- Exercise occurrences checked: 174
- Unique exercise IDs checked: 48
- CORRECT: 105
- WRONG_EXERCISE_IMAGE: 36
- SHARED_PLACEHOLDER: 8
- MISSING_IMAGE: 12
- AMBIGUOUS: 0
- DUPLICATE_MAPPING: 13

## Current Program Change Check

- Current relevant commit: `529bd1f Update workout program and equipment labels to v59.27`.
- Files changed in that commit: `app.js`, `data.js`, `index.html`.
- `assets/exercises` was not changed in the same commit.
- Conclusion: the program/data changed without a matching update of exercise image files. Several current IDs therefore reuse old images, shared placeholders, duplicate binary images, or the no-image fallback.

## Full Program Occurrence Audit

| Day | Position | Exercise ID | Display Name | Dose | Image Path | Image Actually Shows | Status | Recommended Fix |
|---:|---:|---|---|---|---|---|---|---|
| 1 | 1 | rdl | RumunskĂ˝ mrtvĂ˝ tah | 12Ă— | assets/exercises/rdl.jpg?v=50 | Romanian Deadlift | CORRECT | KEEP |
| 1 | 2 | hydrant | Fire Hydrant | 15/15 | assets/exercises/hydrant.jpg?v=50 | Fire Hydrant | CORRECT | KEEP |
| 1 | 3 | clam | Clamshell | 15/15 | assets/exercises/clam.jpg?v=50 | Clamshell | CORRECT | KEEP |
| 1 | 4 | sideleg | UnoĹľovĂˇnĂ­ vleĹľe na boku | 15/15 | assets/exercises/sideleg_main.jpg?v=50 | Side Leg Raise / side lying leg lift | CORRECT | KEEP |
| 1 | 5 | inner_thigh | Inner Thigh Lift | 15/15 | assets/exercises/sideleg_main.jpg?v=50 | Side Leg Raise / side lying leg lift | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 1 | 6 | hip | Glute Bridge | 15Ă— | assets/exercises/hip.jpg?v=50 | Glute Bridge | CORRECT | KEEP |
| 1 | stretch | figure_four | ProtaĹľenĂ­ hĂ˝ĹľdĂ­ vleĹľe | 35 s/strana | assets/exercises/hip.jpg?v=50 | Glute Bridge | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 2 | 1 | sideplank | Side Plank | 25 s/strana | assets/exercises/sideplank.jpg?v=50 | Side Plank | CORRECT | KEEP |
| 2 | 2 | deadbug | Dead Bug | 24Ă— stĹ™Ă­davÄ› | assets/exercises/deadbug.jpg?v=50 | Dead Bug | CORRECT | KEEP |
| 2 | 3 | toetap | Toe Taps | 30Ă— stĹ™Ă­davÄ› | assets/exercises/toetap.jpg?v=50 | Toe Taps | CORRECT | KEEP |
| 2 | 4 | revcrunch | Reverse Crunch | 12Ă— | assets/exercises/revcrunch.jpg?v=50 | Reverse Crunch | CORRECT | KEEP |
| 2 | 5 | hollow | Hollow Hold | 20 s | assets/exercises/hollow.jpg?v=50 | Hollow Hold | CORRECT | KEEP |
| 2 | stretch | supine_twist | Rotace pĂˇteĹ™e vleĹľe | 35 s/strana | assets/exercises/thread.jpg?v=50 | Thread the Needle | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 3 | 1 | row | Bent Over Row | 12Ă— | assets/exercises/row.jpg?v=50 | Bent Over Row | CORRECT | KEEP |
| 3 | 2 | press | Shoulder Press | 10Ă— | assets/exercises/press.jpg?v=50 | Shoulder Press | CORRECT | KEEP |
| 3 | 3 | raise | Lateral Raise | 12Ă— | assets/exercises/raise.jpg?v=50 | Lateral Raise | CORRECT | KEEP |
| 3 | 4 | triceps_kickback | Triceps Kickback | 12Ă— | (empty) | No image path; no-image fallback | MISSING_IMAGE | NEW_SOURCE_REQUIRED; no-image fallback currently active |
| 3 | 5 | bird | Bird Dog | 24Ă— stĹ™Ă­davÄ› | assets/exercises/bird.jpg?v=50 | Bird Dog | CORRECT | KEEP |
| 3 | 6 | plank | Forearm Plank | 25 s | assets/exercises/plank.jpg?v=50 | Forearm Plank | CORRECT | KEEP |
| 3 | stretch | chest_opener | Chest Opener | 45 s | assets/exercises/row.jpg?v=50 | Bent Over Row | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 4 | 1 | rollup | Roll Up | 35 s | assets/exercises/rollup.jpg?v=50 | Roll Up | CORRECT | KEEP |
| 4 | 2 | spine | Spine Stretch | 40 s | assets/exercises/spine.jpg?v=50 | Spine Stretch | CORRECT | KEEP |
| 4 | 3 | mermaid | Mermaid Stretch | 30 s/strana | assets/exercises/mermaid.jpg?v=50 | Mermaid Stretch | CORRECT | KEEP |
| 4 | 4 | sidekick | Side Kick | 35 s/strana | assets/exercises/sidekick.jpg?v=50 | Side Kick | CORRECT | KEEP |
| 4 | 5 | swan | Swan Prep | 35 s | assets/exercises/swan.jpg?v=50 | Hollow Hold duplicate image, not Swan/Sphinx | DUPLICATE_MAPPING | NEW_SOURCE_REQUIRED or replace duplicate binary asset |
| 4 | stretch | catcow | Cat-Cow | 40 s | assets/exercises/catcow.jpg?v=50 | Cat-Cow | CORRECT | KEEP |
| 5 | 1 | plie | PliĂ© Squat | 12Ă— | assets/exercises/plie.jpg?v=50 | Plie Squat | CORRECT | KEEP |
| 5 | 2 | donkey | Donkey Kick | 15/15 | assets/exercises/donkey.jpg?v=50 | Donkey Kick | CORRECT | KEEP |
| 5 | 3 | hydrant | Fire Hydrant | 18/18 | assets/exercises/hydrant.jpg?v=50 | Fire Hydrant | CORRECT | KEEP |
| 5 | 4 | rainbow | Rainbow Leg Raise | 12/12 | assets/exercises/rainbow.jpg?v=50 | Rainbow Leg Raise | CORRECT | KEEP |
| 5 | 5 | abduction | Bridge Abduction | 15Ă— | assets/exercises/abduction.jpg?v=50 | Bridge Abduction | CORRECT | KEEP |
| 5 | 6 | frog | Frog Pumps | 20Ă— | assets/exercises/frog.jpg?v=50 | Frog Pumps | CORRECT | KEEP |
| 5 | stretch | hamstring_supine | JemnĂ© protaĹľenĂ­ zadnĂ­ strany stehna | 40 s/strana | assets/exercises/spine.jpg?v=50 | Spine Stretch | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 6 | 1 | row | Bent Over Row | 12Ă— | assets/exercises/row.jpg?v=50 | Bent Over Row | CORRECT | KEEP |
| 6 | 2 | rdl | RumunskĂ˝ mrtvĂ˝ tah | 12Ă— | assets/exercises/rdl.jpg?v=50 | Romanian Deadlift | CORRECT | KEEP |
| 6 | 3 | chest_press | Tlaky s ÄŤinkami vleĹľe | 12Ă— | (empty) | No image path; no-image fallback | MISSING_IMAGE | NEW_SOURCE_REQUIRED; no-image fallback currently active |
| 6 | 4 | hip | Glute Bridge | 15Ă— | assets/exercises/hip.jpg?v=50 | Glute Bridge | CORRECT | KEEP |
| 6 | 5 | tap | Plank Shoulder Taps | 20Ă— stĹ™Ă­davÄ› | assets/exercises/tap.jpg?v=50 | Plank Shoulder Taps | CORRECT | KEEP |
| 6 | 6 | plank | Forearm Plank | 25 s | assets/exercises/plank.jpg?v=50 | Forearm Plank | CORRECT | KEEP |
| 6 | stretch | supine_twist | Rotace pĂˇteĹ™e vleĹľe | 35 s/strana | assets/exercises/thread.jpg?v=50 | Thread the Needle | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 8 | 1 | wall | Wall Sit | 30 s | assets/exercises/wall.jpg?v=50 | Spine Stretch duplicate image, not Wall Sit | DUPLICATE_MAPPING | NEW_SOURCE_REQUIRED or replace duplicate binary asset |
| 8 | 2 | rdl | RumunskĂ˝ mrtvĂ˝ tah | 12Ă— | assets/exercises/rdl.jpg?v=50 | Romanian Deadlift | CORRECT | KEEP |
| 8 | 3 | rainbow | Rainbow Leg Raise | 12/12 | assets/exercises/rainbow.jpg?v=50 | Rainbow Leg Raise | CORRECT | KEEP |
| 8 | 4 | sidekick | Side Kick | 40 s/strana | assets/exercises/sidekick.jpg?v=50 | Side Kick | CORRECT | KEEP |
| 8 | 5 | hip_march | Glute Bridge March | 12/12 | assets/exercises/hip_march.jpg?v=50 | Glute Bridge March | CORRECT | KEEP |
| 8 | 6 | frog | Frog Pumps | 20Ă— | assets/exercises/frog.jpg?v=50 | Frog Pumps | CORRECT | KEEP |
| 8 | stretch | figure_four | ProtaĹľenĂ­ hĂ˝ĹľdĂ­ vleĹľe | 35 s/strana | assets/exercises/hip.jpg?v=50 | Glute Bridge | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 9 | 1 | standing_oblique | Standing Oblique Crunch | 20Ă— stĹ™Ă­davÄ› | assets/exercises/mermaid.jpg?v=50 | Mermaid Stretch | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 9 | 2 | sideplank_reach | BoÄŤnĂ­ prkno s rotacĂ­ | 10/10 | assets/exercises/sideplank_reach.jpg?v=50 | Side Plank duplicate image, not reach variant | DUPLICATE_MAPPING | NEW_SOURCE_REQUIRED or replace duplicate binary asset |
| 9 | 3 | deadbug | Dead Bug | 20Ă— stĹ™Ă­davÄ› | assets/exercises/deadbug.jpg?v=50 | Dead Bug | CORRECT | KEEP |
| 9 | 4 | heeltaps | Heel Taps | 24Ă— stĹ™Ă­davÄ› | assets/exercises/toetap.jpg?v=50 | Toe Taps | SHARED_PLACEHOLDER | NEW_SOURCE_REQUIRED or MANUAL_REVIEW if placeholder is intentionally approved |
| 9 | 5 | bicycle | Bicycle Crunch | 20Ă— stĹ™Ă­davÄ› | assets/exercises/revcrunch.jpg?v=50 | Reverse Crunch | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 9 | stretch | sphinx | Sphinx Stretch | 40 s | assets/exercises/swan.jpg?v=50 | Hollow Hold duplicate image, not Swan/Sphinx | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 10 | 1 | row | Bent Over Row | 12Ă— | assets/exercises/row.jpg?v=50 | Bent Over Row | CORRECT | KEEP |
| 10 | 2 | press | Shoulder Press | 10Ă— | assets/exercises/press.jpg?v=50 | Shoulder Press | CORRECT | KEEP |
| 10 | 3 | triceps_kickback | Triceps Kickback | 12Ă— | (empty) | No image path; no-image fallback | MISSING_IMAGE | NEW_SOURCE_REQUIRED; no-image fallback currently active |
| 10 | 4 | chest_press | Tlaky s ÄŤinkami vleĹľe | 12Ă— | (empty) | No image path; no-image fallback | MISSING_IMAGE | NEW_SOURCE_REQUIRED; no-image fallback currently active |
| 10 | 5 | bird | Bird Dog | 20Ă— stĹ™Ă­davÄ› | assets/exercises/bird.jpg?v=50 | Bird Dog | CORRECT | KEEP |
| 10 | 6 | swimming | Swimming | 25 s | (empty) | No image path; no-image fallback | MISSING_IMAGE | NEW_SOURCE_REQUIRED; no-image fallback currently active |
| 10 | stretch | chest_opener | Chest Opener | 45 s | assets/exercises/row.jpg?v=50 | Bent Over Row | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 11 | 1 | standing_side_bend | Standing Side Bend | 20Ă— stĹ™Ă­davÄ› | assets/exercises/mermaid.jpg?v=50 | Mermaid Stretch | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 11 | 2 | rollup | Roll Up | 40 s | assets/exercises/rollup.jpg?v=50 | Roll Up | CORRECT | KEEP |
| 11 | 3 | hundred | The Hundred | 30 s | assets/exercises/hollow.jpg?v=50 | Hollow Hold | SHARED_PLACEHOLDER | NEW_SOURCE_REQUIRED or MANUAL_REVIEW if placeholder is intentionally approved |
| 11 | 4 | scissors | Scissors | 24Ă— stĹ™Ă­davÄ› | assets/exercises/toetap_slow.jpg?v=50 | Toe Taps duplicate image, not Scissors | DUPLICATE_MAPPING | NEW_SOURCE_REQUIRED or replace duplicate binary asset |
| 11 | 5 | swimming | Swimming | 25 s | (empty) | No image path; no-image fallback | MISSING_IMAGE | NEW_SOURCE_REQUIRED; no-image fallback currently active |
| 11 | stretch | supine_twist | Rotace pĂˇteĹ™e vleĹľe | 35 s/strana | assets/exercises/thread.jpg?v=50 | Thread the Needle | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 12 | 1 | wall | Wall Sit | 35 s | assets/exercises/wall.jpg?v=50 | Spine Stretch duplicate image, not Wall Sit | DUPLICATE_MAPPING | NEW_SOURCE_REQUIRED or replace duplicate binary asset |
| 12 | 2 | donkey | Donkey Kick | 18/18 | assets/exercises/donkey.jpg?v=50 | Donkey Kick | CORRECT | KEEP |
| 12 | 3 | sideleg | UnoĹľovĂˇnĂ­ vleĹľe na boku | 18/18 | assets/exercises/sideleg_main.jpg?v=50 | Side Leg Raise / side lying leg lift | CORRECT | KEEP |
| 12 | 4 | clam | Clamshell | 15/15 | assets/exercises/clam.jpg?v=50 | Clamshell | CORRECT | KEEP |
| 12 | 5 | abduction | Bridge Abduction | 18Ă— | assets/exercises/abduction.jpg?v=50 | Bridge Abduction | CORRECT | KEEP |
| 12 | 6 | frog | Frog Pumps | 18Ă— | assets/exercises/frog.jpg?v=50 | Frog Pumps | CORRECT | KEEP |
| 12 | stretch | hamstring_supine | JemnĂ© protaĹľenĂ­ zadnĂ­ strany stehna | 40 s/strana | assets/exercises/spine.jpg?v=50 | Spine Stretch | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 13 | 1 | rdl | RumunskĂ˝ mrtvĂ˝ tah | 12Ă— | assets/exercises/rdl.jpg?v=50 | Romanian Deadlift | CORRECT | KEEP |
| 13 | 2 | press | Shoulder Press | 12Ă— | assets/exercises/press.jpg?v=50 | Shoulder Press | CORRECT | KEEP |
| 13 | 3 | raise | Lateral Raise | 14Ă— | assets/exercises/raise.jpg?v=50 | Lateral Raise | CORRECT | KEEP |
| 13 | 4 | tap | Plank Shoulder Taps | 20Ă— stĹ™Ă­davÄ› | assets/exercises/tap.jpg?v=50 | Plank Shoulder Taps | CORRECT | KEEP |
| 13 | 5 | hip_march | Glute Bridge March | 12/12 | assets/exercises/hip_march.jpg?v=50 | Glute Bridge March | CORRECT | KEEP |
| 13 | 6 | deadbug | Dead Bug | 24Ă— stĹ™Ă­davÄ› | assets/exercises/deadbug.jpg?v=50 | Dead Bug | CORRECT | KEEP |
| 13 | stretch | supine_twist | Rotace pĂˇteĹ™e vleĹľe | 35 s/strana | assets/exercises/thread.jpg?v=50 | Thread the Needle | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 15 | 1 | plie | PliĂ© Squat | 16Ă— | assets/exercises/plie.jpg?v=50 | Plie Squat | CORRECT | KEEP |
| 15 | 2 | donkey | Donkey Kick | 15/15 | assets/exercises/donkey.jpg?v=50 | Donkey Kick | CORRECT | KEEP |
| 15 | 3 | inner_thigh | Inner Thigh Lift | 15/15 | assets/exercises/sideleg_main.jpg?v=50 | Side Leg Raise / side lying leg lift | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 15 | 4 | sideleg | UnoĹľovĂˇnĂ­ vleĹľe na boku | 15/15 | assets/exercises/sideleg_main.jpg?v=50 | Side Leg Raise / side lying leg lift | CORRECT | KEEP |
| 15 | 5 | hip_march | Glute Bridge March | 14/14 | assets/exercises/hip_march.jpg?v=50 | Glute Bridge March | CORRECT | KEEP |
| 15 | 6 | abduction | Bridge Abduction | 20Ă— | assets/exercises/abduction.jpg?v=50 | Bridge Abduction | CORRECT | KEEP |
| 15 | stretch | figure_four | ProtaĹľenĂ­ hĂ˝ĹľdĂ­ vleĹľe | 35 s/strana | assets/exercises/hip.jpg?v=50 | Glute Bridge | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 16 | 1 | standing_oblique | Standing Oblique Crunch | 24Ă— stĹ™Ă­davÄ› | assets/exercises/mermaid.jpg?v=50 | Mermaid Stretch | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 16 | 2 | russian | Russian Twist | 24Ă— stĹ™Ă­davÄ› | assets/exercises/seated_rotation.jpg?v=50 | Seated Rotation / Russian Twist family | SHARED_PLACEHOLDER | NEW_SOURCE_REQUIRED or MANUAL_REVIEW if placeholder is intentionally approved |
| 16 | 3 | toetap | Toe Taps | 30Ă— stĹ™Ă­davÄ› | assets/exercises/toetap.jpg?v=50 | Toe Taps | CORRECT | KEEP |
| 16 | 4 | legraises | Leg Raises | 12Ă— | assets/exercises/hollow.jpg?v=50 | Hollow Hold | SHARED_PLACEHOLDER | NEW_SOURCE_REQUIRED or MANUAL_REVIEW if placeholder is intentionally approved |
| 16 | 5 | revcrunch | Reverse Crunch | 18Ă— | assets/exercises/revcrunch.jpg?v=50 | Reverse Crunch | CORRECT | KEEP |
| 16 | stretch | sphinx | Sphinx Stretch | 40 s | assets/exercises/swan.jpg?v=50 | Hollow Hold duplicate image, not Swan/Sphinx | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 17 | 1 | row | Bent Over Row | 16Ă— | assets/exercises/row.jpg?v=50 | Bent Over Row | CORRECT | KEEP |
| 17 | 2 | press | Shoulder Press | 14Ă— | assets/exercises/press.jpg?v=50 | Shoulder Press | CORRECT | KEEP |
| 17 | 3 | raise | Lateral Raise | 16Ă— | assets/exercises/raise.jpg?v=50 | Lateral Raise | CORRECT | KEEP |
| 17 | 4 | triceps_kickback | Triceps Kickback | 16Ă— | (empty) | No image path; no-image fallback | MISSING_IMAGE | NEW_SOURCE_REQUIRED; no-image fallback currently active |
| 17 | 5 | bird | Bird Dog | 24Ă— stĹ™Ă­davÄ› | assets/exercises/bird.jpg?v=50 | Bird Dog | CORRECT | KEEP |
| 17 | 6 | plank | Forearm Plank | 40 s | assets/exercises/plank.jpg?v=50 | Forearm Plank | CORRECT | KEEP |
| 17 | stretch | thread | Thread the Needle | 40 s/strana | assets/exercises/thread.jpg?v=50 | Thread the Needle | CORRECT | KEEP |
| 18 | 1 | rollup | Roll Up | 45 s | assets/exercises/rollup.jpg?v=50 | Roll Up | CORRECT | KEEP |
| 18 | 2 | spine | Spine Stretch | 40 s | assets/exercises/spine.jpg?v=50 | Spine Stretch | CORRECT | KEEP |
| 18 | 3 | mermaid | Mermaid Stretch | 45 s/strana | assets/exercises/mermaid.jpg?v=50 | Mermaid Stretch | CORRECT | KEEP |
| 18 | 4 | sidekick | Side Kick | 45 s/strana | assets/exercises/sidekick.jpg?v=50 | Side Kick | CORRECT | KEEP |
| 18 | 5 | swimming | Swimming | 35 s | (empty) | No image path; no-image fallback | MISSING_IMAGE | NEW_SOURCE_REQUIRED; no-image fallback currently active |
| 18 | stretch | catcow | Cat-Cow | 40 s | assets/exercises/catcow.jpg?v=50 | Cat-Cow | CORRECT | KEEP |
| 19 | 1 | plie | PliĂ© Squat | 18Ă— | assets/exercises/plie.jpg?v=50 | Plie Squat | CORRECT | KEEP |
| 19 | 2 | donkey | Donkey Kick | 15/15 | assets/exercises/donkey.jpg?v=50 | Donkey Kick | CORRECT | KEEP |
| 19 | 3 | rainbow | Rainbow Leg Raise | 14/14 | assets/exercises/rainbow.jpg?v=50 | Rainbow Leg Raise | CORRECT | KEEP |
| 19 | 4 | clam | Clamshell | 18/18 | assets/exercises/clam.jpg?v=50 | Clamshell | CORRECT | KEEP |
| 19 | 5 | inner_thigh | Inner Thigh Lift | 18/18 | assets/exercises/sideleg_main.jpg?v=50 | Side Leg Raise / side lying leg lift | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 19 | 6 | hip | Glute Bridge | 20Ă— | assets/exercises/hip.jpg?v=50 | Glute Bridge | CORRECT | KEEP |
| 19 | stretch | figure_four | ProtaĹľenĂ­ hĂ˝ĹľdĂ­ vleĹľe | 40 s/strana | assets/exercises/hip.jpg?v=50 | Glute Bridge | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 20 | 1 | wall | Wall Sit | 40 s | assets/exercises/wall.jpg?v=50 | Spine Stretch duplicate image, not Wall Sit | DUPLICATE_MAPPING | NEW_SOURCE_REQUIRED or replace duplicate binary asset |
| 20 | 2 | raise | Lateral Raise | 16Ă— | assets/exercises/raise.jpg?v=50 | Lateral Raise | CORRECT | KEEP |
| 20 | 3 | standing_side_bend | Standing Side Bend | 24Ă— stĹ™Ă­davÄ› | assets/exercises/mermaid.jpg?v=50 | Mermaid Stretch | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 20 | 4 | chest_press | Tlaky s ÄŤinkami vleĹľe | 16Ă— | (empty) | No image path; no-image fallback | MISSING_IMAGE | NEW_SOURCE_REQUIRED; no-image fallback currently active |
| 20 | 5 | sideplank_reach | BoÄŤnĂ­ prkno s rotacĂ­ | 12/12 | assets/exercises/sideplank_reach.jpg?v=50 | Side Plank duplicate image, not reach variant | DUPLICATE_MAPPING | NEW_SOURCE_REQUIRED or replace duplicate binary asset |
| 20 | 6 | swan | Swan Prep | 45 s | assets/exercises/swan.jpg?v=50 | Hollow Hold duplicate image, not Swan/Sphinx | DUPLICATE_MAPPING | NEW_SOURCE_REQUIRED or replace duplicate binary asset |
| 20 | stretch | supine_twist | Rotace pĂˇteĹ™e vleĹľe | 35 s/strana | assets/exercises/thread.jpg?v=50 | Thread the Needle | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 22 | 1 | wall | Wall Sit | 40 s | assets/exercises/wall.jpg?v=50 | Spine Stretch duplicate image, not Wall Sit | DUPLICATE_MAPPING | NEW_SOURCE_REQUIRED or replace duplicate binary asset |
| 22 | 2 | rdl | RumunskĂ˝ mrtvĂ˝ tah | 16Ă— | assets/exercises/rdl.jpg?v=50 | Romanian Deadlift | CORRECT | KEEP |
| 22 | 3 | hydrant | Fire Hydrant | 15/15 | assets/exercises/hydrant.jpg?v=50 | Fire Hydrant | CORRECT | KEEP |
| 22 | 4 | sidekick | Side Kick | 45 s/strana | assets/exercises/sidekick.jpg?v=50 | Side Kick | CORRECT | KEEP |
| 22 | 5 | inner_thigh | Inner Thigh Lift | 18/18 | assets/exercises/sideleg_main.jpg?v=50 | Side Leg Raise / side lying leg lift | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 22 | 6 | hip | Glute Bridge | 22Ă— | assets/exercises/hip.jpg?v=50 | Glute Bridge | CORRECT | KEEP |
| 22 | stretch | hamstring_supine | JemnĂ© protaĹľenĂ­ zadnĂ­ strany stehna | 40 s/strana | assets/exercises/spine.jpg?v=50 | Spine Stretch | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 23 | 1 | standing_oblique | Standing Oblique Crunch | 24Ă— stĹ™Ă­davÄ› | assets/exercises/mermaid.jpg?v=50 | Mermaid Stretch | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 23 | 2 | sideplank | Side Plank | 30 s/strana | assets/exercises/sideplank.jpg?v=50 | Side Plank | CORRECT | KEEP |
| 23 | 3 | russian | Russian Twist | 28Ă— stĹ™Ă­davÄ› | assets/exercises/seated_rotation.jpg?v=50 | Seated Rotation / Russian Twist family | SHARED_PLACEHOLDER | NEW_SOURCE_REQUIRED or MANUAL_REVIEW if placeholder is intentionally approved |
| 23 | 4 | bicycle | Bicycle Crunch | 28Ă— stĹ™Ă­davÄ› | assets/exercises/revcrunch.jpg?v=50 | Reverse Crunch | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 23 | 5 | hundred | The Hundred | 40 s | assets/exercises/hollow.jpg?v=50 | Hollow Hold | SHARED_PLACEHOLDER | NEW_SOURCE_REQUIRED or MANUAL_REVIEW if placeholder is intentionally approved |
| 23 | stretch | sphinx | Sphinx Stretch | 45 s | assets/exercises/swan.jpg?v=50 | Hollow Hold duplicate image, not Swan/Sphinx | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 24 | 1 | row | Bent Over Row | 16Ă— | assets/exercises/row.jpg?v=50 | Bent Over Row | CORRECT | KEEP |
| 24 | 2 | press | Shoulder Press | 14Ă— | assets/exercises/press.jpg?v=50 | Shoulder Press | CORRECT | KEEP |
| 24 | 3 | raise | Lateral Raise | 16Ă— | assets/exercises/raise.jpg?v=50 | Lateral Raise | CORRECT | KEEP |
| 24 | 4 | triceps_kickback | Triceps Kickback | 16Ă— | (empty) | No image path; no-image fallback | MISSING_IMAGE | NEW_SOURCE_REQUIRED; no-image fallback currently active |
| 24 | 5 | chest_press | Tlaky s ÄŤinkami vleĹľe | 16Ă— | (empty) | No image path; no-image fallback | MISSING_IMAGE | NEW_SOURCE_REQUIRED; no-image fallback currently active |
| 24 | 6 | bird | Bird Dog | 24Ă— stĹ™Ă­davÄ› | assets/exercises/bird.jpg?v=50 | Bird Dog | CORRECT | KEEP |
| 24 | stretch | chest_opener | Chest Opener | 45 s | assets/exercises/row.jpg?v=50 | Bent Over Row | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 25 | 1 | standing_side_bend | Standing Side Bend | 24Ă— stĹ™Ă­davÄ› | assets/exercises/mermaid.jpg?v=50 | Mermaid Stretch | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 25 | 2 | catcow | Cat-Cow | 40 s | assets/exercises/catcow.jpg?v=50 | Cat-Cow | CORRECT | KEEP |
| 25 | 3 | swan | Swan Prep | 50 s | assets/exercises/swan.jpg?v=50 | Hollow Hold duplicate image, not Swan/Sphinx | DUPLICATE_MAPPING | NEW_SOURCE_REQUIRED or replace duplicate binary asset |
| 25 | 4 | swimming | Swimming | 40 s | (empty) | No image path; no-image fallback | MISSING_IMAGE | NEW_SOURCE_REQUIRED; no-image fallback currently active |
| 25 | 5 | rollup | Roll Up | 50 s | assets/exercises/rollup.jpg?v=50 | Roll Up | CORRECT | KEEP |
| 25 | 6 | mermaid | Mermaid Stretch | 40 s/strana | assets/exercises/mermaid.jpg?v=50 | Mermaid Stretch | CORRECT | KEEP |
| 25 | stretch | supine_twist | Rotace pĂˇteĹ™e vleĹľe | 35 s/strana | assets/exercises/thread.jpg?v=50 | Thread the Needle | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 26 | 1 | plie | PliĂ© Squat | 16Ă— | assets/exercises/plie.jpg?v=50 | Plie Squat | CORRECT | KEEP |
| 26 | 2 | rainbow | Rainbow Leg Raise | 14/14 | assets/exercises/rainbow.jpg?v=50 | Rainbow Leg Raise | CORRECT | KEEP |
| 26 | 3 | sidekick | Side Kick | 45 s/strana | assets/exercises/sidekick.jpg?v=50 | Side Kick | CORRECT | KEEP |
| 26 | 4 | sideleg | UnoĹľovĂˇnĂ­ vleĹľe na boku | 18/18 | assets/exercises/sideleg_main.jpg?v=50 | Side Leg Raise / side lying leg lift | CORRECT | KEEP |
| 26 | 5 | abduction | Bridge Abduction | 22Ă— | assets/exercises/abduction.jpg?v=50 | Bridge Abduction | CORRECT | KEEP |
| 26 | 6 | frog | Frog Pumps | 20Ă— | assets/exercises/frog.jpg?v=50 | Frog Pumps | CORRECT | KEEP |
| 26 | stretch | figure_four | ProtaĹľenĂ­ hĂ˝ĹľdĂ­ vleĹľe | 40 s/strana | assets/exercises/hip.jpg?v=50 | Glute Bridge | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 27 | 1 | row | Bent Over Row | 16Ă— | assets/exercises/row.jpg?v=50 | Bent Over Row | CORRECT | KEEP |
| 27 | 2 | press | Shoulder Press | 14Ă— | assets/exercises/press.jpg?v=50 | Shoulder Press | CORRECT | KEEP |
| 27 | 3 | sideplank_reach | BoÄŤnĂ­ prkno s rotacĂ­ | 12/12 | assets/exercises/sideplank_reach.jpg?v=50 | Side Plank duplicate image, not reach variant | DUPLICATE_MAPPING | NEW_SOURCE_REQUIRED or replace duplicate binary asset |
| 27 | 4 | tap | Plank Shoulder Taps | 20Ă— stĹ™Ă­davÄ› | assets/exercises/tap.jpg?v=50 | Plank Shoulder Taps | CORRECT | KEEP |
| 27 | 5 | hip | Glute Bridge | 22Ă— | assets/exercises/hip.jpg?v=50 | Glute Bridge | CORRECT | KEEP |
| 27 | 6 | hollow | Hollow Hold | 30 s | assets/exercises/hollow.jpg?v=50 | Hollow Hold | CORRECT | KEEP |
| 27 | stretch | supine_twist | Rotace pĂˇteĹ™e vleĹľe | 35 s/strana | assets/exercises/thread.jpg?v=50 | Thread the Needle | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 29 | 1 | plie | PliĂ© Squat | 18Ă— | assets/exercises/plie.jpg?v=50 | Plie Squat | CORRECT | KEEP |
| 29 | 2 | rdl | RumunskĂ˝ mrtvĂ˝ tah | 16Ă— | assets/exercises/rdl.jpg?v=50 | Romanian Deadlift | CORRECT | KEEP |
| 29 | 3 | donkey | Donkey Kick | 18/18 | assets/exercises/donkey.jpg?v=50 | Donkey Kick | CORRECT | KEEP |
| 29 | 4 | hydrant | Fire Hydrant | 18/18 | assets/exercises/hydrant.jpg?v=50 | Fire Hydrant | CORRECT | KEEP |
| 29 | 5 | sideleg | UnoĹľovĂˇnĂ­ vleĹľe na boku | 18/18 | assets/exercises/sideleg_main.jpg?v=50 | Side Leg Raise / side lying leg lift | CORRECT | KEEP |
| 29 | 6 | abduction | Bridge Abduction | 20Ă— | assets/exercises/abduction.jpg?v=50 | Bridge Abduction | CORRECT | KEEP |
| 29 | stretch | hamstring_supine | JemnĂ© protaĹľenĂ­ zadnĂ­ strany stehna | 45 s/strana | assets/exercises/spine.jpg?v=50 | Spine Stretch | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 30 | 1 | sideplank_reach | BoÄŤnĂ­ prkno s rotacĂ­ | 12/12 | assets/exercises/sideplank_reach.jpg?v=50 | Side Plank duplicate image, not reach variant | DUPLICATE_MAPPING | NEW_SOURCE_REQUIRED or replace duplicate binary asset |
| 30 | 2 | russian | Russian Twist | 28Ă— stĹ™Ă­davÄ› | assets/exercises/seated_rotation.jpg?v=50 | Seated Rotation / Russian Twist family | SHARED_PLACEHOLDER | NEW_SOURCE_REQUIRED or MANUAL_REVIEW if placeholder is intentionally approved |
| 30 | 3 | bicycle | Bicycle Crunch | 28Ă— stĹ™Ă­davÄ› | assets/exercises/revcrunch.jpg?v=50 | Reverse Crunch | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |
| 30 | 4 | legraises | Leg Raises | 14Ă— | assets/exercises/hollow.jpg?v=50 | Hollow Hold | SHARED_PLACEHOLDER | NEW_SOURCE_REQUIRED or MANUAL_REVIEW if placeholder is intentionally approved |
| 30 | 5 | scissors | Scissors | 28Ă— stĹ™Ă­davÄ› | assets/exercises/toetap_slow.jpg?v=50 | Toe Taps duplicate image, not Scissors | DUPLICATE_MAPPING | NEW_SOURCE_REQUIRED or replace duplicate binary asset |
| 30 | stretch | supine_twist | Rotace pĂˇteĹ™e vleĹľe | 40 s/strana | assets/exercises/thread.jpg?v=50 | Thread the Needle | WRONG_EXERCISE_IMAGE | NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists |

## Unique Exercise Summary

| Exercise ID | Display Name | Used on Days | Current Image | Correct Image Available | Recommended Action |
|---|---|---|---|---|---|
| abduction | Bridge Abduction | 5, 12, 15, 26, 29 | assets/exercises/abduction.jpg?v=50 | Folder exists, no approved image/card files found | KEEP |
| bicycle | Bicycle Crunch | 9, 23, 30 | assets/exercises/revcrunch.jpg?v=50 | Folder exists, no approved image/card files found | REMAP_EXISTING_ASSET or NEW_SOURCE_REQUIRED |
| bird | Bird Dog | 3, 10, 17, 24 | assets/exercises/bird.jpg?v=50 | Complete asset set exists in Pilates Assets | KEEP |
| catcow | Cat-Cow | 4, 18, 25 | assets/exercises/catcow.jpg?v=50 | Partial asset folder exists: README.txt | KEEP |
| chest_opener | Chest Opener | 3, 10, 24 | assets/exercises/row.jpg?v=50 | Folder exists, no approved image/card files found | NEW_SOURCE_REQUIRED |
| chest_press | Tlaky s ÄŤinkami vleĹľe | 6, 10, 20, 24 | (empty) | Folder exists, no approved image/card files found | NEW_SOURCE_REQUIRED |
| clam | Clamshell | 1, 12, 19 | assets/exercises/clam.jpg?v=50 | Complete asset set exists in Pilates Assets | KEEP |
| deadbug | Dead Bug | 2, 9, 13 | assets/exercises/deadbug.jpg?v=50 | Complete asset set exists in Pilates Assets | KEEP |
| donkey | Donkey Kick | 5, 12, 15, 19, 29 | assets/exercises/donkey.jpg?v=50 | Folder exists, no approved image/card files found | KEEP |
| figure_four | ProtaĹľenĂ­ hĂ˝ĹľdĂ­ vleĹľe | 1, 8, 15, 19, 26 | assets/exercises/hip.jpg?v=50 | Folder exists, no approved image/card files found | REMAP_EXISTING_ASSET or NEW_SOURCE_REQUIRED |
| frog | Frog Pumps | 5, 8, 12, 26 | assets/exercises/frog.jpg?v=50 | Folder exists, no approved image/card files found | KEEP |
| hamstring_supine | JemnĂ© protaĹľenĂ­ zadnĂ­ strany stehna | 5, 12, 22, 29 | assets/exercises/spine.jpg?v=50 | Folder exists, no approved image/card files found | NEW_SOURCE_REQUIRED |
| heeltaps | Heel Taps | 9 | assets/exercises/toetap.jpg?v=50 | Folder exists, no approved image/card files found | NEW_SOURCE_REQUIRED |
| hip | Glute Bridge | 1, 6, 19, 22, 27 | assets/exercises/hip.jpg?v=50 | Complete asset set exists in Pilates Assets | KEEP |
| hip_march | Glute Bridge March | 8, 13, 15 | assets/exercises/hip_march.jpg?v=50 | Folder exists, no approved image/card files found | KEEP |
| hollow | Hollow Hold | 2, 27 | assets/exercises/hollow.jpg?v=50 | Folder exists, no approved image/card files found | KEEP |
| hundred | The Hundred | 11, 23 | assets/exercises/hollow.jpg?v=50 | Folder exists, no approved image/card files found | NEW_SOURCE_REQUIRED |
| hydrant | Fire Hydrant | 1, 5, 22, 29 | assets/exercises/hydrant.jpg?v=50 | Complete asset set exists in Pilates Assets | KEEP |
| inner_thigh | Inner Thigh Lift | 1, 15, 19, 22 | assets/exercises/sideleg_main.jpg?v=50 | Folder exists, no approved image/card files found | NEW_SOURCE_REQUIRED |
| legraises | Leg Raises | 16, 30 | assets/exercises/hollow.jpg?v=50 | Folder exists, no approved image/card files found | NEW_SOURCE_REQUIRED |
| mermaid | Mermaid Stretch | 4, 18, 25 | assets/exercises/mermaid.jpg?v=50 | Folder exists, no approved image/card files found | KEEP |
| plank | Forearm Plank | 3, 6, 17 | assets/exercises/plank.jpg?v=50 | Folder exists, no approved image/card files found | KEEP |
| plie | PliĂ© Squat | 5, 15, 19, 26, 29 | assets/exercises/plie.jpg?v=50 | Folder exists, no approved image/card files found | KEEP |
| press | Shoulder Press | 3, 10, 13, 17, 24, 27 | assets/exercises/press.jpg?v=50 | Folder exists, no approved image/card files found | KEEP |
| rainbow | Rainbow Leg Raise | 5, 8, 19, 26 | assets/exercises/rainbow.jpg?v=50 | Partial asset folder exists: README.txt | KEEP |
| raise | Lateral Raise | 3, 13, 17, 20, 24 | assets/exercises/raise.jpg?v=50 | Folder exists, no approved image/card files found | KEEP |
| rdl | RumunskĂ˝ mrtvĂ˝ tah | 1, 6, 8, 13, 22, 29 | assets/exercises/rdl.jpg?v=50 | Complete asset set exists in Pilates Assets | KEEP |
| revcrunch | Reverse Crunch | 2, 16 | assets/exercises/revcrunch.jpg?v=50 | Partial asset folder exists: reverse_crunch_hero_v01.png | KEEP |
| rollup | Roll Up | 4, 11, 18, 25 | assets/exercises/rollup.jpg?v=50 | Folder exists, no approved image/card files found | KEEP |
| row | Bent Over Row | 3, 6, 10, 17, 24, 27 | assets/exercises/row.jpg?v=50 | Folder exists, no approved image/card files found | KEEP |
| russian | Russian Twist | 16, 23, 30 | assets/exercises/seated_rotation.jpg?v=50 | Folder exists, no approved image/card files found | NEW_SOURCE_REQUIRED |
| scissors | Scissors | 11, 30 | assets/exercises/toetap_slow.jpg?v=50 | Folder exists, no approved image/card files found | NEW_SOURCE_REQUIRED |
| sidekick | Side Kick | 4, 8, 18, 22, 26 | assets/exercises/sidekick.jpg?v=50 | Folder exists, no approved image/card files found | KEEP |
| sideleg | UnoĹľovĂˇnĂ­ vleĹľe na boku | 1, 12, 15, 26, 29 | assets/exercises/sideleg_main.jpg?v=50 | Folder exists, no approved image/card files found | KEEP |
| sideplank | Side Plank | 2, 23 | assets/exercises/sideplank.jpg?v=50 | Folder exists, no approved image/card files found | KEEP |
| sideplank_reach | BoÄŤnĂ­ prkno s rotacĂ­ | 9, 20, 27, 30 | assets/exercises/sideplank_reach.jpg?v=50 | Folder exists, no approved image/card files found | NEW_SOURCE_REQUIRED |
| sphinx | Sphinx Stretch | 9, 16, 23 | assets/exercises/swan.jpg?v=50 | Folder exists, no approved image/card files found | NEW_SOURCE_REQUIRED |
| spine | Spine Stretch | 4, 18 | assets/exercises/spine.jpg?v=50 | Folder exists, no approved image/card files found | KEEP |
| standing_oblique | Standing Oblique Crunch | 9, 16, 23 | assets/exercises/mermaid.jpg?v=50 | Folder exists, no approved image/card files found | NEW_SOURCE_REQUIRED |
| standing_side_bend | Standing Side Bend | 11, 20, 25 | assets/exercises/mermaid.jpg?v=50 | Folder exists, no approved image/card files found | NEW_SOURCE_REQUIRED |
| supine_twist | Rotace pĂˇteĹ™e vleĹľe | 2, 6, 11, 13, 20, 25, 27, 30 | assets/exercises/thread.jpg?v=50 | Folder exists, no approved image/card files found | NEW_SOURCE_REQUIRED |
| swan | Swan Prep | 4, 20, 25 | assets/exercises/swan.jpg?v=50 | Folder exists, no approved image/card files found | NEW_SOURCE_REQUIRED |
| swimming | Swimming | 10, 11, 18, 25 | (empty) | Folder exists, no approved image/card files found | NEW_SOURCE_REQUIRED |
| tap | Plank Shoulder Taps | 6, 13, 27 | assets/exercises/tap.jpg?v=50 | Folder exists, no approved image/card files found | KEEP |
| thread | Thread the Needle | 17 | assets/exercises/thread.jpg?v=50 | Folder exists, no approved image/card files found | KEEP |
| toetap | Toe Taps | 2, 16 | assets/exercises/toetap.jpg?v=50 | Folder exists, no approved image/card files found | KEEP |
| triceps_kickback | Triceps Kickback | 3, 10, 17, 24 | (empty) | Folder exists, no approved image/card files found | NEW_SOURCE_REQUIRED |
| wall | Wall Sit | 8, 12, 20, 22 | assets/exercises/wall.jpg?v=50 | Folder exists, no approved image/card files found | NEW_SOURCE_REQUIRED |

## Shared Image Mapping Audit

| Image Path | Image Actually Shows | Exercise IDs Sharing It | Shared Mapping Type |
|---|---|---|---|
| (empty image path) | No image path; no-image fallback | chest_press, swimming, triceps_kickback | INCORRECT_SHARED_IMAGE |
| assets/exercises/hip.jpg?v=50 | Glute Bridge | figure_four, hip | INCORRECT_SHARED_IMAGE |
| assets/exercises/hollow.jpg?v=50 | Hollow Hold | hollow, hundred, legraises | INCORRECT_SHARED_IMAGE |
| assets/exercises/mermaid.jpg?v=50 | Mermaid Stretch | mermaid, standing_oblique, standing_side_bend | INCORRECT_SHARED_IMAGE |
| assets/exercises/revcrunch.jpg?v=50 | Reverse Crunch | bicycle, revcrunch | INCORRECT_SHARED_IMAGE |
| assets/exercises/row.jpg?v=50 | Bent Over Row | chest_opener, row | INCORRECT_SHARED_IMAGE |
| assets/exercises/sideleg_main.jpg?v=50 | Side Leg Raise / side lying leg lift | inner_thigh, sideleg | INCORRECT_SHARED_IMAGE |
| assets/exercises/spine.jpg?v=50 | Spine Stretch | hamstring_supine, spine | INCORRECT_SHARED_IMAGE |
| assets/exercises/swan.jpg?v=50 | Hollow Hold duplicate image, not Swan/Sphinx | sphinx, swan | INCORRECT_SHARED_IMAGE |
| assets/exercises/thread.jpg?v=50 | Thread the Needle | supine_twist, thread | INCORRECT_SHARED_IMAGE |
| assets/exercises/toetap.jpg?v=50 | Toe Taps | heeltaps, toetap | INCORRECT_SHARED_IMAGE |

## Duplicate Binary Image Files in `assets/exercises`

- bird.jpg, bird_hold.jpg
- clam.jpg, clam_pulse.jpg
- deadbug.jpg, deadbug_hold.jpg
- glute_bridge_card.jpg, hip_real_card.jpg
- glute_bridge_hero.jpg, hip_real_hero.jpg
- glute_bridge_step1.jpg, hip_real_step1.jpg
- glute_bridge_step2.jpg, hip_real_step2.jpg
- glute_bridge_step3.jpg, hip_real_step3.jpg
- hollow.jpg, swan.jpg, swan_hold.jpg
- plank.jpg, plank_breath.jpg
- press.jpg, press_slow.jpg
- rdl.jpg, rdl_slow.jpg
- rdl_step1.jpg, rdl_step2.jpg, rdl_step3.jpg
- row.jpg, row_pause.jpg
- sidekick.jpg, sidekick_pulse.jpg
- sideplank.jpg, sideplank_reach.jpg
- spine.jpg, wall.jpg
- toetap.jpg, toetap_slow.jpg

## Problem Lists

### All non-CORRECT exercise IDs used from day 1 to day 30
- bicycle (Bicycle Crunch) - WRONG_EXERCISE_IMAGE - NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists
- chest_opener (Chest Opener) - WRONG_EXERCISE_IMAGE - NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists
- chest_press (Tlaky s ÄŤinkami vleĹľe) - MISSING_IMAGE - NEW_SOURCE_REQUIRED; no-image fallback currently active
- figure_four (ProtaĹľenĂ­ hĂ˝ĹľdĂ­ vleĹľe) - WRONG_EXERCISE_IMAGE - NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists
- hamstring_supine (JemnĂ© protaĹľenĂ­ zadnĂ­ strany stehna) - WRONG_EXERCISE_IMAGE - NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists
- heeltaps (Heel Taps) - SHARED_PLACEHOLDER - NEW_SOURCE_REQUIRED or MANUAL_REVIEW if placeholder is intentionally approved
- hundred (The Hundred) - SHARED_PLACEHOLDER - NEW_SOURCE_REQUIRED or MANUAL_REVIEW if placeholder is intentionally approved
- inner_thigh (Inner Thigh Lift) - WRONG_EXERCISE_IMAGE - NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists
- legraises (Leg Raises) - SHARED_PLACEHOLDER - NEW_SOURCE_REQUIRED or MANUAL_REVIEW if placeholder is intentionally approved
- russian (Russian Twist) - SHARED_PLACEHOLDER - NEW_SOURCE_REQUIRED or MANUAL_REVIEW if placeholder is intentionally approved
- scissors (Scissors) - DUPLICATE_MAPPING - NEW_SOURCE_REQUIRED or replace duplicate binary asset
- sideplank_reach (BoÄŤnĂ­ prkno s rotacĂ­) - DUPLICATE_MAPPING - NEW_SOURCE_REQUIRED or replace duplicate binary asset
- sphinx (Sphinx Stretch) - WRONG_EXERCISE_IMAGE - NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists
- standing_oblique (Standing Oblique Crunch) - WRONG_EXERCISE_IMAGE - NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists
- standing_side_bend (Standing Side Bend) - WRONG_EXERCISE_IMAGE - NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists
- supine_twist (Rotace pĂˇteĹ™e vleĹľe) - WRONG_EXERCISE_IMAGE - NEW_SOURCE_REQUIRED or REMAP_EXISTING_ASSET if correct approved asset exists
- swan (Swan Prep) - DUPLICATE_MAPPING - NEW_SOURCE_REQUIRED or replace duplicate binary asset
- swimming (Swimming) - MISSING_IMAGE - NEW_SOURCE_REQUIRED; no-image fallback currently active
- triceps_kickback (Triceps Kickback) - MISSING_IMAGE - NEW_SOURCE_REQUIRED; no-image fallback currently active
- wall (Wall Sit) - DUPLICATE_MAPPING - NEW_SOURCE_REQUIRED or replace duplicate binary asset

### Exercise IDs without their own correct app image
- bicycle (Bicycle Crunch) - current image: assets/exercises/revcrunch.jpg?v=50
- chest_opener (Chest Opener) - current image: assets/exercises/row.jpg?v=50
- chest_press (Tlaky s ÄŤinkami vleĹľe) - current image: (empty)
- figure_four (ProtaĹľenĂ­ hĂ˝ĹľdĂ­ vleĹľe) - current image: assets/exercises/hip.jpg?v=50
- hamstring_supine (JemnĂ© protaĹľenĂ­ zadnĂ­ strany stehna) - current image: assets/exercises/spine.jpg?v=50
- heeltaps (Heel Taps) - current image: assets/exercises/toetap.jpg?v=50
- hundred (The Hundred) - current image: assets/exercises/hollow.jpg?v=50
- inner_thigh (Inner Thigh Lift) - current image: assets/exercises/sideleg_main.jpg?v=50
- legraises (Leg Raises) - current image: assets/exercises/hollow.jpg?v=50
- russian (Russian Twist) - current image: assets/exercises/seated_rotation.jpg?v=50
- scissors (Scissors) - current image: assets/exercises/toetap_slow.jpg?v=50
- sideplank_reach (BoÄŤnĂ­ prkno s rotacĂ­) - current image: assets/exercises/sideplank_reach.jpg?v=50
- sphinx (Sphinx Stretch) - current image: assets/exercises/swan.jpg?v=50
- standing_oblique (Standing Oblique Crunch) - current image: assets/exercises/mermaid.jpg?v=50
- standing_side_bend (Standing Side Bend) - current image: assets/exercises/mermaid.jpg?v=50
- supine_twist (Rotace pĂˇteĹ™e vleĹľe) - current image: assets/exercises/thread.jpg?v=50
- swan (Swan Prep) - current image: assets/exercises/swan.jpg?v=50
- swimming (Swimming) - current image: (empty)
- triceps_kickback (Triceps Kickback) - current image: (empty)
- wall (Wall Sit) - current image: assets/exercises/wall.jpg?v=50

### Incorrectly shared image mappings
- (empty image path): chest_press, swimming, triceps_kickback -> No image path; no-image fallback
- assets/exercises/hip.jpg?v=50: figure_four, hip -> Glute Bridge
- assets/exercises/hollow.jpg?v=50: hollow, hundred, legraises -> Hollow Hold
- assets/exercises/mermaid.jpg?v=50: mermaid, standing_oblique, standing_side_bend -> Mermaid Stretch
- assets/exercises/revcrunch.jpg?v=50: bicycle, revcrunch -> Reverse Crunch
- assets/exercises/row.jpg?v=50: chest_opener, row -> Bent Over Row
- assets/exercises/sideleg_main.jpg?v=50: inner_thigh, sideleg -> Side Leg Raise / side lying leg lift
- assets/exercises/spine.jpg?v=50: hamstring_supine, spine -> Spine Stretch
- assets/exercises/swan.jpg?v=50: sphinx, swan -> Hollow Hold duplicate image, not Swan/Sphinx
- assets/exercises/thread.jpg?v=50: supine_twist, thread -> Thread the Needle
- assets/exercises/toetap.jpg?v=50: heeltaps, toetap -> Toe Taps

## Notes

- `Standing Side Bend` currently maps to `assets/exercises/mermaid.jpg?v=50`, which visibly represents Mermaid Stretch.
- `Standing Oblique Crunch` also maps to the Mermaid image.
- `Swimming`, `Chest Press`, and `Triceps Kickback` rely on the no-image fallback right now, but still count as missing app images for this audit.
- Several filenames with distinct names are binary-identical to another exercise image, e.g. `sideplank_reach.jpg` equals `sideplank.jpg`, `wall.jpg` equals `spine.jpg`, and `swan.jpg` equals `hollow.jpg`.
