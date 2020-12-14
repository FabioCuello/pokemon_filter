import React, { Fragment, useEffect, useRef } from "react"
import { connect } from "react-redux"
import $ from "jquery"

const Modal = ({ props }) => {
    const isFirstRun_2 = useRef(true)


    useEffect(() => {
        if (isFirstRun_2.current) {
            isFirstRun_2.current = false
            return
        }

        $("#trigerModal")[0].click()

    }, [props.modalInfo])




    return (
        <Fragment>

            <a id="trigerModal" className="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>

            <div id="modal1" className="modal">
                <div className="modal-content">
                    <div className="row">
                        <div className="col s6">PIC</div>
                        <div className="col s6"> DATA</div>

                    </div>

                    <div className="row">
                        EVOLUTION
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = props => ({
    props: props
})

const mapDispatchToProps = dispatch => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(Modal)