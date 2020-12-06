import axiosInstance from "../../api/axios";

export const addProduct = (form) => {
  return async (dispatch) => {
    const res = await axiosInstance.post("/product/create", form);
    console.log(res);
  };
};
