import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Components/NavBar/Navbar.js"

function App() {

  const logged = localStorage.getItem('token')
  const [token, setToken] = React.useState(logged !== null ? true : false);

  const changeToken = (value) => {
    setToken(value)
  }

  return (
    <div className="App">
      <Navbar token={token} changeToken={changeToken}></Navbar>
    </div>
  );
}

export default App;
