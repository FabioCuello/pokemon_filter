import React, { Fragment, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { TypeFilters } from "./TypeFilter/TypeFilters";
import { ColorFilter } from "./ColorFilter/ColorFilter";
import { GenderFilter } from "./GenderFilter/GenderFilter";
import * as actionTypes from "../../store/actions.js";
import axios from "axios";

const Filter = ({
  props,
  initUseEffect,
  clickMoreOrLess,
  addOrDeleteTypesHandler,
  addOrDeleteColorHandler,
  gendersHandler,
  setTypeSelect,
  setColorSelect,
  setGenderSelect,
}) => {
  const isFirstRun1 = useRef(true);
  const isFirstRun2 = useRef(true);
  const isFirstRun3 = useRef(true);

  useEffect(() => {
    const getFilterTypes = axios.get("https://pokeapi.co/api/v2/type");
    const getFilterColors = axios.get(
      "https://pokeapi.co/api/v2/pokemon-color"
    );
    const getFilterGenders = axios.get("https://pokeapi.co/api/v2/gender");

    Promise.all([getFilterTypes, getFilterColors, getFilterGenders]).then(
      (response) => {
        const [types, colors, genders] = response;

        const newState = {
          types: types.data.results,
          colors: colors.data.results,
          genders: genders.data.results,
        };
        initUseEffect(newState);
      }
    );
  }, []);

  useEffect(() => {
    if (isFirstRun1.current) {
      isFirstRun1.current = false;
      return;
    }

    let activeFilter = props.types.selected;

    Promise.all([...activeFilter.map((urlActive) => axios(urlActive))]).then(
      (results) => {
        const dataArray = results
          .filter((data) => !!data)
          .map((result) => result.data.pokemon)
          .map((arrayItems) =>
            arrayItems.map((i) => Number(i.pokemon.url.split("/")[6]))
          );

        setTypeSelect(dataArray);
      }
    );
  }, [props.types.selected, setTypeSelect]);

  useEffect(() => {
    if (isFirstRun2.current) {
      isFirstRun2.current = false;
      return;
    }
    let activeFilter = props.colors.selected;

    Promise.all([...activeFilter.map((urlActive) => axios(urlActive))]).then(
      (results) => {
        const dataArray = results
          .map((result) => result.data.pokemon_species)
          .map((arrayItems) =>
            arrayItems.map((i) => Number(i.url.split("/")[6]))
          );
        setColorSelect(dataArray);
      }
    );
  }, [props.colors.selected, setColorSelect]);

  useEffect(() => {
    if (isFirstRun3.current) {
      isFirstRun3.current = false;
      return;
    }
    let activeFilter = props.genders.selected;
    if (activeFilter.length === 0) return;

    if (activeFilter === "none") {
      return setGenderSelect([]);
    }

    axios.get(activeFilter).then((results) => {
      const dataArray = results.data.pokemon_species_details
        .map((arrayItems) => arrayItems.pokemon_species)
        .map((i) => Number(i.url.split("/")[6]));

      setGenderSelect(dataArray);
    });
  }, [props.genders.selected, setGenderSelect]);

  return (
    <Fragment>
      <h5>Filter</h5>
      <div className="divider"></div>
      <TypeFilters
        filter={props.types.types}
        show={props.types.showMore}
        ClickShow={clickMoreOrLess}
        handlerClick={addOrDeleteTypesHandler}
      />
      <div className="divider"></div>
      <ColorFilter
        filter={props.colors.types}
        handlerClick={addOrDeleteColorHandler}
      />
      <div className="divider"></div>
      <GenderFilter filter={props.genders.types} handlerPick={gendersHandler} />
    </Fragment>
  );
};

const mapStateToProps = (props) => ({
  props: props,
});

const mapDispatchToProps = (dispatch) => {
  return {
    initUseEffect: (newState) =>
      dispatch({ type: actionTypes.initUseEffect, newState }),
    clickMoreOrLess: () => dispatch({ type: actionTypes.clickMoreOrLess }),
    addOrDeleteTypesHandler: (url, action) =>
      dispatch({ type: actionTypes.addOrDeleteTypesHandler, url, action }),
    addOrDeleteColorHandler: (url, action) =>
      dispatch({ type: actionTypes.addOrDeleteColorHandler, url, action }),
    gendersHandler: (url) =>
      dispatch({ type: actionTypes.gendersHandler, url }),
    setTypeSelect: (dataArray) =>
      dispatch({ type: actionTypes.setTypeSelect, dataArray }),
    setColorSelect: (dataArray) =>
      dispatch({ type: actionTypes.setColorSelect, dataArray }),
    setGenderSelect: (dataArray) =>
      dispatch({ type: actionTypes.setGenderSelect, dataArray }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
