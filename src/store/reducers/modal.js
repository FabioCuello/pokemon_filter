import * as actionTypes from "../actions.js";

const modalInitialState = {
  modal: {
    reShow: false,
    selectedId: 0,
    detail: {
      name: "",
      id: "001",
      color: "",
      height: "",
      weight: "",
      category: "",
      habitat: "",
      types: "",
      description: "",
      evolution: [],
      gender: "",
    },
  },
};

export const modalReducer = (state = modalInitialState, action) => {
  if (action.type === actionTypes.handlerPickPokemon) {
    const newmodal = action.id;

    if (state.modal.selectedId === newmodal) {
      return {
        ...state,
        modal: {
          ...state.modal,
          reShow: !state.modal.reShow,
        },
      };
    }

    return {
      ...state,
      modal: {
        ...state.modal,
        selectedId: newmodal,
        reShow: !state.modal.reShow,
      },
    };
  }
  if (action.type === actionTypes.handlerDetailsPokemon) {
    const newDescriptionPokemon = action.descriptionPokemon;

    return {
      ...state,
      modal: {
        ...state.modal,
        detail: newDescriptionPokemon,
      },
    };
  }

  return state;
};
