const { userConst } = require("../const");

const initialState = {
  error: "",
  message: "",
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConst.USER_REGISTER_REQUEST:
      return { ...state, loading: true };

    case userConst.USER_REGISTER_SUCCESS:
      return { ...state, loading: false, message: action.payload.message };

    case userConst.USER_REGISTER_FAIL:
      return { ...state, loading: false, message: action.payload.error };
    default:
      return state;
  }
};

export default userReducer;
