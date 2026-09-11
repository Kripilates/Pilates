# MOOVKA – MUSCLE CARD MASTER

## STATUS
Nový Muscle Card systém od 2026-09-11.

Starší Muscle Cards jsou pouze pracovní/reference materiál.
Pro nové a revidované Muscle Cards platí výhradně tento dokument.

---

# 1. LOCKED MASTER BODY

Základ všech Muscle Cards:

MOOVKA_MASTER_BODY_v02

MASTER BODY je ZAMČENÝ.

Při tvorbě Muscle Cards se NESMÍ změnit:
- tělesné proporce
- svalnatost
- silueta
- obličej
- vlasy
- oblečení
- poloha postavy
- FRONT/BACK
- měřítko
- kompozice
- grayscale kresba
- bílé pozadí

Muscle Card vzniká EDITACÍ tohoto MASTERU.
Postava se nikdy znovu negeneruje.

MASTER BODY představuje štíhlou, přirozeně ženskou,
zpevněnou postavu bez kulturistické svalnatosti.

---

# 2. OBSAH FINÁLNÍ MUSCLE CARD

Finální Muscle Card obsahuje POUZE:

- MOOVKA_MASTER_BODY_v02
- barevně označené relevantní svalové oblasti
- čisté bílé pozadí

Uvnitř PNG NESMÍ být:
- logo
- název cviku
- název svalů
- A01–A16
- legenda
- text
- ikony
- rámečky
- jiné grafické prvky

Význam karty je evidován v názvu souboru a v tomto dokumentu.

---

# 3. BARVY

## PRIMARY
Hlavní zapojené svaly.

Moovka Pink:
HEX #F05A78
RGB 240 / 90 / 120

Tato barva pochází přímo z finálního loga Moovka.

## SECONDARY
Významně zapojené pomocné nebo stabilizační svaly.

Používá STEJNÝ odstín #F05A78, pouze ve světlejší intenzitě.

Přesná intenzita SECONDARY bude zamčena po vizuálním testu
první kombinované Muscle Card.

Zakázáno:
- měnit odstín růžové mezi kartami
- používat korálovou
- používat jinou růžovou
- generovat PRIMARY a SECONDARY jako dva různé barevné odstíny

Rozdíl PRIMARY / SECONDARY vzniká pouze intenzitou stejné barvy.

---

# 4. ANATOMICKÉ OBLASTI

A01 – Core / přímé břišní
      rectus abdominis + vizuální oblast předního core
      FRONT

A02 – Šikmé břišní
      obliques
      FRONT + boční přesah

A03 – Flexory kyčle
      hip flexors / přední oblast kyčle a třísla
      FRONT

A04 – Hrudník
      pectoralis major
      FRONT

A05 – Ramena
      deltoids
      FRONT + BACK

A06 – Biceps
      biceps brachii
      FRONT

A07 – Triceps
      triceps brachii
      BACK

A08 – Lopatková oblast
      rhomboids / střední oblast mezi lopatkami
      BACK

A09 – Široký sval zad
      latissimus dorsi
      BACK

A10 – Vzpřimovače páteře
      erector spinae
      BACK

A11 – Hýždě
      gluteus maximus
      BACK

A12 – Boční hýždě
      gluteus medius/minimus / hip abductors
      BACK + boční přesah

A13 – Kvadricepsy
      přední strana stehen
      FRONT

A14 – Hamstringy
      zadní strana stehen
      BACK

A15 – Adduktory
      vnitřní strana stehen
      FRONT

A16 – Lýtka
      gastrocnemius / soleus oblast
      BACK

---

# 5. MASTER MASKS

Pro každou oblast vznikne jedna anatomicky schválená MASTER MASK:

A01_CORE
A02_OBLIQUES
A03_HIP_FLEXORS
A04_CHEST
A05_DELTOIDS
A06_BICEPS
A07_TRICEPS
A08_SCAPULAR
A09_LATS
A10_ERECTOR_SPINAE
A11_GLUTE_MAX
A12_LATERAL_GLUTES
A13_QUADRICEPS
A14_HAMSTRINGS
A15_ADDUCTORS
A16_CALVES

Po schválení MASTER MASK se její anatomické hranice ZAMKNOU.

Stejný sval se pro další kartu znovu nekreslí.

---

# 6. POJMENOVÁNÍ MUSCLE CARDS

Muscle Cards se NEJMENUJÍ podle cviku.

Název popisuje anatomický obsah karty.

Formát:

[PRIMARY]_primary_[SECONDARY]_secondary_muscles_v01.png

Příklady:

glutes_primary_hamstrings_core_secondary_muscles_v01.png

lateral_glutes_primary_core_secondary_muscles_v01.png

core_primary_hip_flexors_secondary_muscles_v01.png

obliques_primary_core_secondary_muscles_v01.png

chest_primary_triceps_shoulders_secondary_muscles_v01.png

shoulders_primary_triceps_secondary_muscles_v01.png

Pokud karta nemá SECONDARY:

deltoids_primary_muscles_v01.png

Jeden PNG může používat více cviků se stejným anatomickým
PRIMARY/SECONDARY profilem.

Nevytvářet duplicitní PNG pro jednotlivé cviky.

---

# 7. EVIDENCE KARET

Každá vytvořená kombinace musí být zapsána před nasazením.

| FILE | PRIMARY | SECONDARY | CVIKY | STATUS |
|---|---|---|---|---|
| glutes_primary_hamstrings_core_secondary_muscles_v01.png | A11 Gluteus maximus | A14 Hamstrings + A01 Core | `hip`, `frog`, `donkey`, `glute_bridge_march` | SCHVÁLENO |
| quadriceps_primary_hamstrings_secondary_muscles_v01.png | A13 Quadriceps | A14 Hamstrings | žádný z aktuálních 51 profilů nemá tuto přesnou kombinaci; bez runtime přiřazení | SCHVÁLENO |
| lateral_glutes_primary_core_secondary_muscles_v01.png | A12 Lateral glutes | A01/A02 dle konkrétního profilu | bude doplněno | ČEKÁ |

Schválené PNG jsou uloženy v `Pilates Assets/02_Exercise_Cards/_Muscle_Cards/`. Zdrojovými referencemi nového systému zůstávají zamčené `MOOVKA_MASTER_BODY_v02.png` a `MASTER BODY MAP v02.png`.

STATUS:
ČEKÁ
VYTVOŘENO
SCHVÁLENO

SCHVÁLENO = anatomie, MASTER BODY i barevnost jsou zamčené.

---

# 8. PRAVIDLO PRO CVIKY

Muscle Card neukazuje všechny svaly, které se při pohybu
technicky nějak zapojují.

Zobrazuje:

PRIMARY
= hlavní svaly / hlavní cílová oblast cviku

SECONDARY
= významné pomocné nebo stabilizační svaly, jejichž zapojení
je užitečné uživatelce znát

Nezvýrazňovat nevýznamné pomocné svaly.

Účelem karty je pomoci uživatelce pochopit:
- kde má cvik primárně pracovat
- které další oblasti mohou významně pracovat
- zda pocit v sekundární oblasti může být normální

U mobility/stretch cviků označuje zvýraznění oblast,
která se primárně nebo sekundárně protahuje/mobilizuje.

---

# 9. WORKFLOW

1. MOOVKA_MASTER_BODY_v02 – SCHVÁLENO / LOCKED
2. MASTER BODY MAP A01–A16
3. vytvořit MASTER MASK jednotlivých oblastí
4. QA každé masky
5. schválenou masku zamknout
6. sestavit anatomický profil všech 51 cviků
7. najít identické profily
8. vytvořit pouze unikátní Muscle Cards
9. QA PRIMARY / SECONDARY / MASTER BODY
10. zapsat kartu do evidence
11. až potom předat hotová PNG + mapování Codexu

Codex anatomii nevymýšlí a Muscle Cards nekreslí.
Codex pouze zapojí již SCHVÁLENÉ PNG podle tohoto dokumentu.

---

# 10. LAYOUT APLIKACE

ANATOMICKÝ OBSAH SE MĚNÍ, LAYOUT NE.

Současný DOM, rozměry, CSS a pořadí detailu jsou zamčené.

Nové Muscle Cards se musí přizpůsobit existujícímu
rozložení aplikace, nikoli rozložení novým kartám.

Neměnit:
- detail renderer
- HTML strukturu detailu
- CSS layout
- rozměry Muscle Card sekce
- Guide Card
- Step by Step
- workout logiku

Commit: NE
Push: NE