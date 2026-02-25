import type { Pokemon } from "../types/pokemon";
import type { CpuMove } from "../types/game";

export function getCpuMove(playerHand: Pokemon[], cpuHand: Pokemon[]): CpuMove | null {
  if (playerHand.length === 0 || cpuHand.length === 0) return null;

  // Pick random CPU card
  const cpuIndex = Math.floor(Math.random() * cpuHand.length);
  const cpuCard = cpuHand[cpuIndex];

  // Pick random player card
  const playerIndex = Math.floor(Math.random() * playerHand.length);
  const playerCard = playerHand[playerIndex];

  return { cpuCard, playerCard };
}