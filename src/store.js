import { createStore , combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from 'redux-persist'
import {
  employeeListReducer,
  employeeRemainingLeavesReducer,
  employeeLeaveStatusReducer,
  employeeDailyHoursReducer,
  employeeHolidaysReducer,
  employeeLeaveApplyReducer,
  employeeDeleteLeaveReducer,
} from "./reducers/employeeReducer";
import {
  blogsListReducer,
  newsListReducer,
} from "./reducers/dailyReadReducers";
import {
  userLoginReducer,
  userMessageReducer,
  changePasswordReducer,
} from "./reducers/userReducers";
import {
  adminAllLeavesReducer,
  adminIndividualEditLeavesReducer,
  adminIndividualLeavesReducer,
  adminIndividualPendingLeavesReducer,
  adminUpdateLeaveReducer,
  admingetIndividualprofileReducer,
  adminUpdateProfileReducer,
  adminLeaveSearchReducer,
  adminPendingLeavesReducer,
} from "./reducers/adminReducers";

const reducer = combineReducers({
  employeeList: employeeListReducer,
  blogList: blogsListReducer,
  newsList: newsListReducer,
  userLogin: userLoginReducer,
  employeeRemainingLeaves: employeeRemainingLeavesReducer,
  employeeLeaveStatus: employeeLeaveStatusReducer,
  employeeDailyHour: employeeDailyHoursReducer,
  employeeLeaveApply: employeeLeaveApplyReducer,
  userMsgReducer: userMessageReducer,
  employeeLeaveDeleted: employeeDeleteLeaveReducer,
  changedPassWord: changePasswordReducer,
  adminPendingLeaves: adminAllLeavesReducer,
  getIndividualEditLeaves: adminIndividualEditLeavesReducer,
  adminIndividualEditLeaves:adminIndividualLeavesReducer,
  individualPendingLeaves: adminIndividualPendingLeavesReducer,
  employeeHolidays:employeeHolidaysReducer,
  updatedEmployeeLeave: adminUpdateLeaveReducer,
  getIndividualEmployeeProfiles:admingetIndividualprofileReducer,
  updateProfiles:adminUpdateProfileReducer,
  adminLeaveSearchResults:adminLeaveSearchReducer,
  employeeLeaveList:adminPendingLeavesReducer,
  
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const persistConfig={
  key:"root",
  storage,
  
}

const middleware = [thunk];
const persistreducer=persistReducer(persistConfig,reducer)

export  const store = createStore(
  persistreducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export  const persistedstore=persistStore(store)
