import { useState, useEffect } from "react";
import type { Pokemon } from "../types/pokemon.ts";
import type { Turn, GameState } from "../types/state.ts"
import { getCpuMove } from "../utils/getCpuMove.ts"
import { shuffleArray} from "../utils/gameUtilities.ts";

// Hook takes in an array of pokemon
export function usePokemonGame() {
  // Hands defines the two state of the players hands
	const [hands, setHands] = useState<{hand1: Pokemon[] | null, hand2:Pokemon[] | null}>(
    {
      hand1: null,
      hand2: null,
    } 
  );

  const [turn, setTurn] = useState<Turn>("player1");
  const [attacker, setAttacker] = useState<Pokemon | null >(null);
  const [defender, setDefender] = useState<Pokemon | null>(null);
  const [gameStatus, setGameStatus] = useState<GameState>("InProgress");

  

  useEffect(()=> {
    
  })
  

  return {
  isLoading: gameStateQuery.isLoading,
  isLoading: gameStateMutation.isLoading,


  };
}

export type PokemonGameContextType = ReturnType<typeof usePokemonGame>;