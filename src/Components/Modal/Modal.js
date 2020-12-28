import React, { useEffect, useRef } from "react";
import { Buttom } from "../Buttom/Buttom";
import M from "materialize-css";

export const Modal = (props) => {
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    let instance = M.Modal.getInstance(
      document.querySelector(`#${props.modalId}`)
    );
    instance.open();
  }, [props]);

  return (
    <div id={props.modalId} className="modal">
      <div className="modal-content">{props.children}</div>
      <div className="modal-footer">
        <Buttom name={props.buttomName} additional={"modal-close"} />
      </div>
    </div>
  );
};
