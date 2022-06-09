import React from "react";
import ReactDOM from "react-dom";
import TextField from "@mui/material/TextField";
import StarBorderIcon from "@mui/icons-material/StarBorder";
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
      <p>
        <b>{props.post.author.username}</b> posted:
      </p>
      <p>{props.post.content}</p>
      <p>{props.post.formatted_date}</p>
      <StarBorderIcon fontSize="small"></StarBorderIcon>
      {props.post.stars.length}
      <form onSubmit={commentSubmitHandler} id={props.post._id}>
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
