import React from "react";
import Button from "@mui/material/Button";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export default function PageHeader(props) {
  const userInfo = React.useContext(UserContext);
  let navigate = useNavigate();

  return (
    <div className="pageHeader">
      <h1
        className="soshTitle"
        onClick={() => navigate("/", { replace: true })}
      >
        Sosh
      </h1>
    </div>
  );
}
