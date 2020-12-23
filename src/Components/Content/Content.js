import React, { Fragment, useEffect, useRef } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Cards } from "./Contents/Cards/Cards";
import { Paragraph } from "./Contents/Paragraph/Paragraph";
import "materialize-css";
import Modal from "./Modal/ModalContent";
import "./Content.css";
import * as actionTypes from "../../store/actions.js";

const Content = ({
  props,
  initContent,
  handlerMoreContent,
  changeFilter,
  handlerPickPokemon,
}) => {
  const isFirstRun_1 = useRef(true);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokedex/national").then((Response) => {
      const pokemonList = Response.data.pokemon_entries;
      localStorage.setItem("pokemonsInStorage", JSON.stringify(pokemonList));

      initContent(pokemonList);
    });
  }, []);

  useEffect(() => {
    if (isFirstRun_1.current) {
      isFirstRun_1.current = false;
      return;
    }

    changeFilter();
  }, [props.selected]);

  return (
    <Fragment>
      <Paragraph pokemons={props.pokemons.list} />
      <Modal />

      <Cards pokemons={props.pokemons.list} click={handlerPickPokemon} />

      <div className="row">
        <div className="col offset-s3">
          {props.buttonOn ? (
            <button
              className="offset-s6 waves-effect waves-light btn"
              onClick={() => {
                handlerMoreContent();
              }}
            >
              Load More
            </button>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (props) => ({
  props: props,
});

const mapDispatchToProps = (dispatch) => {
  return {
    initContent: (pokemonList) =>
      dispatch({ type: actionTypes.initContent, pokemonList }),
    handlerMoreContent: () =>
      dispatch({ type: actionTypes.handlerMoreContent }),
    changeFilter: () => dispatch({ type: actionTypes.changeFilter }),
    handlerPickPokemon: (id) =>
      dispatch({ type: actionTypes.handlerPickPokemon, id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
