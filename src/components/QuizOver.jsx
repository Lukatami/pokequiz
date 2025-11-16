import { usePokemonQuizStore } from "../stores/pokemonQuizStore";
import YW from "../image/youwin.png";
import YL from "../image/youlost.png";

function QuizOver() {
  const { startQuiz, score } = usePokemonQuizStore();

  function winOrlost(score) {
    if (score < 5) return YL;
    return YW;
  }

  return (
    <div className="quiz-menu">
      <img className="logo" src={winOrlost(score)} alt="YouWin" />
      <h1>Your final score: {score}</h1>
      <button className="start-quiz-button" onClick={startQuiz}>
        Start New Quiz
      </button>
    </div>
  );
}

export default QuizOver;
