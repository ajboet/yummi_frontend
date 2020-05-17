import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Components/NavBar/Navbar.js"
import Alert from 'react-bootstrap/Alert'
import Body from './Components/Body/Body'
import axios from 'axios'

function App() {
  const [show, setShow] = React.useState(false)
  const logged = localStorage.getItem('logged')
  const [token, setToken] = React.useState(logged !== null ? JSON.parse(logged) : false);
  const [alertVar, setAlert] = React.useState({
    'mode': 'info',
    'text': '',
    'title': ''
  })
  const [currency, setCurrency] = React.useState(
    localStorage.getItem('currency') === null ?
      'EUR' : localStorage.getItem('currency')
  )

  const [rateUSD, setRate] = React.useState(0)

  const changeToken = (value) => {
    setToken(value)
    localStorage.setItem('logged', value)
  }

  const changeCurrency = (cash) => {
    setCurrency(cash)
    localStorage.setItem('currency', cash)
  }

  const closeAlert = () => {
    setShow(false)
    setAlert({
      'mode': 'info',
      'text': '',
      'title': ''
    })
  }

  const showMessage = (msg) => {
    if (typeof (msg['text']) === 'object') {
      let text = ""
      for (let msgs in msg['text']) {
        text += text === "" ? `${msgs.toLocaleUpperCase()}:` : `\n${msgs.toLocaleUpperCase()}:`
        for (let value in msg['text'][msgs]) {
          text += value === 0 || value === '0' ? ` ${msg['text'][msgs][value]}\n` : `- ${msg['text'][msgs][value]}\n`
        }
      }
      msg['text'] = text
    }
    setAlert(msg)
    setShow(true)
    setTimeout(closeAlert, 6000)
  }


  React.useEffect(() => {
    axios.get('http://data.fixer.io/api/latest?access_key=58afdd78942626fe365d0fcbbb9a69d3&symbols=USD')
      .then(response => {
        setRate(response.data.rates['USD'])
      })
  }, [])

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
          alertVar.text.split('\n').map((item, i) => <p style={{ fontSize: 14, paddingTop: 0, paddingBottom: 0 }} key={i}>{item}</p>)
        }
      </Alert>
      <Navbar currency={currency} rateUSD={rateUSD} setCurrency={changeCurrency} token={token} changeToken={changeToken} showMessage={showMessage}></Navbar>
      <Body currency={currency} rateUSD={rateUSD} token={token} showMessage={showMessage} changeToken={changeToken} />
    </div>
  );
}

export default App;
