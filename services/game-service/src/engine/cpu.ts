import type { GameState } from "./state";
import { getCpuMove } from "../utils/getCpuMove";

/**
 * Selects random attacker and defender from both hands and returns them in the game state.
 * @param state GameState{}
 * @returns GameState {}
 */
export function applyCpuSelection(
  state: GameState
): GameState {
  if (state.turn !== "cpu") return state; // early return current state if called off turn

  const move = getCpuMove(state.hand1, state.hand2); // randomly select card from both hands
  if (!move) return state; // return current state if a move was not defined (could cause hanging state?)

  return {
    ...state,
    attacker: move.cpuCard,
    defender: move.playerCard,
  };
}