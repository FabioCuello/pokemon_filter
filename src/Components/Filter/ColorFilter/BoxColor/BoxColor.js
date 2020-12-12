import React from 'react'
import "./BoxColor.css"

export const BoxColor = (props) => {

    const style = {
        color: `${props.name}`
    }

    if (props.name === "white") {
        style.color = "black"
    }

    if (props.name === "yellow") {
        style.color = "black"
    }

    return (
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
                    <span style={style} >{props.name}</span>
                </label>
            </p>
        </div>
    )
}