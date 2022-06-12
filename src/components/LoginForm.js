import React from "react";
import ReactDOM from "react-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm(props) {
  let navigate = useNavigate();

  // styles for components
  const buttonStyle = {
    margin: "5px",
  };

  const alertStyle = {
    margin: "10px 0px 5px 0px",
  };

  // login form state
  const [loginInfo, setLoginInfo] = React.useState({
    username: "",
    password: "",
  });

  // updates loginInfo state when user makes inputs to LoginForm component
  function loginChangeHandler(event) {
    setLoginInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  // submits username and password info from login form component and stores JWT in React state if login successful.
  async function loginSubmitHandler(event) {
    event.preventDefault();
    let response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginInfo),
    });
    let responseJSON = await response.json();
    if (responseJSON !== false) {
      props.setAuthToken(responseJSON.token);
      setLoginInfo({
        username: "",
        password: "",
      });
      props.setLoginMessage(null);
      navigate("/", { replace: true });
    } else {
      props.setLoginMessage("Invalid login credentials.");
      setLoginInfo({
        username: "",
        password: "",
      });
    }
  }

  return (
    <form
      className="loginForm"
      onSubmit={loginSubmitHandler}
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
        onChange={loginChangeHandler}
        value={loginInfo.username}
      />
      <TextField
        variant="outlined"
        type="password"
        name="password"
        placeholder="Password"
        onChange={loginChangeHandler}
        value={loginInfo.password}
      />
      {props.loginMessage ? (
        <Alert
          severity={
            props.loginMessage === "User successfully created. Please log in."
              ? "success"
              : "error"
          }
          style={alertStyle}
        >
          {props.loginMessage}
        </Alert>
      ) : null}
      <Button
        variant="contained"
        style={buttonStyle}
        onClick={loginSubmitHandler}
      >
        Log-In
      </Button>
      Or
      <Button>
        <Link to="/signup">sign up.</Link>
      </Button>
    </form>
  );
}
