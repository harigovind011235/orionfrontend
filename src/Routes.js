import React from 'react'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import TeamScreen from './screens/TeamScreen'
import DailyHoursScreen from './screens/DailyHoursScreen'
import ChangePasswordScreen from './screens/ChangePasswordScreen'
import ApplyLeaves from './screens/ApplyLeaves'
import LeaveScreen from './screens/LeaveScreen'
import { createBrowserRouter } from "react-router-dom";


const routes = createBrowserRouter([
    {
      path: "/",
      element: <LoginScreen/>
    },
    {
      path:'/home',
      element:<HomeScreen/>
    },
    {
      path:'/team',
      element:<TeamScreen/>
    },
    {
      path:'/changepassword',
      element:<ChangePasswordScreen/>
    },
    {
      path:'/dailyhours',
      element:<DailyHoursScreen/>
    },
    {
      path:'/leaves',
      element:<LeaveScreen/>
    },
    {
      path:'/applyleaves',
      element:<ApplyLeaves/>
    },

    
  ]);


  
  export default routes