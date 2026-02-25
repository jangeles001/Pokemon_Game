import { usePokemonGameContext } from "../hooks/usePokemonGameContext";
import type { PokemonType } from "../StoredPokemon";

interface PokeCardProps{
  id: number;
  name: string;
  type: PokemonType;
  handName: string;
  disabled?: boolean;
}

export function PokemonCard({ id, name, type, handName, disabled }: PokeCardProps) {

  const { turn, attacker, defender, setAttacker, setDefender } = usePokemonGameContext();

  return (
    <div 
    className={`pokecard type-${type} ${attacker?.id === id || defender?.id === id ? "selected" : ""}`}
    onClick={() =>{ 
      if(disabled) return;
      if(turn === handName.toLowerCase())
        return setAttacker({id, name, type})
      return setDefender({id, name, type})
    }}
    >
      <h1>{name}</h1>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
      ></img>
      <h2>{type.toUpperCase()}</h2>
    </div>
  );
}
