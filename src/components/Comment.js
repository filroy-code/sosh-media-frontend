import React from "react";
import { UserContext } from "./UserContext";

export default function Comment(props) {
  const userInfo = React.useContext(UserContext);

  return (
    <div>
      <div className="comment">
        <p>
          <b>{props.comment.author.username}</b> commented:
        </p>
        <p>{props.comment.content}</p>
      </div>
      <hr></hr>
    </div>
  );
}
