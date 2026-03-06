import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { GameServiceClient as _game_v1_GameServiceClient, GameServiceDefinition as _game_v1_GameServiceDefinition } from './game/v1/GameService';
import type { GameState as _game_v1_GameState, GameState__Output as _game_v1_GameState__Output } from './game/v1/GameState';
import type { PokemonState as _game_v1_PokemonState, PokemonState__Output as _game_v1_PokemonState__Output } from './game/v1/PokemonState';
import type { TurnRequest as _game_v1_TurnRequest, TurnRequest__Output as _game_v1_TurnRequest__Output } from './game/v1/TurnRequest';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  game: {
    v1: {
      GameService: SubtypeConstructor<typeof grpc.Client, _game_v1_GameServiceClient> & { service: _game_v1_GameServiceDefinition }
      GameState: MessageTypeDefinition<_game_v1_GameState, _game_v1_GameState__Output>
      GameStatus: EnumTypeDefinition
      PokemonState: MessageTypeDefinition<_game_v1_PokemonState, _game_v1_PokemonState__Output>
      Turn: EnumTypeDefinition
      TurnRequest: MessageTypeDefinition<_game_v1_TurnRequest, _game_v1_TurnRequest__Output>
    }
  }
}

