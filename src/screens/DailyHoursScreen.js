
import React,{useEffect} from 'react'
import Header from '../components/Header'
import DailyHourTable from '../components/DailyHourTable'
import {Container,Row,Col} from 'react-bootstrap'
import {useNavigate} from "react-router-dom"


function DailyHoursScreen() {
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
        <Row md={6} className="justify-content-lg-center justify-content-md-center">
        <Col lg="3" md="3" className="offset-lg-1 mt-2">
          <h2>Daily Hours</h2>
        </Col>
      </Row>
        <DailyHourTable/>
    </Container>
  )
}

export default DailyHoursScreen