import React from 'react'
import Image from 'react-bootstrap/Image'
import labglowelcomeresized from '../assets/images/labglowelcomeresized.jpg'

function WelcomeLogo() {
  return (
    <div>
        <Image className='welcome-image' src={labglowelcomeresized} fluid/>
    </div>
  )
}

export default WelcomeLogo