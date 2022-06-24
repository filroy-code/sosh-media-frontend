import React from "react";
import Post from "./Post";
import NewPostForm from "./NewPostForm";
import getData from "../services/getData";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@mui/material";

export default function Feed(props) {
  const { user } = useParams();
  const [initialRender, setInitialRender] = React.useState(false);

  const [userData, updateUserData] = React.useState([]);
  const [postFeed, updatePostFeed] = React.useState([]);

  function generatePosts(userData) {
    const posts = userData.posts;
    console.log(posts);
    let postsDisplay = posts.map((post) => {
      return <Post post={post} key={post._id}></Post>;
    });
    updatePostFeed(postsDisplay);
  }

  // const postFeedDisplay = postFeed.map((post) => {
  //   return (
  //     <Post post={post} key={post._id} getUserData={props.getUserData}></Post>
  //   );
  // });

  //populates feed based on which user is being viewed
  React.useEffect(() => {
    async function retrieveUser() {
      updateUserData(await getData(user));
    }
    //if the user param is truthy, populated the feed with posts from that user. Else, the feed is the home feed for the logged in user.
    if (user) {
      retrieveUser();
    }
  }, [user]);

  React.useEffect(() => {
    if (initialRender) {
      generatePosts(userData[0]);
    } else {
      setInitialRender(true);
    }
  }, [userData]);

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: "0vw", transition: { duration: 0.8 } }}
      exit={{ x: "-100vw", transition: { duration: 0.4 } }}
      className="mainSection"
    >
      {/* <NewPostForm getUserData={props.getUserData}></NewPostForm> */}
      {postFeed}
      <Button onClick={() => console.log(postFeed)}>CLICK</Button>
    </motion.div>
  );
}
