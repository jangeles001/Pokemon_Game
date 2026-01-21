import type { Pokemon } from "../types/pokemon";

/**
 * Shuffle an array.
 *
 *  @param {*} arr
 * @returns array
 *
 * */
export function shuffleArray(arr: Array<Pokemon>): Array<Pokemon> {
  for (let i = arr.length - 1; i > 0; i--) {
    const randomIdx = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[randomIdx]] = [arr[randomIdx], arr[i]]; // swap elements to shuffle
  }

  return arr;
}

/**
 * Calculate total XP of a hand
 *
 * @param {*} arr
 * @returns number
 */
export function calculateHandXp(arr: Array<Pokemon>): number {
  let totalXp = 0;
  for (const item of arr) {
    totalXp += item.base_experience;
  }

  return totalXp;
}
