import React, { Fragment, useEffect, useState } from 'react'
import axios from "axios"
import { Cards } from "./Contents/Cards/Cards"

export const Content = (props) => {
    const [state, setState] = useState({
        pokemons: [],
        buttonOn: true
    })

    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokedex/national")
            .then(Response => {
                const pokemonList = Response.data.pokemon_entries
                localStorage.setItem("pokemonsInStorage", JSON.stringify(pokemonList))

                setState(prevState => ({
                    pokemons: pokemonList.slice(0, 6),
                    buttonOn: prevState.buttonOn
                }))
            })
    }, [])

    const handlerOnClickButton = () => {
        setState(prevState => {
            const prevStateId = prevState.pokemons[prevState.pokemons.length - 1].entry_number
            const allPokemons = JSON.parse(localStorage.getItem("pokemonsInStorage"))
            const newPokemons = allPokemons.slice(prevStateId, prevStateId + 20)
            const newState = [...prevState.pokemons, ...newPokemons]

            return ({
                pokemons: newState,
                buttonOn: newState.length === allPokemons.length ? false : true
            })
        })
    }

    return (
        <Fragment>
            <p>Choose a pokermon to get more information</p>
            <Cards pokemons={state.pokemons} />
            {state.buttonOn ? <button onClick={() => { handlerOnClickButton() }} >Load More</button> : null}
        </Fragment>
    )
}