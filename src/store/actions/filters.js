import * as actionsTypes from "./actionsTypes";

export const setTypeSelect = (dataArray) => {
  return {
    type: actionsTypes.setTypeSelect,
    dataArray,
  };
};

export const setColorSelect = (dataArray) => {
  return {
    type: actionsTypes.setColorSelect,
    dataArray,
  };
};
export const setGenderSelect = (dataArray) => {
  return {
    type: actionsTypes.setGenderSelect,
    dataArray,
  };
};

export const changeInput = (input) => {
  return {
    type: actionsTypes.changeInput,
    input,
  };
};

export const filterInput = () => {
  return {
    type: actionsTypes.filterInput,
  };
};
