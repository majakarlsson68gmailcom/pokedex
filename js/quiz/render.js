// =========================================================
// render.js (quiz) – ritar quizets vyer. Ingen logik om poäng
// eller tid här – bara "visa det här".
// =========================================================

import { formatName } from "../shared/format.js";

const templates = {
  answer: document.querySelector("#answer-template"),
  leaderboardRow: document.querySelector("#leaderboard-row-template"),
  reviewRow: document.querySelector("#review-row-template"),
  message: document.querySelector("#message-template"),
};

/**
 * STEG 11 – Visar EN vy och döljer de andra.
 * Vyerna är <section data-view="start|question|result">.
 * Använd attributet hidden (element.hidden = true/false).
 *
 * Tillgänglighet: när vyn byts står fokus kvar på en knapp som
 * just försvann. Flytta fokus till vyns rubrik (den har tabindex="-1").
 *
 * @param {"start" | "question" | "result"} viewName
 */
export function showView(viewName) {
  // TODO
}

/**
 * STEG 13a – Ritar en fråga.
 *  - "Fråga 3 av 10" i [data-question-progress]
 *  - bilden i [data-question-image] (alt avslöjar INTE namnet!)
 *  - ta bort .is-revealed från [data-silhouette]
 *  - ett <li><button> per alternativ från #answer-template.
 *    data-answer = namnet (för logiken), textContent = formatName(namnet)
 *  - töm [data-feedback], göm [data-next-button]
 *
 * @param {object} question
 * @param {number} index – 0-baserat
 * @param {number} total
 */
export function renderQuestion(question, index, total) {
  // TODO
}

/**
 * STEG 12b – Uppdaterar timern.
 *  - texten i [data-timer-text]
 *  - CSS-variabeln --progress på [data-timer] (0–1): secondsLeft / total
 *  - klassen timer--low när det är 5 sekunder eller mindre
 *
 * @param {number} secondsLeft
 * @param {number} total
 */
export function renderTimer(secondsLeft, total) {
  // TODO
}

/**
 * STEG 13b – Visar facit efter ett svar (eller när tiden tagit slut).
 *  - alla svarsknappar: disabled
 *  - rätt svar: .is-correct
 *  - valt svar, om det var fel: .is-wrong
 *  - .is-revealed på [data-silhouette] → bilden tonas fram
 *  - text i [data-feedback]: "Rätt!" / "Det var Pikachu." / "Tiden tog slut – det var Pikachu."
 *  - visa [data-next-button] och flytta fokus dit (annars är
 *    tangentbordsanvändaren kvar på en inaktiverad knapp)
 *
 * @param {string} answer – rätt namn
 * @param {string | null} chosen – valt namn, null om tiden tog slut
 */
export function renderAnswerResult(answer, chosen) {
  // TODO
}

/**
 * Uppdaterar poängen i [data-score]: "3 poäng"
 * @param {number} score
 */
export function renderScore(score) {
  // TODO
}

/**
 * STEG 13c – Resultatvyn.
 *  - poäng och total i [data-result-score] / [data-result-total]
 *  - en rubrik och text som beror på resultatet (t.ex. 10/10 → "Perfekt!")
 *  - en rad per fråga i [data-review-list] från #review-row-template:
 *    bild, namn, "Rätt"/"Fel", klassen is-correct/is-wrong
 *
 * @param {number} score
 * @param {object[]} questions
 * @param {object[]} answers
 */
export function renderResult(score, questions, answers) {
  // TODO
}

/**
 * STEG 14c – Topplistan på startvyn.
 *  - en rad per resultat i [data-leaderboard]
 *  - tom lista: visa [data-leaderboard-empty], annars göm den
 *  (Placeringssiffran ritar CSS själv med en counter – du behöver inte skriva den.)
 *
 * @param {{ name: string, score: number, total: number, date: string }[]} rows
 */
export function renderLeaderboard(rows) {
  // TODO
}

/**
 * Felmeddelande på startvyn, om frågorna inte gick att hämta.
 * Samma idé som renderMessage i Pokédexen. Kunde den funktionen
 * ha legat i shared/ i stället, så att båda sidorna använder samma?
 * (Det är en bra refaktorering att göra – och att skriva om i reflektionen.)
 *
 * @param {{ title: string, text: string, onRetry?: Function }} options
 */
export function renderQuizError({ title, text, onRetry }) {
  // TODO
}
