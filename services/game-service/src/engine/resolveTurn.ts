import type { GameState, TurnAction } from "./state";
import { resolveBattle } from "../utils/resovleBattle";

/**
 * Resolves the turn based on the attacker and defender selection
 * @param state GameState {}
 * @returns GameState {}
 */
export function resolveTurn(state: GameState, action: TurnAction): GameState {
  const { attacker, defender } = state;

  if (!attacker || !defender) {
    return state; // invalid turn
  }

  const result = resolveBattle(attacker, defender);

  // Determine who lost which card
  let removeIdFromHand1: number | null = null;
  let removeIdFromHand2: number | null = null;

  if (result === "tie") {
    // In a tie, both lose their respective cards
    removeIdFromHand1 = attacker.id; 
    removeIdFromHand2 = defender.id;
  } else {

    const isP1Attacking = state.turn === "player1";
    const p1Won = (isP1Attacking && result === "win") || (!isP1Attacking && result === "lose");

    if (p1Won) {
      removeIdFromHand2 = defender.id; // P1 won, P2 (defender) loses card
    } else {
      removeIdFromHand1 = attacker.id; // P1 lost (as attacker or defender)
    }
  }

  // Apply the filters (creating new arrays)
  const hand1 = removeIdFromHand1 ? state.hand1.filter(p => p.id !== removeIdFromHand1) : state.hand1;
  const hand2 = removeIdFromHand2 ? state.hand2.filter(p => p.id !== removeIdFromHand2) : state.hand2;

  const nextTurn = state.turn === "player1" ? "cpu" : "player1";

  return {
    ...state,
    hand1,
    hand2,
    attacker: null,
    defender: null,
    turn: nextTurn,
  };
}