import React from 'react';
import Modal from 'react-bootstrap/Modal'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { axiosInstance } from "../../axiosInstance"

const Login = (props) => {
  const [show,setShow] = React.useState(false)
  const [user, setUser] = React.useState({
    'email':'',
    'password':''
  })

  const login = () => {
    axiosInstance.post('login',user)
    .then((response) => {
      setShow(false)
      localStorage.setItem('token', response.data.token)
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.token}`
      props.changeToken(true)
      props.showMessage({
        mode:'success',
        text:response.data.message
      })
    })
    .catch(err => {
      props.showMessage({
        mode:'danger',
        title:err.response.data.message,
        text:err.response.data.errors
      })
    })
  } 

  return (
    <>
      <NavDropdown.Item eventKey="login" onClick={() => setShow(true)}>
        Login
      </NavDropdown.Item>
      <Modal
        show={show}
        animation={false}
        onHide={() => setShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="font-weight-bold" id="contained-modal-title-vcenter">
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="validationFormikEmail">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                {/* <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrependEmail">@</InputGroup.Text>
                </InputGroup.Prepend> */}
                <Form.Control
                  placeholder="name@example.com"
                  aria-describedby="inputGroupPrepend"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={(evt)=> setUser({...user, email:evt.target.value})}
                />
                  {/* isInvalid={!!errors.username} */}
                <Form.Control.Feedback type="invalid">
                  {/* {errors.username} */}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="validationFormikPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              {/* <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              </InputGroup.Prepend> */}
              <Form.Control
                placeholder="Enter your password"
                aria-describedby="inputGroupPrepend"
                name="password"
                type="password"
                value={user.password}
                onChange={(evt)=> setUser({...user, password:evt.target.value})}
              />
                {/* isInvalid={!!errors.username} */}
              <Form.Control.Feedback type="invalid">
                {/* {errors.username} */}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-danger' onClick={() => setShow(false) }>Close</Button>
          <Button onClick={() => login() }>Sign in</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Login