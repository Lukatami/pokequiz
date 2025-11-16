import { usePokemonQuizStore } from "../stores/pokemonQuizStore";

function QuizStats() {
  const { score, timeLeft, resetGame } = usePokemonQuizStore();

  function handleNewGameClick() {
    resetGame();
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString()} : ${secs.toString()}`;
  }

  return (
    <div className="quiz-stats">
      <div>Score: {score}</div>
      <div>Time: {formatTime(timeLeft)}</div>
      <button className="new-game-button" onClick={handleNewGameClick}>
        Start New Game
      </button>
    </div>
  );
}

export default QuizStats;
