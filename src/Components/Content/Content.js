import React, { Fragment, useEffect, useReducer, useRef } from 'react'
import { connect } from "react-redux";
import axios from "axios"
import { Cards } from "./Contents/Cards/Cards"
import { Paragraph } from './Contents/Paragraph/Paragraph';
import 'materialize-css';
import Modal from './Modal/ModalContent';



const Content = ({ props, initContent, handlerMoreContent, changeFilter, handlerClickPokemon, updatePokemonsModals }) => {

    const isFirstRun_1 = useRef(true)



    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokedex/national")
            .then(Response => {
                const pokemonList = Response.data.pokemon_entries
                localStorage.setItem("pokemonsInStorage", JSON.stringify(pokemonList))

                initContent(pokemonList)
            })
    }, [])


    useEffect(() => {
        if (isFirstRun_1.current) {
            isFirstRun_1.current = false
            return
        }

        changeFilter()
    }, [props.selected])


    return (
        <Fragment>
            <Paragraph
                pokemons={props.pokemons.list}
            />
            <Modal />

            <Cards pokemons={props.pokemons.list} click={updatePokemonsModals} />

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
    ,
    updatePokemonsModals(id) {
        dispatch({
            type: "updatePokemonsModals",
            id

        })
    }

})


export default connect(mapStateToProps, mapDispatchToProps)(Content)