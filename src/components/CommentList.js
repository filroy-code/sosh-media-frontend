import React from "react";
import ReactDOM from "react-dom";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Button from "@mui/material/Button";
import { UserContext } from "./UserContext";
import NewCommentInput from "./NewCommentInput";

export default function CommentList(props) {
  const userInfo = React.useContext(UserContext);

  //   const [commentsToggle, setCommentsToggle] = React.useState(false);
  //   const [starsToggle, setStarsToggle] = React.useState(false);

  //   function starClickHandler(event) {
  //     console.log(event.target.dataset.targetpost);
  //     setStarsToggle((prev) => !prev);
  //   }

  let commentList = props.comments.map((comment) => {
    return (
      <div key={comment._id}>
        <div className="comment">
          <p>
            <b>{comment.author.username}</b> commented:
          </p>
          <p>{comment.content}</p>
        </div>
        <hr></hr>
      </div>
    );
  });

  return <div className="commentList">{commentList}</div>;
}
