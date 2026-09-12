# Moovka — compatibility QA checklist

Tento soubor je krátký provozní rozcestník. Úplná a autoritativní kontrola je v:

- `00_CHATGPT_START/MASTER/01_DOCUMENTS/IMAGE_WORKFLOW.md`
- `00_CHATGPT_START/MASTER/01_DOCUMENTS/MASTER_IMAGE_CHECKLIST.md`
- `00_CHATGPT_START/MASTER/01_DOCUMENTS/MASTER_REFERENCE.md`

Pokud se text liší, platí uvedené MASTER dokumenty.

## Před vytvořením nebo úpravou

- [ ] Je potvrzen canonical ID a požadovaná fáze START/HERO/MID/END.
- [ ] Proběhl reuse a runtime mapping audit včetně unversioned varianty a case.
- [ ] Je otevřený MASTER model, MASTER face, environment a správná camera reference.
- [ ] Je otevřená dostupná schválená exercise/pose reference.
- [ ] Vzniká pouze jeden čistý SOURCE obrázek bez textu, UI a dekorací.
- [ ] Nevzniká fyzický END při END = START ani kopie HERO při HERO = START.

## Automatické QA po každém obrázku

- [ ] Cvik, anatomie, strana a párování končetin jsou správně.
- [ ] Identita, věk, vlasy, tělesné proporce, svalnatost a velikost hlavy odpovídají MASTERU.
- [ ] Outfit, vybavení, kamera, framing, měřítko modelky a podložka odpovídají MASTERU.
- [ ] Studio je čisté: bez rostlin, police, dekorací, stropu/light stripu a pruhovaných stínů.
- [ ] Stěna, podlaha, světlo a white balance odpovídají MASTERU.
- [ ] Nejsou deformace, skvrny, artefakty ani wax/CGI vzhled.
- [ ] Párové SOURCE působí jako stejná modelka ve stejném focení.

Výsledek je pouze `PASS / SCHVÁLENO` nebo `FAIL / NESCHVÁLENO`. Při FAIL se
soubor neoznačuje jako approved; chyba se opraví a QA se opakuje.
