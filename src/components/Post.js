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
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Popper from "@mui/material/Popper";
import { styled } from "@mui/material/styles";
import { UserContext } from "./UserContext";
import CommentList from "./CommentList";
import NewCommentInput from "./NewCommentInput";
import { stringAvatar } from "../services/AvatarColor";
import getLoggedinUserData from "../services/getLoggedinUserData";
import { AnimatePresence, motion } from "framer-motion";
import { Flipped } from "react-flip-toolkit";
import PostEditTextField from "./PostEditTextField";
import { useNavigate } from "react-router-dom";

const Post = React.forwardRef((props, ref) => {
  const userInfo = React.useContext(UserContext);
  const inputRef = React.useRef();
  const navigate = useNavigate();

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

  const filledPopperButtonStyle = {
    margin: "5px 0px",
    backgroundColor: "rgb(0, 109, 119)",
    color: "white",
    border: "1px solid rgb(0, 109, 119)",
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
    border: "1px solid black",
    cursor: "pointer",
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
    props.update(props.post);
  }

  function commentClickHandler() {
    setCommentsToggle((prev) => !prev);
  }

  const [deleteStatus, setDeleteStatus] = React.useState(false);

  // functions for popper usability - taken from MUI positioned popper example code.
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const popperClickHandler = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  // styled tooltip for high contrast overlay on darkened post.
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: "1rem",
    },
  }));

  async function deleteClickHandler(event) {
    event.stopPropagation();
    let response = await fetch(`http://localhost:3000/users${props.post.url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo.authToken,
      },
    });
    if (response.status === 200) {
      props.delete(props.post);
    }
    setDeleteStatus("inProgress");
  }

  const [postEditState, setPostEditState] = React.useState("");

  function postEditChangeHandler(event) {
    setPostEditState(event.target.value);
  }

  async function editConfirm() {
    let response = await fetch(`http://localhost:3000/users${props.post.url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo.authToken,
      },
      body: JSON.stringify({ editedContent: postEditState }),
    });
    if (response.status === 200) {
      setPostEditState("");
      props.update(props.post);
    } else {
      console.log("Edit submit failed.");
    }
  }

  return (
    <Flipped flipId={`${props.post._id}`}>
      <div
        className={open ? "post postOptionSelect" : "post"}
        ref={ref ? ref : null}
        style={
          deleteStatus === "inProgress" ? { filter: "brightness(50%)" } : null
        }
        onClick={
          open
            ? () => {
                setOpen(false);
                setDeleteStatus(false);
              }
            : null
        }
      >
        {deleteStatus ? (
          <div className="postDeleteConfirmation">
            <motion.div
              initial={{ x: "-100vw" }}
              animate={{ x: "0vw", transition: { duration: 0.5 } }}
              exit={{ x: "-100vw", transition: { duration: 0.4 } }}
              className="confirmationWindow"
            >
              <h2>Delete this post?</h2>
              <div className="confirmationWindowButtonContainer">
                <Button style={buttonStyle} onClick={deleteClickHandler}>
                  Yes
                </Button>
                <Button
                  style={buttonStyle}
                  onClick={() => {
                    setDeleteStatus(false);
                  }}
                >
                  No
                </Button>
              </div>
            </motion.div>
          </div>
        ) : null}
        <Flipped inverseFlipId={`${props.post._id}`}>
          <div>
            {postEditState ? (
              <motion.div
                className="postHeaderEditing"
                initial={{ x: "-100vw" }}
                animate={{ x: "0vw", transition: { duration: 0.5 } }}
                exit={{ x: "-100vw", transition: { duration: 0.4 } }}
              >
                <div className="editButtonContainer">
                  <Tooltip title="Confirm changes." placement="left">
                    <IconButton onClick={editConfirm} style={filledButtonStyle}>
                      <CheckIcon></CheckIcon>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Discard changes." placement="right">
                    <IconButton
                      style={buttonStyle}
                      onClick={() => setPostEditState(false)}
                    >
                      <ClearIcon></ClearIcon>
                    </IconButton>
                  </Tooltip>
                </div>
              </motion.div>
            ) : (
              <div className="postHeader">
                <div className="postAuthor">
                  <Avatar
                    onClick={() =>
                      navigate(`/users/${props.post.author.username}`)
                    }
                    {...stringAvatar(`${props.post.author.username}`)}
                    alt={`${props.post.author.username}'s Avatar`}
                    src={props.post.author.avatar}
                    variant="rounded"
                    style={avatarStyle}
                  >
                    {props.post.author.username[0].toUpperCase()}
                  </Avatar>
                  <b
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(`/users/${props.post.author.username}`)
                    }
                  >
                    {props.post.author.username}
                  </b>{" "}
                  posted:
                </div>
                {props.post.author._id === userInfo.userID && (
                  <div className="postAuthor">
                    <IconButton
                      disabled={deleteStatus || postEditState ? true : false}
                      style={open ? filledButtonStyle : buttonStyle}
                      onClick={popperClickHandler("bottom")}
                    >
                      <Popper
                        className="postOptionPopper"
                        open={open}
                        anchorEl={anchorEl}
                        placement={placement}
                        modifiers={[
                          {
                            name: "flip",
                            enabled: false,
                          },
                        ]}
                      >
                        <LightTooltip title="Edit this post." placement="left">
                          <IconButton
                            style={popperButtonStyle}
                            onClick={() => {
                              setPostEditState(props.post.content);
                            }}
                          >
                            <EditIcon></EditIcon>
                          </IconButton>
                        </LightTooltip>
                        <LightTooltip
                          title="Delete this post."
                          placement="left"
                        >
                          <IconButton
                            style={popperButtonStyle}
                            onClick={(event) => {
                              event.stopPropagation();
                              setDeleteStatus(true);
                              setOpen(false);
                            }}
                          >
                            <DeleteIcon></DeleteIcon>
                          </IconButton>
                        </LightTooltip>
                      </Popper>
                      <SettingsIcon style={{ margin: "0px" }}></SettingsIcon>
                    </IconButton>
                  </div>
                )}
              </div>
            )}
            {postEditState ? (
              <PostEditTextField
                postEditChangeHandler={postEditChangeHandler}
                postEditState={postEditState}
              ></PostEditTextField>
            ) : (
              <p className="postContent"> {props.post.content} </p>
            )}

            <p className="postDate">{props.post.formatted_date}</p>
            {props.post.edited ? (
              <p className="postDate">
                <i>Edited on {props.post.formatted_edit_date}</i>
              </p>
            ) : null}
            <span className="postButtonContainer">
              <IconButton
                disabled={deleteStatus || postEditState ? true : false}
                className="starsButton"
                onClick={starClickHandler}
              >
                {props.post.stars.includes(userInfo.userID) ? (
                  <StarIcon sx={{ color: "rgb(226, 149, 120)" }} />
                ) : (
                  <StarBorderIcon />
                )}
                {props.post.stars.length}
              </IconButton>
              <Tooltip title="Add a comment." placement="right">
                <IconButton
                  disabled={deleteStatus || postEditState ? true : false}
                  className="commentsButton"
                  onClick={commentClickHandler}
                >
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
                  post={props.post}
                  setCommentsToggle={setCommentsToggle}
                  update={props.update}
                ></NewCommentInput>
              ) : null}
            </div>
          </div>
        </Flipped>
      </div>
    </Flipped>
  );
});

export default Post;
