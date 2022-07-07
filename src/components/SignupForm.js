import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SignupForm(props) {
  let navigate = useNavigate();

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
    width: "15rem",
  };

  const alertStyle = {
    margin: "10px 0px 5px 0px",
    borderRadius: "5px",
  };

  const [signupInfo, setSignupInfo] = React.useState({
    username: "",
    password: "",
  });

  // updates signupInfo state when user makes inputs to SignupForm component
  function signupChangeHandler(event) {
    setSignupInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  const [validationMessage, setValidationMessage] = React.useState({
    username: null,
    password: null,
  });

  // submits username and password info from signup form component and
  async function signupSubmitHandler(event) {
    event.preventDefault();
    if (
      signupInfo.username.length < 3 ||
      signupInfo.username.length > 13 ||
      signupInfo.password.length < 3 ||
      signupInfo.password.length > 20
    ) {
      if (signupInfo.username.length < 3 || signupInfo.username.length > 13) {
        setValidationMessage({
          username: "Username must be between 3 and 13 characters.",
        });
      } else {
        setValidationMessage((prev) => ({
          username: null,
        }));
      }
      if (signupInfo.password.length < 3 || signupInfo.password.length > 20) {
        setValidationMessage((prev) => ({
          username: prev.username,
          password: "Password must be between 3 and 20 characters.",
        }));
      } else {
        setValidationMessage((prev) => ({
          username: prev.username,
          password: null,
        }));
      }
      return;
    }

    setValidationMessage({
      username: null,
      password: null,
    });

    let response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupInfo),
    });
    if (response.status === 200) {
      setSignupInfo({
        username: "",
        password: "",
      });
      props.setStatusMessage("User successfully created. Please log in.");
      navigate("/login");
    } else {
      props.setStatusMessage("This username already exists.");
      setSignupInfo({
        username: "",
        password: "",
      });
    }
  }

  function loginLink() {
    props.setStatusMessage(null);
    navigate("/login");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="authContainer"
    >
      <form
        className="signupForm"
        onSubmit={props.submitHandler}
        action="/"
        method="POST"
      >
        <h2>Sosh Signup</h2>
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
          onChange={signupChangeHandler}
          value={signupInfo.username}
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
          onChange={signupChangeHandler}
          value={signupInfo.password}
          style={inputStyle}
        />
        {props.statusMessage ? (
          <Alert
            severity={
              props.statusMessage === "This username already exists."
                ? "error"
                : "success"
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
          onClick={signupSubmitHandler}
        >
          Sign Up
        </Button>
        <p className="loginSignupAdditionalText">OR</p>
        <Button style={buttonStyle} variant="outlined" onClick={loginLink}>
          Log In
        </Button>
      </form>
    </motion.div>
  );
}
