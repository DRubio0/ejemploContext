import { useContext } from "react";
import { PokemonContext } from "../Provider/AppContext";
import "./styles/card.css";
export default function PokemonCard({ pokemon }) {
  const { pokemonTypes } = useContext(PokemonContext);

  const type = pokemonTypes.find((type) => type.name === pokemon.type);
  const color = type ? type.color : "gray";

  return (
    <div className="">
      <div className="card-pokemon">
        <div className="card-img">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            width={"200px"}
          />
        </div>
        <div className="card-info" style={{ backgroundColor: color }}>
          <span className="pokemon-id">N° {pokemon.id}</span>
          <h3>Name: {pokemon.name}</h3>
          <div className="card-types">
            {/* para poder sacar los tipos hacemos un mapeado de nuestra instancia ya que en la poke api viene dentro de un array la informacion */}
            {/* {pokemon.types.map((type)=>(
                <span className={type.type.name} key={type.type.name}>{type.type.name}</span>
            ))} */}
            {pokemon.type}
          </div>
        </div>
      </div>
    </div>
  );
}
