import React, { useEffect } from "react";
import M from "materialize-css";

export const Modal = (props) => {
  useEffect(() => {
    const modal = document.querySelectorAll("#modal");
    M.Modal.init(modal);
    //if (props.showModal) {
    //const instance = M.Modal.getInstance(modal);
    //instance.open();
    //}
  }, []);

  return (
    <div id="modal" className="modal">
      <div className="modal-content">{props.children}</div>
      <div className="modal-footer">
        <button className="modal-close waves-effect waves-green btn-flat">
          {props.closeButtomName}
        </button>
      </div>
    </div>
  );
};
