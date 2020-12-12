import React, { Fragment } from 'react'

export const BoxFilter = (props) => {

    return (
        <Fragment>
            <div className="col s4">
                <p>
                    <label>
                        <input type="checkbox" onChange={(event) => {
                            if (event.target.checked) {
                                console.log("add")
                                return props.handlerClick(props.url, "add")
                            }

                            console.log("remove")
                            return props.handlerClick(props.url, "remove")
                        }} />
                        <span>{props.name}</span>
                    </label>
                </p>
            </div>
        </Fragment>
    )
}