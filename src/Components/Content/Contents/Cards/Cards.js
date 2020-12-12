import React from 'react'
import { capitalize } from '../../../../lib/Capitalize'
import { Card } from "./Card/Cards"

export const Cards = (props) => {

    const cards = props.pokemons.map(pokemon => (
        <Card
            id={pokemon.entry_number}
            key={pokemon.entry_number}
            name={capitalize(pokemon.pokemon_species.name)}
        />
    ))

    return (
        <div className="row">
            {cards}
        </div>
    )
}