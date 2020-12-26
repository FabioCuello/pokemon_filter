import * as actionsTypes from "./actionsTypes";

export const initContent = (pokemonList) => {
  return {
    type: actionsTypes.initContent,
    pokemonList,
  };
};

export const handlerMoreContent = (stateSelected) => {
  return {
    type: actionsTypes.handlerMoreContent,
    stateSelected,
  };
};

export const changeContent = (stateSelected, stateSearchbox) => {
  return {
    type: actionsTypes.changeContent,
    stateSelected,
    stateSearchbox,
  };
};

export const handlerPickPokemon = (id) => {
  return {
    type: actionsTypes.handlerPickPokemon,
    id,
  };
};
