import React from "react";
import ReactDOM from "react-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import AvatarEditor from "react-avatar-editor";
import Slider from "@mui/material/Slider";
import DataURLtoFile from "../services/DataURLToFile";

export default function UserDetails(props) {
  const userInfo = React.useContext(UserContext);

  const fileRef = React.useRef();
  const croppedRef = React.useRef();

  //submits cropped image from Avatar Editor to backend to be saved in the cloud.
  async function sendImageData(event) {
    event.preventDefault();
    const image = new FormData();
    image.append(
      "image",
      DataURLtoFile(
        croppedRef.current.getImageScaledToCanvas().toDataURL(),
        `${fileRef.current.files[0].name}`
      )
    );
    let response = await fetch(
      `http://localhost:3000/image/${userInfo.userID}`,
      {
        method: "POST",
        body: image,
        headers: { Authorization: props.authToken },
      }
    );
  }

  const [fileAttached, setFileAttached] = React.useState(false);

  const [avatarZoom, setAvatarZoom] = React.useState(1);

  return (
    <div className="userDetails">
      <Link to="/">Go back to home feed.</Link>
      <form
        className="avatarUpload"
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
          onChange={() => setFileAttached(true)}
          placeholder="upload an avatar"
          required
        ></input>
        <div>
          {fileRef.current && (
            <div>
              <AvatarEditor
                image={fileAttached ? fileRef.current.files[0] : null}
                ref={croppedRef}
                width={250}
                height={250}
                border={50}
                borderRadius={5}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={avatarZoom}
                rotate={0}
              ></AvatarEditor>
              <Slider
                defaultValue={1}
                min={1}
                max={5}
                step={0.1}
                onChange={(event) => setAvatarZoom(event.target.value)}
              ></Slider>
            </div>
          )}
        </div>
        <br></br>
        <Button onClick={sendImageData}>Submit</Button>
      </form>
      <button onClick={() => console.log(fileRef.current.files[0].name)}>
        clickkk
      </button>
    </div>
  );
}
