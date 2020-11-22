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
    default:
      return state;
  }
};

export default authReducer;
