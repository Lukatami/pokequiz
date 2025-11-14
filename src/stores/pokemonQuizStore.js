import { create } from "zustand";

export const usePokemonQuizStore = create((set, get) => ({
  score: 0,
  currentPokemon: null,
  choices: [],
  isLoading: false,
  error: null,

  getNewQuestion: async () => {
    set({ isLoading: true, error: null });

    try {
      const pokemonIds = [];
      while (pokemonIds.length < 3) {
        const randomId = Math.floor(Math.random() * 151) + 1;
        if (!pokemonIds.includes(randomId)) {
          pokemonIds.push(randomId);
        }
      }

      const pokemons = [];
      for (const id of pokemonIds) {
        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          const pokemon = await response.json();
          pokemons.push(pokemon);
        } catch (e) {
          console.error(e)
        }
      }

      const correctPokemon =
        pokemons[Math.floor(Math.random() * pokemons.length)];
      const allChoices = pokemons.map((p) => p.name);
      const shuffledChoices = allChoices.sort(() => Math.random() - 0.5);

      const pokemonImage =
        correctPokemon.sprites?.other?.["official-artwork"]?.front_default;

      set({
        currentPokemon: {
          name: correctPokemon.name,
          image: pokemonImage,
        },
        choices: shuffledChoices,
        isLoading: false,
      });
    } catch (e) {
      set({
        error: e.message,
        isLoading: false,
      });
    }
  },
}));
