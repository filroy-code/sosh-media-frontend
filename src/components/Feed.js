import React from "react";
import Post from "./Post";
import NewPostForm from "./NewPostForm";
import getOtherUserData from "../services/getOtherUserData";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import getLoggedinUserHomeFeed from "../services/getLoggedinUserHomeFeed";
import { UserContext } from "./UserContext";
import ExtendedUserCard from "./ExtendedUserCard";
import { Flipper } from "react-flip-toolkit";
import getPostData from "../services/getPostData";
import NoPostsFound from "./NoPostsFound";
import { Button } from "@mui/material";

export default function Feed(props) {
  const { user } = useParams();
  const userInfo = React.useContext(UserContext);
  const [initialRenderCompleted, setInitialRenderCompleted] =
    React.useState(false);

  const [userData, updateUserData] = React.useState([]);
  const [userSocialData, setUserSocialData] = React.useState({});
  const [postFeed, updatePostFeed] = React.useState([]);
  const [dataLoaded, setDataLoaded] = React.useState(0);

  // data pagination
  const [page, setPage] = React.useState(1);
  const [lastPage, setLastPage] = React.useState();

  const observer = React.useRef();
  const intersectionTrigger = React.useCallback(
    (node) => {
      if (!dataLoaded) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page <= lastPage) {
          setPage((prev) => prev + 1);
          retrieveAppropriateUserData();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [dataLoaded, page]
  );

  async function retrieveUser() {
    let userDataResult = await getOtherUserData(user, page);
    setLastPage(userDataResult.posts.totalPages);
    updateUserData((prev) => {
      let posts = [...prev, ...userDataResult.posts.docs];
      let filteredPosts = [];
      posts.forEach((post) => {
        if (filteredPosts.some((element) => element._id === post._id)) {
          return;
        } else {
          filteredPosts.push(post);
        }
      });
      return filteredPosts;
    });
    setUserSocialData(userDataResult.user[0]);
  }
  async function retrieveUserHome() {
    let loggedinUserHomeFeed = await getLoggedinUserHomeFeed(
      userInfo.authToken,
      page
    );
    setLastPage(loggedinUserHomeFeed.totalPages);
    updateUserData((prev) => {
      let posts = [...prev, ...loggedinUserHomeFeed.docs];
      let filteredPosts = [];
      posts.forEach((post) => {
        if (filteredPosts.some((element) => element._id === post._id)) {
          return;
        } else {
          filteredPosts.push(post);
        }
      });
      return filteredPosts;
    });
  }

  async function updateIndividualPost(postToUpdate) {
    let loadedPosts = userData;
    let changedPost = await getPostData(postToUpdate._id);
    let removalIndex;
    loadedPosts.forEach(async (post, index) => {
      if (post._id === postToUpdate._id) {
        removalIndex = index;
      }
    });
    loadedPosts.splice(removalIndex, 1, changedPost);
    let newArray = [...loadedPosts];
    updateUserData(newArray);
  }

  async function deleteIndividualPost(postToUpdate) {
    let loadedPosts = userData;
    let removalIndex;
    loadedPosts.forEach(async (post, index) => {
      if (post._id === postToUpdate._id) {
        removalIndex = index;
      }
    });
    loadedPosts.splice(removalIndex, 1);
    let newArray = [...loadedPosts];
    updateUserData(newArray);
  }

  async function addNewPostToFeed(post) {
    updateUserData((prev) => [post, ...prev]);
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
    const posts = user ? Array.from(userData) : Array.from(userData);
    let postsDisplay = posts.map((post, index) => {
      if (index === posts.length - 1) {
        return (
          <Post
            ref={intersectionTrigger}
            post={post}
            key={post._id}
            update={updateIndividualPost}
            delete={deleteIndividualPost}
          ></Post>
        );
      } else {
        return (
          <Post
            post={post}
            key={post._id}
            update={updateIndividualPost}
            delete={deleteIndividualPost}
          ></Post>
        );
      }
    });
    updatePostFeed(postsDisplay);
  }

  //populates feed based on which user is being viewed
  React.useEffect(() => {
    async function retrieveAndRender() {
      await retrieveAppropriateUserData();
      setDataLoaded((prev) => prev + 1);
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
          user={userSocialData}
          retrieveUser={retrieveUser}
        ></ExtendedUserCard>
      ) : null}
      {!user && <NewPostForm update={addNewPostToFeed}></NewPostForm>}
      {user === userInfo.username && (
        <NewPostForm update={addNewPostToFeed}></NewPostForm>
      )}
      {postFeed.length > 0 ? (
        <Flipper className="flipperClass" flipKey={postFeed}>
          {postFeed}
        </Flipper>
      ) : (
        <NoPostsFound></NoPostsFound>
      )}
    </motion.div>
  );
}
