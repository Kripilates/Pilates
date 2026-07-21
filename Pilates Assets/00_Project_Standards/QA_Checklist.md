> MASTER_SYSTEM_V2_ACTIVE
>
> Tento checklist se používá pouze podle `00_CHATGPT_START/MASTER/01_DOCUMENTS/MASTER_REFERENCE.md`.
> QA probíhá automaticky před každým schválením a kontroluje MASTER model, MASTER tvář / SHODA S MASTER tvář, MASTER prostředí, styl projektu, EXERCISE_REFERENCE, anatomii, správnost cviku, kameru, světlo, outfit, barvy a AI artefakty. Bez skóre minimálně 9.5/10 nesmí být výsledek APPROVED.

# PRE-GENERATION QA

Aktivní cvik:

________________

Asset:

□ START

□ HERO

□ END

Kontrola:

□ nebude vytvořena Guide Card

□ nebude vytvořen Step by Step

□ nebude vytvořena Master Card

□ nebude vytvořen poster

□ nebude vytvořena koláž

□ nebude vytvořen obrázek s textem

□ nebude vytvořeno nic jiného než source image

Výsledek:

□ POVOLENO GENEROVAT

□ GENEROVÁNÍ ZAKÁZÁNO

Tato kontrola musí být provedena před každým obrázkem.

# QA Checklist

# POST-GENERATION QA

# 1. MASTER model

- [ ] stejný obličej
- [ ] stejný tvar obličeje
- [ ] stejný nos
- [ ] stejná čelist
- [ ] stejný výraz nebo přirozeně odpovídající výraz
- [ ] stejná barva vlasů
- [ ] stejný účes
- [ ] stejná postava a proporce

Výsledek:

- [ ] PROŠLO
- [ ] NEPROŠLO

# 2. SHODA S MASTER tvář

Použít MASTER tvář: `00_CHATGPT_START/MASTER/02_REFERENCES/MASTER_FACE.png`.

- [ ] shoda obličeje
- [ ] tvar čelisti
- [ ] oči
- [ ] nos
- [ ] ústa
- [ ] uši
- [ ] vlasy
- [ ] linie vlasů
- [ ] profil
- [ ] 3/4 pohled
- [ ] konzistence mezi všemi cviky

Výsledek:

- [ ] PROŠLO
- [ ] NEPROŠLO → REGENERATE

Pokud identita neodpovídá MASTER tváři, obrázek se automaticky označí jako REGENERATE.

# 3. MASTER prostředí

- [ ] stejná místnost
- [ ] stejná police
- [ ] stejné rostliny
- [ ] stejné dekorace
- [ ] stejná podlaha
- [ ] stejná podložka
- [ ] stejná kamera
- [ ] stejná perspektiva
- [ ] stejné světlo
- [ ] stejné stíny

Výsledek:

- [ ] PROŠLO
- [ ] NEPROŠLO

# 4. BAREVNOST A SVĚTLO

- [ ] stejný odstín pleti
- [ ] stejný odstín topu
- [ ] stejný odstín legín
- [ ] bez nežádoucího žlutého nebo oranžového nádechu
- [ ] bez výrazně chladnějšího nebo teplejšího posunu

# 5. OBLEČENÍ

- [ ] korálový top
- [ ] antracitové legíny
- [ ] bosé nohy
- [ ] žádné boty
- [ ] žádné nové doplňky

# 6. ANATOMICKÁ SHODA S EXERCISE_REFERENCE

- [ ] EXERCISE_REFERENCE.png byla při kontrole otevřená
- [ ] nový obrázek byl porovnán s referencí vedle sebe
- [ ] správné aktivní končetiny
- [ ] správná pravá a levá strana
- [ ] správné úhly v kloubech
- [ ] správná poloha hlavy a krku
- [ ] správná poloha páteře a pánve
- [ ] správná poloha chodidel a dlaní
- [ ] správná varianta cviku
- [ ] žádné anatomické AI artefakty

Pokud některý bod anatomické kontroly neprojde, výsledek je NESCHVÁLENO.

# 7. AI ARTEFAKTY

- [ ] ruce a prsty
- [ ] chodidla a prsty
- [ ] klouby
- [ ] vlasy
- [ ] oblečení
- [ ] pozadí
- [ ] žádné deformace

# 8. CELKOVÝ DOJEM JEDNOHO FOCENÍ

Povinná otázka:

„Působí tento obrázek jako fotografie stejné modelky ve stejné místnosti během stejného focení?“

- [ ] ANO
- [ ] NE

Pokud NE:
Výsledek je automaticky NESCHVÁLENO.

# Bodové hodnocení

MASTER model: __ / 10
SHODA S MASTER tvář: __ / 10
MASTER prostředí: __ / 10
BAREVNOST: __ / 10
ANATOMIE: __ / 10
AI KVALITA: __ / 10
CELKEM: __ / 10

Pravidlo:
Pod 9,5 se obrázek neschvaluje.

# Výsledek QA

- [ ] schváleno
- [ ] neschváleno
- [ ] poznámky k opravě zapsány
