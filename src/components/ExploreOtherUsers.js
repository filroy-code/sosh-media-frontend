import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import UserCard from "./UserCard";
import { motion } from "framer-motion";
import { UserContext } from "./UserContext";

export default function ExploreOtherUsers(props) {
  const userInfo = React.useContext(UserContext);
  const [userList, setUserList] = React.useState([]);

  function generateUserCards(userList) {
    let userListDisplay = userList.map((user) => {
      return (
        <UserCard
          user={user}
          key={user._id}
          findUsersAndGenerateCards={findUsersAndGenerateCards}
        ></UserCard>
      );
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
    return responseJSON.userList;
  }

  async function findUsersAndGenerateCards() {
    let users = await findUsers();
    generateUserCards(users);
  }

  React.useEffect(() => {
    findUsersAndGenerateCards();
  }, []);

  const [searchQuery, setSearchQuery] = React.useState("");

  async function searchChangeHandler(event) {
    setSearchQuery(event.target.value);
    let filteredUsers = await searchUsers(event.target.value);
    generateUserCards(filteredUsers);
  }

  async function searchUsers(searchQuery) {
    let response = await fetch("http://localhost:3000/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchQuery: searchQuery }),
    });
    let responseJSON = await response.json();
    return responseJSON;
  }

  // React.useEffect(() => {
  //   async function findUsersAndGenerateCards() {
  //     let users = await findUsers();
  //     generateUserCards(users);
  //   }
  //   findUsersAndGenerateCards();
  // }, [searchQuery]);

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: "0vw", transition: { duration: 0.3 } }}
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
        {userList.length > 0 ? (
          <div className="userList">{userList}</div>
        ) : (
          <div className="userListAbsent">No users matched your search.</div>
        )}
      </div>
    </motion.div>
  );
}
