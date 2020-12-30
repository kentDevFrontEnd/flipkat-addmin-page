import axiosInstance from "../../api/axios";
import { pageConst } from "../const";

export const addNewPage = (form) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: pageConst.ADD_PAGE_REQUEST,
      });

      const res = await axiosInstance.post("/page/create", form);

      if (res.status === 200) {
        dispatch({
          type: pageConst.ADD_PAGE_SUCCESS,
          payload: { page: res.data.page },
        });
      } else {
        dispatch({
          type: pageConst.ADD_PAGE_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: pageConst.ADD_PAGE_FAIL,
      });
    }
  };
};
