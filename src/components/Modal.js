import React from "react";
import ReactDOM from "react-dom";

function Modal({ open, children, closeModal }) {
  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div className="backdrop" onClick={closeModal}>
        <div className="modal">{children}</div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
