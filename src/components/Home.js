import React from "react";
import Post from "./Post";

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

  return <div>{postFeed}</div>;
}
