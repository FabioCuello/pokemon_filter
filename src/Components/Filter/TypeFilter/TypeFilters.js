import React, { Fragment } from "react";
import { BoxFilter } from "./BoxFilter/BoxFilter";
import { capitalize } from "../../../lib/Capitalize";

export const TypeFilters = (props) => {
  console.log("Is rendering...");
  const boxFilter = props.filter.map((el, index) => (
    <BoxFilter
      name={capitalize(el.name)}
      key={index}
      handlerClick={props.handlerClick}
      url={el.url}
    />
  ));
  const pContent = props.show ? "Show less" : "Show more";

  return (
    <Fragment>
      <p>Type</p>
      <div className="row">{boxFilter}</div>
      <p
        style={{ cursor: "pointer" }}
        onClick={() => {
          props.ClickShow();
        }}
      >
        {pContent}
      </p>
    </Fragment>
  );
};

//offset-s4
