
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import LoginForm from '../components/LoginForm'
import WelcomeLogo from '../components/WelcomeLogo'


function LoginScreen() {
  return (
    <Container>
        <Row md={6} lg={6} className="justify-content-lg-center justify-content-md-center">
        <Col lg="auto">
            <WelcomeLogo/>
        </Col>
      </Row>
      <Row md={6} lg={12} className="justify-content-lg-center justify-content-md-center">
        <Col lg="auto">
            <LoginForm />
        </Col>
      </Row>
    </Container>
  )
}

export default LoginScreen