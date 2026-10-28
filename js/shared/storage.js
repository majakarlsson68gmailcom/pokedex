// =========================================================
// storage.js – en tunn wrapper runt localStorage.
//
// Problemet den löser: localStorage sparar bara STRÄNGAR.
// Arrayer och objekt måste göras om med JSON.stringify på vägen in
// och JSON.parse på vägen ut. Gör det på ett ställe, här, så slipper
// favorites.js, theme.js och leaderboard.js tänka på det.
// =========================================================

/**
 * Läser ett värde. Returnerar `fallback` om nyckeln saknas
 * eller om det som ligger där inte är giltig JSON.
 *
 *   load("favorites", [])  → [1, 25]  (eller [] första gången)
 *
 * Tänk på: getItem returnerar null om nyckeln saknas.
 * JSON.parse kan kasta fel – vem har skrivit det som ligger där?
 * (Testa: DevTools → Application → Local Storage, skriv in skräp.)
 *
 * @param {string} key
 * @param {any} fallback
 */
export function load(key, fallback) {
  // TODO
}

/**
 * Sparar ett värde (vad som helst som går att göra om till JSON).
 *
 *   save("favorites", [1, 25]);
 *
 * @param {string} key
 * @param {any} value
 */
export function save(key, value) {
  // TODO
}
