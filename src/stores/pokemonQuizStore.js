import { create } from "zustand";
import WTP from "../image/whos-that-pokemon.jpg";

export const usePokemonQuizStore = create((set, get) => ({
  score: 0,
  currentPokemon: { name: "", image: WTP },
  choices: [],
  isLoading: false,
  error: null,

  getNewQuestion: async () => {
    // console.log("Starting getNewQuestion");
    set({
      isLoading: true,
      error: null,
      currentPokemon: { name: "", image: WTP },
    });

    try {
      const pokemonIds = [];
      while (pokemonIds.length < 3) {
        const randomId = Math.floor(Math.random() * 1025) + 1;
        if (!pokemonIds.includes(randomId)) {
          pokemonIds.push(randomId);
        }
      }

      //   console.log("Pokemon IDs:", pokemonIds);

      const pokemons = [];
      for (const id of pokemonIds) {
        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
          const pokemon = await response.json();
          pokemons.push(pokemon);
        } catch (e) {
          console.error(e);
        }
      }

      //   console.log("Loaded pokemons:", pokemons.length);

      if (pokemons.length < 2) {
        throw new Error("Not enough Pokemons loaded");
      }

      const correctPokemon =
        pokemons[Math.floor(Math.random() * pokemons.length)];
      const allChoices = pokemons.map((p) => p.name);
      const shuffledChoices = allChoices.sort(() => Math.random() - 0.5);

      const pokemonImage =
        correctPokemon.sprites?.other?.["official-artwork"]?.front_default;

      //   console.log("Pokemon image:", pokemonImage);

      const newCurrentPokemon = {
        name: correctPokemon.name,
        image: pokemonImage,
      };

      set({
        currentPokemon: newCurrentPokemon,
        choices: shuffledChoices,
        isLoading: false,
      });
      //   console.log("Successfully set new pokemon");
    } catch (e) {
      set({
        error: e.message,
        isLoading: false,
        currentPokemon: { name: "", image: WTP },
      });
    }
  },

  checkAnswer: (selectedAnswer) => {
    const { currentPokemon, score } = get();
    const isCorrect = selectedAnswer === currentPokemon.name;

    set({ score: isCorrect ? score + 1 : score - 1 });
    return isCorrect;
  },

  resetGame: () => {
    // console.log("Resetting game...");

    set({
      isLoading: true,
    });

    setTimeout(() => {
      set({
        score: 0,
        currentPokemon: { name: "", image: WTP },
        choices: [],
        isLoading: false,
        error: null,
      });

      //   console.log("Game reset complete");

      get().getNewQuestion();
    }, 1000);
  },
}));
