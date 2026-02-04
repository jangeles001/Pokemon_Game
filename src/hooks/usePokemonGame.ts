import { useState, useEffect, useCallback } from "react";
import type { Pokemon } from "../types/pokemon.ts";
import type { Turn, GameState } from "../types/game.ts"
import { resolveBattle } from "../utils/resovleBattle.ts"
import { getCpuMove } from "../utils/getCpuMove.ts"
import { shuffleArray} from "../utils/gameUtilities.ts";

// Hook takes in an array of pokemon
export function usePokemonGame(pokemonList: Pokemon[]) {
  // Hands defines the two state of the players hands
	const [hands, setHands] = useState<{  
    hand1: Pokemon[];
    hand2: Pokemon[];
  }>(() => {
    const shuffled = shuffleArray([...pokemonList]); // Array shuffled
    return {
      hand1: shuffled.slice(0, 5),  // First 5 cards set to hand1
      hand2: shuffled.slice(5, 10),	// Next 5 cards are set to hand2
    };
  });

  const [turn, setTurn] = useState<Turn>("player1");
  const [attacker, setAttacker] = useState<Pokemon | null >(null);
  const [defender, setDefender] = useState<Pokemon | null>(null);
  const [gameStatus, setGameStatus] = useState<GameState>("InProgress");
  const [wins, setWins] = useState<number>(0);
  const [loses, setLoses] = useState<number>(0);
      


  useEffect(() => {
    if (hands.hand1.length === 0 && hands.hand2.length === 0) {
      setGameStatus("Tie!");
      setWins(prev => prev + 1);
    } else if (hands.hand1.length === 0) {
      setGameStatus("You Lose!");
      setLoses(prev => prev + 1);
    } else if (hands.hand2.length === 0) {
      setGameStatus("You Win!");
      setWins(prev => prev + 1);
    } else {
      setGameStatus("InProgress");
    }
  }, [hands.hand1.length, hands.hand2.length]);

 const attack = useCallback(() => {
  if (!attacker || !defender) return;

   // result: "win" | "lose" | "tie"
  const result = resolveBattle(attacker, defender);
 

  setHands(prev => {
    let { hand1, hand2 } = prev;

    const attackerInHand1 = hand1.some(p => p.id === attacker.id);
    const defenderInHand1 = hand1.some(p => p.id === defender.id);

    const removeFromHand1 = (id: number) => {
        hand1 = hand1.filter(p => p.id !== id);
      }
    const removeFromHand2 = (id: number) => {
      hand2 = hand2.filter(p => p.id !== id);
    }

    if (result === "win" || result === "tie") {
      // defender loses
      defenderInHand1
        ? removeFromHand1(defender.id)
        : removeFromHand2(defender.id);
    }

    if (result === "lose" || result === "tie") {
      // attacker loses
      attackerInHand1
        ? removeFromHand1(attacker.id)
        : removeFromHand2(attacker.id);
    }

    return { hand1, hand2 };
  });

  // reset selection + advance turn
  setAttacker(null);
  setDefender(null);
  setTurn(prev => (prev === "player1" ? "cpu" : "player1"));
},[attacker, defender])

  const resetGame = () => {
    const shuffled = shuffleArray([...pokemonList]);
    setHands({
      hand1: shuffled.slice(0, 5),
      hand2: shuffled.slice(5, 10),
    });
  };

  /** Handle automatic CPU turn */
useEffect(() => {
  if (turn !== "cpu") return;

  const move = getCpuMove(hands.hand1, hands.hand2);
  if (!move) {
    setTurn("player1");
    return;
  }

  setAttacker(move.cpuCard);
  setDefender(move.playerCard);
}, [turn, hands.hand1, hands.hand2]);

useEffect(() => {
  if (turn !== "cpu") return;
  if (!attacker || !defender) return;

  const timer = setTimeout(() => {
    attack();
  }, 700);

  return () => clearTimeout(timer);
}, [turn, attacker, attack, defender]);

  return {
    pokemonList,
    hand1: hands.hand1,
    hand2: hands.hand2,
    turn,
    // wins,
    // loses,
    attacker,
    setAttacker,
    defender,
    setDefender,
    attack,
    wins,
    loses,
    resetGame,
    gameStatus,
  };
}

export type PokemonGameContextType = ReturnType<typeof usePokemonGame>;