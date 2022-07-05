import React from "react";
import Post from "./Post";
import NewPostForm from "./NewPostForm";
import getOtherUserData from "../services/getOtherUserData";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import getLoggedinUserData from "../services/getLoggedinUserData";
import getLoggedinUserHomeFeed from "../services/getLoggedinUserHomeFeed";
import { UserContext } from "./UserContext";
import ExtendedUserCard from "./ExtendedUserCard";
import { Flipped, Flipper } from "react-flip-toolkit";

export default function Feed(props) {
  const { user } = useParams();
  const userInfo = React.useContext(UserContext);
  const [initialRenderCompleted, setInitialRenderCompleted] =
    React.useState(false);

  const [userData, updateUserData] = React.useState([]);
  const [postFeed, updatePostFeed] = React.useState([]);
  const [dataLoaded, setDataLoaded] = React.useState(false);

  async function retrieveUser() {
    let userDataResult = await getOtherUserData(user);
    updateUserData(userDataResult[0]);
  }
  async function retrieveUserHome() {
    let loggedinUserHomeFeed = await getLoggedinUserHomeFeed(
      userInfo.authToken
    );
    updateUserData(loggedinUserHomeFeed);
  }

  async function retrieveAppropriateUserData() {
    //if the user param is truthy, populated the feed with posts from that user. Else, the feed is the home feed for the logged in user.
    if (user) {
      await retrieveUser();
    } else {
      await retrieveUserHome();
    }
  }

  function generatePosts(userData) {
    console.log(userData.posts);
    const posts = userData.posts;
    let postsDisplay = posts.map((post) => {
      return (
        <Post
          post={post}
          key={post._id}
          update={retrieveAppropriateUserData}
        ></Post>
      );
    });
    updatePostFeed(postsDisplay);
  }

  //populates feed based on which user is being viewed
  React.useEffect(() => {
    async function retrieveAndRender() {
      await retrieveAppropriateUserData();
      setDataLoaded(true);
    }
    retrieveAndRender();
  }, [user]);

  React.useEffect(() => {
    if (initialRenderCompleted) {
      generatePosts(userData);
    } else {
      setInitialRenderCompleted(true);
    }
  }, [userData]);

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: "0vw", transition: { duration: 0.3 } }}
      exit={{ x: "-100vw", transition: { duration: 0.4 } }}
      className="mainSection"
    >
      {user && dataLoaded ? (
        <ExtendedUserCard
          user={userData}
          retrieveUser={retrieveUser}
        ></ExtendedUserCard>
      ) : null}
      {!user && (
        <NewPostForm update={retrieveAppropriateUserData}></NewPostForm>
      )}
      {user === userInfo.username && (
        <NewPostForm update={retrieveAppropriateUserData}></NewPostForm>
      )}
      <Flipper className="flipperClass" flipKey={postFeed}>
        {postFeed}
      </Flipper>
    </motion.div>
  );
}
