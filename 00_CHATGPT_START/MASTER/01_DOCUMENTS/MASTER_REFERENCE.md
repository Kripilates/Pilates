# OFICIÁLNÍ MASTER SYSTÉM

Projekt Pilates Body 40+ používá tyto čtyři závazné identity/content reference:

1. MASTER prostředí
   Referenční fotografie a specifikace prázdného Moovka studia.
   Určuje architekturu, světlo, podlahu, závěs a barevnost. Kameru a měřítko určují tři schválené MASTER CAMERA reference.

2. MASTER model
   Referenční fotografie celé modelky.
   Určuje postavu, oblečení, vlasy a identitu.

3. MASTER tvář
   Referenční fotografie obličeje.
   Určuje obličej, oči, nos, ústa, čelist, výraz a odstín pleti.

4. EXERCISE_REFERENCE
   Referenční fotografie nebo ilustrace konkrétního cviku.
   Určuje anatomicky správnou polohu těla.

Pro anatomické obrázky "Zapojené svaly" platí navíc povinný dokument `MASTER_ANATOMY.md` a zamčený master `Pilates Assets/02_Exercise_Cards/_Muscle_Cards/MOOVKA_MASTER_BODY_v02.png`.
Před jakoukoli tvorbou, úpravou nebo nasazením anatomických obrázků musí být načten `MASTER_ANATOMY.md`.
Anatomický MASTER je zamčený a nesmí být nahrazován nově generovanou podobnou postavou.

MASTER MAT je primární fyzická autorita měřítka SOURCE série: podložka má 183 × 68 cm a modelka měří 180 cm. Podložka se mezi cviky ani fázemi nikdy nezkracuje, neprodlužuje ani nerescaluje.

MASTER CAMERA LYING / QUADRUPED / STANDING a MASTER MAT jsou další závazné fyzické autority pro framing, perspektivu, pozici a měřítko; nejsou volitelnými referencemi.

Veškeré další historické názvy jsou považovány za neplatné.
# MASTER PACK v2.0 Reference

Status: ACTIVE MASTER SYSTEM

Tento dokument je jediný platný MASTER systém projektu Pilates Body 40+.
Starší MASTER dokumenty jsou historické reference. Pokud jsou v rozporu s tímto dokumentem, platí MASTER.

Nejvyšší prioritou je plná zpětná kompatibilita projektu. Žádné pravidlo nesmí rozbít existující workflow aplikace ani již schválené obrazové podklady. Sjednocení pravidel nemění obsah ani logiku projektu.

## MASTER SOURCES

- MASTER model: jediná oficiální modelka projektu.
- MASTER tvář: `00_CHATGPT_START/MASTER/02_REFERENCES/MASTER_FACE.png`, víceúhlová referenční karta obličeje modelky a oficiální součást MASTER model identity.
- MASTER prostředí: `Pilates Assets/01_Master_Reference/MOOVKA_MASTER_ENVIRONMENT_v02.png` a `MOOVKA_MASTER_ENVIRONMENT_v02_SPEC.md`, jediný zdroj pravdy pro prázdné studio, světlo, stěnu, podlahu, sokl, závěs a barevnost.
- MASTER CAMERA: tři pevné kamerové třídy LYING / QUADRUPED / STANDING s příslušnými schválenými reference images v `Pilates Assets/01_Master_Reference`.
- MASTER MAT: fyzická podložka 183 × 68 cm, primární scale authority pro velikost modelky, vzdálenost kamery, měřítko místnosti a konzistenci mezi cviky; modelka měří 180 cm.
- MASTER anatomie: `Pilates Assets/02_Exercise_Cards/_Muscle_Cards/MOOVKA_MASTER_BODY_v02.png`, zamčený základ pro všechny anatomy assety "Zapojené svaly"; pravidla určuje `00_CHATGPT_START/MASTER/01_DOCUMENTS/MASTER_ANATOMY.md`.
- HERO referenční standard: referenční kvalita HERO fotografie.
- EXERCISE_REFERENCE.png: anatomická reference konkrétního cviku, dodává se pro právě řešený cvik.

## MASTER model

- MASTER model je jediná oficiální modelka projektu.
- Modelka se nemění.
- Obličej se nemění.
- Vlasy se nemění.
- Postava se nemění.
- Identita musí působit jako stejná konkrétní žena, ne pouze podobný typ.
- Věk cca 40 let.
- Přirozená atletická postava.
- Bez svalového kulturistického vzhledu.
- Přirozené ženské proporce.
- Pleť musí zůstat přirozená a konzistentní s MASTER model.
- Vlasy: natural mid-light Central European hair, dark blonde / light brown appearance, bez dark brunette, black, copper, orange nebo red dojmu.
- Víceúhlová reference obličeje MASTER_FACE.png pouze zpřesňuje stejnou identitu modelky.

## MASTER tvář

MASTER tvář je oficiální referenční karta identity obličeje modelky. Musí být používána společně s MASTER model, MASTER prostředí a styl projektu při každém generování cviku.

MASTER tvář slouží jako referenční identita pro:

- čelní pohled
- levý profil
- pravý profil
- 3/4 pohled
- pohled shora
- pohled dolů
- zadní část hlavy
- neutrální výraz
- úsměv
- oči
- nos
- ústa
- linii čelisti
- uši
- vlasy
- linii vlasů

Při každém generování cviku musí být MASTER tvář považována za součást identity modelky. Modelka se nesmí měnit.

Mění se pouze:

- poloha těla
- drobná změna výrazu, pokud vyplývá z anatomie nebo přirozeného provedení cviku
- směr pohledu, pokud to vyžaduje anatomie cviku

Pokud identita neodpovídá MASTER tváři, obrázek se automaticky označí jako REGENERATE.

## MASTER OUTFIT

- TOP: přesně `#F36F6A`; neodvozovat odstín z předchozí generace.
- LEGÍNY: přesně `#252528`; neodvozovat odstín z předchozí generace.
- Barefoot, pokud cvik výslovně nevyžaduje jinak.
- žádné boty
- žádné hodinky
- žádné šperky
- žádné nové doplňky

## MASTER prostředí

MASTER prostředí je jediný zdroj pravdy pro prostředí. Aktivní autoritou je dvojice:

`Pilates Assets/01_Master_Reference/MOOVKA_MASTER_ENVIRONMENT_v02.png`

`Pilates Assets/01_Master_Reference/MOOVKA_MASTER_ENVIRONMENT_v02_SPEC.md`

MASTER environment updated 2026-08-30. Existing approved exercise assets are grandfathered; regeneration is required only when an asset is newly created or otherwise being regenerated/reworked.

- prázdné moderní studio
- téměř bílá neutrální stěna, která nesmí působit šedě
- světlá přírodní light-oak / warm-neutral podlaha
- čistý bílý sokl
- průsvitný bílý závěs pouze vlevo
- měkké denní světlo zleva
- na stěně je povolen pouze velmi jemný plynulý světelný gradient
- žádné police, rostliny, knihy, vázy, dekorace, nábytek, obrazy, zrcadla, zásuvky/panely, logo ani text
- žádný viditelný strop, ceiling light strip, recessed cove ani světelná architektonická lišta
- žádné diagonální pruhy, stíny žaluzií, okenních rámů nebo závěsů ani tvrdé fleky světla
- žádný CGI/waxy vzhled, fleky, špína nebo deformace
- **NO VISIBLE SHADOW PATTERN ON WALL.**

## MASTER MAT — PRIMARY SCALE AUTHORITY

- Podložka má pevný reálný rozměr 183 × 68 cm; modelka měří 180 cm.
- Podložka je fyzické měřítko celé SOURCE série a určuje velikost modelky, vzdálenost kamery, měřítko místnosti a konzistenci mezi cviky.
- Pokud póza, modelka nebo kamera vůči podložce nesedí, opravuje se modelka nebo kamera. Podložka se nikdy nezkracuje, neprodlužuje ani jinak nerescaluje.
- LYING sanity check: neutrální plně natažená 180cm modelka se musí head-to-toe vejít na 183cm podložku pouze s malou reálnou rezervou. Pokud se nevejde, měřítko obrazu je chybné.

## CAMERA

- Existují tři pevné kamerové třídy: LYING / QUADRUPED / STANDING.
- Každý SOURCE musí použít odpovídající schválený MASTER CAMERA reference image.
- LYING: 1536 × 1024 landscape, low true side view, maximum envelope = plně natažené nohy + paže plně za hlavou, QA tolerance 88–92 % šířky.
- QUADRUPED: 1536 × 1024 landscape, true side view, maximum envelope = Bird Dog, QA tolerance 80–85 % šířky.
- STANDING: 1536 × 1024 landscape, maximum envelope = stoj + paže plně nad hlavou + dvě malé 1kg činky, QA tolerance 88–92 % dostupné výšky.
- Schválený camera reference image má vždy přednost před procentní QA tolerancí.
- Menší nebo kompaktní póza nesmí způsobit zoom, změnu velikosti modelky ani změnu vzdálenosti kamery.
- START, HERO a END jednoho cviku zachovávají stejnou camera class, perspektivu, měřítko a podložku; mezi fázemi není povolen žádný zoom.

## LIGHT

- měkké denní světlo zleva
- pouze jemný plynulý světelný gradient; žádný viditelný stínový vzor na stěně
- žádné večerní světlo
- žádné teplé světlo
- žádný grey wash
- žádná globální desaturace
- zachovat bright, clean, natural, lightly warm-neutral vzhled

## Styl projektu

Styl projektu definuje barevnost, fotografický styl, osvětlení a celkový vizuální charakter celé série. Není to samostatná MASTER reference.

- fotorealistická čistá source fotografie
- realistická anatomie
- přirozená Pilates technika
- ostrý, kvalitní výstup bez AI artefaktů
- přirozený kontrast
- přirozená saturace pleti
- top přesně `#F36F6A`
- legíny přesně `#252528` se zachovaným detailem
- fotografie musí působit jako jedna profesionální série

## NEVER CHANGE

- Model
- Face
- Hair
- Body
- Room
- Mat dimensions and physical scale
- Lighting
- Camera
- Outfit
- Floor
- Colors
- Existing approved assets
- Existing application workflow

## ONLY CHANGE

- Body pose
- Arm position
- Leg position
- Hand position
- Foot position
- Head rotation, only if required by exercise
- Exercise props

## POVINNÉ POSE REUSE

Pokud existuje schválený nebo původní SOURCE obrázek cviku, je závaznou anatomickou a pózovou referencí. Zachovat joint angles, směr končetin, rotaci trupu, polohu rukou, polohu chodidel, gaze a přesnou fázi cviku. Nová póza se nevymýšlí podle textu, pokud obrazová reference existuje.

Při sjednocení se mění pouze poloha těla podle původního obrázku. Modelka, obličej, vlasy, outfit, prostředí, podložka, camera class, perspektiva, světlo, white balance a barvy zůstávají zamčené.

## MASTER WORKFLOW

MASTER

↓

START

↓

HERO

↓

END, pokud se liší

↓

QA

↓

Guide Card

↓

Step by Step

Guide Card a Step by Step vznikají až po schválení čistých source obrázků. Nevytvářej je přímo místo source fotografie.

## PRE-GENERATION QA

Před každým obrázkem musí ChatGPT automaticky ověřit:

- aktivní cvik
- přesně jeden asset: START, HERO nebo END
- že nevzniká Guide Card, Step by Step, Master Card, poster, infografika, UI, koláž ani grafický prvek
- že výstup bude čistá source fotografie bez textu, ikon, čísel, rámečků, šipek, loga a UI
- že bude použit MASTER model, MASTER tvář, MASTER prostředí, styl projektu a EXERCISE_REFERENCE
- že bude použita odpovídající MASTER CAMERA class a pevná podložka 183 × 68 cm jako primary scale authority
- že TOP bude přesně `#F36F6A` a LEGÍNY přesně `#252528`
- že existující původní SOURCE bude použit jako povinná pose reference

Bez PRE-GENERATION QA nesmí generování začít.

## MASTER QA

QA je povinná automaticky, bez vyžádání uživatelem.

Kontrolovat vždy:

- anatomii
- správnost cviku
- identitu modelky
- prostředí
- zákaz viditelného shadow patternu na stěně
- světlo
- perspektivu
- kameru
- camera class a scale proti schválenému camera reference image
- pevnou podložku 183 × 68 cm a měřítko 180cm modelky
- oblečení
- barvy
- shodu START/HERO/END bez zoomu mezi fázemi
- AI artefakty
- celkový dojem jedné série

## SHODA S MASTER tvář

SHODA S MASTER tvář je povinná součást automatické QA. Kontrolovat vždy:

- shodu obličeje
- tvar čelisti
- oči
- nos
- ústa
- uši
- vlasy
- linii vlasů
- profil
- 3/4 pohled
- konzistenci mezi všemi cviky

Pokud identita neodpovídá MASTER tváři, výsledek je automaticky REGENERATE.

## QUALITY GATE

Žádný obrázek nesmí být označen jako APPROVED, pokud:

- není anatomicky správně
- neprojde QA
- nemá minimálně 9.5/10
- není vizuálně konzistentní s MASTER model
- není konzistentní s MASTER prostředí
- není konzistentní se stylem projektu

QUALITY SCORE >= 9.5 / 10 → APPROVED

QUALITY SCORE < 9.5 / 10 → REGENERATE

Obrázek, který vypadá dobře, ale anatomicky neodpovídá referenci, je chybný.
Obrázek, který anatomicky odpovídá, ale vypadá jako jiné focení, je také chybný.
Schválený je pouze obrázek, který splňuje obě podmínky současně.

## MASTER PROMPT RULES

Každý prompt musí říkat:

- Use MASTER model.
- Use MASTER prostředí.
- Use the correct approved MASTER CAMERA reference image.
- Use the fixed 183 × 68 cm mat as the primary physical scale authority for the 180 cm model; never rescale the mat.
- Use HERO reference quality standard for HERO quality.
- Use the existing approved/original exercise SOURCE as the mandatory pose reference when available; otherwise use EXERCISE_REFERENCE.png for anatomy.
- Keep the same model, face, hair, body, outfit, room, camera, light, perspective and floor.
- Keep TOP exactly `#F36F6A` and LEGGINGS exactly `#252528`.
- Change only the body pose and required exercise props.
- NO VISIBLE SHADOW PATTERN ON WALL.
- Create only a clean source image.
- No text, title, labels, icons, frames, UI, numbers or graphic elements.

ChatGPT nesmí improvizovat, domýšlet si pravidla ani vytvářet nové MASTER dokumenty. Pokud si není jistý, musí použít MASTER.

## NEW CHAT RULES

Po založení nového chatu musí ChatGPT:

1. Načíst MASTER/01_DOCUMENTS/MASTER_REFERENCE.md.
2. Načíst MASTER/01_DOCUMENTS/MASTER_IMAGE_CHECKLIST.md.
3. Načíst PILATES_BODY_AI_BIBLE.md.
4. Při práci s anatomickými obrázky načíst MASTER_ANATOMY.md a MOOVKA_MASTER_BODY_v02.
5. Načíst aktuální project guide pouze jako podpůrný kontext.
6. Považovat MASTER za jediný zdroj pravdy pro MASTER pravidla.
7. Nikdy nepřepisovat schválená MASTER pravidla vlastními návrhy.

## OBSOLETE REFERENCES

Starší pravidla, která říkají, že jediný MASTER model je pouze Glute Bridge HERO, jsou zastaralá.
Glute Bridge HERO zůstává schválený referenční obrázek a designový standard, ale MASTER systém v2.0 se řídí rozdělenými referencemi MASTER model, MASTER prostředí, styl projektu a EXERCISE_REFERENCE.
