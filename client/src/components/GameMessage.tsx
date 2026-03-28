import type { GameStatus } from "../../../shared/generated/game_pb.ts";

interface GameMessageProps {
    Message: GameStatus;
}

export function GameMessage({ Message }: GameMessageProps){
    return <div className="Game-Message">{Message}</div>
}