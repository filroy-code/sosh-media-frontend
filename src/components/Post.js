import React from "react";
import ReactDOM from "react-dom";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Popper from "@mui/material/Popper";
import { UserContext } from "./UserContext";
import CommentList from "./CommentList";
import NewCommentInput from "./NewCommentInput";
import { stringAvatar } from "../services/AvatarColor";
import getLoggedinUserData from "../services/getLoggedinUserData";

export default function Post(props) {
  const userInfo = React.useContext(UserContext);
  const inputRef = React.useRef();

  const buttonStyle = {
    margin: "0px 10px 0px 5px",
    backgroundColor: "rgb(237, 246, 249)",
    color: "rgb(0, 109, 119)",
    border: "1px solid black",
    borderRadius: "5px",
  };

  const popperButtonStyle = {
    margin: "5px 0px",
    backgroundColor: "rgb(237, 246, 249)",
    color: "rgb(0, 109, 119)",
    border: "1px solid black",
    borderRadius: "5px",
  };

  const filledButtonStyle = {
    margin: "0px 10px 0px 5px",
    backgroundColor: "rgb(0, 109, 119)",
    color: "white",
    border: "1px solid rgb(0, 109, 119)",
    borderRadius: "5px",
  };

  const [commentsToggle, setCommentsToggle] = React.useState(false);
  const [starsToggle, setStarsToggle] = React.useState(false);

  const avatarStyle = {
    margin: "0px 10px 0px 10px",
  };

  async function starClickHandler(event) {
    event.preventDefault();
    setStarsToggle((prev) => !prev);
    let response = await fetch(`http://localhost:3000/users${props.post.url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userStar: userInfo.userID,
        content: null,
      }),
    });
    let json = await response.json();
    getLoggedinUserData(userInfo.authToken);
    props.update();
  }

  function commentClickHandler() {
    setCommentsToggle((prev) => !prev);
  }

  // functions for popper usability - taken from MUI positioned popper example code.
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const popperClickHandler = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <div className={open ? "post postOptionSelect" : "post"}>
      <div className="postHeader">
        <div className="postAuthor">
          <Avatar
            {...stringAvatar(`${props.post.author.username}`)}
            alt={`${props.post.author.username}'s Avatar`}
            src={props.post.author.avatar}
            variant="rounded"
            style={avatarStyle}
          >
            {props.post.author.username[0].toUpperCase()}
          </Avatar>
          <b>{props.post.author.username}</b> posted:
        </div>
        {props.post.author._id === userInfo.userID && (
          <div className="postAuthor">
            <IconButton
              style={open ? filledButtonStyle : buttonStyle}
              onClick={popperClickHandler("bottom")}
            >
              <Popper
                className="postOptionPopper"
                open={open}
                anchorEl={anchorEl}
                placement={placement}
              >
                <IconButton style={popperButtonStyle}>
                  <EditIcon></EditIcon>
                </IconButton>
                <IconButton style={popperButtonStyle}>
                  <DeleteIcon></DeleteIcon>
                </IconButton>
              </Popper>
              <SettingsIcon style={{ margin: "0px" }}></SettingsIcon>
            </IconButton>
          </div>
        )}
      </div>
      <p className="postContent">{props.post.content}</p>
      <p className="postDate">{props.post.formatted_date}</p>
      <span className="postButtonContainer">
        <IconButton className="starsButton" onClick={starClickHandler}>
          {props.post.stars.includes(userInfo.userID) ? (
            <StarIcon sx={{ color: "rgb(226, 149, 120)" }} />
          ) : (
            <StarBorderIcon />
          )}
          {props.post.stars.length}
        </IconButton>
        <Tooltip title="Add a comment." placement="right">
          <IconButton className="commentsButton" onClick={commentClickHandler}>
            {commentsToggle ? (
              <ChatBubbleIcon sx={{ color: "rgb(0, 109, 119)" }} />
            ) : (
              <ChatBubbleOutlineIcon sx={{ color: "rgb(0, 109, 119)" }} />
            )}
            {props.post.comments.length}
          </IconButton>
        </Tooltip>
      </span>
      <hr></hr>
      <div>
        <CommentList comments={props.post.comments}></CommentList>
        {commentsToggle ? (
          <NewCommentInput
            ref={inputRef}
            targetPostURL={props.post.url}
            setCommentsToggle={setCommentsToggle}
            update={props.update}
          ></NewCommentInput>
        ) : null}
      </div>
    </div>
  );
}
