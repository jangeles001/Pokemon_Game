import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery, useMutation, createConnectQueryKey, useTransport } from "@connectrpc/connect-query"
import type { Pokemon } from "../types/pokemon.ts";
import { getState, resolveTurn, resetGameState } from "../../../shared/generated/game-GameService_connectquery.ts";
import { GameStatus } from "../../../shared/generated/game_pb.ts";

export function usePokemonGame() {
  const queryClient = useQueryClient(); // Access the query client to manage cache and invalidation
  const transport = useTransport(); // Access the transport layer for making RPC calls
  const [attacker, setAttacker] = useState<Pokemon | null>(null);
  const [defender, setDefender] = useState<Pokemon | null>(null);
  
  const gameStateQuery = useQuery(
    getState, 
    {sessionId: "session-123"}, // hardcoded session ID for demonstration; in a real app, this would be dynamic
    {
      refetchInterval: 5000, // Refetch game state every 5 seconds
    }
  );

  const gameStateMutation = useMutation(resolveTurn, {
    onSuccess: () => {
      const queryKey = createConnectQueryKey({
        schema: getState,
        transport: transport,
        input: { sessionId: "session-123" },
        cardinality: "finite",
      });
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const gameResetMutation = useMutation(resetGameState,{
    onSuccess: () => {
      const queryKey = createConnectQueryKey({
        schema: getState,
        transport: transport,
        input: { 
          sessionId:"session-123" 
        },
        cardinality: "finite",
      });
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const attack = () => {
    if (!attacker || !defender) return;
    gameStateMutation.mutate({
      sessionId: "session-123",
      attackerId: attacker.id,
      defenderId: defender.id,
      // moveId: attacker.attackMove,
    });
  };

  const selectAttacker = (pokemon: Pokemon) => {
    setAttacker(pokemon);
  };

  const selectDefender = (pokemon: Pokemon) => {
    setDefender(pokemon);
  };

  const resetGameFunction = () => {
    gameResetMutation.mutate({
      sessionId: "session-123",
    });
    const queryKey = createConnectQueryKey({
      schema: getState,
      transport: transport,
      input: { sessionId: "session-123" },
      cardinality: "finite",
    });
    queryClient.invalidateQueries({ queryKey });
  }

  return {
    isLoading: gameStateQuery.isLoading,
    error: gameStateQuery.error,
    gameState: gameStateQuery.data || {},
    playerHand: gameStateQuery.data?.player || [],
    opponentHand: gameStateQuery.data?.opponent || [],
    turn: gameStateQuery.data?.currentTurn || "unspecified",
    attacker,
    selectAttacker,
    defender,
    selectDefender,
    attack,
    gameStatus: gameStateQuery.data?.status || GameStatus.GAMESTATUS_UNSPECIFIED,
    resetGame: resetGameFunction,
  };
}

export type PokemonGameContextType = ReturnType<typeof usePokemonGame>;