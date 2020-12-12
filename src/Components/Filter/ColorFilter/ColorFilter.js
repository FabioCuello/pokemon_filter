import React, { Fragment } from 'react'
import { BoxColor } from "./BoxColor/BoxColor";

export const ColorFilter = (props) => {


    const boxColor = props.filter.map((el, index) => (
        <BoxColor
            handlerClick={props.handlerClick}
            name={el.name}
            url={el.url}
            key={index}
        />
    ))


    return (
        <Fragment>
            <p>Color</p>
            <div className="row">
                {boxColor}
            </div>
        </Fragment>
    )
}