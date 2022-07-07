import React from "react";
import ReactDOM from "react-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import getLoggedinUserData from "../services/getLoggedinUserData";

export default function LoginForm(props) {
  let navigate = useNavigate();

  // styles for components
  const buttonStyle = {
    color: "rgb(0, 109, 119)",
    border: "1px solid rgb(0, 109, 119)",
  };

  const filledButtonStyle = {
    backgroundColor: "rgb(0, 109, 119)",
    color: "white",
    border: "1px solid rgb(0, 109, 119)",
    margin: "5px",
  };

  const inputStyle = {
    margin: "5px",
    color: "success",
  };

  const alertStyle = {
    margin: "10px 0px 5px 0px",
    borderRadius: "5px",
  };

  const [validationMessage, setValidationMessage] = React.useState({
    username: false,
    password: false,
  });

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
    if (loginInfo.username.length < 1 || loginInfo.password.length < 1) {
      if (loginInfo.username.length < 1) {
        setValidationMessage({
          username: "Username field must not be empty.",
        });
      } else {
        setValidationMessage({
          username: null,
        });
      }
      if (loginInfo.password.length < 1) {
        setValidationMessage((prev) => ({
          ...prev,
          password: "Password field must not be empty.",
        }));
      } else {
        setValidationMessage({
          password: null,
        });
      }
      return;
    }

    setValidationMessage({
      username: null,
      password: null,
    });

    let response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginInfo),
    });
    let responseJSON = await response.json();
    if (responseJSON !== false) {
      setLoginInfo({
        username: "",
        password: "",
      });
      props.setStatusMessage(null);
      let userData = await getLoggedinUserData(responseJSON.token);
      props.setLoggedInUser({
        userID: userData._doc._id,
        username: userData._doc.username,
        avatar: userData._doc.avatar,
        authToken: responseJSON.token,
      });
      navigate("/", { replace: true });
    } else {
      props.setStatusMessage((prev) => "Invalid login credentials.");
      setLoginInfo({
        username: "",
        password: "",
      });
    }
    console.log("submitted to server");
  }

  function signupLink() {
    props.setStatusMessage(null);
    navigate("/signup");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="authContainer"
    >
      <form
        className="loginForm"
        onSubmit={loginSubmitHandler}
        action="/"
        method="POST"
      >
        <h2>Sosh Login</h2>
        <br></br>
        <TextField
          error={validationMessage.username ? true : false}
          helperText={
            validationMessage.username ? validationMessage.username : null
          }
          variant="outlined"
          type="text"
          name="username"
          placeholder="Username"
          onChange={loginChangeHandler}
          value={loginInfo.username}
          style={inputStyle}
        />
        <TextField
          error={validationMessage.password ? true : false}
          helperText={
            validationMessage.password ? validationMessage.password : null
          }
          variant="outlined"
          type="password"
          name="password"
          placeholder="Password"
          onChange={loginChangeHandler}
          value={loginInfo.password}
          style={inputStyle}
        />
        {props.statusMessage ? (
          <Alert
            severity={
              props.statusMessage ===
              "User successfully created. Please log in."
                ? "success"
                : "error"
            }
            style={alertStyle}
          >
            {props.statusMessage}
          </Alert>
        ) : null}
        <Button
          variant="contained"
          type="submit"
          style={filledButtonStyle}
          onClick={loginSubmitHandler}
        >
          Log-In
        </Button>
        <p className="loginSignupAdditionalText">OR</p>
        <Button style={buttonStyle} variant="outlined" onClick={signupLink}>
          Sign Up
        </Button>
      </form>
    </motion.div>
  );
}
