import React from "react";
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "../services/AvatarColor";

export default function ModalUserCard(props) {
  const avatarStyle = {
    margin: "0px 10px 0px 10px",
    border: "1px solid black",
    pointerEvents: "none",
    userSelect: "none",
  };

  const h3Style = {
    pointerEvents: "none",
    userSelect: "none",
  };

  return (
    <div className="modalUserCard">
      <Avatar
        {...stringAvatar(`${props.user.username}`)}
        alt={`${props.user.username}'s Avatar`}
        src={props.user.avatar}
        variant="rounded"
        style={avatarStyle}
      >
        {props.user.username[0].toUpperCase()}
      </Avatar>
      <h3 style={h3Style}>{props.user.username}</h3>
    </div>
  );
}
