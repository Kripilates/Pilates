# Moovka — naming convention

Autorita pro workflow a názvy je
`00_CHATGPT_START/MASTER/01_DOCUMENTS/IMAGE_WORKFLOW.md`.

Aktivní exercise SOURCE jsou unversioned:

- `<slug>_start.png`
- `<slug>_hero.png`
- `<slug>_mid.png` pouze při skutečně odlišné potřebné fázi
- `<slug>_end.png` pouze při fyzicky a anatomicky odlišné END fázi

Toto je výchozí pattern pro nové SOURCE. Již schválený aktivní unversioned název
se bez výslovného migračního úkolu nepřejmenovává; přesnou cestu určuje canonical
inventura a runtime mapping.

Při END = START nebo HERO = START se identická fyzická kopie nevytváří; runtime
použije přesně existující SOURCE. Historické `_v01`, `_v02` názvy nejsou vzor
pro nové SOURCE. Před tvrzením, že obrázek chybí, se ověří unversioned soubor,
runtime mapping, přesný case a fyzická cesta.

Guide Card a Step by Step mohou zachovat své historicky zavedené verzované názvy;
jejich naming se nesmí zaměňovat s namingem SOURCE.
