import React, { Fragment } from "react";
import { Evolution } from "./Evolution/Evolution";
import { Description } from "./Description/Desciption";
import { connect } from "react-redux";
import { Modal } from "../Modal/Modal";

const PokemonModal = ({ pokemonDetails }) => (
  <Fragment>
    <Modal buttomName={"Close"} showModal={true} modalId={"modal1"}>
      <Description
        id={pokemonDetails.id}
        pokemonName={pokemonDetails.name}
        pokemonDescription={pokemonDetails.description}
        height={pokemonDetails.height}
        weight={pokemonDetails.weight}
        category={pokemonDetails.category}
        gender={pokemonDetails.gender}
        habitat={pokemonDetails.habitat}
        color={pokemonDetails.color}
      />
      <hr />
      <Evolution pokemonEvolution={pokemonDetails.evolution} />
    </Modal>
  </Fragment>
);

const mapStateToProps = (state) => ({
  pokemonDetails: state.modal,
});

export default connect(mapStateToProps, null)(PokemonModal);
