import axiosInstance from "../../api/axios";
import qs from "qs";
import { authConst } from "../const";

export const login = (user) => {
  return async (dispatch) => {
    // console.log({ ...user });
    dispatch({
      type: authConst.LOGIN_REQUEST,
      payload: {},
    });

    const res = await axiosInstance.post(`/admin/signin`, qs.stringify(user));
    // need use qs package to convert data to string
    console.log(res);
    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch({
        type: authConst.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConst.LOGIN_FAIL,
          payload: {
            error: res.data.err,
          },
        });
      }
    }
  };
};

export const isUserLogin = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token) {
      dispatch({
        type: authConst.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConst.LOGIN_FAIL,
        payload: {
          error: "User login fail",
        },
      });
    }
  };
};
