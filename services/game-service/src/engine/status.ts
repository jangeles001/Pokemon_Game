import type { GameState } from "./state";

export function evaluateGameStatus(state: GameState): GameState {
  const { hand1, hand2 } = state;

  if (hand1.length === 0 && hand2.length === 0) {
    return { ...state, status: "Tie" };
  }

  if (hand1.length === 0) {
    return { ...state, status: "CpuWin" };
  }

  if (hand2.length === 0) {
    return { ...state, status: "Player1Win" };
  }

  return { ...state, status: "InProgress" };
}

// Note: Can update score here in the future