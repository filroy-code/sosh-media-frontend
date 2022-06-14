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
      `http://localhost:3000/userDetails/${userInfo.username}`,
      {
        method: "GET",
        headers: {
          Authorization: props.authToken,
          "Content-Type": "application/json",
        },
      }
    );
    let json = await response.json();
    console.log(json);
  }

  return (
    <div className="userDetails">
      <Button onClick={findUserDetails}>Find User Details</Button>
      <form>
        <label htmlFor="avatarUpload">Upload a new avatar: </label>
        <input
          type="file"
          name="avatarUpload"
          placeholder="upload an avatar"
          //   value=""
          required
        ></input>
      </form>
    </div>
  );
}
