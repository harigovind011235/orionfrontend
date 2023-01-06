
import React,{useEffect} from 'react'
import Header from '../components/Header'
import { Container,Row,Col,Form,Button } from 'react-bootstrap'
import {useNavigate} from "react-router-dom"

function ChangePasswordScreen() {

  const navigate = useNavigate();
    
    useEffect(() => {
        const userData = localStorage.getItem('userInfo')
        if(!userData){
            navigate('/')
        }
    },[navigate])
  
    return (
    <Container>
        <Header/>
        <Row md={12} lg={12} className="justify-content-lg-center justify-content-md-center mt-4">
        <Col lg="auto" md="auto">
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Current Password</Form.Label>
        <Form.Control type="password" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>New Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm New Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Row className="justify-content-lg-center justify-content-md-center mt-4">
      <Button variant="primary" type="submit" className='w-50'>
        Confirm
      </Button>
      </Row>
    </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default ChangePasswordScreen