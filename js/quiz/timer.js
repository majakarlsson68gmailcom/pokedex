// =========================================================
// timer.js – en nedräkning som går att stoppa.
//
// Nytt begrepp: CLOSURE. Funktionen du returnerar "minns"
// variablerna i createTimer (intervalId, secondsLeft) även efter
// att createTimer är klar. Så kan den som anropade stoppa just
// DEN här timern, utan globala variabler.
// =========================================================

/**
 * Startar en nedräkning.
 *
 *   const stop = createTimer(15, {
 *     onTick: (secondsLeft) => console.log(secondsLeft), // 14, 13, … 0
 *     onEnd: () => console.log("Tiden är slut!"),
 *   });
 *
 *   stop(); // t.ex. när användaren svarat
 *
 * Gör så här:
 *  1. let secondsLeft = seconds
 *  2. setInterval varje 1000 ms: minska, anropa onTick(secondsLeft)
 *  3. När secondsLeft når 0: clearInterval och anropa onEnd()
 *  4. Returnera en funktion som anropar clearInterval
 *
 * Fällor:
 *  - Glömmer du clearInterval fortsätter timern i bakgrunden,
 *    även på nästa fråga. Då räknar TVÅ timrar ner samtidigt.
 *  - Ska onTick anropas direkt med startvärdet, eller först efter
 *    en sekund? Testa båda och se vad som känns rätt.
 *
 * @param {number} seconds
 * @param {{ onTick: (secondsLeft: number) => void, onEnd: () => void }} callbacks
 * @returns {() => void} en funktion som stoppar timern
 */
export function createTimer(seconds, { onTick, onEnd }) {
  // TODO
}
