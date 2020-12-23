import * as actionTypes from "../actions.js";

const filtersInitialState = {
  types: {
    types: [],
    showMore: false,
    selected: [],
  },
  colors: {
    types: [],
    selected: [],
  },
  genders: {
    types: [],
    selected: [],
  },
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
    case actionTypes.initUseEffect: {
      return {
        ...state,
        types: {
          ...state.types,
          types: action.newState.types.slice(0, 9),
          showMore: state.types.showMore,
        },
        colors: {
          ...state.colors,
          types: action.newState.colors,
        },
        genders: {
          ...state.genders,
          types: action.newState.genders,
        },
      };
    }
    case actionTypes.clickMoreOrLess: {
      const newStateFilter = {
        ...state.types,
        showMore: !state.types.showMore,
      };

      if (!state.types.showMore) {
        newStateFilter.types = JSON.parse(
          localStorage.getItem("typesInStorage")
        );
      } else {
        newStateFilter.types = JSON.parse(
          localStorage.getItem("typesInStorage")
        ).slice(0, 9);
      }
      return {
        ...state,
        types: newStateFilter,
      };
    }

    case actionTypes.addOrDeleteTypesHandler: {
      const {
        types: { selected },
      } = state;

      let newSelected;

      if (action.action === "add") {
        newSelected = [...selected, action.url];
      }

      if (action.action === "remove") {
        newSelected = selected.filter(
          (urlActive) => !action.url.includes(urlActive)
        );
      }

      const newTypes = {
        ...state.types,
        selected: newSelected,
      };
      return {
        ...state,
        types: newTypes,
      };
    }

    case actionTypes.addOrDeleteColorHandler: {
      const {
        colors: { selected },
      } = state;
      let newSelected;

      if (action.action === "add") {
        newSelected = [...selected, action.url];
      }
      if (action.action === "remove") {
        newSelected = selected.filter(
          (urlActive) => !action.url.includes(urlActive)
        );
      }

      const newTypes = {
        ...state.colors,
        selected: newSelected,
      };
      return {
        ...state,
        colors: newTypes,
      };
    }

    case actionTypes.gendersHandler: {
      let newSelected = action.url;

      const newGender = {
        ...state.genders,
        selected: newSelected,
      };

      return {
        ...state,
        genders: newGender,
      };
    }

    case actionTypes.setTypeSelect: {
      const newSelected = {
        ...state.selected,
        types: action.dataArray,
      };

      return {
        ...state,
        selected: newSelected,
      };
    }

    case actionTypes.setColorSelect: {
      const newSelected = {
        ...state.selected,
        colors: action.dataArray,
      };

      return {
        ...state,
        selected: newSelected,
      };
    }

    case actionTypes.setGenderSelect: {
      const newSelected = {
        ...state.selected,
        genders: action.dataArray,
      };

      return {
        ...state,
        selected: newSelected,
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
