# MOOVKA — Full-res Environment Outlier Audit

- MASTER: `00_CHATGPT_START/MASTER/02_REFERENCES/ENVIRONMENT/MOOVKA_MASTER_ENVIRONMENT_v02.png`
- MASTER SHA-256: `5009beea26146d61d1f962de2bba59af58a56f30dc7fcb99cbe477986666ea9e`
- Aktivních cviků: **51**
- Analyzovaných produkčních SOURCE: **110**
- Významných outlierů: **17**
- Robustní prahy: FLOOR **11.80**, WALL **16.58**, TOTAL **14.12**.
- Měření: plné 1536×1024 RGB PNG; žádné contact sheety ani náhledy.
- Produkční SOURCE změněny: **NE**.

## Shortlist

| Rank | Exercise | Frame | Source | Floor | Wall | Total | FLOOR diagnóza | WALL diagnóza |
|---:|---|---|---|---:|---:|---:|---|---|
| 1 | `chest_press` | HERO | `Pilates Assets/02_Exercise_Cards/Chest Press/chest_press_hero.png` | 16.84 | 13.41 | 15.29 | TOO ORANGE | TOO COOL/BLUE |
| 2 | `sidekick` | END | `Pilates Assets/02_Exercise_Cards/Side Kick/side_kick_end.png` | 14.83 | 15.41 | 15.09 | TOO PINK; TOO PALE | TOO COOL/BLUE |
| 3 | `triceps_kickback` | HERO | `Pilates Assets/02_Exercise_Cards/Triceps Kickback/triceps_kickback_hero.png` | 14.82 | 15.00 | 14.90 | TOO ORANGE | TOO COOL/BLUE |
| 4 | `triceps_kickback` | START/END | `Pilates Assets/02_Exercise_Cards/Triceps Kickback/triceps_kickback_start.png` | 14.37 | 14.61 | 14.48 | TOO PINK; TOO PALE | TOO COOL/BLUE |
| 5 | `standing_oblique` | START | `Pilates Assets/02_Exercise_Cards/Standing Oblique Crunch/standing_oblique_crunch_start.png` | 9.41 | 20.31 | 14.32 | TOO COOL; TOO GRAY | TOO COOL/BLUE |
| 6 | `chest_press` | START/END | `Pilates Assets/02_Exercise_Cards/Chest Press/chest_press_start.png` | 14.57 | 12.12 | 13.47 | TOO ORANGE | TOO COOL/BLUE |
| 7 | `rollup` | START/END | `Pilates Assets/02_Exercise_Cards/Roll Up/roll_up_start.png` | 12.83 | 13.91 | 13.32 | TOO ORANGE | TOO COOL/BLUE |
| 8 | `clam` | START/END | `Pilates Assets/02_Exercise_Cards/Clamshell/clamshell_start.png` | 9.10 | 18.23 | 13.21 | TOO COOL | TOO COOL/BLUE |
| 9 | `raise` | HERO | `Pilates Assets/02_Exercise_Cards/Lateral Raise/lateral_raise_hero.png` | 12.42 | 13.98 | 13.12 | TOO PINK | TOO COOL/BLUE |
| 10 | `raise` | START/END | `Pilates Assets/02_Exercise_Cards/Lateral Raise/lateral_raise_start.png` | 12.77 | 13.26 | 12.99 | TOO PINK | TOO COOL/BLUE |
| 13 | `inner_thigh` | HERO | `Pilates Assets/02_Exercise_Cards/Inner Thigh Lift/inner_thigh_lift_hero.png` | 8.02 | 17.61 | 12.33 | PASS | TOO COOL/BLUE |
| 17 | `standing_oblique` | HERO | `Pilates Assets/02_Exercise_Cards/Standing Oblique Crunch/standing_oblique_crunch_hero.png` | 7.01 | 17.88 | 11.90 | TOO COOL | TOO COOL/BLUE |
| 18 | `hip` | START/END | `Pilates Assets/02_Exercise_Cards/Glute Bridge/glute_bridge_start.png` | 6.98 | 17.86 | 11.88 | PASS | TOO COOL/BLUE |
| 27 | `hip` | HERO | `Pilates Assets/02_Exercise_Cards/Glute Bridge/glute_bridge_hero.png` | 6.21 | 17.54 | 11.31 | PASS | TOO COOL/BLUE |
| 32 | `standing_oblique` | END | `Pilates Assets/02_Exercise_Cards/Standing Oblique Crunch/standing_oblique_crunch_end.png` | 5.31 | 17.78 | 10.92 | PASS | TOO COOL/BLUE |
| 33 | `hydrant` | HERO | `Pilates Assets/02_Exercise_Cards/Fire Hydrant/fire_hydrant_hero.png` | 4.97 | 18.03 | 10.85 | PASS | TOO COOL/BLUE |
| 34 | `sideplank_reach` | END | `Pilates Assets/02_Exercise_Cards/Side Plank Reach/side_plank_reach_end.png` | 13.65 | 7.28 | 10.78 | TOO ORANGE | TOO COOL/BLUE |

## TOP 5 nejlepších kontrolních SOURCE

| Rank | Exercise | Frame | Source | Floor | Wall | Total | FLOOR diagnóza | WALL diagnóza |
|---:|---|---|---|---:|---:|---:|---|---|
| 110 | `scissors` | HERO | `Pilates Assets/02_Exercise_Cards/Scissors/scissors_hero.png` | 5.38 | 3.64 | 4.60 | PASS | PASS |
| 109 | `heeltaps` | HERO | `Pilates Assets/02_Exercise_Cards/Heel Taps/heel_taps_hero.png` | 3.42 | 6.60 | 4.85 | PASS | TOO COOL/BLUE |
| 108 | `chest_opener` | START/END | `Pilates Assets/02_Exercise_Cards/Chest Opener/chest_opener_start.png` | 4.31 | 5.57 | 4.88 | PASS | PASS |
| 107 | `knee_pushup` | START/END | `Pilates Assets/02_Exercise_Cards/Knee Push-Up/knee_push_up_start.png` | 5.43 | 4.36 | 4.95 | PASS | PASS |
| 106 | `revcrunch` | START/END | `Pilates Assets/02_Exercise_Cards/Reverse Crunch/reverse_crunch_start.png` | 5.00 | 5.17 | 5.08 | PASS | PASS |

## Metoda

- FLOOR a WALL jsou maskované odděleně v plném rozlišení.
- Závěs/žaluzie, soklová lišta, podložka, modelka, oblečení, pomůcky a tmavé stíny nejsou součástí měření.
- Skóre kombinuje robustní mediány Lab, percentilový rozsah světlosti, chromatičnost a lokální kontrast/gradient.
- MASTER určuje materiálový a barevný charakter, nikoli požadavek na pixelově identické RGB.
