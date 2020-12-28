import React, { Fragment, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { TypeFilters } from "./TypeFilter/TypeFilters";
import { ColorFilter } from "./ColorFilter/ColorFilter";
import { GenderFilter } from "./GenderFilter/GenderFilter";
import {
  setTypeSelect,
  setColorSelect,
  setGenderSelect,
} from "../../store/actions/index";
import axios from "axios";

const Filter = ({ setTypeSelect, setColorSelect, setGenderSelect }) => {
  const isFirstRun1 = useRef(true);
  const isFirstRun2 = useRef(true);
  const isFirstRun3 = useRef(true);

  const [typesState, setTypesState] = useState({
    types: [],
    showMore: false,
    selected: [],
  });
  const [colorsState, setColorsState] = useState({
    types: [],
    selected: [],
  });
  const [gendersState, setGendersState] = useState({
    types: [],
    selected: [],
  });

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

        localStorage.setItem("typesInStorage", JSON.stringify(newState.types));

        ReactDOM.unstable_batchedUpdates(() => {
          setTypesState((prevState) => ({
            ...prevState,
            types: newState.types.slice(0, 9),
          }));
          setColorsState((prevState) => ({
            ...prevState,
            types: newState.colors,
          }));
          setGendersState((prevState) => ({
            ...prevState,
            types: newState.genders,
          }));
        });
      }
    );
  }, []);

  useEffect(() => {
    if (isFirstRun1.current) {
      isFirstRun1.current = false;
      return;
    }

    const { selected: activeFilter } = typesState;

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
  }, [typesState.selected]);

  useEffect(() => {
    if (isFirstRun2.current) {
      isFirstRun2.current = false;
      return;
    }

    const { selected: activeFilter } = colorsState;

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
  }, [colorsState.selected]);

  useEffect(() => {
    if (isFirstRun3.current) {
      isFirstRun3.current = false;
      return;
    }

    const activeFilter = gendersState.selected;

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
  }, [gendersState.selected]);

  const addOrDeleteTypesHandler = (url, action) => {
    setTypesState((prevState) => {
      const { selected } = prevState;
      let newSelected;

      if (action === "add") {
        newSelected = [...selected, url];
      }

      if (action === "remove") {
        newSelected = selected.filter((urlActive) => !url.includes(urlActive));
      }
      return {
        ...prevState,
        selected: newSelected,
      };
    });
  };

  const clickMoreOrLessHandler = () => {
    setTypesState((prevState) => {
      const newStateFilter = {
        ...prevState,
        showMore: !prevState.showMore,
      };

      if (newStateFilter.showMore) {
        newStateFilter.types = JSON.parse(
          localStorage.getItem("typesInStorage")
        );
      } else {
        newStateFilter.types = JSON.parse(
          localStorage.getItem("typesInStorage")
        ).slice(0, 9);
      }
      return {
        ...newStateFilter,
      };
    });
  };

  const addOrDeleteColorHandler = (url, action) => {
    setColorsState((prevState) => {
      const { selected } = prevState;
      let newSelected;

      if (action === "add") {
        newSelected = [...selected, url];
      }
      if (action === "remove") {
        newSelected = selected.filter((urlActive) => !url.includes(urlActive));
      }

      return {
        ...prevState,
        selected: newSelected,
      };
    });
  };

  const gendersHandler = (url) => {
    setGendersState((prevState) => {
      let newSelected = url;

      return {
        ...prevState,
        selected: newSelected,
      };
    });
  };

  return (
    <Fragment>
      {console.log("Rendering Filter")}
      <h5>Filter</h5>
      <div className="divider"></div>
      <TypeFilters
        filter={typesState.types}
        show={typesState.showMore}
        ClickShow={clickMoreOrLessHandler}
        handlerClick={addOrDeleteTypesHandler}
      />
      <div className="divider"></div>
      <ColorFilter
        filter={colorsState.types}
        handlerClick={addOrDeleteColorHandler}
      />
      <div className="divider"></div>
      <GenderFilter filter={gendersState.types} handlerPick={gendersHandler} />
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTypeSelect: (dataArray) => dispatch(setTypeSelect(dataArray)),
    setColorSelect: (dataArray) => dispatch(setColorSelect(dataArray)),
    setGenderSelect: (dataArray) => dispatch(setGenderSelect(dataArray)),
  };
};

export default connect(null, mapDispatchToProps)(Filter);
