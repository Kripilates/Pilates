# Reference Detail Implementation Plan

## Cil

Prevest referencni detail Glute Bridge na obecnou sablonu pro vsechny cviky tak, aby se zachoval DESIGN STANDARD v1.0.
Glute Bridge zustava master template. Pri dalsich cvicich se meni pouze obsah, nikoli layout, styly ani vizualni chovani.

## 1. Casti napsane specialne pro hip / Glute Bridge

Aktualni referencni detail je navazany hlavne na objekt `referenceExerciseAssets`, kde existuje pouze klic `hip`.

Specialni vazby:

- `referenceExerciseAssets.hip`
  - obsahuje `start`, `hero`, `guide` a `steps` pouze pro Glute Bridge.
- `v22ImageSrc(k)`
  - pouziva `referenceExerciseAssets[k]?.hero`, takze cviky s referencnimi daty automaticky dostanou referencni hero fotku i do nahledu.
- `referenceHeroBlock(k)`
  - vykresluje hero pouze pro cviky, ktere maji zaznam v `referenceExerciseAssets`.
- `referenceGuideCard(k)`
  - mini karty jsou pevne slozene ze tri polozek START / HERO / START.
  - texty `Lehni si`, `Zvedni panev`, `Poloz panev` jsou hardcoded pro Glute Bridge.
- `referenceStepByStep(k)`
  - cte `ref.steps`, ale fotky se berou pres `photo:'start'` nebo `photo:'hero'`.
  - aktualne je struktura prakticky pripravena pro Glute Bridge.
- `referenceCompactInfoPanel()`
  - nema parametr cviku.
  - hodnoty Info a Dech jsou hardcoded:
    - Obtiznost: Lehke
    - Zamereni: Hyzde / nohy
    - Kolena: Setrne ke kolenum
    - Nadech: Vychozi pozice
    - Vydech: Pri zvednuti
    - Tempo: Pomalu
- `referenceRecommendations(meta)`
  - castecne pouziva `meta.mistakes`, ale hlavni texty jsou hardcoded pro Glute Bridge:
    - Co bys mela citit
    - Na co si dat pozor
    - dodatecne chyby typu zvedani prilis vysoko, zatinani krku a ramen
- `info(k)`
  - `hasReference` prepina na novy referencni layout pouze pokud existuje `referenceExerciseAssets[k]`.
  - podtitulek pro referencni cvik je hardcoded jako `Hyzde • zadni stehna`.
  - Info a Dech panel pro referencni cviky vola `referenceCompactInfoPanel()` bez dat.
  - standardni stare panely Info, Muscle a Breath se pri `hasReference` nezobrazuji.

## 2. Jak zobecnit sablonu pro vsechny cviky

Zachovat stavajici CSS a HTML strukturu referencniho detailu jako designovy kontrakt.
Menit pouze zdroj obsahu.

Navrhovany smer:

1. Zavest obecnou datovou strukturu pro referencni detail, napr. `referenceExerciseAssets[k]` nebo pozdeji `data.exercises[k].reference`.
2. Upravit pomocne funkce tak, aby braly data podle konkretniho cviku:
   - `referenceHeroBlock(k)` zustane stejny, jen bude cist obecne `ref.hero`.
   - `referenceGuideCard(k)` bude cist `ref.miniSteps` misto hardcoded Glute Bridge polozek.
   - `referenceCompactInfoPanel(k, meta, doseInfo)` bude cist `ref.info` a `ref.breath`.
   - `referenceRecommendations(k, meta)` bude cist `ref.recommendations`.
   - `referenceStepByStep(k)` bude dal cist `ref.steps`, ale povoli obecne odkazy na fotky.
3. `info(k)` by mel pro referencni cviky pouze zapojit stejnou sablonu:
   - hero
   - mini karty
   - hlavicka
   - Info + Dech
   - Doporuceni
   - Krok za krokem
4. Podtitulek v hlavicce nesmi byt hardcoded pro Glute Bridge.
   - Ma vychazet z `ref.subtitle`, nebo fallbacku z `meta.area` a `ex.focus`.
5. Vsechny CSS tridy zustanou zachovane:
   - `referenceExerciseDetail`
   - `referenceTopHero`
   - `referenceGuideCard`
   - `referenceFlow`
   - `referenceFlowStep`
   - `referenceCompactInfoPanel`
   - `referenceRecommendations`
   - `referenceStepByStep`
   - `referenceStepByStepContent`
   - `referenceSbsPhoto`
   - `referenceDownArrow`

## 3. Potrebna data pro kazdy cvik

Minimalni navrh dat pro jeden cvik:

```js
referenceExerciseAssets.exerciseKey = {
  hero: 'path/to/hero.png',
  photos: {
    start: 'path/to/start.png',
    main: 'path/to/main.png',
    return: 'path/to/return.png'
  },
  subtitle: 'oblast 1 • oblast 2',
  miniSteps: [
    { n: 1, title: 'START', caption: 'kratky popis', photo: 'start' },
    { n: 2, title: 'HLAVNI POHYB', caption: 'kratky popis', photo: 'main' },
    { n: 3, title: 'NAVRAT', caption: 'kratky popis', photo: 'return' }
  ],
  info: {
    difficulty: 'Lehke',
    focus: 'Core',
    knees: 'Setrne ke kolenum'
  },
  breath: {
    inhale: 'Vychozi pozice',
    exhale: 'Pri hlavnim pohybu',
    tempo: 'Pomalu'
  },
  recommendations: {
    feel: 'Text pro sekci Co bys mela citit.',
    watch: [
      'Bod 1.',
      'Bod 2.',
      'Bod 3.'
    ],
    mistakes: [
      'Chyba 1.',
      'Chyba 2.'
    ]
  },
  steps: [
    { title: 'START', text: 'Popis startovni pozice.', photo: 'start' },
    { title: 'HLAVNI POHYB', text: 'Popis hlavniho pohybu.', photo: 'main' },
    { title: 'NAVRAT', text: 'Popis navratu.', photo: 'return' }
  ]
};
```

Poznamky k datum:

- `hero fotka`
  - povinna pro novy referencni detail.
  - pouzije se v hero i jako fallback pro chybejici krokovou fotku.
- `mini kroky`
  - idealne vzdy tri polozky.
  - layout zustava stejny, meni se jen fotky a obsah.
- `info`
  - tri hodnoty: obtiznost, zamereni, kolena.
- `dech`
  - tri hodnoty: nadech, vydech, tempo.
- `doporuceni`
  - tri sekce: citit, pozor, chyby.
- `chyby`
  - pro referencni detail brat z novych dat.
  - pokud chybi, lze fallbacknout na `meta.mistakes`.
- `krok za krokem`
  - tri kroky jsou ideal.
  - pokud bude cvik potrebovat vice kroku, nejdriv schvalit, protoze by to mohlo ovlivnit delku a rytmus sablony.
- `data.js`
  - zustava zdroj obecnych dat cviku.
  - referencni obsah muze byt bud v `referenceExerciseAssets`, nebo pozdeji presunut do `data.exercises[k].reference`.
  - pro bezpecny prvni prevod je vhodne nechat samostatny `referenceExerciseAssets`, protoze uz existuje a minimalizuje zasah.

## 4. Fallback pro cviky bez novych dat

Fallback musi zachovat soucasne chovani.

Pravidla:

1. Pokud cvik nema referencni data:
   - `hasReference` zustane `false`.
   - cvik se vykresli starym detailem jako dnes.
   - pouziji se existujici funkce `detailHeroImage`, `detailSteps`, `detailStepMedia`, Info, Dech a Doporuceni.
2. Pokud cvik ma jen castecna referencni data:
   - chybejici `hero` fallbackne na `data.exercises[k].image`.
   - chybejici fotka kroku fallbackne na `ref.hero`.
   - chybejici `subtitle` fallbackne na `meta.area` + `ex.focus`.
   - chybejici `info` fallbackne na `exMeta(k)`.
   - chybejici `breath` fallbackne na `meta.breath` a `meta.tempo`.
   - chybejici `recommendations.feel` fallbackne na `ex.feel` nebo stavajici obecny text.
   - chybejici `recommendations.mistakes` fallbackne na `meta.mistakes`.
   - chybejici `steps` fallbackne na `detailSteps(k, ex)`.
3. Bez kompletniho obrazoveho setu se nema automaticky zapinat referencni detail pro vsechny cviky.
   - Cvik se zaradi do nove sablony az po priprave a kontrole dat.

## 5. Bezpecny postup prevodu

Dodrzet CODEX_WORKFLOW:

1. Necommitovat bez vyslovneho pokynu.
2. Nejprve jeden referencni pripad.
3. Pockat na vizualni kontrolu.
4. Teprve po schvaleni rozsirovat na dalsi cviky.
5. Jeden ukol = jedna logicka zmena.

Navrhovane poradi:

### Faze 1 - Zobecneni sablony bez zmeny vzhledu

- Neupravovat CSS.
- Nechat Glute Bridge vizualne beze zmeny.
- V `app.js` pouze pripravit obecne cteni dat, aby `hip` porad vypadal stejne.
- Otestovat, ze Glute Bridge se po zobecneni nezmenil.
- Otestovat, ze ostatni cviky stale pouzivaji stary detail.

### Faze 2 - Toe Tap

- Pridat referencni data pouze pro `toetap`.
- Pouzit stejny layout jako Glute Bridge.
- Menit pouze obsah:
  - hero fotka
  - mini kroky
  - subtitle
  - Info + Dech hodnoty
  - Doporuceni
  - Krok za krokem
- Vizuálně zkontrolovat Toe Tap na desktopu a mobilu.
- Zkontrolovat, ze Glute Bridge zustal beze zmeny.
- Zkontrolovat, ze ostatni cviky zustaly ve starem detailu.

### Faze 3 - Dead Bug

- Po schvaleni Toe Tap pridat referencni data pouze pro `deadbug`.
- Opakovat stejne kontroly:
  - desktop
  - mobil
  - sbaleny accordion
  - rozbaleny accordion
  - bez horizontalniho scrollu
  - Glute Bridge beze zmeny
  - Toe Tap beze zmeny

### Faze 4 - Clamshell

- Po schvaleni Dead Bug pridat referencni data pouze pro `clam`.
- Drzet stejnou sablonu.
- Pokud se ukaze, ze bocni cvik potrebuje odlisny obsah nebo fotky, menit pouze obsah, ne layout.
- Vizuální kontrola jako u predchozich cviku.

### Faze 5 - Rozsireni na dalsi cviky

- Rozsirovat po malych skupinach, ne hromadne.
- Pred kazdou skupinou musi byt jasne pripravena data a obrazky.
- Pokud nektery cvik nema dost dat nebo fotek, zustane ve starem detailu.
- Neprepisovat stary fallback, dokud nejsou vsechny referencni detaily schvalene.

## 6. Kontrolni seznam pro kazdy novy referencni detail

Pred predanim zkontrolovat:

- stejny layout jako Glute Bridge
- stejne rozestupy
- stejna typografie
- stejne velikosti nadpisu
- stejne velikosti ikon
- stejne ramecky
- stejne radiusy
- stejne stiny
- stejne mini karty
- stejny Info + Dech panel
- stejna Doporuceni sekce
- stejny Krok za krokem
- stejna accordion animace
- stejna prace s tyrkysovou
- bez horizontalniho scrollu
- mobil 390 px
- sbaleny accordion bez prazdneho bloku
- rozbaleny accordion bez zbytecneho prazdneho konce
- Glute Bridge beze zmeny
- ostatni neprevedene cviky beze zmeny

## 7. Doporučení pro prvni implementacni krok

Prvni technicky krok by mel byt pouze zobecneni existujicich referencnich funkci tak, aby Glute Bridge stale renderoval identicky.

Az potom pridavat Toe Tap.

Tento plan je pouze dokumentace. Neobsahuje zadne zmeny CSS, JS, dat ani obrazku.
