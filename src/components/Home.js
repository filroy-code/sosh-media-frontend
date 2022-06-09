import React from "react";
import Post from "./Post";

export default function Home(props) {
  const postFeed = props.postFeed.map((x) => {
    return <Post post={x} key={x._id}></Post>;
  });

  async function commentSubmitHandler(event) {
    event.preventDefault();
    console.log(event.target);
    // let response = await fetch(
    //   `http://localhost:3000/${loggedInUser.username}`,
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(newPostContent),
    //   }
    // );
    // if (response.status === 200) {
    //   let postData = await response.json();
    //   console.log(postData);
    //   setNewPostContent({ content: "", author: loggedInUser.userID });
    //   getUserData();
    // } else {
    //   console.log("There was an error creating your post.");
    // }
  }

  let { getUserData } = props;

  //populates home feed on user login.
  React.useEffect(() => {
    if (props.authToken) {
      getUserData();
    }
  }, [props.authToken]);

  return <div>{postFeed}</div>;
}
