import React from "react";

export const CustomImg = (props) => {
  const style = {
    maxWidth: props.maxWidth,
  };

  return <img style={style} src={props.src} alt="No_image_Found" />;
};

