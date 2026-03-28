import { useState } from "react"
import { PokemonGame } from "./components/PokemonGame"
import { PokemonGameProvider } from "./components/GameProvider"
import { TransportProvider } from "@connectrpc/connect-query"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import "./styles/Pokecard.css"
import "./styles/PokemonHand.css"
import './styles/App.css'
import { createConnectTransport } from "@connectrpc/connect-web"

  const transport = createConnectTransport({
    baseUrl: "http://localhost:8080",
    fetch: (input, init) => fetch(input, { // Custom fetch function that adds credentials to every request
      ...init, // Spread the existing init options
      credentials: "include",
    }),
  });

function App() {
  // Initialize QueryClient once using state to prevent cache wipes on re-render
  // This ensures that the same QueryClient instance is used throughout the app's lifecycle
  // and allows for future enhancements like wrapping theme or other providers around the QueryClientProvider without worrying about cache resets.
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <>
      <TransportProvider transport={transport}>
        <QueryClientProvider client={queryClient}>
          <PokemonGameProvider>
            <PokemonGame />
          </PokemonGameProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </TransportProvider>
    </>
  )
}

export default App
