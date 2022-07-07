export default async function getOtherUserData(username, page) {
  let response = await fetch(
    `http://localhost:3000/users/${username}/${page}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  let responseJSON = await response.json();
  return responseJSON;
}
