import React from "react";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "react-textarea-autosize";

export default function NewPostForm(props) {
  return (
    <form
      className="newPostForm"
      onSubmit={props.submitHandler}
      action={`/${props.loggedInUser.username}`}
      method="POST"
    >
      <TextField
        fullWidth
        multiline
        size="small"
        name="content"
        placeholder="Speak your mind..."
        onChange={props.changeHandler}
        value={props.newPostContent.content}
      />

      <button>Post</button>
    </form>
  );
}
