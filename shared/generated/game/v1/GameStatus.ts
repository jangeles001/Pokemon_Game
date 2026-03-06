// Original file: proto/v1/game.proto

export const GameStatus = {
  GAMESTATUS_UNSPECIFIED: 0,
  GAMESTATUS_IDLE: 1,
  GAMESTATUS_ACTIVE: 2,
} as const;

export type GameStatus =
  | 'GAMESTATUS_UNSPECIFIED'
  | 0
  | 'GAMESTATUS_IDLE'
  | 1
  | 'GAMESTATUS_ACTIVE'
  | 2

export type GameStatus__Output = typeof GameStatus[keyof typeof GameStatus]
