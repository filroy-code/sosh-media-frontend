import React from "react";
import ReactDOM from "react-dom";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { UserContext } from "./UserContext";
import CommentList from "./CommentList";
import NewCommentInput from "./NewCommentInput";
import { stringAvatar } from "../services/AvatarColor";

export default function Post(props) {
  const userInfo = React.useContext(UserContext);

  const inputRef = React.useRef();

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
    console.log(json);
    props.getUserData();
  }

  function commentClickHandler() {
    setCommentsToggle((prev) => !prev);
  }

  return (
    <div className="post">
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
      <p className="postContent">{props.post.content}</p>
      <p className="postDate">{props.post.formatted_date}</p>
      <span className="postButtonContainer">
        <IconButton className="starsButton" onClick={starClickHandler}>
          {props.post.stars.includes(userInfo.userID) ? (
            <StarIcon />
          ) : (
            <StarBorderIcon />
          )}
          {props.post.stars.length}
        </IconButton>
        <Tooltip title="Add a comment." placement="right">
          <IconButton className="commentsButton" onClick={commentClickHandler}>
            {commentsToggle ? <ChatBubbleIcon /> : <ChatBubbleOutlineIcon />}
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
            getUserData={props.getUserData}
            setCommentsToggle={setCommentsToggle}
          ></NewCommentInput>
        ) : null}
      </div>
    </div>
  );
}
