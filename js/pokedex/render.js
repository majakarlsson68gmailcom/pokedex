// =========================================================
// render.js – bygger DOM från data. Inget nätverk här.
//
// Regel: funktionerna får data in och ändrar DOM:en. De vet inte
// VARIFRÅN datan kom. Använd alltid textContent för data från API:et
// =========================================================


import { formatName, formatNumber, formatUnit } from "../shared/format.js";
import { isFavorite } from "./favorites.js";

// Mallarna finns i index.html. type="module" körs först när
// HTML:en är inläst, så de går att hämta direkt här.
const templates = {
  card: document.querySelector("#pokemon-card-template"),
  typePill: document.querySelector("#type-pill-template"),
  filterButton: document.querySelector("#filter-button-template"),
  skeleton: document.querySelector("#skeleton-card-template"),
  message: document.querySelector("#message-template"),
  stat: document.querySelector("#stat-template"),
};

function createTypePills(types, typeLabels) {
  const clones = types.map((type) => {
    const fragment = templates.typePill.content.cloneNode(true);
    const li = fragment.querySelector("[data-type-label]");
    li.dataset.type = type;
    li.textContent = typeLabels[type] ?? type;

    return fragment;
  });
  
  return clones;
}

/**
 * STEG 3b – Skapar ETT kort från mallen #pokemon-card-template.
 *
 * Fyll i:
 *  - data-pokemon-id på <li> (så att klick vet vilken Pokémon det gäller)
 *  - data-type på <li> med första typen (styr kortets bakgrundsfärg)
 *  - bild: src. alt="" är rätt här – namnet står redan i rubriken.
 *  - nummer och namn (formatNumber, formatName)
 *  - typetiketterna (createTypePills)
 *  - favoritknappen: aria-pressed + den dolda texten
 *    "Spara Pikachu som favorit" så att skärmläsare vet VILKEN
 *
 * @param {object} pokemon – appens egen form (se toPokemon i api.js)
 * @param {object} labels
 * @returns {DocumentFragment}
 */
function createPokemonCard({id, name, image, types}, labels) {
    const fragment = templates.card.content.cloneNode(true);
    const li = fragment.querySelector("[data-card]");
    li.dataset.pokemonId = id;
    li.dataset.type = types[0];

    const cardImage = fragment.querySelector("[data-card-image]");
    cardImage.src = image;
    const cardNumber = fragment.querySelector("[data-card-number]");
    cardNumber.textContent = formatNumber(id);
    const cardName = fragment.querySelector("[data-card-name]");
    cardName.textContent = formatName(name);

    const cardTypeList = fragment.querySelector("[data-card-types]");
   
   const typePills = createTypePills(types, labels.types);
    
    cardTypeList.append(...typePills)
    
    const favLabel = fragment.querySelector("[data-fav-label]");
    favLabel.textContent = `Spara ${formatName(name)} som favorit`;
    
    return fragment;
  
}

/**
 * STEG 3c – Ritar alla kort. Ersätter det som fanns i listan.
 * Tips: element.replaceChildren(...noder) tömmer och fyller på en gång.
 *
 * @param {HTMLUListElement} list
 * @param {object[]} pokemonList
 * @param {object} labels
 */
export function renderPokemonList(list, pokemonList, labels) {
  const itemsToRender = pokemonList.map((pokemon) => createPokemonCard(pokemon, labels));
  list.replaceChildren(...itemsToRender);
}

/**
 * STEG 4a – Visar `count` skeleton-kort medan det laddar.
 * Ska de ERSÄTTA korten eller läggas TILL efter dem? Tänk på
 * skillnaden mellan första laddningen och "Visa fler".
 *
 * Skeleton-korten har aria-hidden="true". Hur får en skärmläsare
 * då veta att något laddar? (Svar: status-elementet, se setStatus.)
 *
 * @param {HTMLUListElement} list
 * @param {number} count
 */
export function renderSkeletons(list, count) {
  // TODO
}

/**
 * STEG 4b – Visar ett fel- eller tomt-meddelande.
 *
 *   renderMessage(container, {
 *     variant: "error",                  // eller "empty"
 *     title: "Kunde inte hämta Pokémon",
 *     text: "Kontrollera din uppkoppling.",
 *     onRetry: () => loadNextPage(),     // utelämna → ingen knapp
 *   });
 *
 *  - klassen message--error / message--empty på .message
 *  - role="alert" BARA för fel (läses upp direkt av skärmläsare)
 *  - finns ingen onRetry: ta bort knappen. Finns den: lyssna på klick.
 *
 * @param {HTMLElement} container
 * @param {{ variant: "error" | "empty", title: string, text: string, onRetry?: Function }} options
 */
export function renderMessage(container, { variant, title, text, onRetry }) {
  // TODO
}

/**
 * Tar bort meddelandet.
 * @param {HTMLElement} container
 */
export function clearMessage(container) {
  // TODO
}

/**
 * Sätter texten i status-elementet (role="status").
 * Skärmläsare läser upp ändringen utan att flytta fokus.
 *   setStatus(el, "Laddar Pokémon …")
 *   setStatus(el, "Visar 24 av 1 302")
 *
 * @param {HTMLElement} element
 * @param {string} text
 */
export function setStatus(element, text) {
  // TODO
}

/**
 * STEG 7a – Skapar en filterknapp per typ och lägger dem EFTER "Alla".
 * Datan kommer från labels.types: { fire: "Eld", water: "Vatten", … }
 * Object.entries gör om objektet till en array av [nyckel, värde].
 *
 * @param {HTMLUListElement} list
 * @param {Record<string, string>} typeLabels
 */
export function renderFilterButtons(list, typeLabels) {
  // TODO
}

/**
 * STEG 8a – Fyller detaljvyn (dialogen) med en Pokémons data.
 * Elementen finns redan i index.html (data-details-…). Hitta dem
 * med dialog.querySelector och fyll i.
 *
 *  - data-type på dialogen (första typen) → färg på bild och staplar
 *  - bilden: src OCH alt (här ÄR bilden innehåll – varför?)
 *  - längd och vikt via format-funktionerna
 *  - förmågor: en kommaseparerad sträng (join)
 *  - statistik: ett <li> per stat från #stat-template. Stapelns längd
 *    styrs av CSS-variabeln --value: li.style.setProperty("--value", 80)
 *  - favoritknappen: aria-pressed
 *
 * @param {HTMLDialogElement} dialog
 * @param {object} pokemon
 * @param {object} labels
 */
export function renderDetails(dialog, pokemon, labels) {
  // TODO
}
