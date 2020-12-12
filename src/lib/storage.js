export class storage {
    constructor() {
        this.lastId = 0
    }

    into(pokemonList) {
        localStorage.setItem("pokemonsInStorage", JSON.stringify(pokemonList.slice(this.lastId, this.lastId + 6)))

        this.lastId = this.lastId + 6
    }

    getData() {
        JSON.parse(localStorage.getItem("pokemonsInStorage")
    }

    update() {

    }

}