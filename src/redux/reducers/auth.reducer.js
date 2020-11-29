import { authConst } from "../const";

const initialState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  },
  authenticate: false,
  authenticating: false,
  loadingLogout: false,
  message: "",
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConst.LOGIN_REQUEST:
      return {
        ...state,
        authenticating: true,
      };
    case authConst.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        authenticate: true,
        authenticating: false,
      };
    case authConst.LOGOUT_REQUEST:
      return {
        ...state,
        loadingLogout: true,
      };
    case authConst.LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        user: {
          firstName: "",
          lastName: "",
          email: "",
          picture: "",
        },
        authenticate: false,
        authenticating: false,
        loadingLogout: false,
        message: action.payload.message,
      };
    case authConst.LOGOUT_FAIL:
      return {
        ...state,
        loadingLogout: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default authReducer;
