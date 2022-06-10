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
  });

  function commentChangeHandler(event) {
    updateCommentState((prev) => ({ ...prev, content: event.target.value }));
  }

  async function commentSubmitHandler(event) {
    event.preventDefault();
    let response = await fetch(`http://localhost:3000${props.targetPostURL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentState),
    });
    console.log(commentState);
  }

  // submits content and author from newPostContent and creates a new post in database
  // async function newPostSubmitHandler(event) {
  //   event.preventDefault();
  //   let response = await fetch(
  //     `http://localhost:3000/${loggedInUser.username}`,
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(newPostContent),
  //     }
  //   );
  //   if (response.status === 200) {
  //     let postData = await response.json();
  //     console.log(postData);
  //     setNewPostContent({ content: "", author: loggedInUser.userID });
  //     getUserData();
  //   } else {
  //     console.log("There was an error creating your post.");
  //   }
  // }

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
