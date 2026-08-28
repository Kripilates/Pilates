# MASTER_ANATOMY

Status: ACTIVE MASTER RULES FOR ANATOMY ASSETS

Tento dokument je zavazny pro vsechny anatomicke obrazky "Zapojene svaly" v projektu Moovka.

Pred jakoukoli tvorbou, upravou nebo nasazenim anatomickych obrazku musi byt nacten tento dokument a schvaleny master:

`Pilates Assets/01_Master_Reference/MOOVKA_MASTER_BODY_v01.png`

## Zamceny Anatomicky Master

Vychozi referenci je schvaleny `MOOVKA_MASTER_BODY_v01`.

Obsahuje predni a zadni pohled stejne zenske anatomicke postavy.

TENTO MASTER JE ZAMCENY.

Pri tvorbe jednotlivych anatomy assetu se nesmi svevolne:

- menit postava,
- menit oblicej,
- menit vlasy,
- menit proporce tela,
- menit svalova kresba,
- menit poza,
- menit perspektiva,
- menit velikost jednotlivych casti tela,
- menit obleceni,
- menit zakladni ilustrativni styl,
- generovat podobna nova anatomicka postava.

Novy anatomy asset musi vznikat editaci nebo odvozenim ze schvaleneho masteru, nikoli novou interpretaci postavy.

MASTER BODY je zdroj pravdy.

## Vizualni Standard

Anatomicke obrazky urcene do aplikace maji:

- ciste bile pozadi,
- svetly cernobily / grayscale zaklad postavy,
- anatomickou kresbu zachovanou z MASTER BODY,
- zapojene svaly zvyraznene ruzovou z vizualniho systemu Moovky,
- zadne jine barevne dekorace.

Ruzova slouzi pouze pro zvyrazneni relevantnich svalu.

Asset nesmi obsahovat:

- nazev cviku,
- ceske nazvy svalu,
- latinske nazvy svalu,
- legendu,
- nadpis,
- vysvetlovaci text,
- logo,
- znacku Moovka,
- ramecky,
- ikonky,
- cisla,
- sipky,
- UI prvky,
- dekorace.

Vysledkem je pouze cista anatomicka ilustrace.

## Predni A Zadni Pohled

Nepouzivej automaticky predni + zadni pohled pro kazdy cvik.

Pouzij pouze pohled, ktery skutecne pomaha zobrazit relevantni svaly.

- Pokud jsou vsechny dulezite svaly dobre viditelne zezadu, pouzij pouze zadni pohled.
- Pokud jsou relevantni pouze zepredu, pouzij pouze predni pohled.
- Predni + zadni pohled pouzij pouze tehdy, kdyz cvik skutecne zapojuje dulezite svalove oblasti, ktere nelze rozumne zobrazit jednim pohledem.

Cil je co nejvetsi a nejcitelnejsi anatomie na mobilnim displeji, ne automaticky dve male postavy.

## Zvyrazneni Svalu

Pred vytvorenim assetu musi probehnout ANATOMY QA.

Nezvyraznuj sval pouze proto, ze se behem cviku podili na stabilizaci.

Prioritou je zobrazit svalove skupiny, ktere jsou pro dany cvik skutecne vyznamne.

Rozlisuj:

- PRIMARY: hlavni cilove svaly cviku.
- SECONDARY: vyznamne spolupracujici svaly, pouze pokud jejich zobrazeni prinasi uzivatelce skutecnou hodnotu.

Nepreplnuj anatomii mnozstvim zvyraznenych svalu.

Pokud by sekundarni zvyrazneni zhorsilo srozumitelnost, zobraz pouze PRIMARY.

## Anatomicka Spravnost

Kazdy anatomy asset musi pred schvalenim projit kontrolou:

- odpovidaji zvyraznene svaly konkretnimu cviku?
- neni zvyraznena nespravna svalova skupina?
- neni nektera hlavni svalova skupina vynechana?
- neni obrazek zavadejici?
- odpovida pohled tomu, co chceme uzivatelce ukazat?

Priklad pro rumunsky mrtvy tah:

- PRIMARY: hyzde, zadni strana stehen / hamstringy.
- Predni kvadricepsy nesmi byt prezentovany jako hlavni cilove svaly RDL.
- Vzprimovace patere lze povazovat za sekundarni zapojeni, ale jejich zvyrazneni neni povinne, pokud by anatomii zbytecne komplikovalo.
- Preferovany pohled pro RDL je zadni pohled.

## Text Patri Do UI

Veskere vysvetleni zapojenych svalu patri do HTML/UI aplikace.

Nikdy jej nevypaluj primo do PNG/WebP anatomy assetu.

Duvody:

- text lze menit bez regenerace obrazku,
- lepsi citelnost na mobilu,
- lokalizace,
- jednotny design,
- opakovane pouziti stejneho anatomy assetu.

## Reuse Anatomy Assetu

Nevytvarej automaticky unikatni obrazek pro kazdy cvik.

Pokud dva nebo vice cviku pouzivaji skutecne stejne anatomicke zvyrazneni, mohou sdilet stejny anatomy asset.

Pred vytvorenim noveho obrazku proved REUSE AUDIT.

Kontroluj skutecnou anatomickou shodu, ne pouze podobny nazev cviku.

## Pre-Generation QA

Pred kazdym novym anatomy assetem musi byt potvrzeno:

- [ ] nacten `MASTER_ANATOMY.md`
- [ ] pouzit `MOOVKA_MASTER_BODY_v01`
- [ ] MASTER postava se nemeni
- [ ] urcen PRIMARY muscle target
- [ ] pripadne urcen SECONDARY target
- [ ] zvolen nejvhodnejsi pohled
- [ ] proveden reuse audit
- [ ] asset nebude obsahovat text ani UI
- [ ] zvyrazneni odpovida anatomii cviku

Pokud nektery bod neni jasny, negenerovat a nejprve vyresit nejasnost.

## Post-Generation QA

Po vytvoreni kazdeho anatomy assetu kontrolovat:

- [ ] stejna MASTER postava
- [ ] stejne proporce
- [ ] stejna svalova kresba
- [ ] stejny grayscale styl
- [ ] bile pozadi
- [ ] zadny text
- [ ] zadne logo
- [ ] zadne UI
- [ ] spravne svaly
- [ ] zadne chybne zvyraznene svaly
- [ ] vhodny pohled
- [ ] dobra citelnost na mobilu
- [ ] zadne artefakty nebo nahodne zmeny MASTERU

Asset se nesmi oznacit jako APPROVED, pokud nektery bod neprojde.

## Ochrana Pro Budouci Chaty

Pred jakoukoli tvorbou, upravou nebo nasazenim anatomickych obrazku musi byt nacten `MASTER_ANATOMY.md` a `MOOVKA_MASTER_BODY_v01`.

Anatomicky MASTER je zamceny a nesmi byt nahrazovan nove generovanou podobnou postavou.
