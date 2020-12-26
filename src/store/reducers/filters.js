import * as actionTypes from "../actions/actionsTypes";

const filtersInitialState = {
  searchBox: {
    input: "",
  },
  selected: {
    types: [],
    colors: [],
    genders: [],
    input: [],
  },
};

export const filtersReducer = (state = filtersInitialState, action) => {
  switch (action.type) {
    case actionTypes.setTypeSelect: {
      return {
        ...state,
        selected: {
          ...state.selected,
          types: action.dataArray,
        },
      };
    }
    case actionTypes.setColorSelect: {
      return {
        ...state,
        selected: {
          ...state.selected,
          colors: action.dataArray,
        },
      };
    }

    case actionTypes.setGenderSelect: {
      return {
        ...state,
        selected: {
          ...state.selected,
          genders: action.dataArray,
        },
      };
    }
    case actionTypes.changeInput: {
      return {
        ...state,
        searchBox: {
          ...state.searchBox,
          input: action.input.target.value,
        },
      };
    }

    case actionTypes.filterInput: {
      let input = state.searchBox.input;
      const allPokemons = JSON.parse(localStorage.getItem("pokemonsInStorage"));

      if (!!Number(input)) {
        const newSelected = {
          ...state.selected,
          input: [Number(input)],
        };

        return {
          ...state,
          selected: newSelected,
        };
      }

      const inputIsCombine = input.split("").reduce((acc, el) => {
        return (acc = !!Number(el) || acc);
      }, false);

      if (inputIsCombine) {
        const newSelected = {
          ...state.selected,
          input: [-1],
        };

        return {
          ...state,
          selected: newSelected,
        };
      }

      input = input
        .split("")
        .map((letter) => letter.toLowerCase())
        .join("");

      const allPokemonsName = allPokemons.map(
        (pokemons) => pokemons.pokemon_species.name
      );

      const pokemonsFilteredName = allPokemonsName.filter((name) =>
        name.includes(input)
      );
      const pokemonsFilteredId = allPokemons
        .map((pokemons) =>
          pokemonsFilteredName.includes(pokemons.pokemon_species.name)
            ? pokemons
            : undefined
        )
        .filter((el2) => el2 !== undefined)
        .map((el3) => el3.entry_number);

      const newSelected = {
        ...state.selected,
        input: pokemonsFilteredId,
      };

      return {
        ...state,
        selected: newSelected,
      };
    }
    default: {
      return state;
    }
  }
};
