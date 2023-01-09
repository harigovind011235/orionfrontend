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

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.error };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

const initialState = {
  isModalOpen: false,
  modalMessage: "",
};

export function userMessageReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        isModalOpen: true,
        modalMessage: action.modalMessage,
      };
    case CLOSE_MODAL:
      return {
        isModalOpen: false,
        modalMessage: "",
      };
    default:
      return state;
  }
}


export const changePasswordReducer = (state = false, action) => {
  switch (action.type) {
    case USER_CHANGEPASSWORD_REQUEST:
      return { loading: true,changedpassword:state };

    case USER_CHANGEPASSWORD_SUCCESS:
      return { loading: false, changedpassword: action.payload };

    case USER_CHANGEPASSWORD_FAIL:
      return { loading: false, error: action.errormessage };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};
