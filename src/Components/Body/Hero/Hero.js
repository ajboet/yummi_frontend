import React from 'react';
import './hero.css';

const Hero = (props) => {
  return (
    <section className="hero-image">
      <div className="text-content">
        <h1>
          Yummi 
            <strong>
              Pizza 
            </strong>
        </h1>
      </div>
      <span className="motto">Bon Appetite</span>
    </section>
  )
}

export default Hero