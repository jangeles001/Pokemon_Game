import type { PokemonType } from "../StoredPokemon";
import type { Pokemon } from "./pokemon";

export type BattleResult = "win" | "lose" | "tie";

export type GameState = "You Win!" | "You Lose!" | "Tie!" | "InProgress"

export type Turn = "player1" | "player2" | "cpu"

export type CpuMove = {
    cpuCard: Pokemon;
    playerCard: Pokemon;
}

export const typeAdvantages: Record<PokemonType, PokemonType[]> = {
  normal: [],

  fighting: ["normal", "rock", "dark", "ice", "steel"],
  flying: ["fighting", "bug", "grass"],
  poison: ["grass", "fairy"],
  ground: ["fire", "electric", "poison", "rock", "steel"],
  rock: ["fire", "ice", "flying", "bug"],
  bug: ["grass", "psychic", "dark"],
  ghost: ["psychic", "ghost"],
  steel: ["ice", "rock", "fairy"],

  fire: ["grass", "bug", "ice", "steel"],
  water: ["fire", "rock", "ground"],
  grass: ["water", "rock", "ground"],
  electric: ["water", "flying"],
  psychic: ["fighting", "poison"],
  ice: ["dragon", "grass", "ground", "flying"],
  dragon: ["dragon"],
  dark: ["psychic", "ghost"],
  fairy: ["dragon", "fighting", "dark"],
}