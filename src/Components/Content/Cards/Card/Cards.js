import React from "react";
import { formatId } from "../../../../lib/formatedId";
import "./Cards.css";

export const Card = (props) => {
  return (
    <div
      onClick={() => {
        props.click(props.id);
      }}
      className="card col s3 s"
    >
      <div className="card-image">
        <img
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatId(
            props.id
          )}.png`}
          alt="none"
        />
      </div>
      <div className="card-content">
        <p>{props.name} </p>
      </div>
    </div>
  );
};
