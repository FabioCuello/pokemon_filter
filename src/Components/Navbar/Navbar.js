import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Logo } from "./Logo/Logo"




const Navbar = ({ props, changeInput, filterInput }) => {

    const isFirstRun__1 = useRef(true)

    const style = {
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
        <div style={style} className="row">

            <div className="col s12 m12 l6 xl6">
                <div className="logo" >
                    <Logo />
                </div>
            </div>

            <div className=" col l3 xl3 m6 offset-m3">


                <div className="searchBox" >
                    <input placeholder="Filter" type="text" value={props.searchBox.input} onChange={changeInput} ></input>
                </div>
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