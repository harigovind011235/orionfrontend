import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  OPEN_MODAL,
  CLOSE_MODAL
} from "../constants/userConstants";

export const userLoginReducer = (state={},action) => {
    
    switch(action.type){

        case USER_LOGIN_REQUEST:
            return {loading:true}
        
        case USER_LOGIN_SUCCESS:
            return {loading:false,userInfo:action.payload}
        
        case USER_LOGIN_FAIL:
            return {loading:false,error:action.payload}
        
        case USER_LOGOUT:
            return {}
        
        default:
            return state

    }

}

const initialState = {
    isModalOpen: false,
    modalMessage: '',
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
          modalMessage: '',
        };
      default:
        return state;
    }
  }
  
  
  
  
  


