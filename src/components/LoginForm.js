import React from "react";
import ReactDOM from "react-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function LoginForm(props) {
  const buttonStyle = {
    margin: "5px",
  };

  return (
    <form
      className="loginForm"
      onSubmit={props.submitHandler}
      action="/"
      method="POST"
    >
      <h2>Sosh Login</h2>
      <br></br>
      <TextField
        variant="outlined"
        type="text"
        name="username"
        placeholder="Username"
        onChange={props.changeHandler}
        value={props.loginInfo.username}
      />
      <TextField
        variant="outlined"
        type="password"
        name="password"
        placeholder="Password"
        onChange={props.changeHandler}
        value={props.loginInfo.password}
      />
      <Button
        variant="contained"
        style={buttonStyle}
        onClick={props.submitHandler}
      >
        Log-In
      </Button>
    </form>
  );
}
