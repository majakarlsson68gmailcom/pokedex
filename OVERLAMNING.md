# Överlämning – Pokédex-övningen

Senast uppdaterad: 2026-10-21 (eftermiddag). Läs den här filen och `README.md` i samma mapp innan du svarar.

## Vad projektet är
Övningsprojekt inför u02 (portfolio med GitHub-API, deadline 8 nov) och u03 (quiz-app i grupp, redovisning 5 nov) i kursen Frontendutveckling på Chas Academy. Maja skriver all JavaScript själv; HTML och CSS är färdiga.

- `index.html` – Pokédex (u02-delen). `quiz.html` – "Vem är det Pokémon?" (u03-delen).
- API: PokéAPI, `https://pokeapi.co/api/v2`. Gratis, ingen nyckel.
- Kör via Live Server (moduler fungerar inte via `file://`).
- Stegen 1–14 står i `README.md`. Varje JS-fil har TODO-kommentarer med instruktioner.
- Sidan är på **svenska** (Maja valde det 2026-10-21) – `labels.json` behålls som uppslagstabell.

## Hur Maja vill lära sig
- Svenska, kort och konkret. Engelska tekniska termer, förklarade första gången.
- **Ge inte färdig kod.** Förklara vad som är fel och varför, ge ett analogt exempel med annan data (väder/städer har fungerat bra), låt henne skriva lösningen själv.
- **Bryt ner i delsteg A, B, C … med ett "Klart när" var.** När en funktion känns stor ("jag vet inte alls hur jag ska börja") hjälper det att börja med det minsta som syns på sidan (t.ex. ett tomt kort).
- Hon testar genom att lägga testrader direkt under importerna i `js/pokedex/main.js` (toppnivå-await fungerar i moduler).
- Hennes begreppsfiler ligger i `~/chas-academy/claude-studybuddy/begrepp/`. Hänvisa till dem (`template.md`, `spread-och-rest.md`, `destructuring.md`, `objekt-som-uppslagstabell.md`, `map-och-foreach.md`, `async-await.md`, `promise-all.md` …).

## Klart
**Steg 1 – `js/shared/format.js`:** `formatName`, `formatNumber` (ger `"#025"`), `formatUnit(number, unit)` (ersätter formatHeight/formatWeight).

**Steg 2 – `js/shared/api.js`:**
- `fetchJson`, `getLabels`, `getPokemon`, `toPokemon` – klara. Bildnyckeln är rättad till `"official-artwork"`.
- `getPokemonPage(offset)` – klar: `fetchJson` → `results.map(p => getPokemon(p.name))` → `Promise.all` → `return { pokemon, hasMore }` med `hasMore = data.next !== null`.

**Steg 3a – `createTypePills(types, typeLabels)` i `render.js`:** klar. `map` → klona `templates.typePill` → `[data-type-label]` → `dataset.type` + `textContent = typeLabels[type] ?? …`.

**Steg 3b – `createPokemonCard` i `render.js`:** delsteg A–D klara (klon, `data-pokemon-id`, `data-type` = `types[0]`, bild, nummer, namn, typetiketter med `append(...typePills)`). Kortet för Bulbasaur visas på sidan.

## Lösa trådar att städa (påminn henne)
1. **`render.js`:** `console.log(li)` i `createPokemonCard` ska bort.
2. **`render.js`:** `createPokemonCard` är tillfälligt `export` för test – ta bort `export` när 3c är klar (bara `renderPokemonList` behöver exporteras).
3. **`render.js`, reservtext i `createTypePills`:** kontrollera att reservvärdet är typnamnet (`type` / `formatName(type)`), inte "Ingen specifik typ" – typen finns, den saknar bara översättning.
4. **`format.js`:** JSDoc-kommentarerna nämner fortfarande `formatHeight`/`formatWeight` – uppdatera till `formatUnit`.
5. **`main.js`:** tre separata `import`-rader från `format.js` (behövs troligen inte alls i main.js). Testimporterna av `createTypePills`/`createPokemonCard` och testraderna (rad ~15–21) ska bort när `init()` finns. Importer ska stå samlade överst.

## Nästa steg
**Steg 3b, delsteg E – favoritknappens dolda text.**
- Hitta `[data-fav-label]` och sätt texten till t.ex. "Spara Bulbasaur som favorit" (template literal + `formatName(name)`), så att skärmläsare vet VILKEN Pokémon knappen gäller.
- `aria-pressed` väntar till steg 9 (`isFavorite` är fortfarande TODO och returnerar `undefined`). Mallen har redan `"false"`.
- Klart när: i DevTools → Elements har knappens `<span>` rätt text.

**Steg 3c – `renderPokemonList(list, pokemonList, labels)`:** `map` med `createPokemonCard` (många in → många ut, här kommer `map` tillbaka) + `list.replaceChildren(...kort)`.

**Steg 3d – `init()` och `render()` i `main.js`:** `initTheme()`, hämta labels till `state.labels`, rita filterknappar, ladda första sidan. Klart när: 24 kort syns med bild, nummer, namn och svenska typer.

Därefter steg 4: de tre lägena i `loadNextPage()`.

## Saker hon förstått/kämpat med i den här omgången
- **`Promise.all`** – sparat i `begrepp/promise-all.md`. Fälla hon gick i: gav den en array med strängar (fick tillbaka samma array – `Promise.all` väntar, den hämtar inte). Trodde först att `Promise.all` ger de som lyckades; det är `allSettled`. Valde `allSettled` för Pokédexen (resonemang: quizet behöver alla fyra alternativ → `all`).
- **JSDoc** – `@param`/`@returns` beskriver typer, påverkar inte körningen, VS Code läser dem. TypeScript (nästa kurs) gör det på riktigt.
- **Parameter vs värde** – frågade "var kommer `types` ifrån?". Förklarat: namnet bestäms i funktionen, värdet vid anropet; spårade vägen PokéAPI → `toPokemon` → `createPokemonCard` → `createTypePills`.
- **Namnge `map`-parametern efter innehållet** – döpte den till `clone` och skrev över den.
- **Operatorordning med `await`:** `await getLabels().types` läser `.types` på Promise:t → `undefined`. Rätt: `(await getLabels()).types`.
- **`dataset` vs `querySelector`** – skrev `li.dataset.cardImage = image` och `li.data.cardNumber…`. Förklarat: `data-*`-attribut är krokar för att HITTA element, inte vägar; `dataset` ändrar bara attribut på elementet du redan har. **Värt att repetera / föreslå som begrepp.**
- **Ett objekt in → ingen `map`** – frågade "vad ska jag köra map på?" i 3b.
- **`append` + spread:** `append(array)` blir text, `append(...array)` ger separata argument. Spread i fel anrop (`createTypePills(...labels)`) och `=` i stället för `append` – rättat.
- **Klamrar åt två håll (igen):** `{ labels: { types } }` som argument bygger ett nytt objekt; att läsa en nyckel är `labels.types`.

## Förslag att spara i begrepp/
- `data-attribut-och-dataset.md` – krokar i HTML, `querySelector("[data-…]")` för att hitta, `dataset` (camelCase) för att läsa/skriva, och fällan ovan.
- Från förra omgången (ej sparade än): var try/catch hör hemma, egna egenskaper på Error (`error.status`), `return promise` vs `return await`, `?.[ ]` och kedjad `??`, testa saknad data genom att stava fel med flit.
