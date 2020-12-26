import axiosInstance from "../../api/axios";
import qs from "qs";
import { categoryConst } from "../const";

export const getAllCategories = () => {
  return async (dispatch) => {
    dispatch({
      type: categoryConst.GET_ALL_CATEGORY_REQUEST,
    });
    const res = await axiosInstance.get("/category/getcategories");
    console.log(res);
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
    dispatch({
      type: categoryConst.ADD_CATEGORY_REQUEST,
    });

    if (res.status === 200) {
      dispatch({
        type: categoryConst.ADD_CATEGORY_SUCCESS,
        payload: {
          category: res.data.category,
        },
      });
    } else {
      dispatch({
        type: categoryConst.ADD_CATEGORY_FAIL,
        payload: {
          error: res.data.err,
        },
      });
    }
  };
};

export const updateCategory = (form) => {
  return async (dispatch) => {
    try {
      console.log(form);
      const res = await axiosInstance.post("/category/update", form);
      console.log(res);
      if (res.status === 200) return true;
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const deleteCategory = (ids) => {
  return async (dispatch) => {
    try {
      console.log(ids);
      const res = await axiosInstance.post(
        "/category/delete",
        qs.stringify({
          payload: { ids },
        })
      );
      console.log(res);
      if (res.status === 200) return true;
    } catch (error) {
      console.log(error.response);
    }
  };
};
