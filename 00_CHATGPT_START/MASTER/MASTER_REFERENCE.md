# OFICIÁLNÍ MASTER SYSTÉM

Projekt Pilates Body 40+ používá pouze tyto čtyři závazné reference:

1. MASTER prostředí
   Referenční fotografie místnosti.
   Určuje kameru, perspektivu, světlo, podlahu, rozmístění objektů a barevnost.

2. MASTER model
   Referenční fotografie celé modelky.
   Určuje postavu, oblečení, vlasy a identitu.

3. MASTER tvář
   Referenční fotografie obličeje.
   Určuje obličej, oči, nos, ústa, čelist, výraz a odstín pleti.

4. EXERCISE_REFERENCE
   Referenční fotografie nebo ilustrace konkrétního cviku.
   Určuje anatomicky správnou polohu těla.

Podložka není součást MASTER prostředí.
Je rekvizitou konkrétního cviku stejně jako činky, odporová guma nebo míč.

Veškeré další historické názvy jsou považovány za neplatné.
# MASTER PACK v2.0 Reference

Status: ACTIVE MASTER SYSTEM

Tento dokument je jediný platný MASTER systém projektu Pilates Body 40+.
Starší MASTER dokumenty jsou historické reference. Pokud jsou v rozporu s tímto dokumentem, platí MASTER.

Nejvyšší prioritou je plná zpětná kompatibilita projektu. Žádné pravidlo nesmí rozbít existující workflow aplikace ani již schválené obrazové podklady. Sjednocení pravidel nemění obsah ani logiku projektu.

## MASTER SOURCES

- MASTER model: jediná oficiální modelka projektu.
- MASTER tvář: `Pilates Assets/01_Master_Reference/Master tvář.png`, víceúhlová referenční karta obličeje modelky a oficiální součást MASTER model identity.
- MASTER prostředí: jediný zdroj pravdy pro místnost, světlo, kameru, perspektivu, podlahu, palmu, polici, dekorace a barevnost.
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
- Víceúhlová reference obličeje Master tvář.png pouze zpřesňuje stejnou identitu modelky.

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

- coral sport bra
- anthracite leggings
- barefoot
- žádné boty
- žádné hodinky
- žádné šperky
- žádné nové doplňky

## MASTER prostředí

MASTER prostředí je jediný zdroj pravdy pro prostředí. Podložka není součást MASTER prostředí; je rekvizita konkrétního cviku stejně jako činky, odporová guma, míč nebo další pomůcky.

- světlá chladnější místnost
- palma vlevo
- dřevěná police vpravo
- bílé závěsy
- světlá přírodní dřevěná podlaha
- stejné rozmístění objektů
- žádná změna místnosti
- žádná změna police
- žádná změna palmy

## CAMERA

- stále stejná výška
- stále stejná vzdálenost
- stále stejná perspektiva
- stále stejné ohnisko a kompozice
- žádný zoom
- žádná změna perspektivy

## LIGHT

- měkké denní světlo zleva
- stejné stíny
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
- jasně viditelný coral-pink top
- charcoal leggings se zachovaným detailem
- fotografie musí působit jako jedna profesionální série

## NEVER CHANGE

- Model
- Face
- Hair
- Body
- Room
- Shelf
- Plant
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
- Mat, only as exercise prop
- Exercise props

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

Bez PRE-GENERATION QA nesmí generování začít.

## MASTER QA

QA je povinná automaticky, bez vyžádání uživatelem.

Kontrolovat vždy:

- anatomii
- správnost cviku
- identitu modelky
- prostředí
- světlo
- perspektivu
- kameru
- oblečení
- barvy
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
- Use HERO reference quality standard for HERO quality.
- Use EXERCISE_REFERENCE.png for anatomy.
- Keep the same model, face, hair, body, outfit, room, camera, light, perspective and floor.
- Change only the body pose, required limb positions, mat and exercise props.
- Create only a clean source image.
- No text, title, labels, icons, frames, UI, numbers or graphic elements.

ChatGPT nesmí improvizovat, domýšlet si pravidla ani vytvářet nové MASTER dokumenty. Pokud si není jistý, musí použít MASTER.

## NEW CHAT RULES

Po založení nového chatu musí ChatGPT:

1. Načíst MASTER/MASTER_REFERENCE.md.
2. Načíst MASTER/MASTER_IMAGE_CHECKLIST.md.
3. Načíst PILATES_BODY_AI_BIBLE.md.
4. Načíst aktuální project guide pouze jako podpůrný kontext.
5. Považovat MASTER za jediný zdroj pravdy pro MASTER pravidla.
6. Nikdy nepřepisovat schválená MASTER pravidla vlastními návrhy.

## OBSOLETE REFERENCES

Starší pravidla, která říkají, že jediný MASTER model je pouze Glute Bridge HERO, jsou zastaralá.
Glute Bridge HERO zůstává schválený referenční obrázek a designový standard, ale MASTER systém v2.0 se řídí rozdělenými referencemi MASTER model, MASTER prostředí, styl projektu a EXERCISE_REFERENCE.
