import React from "react";
import { UserContext } from "./UserContext";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoginForm from "./LoginForm";
import Feed from "./Feed";
import SignupForm from "./SignupForm";
import Sidebar from "./Sidebar";
import UserDetails from "./UserDetails";
import PageHeader from "./PageHeader";
import ExploreOtherUsers from "./ExploreOtherUsers";

export default function AnimatedRoutes(props) {
  const location = useLocation();

  // logged in user info, including JWT to attach to requests
  const [loggedInUser, setLoggedInUser] = React.useState({
    userID: "",
    username: "",
    avatar: "",
    authToken: "",
  });

  // logs user out, setting all states back to default
  function logout() {
    setLoggedInUser({ userID: "", username: "", avatar: "", authToken: "" });
  }

  // controls the message to be displayed on login screen on unsuccessful login or on successful signup, used in Login and Signup Form components
  const [statusMessage, setStatusMessage] = React.useState(null);

  return (
    <UserContext.Provider value={loggedInUser}>
      <AnimatePresence>
        <div className="App">
          {loggedInUser.authToken && <PageHeader />}
          <div className="body">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  loggedInUser.authToken ? (
                    <Feed></Feed>
                  ) : (
                    <Navigate to="/login"></Navigate>
                  )
                }
              ></Route>
              <Route
                path="/userDetails"
                element={
                  loggedInUser.authToken ? (
                    <UserDetails setLoggedInUser={setLoggedInUser} />
                  ) : (
                    <Navigate to="/login"></Navigate>
                  )
                }
              ></Route>
              <Route
                path="/exploreUsers"
                element={
                  loggedInUser.authToken ? (
                    <ExploreOtherUsers></ExploreOtherUsers>
                  ) : (
                    <Navigate to="/login"></Navigate>
                  )
                }
              ></Route>
              <Route
                path="/users/:user"
                element={
                  loggedInUser.authToken ? (
                    <Feed></Feed>
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
                  !loggedInUser.authToken ? (
                    <LoginForm
                      setLoggedInUser={setLoggedInUser}
                      statusMessage={statusMessage}
                      setStatusMessage={setStatusMessage}
                    ></LoginForm>
                  ) : (
                    <Navigate to="/"></Navigate>
                  )
                }
              ></Route>
            </Routes>
            {loggedInUser.authToken && <Sidebar logout={logout}></Sidebar>}
          </div>
        </div>
      </AnimatePresence>
    </UserContext.Provider>
  );
}
