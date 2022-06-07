import "./App.css";
import React from "react";
import LoginForm from "./components/LoginForm";

function App() {
  // JWT stored here, when issued.
  const [authToken, setAuthToken] = React.useState("");

  const [loginInfo, setLoginInfo] = React.useState({
    username: "",
    password: "",
  });

  // updates loginInfo state when user makes inputs to login form
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
      setAuthToken(responseJSON.token);
      setLoginInfo({
        username: "",
        password: "",
      });
    } else {
      console.log("invalid login credentials");
      setLoginInfo({
        username: "",
        password: "",
      });
    }
  }

  async function getPost() {
    let response = await fetch(
      "http://localhost:3000/john_bonham/62990856fb0466ba9cc23a39",
      {
        method: "GET",
        mode: "cors",
        headers: { Authorization: authToken, Origin: "localhost:8080" },
      }
    );
    if (response.status === 200) {
      let json = await response.json();
      console.log(json);
    } else {
      console.log("You are not authorized to view this resource.");
    }
  }

  return (
    <div className="App">
      <LoginForm
        submitHandler={loginSubmitHandler}
        changeHandler={loginChangeHandler}
        loginInfo={loginInfo}
      ></LoginForm>
      <button onClick={getPost}>Click me!</button>
    </div>
  );
}

export default App;
