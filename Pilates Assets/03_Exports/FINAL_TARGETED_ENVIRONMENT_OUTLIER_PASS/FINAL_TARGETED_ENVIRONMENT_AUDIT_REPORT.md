# MOOVKA — Final Targeted Environment Outlier Pass

- Kontrolovaných SOURCE: **23**
- PASS: **13**
- OUTLIER: **10**
- Produkční SOURCE změněny: **NE**
- Pixely změněné mimo WALL/FLOOR masky: **0**

| Exercise | Frame | MASTER match | Intra-exercise consistency | Result | Reason |
|---|---|---|---|---|---|
| `dumbbell_pullover` | START/END | NO — WALL TOO COOL/BLUE | NO — wall temperature differs | **OUTLIER** | WALL TOO COOL/BLUE |
| `dumbbell_pullover` | HERO | YES | YES | **PASS** | Matches MASTER and exercise frames |
| `rdl` | START/END | YES | YES | **PASS** | Matches MASTER and exercise frames |
| `rdl` | HERO | NO — WALL TOO COOL/BLUE | NO — wall temperature differs | **OUTLIER** | WALL TOO COOL/BLUE |
| `standing_oblique` | START | YES | YES | **PASS** | Matches MASTER and exercise frames |
| `standing_oblique` | HERO | YES | YES | **PASS** | Matches MASTER and exercise frames |
| `standing_oblique` | END | YES | YES | **PASS** | Matches MASTER and exercise frames |
| `standing_side_bend` | START | YES | YES | **PASS** | Matches MASTER and exercise frames |
| `standing_side_bend` | HERO | YES | YES | **PASS** | Matches MASTER and exercise frames |
| `standing_side_bend` | END | YES | YES | **PASS** | Matches MASTER and exercise frames |
| `swimming` | START/END | NO — WALL TOO COOL/BLUE | NO — wall temperature differs | **OUTLIER** | WALL TOO COOL/BLUE |
| `swimming` | HERO | NO — WALL TOO COOL/BLUE | NO — wall temperature differs | **OUTLIER** | WALL TOO COOL/BLUE |
| `sidekick` | START | NO — WALL TOO COOL/BLUE | NO — wall temperature differs | **OUTLIER** | WALL TOO COOL/BLUE |
| `sidekick` | HERO | YES | YES | **PASS** | Matches MASTER and exercise frames |
| `sidekick` | END | YES | YES | **PASS** | Matches MASTER and exercise frames |
| `sideleg` | START/END | NO — WALL TOO COOL/BLUE | NO — wall temperature differs | **OUTLIER** | WALL TOO COOL/BLUE |
| `sideleg` | HERO | YES | YES | **PASS** | Matches MASTER and exercise frames |
| `raise` | START/END | YES | YES | **PASS** | Matches MASTER and exercise frames |
| `raise` | HERO | YES | YES | **PASS** | Matches MASTER and exercise frames |
| `row` | START/END | NO — WALL TOO COOL/BLUE | NO — wall temperature differs | **OUTLIER** | WALL TOO COOL/BLUE |
| `row` | HERO | NO — WALL TOO COOL/BLUE | NO — wall temperature differs | **OUTLIER** | WALL TOO COOL/BLUE |
| `chest_fly` | START/END | NO — WALL TOO COOL/BLUE | NO — wall temperature differs | **OUTLIER** | WALL TOO COOL/BLUE |
| `chest_fly` | HERO | NO — WALL TOO COOL/BLUE | NO — wall temperature differs | **OUTLIER** | WALL TOO COOL/BLUE |

## OUTLIER candidates

| Exercise | Frame | BEFORE total | AFTER total | Candidate |
|---|---|---:|---:|---|
| `dumbbell_pullover` | START/END | 12.35 | 9.53 | `Pilates Assets/03_Exports/FINAL_TARGETED_ENVIRONMENT_OUTLIER_PASS/CANDIDATES/dumbbell_pullover/Dumbbell Pullover start.png` |
| `rdl` | HERO | 11.34 | 9.39 | `Pilates Assets/03_Exports/FINAL_TARGETED_ENVIRONMENT_OUTLIER_PASS/CANDIDATES/rdl/romanian_deadlift_hero.png` |
| `swimming` | START/END | 9.16 | 8.14 | `Pilates Assets/03_Exports/FINAL_TARGETED_ENVIRONMENT_OUTLIER_PASS/CANDIDATES/swimming/swimming_start.png` |
| `swimming` | HERO | 6.55 | 4.86 | `Pilates Assets/03_Exports/FINAL_TARGETED_ENVIRONMENT_OUTLIER_PASS/CANDIDATES/swimming/swimming_hero.png` |
| `sidekick` | START | 8.90 | 6.72 | `Pilates Assets/03_Exports/FINAL_TARGETED_ENVIRONMENT_OUTLIER_PASS/CANDIDATES/sidekick/side_kick_start.png` |
| `sideleg` | START/END | 11.82 | 8.28 | `Pilates Assets/03_Exports/FINAL_TARGETED_ENVIRONMENT_OUTLIER_PASS/CANDIDATES/sideleg/side_leg_start.png` |
| `row` | START/END | 9.89 | 7.31 | `Pilates Assets/03_Exports/FINAL_TARGETED_ENVIRONMENT_OUTLIER_PASS/CANDIDATES/row/bent_over_row_start.png` |
| `row` | HERO | 11.61 | 8.88 | `Pilates Assets/03_Exports/FINAL_TARGETED_ENVIRONMENT_OUTLIER_PASS/CANDIDATES/row/bent_over_row_hero.png` |
| `chest_fly` | START/END | 8.35 | 6.17 | `Pilates Assets/03_Exports/FINAL_TARGETED_ENVIRONMENT_OUTLIER_PASS/CANDIDATES/chest_fly/chest_fly_start.png` |
| `chest_fly` | HERO | 11.50 | 9.06 | `Pilates Assets/03_Exports/FINAL_TARGETED_ENVIRONMENT_OUTLIER_PASS/CANDIDATES/chest_fly/chest_fly_hero.png` |
