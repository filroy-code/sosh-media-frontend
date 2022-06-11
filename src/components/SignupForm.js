import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function SignupForm(props) {
  const buttonStyle = {
    margin: "5px",
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

  // submits username and password info from signup form component and
  async function signupSubmitHandler(event) {
    event.preventDefault();
    let response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupInfo),
    });
    let responseJSON = await response.json();
    if (responseJSON !== false) {
      console.log(responseJSON);
      setSignupInfo({
        username: "",
        password: "",
      });
    } else {
      console.log("signup failed");
      setSignupInfo({
        username: "",
        password: "",
      });
    }
  }

  return (
    <form
      className="signupForm"
      onSubmit={props.submitHandler}
      action="/"
      method="POST"
    >
      <h2>Sosh Signup</h2>
      <br></br>
      <TextField
        variant="outlined"
        type="text"
        name="username"
        placeholder="Username"
        onChange={signupChangeHandler}
        value={signupInfo.username}
      />
      <TextField
        variant="outlined"
        type="password"
        name="password"
        placeholder="Password"
        onChange={signupChangeHandler}
        value={signupInfo.password}
      />
      <Button
        variant="contained"
        style={buttonStyle}
        onClick={signupSubmitHandler}
      >
        Sign Up
      </Button>
      Or{" "}
      <span onClick={props.showSignup} color="blue">
        <u>log in.</u>
      </span>
    </form>
  );
}
