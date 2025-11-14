function PokemonQuiz() {
  return (
    <div>
      <div>{score}</div>
      <img src={currentPokemon.image} alt="Pokemon" />
      <h3>Who's That Pokémon?</h3>
      <button>{choice.name}</button>
      <button>{choice.name}</button>
      <button>{choice.name}</button>
      <button>Start New Game</button>
    </div>
  );
}

export default PokemonQuiz;
