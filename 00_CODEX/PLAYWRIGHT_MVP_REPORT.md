# Playwright QA MVP - Moovka

Datum: 2026-08-18

## Prostredi

- Browser skutecne spusten: NE
- Moovka skutecne nactena v browseru: NE
- Zvoleny zdroj: lokalni staticka aplikace
- Testovana URL: `http://127.0.0.1:8765/` (planovana, browser se pred navigaci nespustil)
- Viewport: `390 x 844 px`
- Playwright puvodne v projektu: NE
- `package.json`: NEEXISTUJE
- Bundled runtime obsahuje knihovnu `playwright`, ale projekt nema `@playwright/test` ani vlastni Playwright konfiguraci.

## Technicky blocker

Browser runtime skoncil pred spustenim browser procesu chybou:

```text
windows sandbox failed: helper_unknown_error: setup refresh had errors
```

Byl proveden jeden bezpecny restart browser relace. Druhy pokus skoncil stejnou chybou. Podle omezeni MVP nebyla zkousena dalsi alternativni implementace, samostatny externi runner ani instalace zavislosti.

## Screenshoty

- Pocet screenshotu: `0/12`
- Adresar `00_CODEX/visual-qa-mvp/` nebyl vytvoren, protoze nevznikl zadny screenshot.

### SKIPPED

- `01_home.png` - browser se nespustil
- `02_plan.png` - browser se nespustil
- `03_day_detail.png` - browser se nespustil
- `04_program.png` - browser se nespustil
- `05_about.png` - browser se nespustil
- `06_onboarding_1.png` - browser se nespustil
- `07_onboarding_2.png` - browser se nespustil
- `08_onboarding_3.png` - browser se nespustil
- `09_calendar.png` - browser se nespustil
- `10_exercise_library.png` - browser se nespustil
- `11_exercise_detail.png` - browser se nespustil
- `12_workout.png` - browser se nespustil

## Minimalni kontroly

| Kontrola | Vysledek |
|---|---|
| Aplikace se nacetla v browseru | SKIPPED |
| Fatalni `pageerror` | NELZE OVERIT |
| Zasadni `console.error` | NELZE OVERIT |
| Horizontalni overflow | NELZE OVERIT |
| Hlavni navigace | SKIPPED |
| Plan | SKIPPED |
| Detail dne | SKIPPED |
| Prvni obrazovka workoutu | SKIPPED |

## Zachycene chyby

- Console errors: nezachyceny; browser se nespustil.
- Page errors: nezachyceny; browser se nespustil.
- Overflow problemy: nelze overit.
- Produkcni chyba Moovky nebyla prokazana. Blocker patri k lokalnimu browser sandboxu QA prostredi.

## Dalsi spusteni

Po zprovozneni browser sandboxu spustit lokalni aplikaci z korene repozitare:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Potom zopakovat Playwright MVP proti:

```text
http://127.0.0.1:8765/
```

## Verdikt

**PLAYWRIGHT MVP: FAIL**

**MANUAL DECISION REQUIRED:** Opravit nebo povolit lokalni browser sandbox; produkcni kod aplikace kvuli testu nemenit.

