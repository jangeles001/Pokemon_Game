import { PokemonHand } from "./PokemonHand.tsx"
import { GameMessage } from "./GameMessage.tsx"
import { usePokemonGameContext } from "../hooks/usePokemonGameContext.ts";

export function PokemonGame() {

 const {
  loses,
  wins,
  hand1, hand2, attack, resetGame,
  gameStatus
  } = usePokemonGameContext();

  console.log("poop");

  return (
    <div>
      <div className="flex ml-auto">
        <p>Wins: {wins}</p>
        <p>Loses: {loses}</p>
      </div>
      {gameStatus !== "InProgress" && <GameMessage Message={gameStatus} />}
      <PokemonHand
        handName="Player1"
        pokemonList={hand1}
      ></PokemonHand>
      <button className="attack-button" onClick={() => attack()}>Attack</button>
      <PokemonHand
        handName="CPU"
        pokemonList={hand2}
      ></PokemonHand>
      <button className="reset-button" onClick={resetGame}>Reset Game</button>
    </div>
  );
}