// Original file: proto/v1/game.proto

export const Turn = {
  TURN_UNSPECIFIED: 0,
  TURN_PLAYER1: 1,
  TURN_PLAYER2: 2,
  TURN_CPU: 3,
} as const;

export type Turn =
  | 'TURN_UNSPECIFIED'
  | 0
  | 'TURN_PLAYER1'
  | 1
  | 'TURN_PLAYER2'
  | 2
  | 'TURN_CPU'
  | 3

export type Turn__Output = typeof Turn[keyof typeof Turn]
