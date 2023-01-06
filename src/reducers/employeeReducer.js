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

 } from '../constants/employeeConstants'

 export const employeeListReducer = (state={employees:[]},action) => {
    
    switch(action.type){

        case EMPLOYEE_LIST_REQUEST:
            return {loading:true,employees:[]}
        
        case EMPLOYEE_LIST_SUCCESS:
            return {loading:false,employees:action.payload}
        
        case EMPLOYEE_LIST_FAIL:
            return {loading:false,error:action.payload}
        
        default:
            return state

    }

}


export const employeeRemainingLeavesReducer = (state={employeeremainingleaves:[]},action) => {
    
    switch(action.type){

        case EMPLOYEE_REMAININGLEAVES_REQUEST:
            return {loading:true,employeeremainingleaves:[]}
        
        case EMPLOYEE_REMAININGLEAVES_SUCCESS:
            return {loading:false,employeeremainingleaves:action.payload}
        
        case EMPLOYEE_REMAININGLEAVES_FAIL:
            return {loading:false,error:action.payload}
        
        default:
            return state

    }

}


export const employeeLeaveStatusReducer = (state={employeeleavestatus:[]},action) => {
    
    switch(action.type){

        case EMPLOYEE_LEAVES_REQUEST:
            return {loading:true,employeeleavestatus:[]}
        
        case EMPLOYEE_LEAVES_SUCCESS:
            return {loading:false,employeeleavestatus:action.payload}
        
        case EMPLOYEE_LEAVES_FAIL:
            return {loading:false,error:action.payload}
        
        default:
            return state

    }

}


export const employeeDailyHoursReducer = (state={employeedailyhours:[]},action) => {
    
    switch(action.type){

        case EMPLOYEE_DAILYHOURS_REQUEST:
            return {loading:true,employeedailyhours:[]}
        
        case EMPLOYEE_DAILYHOURS_SUCCESS:
            return {loading:false,employeedailyhours:action.payload}
        
        case EMPLOYEE_DAILYHOURS_FAIL:
            return {loading:false,error:action.payload}
        
        default:
            return state

    }

}


export const employeeLeaveApplyReducer = (state={employeeleaveapplied:[]},action) => {
    
    switch(action.type){

        case EMPLOYEE_LEAVEAPPLY_REQUEST:
            return {loading:true,employeeleaveapplied:[]}
        
        case EMPLOYEE_LEAVEAPPLY_SUCCESS:
            return {loading:false,employeeleaveapplied:action.payload}
        
        case EMPLOYEE_LEAVEAPPLY_FAIL:
            return {loading:false,error:action.payload}
        
        default:
            return state

    }

}
