import {
  BLOGS_LIST_REQUEST,
  BLOGS_LIST_SUCCESS,
  BLOGS_LIST_FAIL,
  NEWS_LIST_REQUEST,
  NEWS_LIST_SUCCESS,
  NEWS_LIST_FAIL
} from "../constants/dailyReadConstants";

export const blogsListReducer = (state = { bloglist: [] }, action) => {
  switch (action.type) {
    case BLOGS_LIST_REQUEST:
      return { loading: true, bloglist: [] };

    case BLOGS_LIST_SUCCESS:
      return { loading: false, bloglist: action.payload };

    case BLOGS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const newsListReducer = (state = { newslist: [] }, action) => {
    switch (action.type) {
      case NEWS_LIST_REQUEST:
        return { loading: true, newslist: [] };
  
      case NEWS_LIST_SUCCESS:
        return { loading: false, newslist: action.payload };
  
      case NEWS_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

