import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import NewPostForm from "./components/NewPostForm";
import SignupForm from "./components/SignupForm";
import Sidebar from "./components/Sidebar";
import { UserContext } from "./components/UserContext";

function App() {
  // JWT stored here, when issued.
  const [authToken, setAuthToken] = React.useState("");

  // logged in user info
  const [loggedInUser, setLoggedInUser] = React.useState({
    userID: "",
    username: "",
  });

  // logs user out, setting all states back to default
  function logout() {
    setAuthToken("");
    setLoggedInUser({ userID: "", username: "" });
    updatePostFeed([]);
  }

  // controls the message to be displayed on login screen on unsuccessful login or on successful signup, used in Login and Signup Form components
  const [loginMessage, setLoginMessage] = React.useState(null);

  // an array of objects which are retrieved from database and populate home feed.
  const [postFeed, updatePostFeed] = React.useState([]);

  // sends a GET request which verifies the stored JWT and saves logged in user data (including home feed) to state if valid.
  async function getUserData() {
    let response = await fetch("http://localhost:3000/", {
      method: "GET",
      mode: "cors",
      headers: { Authorization: authToken, Origin: "localhost:8080" },
    });
    if (response.status === 200) {
      let userData = await response.json();
      if (!loggedInUser.userID) {
        setLoggedInUser({
          userID: userData._doc._id,
          username: userData._doc.username,
        });
      }
      updatePostFeed(userData._doc.posts);
    } else {
      console.log("You are not logged in.");
    }
  }

  return (
    <UserContext.Provider value={loggedInUser}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              authToken ? (
                <div className="App">
                  <div className="pageHeader">
                    <h1>Sosh</h1>
                    <p className="userDisplay">
                      Logged in as {loggedInUser.username}{" "}
                      <button onClick={logout}>Logout</button>
                    </p>
                  </div>
                  <div className="body">
                    <div className="mainSection">
                      <NewPostForm getUserData={getUserData}></NewPostForm>
                      <Home
                        getUserData={getUserData}
                        authToken={authToken}
                        postFeed={postFeed}
                      ></Home>
                    </div>
                    <Sidebar authToken={authToken}></Sidebar>
                  </div>
                </div>
              ) : (
                <Navigate to="/login"></Navigate>
              )
            }
          ></Route>
          <Route
            path="/signup"
            element={<SignupForm setLoginMessage={setLoginMessage} />}
          ></Route>
          <Route
            path="/login"
            element={
              <LoginForm
                setAuthToken={setAuthToken}
                loginMessage={loginMessage}
                setLoginMessage={setLoginMessage}
              ></LoginForm>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
