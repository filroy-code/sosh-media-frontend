export default async function getOtherUserData(username) {
  let response = await fetch(`http://localhost:3000/users/${username}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  let responseJSON = await response.json();
  console.log(responseJSON);
  return responseJSON;
}
