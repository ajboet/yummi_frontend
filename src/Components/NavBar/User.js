import React from 'react';
import Modal from 'react-bootstrap/Modal'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Col from 'react-bootstrap/Col'
import { axiosInstance } from "../../axiosInstance"

const User = (props) => {
  const [show,setShow] = React.useState(false)
  const [user, setUser] = React.useState({
    'name':'',
    'email':'',
    password:'',
    password_confirmation:'',
    full_address:'',
    cellphone_number:''
  })

  const submit = () => {
    let dataUser = JSON.parse(JSON.stringify(user))
    if(props.mode === "My profile" && user.password === ""){
      delete dataUser['password']
      delete dataUser['password_confirmation']
    }

    axiosInstance({
      url:props.mode === 'Register' ? 'signup' : props.mode === 'Order confirmation' ? 'confirm_order' : 'update',
      method:props.mode === 'Register' || props.mode === 'Order confirmation' ? 'post' : 'patch',
      data:dataUser
    })
    .then((response) => {
      setShow(false)
      if(props.mode === "My profile"){
        localStorage.setItem('me',JSON.stringify(user))
      }
      if(props.mode === "Order confirmation"){
        props.confirmOrder(true)
      }
      if(response.data.message !== undefined){
        props.showMessage({
          mode:'success',
          text:response.data.message
        })  
      }
    })
    .catch(err => {
      props.showMessage({
        mode:'danger',
        title:err.response.data.message,
        text:err.response.data.errors
      })
    })
  }

  React.useState(() => {
    if (props.mode === 'My profile'){
      let userSave = localStorage.getItem('me')
      if(userSave === null){
        axiosInstance.get('user')
        .then(response =>{
          localStorage.setItem('me',JSON.stringify(response.data))
          setUser({...user, ...response.data})
        })
        .catch(err => {
          props.showMessage({
            mode:'danger',
            title:err.response.data.message,
            text:err.response.data.errors
          })
        })
      }
      else {
        userSave = JSON.parse(userSave)
        setUser({...user, ...userSave})
      }
    }
  },[props.mode])

  return (
    <>
      {
        props.mode === 'Order confirmation' ?
          <Button
            variant="outline-primary"
            className="m-2 font-weight-bold"
            onClick={() => {
              setShow(true)
            }}
          >
            Confirm Order
          </Button> :
          <NavDropdown.Item eventKey={props.mode.toLocaleLowerCase().replace(' ','')} onClick={() => setShow(true)}>
            {props.mode}
          </NavDropdown.Item>
      }
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
            {props.mode}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col} sm="6" controlId="validationFormikName">
                <Form.Label>Name</Form.Label>
                <InputGroup>
                  {/* <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrependEmail">@</InputGroup.Text>
                  </InputGroup.Prepend> */}
                  <Form.Control
                    placeholder="Enter your Full name"
                    aria-describedby="inputGroupPrepend"
                    name="name"
                    type="text"
                    value={user.name}
                    onChange={(evt)=> setUser({...user, name:evt.target.value})}
                  />
                    {/* isInvalid={!!errors.username} */}
                  <Form.Control.Feedback type="invalid">
                    {/* {errors.username} */}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} sm="6" controlId="validationFormikEmail">
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
              <Form.Group as={Col} sm="6" controlId="validationFormikCellphone">
                <Form.Label>Cellphone</Form.Label>
                <InputGroup>
                  {/* <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrependEmail">@</InputGroup.Text>
                  </InputGroup.Prepend> */}
                  <Form.Control
                    placeholder="Enter your Cellphone"
                    aria-describedby="inputGroupPrepend"
                    name="phone"
                    type="telephone"
                    value={user.cellphone_number}
                    onChange={(evt)=> setUser({...user, cellphone_number:evt.target.value})}
                  />
                    {/* isInvalid={!!errors.username} */}
                  <Form.Control.Feedback type="invalid">
                    {/* {errors.username} */}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} sm="6" controlId="validationFormikAddress">
                <Form.Label>Address</Form.Label>
                <InputGroup>
                  {/* <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrependEmail">@</InputGroup.Text>
                  </InputGroup.Prepend> */}
                  <Form.Control
                    placeholder="Enter your address"
                    aria-describedby="inputGroupPrepend"
                    name="address"
                    type="text"
                    value={user.full_address}
                    onChange={(evt)=> setUser({...user, full_address:evt.target.value})}
                  />
                    {/* isInvalid={!!errors.username} */}
                  <Form.Control.Feedback type="invalid">
                    {/* {errors.username} */}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} sm="6" controlId="validationFormikPassword">
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
              <Form.Group as={Col} sm="6" controlId="validationFormikConfirmationPassword">
                <Form.Label>Password confirm</Form.Label>
                <InputGroup>
                  {/* <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  </InputGroup.Prepend> */}
                  <Form.Control
                    placeholder="Enter your password confirmation"
                    aria-describedby="inputGroupPrepend"
                    name="password_confirmation"
                    type="password"
                    value={user.password_confirmation}
                    onChange={(evt)=> setUser({...user, password_confirmation:evt.target.value})}
                  />
                    {/* isInvalid={!!errors.username} */}
                  <Form.Control.Feedback type="invalid">
                    {/* {errors.username} */}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-danger' style={{ fontWeight:800 }} onClick={() => setShow(false) }>
            Close
          </Button>
          <Button variant='outline-primary' onClick={() => submit() }>
            {props.mode === 'Order confirmation' ? 'Confirm' : 'Submit'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default User