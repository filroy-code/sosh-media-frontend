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
      setAuthToken(responseJSON.token.split(" ")[1]);
    } else {
      console.log("invalid login credentials");
    }
  }

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
