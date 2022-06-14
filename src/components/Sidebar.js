import React from "react";
import ReactDOM from "react-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar(props) {
  const [searchQuery, setSearchQuery] = React.useState("");

  async function searchSubmitHandler(event) {
    event.preventDefault();
    let response = await fetch(`http://localhost:3000/search/${searchQuery}`, {
      method: "GET",
      headers: {
        Authorization: props.authToken,
        "Content-Type": "application/json",
      },
    });
    let json = await response.json();
    console.log(json);
  }

  function searchChangeHandler(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <div className="sideBar">
      <Button>
        <Link to="/userDetails">Edit user details.</Link>
      </Button>
      <form onSubmit={searchSubmitHandler}>
        <TextField
          fullWidth
          name="search"
          onChange={searchChangeHandler}
          value={searchQuery}
          placeholder="search for people..."
        ></TextField>
        <Button onClick={searchSubmitHandler}>Search</Button>
      </form>
    </div>
  );
}
