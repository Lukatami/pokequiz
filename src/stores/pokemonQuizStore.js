import { create } from "zustand";
import WTP from "../image/whos-that-pokemon.jpg";

export const usePokemonQuizStore = create((set, get) => ({
  stage: "menu",
  score: 0,
  currentPokemon: { name: "", image: WTP },
  choices: [],
  timeLeft: 0,
  isQuizActive: false,

  startQuiz: () => {
    set({ stage: "quiz", score: 0, timeLeft: 120, isQuizActive: true });
    get().getNewQuestion();
  },

  getNewQuestion: async () => {
    const { isQuizActive } = get();
    if (!isQuizActive) return;

    try {
      const pokemonIds = [];
      while (pokemonIds.length < 3) {
        const randomId = Math.floor(Math.random() * 1025) + 1;
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
          if (!response.ok) continue;
          const pokemon = await response.json();
          pokemons.push(pokemon);
        } catch (e) {
          console.error(e);
        }
      }

      if (pokemons.length < 3) {
        return get().getNewQuestion();
      }

      const correctPokemon =
        pokemons[Math.floor(Math.random() * pokemons.length)];
      const allChoices = pokemons.map((p) => p.name);
      const shuffledChoices = allChoices.sort(() => Math.random() - 0.5);

      const pokemonImage =
        correctPokemon.sprites?.other?.["official-artwork"]?.front_default ||
        WTP;

      const newCurrentPokemon = {
        name: correctPokemon.name,
        image: pokemonImage,
      };

      set({
        currentPokemon: newCurrentPokemon,
        choices: shuffledChoices,
      });
    } catch (e) {
      console.error("Error in getQuestion: ", e);
      setTimeout(() => get().getNewQuestion(), 1000);
    }
  },

  checkAnswer: (selectedAnswer) => {
    const { currentPokemon, score, isQuizActive } = get();
    if (!isQuizActive) return false;

    const isCorrect = selectedAnswer === currentPokemon.name;

    set({ score: isCorrect ? score + 1 : Math.max(0, score - 1) });
    return isCorrect;
  },

  resetGame: () => {
    set({ score: 0, timeLeft: 120, isQuizActive: true });
    get().getNewQuestion();
  },

  decrementTime: () => {
    set((state) => {
      const newTimeLeft = state.timeLeft - 1;
      if (newTimeLeft <= 0) {
        return {
          timeLeft: 0,
          isQuizActive: false,
          stage: "quizOver",
        };
      }
      return { timeLeft: newTimeLeft };
    });
  },

  setQuizActive: (active) => {
    set({ isQuizActive: active });
  },
}));
