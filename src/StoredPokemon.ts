export const storedPokemon = [
  // Fire
  { id: 4, name: "Charmander", type: "fire" },
  { id: 37, name: "Vulpix", type: "fire" },
  { id: 58, name: "Growlithe", type: "fire" },

  // Water
  { id: 7, name: "Squirtle", type: "water" },
  { id: 54, name: "Psyduck", type: "water" },
  { id: 60, name: "Poliwag", type: "water" },

  // Grass
  { id: 1, name: "Bulbasaur", type: "grass" },
  { id: 43, name: "Oddish", type: "grass" },
  { id: 102, name: "Exeggcute", type: "grass" },

  // Electric
  { id: 25, name: "Pikachu", type: "electric" },
  { id: 100, name: "Voltorb", type: "electric" },
  { id: 81, name: "Magnemite", type: "electric" },

  // Normal
  { id: 39, name: "Jigglypuff", type: "normal" },
  { id: 133, name: "Eevee", type: "normal" },
  { id: 52, name: "Meowth", type: "normal" },

  // Fighting
  { id: 66, name: "Machop", type: "fighting" },
  { id: 56, name: "Mankey", type: "fighting" },

  // Flying
  { id: 16, name: "Pidgey", type: "flying" },
  { id: 21, name: "Spearow", type: "flying" },

  // Poison
  { id: 14, name: "Kakuna", type: "poison" },
  { id: 23, name: "Ekans", type: "poison" },

  // Ground
  { id: 27, name: "Sandshrew", type: "ground" },
  { id: 50, name: "Diglett", type: "ground" },

  // Rock
  { id: 74, name: "Geodude", type: "rock" },
  { id: 95, name: "Onix", type: "rock" },

  // Bug
  { id: 10, name: "Caterpie", type: "bug" },
  { id: 11, name: "Metapod", type: "bug" },

  // Ghost
  { id: 92, name: "Gastly", type: "ghost" },

  // Psychic
  { id: 96, name: "Drowzee", type: "psychic" },

  // Ice
  { id: 86, name: "Seel", type: "ice" },

  // Dragon
  { id: 147, name: "Dratini", type: "dragon" },

  // Dark
  { id: 261, name: "Poochyena", type: "dark" },

  // Fairy
  { id: 35, name: "Clefairy", type: "fairy" },
];

export type PokemonType = typeof storedPokemon[number]["type"];