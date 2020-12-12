import React from 'react'
import { Logo } from "./Logo/Logo"

export const Navbar = () => {
    const Style = {
        div: {
            position: "relative",
            margin: "1rem 5rem 2.5rem",
        },
        logo: {
            backgroundColor: "white",
            maxWidth: "5rem"
        },
        searchBox: {
            position: "absolute",
            right: "15rem",
            top: "50%",
            display: "inline-block"
        }

    }

    return (
        <div style={Style.div}>
            <Logo style={Style.logo} />

            <div style={Style.searchBox} >SearchBox</div>
        </div>
    )
}