import React,{useEffect} from 'react'
import { Col, Container, Row } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TeamTable from '../components/TeamTable'
import {useNavigate} from "react-router-dom"

function TeamScreen() {
  const navigate = useNavigate();
    
    useEffect(() => {
        const userData = localStorage.getItem('userInfo')
        if(!userData){
            navigate('/')
        }
    },[navigate])
  return (
    <Container>
      <Header />
      <Container>
        <Row
          md={6}
          lg={6}
          className="justify-content-lg-center justify-content-md-center mt-4"
        >
          <Col lg="auto" md="auto">
            <h1>Our Team</h1>
          </Col>
        </Row>
        <TeamTable/>
      </Container>
      <Footer />
    </Container>
  );
}

export default TeamScreen;
