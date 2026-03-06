import type { Pokemon } from "../types/pokemon";

export type Turn = "player1" | "cpu";

export type GameStatus =
  | "InProgress"
  | "Player1Win"
  | "CpuWin"
  | "Tie";

export interface GameState {
  hand1: Pokemon[];
  hand2: Pokemon[];

  turn: Turn;

  attacker: Pokemon | null;
  defender: Pokemon | null;

  status: GameStatus;

  wins: number;
  losses: number;
}