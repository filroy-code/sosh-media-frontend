// sends a GET request which verifies the stored JWT and saves logged in user data (including home feed) to state if valid.
export default async function getLoggedinUserData(authToken) {
  let response = await fetch("https://sosh-deployment.herokuapp.com/", {
    method: "GET",
    mode: "cors",
    headers: { Authorization: authToken, Origin: "localhost:8080" },
  });
  if (response.status === 200) {
    let userData = await response.json();
    return userData;
  }
}
