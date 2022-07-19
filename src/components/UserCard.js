import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { stringAvatar, stringToColor } from "../services/AvatarColor";

function UserCard(props) {
  const userInfo = React.useContext(UserContext);
  let navigate = useNavigate();

  const buttonStyle = {
    color: "rgb(0, 109, 119)",
    border: "1px solid rgb(0, 109, 119)",
  };

  const filledButtonStyle = {
    backgroundColor: "rgb(0, 109, 119)",
    color: "white",
    border: "1px solid rgb(0, 109, 119)",
  };

  async function followButtonClickHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    let data = {
      followee: event.target.value,
      follower: userInfo.userID,
    };
    let response = await fetch(
      `https://sosh-deployment.herokuapp.com/users/${userInfo.userID}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: userInfo.authToken,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      props.findUsersAndGenerateCards();
    }
  }

  return (
    <div
      className="userCard"
      onClick={() => navigate(`/users/${props.user.username}`)}
    >
      <Avatar
        {...stringAvatar(`${props.user.username}`)}
        src={props.user.avatar}
        alt={`${props.user.username}'s Avatar`}
        variant="rounded"
        sx={{
          width: "4.5rem",
          height: "4.5rem",
          bgcolor: stringToColor(props.user.username),
          marginTop: "5px",
          cursor: "pointer",
          border: "1px solid black",
        }}
      >
        {" "}
        {props.user.username && props.user.username[0].toUpperCase()}
      </Avatar>
      <h3 style={{ cursor: "pointer" }}>{props.user.username}</h3>
      <div className="userCardInfoContainer">
        <p>Followers: {props.user.followers.length}</p>
        <p>Posts: {props.user.posts.length}</p>
      </div>

      {props.user.followers.includes(userInfo.userID) ? (
        props.user._id === userInfo.userID ? null : (
          <Button
            style={filledButtonStyle}
            value={props.user._id}
            onClick={followButtonClickHandler}
            variant="contained"
          >
            Following
          </Button>
        )
      ) : props.user._id === userInfo.userID ? null : (
        <Button
          style={buttonStyle}
          value={props.user._id}
          onClick={followButtonClickHandler}
          variant="outlined"
        >
          Follow
        </Button>
      )}
    </div>
  );
}

export default UserCard;
