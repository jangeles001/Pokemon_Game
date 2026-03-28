import { PokemonHand } from "./PokemonHand.tsx"
import { GameMessage } from "./GameMessage.tsx"
import { usePokemonGameContext } from "../hooks/usePokemonGameContext.ts";
import { GameStatus } from "../../../shared/generated/game_pb.ts";

export function PokemonGame() {

 const {
  playerHand,
  opponentHand,
  gameStatus,
  attack,
  resetGame,
  } = usePokemonGameContext();
  return (
    <div>
      <div className="flex ml-auto">
        <p>Wins: {}</p>
        <p>Loses: {}</p>
      </div>
      {gameStatus !== GameStatus.GAMESTATUS_IDLE && <GameMessage Message={gameStatus} />}
      <PokemonHand
        handName="Player1"
        pokemonList={playerHand}
      ></PokemonHand>
      <button className="attack-button" onClick={() => attack()}>Attack</button>
      <PokemonHand
        handName="CPU"
        pokemonList={opponentHand}
      ></PokemonHand>
      <button className="reset-button" onClick={resetGame}>Reset Game</button>
    </div>
  );
}