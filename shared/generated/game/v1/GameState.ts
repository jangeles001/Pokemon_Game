// Original file: proto/v1/game.proto

import type { PokemonState as _game_v1_PokemonState, PokemonState__Output as _game_v1_PokemonState__Output } from '../../game/v1/PokemonState';
import type { Turn as _game_v1_Turn, Turn__Output as _game_v1_Turn__Output } from '../../game/v1/Turn';

export interface GameState {
  'sessionId'?: (string);
  'player'?: (_game_v1_PokemonState)[];
  'opponent'?: (_game_v1_PokemonState)[];
  'isGameOver'?: (boolean);
  'currentTurn'?: (_game_v1_Turn);
  'lastActionSummary'?: (string);
}

export interface GameState__Output {
  'sessionId'?: (string);
  'player'?: (_game_v1_PokemonState__Output)[];
  'opponent'?: (_game_v1_PokemonState__Output)[];
  'isGameOver'?: (boolean);
  'currentTurn'?: (_game_v1_Turn__Output);
  'lastActionSummary'?: (string);
}
