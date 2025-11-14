import { useEffect, useState } from "react";
import { usePokemonQuizStore } from "../stores/pokemonQuizStore";

function PokemonQuiz() {
  const {
    score,
    currentPokemon,
    choices,
    isLoading,
    error,
    getNewQuestion,
    resetGame,
  } = usePokemonQuizStore();

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    getNewQuestion();
  }, []);

  function handleAnswerClick(choice) {
    setSelectedAnswer(choice);
    // console.log("Player choice:", choice);
  }

  //   console.log("Component render - currentPokemon:", currentPokemon);
  //   console.log("Component render - currentPokemon.image:", currentPokemon?.image);

  if (error) {
    return (
      <div>
        <div>Error: {error}</div>
        <button onClick={getNewQuestion}>Try Again</button>
      </div>
    );
  }

  if (isLoading || !currentPokemon || !currentPokemon.image) {
    // console.log("Showing loading state - currentPokemon:", currentPokemon);
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>Score: {score}</div>
      <img
        src={currentPokemon?.image}
        alt="Pokemon"
        onError={(e) => {
          console.error("Error loading image:", safeImage);
          e.target.style.display = "none";
        }}
      />
      <h3>Who's That Pokémon?</h3>
      {choices.map((choice, index) => (
        <button key={index} onClick={() => handleAnswerClick(choice)}>
          {choice}
        </button>
      ))}
      <button onClick={resetGame}>Start New Game</button>
    </div>
  );
}

export default PokemonQuiz;
