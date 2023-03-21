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
    EMPLOYEE_HOLIDAYS_REQUEST,
    EMPLOYEE_HOLIDAYS_SUCCESS,
    EMPLOYEE_HOLIDAYS_FAIL,
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

export const allEmployeeListReducer = (state={allemployees:[]},action) => {
    
    switch(action.type){

        case ALL_EMPLOYEE_LIST_REQUEST:
            return {loading:true,allemployees:[]}
        
        case ALL_EMPLOYEE_LIST_SUCCESS:
            return {loading:false,allemployees:action.payload}
         
        case ALL_EMPLOYEE_LIST_FAIL:
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

export const employeeHolidaysReducer=(state={holidayslist:[]},action)=>{

    switch(action.type){

        case EMPLOYEE_HOLIDAYS_REQUEST:
            return {loading:true,holidayslist:[]}

        case EMPLOYEE_HOLIDAYS_SUCCESS:
            return {loading:false,holidayslist:action.payload}

        case EMPLOYEE_HOLIDAYS_FAIL:
            return({loading:false,error:action.payload})

        default :
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


export const employeeDeleteLeaveReducer = (state={leavedeleted:false},action) => {
    
    switch(action.type){

        case EMPLOYEE_DELETELEAVE_REQUEST:
            return {loading:true,leavedeleted:false}
        
        case EMPLOYEE_DELETELEAVE_SUCCESS:
            return {loading:false,leavedeleted:action.payload}
        
        case EMPLOYEE_DELETELEAVE_FAIL:
            return {loading:false,error:action.payload}
        
        default:
            return state

    }

}