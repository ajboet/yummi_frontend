import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Components/NavBar/Navbar.js"
import Alert from 'react-bootstrap/Alert'
import Body from './Components/Body/Body'

function App() {
  const [show,setShow] = React.useState(false)
  const logged = localStorage.getItem('token')
  const [token, setToken] = React.useState(logged !== null ? true : false);
  const [alertVar, setAlert] = React.useState({
    'mode':'info',
    'text':'',
    'title':''
  })

  const changeToken = (value) => {
    setToken(value)
  }

  const closeAlert = () => {
    setShow(false)
    setAlert({
      'mode':'info',
      'text':'',
      'title':''
    })
  } 

  const showMessage = (msg) => {
    if(typeof(msg['text']) === 'object'){
      let text = ""
      for (let msgs in msg['text']){
        text += text === "" ? `${msgs.toLocaleUpperCase()}:` : `\n${msgs.toLocaleUpperCase()}:`
        for (let value in msg['text'][msgs]){
          text += value === 0 || value === '0' ? ` ${msg['text'][msgs][value]}\n` : `- ${msg['text'][msgs][value]}\n`
        }
      }
      msg['text'] = text
    }
    setAlert(msg)
    setShow(true)
    setTimeout(closeAlert,6000)
  }

  return (
    <div className="App">
      <Alert variant={alertVar.mode}
        onClose={closeAlert}
        dismissible show={show} 
        transition={null}
      >
        {
          alertVar.title === "" ? null :
            <Alert.Heading>{alertVar.title}</Alert.Heading>
        }
        {
          alertVar.text.split('\n').map((item,i) => <p style={{ fontSize:14, paddingTop:0,paddingBottom:0 }} key={i}>{item}</p>)
        }
      </Alert>
      <Navbar token={token} changeToken={changeToken} showMessage={showMessage}></Navbar>
      <Body />
    </div>
  );
}

export default App;
