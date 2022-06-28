import React from "react";
import ReactDOM from "react-dom";
import { UserContext } from "./UserContext";
import { Backdrop } from "@mui/material";

function Modal({ open, children }) {
  const userInfo = React.useContext(UserContext);

  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div className="backdrop">
        <div className="modal">{children}</div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
