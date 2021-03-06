import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { UserContext } from "./UserContext";
import { stringAvatar } from "../services/AvatarColor";

export default function Sidebar(props) {
  let navigate = useNavigate();
  let location = useLocation();
  const userInfo = React.useContext(UserContext);

  const buttonStyle = {
    margin: "5px",
    height: "4rem",
    width: "3.5rem",
    backgroundColor: "rgb(237, 246, 249)",
    color: "rgb(0, 109, 119)",
    border: "1px solid black",
  };

  return (
    <motion.nav
      initial={{ x: "100vw" }}
      animate={{ x: "0vw", transition: { duration: 0.8 } }}
      exit={{ x: "100vw", transition: { duration: 0.4 } }}
      className="sideBar"
    >
      <Button
        className={location.pathname === "/" ? "activeTab" : null}
        style={buttonStyle}
        variant="outlined"
        onClick={() =>
          location.pathname === "/"
            ? window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
            : navigate("/")
        }
      >
        <HomeIcon fontSize="large">
          <NavLink to="/">Home</NavLink>
        </HomeIcon>
      </Button>
      <Button
        className={
          location.pathname === "/userDetails" ||
          location.pathname === `/users/${userInfo.username}`
            ? "activeTab"
            : null
        }
        style={buttonStyle}
        variant="outlined"
        onClick={() => navigate(`/users/${userInfo.username}`)}
      >
        <Avatar
          {...stringAvatar(`${userInfo.username}`)}
          src={userInfo.avatar}
          alt={`${userInfo.username}'s Avatar`}
          variant="rounded"
          style={{ border: "1px solid rgb(0, 109, 119)" }}
        >
          {userInfo.username && userInfo.username[0].toUpperCase()}
          <NavLink to="/userDetails"></NavLink>
        </Avatar>
      </Button>
      <Button
        className={
          location.pathname === "/exploreUsers" ||
          (location.pathname.split("/")[2] !== userInfo.username &&
            location.pathname.split("/")[1] === "users")
            ? "activeTab"
            : null
        }
        style={buttonStyle}
        variant="outlined"
        onClick={() => navigate("/exploreUsers")}
      >
        <PeopleIcon fontSize="large">
          <NavLink to="/exploreUsers">Explore Users</NavLink>
        </PeopleIcon>
      </Button>
      <Button style={buttonStyle} variant="outlined" onClick={props.logout}>
        <LogoutIcon fontSize="large"></LogoutIcon>
      </Button>
    </motion.nav>
  );
}
