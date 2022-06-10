import React from "react";
import ReactDOM from "react-dom";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Button from "@mui/material/Button";
import { UserContext } from "./UserContext";

export default function NewCommentInput(props) {
  const userInfo = React.useContext(UserContext);

  const [commentState, updateCommentState] = React.useState({
    content: "",
    author: userInfo.userID,
    targetPost: props.targetPost,
  });

  function commentChangeHandler(event) {
    updateCommentState((prev) => ({ ...prev, content: event.target.value }));
  }

  async function commentSubmitHandler(event) {
    event.preventDefault();
    console.log(commentState);
  }

  return (
    <form className="commentInput" onSubmit={commentSubmitHandler}>
      <TextField
        multiline
        fullWidth
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
  );
}
