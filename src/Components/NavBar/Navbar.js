import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Login from './Login'
import User from './User'
import { axiosInstance } from "../../axiosInstance"

const NavBase = (props) => {

  const logout = () => {
    axiosInstance.get('logout')
    .then(response => {
      props.showMessage({
        mode:'success',
        text:response.data.message
      })
    })
    localStorage.removeItem('token')
    localStorage.removeItem('me')
    delete axiosInstance.defaults.headers['Authorization']
    props.changeToken(false)
  }

  return (
    <Navbar variant="dark" className="justify-content-between">
      <Navbar.Brand href="#">Yummy <b> Pizza </b> </Navbar.Brand>
      <NavDropdown title="Menu" id="nav-dropdown">
        {
          !props.token ? [
            <Login {...props} key="login"></Login>,
            <User {...props} key="register" mode="Register"></User>
          ]:
          [
            <User {...props} key="profile" mode="My profile"></User>,
            <NavDropdown.Item  key="history" eventKey="history">History</NavDropdown.Item>,
            <NavDropdown.Item 
              onClick={logout}
              key="logout" eventKey="logout">
              Logout
            </NavDropdown.Item>
          ]
        }
      </NavDropdown>
    </Navbar>
  )
}

export default NavBase