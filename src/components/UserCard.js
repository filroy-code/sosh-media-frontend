import React from "react";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { stringAvatar, stringToColor } from "../services/AvatarColor";
import { motion } from "framer-motion";
import getOtherUserData from "../services/getOtherUserData";

function UserCard(props) {
  let navigate = useNavigate();

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
        }}
      >
        {" "}
        {props.user.username && props.user.username[0].toUpperCase()}
      </Avatar>
      <h3>{props.user.username}</h3>
      <div className="userCardInfoContainer">
        <p>Followers: {props.user.followers.length}</p>
        <p>Posts: {props.user.posts.length}</p>
      </div>
      <Button variant="outlined">Follow</Button>
    </div>
  );
}

export default UserCard;
