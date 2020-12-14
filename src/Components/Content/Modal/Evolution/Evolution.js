import React, { Fragment } from "react"

export const Evolution = (props) => {

    const evolutionPokemon = props.pokemonEvolution.map(el => {
        let idArray = el.url.toString().split("")
        let digits = idArray.length

        for (digits; digits < 3; digits++) {
            idArray.unshift("0")
        }
        let id = idArray.join("")


        return (

            <div key={el.url} className="col s4">
                <div className="row">
                    <img style={{ maxWidth: "50%" }} src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`} alt="none" />
                </div>
                <div className="row" >
                    <p>{el.name} </p>
                </div>
            </div>
        )
    })

    return (
        <Fragment >
            <div className="row">
                <h5>Evolution</h5>
            </div>
            <div className="row">
                {evolutionPokemon}
            </div>
        </Fragment>
    )
}