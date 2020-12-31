import React, { Fragment, useEffect, useRef } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Cards from "./Cards/Cards";
import { Paragraph } from "./Paragraph/Paragraph";
import { Buttom } from "../Buttom/Buttom";
import "materialize-css";
import {
  initContent,
  handlerMoreContent,
  changeContent,
  handlerPickPokemon,
} from "../../store/actions/index";
const Content = ({
  contentState,
  filterState,
  initContent,
  handlerMoreContent,
  changeContent,
  handlerPickPokemon,
}) => {
  const isFirstRun_1 = useRef(true);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokedex/national").then((Response) => {
      const pokemonList = Response.data.pokemon_entries;
      localStorage.setItem("pokemonsInStorage", JSON.stringify(pokemonList));

      initContent(pokemonList);
    });
  }, [initContent]);

  useEffect(() => {
    if (isFirstRun_1.current) {
      isFirstRun_1.current = false;
      return;
    }
    console.log("UseEffect content");

    changeContent(filterState.selected, filterState.searchBox);
  }, [filterState.selected, filterState.searchBox, changeContent]);

  return (
    <Fragment>
      {console.log("Rendering Component", contentState)}
      <Paragraph pokemons={contentState.pokemons.list} />

      <Cards pokemons={contentState.pokemons.list} click={handlerPickPokemon} />

      <div className="row">
        <div className="col offset-s3">
          {contentState.buttonOn && (
            <Buttom
              name={"Load More"}
              click={() => {
                handlerMoreContent(filterState.selected);
              }}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  contentState: state.content,
  filterState: state.filters,
});

const mapDispatchToProps = (dispatch) => {
  return {
    initContent: (pokemonList) => dispatch(initContent(pokemonList)),
    handlerMoreContent: (selected) => dispatch(handlerMoreContent(selected)),
    changeContent: (selected, searchBox) =>
      dispatch(changeContent(selected, searchBox)),
    handlerPickPokemon: (id) => dispatch(handlerPickPokemon(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
