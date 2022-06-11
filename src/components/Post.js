import React from "react";
import ReactDOM from "react-dom";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Button from "@mui/material/Button";
import { UserContext } from "./UserContext";
import CommentList from "./CommentList";
import NewCommentInput from "./NewCommentInput";

export default function Post(props) {
  const userInfo = React.useContext(UserContext);

  const [commentsToggle, setCommentsToggle] = React.useState(false);
  const [starsToggle, setStarsToggle] = React.useState(false);

  async function starClickHandler(event) {
    event.preventDefault();
    setStarsToggle((prev) => !prev);
    let response = await fetch(`http://localhost:3000${props.post.url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userStar: userInfo.userID,
        content: null,
      }),
    });
    let json = await response.json();
    console.log(json);
  }

  return (
    <div className="post">
      <p className="postAuthor">
        <b>{props.post.author.username}</b> posted:
      </p>
      <p className="postContent">{props.post.content}</p>
      <p>{props.post.formatted_date}</p>
      <span className="postButtonContainer">
        <IconButton className="starsButton" onClick={starClickHandler}>
          {starsToggle ? <StarIcon /> : <StarBorderIcon />}
          {props.post.stars.length}
        </IconButton>
        <IconButton
          className="commentsButton"
          onClick={() => {
            setCommentsToggle((prev) => !prev);
          }}
        >
          {commentsToggle ? <ChatBubbleIcon /> : <ChatBubbleOutlineIcon />}
          {props.post.comments.length}
        </IconButton>
      </span>
      <hr></hr>
      {commentsToggle ? (
        <div>
          <CommentList comments={props.post.comments}></CommentList>
          <NewCommentInput targetPostURL={props.post.url}></NewCommentInput>
        </div>
      ) : null}
    </div>
  );
}
