import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Logo } from "./Logo/Logo"
import "./Navbar.css"



const Navbar = ({ props, changeInput, filterInput, changeFilter }) => {

    const style = {
        position: "relative",
        margin: "1rem 5rem 2.5rem"
    }


    useEffect(() => {
        const timer = setTimeout(() => {


            filterInput()
        }, 1000)
        return () => {
            clearTimeout(timer)

        }
    }, [props.searchBox.input])



    return (
        <div style={style}>
            <div className="logo" >
                <Logo />
            </div>

            <div className="searchBox" >
                <input type="text" value={props.searchBox.input} onChange={changeInput} ></input>
            </div>
        </div>
    )
}

const mapStateToProps = props => ({
    props: props
})

const mapDispatchToProps = dispatch => ({
    changeInput(input) {
        dispatch({
            type: "changeInput",
            input
        })
    },

    filterInput() {
        dispatch({
            type: "filterInput"
        })
    },

    changeFilter() {
        dispatch({
            type: "changeFilter"
        })
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Navbar)