import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'
import type { TurnRequest } from '@shared/generated/game/v1/TurnRequest'
import type { GameState } from '@shared/generated/game/v1/GameState';
import { Turn } from '@shared/generated/game/v1/Turn'


function resolveTurn(call: ServerUnaryCall<TurnRequest, GameState>, callback: sendUnaryData<GameState>){
    const request = call.request;

    if(!request.sessionId){
        return callback({
            code: 3,
            message: "SessionID is required to resolve a turn!"
        })
    }

    // TODO: Load session
    // run gameEngine.resolveTurn();
    // return new GameState

     const mockGameState: GameState = {
        sessionId: request.sessionId,
        player: [
            {
                id: "p1",
                name: "Pikachu",
                currentHp: 50,
                maxHp: 100,
                isFainted: false
            }
        ],
        opponent: [
            {
                id: "e1",
                name: "Charizard",
                currentHp: 80,
                maxHp: 120,
                isFainted: false
            }
        ],
        isGameOver: false,
        currentTurn: Turn.TURN_PLAYER2, // Use the generated Enum
        lastActionSummary: `Attacker ${request.attackerId} used move ${request.moveId}`
    };

    callback(null, mockGameState);
}