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
import getLoggedinUserData from "../services/getLoggedinUserData";
import ExtendedUserCard from "./ExtendedUserCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function UserDetails(props) {
  const userInfo = React.useContext(UserContext);
  const navigate = useNavigate();

  const fileRef = React.useRef();
  const croppedRef = React.useRef();

  const avatarStyle = {
    margin: "20px",
  };

  const buttonStyle = {
    margin: "5px",
    color: "rgb(0, 109, 119)",
    border: "1px solid rgb(0, 109, 119)",
  };

  const backButtonStyle = {
    height: "4rem",
    width: "3.5rem",
    margin: "20px",
    border: "1px solid rgb(0, 109, 119)",
    color: "rgb(0, 109, 119)",
    position: "absolute",
  };

  const sliderStyle = {
    color: "rgb(0, 109, 119)",
  };

  const filledButtonStyle = {
    backgroundColor: "rgb(0, 109, 119)",
    color: "white",
    border: "1px solid rgb(0, 109, 119)",
    margin: "5px",
  };

  // window size retrieval function, used to calculate Canvas size of uploaded avatar preview (becasue it only accepts px values.)
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  const [windowSize, setWindowSize] = React.useState(getWindowSize());

  React.useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

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
        headers: { Authorization: userInfo.authToken },
      }
    );
    if (response.status === 200) {
      let userData = await getLoggedinUserData(userInfo.authToken);
      props.setLoggedInUser((prev) => ({
        ...prev,
        avatar: userData._doc.avatar,
      }));
    }
  }

  async function removeAvatar() {
    let response = await fetch(
      `http://localhost:3000/users/${userInfo.userID}/details`,
      {
        method: "PUT",
        body: JSON.stringify({ noImage: true }),
        headers: {
          Authorization: userInfo.authToken,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      let userData = await getLoggedinUserData(userInfo.authToken);
      props.setLoggedInUser((prev) => ({
        ...prev,
        avatar: userData._doc.avatar,
      }));
    }
  }

  const [fileAttached, setFileAttached] = React.useState(false);

  const [avatarZoom, setAvatarZoom] = React.useState(1);

  return (
    <motion.div
      className="mainSection"
      initial={{ x: "-100vw" }}
      animate={{ x: "0vw", transition: { duration: 0.3 } }}
      exit={{ x: "-100vw", transition: { duration: 0.4 } }}
    >
      <div className="userDetailsContainer">
        <Button
          onClick={() =>
            navigate(`/users/${userInfo.username}`, { replace: true })
          }
          style={backButtonStyle}
        >
          <ArrowBackIcon></ArrowBackIcon>
        </Button>
        <div className="userDetails">
          {/* <ExtendedUserCard></ExtendedUserCard> */}
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
              <Button
                onClick={removeAvatar}
                style={filledButtonStyle}
                variant="contained"
              >
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
              {fileRef.current && (
                <div className="avatarPreview">
                  <AvatarEditor
                    image={fileAttached ? fileRef.current.files[0] : null}
                    ref={croppedRef}
                    backgroundColor="white"
                    width={windowSize.innerWidth / 4.5}
                    height={windowSize.innerWidth / 4.5}
                    border={50}
                    borderRadius={5}
                    color={[255, 255, 255, 0.6]} // RGBA
                    scale={avatarZoom}
                    rotate={0}
                  ></AvatarEditor>
                  New Avatar Zoom
                  <Slider
                    style={sliderStyle}
                    defaultValue={1}
                    min={1}
                    max={5}
                    step={0.1}
                    onChange={(event) => setAvatarZoom(event.target.value)}
                  ></Slider>
                  <Button
                    style={filledButtonStyle}
                    variant="contained"
                    onClick={sendImageData}
                  >
                    Submit
                  </Button>
                </div>
              )}
            </motion.form>
          )}
        </div>
      </div>
    </motion.div>
  );
}
