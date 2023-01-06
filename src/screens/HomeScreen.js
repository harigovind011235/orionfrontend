
import React,{useEffect} from 'react'
import HomeCarousel from '../components/HomeCarousel'
import Blog from '../components/Blog'
import News from '../components/News'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {Container} from 'react-bootstrap'
import {useNavigate} from "react-router-dom"

function HomeScreen() {
    
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
                <HomeCarousel/>
                <Blog/>
                <News/>
                <Footer/>
        </Container>
    )
}

export default HomeScreen
