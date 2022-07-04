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
        }}
        onMouseLeave={() => {
          setMouseOver(false);
        }}
        onMouseDown={() => {
          setMouseOver((prev) => !prev);
        }}
      >
        <div className="commentHeader">
          <p>
            <b>{props.comment.author.username}</b> commented:{" "}
          </p>
          <p>{mouseOver && props.comment.formatted_date}</p>
        </div>
        <p className="commentContent">{props.comment.content}</p>
      </div>
      <hr></hr>
    </div>
  );
}
