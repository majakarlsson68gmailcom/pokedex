// =========================================================
// theme.js – ljust och mörkt läge. Används av båda sidorna.
//
// Regeln från u02: färgerna finns i css/tokens.css. JS gör bara
// EN sak: sätter eller tar bort klassen "dark" på <html>.
// =========================================================

import { load, save } from "./storage.js";

const STORAGE_KEY = "theme";

/**
 * STEG 9a – Kör en gång när sidan startar.
 *
 *  1. Hitta knappen [data-theme-toggle].
 *  2. Ta reda på startläget:
 *     - har besökaren valt förut? Läs från storage.
 *     - annars: vad vill operativsystemet? window.matchMedia("(prefers-color-scheme: dark)")
 *  3. Applicera läget.
 *  4. Lyssna på klick: växla, applicera, spara.
 *
 * Fundera: vad ska sparas – "dark"/"light" eller true/false?
 */
export function initTheme() {
  // TODO
}

/**
 * Sätter läget på sidan.
 *  - klassen "dark" på document.documentElement (classList.toggle tar ett andra argument!)
 *  - aria-pressed på knappen ("true"/"false"), så att skärmläsare
 *    hör "Mörkt läge, växlingsknapp, intryckt"
 *
 * Knappens text ska INTE ändras. aria-pressed berättar redan läget.
 *
 * @param {boolean} isDark
 * @param {HTMLButtonElement} button
 */
function applyTheme(isDark, button) {
  // TODO
}
