import type { Pokemon } from "../types/pokemon";
import type { GameState } from "./state";
import { shuffleArray } from "../utils/gameUtilities";

/**
 * Defines and returns initial game state using the provided array of Pokemon
 * @param pokemonList 
 * @returns GameState {}
 */

export function createInitialGameState(
  pokemonList: Pokemon[]
): GameState {
  const shuffled = shuffleArray([...pokemonList]);

  return {
    hand1: shuffled.slice(0, 5),
    hand2: shuffled.slice(5, 10),

    turn: "player1",

    attacker: null,
    defender: null,

    status: "InProgress",

    wins: 0,
    losses: 0,
  };
}