# Guide Card Template v1.0 - HTML/CSS Proposal

Status: Draft for approval

Reference template:
`Pilates Assets/02_Exercise_Cards/Glute Bridge/glute_bridge_guide_card_v3.png`

## Goal
Prevest schvalenou Guide Card Template v1.0 do HTML/CSS tak, aby karta v aplikaci nebyla jeden velky obrazek, ale responzivni komponenta slozena z jednotlivych fotek a textu.

Karta musi na telefonu bez scrollovani ukazat:
- nazev cviku
- hlavni HERO fotografii
- prubeh START → HERO → START nebo START → HERO → END
- Dech
- Zamer se
- Opakovani

Cilovy mobilni viewport: priblizne 390 × 844 px.

## Data Model
Komponenta by mela dostat data cviku, ne pevne HTML pro jeden cvik.

```js
{
  title: "Glute Bridge",
  photos: {
    start: "Pilates Assets/02_Exercise_Cards/Glute Bridge/glute_bridge_start_v1.png",
    hero: "Pilates Assets/02_Exercise_Cards/Glute Bridge/glute_bridge_hero_v1.png",
    end: null
  },
  workflow: ["START", "HERO", "START"],
  steps: [
    { label: "START", caption: "Výchozí", photo: "start" },
    { label: "HERO", caption: "Zvedni", photo: "hero" },
    { label: "START", caption: "Pomalu zpět", photo: "start" }
  ],
  info: {
    breath: ["Výdech při zvedání.", "Nádech při návratu."],
    focus: ["Aktivuj hýždě a střed těla.", "Neprohýbej bedra."],
    reps: ["12 opakování", "2–3 série"]
  }
}
```

## Component Structure
Navrhovana struktura:

```html
<article class="guide-card">
  <header class="guide-card__header">
    <span class="guide-card__accent"></span>
    <h2>Glute Bridge</h2>
  </header>

  <figure class="guide-card__hero">
    <img src="..." alt="Glute Bridge - HERO">
  </figure>

  <section class="guide-card__flow" aria-label="Průběh cviku">
    <!-- 3x .guide-step -->
  </section>

  <section class="guide-card__info" aria-label="Základní instrukce">
    <!-- Dech, Zaměř se, Opakování -->
  </section>
</article>
```

## CSS Rules
Pouzit existujici barevnost aplikace:
- `--p: #20b6b2`
- `--p2: #e8fbfa`
- `--bg: #f6fbfb`
- `--card: #ffffff`
- `--line: #d9eeee`
- `--text: #102a43`
- `--muted: #637381`

Karta:
- phone-first layout
- max width na mobilu 390 px
- pomer priblizne 390 × 844
- bily vnitrni panel, jemny ramecek, bez stinu nebo jen velmi jemny stin podle aplikace
- zadne svalove mapy, zadne dalsi graficke bloky

Doporucene CSS:

```css
.guide-card {
  width: min(100%, 390px);
  min-height: 844px;
  margin: 0 auto;
  padding: 17px;
  border: 1px solid var(--line);
  border-radius: 15px;
  background: var(--card);
  color: var(--text);
}

.guide-card__accent {
  display: block;
  width: 29px;
  height: 3px;
  border-radius: 999px;
  background: var(--p);
}

.guide-card h2 {
  margin: 18px 0 14px;
  font-size: 24px;
  line-height: 1;
  font-weight: 900;
}

.guide-card__hero {
  margin: 0;
  height: 302px;
  border: 1px solid var(--line);
  border-radius: 11px;
  overflow: hidden;
  background: #fff;
}

.guide-card__hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.guide-card__flow {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  margin-top: 32px;
}

.guide-step {
  position: relative;
  min-width: 0;
  border: 1px solid var(--line);
  border-radius: 9px;
  overflow: hidden;
  background: #fff;
}

.guide-step img {
  width: 100%;
  height: 72px;
  object-fit: contain;
  object-position: center;
  background: #fff;
  display: block;
}

.guide-step__num {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--p);
  color: white;
  font-size: 10px;
  font-weight: 900;
}

.guide-step__body {
  padding: 10px 7px 9px;
}

.guide-step strong {
  display: block;
  color: var(--p);
  font-size: 13px;
  line-height: 1;
  font-weight: 900;
}

.guide-step span {
  display: block;
  margin-top: 6px;
  color: var(--muted);
  font-size: 9px;
  line-height: 1.2;
}

.guide-card__info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  margin-top: 24px;
}

.guide-info {
  min-width: 0;
  min-height: 121px;
  padding: 8px;
  border: 1px solid var(--line);
  border-radius: 9px;
  background: #fcfefe;
}

.guide-info__head {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 14px;
}

.guide-info__icon {
  width: 17px;
  height: 17px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--p2);
  font-size: 9px;
}

.guide-info h3 {
  margin: 0;
  font-size: 10px;
  line-height: 1.1;
  font-weight: 900;
}

.guide-info p {
  margin: 0;
  color: var(--muted);
  font-size: 8.5px;
  line-height: 1.25;
}
```

## Responsive Behavior
Phone-first je hlavni stav. Na sirce pod 390 px:
- karta vyplni sirku obrazovky
- vnitrni padding se muze zmensit pomoci `clamp`
- hlavni fotka zustane nejvetsi prvek
- texty se nezvetsuji podle viewportu, jen zustanou citelne

Na tabletu a desktopu:
- karta zustane jako mobilni preview s max width 390 px
- nemeni se rozlozeni na desktopovou kartu
- okolo karty muze byt centrovany prostor

## Image Handling
Pouzivat jednotlive obrazky:
- HERO v hlavni fotce
- START/HERO/START ve flow radku

Pro hlavni HERO:
- `object-fit: cover`
- cil: emocionalni a vizualne silna fotka

Pro flow fotky:
- `object-fit: contain`
- cil: videt cele telo a prubeh pohybu

Nepouzivat jeden velky staticky obrazek Guide Card jako zdroj v aplikaci. Staticky PNG zustava pouze referencni a exportni asset.

## Implementation Notes
Navrhovany postup po schvaleni:
1. Vytvorit samostatnou komponentu nebo render funkci `GuideCard`.
2. Napojit ji na data cviku.
3. Pouzit existujici CSS promene aplikace.
4. Otestovat na viewportu 390 × 844.
5. Porovnat vizualne proti `glute_bridge_guide_card_v3.png`.
6. Nemazat ani nenahrazovat nic v `assets/exercises`, dokud nebude cela nova knihovna schvalena.

## Acceptance Criteria
- Na 390 × 844 px je bez scrollovani videt nazev, HERO fotka, START → HERO → START, Dech, Zamer se, Opakovani.
- Fotky nejsou rozmazane, protoze se pouzivaji samostatne zdroje.
- Layout vizualne odpovida Template v1.0.
- Barvy, mezery, radiusy, typografie a pomery zustavaji podle Template v1.0.
- Guide Card neobsahuje svalovou mapu ani podrobny Step by Step navod.
