import React from "react"

export const Paragraph = (props) => {

    let paragraprahDisplay

    if (props.pokemons.length === 0) {
        paragraprahDisplay = "No pokemons found"
    }
    else {
        paragraprahDisplay = "Choose a pokemon to get more information"
    }

    return (
        <p>{paragraprahDisplay} </p>
    )
}