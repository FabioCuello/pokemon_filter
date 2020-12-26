export const formatId = (id) => {
  let idArray = id.toString().split("");
  let digits = idArray.length;

  for (digits; digits < 3; digits++) {
    idArray.unshift("0");
  }

  return idArray.join("");
};
