export default async function getLoggedinUserData(authToken, page) {
  let response = await fetch(`http://localhost:3000/homefeed/${page}`, {
    method: "GET",
    mode: "cors",
    headers: { Authorization: authToken, Origin: "localhost:8080" },
  });
  if (response.status === 200) {
    let userData = await response.json();
    return userData;
  }
}
