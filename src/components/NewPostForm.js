import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { UserContext } from "./UserContext";
import getLoggedinUserData from "../services/getLoggedinUserData";

export default function NewPostForm(props) {
  const userInfo = React.useContext(UserContext);

  //content of a new post to be made is stored here (along with the author, who is the logged in user) until the form is submitted.
  const [newPostContent, setNewPostContent] = React.useState({
    author: userInfo.userID,
    content: "",
  });

  // updates newPostContent state when user inputs into NewPostForm
  function newPostChangeHandler(event) {
    setNewPostContent({
      author: userInfo.userID,
      content: event.target.value,
    });
  }

  // submits content and author from newPostContent and creates a new post in database
  async function newPostSubmitHandler(event) {
    event.preventDefault();
    let response = await fetch(
      `http://localhost:3000/users/${userInfo.username}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPostContent),
      }
    );
    if (response.status === 200) {
      setNewPostContent({ content: "", author: userInfo.userID });
      getLoggedinUserData(userInfo.authToken);
    } else {
      console.log("There was an error creating your post.");
    }
  }

  return (
    <form
      className="newPostForm"
      onSubmit={newPostSubmitHandler}
      action={`/${userInfo.username}`}
      method="POST"
    >
      <TextField
        fullWidth
        multiline
        size="small"
        name="content"
        placeholder="Speak your mind..."
        onChange={newPostChangeHandler}
        value={newPostContent.content}
      />

      <Button variant="outlined" onClick={newPostSubmitHandler}>
        Post
      </Button>
    </form>
  );
}
