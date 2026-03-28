import { usePokemonGame } from "../hooks/usePokemonGame";
import { PokemonGameContext } from "../hooks/usePokemonGameContext";

export interface PokemonGameProviderProps {
  children: React.ReactNode;
}

// This component "bridges" the Connect/Query providers to my custom Game Context
export function PokemonGameProvider({ children }: PokemonGameProviderProps) {

  const game = usePokemonGame(); 
  
  return (
    <PokemonGameContext.Provider value={game}>
      {children}
    </PokemonGameContext.Provider>
  );
}