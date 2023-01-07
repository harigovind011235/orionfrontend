import axios from "axios";
import {
  BLOGS_LIST_REQUEST,
  BLOGS_LIST_SUCCESS,
  BLOGS_LIST_FAIL,
  NEWS_LIST_REQUEST,
  NEWS_LIST_SUCCESS,
  NEWS_LIST_FAIL,
} from "../constants/dailyReadConstants";

const baseURL = process.env.REACT_APP_BACKEND_BASEURL;

export const listBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: BLOGS_LIST_REQUEST });
    const { data } = await axios.get(
      `${baseURL}/api/dailyreads/blogs`
    );
    dispatch({ type: BLOGS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BLOGS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const listNews = () => async (dispatch) => {
  try {
    dispatch({ type: NEWS_LIST_REQUEST });
    const { data } = await axios.get(
      `${baseURL}/api/dailyreads/news`
    );
    dispatch({ type: NEWS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NEWS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
