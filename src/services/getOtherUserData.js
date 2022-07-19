export default async function getOtherUserData(username, page) {
  let response = await fetch(
    `https://sosh-deployment.herokuapp.com/users/${username}/${page}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  let responseJSON = await response.json();
  return responseJSON;
}
