# MODEL CONSISTENCY AUDIT

AUDIT ONLY ? NO FILES CHANGED

Datum auditu: 2026-07-15

## Pou?it? reference

- Po?adovan? reference `Pilates Assets/01_Master_Reference/MODEL_MASTER.png`: nenalezena.
- Hlavn? pou?it? identity reference: `Pilates Assets\01_Master_Reference\MODEL_MASTER.png.png`
- Dal?? soubory v `01_Master_Reference`:
  - `Pilates Assets\01_Master_Reference\ENVIRONMENT_MASTER.png` ? scene/environment reference candidate, not used as identity master
  - `Pilates Assets\01_Master_Reference\MODEL_MASTER.png.png` ? main identity reference
  - `Pilates Assets\01_Master_Reference\STUDIO MASTER.png` ? scene/environment reference candidate, not used as identity master

## Rozsah auditu

- Auditov?no pouze source START / HERO / END v `Pilates Assets/02_Exercise_Cards/`.
- Nehodnoceny Guide Card, Step by Step, exporty, preview, backupy ani archiv.
- APPROVED status nebyl br?n jako automatick? shoda modelky.

## Souhrn

- Po?et auditovan?ch SOURCE souboru: 17
- Po?et unik?tn?ch SOURCE z?znamu v auditu: 17
- Pozn?mka: `side leg.png` byl doplnen jako samostatny SOURCE, protoze neni byte-identicky se `side_leg_start_v01.png`.
- A: 4
- B: 6
- C: 5
- D: 2

## C / D n?lezy

| PRIORITA | CVIK | SOURCE | SOUBOR | HODNOCEN? | HLAVN? ODCHYLKA |
|---|---|---|---|---|---|
| 1 | Fire Hydrant | HERO | `Pilates Assets\02_Exercise_Cards\Fire Hydrant\fire_hydrant_hero_v01.png` | D | Model reads as a different, more athletic woman: darker/copper hair, stronger shoulders/deltoids/upper arms and upper back. |
| 2 | Fire Hydrant | START | `Pilates Assets\02_Exercise_Cards\Fire Hydrant\fire_hydrant_start_v01.png` | D | Same high-priority model mismatch as HERO: dark/copper hair plus visibly stronger athletic body type. |
| 3 | Bird Dog | START | `Pilates Assets\02_Exercise_Cards\Bird Dog\bird_dog_start_v01.png` | C | Noticeable hair drift: dark brunette/copper-orange impression remains; body is acceptable for weight-bearing pose. |
| 4 | Side Leg Raise | START | `Pilates Assets\02_Exercise_Cards\Side Leg Raise\side_leg_start_v01.png` | C | Noticeable drift in hair value/color and slightly stronger side-body/arm impression. |
| 5 | Side Leg Raise | HERO | `Pilates Assets\02_Exercise_Cards\Side Leg Raise\side_leg_raise_hero_v01.png` | C | Noticeable drift: hair darker and body impression a little more athletic than MODEL_MASTER. |
| 6 | Toe Tap | HERO | `Pilates Assets\02_Exercise_Cards\Toe Tap\toe_tap_hero.png` | C | Model identity is acceptable but noticeably drifted: hair/face impression and saturation differ from MODEL_MASTER. |
| 7 | Side Leg Raise | START alias | `Pilates Assets\02_Exercise_Cards\Side Leg Raise\side leg.png` | C | Separate non-byte-identical SOURCE file. Same dimensions as `side_leg_start_v01.png`, but SHA-256 and pixels differ; visual finding is treated as same category as Side Leg START, without changing original Side Leg START rating. |

## TOP 10 nejhor??ch obr?zk? z hlediska identity modelky

### 1. Fire Hydrant ? HERO
Soubor: `Pilates Assets\02_Exercise_Cards\Fire Hydrant\fire_hydrant_hero_v01.png`
Hodnocen?: D
IDENTITA: Face/overall impression drifts from MODEL_MASTER; model appears more fitness/athletic.
VLASY: Too dark with copper-orange cast, not mid-light dark blonde/light brown.
POSTAVA: Strong mismatch: shoulders, deltoids, upper arms and upper back read more muscular than master.
OUTFIT: Coral top and leggings broadly similar, but identity mismatch dominates.
PRO? JE TO PROBL?M: Model reads as a different, more athletic woman: darker/copper hair, stronger shoulders/deltoids/upper arms and upper back.
DOPORU?EN?: REGENERATE

### 2. Fire Hydrant ? START
Soubor: `Pilates Assets\02_Exercise_Cards\Fire Hydrant\fire_hydrant_start_v01.png`
Hodnocen?: D
IDENTITA: Overall body/face impression does not convincingly read as the same concrete woman.
VLASY: Dark brunette/copper impression; outside target hair range.
POSTAVA: Strong mismatch in shoulders, deltoids, upper arms, upper back and overall physique.
OUTFIT: Outfit is in the family, but body/hair mismatch is too strong.
PRO? JE TO PROBL?M: Same high-priority model mismatch as HERO: dark/copper hair plus visibly stronger athletic body type.
DOPORU?EN?: REGENERATE

### 3. Bird Dog ? START
Soubor: `Pilates Assets\02_Exercise_Cards\Bird Dog\bird_dog_start_v01.png`
Hodnocen?: C
IDENTITA: Still plausible but noticeably less like MODEL_MASTER than stronger matches.
VLASY: Too dark and warm/copper compared with mid-light dark blonde/light brown target.
POSTAVA: Minor athletic definition from all-fours support; not a regeneration reason.
OUTFIT: Outfit consistent enough.
PRO? JE TO PROBL?M: Noticeable hair drift: dark brunette/copper-orange impression remains; body is acceptable for weight-bearing pose.
DOPORU?EN?: MINOR FIX

### 4. Side Leg Raise ? START
Soubor: `Pilates Assets\02_Exercise_Cards\Side Leg Raise\side_leg_start_v01.png`
Hodnocen?: C
IDENTITA: Reads as similar type but not fully the same specific woman.
VLASY: Slightly darker / more contrasty than target.
POSTAVA: Slightly more athletic in visible upper body; still not D.
OUTFIT: Outfit close enough.
PRO? JE TO PROBL?M: Noticeable drift in hair value/color and slightly stronger side-body/arm impression.
DOPORU?EN?: MINOR FIX

### 5. Side Leg Raise ? HERO
Soubor: `Pilates Assets\02_Exercise_Cards\Side Leg Raise\side_leg_raise_hero_v01.png`
Hodnocen?: C
IDENTITA: Comparable but visible AI drift from master identity.
VLASY: Darker than target, less neutral mid-light brown.
POSTAVA: Mild upper-arm/shoulder athletic impression; pose explains some but not all.
OUTFIT: Outfit acceptable.
PRO? JE TO PROBL?M: Noticeable drift: hair darker and body impression a little more athletic than MODEL_MASTER.
DOPORU?EN?: MINOR FIX

### 6. Toe Tap ? HERO
Soubor: `Pilates Assets\02_Exercise_Cards\Toe Tap\toe_tap_hero.png`
Hodnocen?: C
IDENTITA: Somewhat different facial/hair impression; still usable but not strong.
VLASY: Hair reads darker/more muted and less like the master target.
POSTAVA: Body type acceptable; no major muscularity issue.
OUTFIT: Outfit similar enough, though overall impression is less matched.
PRO? JE TO PROBL?M: Model identity is acceptable but noticeably drifted: hair/face impression and saturation differ from MODEL_MASTER.
DOPORU?EN?: MINOR FIX

### 7. Bird Dog ? HERO
Soubor: `Pilates Assets\02_Exercise_Cards\Bird Dog\bird_dog_hero_v01.png`
Hodnocen?: B
IDENTITA: Believable in-app as same woman, but not a strong match.
VLASY: Improved versus original; still not as natural/light as MODEL_MASTER.
POSTAVA: Minor athletic definition from loaded arms; acceptable.
OUTFIT: Outfit consistent.
PRO? JE TO PROBL?M: After approved V1 hair fix, identity is acceptable; remaining drift is mainly weight-bearing/body tension and some hair character.
DOPORU?EN?: KEEP

### 8. Dead Bug ? START
Soubor: `Pilates Assets\02_Exercise_Cards\Dead Bug\dead_bug_start_v01.png`
Hodnocen?: B
IDENTITA: Believable same model with small AI drift.
VLASY: Slightly darker/warmer than master but within acceptable range.
POSTAVA: Arms/shoulders slightly more defined due to pose, acceptable.
OUTFIT: Outfit consistent.
PRO? JE TO PROBL?M: Acceptable match with minor hair/body drift in raised-limb pose.
DOPORU?EN?: KEEP

### 9. Dead Bug ? HERO
Soubor: `Pilates Assets\02_Exercise_Cards\Dead Bug\dead_bug_hero_v01.png`
Hodnocen?: B
IDENTITA: Reads as same general model in app context.
VLASY: Slightly darker than target, not major.
POSTAVA: Mild raised-arm definition, acceptable.
OUTFIT: Outfit consistent.
PRO? JE TO PROBL?M: Acceptable match; minor drift in face/hair and arm definition.
DOPORU?EN?: KEEP

### 10. Reverse Crunch ? HERO
Soubor: `Pilates Assets\02_Exercise_Cards\Reverse Crunch\reverse_crunch_hero_v01.png`
Hodnocen?: B
IDENTITA: Believable same model in the series, not a strong perfect match.
VLASY: Hair is somewhat wavier/lighter at ends than master but plausible.
POSTAVA: Body proportions acceptable; no excessive muscularity.
OUTFIT: Outfit close to standard.
PRO? JE TO PROBL?M: Acceptable new HERO: face and body generally match, with some hair/styling drift from master.
DOPORU?EN?: KEEP


## Side Leg START alias verification addendum

Datum doplneni: 2026-07-15

Compared files:

- `Pilates Assets/02_Exercise_Cards/Side Leg Raise/side leg.png`
- `Pilates Assets/02_Exercise_Cards/Side Leg Raise/side_leg_start_v01.png`

Result:

- Byte-identical: NO
- SHA-256 `side leg.png`: `1a5df259d437fe09877d29122d5f3dd3770ac2e114d63af7822ea8e9c37d3f61`
- SHA-256 `side_leg_start_v01.png`: `488dfadc721f8883f758e7d67dea2f34705f93fe3fd1f55a27eef0189c569245`
- Dimensions both files: 1672 x 941 px
- Pixel comparison: 1,563,896 / 1,573,352 pixels differ (99.39899%), first diff at 0,0, max channel diff 255
- Sampled mean absolute RGB difference: 13.763

Audit decision:

- `side leg.png` is not a byte-identical duplicate alias of `side_leg_start_v01.png`.
- It is added as a separate SOURCE file for audit coverage.
- Original `Side Leg START` rating for `side_leg_start_v01.png` remains unchanged.
- TOP 10 review board PNG was not updated, because this check did not introduce a new model-identity finding beyond the existing Side Leg START issue.
- `MODEL_MASTER.png.png` keeps its current double extension; rename is deferred to a separate cleanup task.

## Review board

- TOP 10 contact sheet: `04_Codex\MODEL_CONSISTENCY_TOP10_REVIEW.png`

## Pozn?mky

- Fire Hydrant START/HERO jsou vysok? priorita regenerace kv?li kombinaci hair + body type mismatch.
- Bird Dog HERO byl ji? lok?ln? opraven Hair Fix V1; po oprav? je veden jako B / KEEP, ne jako C/D.
- Bird Dog START z?st?v? kandid?t na lok?ln? opravu vlas?.
- Minor drift u B polo?ek ponechat pro tuto f?zi bez z?sahu.
