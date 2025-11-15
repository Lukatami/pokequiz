import { useEffect, useState } from "react";
import { usePokemonQuizStore } from "../stores/pokemonQuizStore";
import "./PokemonQuiz.css";
import WTP from "../image/whos-that-pokemon.jpg";

function PokemonQuiz() {
  const {
    score,
    currentPokemon,
    choices,
    isLoading,
    error,
    getNewQuestion,
    checkAnswer,
    resetGame,
  } = usePokemonQuizStore();

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  function getButtonClass(choice) {
    if (!selectedAnswer) return "choice-button";
    if (choice === currentPokemon.name) return "choice-button correct";
    if (choice === selectedAnswer && choice !== currentPokemon.name)
      return "choice-button incorrect";
    return "choice-button";
  }

  useEffect(() => {
    getNewQuestion();
  }, []);

  function handleAnswerClick(choice) {
    const isCorrect = checkAnswer(choice);
    setSelectedAnswer(choice);
    setTimeout(() => {
      setSelectedAnswer(null);
      getNewQuestion();
    }, 2000);
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

  if (isLoading || !currentPokemon || !currentPokemon?.image) {
    // console.log("Showing loading state - currentPokemon:", currentPokemon);
    return (
      <div>
        <div>Score: {score}</div>
        <img src={WTP} alt="whos-that-pokemon"></img>
        <div>Loading...</div>
      </div>
    );
  }

  const safeImage = currentPokemon?.image || "";

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
      <div className="choice-button-container">
        {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(choice)}
            className={getButtonClass(choice)}
            disabled={selectedAnswer !== null}
          >
            {choice.toUpperCase()}
          </button>
        ))}
      </div>
      <button onClick={resetGame}>Start New Game</button>
    </div>
  );
}

export default PokemonQuiz;
