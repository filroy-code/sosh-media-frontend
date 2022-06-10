import React from "react";
import ReactDOM from "react-dom";
import TextField from "@mui/material/TextField";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Button from "@mui/material/Button";
import { UserContext } from "./UserContext";

export default function Post(props) {
  const userInfo = React.useContext(UserContext);

  const [commentState, updateCommentState] = React.useState({
    content: "",
    author: userInfo.userID,
    targetPost: "",
  });

  function commentChangeHandler(event) {
    updateCommentState((prev) => ({ ...prev, content: event.target.value }));
  }

  async function commentSubmitHandler(event) {
    event.preventDefault();
    updateCommentState((prev) => ({
      ...prev,
      targetPost: event.target.parentElement.id,
    }));
    console.log(commentState);
  }

  return (
    <div className="post">
      <p className="postAuthor">
        <b>{props.post.author.username}</b> posted:
      </p>
      <p className="postContent">{props.post.content}</p>
      <p>{props.post.formatted_date}</p>
      <span className="postButtonContainer">
        <span className="stars">
          <StarBorderIcon
            className="commentIcon"
            fontSize="small"
          ></StarBorderIcon>
          {props.post.stars.length}
        </span>
        <span className="comments">
          <ChatBubbleOutlineIcon
            className="commentIcon"
            fontSize="small"
          ></ChatBubbleOutlineIcon>
          {props.post.comments.length}
        </span>
      </span>
      <hr></hr>
      <form
        className="commentInput"
        onSubmit={commentSubmitHandler}
        id={props.post._id}
      >
        <TextField
          size="small"
          name="comment"
          placeholder="comment on this post..."
          value={commentState.content}
          onChange={commentChangeHandler}
        ></TextField>
        <Button variant="outlined" onClick={commentSubmitHandler}>
          Comment
        </Button>
      </form>
    </div>
  );
}
