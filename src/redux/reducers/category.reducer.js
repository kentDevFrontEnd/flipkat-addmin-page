import { categoryConst } from "../const";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case categoryConst.GET_ALL_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryConst.GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
        loading: false,
      };
    case categoryConst.GET_ALL_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case categoryConst.ADD_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryConst.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case categoryConst.ADD_CATEGORY_FAIL:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default categoryReducer;
