import React from "react";
import ReactDOM from "react-dom";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Button from "@mui/material/Button";
import { UserContext } from "./UserContext";

const NewCommentInput = React.forwardRef((props, ref) => {
  const userInfo = React.useContext(UserContext);

  const [commentState, updateCommentState] = React.useState({
    content: "",
    author: userInfo.userID,
  });

  function commentChangeHandler(event) {
    updateCommentState((prev) => ({ ...prev, content: event.target.value }));
  }

  async function commentSubmitHandler(event) {
    event.preventDefault();
    let response = await fetch(
      `http://localhost:3000/users${props.targetPostURL}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentState),
      }
    );
    let json = await response.json();
    console.log(json);
    props.getUserData();
    props.setCommentsToggle((prev) => !prev);
  }

  React.useEffect(() => {
    ref.current.childNodes[0].childNodes[0].focus();
  });

  return (
    <div>
      <form className="commentInput" onSubmit={commentSubmitHandler}>
        <TextField
          ref={ref}
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
    </div>
  );
});

export default NewCommentInput;
