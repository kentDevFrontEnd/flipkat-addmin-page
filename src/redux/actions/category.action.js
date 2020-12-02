import axiosInstance from "../../api/axios";
import { categoryConst } from "../const";

export const getAllCategories = () => {
  return async (dispatch) => {
    dispatch({
      type: categoryConst.GET_ALL_CATEGORY_REQUEST,
    });
    const res = await axiosInstance.get("/category/getcategories");
    // console.log(res);
    if (res.status === 200) {
      dispatch({
        type: categoryConst.GET_ALL_CATEGORY_SUCCESS,
        payload: {
          categories: res.data.categoriesList,
        },
      });
    } else {
      dispatch({
        type: categoryConst.GET_ALL_CATEGORY_FAIL,
        payload: {
          error: res.data.err,
        },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    const res = await axiosInstance.post("/category/create", form);
    console.log(res);
  };
};
