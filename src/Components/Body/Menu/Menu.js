import React, { useState, useEffect } from 'react';
import './Menu.css';
import { axiosInstance } from "../../../axiosInstance"

// import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Form from 'react-bootstrap/Form'

const Menu = (props) => {

  const [products, setProducts] = useState([])
  const [order, setOrder] = useState([])
  const [cartArea, setShow] = useState(false)

  useEffect(() => {
    axiosInstance.get('product')
      .then(response => {
        setProducts(response.data)
        console.log('Los productos son ->', response);
      })
  }, [])

  useEffect(() => {
    axiosInstance.get('order')
      .then(response => {
        setOrder(response.data)
        console.log('The order ->', response);
      })
  }, [])

  const addToOrder = (id) => {
    console.log('Lo que llega para mandar al carro ', id);
    axiosInstance.post('order/add/' + id + '/')
      .then((response) => {
        console.log('response addToOrder ->', response);
        setOrder(response.data)
      })
  }

  const cancelOrder = () => {
    axiosInstance.delete('order/delete/')
      .then((response) => {
        console.log('Delete ->', response);
        setOrder([])
      })
  }

  const addItem = (id) => {
    axiosInstance.post('order/item/increment/', { cartItemIndex: id })
      .then((response) => {
        console.log('addItem ->', response);
        setOrder(response.data)
      })
  }

  const subtractItem = (id) => {
    axiosInstance.post('order/item/decrement/', { cartItemIndex: id })
      .then((response) => {
        console.log('subtractItem ->', response);
        setOrder(response.data)
      })
  }

  const confirmOrder = (id) => {
    axiosInstance.post('confirm_order/')
      .then((response) => {
        console.log('Confirm Order ->', response);
        setOrder([])
      })
  }

  const cards = <CardColumns>
    {products === undefined ? "" : products.map((product, key) => (
      <Card
        key={key}
        className="m-2 card-product"
      >
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            {product.details} <br></br> {product.price}
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

  const cart = <Card className='cartBody'>
    <Card.Body>
      <Card.Title className='title'>
        <h1>
          Order
        </h1>
        <Button
          variant="primary"
          size={'sm'}
          style={{ 'width': 25, }}
          className='btnMinimize'
          onClick={() => { setShow(false) }}
        >
          -
        </Button>
      </Card.Title>
      <Card.Text className='title'>
        {
          order.items === undefined || order.items.length === 0
            ? 'You still have nothing in the cart'
            : ''
        }
      </Card.Text>
      {
        order.items === undefined || order.items.length === 0
          ? ''
          : <div>
            <Row className="headCart">
              <Col className="" xs={4}>
                Product
                  </Col>
              <Col className="" xs={5}>
                Quantity
                  </Col>
              <Col className="" xs={3}>
                Price
                  </Col>
            </Row>
            {
              order.items === undefined || order.items.length === 0 ? '' :
                order.items.map((item, key) => {
                  return <Row key={key} className="bodyCart">
                    <Col className="cartInfo" xs={4}>
                      <span>
                        {item.name}
                      </span>
                    </Col>
                    <Col className="" xs={5}>
                      <Row className="">
                        <Col className="options" xs={4}>
                          <Button
                            variant="primary"
                            size={'sm'}
                            style={{ 'width': 25, }}
                            onClick={() => {
                              subtractItem(key)
                            }}
                          >
                            -
                              </Button>
                        </Col>
                        <Col className="options" xs={4}>
                          <Form.Control
                            size="sm"
                            type="text"
                            value={item.quantity}
                            disabled
                          />
                        </Col>
                        <Col className="options" xs={4}>
                          <Button
                            variant="primary"
                            size={'sm'}
                            style={{ 'width': 25, }}
                            onClick={() => {
                              addItem(key)
                            }}
                          >
                            +
                            </Button>
                        </Col>
                      </Row>
                    </Col>
                    <Col className="cartInfo" xs={3}>
                      <span>
                        {item.price}
                      </span>
                    </Col>
                  </Row>
                }
                )}
            <Row className="bodyCart">
              <Col className="" xs={4}>

              </Col>
              <Col className="" xs={5}>
                Sub Total
                  </Col>
              <Col className="" xs={3}>
                {order.subtotal}
              </Col>
            </Row>
            <Row className="bodyCart">
              <Col className="" xs={4}>

              </Col>
              <Col className="" xs={5}>
                Tax
                  </Col>
              <Col className="" xs={3}>
                {order.tax}
              </Col>
            </Row>
            <Row className="bodyCart">
              <Col className="" xs={4}>

              </Col>
              <Col className="" xs={5}>
                Total
                </Col>
              <Col className="" xs={3}>
                {order.total}
              </Col>
            </Row>
            <Button
              variant="primary"
              className="m-2"
              onClick={() => {
                cancelOrder()
              }}
            >
              Cancel Order
              </Button>
            <Button
              variant="primary"
              className="m-2"
              onClick={() => {
                confirmOrder()
              }}
            >
              Confirm Order
              </Button>
          </div>
      }
    </Card.Body>
  </Card>

  return (
    <section className="menu">
      <Row className='menuRow'>
        <Col xs="12" className='menuTitle text-content'>
          <h1>Menu</h1>
          <Button
            variant="primary"
            size={'sm'}
            style={{ 'width': 25, }}
            onClick={() => { setShow(true) }}
          >
            +
            </Button>
        </Col>
        <Col className="setUp" xs={cartArea === true ? 8 : 12}>
          {cards}
        </Col>
        <Col className="cart" xs={cartArea === true ? 4 : 0}>
          <div className='fixedItem'>
            {cartArea === true ? cart : ''}
          </div>
        </Col>
      </Row>
    </section>
  )
}

export default Menu