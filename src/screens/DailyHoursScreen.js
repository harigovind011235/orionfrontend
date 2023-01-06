
import React,{useEffect} from 'react'
import Header from '../components/Header'
import DailyHourTable from '../components/DailyHourTable'
import {Container} from 'react-bootstrap'
import {useNavigate} from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux'
import { listDailyHours } from '../actions/employeeActions'



function DailyHoursScreen() {
  const navigate = useNavigate();
    
    useEffect(() => {
        const userData = localStorage.getItem('userInfo')
        if(!userData){
            navigate('/')
        }
    },[navigate])

    const dispatch = useDispatch()
    const employeeDailyHours = useSelector((state) => state.employeeDailyHour)
 
    useEffect(() => {
      dispatch(listDailyHours())
    },[dispatch])

  return (
    <Container>
        <Header/>
        <DailyHourTable dailyhours={employeeDailyHours}/>
    </Container>
  )
}

export default DailyHoursScreen