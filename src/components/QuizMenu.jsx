import { usePokemonQuizStore } from "../stores/pokemonQuizStore";
import PQ from "../image/pokemonquiz.png";

function QuizMenu() {
  const { startQuiz } = usePokemonQuizStore();

  return (
    <div className="quiz-menu">
      <img className="logo" src={PQ} alt="PokemonQuiz" />
      <h1>Test your Pokemon knowledge!</h1>
      <h2>Rules are simple:</h2>
      <ul>
        <li>2 minute</li>
        <li>Correct guess +1 point</li>
        <li>Wrong guess: -1 point</li>
      </ul>
      <button className="start-quiz-button" onClick={startQuiz}>
        Start Quiz
      </button>
    </div>
  );
}

export default QuizMenu;
