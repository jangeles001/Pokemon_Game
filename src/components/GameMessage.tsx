import type { GameState } from "../types/game.ts";

interface GameMessageProps {
    Message: GameState;
}

export function GameMessage({ Message }: GameMessageProps){
    return <div className="Game-Message">{Message}</div>
}