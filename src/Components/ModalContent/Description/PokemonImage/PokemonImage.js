import React from "react";
import { CustomImg } from "../../../Images/Img";
import { formatId } from "../../../../lib/formatedId";

export const PokemonImage = (props) => (
  <div className="card-image">
    <CustomImg
      maxWidth={"100%"}
      src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatId(
        props.id
      )}.png`}
    />
  </div>
);
