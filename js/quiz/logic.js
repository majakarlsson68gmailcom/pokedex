// =========================================================
// logic.js – quizets regler. Rena funktioner: ingen DOM,
// inget nätverk, ingen timer. Därför lätta att testa i konsolen.
//
// I u03 ska ni beskriva er DATAMODELL. Här är ett förslag –
// skriv gärna om den innan du börjar (steg 10 i README).
//
// En fråga:
// {
//   id: 25,
//   image: "https://…/25.png",
//   answer: "pikachu",
//   options: ["eevee", "pikachu", "onix", "psyduck"]   // blandad ordning
// }
//
// Ett svar (sparas när användaren svarat eller tiden tagit slut):
// {
//   questionId: 25,
//   answer: "pikachu",
//   chosen: "eevee",      // null om tiden tog slut
//   isCorrect: false
// }
// =========================================================

export const QUESTION_COUNT = 10;
export const OPTION_COUNT = 4;
export const SECONDS_PER_QUESTION = 15;

/**
 * Returnerar en NY, blandad kopia av arrayen. Originalet ändras inte.
 *
 * Det vanliga snabbtricket array.sort(() => Math.random() - 0.5)
 * fungerar men blandar inte jämnt. Sök upp "Fisher–Yates shuffle"
 * på javascript.info (kapitlet om arrayer) om du vill göra rätt.
 * Börja med en kopia: [...array]
 *
 * @template T
 * @param {T[]} array
 * @returns {T[]}
 */
export function shuffle(array) {
  // TODO
}

/**
 * Väljer `count` OLIKA element slumpvis.
 *   pickRandom(["a", "b", "c", "d"], 2) → t.ex. ["c", "a"]
 * Tips: blanda, ta de första (slice).
 *
 * @template T
 * @param {T[]} array
 * @param {number} count
 * @returns {T[]}
 */
export function pickRandom(array, count) {
  // TODO
}

/**
 * Bygger EN fråga från en Pokémon (appens form, se toPokemon i api.js)
 * och listan med alla namn.
 *
 *  - rätt svar = pokemon.name
 *  - fel svar  = (OPTION_COUNT - 1) slumpade namn som INTE är rätt svar
 *  - options   = rätt + fel, blandade
 *
 * @param {object} pokemon
 * @param {string[]} allNames
 */
export function createQuestion(pokemon, allNames) {
  // TODO
}

/**
 * Räknar ihop resultatet.
 *   calculateScore(answers) → 7
 * (Vilken array-metod slår ihop en lista till ETT värde? Eller filter + length.)
 *
 * @param {{ isCorrect: boolean }[]} answers
 * @returns {number}
 */
export function calculateScore(answers) {
  // TODO
}
