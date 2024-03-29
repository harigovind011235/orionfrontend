import axios from "axios";
import {
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_LIST_FAIL,
  EMPLOYEE_LEAVES_REQUEST,
  EMPLOYEE_LEAVES_SUCCESS,
  EMPLOYEE_LEAVES_FAIL,
  EMPLOYEE_HOLIDAYS_REQUEST,
  EMPLOYEE_HOLIDAYS_SUCCESS,
  EMPLOYEE_HOLIDAYS_FAIL,
  EMPLOYEE_REMAININGLEAVES_REQUEST,
  EMPLOYEE_REMAININGLEAVES_SUCCESS,
  EMPLOYEE_REMAININGLEAVES_FAIL,
  EMPLOYEE_DAILYHOURS_REQUEST,
  EMPLOYEE_DAILYHOURS_SUCCESS,
  EMPLOYEE_DAILYHOURS_FAIL,
  EMPLOYEE_LEAVEAPPLY_REQUEST,
  EMPLOYEE_LEAVEAPPLY_SUCCESS,
  EMPLOYEE_LEAVEAPPLY_FAIL,
  EMPLOYEE_DELETELEAVE_REQUEST,
  EMPLOYEE_DELETELEAVE_SUCCESS,
  EMPLOYEE_DELETELEAVE_FAIL,
  ALL_EMPLOYEE_LIST_REQUEST,
  ALL_EMPLOYEE_LIST_SUCCESS,
  ALL_EMPLOYEE_LIST_FAIL
} from "../constants/employeeConstants";

const baseURL = process.env.REACT_APP_BACKEND_BASEURL;

export const listEmployees = (page) => async (dispatch) => {
  try {
    
    dispatch({ type: EMPLOYEE_LIST_REQUEST });
    const { data } = await axios.get(`${baseURL}/api/user/all?page=${page.toString()}`);

    dispatch({
      type: EMPLOYEE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const allListEmployees = (page) => async (dispatch) => {
  try {
    
    dispatch({ type: ALL_EMPLOYEE_LIST_REQUEST });
    const { data } = await axios.get(`${baseURL}/api/user/all?page=${page.toString()}&&page_size=100`);
  
    dispatch({
      type: ALL_EMPLOYEE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_EMPLOYEE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const listRemainingLeaves = () => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_REMAININGLEAVES_REQUEST });
    const userStrInfo = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userStrInfo);
    const userId = userInfo.userid;
    const token = userInfo.access;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.get(
      `${baseURL}/api/user/${userId}/remainingleaves`,
      config
    );

    dispatch({
      type: EMPLOYEE_REMAININGLEAVES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_REMAININGLEAVES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const listLeaveStatus = () => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_LEAVES_REQUEST });
    const userStrInfo = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userStrInfo);
    const userId = userInfo.userid;
    const token = userInfo.access;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.get(
      `${baseURL}/api/user/${userId}/leavestatus`,
      config
    );

    dispatch({
      type: EMPLOYEE_LEAVES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_LEAVES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const listDailyHours = (page) => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_DAILYHOURS_REQUEST });
    const userStrInfo = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userStrInfo);
    const userId = userInfo.userid;
    const token = userInfo.access;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.get(`${baseURL}/api/user/${userId}/dailyhours?page=${page.toString()}`,  config);

    dispatch({
      type: EMPLOYEE_DAILYHOURS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_DAILYHOURS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const EmployeeLeaveApply = (leaveType, leaveNotes,leaveDate,EndleaveDate, noofleaves, halfday) => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_LEAVEAPPLY_REQUEST });
    const userStrInfo = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userStrInfo);
    const userId = userInfo.userid;
    const token = userInfo.access;
    const config = {
      headers: { Authorization: `Bearer ${token}`, "Content-type": "application/json", },
    };
    const body = {leaveType:leaveType,leaveNotes:leaveNotes,leaveDate:leaveDate,EndleaveDate:EndleaveDate,noOfLeaves:noofleaves,half_day:halfday}
    const data = await axios.post(`${baseURL}/api/user/${userId}/leavestatus`,body,config)
    dispatch({
      type: EMPLOYEE_LEAVEAPPLY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_LEAVEAPPLY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const EmployeeHolidays = () => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_HOLIDAYS_REQUEST });
    const userStrInfo = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userStrInfo);
    const token = userInfo.access;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.get(`${baseURL}/api/user/holidays`, config);
    dispatch({
      type: EMPLOYEE_HOLIDAYS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_HOLIDAYS_FAIL,
      payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};



export const EmployeeLeaveDelete = (leaveid) => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_DELETELEAVE_REQUEST });
    const userStrInfo = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userStrInfo);
    const token = userInfo.access;
    const config = {
      headers: { Authorization: `Bearer ${token}`, "Content-type": "application/json", },
    };
    const data = await axios.delete(`${baseURL}/api/user/${leaveid}/deleteleave`,config)
    dispatch({
      type: EMPLOYEE_DELETELEAVE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_DELETELEAVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};