import React, { Fragment } from "react";

export const Types = (props) => (
  <Fragment>
    <div className="row">
      <div className="col s12">
        <h5>Types</h5>
      </div>
    </div>
    <div className="row">
      <div className="col s6">
        <p>{props.types}</p>
      </div>
      <div className="col s6"></div>
    </div>
  </Fragment>
);
