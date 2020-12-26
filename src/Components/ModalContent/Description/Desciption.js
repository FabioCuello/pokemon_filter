import React from "react";
import { PokemonDescription } from "./PokemonDescription/PokemonDescription";
import { Table } from "./Table/Table";
import { Types } from "./Types/Types";
import { PokemonImage } from "./PokemonImage/PokemonImage";

export const Description = (props) => (
  <div className="row">
    <div className="col s6">
      <PokemonImage id={props.id} />
    </div>
    <div className="col s6">
      <PokemonDescription
        pokemonName={props.pokemonName}
        pokemonId={props.id}
        pokemonDescription={props.pokemonDescription}
      />
      <Table
        height={props.height}
        weight={props.weight}
        category={props.category}
        gender={props.gender}
        habitat={props.habitat}
        color={props.color}
      />
      <Types types={props.types} />
    </div>
  </div>
);
