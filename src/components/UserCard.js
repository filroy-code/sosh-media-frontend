import React from "react";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { stringAvatar, stringToColor } from "../services/AvatarColor";
import { motion } from "framer-motion";
import getOtherUserData from "../services/getOtherUserData";
import getLoggedinUserData from "../services/getLoggedinUserData";

function UserCard(props) {
  const userInfo = React.useContext(UserContext);
  let navigate = useNavigate();

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
      props.findUsersAndGenerateCards();
    }
  }

  return (
    <div className="userCard">
      <Avatar
        onClick={() =>
          navigate(`/users/${props.user.username}`, { replace: true })
        }
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
      <h3
        onClick={() =>
          navigate(`/users/${props.user.username}`, { replace: true })
        }
        style={{ cursor: "pointer" }}
      >
        {props.user.username}
      </h3>
      <div className="userCardInfoContainer">
        <p>Followers: {props.user.followers.length}</p>
        <p>Posts: {props.user.posts.length}</p>
      </div>

      {props.user.followers.includes(userInfo.userID) ? (
        props.user._id === userInfo.userID ? null : (
          <Button
            value={props.user._id}
            onClick={followButtonClickHandler}
            variant="contained"
          >
            Following
          </Button>
        )
      ) : props.user._id === userInfo.userID ? null : (
        <Button
          value={props.user._id}
          onClick={followButtonClickHandler}
          variant="outlined"
        >
          Follow
        </Button>
      )}
    </div>
  );
}

export default UserCard;
