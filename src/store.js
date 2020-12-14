import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { findInterception } from './lib/repeatedValuesArrays';

const initialState = {
    pokemons: {
        list: [],
        count: 6
    },
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
    searchBox: {
        input: "",
    }
    ,
    selected: {
        types: [],
        colors: [],
        genders: [],
        input: []
    },
    modal: {
        selectedId: 0,
        detail: {
            name: "",
            id: 0,
            color: "",
            height: "",
            weight: "",
            category: "",
            habitat: "",
            types: "",
            description: "",
            evolution: [],
            gender: ""
        }
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
            pokemons: {
                list: action.pokemonList.slice(0, 6),
                count: 6
            },
            buttonOn: state.buttonOn
        })
    }

    // TODO import a function to do all this logic

    if (action.type === "changeFilter") {

        const allPokemons = JSON.parse(localStorage.getItem("pokemonsInStorage"))
        const allPokemonsId = allPokemons.map(pokemon => pokemon.entry_number)

        let typesPokemonsFiltered = findInterception(state.selected.types[0], state.selected.types.slice(1))
        let colorsPokemonsFiltered = findInterception(state.selected.colors[0], state.selected.colors.slice(1))
        let gendersPokemonsFiltered = state.selected.genders.length === 0 ? allPokemonsId : (
            state.selected.genders
        )
        let inputPokemonsFilteres = state.selected.input.length === 0 && state.searchBox.length === 0 ? allPokemonsId : (
            state.selected.input
        )

        if (typeof (typesPokemonsFiltered) == "undefined") {
            typesPokemonsFiltered = allPokemonsId
        }
        if (typeof (colorsPokemonsFiltered) == "undefined") {
            colorsPokemonsFiltered = allPokemonsId
        }

        const allPokemonsPreFilteredId = [typesPokemonsFiltered, colorsPokemonsFiltered, gendersPokemonsFiltered, inputPokemonsFilteres]

        const allPokemonsFilteredId = findInterception(allPokemonsPreFilteredId[0], allPokemonsPreFilteredId.slice(1), 6)
        const allPokemonsWithNoFilter = findInterception(allPokemonsPreFilteredId[0], allPokemonsPreFilteredId.slice(1))

        const showPokemons = allPokemons
            .map(el => (allPokemonsFilteredId.includes(el.entry_number) ? el : undefined))
            .filter(el2 => el2 !== undefined)

        let newButtonState = true

        if (allPokemonsWithNoFilter.length <= 6) {
            newButtonState = false
        }

        return ({
            ...state,
            pokemons: {
                list: showPokemons,
                count: 6
            },
            buttonOn: newButtonState
        })

    }

    // TODO import a function to do all this logic

    if (action.type === "handlerMoreContent") {
        const newCount = state.pokemons.count + 6

        const allPokemons = JSON.parse(localStorage.getItem("pokemonsInStorage"))
        const allPokemonsId = allPokemons.map(pokemon => pokemon.entry_number)

        let typesPokemonsFiltered = findInterception(state.selected.types[0], state.selected.types.slice(1))
        let colorsPokemonsFiltered = findInterception(state.selected.colors[0], state.selected.colors.slice(1))
        let gendersPokemonsFiltered = state.selected.genders.length === 0 ? allPokemonsId : (
            state.selected.genders
        )
        let inputPokemonsFilteres = state.selected.input.length === 0 ? allPokemonsId : (
            state.selected.input
        )

        if (typeof (typesPokemonsFiltered) == "undefined") {
            typesPokemonsFiltered = allPokemonsId
        }
        if (typeof (colorsPokemonsFiltered) == "undefined") {
            colorsPokemonsFiltered = allPokemonsId
        }

        const allPokemonsPreFilteredId = [typesPokemonsFiltered, colorsPokemonsFiltered, gendersPokemonsFiltered, inputPokemonsFilteres]
        const allPokemonsFilteredId = findInterception(allPokemonsPreFilteredId[0], allPokemonsPreFilteredId.slice(1), newCount)


        const allPokemonsWithNoFilter = findInterception(allPokemonsPreFilteredId[0], allPokemonsPreFilteredId.slice(1))

        const showPokemons = allPokemons
            .map(el => (allPokemonsFilteredId.includes(el.entry_number) ? el : undefined))
            .filter(el2 => el2 !== undefined)


        let newButtonState = true

        if (allPokemonsWithNoFilter.length <= newCount) {
            newButtonState = false
        }

        const newPokemons = {
            list: showPokemons,
            count: newCount
        }

        return ({
            ...state,
            pokemons: newPokemons,
            buttonOn: newButtonState
        })

    }

    if (action.type === "changeInput") {

        return ({
            ...state,
            searchBox: {
                ...state.searchBox,
                input: action.input.target.value
            }
        })
    }

    if (action.type === "filterInput") {
        let input = state.searchBox.input
        const allPokemons = JSON.parse(localStorage.getItem("pokemonsInStorage"))

        if (!!Number(input)) {

            const newSelected = {
                ...state.selected,
                input: [Number(input)]
            }

            return ({
                ...state,
                selected: newSelected
            })

        }

        const inputIsCombine = input.split("")
            .reduce((acc, el) => {
                return acc = !!Number(el) || acc
            }, false)

        if (inputIsCombine) {
            const newSelected = {
                ...state.selected,
                input: [-1]
            }

            return ({
                ...state,
                selected: newSelected
            })
        }


        input = input.split("").map(letter => letter.toLowerCase()).join("")

        const allPokemonsName = allPokemons.map(pokemons => pokemons.pokemon_species.name)

        const pokemonsFilteredName = allPokemonsName.filter(name => name.includes(input))
        const pokemonsFilteredId = allPokemons
            .map(pokemons => pokemonsFilteredName.includes(pokemons.pokemon_species.name) ? pokemons : undefined)
            .filter(el2 => el2 !== undefined)
            .map(el3 => el3.entry_number)


        const newSelected = {
            ...state.selected,
            input: pokemonsFilteredId
        }

        return ({
            ...state,
            selected: newSelected
        })
    }

    if (action.type === "handlerPickPokemon") {
        const newmodal = action.id

        return ({
            ...state,
            modal: {
                ...state.modal,
                selectedId: newmodal
            }
        })
    }

    if (action.type === "handlerDetailsPokemon") {
        const newDescriptionPokemon = action.descriptionPokemon


        return ({
            ...state,
            modal: {
                ...state.modal,
                detail: newDescriptionPokemon
            }
        })


    }


    return state

}
export default createStore(reducer, composeWithDevTools())