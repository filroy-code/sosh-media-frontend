import React from "react";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { stringAvatar, stringToColor } from "../services/AvatarColor";
import { motion } from "framer-motion";
import getOtherUserData from "../services/getOtherUserData";
import getLoggedinUserData from "../services/getLoggedinUserData";
import { Backdrop } from "@mui/material";
import Modal from "./Modal";
import ModalUserList from "./ModalUserList";

function ExtendedUserCard(props) {
  const userInfo = React.useContext(UserContext);
  let navigate = useNavigate();

  const settingsButtonStyle = {
    height: "4rem",
    width: "3.5rem",
    margin: "20px",
    border: "1px solid rgb(0, 109, 119)",
    color: "rgb(0, 109, 119)",
  };

  const buttonStyle = {
    color: "rgb(0, 109, 119)",
    border: "1px solid rgb(0, 109, 119)",
  };

  const filledButtonStyle = {
    backgroundColor: "rgb(0, 109, 119)",
    color: "white",
    border: "1px solid rgb(0, 109, 119)",
  };

  const [backdrop, setBackdrop] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState(null);
  const [modalType, setModalType] = React.useState(null);

  async function followButtonClickHandler(event) {
    event.preventDefault();
    let data = {
      followee: event.target.value,
      follower: userInfo.userID,
    };
    let response = await fetch(
      `http://localhost:3000/users/${userInfo.userID}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: userInfo.authToken,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      props.retrieveUser();
    }
  }

  const followCheck = (follower) => follower._id === userInfo.userID;
  const settingsRedirect = () => {
    navigate("/userDetails", { replace: true });
  };

  const [pageRendered, setPageRendered] = React.useState(false);
  const [buttonCounter, setButtonCounter] = React.useState(0);

  React.useEffect(() => {
    pageRendered
      ? navigate("/userDetails", { replace: true })
      : setPageRendered(true);
  }, [buttonCounter]);

  return (
    props.user && (
      <div
        className="extendedUserCard"
        onClick={() =>
          navigate(`/users/${props.user.username}`, { replace: true })
        }
      >
        <div className="extendedCardUserIdentifier">
          <Avatar
            {...stringAvatar(`${props.user.username}`)}
            src={props.user.avatar}
            alt={`${props.user.username}'s Avatar`}
            variant="rounded"
            sx={{
              width: "4.5rem",
              height: "4.5rem",
              bgcolor: stringToColor(props.user.username),
              marginTop: "5px",
              cursor: "pointer",
            }}
          >
            {" "}
            {props.user.username && props.user.username[0].toUpperCase()}
          </Avatar>
          <h3 style={{ cursor: "pointer" }}>{props.user.username}</h3>
          {props.user.followers.some(followCheck) ? (
            props.user._id === userInfo.userID ? null : (
              <Button
                value={props.user._id}
                onClick={followButtonClickHandler}
                variant="contained"
                style={filledButtonStyle}
              >
                Following
              </Button>
            )
          ) : props.user._id === userInfo.userID ? null : (
            <Button
              style={buttonStyle}
              value={props.user._id}
              onClick={followButtonClickHandler}
              variant="outlined"
            >
              Follow
            </Button>
          )}
        </div>
        <div className="extendedCardUserInfo">
          <div
            onClick={() => {
              setBackdrop((prev) => !prev);
              setModalTitle(`Users following ${props.user.username}:`);
              setModalType(props.user.followers);
            }}
          >
            <Modal
              open={backdrop}
              children={
                <ModalUserList
                  modalTitle={modalTitle}
                  userList={modalType}
                ></ModalUserList>
              }
            ></Modal>
            <span>Followers:</span> <b>{props.user.followers.length}</b>
          </div>
          <div
            onClick={() => {
              setBackdrop((prev) => !prev);
              setModalTitle(`Users ${props.user.username} follows:`);
              setModalType(props.user.following);
            }}
          >
            <span>Following:</span> <b>{props.user.following.length}</b>
          </div>
          <div>
            <span>Posts:</span> <b>{props.user.posts.length}</b>
          </div>
        </div>
        {props.user._id === userInfo.userID && (
          <Tooltip title="Change your user avatar." placement="right">
            <Button
              style={settingsButtonStyle}
              variant="outlined"
              onClick={() => setButtonCounter((prev) => prev + 1)}
            >
              <SettingsIcon fontSize="large">
                <Link to="/userDetails"></Link>
              </SettingsIcon>
            </Button>
          </Tooltip>
        )}
      </div>
    )
  );
}

export default ExtendedUserCard;
