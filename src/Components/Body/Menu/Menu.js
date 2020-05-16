import React, { useState, useEffect } from 'react';
import './Menu.css';
import { axiosInstance } from "../../../axiosInstance"

// import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Menu = (props) => {

  const [products, setProducts] = useState([])
  const [order, setOrder] = useState([])

  useEffect(() => {
    axiosInstance.get('product')
      .then(response => {
        setProducts(response.data)
        console.log('Los productos son ->', response);
      })
  }, [])

  const addToOrder = (id) => {
    console.log('Lo que llega para mandar al carro ', id);
    axiosInstance.post('order/add/' + id + '/')
      .then((response) => {
        console.log('Respuesta de addToOrder ->', response);
        // props.donelog()
        // setShow(false)
        // localStorage.setItem('token',response.data.token)
      })
  }

  const cards = <CardColumns>
    {products === undefined ? "" : products.map((product, key) => (
      <Card
        key={key}
        className="m-2"
      >
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            {product.details}
          </Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              // setOpenCar(true)
              addToOrder(product.id)
            }}
          >
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    ))}
  </CardColumns>

  const cart = <Card style={{ width: '100%' }}>
    <Card.Body>
      <Card.Title>Order</Card.Title>
      <Card.Text>
      </Card.Text>
      <Row className="borange">
        <Col className="bred" xs={5}>
          Product
          </Col>
        <Col className="bblue" xs={4}>
          Quantity
          </Col>
        <Col className="bgreen" xs={3}>
          Price
          </Col>
      </Row>
      <Row className="borange">
        <Col className="bred" xs={5}>
          Pizza X's
          </Col>
        <Col className="bblue" xs={4}>
          <Row className="borange">
            <Col className="bred" xs={3}>
              <Button
                variant="primary"
                size={'sm'}
              >
                -
                </Button>
            </Col>
            <Col className="bblue" xs={6}>

            </Col>
            <Col className="bgreen" xs={3}>
              <Button
                variant="primary"
                size={'sm'}
              >
                +
                </Button>
            </Col>
          </Row>
        </Col>
        <Col className="bgreen" xs={3}>
          22$
          </Col>
      </Row>
      <Row className="borange">
        <Col className="bred" xs={5}>

        </Col>
        <Col className="bblue" xs={4}>
          Sub Total
          </Col>
        <Col className="bgreen" xs={3}>
          22S
          </Col>
      </Row>
      <Row className="borange">
        <Col className="bred" xs={5}>

        </Col>
        <Col className="bblue" xs={4}>
          Tax
          </Col>
        <Col className="bgreen" xs={3}>
          2$
          </Col>
      </Row>
      <Row className="borange">
        <Col className="bred" xs={5}>

        </Col>
        <Col className="bblue" xs={4}>
          Total
          </Col>
        <Col className="bgreen" xs={3}>
          24$
          </Col>
      </Row>
      <Button
        variant="primary"
        className="m-2"
      >
        Confirm Order
      </Button>
    </Card.Body>
  </Card>

  return (
    <Row className="menu">
      <Col xs="12"><span>Menu</span></Col>
      <Col className="setUp" xs={8}>
        {cards}
      </Col>
      <Col className="cart" xs={4}>
        {cart}
      </Col>
    </Row>
  )
}

export default Menu