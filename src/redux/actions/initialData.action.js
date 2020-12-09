import axiosInstance from "../../api/axios";
import { categoryConst, initialDataConst, productConst } from "../const";

export const getInitialData = () => {
  return async (dispatch) => {
    dispatch({
      type: initialDataConst.GET_ALL_INITIAL_DATA_REQUEST,
    });
    const res = await axiosInstance.post("/admin/initialData");
    console.log(res);

    if (res.status === 200) {
      const { categories, products } = res.data;
      dispatch({
        type: categoryConst.GET_ALL_CATEGORY_SUCCESS,
        payload: {
          categories,
        },
      });

      dispatch({
        type: productConst.GET_ALL_PRODUCTS_SUCCESS,
        payload: {
          products,
        },
      });
    } else {
      dispatch({
        type: initialDataConst.GET_ALL_INITIAL_DATA_FAIL,
        payload: {
          error: res.err,
        },
      });
    }
  };
};
