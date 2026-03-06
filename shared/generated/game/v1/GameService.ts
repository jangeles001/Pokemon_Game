// Original file: proto/v1/game.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GameState as _game_v1_GameState, GameState__Output as _game_v1_GameState__Output } from '../../game/v1/GameState';
import type { TurnRequest as _game_v1_TurnRequest, TurnRequest__Output as _game_v1_TurnRequest__Output } from '../../game/v1/TurnRequest';

export interface GameServiceClient extends grpc.Client {
  ResolveTurn(argument: _game_v1_TurnRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_game_v1_GameState__Output>): grpc.ClientUnaryCall;
  ResolveTurn(argument: _game_v1_TurnRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_game_v1_GameState__Output>): grpc.ClientUnaryCall;
  ResolveTurn(argument: _game_v1_TurnRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_game_v1_GameState__Output>): grpc.ClientUnaryCall;
  ResolveTurn(argument: _game_v1_TurnRequest, callback: grpc.requestCallback<_game_v1_GameState__Output>): grpc.ClientUnaryCall;
  resolveTurn(argument: _game_v1_TurnRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_game_v1_GameState__Output>): grpc.ClientUnaryCall;
  resolveTurn(argument: _game_v1_TurnRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_game_v1_GameState__Output>): grpc.ClientUnaryCall;
  resolveTurn(argument: _game_v1_TurnRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_game_v1_GameState__Output>): grpc.ClientUnaryCall;
  resolveTurn(argument: _game_v1_TurnRequest, callback: grpc.requestCallback<_game_v1_GameState__Output>): grpc.ClientUnaryCall;
  
}

export interface GameServiceHandlers extends grpc.UntypedServiceImplementation {
  ResolveTurn: grpc.handleUnaryCall<_game_v1_TurnRequest__Output, _game_v1_GameState>;
  
}

export interface GameServiceDefinition extends grpc.ServiceDefinition {
  ResolveTurn: MethodDefinition<_game_v1_TurnRequest, _game_v1_GameState, _game_v1_TurnRequest__Output, _game_v1_GameState__Output>
}
