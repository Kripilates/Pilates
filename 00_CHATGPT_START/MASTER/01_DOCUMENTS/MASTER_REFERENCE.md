# MOOVKA — MASTER REFERENCE

Status: **ACTIVE VISUAL AUTHORITY**
Aktualizováno: 2026-09-12

Tento dokument je autoritou pro neměnné vizuální a fyzické reference exercise
SOURCE série. Postup tvorby, QA, schvalování a nasazení určuje `IMAGE_WORKFLOW.md`.

## 1. Povinné reference

Při tvorbě nebo opravě exercise SOURCE se používají společně:

1. **MASTER model** — identita, tělo, vlasy a outfit.
2. **MASTER face** — přesná identita obličeje z více úhlů.
3. **MASTER environment** — architektura, materiály, světlo a barevnost studia.
4. **MASTER camera class** — kamera, perspektiva, framing a měřítko.
5. **MASTER mat** — fyzická autorita měřítka.
6. **EXERCISE_REFERENCE nebo schválený SOURCE** — anatomie, technika a fáze
   konkrétního cviku.

Projekt nyní nemá centralizovanou aktivní sadu `EXERCISE_REFERENCE` souborů.
Použije se pouze výslovně schválená reference dodaná pro daný úkol nebo již
schválený paired SOURCE. Pokud bez ní nelze přesně určit pózu, stranu či úchop,
nevymýšlej je a vyžádej si autoritativní podklad.

Aktivní soubory jsou uvedené v `../README.md`. Historický Guide/Step může pomoci
s pochopením pohybu, ale není autoritou identity, prostředí ani kamery.

## 2. Zamčená modelka a identita

Autority:

- `00_CHATGPT_START/MASTER/02_REFERENCES/MODEL/MASTER_MODEL.png`
- `00_CHATGPT_START/MASTER/02_REFERENCES/MODEL/MASTER_FACE.png`

Používá se stále stejná konkrétní dospělá žena s věkovým dojmem přibližně
30s–40s. Postava je fit/toned, štíhlá a přirozeně atletická, nikoli
kulturistická. Mezi cviky nesmí viditelně skákat objem svalů, šířka ramen,
proporce trupu ani délka končetin.

Obličej, oči, nos, ústa, čelist, uši, hairline, odstín pleti a věkový dojem se
kontrolují proti MASTER FACE. Směr pohledu a přirozený výraz se mohou změnit
jen podle pozice cviku.

### Hlava a proporce

- Head-to-body ratio se kontroluje proti MASTER MODEL a paired SOURCE.
- Hlava nesmí být generativně zvětšená ani působit nepřiměřeně dominantně.
- Při pochybnosti je přijatelnější nepatrně menší hlava než zjevně zvětšená,
  stále však musí odpovídat MASTER identitě a proporcím.

### Vlasy

Vizuální autoritou jsou MASTER MODEL a MASTER FACE, nikoli staré textové popisy.
Aktuální vzhled:

- dark blonde až light brown základ;
- přirozené světlejší zlatavé/karamelové prameny;
- středně dlouhé až delší vlasy stažené do přirozeného culíku;
- přirozená lehká vlnitost, střední objem a stejná hairline;
- bez black/dark-brunette skoku a bez měděného, oranžového nebo červeného castu.

Délka, objem, textura, odstín a typ culíku musí zůstat konzistentní zejména mezi
START/HERO/MID/END stejného cviku.

## 3. Zamčený outfit

- Coral sportovní top podle MASTER; pracovní barevná reference `#F36F6A`.
- Černé až velmi tmavé high-waisted leggings podle MASTER; pracovní reference
  `#252528`.
- Barefoot; žádné boty.
- Bez hodinek, šperků a náhodných doplňků.
- Střih, materiál, délka, švy a barva musí působit jako stejný kus oblečení
  napříč knihovnou a nesmí se měnit mezi fázemi.

Obrazový MASTER má při vizuální kontrole přednost před odhadem barvy z jiné
generace.

## 4. MASTER environment

Autority:

- `00_CHATGPT_START/MASTER/02_REFERENCES/ENVIRONMENT/MOOVKA_MASTER_ENVIRONMENT_v02.png`
- `00_CHATGPT_START/MASTER/02_REFERENCES/ENVIRONMENT/MOOVKA_MASTER_ENVIRONMENT_v02_SPEC.md`

Exercise SOURCE musí působit jako stejné čisté minimalistické studio:

- téměř bílá neutrální stěna, nikoli šedá, béžová nebo žlutá;
- světlá přírodní light-oak / warm-neutral podlaha bez příliš teplého castu;
- čistý bílý sokl;
- průsvitné bílé závěsy nebo vertikální bílé prvky pouze vlevo a pouze podle
  příslušného camera framingu;
- měkké přirozené denní světlo zleva;
- pouze jemný plynulý světelný gradient;
- tmavá charcoal/black podložka přidávaná jako exercise rekvizita.

Zakázané prvky v exercise SOURCE:

- palma, velká rostlina, květináče;
- police, cubby, knihy, ručníky, vázy, nábytek a dekorace;
- obrazy, zrcadla, zásuvky/panely, logo a text;
- viditelný strop, ceiling/light strip, recessed cove nebo světelná lišta;
- obdélníkové či diagonální window shadows, pruhy žaluzií nebo tvrdé fleky;
- špinavá či flekatá stěna, deformované rohy/podlahová prkna, vignette nebo
  CGI/waxy textura.

Environment overview může obsahovat širší architektonický kontext, ale exercise
framing se řídí písemnou SPEC a camera referencemi: horní stropní část ani
světelná lišta se do exercise SOURCE nepřenášejí. Prostředí nemusí být mezi
camera classes pixelově totožné, musí však působit jako stejné studio.

## 5. MASTER mat a hard geometry

Autorita: `00_CHATGPT_START/MASTER/02_REFERENCES/MAT/MASTER_MAT_183x68.jpg`.

- Podložka má fyzický rozměr přibližně 183 × 68 cm.
- Modelka měří přibližně 180 cm.
- Podložka se kvůli póze nikdy nezkracuje, neprodlužuje ani nerescaluje.
- U plně natažené LYING pozice modelka téměř využije délku podložky a zůstane
  jen malá reálná rezerva.
- Pokrčená kolena zmenší horizontální footprint pózy, nikoli fyzické měřítko
  modelky. Zakázaná chyba je „pokrčená pozice = menší modelka“.
- Kontrolují se hlava, trup, délka končetin, ruce, chodidla a vztah těla k
  podložce i okolnímu prostoru.

## 6. Camera classes

Měřítko se porovnává primárně uvnitř stejné camera class. Standing se nesmí
slepě poměřovat proti lying.

### LYING

- Reference: `../02_REFERENCES/CAMERA/MOOVKA_MASTER_CAMERA_LYING_SCALE_POSITION_v01_REFERENCE_ONLY.png`
  a stejnojmenná `.md` specifikace.
- Nízký skutečný boční pohled, přirozená perspektiva.
- Maximum envelope: natažené nohy + paže plně za hlavou.
- Kontrolní tolerance maximální obálky: přibližně 88–92 % šířky.
- Kompaktní nebo pokrčená fáze nesmí změnit distance, zoom ani velikost modelky.

### QUADRUPED

- Reference: `../02_REFERENCES/CAMERA/MOOVKA_MASTER_CAMERA_QUADRUPED_SCALE_POSITION_v01_REFERENCE_ONLY.png`
  a stejnojmenná `.md` specifikace.
- Boční pohled s přirozenou perspektivou.
- Maximum envelope: Bird Dog s paží vpřed a opačnou nohou vzad.
- Kontrolní tolerance: přibližně 80–85 % šířky.
- Kompaktní poloha na čtyřech nesmí změnit distance, zoom ani model scale.

### STANDING

- Reference: `../02_REFERENCES/CAMERA/MOOVKA_MASTER_CAMERA_STANDING_SCALE_POSITION_v01_REFERENCE_ONLY.png`
  a stejnojmenná `.md` specifikace.
- Framing je kalibrován na stoj s pažemi plně nad hlavou a případnými dvěma
  malými činkami.
- Kontrolní tolerance maximální obálky: přibližně 88–92 % dostupné výšky.
- Chodidla, ruce a pomůcky musí zůstat celé v obraze.

### SIDE FLOOR

- Operační skupina pro boční leh, side plank a podobné floor pozice.
- Nemá samostatný schválený camera PNG. Pro fyzickou výšku/distance kamery,
  perspektivu, podložku a model scale používá **LYING camera reference**.
- Přesnou boční pózu, orientaci a framing určuje schválený SOURCE stejného cviku
  nebo EXERCISE_REFERENCE.
- Není dovoleno vytvořit nový zoom jen proto, že je póza nižší či kompaktnější.
- Dokud nebude výslovně schválen samostatný SIDE FLOOR reference image, nesmí se
  vymýšlet numerická camera height ani distance.

Pro všechny class platí: camera reference image má přednost před procentní
tolerancí; čísla jsou pouze sanity check. START/HERO/MID/END stejného cviku
zachovávají camera class, perspektivu, distance, framing, podložku a model scale.

## 7. Pair consistency

Fáze jednoho cviku musí působit jako fotografie pořízené během jedné série.
Zamčené jsou:

- identita, obličej a věk;
- vlasy a head/body proportions;
- tělesná stavba a svalnatost;
- outfit;
- podložka a vybavení;
- studio, kamera, framing a model scale;
- světlo, stíny a white balance.

Mění se pouze anatomicky požadovaná poloha. Při opravě jedné chyby preferuj
surgical edit před regenerací celé kompozice.

## 8. Equipment

- Používej stejnou schválenou rodinu black hex dumbbells.
- Velikost a proporce pomůcek nesmí mezi cviky ani fázemi skákat.
- Dvě činky znamenají přesně dvě samostatné činky, jednu v každé ruce.
- Dumbbell Pullover používá přesně jednu činku drženou oběma rukama na center
  handle, nikoli za koncové kotouče.
- U dalšího vybavení je autoritou schválený paired SOURCE nebo výslovná reference.
  Pokud přesná fyzická hodnota není doložená, nevymýšlej ji.

## 9. Co smí a nesmí změnit

Smí se změnit pouze požadovaná póza, poloha končetin, nezbytný směr hlavy a
výslovně požadované vybavení. Bez výslovného schválení se nemění modelka, tvář,
vlasy, tělo, outfit, studio, podložka, camera class, světlo ani barevnost.

Existující approved asset se neregeneruje jen kvůli přirozenému drobnému rozdílu.
Nové a revidované assety se však musí řídit tímto MASTEREM.
