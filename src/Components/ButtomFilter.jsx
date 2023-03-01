import React, { useContext } from "react";
import { PokemonContext } from "../Provider/AppContext";

export default function ButtomFilter() {
  const { pokemonTypes, selectedType, handleTypeClick } =
    useContext(PokemonContext);

  const handleButtonClick = (event) => {
    const selectedType = event.target.value;
    handleTypeClick(selectedType);
  };
  return (
    <div>
      <div className="type-buttons">
        {pokemonTypes.map((type) => (
          <button
            key={type.name}
            value={type.name}
            className={selectedType === type.name ? "active" : ""}
            style={{ backgroundColor: type.color }}
            onClick={handleButtonClick}
          >
            {type.name}
          </button>
        ))}
      </div>
    </div>
  );
}
