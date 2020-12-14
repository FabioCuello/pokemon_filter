import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Logo } from "./Logo/Logo"
import "./Navbar.css"



const Navbar = ({ props, changeInput, filterInput }) => {

    const isFirstRun__1 = useRef(true)

    const style = {
        position: "relative",
        margin: "1rem 5rem 2.5rem"
    }


    useEffect(() => {
        if (isFirstRun__1.current) {
            isFirstRun__1.current = false
            return
        }
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
                <i className="material-icons">search</i>
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

})


export default connect(mapStateToProps, mapDispatchToProps)(Navbar)