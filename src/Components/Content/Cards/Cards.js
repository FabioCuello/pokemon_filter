import React from "react";
import { capitalize } from "../../../lib/Capitalize";
import { Card } from "./Card/Cards";

const Cards = (props) => {
  const cards = props.pokemons.map((pokemon) => (
    <Card
      click={props.click}
      id={pokemon.entry_number}
      key={pokemon.entry_number}
      name={capitalize(pokemon.pokemon_species.name)}
    />
  ));

  return <div className="row">{cards}</div>;
};

export default Cards;
