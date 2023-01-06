import React from 'react'
import { Container, Carousel,Col,Row } from 'react-bootstrap'
import labglocover1 from '../assets/images/labglocover1.png'


function HomeCarousel() {
  return (
    <Container>
      <Row className='p-4'>
        <Col lg={12} md={12}>
        <Carousel>

      <Carousel.Item>
      <img src={labglocover1} className='img-fluid hover-shadow d-inline-block w-100' alt='...' />
      </Carousel.Item>
    </Carousel>
        </Col>

      </Row>
    </Container>
  )
}

export default HomeCarousel