import type { Pokemon } from "../types/pokemon.ts"
import type { BattleResult } from "../types/game.ts";
import { typeAdvantages } from "../types/game.ts";

export function resolveBattle(
  attacker: Pokemon,
  defender: Pokemon
): BattleResult {
  if (attacker.type === defender.type) return "tie";

  if (typeAdvantages[attacker.type].includes(defender.type)) {
    return "win";
  }

  if (typeAdvantages[defender.type].includes(attacker.type)) {
    return "lose";
  }

  return "tie";
}