import React from "react"

export const Img = (props) => {

    const style = {
        maxWidth: props.maxWidth
    }

    return (
        <img style={style} src={props.src} alt="No_image_Found" />
    )
}