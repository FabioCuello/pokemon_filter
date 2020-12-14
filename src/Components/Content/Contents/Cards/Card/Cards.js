import React from 'react'
import "./Cards.css"

export const Card = (props) => {

    let idArray = props.id.toString().split("")
    let digits = idArray.length

    for (digits; digits < 3; digits++) {
        idArray.unshift("0")
    }
    let id = idArray.join("")


    return (
        <div onClick={() => { props.click(props.id) }} className="card col s3 s">

            <div className="card-image">
                <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`} alt="none" />
            </div>
            <div className="card-content">
                <p>{props.name} </p>
            </div>
        </div>
    )
}