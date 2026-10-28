
// Ansvar: hämta data och göra om den till appens egen form.
// Inte ansvar: DOM. Ingen querySelector här! Funktionerna
// returnerar data eller KASTAR fel. Vad sidan ska visa när det
// går fel bestämmer main.js 

const BASE_URL = "https://pokeapi.co/api/v2";
const TIMEOUT_MS = 8000; // Sätt till 1 när du vill testa timeout-felet

export const PAGE_SIZE = 24;

/**
 *
 * @param {string} url
 * @returns {Promise<any>}
 */
export async function fetchJson(url) {

    const response = await fetch(url, {
      signal: AbortSignal.timeout(TIMEOUT_MS)
    });

    if(!response.ok){
      const error =  new Error(`Status: ${response.status} från ${url}`);
      error.status = response.status;
      throw error;
    }
    return await response.json();
}

/**
 *
 * @returns {Promise<{ types: Record<string, string>, stats: Record<string, string> }>}
 */
export async function getLabels() {
  return fetchJson("data/labels.json");
}

/**
 *
 * @param {object} raw – ett objekt från /pokemon/{namn}
 */
function toPokemon({id, name, height, weight, types, abilities, stats, sprites: { other }}) {
  const image = other["official-artwork"]?.front_default ?? "img/placeholder.svg"
  return { 
    id, 
    name, 
    height, 
    weight, 
    types: types.map(entry => entry.type.name),
    abilities: abilities.map(entry => entry.ability.name),
    stats: stats.map(({ base_stat: value, stat: { name } }) => {
      return { name, value };
    }),
    image,
  }
}

/**
 *
 * @param {string | number} nameOrId
 */
export async function getPokemon(nameOrId) {
  const raw = await fetchJson(`${BASE_URL}/pokemon/${nameOrId}`);
  return toPokemon(raw);
}

/**
 *
 * @param {number} offset – hur många som ska hoppas över
 */
export async function getPokemonPage(offset = 0) {
  const data = await fetchJson(`${BASE_URL}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
  const promises = data.results.map(pokemon => getPokemon(pokemon.name));
  const pokemon = await Promise.all(promises)
  
  const hasMore = data.next !== null; 
  
  return {
    pokemon,
    hasMore,
  }
}

/**
 * STEG 10 (quiz) – Hämtar namnen på de första `limit` Pokémon.
 * Endpoint: `${BASE_URL}/pokemon?limit=${limit}`
 * Returnera en array med bara namnen: ["bulbasaur", "ivysaur", …]
 *
 * @param {number} limit
 * @returns {Promise<string[]>}
 */
export async function getPokemonNames(limit = 151) {
  // TODO
}

/**
 * EXTRA – Hämtar en kort beskrivning till detaljvyn.
 * Endpoint: `${BASE_URL}/pokemon-species/${id}`
 * Svaret har flavor_text_entries: [{ flavor_text, language: { name } }, …]
 * Hitta första texten på engelska ("en"). Vilken array-metod ger dig
 * det FÖRSTA elementet som matchar? Texterna innehåller radbrytningar
 * (\n och \f) – byt dem mot mellanslag.
 *
 * @param {number} id
 * @returns {Promise<string>}
 */
export async function getDescription(id) {
  // TODO
}
