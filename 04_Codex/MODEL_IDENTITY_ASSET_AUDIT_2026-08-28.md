# MooVka – audit identity modelky a obličeje aktivních exercise assetů

Datum auditu: 2026-08-28  
Rozsah: pouze aktivně používané fotografické exercise assety; Wall Sit je dle zadání vyloučen.  
Charakter auditu: read-only vizuální posouzení identity modelky, obličeje, postavy, vlasů, očí/pohledu, pleti, outfitu a kontinuity START/HERO. Anatomie cviku, prostředí, rekvizity, kamera a barevnost místnosti nejsou hodnoceny.

## Souhrn

- Aktivních cviků v programu: **42**
- Unikátních aktivních fotografií skutečně vizuálně otevřených: **82**
- **PASS: 40** unikátních fotografií
- **MINOR FIX: 6** unikátních fotografií
- **REGENERATE MODEL ONLY: 12** unikátních fotografií
- **REVIEW: 24** unikátních fotografií
- **MISSING: 2** aktivní cviky bez aktivní fotografické cesty
- `END = START` nebyl započítán jako další unikátní fotografie.
- Sdílený soubor Chest Press HERO / Chest Fly START byl vizuálně otevřen a započítán pouze jednou; v tabulce je uveden v obou aktivních kontextech.

## Použité identity reference

- `00_CHATGPT_START/MASTER/02_REFERENCES/MASTER_MODEL.png`
- `00_CHATGPT_START/MASTER/02_REFERENCES/MASTER_FACE.png`
- Povinná doplňková reference: `C:/Users/Kristy/Documents/GitHub/Pilates/Pilates Assets/02_Exercise_Cards/Heel Taps/heel_taps_start_v02.png`
  - rozměry: **1536 × 1024 px**
  - režim/formát: **RGB PNG**
  - SHA-256: **92500921f8e76aff9af593c63e5580cf2d3f33d4d6ec629d0088a62dabe016ca**
  - v repozitáři byla nalezena právě jedna kopie tohoto přesného názvu; konflikt rozdílných hashů nebyl zjištěn.

Poznámka k poli Oči/pohled: `REVIEW – barvu nelze určit` znamená, že velikost, profil nebo sklon hlavy neumožňují spolehlivě ověřit barvu očí. Samo o sobě to nesnižuje výsledek na REVIEW, pokud ostatní znaky identity zůstávají přesvědčivé.

## Výsledky po jednotlivých aktivních assetech

| Cvik | Fáze | Soubor | Identita | Obličej | Postava | Vlasy | Oči/pohled | Pleť | Outfit | START/HERO kontinuita | Výsledek | Konkrétní odchylka |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Romanian Deadlift | START | `romanian_deadlift_start_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Romanian Deadlift | HERO | `romanian_deadlift_hero_v01.png` | PASS | PASS, skloněný profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Fire Hydrant | START | `fire_hydrant_start_v01.png` | NESHODA | Tvář se od reference liší | Příliš robustní/muskulární | Odlišný dojem linie vlasů | REVIEW – barvu nelze určit | Teplejší a tvrdší kresba | PASS | START/HERO působí vzájemně podobně, ne však jako MASTER | REGENERATE MODEL ONLY | Zachovat pózu; nahradit pouze modelku kvůli identitě a tělesnému typu. |
| Fire Hydrant | HERO | `fire_hydrant_hero_v01.png` | NESHODA | Tvář se od reference liší | Příliš robustní/muskulární | Odlišný dojem linie vlasů | REVIEW – barvu nelze určit | Teplejší a tvrdší kresba | PASS | START/HERO působí vzájemně podobně, ne však jako MASTER | REGENERATE MODEL ONLY | Stejná modelová neshoda jako START; pózu zachovat. |
| Glute Bridge | START | `glute_bridge_start_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Glute Bridge | HERO | `glute_bridge_hero_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Clamshell | START | `clamshell_start_v01.png` | REVIEW | Obličej je příliš malý/boční | PASS | PASS | REVIEW – barvu nelze určit | REVIEW | PASS | Pravděpodobně konzistentní | REVIEW | Z tohoto záběru nelze bezpečně potvrdit shodu obličeje s MASTER. |
| Clamshell | HERO | `clamshell_hero_v01.png` | REVIEW | Obličej je příliš malý/boční | PASS | PASS | REVIEW – barvu nelze určit | REVIEW | PASS | Pravděpodobně konzistentní | REVIEW | Z tohoto záběru nelze bezpečně potvrdit shodu obličeje s MASTER. |
| Inner Thigh Lift | START | `inner_thigh_lift_start_v01.png` | PASS | PASS, boční pohled | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Inner Thigh Lift | HERO | `inner_thigh_lift_hero_v01.png` | PASS | PASS, boční pohled | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Side Leg Lift | START | `side_leg_lift_start_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Side Leg Lift | HERO | `side_leg_lift_hero_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Side Plank | START | `side_plank_start_v01.png` | REVIEW | Obličej malý a částečně odvrácený | PASS | PASS | REVIEW – barvu nelze určit | REVIEW | PASS | Pravděpodobně konzistentní | REVIEW | Nedostatek čitelného detailu obličeje pro spolehlivé potvrzení identity. |
| Side Plank | HERO | `side_plank_hero_v01.png` | REVIEW | Obličej malý a částečně odvrácený | PASS | PASS | REVIEW – barvu nelze určit | REVIEW | PASS | Pravděpodobně konzistentní | REVIEW | Nedostatek čitelného detailu obličeje pro spolehlivé potvrzení identity. |
| Dead Bug | START | `dead_bug_start_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Dead Bug | HERO | `dead_bug_hero_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Toe Tap | START | `toe_tap_start_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Toe Tap | HERO | `toe_tap_hero_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Reverse Crunch | START | `reverse_crunch_start_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Reverse Crunch | HERO | `reverse_crunch_hero_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Hollow Hold | START | `hollow_hold_start_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Hollow Hold | HERO | `hollow_hold_hero_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Bent Over Row | START | `bent_over_row_start_v01.png` | REVIEW | Obličej je malý a ve sklonu | PASS | PASS | REVIEW – barvu nelze určit | REVIEW | PASS | Pravděpodobně konzistentní | REVIEW | Tvář není dostatečně čitelná pro bezpečné potvrzení identity. |
| Bent Over Row | HERO | `bent_over_row_hero_v01.png` | REVIEW | Obličej je malý a ve sklonu | PASS | PASS | REVIEW – barvu nelze určit | REVIEW | PASS | Pravděpodobně konzistentní | REVIEW | Tvář není dostatečně čitelná pro bezpečné potvrzení identity. |
| Shoulder Press | START | `shoulder_press_start_v01.png` | PASS | PASS | PASS | PASS | Přímý pohled do kamery | PASS | PASS | PASS | MINOR FIX | Zachovat modelku; lokálně upravit směr očí mimo kameru. |
| Shoulder Press | HERO | `shoulder_press_hero_v01.png` | PASS | PASS | PASS | PASS | Přímý pohled do kamery | PASS | PASS | PASS | MINOR FIX | Zachovat modelku; lokálně upravit směr očí mimo kameru. |
| Lateral Raise | START | `lateral_raise_start_v01.png` | PASS | PASS | PASS | PASS | Přímý pohled do kamery | PASS | PASS | PASS | MINOR FIX | Zachovat modelku; lokálně upravit směr očí mimo kameru. |
| Lateral Raise | HERO | `lateral_raise_hero_v01.png` | PASS | PASS | PASS | PASS | Přímý pohled do kamery | PASS | PASS | PASS | MINOR FIX | Zachovat modelku; lokálně upravit směr očí mimo kameru. |
| Triceps Kickback | — | — | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | Nelze ověřit | MISSING | Aktivní cvik nemá nalezenou aktivní fotografickou cestu. |
| Chest Fly | START | `chest_press_hero_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Aktivně sdílený soubor s Chest Press HERO; bez zjevné modelové odchylky. |
| Chest Fly | HERO | `chest_fly_hero_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Bird Dog | START | `bird_dog_start_v01.png` | REVIEW | Obličej je ve sklonu a málo čitelný | PASS | PASS | REVIEW – barvu nelze určit | REVIEW | PASS | Pravděpodobně konzistentní | REVIEW | Nelze bezpečně potvrdit přesnou shodu obličeje. |
| Bird Dog | HERO | `bird_dog_hero_v01.png` | REVIEW | Obličej je ve sklonu a málo čitelný | PASS | PASS | REVIEW – barvu nelze určit | REVIEW | PASS | Pravděpodobně konzistentní | REVIEW | Nelze bezpečně potvrdit přesnou shodu obličeje. |
| Forearm Plank | START/HERO | `forearm_plank_start_v01.png` | REVIEW | Obličej je odvrácený a ve sklonu | PASS | PASS | REVIEW – barvu nelze určit | REVIEW | PASS | Jeden aktivní soubor | REVIEW | Identitu nelze z daného úhlu bezpečně potvrdit. |
| Standing Side Bend | START | `standing_side_bend_start_v01.png` | Hraniční shoda | PASS | Nadměrně vyrýsovaná/muskulární | PASS | Přímý pohled do kamery | Tvrdší kresba než MASTER | PASS | START/HERO jsou vzájemně konzistentní | REGENERATE MODEL ONLY | Zachovat pózu; modelka je tělesným typem výrazně svalnatější než MASTER. |
| Standing Side Bend | HERO | `standing_side_bend_hero_v01.png` | Hraniční shoda | PASS | Nadměrně vyrýsovaná/muskulární | PASS | Přímý pohled do kamery | Tvrdší kresba než MASTER | PASS | PASS | REGENERATE MODEL ONLY | Zachovat pózu; nahradit pouze modelku, včetně přirozenějšího pohledu. |
| Standing Side Bend | HERO opposite | `standing_side_bend_hero_opposite_v01.png` | Hraniční shoda | PASS | Nadměrně vyrýsovaná/muskulární | PASS | Přímý pohled do kamery | Tvrdší kresba než MASTER | PASS | PASS | REGENERATE MODEL ONLY | Stejná modelová odchylka jako u druhé strany. |
| Roll Up | START | `roll_up_start_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Roll Up | HERO | `roll_up_hero_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Roll Up | END | `roll_up_end_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Swan Prep | START | `swan_prep_start_v01.png` | REVIEW | Tvář je nízko a ve sklonu | PASS | PASS | REVIEW – barvu nelze určit | REVIEW | PASS | Pravděpodobně konzistentní | REVIEW | Obličej nemá dost detailu pro jisté potvrzení identity. |
| Swan Prep | HERO | `swan_prep_hero_v01.png` | REVIEW | Tvář je nízko a ve sklonu | PASS | PASS | REVIEW – barvu nelze určit | REVIEW | PASS | Pravděpodobně konzistentní | REVIEW | Obličej nemá dost detailu pro jisté potvrzení identity. |
| Plié Squat | START | `plie_squat_start_v01.png` | PASS | PASS | PASS | PASS | Přímý pohled do kamery | PASS | PASS | PASS | MINOR FIX | Zachovat modelku; lokálně upravit směr očí mimo kameru. |
| Plié Squat | HERO | `plie_squat_hero_v01.png` | PASS | PASS | PASS | PASS | Přímý pohled do kamery | PASS | PASS | PASS | MINOR FIX | Zachovat modelku; lokálně upravit směr očí mimo kameru. |
| Donkey Kick | START | `donkey_kick_start_v01.png` | REVIEW | Obličej je skloněný a malý | PASS | PASS | REVIEW – barvu nelze určit | REVIEW | PASS | Pravděpodobně konzistentní | REVIEW | Tvář není dostatečně čitelná pro bezpečné potvrzení identity. |
| Donkey Kick | HERO | `donkey_kick_hero_v01.png` | REVIEW | Obličej je skloněný a malý | PASS | PASS | REVIEW – barvu nelze určit | REVIEW | PASS | Pravděpodobně konzistentní | REVIEW | Tvář není dostatečně čitelná pro bezpečné potvrzení identity. |
| Rainbow Leg Raise | START | `rainbow_leg_raise_start_v01.png` | REVIEW | Obličej není použitelně viditelný | PASS | PASS | REVIEW – nelze určit | REVIEW | PASS | Postava/outfit působí konzistentně | REVIEW | Zadní/odvrácený pohled neumožňuje ověřit identitu tváře. |
| Rainbow Leg Raise | HERO | `rainbow_leg_raise_hero_v01.png` | REVIEW | Obličej není použitelně viditelný | PASS | PASS | REVIEW – nelze určit | REVIEW | PASS | Postava/outfit působí konzistentně | REVIEW | Zadní/odvrácený pohled neumožňuje ověřit identitu tváře. |
| Rainbow Leg Raise | END | `rainbow_leg_raise_end_v01.png` | REVIEW | Obličej není použitelně viditelný | PASS | PASS | REVIEW – nelze určit | REVIEW | PASS | Postava/outfit působí konzistentně | REVIEW | Zadní/odvrácený pohled neumožňuje ověřit identitu tváře. |
| Bridge Abduction | START | `bridge_abduction_start_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Bridge Abduction | HERO | `bridge_abduction_hero_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Frog Pumps | START | `frog_pumps_start_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Frog Pumps | HERO | `frog_pumps_hero_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Chest Press | START | `chest_press_start_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Chest Press | HERO | `chest_press_hero_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky; stejný soubor je Chest Fly START. |
| Plank Shoulder Taps | START | `plank_shoulder_taps_start_v01.png` | REVIEW | Obličej je ve sklonu a příliš malý | PASS | PASS | REVIEW – barvu nelze určit | REVIEW | PASS | Pravděpodobně konzistentní | REVIEW | Nelze bezpečně potvrdit přesnou identitu obličeje. |
| Plank Shoulder Taps | HERO | `plank_shoulder_taps_hero_v01.png` | REVIEW | Obličej je ve sklonu a příliš malý | PASS | PASS | REVIEW – barvu nelze určit | REVIEW | PASS | Pravděpodobně konzistentní | REVIEW | Nelze bezpečně potvrdit přesnou identitu obličeje. |
| Glute Bridge March | START | `glute_bridge_march_start_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Glute Bridge March | HERO | `glute_bridge_march_hero_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Hip March | START | `hip_march_start_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Hip March | HERO | `hip_march_hero_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Standing Oblique Crunch | START | `standing_oblique_start_v01.png` | Hraniční shoda | PASS | Nadměrně vyrýsovaná/muskulární | PASS | Přímý pohled do kamery | Tvrdší kresba než MASTER | PASS | START/HERO jsou vzájemně konzistentní | REGENERATE MODEL ONLY | Zachovat pózu; modelka je tělesným typem výrazně svalnatější než MASTER. |
| Standing Oblique Crunch | HERO | `standing_oblique_hero_v01.png` | Hraniční shoda | PASS | Nadměrně vyrýsovaná/muskulární | PASS | Přímý pohled do kamery | Tvrdší kresba než MASTER | PASS | PASS | REGENERATE MODEL ONLY | Zachovat pózu; nahradit pouze modelku, včetně přirozenějšího pohledu. |
| Standing Oblique Crunch | HERO opposite/END | `standing_oblique_end_v01.png` | Hraniční shoda | PASS | Nadměrně vyrýsovaná/muskulární | PASS | Přímý pohled do kamery | Tvrdší kresba než MASTER | PASS | PASS | REGENERATE MODEL ONLY | Stejná modelová odchylka jako u druhé strany. |
| Side Plank Reach | START | `side_plank_reach_start_v01.png` | REVIEW | Obličej je malý/boční | PASS | PASS | REVIEW – barvu nelze určit | REVIEW | PASS | Postava/outfit jsou konzistentní | REVIEW | Detail tváře nestačí k bezpečnému potvrzení identity. |
| Side Plank Reach | HERO | `side_plank_reach_hero_v01.png` | REVIEW | Obličej je skrytý ve sklonu | PASS | PASS | REVIEW – nelze určit | REVIEW | PASS | Postava/outfit jsou konzistentní | REVIEW | Identitu tváře nelze z HERO ověřit. |
| Side Plank Reach | END | `side_plank_reach_end_v01.png` | REVIEW | Obličej je malý/boční | PASS | PASS | REVIEW – barvu nelze určit | REVIEW | PASS | Postava/outfit jsou konzistentní | REVIEW | Detail tváře nestačí k bezpečnému potvrzení identity. |
| Heel Taps | START | `heel_taps_start_v01.png` | NESHODA vůči MASTER i povinné v02 referenci | Profil a proporce tváře se liší | PASS | Jiná kresba/odstín vlasů | REVIEW – barvu nelze určit | Výrazně tmavší/oranžovější | PASS | START/HERO působí jako stejná odlišná modelka | REGENERATE MODEL ONLY | Aktivní v01 neodpovídá závazné referenci `heel_taps_start_v02.png`; zachovat pózu. |
| Heel Taps | HERO | `heel_taps_hero_v01.png` | NESHODA vůči MASTER i povinné v02 referenci | Profil a proporce tváře se liší | PASS | Jiná kresba/odstín vlasů | Oči zavřené | Výrazně tmavší/oranžovější | PASS | START/HERO působí jako stejná odlišná modelka | REGENERATE MODEL ONLY | Neshodná modelka a plně zavřené oči; pózu zachovat. |
| Bicycle Crunch | START | `bicycle_crunch_start_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Bicycle Crunch | HERO | `bicycle_crunch_hero_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Bicycle Crunch | END | `bicycle_crunch_end_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Knee Push-Up | START | `knee_push_up_start_v01.png` | REVIEW | Obličej je ve sklonu a málo čitelný | PASS | PASS | REVIEW – barvu nelze určit | REVIEW | PASS | Pravděpodobně konzistentní | REVIEW | Tvář nemá dost detailu pro jisté potvrzení identity. |
| Knee Push-Up | HERO | `knee_push_up_hero_v01.png` | REVIEW | Obličej je ve sklonu a málo čitelný | PASS | PASS | REVIEW – barvu nelze určit | REVIEW | PASS | Pravděpodobně konzistentní | REVIEW | Tvář nemá dost detailu pro jisté potvrzení identity. |
| Swimming | — | — | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | Nelze ověřit | MISSING | Aktivní cvik nemá nalezenou aktivní fotografickou cestu. |
| The Hundred | START/HERO fallback | `hollow.jpg` | NESHODA | Jiná tvář/modelka | Odlišný tělesný dojem | Odlišná kresba vlasů | REVIEW – barvu nelze určit | Odlišná | NESHODA – bílé ponožky | Jeden aktivní fallback | REGENERATE MODEL ONLY | Aktivní fallback neodpovídá MASTER identitě ani předepsanému barefoot outfitu. |
| Scissors | START | `scissors_start_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Scissors | HERO | `scissors_hero_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Russian Twist | START | `russian_twist_start_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Russian Twist | HERO | `russian_twist_hero_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Leg Raises | START | `leg_raises_start_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Leg Raises | HERO | `leg_raises_hero_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | PASS | PASS | Bez zjevné modelové odchylky. |
| Spine Stretch | START | `spine_stretch_start_v01.png` | PASS | PASS, profil | PASS | PASS | REVIEW – barvu nelze určit | PASS | PASS | Pravděpodobně konzistentní | PASS | Bez zjevné modelové odchylky. |
| Spine Stretch | HERO | `spine_stretch_hero_v01.png` | REVIEW | Obličej je zakrytý/skloněný | PASS | PASS | REVIEW – nelze určit | REVIEW | PASS | Postava/outfit navazují na START | REVIEW | HERO neumožňuje samostatně ověřit tvář. |
| Thread the Needle | START/HERO fallback | `thread.jpg` | NESHODA | Jiná/nejistá tvář modelky | Odlišný tělesný dojem | Odlišná kresba vlasů | REVIEW – barvu nelze určit | Odlišná | NESHODA – jiný top a bílé ponožky | Jeden aktivní fallback | REGENERATE MODEL ONLY | Aktivní fallback neodpovídá MASTER identitě ani korálovo-antracitovému barefoot outfitu. |

## END = START bez samostatného přepočtu

U cviků, kde aplikace používá totožný soubor pro END a START, nebyla stejná fotografie podruhé započítána ani znovu klasifikována. Hodnocení END je shodné s příslušným START. Samostatně byly uvedeny pouze skutečně odlišné END/opposite fotografie.

## 1. Bez nutnosti zásahu

- Romanian Deadlift
- Glute Bridge
- Inner Thigh Lift
- Side Leg Lift
- Dead Bug
- Toe Tap
- Reverse Crunch
- Hollow Hold
- Chest Fly
- Roll Up
- Bridge Abduction
- Frog Pumps
- Chest Press
- Glute Bridge March
- Hip March
- Bicycle Crunch
- Scissors
- Russian Twist
- Leg Raises
- Spine Stretch START

## 2. Drobné lokální modelové opravy

- Shoulder Press START/HERO – změnit pouze směr očí mimo kameru.
- Lateral Raise START/HERO – změnit pouze směr očí mimo kameru.
- Plié Squat START/HERO – změnit pouze směr očí mimo kameru.

## 3. Nahradit pouze modelku při zachování pózy

- Fire Hydrant START/HERO – neshoda identity a příliš robustní/muskulární tělesný typ.
- Standing Side Bend START/HERO/HERO opposite – tělesný typ je výrazně svalnatější než MASTER, navíc přímý pohled do kamery.
- Standing Oblique Crunch START/HERO/END – stejná odchylka tělesného typu a pohledu.
- Heel Taps aktivní v01 START/HERO – neshoda s MASTER a povinnou referencí `heel_taps_start_v02.png`; HERO má zavřené oči.
- The Hundred `hollow.jpg` – jiná modelka a nevyhovující outfit.
- Thread the Needle `thread.jpg` – jiná/nejistá modelka a nevyhovující outfit.

## 4. Ruční kontrola ve větším detailu

- Clamshell START/HERO
- Side Plank START/HERO
- Bent Over Row START/HERO
- Bird Dog START/HERO
- Forearm Plank
- Swan Prep START/HERO
- Donkey Kick START/HERO
- Rainbow Leg Raise START/HERO/END
- Plank Shoulder Taps START/HERO
- Side Plank Reach START/HERO/END
- Knee Push-Up START/HERO
- Spine Stretch HERO

Důvod REVIEW je výhradně nedostatečně čitelný, odvrácený nebo skloněný obličej. U těchto fotografií nebyla zjištěna jistá modelová neshoda, ale z dostupného záběru ji nelze spolehlivě vyloučit.

## MISSING

- Triceps Kickback – aktivní cvik bez nalezené aktivní fotografické cesty.
- Swimming – aktivní cvik bez nalezené aktivní fotografické cesty.

Tento dokument pouze zaznamenává audit. Nemění schválení assetů, jejich stav, aplikaci, mapování ani projektové souhrnné počty.
