# MOOVKA — MASTER ENVIRONMENT v02 outlier fix candidates

- Kandidátů: **17**
- Simulovaný re-audit: PASS **36**, MINOR **64**, významné OUTLIERY **10**
- Robustní prahy: FLOOR **11.43**, WALL **14.36**, TOTAL **12.65**
- Nově vzniklé outliery mezi původně dobrými SOURCE: **10**
- Opravené kandidáty, které zůstaly outlierem: **0**
- Produkční SOURCE změněny: **NE**
- Změněné pixely mimo FLOOR/WALL masky: **0**

## 17 kandidátů

| Cvik | Fáze | BEFORE FLOOR | BEFORE WALL | BEFORE total | AFTER FLOOR | AFTER WALL | AFTER total |
|---|---|---|---|---:|---|---|---:|
| `chest_press` | HERO | TOO ORANGE | TOO COOL/BLUE | 15.29 | PASS | PASS | 4.65 |
| `sidekick` | END | TOO PINK; TOO PALE | TOO COOL/BLUE | 15.09 | PASS | PASS | 5.13 |
| `triceps_kickback` | HERO | TOO ORANGE | TOO COOL/BLUE | 14.90 | PASS | PASS | 5.71 |
| `triceps_kickback` | START/END | TOO PINK; TOO PALE | TOO COOL/BLUE | 14.48 | PASS | PASS | 4.97 |
| `standing_oblique` | START | TOO COOL; TOO GRAY | TOO COOL/BLUE | 14.32 | PASS | PASS | 3.81 |
| `chest_press` | START/END | TOO ORANGE | TOO COOL/BLUE | 13.47 | PASS | PASS | 4.76 |
| `rollup` | START/END | TOO ORANGE | TOO COOL/BLUE | 13.32 | PASS | PASS | 2.94 |
| `clam` | START/END | TOO COOL | TOO COOL/BLUE | 13.21 | PASS | PASS | 4.96 |
| `raise` | HERO | TOO PINK | TOO COOL/BLUE | 13.12 | PASS | PASS | 5.32 |
| `raise` | START/END | TOO PINK | TOO COOL/BLUE | 12.99 | PASS | PASS | 5.25 |
| `inner_thigh` | HERO | PASS | TOO COOL/BLUE | 12.33 | PASS | PASS | 5.79 |
| `standing_oblique` | HERO | TOO COOL | TOO COOL/BLUE | 11.90 | PASS | PASS | 4.52 |
| `hip` | START/END | PASS | TOO COOL/BLUE | 11.88 | PASS | PASS | 5.87 |
| `hip` | HERO | PASS | TOO COOL/BLUE | 11.31 | PASS | PASS | 5.99 |
| `standing_oblique` | END | PASS | TOO COOL/BLUE | 10.92 | PASS | PASS | 5.21 |
| `hydrant` | HERO | PASS | TOO COOL/BLUE | 10.85 | PASS | PASS | 3.96 |
| `sideplank_reach` | END | TOO ORANGE | TOO COOL/BLUE | 10.78 | PASS | PASS | 4.21 |

## Zbývající významné outliery

| Rank | Cvik | Fáze | FLOOR | WALL | Total | Zdroj simulace |
|---:|---|---|---|---|---:|---|
| 1 | `donkey` | HERO | TOO ORANGE | TOO COOL/BLUE | 12.37 | `Pilates Assets/02_Exercise_Cards/Donkey Kick/donkey_kick_hero.png` |
| 3 | `sidekick` | HERO | TOO PINK; TOO PALE | TOO COOL/BLUE | 12.29 | `Pilates Assets/02_Exercise_Cards/Side Kick/side_kick_hero.png` |
| 4 | `sideleg` | HERO | TOO COOL; TOO PALE; TOO GRAY | TOO COOL/BLUE | 12.07 | `Pilates Assets/02_Exercise_Cards/Side Leg Lift/side_leg_lift_hero.png` |
| 5 | `rdl` | START/END | TOO COOL; TOO PALE | TOO COOL/BLUE | 11.91 | `Pilates Assets/02_Exercise_Cards/Romanian Deadlift/romanian_deadlift_start.png` |
| 7 | `standing_side_bend` | HERO | TOO PINK | TOO COOL/BLUE | 11.67 | `Pilates Assets/02_Exercise_Cards/Standing Side Bend/standing_side_bend_hero.png` |
| 8 | `dumbbell_pullover` | HERO | TOO PALE | TOO COOL/BLUE | 11.65 | `Pilates Assets/02_Exercise_Cards/Dumbbell Pullover/Dumbbell Pullover hero.png` |
| 9 | `standing_side_bend` | START | TOO PINK | TOO COOL/BLUE | 11.62 | `Pilates Assets/02_Exercise_Cards/Standing Side Bend/standing_side_bend_start.png` |
| 14 | `clam` | HERO | TOO COOL; TOO PALE; TOO GRAY | TOO COOL/BLUE | 11.21 | `Pilates Assets/02_Exercise_Cards/Clamshell/clamshell_hero.png` |
| 15 | `standing_side_bend` | END | TOO PINK | TOO COOL/BLUE | 11.18 | `Pilates Assets/02_Exercise_Cards/Standing Side Bend/standing_side_bend_end.png` |
| 22 | `hydrant` | START/END | PASS | TOO COOL/BLUE | 10.12 | `Pilates Assets/02_Exercise_Cards/Fire Hydrant/fire_hydrant_start.png` |
