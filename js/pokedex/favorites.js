// =========================================================
// favorites.js – vilka Pokémon besökaren har hjärtmarkerat.
// Sparas som en array med id:n: [1, 25, 133]
// =========================================================

import { load, save } from "../shared/storage.js";

const STORAGE_KEY = "favorites";

/**
 * STEG 9b – Returnerar alla favorit-id:n (en tom array första gången).
 * @returns {number[]}
 */
export function getFavorites() {
  // TODO
}

/**
 * Är just den här Pokémonen en favorit?
 * @param {number} id
 * @returns {boolean}
 */
export function isFavorite(id) {
  // TODO
}

/**
 * Lägger till id:t om det saknas, tar bort det om det finns.
 * Sparar och returnerar det NYA läget (true = är favorit nu).
 *
 * Praxis: ändra inte arrayen du fick från getFavorites() (push/splice).
 * Skapa en ny array i stället – spread för att lägga till,
 * filter för att ta bort.
 *
 * @param {number} id
 * @returns {boolean}
 */
export function toggleFavorite(id) {
  // TODO
}
