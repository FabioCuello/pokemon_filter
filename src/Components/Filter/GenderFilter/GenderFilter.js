import React, { Fragment } from 'react'
import { capitalize } from '../../../lib/Capitalize';
import { Genders } from "./Genders/Genders";


export const GenderFilter = (props) => {
    const genders = props.filter.map((el, index) => (
        <Genders
            name={capitalize(el.name)}
            key={index}
        />
    ))

    return (
        <Fragment>
            <p>Gender: </p>
            <div className="row">
                {genders}
            </div>
        </Fragment>
    )
}