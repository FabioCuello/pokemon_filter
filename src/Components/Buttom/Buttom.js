import React from "react";

export const Buttom = ({
  name,
  size = "",
  effect = "waves-effect",
  color = "waves-light",
  additional = "",
  click = "",
}) => {
  const CustomClassName = `${effect} ${color} btn${size} ${additional}`;

  return (
    <buttom onClick={click} className={CustomClassName}>
      {name}
    </buttom>
  );
};
