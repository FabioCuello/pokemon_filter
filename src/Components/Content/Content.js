import React, { Fragment, useEffect } from 'react'
import { connect } from "react-redux";
import axios from "axios"
import { Cards } from "./Contents/Cards/Cards"
import { Paragraph } from './Contents/Paragraph/Paragraph';

const Content = ({ props, initContent, handlerMoreContent, changeFilter }) => {
    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokedex/national")
            .then(Response => {
                const pokemonList = Response.data.pokemon_entries
                localStorage.setItem("pokemonsInStorage", JSON.stringify(pokemonList))

                initContent(pokemonList)
            })
    }, [])


    useEffect(() => {

        console.log()
        changeFilter()
    }, [props.selected])


    return (
        <Fragment>
            <Paragraph
                pokemons={props.pokemons.list}
            />
            <Cards pokemons={props.pokemons.list} />
            {props.buttonOn ? <button onClick={() => { handlerMoreContent() }} >Load More</button> : null}
        </Fragment>
    )
}
const mapStateToProps = props => ({
    props: props
})

const mapDispatchToProps = dispatch => ({
    initContent(pokemonList) {
        dispatch({
            type: "initContent",
            pokemonList
        })
    },
    handlerMoreContent() {
        dispatch({
            type: "handlerMoreContent",
        })
    },
    changeFilter() {
        dispatch({
            type: "changeFilter"
        })
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Content)