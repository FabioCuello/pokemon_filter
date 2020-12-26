import * as actionTypes from "../actions/actionsTypes";

const modalInitialState = {
  selectedPokemonId: "1",
};

export const modalReducer = (state = modalInitialState, action) => {
  if (action.type === actionTypes.handlerPickPokemon) {
    const newSelectedPokemonId = action.id;
    return {
      selectedPokemonId: newSelectedPokemonId,
    };
  }

  return state;
};
