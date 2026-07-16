> MASTER_SUPERSEDES_THIS_FILE
>
> Tento soubor je ponechán pouze jako historická reference. Aktuální jediný platný MASTER systém je:
> `00_CHATGPT_START/MASTER/MASTER_REFERENCE.md`
>
> Pokud je tento soubor v rozporu s MASTER, platí MASTER. Historii nemaž.

# MASTER PACK RULES

## Current approved visual references

- Glute Bridge
- Toe Tap
- Dead Bug

Při generování nových cviků se používají jako hlavní vizuální reference.

MASTER_PACK je nejdůležitější složka pro tvorbu obrázků.

Musí obsahovat referenční obrázky:

- MODEL_MASTER_SCENE.png
  Schválený Glute Bridge / hlavní scéna.
  Určuje místnost, kameru, světlo, podlahu, podložku, police, rostliny a barevnost.

- MODEL_MASTER_CHARACTER.png
  Schválená modelka.
  Určuje obličej, vlasy, postavu, oblečení a celkový vzhled.

- MODEL_MASTER_HERO.png
  Finální schválený hero obrázek Glute Bridge.

- EXERCISE_REFERENCE.png
  Anatomická reference konkrétního nového cviku, např. Toe Tap.
  Určuje přesnou pozici těla, směr rukou a nohou, úhly v kloubech, oporu těla, správnou variantu cviku a případné střídání stran.

## PRE-GENERATION QA

PRE-GENERATION QA je povinná součást workflow.

Pořadí je vždy:

PRE-GENERATION QA

↓

Generate

↓

POST-GENERATION QA

↓

Approval

Nikdy nesmí být žádný krok přeskočen.

## MASTER MATCH PRIORITY

Pořadí priority je:

1. Stejná modelka
2. Stejná scéna
3. Stejné světlo a barevnost
4. Stejné oblečení
5. Správná anatomie

Pokud první dvě podmínky neprojdou, další kontrola nemůže vést ke schválení.

MASTER CHARACTER znamená:

- stejný obličej
- stejný tvar obličeje
- stejný nos
- stejná čelist
- stejný odstín vlasů
- stejný účes
- stejná postava a proporce

MASTER SCENE znamená:

- stejná místnost
- stejná police
- stejné rostliny
- stejná váza a dekorace
- stejná podlaha
- stejná podložka
- stejná perspektiva
- stejná výška kamery
- stejné světlo a stíny

Nový obrázek nesmí být hodnocen samostatně.
Musí být vždy porovnán vedle sebe minimálně s:

- MODEL_MASTER_CHARACTER.png
- MODEL_MASTER_SCENE.png
- MODEL_MASTER_HERO.png

Při dostupnosti schválených cviků také s:

- Glute Bridge
- Toe Tap
- Dead Bug

## Závazné pravidlo pro nový cvik

Při tvorbě každého nového cviku musí být kromě MASTER referencí vždy použita také anatomická reference:

EXERCISE_REFERENCE.png

Nový obrázek nesmí být schválen pouze podle vizuální podobnosti s MODEL_MASTER.
Musí být současně porovnán vedle sebe s EXERCISE_REFERENCE.png.

Kontrolní otázky:

- Odpovídá poloha těla anatomické referenci?
- Jsou aktivní správné končetiny?
- Jsou pravá a levá strana správně rozlišeny?
- Odpovídají úhly kolen, kyčlí, ramen a loktů?
- Je hlava, krk a páteř ve správné poloze?
- Nezměnil generátor cvik na jinou variantu?

Pokud anatomie neodpovídá referenci, obrázek se neschvaluje ani v případě, že vizuálně odpovídá MODEL_MASTER.

Při tvorbě nového obrázku platí:

1. Neměnit scénu.
2. Neměnit modelku.
3. Neměnit oblečení.
4. Neměnit světlo.
5. Neměnit kameru.
6. Neměnit podlahu, rostliny, polici ani dekorace.
7. Mění se pouze poloha těla podle nového cviku a podle EXERCISE_REFERENCE.png.

Pokud nový obrázek vypadá jako jiná místnost, jiná modelka nebo jiné focení, je chybný.

Cílem není hezký samostatný obrázek.
Cílem je jednotná fotografická série.

Kontrolní otázka:
Kdyby uživatel viděl Glute Bridge a nový obrázek vedle sebe, uvěřil by, že vznikly během stejného focení?

Pokud ne, obrázek se neschvaluje.