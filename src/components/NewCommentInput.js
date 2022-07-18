import React from "react";
import ReactDOM from "react-dom";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Button from "@mui/material/Button";
import { UserContext } from "./UserContext";
import getLoggedinUserData from "../services/getLoggedinUserData";

const NewCommentInput = React.forwardRef((props, ref) => {
  const userInfo = React.useContext(UserContext);

  const buttonStyle = {
    color: "rgb(0, 109, 119)",
    border: "1px solid rgb(0, 109, 119)",
    margin: "8px",
  };

  const [commentState, updateCommentState] = React.useState({
    content: "",
    author: userInfo.userID,
  });

  function commentChangeHandler(event) {
    updateCommentState((prev) => ({ ...prev, content: event.target.value }));
  }

  async function commentSubmitHandler(event) {
    event.preventDefault();
    if (commentState.content.length < 1) {
      setValidationMessage("Comment cannot be empty.");
      return;
    }
    let response = await fetch(`http://localhost:3000/users${props.post.url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo.authToken,
      },
      body: JSON.stringify(commentState),
    });
    getLoggedinUserData(userInfo.authToken);
    props.setCommentsToggle((prev) => !prev);
    props.update(props.post);
  }

  React.useEffect(() => {
    ref.current.childNodes[0].childNodes[0].focus();
  });

  const [validationMessage, setValidationMessage] = React.useState(null);

  return (
    <div>
      <form className="commentInput" onSubmit={commentSubmitHandler}>
        <TextField
          error={validationMessage ? true : false}
          helperText={validationMessage ? validationMessage : null}
          ref={ref}
          multiline
          fullWidth
          size="small"
          name="comment"
          placeholder="comment on this post..."
          value={commentState.content}
          onChange={commentChangeHandler}
          style={{ width: "88%" }}
        ></TextField>
        <Button
          style={buttonStyle}
          variant="outlined"
          onClick={commentSubmitHandler}
        >
          Comment
        </Button>
      </form>
    </div>
  );
});

export default NewCommentInput;
