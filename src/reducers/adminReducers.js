import {
  ADMIN_ALLLEAVES_REQUEST,
  ADMIN_ALLLEAVES_SUCCESS,
  ADMIN_ALLLEAVES_FAIL,
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
