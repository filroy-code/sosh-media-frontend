import React from "react";

export default function NewPostForm(props) {
  return (
    <form
      className="newPost"
      onSubmit={props.submitHandler}
      action={`/${props.loggedInUser.username}`}
      method="POST"
    >
      <textarea
        name="content"
        placeholder="Speak your mind..."
        onChange={props.changeHandler}
        value={props.newPostContent.content}
      />

      <button>Post</button>
    </form>
  );
}
