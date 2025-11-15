import { usePokemonQuizStore } from "../stores/pokemonQuizStore";

function QuizPokemonImage() {
  const { currentPokemon } = usePokemonQuizStore();

  return (
    <div className="pokemon-image-container">
      <img
        className="current-pokemon-image"
        src={currentPokemon?.image}
        alt="Pokemon"
      />
    </div>
  );
}

export default QuizPokemonImage;
