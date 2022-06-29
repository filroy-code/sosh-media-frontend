import React from "react";
import ReactDOM from "react-dom";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { UserContext } from "./UserContext";
import CommentList from "./CommentList";
import NewCommentInput from "./NewCommentInput";
import { stringAvatar } from "../services/AvatarColor";
import getLoggedinUserData from "../services/getLoggedinUserData";

export default function Post(props) {
  const userInfo = React.useContext(UserContext);
  const inputRef = React.useRef();

  const buttonStyle = {
    margin: "0px 10px 0px 5px",
    backgroundColor: "rgb(237, 246, 249)",
    color: "rgb(0, 109, 119)",
    border: "1px solid black",
    borderRadius: "5px",
  };

  // const filledButtonStyle = {
  //   margin: "0px 10px 0px 5px",
  //   backgroundColor: "rgb(0, 109, 119)",
  //   color: "white",
  //   border: "1px solid rgb(0, 109, 119)",
  // };

  const [commentsToggle, setCommentsToggle] = React.useState(false);
  const [starsToggle, setStarsToggle] = React.useState(false);

  const avatarStyle = {
    margin: "0px 10px 0px 10px",
  };

  async function starClickHandler(event) {
    event.preventDefault();
    setStarsToggle((prev) => !prev);
    let response = await fetch(`http://localhost:3000/users${props.post.url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userStar: userInfo.userID,
        content: null,
      }),
    });
    let json = await response.json();
    getLoggedinUserData(userInfo.authToken);
    props.update();
  }

  function commentClickHandler() {
    setCommentsToggle((prev) => !prev);
  }

  return (
    <div className="post">
      <div className="postHeader">
        <div className="postAuthor">
          <Avatar
            {...stringAvatar(`${props.post.author.username}`)}
            alt={`${props.post.author.username}'s Avatar`}
            src={props.post.author.avatar}
            variant="rounded"
            style={avatarStyle}
          >
            {props.post.author.username[0].toUpperCase()}
          </Avatar>
          <b>{props.post.author.username}</b> posted:
        </div>
        {props.post.author._id === userInfo.userID && (
          <div className="postAuthor">
            <IconButton style={buttonStyle}>
              <EditIcon style={{ margin: "0px" }}></EditIcon>
            </IconButton>
          </div>
        )}
      </div>
      <p className="postContent">{props.post.content}</p>
      <p className="postDate">{props.post.formatted_date}</p>
      <span className="postButtonContainer">
        <IconButton className="starsButton" onClick={starClickHandler}>
          {props.post.stars.includes(userInfo.userID) ? (
            <StarIcon sx={{ color: "rgb(226, 149, 120)" }} />
          ) : (
            <StarBorderIcon />
          )}
          {props.post.stars.length}
        </IconButton>
        <Tooltip title="Add a comment." placement="right">
          <IconButton className="commentsButton" onClick={commentClickHandler}>
            {commentsToggle ? (
              <ChatBubbleIcon sx={{ color: "rgb(0, 109, 119)" }} />
            ) : (
              <ChatBubbleOutlineIcon sx={{ color: "rgb(0, 109, 119)" }} />
            )}
            {props.post.comments.length}
          </IconButton>
        </Tooltip>
      </span>
      <hr></hr>
      <div>
        <CommentList comments={props.post.comments}></CommentList>
        {commentsToggle ? (
          <NewCommentInput
            ref={inputRef}
            targetPostURL={props.post.url}
            setCommentsToggle={setCommentsToggle}
            update={props.update}
          ></NewCommentInput>
        ) : null}
      </div>
    </div>
  );
}
