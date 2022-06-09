import React from "react";
import ReactDOM from "react-dom";
import TextField from "@mui/material/TextField";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Button from "@mui/material/Button";

export default function Post(props) {
  const [commentState, updateCommentState] = React.useState({
    content: "",
    author: "",
    targetPost: "",
  });

  function commentChangeHandler(event) {
    updateCommentState((prev) => ({ ...prev, content: event.target.value }));
  }

  async function commentSubmitHandler(event) {
    event.preventDefault();
    console.log(event.target);
  }

  return (
    <div className="post">
      <p>
        <b>{props.post.author.username}</b> posted:
      </p>
      <p>{props.post.content}</p>
      <p>{props.post.formatted_date}</p>
      <StarBorderIcon fontSize="small"></StarBorderIcon>{" "}
      {props.post.stars.length}
      <form onSubmit={commentSubmitHandler}>
        <TextField
          size="small"
          name="comment"
          placeholder="comment on this post..."
          value={commentState.content}
          onChange={commentChangeHandler}
        ></TextField>
        <Button variant="outlined">Comment</Button>
      </form>
    </div>
  );
}
