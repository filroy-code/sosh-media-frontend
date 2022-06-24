import React from "react";
import { UserContext } from "./UserContext";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoginForm from "./LoginForm";
import Home from "./Home";
import Feed from "./Feed";
import SignupForm from "./SignupForm";
import Sidebar from "./Sidebar";
import UserDetails from "./UserDetails";
import PageHeader from "./PageHeader";
import ExploreOtherUsers from "./ExploreOtherUsers";

export default function AnimatedRoutes(props) {
  const location = useLocation();
  const userInfo = React.useContext(UserContext);

  // JWT stored here, when issued.
  const [authToken, setAuthToken] = React.useState("");

  // logged in user info
  const [loggedInUser, setLoggedInUser] = React.useState({
    userID: "",
    username: "",
    avatar: "",
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
      setLoggedInUser({
        userID: userData._doc._id,
        username: userData._doc.username,
        avatar: userData._doc.avatar,
      });
      updatePostFeed(userData._doc.posts);
    }
  }

  return (
    <UserContext.Provider value={loggedInUser}>
      <AnimatePresence>
        <div className="App">
          {authToken && <PageHeader />}
          <div className="body">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  authToken ? (
                    <Home
                      getUserData={getUserData}
                      authToken={authToken}
                      postFeed={postFeed}
                    ></Home>
                  ) : (
                    <Navigate to="/login"></Navigate>
                  )
                }
              ></Route>
              <Route
                path="/userDetails"
                element={
                  authToken ? (
                    <UserDetails
                      authToken={authToken}
                      getUserData={getUserData}
                    />
                  ) : (
                    <Navigate to="/login"></Navigate>
                  )
                }
              ></Route>
              <Route
                path="/exploreUsers"
                element={
                  authToken ? (
                    <ExploreOtherUsers
                      authToken={authToken}
                    ></ExploreOtherUsers>
                  ) : (
                    <Navigate to="/login"></Navigate>
                  )
                }
              ></Route>
              <Route
                path="/users/:user"
                element={
                  authToken ? (
                    <Feed
                    // getUserData={getUserData}
                    // authToken={authToken}
                    // postFeed={postFeed}
                    ></Feed>
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
                  !authToken ? (
                    <LoginForm
                      setAuthToken={setAuthToken}
                      statusMessage={statusMessage}
                      setStatusMessage={setStatusMessage}
                    ></LoginForm>
                  ) : (
                    <Navigate to="/"></Navigate>
                  )
                }
              ></Route>
            </Routes>
            {authToken && (
              <Sidebar
                authToken={authToken}
                getUserData={getUserData}
                logout={logout}
              ></Sidebar>
            )}
          </div>
        </div>
      </AnimatePresence>
    </UserContext.Provider>
  );
}
