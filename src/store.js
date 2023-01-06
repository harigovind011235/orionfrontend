import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { employeeListReducer,employeeRemainingLeavesReducer,employeeLeaveStatusReducer,employeeDailyHoursReducer,employeeLeaveApplyReducer } from "./reducers/employeeReducer";
import {
  blogsListReducer,
  newsListReducer,
} from "./reducers/dailyReadReducers";
import { userLoginReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  employeeList: employeeListReducer,
  blogList: blogsListReducer,
  newsList: newsListReducer,
  userLogin: userLoginReducer,
  employeeRemainingLeaves:employeeRemainingLeavesReducer,
  employeeLeaveStatus:employeeLeaveStatusReducer,
  employeeDailyHour:employeeDailyHoursReducer,
  employeeLeaveApply:employeeLeaveApplyReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const initialState = {
  userLogin:{'userInfo':userInfoFromStorage},
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
