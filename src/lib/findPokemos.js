import { findInterception } from "./repeatedValuesArrays"

export const findPokemons = (allpokemons, allpokemonsid, typespokemonsfiltered, colorspokemonsfiltered, genderspokemonsfiltered, numberShowed) => {
    const allPokemons = allpokemons
    const allPokemonsId = allpokemonsid
    let typesPokemonsFiltered = typespokemonsfiltered
    let colorsPokemonsFiltered = colorspokemonsfiltered
    let gendersPokemonsFiltered = genderspokemonsfiltered

    if (typeof (typesPokemonsFiltered) == "undefined") {
        typesPokemonsFiltered = allPokemonsId
    }
    if (typeof (colorsPokemonsFiltered) == "undefined") {
        colorsPokemonsFiltered = allPokemonsId
    }

    const allPokemonsPreFilteredId = [typesPokemonsFiltered, colorsPokemonsFiltered, gendersPokemonsFiltered]
    const allPokemonsFilteredId = findInterception(allPokemonsPreFilteredId[0], allPokemonsPreFilteredId.slice(1), numberShowed)

    const showPokemons = allPokemons
        .map(el => (allPokemonsFilteredId.includes(el.entry_number) ? el : undefined))
        .filter(el2 => el2 !== undefined)

    return (showPokemons)
}