import React from "react";
import ReactDOM from "react-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function UserDetails(props) {
  const userInfo = React.useContext(UserContext);

  const [uploadedPhoto, setUploadedPhoto] = React.useState("");

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

  function updatePhoto(event) {
    setUploadedPhoto(event.target.value);
  }

  return (
    <div className="userDetails">
      <Link to="/">Go back to home feed.</Link>
      <form
        encType="multipart/form-data"
        action={`/image/${userInfo.userID}`}
        method="POST"
      >
        <label htmlFor="image">Upload a new avatar: </label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={updatePhoto}
          placeholder="upload an avatar"
          value={uploadedPhoto}
          required
        ></input>
        <Button onClick={findUserDetails}>Submit</Button>
      </form>
    </div>
  );
}
