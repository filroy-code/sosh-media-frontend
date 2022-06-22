import React from "react";
import { motion } from "framer-motion";

export default function ExploreOtherUsers(props) {
  //   const postFeed = props.postFeed.map((post) => {
  //     return (
  //       <Post post={post} key={post._id} getUserData={props.getUserData}></Post>
  //     );
  //   });

  //   let { getUserData } = props;

  //populates home feed on user login.
  //   React.useEffect(() => {
  //     if (props.authToken) {
  //       getUserData();
  //     }
  //   }, [props.authToken]);

  async function findUsers(event) {
    event.preventDefault();
    let response = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(loginInfo),
    });
    let responseJSON = await response.json();
  }

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: "0vw", transition: { duration: 0.8 } }}
      exit={{ x: "-100vw", transition: { duration: 0.4 } }}
      className="mainSection"
    >
      <div
        style={{ width: "90vw", height: "90vh", border: "1px solid black" }}
      ></div>
      {/* <NewPostForm getUserData={props.getUserData}></NewPostForm> */}
    </motion.div>
  );
}
