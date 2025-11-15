import { useEffect, useState } from "react";
import { usePokemonQuizStore } from "../stores/pokemonQuizStore";

function PokemonQuiz() {
  const {
    score,
    currentPokemon,
    choices,
    checkAnswer,
    getNewQuestion,
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
    checkAnswer(choice);
    setSelectedAnswer(choice);

    setTimeout(() => {
      setSelectedAnswer(null);
      getNewQuestion();
    }, 2000);
  }

  function handleNewGameClick(e) {
    setSelectedAnswer(null);
    resetGame();
  }

  return (
    <div className="quiz-container">
      <p className="quiz-question">Who's That Pokémon?</p>
      <div className="quiz-stats">
        <div>Score: {score}</div>
        <button className="new-game-button" onClick={handleNewGameClick}>
          Start New Game
        </button>
      </div>
      <div className="pokemon-image-container">
        <img
          className="current-pokemon-image"
          src={currentPokemon?.image}
          alt="Pokemon"
        />
      </div>

      <div className="choice-button-container">
        {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(choice)}
            className={getButtonClass(choice)}
            disabled={selectedAnswer !== null}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PokemonQuiz;
