import * as actionTypes from "../actions/actionsTypes";

const modalInitialState = {
  name: "",
  id: "1",
  color: "",
  height: "",
  weight: "",
  category: "",
  habitat: "",
  types: "",
  description: "",
  evolution: [],
  gender: "",
};

export const modalReducer = (state = modalInitialState, action) => {
  if (action.type === actionTypes.handlerPickPokemon) {
    return {
      ...action.newPokemonInfo,
    };
  }

  return state;
};
