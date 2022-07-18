import React from "react";
import Comment from "./Comment";

export default function CommentList(props) {
  let commentList = props.comments.map((comment) => {
    return <Comment key={comment._id} comment={comment}></Comment>;
  });

  return <div className="commentList">{commentList}</div>;
}
