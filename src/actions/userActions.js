import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  OPEN_MODAL,
  CLOSE_MODAL,
  USER_CHANGEPASSWORD_REQUEST,
  USER_CHANGEPASSWORD_SUCCESS,
  USER_CHANGEPASSWORD_FAIL,
} from "../constants/userConstants";
import axios from "axios";
const baseURL = process.env.REACT_APP_BACKEND_BASEURL;

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config1 = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${baseURL}/api/user/login/`,
      { username: username, password: password },
      config1
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
    const userStrInfo = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userStrInfo);
    const userId = userInfo.userid;
    const token = userInfo.access;
    const config2 = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    };
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const loginTime = `${hours}:${minutes}:${seconds}`;
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const loginDate = currentTime.toLocaleDateString("en-US", options);
    const body = {
      loginTime: loginTime,
      loginDate: loginDate,
      logoutTime: null,
    };
    axios
      .post(`${baseURL}/api/user/${userId}/dailyhours`, body, config2)
      .then((response) => {
        console.log(loginTime, loginDate);
      })
      .catch((error) => {
        console.log(`Cant save the logintime - ${error}`);
      });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      error:error.data && error.data.detail ? error.data.detail : "Wrong Credentials",
    });
  }
};

export const logout = () => (dispatch) => {
  const userStrInfo = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userStrInfo);
  const userId = userInfo.userid;
  const token = userInfo.access;
  const config2 = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const logOutTime = `${hours}:${minutes}:${seconds}`;

  axios
    .put(
      `${baseURL}/api/user/${userId}/dailyhours`,
      { logOutTime: logOutTime },
      config2
    )
    .then((response) => {
      console.log(logOutTime);
    })
    .catch((error) => {
      console.log(`Cant save the logOutTime - ${error}`);
    });
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({
    type: OPEN_MODAL,
    modalMessage: `Day Is Still Young You Go Have Fun`,
  });
};

export const showUserMessage = () => async (dispatch) => {
  dispatch({
    type: OPEN_MODAL,
    modalMessage: `Quote Of The Day - It is never too late to be what you might have been`,
  });
};

export const closeUserMessage = () => async (dispatch) => {
  dispatch({ type: CLOSE_MODAL, modalMessage: `` });
};


export const changePassWord = (
  current_password,
  new_password,
  confirm_password
) => async (dispatch) => {
  dispatch({ type: USER_CHANGEPASSWORD_REQUEST });
  try {
    if (confirm_password !== new_password) {
      throw new Error("New Password And Confirm Password Dont Match");
    } else {
      const userStrInfo = localStorage.getItem("userInfo");
      const userInfo = JSON.parse(userStrInfo);
      const userId = userInfo.userid;
      const token = userInfo.access;
      const config3 = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const password_data = {current_password:current_password,new_password:new_password}
      const {data} = await axios.post(`${baseURL}/api/user/${userId}/changepassword`,password_data,config3)

      if (data === "Password doesn't match"){
        throw new Error("Password doesn't match");
      }
    }
    dispatch({ type: USER_CHANGEPASSWORD_SUCCESS, payload: true });
  } catch (error) {
    dispatch({
      type: USER_CHANGEPASSWORD_FAIL,
      errormessage:
        new_password !== confirm_password
          ? "Confirm Password Doesnt Match With The New Password"
          : "Incorrect Password"
    });
  }
};
