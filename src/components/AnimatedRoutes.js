import React from "react";
import { UserContext } from "./UserContext";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoginForm from "./LoginForm";
import Home from "./Home";
import SignupForm from "./SignupForm";
import Sidebar from "./Sidebar";
import UserDetails from "./UserDetails";

export default function AnimatedRoutes(props) {
  const location = useLocation();
  const userInfo = React.useContext(UserContext);

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
  const [statusMessage, setStatusMessage] = React.useState(null);

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
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
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
                    <Home
                      getUserData={getUserData}
                      authToken={authToken}
                      postFeed={postFeed}
                    ></Home>
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
            element={
              <SignupForm
                setStatusMessage={setStatusMessage}
                statusMessage={statusMessage}
              />
            }
          ></Route>
          <Route
            path="/login"
            element={
              <LoginForm
                setAuthToken={setAuthToken}
                statusMessage={statusMessage}
                setStatusMessage={setStatusMessage}
              ></LoginForm>
            }
          ></Route>
          <Route path="/userDetails" element={<UserDetails />}></Route>
        </Routes>
      </AnimatePresence>
    </UserContext.Provider>
  );
}
