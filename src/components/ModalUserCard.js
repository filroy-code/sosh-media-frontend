import React from "react";
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "../services/AvatarColor";
import { useNavigate } from "react-router-dom";

export default function ModalUserCard(props) {
  const navigate = useNavigate();

  const avatarStyle = {
    margin: "0px 10px 0px 10px",
    border: "1px solid black",
    pointerEvents: "none",
  };

  return (
    <>
      <Avatar
        {...stringAvatar(`${props.user.username}`)}
        alt={`${props.user.username}'s Avatar`}
        src={props.user.avatar}
        variant="rounded"
        style={avatarStyle}
      >
        {props.user.username[0].toUpperCase()}
      </Avatar>
      <h3>{props.user.username}</h3>
    </>
  );
}
