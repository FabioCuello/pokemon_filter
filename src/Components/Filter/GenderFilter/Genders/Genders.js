import React from 'react'

export const Genders = (props) => {
    return (

        <div className="col s12">
            <p>
                <label>
                    <input className="with-gap" name="group1" type="radio" onChange={(event) => {
                        if (event.target.checked) {

                            props.handlerPick(props.url)
                        }

                    }} />
                    <span>{props.name}</span>
                </label>
            </p>

        </div>
    )
}