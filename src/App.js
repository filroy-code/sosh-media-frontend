import './App.css';
import React from 'react'

function App() {

  const [postData, updatePostData] = React.useState("")

  async function apiQuery() {
    let response = await fetch('http://localhost:3000/john_bonham/62953db45a26ac4a67b6110c')
    let data = await response.json()
    console.log(data)
    updatePostData(response)
  }


  return (
    <div className="App">
      <button onClick={apiQuery}>Click Me!</button>
     <p></p>
    </div>
  );
}

export default App;
