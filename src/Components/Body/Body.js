import React from 'react';
import Hero from './Hero/Hero'
import Menu from './Menu/Menu'
import Delivery from './Delivery/Delivery'

const Body = (props) => {
  return (
    <div>
      <Hero />
      <Menu {...props} />
      <Delivery />
    </div>
  )
}

export default Body