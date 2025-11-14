import { useEffect, useState } from "react";
import { usePokemonQuizStore } from "../stores/pokemonQuizStore";

function PokemonQuiz() {
  const { score, currentPokemon, choices, isLoading, error, getNewQuestion } =
    usePokemonQuizStore();

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    getNewQuestion();
  }, []);

  function handleAnswerClick(choice) {
    setSelectedAnswer(choice);
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading || !currentPokemon?.image) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>{score}</div>
      <img src={currentPokemon.image} alt="Pokemon" />
      <h3>Who's That Pokémon?</h3>
      {choices.map((choice, index) => (
        <button key={index} onClick={() => handleAnswerClick(choice)}>
          {choice}
        </button>
      ))}
      <button>Start New Game</button>
    </div>
  );
}

export default PokemonQuiz;
