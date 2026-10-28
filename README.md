# Pokédex – övningsprojekt inför u02 och u03

Två sidor som hämtar data från [PokéAPI](https://pokeapi.co/) (gratis, ingen nyckel, ingen inloggning):

- **`index.html` – Pokédex.** Lista, sök, filtrera, detaljvy, favoriter. Tränar **u02**.
- **`quiz.html` – Vem är det Pokémon?** Tio frågor, timer, topplista. Tränar **u03**.

HTML och CSS är klara. **Du skriver all JavaScript.** Varje JS-fil har tomma funktioner med `// TODO` och en kommentar om vad funktionen ska göra. Sidan laddar utan fel redan nu, den gör bara ingenting än.

---

## Kom igång

1. Öppna mappen i VS Code.
2. Starta **Live Server** på `index.html`. Moduler (`import`/`export`) fungerar inte via `file://`.
3. Öppna DevTools: Console och Network ska vara öppna hela tiden.

## Filerna och deras ansvar

```
index.html, quiz.html     Färdig markup + <template>-mallar längst ner
css/tokens.css            Alla färger och ljust/mörkt läge (rör inte i JS)
css/style.css             Allt utseende. Kommentaren överst listar tillståndsklasserna
data/labels.json          Svenska namn på typer och statistik (din "egna" datakälla)
img/placeholder.svg       Reservbild när en Pokémon saknar bild

js/shared/                Används av BÅDA sidorna
  format.js               Rena funktioner: 25 → "#025", 4 → "0,4 m"
  api.js                  Allt som pratar med nätverket. Ingen DOM.
  storage.js              localStorage + JSON på ett ställe
  theme.js                Ljust/mörkt läge

js/pokedex/
  main.js                 Startpunkt: state, händelser, felhantering
  render.js               Bygger DOM från data
  favorites.js            Favoriter i localStorage

js/quiz/
  main.js                 Startpunkt: quizets flöde
  logic.js                Regler: blanda, bygga frågor, räkna poäng
  timer.js                Nedräkning (closure)
  leaderboard.js          Topplistan i localStorage
  render.js               Ritar vyerna
```

**Klasser är utseende, `data-*` är krokar för JS.** Hämta element med `[data-…]`. Då kan du byta klassnamn i CSS utan att JS går sönder.

## PokéAPI på en minut

| Vad | Endpoint | Svar (förkortat) |
|---|---|---|
| En sida | `/pokemon?limit=24&offset=0` | `{ count, next, results: [{ name, url }] }` |
| En Pokémon | `/pokemon/pikachu` eller `/pokemon/25` | `{ id, name, height, weight, types, stats, abilities, sprites }` |
| Beskrivning | `/pokemon-species/25` | `{ flavor_text_entries: [{ flavor_text, language }] }` |

Klistra in `https://pokeapi.co/api/v2/pokemon/25` i webbläsaren och läs svaret innan du börjar. Bra att veta:

- Listan innehåller **bara namn**. Bilder och typer kräver ett anrop per Pokémon.
- `height` är i **decimeter**, `weight` i **hektogram**.
- Namn är alltid gemener: sök på `"Pikachu"` ger 404.
- Bilden ligger djupt: `sprites.other["official-artwork"].front_default`, och kan vara `null`.

---

## Uppdragen

Gör dem i ordning. Varje steg bygger på det förra. Stegnumren står också i kommentarerna i koden.

### Del A – Pokédex (u02)

**1. Rena funktioner** · `shared/format.js`
Värm upp med fyra små funktioner. Testa med `console.log` i `pokedex/main.js`.
*Klart när:* `formatNumber(25)` ger `"#025"` och `formatName("mr-mime")` ger `"Mr Mime"`.

**2. Hämta data** · `shared/api.js`
`fetchJson` → `getLabels` → `toPokemon` → `getPokemon` → `getPokemonPage`.
Nytt: `Promise.all`, `AbortSignal.timeout`, att göra om extern data till din egen form.
*Klart när:* `console.log(await getPokemonPage(0))` visar 24 objekt i **din** form.

**3. Rendera korten** · `pokedex/render.js`, `init()` i `main.js`
`<template>`, `map`, destructuring, `textContent`, uppslag i `labels`.
*Klart när:* 24 kort syns med bild, nummer, namn och svenska typer.

**4. De tre lägena** · `loadNextPage()`
Laddar (skeleton + status), fel (meddelande + "Försök igen"), och i steg 7 även tomt.
*Klart när* allt det här ger något begripligt **på sidan**:

| Test | Så gör du |
|---|---|
| Långsamt | Network → throttling **Slow 4G** |
| Inget nätverk | Network → **Offline** |
| Inget svar | Sätt `TIMEOUT_MS = 1` i `api.js` |
| Fel URL | Stava fel på `BASE_URL` → 404 |

**5. Visa fler** · `loadNextPage()`
Paginering med `offset`. Slå ihop listor med spread. Knappen inaktiveras medan det laddar och försvinner när `hasMore` är `false`.

**6. Sök** · `handleSearch()`
`submit`, `preventDefault`, `FormData`. Skilj på **404** ("finns inte") och **andra fel** ("gick inte att hämta"). Är det samma sak för besökaren?

**7. Filtrera med delegation** · `handleFilterClick()`, `getVisiblePokemon()`
En lyssnare på listan, `closest`, `aria-pressed`, `filter`. Filtret ger **tomt läge** när ingen av de hämtade har typen.

**8. Detaljvy** · `openDetails()`, `renderDetails()`
`<dialog>` och `showModal()`. Stäng med knapp och Escape. Sätt CSS-variabeln `--value` från JS för staplarna.
*Testa med bara tangentbord:* Tab → Enter → Escape. Var hamnar fokus?
*Extra:* hämta beskrivningen med `getDescription` och ge den ett eget laddar-läge.

**9. Tema och favoriter** · `shared/theme.js`, `pokedex/favorites.js`, `shared/storage.js`
`localStorage`, `JSON.stringify`/`parse`, `prefers-color-scheme`, `aria-pressed`. Favoriter ska finnas kvar efter omladdning.
*Extra:* ett filter "Favoriter".

### Del B – Quiz (u03)

**10. Datamodell och frågor** · `quiz/logic.js`, `getPokemonNames()`, `handleStart()`
Läs datamodellen överst i `logic.js`. Håller du med? Skriv om den om du vill. u03 kräver att ni beskriver er modell.

**11. Vyerna** · `showView()`
Tre `<section data-view>`, attributet `hidden`, fokus till rubriken vid vybyte.

**12. Timer** · `quiz/timer.js`, `showCurrentQuestion()`, `renderTimer()`
`setInterval`, `clearInterval`, closure. Tiden ute räknas som fel svar.
*Felet alla gör:* timern från förra frågan lever kvar. Kontrollera att bara en räknar ner.

**13. Svara och resultat** · `handleAnswerClick()`, `registerAnswer()`, `renderAnswerResult()`, `renderResult()`
Delegation, `disabled`, `.is-correct`/`.is-wrong`, silhuetten tonas fram (`.is-revealed`).
*Klart när:* du spelar ett helt quiz **utan mus**.

**14. Topplista** · `quiz/leaderboard.js`, `renderLeaderboard()`
Spara, sortera, behåll topp 5. Samma del som du bygger i ert u03-projekt.

### Extra, om du vill mer

- Spara ett **påbörjat quiz** i localStorage och fortsätt efter omladdning.
- Flytta `renderMessage` till `shared/` så att båda sidorna använder samma.
- Använd `Promise.allSettled` i `getPokemonPage`, så att ett trasigt anrop inte stoppar alla 24.
- Tangenterna 1–4 väljer svar i quizet.

---

## Innan du säger att du är klar

Samma krav som i u02 och u03:

- [ ] **0 fel** på [validator.w3.org](https://validator.w3.org/). Testa den *genererade* sidan: DevTools → Elements → högerklicka `<html>` → Copy outerHTML → klistra in.
- [ ] **Inga fel i konsolen**, inte heller vid offline.
- [ ] Hela sidan fungerar med **bara tangentbord**, med synlig fokusmarkering.
- [ ] Genererad markup: rätt rubriknivåer, riktiga `button` och `a`, inga klickbara `div`.
- [ ] Kontrast AA i **båda** temana ([WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)).
- [ ] `const`/`let`, aldrig `var`. Moduler, destructuring, spread/rest, `async`/`await`.
- [ ] Varje fil har **ett** ansvar. Ingen kod upprepas som borde vara en funktion.

## Reflektionsdrill (övning 9 i din u02-plan)

Skriv 150 ord om **datans väg** i Pokédexen: från klick på "Visa fler" till att korten syns. Vad skickas, vad kommer tillbaka, vad gör `toPokemon` med svaret, och vad händer om PokéAPI svarar långsamt? Går det trögt vet du var luckan sitter.

Det här projektet täcker övning 4–8 i `2026-10-09-u02-forberedelse.md`, med PokéAPI i stället för GitHub. Mönstren är desamma.
