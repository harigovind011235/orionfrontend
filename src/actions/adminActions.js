import {
  ADMIN_ALLLEAVES_REQUEST,
  ADMIN_ALLLEAVES_SUCCESS,
  ADMIN_ALLLEAVES_FAIL,
  ADMIN_EDITLEAVES_REQUEST,
  ADMIN_EDITLEAVES_SUCCESS,
  ADMIN_EDITLEAVES_FAIL,
  ADMIN_INDIVIDUALEDITLEAVES_REQUEST,
  ADMIN_INDIVIDUALEDITLEAVES_SUCCESS,
  ADMIN_INDIVIDUALEDITLEAVES_FAIL,
  ADMIN_PENDINGLEAVES_REQUEST,
  ADMIN_PENDINGLEAVES_SUCCESS,
  ADMIN_PENDINGLEAVES_FAIL,
  ADMIN_UPDATE_REQUEST,
  ADMIN_UPDATE_SUCCESS,
  ADMIN_UPDATE_FAIL,
  ADMIN_GETINDIVIDUALPROFILE_REQUEST,
  ADMIN_GETINDIVIDUALPROFILE_SUCCESS,
  ADMIN_GETINDIVIDUALPROFILE_FAIL,
  ADMIN_UPDATEPROFILE_SUCCESS,
  ADMIN_UPDATEPROFILE_FAIL,
  ADMIN_UPDATEPROFILE_REQUEST,
  ADMIN_LEAVESEARCH_REQUEST,
  ADMIN_LEAVESEARCH_SUCCESS,
  ADMIN_LEAVESEARCH_FAIL,
  ADMIN_ALLPENDINGLEAVES_REQUEST,
  ADMIN_ALLPENDINGLEAVES_SUCCESS,
  ADMIN_ALLPENDINGLEAVES_FAIL,

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

export const getIndividualEditLeaves = (employeeId) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_EDITLEAVES_REQUEST });
    const userStrInfo = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userStrInfo);
    const token = userInfo.access;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.get(`${baseURL}/api/user/${employeeId}/remainingleaves`,config);
    dispatch({ type: ADMIN_EDITLEAVES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_EDITLEAVES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const adminIndividualEditLeaves = (employeeId,formData) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_INDIVIDUALEDITLEAVES_REQUEST });
    const userStrInfo = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userStrInfo);
    const token = userInfo.access;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.put(`${baseURL}/api/user/${employeeId}/leavetable`,formData,config);
    dispatch({ type: ADMIN_INDIVIDUALEDITLEAVES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_INDIVIDUALEDITLEAVES_FAIL,
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
    const { data } = await axios.get(
      `${baseURL}/api/user/${employeeId}/employee-pending-leaves`
    );
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

export const updateEmployeeLeave = (leaveId,status) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_UPDATE_REQUEST });
    const { data } = await axios.put(`${baseURL}/api/user/${leaveId}/update-leave`,{leavestatus: status,});
    dispatch({ type: ADMIN_UPDATE_SUCCESS, payload: data });
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

export const getIndividualEmployeeProfiles = (employeeId) => async (
  dispatch
) => {
  try {
    dispatch({ type: ADMIN_GETINDIVIDUALPROFILE_REQUEST });
    const userStrInfo = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userStrInfo);
    const token = userInfo.access;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.get(
      `${baseURL}/api/user/${employeeId}`,
      config
    );
    dispatch({ type: ADMIN_GETINDIVIDUALPROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_GETINDIVIDUALPROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const adminUpdateEmployeeProfiles = (employeeId, updateData) => async (
  dispatch
) => {
  try {
    dispatch({ type: ADMIN_UPDATEPROFILE_REQUEST });
    const userStrInfo = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userStrInfo);
    const token = userInfo.access;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
    
    const { data } = await axios.put(
      `${baseURL}/api/user/${employeeId}/updateprofile`,updateData ,config );
    dispatch({ type: ADMIN_UPDATEPROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATEPROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getEmployeeLeaveResults = (leaveType,leaveStatus,employeeName) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_LEAVESEARCH_REQUEST });
    let url = `${baseURL}/api/user/searchapi?`;
    
    if (leaveType) {
      url += `leave_type=${leaveType}&`;
    }
    
    if (leaveStatus && leaveStatus === '1') {
      url += `status=True&`;
    }

    if (leaveStatus && leaveStatus === '2') {
      url += `rejected=True&`;
    }

    if (leaveStatus && leaveStatus === '3') {
      url += `status=False&rejected=False&`;
    }
    
    if (employeeName) {
      url += `name=${employeeName}&`;
    }
    const { data } = await axios.get(url.slice(0, -1));
    dispatch({ type: ADMIN_LEAVESEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_LEAVESEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const listEmployeeLeaves = (page) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ALLPENDINGLEAVES_REQUEST });
    const { data } = await axios.get(`${baseURL}/api/user/all-leaves?page=${page}`);
    dispatch({ type: ADMIN_ALLPENDINGLEAVES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_ALLPENDINGLEAVES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};