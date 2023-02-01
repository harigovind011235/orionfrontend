import {
  ADMIN_ALLLEAVES_REQUEST,
  ADMIN_ALLLEAVES_SUCCESS,
  ADMIN_ALLLEAVES_FAIL,
  ADMIN_PENDINGLEAVES_REQUEST,
  ADMIN_PENDINGLEAVES_SUCCESS,
  ADMIN_PENDINGLEAVES_FAIL
} from "../constants/AdminConstants";

export const adminAllLeavesReducer = (
  state = { pendingleaves: [] },
  action
) => {
  switch (action.type) {
    case ADMIN_ALLLEAVES_REQUEST:
      return { loading: true, pendingleaves: [] };

    case ADMIN_ALLLEAVES_SUCCESS:
      return { loading: false, pendingleaves: action.payload };

    case ADMIN_ALLLEAVES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};


export const adminIndividualPendingLeavesReducer = (
  state = { individualPendingLeave: [] },
  action
) => {
  switch (action.type) {
    case ADMIN_PENDINGLEAVES_REQUEST:
      return { loading: true, individualPendingLeave: [] };

    case ADMIN_PENDINGLEAVES_SUCCESS:
      return { loading: false, individualPendingLeave: action.payload };

    case ADMIN_PENDINGLEAVES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
