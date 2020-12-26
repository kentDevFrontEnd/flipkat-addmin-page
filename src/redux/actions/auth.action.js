import qs from "qs";
import jwt from "jsonwebtoken";
import axiosInstance from "../../api/axios";
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
      const data = jwt.decode(token);
      const nowTime = Date.now() / 1000;
      console.log(data);

      if (data.exp > nowTime) {
        dispatch({
          type: authConst.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      } else {
        localStorage.clear();

        dispatch({
          type: authConst.LOGOUT_SUCCESS,
          payload: {
            message: "Expired time in",
          },
        });
      }
    } else {
      dispatch({
        type: authConst.LOGOUT_SUCCESS,
        payload: {
          message: "Invalid token",
        },
      });
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    dispatch({
      type: authConst.LOGOUT_REQUEST,
    });

    const res = await axiosInstance.post("/admin/signout");

    if (res.status === 200) {
      localStorage.clear();

      dispatch({
        type: authConst.LOGOUT_SUCCESS,
        payload: {
          message: res.data.message,
        },
      });
    } else {
      dispatch({
        type: authConst.LOGOUT_FAIL,
        payload: {
          error: res.data.err,
        },
      });
    }
  };
};
