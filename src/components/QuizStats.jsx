import { usePokemonQuizStore } from "../stores/pokemonQuizStore";

function QuizStats() {
  const { score, resetGame } = usePokemonQuizStore();

  function handleNewGameClick() {
    resetGame();
  }

  return (
    <div className="quiz-stats">
      <div>Score: {score}</div>
      <button className="new-game-button" onClick={handleNewGameClick}>
        Start New Game
      </button>
    </div>
  );
}

export default QuizStats;
