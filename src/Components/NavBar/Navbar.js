import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
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
    <Navbar variant="dark" className="justify-content-between" style={{zIndex:1}}>
      {/* <Navbar.Brand href="#">Yummy <b> Pizza </b> </Navbar.Brand> */}
      <div></div>
      <div>
        <Nav style={{display:'inline-block'}}>
          <Nav.Item style={{display:'inline-block'}} onClick={() => props.setCurrency(props.currency === 'USD' ? 'EUR':'USD')}>
            <Nav.Link eventKey="currency">
              <i className={`${props.currency === 'USD'?
                    'fa fa-dollar-sign':
                    'fa fa-euro-sign'}`
                }
              style={{fontSize:19,color:'white'}}></i>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <NavDropdown title="Menu" id="nav-dropdown" style={{display:'inline-block'}}>
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
      </div>
    </Navbar>
  )
}

export default NavBase