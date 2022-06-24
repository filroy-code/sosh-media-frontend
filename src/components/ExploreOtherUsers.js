import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import UserCard from "./UserCard";
import { motion } from "framer-motion";

export default function ExploreOtherUsers(props) {
  const [userList, setUserList] = React.useState([]);

  function generateUserCards(userList) {
    let userListDisplay = userList.map((user) => {
      return <UserCard user={user} key={user._id}></UserCard>;
    });
    setUserList(userListDisplay);
  }

  async function findUsers() {
    let response = await fetch("http://localhost:3000/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(loginInfo),
    });
    let responseJSON = await response.json();
    generateUserCards(responseJSON.userList);
  }

  React.useEffect(() => {
    findUsers();
  }, []);

  const [searchQuery, setSearchQuery] = React.useState("");

  function searchChangeHandler(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: "0vw", transition: { duration: 0.8 } }}
      exit={{ x: "-100vw", transition: { duration: 0.4 } }}
      className="mainSection"
    >
      <div className="exploreOtherUsers">
        <div className="userSearch">
          <TextField
            fullWidth
            multiline
            size="small"
            name="content"
            placeholder="Search for users..."
            onChange={searchChangeHandler}
            value={searchQuery}
          />
        </div>
        <div className="userList">{userList}</div>
      </div>
    </motion.div>
  );
}
