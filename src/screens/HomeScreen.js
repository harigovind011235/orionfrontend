
import React,{useEffect} from 'react'
import HomeCarousel from '../components/HomeCarousel'
import News from '../components/News'
import Header from '../components/Header'
import Footer from '../components/Footer'
import UserMessage from '../components/UserMessage'
import {Container} from 'react-bootstrap'
import {useNavigate} from "react-router-dom"
import { useSelector } from 'react-redux'

import UpcomingEvents from '../components/UpcomingEvents'
function HomeScreen() {
    
    const navigate = useNavigate();
    const userMessageShow = useSelector((state) => state.userMsgReducer)
    const {isModalOpen,modalMessage} =  userMessageShow
    useEffect(() => {
        const userData = localStorage.getItem('userInfo')
        if(!userData){
            navigate('/')
        }
        
    },[navigate])
    
    const userData = localStorage.getItem('userInfo')
    try{
        const userInfo = JSON.parse(userData)
        var employeeName = userInfo ? userInfo.username : null
    }
    catch{
        console.log("Not able to parse userdata")
    }
    
    return (
        <Container>
                <Header/>
                <UserMessage employeeName={employeeName} modalShow={isModalOpen} message={modalMessage}></UserMessage>
                <HomeCarousel/>
                <UpcomingEvents/>
                <News/>
                <Footer/>
        </Container>
    )
}

export default HomeScreen
