import { useContext } from "react";
import { PokemonContext } from "../Provider/AppContext";
import ButtomFilter from "./ButtomFilter";
import PokemonCard from "./PokemonCard";
import "./styles/card.css";

export default function PokemonList() {
  // Aca vamos a crear la instancia para que cree las CARD con la informacion que recoja desde el CONTEXT
  const { loading, filteredPokemon } = useContext(PokemonContext);

  return (
    <div className="">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="container">
            <ButtomFilter />
          </div>
          <div className="card-list-pokemon">
            {filteredPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={{
                  id: pokemon.id,
                  name: pokemon.name,
                  image: pokemon.sprites.front_default,
                  type: pokemon.types[0].type.name,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
