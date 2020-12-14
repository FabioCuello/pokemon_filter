import React, { Fragment, useEffect, useRef } from "react"
import { connect } from "react-redux"
import $ from "jquery"
import axios from "axios"

const Modal = ({ props, handlerDetailsPokemon }) => {
    const isFirstRun_2 = useRef(true)
    const isFirstRun_3 = useRef(true)


    useEffect(() => {
        if (isFirstRun_2.current) {
            isFirstRun_2.current = false
            return
        }

        const pokemonSpecies = `https://pokeapi.co/api/v2/pokemon-species/${props.modal.selectedId}`
        const pokemons = `https://pokeapi.co/api/v2/pokemon/${props.modal.selectedId}`

        Promise.all([axios.get(pokemonSpecies), axios.get(pokemons)])
            .then(response => {

                const { data: dataPokemonSpecies } = response[0]
                const { data: dataPokemon } = response[1]

                let idArray = dataPokemonSpecies.id.toString().split("")
                let digits = idArray.length
                for (digits; digits < 3; digits++) {
                    idArray.unshift("0")
                }
                let id = idArray.join("")

                const descriptionPokemon = {
                    name: dataPokemonSpecies.name,
                    id: id,
                    color: dataPokemonSpecies.color.name,
                    height: dataPokemon.height,
                    weight: dataPokemon.weight,
                    category: dataPokemonSpecies.egg_groups.map(element => element.name).join(", "),
                    habitat: dataPokemonSpecies.habitat.name,
                    types: dataPokemon.types.map(element => element.type.name),
                    description: dataPokemonSpecies.flavor_text_entries[0].flavor_text,
                }

                const gendersUrl1 = `https://pokeapi.co/api/v2/gender/1/`
                const gendersUrl2 = `https://pokeapi.co/api/v2/gender/2/`
                const gendersUrl3 = `https://pokeapi.co/api/v2/gender/3/`


                Promise.all([axios.get(gendersUrl1), axios.get(gendersUrl2), axios.get(gendersUrl3)])
                    .then(response => {
                        const { data: url1Response } = response[0]
                        const { data: url2Response } = response[1]
                        const { data: url3Response } = response[2]

                        const isFemale = url1Response.pokemon_species_details
                            .filter(element => element.pokemon_species.name === descriptionPokemon.name).length === 0 ? false : true
                        const isMale = url2Response.pokemon_species_details
                            .filter(element => element.pokemon_species.name === descriptionPokemon.name).length === 0 ? false : true
                        const isGenderless = url3Response.pokemon_species_details
                            .filter(element => element.pokemon_species.name === descriptionPokemon.name).length === 0 ? false : true

                        const gender = []

                        if (isFemale) {
                            gender.push("Female")
                        }
                        if (isMale) {
                            gender.push("Male")
                        }
                        if (isGenderless) {
                            gender.push("Genderless")
                        }

                        descriptionPokemon.gender = gender.join(", ")

                        handlerDetailsPokemon(descriptionPokemon)
                    })
            })

    }, [props.modal.selectedId])

    useEffect(() => {
        if (isFirstRun_3.current) {
            isFirstRun_3.current = false
            return
        }

        $("#trigerModal")[0].click()

    }, [props.modal.detail])

    return (
        <Fragment>

            <a id="trigerModal" className="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>

            <div id="modal1" className="modal">
                <div className="modal-content">
                    <div className="row">
                        <div className="col s6">
                            <div className="card-image">
                                <img style={{ maxWidth: "100%" }} src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${props.modal.detail.id}.png`} alt="none" />
                            </div>

                        </div>
                        <div className="col s6">
                            <div className="row">
                                <div className="col s4">
                                    <h5>{props.modal.detail.name}</h5>
                                </div>
                                <div className="col s2 offset-s4">
                                    <h3>{props.modal.detail.id} </h3>
                                </div>
                            </div>
                            <div className="row">
                                <p>{props.modal.detail.description}</p>
                            </div>
                            <div className="row">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Height</td>
                                            <td>{props.modal.detail.height} Kg </td>
                                        </tr>
                                        <tr>
                                            <td>Weight</td>
                                            <td>{props.modal.detail.weight} m</td>
                                        </tr>
                                        <tr>
                                            <td>Category</td>
                                            <td>{props.modal.detail.category}</td>
                                        </tr>
                                        <tr>
                                            <td>Gender</td>
                                            <td>{props.modal.detail.gender}</td>
                                        </tr>
                                        <tr>
                                            <td>Habitat</td>
                                            <td>{props.modal.detail.habitat}</td>
                                        </tr>
                                        <tr>
                                            <td>Color</td>
                                            <td>{props.modal.detail.color}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </div>

                    <div className="row">
                        EVOLUTION
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = props => ({
    props: props
})

const mapDispatchToProps = dispatch => ({
    handlerDetailsPokemon(descriptionPokemon) {
        dispatch({
            type: "handlerDetailsPokemon",
            descriptionPokemon
        })
    }

})


export default connect(mapStateToProps, mapDispatchToProps)(Modal)