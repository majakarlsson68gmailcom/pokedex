// =========================================================
// main.js – Pokédex-sidans startpunkt.
//
// Ansvar: koppla ihop. Hålla state, lyssna på händelser,
// anropa api.js för data och render.js för att visa den,
// och bestämma vad besökaren ser när något går fel.
//
// Flödet, alltid i den här ordningen:
//   händelse → ändra state → rendera från state
// =========================================================
import { formatNumber } from "../shared/format.js";
import { formatName } from "../shared/format.js";
import { formatUnit } from "../shared/format.js";



import { initTheme } from "../shared/theme.js";
import { getLabels, getPokemon, getPokemonPage, PAGE_SIZE} from "../shared/api.js";
import { toggleFavorite } from "./favorites.js";
import {
  renderPokemonList,
  renderSkeletons,
  renderMessage,
  clearMessage,
  setStatus,
  renderFilterButtons,
  renderDetails,
} from "./render.js";


// ---------- DOM-element (krokarna är data-attribut i index.html) ----------
const elements = {
  searchForm: document.querySelector("[data-search-form]"),
  filterList: document.querySelector("[data-filter-list]"),
  resultsHeading: document.querySelector("[data-results-heading]"),
  status: document.querySelector("[data-status]"),
  message: document.querySelector("[data-message]"),
  pokemonList: document.querySelector("[data-pokemon-list]"),
  loadMoreButton: document.querySelector("[data-load-more]"),
  dialog: document.querySelector("[data-details-dialog]"),
  dialogClose: document.querySelector("[data-close-dialog]"),
  dialogFavorite: document.querySelector("[data-details-favorite]"),
};

// ---------- State: allt appen behöver komma ihåg ----------
// En enda källa till sanning. DOM:en är en BILD av state, inte tvärtom.
const state = {
  pokemon: [],          // alla hämtade Pokémon, i appens egen form
  labels: null,         // svenska namn från data/labels.json
  offset: 0,            // hur många som redan hämtats (för "Visa fler")
  hasMore: true,        // finns det fler att hämta?
  activeFilter: "all",  // vald typ, eller "all"
  isLoading: false,     // pågår en hämtning? (skydd mot dubbelklick)
  openPokemonId: null,  // vilken Pokémon visas i dialogen?
};

/**
 * STEG 3 – Startpunkten. Körs en gång, längst ner i filen.
 *
 *  1. initTheme()
 *  2. Hämta labels och spara i state (behövs innan korten kan ritas)
 *  3. Rita filterknapparna
 *  4. Ladda första sidan (loadNextPage)
 *  5. Koppla alla lyssnare (steg 5–8)
 *
 * Vad händer om labels.json inte går att hämta? Ska sidan stanna,
 * eller fortsätta utan svenska namn? Du bestämmer – motivera i README.
 */
async function init() {
  // TODO
}

/**
 * STEG 4 – Hämtar nästa sida och hanterar alla tre lägena.
 *
 *  Laddar: state.isLoading = true, skeleton-kort, status-text,
 *          inaktivera "Visa fler" (disabled)
 *  Lyckas: slå ihop gamla och nya Pokémon med spread, uppdatera
 *          offset och hasMore, rendera
 *  Fel:    meddelande på sidan med "Försök igen" (anropar loadNextPage igen)
 *  Alltid: (finally) isLoading = false, knappen tillbaka
 *
 * Bonus: skilj på felen i meddelandet.
 *   error.name === "TimeoutError" → "PokéAPI svarar inte just nu"
 *   error instanceof TypeError    → "Ingen kontakt. Är du offline?"
 *   annars                        → "Något gick fel (status …)"
 * Skriv en egen liten funktion för det – du behöver den i steg 6 också.
 */
async function loadNextPage() {
  // Skydd: om en hämtning redan pågår, gör ingenting.
  if (state.isLoading || !state.hasMore) return;

  // TODO
}

/**
 * STEG 7b – Returnerar de Pokémon som ska synas just nu,
 * utifrån state.activeFilter. Ändrar inte state.pokemon.
 * (Vilken array-metod ger en ny, kanske kortare, array?)
 */
function getVisiblePokemon() {
  // TODO
}

/**
 * STEG 3d + 7c – Ritar om listan från state.
 *  - rendera getVisiblePokemon()
 *  - TOMT LÄGE: blev listan tom fast state.pokemon inte är det?
 *    Då har filtret inte gett träff → visa message--empty.
 *  - uppdatera status: "Visar 12 av 48 hämtade"
 *  - göm "Visa fler" när hasMore är false (attributet hidden)
 */
function render() {
  // TODO
}

/**
 * STEG 6 – Sök. Kopplas till formulärets "submit" (inte knappens "click" – varför?).
 *
 *  1. event.preventDefault() – annars laddas sidan om
 *  2. Läs värdet: new FormData(form).get("query"), trim, toLowerCase
 *  3. Visa laddar-läge
 *  4. getPokemon(query)
 *  5. Lyckas: visa bara den, ändra rubriken till "Sökresultat"
 *  6. 404 (error.status === 404): message--empty, "Hittade ingen som heter …"
 *     Annat fel: message--error
 *
 * Extra: en "Rensa sökning"-knapp som visar alla igen.
 *
 * @param {SubmitEvent} event
 */
async function handleSearch(event) {
  // TODO
}

/**
 * STEG 7d – Klick på en filterknapp. EN lyssnare på hela listan
 * (event delegation – knapparna skapas med JS, så de finns inte
 * när sidan laddar).
 *
 *  1. Hitta knappen: event.target.closest("[data-filter]")
 *  2. Ingen knapp? return.
 *  3. Uppdatera state.activeFilter
 *  4. aria-pressed="true" på den valda, "false" på alla andra
 *  5. render()
 *
 * @param {MouseEvent} event
 */
function handleFilterClick(event) {
  // TODO
}

/**
 * STEG 8b + 9c – Klick i kortlistan. EN lyssnare för alla kort.
 * Knapparna har data-action="open-details" eller "toggle-favorite".
 * Använd ett actions-objekt, precis som i din event-delegation-övning:
 *
 *   const actions = { "open-details": openDetails, "toggle-favorite": … };
 *
 * Kortets id hittar du på <li data-pokemon-id>: button.closest("[data-pokemon-id]")
 * Kom ihåg: dataset-värden är alltid strängar. state.pokemon har tal.
 *
 * @param {MouseEvent} event
 */
function handleListClick(event) {
  // TODO
}

/**
 * STEG 8c – Öppnar detaljvyn.
 *  1. Hitta Pokémonen i state.pokemon (find)
 *  2. renderDetails(...)
 *  3. state.openPokemonId = id
 *  4. dialog.showModal()
 *
 * Testa med tangentbord: Tab till ett kort, Enter, Escape.
 * Var hamnar fokus när dialogen stängs? (<dialog> sköter det själv
 * om du använder showModal – verifiera att det stämmer!)
 *
 * EXTRA: hämta beskrivningen med getDescription(id). Visa "Laddar …"
 * i [data-details-description] medan den hämtas. Vad händer om
 * besökaren hinner stänga och öppna en annan Pokémon innan svaret kommer?
 *
 * @param {number} id
 */
function openDetails(id) {
  // TODO
}

// STEG 5–9: koppla lyssnarna i init(), t.ex.
//   elements.searchForm.addEventListener("submit", handleSearch);
//   elements.loadMoreButton → loadNextPage
//   elements.filterList     → handleFilterClick
//   elements.pokemonList    → handleListClick
//   elements.dialogClose    → stäng dialogen (dialog.close())
//   elements.dialogFavorite → växla favorit för state.openPokemonId
//                             och rita om korten så att hjärtat stämmer där också

init();
