# Difficulty System Design

## Implementation status (2026-08-12)

`IMPLEMENTED: YES` in `v59.74-dev`.

- The manually approved `30_DAY_3_LEVEL_FINAL_SPEC.md` remains unchanged and is the source of truth.
- All 26 active days contain exact `easy`, `medium`, and `hard` doses; the 9 HIGH corrections and approved order changes are included.
- Series are `easy = 2`, `medium = 3`, and `hard = 3`.
- The persistent preference is stored in `pb40-program-difficulty-v1`; legacy activity without this key migrates to `medium` without deleting progress.
- New users choose a level on first real program entry. The level can also be changed from Plan and day detail.
- A new workout creates an immutable in-memory difficulty snapshot. Same-session detail/resume keeps that snapshot even if the global preference changes.
- Completed-day difficulty metadata and true cross-reload workout resume remain Phase 2 recommendations.
- Implementation QA covered 360, 390, and 430 px mobile widths, desktop, all dose formats, all three levels, Android Back, same-session resume, progress preservation, and multi-tab preference changes.

Datum auditu: 2026-08-12  
Stav aplikace při auditu: `v59.73-dev`  
Rozsah: návrh architektury a UX, bez implementace

Schválený zdroj dávek: `00_CODEX/30_DAY_3_LEVEL_FINAL_SPEC.md`  
Stav zdroje: **MANUALLY APPROVED** (2026-08-12)

## 1. Současný stav

### Datový model programu

- Zdroj programu je `window.PB40_DATA` v `data.js`.
- Cviky jsou uloženy v objektu `exercises` podle kanonického ID.
- Program obsahuje 30 položek v `days`; 26 tréninkových dnů a 4 volné dny.
- Hlavní část dne používá tuple `[exerciseId, dose]`, například `["rdl", "12×"]`.
- Závěrečné protažení používá stejný tvar v `stretch`.
- Dávka je dnes vždy jeden řetězec. Parser v `app.js` z něj odvozuje opakování, čas, strany a střídání.
- Počet sérií není v datech. `workoutTotalSets` je globálně inicializován na `3`.
- Plan a detail dne zobrazují přímo dávku z tuple. Workout ji čte opakovaně z aktuálního `data.days`.

Současné řetězce pokrývají potřebné typy bez nového parseru:

- opakování: `12×`
- střídavě: `20× střídavě`
- strany: `12/12`
- čas: `30 s`
- čas na stranu: `30 s/strana`

### Progress a persistentní data

Progress je uložen v `localStorage` po jednotlivých cvicích:

- `pb40-d{dayIndex}-e{exerciseIndex}` = `1`
- den je hotový, pokud jsou hotové všechny jeho položky
- aktuální den se neukládá samostatně; `nextDayIndex()` najde první nehotový den
- denní aktivita: `pb40-log-YYYY-MM-DD`
- oblíbené: `pb40-fav-{exerciseId}`
- měření: `pb40-measurements`
- poznámky: `pb40-workout-notes`
- onboarding: `pb40-intro-seen-v11`

Export zahrne všechny klíče s prefixem `pb40-`, ale import dnes přijme pouze explicitně povolené klíče. Nový klíč obtížnosti proto musí být doplněn do `allowedBackupKey()` a validován v `cleanBackupValue()`.

### Workout state a resume

Aktivní workout je pouze v paměti JavaScriptu: den, cvik, série, fáze, odpočet, pauza a další hodnoty jsou globální proměnné. Přechod do detailu cviku umí timer pozastavit a po návratu pokračovat, protože stránka nebyla reloadována.

Po reloadu nebo zavření aplikace se workout neobnoví. Tlačítko `Pokračovat v tréninku` spouští první nehotový den přes `nextDayIndex()`; nejde o obnovu konkrétní fáze, série ani zbývajícího času. History guard chrání navigaci, ale není persistentní workout state.

### Plan a detail dne

- `days()` renderuje Plan a tlačítko pro první nehotový den.
- `day()` renderuje detail dne, souhrn, pomůcky, dávky a spuštění workoutu.
- `daySummary()` dnes dopočítává orientační obtížnost z metadat cviků; nejde o uživatelskou programovou obtížnost.
- `startTraining()` nastaví runtime stav a vždy používá 3 série.

## 2. Doporučený datový model

Rozšířit současný tuple model, nevytvářet paralelní katalog ani nový seznam dní.

```js
window.PB40_DATA = {
  program: {
    defaultDifficulty: "medium",
    difficulties: {
      easy:   { label: "Lehká",   sets: 2 },
      medium: { label: "Střední", sets: 3, recommended: true },
      hard:   { label: "Náročná", sets: 3 }
    }
  },
  exercises: { /* beze změny kontraktu */ },
  days: [
    {
      items: [
        ["rdl", {
          easy: "10×",
          medium: "12×",
          hard: "15×"
        }]
      ],
      stretch: ["figure_four", "35 s/strana"]
    }
  ]
};
```

Závěrečný stretch může zůstat scalar string, pokud se mezi úrovněmi nemění. Resolver musí podporovat obojí kvůli bezpečné migraci:

```js
function resolveDose(rawDose, difficulty) {
  if (typeof rawDose === "string") return rawDose;
  return rawDose?.[difficulty] ?? rawDose?.medium ?? "";
}
```

Tím zůstávají existující parsery pro opakování, střídání, strany a čas použitelné. Veškeré zobrazení dávky musí jít přes jediný resolver; žádná obrazovka nesmí číst objekt dávky přímo.

Počet sérií je společná vlastnost úrovně v `program.difficulties`, nikoli opakovaná u každého dne. Odpočinkové dny zůstávají beze změny.

Před implementací musí proběhnout validační kontrola:

- každý aktivní item má `easy`, `medium`, `hard`
- každá hodnota je validní řetězec stávajícího formátu
- `easy <= medium <= hard` podle typu dávky
- ID a pořadí položek se vůči schválené specifikaci nemění

## 3. Persistentní `programDifficulty`

Jediný zdroj pravdy pro výchozí obtížnost:

`pb40-program-difficulty-v1`

Povolené hodnoty: `easy`, `medium`, `hard`. UI nikdy nezobrazuje interní názvy.

```js
const PROGRAM_DIFFICULTY_KEY = "pb40-program-difficulty-v1";

function normalizeDifficulty(value) {
  return ["easy", "medium", "hard"].includes(value) ? value : "medium";
}
```

Čtení a zápis mají být soustředěné v malém helperu. Ostatní komponenty nedrží druhou persistentní kopii. Změna klíče nesmí volat reset dne ani upravovat žádný progress klíč.

Pomocný jednorázový UX marker může být samostatný:

`pb40-difficulty-migration-notice-v1`

Není zdrojem obtížnosti; pouze brání opakování migrační informace. Oba nové klíče musí být zahrnuty do bezpečného importu/exportu.

## 4. Workout difficulty snapshot

Při každém novém spuštění workoutu se vytvoří neměnný runtime snapshot:

```js
workoutContext = {
  dayIndex: di,
  difficulty: getProgramDifficulty(),
  totalSets: setsForDifficulty(getProgramDifficulty()),
  resolvedItems: day.items.map(([id, dose]) => [
    id,
    resolveDose(dose, getProgramDifficulty())
  ]),
  resolvedStretch: day.stretch
    ? [day.stretch[0], resolveDose(day.stretch[1], getProgramDifficulty())]
    : null
};
```

Praktická implementace má obtížnost načíst jednou do lokální proměnné, ne třikrát jako v ukázce. `workoutTotalSets`, všechny dávky, progress denominator, timer parser, side logic a detail otevřený z workoutu musí číst z `workoutContext`.

Globální obtížnost se během workoutu může změnit z jiné záložky, ale snapshot se nepřepočítá. Nová hodnota se použije až při novém workoutu po dokončení nebo potvrzeném ukončení současného.

Snapshot se týká automatického i ručního spuštění; obě tlačítka dnes vstupují do stejného `startTraining()`.

## 5. Migrace existujících uživatelů

Migrace je aditivní a nesmí měnit žádný existující klíč.

1. Pokud je `pb40-program-difficulty-v1` validní, použije se.
2. Pokud klíč chybí a existuje legacy aktivita, zapíše se `medium`.
3. Legacy aktivita znamená alespoň jeden progress, log, oblíbený cvik, měření nebo workout note. Samotný intro marker nestačí k tvrzení, že uživatelka program skutečně používá.
4. Stávající uživatelce se při nejbližším vstupu do Plánu nebo detailu dne ukáže stručná neblokující informace s možností změny.
5. Pokud klíč chybí a legacy aktivita neexistuje, zobrazí se povinný první výběr při prvním skutečném vstupu do programu.
6. Neplatná nebo poškozená hodnota se normalizuje na `medium`; progress zůstane nedotčený.

Beze změny zůstanou:

- `pb40-d*-e*` a odvozený aktuální den
- kalendář a streak
- oblíbené
- měření
- poznámky
- všechny assetové a programové vazby

Import staré zálohy bez obtížnosti musí po importu projít stejnou migrací. Import nové zálohy musí obtížnost zachovat. Reset jednotlivého dne ani případný budoucí reset progressu nemá mazat globální preference, pokud UI výslovně nenabízí úplný reset nastavení.

## 6. Flow prvního výběru obtížnosti

Trigger: první vstup do Plánu, detailu dne nebo přímé spuštění workoutu, pokud uživatelka nemá validní obtížnost a nemá legacy aktivitu.

Obrazovka/modální krok:

- nadpis `Jak chceš začít?`
- Lehká: `Příjemný start a menší objem cvičení. · 2 série`
- Střední: `Doporučujeme · Plnohodnotný trénink. · 3 série`
- Náročná: `Vyšší objem pro zkušenější. · 3 série`
- doplněk `Obtížnost můžeš kdykoliv změnit.`

`medium` je vizuálně doporučená, ale volba se zapíše až po potvrzení uživatelkou. Po potvrzení pokračuje původní zamýšlená akce, například otevření dne nebo spuštění workoutu.

Intro lze rozšířit o tento krok, ale obtížnost nesmí být svázána pouze s `pb40-intro-seen-v11`, protože přímé routy a existující uživatelé mohou intro obejít.

## 7. Flow změny z Plánu

V horní kartě Plánu zobrazit kompaktní ovládání:

`Obtížnost: Střední ▾`

Po aktivaci otevřít malý popover/bottom sheet se třemi úrovněmi. Potvrzení:

- zapíše pouze `pb40-program-difficulty-v1`
- překreslí Plan a dávkové náhledy, pokud je Plan zobrazuje
- nesmaže progress ani historii
- nezmění aktivní `workoutContext`

Plan může u úrovně uvést počet sérií, ale nemá zobrazovat procenta nebo všechny dávky najednou.

## 8. Flow změny z detailu dne

Do existujícího kompaktního `dayInfoGrid` přidat ovládací pill vedle délky, zaměření a pomůcek. Nesmí vzniknout nová velká karta.

Před workoutem změna:

- uloží globální úroveň
- přepočítá zobrazené dávky přes `resolveDose`
- aktualizuje počet sérií a případně odhad délky
- zachová hotové položky dne

Při otevření detailu z běžícího workoutu se zobrazí uzamčená úroveň ze snapshotu, například `Střední · tento trénink`, bez možnosti ji změnit pro běžící workout.

## 9. Flow spuštění workoutu

1. Ověřit/obstarat platnou globální obtížnost.
2. Načíst den.
3. Vytvořit `workoutContext` s úrovní, počtem sérií a vyřešenými dávkami.
4. Nastavit `workoutTotalSets` ze snapshotu.
5. Spustit stávající prep fázi a současný workout flow.
6. Všechny následující fáze čtou jen snapshot, ne globální preference a ne živé dose objekty v `data.js`.
7. Po dokončení nebo potvrzeném ukončení snapshot zahodit.

Přímé tlačítko z intra `Začít program`, Plan, detail dne i spodní navigace musí projít stejnou vstupní funkcí. Tím se zabrání obejití onboardingu nebo vytvoření workoutu bez snapshotu.

## 10. Flow obnovení rozpracovaného workoutu

Současná aplikace neumí obnovit workout po reloadu. Umí pouze návrat z detailu v rámci stejné JS relace; tam zůstane stejný in-memory `workoutContext` a není potřeba další persistence.

Pro skutečné obnovení po reloadu je doporučená samostatná navazující funkce, nikoli předstírání resume pomocí prvního nehotového dne:

`pb40-active-workout-v1`

Minimální bezpečný záznam:

```js
{
  schemaVersion: 1,
  dayIndex: 12,
  exerciseIndex: 3,
  currentSet: 2,
  phase: "work",
  secondsRemaining: 18,
  paused: true,
  finalStretch: false,
  difficulty: "medium",
  totalSets: 3,
  resolvedItems: [["rdl", "12×"]],
  resolvedStretch: ["supine_twist", "35 s/strana"],
  updatedAt: "ISO timestamp"
}
```

Záznam se aktualizuje na hranicích fází, cviků, sérií a při pauze. Pro přesné časované resume je vhodné ukládat také deadline nebo bezpečně přepočtený zbývající čas. Vymazat jej pouze po dokončení nebo potvrzeném ukončení.

Tato persistence není nutná pro první verzi přepínače obtížnosti, protože dnešní aplikace cross-reload resume nenabízí. Pokud se resume implementuje, obtížnost a resolved dávky jsou povinnou součástí snapshotu. Globální změna se na obnovený workout nesmí aplikovat.

## 11. Obtížnost u dokončeného dne

**PHASE 2 RECOMMENDATION**

V první implementaci neukládat obtížnost k hotovému dni. Důvodem je, že dnešní progress je množina booleanů po cvicích a den lze dokončit po částech nebo ručně; neexistuje atomický completion record, ke kterému lze metadata bezpečně připojit. Zápis aktuální globální úrovně po posledním checkboxu by mohl tvrdit jinou úroveň, než na které byla většina dne odcvičena.

Ve Phase 2 přidat completion metadata pouze při dokončení celého snapshotovaného workoutu, například do:

`pb40-day-completions-v1`

```js
{
  "7": {
    "completedAt": "2026-08-12T18:20:00.000Z",
    "difficulty": "medium",
    "source": "workout"
  }
}
```

Legacy hotové dny se nezpětně neodhadují; v historii mají `difficulty: null` / `Dřívější dokončení`. Ruční nebo smíšené dokončení musí mít explicitní pravidlo před zavedením statistik. Stávající `pb40-workout-notes` lze později rozšířit, ale není vhodné ho používat jako jediný completion ledger.

## 12. Edge cases

1. Chybějící preference u nové uživatelky: povinný výběr před prvním programovým vstupem.
2. Chybějící preference u legacy uživatelky: automaticky `medium`, bez resetu, jednorázová nabídka změny.
3. Neplatná hodnota v localStorage/importu: normalizace na `medium`.
4. Nedostupný nebo plný localStorage: aplikace dočasně použije `medium`, zobrazí neblokující upozornění a nesmí spadnout.
5. Přepnutí v jiné záložce během workoutu: globální UI se může synchronizovat přes `storage`, aktivní snapshot zůstane beze změny.
6. Částečně hotový den a změna úrovně: hotové cviky zůstávají hotové, nový workout použije novou úroveň pro celý nový běh.
7. Přímý hash/detail nebo CTA z intra: všechny vstupy musí projít společným difficulty guardem.
8. Scalar dose ve starých nebo nezměněných datech: resolver ji vrátí beze změny.
9. Chybějící větev jedné úrovně: fallback na `medium`, validační chyba v development QA.
10. Volný den: zůstane bez workout snapshotu; přepínač může být viditelný jen jako globální nastavení.
11. Import staré zálohy: zachovat migrované `medium`; import nové zálohy: validovat obtížnost.
12. Aktualizace programu během rozpracovaného workoutu: resolved dávky v persistentním snapshotu zabrání změně rozehraného workoutu.
13. Reset dne: nemaže globální obtížnost ani jiné dny.
14. Ukončení workoutu přes potvrzovací dialog: vyčistí aktivní snapshot, ale již hotové exercise klíče zůstanou podle současného chování.
15. Detail cviku otevřený během workoutu: ukazuje dávku a úroveň ze snapshotu, nikoli právě zvolenou globální úroveň.

## 13. Soubory budoucí implementace

Nutné změny:

- `data.js`: programová konfigurace úrovní a tříúrovňové dávky.
- `app.js`: persistence, migrace, resolver, onboarding guard, Plan/detail selector, workout snapshot, bezpečný import/export.
- `style.css`: kompaktní selector, onboarding a uzamčený stav na detailu.
- `index.html`: pouze navazující verze a cache parametry skutečně změněných souborů.

Dokumentace po implementaci:

- `00_CODEX/00_CODEX_STATE.md`: skutečná nasazená verze, migrace a výsledky QA.
- `00_CODEX/DIFFICULTY_SYSTEM_DESIGN.md`: označení návrhu jako implementovaného a záznam případné ověřené odchylky.

Manuálně schválený `00_CODEX/30_DAY_3_LEVEL_FINAL_SPEC.md` zůstává nezměněný jako zdroj pravdy.

Service Worker se nemění; v aktuální architektuře je registrace vypnutá. Exercise assety, Guide Cards a workout programová ID se nemění.

## 14. Doporučené pořadí implementace

1. Použít manuálně schválený `00_CODEX/30_DAY_3_LEVEL_FINAL_SPEC.md` jako neměnný zdroj L/S/N dávek a pořadí.
2. Přidat datovou konfiguraci obtížností a převést dávky bez změny ID a pořadí.
3. Přidat development validátor a jednotkové kontroly resolveru všech typů dávek.
4. Přidat localStorage helper, normalizaci a legacy migraci.
5. Rozšířit bezpečný import/export o nové klíče.
6. Přidat první výběr s jednotným guardem pro všechny vstupy do programu.
7. Přidat selector na Plan a detail dne.
8. Převést všechna dávková zobrazení na `resolveDose`.
9. Přidat `workoutContext` a převést celý workout na snapshotované dávky a série.
10. Ověřit, že progress klíče, pořadí programu a reset dne zůstaly beze změny.
11. Provést mobilní/desktop UX QA, reload QA, import staré zálohy a multi-tab QA.
12. Teprve potom zvýšit verzi/cache a aktualizovat dokumentaci.
13. Samostatně ve Phase 2 navrhnout cross-reload active workout a completion metadata.

## 15. Rizika

Nalezeno **10 hlavních rizik**:

1. **Čtení dose objektu jako stringu.** Některá větev může obejít resolver a rozbít parser času/stran.
2. **Neúplný workout snapshot.** Pokud další cvik načte živá data, globální změna přepočítá rozehraný workout.
3. **Změna významu progress klíčů.** Přeskládání itemů by přiřadilo starý progress jinému cviku; pořadí a ID proto musí zůstat stabilní.
4. **Import zahodí nový klíč.** Bez rozšíření allowlistu se preference ze zálohy neobnoví.
5. **Onboarding lze obejít přímou routou.** Guard musí být společný pro Plan, detail i start.
6. **Falešné resume.** Současné pokračování neobnovuje runtime; UI nesmí slibovat cross-reload resume bez nové persistence.
7. **Nesprávná historie obtížnosti.** Zapisovat globální úroveň k legacy nebo částečně hotovému dni by vytvořilo nepravdivá data.
8. **Více záložek.** Globální preference se může změnit jinde; snapshot musí být skutečně nezávislý.
9. **Odhad délky dne.** Dnešní výpočet je jen podle počtu cviků; po zavedení 2/3 sérií musí zohlednit úroveň nebo být označen jako orientační.
10. **Odchylka od schválené finální specifikace.** Mechanický přepis 78 kombinací musí být validován proti manuálně schválenému `FINAL_SPEC`, aby implementace nezměnila dávku, pořadí ani některou z 9 HIGH korekcí.

## Verdikt

`READY FOR IMPLEMENTATION: YES`

`00_CODEX/30_DAY_3_LEVEL_FINAL_SPEC.md` je manuálně schválený zdroj pravdy. Obsahuje 26 aktivních dnů, 78 kombinací den × obtížnost, série `easy = 2`, `medium = 3`, `hard = 3`, všechny 9 HIGH korekce, návaznosti MEDIUM problémů, schválené ergonomické pořadí a 0 položek `MANUAL DECISION REQUIRED`.

Budoucí implementace může být provedena jako jeden ucelený Phase 1 úkol a bezpečně zahrnout:

1. L/S/N dávky přesně podle manuálně schváleného `FINAL_SPEC`.
2. Počet sérií `easy = 2`, `medium = 3`, `hard = 3`.
3. Jediný persistentní `programDifficulty` pod klíčem `pb40-program-difficulty-v1`.
4. Povinný první výběr obtížnosti při prvním skutečném vstupu nové uživatelky do programu.
5. Změnu globální obtížnosti z obrazovky Plan.
6. Změnu globální obtížnosti z detailu dne před startem workoutu.
7. Neměnný `workoutContext` snapshot při startu.
8. Zachování snapshotované obtížnosti rozpracovaného workoutu v současném same-session flow; případné skutečné cross-reload resume musí při budoucím zavedení persistovat stejný snapshot.
9. Bezpečnou migraci existujících uživatelek bez preference na `medium`.
10. Zachování všech progress, log, favourite, measurement a note klíčů.
11. Žádný reset dokončených ani částečně dokončených dnů.
12. Žádný zásah do obrázků, source assetů, Guide Cards ani Step by Step karet.

Neexistuje další blokující překážka. Ukládání obtížnosti k dokončenému dni zůstává **PHASE 2 RECOMMENDATION**, protože současný boolean progress po jednotlivých cvicích neposkytuje bezpečný atomický completion record. Skutečné obnovení workoutu po reloadu rovněž zůstává samostatnou navazující funkcí; současný in-memory návrat z detailu bude už v Phase 1 chráněn stejným snapshotem.
