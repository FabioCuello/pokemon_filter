import React, { Fragment, useEffect, useState } from 'react'
import { TypeFilters } from "./TypeFilter/TypeFilters"
import { ColorFilter } from "./ColorFilter/ColorFilter"
import { GenderFilter } from "./GenderFilter/GenderFilter"
import { findInterception } from '../../lib/repeatedValuesArrays'

import axios from "axios"

export const Filter = () => {
    const [stateFilters, setStateFilters] = useState({
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
    })

    useEffect(() => {
        const getFilterTypes = axios.get("https://pokeapi.co/api/v2/type")
        const getFilterColors = axios.get("https://pokeapi.co/api/v2/pokemon-color")
        const getFilterGenders = axios.get("https://pokeapi.co/api/v2/gender")

        Promise.all([getFilterTypes, getFilterColors, getFilterGenders])
            .then(response => {
                const [types, colors, genders] = response

                const newState = {
                    types: types.data.results,
                    colors: colors.data.results,
                    genders: genders.data.results
                }

                setStateFilters(prevState => ({
                    ...prevState,
                    types: {
                        ...prevState.types,
                        types: newState.types.slice(0, 9),
                        showMore: prevState.types.showMore,
                    },
                    colors: {
                        ...prevState.colors,
                        types: newState.colors,
                    },
                    genders: {
                        ...prevState.genders,
                        types: newState.genders,
                    },
                }))
            })
    }, [])

    const clickMoreOrLess = () => (
        setStateFilters(prevState => {

            const newStateFilter = {
                ...prevState.types,
                showMore: !prevState.types.showMore
            }

            if (!prevState.types.showMore) {
                newStateFilter.types = JSON.parse(localStorage.getItem("typesInStorage"))
            } else {
                newStateFilter.types = JSON.parse(localStorage.getItem("typesInStorage")).slice(0, 9)
            }

            return ({
                ...prevState,
                types: newStateFilter
            })
        })
    )

    const addOrDeleteTypesHandler = (url, action) => {
        setStateFilters(prevState => {
            const { types: { selected } } = prevState
            let newSelected

            if (action === "add") {
                newSelected = [...selected, url]
            }
            if (action === "remove") {
                newSelected = selected.filter(urlActive => !url.includes(urlActive))
            }

            const newTypes = {
                ...prevState.types,
                selected: newSelected
            }
            return ({
                ...prevState,
                types: newTypes
            })
        })
    }

    const addOrDeleteColorHandler = (url, action) => {
        setStateFilters(prevState => {
            const { colors: { selected } } = prevState
            let newSelected

            if (action === "add") {
                newSelected = [...selected, url]
            }
            if (action === "remove") {
                newSelected = selected.filter(urlActive => !url.includes(urlActive))
            }

            const newTypes = {
                ...prevState.colors,
                selected: newSelected
            }
            return ({
                ...prevState,
                colors: newTypes
            })
        })
    }

    const gedersHandler = (url) => {
        setStateFilters(prevState => {
            let newSelected = url

            const newGender = {
                ...prevState.genders,
                selected: newSelected
            }

            return ({
                ...prevState,
                genders: newGender
            })
        })
    }

    useEffect(() => {
        let activeFilter = stateFilters.types.selected

        Promise.all([...activeFilter.map(urlActive => axios(urlActive))])
            .then(results => {

                const dataArray = results.filter(data => !!data)
                    .map(result => result.data.pokemon)
                    .map(arrayItems => arrayItems.map(i => Number(i.pokemon.url.split("/")[6])))

                setStateFilters(prevState => {

                    const newSelected = {
                        ...prevState.selected,
                        types: dataArray
                    }

                    return ({
                        ...prevState,
                        selected: newSelected
                    })
                })
            })
    }, [stateFilters.types.selected])

    useEffect(() => {
        let activeFilter = stateFilters.colors.selected

        Promise.all([...activeFilter.map(urlActive => axios(urlActive))])
            .then(results => {

                const dataArray = results
                    .map(result => result.data.pokemon_species)
                    .map(arrayItems => arrayItems.map(i => Number(i.url.split("/")[6])))

                setStateFilters(prevState => {

                    const newSelected = {
                        ...prevState.selected,
                        colors: dataArray
                    }

                    return ({
                        ...prevState,
                        selected: newSelected
                    })
                })
            })
    }, [stateFilters.colors.selected])

    useEffect(() => {
        let activeFilter = stateFilters.genders.selected
        if (activeFilter.length === 0) return
        console.log(activeFilter)

        axios.get(activeFilter)
            .then(results => {
                const dataArray = results.data.pokemon_species_details
                    .map(arrayItems => arrayItems.pokemon_species)
                    .map(i => Number(i.url.split("/")[6]))

                setStateFilters(prevState => {

                    const newSelected = {
                        ...prevState.selected,
                        genders: dataArray
                    }

                    return ({
                        ...prevState,
                        selected: newSelected
                    })
                })
            })
    }, [stateFilters.genders.selected])


    useEffect(() => {
        const allPokemons = JSON.parse(localStorage.getItem("pokemonsInStorage")).map(pokemon => pokemon.entry_number)

        let typesPokemonsFiltered = findInterception(stateFilters.selected.types[0], stateFilters.selected.types.slice(1))
        let colorsPokemonsFiltered = findInterception(stateFilters.selected.colors[0], stateFilters.selected.colors.slice(1))
        let gendersPokemonsFiltered = stateFilters.selected.genders

        if (typeof (typesPokemonsFiltered) == "undefined") {
            typesPokemonsFiltered = allPokemons
        }
        if (typeof (colorsPokemonsFiltered) == "undefined") {
            colorsPokemonsFiltered = allPokemons
        }

        if (stateFilters.selected.genders.length === 0) {
            gendersPokemonsFiltered = allPokemons
        }

        const allPokemonsFiltered = [typesPokemonsFiltered, colorsPokemonsFiltered, gendersPokemonsFiltered]

        console.log(findInterception(allPokemonsFiltered[0], allPokemonsFiltered.slice(1)))

    }, [stateFilters.selected])

    return (
        <Fragment>
            <h5>Filter</h5>
            <div className="divider"></div>
            <TypeFilters
                filter={stateFilters.types.types}
                show={stateFilters.types.showMore}
                ClickShow={clickMoreOrLess}
                handlerClick={addOrDeleteTypesHandler}
            />
            <div className="divider"></div>
            <ColorFilter
                filter={stateFilters.colors.types}
                handlerClick={addOrDeleteColorHandler}
            />
            <div className="divider"></div>
            <GenderFilter
                filter={stateFilters.genders.types}
                handlerPick={gedersHandler}
            />
        </Fragment>
    )
}