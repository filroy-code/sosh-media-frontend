import "./App.css";
import React from "react";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import NewPostForm from "./components/NewPostForm";
import { UserContext } from "./components/UserContext";
import SignupForm from "./components/SignupForm";

function App() {
  //if user is not logged in, determines whether the login or signup form is shown.
  const [signupState, setSignupState] = React.useState(false);

  function showSignup() {
    setSignupState((prev) => !prev);
  }

  // JWT stored here, when issued.
  const [authToken, setAuthToken] = React.useState("");

  // logs user out, setting all states back to default
  function logout() {
    setAuthToken("");
    setLoggedInUser({ userID: "", username: "" });
    updatePostFeed([]);
    setNewPostContent({ content: "", author: loggedInUser.userID });
  }

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
      setLoginMessage(null);
    } else {
      setLoginMessage("Invalid login credentials.");
      setLoginInfo({
        username: "",
        password: "",
      });
    }
  }

  // if login info is incorrect, this message will be displayed - this message is managed by loginSubmitHandler
  const [loginMessage, setLoginMessage] = React.useState(null);

  // logged in user info
  const [loggedInUser, setLoggedInUser] = React.useState({
    userID: "",
    username: "",
  });

  const [postFeed, updatePostFeed] = React.useState([]);

  // sends a GET request which verifies the stored JWT and saves logged in user data to state if valid.
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

  //content of a new post to be made is stored here (along with the author, who is the logged in user) until the form is submitted.
  const [newPostContent, setNewPostContent] = React.useState({
    content: "",
    author: loggedInUser.userID,
  });

  // updates newPostContent state when user inputs into NewPostForm
  function newPostChangeHandler(event) {
    setNewPostContent({
      author: loggedInUser.userID,
      content: event.target.value,
    });
  }

  // submits content and author from newPostContent and creates a new post in database
  async function newPostSubmitHandler(event) {
    event.preventDefault();
    let response = await fetch(
      `http://localhost:3000/${loggedInUser.username}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPostContent),
      }
    );
    if (response.status === 200) {
      let postData = await response.json();
      setNewPostContent({ content: "", author: loggedInUser.userID });
      getUserData();
    } else {
      console.log("There was an error creating your post.");
    }
  }

  return (
    <UserContext.Provider value={loggedInUser}>
      <div className="App">
        {authToken ? (
          <div>
            <h1>Sosh</h1>
            <p className="userDisplay">
              Logged in as {loggedInUser.username}{" "}
              <button onClick={logout}>Logout</button>
            </p>
            <NewPostForm
              loggedInUser={loggedInUser}
              newPostContent={newPostContent}
              changeHandler={newPostChangeHandler}
              submitHandler={newPostSubmitHandler}
            ></NewPostForm>
            <Home
              getUserData={getUserData}
              authToken={authToken}
              postFeed={postFeed}
            ></Home>
          </div>
        ) : signupState ? (
          <SignupForm showSignup={showSignup} />
        ) : (
          <LoginForm
            submitHandler={loginSubmitHandler}
            changeHandler={loginChangeHandler}
            loginInfo={loginInfo}
            showSignup={showSignup}
            loginMessage={loginMessage}
          ></LoginForm>
        )}
      </div>
    </UserContext.Provider>
  );
}

export default App;
