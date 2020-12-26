import * as actionTypes from "../actions/actionsTypes";
import { findInterception } from "../../lib/repeatedValuesArrays";

const contentInitialState = {
  pokemons: {
    list: [],
    count: 6,
  },
  buttonOn: true,
};

export const contentReducer = (state = contentInitialState, action) => {
  switch (action.type) {
    case actionTypes.initContent: {
      return {
        ...state,
        pokemons: {
          list: action.pokemonList.slice(0, 6),
          count: 6,
        },
        buttonOn: state.buttonOn,
      };
    }

    // TODO import a function to do all this logic
    case actionTypes.handlerMoreContent: {
      const newCount = state.pokemons.count + 6;

      const allPokemons = JSON.parse(localStorage.getItem("pokemonsInStorage"));
      const allPokemonsId = allPokemons.map((pokemon) => pokemon.entry_number);

      let typesPokemonsFiltered = findInterception(
        action.stateSelected.types[0],
        action.stateSelected.types.slice(1)
      );
      let colorsPokemonsFiltered = findInterception(
        action.stateSelected.colors[0],
        action.stateSelected.colors.slice(1)
      );
      let gendersPokemonsFiltered =
        action.stateSelected.genders.length === 0
          ? allPokemonsId
          : action.stateSelected.genders;
      let inputPokemonsFilteres =
        action.stateSelected.input.length === 0
          ? allPokemonsId
          : action.stateSelected.input;

      if (typeof typesPokemonsFiltered == "undefined") {
        typesPokemonsFiltered = allPokemonsId;
      }
      if (typeof colorsPokemonsFiltered == "undefined") {
        colorsPokemonsFiltered = allPokemonsId;
      }

      const allPokemonsPreFilteredId = [
        typesPokemonsFiltered,
        colorsPokemonsFiltered,
        gendersPokemonsFiltered,
        inputPokemonsFilteres,
      ];
      const allPokemonsFilteredId = findInterception(
        allPokemonsPreFilteredId[0],
        allPokemonsPreFilteredId.slice(1),
        newCount
      );

      const allPokemonsWithNoFilter = findInterception(
        allPokemonsPreFilteredId[0],
        allPokemonsPreFilteredId.slice(1)
      );

      const showPokemons = allPokemons
        .map((el) =>
          allPokemonsFilteredId.includes(el.entry_number) ? el : undefined
        )
        .filter((el2) => el2 !== undefined);

      let newButtonState = true;

      if (allPokemonsWithNoFilter.length <= newCount) {
        newButtonState = false;
      }

      const newPokemons = {
        list: showPokemons,
        count: newCount,
      };

      return {
        ...state,
        pokemons: newPokemons,
        buttonOn: newButtonState,
      };
    }

    case actionTypes.changeContent: {
      const allPokemons = JSON.parse(localStorage.getItem("pokemonsInStorage"));
      const allPokemonsId = allPokemons.map((pokemon) => pokemon.entry_number);

      let typesPokemonsFiltered = findInterception(
        action.stateSelected.types[0],
        action.stateSelected.types.slice(1)
      );
      let colorsPokemonsFiltered = findInterception(
        action.stateSelected.colors[0],
        action.stateSelected.colors.slice(1)
      );
      let gendersPokemonsFiltered =
        action.stateSelected.genders.length === 0
          ? allPokemonsId
          : action.stateSelected.genders;
      let inputPokemonsFilteres =
        action.stateSelected.input.length === 0 &&
        action.stateSearchbox.input === ""
          ? allPokemonsId
          : action.stateSelected.input;

      if (typeof typesPokemonsFiltered == "undefined") {
        typesPokemonsFiltered = allPokemonsId;
      }
      if (typeof colorsPokemonsFiltered == "undefined") {
        colorsPokemonsFiltered = allPokemonsId;
      }

      const allPokemonsPreFilteredId = [
        typesPokemonsFiltered,
        colorsPokemonsFiltered,
        gendersPokemonsFiltered,
        inputPokemonsFilteres,
      ];

      const allPokemonsFilteredId = findInterception(
        allPokemonsPreFilteredId[0],
        allPokemonsPreFilteredId.slice(1),
        6
      );
      const allPokemonsWithNoFilter = findInterception(
        allPokemonsPreFilteredId[0],
        allPokemonsPreFilteredId.slice(1)
      );

      const showPokemons = allPokemons
        .map((el) =>
          allPokemonsFilteredId.includes(el.entry_number) ? el : undefined
        )
        .filter((el2) => el2 !== undefined);

      let newButtonState = true;

      if (allPokemonsWithNoFilter.length <= 6) {
        newButtonState = false;
      }

      return {
        ...state,
        pokemons: {
          list: showPokemons,
          count: 6,
        },
        buttonOn: newButtonState,
      };
    }
    default: {
      return state;
    }
  }
};
