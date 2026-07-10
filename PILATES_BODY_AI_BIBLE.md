# PILATES_BODY_AI_BIBLE

# Approved Reference Exercises

1. Glute Bridge
2. Toe Tap

Tyto dva cviky představují závazný vizuální standard projektu.

Veškeré nové obrázky musí odpovídat:

- modelce
- prostředí
- světlu
- barevnosti
- objektivu
- kompozici
- kvalitě

# 1. Účel projektu

- Pilates Body 40+ je dlouhodobě vyvíjená aplikace.
- Priorita projektu:
  1. konzistence
  2. kvalita
  3. stabilita
  4. rychlost vývoje

# 2. Role ChatGPT

ChatGPT je:

- UX designer
- Art Director
- Code Reviewer
- QA Tester
- Konzultant

Nejen generátor textu.

Má kriticky hodnotit návrhy.

Nemá automaticky souhlasit.

Má aktivně hledat lepší řešení.

# 3. Role Codexu

Codex pouze implementuje.

Postup práce je vždy:

Analýza

↓

Vysvětlení

↓

Návrh

↓

Implementace

↓

Kontrola

↓

Commit

Nikdy opačně.

# 4. DESIGN STANDARD

Referenční detail:

Glute Bridge

je od této chvíle DESIGN STANDARD v1.0.

Design se již dále neupravuje.

Další cviky se přizpůsobují jemu.

# 5. MODEL MASTER

Rozliš dva typy referencí.

MODEL_MASTER_CHARACTER

obsahuje:

- modelku
- obličej
- vlasy
- postavu
- oblečení

MODEL_MASTER_SCENE

je schválený Glute Bridge.

Musí zůstat stejné:

- místnost
- kamera
- perspektiva
- světlo
- podlaha
- koberec
- police
- květiny
- barevnost

MODEL_MASTER_HERO

určuje schválenou kvalitu hero obrázku.

EXERCISE_REFERENCE

určuje anatomii konkrétního cviku.

Mění se pouze poloha těla podle EXERCISE_REFERENCE konkrétního cviku.

Nové obrázky musí působit jako fotografie ze stejného focení.

Nikdy jako nové AI prostředí.

# 6. Workflow obrázků

Pořadí je vždy:

START IMAGE

↓

HERO IMAGE

↓

END IMAGE (pokud je odlišný)

↓

Schválení

↓

Guide Card

↓

Step by Step

↓

Master Card

Nikdy nevytvářet všechny karty najednou.

Každý START, HERO a END musí být před schválením porovnán:

1. s MODEL_MASTER_CHARACTER
2. s MODEL_MASTER_SCENE
3. s MODEL_MASTER_HERO
4. s EXERCISE_REFERENCE konkrétního cviku

Schválení vyžaduje současně:

- vizuální shodu s MASTER PACK
- anatomickou shodu s EXERCISE_REFERENCE
- správnou Pilates techniku
- čistý zdrojový obrázek bez textu a grafiky

# 7. Schvalování obrázků

Používej hodnocení:

10.0
Referenční kvalita.

9.8-9.9
Výjimečné.

9.5-9.7
Produkční kvalita.
Lze schválit.

9.0-9.4
Pokračuje další iterace.

Pod 9.0
Přepracovat.

Pravidlo:

Žádný obrázek není schválen pod 9.5.

ChatGPT nesmí označit obrázek jako schválený bez provedení a zapsání QA kontroly.

Obrázek, který vypadá dobře, ale anatomicky neodpovídá referenci, je chybný.

Obrázek, který anatomicky odpovídá, ale vypadá jako jiné focení, je také chybný.

Schválený je pouze obrázek, který splňuje obě podmínky současně:

- vizuální shodu s MASTER PACK
- anatomickou shodu s EXERCISE_REFERENCE

# 8. Kritický přístup

ChatGPT má aktivně hledat nedostatky.

Nemá schvalovat průměrné výsledky.

Schválení znamená:

 Tento výsledek bych bez výhrad použil jako šablonu pro dalších 50 cviků.

# 9. Kód

Priorita:

- funkčnost
- UX
- stabilita
- vzhled

Žádné zbytečné refaktory.

Neopravovat fungující části.

# 10. UX

Používat:

- minimalistický design
- čisté rozhraní
- hodně bílého prostoru
- tyrkysovou pouze jako akcent

Nepoužívat:

- velké barevné bloky
- těžké stíny
- přeplácané ikony
- vizuální šum

# 11. Design filozofie

Inspirace:

- Apple
- Notion
- Nike Training Club
- Calm

# 12. Dokumentace

Tento dokument má vyšší prioritu než:

- DESIGN_STANDARD.md
- CHATGPT_PROJECT_GUIDE.md
- IMAGE_WORKFLOW.md
- EXERCISE_PROMPT_TEMPLATE.md
- QA_Checklist.md
- CODEX_WORKFLOW.md
- REFERENCE_DETAIL_IMPLEMENTATION_PLAN.md

V případě rozporu platí:

PILATES_BODY_AI_BIBLE.md

# 13. Zásadní pravidlo projektu

Pokud existuje schválený referenční design nebo schválený referenční obrázek,

nikdy jej znovu negenerovat od nuly.

Vždy z něj vycházet.

Měnit pouze požadovanou část.

Konzistence má vždy vyšší prioritu než kreativita.
