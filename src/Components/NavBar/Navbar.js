import React from 'react';
import Navbar from 'react-bootstrap/Navbar'

const Nav = (props) => {
  return (
    <Navbar variant="dark" className="navbar">
      <Navbar.Brand href="#">Yummy <b> Pizza </b></Navbar.Brand>
    </Navbar>
  )
}

export default Nav