import { usePokemonGameContext } from "../hooks/usePokemonGameContext.ts";
import { PokemonCard } from "./PokemonCard.tsx";
import type { Pokemon } from "../types/pokemon.ts";

interface PokemonHandProps {
  handName: string;
  pokemonList: Pokemon[];
}

export function PokemonHand({ handName, pokemonList }: PokemonHandProps) {

  const { turn } = usePokemonGameContext();

  return (
    <div>
      <div className="pokemon-hand">
        <div className="status-message">
          <h1 className={`${turn === handName.toLowerCase() ? "active" : ""}`}>
            {handName}
          </h1>
        </div>
        <div className="card-container">
          {pokemonList.map((pokemon: Pokemon) => (
            <PokemonCard
              key={`${pokemon?.id} - ${handName} `}
              id={pokemon?.id}
              name={pokemon?.name}
              type={pokemon?.type}
              handName={handName}
              disabled={turn === "cpu"}
            ></PokemonCard>
          ))}
        </div>
      </div>
    </div>
  );
}
