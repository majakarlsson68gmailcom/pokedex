// =========================================================
// main.js (quiz) – quizsidans startpunkt.
//
// Quizet är en liten TILLSTÅNDSMASKIN med tre vyer:
//
//   start ──(starta)──▶ question ──(sista frågan)──▶ result
//     ▲                    │  ▲                         │
//     │                    └──┘ (nästa fråga)           │
//     └──────────────────(spela igen)───────────────────┘
//
// Rita gärna det här som flödesdiagram till u03 – det är ett
// "bra att ha" i uppgiften.
// =========================================================

import { initTheme } from "../shared/theme.js";
import { getPokemon, getPokemonNames } from "../shared/api.js";
import {
  QUESTION_COUNT,
  SECONDS_PER_QUESTION,
  pickRandom,
  createQuestion,
  calculateScore,
} from "./logic.js";
import { createTimer } from "./timer.js";
import { getLeaderboard, addResult } from "./leaderboard.js";
import {
  showView,
  renderQuestion,
  renderTimer,
  renderAnswerResult,
  renderScore,
  renderResult,
  renderLeaderboard,
  renderQuizError,
} from "./render.js";

const elements = {
  startForm: document.querySelector("[data-start-form]"),
  startButton: document.querySelector("[data-start-button]"),
  status: document.querySelector("[data-quiz-status]"),
  answerList: document.querySelector("[data-answer-list]"),
  nextButton: document.querySelector("[data-next-button]"),
  playAgainButton: document.querySelector("[data-play-again]"),
};

const state = {
  playerName: "",
  questions: [],      // se datamodellen i logic.js
  currentIndex: 0,
  answers: [],
  stopTimer: null,    // funktionen som createTimer returnerar
  hasAnswered: false, // skydd: man ska inte kunna svara två gånger
};

/**
 * Startpunkt.
 *  - initTheme()
 *  - rita topplistan (getLeaderboard → renderLeaderboard)
 *  - koppla lyssnare: startForm "submit", answerList "click" (delegation),
 *    nextButton, playAgainButton
 *  - EXTRA: keydown på document – tangenterna 1–4 väljer svar
 */
function init() {
  // TODO
}

/**
 * STEG 10 – Starta. Kopplas till formulärets submit.
 *
 *  1. preventDefault, läs och spara spelarens namn
 *  2. LADDAR: inaktivera startknappen, status "Hämtar frågor …"
 *  3. Hämta alla namn (getPokemonNames)
 *  4. Välj QUESTION_COUNT slumpade namn (pickRandom)
 *  5. Hämta de Pokémonen SAMTIDIGT (Promise.all + getPokemon)
 *     – samma mönster som getPokemonPage i api.js
 *  6. Bygg frågorna (createQuestion) och spara i state
 *  7. Nollställ currentIndex och answers, visa första frågan
 *  FEL: renderQuizError med "Försök igen"
 *  ALLTID: startknappen tillbaka, töm status
 *
 * @param {SubmitEvent} event
 */
async function handleStart(event) {
  // TODO
}

/**
 * STEG 12a – Visar frågan på state.currentIndex och startar timern.
 *  - state.hasAnswered = false
 *  - showView("question") (bara vid första frågan behövs vybytet)
 *  - renderQuestion, renderScore, renderTimer(SECONDS_PER_QUESTION, …)
 *  - stoppa en gammal timer om det finns en (?.() är praktiskt här)
 *  - state.stopTimer = createTimer(…) med onTick → renderTimer, onEnd → handleTimeUp
 */
function showCurrentQuestion() {
  // TODO
}

/**
 * STEG 13 – Klick i svarslistan (en lyssnare, delegation).
 *  1. Hitta knappen med [data-answer]. Ingen knapp, eller redan svarat? return.
 *  2. registerAnswer(button.dataset.answer)
 *
 * @param {MouseEvent} event
 */
function handleAnswerClick(event) {
  // TODO
}

/**
 * STEG 12c – Tiden tog slut. Räknas som fel svar.
 */
function handleTimeUp() {
  // TODO: registerAnswer(null)
}

/**
 * Gemensamt för klick och timeout – så att logiken bara finns på ett ställe.
 *  1. state.hasAnswered = true, stoppa timern
 *  2. Lägg till ett svarsobjekt i state.answers (se datamodellen) – med spread
 *  3. renderAnswerResult, renderScore(calculateScore(...))
 *
 * @param {string | null} chosen
 */
function registerAnswer(chosen) {
  // TODO
}

/**
 * "Nästa fråga". Sista frågan? → finishQuiz(). Annars öka index och visa nästa.
 */
function handleNext() {
  // TODO
}

/**
 * STEG 14 – Slut.
 *  - räkna poäng
 *  - addResult({ name, score, total })
 *  - renderResult, showView("result")
 *
 * EXTRA: spara ett PÅBÖRJAT quiz i localStorage efter varje svar,
 * så att man kan fortsätta efter en omladdning (u03 nämner det).
 * Vad behöver sparas? Vad händer med timern?
 */
function finishQuiz() {
  // TODO
}

/**
 * "Spela igen": tillbaka till start, rita om topplistan.
 * (Ska namnet stå kvar i fältet?)
 */
function handlePlayAgain() {
  // TODO
}

init();
