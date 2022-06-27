import React from "react";
import { UserContext } from "./UserContext";
import { DateTime } from "luxon";

export default function Comment(props) {
  const userInfo = React.useContext(UserContext);
  const [mouseOver, setMouseOver] = React.useState(false);

  return (
    <div>
      <div
        className="comment"
        onMouseEnter={() => {
          setMouseOver(true);
          console.log(props.comment);
        }}
        onMouseLeave={() => {
          setMouseOver(false);
        }}
      >
        <p>
          <b>{props.comment.author.username}</b> commented:
        </p>
        <p>{props.comment.content}</p>
        {mouseOver && <p>{props.comment.formatted_date}</p>}
      </div>
      <hr></hr>
    </div>
  );
}
