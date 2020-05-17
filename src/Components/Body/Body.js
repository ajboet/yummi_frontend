import React from 'react';
import Hero from './Hero/Hero'
import Menu from './Menu/Menu'
import Delivery from './Delivery/Delivery'
import Footer from './Footer/Footer'

const Body = (props) => {
  return (
    <div>
      <Hero />
      <Menu {...props} />
      <Delivery />
      <Footer />
    </div>
  )
}

export default Body