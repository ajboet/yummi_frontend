import React, { useState, useEffect } from 'react';
import './Menu.css';
import { axiosInstance } from "../../../axiosInstance"

// import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import User from '../../NavBar/User'
import Form from 'react-bootstrap/Form'

const Menu = (props) => {

  const [products, setProducts] = useState([])
  const [order, setOrder] = useState([])
  const [cartArea, setShow] = useState(false)

  useEffect(() => {
    axiosInstance.get('product')
      .then(response => {
        setProducts(response.data.products)
      })
  }, [])

  useEffect(() => {
    axiosInstance.get('order')
      .then(response => {
        setOrder(response.data)
      })
  }, [])

  const addToOrder = (id) => {
    axiosInstance.post('order/add/' + id + '/')
      .then((response) => {
        setOrder(response.data)
      })
  }

  const cancelOrder = () => {
    axiosInstance.delete('order/delete/')
      .then((response) => {
        setOrder([])
      })
  }

  const addItem = (id) => {
    axiosInstance.post('order/item/increment/', { cartItemIndex: id })
      .then((response) => {
        setOrder(response.data)
      })
  }

  const subtractItem = (id) => {
    axiosInstance.post('order/item/decrement/', { cartItemIndex: id })
      .then((response) => {
        setOrder(response.data)
      })
  }

  const confirmOrder = (confirmed) => {
    if(confirmed === undefined){
      axiosInstance.post('confirm_order/')
      .then((response) => {
        setOrder([])
      })
    }
    else{
      setOrder([])
    }
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
            {product.details} <br></br> 
            <i className={`${props.currency === 'USD'?
                'fa fa-dollar-sign':
                'fa fa-euro-sign'}`
            }
            style={{marginRight:2,color:'black'}}></i>
            {props.currency === 'EUR' ? (product.price).toFixed(2) : (Number(product.price) * props.rateUSD).toFixed(2) }
          </Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              // setOpenCar(true)
              addToOrder(product.id)
            }}
          >
            <i className="fa fa-cart-arrow-down"></i>
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
          variant="outline-primary"
          size={'sm'}
          className='btnMinimize'
          onClick={() => { setShow(false) }}
        >
          <i className="fa fa-chevron-down" style={{fontWeight:700}}></i>
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
              <Col xs={4}>
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
                      <span style={{ color:'white', fontWeight:600, fontSize:14 }}>
                        {item.name}
                      </span>
                    </Col>
                    <Col className="" xs={5}>
                      <Row className="">
                        <Col className="options" xs={4}>
                          <Button
                            variant="outline-danger"
                            size={'sm'}
                            onClick={() => {
                              subtractItem(key)
                            }}
                          >
                            <i className="fa fa-minus"></i>
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
                            variant="outline-primary"
                            size={'sm'}
                            onClick={() => {
                              addItem(key)
                            }}
                          >
                            <i className="fa fa-plus"></i>
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                    <Col className="cartInfo" xs={3}>
                    <i className={`${props.currency === 'USD'?
                          'fa fa-dollar-sign':
                          'fa fa-euro-sign'}`
                      }
                      style={{marginRight:3,color:'white'}}></i>
                      <span style={{ color:'white', fontWeight:600, fontSize:14 }}>
                        { 
                          props.currency === 'EUR' ? Number(item.price).toFixed(2) : (Number(item.price) * props.rateUSD).toFixed(2) 
                        }
                      </span>       
                    </Col>
                  </Row>
                }
                )}
            <Row className="bodyCart">
              <Col className="" xs={4}>

              </Col>
              <Col className="" style={{ color:'white', fontWeight:600, fontSize:14 }} xs={5}>
                Sub Total
                  </Col>
              <Col className="" style={{ color:'white', fontWeight:600, fontSize:14 }} xs={3}>
                <i className={`${props.currency === 'USD'?
                    'fa fa-dollar-sign':
                    'fa fa-euro-sign'}`
                }
                style={{marginRight:2,color:'white'}}></i>
                {
                  props.currency === 'EUR' ? Number(order.subtotal).toFixed(2) : (Number(order.subtotal) * props.rateUSD).toFixed(2)
                }
              </Col>
            </Row>
            <Row className="bodyCart">
              <Col className="" xs={4}>

              </Col>
              <Col className="" style={{ color:'white', fontWeight:600, fontSize:14 }} xs={5}>
                Tax
                  </Col>
              <Col className="" style={{ color:'white', fontWeight:600, fontSize:14 }} xs={3}>
                {order.tax}
                <i className="fa fa-percent" style={{fontSize:12, marginLeft:3,color:'white'}}></i>
              </Col>
            </Row>
            <Row className="bodyCart">
              <Col className="" xs={4}>

              </Col>
              <Col className="" style={{ color:'white', fontWeight:600, fontSize:14 }} xs={5}>
                Total
                </Col>
              <Col className="" xs={3}>
                <span style={{ color:'white', fontWeight:600, fontSize:14 }}>
                  <i className={`${props.currency === 'USD'?
                      'fa fa-dollar-sign':
                      'fa fa-euro-sign'}`
                  }
                  style={{marginRight:2,color:'white'}}></i>
                  {
                    props.currency === 'EUR' ? Number(order.total).toFixed(2) : (Number(order.total) * props.rateUSD).toFixed(2)
                  }
                </span>
              </Col>
            </Row>
            <Button
              variant="outline-danger"
              className="m-2 font-weight-bold"
              onClick={() => {
                cancelOrder()
              }}
            >
              Cancel Order
            </Button>
            <User {...props} key="orderconfirmation" 
              confirmOrder={confirmOrder} mode="Order confirmation"></User>
          </div>
      }
    </Card.Body>
  </Card>

  return (
    <section className="menu">
      <Row className='menuRow'>
        <Col xs="12" className='menuTitle text-content'>
          <h1>Menu</h1>
        </Col>
        <Col className="setUp" xs={cartArea === true ? 8 : 12}>
          {cards}
        </Col>
        <Col className="cart" xs={cartArea === true ? 4 : 0}>
          <div className='fixedItem'>
            {
              cartArea === true ? cart : 
                <Button
                  variant="primary"
                  size={'lg'}
                  style={{ position:'fixed',bottom:10,right:10 }}
                  onClick={() => { setShow(true) }}
                >
                  <i className="fa fa-shopping-cart"></i>
                </Button>
            }
          </div>
        </Col>
      </Row>
    </section>
  )
}

export default Menu