import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Login from './Login'

const NavBase = (props) => {
  return (
    <Navbar variant="dark" className="justify-content-between">
      <Navbar.Brand href="#">Yummy <b> Pizza </b></Navbar.Brand>
      <NavDropdown title="Menu" id="nav-dropdown">
        <Login></Login>
        <NavDropdown.Item eventKey="register">Register</NavDropdown.Item>
        <NavDropdown.Item eventKey="profile">My profile</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey="history">History</NavDropdown.Item>
      </NavDropdown>
    </Navbar>
  )
}

export default NavBase