import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { TypeFilters } from "./TypeFilter/TypeFilters"
import { ColorFilter } from "./ColorFilter/ColorFilter"
import { GenderFilter } from "./GenderFilter/GenderFilter"
import { findInterception } from '../../lib/repeatedValuesArrays'

import axios from "axios"

const Filter = ({ props, initUseEffect, clickMoreOrLess, addOrDeleteTypesHandler, addOrDeleteColorHandler, gendersHandler, setTypeSelect, setColorSelect, setGenderSelect }) => {
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
                initUseEffect(newState)
            })
    }, [])

    useEffect(() => {
        let activeFilter = props.types.selected

        Promise.all([...activeFilter.map(urlActive => axios(urlActive))])
            .then(results => {

                const dataArray = results.filter(data => !!data)
                    .map(result => result.data.pokemon)
                    .map(arrayItems => arrayItems.map(i => Number(i.pokemon.url.split("/")[6])))

                setTypeSelect(dataArray)
            })
    }, [props.types.selected, setTypeSelect])

    useEffect(() => {
        let activeFilter = props.colors.selected

        Promise.all([...activeFilter.map(urlActive => axios(urlActive))])
            .then(results => {

                const dataArray = results
                    .map(result => result.data.pokemon_species)
                    .map(arrayItems => arrayItems.map(i => Number(i.url.split("/")[6])))
                setColorSelect(dataArray)

            })
    }, [props.colors.selected, setColorSelect])

    useEffect(() => {
        let activeFilter = props.genders.selected
        if (activeFilter.length === 0) return
        console.log(activeFilter)

        axios.get(activeFilter)
            .then(results => {
                const dataArray = results.data.pokemon_species_details
                    .map(arrayItems => arrayItems.pokemon_species)
                    .map(i => Number(i.url.split("/")[6]))

                setGenderSelect(dataArray)
            })
    }, [props.genders.selected, setGenderSelect])

    return (
        <Fragment>
            <h5>Filter</h5>
            <div className="divider"></div>
            <TypeFilters
                filter={props.types.types}
                show={props.types.showMore}
                ClickShow={clickMoreOrLess}
                handlerClick={addOrDeleteTypesHandler}
            />
            <div className="divider"></div>
            <ColorFilter
                filter={props.colors.types}
                handlerClick={addOrDeleteColorHandler}
            />
            <div className="divider"></div>
            <GenderFilter
                filter={props.genders.types}
                handlerPick={gendersHandler}
            />
        </Fragment>
    )
}

const mapStateToProps = props => ({
    props: props
})

const mapDispatchToProps = dispatch => ({
    initUseEffect(newState) {
        dispatch({
            type: "init",
            newState
        })
    },
    clickMoreOrLess() {
        dispatch({
            type: "clickMoreOrLess"
        })
    },
    addOrDeleteTypesHandler(url, action) {
        dispatch({
            type: "addOrDeleteTypesHandler",
            url,
            action
        })
    },
    addOrDeleteColorHandler(url, action) {
        dispatch({
            type: "addOrDeleteColorHandler",
            url,
            action
        })
    },
    gendersHandler(url) {
        dispatch({
            type: "gendersHandler",
            url,
        })
    },

    setTypeSelect(dataArray) {
        dispatch({
            type: "setTypeSelect",
            dataArray
        })
    },
    setColorSelect(dataArray) {
        dispatch({
            type: "setColorSelect",
            dataArray
        })
    },

    setGenderSelect(dataArray) {
        dispatch({
            type: "setGenderSelect",
            dataArray
        })
    }

})


export default connect(mapStateToProps, mapDispatchToProps)(Filter)
