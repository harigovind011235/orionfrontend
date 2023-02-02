import {
  ADMIN_ALLLEAVES_REQUEST,
  ADMIN_ALLLEAVES_SUCCESS,
  ADMIN_ALLLEAVES_FAIL,
  ADMIN_PENDINGLEAVES_REQUEST,
  ADMIN_PENDINGLEAVES_SUCCESS,
  ADMIN_PENDINGLEAVES_FAIL,
  ADMIN_UPDATE_REQUEST,
  ADMIN_UPDATE_SUCCESS,
  ADMIN_UPDATE_FAIL
} from "../constants/AdminConstants";
import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_BASEURL;

export const getPendingLeaves = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ALLLEAVES_REQUEST });
    const { data } = await axios.get(`${baseURL}/api/user/all-leave-requests`);
    dispatch({ type: ADMIN_ALLLEAVES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_ALLLEAVES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getIndividualPendingLeaves = (employeeId) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PENDINGLEAVES_REQUEST });
    const { data } = await axios.get(`${baseURL}/api/user/${employeeId}/employee-pending-leaves`);
    dispatch({ type: ADMIN_PENDINGLEAVES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_PENDINGLEAVES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const updateEmployeeLeave = (leaveId) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_UPDATE_REQUEST });
    const { data } = await axios.put(`${baseURL}/api/user/${leaveId}/update-leave`,{updateleave:true});
    dispatch({ type: ADMIN_UPDATE_SUCCESS, payload: true }); 
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};