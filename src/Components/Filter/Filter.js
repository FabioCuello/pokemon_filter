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
        },
        colors: {
            types: [],
        },
        genders: {
            types: [],
        },
        selected: {
            filters: []
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

                localStorage.setItem("typesInStorage", JSON.stringify(newState.types))

                setStateFilters(prevState => ({
                    ...prevState,
                    types: {
                        types: newState.types.slice(0, 9),
                        showMore: prevState.types.showMore,
                    },
                    colors: {
                        types: newState.colors,
                    },
                    genders: {
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

    const addOrDeleteFilterHandler = (url, action) => {
        setStateFilters(prevState => {
            const { selected: { filters } } = prevState
            let newFilters
            if (action === "add") {
                newFilters = [...filters, url]
            }
            if (action === "remove") {
                newFilters = filters.filter(urlActive => !url.includes(urlActive))
            }

            const newSelected = {
                filters: newFilters
            }

            return ({
                ...prevState,
                selected: newSelected
            })
        })
    }

    useEffect(() => {
        let activeFilter = stateFilters.selected.filters

        Promise.all([...activeFilter.map(urlActive => axios(urlActive))])
            .then(results => {

                const dataArray = results.filter(data => !!data)
                    .map(result => result.data.pokemon)
                    .map(arrayItems => arrayItems.map(i => Number(i.pokemon.url.split("/")[6])))

                // .map(arrayItems => arrayItems.map(i => Number(i.pokemon.url.split("/")[6])))
                //map(arrayItems => arrayItems.map(i => Number(i.url.split("/")[6])))

                const newShowedPokemons = findInterception(dataArray[0], dataArray.slice(1))
                console.log(newShowedPokemons)
            })
    }, [stateFilters.selected.filters])

    return (
        <Fragment>
            <h5>Filter</h5>
            <div className="divider"></div>
            <TypeFilters
                filter={stateFilters.types.types}
                show={stateFilters.types.showMore}
                ClickShow={clickMoreOrLess}
                handlerClick={addOrDeleteFilterHandler}
            />
            <div className="divider"></div>
            <ColorFilter
                filter={stateFilters.colors.types}
                handlerClick={addOrDeleteFilterHandler}
            />
            <div className="divider"></div>
            <GenderFilter filter={stateFilters.genders.types} />
        </Fragment>
    )
}