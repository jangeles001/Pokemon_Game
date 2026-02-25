import { PokemonGame }from "./components/PokemonGame"
import { storedPokemon } from "./StoredPokemon"
import { PokemonGameContext } from "./hooks/usePokemonGameContext"
import { usePokemonGame } from "./hooks/usePokemonGame"
import "./styles/Pokecard.css"
import "./styles/PokemonHand.css"
import './styles/App.css'

function App() {

    const game = usePokemonGame(storedPokemon);


  return (
    <>
      <PokemonGameContext.Provider value={game}>
        <PokemonGame />
      </PokemonGameContext.Provider>
    </>
  )
}

export default App
