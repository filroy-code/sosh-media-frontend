import React from "react";
import ReactDOM from "react-dom";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import AvatarEditor from "react-avatar-editor";
import Slider from "@mui/material/Slider";
import DataURLtoFile from "../services/DataURLToFile";
import { stringAvatar, stringToColor } from "../services/AvatarColor";
import { motion } from "framer-motion";

export default function UserDetails(props) {
  const userInfo = React.useContext(UserContext);

  const fileRef = React.useRef();
  const croppedRef = React.useRef();

  const avatarStyle = {
    margin: "20px",
  };

  const buttonStyle = {
    margin: "5px",
  };

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
      `http://localhost:3000/users/${userInfo.userID}/details`,
      {
        method: "PUT",
        body: image,
        headers: { Authorization: props.authToken },
      }
    );
    props.getUserData();
  }

  const [fileAttached, setFileAttached] = React.useState(false);

  const [avatarZoom, setAvatarZoom] = React.useState(1);

  return (
    <motion.div
      className="userDetails"
      initial={{ x: "-100vw" }}
      animate={{ x: "0vw", transition: { duration: 0.8 } }}
      exit={{ x: "-100vw", transition: { duration: 0.4 } }}
    >
      <div className="userDetailsUpper">
        <Avatar
          style={avatarStyle}
          {...stringAvatar(`${userInfo.username}`)}
          src={userInfo.avatar}
          alt={`${userInfo.username}'s Avatar`}
          variant="rounded"
          sx={{
            width: "10rem",
            height: "10rem",
            bgcolor: stringToColor(userInfo.username),
          }}
        >
          {userInfo.username && userInfo.username[0].toUpperCase()}
        </Avatar>
        <div className="userDetailButtonContainer">
          <Button style={buttonStyle} variant="outlined" component="label">
            Upload New Avatar
            <input
              type="file"
              name="image"
              id="image"
              ref={fileRef}
              onChange={() => {
                setFileAttached(true);
                setAvatarZoom((prev) => (prev === 1 ? prev + 0.1 : 1));
              }}
              placeholder="upload an avatar"
              required
              hidden
            />
          </Button>
          <Button style={buttonStyle} variant="contained">
            Remove Your Avatar
          </Button>
        </div>
      </div>
      <hr></hr>
      {fileAttached && (
        <motion.form
          className="userDetailsLower"
          encType="multipart/form-data"
          action={`/image/${userInfo.userID}`}
          method="POST"
          initial={{ y: "100vh" }}
          animate={{ y: "0vh", transition: { duration: 0.8 } }}
          exit={{ y: "100vh", transition: { duration: 0.4 } }}
        >
          {/* <input
          type="file"
          name="image"
          id="image"
          ref={fileRef}
          onChange={() => setFileAttached(true)}
          placeholder="upload an avatar"
          required
        ></input> */}
          {fileRef.current && (
            <div className="avatarPreview">
              <AvatarEditor
                image={fileAttached ? fileRef.current.files[0] : null}
                ref={croppedRef}
                backgroundColor="white"
                width={250}
                height={250}
                border={50}
                borderRadius={5}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={avatarZoom}
                rotate={0}
              ></AvatarEditor>
              New Avatar Zoom
              <Slider
                defaultValue={1}
                min={1}
                max={5}
                step={0.1}
                onChange={(event) => setAvatarZoom(event.target.value)}
              ></Slider>
              <Button
                style={buttonStyle}
                variant="contained"
                onClick={sendImageData}
              >
                Submit
              </Button>
            </div>
          )}
        </motion.form>
      )}
    </motion.div>
  );
}
