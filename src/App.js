import "./App.css";
import React, { useState } from "react";
import LoginForm from "./components/LoginForm";

function App() {
  const [authToken, setAuthToken] = React.useState("");

  const [loginInfo, setLoginInfo] = React.useState({
    username: "",
    password: "",
  });

  function loginChangeHandler(event) {
    setLoginInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function loginSubmitHandler(event) {
    event.preventDefault();
    let response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginInfo),
    });
    let responseJSON = await response.json();
    if (responseJSON !== false) {
      setAuthToken(responseJSON.token.split(" ")[1]);
    } else {
      console.log("invalid login credentials");
    }
  }

  // const [postData, updatePostData] = React.useState("");

  // async function apiQuery() {
  //   let response = await fetch(
  //     "http://localhost:3000/john_bonham/62953db45a26ac4a67b6110c",
  //     { method: "POST" }
  //   );
  //   let data = await response.json();
  //   console.log(data);
  //   updatePostData(response);
  // }

  return (
    <div className="App">
      <LoginForm
        submitHandler={loginSubmitHandler}
        changeHandler={loginChangeHandler}
        loginInfo={loginInfo}
      ></LoginForm>
      <button onClick={() => console.log(authToken)}>Click me!</button>
    </div>
  );
}

export default App;
