import React from "react";

export default function Home(props) {
  let { getUserData } = props;

  React.useEffect(() => {
    if (props.authToken) {
      getUserData();
    }
  }, [props.authToken]);

  return <div></div>;
}
