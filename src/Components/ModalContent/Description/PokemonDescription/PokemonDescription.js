import React, { Fragment } from "react";
import { formatId } from "../../../../lib/formatedId";
export const PokemonDescription = (props) => (
  <Fragment>
    <div className="row">
      <div className="col s4">{props.pokemonName}</div>
      <div className="col s2 offset-s4">{formatId(props.pokemonId)}</div>
    </div>
    <div className="row">{props.pokemonDescription}</div>
  </Fragment>
);
