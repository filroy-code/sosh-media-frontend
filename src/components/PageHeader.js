import React from "react";
import Button from "@mui/material/Button";
import { UserContext } from "./UserContext";

export default function PageHeader(props) {
  const userInfo = React.useContext(UserContext);

  return (
    <div className="pageHeader">
      <h1>Sosh</h1>
      <p className="userDisplay">
        Logged in as {userInfo.username}{" "}
        <button onClick={props.logout}>Logout</button>
      </p>
    </div>
  );
}
