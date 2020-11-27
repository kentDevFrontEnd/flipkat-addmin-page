import qs from "qs";
import axiosInstance from "../../api/axios";
import { userConst } from "../const";

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({
      type: userConst.USER_REGISTER_REQUEST,
      payload: {},
    });

    const res = await axiosInstance.post("/admin/signup", qs.stringify(user));
    console.log(res);

    const { message, err } = res.data;

    if (res.status === 201) {
      dispatch({
        type: userConst.USER_REGISTER_SUCCESS,
        payload: { message },
      });
    }

    if (res.status === 400) {
      dispatch({
        type: userConst.USER_REGISTER_FAIL,
        payload: { error: err },
      });
    }
  };
};
