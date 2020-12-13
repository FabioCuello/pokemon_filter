import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { findInterception } from './lib/repeatedValuesArrays';

const initialState = {
    pokemons: [],
    buttonOn: true,
    types: {
        types: [],
        showMore: false,
        selected: []
    },
    colors: {
        types: [],
        selected: []
    },
    genders: {
        types: [],
        selected: []
    },
    selected: {
        types: [],
        colors: [],
        genders: []
    }
}

const reducer = (state = initialState, action) => {
    if (action.type === "init") {
        return ({
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
            }

        })
    }


    if (action.type === "addOrDeleteTypesHandler") {
        const { types: { selected } } = state

        let newSelected

        if (action.action === "add") {
            newSelected = [...selected, action.url]
        }

        if (action.action === "remove") {
            newSelected = selected.filter(urlActive => !action.url.includes(urlActive))
        }

        const newTypes = {
            ...state.types,
            selected: newSelected
        }
        return ({
            ...state,
            types: newTypes
        })
    }


    if (action.type === "clickMoreOrLess") {
        const newStateFilter = {
            ...state.types,
            showMore: !state.types.showMore
        }

        if (!state.types.showMore) {
            newStateFilter.types = JSON.parse(localStorage.getItem("typesInStorage"))
        } else {
            newStateFilter.types = JSON.parse(localStorage.getItem("typesInStorage")).slice(0, 9)
        }
        return ({
            ...state,
            types: newStateFilter
        })
    }



    if (action.type === "addOrDeleteColorHandler") {
        const { colors: { selected } } = state
        let newSelected

        if (action.action === "add") {
            newSelected = [...selected, action.url]
        }
        if (action.action === "remove") {
            newSelected = selected.filter(urlActive => !action.url.includes(urlActive))
        }

        const newTypes = {
            ...state.colors,
            selected: newSelected
        }
        return ({
            ...state,
            colors: newTypes
        })
    }

    if (action.type === "gendersHandler") {
        let newSelected = action.url

        const newGender = {
            ...state.genders,
            selected: newSelected
        }

        return ({
            ...state,
            genders: newGender
        })
    }

    if (action.type === "setTypeSelect") {
        const newSelected = {
            ...state.selected,
            types: action.dataArray
        }

        return ({
            ...state,
            selected: newSelected
        })
    }

    if (action.type === "setColorSelect") {
        const newSelected = {
            ...state.selected,
            colors: action.dataArray
        }

        return ({
            ...state,
            selected: newSelected
        })
    }

    if (action.type === "setGenderSelect") {
        const newSelected = {
            ...state.selected,
            genders: action.dataArray
        }

        return ({
            ...state,
            selected: newSelected
        })
    }

    if (action.type === "initContent") {

        return ({
            ...state,
            pokemons: action.pokemonList.slice(0, 6),
            buttonOn: state.buttonOn
        })
    }

    if (action.type === "changeFilter") {

        const allPokemons = JSON.parse(localStorage.getItem("pokemonsInStorage"))
        const allPokemonsId = allPokemons.map(pokemon => pokemon.entry_number)

        let typesPokemonsFiltered = findInterception(state.selected.types[0], state.selected.types.slice(1))
        let colorsPokemonsFiltered = findInterception(state.selected.colors[0], state.selected.colors.slice(1))
        let gendersPokemonsFiltered = state.selected.genders.length === 0 ? allPokemonsId : (
            state.selected.genders
        )

        if (typeof (typesPokemonsFiltered) == "undefined") {
            typesPokemonsFiltered = allPokemonsId
        }
        if (typeof (colorsPokemonsFiltered) == "undefined") {
            colorsPokemonsFiltered = allPokemonsId
        }

        const allPokemonsPreFilteredId = [typesPokemonsFiltered, colorsPokemonsFiltered, gendersPokemonsFiltered]
        const allPokemonsFilteredId = findInterception(allPokemonsPreFilteredId[0], allPokemonsPreFilteredId.slice(1))

        const showPokemons = allPokemons
            .map(el => (allPokemonsFilteredId.includes(el.entry_number) ? el : undefined))
            .filter(el2 => el2 !== undefined)


        return ({
            ...state,
            pokemons: showPokemons
        })

    }

    if (action.type === "handlerMoreContent") {
        const prevStateId = state.pokemons[state.pokemons.length - 1].entry_number

        // TODO: find interception between allPokemons and Selected poquemos
        const allPokemons = JSON.parse(localStorage.getItem("pokemonsInStorage"))
        const newPokemons = allPokemons.slice(prevStateId, prevStateId + 20)
        const newState = [...state.pokemons, ...newPokemons]

        return ({
            ...state,
            pokemons: newState,
            buttonOn: newState.length === allPokemons.length ? false : true
        })

    }

    return state

}






export default createStore(reducer, composeWithDevTools())