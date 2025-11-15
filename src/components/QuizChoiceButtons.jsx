import { useState } from "react";
import { usePokemonQuizStore } from "../stores/pokemonQuizStore";

function QuizChoiceButtons() {
  const { currentPokemon, choices, checkAnswer, getNewQuestion, isQuizActive } =
    usePokemonQuizStore();

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  function getButtonClass(choice) {
    if (!selectedAnswer) return "choice-button";
    if (choice === currentPokemon.name) return "choice-button correct";
    if (choice === selectedAnswer && choice !== currentPokemon.name)
      return "choice-button incorrect";
    return "choice-button";
  }

  function handleAnswerClick(choice) {
    if (!isQuizActive || selectedAnswer) return;
    checkAnswer(choice);
    setSelectedAnswer(choice);

    setTimeout(() => {
      setSelectedAnswer(null);
      if (isQuizActive) {
        getNewQuestion();
      }
    }, 2000);
  }

  return (
    <div className="choice-button-container">
      {choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => handleAnswerClick(choice)}
          className={getButtonClass(choice)}
          disabled={selectedAnswer !== null || !isQuizActive}
        >
          {choice}
        </button>
      ))}
    </div>
  );
}

export default QuizChoiceButtons;
