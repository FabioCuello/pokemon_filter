import React from 'react'
import logo from "./Logo.png"

export const Logo = (props) => {

    return <img style={props.style} alt={"logo"} src={logo} />
}