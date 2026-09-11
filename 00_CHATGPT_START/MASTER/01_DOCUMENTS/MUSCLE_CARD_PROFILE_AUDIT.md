# MOOVKA – MUSCLE CARD PROFILE AUDIT

Status: AUTHORITATIVE  
Datum: 2026-09-11  
Aktivní cviky: 51

## Pravidla

- PRIMARY = hlavní cílová oblast.
- SECONDARY = významná pomocná/stabilizační oblast, kterou má smysl uživatelce zobrazit.
- Nezobrazovat každý technicky aktivní sval.
- U stretch/mobility znamená zvýraznění protahovanou/mobilizovanou oblast.
- Stejný PRIMARY + SECONDARY profil může používat jeden shared PNG.
- Odlišný profil nesmí být násilně sloučen jen kvůli reuse.
- `—` = bez SECONDARY.
- Tento soubor je jediný zdroj pravdy pro anatomický profil Muscle Cards.
- `app.js` ani legacy Muscle Cards nejsou anatomická autorita.

## Taxonomie

- A01 = Core / přímé břišní
- A02 = Šikmé břišní
- A03 = Flexory kyčle
- A04 = Hrudník
- A05 = Ramena
- A06 = Biceps
- A07 = Triceps
- A08 = Lopatková oblast
- A09 = Široký sval zad
- A10 = Vzpřimovače páteře
- A11 = Hýždě / gluteus maximus
- A12 = Boční hýždě / gluteus medius-minimus
- A13 = Kvadricepsy
- A14 = Hamstringy
- A15 = Adduktory
- A16 = Lýtka

## Finální audit

| ID | PRIMARY | SECONDARY |
|---|---|---|
| abduction | A11 + A12 | A01 |
| bicycle | A01 + A02 | A03 |
| bird | A01 | A10 + A11 |
| catcow | A10 | A04 |
| chest_fly | A04 | A05 |
| chest_opener | A04 | A05 |
| chest_press | A04 | A05 + A07 |
| childs_pose | A09 + A10 | A11 |
| clam | A12 | A01 |
| deadbug | A01 | A03 |
| donkey | A11 | A14 + A01 |
| dumbbell_pullover | A04 + A09 | A07 |
| figure_four | A11 + A12 | — |
| frog | A11 | A01 |
| glute_bridge_march | A11 | A14 + A01 |
| hamstring_supine | A14 | — |
| heeltaps | A02 | A01 |
| hip | A11 | A14 + A01 |
| hip_march | A01 | A03 |
| hollow | A01 | A03 |
| hundred | A01 | A02 + A03 |
| hydrant | A12 | A01 + A02 |
| inner_thigh | A15 | A01 |
| knee_pushup | A04 | A05 + A07 |
| legraises | A01 | A03 |
| mermaid | A02 + A09 | — |
| plank | A01 | A05 |
| plie | A11 + A13 + A15 | A01 |
| press | A05 | A07 |
| rainbow | A11 + A12 | A01 |
| raise | A05 | — |
| rdl | A11 + A14 | A10 + A15 |
| revcrunch | A01 | A02 |
| rollup | A01 | — |
| row | A08 + A09 | A05 + A06 |
| russian | A02 | A01 |
| scissors | A01 | A03 |
| sidekick | A12 | A11 + A03 + A02 |
| sideleg | A12 | A01 |
| sideplank | A02 | A05 + A12 |
| sideplank_reach | A02 | A05 + A12 |
| sphinx | A01 | A04 |
| spine | A10 + A14 | — |
| standing_oblique | A02 | — |
| standing_side_bend | A02 | — |
| supine_twist | A02 + A11 | A04 |
| swimming | A10 + A11 + A14 | A05 |
| tap | A01 + A02 | A05 |
| thread | A08 + A09 | A10 |
| toetap | A01 | A03 |
| triceps_kickback | A07 | — |

## Runtime poznámka

Při ověření dne 2026-09-11 obsahoval aktuální `data.js` navíc ID `swan`, které v dodané autoritativní tabulce není. Jeho anatomický profil ani runtime Muscle Card se bez autoritativního doplnění nemění.
