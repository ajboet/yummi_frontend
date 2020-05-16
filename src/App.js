import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Components/NavBar/Navbar.js"
import Alert from 'react-bootstrap/Alert'
import Body from './Components/Body/Body'

function App() {
  const [show,setShow] = React.useState(true)
  const logged = localStorage.getItem('token')
  const [token, setToken] = React.useState(logged !== null ? true : false);

  const changeToken = (value) => {
    setToken(value)
  }

  return (
    <div className="App">
      <Alert variant="info"
        onClose={() => setShow(false)}
        dismissible show={show} style={{marginBottom:0,zIndex:1060}}>
        Woohoo, you're reading this text in a Alert!
      </Alert>
      <Navbar token={token} changeToken={changeToken}></Navbar>
      <Body />
    </div>
  );
}

export default App;
