# MASTER PACK v2.0 Reference

Status: ACTIVE MASTER SYSTEM

Tento dokument je jediný platný MASTER systém projektu Pilates Body 40+.
Starší MASTER dokumenty a starší MASTER_PACK jsou historické reference. Pokud jsou v rozporu s tímto dokumentem, platí MASTER_PACK_V2.

Nejvyšší prioritou je plná zpětná kompatibilita projektu. Žádné pravidlo nesmí rozbít existující workflow aplikace ani již schválené obrazové podklady. Sjednocení pravidel nemění obsah ani logiku projektu.

## MASTER SOURCES

- MODEL_MASTER_CHARACTER.png: jediná oficiální modelka projektu.
- MASTER TVÁŘ: `Pilates Assets/01_Master_Reference/Master tvář.png`, víceúhlová referenční karta obličeje modelky a oficiální součást MASTER CHARACTER identity.
- ENVIRONMENT_MASTER.png: jediný zdroj pravdy pro místnost, světlo, kameru, perspektivu, podložku, podlahu, palmu a polici.
- MODEL_MASTER_HERO.png: referenční kvalita HERO fotografie.
- MODEL_MASTER_SCENE.png: historická scéna ponechaná kvůli kompatibilitě; pro nové posouzení prostředí má přednost ENVIRONMENT_MASTER.png.
- EXERCISE_REFERENCE.png: anatomická reference konkrétního cviku, dodává se pro právě řešený cvik.

## MASTER CHARACTER

- MODEL_MASTER_CHARACTER je jediná oficiální modelka projektu.
- Modelka se nemění.
- Obličej se nemění.
- Vlasy se nemění.
- Postava se nemění.
- Identita musí působit jako stejná konkrétní žena, ne pouze podobný typ.
- Věk cca 40 let.
- Přirozená atletická postava.
- Bez svalového kulturistického vzhledu.
- Přirozené ženské proporce.
- Pleť musí zůstat přirozená a konzistentní s MASTER CHARACTER.
- Vlasy: natural mid-light Central European hair, dark blonde / light brown appearance, bez dark brunette, black, copper, orange nebo red dojmu.
- Víceúhlová reference obličeje Master tvář.png pouze zpřesňuje stejnou identitu modelky.

## MASTER TVÁŘ

MASTER TVÁŘ je oficiální referenční karta identity obličeje modelky. Musí být používána společně s MASTER CHARACTER, MASTER ENVIRONMENT a MASTER STYLE při každém generování cviku.

MASTER TVÁŘ slouží jako referenční identita pro:

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

Při každém generování cviku musí být MASTER TVÁŘ považována za součást identity modelky. Modelka se nesmí měnit.

Mění se pouze:

- poloha těla
- výraz podle potřeby cviku
- směr pohledu, pokud to vyžaduje anatomie cviku

Pokud identita neodpovídá MASTER TVÁŘI, obrázek se automaticky označí jako REGENERATE.

## MASTER OUTFIT

- coral sport bra
- anthracite leggings
- barefoot
- žádné boty
- žádné hodinky
- žádné šperky
- žádné nové doplňky

## MASTER ENVIRONMENT

ENVIRONMENT_MASTER je jediný zdroj pravdy pro prostředí.

- světlá chladnější místnost
- palma vlevo
- dřevěná police vpravo
- bílé závěsy
- světlá přírodní dřevěná podlaha
- tmavě šedá podložka
- stejné rozmístění objektů
- žádná změna místnosti
- žádná změna podložky
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

## MASTER STYLE

- fotorealistická čistá source fotografie
- realistická anatomie
- přirozená Pilates technika
- ostrý, kvalitní výstup bez AI artefaktů
- přirozený kontrast
- přirozená saturace pleti
- jasně viditelný coral-pink top
- charcoal leggings a charcoal mat se zachovaným detailem
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
- Mat
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
- že bude použit MASTER CHARACTER, MASTER TVÁŘ, MASTER ENVIRONMENT, MASTER STYLE a EXERCISE_REFERENCE

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

## MASTER FACE MATCH

MASTER FACE MATCH je povinná součást automatické QA. Kontrolovat vždy:

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

Pokud identita neodpovídá MASTER TVÁŘI, výsledek je automaticky REGENERATE.

## QUALITY GATE

Žádný obrázek nesmí být označen jako APPROVED, pokud:

- není anatomicky správně
- neprojde QA
- nemá minimálně 9.5/10
- není vizuálně konzistentní s MASTER CHARACTER
- není konzistentní s MASTER ENVIRONMENT
- není konzistentní s MASTER STYLE

QUALITY SCORE >= 9.5 / 10 → APPROVED

QUALITY SCORE < 9.5 / 10 → REGENERATE

Obrázek, který vypadá dobře, ale anatomicky neodpovídá referenci, je chybný.
Obrázek, který anatomicky odpovídá, ale vypadá jako jiné focení, je také chybný.
Schválený je pouze obrázek, který splňuje obě podmínky současně.

## MASTER PROMPT RULES

Každý prompt musí říkat:

- Use MODEL_MASTER_CHARACTER.png.
- Use ENVIRONMENT_MASTER.png.
- Use MODEL_MASTER_HERO.png for HERO quality.
- Use EXERCISE_REFERENCE.png for anatomy.
- Keep the same model, face, hair, body, outfit, room, camera, light, perspective, floor and mat.
- Change only the body pose and required limb positions.
- Create only a clean source image.
- No text, title, labels, icons, frames, UI, numbers or graphic elements.

ChatGPT nesmí improvizovat, domýšlet si pravidla ani vytvářet nové MASTER dokumenty. Pokud si není jistý, musí použít MASTER_PACK_V2.

## NEW CHAT RULES

Po založení nového chatu musí ChatGPT:

1. Načíst MASTER_PACK_V2/MASTER_REFERENCE.md.
2. Načíst MASTER_PACK_V2/MASTER_IMAGE_CHECKLIST.md.
3. Načíst PILATES_BODY_AI_BIBLE.md.
4. Načíst aktuální project guide pouze jako podpůrný kontext.
5. Považovat MASTER_PACK_V2 za jediný zdroj pravdy pro MASTER pravidla.
6. Nikdy nepřepisovat schválená MASTER pravidla vlastními návrhy.

## OBSOLETE REFERENCES

Starší pravidla, která říkají, že jediný MODEL MASTER je pouze Glute Bridge HERO, jsou zastaralá.
Glute Bridge HERO zůstává schválený referenční obrázek a designový standard, ale MASTER systém v2.0 se řídí rozdělenými referencemi MASTER CHARACTER, MASTER ENVIRONMENT, MASTER STYLE a EXERCISE_REFERENCE.
