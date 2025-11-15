import { useEffect } from "react";
import { usePokemonQuizStore } from "../stores/pokemonQuizStore";
import QuizStats from "./QuizStats";
import QuizPokemonImage from "./QuizPokemonImage";
import QuizChoiceButtons from "./QuizChoiceButtons";

function PokemonQuiz() {
  const { getNewQuestion, timeLeft, isGameActive, decrementTime } = usePokemonQuizStore();

  useEffect(() => {
    getNewQuestion();

    const timer = setInterval(() => {
      decrementTime()
    }, 1000)

    return () => clearInterval(timer)
  }, []);

  return (
    <div className="quiz-container">
      <p className="quiz-question">Who's That Pokémon?</p>
      <QuizStats />
      <QuizPokemonImage />
      <QuizChoiceButtons />
    </div>
  );
}

export default PokemonQuiz;
