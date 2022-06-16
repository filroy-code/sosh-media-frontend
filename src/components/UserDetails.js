import React from "react";
import ReactDOM from "react-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function UserDetails(props) {
  const userInfo = React.useContext(UserContext);

  async function findUserDetails(event) {
    event.preventDefault();
    let response = await fetch(
      `http://localhost:3000/image/${userInfo.userID}`,
      {
        method: "POST",
        headers: {
          Authorization: props.authToken,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
  }

  return (
    <div className="userDetails">
      <form
        encType="multipart/form-data"
        action={`/image/${userInfo.userID}`}
        method="POST"
      >
        <label htmlFor="image">Upload a new avatar: </label>
        <input
          type="file"
          name="image"
          placeholder="upload an avatar"
          //   value=""
          required
        ></input>
        <Button onClick={findUserDetails}>Submit</Button>
      </form>
    </div>
  );
}
