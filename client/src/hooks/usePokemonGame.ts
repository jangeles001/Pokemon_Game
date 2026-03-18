import { useState, useEffect } from "react";
import { useQuery } from "@connectrpc/connect-query"
import type { Pokemon } from "../types/pokemon.ts";
import { getState } from "../../../shared/generated/v1/game-GameService_connectquery.ts";

// Hook takes in an array of pokemon
export function usePokemonGame() {
  // Hands defines the two state of the players hands
	const [hand1, setHand1] = useState<Pokemon[]>([]);
  const [hand2, setHand2] = useState<Pokemon[]>([]);
  const gameStateQuery = useQuery(getState, {sessionId: "session-123"});

  return {
  isLoading: gameStateQuery.isLoading,
  error: gameStateQuery.error,
  hand1: hands.hand1,
  hand2: hands.hand2,
  turn: gameStateQuery.data?.turn || null,
  attacker: gameStateQuery.data?.attacker || null,
  defender: gameStateQuery.data?.defender || null,
  gameStatus: gameStateQuery.data?.gameStatus || null,
  };
}

export type PokemonGameContextType = ReturnType<typeof usePokemonGame>;