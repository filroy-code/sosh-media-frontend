import React from "react";
import ReactDOM from "react-dom";
import TextField from "@mui/material/TextField";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import PeopleIcon from "@mui/icons-material/People";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { UserContext } from "./UserContext";
import { stringAvatar } from "../services/AvatarColor";

export default function Sidebar(props) {
  let navigate = useNavigate();
  const userInfo = React.useContext(UserContext);

  const buttonStyle = {
    margin: "5px",
    height: "4rem",
    width: "4rem",
  };
  // const [searchQuery, setSearchQuery] = React.useState("");

  // async function searchSubmitHandler(event) {
  //   event.preventDefault();
  //   let response = await fetch(`http://localhost:3000/search/${searchQuery}`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: props.authToken,
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   let json = await response.json();
  //   console.log(json);
  // }

  // function searchChangeHandler(event) {
  //   setSearchQuery(event.target.value);
  // }

  return (
    <motion.nav
      initial={{ x: "100vw" }}
      animate={{ x: "0vw", transition: { duration: 0.8 } }}
      exit={{ x: "100vw", transition: { duration: 0.4 } }}
      className="sideBar"
    >
      <Button onClick={() => props.getUserData()}>CLICK</Button>
      <Button
        style={buttonStyle}
        variant="outlined"
        onClick={() => navigate("/userDetails", { replace: true })}
        // onMouseOver={() => console.log("hover")}
      >
        <Avatar
          {...stringAvatar(`${userInfo.username}`)}
          src={userInfo.avatar}
          alt={`${userInfo.username}'s Avatar`}
          variant="rounded"
        >
          {userInfo.username && userInfo.username[0].toUpperCase()}
          <NavLink to="/userDetails"></NavLink>
        </Avatar>
      </Button>
      <Button
        style={buttonStyle}
        variant="outlined"
        onClick={() => navigate("/", { replace: true })}
      >
        <HomeIcon fontSize="large">
          <NavLink to="/">Edit user details.</NavLink>
        </HomeIcon>
      </Button>
      <Button
        style={buttonStyle}
        variant="outlined"
        // onClick={() => navigate("/userDetails", { replace: true })}
      >
        <PeopleIcon fontSize="large">
          {/* <NavLink to="/userDetails">Edit user details.</NavLink> */}
        </PeopleIcon>
      </Button>

      {/* <form onSubmit={searchSubmitHandler}>
        <TextField
          fullWidth
          name="search"
          onChange={searchChangeHandler}
          value={searchQuery}
          placeholder="search for people..."
        ></TextField>
        <Button onClick={searchSubmitHandler}>Search</Button>
      </form> */}
    </motion.nav>
  );
}
