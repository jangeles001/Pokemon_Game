import { createContext, useContext } from "react";
import type { PokemonGameContextType } from "./usePokemonGame"

export const PokemonGameContext = createContext<PokemonGameContextType | undefined>(undefined);

export function usePokemonGameContext() {
  const context = useContext(PokemonGameContext);
  if (!context) throw new Error("Must be used within a PokemonGameContext.Provider");
  return context;
}