import { productConst } from "../const";

const initialState = {
  products: [],
  loading: false,
  success: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productConst.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        loading: false,
        success: true,
      };
    default:
      return state;
  }
};

export default productReducer;
