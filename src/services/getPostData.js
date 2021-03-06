export default async function getPostData(postID) {
  let response = await fetch(
    `https://sosh-deployment.herokuapp.com/posts/${postID}`,
    {
      method: "GET",
      mode: "cors",
      headers: { Origin: "localhost:8080" },
    }
  );
  if (response.status === 200) {
    let postData = await response.json();
    return postData;
  }
}
