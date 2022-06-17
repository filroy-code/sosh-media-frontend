import React from "react";
import ReactDOM from "react-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function UserDetails(props) {
  const userInfo = React.useContext(UserContext);

  const fileRef = React.useRef();

  async function sendImageData(event) {
    event.preventDefault();
    const image = new FormData();
    image.append("image", fileRef.current.files[0]);
    let response = await fetch(
      `http://localhost:3000/image/${userInfo.userID}`,
      {
        method: "POST",
        body: image,
      }
    );
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
          ref={fileRef}
          placeholder="upload an avatar"
          required
        ></input>
        <Button onClick={sendImageData}>Submit</Button>
      </form>
    </div>
  );
}
