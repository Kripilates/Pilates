# EXERCISE_REFERENCE

Tato složka je určena pro anatomické reference konkrétních cviků.

Pravidla:

- pro každý nový cvik použij pouze EXERCISE_REFERENCE daného cviku,
- EXERCISE_REFERENCE určuje anatomicky správnou polohu těla,
- EXERCISE_REFERENCE nemění MASTER prostředí, MASTER model ani MASTER tvář,
- pokud reference pro cvik chybí, obrázek se negeneruje ani neschvaluje.

## Povinné pose reuse

Pokud existuje původní nebo schválený SOURCE obrázek cviku, má pro konkrétní pózu přednost a je závaznou anatomickou/pózovou referencí. Musí se zachovat joint angles, směr končetin, rotace trupu, poloha rukou, poloha chodidel, gaze a fáze cviku. Nová póza se nevymýšlí podle textu.

Při nové sjednocené verzi se mění pouze poloha těla podle původního SOURCE. Modelka, obličej, vlasy, outfit (`#F36F6A` / `#252528`), prostředí, podložka 183 × 68 cm, camera class, perspektiva, světlo, white balance a barvy zůstávají zamčené.
