import { pageConst } from "../const";

const initialState = {
  loading: false,
  page: null,
  success: false,
  error: null,
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case pageConst.ADD_PAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case pageConst.ADD_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        page: action.payload.page,
        success: true,
      };
    case pageConst.ADD_PAGE_FAIL:
      return {
        loading: false,
        page: null,
        success: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default pageReducer;
