import React from 'react';
import './Menu.css';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Menu = (props) => {



  return (
    // <div className="menu">
    //   <div className="setUp">
    //     <span> Hola menu</span>
    //   </div>
    //   <div className="cart">
    //   </div>
    // </div>
    <Container className="menu">
      <Row>
        <Col className="setUp" xs>First, but unordered</Col>
        <Col className="cart" xs={{ order: 12 }}>Second, but last</Col>
        <Col xs={{ order: 1 }}>Third, but second</Col>
      </Row>
    </Container>
  )
}

export default Menu