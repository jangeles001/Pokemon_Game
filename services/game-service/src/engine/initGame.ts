import { create } from '@bufbuild/protobuf'
import type { Pokemon, GameState } from "@shared/generated/game_pb";
import { GameStateSchema, PokemonSchema, GameStatus, Turn } from "@shared/generated/game_pb";
import { shuffleArray } from "../utils/gameUtilities";

/**
 * Defines and returns initial game state using the provided array of Pokemon
 * @param pokemonList 
 * @returns GameState {}
 */

export function createInitialGameState(
  pokemonList: Pokemon[],
  sessionId: string
): GameState {
  const shuffled = shuffleArray([...pokemonList]);

  return create(GameStateSchema, {
    sessionId: sessionId,
    player: shuffled.slice(0, 5),
    opponent: shuffled.slice(5, 10),
    isGameOver: false,
    currentTurn: Turn.PLAYER1,
    status: GameStatus.GAMESTATUS_ACTIVE,
    lastActionSummary: "",
  }); 
}