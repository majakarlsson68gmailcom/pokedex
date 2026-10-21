// =========================================================
// format.js – små "rena" funktioner som gör om data till text.
//
// Ren funktion (pure function) = samma indata ger alltid samma
// utdata. Ingen DOM, inget nätverk, inget localStorage.
// Därför är de lättast att testa – börja här (steg 1 i README).
//
// Testa i main.js, t.ex.:
//   console.log(formatNumber(25)); // "#025"
// =========================================================

/**
 * Gör om ett id till ett Pokédex-nummer med tre siffror.
 *   formatNumber(1)   → "#001"
 *   formatNumber(25)  → "#025"
 *   formatNumber(151) → "#151"
 */
export function formatNumber(id) {
  return `#${String(id).padStart(3, "0")}`;
}

/**
 * PokéAPI skriver namn med gemener och bindestreck.
 *   formatName("pikachu") → "Pikachu"
 *   formatName("mr-mime") → "Mr Mime"
 */
export function formatName(name) {
  const words = name.split("-");
  const capitalized = words.map((word) => {
    return word[0].toUpperCase() + word.slice(1)
  });
  return capitalized.join(" ");

}

/**
 * PokéAPI anger längd i DECIMETER.
 *   formatHeight(4)  → "0,4 m"
 *   formatHeight(17) → "1,7 m"
 */
export function formatUnit(number, unit) {
  return `${(number / 10).toLocaleString("sv-SE")} ${unit}`;
}

/**
 * PokéAPI anger vikt i HEKTOGRAM.
 *   formatWeight(60)  → "6 kg"
 *   formatWeight(905) → "90,5 kg"
 */

