import React, { useState, useEffect } from 'react';
import './Menu.css';
import { axiosInstance } from "../../../axiosInstance"

// import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import CardColumns from 'react-bootstrap/CardColumns'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import User from '../../NavBar/User'

const Menu = (props) => {

  const [products, setProducts] = useState([])
  const [order, setOrder] = useState([])
  const [cartArea, setShow] = useState(false)
  const { token, changeToken } = props

  useEffect(() => {
    axiosInstance.get('order')
      .then(response => {
        setOrder(response.data)
      })
    axiosInstance.get('product')
    .then(response => {
      setProducts(response.data.products)
      
      if (response.data.token) {
        localStorage.setItem('token',response.data.token)
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.token}`
        changeToken(false)
      }
    })
  }, [token,changeToken])

  const addToOrder = (id) => {
    axiosInstance.post('order/add/' + id )
      .then((response) => {
        setOrder(response.data)
        if(!cartArea){
          setShow(true)
        }
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
          <Card.Title style={{ fontWeight:900,fontFamily: 'Cabin Sketch, cursive', color:'#2a150b' }}>{product.name}</Card.Title>
          <Card.Text style={{ fontWeight:900, color:'#2a150b' }}>
            {product.details} <br></br> 
            <i className={`${props.currency === 'USD'?
                'fa fa-dollar-sign':
                'fa fa-euro-sign'}`
            }
            style={{marginRight:2,color:'#2a150b'}}></i>
            {props.currency === 'EUR' ? (product.price).toFixed(2) : (Number(product.price) * props.rateUSD).toFixed(2) }
          </Card.Text>
          <Button
            variant="outline-primary"
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
            ? 'Your cart is empty'
            : ''
        }
      </Card.Text>
      {
        order.items === undefined || order.items.length === 0
          ? ''
          : <div>
            <Row className="headCart">
              <Col xs={5}>
                Product
              </Col>
              <Col className="" xs={4}>
                Qty
              </Col>
              <Col className="" xs={3}>
                Price
              </Col>
            </Row>
            <div className="ProductList">
              {
                order.items === undefined || order.items.length === 0 ? '' :
                  order.items.map((item, key) => {
                    return <Row key={key} className="bodyCart">
                      <Col className="cartInfo" xs={5}>
                        <span style={{ color:'white', fontWeight:900, fontSize:16 , fontFamily: 'Cabin Sketch, cursive' }}>
                          {item.name}
                        </span>
                      </Col>
                      <Col className="" xs={4}>
                        <Row className="">
                          <Col className="options" xs={5}>
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
                          <Col className="options" xs={2}>
                            <span>
                              {item.quantity}
                            </span> 
                          </Col>
                          <Col className="options" xs={5}>
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
                        <span style={{ color:'white', fontWeight:900, fontSize:16 , fontFamily: 'Cabin Sketch, cursive' }}>
                          { 
                            props.currency === 'EUR' ? Number(item.price).toFixed(2) : (Number(item.price) * props.rateUSD).toFixed(2) 
                          }
                        </span>       
                      </Col>
                    </Row>
                  }
                )}

            </div>
            <Row className="bodyCart">
              <Col className="" xs={3}>
              </Col>
              <Col className="" style={{ color:'white', fontWeight:900, fontSize:16 , fontFamily: 'Cabin Sketch, cursive', textAlign: 'right', alignSelf: 'stretch' }} xs={5}>
                Sub Total
              </Col>
              <Col className="" style={{ color:'white', fontWeight:900, fontSize:16, textAlign: 'right', fontFamily: 'Cabin Sketch, cursive' }} xs={4}>
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
              <Col className="" xs={3}>

              </Col>
              <Col className="" 
                style={{ 
                  color:'white', 
                  fontWeight:900, 
                  fontSize:16 , 
                  fontFamily: 'Cabin Sketch, cursive', 
                  textAlign: 'right', 
                  alignSelf: 'stretch' 
                }} 
                xs={5}>
                Shipping Charges
                  </Col>
              <Col className="" 
                style={{ color:'white',textAlign: 'right', fontWeight:900, fontSize:16 , fontFamily: 'Cabin Sketch, cursive' }} xs={4}>
                <i className={`${props.currency === 'USD'?
                    'fa fa-dollar-sign':
                    'fa fa-euro-sign'}`
                }
                style={{marginRight:2,color:'white'}}></i>
                {
                  props.currency === 'EUR' ? Number(order.shippingCharges).toFixed(2) : (Number(order.shippingCharges) * props.rateUSD).toFixed(2)
                }
              </Col>
            </Row>
            <Row className="bodyCart">
              <Col className="" xs={3}>

              </Col>
              <Col className="" 
              style={{ color:'white', fontWeight:900, fontSize:16 , fontFamily: 'Cabin Sketch, cursive', 
              textAlign: 'right', alignSelf: 'stretch' }} xs={5}>
                Net Total
              </Col>
              <Col className="" style={{ color:'white', fontWeight:900, fontSize:16 , fontFamily: 'Cabin Sketch, cursive',textAlign: 'right' }} xs={4}>
                <i className={`${props.currency === 'USD'?
                    'fa fa-dollar-sign':
                    'fa fa-euro-sign'}`
                }
                style={{marginRight:2,color:'white'}}></i>
                {
                  props.currency === 'EUR' ? Number(order.netTotal).toFixed(2) : (Number(order.netTotal) * props.rateUSD).toFixed(2)
                }
              </Col>
            </Row>
            <Row className="bodyCart">
              <Col className="" xs={3}>

              </Col>
              <Col className="" style={{ color:'white', fontWeight:900, fontSize:16 , fontFamily: 'Cabin Sketch, cursive', textAlign: 'right', alignSelf: 'stretch' }} xs={5}>
                Tax
                  </Col>
              <Col className="" style={{ color:'white', fontWeight:900, fontSize:16 ,textAlign: 'right', fontFamily: 'Cabin Sketch, cursive' }} xs={4}>
                <i className={`${props.currency === 'USD'?
                    'fa fa-dollar-sign':
                    'fa fa-euro-sign'}`
                }
                style={{marginRight:2,color:'white'}}></i>
                {
                  props.currency === 'EUR' ? Number(order.tax).toFixed(2) : (Number(order.tax) * props.rateUSD).toFixed(2)
                }
              </Col>
            </Row>
            <Row className="bodyCart">
              <Col className="" xs={3}>

              </Col>
              <Col className="" style={{ color:'white', fontWeight:900, fontSize:16 , fontFamily: 'Cabin Sketch, cursive', textAlign: 'right', alignSelf: 'stretch' }} xs={5}>
                TOTAL
              </Col>
              <Col className="" xs={4} style={{ color:'white', fontWeight:900, fontSize:16 , fontFamily: 'Cabin Sketch, cursive',textAlign: 'right' }}>
                <i className={`${props.currency === 'USD'?
                    'fa fa-dollar-sign':
                    'fa fa-euro-sign'}`
                }
                style={{marginRight:2,color:'white'}}></i>
                {
                  props.currency === 'EUR' ? 
                    Number(order.total).toFixed(2) : 
                    (Number(order.total) * props.rateUSD).toFixed(2)
                }
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
        <Col className="setUp" xs="12" lg={cartArea === true ? 8 : 12}>
          {cards}
        </Col>
        <Col className="cart" xs="12" lg={cartArea === true ? 4 : 0}>
          {
              cartArea === true ? cart : 
                <Button
                  variant="primary"
                  size={'lg'}
                  style={{ position:'fixed',bottom:10,right:10,zIndex:2 }}
                  onClick={() => { setShow(true) }}
                >
                  <Badge pill style={{float:'right'}} variant="danger">
                    {order.items === undefined || order.items.length === 0 ? 0 : order.items.length}
                  </Badge>
                  <i className="fa fa-shopping-cart"></i>
                </Button>
            }
        </Col>
      </Row>
    </section>
  )
}

export default Menu