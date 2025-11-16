import { useEffect } from "react";
import { usePokemonQuizStore } from "../stores/pokemonQuizStore";
import QuizMenu from "./QuizMenu";
import QuizStats from "./QuizStats";
import QuizPokemonImage from "./QuizPokemonImage";
import QuizChoiceButtons from "./QuizChoiceButtons";
import QuizOver from "./QuizOver";

function PokemonQuiz() {
  const { decrementTime, isQuizActive, timeLeft, stage } =
    usePokemonQuizStore();

  useEffect(() => {
    if (isQuizActive && timeLeft > 0) {
      const timer = setInterval(() => {
        decrementTime();
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isQuizActive, timeLeft, decrementTime]);

  return (
    <div className="quiz-container">
      {!isQuizActive && stage === "menu" ? (
        <QuizMenu />
      ) : (
        <>
          {stage !== "quizOver" ? (
            <>
              <p className="quiz-question">Who's That Pokémon?</p>
              <QuizStats />
              <QuizPokemonImage />
              <QuizChoiceButtons />
            </>
          ) : (
            <QuizOver />
          )}
        </>
      )}
    </div>
  );
}

export default PokemonQuiz;
