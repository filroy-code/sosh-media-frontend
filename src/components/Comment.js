import React from "react";
import { useNavigate } from "react-router-dom";

export default function Comment(props) {
  const navigate = useNavigate();
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
            <b
              onClick={() =>
                navigate(`/users/${props.comment.author.username}`)
              }
              style={{ cursor: "pointer" }}
            >
              {props.comment.author.username}
            </b>{" "}
            commented:{" "}
          </p>
          <p>{mouseOver && props.comment.formatted_date}</p>
        </div>
        <p className="commentContent">{props.comment.content}</p>
      </div>
      <hr></hr>
    </div>
  );
}
