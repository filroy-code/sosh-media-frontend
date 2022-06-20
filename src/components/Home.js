import React from "react";
import Post from "./Post";
import NewPostForm from "./NewPostForm";
import { motion } from "framer-motion";

export default function Home(props) {
  const postFeed = props.postFeed.map((x) => {
    return <Post post={x} key={x._id} getUserData={props.getUserData}></Post>;
  });

  let { getUserData } = props;

  //populates home feed on user login.
  React.useEffect(() => {
    if (props.authToken) {
      getUserData();
    }
  }, [props.authToken]);

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: "0vw", transition: { duration: 0.8 } }}
      exit={{ x: "-100vw", transition: { duration: 0.4 } }}
      className="mainSection"
    >
      <NewPostForm getUserData={props.getUserData}></NewPostForm>
      {postFeed}
    </motion.div>
  );
}
