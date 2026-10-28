// =========================================================
// leaderboard.js – topplistan i localStorage.
//
// En rad:
// { name: "Maja", score: 8, total: 10, date: "2026-10-20" }
// =========================================================

import { load, save } from "../shared/storage.js";

const STORAGE_KEY = "leaderboard";
const MAX_ROWS = 5;

/**
 * STEG 14a – Returnerar topplistan (tom array första gången).
 * @returns {{ name: string, score: number, total: number, date: string }[]}
 */
export function getLeaderboard() {
  // TODO
}

/**
 * STEG 14b – Lägger till ett resultat och sparar.
 *
 *  1. Hämta listan
 *  2. Ny array: gamla rader + den nya (spread)
 *  3. Sortera, högst poäng först. Lika poäng: vem ska stå först?
 *  4. Behåll bara de MAX_ROWS bästa (slice)
 *  5. Spara och returnera den nya listan
 *
 * Datum: new Date().toISOString().slice(0, 10) ger "2026-10-20".
 * Eller toLocaleDateString("sv-SE").
 *
 * @param {{ name: string, score: number, total: number }} result
 */
export function addResult(result) {
  // TODO
}
