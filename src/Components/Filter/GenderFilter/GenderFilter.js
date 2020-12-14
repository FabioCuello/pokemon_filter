import React, { Fragment } from 'react'
import { capitalize } from '../../../lib/Capitalize';
import { Genders } from "./Genders/Genders";


export const GenderFilter = (props) => {
    const genders = props.filter.map((el, index) => (
        <Genders
            handlerPick={props.handlerPick}
            name={capitalize(el.name)}
            key={index}
            url={el.url}
        />
    ))

    return (
        <Fragment>
            <p>Gender </p>
            <div className="row">
                <Genders
                    handlerPick={props.handlerPick}
                    name={"All"}
                    url={"none"}
                />
                {genders}
            </div>
        </Fragment>
    )
}