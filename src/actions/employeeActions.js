import axios from "axios";
import {
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_LIST_FAIL,
  EMPLOYEE_LEAVES_REQUEST,
  EMPLOYEE_LEAVES_SUCCESS,
  EMPLOYEE_LEAVES_FAIL,
  EMPLOYEE_REMAININGLEAVES_REQUEST,
  EMPLOYEE_REMAININGLEAVES_SUCCESS,
  EMPLOYEE_REMAININGLEAVES_FAIL,
  EMPLOYEE_DAILYHOURS_REQUEST,
  EMPLOYEE_DAILYHOURS_SUCCESS,
  EMPLOYEE_DAILYHOURS_FAIL,
  EMPLOYEE_LEAVEAPPLY_REQUEST,
  EMPLOYEE_LEAVEAPPLY_SUCCESS,
  EMPLOYEE_LEAVEAPPLY_FAIL
} from "../constants/employeeConstants";

export const listEmployees = (page) => async (dispatch) => {
  try {
    
    dispatch({ type: EMPLOYEE_LIST_REQUEST });
    const { data } = await axios.get(`http://194.163.159.41:8000/api/user/all?page=${page.toString()}`);

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
      `http://194.163.159.41:8000/api/user/${userId}/remainingleaves`,
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
      `http://194.163.159.41:8000/api/user/${userId}/leavestatus`,
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

export const listDailyHours = () => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_DAILYHOURS_REQUEST });
    const userStrInfo = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userStrInfo);
    const userId = userInfo.userid;
    const token = userInfo.access;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.get(`http://194.163.159.41:8000/api/user/${userId}/dailyhours`,  config);

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


export const EmployeeLeaveApply = (leaveDate,leaveType,leaveNotes,noOfLeaves) => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_LEAVEAPPLY_REQUEST });
    const userStrInfo = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userStrInfo);
    const userId = userInfo.userid;
    const token = userInfo.access;
    const config = {
      headers: { Authorization: `Bearer ${token}`, "Content-type": "application/json", },
    };
    const body = {leaveDate:leaveDate,leaveType:leaveType,leaveNotes:leaveNotes,noOfLeaves:noOfLeaves}
    const data = await axios.post(`http://194.163.159.41:8000/api/user/${userId}/leavestatus`,body,config)
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