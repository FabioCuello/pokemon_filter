import React, { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Evolution } from "./Evolution/Evolution";
import { Description } from "./Description/Desciption";
import { connect } from "react-redux";
import { Modal } from "../Modal/Modal";

const PokemonModal = ({ storePokemonId }) => {
  const [pokemonDetails, setPokemonDetails] = useState({
    name: "",
    id: "1",
    color: "",
    height: "",
    weight: "",
    category: "",
    habitat: "",
    types: "",
    description: "",
    evolution: [],
    gender: "",
  });

  useEffect(() => {
    console.log("UseEffect");
    const pokemonSpecies = `https://pokeapi.co/api/v2/pokemon-species/${storePokemonId}`;
    const pokemons = `https://pokeapi.co/api/v2/pokemon/${storePokemonId}`;

    Promise.all([axios.get(pokemonSpecies), axios.get(pokemons)]).then(
      (response) => {
        const { data: dataPokemonSpecies } = response[0];
        const { data: dataPokemon } = response[1];

        let pokemonHabitat =
          dataPokemonSpecies.habitat == null
            ? "Not Found"
            : dataPokemonSpecies.habitat.name;

        const descriptionPokemon = {
          name: dataPokemonSpecies.name,
          id: dataPokemonSpecies.id,
          color: dataPokemonSpecies.color.name,
          height: dataPokemon.height,
          weight: dataPokemon.weight,
          category: dataPokemonSpecies.egg_groups
            .map((element) => element.name)
            .join(", "),
          habitat: pokemonHabitat,
          types: dataPokemon.types
            .map((element) => element.type.name)
            .join(", "),
          description: dataPokemonSpecies.flavor_text_entries[0].flavor_text,
        };

        const gendersUrl1 = `https://pokeapi.co/api/v2/gender/1/`;
        const gendersUrl2 = `https://pokeapi.co/api/v2/gender/2/`;
        const gendersUrl3 = `https://pokeapi.co/api/v2/gender/3/`;

        Promise.all([
          axios.get(gendersUrl1),
          axios.get(gendersUrl2),
          axios.get(gendersUrl3),
        ]).then((response) => {
          const { data: url1Response } = response[0];
          const { data: url2Response } = response[1];
          const { data: url3Response } = response[2];

          const isFemale =
            url1Response.pokemon_species_details.filter(
              (element) =>
                element.pokemon_species.name === descriptionPokemon.name
            ).length === 0
              ? false
              : true;
          const isMale =
            url2Response.pokemon_species_details.filter(
              (element) =>
                element.pokemon_species.name === descriptionPokemon.name
            ).length === 0
              ? false
              : true;
          const isGenderless =
            url3Response.pokemon_species_details.filter(
              (element) =>
                element.pokemon_species.name === descriptionPokemon.name
            ).length === 0
              ? false
              : true;

          const gender = [];

          if (isFemale) {
            gender.push("Female");
          }
          if (isMale) {
            gender.push("Male");
          }
          if (isGenderless) {
            gender.push("Genderless");
          }

          descriptionPokemon.gender = gender.join(", ");

          axios.get(dataPokemonSpecies.evolution_chain.url).then((response) => {
            const { data: dataEvolutionChain } = response;

            const pokemonEvolution = [];

            try {
              pokemonEvolution.push({
                name: dataEvolutionChain.chain.species.name,
                url: Number(dataEvolutionChain.chain.species.url.split("/")[6]),
              });
            } catch (error) {}

            try {
              pokemonEvolution.push({
                name: dataEvolutionChain.chain.evolves_to[0].species.name,
                url: Number(
                  dataEvolutionChain.chain.evolves_to[0].species.url.split(
                    "/"
                  )[6]
                ),
              });
            } catch (error) {}

            try {
              pokemonEvolution.push({
                name:
                  dataEvolutionChain.chain.evolves_to[0].evolves_to[0].species
                    .name,
                url: Number(
                  dataEvolutionChain.chain.evolves_to[0].evolves_to[0].species.url.split(
                    "/"
                  )[6]
                ),
              });
            } catch (error) {}

            descriptionPokemon.evolution = pokemonEvolution;
            setPokemonDetails({ ...descriptionPokemon });
          });
        });
      }
    );
  }, [storePokemonId]);

  return (
    <Fragment>
      {console.log("Rendering", storePokemonId, pokemonDetails)}
      <Modal showModal={true} modalId={"1"}>
        <Description
          id={pokemonDetails.id}
          pokemonName={pokemonDetails.name}
          pokemonDescription={pokemonDetails.description}
          height={pokemonDetails.height}
          weight={pokemonDetails.weight}
          category={pokemonDetails.category}
          gender={pokemonDetails.gender}
          habitat={pokemonDetails.habitat}
          color={pokemonDetails.color}
        />
        <hr />
        <Evolution pokemonEvolution={pokemonDetails.evolution} />
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  storePokemonId: state.modal.selectedPokemonId,
});

export default connect(mapStateToProps, null)(PokemonModal);
