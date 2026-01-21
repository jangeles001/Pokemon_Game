import type { PokemonType } from "../StoredPokemon";

export type Pokemon = {
  id: number; 
  name: string; 
  type: PokemonType;
}